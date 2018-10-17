import React from 'react'
import moment from 'moment'

/**
 * 统一操作按钮
 */
export class ProgressButton extends React.Component {
  constructor() {
    super()
    this.handler = this.handler.bind(this)
  }

  handler() {
    if (
        !!!this.props.item.sign_p_jsy &&
        this.props.auth.auth_p_jsy
    ) return (
      <ApprovePjsyLink />
    )
    else if (
        this.props.item.sign_p_jsy &&
        !!!this.props.item.sign_p_dd &&
        this.props.auth.auth_p_dd
    ) return (
      <ApprovePddSubmit />
    )
    else if (
        this.props.item.sign_p_dd &&
        !!!this.props.item.sign_p_zbsz &&
        this.props.auth.auth_p_zbsz
    ) return (
      <ApprovePzbszSubmit />
    )
    else if (
        this.props.item.sign_p_zbsz &&
        this.props.item.p_jsy_content.indexOf('班组') !== -1 &&
        !!!this.props.item.sign_p_jsy_bz &&
        this.props.auth.dept === this.props.item.p_jsy_bz
    ) return (
      <ApprovePbzSubmit />
    )
    else if (
        this.props.item.sign_p_zbsz &&
        (
          ( this.props.item.p_jsy_content === '无要求' ) ||
          (
            this.props.item.p_jsy_content !== '无要求' &&
            this.props.item.sign_p_jsy_bz
          )
        ) &&
        !!!this.props.item.sign_verify_leader &&
        this.props.auth.id === this.props.item.leader_id
    ) return (
      <ReviewApplicantLink />
    )
    else if (
        this.props.item.sign_verify_leader &&
        (
          this.props.item.p_jsy_content.indexOf('班组') !== -1
        ) &&
        !!!this.props.item.sign_verify_leader_bz &&
        this.props.auth.dept === this.props.item.p_jsy_bz
    ) return (
      <ReviewPbzSubmit />
    )
    else if (
        this.props.item.sign_verify_leader_bz &&
        (
          this.props.item.qty_review_p_gz_02 > 0 ||
          this.props.item.qty_review_p_gz_03 > 0
        )
    ) return (
      <ReviewPgzLink />
    )
    else if (
        this.props.item.qty_review_p_gz_02 === 0 &&
        this.props.item.qty_review_p_gz_03 === 0 &&
        !!!this.props.item.sign_verify_leader_qc &&
        this.props.item.p_jsy_content.indexOf('质检') &&
        this.props.auth.dept === this.props.item.p_jsy_qc
    ) return (
      <ReviewQcLink />
    )
    else if (
        (
          this.props.item.qty_verify_p_jsy_02 > 0 ||
          this.props.item.qty_verify_p_jsy_03 > 0
        ) &&
        this.props.auth.auth_p_jsy
    ) return (
      <ReviewPjsyLink />
    )
    else if (
        this.props.item.sign_verify_leader &&
        (
          this.props.item.p_jsy_content === '无要求' ||
          (
            this.props.item.sign_verify_leader_qc &&
            this.props.item.qty_verify_p_jsy_02 === 0 &&
            this.props.item.qty_verify_p_jsy_03 === 0
          )
        ) &&
        !!!this.props.item.sign_verify &&
        this.props.auth.auth_p_dd
    ) return (
      <ReviewPddLink />
    )
    else window.console && console.error('流程识别错误')
  }

  render() {
    return (
      <span>{this.handler()}</span>
    )
  }
}

/**
 * 详细信息链接
 */
export class DetailLink extends React.Component {
  constructor() {
    super()
    this.handler = this.handler.bind(this)
  }

  handler() {
    sessionStorage.setItem('journal02', this.props.id)
    // window.location = './#/journal.02-detail'
    window.open('./#/journal.02-detail')
  }

  render() {
    return (
      <button type="button" className="btn btn-light" onClick={this.handler}>
        <i className="fa fa-fw fa-file-text-o"></i>
        详细信息
      </button>
    )
  }
}

