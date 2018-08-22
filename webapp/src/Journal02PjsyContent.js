import axios from 'axios'
import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'

export default class Journal02PjsyContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', deptList: [] }
    this.change = this.change.bind(this)
    this.back = this.back.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/common/dept/',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ deptList: response.data.content })
    }).catch(err => this.setState({ message: `服务器通信异常` }))
  }

  change() {
    if (document.getElementById('p_jsy_content').value === '同意') {
      document.getElementById('p_jsy_bz').setAttribute('disabled', true)
      document.getElementById('p_jsy_qc').setAttribute('disabled', true)
      document.getElementById('p_jsy_bz').value = ''
      document.getElementById('p_jsy_qc').value = ''
    } else if (document.getElementById('p_jsy_content').value === '班组跟踪、质检确认') {
      document.getElementById('p_jsy_bz').removeAttribute('disabled')
      document.getElementById('p_jsy_qc').removeAttribute('disabled')
      document.getElementById('p_jsy_qc').value = '质检1'
    } else if (document.getElementById('p_jsy_content').value === '班组、质检跟踪') {
      document.getElementById('p_jsy_bz').removeAttribute('disabled')
      document.getElementById('p_jsy_qc').removeAttribute('disabled')
      document.getElementById('p_jsy_qc').value = '质检1'
    }
  }

  back() {
    window.history.go(-1)
  }

  submit() {
    axios({
      method: 'put',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/jsy/content',
      data: {
        p_jsy_content: document.getElementById('p_jsy_content').value,
        p_jsy_bz: document.getElementById('p_jsy_bz').value,
        p_jsy_qc: document.getElementById('p_jsy_qc').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      window.location.href = './#/journal.02-check'
    })
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-check-square-o" title="技术员审核" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body row">
                  <div className="form-group col-4">
                    <select className="form-control" id="p_jsy_content" onChange={this.change}>
                      <option value="同意">同意</option>
                      <option value="班组跟踪、质检确认">班组跟踪、质检确认</option>
                      <option value="班组、质检跟踪">班组、质检跟踪</option>
                    </select>
                  </div>
                  <div className="form-group col-4">
                    <select id="p_jsy_bz" className="form-control" disabled>
                      {this.state.deptList.map(item =>
                        <option value={item.name} key={item.id}>{item.name}</option>
                      )}
                    </select>
                  </div>
                  <div className="form-group col-4">
                    <input id="p_jsy_qc" className="form-control" disabled />
                  </div>
                  <div className="clearfix"></div>

                  <div className="col-12">
                    <div className="btn-group pull-right">
                      <button type="button" className="btn btn-secondary" onClick={this.back}>
                        <i className="fa fa-fw fa-arrow-left"></i> 后退
                      </button>
                      <button type="button" className="btn btn-primary" onClick={this.submit}>
                        <i className="fa fa-fw fa-check-square-o"></i> 确定
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
