import axios from 'axios'
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
    axios({
      method: 'get',
      url: './api/journal01/?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list: response.data.content })
    }).catch(err => this.setState({ message: `服务器通信异常 ${err}` }))
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
