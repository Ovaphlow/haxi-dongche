import axios from 'axios'
import React from 'react'

export default class Journal02Detail01 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', auth: {}, detail: [] }
    this.submitDetailPbz = this.submitDetailPbz.bind(this)
    this.submitDetailQc = this.submitDetailQc.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/?timestamp=' + new Date().getTime(),
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
    }).catch(err => this.setState({ message: '服务器通信异常' }))
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
    }).catch(err => this.setState({ message: '服务器通信异常' }))
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
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  remove(event) {
    if (!!!window.confirm('确认删除该记录？')) return false
    axios({
      method: 'delete',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/' + event.target.getAttribute('data-id'),
      responseType: 'json'
    }).then(function (response) {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      window.location.reload(true)
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
              {this.state.detail.map(item =>
                <tr key={item.id}>
                  <td width="8%" className="text-center align-middle">
                    {item.carriage}
                    {!!!this.props.read &&
                      <span className="text-danger"><i className="fa fa-fw fa-trash" data-id={item.id} onClick={this.remove}></i></span>
                    }
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
                    {this.props.p_bz &&
                      <select className="form-control form-control-sm" data-id={item.id} onChange={this.submitDetailPbz}>
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                      </select>
                    }
                  </td>
                  <td width="8%" className="text-center align-middle">{item.watcher_group}</td>
                  <td width="8%" className="text-center align-middle">
                    {item.qc}
                    {this.props.qc &&
                      <select className="form-control form-control-sm" data-id={item.id} onChange={this.submitDetailQc}>
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                      </select>
                    }
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
