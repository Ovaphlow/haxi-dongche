import axios from 'axios'
import React from 'react'
import moment from 'moment'

import {
    PageTitle, PageTitle2, Sidebar, CarriageSelecter,
    Message, BackButton, TrainList
} from './component/Common'
import Journal02Master from './component/Journal02Master'
import { Journal02Detail01, Journal02Detail02, Journal02Detail03, Journal02Detail04 } from './component/Journal02Detail'

export class Journal02Save04 extends React.Component {
  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location = './#/login'

    document.getElementById('date').value = moment().format('YYYY-MM-DD')
    document.getElementById('dept').value = auth.dept
    document.getElementById('operator').value = auth.name

    let detail = JSON.parse(sessionStorage.getItem('journal02-detail'))
    if (detail.subject) {
      document.getElementById('subject').value = detail.subject
      document.getElementById('software_version_new').value = detail.software_version_new
      document.getElementById('software_version_old').value = detail.software_version_old
      document.getElementById('approval_sn').value = detail.approval_sn
      document.getElementById('train').value = detail.train_sn
      document.getElementById('date').value = detail.date
    }

    fetch(`/api/journal02/${sessionStorage.getItem('journal02')}`)
    .then(res => res.json())
    .then(response => {
      document.getElementById('train').value = response.content.group_sn
      document.getElementById('date').value = response.content.date_begin
      document.getElementById('time_begin').value = response.content.time_begin
      document.getElementById('time_end').value = response.content.time_end
    })
    .catch(err => window.console && console.error(err))
  }

  submit() {
    if (
        !!!document.getElementById('subject').value ||
        !!!document.getElementById('software_version_new').value ||
        !!!document.getElementById('software_version_old').value ||
        !!!document.getElementById('approval_sn').value ||
        !!!document.getElementById('train').value ||
        !!!document.getElementById('date').value ||
        !!!document.getElementById('time_begin').value ||
        !!!document.getElementById('time_end').value ||
        !!!document.getElementById('operator').value ||
        !!!document.getElementById('remark').value
    ) {
      alert('请完整填写记录单')
      return
    }

    let body = {
      uuid: '',
      subject: document.getElementById('subject').value,
      software_version_new: document.getElementById('software_version_new').value,
      software_version_old: document.getElementById('software_version_old').value,
      approval_sn: document.getElementById('approval_sn').value,
      train: document.getElementById('train').value,
      date: document.getElementById('date').value,
      // carriage: document.getElementById('component.carriage-list').value,
      carriage: '',
      time_begin: document.getElementById('time_begin').value,
      time_end: document.getElementById('time_end').value,
      dept: document.getElementById('dept').value,
      operator: document.getElementById('operator').value,
      remark: document.getElementById('remark').value,
      watcher: '',
      watcher_group: '',
      qc: '',
      carriage_01: document.getElementById('component.carriage-01').checked,
      carriage_02: document.getElementById('component.carriage-02').checked,
      carriage_03: document.getElementById('component.carriage-03').checked,
      carriage_04: document.getElementById('component.carriage-04').checked,
      carriage_05: document.getElementById('component.carriage-05').checked,
      carriage_06: document.getElementById('component.carriage-06').checked,
      carriage_07: document.getElementById('component.carriage-07').checked,
      carriage_08: document.getElementById('component.carriage-08').checked
    }
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/04/`, {
      method: 'post',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message || '服务器错误')
        return
      }
      window.location.reload(true)
    })
    // .catch(err => window.console && console.error(err))
    // axios({
    //   method: 'post',
    //   url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/',
    //   data: body,
    //   responseType: 'json'
    // }).then(response => {
    //   if (response.data.message) {
    //     this.setState({ message: response.data.message })
    //     return false
    //   }
    //   sessionStorage.setItem('journal02-detail', JSON.stringify(body))
    //   window.location.reload(true)
    // })
  }

  // save() {
  //   axios({
  //     method: 'put',
  //     url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/',
  //     data: {
  //       subject: document.getElementById('subject').value,
  //       software_version_new: document.getElementById('software_version_new').value,
  //       software_version_old: document.getElementById('software_version_old').value,
  //       approval_sn: document.getElementById('approval_sn').value,
  //       train: document.getElementById('component.train-list').value,
  //       date: document.getElementById('date').value
  //     },
  //     responseType: 'json'
  //   }).then(response => {
  //     if (response.data.message) {
  //       this.setState({ message: response.data.message })
  //       return false
  //     }
  //     sessionStorage.removeItem('journal02-detail')
  //     window.location.href = './#/journal.02-verify.leader'
  //   }).catch(err => this.setState({ message: '服务器通信异常' }))
  // }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-archive" title="作业完成销记" toolbar="Journal02Toolbar" />

          <div className="col-12">
            <div className="card">
              <div className="card-body row">
                <div className="col-12">
                  <p className="lead">动车组加装改造（软件升级）记录单</p>
                </div>

                <div className="col-3 form-group">
                  <label>实施改造项目（升级系统）</label>
                  <input type="text" className="form-control form-control-sm" id="subject" />
                </div>

                <div className="col-3 form-group">
                  <label>软件版本号（新）</label>
                  <input type="text" className="form-control form-control-sm" id="software_version_new" />
                </div>

                <div className="col-3 form-group">
                  <label>软件版本号（旧）</label>
                  <input type="text" className="form-control form-control-sm" id="software_version_old" />
                </div>

                <div className="col-3 form-group">
                  <label>批准文件号</label>
                  <input type="text" className="form-control form-control-sm" id="approval_sn" />
                </div>

                <div className="clearfix"></div>

                <div className="col-3 form-group">
                  <label>实施改造车组</label>
                  <input type="text" className="form-control form-control-sm" id="train" />
                </div>
                <div className="col-3 form-group">
                  <label>实施改造日期</label>
                  <input type="date" className="form-control form-control-sm" id="date" />
                </div>
                <div className="col-6 form-group">
                  <label>实施改造的车厢号</label>
                  <CarriageSelecter />
                </div>

                <div className="clearfix"></div>

                <div className="col-3 form-group">
                  <label>开工时间</label>
                  <input type="time" className="form-control form-control-sm" id="time_begin" />
                </div>
                <div className="col-3 form-group">
                  <label>完工时间</label>
                  <input type="time" className="form-control form-control-sm" id="time_end" />
                </div>
                <div className="col-3 form-group">
                  <label>实施单位</label>
                  <input type="text" readOnly className="form-control form-control-sm" id="dept" />
                </div>
                <div className="col-3 form-group">
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
                    <button type="button" className="btn btn-secondary" onClick={this.submit.bind(this)}>
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

          {/* <div className="col-12">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={this.save.bind(this)}>
                <i className=" fa fa-fw fa-check-square-o"></i>
                保存
              </button>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}

export class Journal02Save03 extends React.Component {
  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location = './#/login'

    document.getElementById('date').value = moment().format('YYYY-MM-DD')
    document.getElementById('operator').value = auth.name

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}`)
    .then(res => res.json())
    .then(response => {
      document.getElementById('train').value = response.content.group_sn
      document.getElementById('date').value = response.content.date_begin
      document.getElementById('time').value = response.content.time_begin
    })
  }

  submit() {
    if (
        !!!document.getElementById('name').value ||
        !!!document.getElementById('train').value ||
        !!!document.getElementById('position').value ||
        !!!document.getElementById('date').value ||
        !!!document.getElementById('time').value ||
        !!!document.getElementById('production_date').value ||
        !!!document.getElementById('reason').value ||
        !!!document.getElementById('component_sn_old').value ||
        !!!document.getElementById('component_sn_new').value ||
        !!!document.getElementById('operator').value
    ) {
      alert('请完整填写记录表')
      return
    }
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/03/`, {
      method: 'post',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        uuid: '',
        name: document.getElementById('name').value,
        train: document.getElementById('train').value,
        // carriage: document.getElementById("component.carriage-list").value,
        carriage: '',
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
        operator: document.getElementById('operator').value,
        leader: '',
        p_bjgnsy: '',
        qc: '',
        duty_officer: '',
        carriage_01: document.getElementById('component.carriage-01').checked,
        carriage_02: document.getElementById('component.carriage-02').checked,
        carriage_03: document.getElementById('component.carriage-03').checked,
        carriage_04: document.getElementById('component.carriage-04').checked,
        carriage_05: document.getElementById('component.carriage-05').checked,
        carriage_06: document.getElementById('component.carriage-06').checked,
        carriage_07: document.getElementById('component.carriage-07').checked,
        carriage_08: document.getElementById('component.carriage-08').checked
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message || '服务器错误')
        return
      }
      window.location.reload(true)
    })
    .catch(err => window.console && console.error(err))
    // axios({
    //   method: 'post',
    //   url: './api/journal02/' + sessionStorage.getItem('journal02') + '/03/',
    //   data: {
    //     name: document.getElementById('name').value,
    //     train: document.getElementById('train').value,
    //     // carriage: document.getElementById("component.carriage-list").value,
    //     carriage: '',
    //     position: document.getElementById('position').value,
    //     date: document.getElementById('date').value,
    //     time: document.getElementById('time').value,
    //     production_date: document.getElementById('production_date').value,
    //     reason: document.getElementById('reason').value,
    //     p_gywj: document.getElementById('p_gywj').value,
    //     p_ljbs: document.getElementById('p_ljbs').value,
    //     component_sn_old: document.getElementById('component_sn_old').value,
    //     component_sn_new: document.getElementById('component_sn_new').value,
    //     p_bjaz: document.getElementById('p_bjaz').value,
    //     operator: document.getElementById('operator').value
    //   },
    //   responseType: 'json'
    // }).then(response => {
    //   if (response.data.message) {
    //     this.setState({ message: response.data.message })
    //     return false
    //   }
    //   window.location.reload(true)
    // }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  save() {
    window.location = './#/journal.02-verify.leader'
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-archive" title="作业完成销记" toolbar="Journal02Toolbar" />

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
                  <input type="text" className="form-control" id="train" />
                </div>
                <div className="form-group col-6">
                  <label>车号</label>
                  <CarriageSelecter />
                </div>

                <div className="form-group col-3">
                  <label>位置</label>
                  <input type="text" className="form-control" id="position" />
                </div>
                <div className="form-group col-3">
                  <label>更换日期</label>
                  <input type="date" className="form-control" id="date" />
                </div>
                <div className="form-group col-3">
                  <label>更换时间</label>
                  <input type="time" className="form-control" id="time" />
                </div>
                <div className="form-group col-3">
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
                  <BackButton />
                  <div className="btn-group pull-right">
                    <button type="button" className="btn btn-secondary" onClick={this.submit.bind(this)}>
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
              <button type="button" className="btn btn-primary pull-right" onClick={this.save.bind(this)}>
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
  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location = './#/login'
    document.getElementById('date').value = moment().format('YYYY-MM-DD')
    document.getElementById('operator').value = auth.name

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}`)
    .then(res => res.json())
    .then(response => {
      document.getElementById('train').value = response.content.group_sn
      document.getElementById('date').value = response.content.date_begin
      document.getElementById('time').value = response.content.time_begin
    })
    .catch(err => window.console && console.error(err))
  }

  submit() {
    if (
        !!!document.getElementById('name').value ||
        !!!document.getElementById('train').value ||
        !!!document.getElementById('position').value ||
        !!!document.getElementById('date').value ||
        !!!document.getElementById('time').value ||
        !!!document.getElementById('reason').value ||
        !!!document.getElementById('component_sn_old').value ||
        !!!document.getElementById('component_sn_new').value ||
        !!!document.getElementById('operator').value
    ) {
      alert('请完整填写记录表信息')
      return
    }
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/02/`, {
      method: 'post',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        uuid: '',
        master_id: sessionStorage.getItem('journal02'),
        name: document.getElementById('name').value,
        train: document.getElementById('train').value,
        // carriage: document.getElementById('component.carriage-list').value,
        carriage: '',
        position: document.getElementById('position').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        reason: document.getElementById('reason').value,
        p_gywj: document.getElementById('p_gywj').value,
        p_ljbs: document.getElementById('p_ljbs').value,
        component_sn_old: document.getElementById('component_sn_old').value,
        component_sn_new: document.getElementById('component_sn_new').value,
        p_bjaz: document.getElementById('p_bjaz').value,
        operator: document.getElementById('operator').value,
        leader: '',
        p_bjgnsy: '',
        qc: '',
        duty_officer: '',
        carriage_01: document.getElementById('component.carriage-01').checked,
        carriage_02: document.getElementById('component.carriage-02').checked,
        carriage_03: document.getElementById('component.carriage-03').checked,
        carriage_04: document.getElementById('component.carriage-04').checked,
        carriage_05: document.getElementById('component.carriage-05').checked,
        carriage_06: document.getElementById('component.carriage-06').checked,
        carriage_07: document.getElementById('component.carriage-07').checked,
        carriage_08: document.getElementById('component.carriage-08').checked
      })
    })
    .then(res => res.json())
    .then(response => {
      console.info(response)
      window.location.reload(true)
    })
    .catch(err => window.console && console.error(err))
    // axios({
    //   method: 'post',
    //   url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/',
    //   data: {
    //     name: document.getElementById('name').value,
    //     train: document.getElementById('component.train-list').value,
    //     carriage: document.getElementById('component.carriage-list').value,
    //     position: document.getElementById('position').value,
    //     date: document.getElementById('date').value,
    //     time: document.getElementById('time').value,
    //     reason: document.getElementById('reason').value,
    //     p_gywj: document.getElementById('p_gywj').value,
    //     p_ljbs: document.getElementById('p_ljbs').value,
    //     component_sn_old: document.getElementById('component_sn_old').value,
    //     component_sn_new: document.getElementById('component_sn_new').value,
    //     p_bjaz: document.getElementById('p_bjaz').value,
    //     operator: document.getElementById('operator').value
    //   },
    //   responseType: 'json'
    // }).then(response => {
    //   if (response.data.message) {
    //     this.setState({ message: response.data.message })
    //     return false
    //   }
    //   window.location.reload(true)
    // }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  save() {
    window.location = './#/journal.02-verify.leader'
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-archive" title="作业完成销记" toolbar="Journal02Toolbar" />

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
                  <input type="text" className="form-control" id="train" />
                </div>
                <div className="form-group col-6">
                  <label>车号</label>
                  <CarriageSelecter />
                  {/* <CarriageList /> */}
                </div>

                <div className="form-group col-3">
                  <label>位置</label>
                  <input type="text" className="form-control" id="position" />
                </div>
                <div className="form-group col-3">
                  <label>日期</label>
                  <input type="date" className="form-control" id="date" />
                </div>
                <div className="form-group col-3">
                  <label>时间</label>
                  <input type="time" className="form-control" id="time" />
                </div>
                <div className="form-group col-3">
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
                  <BackButton />
                  <div className="btn-group pull-right">
                    <button type="button" className="btn btn-secondary" onClick={this.submit.bind(this)}>
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
              <button type="button" className="btn btn-primary" onClick={this.save.bind(this)}>
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
    this.state = { message: '', master: {} }
    this.submit = this.submit.bind(this)
    this.save = this.save.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location = './#/login'

    document.getElementById('date').value = moment().format('YYYY-MM-DD')
    document.getElementById('dept').value = auth.dept
    document.getElementById('executor').value = auth.name

    let detail = JSON.parse(sessionStorage.getItem('journal02-detail'))
    if (detail.subject) {
      document.getElementById('subject').value = detail.subject
      document.getElementById('approval').value = detail.approval_sn
      document.getElementById('train').value = detail.train_sn
      document.getElementById('date').value = detail.date
    }

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}`)
    .then(res => res.json())
    .then(response => {
      document.getElementById('train').value = response.content.group_sn
      document.getElementById('date').value = response.content.date_begin
      document.getElementById('time_begin').value = response.content.time_begin
      document.getElementById('time_end').value = response.content.time_end
    })
  }

  submit() {
    if (
        !!!document.getElementById('subject').value ||
        !!!document.getElementById('approval').value ||
        !!!document.getElementById('train').value ||
        !!!document.getElementById('date').value ||
        !!!document.getElementById('carriage_subject').value ||
        !!!document.getElementById('time_begin').value ||
        !!!document.getElementById('time_end').value ||
        !!!document.getElementById('result').value ||
        !!!document.getElementById('report').value ||
        !!!document.getElementById('executor').value ||
        !!!document.getElementById('remark').value
    ) {
      alert('请完善记录单信息')
      return
    }
    let body = {
      subject: document.getElementById('subject').value,
      approval_sn: document.getElementById('approval').value,
      train_sn: document.getElementById('train').value,
      date: document.getElementById('date').value,
      carriage: '',
      carriage_subject: document.getElementById('carriage_subject').value,
      time_begin: document.getElementById('time_begin').value,
      time_end: document.getElementById('time_end').value,
      result: document.getElementById('result').value,
      report: document.getElementById('report').value,
      dept: document.getElementById('dept').value,
      executor: document.getElementById('executor').value,
      remark: document.getElementById('remark').value,
      carriage_01: document.getElementById('carriage-01').checked,
      carriage_02: document.getElementById('carriage-02').checked,
      carriage_03: document.getElementById('carriage-03').checked,
      carriage_04: document.getElementById('carriage-04').checked,
      carriage_05: document.getElementById('carriage-05').checked,
      carriage_06: document.getElementById('carriage-06').checked,
      carriage_07: document.getElementById('carriage-07').checked,
      carriage_08: document.getElementById('carriage-08').checked
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
        train_sn: document.getElementById('train').value,
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
              <Message message={this.state.message} />
            </div>
          }

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body row">
                  <div className="col-12">
                    <p className="lead">动车组一般部件普查记录单</p>
                  </div>

                  <div className="col-3">
                    <div className="form-group">
                      <label>普查项目</label>
                      <input type="text" className="form-control form-control-sm" id="subject" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label>批准文件号</label>
                      <input type="text" className="form-control form-control-sm" id="approval" />
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="form-group">
                      <label>实施普查车组</label>
                      <input type="text" className="form-control form-control-sm" id="train" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label>实施普查日期</label>
                      <input type="date" className="form-control form-control-sm" id="date" />
                    </div>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-6 form-group">
                    <label>实施普查的车厢号</label>
                    {/* <CarriageList /> */}
                    <br />
                    <div className="form-check form-check-inline">
                      <input type="checkbox" value="01" className="form-check-input" id="carriage-01" />
                      <label htmlFor="carriage-01" className="form-check-label">01</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input type="checkbox" value="02" className="form-check-input" id="carriage-02" />
                      <label htmlFor="carriage-02" className="form-check-label">02</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input type="checkbox" value="03" className="form-check-input" id="carriage-03" />
                      <label htmlFor="carriage-03" className="form-check-label">03</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input type="checkbox" value="04" className="form-check-input" id="carriage-04" />
                      <label htmlFor="carriage-04" className="form-check-label">04</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input type="checkbox" value="05" className="form-check-input" id="carriage-05" />
                      <label htmlFor="carriage-05" className="form-check-label">05</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input type="checkbox" value="06" className="form-check-input" id="carriage-06" />
                      <label htmlFor="carriage-06" className="form-check-label">06</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input type="checkbox" value="07" className="form-check-input" id="carriage-07" />
                      <label htmlFor="carriage-07" className="form-check-label">07</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input type="checkbox" value="08" className="form-check-input" id="carriage-08" />
                      <label htmlFor="carriage-08" className="form-check-label">08</label>
                    </div>
                  </div>

                  <div className="col-6 form-group">
                    <label>具体项点</label>
                    <input type="text" className="form-control form-control-sm" id="carriage_subject" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-4 form-group">
                    <label>开工时间</label>
                    <input type="time" className="form-control form-control-sm" id="time_begin" />
                  </div>
                  <div className="col-4 form-group">
                    <label>完工时间</label>
                    <input type="time" className="form-control form-control-sm" id="time_end" />
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
