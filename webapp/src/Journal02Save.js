import axios from 'axios'
import React from 'react'
import moment from 'moment'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import Journal02Master from './component/Journal02Master'
import { Journal02Detail01, Journal02Detail02, Journal02Detail03, Journal02Detail04 } from './component/Journal02Detail'
import { BackButton, TrainList, CarriageList } from './component/Common'

export class Journal02Save04 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', trainList: [] }
    this.submit = this.submit.bind(this)
    this.save = this.save.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'

    document.getElementById('date').value = moment().format('YYYY-MM-DD')
    document.getElementById('dept').value = auth.dept
    document.getElementById('operator').value = auth.name

    let detail = JSON.parse(sessionStorage.getItem('journal02-detail'))
    if (detail.subject) {
      document.getElementById('subject').value = detail.subject
      document.getElementById('software_version_new').value = detail.software_version_new
      document.getElementById('software_version_old').value = detail.software_version_old
      document.getElementById('approval_sn').value = detail.approval_sn
      document.getElementById('component.train-list').value = detail.train_sn
      document.getElementById('date').value = detail.date
    }
  }

  submit() {
    let body = {
      subject: document.getElementById('subject').value,
      software_version_new: document.getElementById('software_version_new').value,
      software_version_old: document.getElementById('software_version_old').value,
      approval_sn: document.getElementById('approval_sn').value,
      train: document.getElementById('component.train-list').value,
      date: document.getElementById('date').value,
      carriage: document.getElementById('component.carriage-list').value,
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
        train: document.getElementById('component.train-list').value,
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
                  <TrainList />
                </div>

                <div className="col-6 form-group">
                  <label>实施改造日期</label>
                  <input type="date" className="form-control" id="date" />
                </div>

                <div className="clearfix"></div>

                <div className="col-4 form-group">
                  <label>实施改造的车厢号</label>
                  <CarriageList />
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

          <div className="col-12"><br /><br /></div>

          <Journal02Detail04 />

          <div className="col-12">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={this.save}>
                <i className=" fa fa-fw fa-check-square-o"></i>
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export class Journal02Save03 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', trainList: [] }
    this.save = this.save.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'

    document.getElementById('date').value = moment().format('YYYY-MM-DD')
    document.getElementById('operator').value = auth.name
  }

  submit() {
    axios({
      method: 'post',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/03/',
      data: {
        name: document.getElementById('name').value,
        train: document.getElementById('component.train-list').value,
        carriage: document.getElementById("component.carriage-list").value,
        position: document.getElementById('position').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        production_date: document.getElementById('production_date').value,
        reason: document.getElementById('reason').value,
        p_gywj: document.getElementById('p_gywj').value,
        p_ljbs: document.getElementById('p_ljbs').value,
        component_sn_old: document.getElementById('component_sn_old').value,
        component_sn_new: document.getElementById('component_sn_new').value,
        p_bjaz: document.getElementById('p_bjaz').value,
        operator: document.getElementById('operator').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      window.location.reload(true)
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  save() {
    window.location.href = './#/journal.02-verify.leader'
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
                  <p className="lead">动车组关键配件更换记录表</p>
                </div>

                <div className="form-group col-4">
                  <label>部件名称</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group col-2">
                  <label>车组</label>
                  <TrainList />
                </div>
                <div className="form-group col-2">
                  <label>车号</label>
                  <CarriageList />
                </div>
                <div className="form-group col-4">
                  <label>位置</label>
                  <input type="text" className="form-control" id="position" />
                </div>

                <div className="clearfix"></div>

                <div className="form-group col-4">
                  <label>更换日期</label>
                  <input type="date" className="form-control" id="date" />
                </div>
                <div className="form-group col-4">
                  <label>更换时间 (格式：12:34:56 或 123456)</label>
                  <input type="text" className="form-control" id="time" />
                </div>
                <div className="form-group col-4">
                  <label>生产日期</label>
                  <input type="text" className="form-control" id="production_date" />
                </div>

                <div className="clearfix"></div>

                <div className="form-group col-12">
                  <label>更换原因</label>
                  <input type="text" className="form-control" id="reason" />
                </div>

                <div className="clearflx"></div>

                <div className="form-group col-3">
                  <label>工艺文件及各步骤</label>
                  <select className="form-control" id="p_gywj">
                    <option value="是">已阅读并掌握</option>
                    <option value="否">未阅读并掌握</option>
                  </select>
                </div>
                <div className="form-group col-3">
                  <label>力矩扳手</label>
                  <select className="form-control" id="p_ljbs">
                    <option value="是">已校验</option>
                    <option value="否">未校验</option>
                  </select>
                </div>
                <div className="col-3 form-group">
                  <label>换下部件序列号</label>
                  <input type="text" className="form-control" id="component_sn_old" />
                </div>
                <div className="col-3 form-group">
                  <label>换上部件序列号</label>
                  <input type="text" className="form-control" id="component_sn_new" />
                </div>

                <div className="clearfix"></div>

                <div className="col-6 form-group">
                  <label>部件、螺栓力矩、防松标记</label>
                  <select className="form-control" id="p_bjaz">
                    <option value="是">部件安装良好，螺栓力矩已紧固，放松标记已涂打</option>
                    <option value="否">否</option>
                  </select>
                </div>
                <div className="col-6 form-group">
                  <label>作业者</label>
                  <input type="text" className="form-control" id="operator" />
                </div>

                <div className="col-12">
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

          <div className="row"><br /></div>

          <Journal02Detail03 />

          <div className="col-12">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary pull-right" onClick={this.save}>
                <i className="fa fa-fw fa-check-square-o"></i>
                完成
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export class Journal02Save02 extends React.Component {
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
    document.getElementById('operator').value = auth.name
  }

  submit() {
    axios({
      method: 'post',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/',
      data: {
        name: document.getElementById('name').value,
        train: document.getElementById('component.train-list').value,
        carriage: document.getElementById('component.carriage-list').value,
        position: document.getElementById('position').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        reason: document.getElementById('reason').value,
        p_gywj: document.getElementById('p_gywj').value,
        p_ljbs: document.getElementById('p_ljbs').value,
        component_sn_old: document.getElementById('component_sn_old').value,
        component_sn_new: document.getElementById('component_sn_new').value,
        p_bjaz: document.getElementById('p_bjaz').value,
        operator: document.getElementById('operator').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      window.location.reload(true)
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  save() {
    window.location.href = './#/journal.02-verify.leader'
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
                  <p className="lead">动车组一般配件更换记录表</p>
                </div>

                <div className="form-group col-4">
                  <label>部件名称</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group col-2">
                  <label>车组</label>
                  <TrainList />
                </div>
                <div className="form-group col-2">
                  <label>车号</label>
                  <CarriageList />
                </div>
                <div className="form-group col-4">
                  <label>位置</label>
                  <input type="text" className="form-control" id="position" />
                </div>

                <div className="clearfix"></div>

                <div className="form-group col-3">
                  <label>日期</label>
                  <input type="date" className="form-control" id="date" />
                </div>
                <div className="form-group col-3">
                  <label>时间 (格式：12:34:56 或 123456)</label>
                  <input type="text" className="form-control" id="time" />
                </div>
                <div className="form-group col-6">
                  <label>更换原因</label>
                  <input type="text" className="form-control" id="reason" />
                </div>

                <div className="clearflx"></div>

                <div className="form-group col-3">
                  <label>工艺文件及各步骤</label>
                  <select className="form-control" id="p_gywj">
                    <option value="是">已阅读并掌握</option>
                    <option value="否">未阅读并掌握</option>
                  </select>
                </div>
                <div className="form-group col-3">
                  <label>力矩扳手</label>
                  <select className="form-control" id="p_ljbs">
                    <option value="是">已校验</option>
                    <option value="否">未校验</option>
                  </select>
                </div>
                <div className="col-3 form-group">
                  <label>换下部件序列号</label>
                  <input type="text" className="form-control" id="component_sn_old" />
                </div>
                <div className="col-3 form-group">
                  <label>换上部件序列号</label>
                  <input type="text" className="form-control" id="component_sn_new" />
                </div>

                <div className="clearfix"></div>

                <div className="col-6 form-group">
                  <label>部件、螺栓力矩、防松标记</label>
                  <select className="form-control" id="p_bjaz">
                    <option value="是">部件安装良好，螺栓力矩已紧固，放松标记已涂打</option>
                    <option value="否">否</option>
                  </select>
                </div>
                <div className="col-6 form-group">
                  <label>作业者</label>
                  <input type="text" className="form-control" id="operator" />
                </div>
                <div className="clearfix"></div>

                <div className="col-12">
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

          <div className="row"><br /></div>

          <Journal02Detail02 />

          <div className="col-12">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={this.save}>
                <i className="fa fa-fw fa-check-square-o"></i>
                完成
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export class Journal02Save01 extends React.Component {
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

export class Journal02Update extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', trainList: [], journal: {} }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'
    this.setState({ auth: auth })
    fetch('./api/journal02/' + sessionStorage.getItem('journal02'), {
      method: 'get',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    })
    .then(res => res.json())
    .then(response => this.setState({ journal: response.content }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="单据" />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-edit" title="修改申请" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger" role="alert" id="anchor-alert">
                {this.state.message}
              </div>
            </div>
          }

          <Journal02Master auth={this.state.auth} mode="update" />
        </div>
      </div>
    )
  }
}

export class Journal02Save extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-plus" title="新增申请" toolbar="Journal02Toolbar" />

          <Journal02Master mode="save" />
        </div>
      </div>
    )
  }
}
