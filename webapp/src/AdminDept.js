import axios from 'axios'
import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import { BackButton } from './component/Common'

export class AdminDept extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', userList: [] }
    this.submit = this.submit.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/common/dept/' + sessionStorage.getItem('admin') + '?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      document.getElementById('name').value = response.data.content.name
    }).catch(err => this.setState({ message: `服务器通信异常` }))

    fetch('./api/common/user/dept/' + sessionStorage.getItem('admin') + '?timestamp=' + new Date().getTime(), {
      method: 'get',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) window.console && console.error(response.message)
      this.setState({ userList: response.content })
    })
    .catch(err => window.console && console.error(err))
  }

  submit() {
    if (!!!document.getElementById('name').value) {
      this.setState({ message: '请填写部门名称' })
      return false
    }
    axios({
      method: 'put',
      url: './api/common/dept/' + sessionStorage.getItem('admin'),
      data: { name: document.getElementById('name').value },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      window.location.href = './#/admin.dept-list'
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  remove() {
    axios({
      method: 'delete',
      url: './api/common/dept/' + sessionStorage.getItem('admin'),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      window.location.href = './#/admin.dept-list'
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  render() {
    return(
      <div className="row">
        <Sidebar />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="系统管理" />
          <PageTitle2 fa="fa-file" title="部门" toolbar="AdminDeptToolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="col-12">
            <div className="form-group">
              <label>部门名称</label>
              <input type="text" className="form-control" id="name" />
            </div>
          </div>

          <div className="col-12">
            <BackButton />
            <div className="btn btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={this.submit}>
                <i className="fa fa-fw fa-check-square-o"></i>
                确定
              </button>
              <button type="button" className="btn btn-danger" onClick={this.remove}>
                <i className="fa fa-fw fa-trash"></i>
                删除
              </button>
            </div>
          </div>

          <div className="col-12"><hr /></div>

          <div className="col-12">
            <p className="lead text-center">用户</p>
            <ul className="list-group">
              {this.state.userList.map(item =>
                <li className="list-group-item" key={item.id}>
                  {item.name}
                  <span className="text-secondary pull-right">
                    {item.phone}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export class AdminDeptSave extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
    this.submit = this.submit.bind(this)
  }

  submit() {
    if (!!!document.getElementById('name').value) {
      this.setState({ message: '' })
      return false
    }
    axios({
      method: 'post',
      url: './api/common/dept/',
      data: { name: document.getElementById('name').value },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.response })
        return false
      }
      window.location.href = './#/admin.dept-list'
    })
  }

  render() {
    return (
      <div className="row">
        <Sidebar />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="系统管理" />
          <PageTitle2 fa="fa-plus" title="新增部门" toolbar="AdminDeptToolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="col-12">
            <div className="form-group">
              <label>部门名称</label>
              <input type="text" className="form-control" id="name" />
            </div>

            <BackButton />
            <div className="btn btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={this.submit}>
                <i className="fa fa-fw fa-check-square-o"></i>
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export class AdminDeptList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', deptList: [] }
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
      url: './api/common/dept/?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ deptList: response.data.content })
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  detail(event) {
    sessionStorage.setItem('admin', event.target.getAttribute('data-id'))
    window.location.href = './#/admin.dept'
  }

  render() {
    return (
      <div className="row">
        <Sidebar />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="系统管理" />
          <PageTitle2 fa="fa-list" title="部门" toolbar="AdminDeptToolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="col-12">
            <div className="list-group">
              {this.state.deptList.map(item =>
                <a className="list-group-item list-group-item-action" data-id={item.id} key={item.id} onClick={this.detail}>
                  {item.name}
                  <span className="text-secondary pull-right">
                    {item.qty} 人
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
