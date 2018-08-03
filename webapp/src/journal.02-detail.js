import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/SidebarA'
import Journal02Detail01 from './component/Journal02Detail01'
import Journal02Detail02 from './component/Journal02Detail02'
import Journal02Detail03 from './component/Journal02Detail03'
import Journal02Detail04 from './component/Journal02Detail04'

class Journal02Detail extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', journal: {}, detail01: [], detail02: [], detail03: [], detail04: [] }
    this.back = this.back.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ journal: response.data.content })
    }).catch(err => {
      this.setState({ message: '服务器通信异常' })
    })

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

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  02.一体化作业申请单
                </h3>
              </div>

              <div className="lead">
                <div className="pull-right" id="toolbar"></div>
                <i className="fa fa-list fa-fw"></i> 详细信息
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

              <div className="card">
                <div className="card-body row">
                  <div className="col-12 text-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.back}>
                        <i className="fa fa-fw fa-arrow-left"></i> 返回
                      </button>
                      <button type="button" className="btn btn-outline-success btn-sm">
                        <i className="fa fa-fw fa-search"></i> 预览
                      </button>
                    </div>
                  </div>

                  <div className="col-12">
                    <span className="text-secondary">申请单位：</span>{this.state.journal.dept}
                  </div>

                  <div className="col-6">
                    <span className="text-secondary">申请人：</span>
                    <u>{this.state.journal.applicant}</u>
                  </div>
                  <div className="col-6">
                    <span className="text-secondary">联系电话：</span>{this.state.journal.applicant_phone}
                  </div>
                  <div className="clearfix"></div>

                  <div className="col-6">
                    <span className="text-secondary">作业负责人：</span>
                    <u>{this.state.journal.leader}</u>
                  </div>
                  <div className="col-6">
                    <span className="text-secondary">联系电话：</span>{this.state.journal.leader_phone}
                  </div>
                  <div className="clearfix"></div>

                  <div className="col-12">
                    <span className="text-secondary">作业车组号：</span>
                    <span className="text-primary">{this.state.journal.group_sn}</span>
                  </div>

                  <div className="col-6">
                    <span className="text-secondary">申请作业时间：</span>{this.state.journal.date_begin} {this.state.journal.time_begin}
                  </div>
                  <div className="col-6">
                    <span className="text-secondary">至：</span>{this.state.journal.date_end} {this.state.journal.time_end}
                  </div>
                  <div className="clearfix"></div>

                  <div className="col-12">
                    <span className="text-secondary">作业内容：</span>
                    <span className="text-danger">{this.state.journal.content}</span> //
                    <span className="text-danger">{this.state.journal.content_detail}</span>
                  </div>

                  <div className="col-12">
                    <span className="text-secondary">施修要求/蓄电池：</span>{this.state.journal.p_yq_xdc}
                  </div>
                  <div className="col-12">
                    <span className="text-secondary">施修要求/接触网：</span>{this.state.journal.p_yq_jcw}
                  </div>
                  <div className="col-12">
                    <span className="text-secondary">施修要求/作业地点：</span>{this.state.journal.p_yq_zydd}
                  </div>
                  <div className="col-12">
                    <span className="text-secondary">施修要求/其它：</span>{this.state.journal.p_yq_zydd || '无'}
                  </div>

                  <div className="col-12">
                    <hr />
                  </div>

                  <div className="col-4">
                    <span className="text-secondary">动车所调度审核：</span>
                    <span className="badge badge-danger">{this.state.journal.p_dd}</span>
                    <br />
                    { this.state.journal.sign_p_dd &&
                      <img src="#" alt="调度员签字" src={this.state.journal.sign_p_dd} />
                    }
                  </div>
                  <div className="col-4">
                    <span className="text-secondary">动车所技术员审核：</span>
                    <span className="badge badge-info">{this.state.journal.p_jsy}</span>
                    <br />
                    {this.state.journal.sign_p_jsy &&
                      <img src="#" alt="技术员签字" src={this.state.journal.sign_p_jsy} />
                    }
                  </div>
                  <div className="col-4">
                    <span className="text-secondary">值班所长审批：</span>
                    <span className="badge badge-warning">{this.state.journal.p_zbsz}</span>
                    <br />
                    {this.state.journal.sign_p_zbsz &&
                      <img src="#" alt="值班所长签字" src={this.state.journal.sign_p_zbsz} />
                    }
                  </div>
                  <div className="clearfix"></div>

                  <div className="col-4">
                    <span className="text-secondary">技术员设置：</span>{this.state.journal.p_jsy_content}
                  </div>
                  <div className="col-4">
                    <span className="text-secondary">班组：</span>{this.state.journal.p_jsy_bz}
                  </div>
                  <div className="col-4">
                    <span className="text-secondary">质检：</span>{this.state.journal.p_jsy_qc}
                  </div>
                  <div className="clearfix"></div>

                  <div className="col-12">
                    <hr />
                  </div>

                  <div className="col-12">
                    <span className="text-secondary">作业完成情况：</span>{this.state.journal.verify_report}
                  </div>

                  <div className="col-6">
                    <span className="text-secondary">作业完成时间：</span>{this.state.journal.verify_leader_date} {this.state.journal.verify_leader_time}
                  </div>
                  <div className="col-6">
                    <span className="text-secondary">作业负责人签字：</span>
                    <span className="badge badge-success">{this.state.journal.verify_leader}</span>
                    <br />
                    {this.state.journal.sign_verify_leader &&
                      <img src="#" alt="作业负责人签字" src={this.state.journal.sign_verify_leader} />
                    }
                  </div>
                  <div className="clearfix"></div>

                  <div className="col-6">
                    <span className="text-secondary">调度核销时间：</span>{this.state.journal.verify_date} {this.state.journal.verify_time}
                  </div>
                  <div className="col-6">
                    <span className="text-secondary">调度员签字：</span>
                    <span className="badge badge-dark">{this.state.journal.verify}</span>
                    <br />
                    {this.state.journal.sign_verify &&
                      <img src="#" alt="调度员签字" src={this.state.journal.sign_verify} />
                    }
                  </div>
                  <div className="clearfix"></div>

                  <div className="col-12">
                    <hr />
                  </div>

                  <div className="col-12">
                    <div className="row">
                      <br />
                      <div className="col-3">
                        <span className="text-secondary">班组签字：
                        <br />
                        </span>
                        {this.state.journal.sign_p_jsy_bz &&
                          <img src="#" alt="班组签字" src={this.state.journal.sign_p_jsy_bz} />
                        }
                      </div>
                      <div className="col-3">
                        <span className="text-secondary">班组签字：
                        <br />
                        </span>
                        {this.state.journal.sign_verify_leader_bz &&
                          <img src="#" alt="班组签字" src={this.state.journal.sign_verify_leader_bz} />
                        }
                      </div>
                      <div className="col-3">
                        <span className="text-secondary">质检签字：
                        <br />
                        </span>
                        {this.state.journal.sign_p_jsy_qc &&
                          <img src="#" alt="质检签字" src={journal.sign_p_jsy_qc} />
                        }
                      </div>
                      <div className="col-3">
                        <span className="text-secondary">质检签字：
                        <br />
                        </span>
                        {this.state.journal.sign_verify_leader_qc &&
                          <img src="#" alt="质检签字" src={this.state.journal.sign_verify_leader_qc} />
                        }
                      </div>
                    </div>
                    <p><span className="text-secondary">备注：<br /></span>{this.state.journal.remark}</p>
                  </div>
                </div>
              </div>

              <p><hr /></p>

              {this.state.detail01 &&
                <Journal02Detail01 detail={this.state.detail01} />
              }

              <p><hr /></p>

              {this.state.detail02 &&
                <Journal02Detail02 detail={this.state.detail02} />
              }

              <p><hr /></p>

              {this.state.detail03 &&
                <Journal02Detail03 detail={this.state.detail03} />
              }

              <p><hr /></p>

              {this.state.detail04 &&
                <Journal02Detail04 detail={this.state.detail04} />
              }
            </main>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Journal02Detail />, document.getElementById('app'))