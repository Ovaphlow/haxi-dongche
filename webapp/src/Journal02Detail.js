import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'

import Journal02Master from './component/Journal02Master'
import { Journal02Detail01, Journal02Detail02, Journal02Detail03, Journal02Detail04 } from './component/Journal02Detail'
import { ApprovePjsyLink, ApprovePbzSubmit, ApproveQcSubmit, ApprovePddSubmit, ApprovePzbszSubmit } from './component/Journal02Util'
import { ReviewApplicantLink, ReviewPbzLink, ReviewQcLink, ReviewPjsyLink, ReviewPddLink } from './component/Journal02Util'
import { RejectButton, RemoveButton } from './component/Journal02Util'

export default class Journal02Detail extends React.Component {
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
              {
                !!!this.state.master.reject &&
                !!!this.state.master.sign_p_jsy &&
                this.state.auth.auth_p_jsy &&
                <span>
                  <ApprovePjsyLink />
                </span>
              }
              {
                !!!this.state.master.reject &&
                this.state.master.sign_p_jsy &&
                this.state.master.p_jsy_content.indexOf('班组') !== -1 &&
                !!!this.state.master.sign_p_jsy_bz &&
                this.state.auth.dept === this.state.master.p_jsy_bz &&
                <ApprovePbzSubmit />
              }
              {
                !!!this.state.master.reject &&
                this.state.master.sign_p_jsy_bz &&
                this.state.master.p_jsy_content.indexOf('质检跟踪') !== -1 &&
                !!!this.state.master.sign_p_jsy_qc &&
                this.state.auth.dept === this.state.master.p_jsy_qc &&
                <ApproveQcSubmit />
              }
              {
                !!!this.state.master.reject &&
                this.state.master.sign_p_jsy &&
                (
                  (
                    this.state.master.p_jsy_content.indexOf('班组跟踪') !== -1 &&
                    this.state.master.sign_p_jsy_bz
                  ) ||
                  (
                    this.state.master.p_jsy_content.indexOf('质检跟踪') !== -1 &&
                    this.state.master.sign_p_jsy_qc
                  ) ||
                  this.state.master.p_jsy_content === '无要求'
                ) &&
                !!!this.state.master.sign_p_dd &&
                this.state.auth.auth_p_dd &&
                <ApprovePddSubmit />
              }
              {
                !!!this.state.master.reject &&
                this.state.master.sign_p_dd &&
                !!!this.state.master.sign_p_zbsz &&
                this.state.auth.auth_p_zbsz &&
                <ApprovePzbszSubmit />
              }
              {
                !!!this.state.master.reject &&
                this.state.master.sign_p_zbsz &&
                !!!this.state.master.sign_verify_leader &&
                this.state.auth.id === this.state.master.leader_id &&
                <ReviewApplicantLink />
              }
              {
                !!!this.state.master.reject &&
                this.state.master.sign_verify_leader &&
                (
                  this.state.master.p_jsy_content.indexOf('班组') !== -1
                ) &&
                !!!this.state.master.sign_verify_leader_bz &&
                this.state.auth.dept === this.state.master.p_jsy_bz &&
                <ReviewPbzLink />
              }
              {
                !!!this.state.master.reject &&
                this.state.master.sign_verify_leader_bz &&
                !!!this.state.master.sign_verify_leader_qc &&
                this.state.master.p_jsy_content.indexOf('质检') &&
                this.state.auth.dept === this.state.master.p_jsy_qc &&
                <ReviewQcLink />
              }
              {
                !!!this.state.master.reject &&
                (
                  this.state.master.qty_verify_p_jsy_02 > 0 ||
                  this.state.master.qty_verify_p_jsy_03 > 0
                ) &&
                this.state.auth.auth_p_jsy &&
                <ReviewPjsyLink />
              }
              {
                !!!this.state.master.reject &&
                this.state.master.sign_verify_leader &&
                (
                  this.state.master.p_jsy_content === '无要求' ||
                  (
                    this.state.master.sign_verify_leader_qc &&
                    this.state.master.qty_verify_p_jsy_02 === 0 &&
                    this.state.master.qty_verify_p_jsy_03 === 0
                  )
                ) &&
                !!!this.state.master.sign_verify &&
                this.state.auth.auth_p_dd &&
                <ReviewPddLink />
              }
            </div>
          </div>

          <div className="clearfix"></div>
          <div className="col-12"><hr /></div>

          {this.state.detail01 > 0 &&
            <Journal02Detail01 read={true} />
          }

          <div className="row"><hr /></div>

          {this.state.detail02 > 0 &&
            <Journal02Detail02 read={true} />
          }

          <div className="row"><hr /></div>

          {this.state.detail03 > 0 &&
            <Journal02Detail03 read={true} />
          }

          <div className="row"><hr /></div>

          {this.state.detail04 > 0 &&
            <Journal02Detail04 read={true} />
          }
        </div>
      </div>
    )
  }
}
