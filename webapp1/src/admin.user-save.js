import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Toolbar from './component/AdminUserToolbar'

import './dashboard.css'

class AdminUserSave extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', deptList: [] }
    this.submit = this.submit.bind(this)
    this.back = this.back.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/common/dept/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ deptList: response.data.content })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}` })
    })
  }

  submit() {
    if (!!!document.getElementById('name').value || !!!document.getElementById('account').value ) {
      this.setState({ message: '请完整填写用户信息' })
      return false
    }
    axios({
      method: 'post',
      url: './api/common/user/',
      data: {
        name: document.getElementById('name').value,
        username: document.getElementById('account').value,
        password: md5(document.getElementById('password').value),
        phone: document.getElementById('phone').value,
        dept_id: document.getElementById('dept').value,
        auth_admin: document.getElementById('auth_admin').value,
        auth_01: document.getElementById('auth_01').value,
        auth_p_jsy: document.getElementById('auth_p_jsy').value,
        auth_p_dd: document.getElementById('auth_p_dd').value,
        auth_p_zbsz: document.getElementById('auth_p_zbsz').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      location.href = './admin.user-list.html'
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err} `})
    })
  }

  back() {
    window.history.go(-1)
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
                <i className="fa fa-plus fa-fw"></i> 新增用户
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
                    <label>用户名称</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label>账号</label>
                    <input type="text" className="form-control" id="account" />
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label>密码</label>
                    <input type="password" className="form-control" id="password" />
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label>电话</label>
                    <input type="text" className="form-control" id="phone" />
                  </div>
                </div>
                <div className="clearfix"></div>

                <div className="col-12">
                  <div className="form-group">
                    <label>部门</label>
                    <select className="form-control" id="dept">
                      {this.state.deptList.map(item =>
                        <option value={item.id} key={item.id}>{item.name}</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label>权限：管理员</label>
                    <select className="form-control" id="auth_admin">
                      <option value="0">否</option>
                      <option value="1">是</option>
                    </select>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label>权限：禁动牌发放</label>
                    <select className="form-control" id="auth_01">
                      <option value="0">否</option>
                      <option value="1">是</option>
                    </select>
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label>权限：技术员</label>
                    <select className="form-control" id="auth_p_jsy">
                      <option value="0">否</option>
                      <option value="1">是</option>
                    </select>
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label>权限：调度</label>
                    <select className="form-control" id="auth_p_dd">
                      <option value="0">否</option>
                      <option value="1">是</option>
                    </select>
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label>权限：值班所长</label>
                    <select className="form-control" id="auth_p_zbsz">
                      <option value="0">否</option>
                      <option value="1">是</option>
                    </select>
                  </div>
                </div>

                <div className="col-12">
                  <button type="button" className="btn btn-secondary" onClick={this.back}>
                    <i className="fa fa-fw fa-arrow-left"></i> 取消
                  </button>
                  <div className="btn btn-group pull-right text-right">
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

ReactDOM.render(<AdminUserSave />, document.getElementById('app'))
