import React from 'react'

export default class Journal02Item extends React.Component {
  constructor(props) {
    super(props)
    this.renderBadge = this.renderBadge.bind(this)
    this.detail = this.detail.bind(this)
    this.checkPjsy = this.checkPjsy.bind(this)
    this.checkPjsybz = this.checkPjsybz.bind(this)
    this.checkPjsyQc = this.checkPjsyQc.bind(this)
    this.checkPzbsz = this.checkPzbsz.bind(this)
    this.checkPdd = this.checkPdd.bind(this)
    this.verifyLeader = this.verifyLeader.bind(this)
    this.verifyLeaderPbz = this.verifyLeaderPbz.bind(this)
    this.verifyLeaderQc = this.verifyLeaderQc.bind(this)
    this.verify = this.verify.bind(this)
  }

  detail(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    location.href = './journal.02-detail.html'
  }

  renderBadge() {
    if (this.props.item.verify_id > 0) return (
      <span className="badge badge-light pull-right">
        作业完成
      </span>
    )
    else if (this.props.item.sign_verify_leader && (this.props.item.p_jsy_content === '同意') || this.props.item.sign_verify_leader_qc) return (
      <span className="badge badge-dark pull-right">
        调度员核销
      </span>
    )
    else if ((this.props.item.p_jsy_content.indexOf('质检') !== 1) && this.props.item.sign_verify_leader_bz) return (
      <span className="badge badge-danger pull-right">
        质检签字
      </span>
    )
    else if (this.props.item.sign_verify_leader && (this.props.item.p_jsy_content.indexOf('班组') !== -1)) return (
      <span className="badge badge-danger pull-right">
        班组签字
      </span>
    )
    else if (this.props.item.sign_p_zbsz) return (
      <span className="badge badge-success pull-right">
        作业负责人销记
      </span>
    )
    else if (this.props.item.sign_p_dd) return (
      <span className="badge badge-warning pull-right">
        值班所长审批
      </span>
    )
    else if (this.props.item.sign_p_jsy && ((this.props.item.p_jsy_content.indexOf('班组跟踪') !== -1 && this.props.item.sign_p_jsy_bz) ||
        (this.props.item.p_jsy_content.indexOf('质检跟踪') !== -1 && this.props.item.sign_p_jsy_qc) ||
        this.props.item.p_jsy_content === '同意')) return (
      <span className="badge badge-danger pull-right">
        动车所调度审核
      </span>
    )
    else if (this.props.item.sign_p_jsy_bz && this.props.item.p_jsy_content.indexOf('质检跟踪') !== -1 && !!!this.props.item.sign_p_jsy_qc) return (
      <span className="badge badge-info pull-right">
        质检签字
      </span>
    )
    else if (this.props.item.sign_p_jsy && this.props.item.p_jsy_content.indexOf('班组') !== -1 && !!!this.props.item.sign_p_jst_bz) return (
      <span className="badge badge-info pull-right">
        班组签字
      </span>
    )
    else if (!!!this.props.item.sign_p_jsy) return (
      <span className="badge badge-info pull-right">
        动车所技术员审核
      </span>
    )
  }

  checkPjsy(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    let sign = {
      category: 'journal02',
      from: './journal.02-check.html',
      to: './journal.02-jsy.content.html',
      operation: 'jsy',
      item_id: event.target.getAttribute('data-id')
    }
    sessionStorage.setItem('sign', JSON.stringify(sign))
    location.href = './sign.html'
  }

  checkPjsybz(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    let sign = {
      category: 'journal02',
      from: './journal.02-check.html',
      to: './journal.02-check.html',
      operation: 'jsy-bz',
      item_id: event.target.getAttribute('data-id')
    }
    sessionStorage.setItem('sign', JSON.stringify(sign))
    location.href = './sign.html'
  }

  checkPjsyQc(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    let sign = {
      category: 'journal02',
      from: './journal.02-check.html',
      to: './journal.02-check.html',
      operation: 'jsy-qc',
      item_id: event.target.getAttribute('data-id')
    }
    sessionStorage.setItem('sign', JSON.stringify(sign))
    location.href = './sign.html'
  }

  checkPzbsz(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    let sign = {
      category: 'journal02',
      from: './journal.02-check.html',
      to: './journal.02-check.html',
      operation: 'zbsz',
      item_id: event.target.getAttribute('data-id')
    }
    sessionStorage.setItem('sign', JSON.stringify(sign))
    location.href = './sign.html'
  }

  checkPdd(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    let sign = {
      category: 'journal02',
      from: './journal.02-check.html',
      to: './journal.02-check.html',
      operation: 'dd',
      item_id: event.target.getAttribute('data-id')
    }
    sessionStorage.setItem('sign', JSON.stringify(sign))
    location.href = './sign.html'
  }

  verifyLeader(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    location.href = './journal.02-verify.leader.html'
  }

  verifyLeaderPbz(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    location.href = './journal.02-verify.p_bz.html'
  }

  verifyLeaderQc(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    location.href = './journal.02-verify.qc.html'
  }

  verify(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    location.href = './journal.02-verify.p_dd.html'
  }

  render() {
    return (
      <li className="list-group-item">
        <p className="lead">
          <strong>{this.props.item.content}</strong>
          {this.renderBadge(this.props.item)}
        </p>

        <ul className="list-inline">
          <li className="list-inline-item">
            <span className="text-secondary">申请单位：</span>
            {this.props.item.dept}
          </li>
          <li className="list-inline-item">
            <span className="text-secondary">申请人：</span>
            {this.props.item.applicant} ({this.props.item.applicant_phone})
          </li>
          <li className="list-inline-item">
            <span className="text-secondary">作业负责人：</span>
            {this.props.item.leader} ({this.props.item.leader})
          </li>
          <li className="list-inline-item">
            <span className="text-secondary">作业车组号：</span>
            {this.props.item.group_sn}
          </li>
          <li className="list-inline-item">
            <span className="text-secondary">申请作业时间：</span>
            {this.props.item.date_begin} {this.props.item.time_begin} 至 {this.props.item.date_end} {this.props.item.time_end}
          </li>
        </ul>

        <div className="row">
          <div className="col-12">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-light" data-id={this.props.item.id} onClick={this.detail}>
                详细信息
              </button>
              {this.props.p_jsy &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.checkPjsy}>
                  技术员审核
                </button>
              }
              {this.props.p_jsy_bz &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.checkPjsybz}>
                  班组签字
                </button>
              }
              {this.props.p_jsy_qc &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.checkPjsyQc}>
                  质检签字
                </button>
              }
              {this.props.p_zbsz &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.checkPzbsz}>
                  值班所长审批
                </button>
              }
              {this.props.p_dd &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.checkPdd}>
                  调度审核
                </button>
              }
              {this.props.verify_leader &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.verifyLeader}>
                  作业完成
                </button>
              }
              {this.props.verify_p_bz &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.verifyLeaderPbz}>
                  作业完成
                </button>
              }
              {this.props.verify_qc &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.verifyLeaderQc}>
                  作业完成
                </button>
              }
              {this.props.verify_p_dd &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.verify}>
                  调度员签字
                </button>
              }
            </div>
          </div>
        </div>
      </li>
    )
  }
}
