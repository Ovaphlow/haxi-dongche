import echarts from 'echarts'
import React from 'react'
import moment from 'moment'

import { PageTitle, PageTitle2, Sidebar, ContentSelecter } from './component/Common'
import Journal02Master from './component/Journal02Master'
import Journal02Item from './component/Journal02Item'
import {
  Message, BackButton, DeptList, TrainList, MessageAlert, DeptListPbz,
  TimerReloadButton
} from './component/Common'
import { ExportFilter2Excel, ProgressButton } from './component/Journal02Util'
import {
  Journal02Detail01, Journal02Detail02, Journal02Detail03, Journal02Detail04
} from './component/Journal02Detail'
import {
  ApprovePjsySubmit,
  ReviewApplicantSubmit, ReviewPbzSubmit,
  ReviewPgzSubmit, ReviewQcSubmit, ReviewPjsySubmit, ReviewPddSubmit
} from './component/Journal02Util'
import { RejectButton, RemoveButton } from './component/Journal02Util'
import { LinkAdminMaster } from './Journal02Admin'
import {
  GetDetail, ListDetail01, GetDetail01Qty, ListDetail02, GetDetail02Qty,
  ListDetail03, GetDetail03Qty, ListDetail04, GetDetail04Qty
} from './actions/Document02'

/**
 * 已驳回申请列表
 */
export class Journal02RejectList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list: [] }
  }

  componentDidMount() {
    // fetch('./api/journal02/reject/')
    fetch('./api/document/02/reject/')
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-reply" title="已驳回申请" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <Message message={this.state.message} />
          }

          <div className="col-12">
            <ul className="list-group">
              {this.state.list.map(item =>
                <Journal02Item key={item.id} item={item} />
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 统计图表
 */
export class Journal02Stats extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
  }

  componentDidMount() {
    fetch('./api/document/02/stats/')
    .then(res => res.json())
    .then(response => {
      var chart = echarts.init(document.getElementById('chart'))
      var option = {
        title: {
          text: '作业车组数据统计',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '作业次数',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: response.content,
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        ]
      }
      chart.setOption(option)
    })
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-pie-chart" title="数据统计" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="col-12 text-center">
            <div id="chart" style={{ width: '100%', height: '40em' }}></div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 调度销记
 */
export class Journal02VerifyPdd extends React.Component {
  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'
    GetDetail(sessionStorage.getItem('journal02'))
    .then(response => {
      if (response.content.remark) {
        document.getElementById('remark').value = response.content.remark
      }
    })
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
              <div className="card-header">
                <h5>调度员</h5>
              </div>

              <div className="card-body row">
                <div className="col-12">
                  <div className="form-group">
                    <label>备注</label>
                    <textarea rows="3" className="form-control" id="remark"></textarea>
                  </div>
                </div>

                <div className="col-12">
                  <BackButton />
                  <div className="btn-group pull-right">
                    <ReviewPddSubmit />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 技术员销记
 */
export class Journal02VerifyPjsy extends React.Component {
  constructor() {
    super()
    this.state = { message: '', detail01: [], detail02: [], detail03: [], detail04: [] }
    this.nextStep = this.nextStep.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })

    ListDetail01(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail01: response.content }))

    ListDetail02(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail02: response.content }))

    ListDetail03(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail03: response.content }))

    ListDetail04(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail04: response.content }))
  }

  nextStep() {
    window.location.href = './#/journal.02-verify'
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="单据" />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-archive" title="作业完成销记 - 技术员" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <Message message={this.state.message} />
            </div>
          }

          {this.state.detail01.length > 0 &&
            <Journal02Detail01 detail={this.state.detail01} p_jsy={true} auth={this.state.auth} />
          }

          {this.state.detail02.length > 0 &&
            <div>
              <hr/>
              <Journal02Detail02 detail={this.state.detail02} p_jsy={true} auth={this.state.auth} />
            </div>
          }

          {this.state.detail03.length > 0 &&
            <div>
              <hr/>
              <Journal02Detail03 detail={this.state.detail03} p_jsy={true} auth={this.state.auth} />
            </div>
          }

          {this.state.detail04.length > 0 &&
            <div>
              <hr/>
              <Journal02Detail04 detail={this.state.detail04} p_jsy={true} auth={this.state.auth} />
            </div>
          }

          <div className="col-12 mt-3">
            <div className="btn-group pull-right">
              <ReviewPjsySubmit />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 质检销记
 */
