import React from 'react'

class Reject extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isReject: false }
    this.reject = this.reject.bind(this)
    this.submitReject = this.submitReject.bind(this)
  }

  reject(event) {
    this.setState({ isReject: !!!this.state.isReject })
  }

  submitReject() {
    fetch('./api/journal02/' + this.props.id + '/reject/' + this.props.operation, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        reject: document.getElementById('input-reject').value
      })
    })
    .then(res => res.json())
    .then(response => {
      window.location.reload(true)
    })
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

export default class Journal02Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = { auth: {} }
    this.update = this.update.bind(this)
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
    this.verifyPjsy = this.verifyPjsy.bind(this)
    this.verify = this.verify.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'
    this.setState({ auth: auth })
  }

  update(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    window.location.href = './#/journal.02-update'
  }

  detail(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    window.location.href = './#/journal.02-detail'
  }

  renderBadge() {
    if (this.props.item.reject) return (
      <span className="badge badge-danger pull-right">
        驳回：{this.props.item.reject}
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
          this.props.item.p_jsy_content === '同意' ||
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
        值班干部签字
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
        this.props.item.p_jsy_content === '同意')) return (
      <span className="badge badge-info pull-right">
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
    // let sign = {
    //   category: 'journal02',
    //   from: './#/journal.02-check',
    //   to: './#/journal.02-p_jsy.content',
    //   operation: 'jsy',
    //   item_id: event.target.getAttribute('data-id')
    // }
    // sessionStorage.setItem('sign', JSON.stringify(sign))
    // window.location.href = './sign.html'

    fetch('./api/journal02/' + event.target.getAttribute('data-id') + '/jsy', {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        p_jsy_id: this.state.auth.id,
        p_jsy: this.state.auth.name,
        sign: this.state.auth.sign
      })
    })
    .then(res => res.json())
    .then(response => window.location.href = './#/journal.02-p_jsy.content')

            // axios({
            //   method: 'PUT',
            //   url: './api/journal02/' + sign.item_id + '/jsy',
            //   data: {
            //     p_jsy_id: auth.id,
            //     p_jsy: auth.name,
            //     sign: elResult.getAttribute('src')
            //   },
            //   responseType: 'json'
            // }).then(function (response) {
            //   if (response.data.message) {
            //     alert(response.data.message)
            //     return fasle
            //   }
            //   location.href = sign.to
            // })
  }

  checkPjsybz(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    // let sign = {
    //   category: 'journal02',
    //   from: './#/journal.02-check',
    //   to: './#/journal.02-check',
    //   operation: 'jsy-bz',
    //   item_id: event.target.getAttribute('data-id')
    // }
    // sessionStorage.setItem('sign', JSON.stringify(sign))
    // window.location.href = './sign.html'

    fetch('./api/journal02/' + event.target.getAttribute('data-id') + '/jsy/bz', {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        sign: this.state.auth.sign
      })
    })
    .then(res => res.json())
    .then(response => window.location.reload(true))

            // axios({
            //   method: 'PUT',
            //   url: './api/journal02/' + sign.item_id + '/jsy/bz',
            //   data: { sign: elResult.getAttribute('src') },
            //   resposneType: 'json'
            // }).then(function (response) {
            //   if (response.data.message) {
            //     alert(response.data.message)
            //     return false
            //   }
            //   location.href = sign.to
            // })
  }

  checkPjsyQc(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    // let sign = {
    //   category: 'journal02',
    //   from: './#/journal.02-check',
    //   to: './#/journal.02-check',
    //   operation: 'jsy-qc',
    //   item_id: event.target.getAttribute('data-id')
    // }
    // sessionStorage.setItem('sign', JSON.stringify(sign))
    // window.location.href = './sign.html'

    fetch('./api/journal02/' + event.target.getAttribute('data-id') + '/jsy/qc', {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        sign: this.state.auth.sign
      })
    })
    .then(res => res.json())
    .then(response => window.location.reload(true))

            // axios({
            //   method: 'put',
            //   url: './api/journal02/' + sign.item_id + '/jsy/qc',
            //   data: { sign: elResult.getAttribute('src') },
            //   responseType: 'json'
            // }).then(function (response) {
            //   if (response.data.message) {
            //     alert(response.data.message)
            //     return false
            //   }
            //   location.href = sign.to
            // })
  }

  checkPdd(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    // let sign = {
    //   category: 'journal02',
    //   from: './#/journal.02-check',
    //   to: './#/journal.02-check',
    //   operation: 'dd',
    //   item_id: event.target.getAttribute('data-id')
    // }
    // sessionStorage.setItem('sign', JSON.stringify(sign))
    // window.location.href = './sign.html'

    fetch('./api/journal02/' + event.target.getAttribute('data-id') + '/dd', {
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
    .then(response => window.location.reload(true))
  }

  checkPzbsz(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    // let sign = {
    //   category: 'journal02',
    //   from: './#/journal.02-check',
    //   to: './#/journal.02-check',
    //   operation: 'zbsz',
    //   item_id: event.target.getAttribute('data-id')
    // }
    // sessionStorage.setItem('sign', JSON.stringify(sign))
    // window.location.href = './sign.html'
    fetch('./api/journal02/' + event.target.getAttribute('data-id') + '/zbsz', {
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
    .then(response => window.location.reload(true))
  }

  verifyLeader(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    window.location.href = './#/journal.02-verify.leader'
  }

  verifyLeaderPbz(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    window.location.href = './#/journal.02-verify.p_bz'
  }

  verifyLeaderQc(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    window.location.href = './#/journal.02-verify.qc'
  }

  verifyPjsy(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    window.location.href = './#/journal.02-verify.p_jsy'
  }

  verify(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    window.location.href = './#/journal.02-verify.p_dd'
  }

  render() {
    return (
      <li className="list-group-item">
        <p className="lead">
          【
          <strong>{this.props.item.content}</strong>
          】
          {this.props.item.content_detail}
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
            {this.props.item.leader} ({this.props.item.leader_phone})
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
          <div className="col-12 mt-3">
            {this.props.item.applicant === this.state.auth.name && (!!!this.props.item.sign_p_jsy || this.props.item.sign_p_jsy === '') &&
              <button type="button" className="btn btn-sm btn-outline-secondary" data-id={this.props.item.id} onClick={this.update}>
                <i className="fa fa-fw fa-edit"></i>
                修改
              </button>
            }
            {this.props.operation === 'p_jsy' &&
              <Reject id={this.props.item.id} operation={this.props.operation} />
            }
            {this.props.operation === 'p_dd' &&
              <Reject id={this.props.item.id} operation={this.props.operation} />
            }
            {this.props.operation === 'p_zbsz' &&
              <Reject id={this.props.item.id} operation={this.props.operation} />
            }
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-light" data-id={this.props.item.id} onClick={this.detail}>
                详细信息
              </button>
              {this.props.operation === 'p_jsy' &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.checkPjsy}>
                  技术员审核
                </button>
              }
              {this.props.operation === 'p_jsy_bz' &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.checkPjsybz}>
                  班组签字
                </button>
              }
              {this.props.operation === 'p_jsy_qc' &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.checkPjsyQc}>
                  质检签字
                </button>
              }
              {this.props.operation === 'p_zbsz' &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.checkPzbsz}>
                  值班所长审批
                </button>
              }
              {this.props.operation === 'p_dd' &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.checkPdd}>
                  调度审核
                </button>
              }
              {this.props.operation === 'verify_leader' &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.verifyLeader}>
                  作业完成
                </button>
              }
              {this.props.operation === 'verify_p_bz' &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.verifyLeaderPbz}>
                  作业完成
                </button>
              }
              {this.props.operation === 'verify_qc' &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.verifyLeaderQc}>
                  作业完成
                </button>
              }
              {this.props.operation === 'verify_p_jsy' &&
                <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.verifyPjsy}>
                  值班干部签字
                </button>
              }
              {this.props.operation === 'verify_p_dd' &&
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
