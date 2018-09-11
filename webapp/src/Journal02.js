import axios from 'axios'
import echarts from 'echarts'
import React from 'react'
import moment from 'moment'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import Journal02Master from './component/Journal02Master'
import Journal02Item from './component/Journal02Item'
import {
    Message, BackButton, ReloadButton, DeptList, TrainList, MessageAlert, DeptListPbz
} from './component/Common'
import { ExportFilter2Excel, ProgressButton } from './component/Journal02Util'
import {
    Journal02Detail01, Journal02Detail02, Journal02Detail03, Journal02Detail04
} from './component/Journal02Detail'
import {
    ApprovePjsySubmit,
    ReviewApplicantSubmit,
    ReviewPbzSubmit, ReviewQcSubmit, ReviewPjsySubmit, ReviewPddSubmit
} from './component/Journal02Util'
import { RejectButton, RemoveButton } from './component/Journal02Util'

/**
 * 已驳回申请列表
 */
export class Journal02RejectList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list: [] }
  }

  componentDidMount() {
    fetch('./api/journal02/reject/')
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
    fetch('./api/journal02/stats', {
      method: 'get',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    })
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
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}`)
    .then(res => res.json())
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

    fetch('./api/journal02/' + sessionStorage.getItem('journal02') + '/01/')
    .then(res => res.json())
    .then(response => this.setState({ detail01: response.content }))

    fetch('./api/journal02/' + sessionStorage.getItem('journal02') + '/02/')
    .then(res => res.json())
    .then(response => this.setState({ detail02: response.content }))

    fetch('./api/journal02/' + sessionStorage.getItem('journal02') + '/03/')
    .then(res => res.json())
    .then(response => this.setState({ detail03: response.content }))

    fetch('./api/journal02/' + sessionStorage.getItem('journal02') + '/04/')
    .then(res => res.json())
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
            <div className="row">
              <hr/>
              <Journal02Detail02 detail={this.state.detail02} p_jsy={true} auth={this.state.auth} />
            </div>
          }

          {this.state.detail03.length > 0 &&
            <div className="row">
              <hr/>
              <Journal02Detail03 detail={this.state.detail03} p_jsy={true} auth={this.state.auth} />
            </div>
          }

          {this.state.detail04.length > 0 &&
            <div className="row">
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

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail01: response.data.content })
    }).catch(err => this.setState({ message: '服务器通信异常' }))

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail02: response.data.content })
    }).catch(err => this.setState({ message: '服务器通信异常' }))

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/03/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail03: response.data.content })
    }).catch(err => this.setState({ message: '服务器通信异常' }))

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail04: response.data.content })
    }).catch(err => this.setState({ message: '服务器通信异常' }))
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
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          {this.state.detail01.length > 0 &&
            <Journal02Detail01 detail={this.state.detail01} qc={true} auth={this.state.auth} />
          }

          <div className="row"><hr/></div>

          {this.state.detail02.length > 0 &&
            <Journal02Detail02 detail={this.state.detail02} qc={true} auth={this.state.auth} />
          }

          <div className="row"><hr/></div>

          {this.state.detail03.length > 0 &&
            <Journal02Detail03 detail={this.state.detail03} qc={true} auth={this.state.auth} />
          }

          <div className="row"><hr/></div>

          {this.state.detail04.length > 0 &&
            <Journal02Detail04 detail={this.state.detail04} qc={true} auth={this.state.auth} />
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
 * 班组销记
 */
export class Journal02VerifyPbz extends React.Component {
  constructor(props) {
    super(props)
    this.state = { detail01: [], detail02: [], detail03: [], detail04: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/01/`)
    .then(res => res.json())
    .then(response => this.setState({ detail01: response.content }))

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/02/`)
    .then(res => res.json())
    .then(response => this.setState({ detail02: response.content }))

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/03/`)
    .then(res => res.json())
    .then(response => this.setState({ detail03: response.content }))

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/04/`)
    .then(res => res.json())
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
            <Journal02Detail01 detail={this.state.detail01} p_bz={true} auth={this.state.auth} />
          }

          <div className="row"><hr/></div>

          {this.state.detail02.length > 0 &&
            <Journal02Detail02 detail={this.state.detail02} p_bz={true} auth={this.state.auth} />
          }

          <div className="row"><hr/></div>

          {this.state.detail03.length > 0 &&
            <Journal02Detail03 detail={this.state.detail03} p_bz={true} auth={this.state.auth} />
          }

          <div className="row"><hr/></div>

          {this.state.detail04.length > 0 &&
            <Journal02Detail04 detail={this.state.detail04} p_bz={true} auth={this.state.auth} />
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

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}`)
    .then(res => res.json())
    .then(response => {
      sessionStorage.setItem('journal02-detail', response.content.id)
      response.content.veirfy_report && (document.getElementById('verify_report').value = response.content.verify_report)
      document.getElementById('dtime_begin').value = moment(
          `${response.content.date_begin} ${response.content.time_begin}`)
          .format('YYYY-MM-DDThh:mm')
      document.getElementById('dtime_end').value = moment(
          `${response.content.date_end} ${response.content.time_end}`)
          .format('YYYY-MM-DDThh:mm')
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
                  <button type="button" className="btn btn-outline-secondary" data-id="1" onClick={this.detail}>
                    一般部件普查记录单
                  </button>

                  <button type="button" className="btn btn-outline-secondary" data-id="2" onClick={this.detail}>
                    一般配件更换记录表
                  </button>

                  <button type="button" className="btn btn-outline-secondary" data-id="3" onClick={this.detail}>
                    关键配件更换记录表
                  </button>

                  <button type="button" className="btn btn-outline-secondary" data-id="4" onClick={this.detail}>
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

    fetch('./api/journal02/verify/leader/' + auth.id + '?timestamp=' + new Date().getTime())
    .then(res => res.json())
    .then(response => this.setState({ list_leader: response.content }))

    fetch('./api/journal02/verify/leader/bz/' + auth.dept + '?timestamp=' + new Date().getTime())
    .then(res => res.json())
    .then(response => this.setState({ list_p_bz: response.content }))

    if (auth.dept === '质检') {
      fetch('./api/journal02/verify/leader/qc/' + auth.dept + '?timestamp=' + new Date().getTime())
      .then(res => res.json())
      .then(response => this.setState({ list_qc: response.content }))
    }

    if (auth.auth_p_jsy) {
      fetch('./api/journal02/verify/p_jsy?timestamp=' + new Date().getTime())
      .then(res => res.json())
      .then(response => this.setState({ list_p_jsy: response.content }))
    }

    if (auth.auth_p_dd) {
      fetch('./api/journal02/verify/?timestamp=' + new Date().getTime())
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

    axios({
      method: 'get',
      url: './api/journal02/jsy/bz/' + auth.dept + '?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list_p_jsy_bz: response.data.content })
    }).catch(err => this.setState({ message: `服务器通信异常` }))

    if (auth.dept === '质检') {
      axios({
        method: 'get',
        url: './api/journal02/jsy/qc/' + auth.dept + '?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_jsy_qc: response.data.content })
      }).catch(err => this.setState({ message: `服务器通信异常` }))
    }

    if (auth.auth_p_jsy) {
      axios({
        method: 'get',
        url: './api/journal02/jsy/?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_jsy: response.data.content })
      }).catch(err => this.setState({ message: `服务器通信异常` }))
    }

    if (auth.auth_p_zbsz) {
      axios({
        method: 'get',
        url: './api/journal02/zbsz/?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_zbsz: response.data.content })
      }).catch(err => this.setState({ message: `服务器通信异常` }))
    }

    if (auth.auth_p_dd) {
      axios({
        method: 'get',
        url: './api/journal02/dd/?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_dd: response.data.content })
      }).catch(err => this.setState({ message: `服务器通信异常` }))
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

              {this.state.list_p_zbsz.map(item =>
                <Journal02Item key={item.id} item={item} operation="p_zbsz" />
              )}

              {this.state.list_p_dd.map(item =>
                <Journal02Item key={item.id} item={item} operation="p_dd" />
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
    this.state = { auth: {}, master: {}, detail01: 0, detail02: 0, detail03: 0, detail04: 0 }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}`)
    .then(res => res.json())
    .then(response => this.setState({ master: response.content }))

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/01/qty?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => this.setState({ detail01: response.content.qty }))

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/02/qty?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => this.setState({ detail02: response.content.qty }))

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/03/qty?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => this.setState({ detail03: response.content.qty }))

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/04/qty?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => this.setState({ detail04: response.content.qty }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-list" title="详细信息" toolbar="Journal02Toolbar" />

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
