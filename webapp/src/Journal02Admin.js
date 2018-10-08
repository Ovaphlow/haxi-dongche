import React from 'react'

import { BackButton, TrainList, Sidebar, PageTitle, PageTitle2 } from './component/Common'

class Detail04Update extends React.Component {
  handler() {
    console.info(1)
    fetch(`./api/journal02/detail/04/${sessionStorage.getItem('detail')}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
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
        watcher: document.getElementById('watcher').value,
        watcher_group: document.getElementById('watcher_group').value,
        qc: document.getElementById('qc').value,
        remark: document.getElementById('remark').value
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        window.alert(response.message)
        return
      }
      window.location.reload(true)
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.handler.bind(this)}>
        <i className="fa fa-fw fa-edit"></i>
        确定
      </button>
    )
  }
}

class Detail03Update extends React.Component {
  handler() {
    fetch(`./api/journal02/detail/03/${sessionStorage.getItem('detail')}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf8'
      },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        train: document.getElementById('train').value,
        carriage: document.getElementById('carriage').value,
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
        leader: document.getElementById('leader').value,
        p_bjgnsy: document.getElementById('p_bjgnsy').value,
        qc: document.getElementById('qc').value,
        duty_officer: document.getElementById('duty_officer').value
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) alert(response.message)
      else window.location.reload(true)
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.handler.bind(this)}>
        <i className="fa fa-fw fa-check-square-o"></i>
        确定
      </button>
    )
  }
}

class Detail02Update extends React.Component {
  handler() {
    fetch(`./api/journal02/detail/02/${sessionStorage.getItem('detail')}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf8'
      },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        train: document.getElementById('train').value,
        carriage: document.getElementById('carriage').value,
        position: document.getElementById('position').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        reason: document.getElementById('reason').value,
        p_ljbs: document.getElementById('p_ljbs').value,
        p_gywj: document.getElementById('p_gywj').value,
        component_sn_old: document.getElementById('component_sn_old').value,
        component_sn_new: document.getElementById('component_sn_new').value,
        p_bjaz: document.getElementById('p_bjaz').value,
        operator: document.getElementById('operator').value,
        leader: document.getElementById('leader').value,
        p_bjgnsy: document.getElementById('p_bjgnsy').value,
        qc: document.getElementById('qc').value,
        duty_officer: document.getElementById('duty_officer').value,
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) alert(response.message)
      else window.location.reload(true)
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.handler.bind(this)}>
        <i className="fa fa-fw fa-check-square-o"></i>
        确定
      </button>
    )
  }
}

class Detail01Update extends React.Component {
  handler() {
    let id = sessionStorage.getItem('detail')
    fetch(`./api/journal02/detail/01/${id}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf8'
      },
      body: JSON.stringify({
        subject: document.getElementById('subject').value,
        approval_sn: document.getElementById('approval_sn').value,
        train_sn: document.getElementById('train_sn').value,
        date: document.getElementById('date').value,
        carriage: document.getElementById('component.carriage-list').value,
        carriage_subject: document.getElementById('carriage_subject').value,
        time_begin: document.getElementById('time_begin').value,
        time_end: document.getElementById('time_end').value,
        result: document.getElementById('result').value,
        report: document.getElementById('report').value,
        dept: document.getElementById('dept').value,
        executor: document.getElementById('executor').value,
        watcher: document.getElementById('watcher').value,
        watcher_group: document.getElementById('watcher_group').value,
        qc: document.getElementById('qc').value,
        remark: document.getElementById('remark').value
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) alert(response.message)
      else window.location.reload(true)
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.handler.bind(this)}>
        <i className="fa fa-fw fa-check-square-o"></i>
        确定
      </button>
    )
  }
}

// 加装改造记录单
export class Journal02AdminDetail04 extends React.Component {
  constructor() {
    super()
    this.state = { detail04: {} }
  }
  
