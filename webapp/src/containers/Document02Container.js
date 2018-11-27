import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from '../component/Common'
import { GetLatestScheduleList, GetSchedule } from '../actions/Document02'
import { ScheduleItem, Document02SaveButton, Document02TableMaster } from '../components/Document02Component'

export class Document02SaveSchedule extends React.Component {
  constructor() {
    super()
    this.state = { list: [], item: {} }
  }

  componentDidMount() {
    GetLatestScheduleList()
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
      response.content.applicant = auth.name
      response.content.applicant_phone = auth.phone
      this.setState({ item: response.content })
    })
  }
}

export class Document02UploadScheduleContainer extends React.Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-upload" title="上传每日作业计划单" toolbar="Journal02Toolbar" />

          <div className="text-center">
            点击并选择或拖放文件至下方框内
          </div>

          <form action="./api/common/upload/document/02/schedule" className="dropzone mt-3" encType="multipart/form-data"></form>

          <div className="col mt-3">
            <button type="button" className="btn btn-outline-dark" onClick={this.get_list.bind(this)}>
              显示上传内容
            </button>
          </div>

          <table className="table mt-3">
            <thead className="thead-dark">
              <tr>
                <th>序号</th>
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
                this.state.list &&
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