import axios from 'axios'
import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'

export default class AdminTrainList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', trainList: [] }
    this.detail = this.detail.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/common/train',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ trainList: response.data.content })
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  detail(event) {
    sessionStorage.setItem('admin', event.target.getAttribute('data-id'))
    window.location.href = './#/admin.train'
  }

  render() {
    return (
      <div className="row">
        <Sidebar />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="系统管理" />
          <PageTitle2 fa="fa-list" title="车组" toolbar="AdminTrainToolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="col-12">
            <div className="list-group">
              {this.state.trainList.map(item =>
                <a data-id={item.uuid} className="list-group-item list-group-item-action" key={item.id} onClick={this.detail}>
                  {item.name} <span className="text-secondary text-right">{item.model}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
