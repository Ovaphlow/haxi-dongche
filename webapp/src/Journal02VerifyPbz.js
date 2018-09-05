import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import { Journal02Detail01, Journal02Detail02, Journal02Detail03, Journal02Detail04 } from './component/Journal02Detail'
import { ReviewPbzSubmit } from './component/Journal02Util'

export default class Journal02VerifyPbz extends React.Component {
  constructor(props) {
    super(props)
    this.state = { detail01: [], detail02: [], detail03: [], detail04: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/01/`)
    .then(res => res.json())
    .then(response => this.setState({ detail01: response.content }))

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/02/`)
    .then(res => res.json())
    .then(response => this.setState({ detail02: response.content }))

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/03/`)
    .then(res => res.json())
    .then(response => this.setState({ detail03: response.content }))

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/04/`)
    .then(res => res.json())
    .then(response => this.setState({ detail04: response.content }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-archive" title="作业完成销记 - 班组" toolbar="Journal02Toolbar" />

          {this.state.detail01.length > 0 &&
            <Journal02Detail01 detail={this.state.detail01} p_bz={true} auth={this.state.auth} />
          }

          <div className="row"><hr/></div>

          {this.state.detail02.length > 0 &&
            <Journal02Detail02 detail={this.state.detail02} p_bz={true} auth={this.state.auth} />
          }

          <div className="row"><hr/></div>

          {this.state.detail03.length > 0 &&
            <Journal02Detail03 detail={this.state.detail03} p_bz={true} auth={this.state.auth} />
          }

          <div className="row"><hr/></div>

          {this.state.detail04.length > 0 &&
            <Journal02Detail04 detail={this.state.detail04} p_bz={true} auth={this.state.auth} />
          }

          <div className="col-12 mt-3">
            <div className="btn-group pull-right">
              <ReviewPbzSubmit />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
