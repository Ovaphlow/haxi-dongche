import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/SidebarA'
import Toolbar from './component/Journal02Toolbar'
import Journal02Master from './component/Journal02Master'

class Journal02Save extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', trainList: [], auth: {} }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      location.href = './login.html'
      return false
    }
    this.setState({ auth: auth })

    document.getElementById('dept').value = auth.dept
    document.getElementById('applicant').value = auth.name
    document.getElementById('applicantPhone').value = auth.phone
    document.getElementById('dateBegin').value = moment().format('YYYY-MM-DD')
    document.getElementById('timeBegin0').value = moment({ hours: parseInt(moment().format('HH')) + 1 }).format('HH')
    document.getElementById('timeBegin1').value = '00'
    document.getElementById('dateEnd').value = moment().format('YYYY-MM-DD')
    document.getElementById('timeEnd0').value = moment({ hours: parseInt(moment().format('HH')) + 2 }).format('HH')
    document.getElementById('timeEnd1').value = '00'
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container-fluid">
          <div className="row">
            <Sidebar />

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  02.一体化作业申请单
                </h3>
              </div>

              <div className="lead">
                <Toolbar className="pull-right" />
                <i className="fa fa-plus fa-fw"></i> 新增申请
                <br />
                <br />
              </div>

              {this.state.message &&
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-danger" role="alert" id="anchor-alert">
                      {this.state.message}
                    </div>
                  </div>
                </div>
              }

              <Journal02Master auth={this.state.auth} trainList={this.state.trainList} />
            </main>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Journal02Save />, document.getElementById('app'))
