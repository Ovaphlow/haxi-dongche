import axios from 'axios'
import React from 'react'
import md5 from 'blueimp-md5'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import { BackButton } from './component/Common'

export class AdminUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', deptList: [], item: {} }
    this.submit = this.submit.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentDidMount() {
    fetch('./api/common/dept')
    .then(res => res.json())
    .then(response => this.setState({ deptList: response.content }))

    fetch(`./api/common/user/${sessionStorage.getItem('admin')}`)
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        this.setState({ message: response.message })
        return
      }
      this.setState({ item: response.content })
    })
    .catch(err => window.console && console.error(err))
  }

  submit() {
    if (!!!document.getElementById('name').value || !!!document.getElementById('account').value) {
      this.setState({ message: '请完整填写用户信息' })
      return false
    }
    fetch(`./api/common/user/${sessionStorage.getItem('admin')}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        account: document.getElementById('account').value,
        phone: document.getElementById('phone').value,
        dept_id: document.getElementById('dept-select').value,
        dept_leader: document.getElementById('dept-leader').value,
        auth_admin: document.getElementById('auth_admin').value,
        auth_01: document.getElementById('auth_01').value,
        auth_p_jsy: document.getElementById('auth_p_jsy').value,
        auth_p_dd: document.getElementById('auth_p_dd').value,
        auth_p_zbsz: document.getElementById('auth_p_zbsz').value
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        window.alert(response.message)
        return
      }
      window.location.reload(true)
    })
    .catch(err => window.console && console.error(err))
  }

  back() {
    window.history.go(-1)
  }

  remove() {
    this.setState({ message: '' })
    fetch('./api/common/user/' + sessionStorage.getItem('admin'), {
      method: 'delete'
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        this.setState({ message: response.message })
        return false
      }
      window.location.href = './#/admin.user-list'
    })
    .catch(err => this.setState({ message: '服务器通信异常' }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="系统管理" />
          <PageTitle2 fa="fa-edit" title="用户" toolbar="AdminUserToolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>用户名称</label>
                <input type="text" className="form-control" id="name"
                    defaultValue={this.state.item.name}
                />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label>账号</label>
                <input type="text" className="form-control" id="account"
                    defaultValue={this.state.item.username}
                />
              </div>
            </div>
            <div className="col-4"></div>
            <div className="col-4">
              <div className="form-group">
                <label>电话</label>
                <input type="text" className="form-control" id="phone"
                    defaultValue={this.state.item.phone}
                />
              </div>
            </div>
            <div className="clearfix"></div>

            <div className="col-9">
              <div className="form-group">
                <label>部门</label>
                {this.state.item.id &&
                  <select className="form-control" id="dept-select" defaultValue={this.state.item.dept_id}>
                    <option value="">选择部门</option>
                    {this.state.deptList.map(item =>
                      <option value={item.id} key={item.id}>{item.name}</option>
                    )}
                  </select>
                }
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <label>工长</label>
                {this.state.item.id &&
                  <select className="form-control" id="dept-leader" defaultValue={this.state.item.dept_leader}>
                    <option value="">未选择</option>
                    <option value="是">是</option>
                    <option value="否">否</option>
                  </select>
                }
              </div>
            </div>
            <div className="clearfix"></div>

            <div className="col-12">
              <div className="form-group">
                <label>权限：管理员</label>
                {this.state.item.id &&
                  <select className="form-control" id="auth_admin" defaultValue={this.state.item.auth_admin}>
                    <option value="0">否</option>
                    <option value="1">是</option>
                  </select>
                }
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                <label>权限：禁动牌发放</label>
                {this.state.item.id &&
                <select className="form-control" id="auth_01" defaultValue={this.state.item.auth_admin}>
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select>
                }
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label>权限：技术员</label>
                {this.state.item.id &&
                <select className="form-control" id="auth_p_jsy" defaultValue={this.state.item.auth_p_jsy}>
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select>
                }
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label>权限：调度</label>
                {this.state.item.id &&
                <select className="form-control" id="auth_p_dd" defaultValue={this.state.item.auth_p_dd}>
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select>
                }
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label>权限：值班所长</label>
                {this.state.item.id &&
                <select className="form-control" id="auth_p_zbsz" defaultValue={this.state.item.auth_p_zbsz}>
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select>
                }
              </div>
            </div>

            <div className="col-12">
              <BackButton />
              <div className="btn btn-group pull-right text-right">
                <button type="button" className="btn btn-primary" onClick={this.submit}>
                  <i className="fa fa-fw fa-check-square-o"></i>
                  确定
                </button>
                <button type="button" className="btn btn-danger" onClick={this.remove}>
                  <i className="fa fa-fw fa-remove"></i>
                  删除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export class AdminUserSave extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', deptList: [] }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    fetch('./api/common/dept')
    .then(res => res.json())
    .then(response => this.setState({ deptList: response.content }))
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
        dept_id: document.getElementById('dept-select').value,
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
      window.location.href = './#/admin.user-list'
    }).catch(err => this.setState({ message: `服务器通信异常 ` }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="系统管理" />
          <PageTitle2 fa="fa-plus" title="新增用户" toolbar="AdminUserToolbar" />
          
          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
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
                <select className="form-control" id="dept-select">
                  <option value="">选择部门</option>
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
              <BackButton />
              <div className="btn btn-group pull-right text-right">
                <button type="button" className="btn btn-primary" onClick={this.submit}>
                  <i className="fa fa-fw fa-check-square-o"></i> 确定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export class AdminUserList extends React.Component {
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
