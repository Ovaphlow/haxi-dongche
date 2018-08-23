import axios from 'axios'
import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'
import Journal02Item from './component/Journal02Item'

export default class Journal02Verify extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list_leader: [], list_p_bz: [], list_qc: [], list_p_jsy: [], list_p_dd: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }

    axios({
      method: 'get',
      url: './api/journal02/verify/leader/' + auth.id + '?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list_leader: response.data.content })
    }).catch(err => this.setState({ message: `服务器通信异常` }))

    axios({
      method: 'get',
      url: './api/journal02/verify/leader/bz/' + auth.dept + '?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list_p_bz: response.data.content })
    }).catch(err => this.setState({ message: `服务器通信异常` }))

    if (auth.dept === '质检') {
      axios({
        method: 'get',
        url: './api/journal02/verify/leader/qc/' + auth.name + '?timestamp=' + new Date().getTime(),
        responseTupe: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_qc: response.data.content })
      }).catch(err => this.setState({ message: `服务器通信异常` }))
    }

    if (auth.auth_p_jsy) {
      axios({
        method: 'get',
        url: './api/journal02/verify/p_jsy?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_jsy: response.data.content })
      }).catch(err => this.setState({ message: `服务器通信异常` }))
    }

    if (auth.auth_p_dd) {
      axios({
        method: 'get',
        url: './api/journal02/verify/?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_dd: response.data.content })
      }).catch(err => this.setState({ message: `服务器通信异常` }))
    }
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
            <ul className="list-group">
              {this.state.list_leader.map(item =>
                <Journal02Item key={item.id} operation="verify_leader" item={item} />
              )}
              {this.state.list_p_bz.map(item =>
                <Journal02Item key={item.id} operation="verify_p_bz" item={item} />
              )}
              {this.state.list_qc.map(item =>
                <Journal02Item key={item.id} operation="verify_qc" item={item} />
              )}
              {this.state.list_p_jsy.map(item =>
                <Journal02Item key={item.id} operation="verify_p_jsy" item={item} />
              )}
              {this.state.list_p_dd.map(item =>
                <Journal02Item key={item.id} operation="verify_p_dd" item={item} />
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
