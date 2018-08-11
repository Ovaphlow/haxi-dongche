import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Toolbar from './component/Journal01Toolbar'
import Journal01Item from './component/Journal01Item'

import './dashboard.css'

class Journal01 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list: [] }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/journal01/?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ list: response.data.content })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}` })
    })
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="contrainer-fluid">
          <div className="row">
            <Sidebar category='账项' />

            <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  01.检修车间禁动牌管理台账
                </h3>
              </div>

              <div className="lead">
                <Toolbar className="pull-right" />
                <i className="fa fa-search fa-fw"></i> 检索数据
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
                    {this.state.list.map(item =>
                      <Journal01Item key={item.id} item={item} />
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

ReactDOM.render(<Journal01 />, document.getElementById('app'))
