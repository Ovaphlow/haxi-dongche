import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'
import Journal02Detail01 from './component/Journal02Detail01'
import Journal02Detail02 from './component/Journal02Detail02'
import Journal02Detail03 from './component/Journal02Detail03'
import Journal02Detail04 from './component/Journal02Detail04'

export default class Journal02VerifyPjsy extends React.Component {
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
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          {this.state.detail01.length > 0 &&
            <Journal02Detail01 detail={this.state.detail01} p_jsy={true} auth={this.state.auth} />
          }

          <div className="row"><hr/></div>

          {this.state.detail02.length > 0 &&
            <Journal02Detail02 detail={this.state.detail02} p_jsy={true} auth={this.state.auth} />
          }

          <div className="row"><hr/></div>

          {this.state.detail03.length > 0 &&
            <Journal02Detail03 detail={this.state.detail03} p_jsy={true} auth={this.state.auth} />
          }

          <div className="row"><hr/></div>

          {this.state.detail04.length > 0 &&
            <Journal02Detail04 detail={this.state.detail04} p_jsy={true} auth={this.state.auth} />
          }

          <div className="col-12 mt-3">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={this.nextStep}>
                <i className="fa fa-fw fa-check-square-o"></i>
                下一步
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}