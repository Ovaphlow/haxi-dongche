import axios from 'axios'
import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'
import Journal02Detail01 from './component/Journal02Detail01'
import Journal02Detail02 from './component/Journal02Detail02'
import Journal02Detail03 from './component/Journal02Detail03'
import Journal02Detail04 from './component/Journal02Detail04'

export default class Journal02VerifyQc extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', auth: {}, detail01: [], detail02: [], detail03: [], detail04: [] }
    this.nextStep = this.nextStep.bind(this)
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

  nextStep() {
    // let sign = {
    //   category: 'journal02',
    //   from: './#/journal.02-verify.qc',
    //   to: './#/journal.02-verify',
    //   operation: 'verify-leader-qc',
    //   item_id: sessionStorage.getItem('journal02')
    // }
    // sessionStorage.setItem('sign', JSON.stringify(sign))
    // window.location.href = './sign.html'

    if (!!!this.state.auth.sign) {
      alert('请先设置签名')
      return false
    }
    fetch('./api/journal02/' + sessionStorage.getItem('journal02') + '/verify/leader/qc', {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        sign: this.state.auth.sign
      })
    })
    .then(res => res.json())
    .then(response => window.location.href = './#/journal.02-verify')

            // axios({
            //   method: 'put',
            //   url: './api/journal02/' + sign.item_id + '/verify/leader/qc',
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
              <button type="button" className="btn btn-primary" onClick={this.nextStep}>
                <i className="fa fa-fw fa-check-square-o"></i> 下一步
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
