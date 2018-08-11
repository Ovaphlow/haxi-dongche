import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'

import './dashboard.css'

class AdminTrainList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', trainList: [] }
    this.detail = this.detail.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/common/train',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ trainList: response.data.content })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}` })
    })
  }

  detail(event) {
    sessionStorage.setItem('admin', event.target.getAttribute('data-id'))
    location.href = './admin.train.html'
  }

  render() {
    return (
      <div>
        <Navbar/>

        <div className="container-fluid">
          <div className="row">
            <Sidebar />

            <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="col-12">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h3>
                    <i className="fa fa-fw fa-cogs"></i> 车组
                  </h3>

                  <div className="btn-group pull-right">
                    <a href="./admin.train-list.html" className="btn btn-outline-secondary btn-sm">
                      <i className="fa fa-fw fa-search"></i> 检索数据
                    </a>

                    <a href="./admin.train.html" className="btn btn-outline-secondary btn-sm">
                      <i className="fa fa-fw fa-plus"></i> 添加车组
                    </a>
                  </div>
                </div>
              </div>

              {this.state.message &&
                <div className="col-12">
                  <div className="alert alert-danger">
                    {this.state.message}
                  </div>
                </div>
              }

              <div className="row">
                <div className="col-12">
                  <div className="list-group">
                    {this.state.trainList.map(item =>
                      <a data-id={item.uuid} className="list-group-item list-group-item-action" key={item.id} onClick={this.detail}>
                        {item.name} <span className="text-secondary text-right">{item.model}</span>
                      </a>
                    )}
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

ReactDOM.render(<AdminTrainList/>, document.getElementById('app'))
