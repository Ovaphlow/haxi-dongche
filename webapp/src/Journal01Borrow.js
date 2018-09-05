import axios from 'axios'
import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import Journal01Item from './component/Journal01Item'

export default class Journal01Borrow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list: [], listByUser: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (auth.auth_01) {
      axios({
        method: 'get',
        url: './api/journal01/admin',
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list: response.data.content })
      }).catch(err => this.setState({ message: `服务器通信异常` }))
    } else if (auth.id){
      axios({
        method: 'get',
        url: './api/journal01/applicant/' + auth.id + '/',
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ listByUser: response.data.content })
      }).catch(err => this.setState({ message: `服务器通信异常` }))
    }
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="01.检修车间禁动牌管理台账" />
          <PageTitle2 fa="fa-upload" title="发放" toolbar="Journal01Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="row">
            <div className="col-12">
              <ul className="list-group">
                {this.state.list.map(item =>
                  <Journal01Item key={item.id} item={item} borrow={true} />
                )}
                {this.state.listByUser.map(item =>
                  <Journal01Item key={item.id} item={item} />
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
