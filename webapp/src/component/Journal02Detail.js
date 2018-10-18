import axios from 'axios'
import React from 'react'

import { Message } from './Common'
import { LinkAdminDetail01, LinkAdminDetail02, LinkAdminDetail03, LinkAdminDetail04 } from '../Journal02Admin'

export class Journal02Detail04 extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', auth: {}, detail: [] }
    this.submitDetailPbz = this.submitDetailPbz.bind(this)
    this.submitDetailQc = this.submitDetailQc.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentDidMount() {
    this.setState({ auth: JSON.parse(sessionStorage.getItem('auth')) })
    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return
      }
      this.setState({ detail: response.data.content })
      if (response.data.content.length > 0) {
        document.getElementById('detail04-subject').innerText = response.data.content[0].subject
        document.getElementById('detail04-software_version_new').innerText = response.data.content[0].software_version_new
        document.getElementById('detail04-software_version_old').innerText = response.data.content[0].software_version_old
        document.getElementById('detail04-approval_sn').innerText = response.data.content[0].approval_sn
        document.getElementById('detail04-train').innerText = response.data.content[0].train
        document.getElementById('detail04-date').innerText = response.data.content[0].date
      }
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  submitDetailPbz(event) {
    this.setState({ message: '' })

    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/' + event.target.getAttribute('data-id') + '/p_bz',
      data: {
        watcher: event.target.value ? this.state.auth.name : '',
        watcher_group: event.target.value ? this.state.auth.dept : ''
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  submitDetailQc(event) {
    this.setState({ message: '' })

    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/' + event.target.getAttribute('data-id') + '/qc',
      data: {
        qc: event.target.value ? this.state.auth.name : ''
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  remove(event) {
    if (!!!window.confirm('确认删除选定的记录？')) return false
    axios({
      method: 'delete',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/' + event.target.getAttribute('data-id'),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      window.location.reload(true)
    })
  }

  excel() {
    fetch(`./api/excel/journal02/${sessionStorage.getItem('journal02')}/04`)
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      window.location = response.content
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h4 className="text-center">
            动车组加装改造（软件升级）记录单
            <span className="pull-right">
              <button type="button" className="btn btn-outline-success" onClick={this.excel.bind(this)}>
                <i className="fa fa-fw fa-download"></i>
                下载Excel
              </button>
            </span>
          </h4>
        </div>

        {this.state.message &&
          <div className="col-12">
            {this.state.message}
          </div>
        }

        <div className="col-12">
          <table className="table table-sm table-bordered" style={{ border: '2px solid black' }}>
            <tbody>
              <tr>
                <td width="15%" className="text-center align-middle">实施改造项目(升级系统)</td>
                <td colSpan="8" className="text-center align-middle" id="detail04-subject"></td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">软件版本号</td>
                <td width="10%" className="text-center align-middle">新</td>
                <td width="10%" className="text-center align-middle" id="detail04-software_version_new"></td>
                <td width="10%" className="text-center align-middle">旧</td>
                <td width="10%" className="text-center align-middle" id="detail04-software_version_old"></td>
                <td width="20%" colSpan="2" className="text-center align-middle">批准文件号</td>
                <td width="30%" colSpan="2" className="text-center align-middle" id="detail04-approval_sn"></td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">实施改造车组</td>
                <td width="40$" colSpan="4" className="text-center align-middle" id="detail04-train"></td>
                <td width="20%" colSpan="2" className="text-center align-middle">实施改造日期</td>
                <td width="30%" colSpan="2" className="text-center align-middle" id="detail04-date"></td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">实施改造的车厢号</td>
                <td width="10%" className="text-center align-middle">开工时间</td>
                <td width="10%" className="text-center align-middle">完工时间</td>
                <td width="10%" className="text-center align-middle">实施单位</td>
                <td width="10%" className="text-center align-middle">实施者</td>
                <td width="10%" className="text-center align-middle">动车所现场监控人</td>
                <td width="10%" className="text-center align-middle">监控班组</td>
                <td width="10%" className="text-center align-middle">质检员</td>
                <td width="15%" className="text-center align-middle">备注</td>
              </tr>
              {this.state.detail.map(item =>
                <tr key={item.id}>
                  <td width="15%" className="text-center align-middle">
                    {item.carriage}
                    {!!!this.props.read &&
                      <span className="text-danger">
                        <i className="fa fa-fw fa-trash" data-id={item.id} onClick={this.remove}></i>
                      </span>
                    }
                    {this.state.auth.auth_admin && <LinkAdminDetail04 detail={item.id} />}
                  </td>
                  <td width="10%" className="text-center align-middle">{item.time_begin}</td>
                  <td width="10%" className="text-center align-middle">{item.time_end}</td>
                  <td width="10%" className="text-center align-middle">{item.dept}</td>
                  <td width="10%" className="text-center align-middle">{item.operator}</td>
                  <td width="10%" className="text-center align-middle">
                    {item.watcher}
                    {this.props.p_bz &&
                      <select className="form-control form-control-sm" data-id={item.id} onChange={this.submitDetailPbz}>
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                        <option value="未确认">未确认</option>
                      </select>
                    }
                  </td>
                  <td width="10%" className="text-center align-middle">{item.watcher_group}</td>
                  <td width="10%" className="text-center align-middle">
                    {item.qc}
                    {this.props.qc &&
                      <select className="form-control form-control-sm" data-id={item.id} onChange={this.submitDetailQc}>
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                        <option value="未确认">未确认</option>
                      </select>
                    }
                  </td>
                  <td width="15%" className="text-center align-middle">{item.remark}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export class Journal02Detail03 extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', detail: [] }
    this.submitDetailQc = this.submitDetailQc.bind(this)
    this.submitDetailPjsy = this.submitDetailPjsy.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    this.setState({ auth: auth })
    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/03/?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail: response.data.content })
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  submitDetailPgz(event) {
    this.setState({ message: '' })
    if (event.target.value === '') return
    fetch(`./api/document/02/${sessionStorage.getItem('journal02')}/03/${event.target.getAttribute('data-id')}/p_gz`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        leader: event.target.value === '未确认' ? '未确认' : this.state.auth.name
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        window.alert(response.message)
        return
      }
    })
    .catch(err => window.console && console.error(err))
  }

  submitDetailQc(event) {
    this.setState({ message: '' })

    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/03/' + event.target.getAttribute('data-id') + '/qc',
      data: {
        p_bjgnsy: event.target.value,
        qc: this.state.auth.name
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
    }).catch(err => {
      this.setState({ message: '服务器通信异常' })
    })
  }

  submitDetailPjsy(event) {
    this.setState({ message: '' })
    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/03/' + event.target.getAttribute('data-id') + '/p_jsy',
      data: { duty_officer: event.target.value === '' ? '' : this.state.auth.name },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  remove(event) {
    if (!!!window.confirm('确认删除选定的记录？')) return false
    axios({
      method: 'delete',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/03/' + event.target.getAttribute('data-id'),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      window.location.reload(true)
    })
  }

  excel() {
    fetch(`./api/excel/journal02/${sessionStorage.getItem('journal02')}/03`)
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      window.location = response.content
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h4 className="text-center">
            动车组关键配件更换记录表
            <span className="pull-right">
              <button type="button" className="btn btn-outline-success" onClick={this.excel.bind(this)}>
                <i className="fa fa-fw fa-download"></i>
                下载Excel
              </button>
            </span>
          </h4>
        </div>

        {this.state.message &&
          <div className="col-12">
            <div className="alert alert-danger">
              {this.state.message}
            </div>
          </div>
        }

        <div className="col-12">
          <table className="table table-sm table-bordered" style={{ border: '2px solid black' }}>
            <tbody>
              <tr>
                <td width="6%" className="text-center align-middle">部件名称</td>
                <td width="6%" className="text-center align-middle">车组</td>
                <td width="3%" className="text-center align-middle">车号</td>
                <td width="3%" className="text-center align-middle">位置</td>
                <td width="6%" className="text-center align-middle">日期</td>
                <td width="6%" className="text-center align-middle">时间</td>
                <td width="6%" className="text-center align-middle">生产日期</td>
                <td className="text-center align-middle">更换原因</td>
                <td width="6%" className="text-center align-middle">作业人员已阅读工艺文件并掌握各步骤</td>
                <td width="4%" className="text-center align-middle">力矩扳手已校验</td>
                <td width="6%" className="text-center align-middle">换下部件序列号</td>
                <td width="6%" className="text-center align-middle">换上部件序列号</td>
                <td width="4%" className="text-center align-middle">部件安装良好，螺栓力矩已套固，防松标记已涂打</td>
                <td width="6%" className="text-center align-middle">作业者</td>
                <td width="6%" className="text-center align-middle">检修工长</td>
                <td width="4%" className="text-center align-middle">部件功能试验正常</td>
                <td width="6%" className="text-center align-middle">质检员</td>
                <td width="6%" className="text-center align-middle">值班干部</td>
              </tr>
              {this.state.detail.map(item =>
                <tr key={item.id}>
                  <td width="6%" className="text-center align-middle">
                    {item.name}
                    {!!!this.props.read &&
                      <span className="text-danger">
                        <i className="fa fa-fw fa-trash" data-id={item.id} onClick={this.remove}></i>
                      </span>
                    }
                    {this.state.auth.auth_admin === 1 && <LinkAdminDetail03 detail={item.id} />}
                  </td>
                  <td width="6%" className="text-center align-middle">{item.train}</td>
                  <td width="3%" className="text-center align-middle">{item.carriage}</td>
                  <td width="3%" className="text-center align-middle">{item.position}</td>
                  <td width="6%" className="text-center align-middle">{item.date}</td>
                  <td width="6%" className="text-center align-middle">{item.time}</td>
                  <td width="6%" className="text-center align-middle">{item.production_date}</td>
                  <td className="text-center align-middle">{item.reason}</td>
                  <td width="6%" className="text-center align-middle">{item.p_gywj}</td>
                  <td width="4%" className="text-center align-middle">{item.p_ljbs}</td>
                  <td width="6%" className="text-center align-middle">{item.component_sn_old}</td>
                  <td width="6%" className="text-center align-middle">{item.component_sn_new}</td>
                  <td width="4%" className="text-center align-middle">{item.p_bjaz}</td>
                  <td width="6%" className="text-center align-middle">{item.operator}</td>
                  <td width="6%" className="text-center align-middle">
                    {item.leader}
                    {this.props.p_bz &&
                      <select className="form-control form-control-sm" data-id={item.id} onChange={this.submitDetailPgz.bind(this)}>
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                        <option value="未确认">未确认</option>
                      </select>
                    }
                  </td>
                  <td width="4%" className="text-center align-middle">
                    {item.p_bjgnsy}
                    {this.props.qc &&
                      <select className="form-control form-control-sm" data-id={item.id} onChange={this.submitDetailQc}>
                        <option value="">部件功能试验正常：</option>
                        <option value="是">是</option>
                        <option value="否">否</option>
                      </select>
                    }
                  </td>
                  <td width="6%" className="text-center align-middle">{item.qc}</td>
                  <td width="6%" className="text-center align-middle">
                    {item.duty_officer}
                    {this.props.p_jsy &&
                      <select className="form-control form-control-sm" data-id={item.id} onChange={this.submitDetailPjsy}>
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                        <option value="未确认">未确认</option>
                      </select>
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export class Journal02Detail02 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', detail: [], auth: {} }
    this.submitDetailQc = this.submitDetailQc.bind(this)
    this.submitDetailPjsy = this.submitDetailPjsy.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })
    fetch(`./api/document/02/${sessionStorage.getItem('journal02')}/detail/02/`)
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      this.setState({ detail: response.content })
    })
    .catch(err => window.console && console.error(err))
    // axios({
    //   method: 'get',
    //   url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/?timestamp=' + new Date().getTime(),
    //   responseType: 'json'
    // }).then(response => {
    //   if (response.data.message) {
    //     this.setState({ message: response.data.message })
    //     return false
    //   }
    //   this.setState({ detail: response.data.content })
    // }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  submitDetailPgz(event) {
    this.setState({ message: '' })
    fetch(`./api/document/02/${sessionStorage.getItem('journal02')}/02/${event.target.getAttribute('data-id')}/p_gz`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        leader: event.target.value === '未确认' ? '未确认' : this.state.auth.name
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        window.alert(response.message)
        return
      }
    })
    .catch(err => window.console && console.error(err))
  }

  submitDetailQc(event) {
    this.setState({ message: '' })

    fetch(`./api/document/02/${sessionStorage.getItem('journal02')}/detail/02/${event.target.getAttribute('data-id')}/qc`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        p_bjgnsy: event.target.value,
        qc: this.state.auth.name
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
    })
    .catch(err => window.console && console.error(err))
    // axios({
    //   method: 'put',
    //   url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/' + event.target.getAttribute('data-id') + '/qc',
    //   data: {
    //     p_bjgnsy: event.target.value,
    //     qc: this.state.auth.name
    //   },
    //   responseType: 'json'
    // }).then(response => {
    //   if (response.data.message) {
    //     this.setState({ message: response.data.message })
    //     return false
    //   }
    // }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  submitDetailPjsy(event) {
    this.setState({ message: '' })
    fetch(`./api/document/02/${sessionStorage.getItem('journal02')}/detail/02/${event.target.getAttribute('data-id')}/p_jsy`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        duty_officer: event.target.value === '' ? '' : this.state.auth.name
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
    })
    .catch(err => window.console && console.error(err))
    // axios({
    //   method: 'put',
    //   url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/' + event.target.getAttribute('data-id') + '/p_jsy',
    //   data: { duty_officer: event.target.value === '' ? '' : this.state.auth.name },
    //   responseType: 'json'
    // }).then(response => {
    //   if (response.data.message) {
    //     this.setState({ message: response.data.message })
    //     return false
    //   }
    // }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  remove(event) {
    if (!!!window.confirm('确认删除选定的记录？')) return false
    fetch(`./api/document/02/${sessionStorage.getItem('journal02')}/detail/02/${event.target.getAttribute('data-id')}`, {
      method: 'delete'
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      window.location.reload(true)
    })
    .catch(err => window.console && console.error(err))
    // axios({
    //   method: 'delete',
    //   url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/' + event.target.getAttribute('data-id'),
    //   responseType: 'json'
    // }).then(function (response) {
    //   if (response.data.message) {
    //     this.setState({ message: response.data.message })
    //     return false
    //   }
    //   window.location.reload(true)
    // })
  }

  excel() {
    fetch(`./api/excel/journal02/${sessionStorage.getItem('journal02')}/02`)
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      window.location = response.content
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h4 className="text-center">
            动车组一般配件更换记录表
            <span className="pull-right">
              <button type="button" className="btn btn-outline-success" onClick={this.excel.bind(this)}>
                <i className="fa fa-fw fa-download"></i>
                下载Excel
              </button>
            </span>
          </h4>
        </div>

        {this.state.message &&
          <div className="col-12">
            <Message message={this.state.message} />
          </div>
        }

        <div className="col-12">
          <table className="table table-sm table-bordered" style={{ border: '2px solid black' }}>
            <tbody>
              <tr>
                <td width="6%" className="text-center align-middle">部件名称</td>
                <td width="6%" className="text-center align-middle">车组</td>
                <td width="3%" className="text-center align-middle">车号</td>
                <td width="3%" className="text-center align-middle">位置</td>
                <td width="6%" className="text-center align-middle">日期</td>
                <td width="6%" className="text-center align-middle">时间</td>
                <td className="text-center align-middle">更换原因</td>
                <td width="6%" className="text-center align-middle">作业人员已阅读工艺文件并掌握各步骤</td>
                <td width="4%" className="text-center align-middle">力矩扳手已校验</td>
                <td width="6%" className="text-center align-middle">换下部件序列号</td>
                <td width="6%" className="text-center align-middle">换上部件序列号</td>
                <td width="4%" className="text-center align-middle">部件安装良好，螺栓力矩已套固，防松标记已涂打</td>
                <td width="6%" className="text-center align-middle">作业者</td>
                <td width="6%" className="text-center align-middle">检修工长</td>
                <td width="4%" className="text-center align-middle">部件功能试验正常</td>
                <td width="6%" className="text-center align-middle">质检员</td>
                <td width="6%" className="text-center align-middle">值班干部</td>
              </tr>
              {this.state.detail.map(item =>
                <tr key={item.id}>
                  <td width="6%" className="text-center align-middle">
                    {item.name}
                    {!!!this.props.read &&
                      <span className="text-danger"><i className="fa fa-fw fa-trash" data-id={item.id} onClick={this.remove}></i></span>
                    }
                    {this.state.auth.auth_admin === 1 && <LinkAdminDetail02 detail={item.id} />}
                  </td>
                  <td width="6%" className="text-center align-middle">{item.train}</td>
                  <td width="3%" className="text-center align-middle">{item.carriage}</td>
                  <td width="3%" className="text-center align-middle">{item.position}</td>
                  <td width="6%" className="text-center align-middle">{item.date}</td>
                  <td width="6%" className="text-center align-middle">{item.time}</td>
                  <td className="text-center align-middle">{item.reason}</td>
                  <td width="6%" className="text-center align-middle">{item.p_gywj}</td>
                  <td width="4%" className="text-center align-middle">{item.p_ljbs}</td>
                  <td width="6%" className="text-center align-middle">{item.component_sn_old}</td>
                  <td width="6%" className="text-center align-middle">{item.component_sn_new}</td>
                  <td width="4%" className="text-center align-middle">{item.p_bjaz}</td>
                  <td width="6%" className="text-center align-middle">{item.operator}</td>
                  <td width="6%" className="text-center align-middle">
                    {item.leader}
                    {this.props.p_bz &&
                      <select className="form-control form-control-sm" data-id={item.id} onChange={this.submitDetailPgz.bind(this)}>
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                        <option value="未确认">未确认</option>
                      </select>
                    }
                  </td>
                  <td width="4%" className="text-center align-middle">
                    {item.p_bjgnsy}
                    {this.props.qc &&
                      <select className="form-control form-control-sm" data-id={item.id} onChange={this.submitDetailQc}>
                        <option value="">部件功能是否正常</option>
                        <option value="是">是</option>
                        <option value="否">否</option>
                      </select>
                    }
                  </td>
                  <td width="6%" className="text-center align-middle">{item.qc}</td>
                  <td width="6%" className="text-center align-middle">
                    {item.duty_officer}
                    {this.props.p_jsy &&
                      <select className="form-control form-control-sm" data-id={item.id} onChange={this.submitDetailPjsy}>
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                        <option value="未确认">未确认</option>
                      </select>
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export class Journal02Detail01 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', auth: {}, detail: [] }
    this.submitDetailPbz = this.submitDetailPbz.bind(this)
    this.submitDetailQc = this.submitDetailQc.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return
    this.setState({ auth: auth })
    fetch(`./api/document/02/${sessionStorage.getItem('journal02')}/detail/01/`)
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      this.setState({ detail: response.content })
      if (response.content.length > 0) {
        document.getElementById('detail01-subject').innerText = response.content[0].subject
        document.getElementById('detail01-approval_sn').innerText = response.content[0].approval_sn
        document.getElementById('detail01-train_sn').innerText = response.content[0].train_sn
        document.getElementById('detail01-date').innerText = response.content[0].date
      }
    })
    .catch(err => window.console && console.error(err))
  }

  submitDetailPbz(event) {
    this.setState({ message: '' })
    fetch(`./api/document/02/${sessionStorage.getItem('journal02')}/detail/01/${event.target.getAttribute('data-id')}/p_bz`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        watcher: event.target.value === '确认' ? this.state.auth.name : '',
        watcher_group: event.target.value === '确认' ? this.state.auth.dept : ''
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
    })
    .catch(err => window.console && console.error(err))
    // axios({
    //   method: 'put',
    //   url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/' + event.target.getAttribute('data-id') + '/p_bz',
    //   data: {
    //     watcher: event.target.value === '确认' ? this.state.auth.name : '',
    //     watcher_group: event.target.value === '确认' ? this.state.auth.dept : ''
    //   },
    //   responseType: 'json'
    // }).then(response => {
    //   if (response.data.message) {
    //     this.setState({ message: response.data.message })
    //     return false
    //   }
    // }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  submitDetailQc(event) {
    this.setState({ message: '' })
    fetch(`./api/document/02/${sessionStorage.getItem('journal02')}/detail/01/${event.target.getAttribute('data-id')}/qc`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        qc: event.target.value === '确认' ? this.state.auth.name : ''
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
    })
    .catch(err => window.console && console.error(err))
    // axios({
    //   method: 'put',
    //   url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/' + event.target.getAttribute('data-id') + '/qc',
    //   data: {
    //     qc: event.target.value === '确认' ? this.state.auth.name : ''
    //   },
    //   responseType: 'json'
    // }).then(response => {
    //   if (response.data.message) {
    //     this.setState({ message: response.data.message })
    //     return false
    //   }
    // }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  remove(event) {
    if (!!!window.confirm('确认删除该记录？')) return false
    fetch(`./api/document/02/${sessionStorage.getItem('journal02')}/detail/01/${event.target.getAttribute('data-id')}`, {
      method: 'delete'
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      window.location.reload(true)
    })
    .catch(err => window.console && console.error(err))
  }

  excel() {
    fetch(`./api/excel/journal02/${sessionStorage.getItem('journal02')}/01`)
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      window.location = response.content
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h4 className="text-center">
            动车组一般部件普查记录单
            <span className="pull-right">
              <button type="button" className="btn btn-outline-success" onClick={this.excel.bind(this)}>
                <i className="fa fa-fw fa-download"></i>
                下载Excel
              </button>
            </span>
          </h4>
        </div>

        {this.state.message &&
          <div className="col-12">
            <div className="alert alert-danger">
              {this.state.message}
            </div>
          </div>
        }

        <div className="col-12">
          <table className="table table-sm table-bordered" style={{ border: '2px solid black' }}>
            <tbody>
              <tr>
                <td width="8%" className="text-center align-middle">普查项目</td>
                <td width="42%" colSpan="5" className="text-center align-middle" id="detail01-subject"></td>
                <td width="15%" colSpan="2" className="text-center align-middle">批准文件号</td>
                <td width="35%" colSpan="4" className="text-center align-middle" id="detail01-approval_sn"></td>
              </tr>
              <tr>
                <td width="10%" className="text-center align-middle">实施普查车组</td>
                <td width="40%" colSpan="5" className="text-center align-middle" id="detail01-train_sn"></td>
                <td width="10%" colSpan="2" className="text-center align-middle">实施普查日期</td>
                <td width="40%" colSpan="4" className="text-center align-middle" id="detail01-date"></td>
              </tr>
              <tr>
                <td width="8%" className="text-center align-middle">实施普查<br />的车厢号</td>
                <td width="10%" className="text-center align-middle">具体项点</td>
                <td width="6%" className="text-center align-middle">开工<br />时间</td>
                <td width="6%" className="text-center align-middle">完工<br />时间</td>
                <td width="6%" className="text-center align-middle">检查<br />结果</td>
                <td width="14%" className="text-center align-middle">故障及处理情况</td>
                <td width="8%" className="text-center align-middle">实施单位</td>
                <td width="7%" className="text-center align-middle">实施者</td>
                <td width="8%" className="text-center align-middle">动车组<br />现场监控人</td>
                <td width="8%" className="text-center align-middle">监控班组</td>
                <td width="8%" className="text-center align-middle">质检员</td>
                <td className="text-center align-middle">备注</td>
              </tr>
              {this.state.detail.map(item =>
                <tr key={item.id}>
                  <td width="8%" className="text-center align-middle">
                    {item.carriage}
                    {
                      (!!!this.props.read || this.state.auth.auth_admin === 1) &&
                      <span className="text-danger"><i className="fa fa-fw fa-trash" data-id={item.id} onClick={this.remove}></i></span>
                    }
                    {this.state.auth.auth_admin && <LinkAdminDetail01 detail={item.id} />}
                  </td>
                  <td width="10%" className="text-center align-middle">{item.carriage_subject}</td>
                  <td width="6%" className="text-center align-middle">{item.time_begin}</td>
                  <td width="6%" className="text-center align-middle">{item.time_end}</td>
                  <td width="6%" className="text-center align-middle">{item.result}</td>
                  <td width="14%" className="text-center align-middle">{item.report}</td>
                  <td width="8%" className="text-center align-middle">{item.dept}</td>
                  <td width="7%" className="text-center align-middle">{item.executor}</td>
                  <td width="8%" className="text-center align-middle">
                    {item.watcher}
                    {this.props.p_bz &&
                      <select className="form-control form-control-sm" data-id={item.id} onChange={this.submitDetailPbz}>
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                        <option value="未确认">未确认</option>
                      </select>
                    }
                  </td>
                  <td width="8%" className="text-center align-middle">{item.watcher_group}</td>
                  <td width="8%" className="text-center align-middle">
                    {item.qc}
                    {this.props.qc &&
                      <select className="form-control form-control-sm" data-id={item.id} onChange={this.submitDetailQc}>
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                        <option value="未确认">未确认</option>
                      </select>
                    }
                  </td>
                  <td className="text-center align-middle">{item.remark}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
