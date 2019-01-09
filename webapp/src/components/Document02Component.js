import echarts from 'echarts'
import moment from 'moment'
import React from 'react'

import { GetStatsTrain, GetStatsSchedule, SaveDocument02Schedule, GetScheduleFinishedRatio  } from '../actions/Document02'

// 指定时段计划内作业完成比例
export class ScheduleFinishedRatio extends React.Component {
  render() {
    return (
      <div className="text-center mt-3">
        <h3>计划内作业完成比例</h3>
        <div className="row">
          <div className="col-3">
            <input type="date" className="form-control" id="date-begin" />
          </div>
          <div className="col-3">
            <input type="date" className="form-control" id="date-end" />
          </div>
          <div className="col-6 text-left">
            <button type="button" className="btn btn-primary" onClick={this.handler.bind(this)}>
              <i className="fa fa-fw fa-check-square-o"></i>
              确定
            </button>
          </div>
        </div>

        <div className="mt-3" id="chart" style={{ width: '100%', height: '40em' }}></div>
      </div>
    )
  }

  handler() {
    if (!!!document.getElementById('date-begin').value || !!!document.getElementById('date-end').value) {
      window.alert('请选择起止时间')
      return
    }
    let body = {
      date_begin: document.getElementById('date-begin').value,
      date_end: document.getElementById('date-end').value
    }
    GetScheduleFinishedRatio(body)
    .then(response => {
      if (response.message) {
        window.alert(response.message)
        return
      }
      let data = [
        {
          name: '未完成数量',
          value: response.content.qty1 - response.content.qty
        },
        {
          name: '完成数量',
          value: response.content.qty
        }
      ]
      var chart = echarts.init(document.getElementById('chart'))
      var option = {
        title: {
          text: '按时段统计计划内作业完成比例',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '计划内作业',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: data,
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        ]
      }
      chart.setOption(option)
    })
    .catch(err => window.console && console.error(err))
  }
}

export class StatsSchedule extends React.Component {
  componentDidMount() {
    let date_begin = moment()
    date_begin.date('01')
    document.getElementById('date-begin').value = date_begin.format('YYYY-MM-DD')
    let date_end = moment()
    date_end.month(date_end.month() + 1)
    date_end.date('01')
    date_end.subtract(1, 'days')
    document.getElementById('date-end').value = date_end.format('YYYY-MM-DD')
  }

  render() {
    return (
      <div className="text-center mt-3">
        <h3>按计划内/外统计</h3>
        <div className="row">
          <div className="col-3">
            <input type="date" className="form-control" id="date-begin" />
          </div>
          <div className="col-3">
            <input type="date" className="form-control" id="date-end" />
          </div>
          <div className="col-6 text-left">
            <button type="button" className="btn btn-primary" onClick={this.handler.bind(this)}>
              <i className="fa fa-fw fa-check-square-o"></i>
              确定
            </button>
          </div>
        </div>

        <div className="mt-3" id="chart" style={{ width: '100%', height: '40em' }}></div>
      </div>
    )
  }

  handler() {
    GetStatsSchedule({
      date_begin: document.getElementById('date-begin').value,
      date_end: document.getElementById('date-end').value
    })
    .then(response => {
      var chart = echarts.init(document.getElementById('chart'))
      var option = {
        title: {
          text: '按时段统计计划内/计划外作业数量',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '作业次数',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: response.content,
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        ]
      }
      chart.setOption(option)
    })
    .catch(err => window.console && console.error(err))
  }
}

