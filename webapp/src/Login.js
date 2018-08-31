import React from 'react'

import md5 from 'blueimp-md5'

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = { message: '' }
    this.submit = this.submit.bind(this)
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
        window.location.href = './#/'
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
