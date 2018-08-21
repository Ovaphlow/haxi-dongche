import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Toolbar from './component/Journal02Toolbar'

import './dashboard.css'

class Journal02VerifyLeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', master: {} }
    this.detail = this.detail.bind(this)
    this.back = this.back.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      location.href = './login.html'
      return false
    }

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02'),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message})
        return false
      }
      sessionStorage.setItem('journal02-detail', response.data.content.id)
      response.data.content.veirfy_report && (document.getElementById('verify_report').value = response.data.content.verify_report)
      response.data.content.date_end && (document.getElementById('verify_leader_date').value = response.data.content.date_end)
      response.data.content.time_end && (document.getElementById('verify_leader_time').value = response.data.content.time_end)
      response.data.content.remark && (document.getElementById('remark').value = response.data.content.remark)
      // if (response.data.content.tag) {
      //   document.getElementById('tag').value = response.data.content.tag
      //   document.getElementById('tag').setAttribute('disabled', true)
      // }
    })
  }

  detail(event) {
    let sn = event.target.getAttribute('data-id')
    location.href = `./journal.02-save.0${sn}.html`
  }

  submit() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))

    axios({
      method: 'put',
      url: './api/journal02/verify/leader/' + sessionStorage.getItem('journal02-detail'),
      data: {
        verify_report: document.getElementById('verify_report').value,
        verify_leader: auth.name,
        verify_leader_id: auth.id,
        verify_leader_date: document.getElementById('verify_leader_date').value,
        verify_leader_time: document.getElementById('verify_leader_time').value,
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
        from: './journal.02-verify.leader.html',
        to: './journal.02-verify.html',
        operation: 'verify-leader',
        item_id: sessionStorage.getItem('journal02')
      }
      sessionStorage.setItem('sign', JSON.stringify(sign))
      location.href = './sign.html'
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
            <Sidebar category='单据' />

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
                      <h5>作业负责人</h5>
                    </div>

                    <div className="card-body row">
                      <div className="col-12 btn-group">
                        <button type="button" className="btn btn-outline-secondary" data-id="1" onClick={this.detail}>
                          一般部件普查记录单
                        </button>

                        <button type="button" className="btn btn-outline-secondary" data-id="2" onClick={this.detail}>
                          一般配件更换记录表
                        </button>

                        <button type="button" className="btn btn-outline-secondary" data-id="3" onClick={this.detail}>
                          关键配件更换记录表
                        </button>

                        <button type="button" className="btn btn-outline-secondary" data-id="4" onClick={this.detail}>
                          加装改造（软件升级）记录单
                        </button>
                      </div>

                      <div className="col-12"><hr/></div>

                      <div className="col-12">
                        <div className="form-group">
                          <label>作业完成情况</label>
                          <textarea rows="3" className="form-control" id="verify_report"></textarea>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-group">
                          <label>作业完成日期</label>
                          <input type="date" className="form-control" id="verify_leader_date" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>作业完成时间</label>
                          <input type="text" className="form-control" id="verify_leader_time" />
                        </div>
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-12">
                        <div className="form-group">
                          <label>备注</label>
                          <textarea rows="3" className="form-control" id="remark"></textarea>
                        </div>
                      </div>

                      <div className="col-12">
                        <hr />
                        <div className="btn-group pull-right">
                          <button type="button" className="btn btn-primary" onClick={this.submit}>
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

ReactDOM.render(<Journal02VerifyLeader />, document.getElementById('app'))

// import navbar from './navbar-2.html'
// document.getElementById('navbar').innerHTML = navbar
//
// import sidebar from './sidebar-b.html'
// document.getElementById('sidebar').innerHTML = sidebar
//
// import toolbar from './journal.02-toolbar.html'
// document.getElementById('toolbar').innerHTML = toolbar
//
// let auth = JSON.parse(sessionStorage.getItem('auth'))
//
// let app = new Vue({
//   el: '#app',
//   data: {
//     content: {},
//     request: {}
//   },
//   methods: {
//     detail: function (event) {
//       let sn = event.target.getAttribute('data-id')
//       location.href = './journal.02-save.0' + sn + '.html'
//     },
//
//     sign: function () {
//       console && console.info(app.request.verify_report)
//       axios({
//         method: 'put',
//         url: './api/journal02/verify/leader/' + app.content.id,
//         data: {
//           verify_report: app.request.verify_report,
//           verify_leader: auth.name,
//           verify_leader_id: auth.id,
//           verify_leader_date: app.request.verify_leader_date,
//           verify_leader_time: app.request.verify_leader_time,
//           remark: app.request.remark
//         },
//         responseType: 'json'
//       }).then(function (response) {
//         if (response.data.message) {
//           alert(response.data.message)
//           return false
//         }
//         let sign = {
//           category: 'journal02',
//           from: './journal.02-verify.leader.html',
//           to: './journal.02-verify.html',
//           operation: 'verify-leader',
//           item_id: sessionStorage.getItem('journal02')
//         }
//         sessionStorage.setItem('sign', JSON.stringify(sign))
//         location.href = './sign.html'
//       })
//     },
//
//     auth: function () {
//       $('#auth').modal()
//     },
//
//     submit: function () {
//       axios({
//         method: 'POST',
//         url: './api/common/user/login',
//         data: {
//           account: document.getElementById('authAccount').value,
//           password: md5(document.getElementById('authPassword').value)
//         },
//         responseType: 'json'
//       }).then(function (response) {
//         if (response.data.content.length !== 1) {
//           alert('账号或密码错误，用户鉴权失败。')
//           return false
//         }
//         axios({
//           method: 'PUT',
//           url: './api/journal02/verify/leader/' + app.content.id,
//           data: {
//             verify_report: app.request.verify_report,
//             verify_leader: response.data.content[0].name,
//             verify_leader_id: response.data.content[0].id,
//             verify_leader_date: app.request.verify_leader_date,
//             verify_leader_time: app.request.verify_leader_time,
//             remark: app.request.remark
//           },
//           responseType: 'json'
//         }).then(function (response) {
//           if (response.data.status === 200) {
//             alert('操作已提交至服务器，请稍后查看结果。')
//             location.href = './journal.02-verify.html'
//           } else {
//             alert(response.data.message)
//           }
//         })
//       })
//     }
//   },
//
//   created: function () {
//     axios({
//       method: 'GET',
//       url: './api/journal02/' + sessionStorage.getItem('journal02'),
//       responseType: 'json'
//     }).then(function (response) {
//       if (response.data.message) {
//         alert(response.data.message)
//         return false
//       }
//       app.request.verify_leader_date = response.data.content.date_end
//       app.request.verify_leader_time = response.data.content.time_end
//       app.request.tag = response.data.content.tag
//       app.content = response.data.content
//       // if (response.data.content.tag) {
//       //   document.getElementById('tag').value = response.data.content.tag
//       //   document.getElementById('tag').setAttribute('disabled', true)
//       // }
//     })
//   }
// })
