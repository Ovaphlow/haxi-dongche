import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/SidebarB'
import Toolbar from './component/Journal02Toolbar'
import Journal02Master from './component/Journal02Master'
import Journal02Detail01 from './component/Journal02Detail01'
import Journal02Detail02 from './component/Journal02Detail02'
import Journal02Detail03 from './component/Journal02Detail03'
import Journal02Detail04 from './component/Journal02Detail04'

import './dashboard.css'

class Journal02Detail extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', master: {}, detail01: 0, detail02: 0, detail03: 0, detail04: 0 }
    this.back = this.back.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/qty',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail01: response.data.content.qty })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/qty',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail02: response.data.content.qty })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/03/qty',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail03: response.data.content.qty })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })

    axios({
      method: 'get',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/qty',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ detail04: response.data.content.qty })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}`})
    })
  }

  back() {
    window.history.go(-1)
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container-fluid">
          <div className="row">
            <Sidebar />

            <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  02.一体化作业申请单
                </h3>
              </div>

              <div className="lead">
                <Toolbar className="pull-right" />
                <i className="fa fa-list fa-fw"></i> 详细信息
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

              <Journal02Master read={true} check={true} verify={true} />

              <div className="row"><hr /></div>

              {this.state.detail01 > 0 &&
                <Journal02Detail01 read={true} />
              }

              <div className="row"><hr /></div>

              {this.state.detail02 > 0 &&
                <Journal02Detail02 read={true} />
              }

              <div className="row"><hr /></div>

              {this.state.detail03 > 0 &&
                <Journal02Detail03 read={true} />
              }

              <div className="row"><hr /></div>

              {this.state.detail04 > 0 &&
                <Journal02Detail04 read={true} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Journal02Detail />, document.getElementById('app'))
