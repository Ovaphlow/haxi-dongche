import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Toolbar from './component/UserToolbar'

import './dashboard.css'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', auth: {} }
    this.submit = this.submit.bind(this)
  }

  submit() {
    axios({
      method: 'put',
      url: './api/user/' + this.state.auth.id,
      data: {
        account: document.getElementById('account').value,
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      location.href = './login.html'
    }).catch(err => this.setState({ message: `服务器通信异常 ${err}` }))
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      location.href = './login.html'
      return false
    }
    this.setState({ auth: auth })
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="contrainer-fluid">
          <div className="row">
            <Sidebar />

            <div role="main" className="col-md-9 col-lg-10 ml-sm-auto px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  系统管理
                </h3>
              </div>

              <div className="lead">
                <Toolbar className="pull-right" />
                <i className="fa fa-user fa-fw"></i> 用户信息
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
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title">
                        <h6 className="text-danger">修改用户信息后需要重新登录</h6>
                      </div>

                      <div className="row">
                        <div className="col-4">
                          <div className="form-group">
                            <label>账号</label>
                            <input type="text" className="form-control" id="account" defaultValue={this.state.auth.username} />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-4">
                          <div className="form-group">
                            <label>姓名</label>
                            <input type="text" className="form-control" id="name" defaultValue={this.state.auth.name} />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <label>电话</label>
                            <input type="text" className="form-control" id="phone" defaultValue={this.state.auth.phone} />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <label>部门</label>
                            <input type="text" className="form-control" defaultValue={this.state.auth.dept} readOnly={true} />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <label>权限：管理员</label>
                            <input type="text" className="form-control" defaultValue={this.state.auth.auth_admin ? '是' : '否'} readOnly={true} />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <label>权限：禁动牌发放</label>
                            <input type="text" className="form-control" defaultValue={this.state.auth.auth_01 ? '是' : '否'} readOnly={true} />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-4">
                          <div className="form-group">
                            <label>权限：技术员</label>
                            <input type="text" className="form-control" defaultValue={this.state.auth.auth_p_jsy ? '是' : '否'} readOnly={true} />
                          </div>
                        </div>

                        <div className="col-4">
                          <div className="form-group">
                            <label>权限：调度</label>
                            <input type="text" className="form-control" defaultValue={this.state.auth.auth_p_dd ? '是' : '否'} readOnly={true} />
                          </div>
                        </div>

                        <div className="col-4">
                          <div className="form-group">
                            <label>权限：值班所长</label>
                            <input type="text" className="form-control" defaultValue={this.state.auth.auth_p_zbsz ? '是' : '否'} readOnly={true} />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          用户签名：
                          <img src={this.state.auth.sign} alt="用户签字" />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <div className="btn-group pull-right">
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<User />, document.getElementById('app'))
