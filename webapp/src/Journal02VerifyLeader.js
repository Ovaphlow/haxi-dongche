import axios from 'axios'
import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'

export default class Journal02VerifyLeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { auth: {}, message: '', master: {} }
    this.detail = this.detail.bind(this)
    this.back = this.back.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02'),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message})
        return false
      }
      sessionStorage.setItem('journal02-detail', response.data.content.id)
      response.data.content.veirfy_report && (document.getElementById('verify_report').value = response.data.content.verify_report)
      response.data.content.date_end && (document.getElementById('verify_leader_date').value = response.data.content.date_end)
      response.data.content.time_end && (document.getElementById('verify_leader_time').value = response.data.content.time_end)
      response.data.content.remark && (document.getElementById('remark').value = response.data.content.remark)
    })
  }

  detail(event) {
    let sn = event.target.getAttribute('data-id')
    window.location.href = `./#/journal.02-save.0${sn}`
  }

  submit() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))

    if (!!!auth.sign) {
      alert('请先设置签名')
      return false
    }
    axios({
      method: 'put',
      url: './api/journal02/verify/leader/' + sessionStorage.getItem('journal02-detail'),
      data: {
        verify_report: document.getElementById('verify_report').value,
        verify_leader: auth.name,
        verify_leader_id: auth.id,
        verify_leader_date: document.getElementById('verify_leader_date').value,
        verify_leader_time: document.getElementById('verify_leader_time').value,
        remark: document.getElementById('remark').value,
        sign: auth.sign
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      window.location.href = './#/journal.02-verify'
      // let sign = {
      //   category: 'journal02',
      //   from: './#/journal.02-verify.leader',
      //   to: './#/journal.02-verify',
      //   operation: 'verify-leader',
      //   item_id: sessionStorage.getItem('journal02')
      // }
      // sessionStorage.setItem('sign', JSON.stringify(sign))
      // window.location.href = './sign.html'
    })
  }

  back() {
    window.location.href = './#/journal.02-verify'
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
                    <label>作业完成日期</label>
                    <input type="date" className="form-control" id="verify_leader_date" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>作业完成时间</label>
                    <input type="text" className="form-control" id="verify_leader_time" />
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
                  <button type="button" className="btn btn-outline-secondary" onClick={this.back}>
                    取消
                  </button>
                  <div className="btn-group pull-right">
                    <button type="button" className="btn btn-primary" onClick={this.submit}>
                      <i className="fa fa-fw fa-check-square-o"></i>
                      确认
                    </button>
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
