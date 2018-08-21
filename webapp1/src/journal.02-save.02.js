import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Toolbar from './component/Journal02Toolbar'
import Journal02Detail02 from './component/Journal02Detail02'

import './dashboard.css'

class Journal02Save01 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', trainList: [] }
    this.dialog = this.dialog.bind(this)
    this.submit = this.submit.bind(this)
    this.save = this.save.bind(this)
  }

  componentDidMount() {
    document.getElementById('date').value = moment().format('YYYY-MM-DD')
    document.getElementById('operator').value = this.props.auth.name

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
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  dialog() {
    $('#dialog-save').modal()
  }

  submit() {
    axios({
      method: 'post',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/',
      data: {
        name: document.getElementById('name').value,
        train: document.getElementById('train').value,
        carriage: document.getElementById('carriage').value,
        position: document.getElementById('position').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        reason: document.getElementById('reason').value,
        p_gywj: document.getElementById('p_gywj').value,
        p_ljbs: document.getElementById('p_ljbs').value,
        component_sn_old: document.getElementById('component_sn_old').value,
        component_sn_new: document.getElementById('component_sn_new').value,
        p_bjaz: document.getElementById('p_bjaz').value,
        operator: document.getElementById('operator').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      location.reload(true)
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}` })
    })
  }

  save() {
    location.href = './journal.02-verify.leader.html'
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
                    <div className="card-body row">
                      <div className="col-12">
                        <p className="lead">动车组一般配件更换记录表</p>
                      </div>

                      <div className="col-12">
                        <button type="button" className="btn btn-secondary" onClick={this.dialog}>
                          <i className="fa fa-fw fa-plus"></i> 新增记录
                        </button>
                        <div className="btn-group pull-right">
                          <button type="button" className="btn btn-primary" onClick={this.save}>
                            <i className="fa fa-fw fa-check-square-o"></i> 完成
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
                      <div className="form-group col-4">
                        <label>部件名称</label>
                        <input type="text" className="form-control" id="name" />
                      </div>
                      <div className="form-group col-2">
                        <label>车组</label>
                        <select className="form-control" id="train">
                          {this.state.trainList.map(item =>
                            <option value={item.name} key={item.id}>{item.name} ({item.model})</option>
                          )}
                        </select>
                      </div>
                      <div className="form-group col-2">
                        <label>车号</label>
                        <select className="form-control" id="carriage">
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
                      <div className="form-group col-4">
                        <label>位置</label>
                        <input type="text" className="form-control" id="position" />
                      </div>

                      <div className="clearfix"></div>

                      <div className="form-group col-3">
                        <label>日期</label>
                        <input type="date" className="form-control" id="date" />
                      </div>
                      <div className="form-group col-3">
                        <label>时间</label>
                        <input type="text" className="form-control" id="time" />
                      </div>
                      <div className="form-group col-6">
                        <label>更换原因</label>
                        <input type="text" className="form-control" id="reason" />
                      </div>

                      <div className="clearflx"></div>

                      <div className="form-group col-3">
                        <label>工艺文件及各步骤</label>
                        <select className="form-control" id="p_gywj">
                          <option value="是">已阅读并掌握</option>
                          <option value="否">未阅读并掌握</option>
                        </select>
                      </div>
                      <div className="form-group col-3">
                        <label>力矩扳手</label>
                        <select className="form-control" id="p_ljbs">
                          <option value="是">已校验</option>
                          <option value="否">未校验</option>
                        </select>
                      </div>
                      <div className="col-3 form-group">
                        <label>换下部件序列号</label>
                        <input type="text" className="form-control" id="component_sn_old" />
                      </div>
                      <div className="col-3 form-group">
                        <label>换上部件序列号</label>
                        <input type="text" className="form-control" id="component_sn_new" />
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-6 form-group">
                        <label>部件、螺栓力矩、防松标记</label>
                        <select className="form-control" id="p_bjaz">
                          <option value="是">部件安装良好，螺栓力矩已紧固，放松标记已涂打</option>
                          <option value="否">否</option>
                        </select>
                      </div>
                      <div className="col-6 form-group">
                        <label>作业者</label>
                        <input type="text" className="form-control" id="operator" />
                      </div>
                      <div className="clearfix"></div>
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

              <Journal02Detail02 />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

let auth = JSON.parse(sessionStorage.getItem('auth'))
if (!!!auth.id) location.href = './login.html'

ReactDOM.render(<Journal02Save01 auth={auth} />, document.getElementById('app'))

// import navbar from './navbar-2.html'
// document.getElementById('navbar').innerHTML = navbar

// import sidebar from './sidebar-b.html'
// document.getElementById('sidebar').innerHTML = sidebar

// import toolbar from './journal.02-toolbar.html'
// document.getElementById('toolbar').innerHTML = toolbar

// let app = new Vue({
//   el: '#app',
//   data: {
//     list: [],
//     journal: {},
//     trainList: [],
//   },
//   methods: {
//     plus: function () {
//       $('#save').modal()
//     },

//     save: function () {
//       axios({
//         method: 'POST',
//         url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/',
//         data: app.journal,
//         responseType: 'json'
//       }).then(function (response) {
//         if (response.data.status === 200) {
//           location.reload(true)
//         } else {
//           alert(response.data.message)
//         }
//       })
//     },

//     remove: function (event) {
//       if (!!!confirm('确认删除选定的记录？')) return false
//       axios({
//         method: 'DELETE',
//         url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/' + event.target.getAttribute('data-id'),
//         responseType: 'json'
//       }).then(function (response) {
//         location.reload(true)
//       })
//     },

//     fin: function () {
//       location.href = './journal.02-verify.leader.html'
//     }
//   },

//   created: function () {
//     this.journal.date = moment().format('YYYY-MM-DD')
//     this.journal.p_gywj = '1'
//     this.journal.p_ljbs = '1'
//     this.journal.p_bjaz = '1'
//     this.journal.p_bjgnsy = '1'

//     axios({
//       method: 'GET',
//       url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/',
//       responseType: 'json'
//     }).then(function (response) {
//       app.list = response.data.content
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
//     }).catch(function (err) {
//       app.message = '服务器通信失败'
//     })
//   }
// })
