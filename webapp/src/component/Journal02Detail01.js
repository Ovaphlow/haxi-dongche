import React from 'react'

export default class Journal02Detail01 extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', auth: {}, detail: [] }
    this.submitDetailPbz = this.submitDetailPbz.bind(this)
    this.submitDetailQc = this.submitDetailQc.bind(this)
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
          <h4>一般部件普查记录单</h4>
        </div>

        {this.state.message &&
          <div className="col-12">
            <div className="alert alert-danger">
              {this.state.message}
            </div>
          </div>
        }

        <div className="col-12">
          <ul className="list-group">
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
                <small>备注：{item.remark}</small>
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
          </ul>
        </div>
      </div>
    )
  }
}