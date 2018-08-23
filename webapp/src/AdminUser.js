import axios from 'axios'
import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'

export default class AdminUser extends React.Component {
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
    }).catch(err => this.setState({ message: `服务器通信异常 ` }))

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
      document.getElementById('dept').value = response.data.content.dept_id
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
      window.location.href = './#/admin.user-list'
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  back() {
    window.history.go(-1)
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
                <i className="fa fa-fw fa-arrow-left"></i>
                返回
              </button>
              <div className="btn btn-group pull-right text-right">
                <button type="button" className="btn btn-primary" onClick={this.submit}>
                  <i className="fa fa-fw fa-check-square-o"></i>
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