/**
 * 作业进度标记
 */
export class ProgressTag extends React.Component {
  constructor() {
    super()
    this.handler = this.handler.bind(this)
  }

  handler() {
    if (this.props.item.reject) return (
      <span className="badge badge-danger pull-right">
        {this.props.item.reject_by} 驳回：{this.props.item.reject}
      </span>
    )
    else if (this.props.item.sign_verify) return (
      <span className="badge badge-light pull-right">
        作业完成
      </span>
    )
    else if (
        this.props.item.sign_verify_leader &&
        (
          this.props.item.p_jsy_content === '无要求' ||
          (
            this.props.item.sign_verify_leader_qc &&
            this.props.item.qty_verify_p_jsy_02 === 0 &&
            this.props.item.qty_verify_p_jsy_03 === 0
          )
        )
    ) return (
      <span className="badge badge-success pull-right">
        调度员核销
      </span>
    )
    else if (this.props.item.qty_verify_p_jsy_02 > 0 || this.props.item.qty_verify_p_jsy_03 > 0) return (
      <span className="badge badge-success pull-right">
        技术员签字
      </span>
    )
    else if (
        (this.props.item.p_jsy_content.indexOf('质检') !== 1) &&
        this.props.item.qty_review_p_gz_02 === 0 &&
        this.props.item.qty_review_p_gz_03 === 0
    ) return (
      <span className="badge badge-success pull-right">
        质检签字
      </span>
    )
    else if (
        this.props.item.qty_review_p_gz_02 > 0 || this.props.item.qty_review_p_gz_03 > 0
    ) return (
      <span className="badge badge-success pull-right">
        检修工长确认
      </span>
    )
    else if (this.props.item.sign_verify_leader && (this.props.item.p_jsy_content.indexOf('班组') !== -1)) return (
      <span className="badge badge-success pull-right">
        班组作业人员销记
      </span>
    )
    else if (
        this.props.item.sign_p_zbsz &&
        (
          ( this.props.item.p_jsy_content === '无要求' ) ||
          (
            this.props.item.p_jsy_content !== '无要求' &&
            this.props.item.sign_p_jsy_bz
          )
        ) &&
        !!!this.props.item.sign_verify_leader
    ) return (
      <span className="badge badge-success pull-right">
        作业负责人销记
      </span>
    )
    else if (
        this.props.item.sign_p_zbsz &&
        this.props.item.p_jsy_content !== '无要求' &&
        !!!this.props.item.sign_p_jsy_bz
    ) return (
      <span className="badge badge-info pull-right">
        班组签字
      </span>
    )
    else if (this.props.item.sign_p_dd) return (
      <span className="badge badge-info pull-right">
        值班所长审批
      </span>
    )
    else if (
        this.props.item.sign_p_jsy
    ) return (
      <span className="badge badge-info pull-right">
        动车所调度审核
      </span>
    )
    else if (!!!this.props.item.sign_p_jsy || !!!this.props.item.p_jsy_content) return (
      <span className="badge badge-info pull-right">
        动车所技术员审核
      </span>
    )
  }

  render() {
    return (
      <span>
        {this.handler()}
      </span>
    )
  }
}

/**
 * 下载查询结果的Excel
 * 导出查询结果按钮运行正常后移除
 */
export class ExportFilter2ExcelDownload extends React.Component {
  constructor() {
    super()
    this.handler = this.handler.bind(this)
  }

  handler() {
    window.open(`./download/${JSON.parse(sessionStorage.getItem('auth')).uuid}.xlsx`)
  }

  render() {
    return (
      <button type="button" className="btn btn-outline-success" onClick={this.handler}>
        <i className="fa fa-fw fa-download"></i>
        下载
      </button>
    )
  }
}

// 导出查询结果到Excel
export class ExportFilter2Excel extends React.Component {
  constructor() {
    super()
    this.handler = this.handler.bind(this)
  }

