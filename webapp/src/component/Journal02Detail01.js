import React from 'react'

export default class Journal02Detail01 extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', auth: {}, detail: [] }
    this.submitDetailPbz = this.submitDetailPbz.bind(this)
    this.submitDetailQc = this.submitDetailQc.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail: response.data.content })
      if (response.data.content.length > 0) {
        document.getElementById('detail01-subject').innerText = response.data.content[0].subject
        document.getElementById('detail01-approval_sn').innerText = response.data.content[0].approval_sn
        document.getElementById('detail01-train_sn').innerText = response.data.content[0].train_sn
        document.getElementById('detail01-date').innerText = response.data.content[0].date
      }
    }).catch(err => {
      this.setState({ message: '服务器通信异常' })
    })
  }

  submitDetailPbz(event) {
    this.setState({ message: '' })

    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/' + event.target.getAttribute('data-id') + '/p_bz',
      data: {
        watcher: event.target.value === '确认' ? this.props.auth.name : '',
        watcher_group: event.target.value === '确认' ? this.props.auth.dept : ''
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

  submitDetailQc(event) {
    this.setState({ message: '' })
    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/' + event.target.getAttribute('data-id') + '/qc',
      data: {
        qc: event.target.value === '确认' ? this.props.auth.name : ''
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

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h4 className="text-center">动车组一般部件普查记录单</h4>
        </div>

        {this.state.message &&
          <div className="col-12">
            <div className="alert alert-danger">
              {this.state.message}
            </div>
          </div>
        }

        <div className="col-12">
          <table className="table table-sm table-bordered" style={{ border: '2px solid black' }}>
            <tr>
              <td width="8%" className="text-center align-middle">普查项目</td>
              <td width="42%" colspan="5" className="text-center align-middle" id="detail01-subject"></td>
              <td width="15%" colspan="2" className="text-center align-middle">批准文件号</td>
              <td width="35%" colspan="4" className="text-center align-middle" id="detail01-approval_sn"></td>
            </tr>
            <tr>
              <td width="10%" className="text-center align-middle">实施普查车组</td>
              <td width="40%" colspan="5" className="text-center align-middle" id="detail01-train_sn"></td>
              <td width="10%" colspan="2" className="text-center align-middle">实施普查日期</td>
              <td width="40%" colspan="4" className="text-center align-middle" id="detail01-date"></td>
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
            {this.state.detail.map(item =>
              <tr>
                <td width="8%" className="text-center align-middle">{item.carriage}</td>
                <td width="10%" className="text-center align-middle">{item.carriage_subject}</td>
                <td width="6%" className="text-center align-middle">{item.time_begin}</td>
                <td width="6%" className="text-center align-middle">{item.time_end}</td>
                <td width="6%" className="text-center align-middle">{item.result}</td>
                <td width="14%" className="text-center align-middle">{item.report}</td>
                <td width="8%" className="text-center align-middle">{item.dept}</td>
                <td width="7%" className="text-center align-middle">{item.executor}</td>
                <td width="8%" className="text-center align-middle">{item.watcher}</td>
                <td width="8%" className="text-center align-middle">{item.watcher_group}</td>
                <td width="8%" className="text-center align-middle">{item.qc}</td>
                <td className="text-center align-middle">{item.remark}</td>
              </tr>
            )}
          </table>

          {/* <ul className="list-group">
            {this.props.detail.map(item =>
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
                    <li className="list-inline-item"><span className="text-secondary">检查结果：</span><span className="text-danger">{item.result}</span></li>
                    <li className="list-inline-item"><span className="text-secondary">故障及处理情况：</span>{item.report}</li>
                    <li className="list-inline-item"><span className="text-secondary">实施单位：</span>{item.dept}</li>
                    <li className="list-inline-item"><span className="text-secondary">实施者：</span>{item.executor}</li>
                  </ul>
                </p>
                <small><span className="text-secondary">备注：</span>{item.remark}</small>

                {this.props.p_bz &&
                  <p>
                    <br />
                    <select className="form-control" data-id={item.id} onChange={this.submitDetailPbz}>
                      <option value="">监控结果</option>
                      <option value="确认">确认</option>
                    </select>
                  </p>
                }

                {this.props.qc &&
                  <p>
                    <br />
                    <select className="form-control" data-id={item.id} onChange={this.submitDetailQc}>
                      <option value="">监控结果</option>
                      <option value="确认">确认</option>
                    </select>
                  </p>
                }
              </li>
            )}
          </ul> */}
        </div>
      </div>
    )
  }
}