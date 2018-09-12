import axios from 'axios'
import React from 'react'
import moment from 'moment'

import { BackButton, TrainList } from './Common'

export default class Journal02Master extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', master: {}, auth: {} }
    this.save = this.save.bind(this)
    this.update = this.update.bind(this)
    this.preview = this.preview.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    this.setState({ auth: auth })
    if (this.props.mode === 'save') {
      document.getElementById('leader').value = auth.name
      document.getElementById('leaderPhone').value = auth.phone
      document.getElementById('dept').value = auth.dept
      // 修改申请人为用户输入形式
      // document.getElementById('component.user-selector').value = auth.name
      document.getElementById('dateBegin').value = moment().format('YYYY-MM-DD')
      document.getElementById('timeBegin').value = moment({ hours: parseInt(moment().format('HH'), 0) + 1 }).format('HH:mm')
      // document.getElementById('timeBegin0').value = moment({ hours: parseInt(moment().format('HH'), 0) + 1 }).format('HH')
      // document.getElementById('timeBegin1').value = '00'
      document.getElementById('dateEnd').value = moment().format('YYYY-MM-DD')
      document.getElementById('timeEnd').value = moment({ hours: parseInt(moment().format('HH'), 0) + 2 }).format('HH:mm')
      // document.getElementById('timeEnd0').value = moment({ hours: parseInt(moment().format('HH'), 0) + 2 }).format('HH')
      // document.getElementById('timeEnd1').value = '00'
    } else if (this.props.mode === 'read' || this.props.mode === 'update') {
      axios({
        method: 'get',
        url: './api/journal02/' + sessionStorage.getItem('journal02') + '?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ master: response.data.content })
        document.getElementById('dept').value = response.data.content.dept
        document.getElementById('applicant').value = response.data.content.applicant
        // document.getElementById('component.user-selector').value = response.data.content.applicant
        document.getElementById('applicantPhone').value = response.data.content.applicant_phone
        document.getElementById('leader').value = response.data.content.leader
        document.getElementById('leaderPhone').value = response.data.content.leader_phone
        document.getElementById('component.train-list').value = response.data.content.group_sn
        document.getElementById('dateBegin').value = response.data.content.date_begin
        document.getElementById('timeBegin').value = response.data.content.time_begin
        // document.getElementById('timeBegin0').value = response.data.content.time_begin.split(':')[0]
        // document.getElementById('timeBegin1').value = response.data.content.time_begin.split(':')[1]
        document.getElementById('dateEnd').value = response.data.content.date_end
        document.getElementById('timeEnd').value = response.data.content.time_end
        // document.getElementById('timeEnd0').value = response.data.content.time_end.split(':')[0]
        // document.getElementById('timeEnd1').value = response.data.content.time_end.split(':')[1]
        document.getElementById('content').value = response.data.content.content
        document.getElementById('content_detail').value = response.data.content.content_detail
        if (response.data.content.p_yq_xdc === '供') {
          document.getElementById('p_yq_xdc-0').checked = true
        } else if (response.data.content.p_yq_xdc === '断') {
          document.getElementById('p_yq_xdc-1').checked = true
        } else if (response.data.content.p_yq_xdc === '无要求') {
          document.getElementById('p_yq_xdc-2').checked = true
        }
        if (response.data.content.p_yq_jcw === '供') {
          document.getElementById('p_yq_jcw-0').checked = true
        } else if (response.data.content.p_yq_jcw === '断') {
          document.getElementById('p_yq_jcw-1').checked = true
        } else if (response.data.content.p_yq_jcw === '无要求') {
          document.getElementById('p_yq_jcw-2').checked = true
        }
        if (response.data.content.p_yq_zydd === '检查库') {
          document.getElementById('p_yq_zydd-0').checked = true
        } else if (response.data.content.p_yq_zydd === '临修库') {
          document.getElementById('p_yq_zydd-1').checked = true
        } else if (response.data.content.p_yq_zydd === '无要求') {
          document.getElementById('p_yq_zydd-2').checked = true
        }
      }).catch(err => this.setState({ message: '服务器通信异常' }))
    }
  }

  save() {
    this.setState({ message: '' })
    if (
        !!!document.getElementById('dept').value ||
        !!!document.getElementById('applicant').value ||
        !!!document.getElementById('leader').value ||
        !!!document.getElementById('component.train-list').value ||
        !!!document.getElementById('dateBegin').value ||
        !!!document.getElementById('dateEnd').value
    ) {
      this.setState({ message: '请完整填写申请信息' })
      return false
    }
    axios({
      method: 'post',
      url: './api/journal02/',
      data: {
        applicant: document.getElementById('applicant').value,
        // applicant: document.getElementById('component.user-selector').value,
        applicantPhone: document.getElementById('applicantPhone').value,
        leader: document.getElementById('leader').value,
        leaderId: this.state.auth.id,
        leaderPhone: document.getElementById('leaderPhone').value,
        dept: document.getElementById('dept').value,
        groupSN: document.getElementById('component.train-list').value,
        dateBegin: document.getElementById('dateBegin').value,
        timeBegin: document.getElementById('timeBegin').value,
        // timeBegin: document.getElementById('timeBegin0').value + (document.getElementById('timeBegin1').value || '00') + '00',
        dateEnd: document.getElementById('dateEnd').value,
        timeEnd: document.getElementById('timeEnd').value,
        // timeEnd: document.getElementById('timeEnd0').value + (document.getElementById('timeEnd1').value || '00') + '00',
        content: document.getElementById('content').value,
        content_detail: document.getElementById('content_detail').value,
        p_yq_xdc: (document.getElementById('p_yq_xdc-0').checked && document.getElementById('p_yq_xdc-0').value) ||
          (document.getElementById('p_yq_xdc-1').checked && document.getElementById('p_yq_xdc-1').value) ||
          (document.getElementById('p_yq_xdc-2').checked && document.getElementById('p_yq_xdc-2').value) || '无要求',
        p_yq_jcw: (document.getElementById('p_yq_jcw-0').checked && document.getElementById('p_yq_jcw-0').value) ||
          (document.getElementById('p_yq_jcw-1').checked && document.getElementById('p_yq_jcw-1').value) ||
          (document.getElementById('p_yq_jcw-2').checked && document.getElementById('p_yq_jcw-2').value) || '无要求',
        p_yq_zydd: (document.getElementById('p_yq_zydd-0').checked && document.getElementById('p_yq_zydd-0').value) ||
          (document.getElementById('p_yq_zydd-1').checked && document.getElementById('p_yq_zydd-1').value) ||
          (document.getElementById('p_yq_zydd-2').checked && document.getElementById('p_yq_zydd-2').value) || '无要求',
        p_yq_qt: document.getElementById('p_yq_qt').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      window.location.href = './#/journal.02'
    })
  }

  update() {
    this.setState({ message: '' })
    if (
          !!!document.getElementById('dept').value ||
          !!!document.getElementById('applicant').value ||
          // !!!document.getElementById('component.user-selector').value ||
          !!!document.getElementById('leader').value ||
          !!!document.getElementById('component.train-list').value ||
          !!!document.getElementById('dateBegin').value ||
          !!!document.getElementById('dateEnd').value
    ) {
      this.setState({ message: '请完整填写申请信息' })
      return false
    }
    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02'),
      data: {
        applicant: document.getElementById('applicant').value,
        // applicant: document.getElementById('component.user-selector').value,
        applicantPhone: document.getElementById('applicantPhone').value,
        leader: document.getElementById('leader').value,
        leaderId: this.state.auth.id,
        leaderPhone: document.getElementById('leaderPhone').value,
        dept: document.getElementById('dept').value,
        groupSN: document.getElementById('component.train-list').value,
        dateBegin: document.getElementById('dateBegin').value,
        timeBegin: document.getElementById('timeBegin').value,
        // timeBegin: document.getElementById('timeBegin0').value + (document.getElementById('timeBegin1').value || '00') + '00',
        dateEnd: document.getElementById('dateEnd').value,
        timeEnd: document.getElementById('timeEnd').value,
        // timeEnd: document.getElementById('timeEnd0').value + (document.getElementById('timeEnd1').value || '00') + '00',
        content: document.getElementById('content').value,
        content_detail: document.getElementById('content_detail').value,
        p_yq_xdc: (document.getElementById('p_yq_xdc-0').checked && document.getElementById('p_yq_xdc-0').value) ||
          (document.getElementById('p_yq_xdc-1').checked && document.getElementById('p_yq_xdc-1').value) ||
          (document.getElementById('p_yq_xdc-2').checked && document.getElementById('p_yq_xdc-2').value) || '无要求',
        p_yq_jcw: (document.getElementById('p_yq_jcw-0').checked && document.getElementById('p_yq_jcw-0').value) ||
          (document.getElementById('p_yq_jcw-1').checked && document.getElementById('p_yq_jcw-1').value) ||
          (document.getElementById('p_yq_jcw-2').checked && document.getElementById('p_yq_jcw-2').value) || '无要求',
        p_yq_zydd: (document.getElementById('p_yq_zydd-0').checked && document.getElementById('p_yq_zydd-0').value) ||
          (document.getElementById('p_yq_zydd-1').checked && document.getElementById('p_yq_zydd-1').value) ||
          (document.getElementById('p_yq_zydd-2').checked && document.getElementById('p_yq_zydd-2').value) || '无要求',
        p_yq_qt: document.getElementById('p_yq_qt').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      window.location.href = './#/journal.02'
    })
  }

  preview() {
    axios({
      method: 'get',
      url: './api/excel/journal02/' + sessionStorage.getItem('journal02'),
      responseType: 'json'
    }).then(function (response) {
      window.location.href = response.data.content
    })
  }

  render() {
    return (
      <div className="row">
        {this.props.mode === 'read' &&
          <div className="col-12">
            <BackButton />
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-outline-success" onClick={this.preview}>
                <i className="fa fa-fw fa-download"></i>
                下载Excel
              </button>
            </div>
          </div>
        }

        <div className="col-12"><br /></div>

        {this.state.message &&
          <div className="col-12">
            <div className="alert alert-danger">
              {this.state.message}
            </div>
          </div>
        }

        <div className="col-12">
          <table className="table table-bordered table-sm" style={{ border: '2px solid black' }}>
            <tbody>
              <tr>
                <td rowSpan="2" width="20%" className="text-center align-middle">CRH</td>
                <td><strong>哈尔滨动车段哈尔滨西动车组运用所</strong></td>
                <td width="15%"></td>
              </tr>
              <tr>
                <td colSpan="2"><strong>一体化作业申请单</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-12">
          <table className="table table-bordered table-sm" style={{ border: '2px solid black' }}>
            <tbody>
              <tr>
                <td width="15%" className="text-center align-middle">申请单位</td>
                {/* <td colSpan="3"><input type="text" className="form-control form-control-sm" id="dept" readOnly={this.props.mode === 'read' ? true : false} /></td> */}
                <td colSpan="3">
                  <input type="text" readOnly={true} className="form-control" id="dept" />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">申请人</td>
                <td width="35%" className="text-center">
                  <input type="text" readOnly={this.props.mode === 'read' ? true : false} className="form-control" id="applicant" />
                  {/*<UserSelectorDept mode={this.props.mode} val={this.state.master.applicant} />*/}
                </td>
                <td width="15%" className="text-center align-middle">联系电话</td>
                <td width="35%" className="text-center">
                  <input type="text" className="form-control" id="applicantPhone" readOnly={this.props.mode === 'read' ? true : false} />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">作业负责人</td>
                <td width="35%" className="text-center">
                  <input type="text" readOnly={true} className="form-control" id="leader" />
                </td>
                <td width="15%" className="text-center align-middle">联系电话</td>
                <td width="35%" className="text-center">
                  <input type="text" readOnly className="form-control" id="leaderPhone" />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">作业车组号</td>
                <td colSpan="3">
                  <TrainList mode={this.props.mode} />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">申请作业时间</td>
                <td colSpan="3" className="text-center">
                  <input type="date" readOnly={this.props.mode === 'read' ? true : false} className="form-control-sm" style={{ width: '9rem' }} id="dateBegin" />
                  <input type="time" readOnly={this.props.mode === 'read' ? true : false} className="form-control-sm ml-3" style={{ width: '6rem' }} id="timeBegin" />
                  &nbsp;---&nbsp;
                  <input type="date" readOnly={this.props.mode === 'read' ? true : false} className="form-control-sm" style={{ width: '9rem' }} id="dateEnd" />
                  <input type="time" readOnly={this.props.mode === 'read' ? true : false} className="form-control-sm ml-3" style={{ width: '6rem' }} id="timeEnd" />
                  {/* <input type="date" className="form-control-sm" style={{ width: '9rem' }} id="dateBegin" readOnly={this.props.mode === 'read' ? true : false} />
                  日 &nbsp; &nbsp;
                  <input type="text" className="form-control-sm" style={{ width: '3rem' }} id="timeBegin0" readOnly={this.props.mode === 'read' ? true : false} />
                  时 &nbsp; &nbsp;
                  <input type="text" className="form-control-sm" style={{ width: '3rem' }} id="timeBegin1" readOnly={this.props.mode === 'read' ? true : false} />
                  分 &nbsp; &nbsp; --- &nbsp; &nbsp;
                  <input type="date" className="form-control-sm" style={{ width: '9rem' }} id="dateEnd" readOnly={this.props.mode === 'read' ? true : false} />
                  日 &nbsp; &nbsp;
                  <input type="text" className="form-control-sm" style={{ width: '3rem' }} id="timeEnd0" readOnly={this.props.mode === 'read' ? true : false} />
                  时 &nbsp; &nbsp;
                  <input type="text" className="form-control-sm" style={{ width: '3rem' }} id="timeEnd1" readOnly={this.props.mode === 'read' ? true : false} />
                  分 */}
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">作业内容</td>
                <td colSpan="3">
                  <select className="form-control form-control-sm" id="content" disabled={this.props.mode === 'read' ? true : false}>
                    <option value="普查">普查</option>
                    <option value="检查">检查</option>
                    <option value="故障处理">故障处理</option>
                    <option value="加装改造">加装改造</option>
                    <option value="其它">其它</option>
                  </select>
                  <br />
                  <input type="text" className="form-control form-control-sm" id="content_detail" readOnly={this.props.mode === 'read' ? true : false} />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">施修要求</td>
                <td colSpan="3">
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td width="15%" className="text-center">蓄电池({this.state.master.p_yq_xdc})</td>
                        <td className="text-center">
                          <input name="p_yq_xdc" type="radio" value="供" id="p_yq_xdc-0" disabled={this.props.mode === 'read' ? true : false} />
                          <label htmlFor="p_yq_xdc-0">供</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_xdc" type="radio" value="断" id="p_yq_xdc-1" disabled={this.props.mode === 'read' ? true : false} />
                          <label htmlFor="p_yq_xdc-1">断</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_xdc" type="radio" value="无要求" id="p_yq_xdc-2" disabled={this.props.mode === 'read' ? true : false} />
                          <label htmlFor="p_yq_xdc-2">无要求</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td width="15%" className="text-center">接触网</td>
                        <td className="text-center">
                          <input name="p_yq_jcw" type="radio" value="供" id="p_yq_jcw-0" disabled={this.props.mode === 'read' ? true : false} />
                          <label htmlFor="p_yq_jcw-0">供</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_jcw" type="radio" value="断" id="p_yq_jcw-1" disabled={this.props.mode === 'read' ? true : false} />
                          <label htmlFor="p_yq_jcw-1">断</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_jcw" type="radio" value="无要求" id="p_yq_jcw-2" disabled={this.props.mode === 'read' ? true : false} />
                          <label htmlFor="p_yq_jcw-2">无要求</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td width="15%" className="text-center">作业地点</td>
                        <td className="text-center">
                          <input name="p_yq_zydd" type="radio" value="检查库" id="p_yq_zydd-0" disabled={this.props.mode === 'read' ? true : false} />
                          <label htmlFor="p_yq_zydd-0">检查库</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_zydd" type="radio" value="临修库" id="p_yq_zydd-1" disabled={this.props.mode === 'read' ? true : false} />
                          <label htmlFor="p_yq_zydd-1">临修库</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_zydd" type="radio" value="无要求" id="p_yq_zydd-2" disabled={this.props.mode === 'read' ? true : false} />
                          <label htmlFor="p_yq_zydd-2">无要求</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td width="15%" className="text-center">其它</td>
                        <td className="text-center">
                          <input type="text" className="form-control form-control-sm" id="p_yq_qt" readOnly={this.props.mode === 'read' ? true : false} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {this.props.mode === 'save' &&
          <div className="col-12">
            <div className="btn-group pull-right">
              <a href="./#/journal.02" className="btn btn-secondary">
                <i className="fa fa-fw fa-arrow-left"></i>
                取消
              </a>
              <button type="button" className="btn btn-primary" onClick={this.save}>
                <i className="fa fa-fw fa-check-square-o"></i>
                确定
              </button>
            </div>
          </div>
        }

        {this.props.mode === 'update' &&
          <div className="col-12">
            <div className="btn-group pull-right">
              <a href="./#/journal.02" className="btn btn-secondary">
                <i className="fa fa-fw fa-arrow-left"></i>
                取消
              </a>
              <button type="button" className="btn btn-primary" onClick={this.update}>
                <i className="fa fa-fw fa-check-square-o"></i>
                确定
              </button>
            </div>
          </div>
        }

        {this.props.check &&
          <div className="col-12">
            <table className="table table-bordered table-sm" style={{ border: '2px solid black' }}>
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center align-middle"><h6 className="text-center">动车所审核</h6></td>
                </tr>
                <tr>
                  <td width="15%" className="text-center align-middle">动车所调度审核</td>
                  <td width="18%" className="text-center align-middle">
                    {this.state.master.sign_p_dd &&
                      <img alt="调度员签字" src={this.state.master.sign_p_dd} />
                    }
                  </td>
                  <td width="15%" className="text-center align-middle">动车所技术员审核</td>
                  <td width="18%" className="text-center align-middle">
                    {this.state.master.sign_p_jsy &&
                      <img alt="技术员签字" src={this.state.master.sign_p_jsy} />
                    }
                  </td>
                  <td width="15%" className="text-center align-middle">值班所长审批</td>
                  <td className="text-center align-middle">
                    {this.state.master.sign_p_zbsz &&
                      <img alt="值班所长签字" src={this.state.master.sign_p_zbsz} />
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        }

        {this.props.verify &&
          <div className="col-12">
            <table className="table table-bordered table-sm" style={{ border: '2px solid black' }}>
              <tbody>
                <tr>
                  <td colSpan="4"><h6 className="text-center align-middle">作业完成销记</h6></td>
                </tr>
                <tr>
                  <td width="15%" className="text-center align-middle">作业完成情况</td>
                  <td colSpan="3" className="text-center align-middle">
                    {this.state.master.verify_report}
                  </td>
                </tr>
                <tr>
                  <td width="15%" className="text-center align-middle">作业完成时间</td>
                  <td width="35%" className="text-center align-middle">
                    {this.state.master.verify_leader_date} {this.state.master.verify_leader_time}
                  </td>
                  <td width="15%" className="text-center align-middle">作业负责人签字</td>
                  <td width="35%" className="text-center align-middle">
                    {this.state.master.sign_verify_leader &&
                      <img alt="作业负责人签字" src={this.state.master.sign_verify_leader} />
                    }
                  </td>
                </tr>
                <tr>
                  <td width="15%" className="text-center align-middle">调度核销时间</td>
                  <td width="35%" className="text-center align-middle">
                    {this.state.master.verify_date} {this.state.master.verify_time}
                  </td>
                  <td width="15%" className="text-center align-middle">调度员签字</td>
                  <td width="35%" className="text-center align-middle">
                    {this.state.master.sign_verify &&
                      <img alt="调度员签字" src={this.state.master.sign_verify} />
                    }
                  </td>
                </tr>
                <tr>
                  <td width="15%" className="text-center align-middle">备注</td>
                  <td colSpan="3" className="text-center align-middle">
                    {this.state.master.remark &&
                      <div>
                        <p className="text-left">
                          {this.state.master.remark}
                        </p>
                        <hr />
                      </div>
                    }
                    <ul className="list-inline">
                      <li className="list-inline-item">{this.state.master.p_jsy_content}</li>
                      <li className="list-inline-item"><span className="text-secondary">班组：</span>{this.state.master.p_jsy_bz}</li>
                      <li className="list-inline-item"><span className="text-secondary">质检：</span>{this.state.master.p_jsy_qc}</li>
                    </ul>
                    <div className="row">
                      <div className="col-3">
                        <span className="text-secondary">班组签字：<br />
                        </span>
                        {this.state.master.sign_p_jsy_bz &&
                          <img alt="班组签字" src={this.state.master.sign_p_jsy_bz} />
                        }
                      </div>
                      <div className="col-3">
                        <span className="text-secondary">班组签字：<br />
                        </span>
                        {this.state.master.sign_verify_leader_bz &&
                          <img alt="班组签字" src={this.state.master.sign_verify_leader_bz} />
                        }
                      </div>
                      <div className="col-3">
                        <span className="text-secondary">质检签字：<br />
                        </span>
                        {this.state.master.sign_p_jsy_qc &&
                          <img alt="质检签字" src={this.state.master.sign_p_jsy_qc} />
                        }
                      </div>
                      <div className="col-3">
                        <span className="text-secondary">质检签字：<br />
                        </span>
                        {this.state.master.sign_verify_leader_qc &&
                          <img alt="质检签字" src={this.state.master.sign_verify_leader_qc} />
                        }
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      </div>
    )
  }
}
