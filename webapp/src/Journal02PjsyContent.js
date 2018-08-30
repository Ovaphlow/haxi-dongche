import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'
import { Message, BackButton, DeptListPbz } from './component/Common'

export default class Journal02PjsyContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { auth: {}, message: '', deptList: [], qcList: [] }
    this.change = this.change.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })
    document.getElementById('component.p_bz-list').setAttribute('disabled', true)
    document.getElementById('qc').setAttribute('disabled', true)
  }

  change() {
    if (document.getElementById('p_jsy_content').value === '无要求') {
      document.getElementById('component.p_bz-list').setAttribute('disabled', true)
      document.getElementById('component.p_bz-list').value = ''
      document.getElementById('qc').setAttribute('disabled', true)
      document.getElementById('qc').value = ''
    } else if (document.getElementById('p_jsy_content').value === '班组跟踪、质检确认') {
      document.getElementById('component.p_bz-list').removeAttribute('disabled')
      document.getElementById('qc').removeAttribute('disabled')
    } else if (document.getElementById('p_jsy_content').value === '班组、质检跟踪') {
      document.getElementById('component.p_bz-list').removeAttribute('disabled')
      document.getElementById('qc').removeAttribute('disabled')
    }
  }

  submit() {
    this.setState({ message: '' })

    if (!!!document.getElementById('p_jsy_content').value) {
      this.setState({ message: '请选择工作形式' })
      return false
    }
    if (!!!document.getElementById('component.p_bz-list').value &&
        document.getElementById('p_jsy_content').value !== '无要求' &&
        document.getElementById('p_jsy_content').value !== '') {
      this.setState({ message: '请选择班组' })
      return false
    }
    if (!!!document.getElementById('qc').value &&
        document.getElementById('p_jsy_content').value !== '无要求' &&
        document.getElementById('p_jsy_content').value !== '') {
      this.setState({ message: '请选择质检' })
      return false
    }
    if (!!!this.state.auth.sign) {
      alert('请先设置签名')
      return false
    }
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}/jsy`, {
      method: 'put',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        p_jsy_id: this.state.auth.id,
        p_jsy: this.state.auth.name,
        p_jsy_content: document.getElementById('p_jsy_content').value,
        p_jsy_bz: document.getElementById('component.p_bz-list').value,
        p_jsy_qc: document.getElementById('qc').value,
        sign: this.state.auth.sign
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        this.setState({ message: response.message })
        return false
      }
      window.location.href = './#/journal.02-check'
    })
    .catch(err => this.setState({ message: '服务器通信异常' }))
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
              <Message message={this.state.message} />
            </div>
          }

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body row">
                  <div className="form-group col-4">
                    <select className="form-control" id="p_jsy_content" onChange={this.change}>
                      <option value="">未选择</option>
                      <option value="无要求">无要求</option>
                      <option value="班组跟踪、质检确认">班组跟踪、质检确认</option>
                      <option value="班组、质检跟踪">班组、质检跟踪</option>
                    </select>
                  </div>
                  <div className="form-group col-4">
                    <DeptListPbz />
                  </div>
                  <div className="form-group col-4">
                    <select className="form-control" id="qc">
                      <option value="">选择质检</option>
                      <option value="质检">质检</option>
                    </select>
                  </div>
                  <div className="clearfix"></div>

                  <div className="col-12">
                    <div className="btn-group pull-right">
                      <BackButton />
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
