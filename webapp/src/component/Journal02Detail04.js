import React from 'react'

export default class Journal02Detail02 extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', auth: {}, detail: [] }
    this.submitDetailPbz = this.submitDetailPbz.bind(this)
    this.submitDetailQc = this.submitDetailQc.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail: response.data.content })
      if (response.data.content.length > 0) {
        document.getElementById('detail04-subject').innerText = response.data.content[0].subject
        document.getElementById('detail04-software_version_new').innerText = response.data.content[0].software_version_new
        document.getElementById('detail04-software_version_old').innerText = response.data.content[0].software_version_old
        document.getElementById('detail04-approval_sn').innerText = response.data.content[0].approval_sn
        document.getElementById('detail04-train').innerText = response.data.content[0].train
        document.getElementById('detail04-date').innerText = response.data.content[0].date
      }
    }).catch(err => {
      this.setState({ message: '服务器通信异常' })
    })
  }

  submitDetailPbz(event) {
    this.setState({ message: '' })

    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/' + event.target.getAttribute('data-id') + '/p_bz',
      data: {
        watcher: event.target.value ? this.props.auth.name : '',
        watcher_group: event.target.value ? this.props.auth.dept : ''
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
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/' + event.target.getAttribute('data-id') + '/qc',
      data: {
        qc: event.target.value ? this.props.auth.name : ''
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
          <h4 className="text-center">动车组加装改造（软件升级）记录单</h4>
        </div>

        {this.state.message &&
          <div className="col-12">
            {this.state.message}
          </div>
        }

        <div className="col-12">
          <table className="table table-sm table-bordered" style={{ border: '2px solid black' }}>
            <tr>
              <td width="15%" className="text-center align-middle">实施改造项目(升级系统)</td>
              <td colspan="8" className="text-center align-middle" id="detail04-subject"></td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">软件版本号</td>
              <td width="10%" className="text-center align-middle">新</td>
              <td width="10%" className="text-center align-middle" id="detail04-software_version_new"></td>
              <td width="10%" className="text-center align-middle">旧</td>
              <td width="10%" className="text-center align-middle" id="detail04-software_version_old"></td>
              <td width="20%" colspan="2" className="text-center align-middle">批准文件号</td>
              <td width="30%" colspan="2" className="text-center align-middle" id="detail04-approval_sn"></td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">实施改造车组</td>
              <td width="40$" colspan="4" className="text-center align-middle" id="detail04-train"></td>
              <td width="20%" colspan="2" className="text-center align-middle">实施改造日期</td>
              <td width="30%" colspan="2" className="text-center align-middle" id="detail04-date"></td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">实施改造的车厢号</td>
              <td width="10%" className="text-center align-middle">开工时间</td>
              <td width="10%" className="text-center align-middle">完工时间</td>
              <td width="10%" className="text-center align-middle">实施单位</td>
              <td width="10%" className="text-center align-middle">实施者</td>
              <td width="10%" className="text-center align-middle">动车所现场监控人</td>
              <td width="10%" className="text-center align-middle">监控班组</td>
              <td width="10%" className="text-center align-middle">质检员</td>
              <td width="15%" className="text-center align-middle">备注</td>
            </tr>
            {this.state.detail.map(item =>
              <tr>
                <td width="15%" className="text-center align-middle">{item.carriage}</td>
                <td width="10%" className="text-center align-middle">{item.time_begin}</td>
                <td width="10%" className="text-center align-middle">{item.time_end}</td>
                <td width="10%" className="text-center align-middle">{item.dept}</td>
                <td width="10%" className="text-center align-middle">{item.operator}</td>
                <td width="10%" className="text-center align-middle">
                  {item.watcher}
                  {this.props.p_bz &&
                    <select className="form-control" data-id={item.id} onChange={this.submitDetailPbz}>
                      <option value="">监控结果</option>
                      <option value="确认">确认</option>
                    </select>
                  }
                </td>
                <td width="10%" className="text-center align-middle">{item.watcher_group}</td>
                <td width="10%" className="text-center align-middle">
                  {item.qc}
                  {this.props.qc &&
                    <select className="form-control" data-id={item.id} onChange={this.submitDetailQc}>
                      <option value="">监控结果</option>
                      <option value="确认">确认</option>
                    </select>
                  }
                </td>
                <td width="15%" className="text-center align-middle">{item.remark}</td>
              </tr>
            )}
          </table>

          {/* <ul id="list" className="list-group">
            {this.props.detail.map(item =>
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