import React from 'react'

import {
  Sidebar, PageTitle, PageTitle2
} from '../component/Common'
import { Ledger01ListItem } from '../components/Ledger01Component'
import { GetList } from '../actions/Ledger01Action'

export class Ledger01Home extends React.Component {
  constructor() {
    super()
    this.state = { message: '', list: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      sessionStorage.setItem('link2', './#/journal.01')
      window.location.href = './#/login'
      return false
    }
    GetList()
    .then(response => this.setState({ list: response.content }))
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

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
                <Ledger01ListItem key={item.id} item={item} />
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}