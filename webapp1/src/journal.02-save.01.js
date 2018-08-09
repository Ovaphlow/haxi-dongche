import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/SidebarA'
import Toolbar from './component/Journal02Toolbar'
import Journal02Detail01 from './component/Journal02Detail01'

import './dashboard.css'

class Journal02Save01 extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', trainList: [] }
    this.dialog = this.dialog.bind(this)
    this.submit = this.submit.bind(this)
    this.save = this.save.bind(this)
    this.back = this.back.bind(this)
  }

  componentDidMount() {
    document.getElementById('date').value = moment().format('YYYY-MM-DD')

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
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}` })
    })

    let detail = JSON.parse(sessionStorage.getItem('journal02-detail'))
    if (detail.subject) {
      document.getElementById('subject').value = detail.subject
      document.getElementById('approval').value = detail.approval_sn
      document.getElementById('train').value = detail.train_sn
      document.getElementById('date').value = detail.date
    }
  }

  dialog() {
    $('#dialog-save').modal()
  }

  submit() {
    let body = {
      subject: document.getElementById('subject').value,
      approval_sn: document.getElementById('approval').value,
      train_sn: document.getElementById('train').value,
      date: document.getElementById('date').value,
      carriage: document.getElementById('carriage').value,
      carriage_subject: document.getElementById('carriage_subject').value,
      time_begin: document.getElementById('time_begin').value,
      time_end: document.getElementById('time_end').value,
      result: document.getElementById('result').value,
      report: document.getElementById('report').value,
      dept: document.getElementById('dept').value,
      executor: document.getElementById('executor').value,
      remark: document.getElementById('remark').value
    }
    axios({
      method: 'post',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
      data: body,
      responseType: 'json'
    }).then(function (response) {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      sessionStorage.setItem('journal02-detail', JSON.stringify(body))
      location.reload(true)
    }).catch(err => {
      this.setState({ message: '服务器通信异常' })
    })
  }

  save() {
    axios({
      method: 'PUT',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
      data: {
        subject: document.getElementById('subject').value,
        approval_sn: document.getElementById('approval').value,
        train_sn: document.getElementById('train').value,
        date: document.getElementById('date').value,
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      sessionStorage.removeItem('journal02-detail')
      location.href = './journal.02-verify.leader.html'
    })
  }

  back() {
    window.history.go(-1)
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
                    <div className="card-body row">
                      <div className="col-12">
                        <p className="lead">动车组一般部件普查记录单</p>
                      </div>

                      <div className="col-6">
                        <div className="form-group">
                          <label>普查项目</label>
                          <input type="text" className="form-control" id="subject" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>批准文件号</label>
                          <input type="text" className="form-control" id="approval" />
                        </div>
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-6">
                        <div className="form-group">
                          <label>实施普查车组</label>
                          <select className="form-control" id="train">
                            {this.state.trainList.map(item =>
                              <option value={item.name} key={item.id}>{item.name} ({item.model})</option>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>实施普查日期</label>
                          <input type="date" className="form-control" id="date" />
                        </div>
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-12">
                        <button type="button" className="btn btn-secondary" onClick={this.dialog}>
                          <i className="fa fa-fw fa-plus"></i> 新增记录
                        </button>
                        <div className="btn-group pull-right">
                          <button type="button" className="btn btn-secondary" onClick={this.back}>
                            <i className="fa fa-fw fa-arrow-left"></i> 返回
                          </button>
                          <button type="button" className="btn btn-primary" onClick={this.save}>
                            <i className="fa fa-fw fa-check-square-o"></i> 保存
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="dialog-save" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="title" aria-hidden="true" style={{ fontSize: '0.875em' }}>
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 id="title" className="modal-title">新增记录</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body row">
                      <div className="col-4 form-group">
                        <label>实施普查的车厢号</label>
                        <select className="form-control form-control-sm" id="carriage">
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                        </select>
                      </div>
                      <div className="col-8 form-group">
                        <label>具体项点</label>
                        <input type="text" className="form-control form-control-sm" id="carriage_subject" />
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-4 form-group">
                        <label>开工时间</label>
                        <input type="text" className="form-control form-control-sm" id="time_begin" />
                      </div>
                      <div className="col-4 form-group">
                        <label>完工时间</label>
                        <input type="text" className="form-control form-control-sm" id="time_end" />
                      </div>
                      <div className="col-4 form-group">
                        <label>检查结果</label>
                        <select className="form-control form-control-sm" id="result">
                          <option value="良好">良好</option>
                          <option value="异常">异常</option>
                        </select>
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-12 form-group">
                        <label>故障及处理情况</label>
                        <input type="text" className="form-control form-control-sm" id="report" />
                      </div>

                      <div className="col-6 form-group">
                        <label>实施单位</label>
                        <input type="text" className="form-control form-control-sm" id="dept" />
                      </div>
                      <div className="col-6 form-group">
                        <label>实施者</label>
                        <input type="text" className="form-control form-control-sm" id="executor" />
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-12 form-group">
                        <label>备注</label>
                        <textarea rows="2" className="form-control form-control-sm" id="remark"></textarea>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" onClick={this.submit}>
                        <i className="fa fa-fw fa-check-square-o"></i> 确认
                      </button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row"><br /></div>

              <Journal02Detail01 />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Journal02Save01 />, document.getElementById('app'))

          // import navbar from './navbar-2.html'
          // document.getElementById('navbar').innerHTML = navbar

          // import sidebar from './sidebar-b.html'
          // document.getElementById('sidebar').innerHTML = sidebar

          // import toolbar from './journal.02-toolbar.html'
          // document.getElementById('toolbar').innerHTML = toolbar

// let app = new Vue({
//   el: '#app',
//   data: {
//     journal0: {},
//     journal: {},
//     content: {},
//     contentList: [],
//     trainList: []
//   },
//   methods: {
//     plus: function () {
//       $('#save').modal()
//     },
//     remove: function (event) {
//       if (!!!confirm('确认删除该记录？')) return false
//       axios({
//         method: 'DELETE',
//         url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/' + event.target.getAttribute('data-id'),
//         responseType: 'json'
//       }).then(function (response) {
//         if (response.data.status === 200) {
//           location.reload(true)
//         } else {
//           alert(response.data.message)
//         }
//       })
//     },
//     submit: function () {
//       axios({
//         method: 'POST',
//         url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
//         data: {
//           subject: app.journal0.subject || '',
//           approval_sn: app.journal0.approval_sn || '',
//           train_sn: app.journal0.train_sn || '',
//           date: app.journal0.date || '1970-01-01',
//           carriage: app.journal.carriage || '',
//           carriage_subject: app.journal.carriage_subject || '',
//           time_begin: app.journal.time_begin || '00:00:00',
//           time_end: app.journal.time_end || '00:00:00',
//           result: app.journal.result || '良好',
//           report: app.journal.report || '',
//           dept: app.journal.dept || '',
//           executor: app.journal.executor || '',
//           watcher: app.journal.watcher || '',
//           watcher_group: app.journal.watcher_group || '',
//           qc: app.journal.qc || '',
//           remark: app.journal.remark || ''
//         },
//         responseType: 'json'
//       }).then(function (response) {
//         if (response.data.status === 200) {
//           location.reload(true)
//         } else {
//           alert(response.data.message)
//         }
//       })
//     },
//     save: function () {
//       axios({
//         method: 'PUT',
//         url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
//         data: {
//           subject: app.journal0.subject || '',
//           approval_sn: app.journal0.approval_sn || '',
//           train_sn: app.journal0.train_sn || '',
//           date: app.journal0.date || '1970-01-01'
//         },
//         responseType: 'json'
//       }).then(function (response) {
//         if (response.data.status === 200) {
//           location.href = './journal.02-verify.leader.html'
//         } else {
//           alert(response.data.message)
//         }
//       })
//     }
//   },
//   created: function () {
//     this.journal0.date = moment().format('YYYY-MM-DD')
//     axios({
//       method: 'GET',
//       url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
//       responseType: 'json'
//     }).then(function (response) {
//       app.contentList = response.data.content
//       if (app.contentList.length > 0) {
//         app.journal0.subject = app.contentList[0].subject
//         app.journal0.approval_sn = app.contentList[0].approval_sn
//         app.journal0.train_sn = app.contentList[0].train_sn
//         app.journal0.date = app.contentList[0].date
//       }
//     })

//     axios({
//       method: 'get',
//       url: './api/common/train',
//       responseType: 'json'
//     }).then(function (response) {
//       if (response.data.message) {
//         app.message = response.data.message
//         return false
//       }
//       app.trainList = response.data.content
//     })
//   }
// })