export class Journal02VerifyQc extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', auth: {}, detail01: [], detail02: [], detail03: [], detail04: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'
    this.setState({ auth: auth })

    ListDetail01(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail01: response.content }))

    ListDetail02(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail02: response.content }))

    ListDetail03(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail03: response.content }))

    ListDetail04(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail04: response.content }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-archive" title="作业完成销记 - 质检" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <Message message={this.state.message} />
            </div>
          }

          {this.state.detail01.length > 0 &&
            <Journal02Detail01 detail={this.state.detail01} qc={true} auth={this.state.auth} />
          }

          {this.state.detail02.length > 0 &&
            <div>
              <hr/>
              <Journal02Detail02 detail={this.state.detail02} qc={true} auth={this.state.auth} />
            </div>
          }

          {this.state.detail03.length > 0 &&
            <div>
              <hr/>
              <Journal02Detail03 detail={this.state.detail03} qc={true} auth={this.state.auth} />
            </div>
          }

          {this.state.detail04.length > 0 &&
            <div>
              <hr/>
              <Journal02Detail04 detail={this.state.detail04} qc={true} auth={this.state.auth} />
            </div>
          }

          <div className="col-12 mt-3">
            <div className="btn-group pull-right">
              <ReviewQcSubmit />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 工长销记
 * 一般配件和关键配件更换记录单时触发
 */
export class Journal02ReviewPgz extends React.Component {
  constructor(props) {
    super(props)
    this.state = { detail01: [], detail02: [], detail03: [], detail04: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'

    ListDetail01(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail01: response.content }))

    ListDetail02(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail02: response.content }))

    ListDetail03(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail03: response.content }))

    ListDetail04(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail04: response.content }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-archive" title="作业完成销记 - 工长" toolbar="Journal02Toolbar" />

          {this.state.detail01.length > 0 &&
            <Journal02Detail01 detail={this.state.detail01} p_gz={true} />
          }

          {this.state.detail02.length > 0 &&
            <div>
              <hr />
              <Journal02Detail02 detail={this.state.detail02} p_gz={true} />
            </div>
          }

          {this.state.detail03.length > 0 &&
            <div>
              <hr />
              <Journal02Detail03 detail={this.state.detail03} p_gz={true} />
            </div>
          }

          {this.state.detail04.length > 0 &&
            <div>
              <hr />
              <Journal02Detail04 detail={this.state.detail04} p_gz={true} />
            </div>
          }

          <div className="col-12 mt-3">
            <div className="btn-group pull-right">
              <ReviewPgzSubmit />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// 班组销记
export class Document02ReviewPbz extends React.Component {
  constructor() {
    super()
    this.state = { detail01: [], detail02: [], detail03: [], detail04: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'

    ListDetail01(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail01: response.content }))

    ListDetail02(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail02: response.content }))

    ListDetail03(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail03: response.content }))

    ListDetail04(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail04: response.content }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-archive" title="作业完成销记 - 班组" toolbar="Journal02Toolbar" />

          {this.state.detail01.length > 0 &&
            <Journal02Detail01 detail={this.state.detail01} p_bz={true} />
          }

          {this.state.detail02.length > 0 &&
            <div>
              <hr />
              <Journal02Detail02 detail={this.state.detail02} p_bz={true} />
            </div>
          }

          {this.state.detail03.length > 0 &&
            <div>
              <hr />
              <Journal02Detail03 detail={this.state.detail03} p_bz={true} />
            </div>
          }

          {this.state.detail04.length > 0 &&
            <div>
              <hr />
              <Journal02Detail04 detail={this.state.detail04} p_bz={true} />
            </div>
          }

          <div className="col-12 mt-3">
            <div className="btn-group pull-right">
              <ReviewPbzSubmit />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 作业负责人销记
 */