  handler() {
    fetch('./api/common/journal02/export/filter', {
      method: 'post',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        user_uuid: JSON.parse(sessionStorage.getItem('auth')).uuid,
        train: document.getElementById('component.train-list').value,
        dept: document.getElementById('component.dept-list').value,
        date_begin: moment(document.getElementById('date_begin').value).format('YYYY-MM-DD'),
        time_begin: moment(document.getElementById('date_begin').value).format('HH:mm:ss') || '00:00:00',
        date_end: moment(document.getElementById('date_end').value).format('YYYY-MM-DD'),
        time_end: moment(document.getElementById('date_end').value).format('HH:mm:ss') || '23:59:59'
      })
    })
    .then(res => res.json())
    .then(response => {
      window.location = response.content
    })
  }

  render() {
    return (
      <button type="button" className="btn btn-outline-success" onClick={this.handler}>
        <i className="fa fa-fw fa-file-excel-o"></i>
        导出查询结果到Excel
      </button>
    )
  }
}

/**
 * 驳回申请
 * 驳回后通知各审批流程责任人
 * 未通知作业负责人，班组，质检
 */
export class RejectButton extends React.Component {
  constructor() {
    super()
    this.state = { isReject: false }
    this.reject = this.reject.bind(this)
    this.submitReject = this.submitReject.bind(this)
  }

  reject() {
    this.setState({ isReject: !!!this.state.isReject })
  }

  submitReject() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/reject`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        reject: document.getElementById('component.reject-input').value,
        reject_by: auth.name,
        reject_by_id: auth.id
      })
    })
    .then(() => {
      if (this.props.item.leader) {
        fetch(`./api/common/message/`, {
          method: 'post',
          headers: {
            'content-type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            send_by: auth.name,
            send_by_id: auth.id,
            recieve_by: this.props.item.leader,
            recieve_by_id: this.props.item.leader_id,
            title: `一体化作业申请单被驳回，取消后续工作。`,
            content: `由 ${this.props.item.applicant} 提交的一体化作业申请
            （${this.props.item.content} ${this.props.item.content_detail}）被
            ${auth.name} 驳回，驳回原因：${document.getElementById('component.reject-input').value}。
            详细信息请在【已驳回申请】页面中查看。`
          })
        })
      }
      if (this.props.item.sign_p_jsy) {
        fetch(`./api/common/message/`, {
          method: 'post',
          headers: {
            'content-type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            send_by: auth.name,
            send_by_id: auth.id,
            recieve_by: this.props.item.p_jsy,
            recieve_by_id: this.props.item.p_jsy_id,
            title: `一体化作业申请单被驳回，取消后续工作。`,
            content: `由 ${this.props.item.applicant} 提交的一体化作业申请
            （${this.props.item.content} ${this.props.item.content_detail}）被
            ${auth.name} 驳回，驳回原因：${document.getElementById('component.reject-input').value}。
            详细信息请在【已驳回申请】页面中查看。`
          })
        })
      }
      if (this.props.item.sign_p_dd) {
        fetch(`./api/common/message/`, {
          method: 'post',
          headers: {
            'content-type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            send_by: auth.name,
            send_by_id: auth.id,
            recieve_by: this.props.item.p_dd,
            recieve_by_id: this.props.item.p_dd_id,
            title: `一体化作业申请单被驳回，取消后续工作。`,
            content: `由 ${this.props.item.applicant} 提交的一体化作业申请
            （${this.props.item.content} ${this.props.item.content_detail}）被
            ${auth.name} 驳回，驳回原因：${document.getElementById('component.reject-input').value}。
            详细信息请在【已驳回申请】页面中查看。`
          })
        })
      }
      if (this.props.item.sign_p_zbsz) {
        fetch(`./api/common/message/`, {
          method: 'post',
          headers: {
            'content-type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            send_by: auth.name,
            send_by_id: auth.id,
            recieve_by: this.props.item.p_zbsz,
            recieve_by_id: this.props.item.p_zbsz_id,
            title: `一体化作业申请单被驳回，取消后续工作。`,
            content: `由 ${this.props.item.applicant} 提交的一体化作业申请
            （${this.props.item.content} ${this.props.item.content_detail}）被
            ${auth.name} 驳回，驳回原因：${document.getElementById('component.reject-input').value}。
            详细信息请在【已驳回申请】页面中查看。`
          })
        })
      }
      window.location = './#/journal.02'
    })
  }

  render() {
    return (
      <span>
        {this.state.isReject &&
          <div className="form-inline">
            <label>驳回原因：</label>
            <input type="text" className="col-2 form-control form-control-sm" id="component.reject-input" />
            <button type="button" className="btn btn-sm btn-danger" onClick={this.submitReject}>确认</button>
            <br />
            <br />
          </div>
        }
        <button type="button" className="btn btn-outline-danger" onClick={this.reject}>
          <i className="fa fa-fw fa-reply"></i>
          驳回
        </button>
      </span>
    )
  }
}

// 驳回
export class RejectSubmit extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isReject: false }
    this.reject = this.reject.bind(this)
    this.submitReject = this.submitReject.bind(this)
  }

  reject() {
    this.setState({ isReject: !!!this.state.isReject })
  }

  submitReject() {
    if (!!!document.getElementById('input-reject').value) {
      alert('请填写驳回原因')
      return
    }
    fetch(`./api/journal02/${this.props.id}/reject/${this.props.operation}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        reject: document.getElementById('input-reject').value,
        reject_by: this.props.auth.name,
        reject_by_id: this.props.auth.id
      })
    })
    .then(() => window.location.reload(true))
  }

  render() {
    return (
      <span>
        {this.state.isReject &&
          <div className="form-inline">
            <label>驳回原因：</label>
            <input type="text" className="col-2 form-control form-control-sm" id="input-reject" />
            <button type="button" className="btn btn-sm btn-danger" onClick={this.submitReject}>确认</button>
            <br />
            <br />
          </div>
        }
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={this.reject}>
          <i className="fa fa-fw fa-reply"></i>
          驳回
        </button>
      </span>
    )
  }
}

