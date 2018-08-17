import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Toolbar from './component/Journal02Toolbar'
import Journal02Item from './component/Journal02Item'

import './dashboard.css'

class Journal02Verify extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list_leader: [], list_p_bz: [], list_qc: [], list_p_jsy: [], list_p_dd: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      location.href = './login.html'
      return false
    }

    axios({
      method: 'get',
      url: './api/journal02/verify/leader/' + auth.id + '?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list_leader: response.data.content })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })

    axios({
      method: 'get',
      url: './api/journal02/verify/leader/bz/' + auth.dept + '?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list_p_bz: response.data.content })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })

    if (auth.dept === '质检') {
      axios({
        method: 'get',
        url: './api/journal02/verify/leader/qc/' + auth.name + '?timestamp=' + new Date().getTime(),
        responseTupe: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_qc: response.data.content })
      }).catch(err => {
        this.setState({ message: `服务器通信异常 ${err}`})
      })
    }

    if (auth.auth_p_jsy) {
      axios({
        method: 'get',
        url: './api/journal02/verify/p_jsy?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_jsy: response.data.content })
      }).catch(err => this.setState({ message: `服务器通信异常 ${err}` }))
    }

    if (auth.auth_p_dd) {
      axios({
        method: 'get',
        url: './api/journal02/verify/' + '?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_dd: response.data.content })
      }).catch(err => {
        this.setState({ message: `服务器通信异常 ${err}`})
      })
    }
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container-fluid">
          <div className="row">
            <Sidebar category='单据' />

            <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  02.一体化作业申请单
                </h3>
              </div>

              <div className="lead">
                <Toolbar className="pull-right" />
                <i className="fa fa-archive fa-fw"></i> 作业完成销记
                <br />
                <br />
              </div>

              {this.state.message &&
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-danger">
                      {this.state.message}
                    </div>
                  </div>
                </div>
              }

              <div className="row">
                <div className="col-12">
                  <ul className="list-group">
                    {this.state.list_leader.map(item =>
                      <Journal02Item key={item.id} verify_leader={true} item={item} />
                    )}
                    {this.state.list_p_bz.map(item =>
                      <Journal02Item key={item.id} verify_p_bz={true} item={item} />
                    )}
                    {this.state.list_qc.map(item =>
                      <Journal02Item key={item.id} verify_qc={true} item={item} />
                    )}
                    {this.state.list_p_jsy.map(item =>
                      <Journal02Item key={item.id} verify_p_jsy={true} item={item} />
                    )}
                    {this.state.list_p_dd.map(item =>
                      <Journal02Item key={item.id} verify_p_dd={true} item={item} />
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Journal02Verify />, document.getElementById('app'))
