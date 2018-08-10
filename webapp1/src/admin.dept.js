import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/SidebarA'
import Toolbar from './component/AdminDeptToolbar'

import './dashboard.css'

class AdminDept extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
    this.back = this.back.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/dept/' + sessionStorage.getItem('admin'),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      document.getElementById('name').value = response.data.content.name
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })
  }

  submit() {
    if (!!!document.getElementById('name').value) {
      this.setState({ message: '请填写部门名称' })
      return false
    }
    axios({
      method: 'put',
      url: './api/dept/' + sessionStorage.getItem('dept'),
      data: { name: document.getElementById('name').value },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      location.href = './admin.dept-list.html'
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })
  }

  back() {
    window.history.go(-1)
  }

  render() {
    return(
      <div>
        <Navbar />

        <div className="container-fluid">
          <div className="row">
            <Sidebar />

            <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  02.一体化作业申请单
                </h3>
              </div>

              <div className="lead">
                <Toolbar className="pull-right" />
                <i className="fa fa-plus fa-fw"></i> 新增部门
                <br />
                <br />
              </div>

              {this.state.message &&
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-danger">
                      {this.state.message}
                    </div>
                  </div>
                </div>
              }

              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label>部门名称</label>
                    <input type="text" className="form-control" id="name" />
                  </div>

                  <button type="button" className="btn btn-secondary" onClick={this.back}>
                    <i className="fa fa-fw fa-arrow-left"></i> 取消
                  </button>
                  <div className="btn btn-group pull-right">
                    <button type="button" className="btn btn-primary" onClick={this.submit}>
                      <i className="fa fa-fw fa-check-square-o"></i> 确定
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<AdminDept />, document.getElementById('app'))