/**
 * 调度销记
 */
export class ReviewPddSubmit extends React.Component {
  constructor() {
    super()
    this.state = { auth: {} }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return false
    this.setState({ auth: auth })
  }

  submit() {
    if (!!!this.state.auth.sign) {
      alert('请先设置签名')
      return false
    }
    if (!!!document.getElementById('remark').value) {
      alert('请填写备注，没有备注内容时需要填写“无”')
      return
    }
    // fetch(`./api/journal02/verify/${sessionStorage.getItem('journal02')}`, {
    fetch(`./api/document/02/review/p_dd/${sessionStorage.getItem('journal02')}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        verify: this.state.auth.name,
        verify_id: this.state.auth.id,
        remark: document.getElementById('remark').value,
        sign: this.state.auth.sign
      })
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

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        确认
      </button>
    )
  }
}

/**
 * 跳转调度销记
 */
export class ReviewPddLink extends React.Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit() {
    window.location.href = './#/journal.02-verify.p_dd'
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        调度员销记
      </button>
    )
  }
}

/**
 * 未测试
 * 技术员销记
 */
export class ReviewPjsySubmit extends React.Component {
  constructor() {
    super()
    this.state = { auth: {} }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return false
    this.setState({ auth: auth })
  }

  submit() {
    let selector = document.getElementsByTagName('select')
    for (let i = 0; i < selector.length; i++) {
      if (selector[i].value === '') {
        alert('请选择监控结果')
        return
      }
    }
    alert('操作已提交至服务器，确认后可以关闭页面。')
    window.location.reload(true)
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        确认
      </button>
    )
  }
}

/**
 * 未测试
 * 跳转技术员销记
 */
export class ReviewPjsyLink extends React.Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit() {
    window.location.href = './#/journal.02-verify.p_jsy'
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        技术员销记
      </button>
    )
  }
}

/**
 * 质检销记
 */
export class ReviewQcSubmit extends React.Component {
  constructor() {
    super()
    this.state = { auth: {} }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return false
    this.setState({ auth: auth })
  }

  submit() {
    if (!!!this.state.auth.sign) {
      alert('请先设置签名')
      return false
    }
    let selector = document.getElementsByTagName('select')
    for (let i = 0; i < selector.length; i++) {
      if (selector[i].value === '') {
        alert('请选择监控结果')
        return
      }
    }
    // fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/verify/leader/qc`, {
    fetch(`./api/document/02/review/qc/${sessionStorage.getItem('journal02')}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        sign: this.state.auth.sign
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      alert('操作已提交至服务器，确认后可以关闭页面。')
      window.location.reload(true)
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        确认
      </button>
    )
  }
}

/**
 * 跳转质检销记
 */
export class ReviewQcLink extends React.Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit() {
    window.location.href = './#/journal.02-verify.qc'
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        质检销记
      </button>
    )
  }
}

/**
 * 一般配件和关键配件更换记录销记时触发
 * 班组工长流程
 */
export class ReviewPgzSubmit extends React.Component {
  handler() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return
    let selector = document.getElementsByTagName('select')
    console.info(selector)
    for (let i = 0; i < selector.length; i++) {
      if (selector[i].value === '') {
        alert('请选择监控结果')
        return
      }
    }
    alert('操作已提交至服务器，确认后可以关闭页面。')
    window.location.reload(true)
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.handler.bind(this)}>
        <i className="fa fa-fw fa-edit"></i>
        检修工长确认
      </button>
    )
  }
}

/**
 * 链接：班组工长流程
 */
export class ReviewPgzLink extends React.Component {
  handler() {
    window.location.href = './#/journal.02-review.p_gz'
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.handler.bind(this)}>
        <i className="fa fa-fw fa-edit"></i>
        检修工长确认
      </button>
    )
  }
}

/**
 * 班组销记
 * 2018.10改动：班组签申请单，工长签子单
 */
export class ReviewPbzSubmit extends React.Component {
  constructor() {
    super()
    this.state = { auth: {} }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return false
    this.setState({ auth: auth })
  }

  submit() {
    if (!!!this.state.auth.sign) {
      alert('请先设置签名')
      return false
    }
    // fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/verify/leader/bz`, {
    fetch(`./api/document/02/${sessionStorage.getItem('journal02')}/review/p_bz`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        sign: this.state.auth.sign
      })
    })
    .then(() => window.location.reload(true))
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        班组作业人员销记
      </button>
    )
  }
}

