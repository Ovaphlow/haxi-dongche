import axios from 'axios'
import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'

export default class Journal01Save extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', auth: {} }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })
    document.getElementById('applicant').value = auth.name
    document.getElementById('dept').value = auth.dept
    document.getElementById('qty').value = 1
  }

  submit() {
    axios({
      method: 'post',
      url: './api/journal01/',
      data: {
        applicantId: this.state.auth.id,
        applicant: this.state.auth.name,
        dept: this.state.auth.dept,
        quantity: document.getElementById('qty').value,
        remark: document.getElementById('remark').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      window.location.href = './#/journal.01'
    }).catch(err => {
      this.setState({ message: `服务器通信异常` })
    })
  }

  render() {
    return (
      <div className="row">
        <Sidebar />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="01.检修车间禁动牌管理台账" />
          <PageTitle2 fa="fa-plus" title="新增申请" toolbar="Journal01Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>申请人</label>
                <input type="text" className="form-control" readOnly id="applicant" />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>作业部门</label>
                <input type="text" className="form-control" readOnly id="dept" />
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                <label>申请数量</label>
                <input type="number" className="form-control" id="qty" />
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
              <div className="btn btn-group pull-right">
                <button type="button" className="btn btn-primary" onClick={this.submit}>
                  <i className="fa fa-fw fa-check-square-o"></i> 确定
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
