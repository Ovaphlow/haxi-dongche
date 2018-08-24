import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'
import Journal02Master from './component/Journal02Master'

export default class Journal02Update extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', trainList: [], journal: {} }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'
    this.setState({ auth: auth })
    fetch('./api/journal02/' + sessionStorage.getItem('journal02'), {
      method: 'get',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    })
    .then(res => res.json())
    .then(response => this.setState({ journal: response.content }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="单据" />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-edit" title="修改申请" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger" role="alert" id="anchor-alert">
                {this.state.message}
              </div>
            </div>
          }

          <Journal02Master auth={this.state.auth} mode="update" />
        </div>
      </div>
    )
  }
}
