import React from 'react'
import moment from 'moment'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import Journal02Item from './component/Journal02Item'
import { Message, ReloadButton, DeptList, TrainList, MessageAlert } from './component/Common'
import { ExportFilter2Excel } from './component/Journal02Util'

export default class Journal02 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list: [], trainList: [], deptList: [], auth: {} }
    this.submit = this.submit.bind(this)
    this.submit1 = this.submit1.bind(this)
    this.listByUser = this.listByUser.bind(this)
    this.detail = this.detail.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      sessionStorage.setItem('link2', './#/journal.02')
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })

    document.getElementById('date_begin').value = moment().format('YYYY-MM-DDT00:00:00')
    document.getElementById('date_end').value = moment().format('YYYY-MM-DDT23:59:59')
    fetch(`./api/journal02/?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
  }

  submit() {
    fetch(`./api/journal02/filter/`, {
      method: 'post',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        dept: document.getElementById('component.dept-list').value || '',
        group: document.getElementById('component.train-list').value || '',
        date_begin: moment(document.getElementById('date_begin').value).format('YYYY-MM-DD'),
        time_begin: moment(document.getElementById('date_begin').value).format('HH:mm:ss') || '00:00:00',
        date_end: moment(document.getElementById('date_end').value).format('YYYY-MM-DD'),
        time_end: moment(document.getElementById('date_end').value).format('HH:mm:ss') || '23:59:59'
      })
    })
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
  }

  submit1() {
    fetch(`./api/journal02/filter/notcomplete`, {
      method: 'post',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        dept: document.getElementById('component.dept-list').value,
        group: document.getElementById('component.train-list').value,
        date: document.getElementById('date_begin').value
      })
    })
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
  }

  listByUser() {
    fetch(`./api/journal02/filter/user/${this.state.auth.id}?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
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

          <MessageAlert />

          {this.state.message &&
            <div className="col-12">
              <Message message={this.state.message} />
            </div>
          }

          <div className="row">
            <div className="col-3">
              <div className="form-group">
                <label>作业车组号</label>
                <TrainList />
              </div>
            </div>

            <div className="col-3">
              <div className="form-group">
                <label>申请单位</label>
                <DeptList />
              </div>
            </div>

            <div className="col-3">
              <div className="form-group">
                <label>申请作业时间</label>
                <input type="datetime-local" className="form-control" id="date_begin" />
              </div>
            </div>

            <div className="col-3">
              <div className="form-group">
                <label>申请作业时间</label>
                <input type="datetime-local" className="form-control" id="date_end" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <ReloadButton />

              <div className="btn-group pull-right">
                <button type="button" className="btn btn-outline-primary" onClick={this.submit}>
                  <i className="fa fa-fw fa-search"></i>
                  查询
                </button>

                <ExportFilter2Excel />
                {/* <ExportFilter2ExcelDownload /> */}

                <button type="button" className="btn btn-outline-dark" onClick={this.submit1}>
                  <i className="fa fa-fw fa-search"></i>
                  未完成申请单
                </button>

                <button type="button" className="btn btn-outline-info" onClick={this.listByUser}>
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
