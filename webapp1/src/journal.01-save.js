import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Toolbar from './component/Journal01Toolbar'

import './dashboard.css'

class Journal01Save extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', auth: {} }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      location.href = './login.html'
      return false
    }
    this.setState({ auth: auth })
    document.getElementById('applicant').value = auth.name
    document.getElementById('dept').value = auth.dept
    document.getElementById('qty').value = 1
  }

  submit() {
    axios({
      method: 'post',
      url: './api/journal01/',
      data: {
        applicantId: this.state.auth.id,
        applicant: this.state.auth.name,
        dept: this.state.auth.dept,
        quantity: document.getElementById('qty').value,
        remark: document.getElementById('remark').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      location.href = './journal.01.html'
    }).catch(err => {
      this.setState({ message : `服务器通信异常 ${err}` })
    })
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="contrainer-fluid">
          <div className="row">
            <Sidebar category='账项' />

            <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  01.检修车间禁动牌管理台账
                </h3>
              </div>

              <div className="lead">
                <Toolbar className="pull-right" />
                <i className="fa fa-plus fa-fw"></i> 新增申请
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
                <div className="col-6">
                  <div className="form-group">
                    <label>申请人</label>
                    <input type="text" className="form-control" readOnly id="applicant" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>作业部门</label>
                    <input type="text" className="form-control" readOnly id="dept" />
                  </div>
                </div>
                <div className="clearfix"></div>

                <div className="col-12">
                  <div className="form-group">
                    <label>申请数量</label>
                    <input type="number" className="form-control" id="qty" />
                  </div>
                </div>
                <div className="clearfix"></div>

                <div className="col-12">
                  <div className="form-group">
                    <label>备注</label>
                    <textarea rows="3" className="form-control" id="remark"></textarea>
                  </div>
                </div>
                <div className="clearfix"></div>

                <div className="col-12">
                  <div className="btn btn-group pull-right">
                    <button type="button" className="btn btn-primary" onClick={this.submit}>
                      <i className="fa fa-fw fa-check-square-o"></i> 确定
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

ReactDOM.render(<Journal01Save />, document.getElementById('app'))
