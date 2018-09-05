import axios from 'axios'
import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'

export default class AdminUserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', userList: [] }
    this.detail = this.detail.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth.auth_admin) {
      alert('当前用户没有该页面的权限。')
      window.location.href = './#/login'
      return false
    }

    axios({
      method: 'get',
      url: './api/common/user/?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ userList: response.data.content })
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  detail(event) {
    sessionStorage.setItem('admin', event.target.getAttribute('data-id'))
    window.location.href = './#/admin.user'
  }

  render() {
    return (
      <div className="row">
        <Sidebar />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="系统管理" />
          <PageTitle2 fa="fa-list" title="用户" toolbar="AdminUserToolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="col-12">
            <div className="list-group">
              {this.state.userList.map(item =>
                <a className="list-group-item list-group-item-action" data-id={item.id} key={item.id} onClick={this.detail}>
                  {item.name}
                  <span className="pull-right text-secondary">{item.dept}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