  componentDidMount() {
    fetch(`./api/journal02/detail/04/${sessionStorage.getItem('detail')}`)
    .then(res => res.json())
    .then(response => {
      this.setState({ detail04: response.content })
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-cog" title="编辑一体化作业申请单" toolbar="Journal02Toolbar" />

          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h5 className="mt-3 text-center">动车组关键配件更换记录表</h5>
              </div>

              <div className="row">
                <div className="col form-group">
                  <label>实施改造项目（升级系统）</label>
                  <input type="text" className="form-control form-control-sm" id="subject"
                      defaultValue={this.state.detail04.subject}
                  />
                </div>
                <div className="col form-group">
                  <label>软件版本号（新）</label>
                  <input type="text" className="form-control form-control-sm" id="software_version_new"
                      defaultValue={this.state.detail04.software_version_new}
                  />
                </div>
                <div className="col form-group">
                  <label>软件版本号（旧）</label>
                  <input type="text" className="form-control form-control-sm" id="software_version_old"
                      defaultValue={this.state.detail04.software_version_old}
                  />
                </div>
                <div className="col form-group">
                  <label>批准文件号</label>
                  <input type="text" className="form-control form-control-sm" id="approval_sn"
                      defaultValue={this.state.detail04.approval_sn}
                  />
                </div>
                <div className="col form-group">
                  <label>实施改造车组</label>
                  <input type="text" className="form-control form-control-sm" id="train"
                      defaultValue={this.state.detail04.train}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col form-group">
                  <label>实施改造日期</label>
                  <input type="text" className="form-control form-control-sm" id="date"
                      defaultValue={this.state.detail04.date}
                  />
                </div>
                <div className="col form-group">
                  <label>实施改造的车厢号</label>
                  <input type="text" className="form-control form-control-sm" id="carriage"
                      defaultValue={this.state.detail04.carriage}
                  />
                </div>
                <div className="col form-group">
                  <label>开工时间</label>
                  <input type="text" className="form-control form-control-sm" id="time_begin"
                      defaultValue={this.state.detail04.time_begin}
                  />
                </div>
                <div className="col form-group">
                  <label>完工时间</label>
                  <input type="text" className="form-control form-control-sm" id="time_end"
                      defaultValue={this.state.detail04.time_end}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col form-group">
                  <label>实施单位</label>
                  <input type="text" className="form-control form-control-sm" id="dept"
                      defaultValue={this.state.detail04.dept}
                  />
                </div>
                <div className="col form-group">
                  <label>实施者</label>
                  <input type="text" className="form-control form-control-sm" id="operator"
                      defaultValue={this.state.detail04.operator}
                  />
                </div>
                <div className="col form-group">
                  <label>动车所现场监控人</label>
                  <input type="text" className="form-control form-control-sm" id="watcher"
                      defaultValue={this.state.detail04.watcher}
                  />
                </div>
                <div className="col form-group">
                  <label>监控班组</label>
                  <input type="text" className="form-control form-control-sm" id="watcher_group"
                      defaultValue={this.state.detail04.watcher_group}
                  />
                </div>
                <div className="col form-group">
                  <label>质检员</label>
                  <input type="text" className="form-control form-control-sm" id="qc"
                      defaultValue={this.state.detail04.qc}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col form-group">
                  <label>备注</label>
                  <textarea rows="3" className="form-control" id="remark" defaultValue={this.state.detail04.remark}></textarea>
                </div>
              </div>

              <div className="col">
                <BackButton />
                <div className="btn-group pull-right">
                  <Detail04Update />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// 链接：加装改造记录单
export class LinkAdminDetail04 extends React.Component {
  handler() {
    sessionStorage.setItem('detail', this.props.detail)
    window.location = './#/journal.02-admin.detail04'
  }

  render() {
    return (
      <a className="text-danger" onClick={this.handler.bind(this)}>
        <i className="fa fa-fw fa-edit"></i>
      </a>
    )
  }
}

export class Journal02AdminDetail03 extends React.Component {
  constructor() {
    super()
    this.state = { detail03: [] }
  }

  componentDidMount() {
    fetch(`./api/journal02/detail/03/${sessionStorage.getItem('detail')}`)
    .then(res => res.json())
    .then(response => {
      console.info(response)
      this.setState({ detail03: response.content })
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-cog" title="编辑一体化作业申请单" toolbar="Journal02Toolbar" />

          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h5 className="mt-3 text-center">动车组关键配件更换记录表</h5>
              </div>

              <div className="row">
                <div className="form-group col">
                  <label>部件名称</label>
                  <input type="text" id="name" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.name}
                  />
                </div>
                <div className="form-group col">
                  <label>车组</label>
                  <input type="text" id="train" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.train}
                  />
                </div>
                <div className="form-group col">
                  <label>车号</label>
                  <input type="text" id="carriage" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.carriage}
                  />
                </div>
                <div className="form-group col">
                  <label>位置</label>
                  <input type="text" id="position" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.position}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col">
                  <label>日期</label>
                  <input type="date" id="date" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.date}
                  />
                </div>
                <div className="form-group col">
                  <label>时间</label>
                  <input type="time" id="time" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.time}
                  />
                </div>
                <div className="form-group col">
                  <label>生产日期</label>
                  <input type="text" id="production_date" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.production_date}
                  />
                </div>
                <div className="form-group col">
                  <label>更换原因</label>
                  <input type="text" id="reason" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.reason}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col">
                  <label>作业人员已阅读工艺文件并掌握各步骤</label>
                  <input type="text" id="p_gywj" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.p_gywj}
                  />
                </div>
                <div className="form-group col">
                  <label>力矩扳手已校验</label>
                  <input type="text" id="p_ljbs" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.p_ljbs}
                  />
                </div>
                <div className="form-group col">
                  <label>换下部件序列号</label>
                  <input type="text" id="component_sn_old" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.component_sn_old}
                  />
                </div>
                <div className="form-group col">
                  <label>换上部件序列号</label>
                  <input type="text" id="component_sn_new" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.component_sn_new}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col">
                  <label>部件安装良好，螺栓力矩已套固，防松标记已涂打</label>
                  <input type="text" id="p_bjaz" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.p_bjaz}
                  />
                </div>
                <div className="form-group col">
                  <label>作业者</label>
                  <input type="text" id="operator" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.operator}
                  />
                </div>
                <div className="form-group col">
                  <label>检修工长</label>
                  <input type="text" id="leader" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.leader}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col">
                  <label>部件功能试验正常</label>
                  <input type="text" id="p_bjgnsy" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.p_bjgnsy}
                  />
                </div>
                <div className="form-group col">
                  <label>质检员</label>
                  <input type="text" id="qc" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.qc}
                  />
                </div>
                <div className="form-group col">
                  <label>值班干部</label>
                  <input type="text" id="duty_officer" className="form-control form-control-sm"
                      defaultValue={this.state.detail03.duty_officer}
                  />
                </div>
              </div>

              <div className="col">
                <BackButton />
                <div className="btn-group pull-right">
                  <Detail03Update />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// 链接：特殊配件更换记录表
