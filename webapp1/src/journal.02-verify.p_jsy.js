import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Toolbar from './component/Journal02Toolbar'
import Journal02Detail01 from './component/Journal02Detail01'
import Journal02Detail02 from './component/Journal02Detail02'
import Journal02Detail03 from './component/Journal02Detail03'
import Journal02Detail04 from './component/Journal02Detail04'

import './dashboard.css'

class Journal02VerifyPjsy extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', detail01: [], detail02: [], detail03: [], detail04: [] }
    this.nextStep = this.nextStep.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail01: response.data.content })
    }).catch(err => this.setState({ message: '服务器通信异常' }))

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail02: response.data.content })
    }).catch(err => this.setState({ message: '服务器通信异常' }))

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/03/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail03: response.data.content })
    }).catch(err => this.setState({ message: '服务器通信异常' }))

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail04: response.data.content })
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  nextStep() {
      location.href = './journal.02-verify.html'
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container-fluid">
          <div className="row">
            <Sidebar category='单据' />

            <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  02.一体化作业申请单
                </h3>
              </div>

              <div className="lead">
                <Toolbar className="pull-right" />
                <i className="fa fa-archive fa-fw"></i> 作业完成销记 - 值班干部
                <br />
                <br />
              </div>

              {this.state.message &&
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-danger">
                      {this.state.message}
                    </div>
                  </div>
                </div>
              }

              {this.state.detail01.length > 0 &&
                <Journal02Detail01 detail={this.state.detail01} p_jsy={true} auth={this.props.auth} />
              }

              <div className="row"><hr/></div>

              {this.state.detail02.length > 0 &&
                <Journal02Detail02 detail={this.state.detail02} p_jsy={true} auth={this.props.auth} />
              }

              <div className="row"><hr/></div>

              {this.state.detail03.length > 0 &&
                <Journal02Detail03 detail={this.state.detail03} p_jsy={true} auth={this.props.auth} />
              }

              <div className="row"><hr/></div>

              {this.state.detail04.length > 0 &&
                <Journal02Detail04 detail={this.state.detail04} p_jsy={true} auth={this.props.auth} />
              }

              <div className="row">
                <div className="col-12 mt-3">
                  <div className="btn-group pull-right">
                    <button type="button" className="btn btn-primary" onClick={this.nextStep}>
                      <i className="fa fa-fw fa-check-square-o"></i> 下一步
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

let auth = JSON.parse(sessionStorage.getItem('auth'))
if (!!!auth.id) location.href = './login.html'

ReactDOM.render(<Journal02VerifyPjsy auth={auth} />, document.getElementById('app'))