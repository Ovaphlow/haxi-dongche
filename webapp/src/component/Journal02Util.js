import React from 'react'
import moment from 'moment'

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
        this.props.item.p_jsy_content.indexOf('班组') !== -1 &&
        !!!this.props.item.sign_p_jsy_bz &&
        this.props.auth.dept === this.props.item.p_jsy_bz
    ) return (
      <ApprovePbzSubmit />
    )
    else if (
        this.props.item.sign_p_jsy_bz &&
        this.props.item.p_jsy_content.indexOf('质检跟踪') !== -1 &&
        !!!this.props.item.sign_p_jsy_qc &&
        this.props.auth.dept === this.props.item.p_jsy_qc
    ) return (
      <ApproveQcSubmit />
    )
    else if (
        this.props.item.sign_p_jsy &&
        (
          (
            this.props.item.p_jsy_content.indexOf('班组跟踪') !== -1 &&
            this.props.item.sign_p_jsy_bz
          ) ||
          (
            this.props.item.p_jsy_content.indexOf('质检跟踪') !== -1 &&
            this.props.item.sign_p_jsy_qc
          ) ||
          this.props.item.p_jsy_content === '无要求'
        ) &&
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
      <ReviewPbzLink />
    )
    else if (
        this.props.item.sign_verify_leader_bz &&
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
  }

  render() {
    return (
      <span>{this.handler()}</span>
    )
  }
}

export class DetailLink extends React.Component {
  constructor() {
    super()
    this.handler = this.handler.bind(this)
  }

  handler() {
    sessionStorage.setItem('journal02', this.props.id)
    window.location.href = './#/journal.02-detail'
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
    else if ((this.props.item.p_jsy_content.indexOf('质检') !== 1) && this.props.item.sign_verify_leader_bz) return (
      <span className="badge badge-success pull-right">
        质检签字
      </span>
    )
    else if (this.props.item.sign_verify_leader && (this.props.item.p_jsy_content.indexOf('班组') !== -1)) return (
      <span className="badge badge-success pull-right">
        班组签字
      </span>
    )
    else if (this.props.item.sign_p_zbsz) return (
      <span className="badge badge-success pull-right">
        作业负责人销记
      </span>
    )
    else if (this.props.item.sign_p_dd) return (
      <span className="badge badge-info pull-right">
        值班所长审批
      </span>
    )
    else if (this.props.item.sign_p_jsy && ((this.props.item.p_jsy_content.indexOf('班组跟踪') !== -1 && this.props.item.sign_p_jsy_bz) ||
        (this.props.item.p_jsy_content.indexOf('质检跟踪') !== -1 && this.props.item.sign_p_jsy_qc) ||
        this.props.item.p_jsy_content === '无要求')) return (
      <span className="badge badge-info pull-right">
        动车所调度审核
      </span>
    )
    else if (this.props.item.sign_p_jsy_bz && this.props.item.p_jsy_content.indexOf('质检跟踪') !== -1 && !!!this.props.item.sign_p_jsy_qc) return (
      <span className="badge badge-info pull-right">
        质检签字
      </span>
    )
    else if (this.props.item.sign_p_jsy && this.props.item.p_jsy_content.indexOf('班组') !== -1 && !!!this.props.item.sign_p_jsy_bz) return (
      <span className="badge badge-info pull-right">
        班组签字
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
    fetch(`./api/journal02/verify/${sessionStorage.getItem('journal02')}`, {
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
    .then(() => window.location.href = './#/journal.02-verify')
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
    window.location.href = './#/journal.02-verify' 
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
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/verify/leader/qc`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        sign: this.state.auth.sign
      })
    })
    .then(() => window.location.href = './#/journal.02-verify')
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
 * 班组销记
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
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/verify/leader/bz`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        sign: this.state.auth.sign
      })
    })
    .then(() => window.location.href = './#/journal.02-verify')
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
 * 跳转班组销记
 */
export class ReviewPbzLink extends React.Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit() {
    window.location.href = './#/journal.02-verify.p_bz'
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        班组销记
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
    fetch(`./api/journal02/verify/leader/${sessionStorage.getItem('journal02-detail')}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        verify_report: document.getElementById('verify_report').value,
        verify_leader: this.state.auth.name,
        verify_leader_id: this.state.auth.id,
        verify_leader_date: document.getElementById('verify_leader_date').value,
        verify_leader_time: document.getElementById('verify_leader_time').value,
        remark: document.getElementById('remark').value,
        sign: this.state.auth.sign
      })
    })
    .then(() => window.location.href = './#/journal.02-verify')
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
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/zbsz`, {
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
    .then(() => window.location.reload(true))
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
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/dd`, {
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
    .then(() => window.location.reload(true))
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
 * 质检签字
 */
export class ApproveQcSubmit extends React.Component {
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
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/jsy/qc`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        sign: this.state.auth.sign
      })
    })
    .then(() => window.location.reload(true))
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-edit"></i>
        质检签字
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
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/jsy/bz`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        sign: this.state.auth.sign
      })
    })
    .then(() => window.location.reload(true))
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
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/jsy`, {
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
    fetch(`./api/journal02/${id}`, {
      method: 'delete'
    })
    .then(res => {
      res.json()
      window.location.href = './#/journal.02'
    })
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

export default class Journal02Toolbar extends React.Component {
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
          动车所审核
        </a>
        <a href="./#/journal.02-verify" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-archive"></i>
          作业完成销记
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