/**
 * 作业负责人销记
 */
export class ReviewApplicantSubmit extends React.Component {
  constructor() {
    super()
    this.state = { auth: {} }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return false
    this.setState({ auth: auth })
  }

  submit() {
    if (!!!this.state.auth.sign) {
      alert('请先设置签名')
      return false
    }
    if (!!!document.getElementById('verify_report').value) {
      alert('请填写作业完成情况')
      return
    }
    if (!!!document.getElementById('remark').value) {
      alert('请填写备注，没有备注内容时需要填写“无”')
      return
    }
    if (!!!window.confirm(`注意：
    普查作业需要填写【一般部件普查记录单】
    故障处理作业需要填写【一般配件更换记录表】或【关键配件更换记录表】
    加装改造作业需要填写【加装改造（软件升级）记录单】
    不填写记录单直接销记请点击【确定】，返回填写记录单点击【取消】`)) return
    // fetch(`./api/journal02/verify/leader/${sessionStorage.getItem('journal02-detail')}`, {
    fetch(`./api/document/02/review/applicant/${sessionStorage.getItem('journal02-detail')}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        date_begin: moment(document.getElementById('dtime_begin').value).format('YYYY-MM-DD'),
        time_begin: moment(document.getElementById('dtime_begin').value).format('HH:mm:00'),
        date_end: moment(document.getElementById('dtime_end').value).format('YYYY-MM-DD'),
        time_end: moment(document.getElementById('dtime_end').value).format('HH:mm:00'),
        verify_report: document.getElementById('verify_report').value,
        verify_leader: this.state.auth.name,
        verify_leader_id: this.state.auth.id,
        remark: document.getElementById('remark').value,
        sign: this.state.auth.sign
      })
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

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        确认
      </button>
    )
  }
}

/**
 * 跳转作业负责人销记
 */
export class ReviewApplicantLink extends React.Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit() {
    window.location.href = './#/journal.02-verify.leader'
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        作业负责人销记
      </button>
    )
  }
}

/**
 * 值班所长审批
 */
export class ApprovePzbszSubmit extends React.Component {
  constructor() {
    super()
    this.state = { auth: {} }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return false
    this.setState({ auth: auth })
  }

  submit() {
    if (!!!this.state.auth.sign) {
      alert('请先设置签名')
      return false
    }
    // fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/zbsz`, {
    fetch(`./api/document/02/approve/p_zbsz/${sessionStorage.getItem('journal02')}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        p_zbsz: this.state.auth.name,
        p_zbsz_id: this.state.auth.id,
        sign: this.state.auth.sign
      })
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

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        值班所长审批
      </button>
    )
  }
}

/**
 * 调度审批
 */
export class ApprovePddSubmit extends React.Component {
  constructor() {
    super()
    this.state = { auth: {} }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return false
    this.setState({ auth: auth })
  }

  submit() {
    if (!!!this.state.auth.sign) {
      alert('请先设置签名')
      return false
    }
    // fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/dd`, {
    fetch(`./api/document/02/approve/p_dd/${sessionStorage.getItem('journal02')}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        p_dd: this.state.auth.name,
        p_dd_id: this.state.auth.id,
        sign: this.state.auth.sign
      })
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

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        调度审核
      </button>
    )
  }
}

/**
 * 班组签字
 */
export class ApprovePbzSubmit extends React.Component {
  constructor() {
    super()
    this.state = { auth: {} }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return false
    this.setState({ auth: auth })
  }

  submit() {
    if (!!!this.state.auth.sign) {
      alert('请先设置签名')
      return false
    }
    // fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/jsy/bz`, {
    fetch(`./api/document/02/approve/p_bz/${sessionStorage.getItem('journal02')}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        sign: this.state.auth.sign
      })
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

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        班组签字
      </button>
    )
  }
}

/**
 * 技术员审批
 */
export class ApprovePjsySubmit extends React.Component {
  constructor() {
    super()
    this.state = { auth: {} }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return false
    this.setState({ auth: auth })
  }

  submit() {
    if (!!!document.getElementById('p_jsy_content').value) {
      this.setState({ message: '请选择工作形式' })
      return false
    }
    if (!!!document.getElementById('component.p_bz-list').value &&
        document.getElementById('p_jsy_content').value !== '无要求' &&
        document.getElementById('p_jsy_content').value !== '') {
      this.setState({ message: '请选择班组' })
      return false
    }
    if (!!!document.getElementById('qc').value &&
        document.getElementById('p_jsy_content').value !== '无要求' &&
        document.getElementById('p_jsy_content').value !== '') {
      this.setState({ message: '请选择质检' })
      return false
    }
    if (!!!this.state.auth.sign) {
      alert('请先设置签名')
      return false
    }
    // fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/jsy`, {
    fetch(`./api/document/02/${sessionStorage.getItem('journal02')}/approve/p_jsy`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        p_jsy_id: this.state.auth.id,
        p_jsy: this.state.auth.name,
        p_jsy_content: document.getElementById('p_jsy_content').value,
        p_jsy_bz: document.getElementById('component.p_bz-list').value,
        p_jsy_qc: document.getElementById('qc').value,
        sign: this.state.auth.sign
      })
    })
    .then(res => res.json())
    .then(response => window.location.href = './#/journal.02-check')
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        技术员签字
      </button>
    )
  }
}

/**
 * 跳转技术员审批
 */
export class ApprovePjsyLink extends React.Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit() {
    window.location.href = './#/journal.02-p_jsy.content'
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        技术员审核
      </button>
    )
  }
}

/**
 * 物理删除申请单及所有子单
 */
export class RemoveButton extends React.Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit() {
    let id = sessionStorage.getItem('journal02')
    if (!!!id) {
      alert('操作失败')
      return false
    }
    fetch(`./api/document/02/${id}`, {
      method: 'delete'
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      window.location.href = './#/journal.02'
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <button type="button" className="btn btn-danger" onClick={this.submit}>
        <i className="fa fa-fw fa-remove"></i>
        删除
      </button>
    )
  }
}

/**
 * 主要功能工具栏
 */
export default class Journal02Toolbar extends React.Component {
  constructor() {
    super()
    this.state = { todoApprove: 0, todoReview: 0 }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) return
    // 待处理任务计数
    if (auth.auth_p_jsy) {
      // fetch(`./api/journal02/todo/p_jsy?timestamp=${new Date().getTime()}`)
      fetch(`./api/document/02/todo/p_jsy?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ todoApprove: this.state.todoApprove + response.content.qty })
        this.setState({ todoReview: this.state.todoReview + response.content.qty1 })
      })
      .catch(err => window.console && console.error(err))
    }

    // fetch(`./api/journal02/todo/p_bz/${auth.dept}?timestamp=${new Date().getTime()}`)
    fetch(`./api/document/02/todo/p_bz/${auth.dept}?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => {
      this.setState({ todoApprove: this.state.todoApprove + response.content.qty })
      this.setState({ todoReview: this.state.todoReview + response.content.qty1 })
    })
    .catch(err => window.console && console.error(err))

    if (auth.dept_leader === '是') {
      fetch(`./api/document/02/todo/p_gz/${auth.dept}?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ todoReview: this.state.todoReview + response.content.qty })
      })
      .catch(err => window.console && console.error(err))
    }

    // fetch(`./api/journal02/todo/qc/${auth.dept}?timestamp=${new Date().getTime()}`)
    fetch(`./api/document/02/todo/qc/${auth.dept}?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => {
      // this.setState({ todoApprove: this.state.todoApprove + response.content.qty })
      this.setState({ todoReview: this.state.todoReview + response.content.qty1 })
    })
    .catch(err => window.console && console.error(err))

    if (auth.auth_p_dd) {
      // fetch(`./api/journal02/todo/p_dd?timestamp=${new Date().getTime()}`)
      fetch(`./api/document/02/todo/p_dd?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ todoApprove: this.state.todoApprove + response.content.qty })
        this.setState({ todoReview: this.state.todoReview + response.content.qty1 })
      })
      .catch(err => window.console && console.error(err))
    }

    if (auth.auth_p_zbsz) {
      // fetch(`./api/journal02/todo/p_zbsz?timestamp=${new Date().getTime()}`)
      fetch(`./api/document/02/todo/p_zbsz?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ todoApprove: this.state.todoApprove + response.content.qty })
      })
      .catch(err => window.console && console.error(err))
    }
  }

  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href="./#/journal.02" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href="./#/journal.02-save" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增申请
        </a>
        <a href="./#/journal.02-check" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-check-square-o"></i>
          动车所审核&nbsp;
          {this.state.todoApprove > 0 &&
            <span className="badge badge-pill badge-danger">{this.state.todoApprove}</span>
          }
        </a>
        <a href="./#/journal.02-verify" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-archive"></i>
          作业完成销记&nbsp;
          {this.state.todoReview > 0 &&
            <span className="badge badge-pill badge-danger">{this.state.todoReview}</span>
          }
        </a>
        <a href="./#/journal.02-stats" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-pie-chart"></i>
          数据统计
        </a>
        <a href="./#/journal.02-reject.list" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-reply"></i>
          已驳回申请
        </a>
      </div>
    )
  }
}
