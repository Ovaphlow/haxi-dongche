import React from 'react'
import ReactDOM from 'react-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }

    this.submit = this.submit.bind(this)
  }

  submit() {
    this.setState({ message: '' })

    let account = document.getElementById('login-account')
    let password = document.getElementById('login-password')
    if (!!!account.value || !!!password.value) {
      this.setState({ message: '请完整填写用户信息。' })
      return false
    }

    axios({
      method: 'POST',
      url: '../api/user/login',
      data: {
        account: account.value,
        password: md5(password.value)
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.status !== 200) {
        this.setState({ message: response.data.message })
        return false
      } else {
        if (response.data.content.length === 0) {
          this.setState({ message: '用户名或密码错误。' })
          return false
        } else if (response.data.content.length > 1) {
          this.setState({ message: '用户数据异常，请联系管理员。' })
          return false
        }
        sessionStorage.setItem('auth', JSON.stringify(response.data.content[0]))
        location.href = './index.html'
      }
    })
  }

  render() {
    return (
      <div className="card" style={{ backgroundColor: 'whitesmoke' }}>
        <div className="card-body">
          <h5 className="card-title">用户登录</h5>
          <hr />
          {this.state.message &&
            <div className="alert alert-danger">{this.state.message}</div>
          }
          <div className="form-group">
            <label>账号</label>
            <input type="text" id="login-account" className="form-control" />
          </div>
          <div className="form-group">
            <label>密码</label>
            <input type="password" id="login-password" className="form-control" />
          </div>
          <button type="button" className="btn btn-primary btn-block" onClick={this.submit}>
            <i className="fa fa-check fa-fw"></i> 确定
          </button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Login />,
  document.getElementById('login')
)