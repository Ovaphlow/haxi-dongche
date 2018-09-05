import axios from 'axios'
import React from 'react'

import { Sidebar, PageTitle, PageTitle2 } from './component/Common'

export default class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', auth: {} }
    this.submit = this.submit.bind(this)
  }

  submit() {
    axios({
      method: 'put',
      url: './api/common/user/' + this.state.auth.id,
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
      window.location.href = './#/login'
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })
    document.getElementById('auth_admin').value = auth.auth_admin ? '是' : '否'
    document.getElementById('auth_01').value = auth.auth_01 ? '是' : '否'
    document.getElementById('auth_p_jsy').value = auth.auth_p_jsy ? '是' : '否'
    document.getElementById('auth_p_dd').value = auth.auth_p_dd ? '是' : '否'
    document.getElementById('auth_p_zbsz').value = auth.auth_p_zbsz ? '是' : '否'
  }

  render() {
    return (
      <div className="row">
        <Sidebar />

        <div role="main" className="col-md-9 col-lg-10 ml-sm-auto px-4">
          <PageTitle title="当前用户" />
          <PageTitle2 fa="fa-user" title="用户信息" toolbar="UserToolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

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
                      <input type="text" readOnly={true} className="form-control" id="auth_admin" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label>权限：禁动牌发放</label>
                      <input type="text" readOnly={true} className="form-control" id="auth_01" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label>权限：技术员</label>
                      <input type="text" readOnly={true} className="form-control" id="auth_p_jsy" />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label>权限：调度</label>
                      <input type="text" readOnly={true} className="form-control" id="auth_p_dd" />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label>权限：值班所长</label>
                      <input type="text" readOnly={true} className="form-control" id="auth_p_zbsz" />
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
                        <i className="fa fa-fw fa-check-square-o"></i>
                        确定
                      </button>
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
