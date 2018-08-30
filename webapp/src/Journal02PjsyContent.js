import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'
import { Message, BackButton, DeptListPbz } from './component/Common'
import { ApprovePjsySubmit } from './component/Journal02Util'

export default class Journal02PjsyContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', deptList: [], qcList: [] }
    this.change = this.change.bind(this)
  }

  componentDidMount() {
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
                    <BackButton />
                    <div className="btn-group pull-right">
                      <ApprovePjsySubmit /> 
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