export class LinkAdminDetail03 extends React.Component {
  handler() {
    sessionStorage.setItem('detail', this.props.detail)
    window.location = './#/journal.02-admin.detail03'
  }

  render() {
    return (
      <a className="text-danger" onClick={this.handler.bind(this)}>
        <i className="fa fa-fw fa-edit"></i>
      </a>
    )
  }
}

// 一般配件更换记录表
export class Journal02AdminDetail02 extends React.Component {
  constructor() {
    super()
    this.state = { detail02: [] }
  }

  componentDidMount() {
    fetch(`./api/journal02/detail/02/${sessionStorage.getItem('detail')}`)
    .then(res => res.json())
    .then(response => {
      this.setState({ detail02: response.content })
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-cog" title="编辑一体化作业申请单" toolbar="Journal02Toolbar" />

          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h5 className="mt-3 text-center">动车组一般配件更换记录表</h5>
              </div>

              <div className="row">
                <div className="form-group col">
                  <label>部件名称</label>
                  <input type="text" id="name" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.name}
                  />
                </div>
                <div className="form-group col">
                  <label>车组</label>
                  <input type="text" id="train" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.train}
                  />
                </div>
                <div className="form-group col">
                  <label>车号</label>
                  <input type="text" id="carriage" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.carriage}
                  />
                </div>
                <div className="form-group col">
                  <label>位置</label>
                  <input type="text" id="position" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.carriage}
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="form-group col">
                  <label>日期</label>
                  <input type="date" id="date" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.date}
                  />
                </div>
                <div className="form-group col">
                  <label>时间</label>
                  <input type="time" id="time" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.time}
                  />
                </div>
                <div className="form-group col-6">
                  <label>更换原因</label>
                  <input type="text" id="reason" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.reason}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col">
                  <label>作业人员已阅读工艺文件并掌握各步骤</label>
                  <input type="text" id="p_gywj" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.p_gywj}
                  />
                </div>
                <div className="form-group col">
                  <label>力矩扳手已校验</label>
                  <input type="text" id="p_ljbs" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.p_ljbs}
                  />
                </div>
                <div className="form-group col">
                  <label>换下部件序列号</label>
                  <input type="text" id="component_sn_old" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.component_sn_old}
                  />
                </div>
                <div className="form-group col">
                  <label>换上部件序列号</label>
                  <input type="text" id="component_sn_new" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.component_sn_new}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col">
                  <label>部件安装良好，螺栓力矩已套固，防松标记已涂打</label>
                  <input type="text" id="p_bjaz" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.p_bjaz}
                  />
                </div>
                <div className="form-group col">
                  <label>作业者</label>
                  <input type="text" id="operator" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.operator}
                  />
                </div>
                <div className="form-group col">
                  <label>检修工长</label>
                  <input type="text" id="leader" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.leader}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col">
                  <label>部件功能试验正常</label>
                  <input type="text" id="p_bjgnsy" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.p_bjgnsy}
                  />
                </div>
                <div className="form-group col">
                  <label>质检员</label>
                  <input type="text" id="qc" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.qc}
                  />
                </div>
                <div className="form-group col">
                  <label>值班干部</label>
                  <input type="text" id="duty_officer" className="form-control form-control-sm"
                      defaultValue={this.state.detail02.duty_officer}
                  />
                </div>
              </div>
              <div className="col mt-3">
                <BackButton />
                <div className="btn-group pull-right">
                  <Detail02Update />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

