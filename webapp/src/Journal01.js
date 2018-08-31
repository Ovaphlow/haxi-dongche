import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'
import Journal01Item from './component/Journal01Item'

export default class Journal01 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      sessionStorage.setItem('link2', './#/journal.01')
      window.location.href = './#/login'
      return false
    }
    fetch(`./api/journal01/?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">

          <PageTitle title="01.检修车间禁动牌管理台账" />
          <PageTitle2 fa="fa-search" title="检索数据" toolbar="Journal01Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="col-12">
            <ul className="list-group">
              {this.state.list.map(item =>
                <Journal01Item key={item.id} item={item} />
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