export class Journal02VerifyLeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { auth: {}, message: '', master: {} }
    this.detail = this.detail.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })

    GetDetail(sessionStorage.getItem('journal02'))
    .then(response => {
      sessionStorage.setItem('journal02-detail', response.content.id)
      response.content.veirfy_report && (document.getElementById('verify_report').value = response.content.verify_report)
      document.getElementById('dtime_begin').value = `${response.content.date_begin}T${response.content.time_begin}`
      document.getElementById('dtime_end').value = `${response.content.date_end}T${response.content.time_end}`
      if (response.content.remark) {
        document.getElementById('remark').value = response.content.remark
      }
    })
  }

  detail(event) {
    let sn = event.target.getAttribute('data-id')
    window.location.href = `./#/journal.02-save.0${sn}`
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
              <div className="card-header">
                <h5>作业负责人</h5>
              </div>

              <div className="card-body row">
                <div className="col-12 btn-group">
                  <button type="button" className="btn btn-secondary" data-id="1" onClick={this.detail}>
                    一般部件普查记录单
                  </button>

                  <button type="button" className="btn btn-secondary ml-3" data-id="2" onClick={this.detail}>
                    一般配件更换记录表
                  </button>

                  <button type="button" className="btn btn-secondary ml-3" data-id="3" onClick={this.detail}>
                    关键配件更换记录表
                  </button>

                  <button type="button" className="btn btn-secondary ml-3" data-id="4" onClick={this.detail}>
                    加装改造（软件升级）记录单
                  </button>
                </div>

                <div className="col-12"><hr/></div>

                <div className="col-12">
                  <div className="form-group">
                    <label>作业完成情况</label>
                    <textarea rows="3" className="form-control" id="verify_report"></textarea>
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-group">
                    <label>作业起止时间</label>
                    <input type="datetime-local" className="form-control" id="dtime_begin" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>&nbsp;</label>
                    <input type="datetime-local" className="form-control" id="dtime_end" />
                  </div>
                </div>

                <div className="clearfix"></div>

                <div className="col-12">
                  <div className="form-group">
                    <label>备注</label>
                    <textarea rows="3" className="form-control" id="remark"></textarea>
                  </div>
                </div>

                <div className="col-12">
                  <hr />
                  <BackButton />
                  <div className="btn-group pull-right">
                    <ReviewApplicantSubmit />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 作业完成销记列表页面
 */
export class Journal02Verify extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list_leader: [], list_p_bz: [], list_qc: [], list_p_jsy: [], list_p_dd: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }

    fetch(`./api/document/02/review/applicant/${auth.id}/?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => this.setState({ list_leader: response.content }))

    fetch(`./api/document/02/review/p_bz/${auth.dept}/?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => {
      this.setState({ list_p_bz: response.content })

      // 工长签字
      if (auth.dept_leader === '是') {
        fetch(`./api/document/02/verify/p_gz/${auth.dept}`)
        .then(res => res.json())
        .then(response1 => {
          if (response1.content.length > 0) {
            this.setState({ list_p_bz: response1.content.concat(response.content) })
          }
        })
        .catch(err => window.console && console.error(err))
      }
    })

    if (auth.dept === '质检') {
      fetch(`./api/document/02/review/qc/${auth.dept}/?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => this.setState({ list_qc: response.content }))
    }

    if (auth.auth_p_jsy) {
      fetch(`./api/document/02/review/p_jsy/?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => this.setState({ list_p_jsy: response.content }))
    }

    if (auth.auth_p_dd) {
      fetch(`./api/document/02/review/p_dd/?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => this.setState({ list_p_dd: response.content }))
    }
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
            <ul className="list-group">
              {this.state.list_leader.map(item =>
                <Journal02Item key={item.id} operation="verify_leader" item={item} />
              )}
              {this.state.list_p_bz.map(item =>
                <Journal02Item key={item.id} operation="verify_p_bz" item={item} />
              )}
              {this.state.list_qc.map(item =>
                <Journal02Item key={item.id} operation="verify_qc" item={item} />
              )}
              {this.state.list_p_jsy.map(item =>
                <Journal02Item key={item.id} operation="verify_p_jsy" item={item} />
              )}
              {this.state.list_p_dd.map(item =>
                <Journal02Item key={item.id} operation="verify_p_dd" item={item} />
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 技术员设置作业形式
 */
export class Journal02PjsyContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', deptList: [], qcList: [] }
    this.change = this.change.bind(this)
  }

  componentDidMount() {
    document.getElementById('component.p_bz-list').setAttribute('disabled', true)
    document.getElementById('qc').setAttribute('disabled', true)
  }

  change() {
    if (document.getElementById('p_jsy_content').value === '无要求') {
      document.getElementById('component.p_bz-list').setAttribute('disabled', true)
      document.getElementById('component.p_bz-list').value = ''
      document.getElementById('qc').setAttribute('disabled', true)
      document.getElementById('qc').value = ''
    } else if (document.getElementById('p_jsy_content').value === '班组跟踪、质检确认') {
      document.getElementById('component.p_bz-list').removeAttribute('disabled')
      document.getElementById('qc').removeAttribute('disabled')
    } else if (document.getElementById('p_jsy_content').value === '班组、质检跟踪') {
      document.getElementById('component.p_bz-list').removeAttribute('disabled')
      document.getElementById('qc').removeAttribute('disabled')
    }
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-check-square-o" title="技术员审核" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <Message message={this.state.message} />
            </div>
          }

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body row">
                  <div className="form-group col-4">
                    <select className="form-control" id="p_jsy_content" onChange={this.change}>
                      <option value="">未选择</option>
                      <option value="无要求">无要求</option>
                      <option value="班组跟踪、质检确认">班组跟踪、质检确认</option>
                      <option value="班组、质检跟踪">班组、质检跟踪</option>
                    </select>
                  </div>
                  <div className="form-group col-4">
                    <DeptListPbz />
                  </div>
                  <div className="form-group col-4">
                    <select className="form-control" id="qc">
                      <option value="">选择质检</option>
                      <option value="质检">质检</option>
                    </select>
                  </div>
                  <div className="clearfix"></div>

                  <div className="col-12">
                    <BackButton />
                    <div className="btn-group pull-right">
                      <ApprovePjsySubmit />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 动车所审核列表
 */
export class Journal02Check extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list_p_jsy_bz: [], list_p_jsy_qc: [], list_p_jsy: [], list_p_zbsz: [], list_p_dd: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem("auth"))

    fetch(`./api/document/02/approve/p_bz/${auth.dept}/?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      this.setState({ list_p_jsy_bz: response.content })
    })
    .catch(err => window.console && console.error(err))

    if (auth.auth_p_jsy) {
      fetch(`./api/document/02/approve/p_jsy/`)
      .then(res => res.json())
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        this.setState({ list_p_jsy: response.content })
      })
      .catch(err => window.console && console.error(err))
    }

    if (auth.auth_p_dd) {
      fetch(`./api/document/02/approve/p_dd/?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ list_p_dd: response.content })
      })
      .catch(err => window.console && console.error(err))
    }

    if (auth.auth_p_zbsz) {
      fetch(`./api/document/02/approve/p_zbsz/?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        this.setState({ list_p_zbsz: response.content })
      })
    }
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-check-square-o" title="动车所审核" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="col-12">
            <ul className="list-group">
              {this.state.list_p_jsy.map(item =>
                <Journal02Item key={item.id} item={item} operation="p_jsy" />
              )}

              {this.state.list_p_jsy_bz.map(item =>
                <Journal02Item key={item.id} item={item} operation="p_jsy_bz" />
              )}

              {this.state.list_p_jsy_qc.map(item =>
                <Journal02Item key={item.id} item={item} operation="p_jsy_qc" />
              )}

              {this.state.list_p_dd.length > 0 && this.state.list_p_dd.map(item =>
                <Journal02Item key={item.id} item={item} operation="p_dd" />
              )}

              {this.state.list_p_zbsz.map(item =>
                <Journal02Item key={item.id} item={item} operation="p_zbsz" />
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 申请单详细信息
 */
export class Journal02Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { auth: {}, master: {}, detail01: 0, detail02: 0, detail03: 0, detail04: 0, message: '' }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })

    GetDetail(sessionStorage.getItem('journal02'))
    .then(response => {
      this.setState({ master: response.content })

      // 检查供电状态是否和已有申请冲突
      if (!!!response.content.sign_verify_leader) {
        fetch(`./api/document/02/check/power/${sessionStorage.getItem('journal02')}`)
        .then(res => res.json())
        .then(response => {
          if (response.message) {
            window.alert(response.message)
            return
          }
          if (response.content.length > 0) {
            let row = response.content[0]
            let message = `
              ${row.dept}的${row.applicant}(${row.applicant_phone})提交的申请[${row.id}]中的供电状态与当前申请冲突。
              蓄电池：${row.p_yq_xdc}，接触网：${row.p_yq_jcw}。
            `
            this.setState({ message: message})
            window.alert(message)
          }
        })
        .catch(err => window.console && console.error(err))
      }
    })

    GetDetail01Qty(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail01: response.content.qty }))

    GetDetail02Qty(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail02: response.content.qty }))

    GetDetail03Qty(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail03: response.content.qty }))

    GetDetail04Qty(sessionStorage.getItem('journal02'))
    .then(response => this.setState({ detail04: response.content.qty }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-list" title="详细信息" toolbar="Journal02Toolbar" />

          {this.state.message && <Message message={this.state.message} />}

          <Journal02Master mode="read" check={true} verify={true} />

          <div className="col-12">
            {
              (
                this.state.auth.auth_admin === 1 || (
                  this.state.master.leader_id === this.state.auth.id &&
                  !!!this.state.master.sign_p_jsy
                )
              ) &&
              <RemoveButton />
            }
            {
              !!!this.state.master.sign_verify &&
              !!!this.state.master.reject &&
              <RejectButton item={this.state.master} />
            }
            {
              this.state.auth.auth_admin === 1 &&
              <LinkAdminMaster />
            }
            <div className="btn-group pull-right">
              <ProgressButton item={this.state.master} auth={this.state.auth} />
            </div>
          </div>

          {this.state.detail01 > 0 &&
            <div>
              <hr />
              <Journal02Detail01 read={true} />
            </div>
          }

          {this.state.detail02 > 0 &&
            <div>
              <hr />
              <Journal02Detail02 read={true} />
            </div>
          }

          {this.state.detail03 > 0 &&
            <div>
              <hr />
              <Journal02Detail03 read={true} />
            </div>
          }

          {this.state.detail04 > 0 &&
            <div>
              <hr />
              <Journal02Detail04 read={true} />
            </div>
          }
        </div>
      </div>
    )
  }
}

