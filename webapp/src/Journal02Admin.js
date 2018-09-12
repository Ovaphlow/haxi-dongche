import React from 'react'

import { BackButton, TrainList, Sidebar, PageTitle, PageTitle2 } from './component/Common'

export class Journal02Admin extends React.Component {
  constructor() {
    super()
    this.state = { master: {}, detail01: [], detail02: [], detail03: [], detail04: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth.auth_admin) window.location = './#/login'

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}`)
    .then(res => res.json())
    .then(response => {
      this.setState({ master: response.content })
      document.getElementById('component.train-list').value = response.content.group_sn
      let p_xdc = document.getElementsByName('p_yq_xdc')
      for (let i = 0; i < p_xdc.length; i++) {
        if (response.content.p_yq_xdc === p_xdc[i].value) {
          p_xdc[i].checked = true
          break
        }
      }
      let p_jcw = document.getElementsByName('p_yq_jcw')
      for (let el of p_jcw) {
        if (response.content.p_yq_jcw === el.value) {
          el.checked = true
          break
        }
      }
      let p_zydd = document.getElementsByName('p_yq_zydd')
      for (let el of p_zydd) {
        if (response.content.p_yq_zydd === el.value) {
          el.checked = true
          break
        }
      }
    })
    .catch(err => window.console && console.error(err))

    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/01/`)
    .then(res => res.json())
    .then(response => this.setState({ detail01: response.content }))
    .catch(err => window.console && console.error(err))
  }

  submitMaster() {
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json;charset=utf8'
      },
      body: JSON.stringify({
        applicant: document.getElementById('applicant').value,
        applicantPhone: document.getElementById('applicantPhone').value,
        leader: document.getElementById('leader').value,
        leaderPhone: document.getElementById('leaderPhone').value,
        dept: document.getElementById('dept').value,
        groupSN: document.getElementById('component.train-list').value,
        dateBegin: document.getElementById('dateBegin').value,
        timeBegin: document.getElementById('timeBegin').value,
        dateEnd: document.getElementById('dateEnd').value,
        timeEnd: document.getElementById('timeEnd').value,
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
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) alert(response.message)
      else window.location.reload(true)
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
       <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-cog" title="编辑一体化作业申请单" toolbar="Journal02Toolbar" />

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

          <table className="table table-bordered table-sm" style={{ border: '2px solid black' }}>
            <tbody>
              <tr>
                <td width="15%" className="text-center align-middle">申请单位</td>
                <td colSpan="3">
                  <input type="text" className="form-control form-control-sm" id="dept"
                      defaultValue={this.state.master.dept}
                  />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">申请人</td>
                <td width="35%" className="text-center">
                  <input type="text" className="form-control form-control-sm" id="applicant"
                      defaultValue={this.state.master.applicant}
                  />
                </td>
                <td width="15%" className="text-center align-middle">联系电话</td>
                <td width="35%" className="text-center">
                  <input type="text" className="form-control form-control-sm" id="applicantPhone"
                      defaultValue={this.state.master.applicant_phone}
                  />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">作业负责人</td>
                <td width="35%" className="text-center">
                  <input type="text" className="form-control form-control-sm" id="leader"
                      defaultValue={this.state.master.leader}
                  />
                </td>
                <td width="15%" className="text-center align-middle">联系电话</td>
                <td width="35%" className="text-center">
                  <input type="text" className="form-control form-control-sm" id="leaderPhone"
                      defaultValue={this.state.master.leader_phone}
                  />
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
                  <input type="date" className="form-control-sm" style={{ width: '9rem' }} id="dateBegin"
                      defaultValue={this.state.master.date_begin}
                  />
                  <input type="time" className="form-control-sm ml-3" style={{ width: '6rem' }} id="timeBegin"
                      defaultValue={this.state.master.time_begin}
                  />
                  &nbsp;---&nbsp;
                  <input type="date" className="form-control-sm" style={{ width: '9rem' }} id="dateEnd"
                      defaultValue={this.state.master.date_end}
                  />
                  <input type="time" className="form-control-sm ml-3" style={{ width: '6rem' }} id="timeEnd"
                      defaultValue={this.state.master.time_end}
                  />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">作业内容</td>
                <td colSpan="3">
                  <select className="form-control form-control-sm" id="content"
                      defaultValue={this.state.master.content}
                  >
                    <option value="普查">普查</option>
                    <option value="检查">检查</option>
                    <option value="故障处理">故障处理</option>
                    <option value="加装改造">加装改造</option>
                    <option value="其它">其它</option>
                  </select>
                  <br />
                  <input type="text" className="form-control form-control-sm" id="content_detail"
                      defaultValue={this.state.master.content_detail}
                  />
                </td>
              </tr>
              <tr>
                <td width="15%" className="text-center align-middle">施修要求</td>
                <td colSpan="3">
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td width="15%" className="text-center">蓄电池</td>
                        <td className="text-center">
                          <input name="p_yq_xdc" type="radio" value="供" id="p_yq_xdc-0" />
                          <label htmlFor="p_yq_xdc-0">供</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_xdc" type="radio" value="断" id="p_yq_xdc-1" />
                          <label htmlFor="p_yq_xdc-1">断</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_xdc" type="radio" value="无要求" id="p_yq_xdc-2" />
                          <label htmlFor="p_yq_xdc-2">无要求</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td width="15%" className="text-center">接触网</td>
                        <td className="text-center">
                          <input name="p_yq_jcw" type="radio" value="供" id="p_yq_jcw-0" />
                          <label htmlFor="p_yq_jcw-0">供</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_jcw" type="radio" value="断" id="p_yq_jcw-1" />
                          <label htmlFor="p_yq_jcw-1">断</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_jcw" type="radio" value="无要求" id="p_yq_jcw-2" />
                          <label htmlFor="p_yq_jcw-2">无要求</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td width="15%" className="text-center">作业地点</td>
                        <td className="text-center">
                          <input name="p_yq_zydd" type="radio" value="检查库" id="p_yq_zydd-0" />
                          <label htmlFor="p_yq_zydd-0">检查库</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_zydd" type="radio" value="临修库" id="p_yq_zydd-1" />
                          <label htmlFor="p_yq_zydd-1">临修库</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input name="p_yq_zydd" type="radio" value="无要求" id="p_yq_zydd-2" />
                          <label htmlFor="p_yq_zydd-2">无要求</label>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td width="15%" className="text-center">其它</td>
                        <td className="text-center">
                          <input type="text" className="form-control form-control-sm" id="p_yq_qt"
                              defaultValue={this.state.master.p_yq_qt}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="col">
            <BackButton />
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary" onClick={this.submitMaster.bind(this)}>
                <i className="fa fa-fw fa-edit"></i>
                保存
              </button>
            </div>
          </div>

          <h5 className="mt-3 text-center">动车组一般部件普查记录单</h5>
          <table className="table table-sm table-bordered" style={{ border: '2px solid black' }}>
            <tbody>
              <tr>
                <td width="8%" className="text-center align-middle">普查项目</td>
                <td width="42%" colSpan="5" className="text-center align-middle" id="detail01-subject"></td>
                <td width="15%" colSpan="2" className="text-center align-middle">批准文件号</td>
                <td width="35%" colSpan="4" className="text-center align-middle" id="detail01-approval_sn"></td>
              </tr>
              <tr>
                <td width="10%" className="text-center align-middle">实施普查车组</td>
                <td width="40%" colSpan="5" className="text-center align-middle" id="detail01-train_sn"></td>
                <td width="10%" colSpan="2" className="text-center align-middle">实施普查日期</td>
                <td width="40%" colSpan="4" className="text-center align-middle" id="detail01-date"></td>
              </tr>
              <tr>
                <td width="8%" className="text-center align-middle">实施普查<br />的车厢号</td>
                <td width="10%" className="text-center align-middle">具体项点</td>
                <td width="6%" className="text-center align-middle">开工<br />时间</td>
                <td width="6%" className="text-center align-middle">完工<br />时间</td>
                <td width="6%" className="text-center align-middle">检查<br />结果</td>
                <td width="14%" className="text-center align-middle">故障及处理情况</td>
                <td width="8%" className="text-center align-middle">实施单位</td>
                <td width="7%" className="text-center align-middle">实施者</td>
                <td width="8%" className="text-center align-middle">动车组<br />现场监控人</td>
                <td width="8%" className="text-center align-middle">监控班组</td>
                <td width="8%" className="text-center align-middle">质检员</td>
                <td className="text-center align-middle">备注</td>
              </tr>
              {this.state.detail01.map(item =>
                <tr key={item.id}>
                  <td width="8%" className="text-center align-middle">
                    {item.carriage}
                  </td>
                  <td width="10%" className="text-center align-middle">{item.carriage_subject}</td>
                  <td width="6%" className="text-center align-middle">{item.time_begin}</td>
                  <td width="6%" className="text-center align-middle">{item.time_end}</td>
                  <td width="6%" className="text-center align-middle">{item.result}</td>
                  <td width="14%" className="text-center align-middle">{item.report}</td>
                  <td width="8%" className="text-center align-middle">{item.dept}</td>
                  <td width="7%" className="text-center align-middle">{item.executor}</td>
                  <td width="8%" className="text-center align-middle">
                    {item.watcher}
                      <select className="form-control form-control-sm"
                          data-id={item.id} onChange={this.submitDetailPbz}
                      >
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                        <option value="未确认">未确认</option>
                      </select>
                  </td>
                  <td width="8%" className="text-center align-middle">{item.watcher_group}</td>
                  <td width="8%" className="text-center align-middle">
                    {item.qc}
                      <select className="form-control form-control-sm"
                          data-id={item.id} onChange={this.submitDetailQc}
                      >
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                        <option value="未确认">未确认</option>
                      </select>
                  </td>
                  <td className="text-center align-middle">{item.remark}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}