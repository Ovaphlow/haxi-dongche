import axios from 'axios'
import React from 'react'

export default class Journal02Detail02 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', detail: [], auth: {} }
    this.submitDetailPbz = this.submitDetailPbz.bind(this)
    this.submitDetailQc = this.submitDetailQc.bind(this)
    this.submitDetailPjsy = this.submitDetailPjsy.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })
    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail: response.data.content })
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  submitDetailPbz(event) {
    this.setState({ message: '' })
    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/' + event.target.getAttribute('data-id') + '/p_bz',
      data: {
        leader: event.target.value === '' ? '' : this.state.auth.name
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
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/' + event.target.getAttribute('data-id') + '/qc',
      data: {
        p_bjgnsy: event.target.value,
        qc: this.state.auth.name
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  submitDetailPjsy(event) {
    this.setState({ message: '' })
    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/' + event.target.getAttribute('data-id') + '/p_jsy',
      data: { duty_officer: event.target.value === '' ? '' : this.state.auth.name },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  remove(event) {
    if (!!!window.confirm('确认删除选定的记录？')) return false
    axios({
      method: 'delete',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/' + event.target.getAttribute('data-id'),
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
          <h4 className="text-center">动车组一般配件更换记录表</h4>
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
                <td width="6%" className="text-center align-middle">部件名称</td>
                <td width="6%" className="text-center align-middle">车组</td>
                <td width="3%" className="text-center align-middle">车号</td>
                <td width="3%" className="text-center align-middle">位置</td>
                <td width="6%" className="text-center align-middle">日期</td>
                <td width="6%" className="text-center align-middle">时间</td>
                <td className="text-center align-middle">更换原因</td>
                <td width="6%" className="text-center align-middle">作业人员已阅读工艺文件并掌握各步骤</td>
                <td width="4%" className="text-center align-middle">力矩扳手已校验</td>
                <td width="6%" className="text-center align-middle">换下部件序列号</td>
                <td width="6%" className="text-center align-middle">换上部件序列号</td>
                <td width="4%" className="text-center align-middle">部件安装良好，螺栓力矩已套固，防松标记已涂打</td>
                <td width="6%" className="text-center align-middle">作业者</td>
                <td width="6%" className="text-center align-middle">检修工长</td>
                <td width="4%" className="text-center align-middle">部件功能试验正常</td>
                <td width="6%" className="text-center align-middle">质检员</td>
                <td width="6%" className="text-center align-middle">值班干部</td>
              </tr>
              {this.state.detail.map(item =>
                <tr key={item.id}>
                  <td width="6%" className="text-center align-middle">
                    {item.name}
                    {!!!this.props.read &&
                      <span className="text-danger"><i className="fa fa-fw fa-trash" data-id={item.id} onClick={this.remove}></i></span>
                    }
                  </td>
                  <td width="6%" className="text-center align-middle">{item.train}</td>
                  <td width="3%" className="text-center align-middle">{item.carriage}</td>
                  <td width="3%" className="text-center align-middle">{item.position}</td>
                  <td width="6%" className="text-center align-middle">{item.date}</td>
                  <td width="6%" className="text-center align-middle">{item.time}</td>
                  <td className="text-center align-middle">{item.reason}</td>
                  <td width="6%" className="text-center align-middle">{item.p_gywj}</td>
                  <td width="4%" className="text-center align-middle">{item.p_ljbs}</td>
                  <td width="6%" className="text-center align-middle">{item.component_sn_old}</td>
                  <td width="6%" className="text-center align-middle">{item.component_sn_new}</td>
                  <td width="4%" className="text-center align-middle">{item.p_bjaz}</td>
                  <td width="6%" className="text-center align-middle">{item.operator}</td>
                  <td width="6%" className="text-center align-middle">
                    {item.leader}
                    {this.props.p_bz &&
                      <select className="form-control" data-id={item.id} onChange={this.submitDetailPbz}>
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                      </select>
                    }
                  </td>
                  <td width="4%" className="text-center align-middle">
                    {item.p_bjgnsy}
                    {this.props.qc &&
                      <select className="form-control" data-id={item.id} onChange={this.submitDetailQc}>
                        <option value="">部件功能是否正常</option>
                        <option value="是">是</option>
                        <option value="否">否</option>
                      </select>
                    }
                  </td>
                  <td width="6%" className="text-center align-middle">{item.qc}</td>
                  <td width="6%" className="text-center align-middle">
                    {item.duty_officer}
                    {this.props.p_jsy &&
                      <select className="form-control" data-id={item.id} onChange={this.submitDetailPjsy}>
                        <option value="">监控结果</option>
                        <option value="确认">确认</option>
                      </select>
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
