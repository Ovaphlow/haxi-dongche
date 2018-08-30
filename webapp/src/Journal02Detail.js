import axios from 'axios'
import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'

import Journal02Master from './component/Journal02Master'
import Journal02Detail01 from './component/Journal02Detail01'
import Journal02Detail02 from './component/Journal02Detail02'
import Journal02Detail03 from './component/Journal02Detail03'
import Journal02Detail04 from './component/Journal02Detail04'
import { RemoveButton } from './component/Journal02Util'

export default class Journal02Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { auth: {}, master: {}, detail01: 0, detail02: 0, detail03: 0, detail04: 0 }
    this.back = this.back.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })
    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/qty?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail01: response.data.content.qty })
    }).catch(err => this.setState({ message: `服务器通信异常` }))

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/qty?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail02: response.data.content.qty })
    }).catch(err => this.setState({ message: `服务器通信异常` }))

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/03/qty?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail03: response.data.content.qty })
    }).catch(err => this.setState({ message: `服务器通信异常` }))

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/qty?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail04: response.data.content.qty })
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  back() {
    window.history.go(-1)
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-list" title="详细信息" toolbar="Journal02Toolbar" />

          <Journal02Master mode="read" check={true} verify={true} />

          {this.state.auth.auth_admin &&
            <div className="col-12">
              <RemoveButton />
            </div>
          }

          <div className="row"><hr /></div>

          {this.state.detail01 > 0 &&
            <Journal02Detail01 read={true} />
          }

          <div className="row"><hr /></div>

          {this.state.detail02 > 0 &&
            <Journal02Detail02 read={true} />
          }

          <div className="row"><hr /></div>

          {this.state.detail03 > 0 &&
            <Journal02Detail03 read={true} />
          }

          <div className="row"><hr /></div>

          {this.state.detail04 > 0 &&
            <Journal02Detail04 read={true} />
          }
        </div>
      </div>
    )
  }
}
