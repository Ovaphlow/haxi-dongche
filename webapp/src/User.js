import axios from 'axios'
import React from 'react'
import md5 from 'blueimp-md5'

import { Sidebar, PageTitle, PageTitle2 } from './component/Common'

export class UserPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', auth: {} }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })
  }

  submit() {
    this.setState({ message: '' })
    if (!!!document.getElementById('password').value || !!!document.getElementById('password1').value || !!!document.getElementById('password2').value) {
      this.setState({ message: `请完整填写所需信息` })
      return false
    }
    if (document.getElementById('password1').value !== document.getElementById('password2').value) {
      this.setState({ message: '两次输入的新密码不一致' })
      return false
    }
    axios({
      method: 'put',
      url: './api/common/user/' + this.state.auth.id + '/password',
      data: {
        password: md5(document.getElementById('password1').value)
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

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 col-lg-10 ml-sm-auto px-4">
          <PageTitle title="当前用户" />
          <PageTitle2 fa="fa-user" title="修改密码" toolbar="Journal02Toolbar" />

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
                  <h6 className="text-danger">修改用户密码后需要重新登录</h6>
                </div>

                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label>原密码</label>
                      <input type="password" className="form-control" id="password" />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label>新密码</label>
                      <input type="password" className="form-control" id="password1" />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label>重复新密码</label>
                      <input type="password" className="form-control" id="password2" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="btn-group pull-right">
                      <button type="button" className="btn btn-danger" onClick={this.submit}>
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

export class User extends React.Component {
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

export class Login extends React.Component {
  constructor() {
    super()
    this.state = { message: '', link2: '' }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this.setState({ link2: sessionStorage.getItem('link2') || '' })
    sessionStorage.removeItem('link2')
  }

  submit() {
    if (!!!document.getElementById('account').value || !!!document.getElementById('password').value) {
      this.setState({ message: '请完整填写登录信息' })
      return false
    }

    fetch('./api/common/user/login', {
      method: 'post',
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        account: document.getElementById('account').value,
        password: md5(document.getElementById('password').value)
      })
    }).then(res => res.json())
    .then(response => {
      if (response.content.length === 0) {
        this.setState({ message: '账号或密码错误' })
      } else if (response.content.length > 1) {
        this.setState({ message: '账号数据异常' })
      } else {
        sessionStorage.setItem('auth', JSON.stringify(response.content[0]))
        window.location.href = this.state.link2 || './#/'
      }
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h2 className="text-center title">
            <br />
            <strong>账项管理系统</strong>
            <small className="text-muted">
              <br />
              <strong>哈尔滨动车段</strong>
              <br />
              Harbin EMU Depot
            </small>
          </h2>
        </div>

        <hr />

        <div className="clearfix"></div>

        <div className="col-12">
          <br /><br /><br />
        </div>

        {/*<div className="col-8 col-xl-9 text-center"></div>*/}
        <div className="col-4 offset-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                用户登录
                <small className="pull-right">
                  <a href="./#/">首页</a>
                </small>
              </h5>
              <hr />

              {this.state.message &&
                <div className="alert alert-danger">{this.state.message}</div>
              }

              <div className="form-group">
                <label>账号</label>
                <input type="text" className="form-control" id="account" />
              </div>

              <div className="form-group">
                <label>密码</label>
                <input type="password" className="form-control" id="password" />
              </div>

              <button type="button" className="btn btn-primary btn-block" onClick={this.submit}>
                <i className="fa fa-sign-in fa-fw"></i>
                确认
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