// 按车组统计
export class StatsTrain extends React.Component {
  componentDidMount() {
    GetStatsTrain()
    .then(response => {
      var chart = echarts.init(document.getElementById('chart'))
      var option = {
        title: {
          text: '作业车组数据统计',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '作业次数',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: response.content,
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        ]
      }
      chart.setOption(option)
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <div className="col text-center mt-3">
        <div id="chart" style={{ width: '100%', height: '40em' }}></div>
      </div>
    )
  }
}

// 计划内申请
export class Document02SaveButton extends React.Component {
  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.handler.bind(this)}>
        <i className="fa fa-fw fa-check-square-o"></i>
        确认
      </button>
    )
  }

  handler() {
    let body = {
      dept: document.getElementById('dept').value,
      applicant: document.getElementById('applicant').value,
      applicant_phone: document.getElementById('applicant_phone').value,
      leader: document.getElementById('leader').value,
      leader_id: document.getElementById('leader').getAttribute('data-leader_id'),
      leader_phone: document.getElementById('leader_phone').value,
      train: document.getElementById('train').value,
      date_begin: document.getElementById('date_begin').value,
      time_begin: document.getElementById('time_begin').value,
      date_end: document.getElementById('date_end').value,
      time_end: document.getElementById('time_end').value,
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
    }
    if (
        body.dept === '' ||
        body.applicant === '' ||
        body.applicant_phone === '' ||
        body.leader === '' ||
        body.leader_phone === '' ||
        body.train === '' ||
        body.date_begin === '' ||
        body.time_begin === '' ||
        body.date_end === '' ||
        body.time_end === '' ||
        body.content === '' ||
        body.content_detail === '' ||
        body.p_yq_qt === ''
    ) {
      window.alert('请完整填写申请单信息')
      return
    }
    SaveDocument02Schedule(body)
    .then(response => {
      if (response.message) {
        window.alert(response.message)
        return
      }
      window.location = './#/journal.02'
    })
    .catch(err => window.console && console.error(err))
  }
}

