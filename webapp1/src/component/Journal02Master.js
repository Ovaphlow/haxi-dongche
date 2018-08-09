import React from 'react'

export default class Journal02Master extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', trainList: [], master: {} }
    this.save = this.save.bind(this)
    this.preview = this.preview.bind(this)
  }

  componentDidMount() {
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
      this.setState({ message: '' })
    })

    if (this.props.read) {
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
        document.getElementById('applicantPhone').value = response.data.content.applicant_phone
        document.getElementById('leader').value = response.data.content.leader
        document.getElementById('leaderPhone').value = response.data.content.leader_phone
        document.getElementById('groupSN').value = response.data.content.group_sn
        document.getElementById('dateBegin').value = response.data.content.date_begin
        document.getElementById('timeBegin0').value = response.data.content.time_begin.split(':')[0]
        document.getElementById('timeBegin1').value = response.data.content.time_begin.split(':')[1]
        document.getElementById('dateEnd').value = response.data.content.date_end
        document.getElementById('timeEnd0').value = response.data.content.time_end.split(':')[0]
        document.getElementById('timeEnd1').value = response.data.content.time_end.split(':')[1]
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
        if (response.data.content.p_yq_zydd === '融冰除雪库') {
          document.getElementById('p_yq_zydd-0').checked = true
        } else if (response.data.content.p_yq_zydd === '停留线') {
          document.getElementById('p_yq_zydd-1').checked = true
        } else if (response.data.content.p_yq_zydd === '其它') {
          document.getElementById('p_yq_zydd-2').checked = true
        }
      }).catch(err => {
        this.setState({ message: '服务器通信异常' })
      })
      return false
    }
  }

  save() {
    this.setState({ message: '' })
    if (
      !!!document.getElementById('dept').value || !!!document.getElementById('applicant').value ||
      !!!document.getElementById('leader').value || !!!document.getElementById('groupSN').value ||
      !!!document.getElementById('dateBegin').value || !!!document.getElementById('dateEnd').value
    ) {
      this.setState({ message: '请完整填写申请信息' })
      return false
    }
    axios({
      method: 'post',
      url: './api/journal02/',
      data: {
        applicant: document.getElementById('applicant').value,
        applicantId: this.props.auth.id,
        applicantPhone: document.getElementById('applicantPhone').value,
        leader: document.getElementById('leader').value,
        leaderPhone: document.getElementById('leaderPhone').value,
        dept: document.getElementById('dept').value,
        groupSN: document.getElementById('groupSN').value,
        dateBegin: document.getElementById('dateBegin').value,
        timeBegin: document.getElementById('timeBegin0').value + (document.getElementById('timeBegin1').value || '00') + '00',
        dateEnd: document.getElementById('dateEnd').value,
        timeEnd: document.getElementById('timeEnd0').value + (document.getElementById('timeEnd1').value || '00') + '00',
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
          (document.getElementById('p_yq_zydd-2').checked && document.getElementById('p_yq_zydd-2').value) || '其它',
        p_yq_qt: document.getElementById('p_yq_qt').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      location.href = './journal.02.html'
    })
  }

  preview() {
    axios({
      method: 'get',
      url: './api/excel/journal02/' + sessionStorage.getItem('journal02'),
      responseType: 'json'
    }).then(function (response) {
      location.href = response.data.content
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <button type="button" className="btn btn-outline-success btn-sm" onClick={this.preview}>
            <i className="fa fa-fw fa-search"></i> 预览
          </button>
        </div>

        <div className="col-12"><br /></div>

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
                <td colSpan="3"><input type="text" className="form-control form-control-sm" id="dept" readOnly={this.props.read ? true : false} /></td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">申请人</td>
                <td width="35%" className="text-center"><input type="text" className="form-control form-control-sm" id="applicant" readOnly={this.props.read ? true : false} /></td>
                <td width="15%" className="text-center align-middle">联系电话</td>
                <td width="35%" className="text-center"><input type="text" className="form-control form-control-sm" id="applicantPhone" readOnly={this.props.read ? true : false} /></td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">作业负责人</td>
                <td width="35%" className="text-center"><input type="text" className="form-control form-control-sm" id="leader" readOnly={this.props.read ? true : false} /></td>
                <td width="15%" className="text-center align-middle">联系电话</td>
                <td width="35%" className="text-center"><input type="text" className="form-control form-control-sm" id="leaderPhone" readOnly={this.props.read ? true : false} /></td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">作业车组号</td>
                <td colSpan="3">
                  <select className="form-control form-control-sm" id="groupSN" disabled={this.props.read ? true : false}>
                    {this.state.trainList.map(item =>
                      <option value={item.name} key={item.id}>{item.name} ({item.model})</option>
                    )}
                  </select>
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">申请作业时间</td>
                <td colSpan="3" className="text-center">
                  <input type="date" className="form-control-sm" style={{ width: '9rem' }} id="dateBegin" readOnly={this.props.read ? true : false} />
                  日 &nbsp; &nbsp;
                  <input type="text" className="form-control-sm" style={{ width: '3rem' }} id="timeBegin0" readOnly={this.props.read ? true : false} />
                  时 &nbsp; &nbsp;
                  <input type="text" className="form-control-sm" style={{ width: '3rem' }} id="timeBegin1" readOnly={this.props.read ? true : false} />
                  分 &nbsp; &nbsp; --- &nbsp; &nbsp;
                  <input type="date" className="form-control-sm" style={{ width: '9rem' }} id="dateEnd" readOnly={this.props.read ? true : false} />
                  日 &nbsp; &nbsp;
                  <input type="text" className="form-control-sm" style={{ width: '3rem' }} id="timeEnd0" readOnly={this.props.read ? true : false} />
                  时 &nbsp; &nbsp;
                  <input type="text" className="form-control-sm" style={{ width: '3rem' }} id="timeEnd1" readOnly={this.props.read ? true : false} />
                  分
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">作业内容</td>
                <td colSpan="3">
                  <select className="form-control form-control-sm" id="content" disabled={this.props.read ? true : false}>
                    <option value="普查">普查</option>
                    <option value="检查">检查</option>
                    <option value="故障处理">故障处理</option>
                    <option value="加装改造">加装改造</option>
                    <option value="其它">其它</option>
                  </select>
                  <br />
                  <input type="text" className="form-control form-control-sm" id="content_detail" readOnly={this.props.read ? true : false} />
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
                          <input name="p_yq_xdc" type="radio" value="供" id="p_yq_xdc-0" disabled={this.props.read ? true : false} />
                          <label htmlFor="p_yq_xdc-0">供</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_xdc" type="radio" value="断" id="p_yq_xdc-1" disabled={this.props.read ? true : false} />
                          <label htmlFor="p_yq_xdc-1">断</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_xdc" type="radio" value="无要求" id="p_yq_xdc-2" disabled={this.props.read ? true : false} />
                          <label htmlFor="p_yq_xdc-2">无要求</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td width="15%" className="text-center">接触网</td>
                        <td className="text-center">
                          <input name="p_yq_jcw" type="radio" value="供" id="p_yq_jcw-0" disabled={this.props.read ? true : false} />
                          <label htmlFor="p_yq_jcw-0">供</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_jcw" type="radio" value="断" id="p_yq_jcw-1" disabled={this.props.read ? true : false} />
                          <label htmlFor="p_yq_jcw-1">断</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_jcw" type="radio" value="无要求" id="p_yq_jcw-2" disabled={this.props.read ? true : false} />
                          <label htmlFor="p_yq_jcw-2">无要求</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td width="15%" className="text-center">作业地点</td>
                        <td className="text-center">
                          <input name="p_yq_zydd" type="radio" value="融冰除雪库" id="p_yq_zydd-0" disabled={this.props.read ? true : false} />
                          <label htmlFor="p_yq_zydd-0">融冰除雪库</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_zydd" type="radio" value="停留线" id="p_yq_zydd-1" disabled={this.props.read ? true : false} />
                          <label htmlFor="p_yq_zydd-1">停留线</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_zydd" type="radio" value="其它" id="p_yq_zydd-2" disabled={this.props.read ? true : false} />
                          <label htmlFor="p_yq_zydd-2">其它</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td width="15%" className="text-center">其它</td>
                        <td className="text-center">
                          <input type="text" className="form-control form-control-sm" id="p_yq_qt" readOnly={this.props.read ? true : false} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {!!!this.props.read &&
          <div className="col-12">
            <div className="btn-group pull-right">
              <a href="./journal.02.html" className="btn btn-secondary">
                <i className="fa fa-fw fa-arrow-left"></i> 取消
              </a>
              <button type="button" className="btn btn-primary" onClick={this.save}>
                <i className="fa fa-fw fa-check-square-o"></i> 确定
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
                      <img src="#" alt="作业负责人签字" src={this.state.master.sign_verify_leader} />
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
                      <img src="#" alt="调度员签字" src={this.state.master.sign_verify} />
                    }
                  </td>
                </tr>
                <tr>
                  <td width="15%" className="text-center align-middle">备注</td>
                  <td colSpan="3" className="text-center align-middle">
                    <p>{this.state.master.remark}</p>
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
                          <img src="#" alt="班组签字" src={this.state.master.sign_p_jsy_bz} />
                        }
                      </div>
                      <div className="col-3">
                        <span className="text-secondary">班组签字：<br />
                        </span>
                        {this.state.master.sign_verify_leader_bz &&
                          <img src="#" alt="班组签字" src={this.state.master.sign_verify_leader_bz} />
                        }
                      </div>
                      <div className="col-3">
                        <span className="text-secondary">质检签字：<br />
                        </span>
                        {this.state.master.sign_p_jsy_qc &&
                          <img src="#" alt="质检签字" src={this.state.master.sign_p_jsy_qc} />
                        }
                      </div>
                      <div className="col-3">
                        <span className="text-secondary">质检签字：<br />
                        </span>
                        {this.state.master.sign_verify_leader_qc &&
                          <img src="#" alt="质检签字" src={this.state.master.sign_verify_leader_qc} />
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
