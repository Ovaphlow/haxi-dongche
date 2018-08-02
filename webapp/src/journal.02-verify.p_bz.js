import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/SidebarA'

class Journal02VerifyPbz extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', auth: {}, detail01: [], detail02: [], detail03: [], detail04: [] }
    this.submitDetail01 = this.submitDetail01.bind(this)
    this.submitDetail02 = this.submitDetail02.bind(this)
    this.submitDetail03 = this.submitDetail03.bind(this)
    this.submitDetail04 = this.submitDetail04.bind(this)
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

  submitDetail01(event) {
    this.setState({ message: '' })
    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/' + event.target.getAttribute('data-id') + '/p_bz',
      data: {
        watcher: event.target.value === '确认' ? this.state.auth.name : '',
        watcher_group: event.target.value === '确认' ? this.state.auth.dept : ''
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
    }).catch(err => {
      this.setState({ message: '服务器通信异常' })
    })
  }

  submitDetail02(event) {
    this.setState({ message: '' })

    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/' + event.target.getAttribute('data-id') + '/p_bz',
      data: { content: event.target.value, p_bz: this.state.auth.name },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
    }).catch(err => {
      this.setState({ message: '服务器通信异常' })
    })
  }

  submitDetail03(event) {
    this.setState({ message: '' })

    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/03/' + event.target.getAttribute('data-id') + '/p_bz',
      data: { content: event.target.value, p_bz: this.state.auth.name },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
    }).catch(err => {
      this.setState({ message: '服务器通信异常' })
    })
  }

  submitDetail04(event) {
    this.setState({ message: '' })

    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/' + event.target.getAttribute('data-id') + '/p_bz',
      data: {
        watcher: event.target.value ? this.state.auth.name : '',
        watcher_group: event.target.value ? this.state.auth.dept : ''
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
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
                <div className="row">
                  <div className="col-12">
                    <ul className="list-group">
                      {this.state.detail01.map(item =>
                        <li className="list-group-item">
                          <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1 list-inline">
                              <li className="list-inline-item"><span className="text-secondary">普查项目：</span>{item.subject}</li>
                              <li className="list-inline-item"><span className="text-secondary">批准文件号：</span>{item.approval_sn}</li>
                              <li className="list-inline-item"><span className="text-secondary">车组号：</span><span className="text-primary">{item.train_sn}</span></li>
                            </h5>
                            <small className="text-secondary">{item.date}</small>
                          </div>
                          <p>
                            <ul className="list-inline">
                              <li className="list-inline-item"><span className="text-secondary">车厢号：</span><span className="text-info">{item.carriage}</span></li>
                              <li className="list-inline-item"><span className="text-secondary">具体项点：</span>{item.carriage_subject}</li>
                              <li className="list-inline-item"><span className="text-secondary">开工时间：</span>{item.time_begin}</li>
                              <li className="list-inline-item"><span className="text-secondary">完工时间：</span>{item.time_end}</li>
                              {/* </ul> */}
                              {/* <ul className="list-inline"> */}
                              <li className="list-inline-item"><span className="text-secondary">检查结果：</span><span className="text-danger">{item.result}</span></li>
                              <li className="list-inline-item"><span className="text-secondary">故障及处理情况：</span>{item.report}</li>
                              <li className="list-inline-item"><span className="text-secondary">实施单位：</span>{item.dept}</li>
                              <li className="list-inline-item"><span className="text-secondary">实施者：</span>{item.executor}</li>
                            </ul>
                          </p>
                          <small>备注：{item.remark}</small>
                          <p>
                            <br />
                            <select className="form-control" data-id={item.id} onChange={this.submitDetail01}>
                              <option value="">监控结果</option>
                              <option value="确认">确认</option>
                            </select>
                          </p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              }

              {this.state.detail02 &&
                <div className="row">
                  <div className="col-12">
                    <ul className="list-group">
                      {this.state.detail02.map(item =>
                        <li className="list-group-item">
                          <h5>
                            <span className="text-secondary">部件名称：</span>{item.name}
                            <span className="pull-right">
                              <span className="text-secondary">车组：</span>
                              {item.train}
                            </span>
                          </h5>

                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <span className="text-secondary">车号：</span>
                              <span className="text-primary">{item.carriage}</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="text-secondary">位置：</span>
                              <span className="text-info">{item.position}</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="text-secondary">日期：</span>
                              <span className="text-secondary">{item.date}</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="text-secondary">时间：</span>
                              <span className="text-secondary">{item.time}</span>
                            </li>
                          </ul>

                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <span className="text-secondary">更换原因：</span>
                              <span className="text-danger">{item.reason}</span>
                            </li>
                          </ul>

                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <span className="text-secondary">作业人员已阅读工艺文件并掌握各步骤：</span>
                              <strong>{item.p_gywj ? '是' : '否'}</strong>
                            </li>
                            <li className="list-inline-item">
                              <span className="text-secondary">力矩扳手已校验：</span>
                              <strong>{item.p_ljbs ? '是' : '否'}</strong>
                            </li>
                            <li className="list-inline-item">
                              <span className="text-secondary">换下部件序列号：</span>
                              <span className="text-info">{item.component_sn_old}</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="text-secondary">换上部件序列号：</span>
                              <span className="text-info">{item.component_sn_new}</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="text-secondary">部件安装良好，螺栓力矩已紧固，防松标记已涂打：</span>
                              <strong>{item.p_bjaz ? '是' : '否'}</strong>
                            </li>
                            <li className="list-inline-item">
                              <span className="text-secondary">作业者：</span>
                              <u>{item.operator}</u>
                            </li>
                            <li className="list-inline-item">
                              <span className="text-secondary">检修工长：</span>
                              <u>{item.leader}</u>
                            </li>
                          </ul>
                          <p>
                            <br />
                            <select className="form-control" data-id={item.id} onChange={this.submitDetail02}>
                              <option value="">监控结果</option>
                              <option value="确认">确认</option>
                            </select>
                          </p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              }

              {this.state.detail03 &&
                <ul className="list-group">
                  {this.state.detail03.map(item =>
                    <li className="list-group-item">
                      <h5>
                        <span className="text-secondary">部件名称：</span>{item.name}
                        <span className="pull-right">
                          <span className="text-secondary">车组：</span>
                          {item.train}
                        </span>
                      </h5>

                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <span className="text-secondary">车号：</span>
                          <span className="text-primary">{item.carriage}</span>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-secondary">位置：</span>
                          <span className="text-info">{item.position}</span>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-secondary">更换日期：</span>
                          <span className="text-secondary">{item.date}</span>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-secondary">更换时间：</span>
                          <span className="text-secondary">{item.time}</span>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-secondary">生产时间：</span>
                          <span className="text-secondary">{item.production_date}</span>
                        </li>
                      </ul>

                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <span className="text-secondary">更换原因：</span>
                          <span className="text-danger">{item.reason}</span>
                        </li>
                      </ul>

                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <span className="text-secondary">作业人员已阅读工艺文件并掌握各步骤：</span>
                          <strong>{item.p_gywj ? '是' : '否'}</strong>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-secondary">力矩扳手已校验：</span>
                          <strong>{item.p_ljbs ? '是' : '否'}</strong>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-secondary">换下部件序列号：</span>
                          <span className="text-info">{item.component_sn_old}</span>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-secondary">换上部件序列号：</span>
                          <span className="text-info">{item.component_sn_new}</span>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-secondary">部件安装良好，螺栓力矩已紧固，防松标记已涂打：</span>
                          <strong>{item.p_bjaz ? '是' : '否'}</strong>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-secondary">作业者：</span>
                          <u>{item.operator}</u>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-secondary">检修工长：</span>
                          <u>{item.leader}</u>
                        </li>
                      </ul>

                      <p>
                        <br />
                        <select className="form-control" data-id={item.id} onChange={this.submitDetail03}>
                          <option value="">监控结果</option>
                          <option value="确认">确认</option>
                        </select>
                      </p>
                    </li>
                  )}
                </ul>
              }

              {this.state.detail04 &&
                <ul id="list" className="list-group">
                  {this.state.detail04.map(item =>
                    <li className="list-group-item">
                      <h5>
                        <span className="text-secondary">车厢号：</span>
                        <span className="text-info">{item.carriage}</span>
                        <span className="pull-right">{item.carriage_subject}</span>
                      </h5>

                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <span className="text-secondary">开工时间：</span>
                          <span className="text-secondary">{item.time_begin}</span>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-secondary">完工时间：</span>
                          <span className="text-secondary">{item.time_end}</span>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-secondary">实施单位：</span>
                          {item.dept}
                        </li>
                        <li className="list-inline-item">
                          <span className="text-secondary">实施者：</span>
                          <u>{item.operator}</u>
                        </li>
                      </ul>

                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <span className="text-secondary">备注：</span>
                          {item.remark}
                        </li>
                      </ul>

                      <div className="clearfix"></div>

                      <p>
                        <br />
                        <select className="form-control" data-id={item.id} onChange={this.submitDetail04}>
                          <option value="">监控结果</option>
                          <option value="确认">确认</option>
                        </select>
                      </p>
                    </li>
                  )}
                </ul>
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