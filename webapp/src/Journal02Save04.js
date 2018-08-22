import axios from 'axios'
import React from 'react'
import moment from 'moment'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'
import Journal02Detail04 from './component/Journal02Detail04'

export default class Journal02Save04 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', trainList: [] }
    this.submit = this.submit.bind(this)
    this.save = this.save.bind(this)
    this.back = this.back.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login.html'

    document.getElementById('date').value = moment().format('YYYY-MM-DD')
    document.getElementById('dept').value = auth.dept
    document.getElementById('operator').value = auth.name

    axios({
      method: 'get',
      url: './api/common/train',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ trainList: response.data.content })
    }).catch(err => this.setState({ message: '服务器通信异常' }))

    let detail = JSON.parse(sessionStorage.getItem('journal02-detail'))
    if (detail.subject) {
      document.getElementById('subject').value = detail.subject
      document.getElementById('software_version_new').value = detail.software_version_new
      document.getElementById('software_version_old').value = detail.software_version_old
      document.getElementById('approval_sn').value = detail.approval_sn
      document.getElementById('train').value = detail.train_sn
      document.getElementById('date').value = detail.date
    }
  }

  submit() {
    let body = {
      subject: document.getElementById('subject').value,
      software_version_new: document.getElementById('software_version_new').value,
      software_version_old: document.getElementById('software_version_old').value,
      approval_sn: document.getElementById('approval_sn').value,
      train: document.getElementById('train').value,
      date: document.getElementById('date').value,
      carriage: document.getElementById('carriage').value,
      time_begin: document.getElementById('time_begin').value,
      time_end: document.getElementById('time_end').value,
      dept: document.getElementById('dept').value,
      operator: document.getElementById('operator').value,
      remark: document.getElementById('remark').value
    }
    axios({
      method: 'post',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/',
      data: body,
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      sessionStorage.setItem('journal02-detail', JSON.stringify(body))
      window.location.reload(true)
    })
  }

  save() {
    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/',
      data: {
        subject: document.getElementById('subject').value,
        software_version_new: document.getElementById('software_version_new').value,
        software_version_old: document.getElementById('software_version_old').value,
        approval_sn: document.getElementById('approval_sn').value,
        train: document.getElementById('train').value,
        date: document.getElementById('date').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      sessionStorage.removeItem('journal02-detail')
      window.location.href = './#/journal.02-verify.leader'
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  back() {
    window.history.go(-1)
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

          <div className="col-12">
            <div className="card">
              <div className="card-body row">
                <div className="col-12">
                  <p className="lead">动车组加装改造（软件升级）记录单</p>
                </div>

                <div className="col-12 form-group">
                  <label>实施改造项目（升级系统）</label>
                  <input type="text" className="form-control" id="subject" />
                </div>

                <div className="col-4 form-group">
                  <label>软件版本号（新）</label>
                  <input type="text" className="form-control" id="software_version_new" />
                </div>

                <div className="col-4 form-group">
                  <label>软件版本号（旧）</label>
                  <input type="text" className="form-control" id="software_version_old" />
                </div>

                <div className="col-4 form-group">
                  <label>批准文件号</label>
                  <input type="text" className="form-control" id="approval_sn" />
                </div>

                <div className="clearfix"></div>

                <div className="col-6 form-group">
                  <label>实施改造车组</label>
                  <select className="form-control" id="train">
                    {this.state.trainList.map(item =>
                      <option value={item.name} key={item.id}>{item.name} ({item.model})</option>
                    )}
                  </select>
                </div>

                <div className="col-6 form-group">
                  <label>实施改造日期</label>
                  <input type="date" className="form-control" id="date" />
                </div>

                <div className="clearfix"></div>

                <div className="col-4 form-group">
                  <label>实施改造的车厢号</label>
                  <select className="form-control form-control-sm" id="carriage">
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                  </select>
                </div>

                <div className="clearfix"></div>

                <div className="col-4 form-group">
                  <label>开工时间</label>
                  <input type="text" className="form-control form-control-sm" id="time_begin" />
                </div>
                <div className="col-4 form-group">
                  <label>完工时间</label>
                  <input type="text" className="form-control form-control-sm" id="time_end" />
                </div>

                <div className="clearfix"></div>

                <div className="col-6 form-group">
                  <label>实施单位</label>
                  <input type="text" readOnly className="form-control form-control-sm" id="dept" />
                </div>
                <div className="col-6 form-group">
                  <label>实施者</label>
                  <input type="text" className="form-control form-control-sm" id="operator" />
                </div>

                <div className="clearfix"></div>

                <div className="col-12 form-group">
                  <label>备注</label>
                  <textarea rows="2" className="form-control form-control-sm" id="remark"></textarea>
                </div>

                <div className="col-12">
                  <button type="button" className="btn btn-secondary" onClick={this.submit}>
                    <i className="fa fa-fw fa-plus"></i> 新增记录
                  </button>
                  <div className="btn-group pull-right">
                    <button type="button" className="btn btn-secondary" onClick={this.back}>
                      <i className=" fa fa-fw fa-arrow-left"></i> 返回
                    </button>
                    <button type="button" className="btn btn-primary" onClick={this.save}>
                      <i className=" fa fa-fw fa-check-square-o"></i> 保存
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row"><br /><br /></div>

          <Journal02Detail04 />
        </div>
      </div>
    )
  }
}
