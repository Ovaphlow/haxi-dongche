import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Toolbar from './component/Journal02Toolbar'
import Journal02Item from './component/Journal02Item'

import './dashboard.css'

class Journal02Check extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list_p_jsy_bz: [], list_p_jsy_qc: [], list_p_jsy: [], list_p_zbsz: [], list_p_dd: [] }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem("auth"))

    axios({
      method: 'get',
      url: './api/journal02/jsy/bz/' + auth.dept + '?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list_p_jsy_bz: response.data.content })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })

    if (auth.dept === '质检') {
      axios({
        method: 'get',
        url: './api/journal02/jsy/qc/' + auth.name + '?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_jsy_qc: response.data.content })
      }).catch(err => {
        this.setState({ message: `服务器通信异常 ${err}`})
      })
    }

    if (auth.auth_p_jsy) {
      axios({
        method: 'get',
        url: './api/journal02/jsy/?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_jsy: response.data.content })
      }).catch(err => {
        this.setState({ message: `服务器通信异常 ${err}`})
      })
    }

    if (auth.auth_p_zbsz) {
      axios({
        method: 'get',
        url: './api/journal02/zbsz/?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list_p_zbsz: response.data.content })
      }).catch(err => {
        this.setState({ message: `服务器通信异常 ${err}`})
      })
    }

    if (auth.auth_p_dd) {
      axios({
        method: 'get',
        url: './api/journal02/dd/?timestamp=' + new Date().getTime(),
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
                <i className="fa fa-fw fa-check-square-o"></i> 动车所审核
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
                    {this.state.list_p_jsy.map(item =>
                      <Journal02Item key={item.id} item={item} p_jsy={true} />
                    )}

                    {this.state.list_p_jsy_bz.map(item =>
                      <Journal02Item key={item.id} item={item} p_jsy_bz={true} />
                    )}

                    {this.state.list_p_jsy_qc.map(item =>
                      <Journal02Item key={item.id} item={item} p_jsy_qc={true} />
                    )}

                    {this.state.list_p_zbsz.map(item =>
                      <Journal02Item key={item.id} item={item} p_zbsz={true} />
                    )}

                    {this.state.list_p_dd.map(item =>
                      <Journal02Item key={item.id} item={item} p_dd={true} />
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

ReactDOM.render(<Journal02Check />, document.getElementById('app'))
