import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/SidebarB'
import Toolbar from './component/Journal02Toolbar'
import Journal02Detail01 from './component/Journal02Detail01'

import './dashboard.css'

class Journal02 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list: [] }
    this.renderBadge = this.renderBadge.bind(this)
    this.submit = this.submit.bind(this)
    this.detail = this.detail.bind(this)
  }

  componentDidMount() {
    document.getElementById('date_begin').value = moment().format('YYYY-MM-DD')
    axios({
      method: 'get',
      url: './api/journal02/?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list: response.data.content })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })
  }

  renderBadge(item) {
    if (item.verify_id > 0) return (
      <span className="badge badge-light pull-right">
        作业完成
      </span>
    )
    else if (item.sign_verify_leader && (item.p_jsy_content === '同意') || item.sign_verify_leader_qc) return (
      <span className="badge badge-dark pull-right">
        调度员核销
      </span>
    )
    else if ((item.p_jsy_content.indexOf('质检') !== 1) && item.sign_verify_leader_bz) return (
      <span className="badge badge-danger pull-right">
        质检签字
      </span>
    )
    else if (item.sign_verify_leader && (item.p_jsy_content.indexOf('班组') !== -1)) return (
      <span className="badge badge-danger pull-right">
        班组签字
      </span>
    )
    else if (item.p_dd_id > 0) return (
      <span className="badge badge-success pull-right">
        作业负责人签字
      </span>
    )
    else if (item.p_zbsz_id > 0) return (
      <span className="badge badge-danger pull-right">
        动车所调度审核
      </span>
    )
    else if (item.sign_p_jsy && ((item.p_jsy_content.indexOf('班组跟踪') !== -1 && item.sign_p_jsy_bz) ||
        (item.p_jsy_content.indexOf('质检跟踪') !== -1 && item.sign_p_jsy_qc) ||
        item.p_jsy_content === '同意')) return (
      <span className="badge badge-warning pull-right">
        值班做账审批
      </span>
    )
    else if (item.sign_p_jsy_bz && item.p_jsy_content.indexOf('质检跟踪') !== -1 && !!!item.sign_p_jsy_qc) return (
      <span className="badge badge-info pull-right">
        质检签字
      </span>
    )
    else if (item.sign_p_jsy && item.p_jsy_content.indexOf('班组') !== -1 && !!!item.sign_p_jst_bz) return (
      <span className="badge badge-info pull-right">
        班组签字
      </span>
    )
    else if (!!!item.sign_p_jsy) return (
      <span className="badge badge-info pull-right">
        动车所技术员审核
      </span>
    )
  }

  submit() {
    axios({
      method: 'post',
      url: './api/journal02/filter/',
      data: {
        dept: app.filter.dept || '',
        group: app.filter.group_sn || '',
        date: app.filter.date_begin || ''
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list: response.data.content })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })
  }

  detail(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    location.href = './journal.02-detail.html'
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="contrainer-fluid">
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
                <i className="fa fa-search fa-fw"></i> 检索数据
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
                <div className="form-group col-3">
                  <label>作业车组号</label>
                  <input type="text" className="form-control form-control-sm" id="group" />
                </div>
                <div className="form-group col-3">
                  <label>申请单位</label>
                  <input type="text" className="form-control form-control-sm" id="dept" />
                </div>
                <div className="form-group col-3">
                  <label>申请作业时间</label>
                  <input type="date" className="form-control form-control-sm" id="date_begin" />
                </div>
                <div className="form-group col-3">
                  <label>&nbsp;</label>
                  <button type="button" className="btn btn-outline-secondary btn-sm form-control" onClick={this.submit}>
                    <i className="fa fa-fw fa-search"></i> 查询
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <ul className="list-group">
                    {this.state.list.map(item =>
                      <li className="list-group-item" key={item.id}>
                        <p className="lead">
                          <strong>{item.content}</strong>
                          {this.renderBadge(item)}
                        </p>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <span className="text-secondary">申请单位：</span>
                            {item.dept}
                          </li>
                          <li className="list-inline-item">
                            <span className="text-secondary">申请人：</span>
                            {item.applicant} ({item.applicant_phone})
                          </li>
                          <li className="list-inline-item">
                            <span className="text-secondary">作业负责人：</span>
                            {item.leader} ({item.leader})
                          </li>
                          <li className="list-inline-item">
                            <span className="text-secondary">作业车组号：</span>
                            {item.group_sn}
                          </li>
                          <li className="list-inline-item">
                            <span className="text-secondary">申请作业时间：</span>
                            {item.date_begin} {item.time_begin} 至 {item.date_end} {item.time_end}
                          </li>
                        </ul>

                        <div className="row">
                          <div className="col-12">
                            <div className="btn-group pull-right">
                              <button type="button" className="btn btn-light" data-id={item.id} onClick={this.detail}>
                                详细信息
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Journal02 />, document.getElementById('app'))