// 链接：一般配件更换记录表
export class LinkAdminDetail02 extends React.Component {
  handler() {
    sessionStorage.setItem('detail', this.props.detail)
    window.location = './#/journal.02-admin.detail02'
  }

  render() {
    return (
      <a className="text-danger" onClick={this.handler.bind(this)}>
        <i className="fa fa-fw fa-edit"></i>
      </a>
    )
  }
}

// 修改一般部件普查记录单
export class Journal02AdminDetail01 extends React.Component {
  constructor() {
    super()
    this.state = { detail01: {} }
  }

  componentDidMount() {
    fetch(`./api/journal02/detail/01/${sessionStorage.getItem('detail')}`)
    .then(res => res.json())
    .then(response => {
      this.setState({ detail01: response.content })
      console.info(response.content)
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-cog" title="编辑一体化作业申请单" toolbar="Journal02Toolbar" />

          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h5 className="mt-3 text-center">动车组一般部件普查记录单</h5>
              </div>

              <div className="row">
                <div className="col">
                  <label>普查项目</label>
                  <input type="text" className="form-control form-control-sm" id="subject"
                      defaultValue={this.state.detail01.subject}
                  />
                </div>

                <div className="col">
                  <label>批准文件号</label>
                  <input type="text" className="form-control form-control-sm" id="approval_sn"
                      defaultValue={this.state.detail01.approval_sn}
                  />
                </div>

                <div className="col">
                  <label>实施普查车组</label>
                  <input type="text" className="form-control form-control-sm" id="train_sn"
                    defaultValue={this.state.detail01.train_sn}
                  />
                </div>

                <div className="col">
                  <label>实施普查日期</label>
                  <input type="date" className="form-control form-control-sm" id="date"
                      defaultValue={this.state.detail01.date}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col">
                  <label>实施普查的车厢号</label>
                  <input type="text" className="form-control form-control-sm" id="component.carriage-list"
                      defaultValue={this.state.detail01.carriage}
                  />
                </div>

                <div className="col">
                  <label>具体项点</label>
                  <input type="text" className="form-control form-control-sm" id="carriage_subject"
                      defaultValue={this.state.detail01.carriage_subject}
                  />
                </div>

                <div className="col">
                  <label>开工时间</label>
                  <input type="time" className="form-control form-control-sm" id="time_begin"
                      defaultValue={this.state.detail01.time_begin}
                  />
                </div>

                <div className="col">
                  <label>完工时间</label>
                  <input type="time" className="form-control form-control-sm" id="time_end"
                      defaultValue={this.state.detail01.time_end}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col">
                  <label>检查结果</label>
                  <input type="text" className="form-control form-control-sm" id="result"
                      defaultValue={this.state.detail01.result}
                  />
                </div>

                <div className="col">
                  <label>故障及处理情况</label>
                  <input type="text" className="form-control form-control-sm" id="report"
                      defaultValue={this.state.detail01.report}
                  />
                </div>

                <div className="col">
                  <label>实施单位</label>
                  <input type="text" className="form-control form-control-sm" id="dept"
                      defaultValue={this.state.detail01.dept}
                  />
                </div>

                <div className="col">
                  <label>实施者</label>
                  <input type="text" className="form-control form-control-sm" id="executor"
                      defaultValue={this.state.detail01.executor}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col">
                  <label>动车组现场监控人</label>
                  <input type="text" className="form-control form-control-sm" id="watcher"
                      defaultValue={this.state.detail01.watcher}
                  />
                </div>

                <div className="col">
                  <label>监控班组</label>
                  <input type="text" className="form-control form-control-sm" id="watcher_group"
                      defaultValue={this.state.detail01.watcher_group}
                  />
                </div>

                <div className="col">
                  <label>质检员</label>
                  <input type="text" className="form-control form-control-sm" id="qc"
                      defaultValue={this.state.detail01.qc}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col">
                  <label>备注</label>
                  <input type="text" className="form-control form-control-sm" id="remark"
                      defaultValue={this.state.detail01.remark}
                  />
                </div>
              </div>

              <div className="col mt-3">
                <BackButton />

                <div className="btn-group pull-right">
                  <Detail01Update />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// 链接：修改一般部件普查记录单
export class LinkAdminDetail01 extends React.Component {
  handler() {
    sessionStorage.setItem('detail', this.props.detail)
    window.location = './#/journal.02-admin.detail01'
  }

  render() {
    return (
      <a className="text-danger" onClick={this.handler.bind(this)}>
        <i className="fa fa-fw fa-edit"></i>
      </a>
    )
  }
}

// 修改申请单信息
export class Journal02AdminMaster extends React.Component {
  constructor() {
    super()
    this.state = { master: {}, detail01: [], detail02: [], detail03: [], detail04: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth.auth_admin) window.location = './#/login'

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}`)
    .then(res => res.json())
    .then(response => {
      this.setState({ master: response.content })
      // document.getElementById('component.train-list').value = response.content.group_sn
      let p_xdc = document.getElementsByName('p_yq_xdc')
      for (let i = 0; i < p_xdc.length; i++) {
        if (response.content.p_yq_xdc === p_xdc[i].value) {
          p_xdc[i].checked = true
          break
        }
      }
      let p_jcw = document.getElementsByName('p_yq_jcw')
      for (let el of p_jcw) {
        if (response.content.p_yq_jcw === el.value) {
          el.checked = true
          break
        }
      }
      let p_zydd = document.getElementsByName('p_yq_zydd')
      for (let el of p_zydd) {
        if (response.content.p_yq_zydd === el.value) {
          el.checked = true
          break
        }
      }
    })
    .catch(err => window.console && console.error(err))
  }

  submitMaster() {
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf8'
      },
      body: JSON.stringify({
        applicant: document.getElementById('applicant').value,
        applicantPhone: document.getElementById('applicantPhone').value,
        leader: document.getElementById('leader').value,
        leaderPhone: document.getElementById('leaderPhone').value,
        dept: document.getElementById('dept').value,
        groupSN: document.getElementById('component.train-list').value,
        dateBegin: document.getElementById('dateBegin').value,
        timeBegin: document.getElementById('timeBegin').value,
        dateEnd: document.getElementById('dateEnd').value,
        timeEnd: document.getElementById('timeEnd').value,
        content: document.getElementById('content').value,
        content_detail: document.getElementById('content_detail').value,
        p_yq_xdc: (document.getElementById('p_yq_xdc-0').checked && document.getElementById('p_yq_xdc-0').value) ||
          (document.getElementById('p_yq_xdc-1').checked && document.getElementById('p_yq_xdc-1').value) ||
          (document.getElementById('p_yq_xdc-2').checked && document.getElementById('p_yq_xdc-2').value) || '无要求',
        p_yq_jcw: (document.getElementById('p_yq_jcw-0').checked && document.getElementById('p_yq_jcw-0').value) ||
          (document.getElementById('p_yq_jcw-1').checked && document.getElementById('p_yq_jcw-1').value) ||
          (document.getElementById('p_yq_jcw-2').checked && document.getElementById('p_yq_jcw-2').value) || '无要求',
        p_yq_zydd: (document.getElementById('p_yq_zydd-0').checked && document.getElementById('p_yq_zydd-0').value) ||
          (document.getElementById('p_yq_zydd-1').checked && document.getElementById('p_yq_zydd-1').value) ||
          (document.getElementById('p_yq_zydd-2').checked && document.getElementById('p_yq_zydd-2').value) || '无要求',
        p_yq_qt: document.getElementById('p_yq_qt').value
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) alert(response.message)
      else window.location.reload(true)
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
       <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-cog" title="编辑一体化作业申请单" toolbar="Journal02Toolbar" />

          <table className="table table-bordered table-sm" style={{ border: '2px solid black' }}>
            <tbody>
              <tr>
                <td rowSpan="2" width="20%" className="text-center align-middle">CRH</td>
                <td><strong>哈尔滨动车段哈尔滨西动车组运用所</strong></td>
                <td width="15%"></td>
              </tr>
              <tr>
                <td colSpan="2"><strong>一体化作业申请单</strong></td>
              </tr>
            </tbody>
          </table>

          <table className="table table-bordered table-sm" style={{ border: '2px solid black' }}>
            <tbody>
              <tr>
                <td width="15%" className="text-center align-middle">申请单位</td>
                <td colSpan="3">
                  <input type="text" className="form-control form-control-sm" id="dept"
                      defaultValue={this.state.master.dept}
                  />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">申请人</td>
                <td width="35%" className="text-center">
                  <input type="text" className="form-control form-control-sm" id="applicant"
                      defaultValue={this.state.master.applicant}
                  />
                </td>
                <td width="15%" className="text-center align-middle">联系电话</td>
                <td width="35%" className="text-center">
                  <input type="text" className="form-control form-control-sm" id="applicantPhone"
                      defaultValue={this.state.master.applicant_phone}
                  />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">作业负责人</td>
                <td width="35%" className="text-center">
                  <input type="text" className="form-control form-control-sm" id="leader"
                      defaultValue={this.state.master.leader}
                  />
                </td>
                <td width="15%" className="text-center align-middle">联系电话</td>
                <td width="35%" className="text-center">
                  <input type="text" className="form-control form-control-sm" id="leaderPhone"
                      defaultValue={this.state.master.leader_phone}
                  />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">作业车组号</td>
                <td colSpan="3">
                  {
                    this.state.master.group_sn &&
                    <TrainList mode={this.props.mode} train={this.state.master.group_sn} />
                  }
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">申请作业时间</td>
                <td colSpan="3" className="text-center">
                  <input type="date" className="form-control-sm" style={{ width: '9rem' }} id="dateBegin"
                      defaultValue={this.state.master.date_begin}
                  />
                  <input type="time" className="form-control-sm ml-3" style={{ width: '6rem' }} id="timeBegin"
                      defaultValue={this.state.master.time_begin}
                  />
                  &nbsp;---&nbsp;
                  <input type="date" className="form-control-sm" style={{ width: '9rem' }} id="dateEnd"
                      defaultValue={this.state.master.date_end}
                  />
                  <input type="time" className="form-control-sm ml-3" style={{ width: '6rem' }} id="timeEnd"
                      defaultValue={this.state.master.time_end}
                  />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">作业内容</td>
                <td colSpan="3">
                  <select className="form-control form-control-sm" id="content"
                      defaultValue={this.state.master.content}
                  >
                    <option value="普查">普查</option>
                    <option value="检查">检查</option>
                    <option value="故障处理">故障处理</option>
                    <option value="加装改造">加装改造</option>
                    <option value="其它">其它</option>
                  </select>
                  <br />
                  <input type="text" className="form-control form-control-sm" id="content_detail"
                      defaultValue={this.state.master.content_detail}
                  />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">施修要求</td>
                <td colSpan="3">
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td width="15%" className="text-center">蓄电池</td>
                        <td className="text-center">
                          <input name="p_yq_xdc" type="radio" value="供" id="p_yq_xdc-0" />
                          <label htmlFor="p_yq_xdc-0">供</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_xdc" type="radio" value="断" id="p_yq_xdc-1" />
                          <label htmlFor="p_yq_xdc-1">断</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_xdc" type="radio" value="无要求" id="p_yq_xdc-2" />
                          <label htmlFor="p_yq_xdc-2">无要求</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td width="15%" className="text-center">接触网</td>
                        <td className="text-center">
                          <input name="p_yq_jcw" type="radio" value="供" id="p_yq_jcw-0" />
                          <label htmlFor="p_yq_jcw-0">供</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_jcw" type="radio" value="断" id="p_yq_jcw-1" />
                          <label htmlFor="p_yq_jcw-1">断</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_jcw" type="radio" value="无要求" id="p_yq_jcw-2" />
                          <label htmlFor="p_yq_jcw-2">无要求</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td width="15%" className="text-center">作业地点</td>
                        <td className="text-center">
                          <input name="p_yq_zydd" type="radio" value="检查库" id="p_yq_zydd-0" />
                          <label htmlFor="p_yq_zydd-0">检查库</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_zydd" type="radio" value="临修库" id="p_yq_zydd-1" />
                          <label htmlFor="p_yq_zydd-1">临修库</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_zydd" type="radio" value="无要求" id="p_yq_zydd-2" />
                          <label htmlFor="p_yq_zydd-2">无要求</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td width="15%" className="text-center">其它</td>
                        <td className="text-center">
                          <input type="text" className="form-control form-control-sm" id="p_yq_qt"
                              defaultValue={this.state.master.p_yq_qt}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="col">
            <BackButton />
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={this.submitMaster.bind(this)}>
                <i className="fa fa-fw fa-edit"></i>
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// 链接：修改申请单
export class LinkAdminMaster extends React.Component {
  handler() {
    window.location = './#/journal.02-admin.master'
  }

  render() {
    return (
      <button type="button" className="btn btn-outline-secondary" onClick={this.handler.bind(this)}>
        <i className="fa fa-fw fa-edit"></i>
        修改
      </button>
    )
  }
}