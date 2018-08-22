import axios from 'axios'
import React from 'react'
import md5 from 'blueimp-md5'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'

export default class UserPassword extends React.Component {
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
