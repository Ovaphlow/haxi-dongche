import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from '../component/Common'
import { GetLatestScheduleList, GetLatestScheduleListByDept, GetSchedule } from '../actions/Document02'
import {
  ScheduleItem, Document02SaveButton, Document02TableMaster,
  StatsTrain, StatsSchedule
} from '../components/Document02Component'
import { ReloadButton } from '../component/Common'

export class Document02StatsIndex extends React.Component {
  constructor() {
    super()
    this.state = { item: '' }
  }
  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-pie-chart" title="统计" toolbar="Journal02Toolbar" />

          <select value={this.state.item} className="form-control" id="item" onChange={this.change.bind(this)}>
            <option value="">选择统计项目</option>
            <option value="train">作业车组数据统计</option>
            <option value="schedule">计划内/外作业统计</option>
          </select>

          {this.state.item && this.subPage()}
        </div>
      </div>
    )
  }

  subPage() {
    if (!!!document.getElementById('item').value) return
    if (this.state.item === 'train') return <StatsTrain />
    else if (this.state.item === 'schedule') return <StatsSchedule />
  }

  change() {
    if (!!!document.getElementById('item').value) return
    this.setState({ item: document.getElementById('item').value })
  }
}

export class Document02SaveSchedule extends React.Component {
  constructor() {
    super()
    this.state = { list: [], item: {} }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return
    GetLatestScheduleListByDept(auth.dept)
    .then(response => {
      this.setState({ list: response.content })
    })
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-plus" title="新增计划内作业申请" toolbar="Journal02Toolbar" />

          <div className="col">
            <select className="form-control" id="schedule-list">
              {
                this.state.list &&
                this.state.list.map(item =>
                  <option value={item.id} key={item.id}>
                    {item.train} {item.content} {item.content_detail}
                  </option>
                )
              }
            </select>

            <div className="mt-3 mb-3 text-center">
              <button type="button" className="btn btn-primary" onClick={this.submit.bind(this)}>
                <i className="fa fa-fw fa-check-square-o"></i>
                选择
              </button>
            </div>
          </div>

          {
            this.state.item &&
            <Document02TableMaster item={this.state.item}/>
          }

          <div className="pull-right">
            <Document02SaveButton />
          </div>
        </div>
      </div>
    )
  }

  submit() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return
    GetSchedule(document.getElementById('schedule-list').value)
    .then(response => {
      // response.content.applicant = auth.name
      // response.content.applicant_phone = auth.phone
      this.setState({ item: response.content })
    })
  }
}

export class Document02UploadScheduleContainer extends React.Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return
    if (auth.dept !== '技术诊断组') {
      alert('当前登录用户没有对应权限')
      window.location = './#/journal.02'
      return
    }
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-upload" title="上传每日作业计划单" toolbar="Journal02Toolbar" />

          <div>
            <ReloadButton />
            <span className="pull-right text-danger">
              点击并选择或拖放文件至下方框内，如有异常请刷新页面后重试。
            </span>
          </div>

          <form action="./api/common/upload/document/02/schedule" method="POST" className="dropzone mt-3" encType="multipart/form-data"></form>

          <div className="col mt-3">
            <button type="button" className="btn btn-outline-dark" onClick={this.get_list.bind(this)}>
              显示上传内容
            </button>
          </div>

          <table className="table mt-3">
            <thead className="thead-dark">
              <tr>
                <th>序号</th>
                <th>白/夜班</th>
                <th>车组号</th>
                <th>作业类型</th>
                <th>作业内容</th>
                <th>起止时间</th>
                <th>部门</th>
                <th>作业负责人</th>
                <th>联系电话</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.list.length > 0 &&
                this.state.list.map(item => <ScheduleItem key={item.id} item={item} />)
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  get_list() {
    GetLatestScheduleList()
    .then(response => {
      this.setState({ list: response.content })
    })
  }
}