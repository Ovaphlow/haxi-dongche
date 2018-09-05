import axios from 'axios'
import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import { BackButton, DeptList } from './component/Common'

export default class AdminUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', deptList: [] }
    this.submit = this.submit.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/common/user/' + sessionStorage.getItem('admin'),
      response: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      document.getElementById('name').value = response.data.content.name
      document.getElementById('account').value = response.data.content.username
      document.getElementById('phone').value = response.data.content.phone
      document.getElementById('component.dept-list').value = response.data.content.dept_id
      document.getElementById('auth_admin').value = response.data.content.auth_admin
      document.getElementById('auth_01').value = response.data.content.auth_01
      document.getElementById('auth_p_jsy').value = response.data.content.auth_p_jsy
      document.getElementById('auth_p_dd').value = response.data.content.auth_p_dd
      document.getElementById('auth_p_zbsz').value = response.data.content.auth_p_zbsz
    }).catch(err => this.setState({ message: `服务器通信异常 ` }))
  }

  submit() {
    if (!!!document.getElementById('name').value || !!!document.getElementById('account').value) {
      this.setState({ message: '请完整填写用户信息' })
      return false
    }
    axios({
      method: 'put',
      url: './api/common/user/' + sessionStorage.getItem('admin'),
      data: {
        name: document.getElementById('name').value,
        account: document.getElementById('account').value,
        phone: document.getElementById('phone').value,
        dept_id: document.getElementById('component.dept-list').value,
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
    }).catch(err => this.setState({ message: `服务器通信异常` }))
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
                <input type="text" className="form-control" id="name" />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label>账号</label>
                <input type="text" className="form-control" id="account" />
              </div>
            </div>
            <div className="col-4"></div>
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
                <DeptList />
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
