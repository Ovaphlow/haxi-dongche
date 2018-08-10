import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/SidebarA'
import Toolbar from './component/AdminDeptToolbar'

import './dashboard.css'

class AdminDeptList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', deptList: [] }
    this.detail = this.detail.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth.auth_admin) {
      alert('当前用户没有该页面的权限。')
      location.href = './login.html'
      return false
    }

    axios({
      method: 'get',
      url: './api/dept/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ deptList: response.data.content })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })
  }

  detail(event) {
    sessionStorage.setItem('admin', event.target.getAttribute('data-id'))
    location.href = './admin.dept.html'
  }

  render() {
    return (
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
                <i className="fa fa-list fa-fw"></i> 部门
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
                  <div className="list-group">
                    {this.state.deptList.map(item =>
                      <a className="list-group-item list-group-item-action" data-id={item.id} key={item.id} onClick={this.detail}>
                        {item.name}
                      </a>
                    )}
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

ReactDOM.render(<AdminDeptList />, document.getElementById('app'))