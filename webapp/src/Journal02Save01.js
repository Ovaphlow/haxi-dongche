import axios from 'axios'
import React from 'react'
import moment from 'moment'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'
import Journal02Detail01 from './component/Journal02Detail01'
import {BackButton, TrainList, CarriageList } from './component/Common'

export default class Journal02Save01 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
    this.submit = this.submit.bind(this)
    this.save = this.save.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'

    document.getElementById('date').value = moment().format('YYYY-MM-DD')
    document.getElementById('dept').value = auth.dept
    document.getElementById('executor').value = auth.name

    let detail = JSON.parse(sessionStorage.getItem('journal02-detail'))
    if (detail.subject) {
      document.getElementById('subject').value = detail.subject
      document.getElementById('approval').value = detail.approval_sn
      document.getElementById('component.train-list').value = detail.train_sn
      document.getElementById('date').value = detail.date
    }
  }

  submit() {
    let body = {
      subject: document.getElementById('subject').value,
      approval_sn: document.getElementById('approval').value,
      train_sn: document.getElementById('component.train-list').value,
      date: document.getElementById('date').value,
      carriage: document.getElementById('component.carriage-list').value,
      carriage_subject: document.getElementById('carriage_subject').value,
      time_begin: document.getElementById('time_begin').value,
      time_end: document.getElementById('time_end').value,
      result: document.getElementById('result').value,
      report: document.getElementById('report').value,
      dept: document.getElementById('dept').value,
      executor: document.getElementById('executor').value,
      remark: document.getElementById('remark').value
    }
    axios({
      method: 'post',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
      data: body,
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      sessionStorage.setItem('journal02-detail', JSON.stringify(body))
      window.location.reload(true)
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  save() {
    axios({
      method: 'PUT',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
      data: {
        subject: document.getElementById('subject').value,
        approval_sn: document.getElementById('approval').value,
        train_sn: document.getElementById('component.train-list').value,
        date: document.getElementById('date').value,
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      sessionStorage.removeItem('journal02-detail')
      window.location.href = './#/journal.02-verify.leader'
    })
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-archive" title="作业完成销记" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body row">
                  <div className="col-12">
                    <p className="lead">动车组一般部件普查记录单</p>
                  </div>

                  <div className="col-6">
                    <div className="form-group">
                      <label>普查项目</label>
                      <input type="text" className="form-control" id="subject" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>批准文件号</label>
                      <input type="text" className="form-control" id="approval" />
                    </div>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-6">
                    <div className="form-group">
                      <label>实施普查车组</label>
                      <TrainList />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>实施普查日期</label>
                      <input type="date" className="form-control" id="date" />
                    </div>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-12"></div>

                  <div className="col-4 form-group">
                    <label>实施普查的车厢号</label>
                    <CarriageList />
                  </div>

                  <div className="col-8 form-group">
                    <label>具体项点</label>
                    <input type="text" className="form-control form-control-sm" id="carriage_subject" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-4 form-group">
                    <label>开工时间 (格式：12:34:56 或 123456)</label>
                    <input type="text" className="form-control form-control-sm" id="time_begin" />
                  </div>
                  <div className="col-4 form-group">
                    <label>完工时间 (格式：12:34:56 或 123456)</label>
                    <input type="text" className="form-control form-control-sm" id="time_end" />
                  </div>
                  <div className="col-4 form-group">
                    <label>检查结果</label>
                    <select className="form-control form-control-sm" id="result">
                      <option value="良好">良好</option>
                      <option value="异常">异常</option>
                    </select>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-12 form-group">
                    <label>故障及处理情况</label>
                    <input type="text" className="form-control form-control-sm" id="report" />
                  </div>

                  <div className="col-6 form-group">
                    <label>实施单位</label>
                    <input type="text" readOnly className="form-control form-control-sm" id="dept" />
                  </div>
                  <div className="col-6 form-group">
                    <label>实施者</label>
                    <input type="text" className="form-control form-control-sm" id="executor" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-12 form-group">
                    <label>备注</label>
                    <textarea rows="2" className="form-control form-control-sm" id="remark"></textarea>
                  </div>
                  <div className="col-12">
                    <BackButton />
                    <div className="btn-group pull-right">
                      <button type="button" className="btn btn-secondary" onClick={this.submit}>
                        <i className="fa fa-fw fa-plus"></i>
                        新增记录
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row"><br /></div>

          <Journal02Detail01 />

          <div className="col-12">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={this.save}>
                <i className="fa fa-fw fa-check-square-o"></i>
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
