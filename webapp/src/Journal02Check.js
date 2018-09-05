import axios from 'axios'
import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import Journal02Item from './component/Journal02Item'

export default class Journal02Check extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list_p_jsy_bz: [], list_p_jsy_qc: [], list_p_jsy: [], list_p_zbsz: [], list_p_dd: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem("auth"))

    axios({
      method: 'get',
      url: './api/journal02/jsy/bz/' + auth.dept + '?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list_p_jsy_bz: response.data.content })
    }).catch(err => this.setState({ message: `服务器通信异常` }))

    if (auth.dept === '质检') {
      axios({
        method: 'get',
        url: './api/journal02/jsy/qc/' + auth.dept + '?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_jsy_qc: response.data.content })
      }).catch(err => this.setState({ message: `服务器通信异常` }))
    }

    if (auth.auth_p_jsy) {
      axios({
        method: 'get',
        url: './api/journal02/jsy/?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_jsy: response.data.content })
      }).catch(err => this.setState({ message: `服务器通信异常` }))
    }

    if (auth.auth_p_zbsz) {
      axios({
        method: 'get',
        url: './api/journal02/zbsz/?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_zbsz: response.data.content })
      }).catch(err => this.setState({ message: `服务器通信异常` }))
    }

    if (auth.auth_p_dd) {
      axios({
        method: 'get',
        url: './api/journal02/dd/?timestamp=' + new Date().getTime(),
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
          <PageTitle2 fa="fa-check-square-o" title="动车所审核" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="col-12">
            <ul className="list-group">
              {this.state.list_p_jsy.map(item =>
                <Journal02Item key={item.id} item={item} operation="p_jsy" />
              )}

              {this.state.list_p_jsy_bz.map(item =>
                <Journal02Item key={item.id} item={item} operation="p_jsy_bz" />
              )}

              {this.state.list_p_jsy_qc.map(item =>
                <Journal02Item key={item.id} item={item} operation="p_jsy_qc" />
              )}

              {this.state.list_p_zbsz.map(item =>
                <Journal02Item key={item.id} item={item} operation="p_zbsz" />
              )}

              {this.state.list_p_dd.map(item =>
                <Journal02Item key={item.id} item={item} operation="p_dd" />
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
