import React from 'react'

export default class Journal02Detail02 extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', detail: [] }
    this.submitDetailPbz = this.submitDetailPbz.bind(this)
    this.submitDetailQc = this.submitDetailQc.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail: response.data.content })
    }).catch(err => {
      this.setState({ message: '服务器通信异常' })
    })
  }

  submitDetailPbz(event) {
    this.setState({ message: '' })

    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/' + event.target.getAttribute('data-id') + '/p_bz',
      data: {
        leader: event.target.value === '' ? '' : this.props.auth.name
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
        qc: this.props.auth.name
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

  remove(event) {
    if (!!!confirm('确认删除选定的记录？')) return false
    axios({
      method: 'delete',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/' + event.target.getAttribute('data-id'),
      responseType: 'json'
    }).then(function (response) {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      location.reload(true)
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
                  <td width="6%" className="text-center align-middle">{item.duty_officer}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* <ul className="list-group">
            {this.props.detail.map(item =>
              <li className="list-group-item">
                <h5>
                  <span className="text-secondary">部件名称：</span>{item.name}
                  <span className="pull-right">
                    <span className="text-secondary">车组：</span>
                    {item.train}
                  </span>
                </h5>

                <ul className="list-inline">
                  <li className="list-inline-item">
                    <span className="text-secondary">车号：</span>
                    <span className="text-primary">{item.carriage}</span>
                  </li>
                  <li className="list-inline-item">
                    <span className="text-secondary">位置：</span>
                    <span className="text-info">{item.position}</span>
                  </li>
                  <li className="list-inline-item">
                    <span className="text-secondary">日期：</span>
                    <span className="text-secondary">{item.date}</span>
                  </li>
                  <li className="list-inline-item">
                    <span className="text-secondary">时间：</span>
                    <span className="text-secondary">{item.time}</span>
                  </li>
                </ul>

                <ul className="list-inline">
                  <li className="list-inline-item">
                    <span className="text-secondary">更换原因：</span>
                    <span className="text-danger">{item.reason}</span>
                  </li>
                </ul>

                <ul className="list-inline">
                  <li className="list-inline-item">
                    <span className="text-secondary">作业人员已阅读工艺文件并掌握各步骤：</span>
                    <strong>{item.p_gywj ? '是' : '否'}</strong>
                  </li>
                  <li className="list-inline-item">
                    <span className="text-secondary">力矩扳手已校验：</span>
                    <strong>{item.p_ljbs ? '是' : '否'}</strong>
                  </li>
                  <li className="list-inline-item">
                    <span className="text-secondary">换下部件序列号：</span>
                    <span className="text-info">{item.component_sn_old}</span>
                  </li>
                  <li className="list-inline-item">
                    <span className="text-secondary">换上部件序列号：</span>
                    <span className="text-info">{item.component_sn_new}</span>
                  </li>
                  <li className="list-inline-item">
                    <span className="text-secondary">部件安装良好，螺栓力矩已紧固，防松标记已涂打：</span>
                    <strong>{item.p_bjaz ? '是' : '否'}</strong>
                  </li>
                  <li className="list-inline-item">
                    <span className="text-secondary">作业者：</span>
                    <u>{item.operator}</u>
                  </li>
                  <li className="list-inline-item">
                    <span className="text-secondary">检修工长：</span>
                    <u>{item.leader}</u>
                  </li>
                </ul>

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
                      <option value="">部件功能试验正常：</option>
                      <option value="是">是</option>
                      <option value="否">否</option>
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
