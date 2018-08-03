import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/SidebarA'
import Journal02Detail01 from './component/Journal02Detail01'
import Journal02Detail02 from './component/Journal02Detail02'
import Journal02Detail03 from './component/Journal02Detail03'
import Journal02Detail04 from './component/Journal02Detail04'

class Journal02VerifyPbz extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', auth: {}, detail01: [], detail02: [], detail03: [], detail04: [] }
    this.nextStep = this.nextStep.bind(this)
  }

  componentDidMount() {
    this.setState({ auth: JSON.parse(sessionStorage.getItem('auth')) })

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
    }).catch(err => {
      this.setState({ message: '服务器通信异常' })
    })

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
    }).catch(err => {
      this.setState({ message: '服务器通信异常' })
    })

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
    }).catch(err => {
      this.setState({ message: '服务器通信异常' })
    })

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
    }).catch(err => {
      this.setState({ message: '服务器通信异常' })
    })
  }

  nextStep() {
    let sign = {
      category: 'journal02',
      from: './journal.02-verify.p_bz.html',
      to: './journal.02-verify.html',
      operation: 'verify-leader-bz',
      item_id: sessionStorage.getItem('journal02')
    }
    sessionStorage.setItem('sign', JSON.stringify(sign))
    location.href = './sign.html'
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container-fluid">
          <div className="row">
            <Sidebar />

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  02.一体化作业申请单
                </h3>
              </div>

              <div className="lead">
                <div className="pull-right" id="toolbar"></div>
                <i className="fa fa-archive fa-fw"></i> 作业完成销记 - 班组
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

              {this.state.detail01 &&
                <Journal02Detail01 detail={this.state.detail01} p_bz={true}/>
              }

              <p><hr/></p>

              {this.state.detail02 &&
                <Journal02Detail02 detail={this.state.detail02} p_bz={true} />
              }

              <p><hr/></p>

              {this.state.detail03 &&
                <Journal02Detail03 detail={this.state.detail03} p_bz={true} />
              }

              <p><hr/></p>

              {this.state.detail04 &&
                <Journal02Detail04 detail={this.state.detail04} p_bz={true} />
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
            </main>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Journal02VerifyPbz />, document.getElementById('app'))