import React from 'react'

export default class Journal02Detail02 extends React.Component {
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
          <h4>动车组加装改造（软件升级）记录单</h4>
        </div>

        {this.state.message &&
          <div className="col-12">
            {this.state.message}
          </div>
        }
        <div className="col-12">
          <ul id="list" className="list-group">
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
          </ul>
        </div>
      </div>
    )
  }
}