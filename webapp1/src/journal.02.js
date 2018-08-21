import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Toolbar from './component/Journal02Toolbar'
import Journal02Item from './component/Journal02Item'

import './dashboard.css'

class Journal02 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list: [], trainList: [], deptList: [] }
    this.submit = this.submit.bind(this)
    this.submit1 = this.submit1.bind(this)
    this.reload = this.reload.bind(this)
    this.detail = this.detail.bind(this)
  }

  componentDidMount() {
    document.getElementById('date_begin').value = moment().format('YYYY-MM-DD')
    axios({
      method: 'get',
      url: './api/journal02/?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list: response.data.content })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })

    axios({
      method: 'get',
      url: './api/common/dept/',
      responseType: 'json'
    }).then(response => this.setState({ deptList: response.data.content }))

    axios({
      method: 'get',
      url: './api/common/train',
      responseType: 'json'
    }).then(response => this.setState({ trainList: response.data.content }))
  }

  submit() {
    axios({
      method: 'post',
      url: './api/journal02/filter/',
      data: {
        dept: document.getElementById('dept').value || '',
        group: document.getElementById('group').value || '',
        date: document.getElementById('date_begin').value || ''
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list: response.data.content })
    }).catch(err => this.setState({ message: `服务器通信异常 ${err}` }))
  }

  submit1() {
    axios({
      method: 'post',
      url: './api/journal02/filter/notcomplete',
      data: {
        dept: document.getElementById('dept').value,
        group: document.getElementById('group').value,
        date: document.getElementById('date_begin').value
      },
      responseType: 'json'
    }).then(response => this.setState({ list: response.data.content }))
  }

  reload() {
    location.reload(true)
  }

  detail(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    location.href = './journal.02-detail.html'
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="contrainer-fluid">
          <div className="row">
            <Sidebar category='单据' />

            <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  02.一体化作业申请单
                </h3>
              </div>

              <div className="lead">
                <Toolbar className="pull-right" />
                <i className="fa fa-search fa-fw"></i> 检索数据
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
                <div className="col-4">
                  <div className="form-group">
                    <label>作业车组号</label>
                    <select className="form-control" id="group">
                      <option value="">选择车组</option>
                      {this.state.trainList.map(item =>
                        <option value={item.name} key={item.id}>{item.name} ({item.model})</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label>申请单位</label>
                    <select className="form-control" id="dept">
                      <option value="">选择单位</option>
                      {this.state.deptList.map(item =>
                        <option value={item.name} key={item.id}>{item.name}</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label>申请作业时间</label>
                    <input type="date" className="form-control" id="date_begin" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="btn-group pull-right">
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.submit}>
                      <i className="fa fa-fw fa-search"></i> 查询
                    </button>

                    <button type="button" className="btn btn-outline-info btn-sm" onClick={this.submit1}>
                      <i className="fa fa-fw fa-search"></i> 未完成申请单
                    </button>

                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.reload}>
                      <i className="fa fa-fw fa-refresh"></i> 重置
                    </button>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <ul className="list-group">
                    {this.state.list.map(item =>
                      <Journal02Item key={item.id} item={item} />
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Journal02 />, document.getElementById('app'))
