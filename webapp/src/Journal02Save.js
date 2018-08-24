import React from 'react'
import moment from 'moment'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'
import Journal02Master from './component/Journal02Master'

export default class Journal02Save extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', trainList: [], auth: {} }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    this.setState({ auth: auth })

    document.getElementById('dept').value = auth.dept
    document.getElementById('applicant').value = auth.name
    document.getElementById('applicantPhone').value = auth.phone
    document.getElementById('dateBegin').value = moment().format('YYYY-MM-DD')
    document.getElementById('timeBegin0').value = moment({ hours: parseInt(moment().format('HH'), 0) + 1 }).format('HH')
    document.getElementById('timeBegin1').value = '00'
    document.getElementById('dateEnd').value = moment().format('YYYY-MM-DD')
    document.getElementById('timeEnd0').value = moment({ hours: parseInt(moment().format('HH'), 0) + 2 }).format('HH')
    document.getElementById('timeEnd1').value = '00'
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-plus" title="新增申请" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger" role="alert" id="anchor-alert">
                {this.state.message}
              </div>
            </div>
          }

          <Journal02Master auth={this.state.auth} trainList={this.state.trainList} mode="save" />
        </div>
      </div>
    )
  }
}
