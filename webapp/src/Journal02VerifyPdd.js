import axios from 'axios'
import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'

export default class Journal02VerifyPdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = { auth: {}, message: '' }
    this.sign = this.sign.bind(this)
    this.back = this.back.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'
    this.setState({ auth: auth })
    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02'),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      if (response.data.content.remark) {
        document.getElementById('remark').value = response.data.content.remark
      }
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  sign() {
    fetch('./api/journal02/verify/' + sessionStorage.getItem('journal02'), {
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
    .then(response => window.history.go(-1))
    // axios({
    //   method: 'put',
    //   url: './api/journal02/verify/' + sessionStorage.getItem('journal02'),
    //   data: {
    //     verify: this.state.auth.name,
    //     verify_id: this.state.auth.id,
    //     remark: document.getElementById('remark').value
    //   },
    //   responseType: 'json'
    // }).then(response => {
    //   if (response.data.message) {
    //     this.setState({ message: response.data.message })
    //     return false
    //   }
    //   let sign = {
    //     category: 'journal02',
    //     from: './#/journal.02-verify',
    //     to: './#/journal.02-verify',
    //     operation: 'verify',
    //     item_id: sessionStorage.getItem('journal02')
    //   }
    //   sessionStorage.setItem('sign', JSON.stringify(sign))
    //   window.location.href = './sign.html'
    // }).catch(err => this.setState({ message: `服务器通信异常` }))
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
                  <button type="button" className="btn btn-outline-secondary" onClick={this.back}>
                    取消
                  </button>
                  <div className="btn-group pull-right">
                    <button type="button" className="btn btn-primary" onClick={this.sign}>
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
