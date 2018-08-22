import axios from 'axios'
import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'

export default class AdminDept extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
    this.back = this.back.bind(this)
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
  }

  back() {
    window.history.go(-1)
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
            <button type="button" className="btn btn-secondary" onClick={this.back}>
              <i className="fa fa-fw fa-arrow-left"></i>
              取消
            </button>
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
        </div>
      </div>
    )
  }
}
