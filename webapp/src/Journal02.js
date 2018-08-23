import axios from 'axios'
import React from 'react'
import moment from 'moment'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'
import Journal02Item from './component/Journal02Item'

export default class Journal02 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list: [], trainList: [], deptList: [], auth: {} }
    this.submit = this.submit.bind(this)
    this.submit1 = this.submit1.bind(this)
    this.listByUser = this.listByUser.bind(this)
    this.reload = this.reload.bind(this)
    this.detail = this.detail.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })

    document.getElementById('date_begin').value = moment().format('YYYY-MM-DD')
    axios({
      method: 'get',
      url: './api/journal02/?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list: response.data.content })
    }).catch(err => this.setState({ message: `服务器通信异常` }))

    axios({
      method: 'get',
      url: './api/common/dept/',
      responseType: 'json'
    }).then(response => this.setState({ deptList: response.data.content }))

    axios({
      method: 'get',
      url: './api/common/train',
      responseType: 'json'
    }).then(response => this.setState({ trainList: response.data.content }))
  }

  submit() {
    axios({
      method: 'post',
      url: './api/journal02/filter/',
      data: {
        dept: document.getElementById('dept').value || '',
        group: document.getElementById('group').value || '',
        date: document.getElementById('date_begin').value || ''
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list: response.data.content })
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  submit1() {
    axios({
      method: 'post',
      url: './api/journal02/filter/notcomplete',
      data: {
        dept: document.getElementById('dept').value,
        group: document.getElementById('group').value,
        date: document.getElementById('date_begin').value
      },
      responseType: 'json'
    }).then(response => this.setState({ list: response.data.content }))
  }

  listByUser() {
    fetch('./api/journal02/filter/user/' + this.state.auth.id + '?timestamp=' + new Date().getTime(), {
      method: 'get',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    })
    .then(res => res.json())
    .then(response => {
      this.setState({ list: response.content })
    })
    .catch(err => this.setState({ message: `服务器通信异常` }))
  }

  reload() {
    window.location.reload(true)
  }

  detail(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    window.location.href = './#/journal.02-detail'
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-search" title="检索数据" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">{this.state.message}</div>
            </div>
          }

          <div className="row">
            <div className="col-4">
              <div className="form-group">
                <label>作业车组号</label>
                <select className="form-control" id="group">
                  <option value="">选择车组</option>
                  {this.state.trainList.map(item =>
                    <option value={item.name} key={item.id}>{item.name} ({item.model})</option>
                  )}
                </select>
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label>申请单位</label>
                <select className="form-control" id="dept">
                  <option value="">选择单位</option>
                  {this.state.deptList.map(item =>
                    <option value={item.name} key={item.id}>{item.name}</option>
                  )}
                </select>
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label>申请作业时间</label>
                <input type="date" className="form-control" id="date_begin" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.reload}>
                <i className="fa fa-fw fa-refresh"></i>
                重置
              </button>
              <div className="btn-group pull-right">
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.submit}>
                  <i className="fa fa-fw fa-search"></i>
                  查询
                </button>

                <button type="button" className="btn btn-outline-dark btn-sm" onClick={this.submit1}>
                  <i className="fa fa-fw fa-search"></i>
                  未完成申请单
                </button>

                <button type="button" className="btn btn-outline-info btn-sm" onClick={this.listByUser}>
                  <i className="fa fa-fw fa-user"></i>
                  我的申请单
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <ul className="list-group">
                {this.state.list.map(item =>
                  <Journal02Item key={item.id} item={item} />
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