/**
 * 首页、查询页
 */
export class Journal02 extends React.Component {
  constructor() {
    super()
    this.state = { message: '', list: [], auth: {}, warningList: [], flowList: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      sessionStorage.setItem('link2', './#/journal.02')
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })

    document.getElementById('date_begin').value = moment().subtract(1, 'days').format('YYYY-MM-DDT20:00:00')
    document.getElementById('date_end').value = moment().format('YYYY-MM-DDT08:00:00')

    fetch(`./api/document/02/?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => {
      this.setState({ list: response.content })
    })
    .catch(err => window.console && console.error(err))

    fetch(`./api/document/02/warning/`)
    .then(res => res.json())
    .then(response => {
      this.setState({ warningList: response.content })
    })
    .catch(err => window.console && console.error(err))
  }

  submit() {
    this.setState({ list: [] })
    this.setState({ warningList: [] })
    fetch(`./api/document/02/filter/`, {
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
        time_end: moment(document.getElementById('date_end').value).format('HH:mm:ss') || '23:59:59',
        content: document.getElementById('component.content-selecter').value,
        content_detail: document.getElementById('content_detail').value,
        p_xdc: document.getElementById('p_xdc').value,
        p_jcw: document.getElementById('p_jcw').value
      })
    })
    .then(res => res.json())
    .then(response => {
      this.setState({ list: response.content })
    })
    .catch(err => window.console && console.error(err))
  }

  handlerListFin() {
    this.setState({ warningList: [] })
    this.setState({ list: [] })
    fetch(`./api/document/02/filter/fin/`, {
      method: 'post',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        dept: document.getElementById('component.dept-list').value || '',
        train: document.getElementById('component.train-list').value || '',
        date_begin: moment(document.getElementById('date_begin').value).format('YYYY-MM-DD'),
        time_begin: moment(document.getElementById('date_begin').value).format('HH:mm:ss') || '00:00:00',
        date_end: moment(document.getElementById('date_end').value).format('YYYY-MM-DD'),
        time_end: moment(document.getElementById('date_end').value).format('HH:mm:ss') || '23:59:59'
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      this.setState({ list: response.content })
    })
    .catch(err => window.console && console.error(err))
  }

  listByUser() {
    this.setState({ warningList: [] })
    this.setState({ list: [] })

    fetch(`./api/common/user/${this.state.auth.id}/dept`)
    .then(res => res.json())
    .then(response => {
      if (response.remark === '班组') {
        // 班组
      }
    })
    .catch(err => window.console && console.error(err))

    fetch(`./api/document/02/filter/user/${this.state.auth.id}?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
    .catch(err => window.console && console.error(err))

    fetch(`./api/document/02/filter/user/${this.state.auth.id}/flow`)
    .then(res => res.json())
    .then(response => { this.setState({ flowList: response.content}) })
    .catch(err => window.console && console.error(err))
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
            <div className="col">
              <ContentSelecter />
            </div>
            <div className="col">
              <div className="form-group">
                <label>详细作业内容</label>
                <input type="text" className="form-control" id="content_detail"></input>
              </div>
            </div>
            <div className="col">
              <label>蓄电池</label>
              <select className="form-control" id="p_xdc">
                <option value="">未选择</option>
                <option value="供">供</option>
                <option value="断">断</option>
                <option value="无要求">无要求</option>
              </select>
            </div>
            <div className="col">
              <label>接触网</label>
              <select className="form-control" id="p_jcw">
                <option value="">未选择</option>
                <option value="供">供</option>
                <option value="断">断</option>
                <option value="无要求">无要求</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {/* <ReloadButton /> */}
              <TimerReloadButton value={15} />

              <div className="btn-group pull-right">
                <button type="button" className="btn btn-outline-primary" onClick={this.submit.bind(this)}>
                  <i className="fa fa-fw fa-search"></i>
                  查询
                </button>

                <ExportFilter2Excel />
                {/* <ExportFilter2ExcelDownload /> */}

                <button type="button" className="btn btn-outline-dark" onClick={this.handlerListFin.bind(this)}>
                  <i className="fa fa-fw fa-power-off"></i>
                  已完成申请单
                </button>

                <button type="button" className="btn btn-outline-info" onClick={this.listByUser.bind(this)}>
                  <i className="fa fa-fw fa-user"></i>
                  我的申请单
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <ul className="list-group">
                {this.state.warningList.map(item =>
                  <Journal02Item key={item.id} item={item} />
                )}
              </ul>
            </div>

            <div className="col-12 mt-3">
              <ul className="list-group">
                {this.state.list.map(item =>
                  <Journal02Item key={item.id} item={item} />
                )}
              </ul>
            </div>

            <div className="col-12 mt-3">
              <ul className="list-group">
                {this.state.flowList.map(item =>
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
