import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/SidebarA'
import Toolbar from './component/Journal02Toolbar'
import Journal02Item from './component/Journal02Item'

import './dashboard.css'

class Journal02VerifyPdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
    this.sign = this.sign.bind(this)
    this.back = this.back.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02'),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      if (response.data.content.remark) {
        document.getElementById('remark').value = response.data.content.remark
      }
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })
  }

  sign() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))

    axios({
      method: 'put',
      url: './api/journal02/verify/' + sessionStorage.getItem('journal02'),
      data: {
        verify: auth.name,
        verify_id: auth.id,
        remark: document.getElementById('remark').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      let sign = {
        category: 'journal02',
        from: './journal.02-verify.verify.html',
        to: './journal.02-verify.html',
        operation: 'verify',
        item_id: sessionStorage.getItem('verifyId')
      }
      sessionStorage.setItem('sign', JSON.stringify(sign))
      location.href = './sign.html'
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })
  }

  back() {
    location.href = './journal.02-verify.html'
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container-fluid">
          <div className="row">
            <Sidebar />

            <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  02.一体化作业申请单
                </h3>
              </div>

              <div className="lead">
                <Toolbar className="pull-right" />
                <i className="fa fa-archive fa-fw"></i> 作业完成销记
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

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>调度员</h5>
                    </div>

                    <div className="card-body row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>备注</label>
                          <textarea rows="3" className="form-control" id="remark"></textarea>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="btn-group pull-right">
                          <button type="button" className="btn btn-primary" onClick={this.sign}>
                            <i className="fa fa-fw fa-check-square-o"></i> 确认
                          </button>
                          <button type="button" className="btn btn-light" onClick={this.back}>
                            取消
                          </button>
                        </div>
                      </div>
                    </div>
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

ReactDOM.render(<Journal02VerifyPdd />, document.getElementById('app'))