export class Document02TableMaster extends React.Component {
  render() {
    return (
      <div>
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
              <td colSpan="3" className="text-center align-middle">
                <input type="text" className="form-control" id="dept"
                    defaultValue={this.props.item.dept}
                />
              </td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">申请人</td>
              <td width="35%" className="text-center align-middle">
                <input type="text" className="form-control" id="applicant"
                    defaultValue={this.props.item.applicant}
                />
              </td>
              <td width="15%" className="text-center align-middle">联系电话</td>
              <td width="35%" className="text-center align-middle">
                <input type="text" className="form-control" id="applicant_phone"
                    defaultValue={this.props.item.applicant_phone}
                />
              </td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">作业负责人</td>
              <td width="35%" className="text-center">
                <input type="text" className="form-control" id="leader"
                    defaultValue={this.props.item.leader} data-leader_id={this.props.item.leader_id}
                />
              </td>
              <td width="15%" className="text-center align-middle">联系电话</td>
              <td width="35%" className="text-center">
                <input type="text" className="form-control" id="leader_phone"
                    defaultValue={this.props.item.leader_phone}
                />
              </td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">作业车组号</td>
              <td colSpan="3" className="text-center align-middle">
                <input type="text" className="form-control" id="train"
                    defaultValue={this.props.item.train}
                />
              </td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">申请作业时间</td>
              <td colSpan="3" className="text-center">
                <input type="date" className="form-control-sm" style={{ width: '9rem' }} id="date_begin"
                    defaultValue={this.props.item.date_begin}
                />
                <input type="time" className="form-control-sm ml-3" style={{ width: '9rem' }} id="time_begin"
                    defaultValue={this.props.item.time_begin}
                />
                &nbsp;---&nbsp;
                <input type="date" className="form-control-sm" style={{ width: '9rem' }} id="date_end"
                    defaultValue={this.props.item.date_end}
                />
                <input type="time" className="form-control-sm ml-3" style={{ width: '9rem' }} id="time_end"
                    defaultValue={this.props.item.time_end}
                />
              </td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">作业内容</td>
              <td colSpan="3" className="text-center align-middle">
                <div className="row">
                  <div className="col-2">
                    <select className="form-control" id="content"
                        value={this.props.item.content}
                    >
                      <option value="普查">普查</option>
                      <option value="检查">检查</option>
                      <option value="故障处理">故障处理</option>
                      <option value="加装改造">加装改造</option>
                      <option value="其它">其它</option>
                    </select>
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" id="content_detail"
                        defaultValue={this.props.item.content_detail}
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">施修要求</td>
              <td colSpan="3">
                <table className="table table-sm">
                  <tbody>
                    <tr>
                      <td width="15%" className="text-center align-middle">蓄电池</td>
                      <td className="text-center">
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_xdc === '供' ?
                              <span className="text-danger">
                                <strong>✓供</strong>
                              </span>
                              :
                              <span>▢供</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_xdc" type="radio" value="供" id="p_yq_xdc-0" />
                            <label htmlFor="p_yq_xdc-0">&nbsp;供</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_xdc === '断' ?
                              <span className="text-danger">
                                <strong>✓断</strong>
                              </span>
                              :
                              <span>▢断</span>
                            }
                          </span>
                          :
                            <span>
                              <input name="p_yq_xdc" type="radio" value="断" id="p_yq_xdc-1" />
                              <label htmlFor="p_yq_xdc-1">&nbsp;断</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_xdc === '无要求' ?
                              <span className="text-danger">
                                <strong>✓无要求</strong>
                              </span>
                              :
                              <span>▢无要求</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_xdc" type="radio" value="无要求" id="p_yq_xdc-2" />
                            <label htmlFor="p_yq_xdc-2">&nbsp;无要求</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      </td>
                    </tr>
                    <tr>
                      <td width="15%" className="text-center align-middle">接触网</td>
                      <td className="text-center">
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_jcw === '供' ?
                              <span className="text-danger">
                                <strong>✓供</strong>
                              </span>
                              :
                              <span>▢供</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_jcw" type="radio" value="供" id="p_yq_jcw-0" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_jcw-0">&nbsp;供</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_jcw === '断' ?
                              <span className="text-danger">
                                <strong>✓断</strong>
                              </span>
                              :
                              <span>▢断</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_jcw" type="radio" value="断" id="p_yq_jcw-1" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_jcw-1">&nbsp;断</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_jcw === '无要求' ?
                              <span className="text-danger">
                                <strong>✓无要求</strong>
                              </span>
                              :
                              <span>▢无要求</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_jcw" type="radio" value="无要求" id="p_yq_jcw-2" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_jcw-2">&nbsp;无要求</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      </td>
                    </tr>
                    <tr>
                      <td width="15%" className="text-center align-middle">作业地点</td>
                      <td className="text-center">
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_zydd === '检查库' ?
                              <span className="text-danger">
                                <strong>✓检查库</strong>
                              </span>
                              :
                              <span>▢检查库</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_zydd" type="radio" value="检查库" id="p_yq_zydd-0" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_zydd-0">&nbsp;检查库</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_zydd === '临修库' ?
                              <span className="text-danger">
                                <strong>✓临修库</strong>
                              </span>
                              :
                              <span>▢临修库</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_zydd" type="radio" value="临修库" id="p_yq_zydd-1" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_zydd-1">&nbsp;临修库</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_zydd === '无要求' ?
                              <span className="text-danger">
                                <strong>✓无要求</strong>
                              </span>
                              :
                              <span>▢无要求</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_zydd" type="radio" value="无要求" id="p_yq_zydd-2" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_zydd-2">&nbsp;无要求</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      </td>
                    </tr>
                    <tr>
                      <td width="15%" className="text-center align-middle">其它</td>
                      <td className="text-center align-middle">
                        <input type="text" className="form-control" id="p_yq_qt" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export class ScheduleItem extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.id}</td>
        <td>{this.props.item.category}</td>
        <td>{this.props.item.train}</td>
        <td>{this.props.item.content}</td>
        <td>{this.props.item.content_detail}</td>
        <td>
          {this.props.item.date_begin} {this.props.item.time_begin}
          <br/>
          {this.props.item.date_end} {this.props.item.time_end}
        </td>
        <td>{this.props.item.dept}</td>
        <td>{this.props.item.applicant}</td>
        <td>{this.props.item.applicant_phone}</td>
      </tr>
    )
  }
}