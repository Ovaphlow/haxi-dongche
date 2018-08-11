import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'

import './dashboard.css'

class AdminTrain extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', tag: '', modelList: [] }
    this.submit = this.submit.bind(this)
  }

  componentWillMount() {
    axios({
      method: 'get',
      url: './api/common/model',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ modelList: response.data.content })
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}` })
    })
  }

  componentDidMount() {
    let uuid = sessionStorage.getItem('admin')
    if (uuid) {
      this.setState({ tag: 'put' })

      axios({
        method: 'get',
        url: './api/common/train/' + uuid,
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        if (response.data.content.length === 1) {
          document.getElementById('name').value = response.data.content[0].name
          document.getElementById('model').value = response.data.content[0].model
        } else {
          this.setState({ message: response.data.message || '数据异常。' })
        }
      }).catch(err => this.setState({ message: `服务器通信异常 ${err}` }))
    } else this.setState({ tag: 'post' })
  }

  submit() {
    this.setState({ message: '' })

    let uuid = sessionStorage.getItem('admin')

    if (!!!document.getElementById('name').value || !!!document.getElementById('model').value) {
      this.setState({ message: '请完整填写车组信息。' })
      return false
    }

    if (this.state.tag === 'post') {
      axios({
        method: 'post',
        url: './api/common/train',
        data: {
          name: document.getElementById('name').value,
          model: document.getElementById('model').value
        },
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        location.href = './mgr.model-list.html'
      }).catch(err => this.setState({ message: `服务器通信异常 ${err}` }))
    } else if (this.state.tag === 'put') {
      axios({
        method: 'put',
        url: './api/common/train/' + uuid,
        data: {
          name: document.getElementById('name').value,
          model: document.getElementById('model').value
        },
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        location.href = './admin.train-list.html'
      }).catch(err => this.setState({ message: `服务器通信异常 ${err}` }))
    }
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
                      <i className="fa fa-fw fa-plus"></i> 添加车型
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

              <div className="col-12">
                <div className="form-group">
                  <label>车组</label>
                  <input type="text" className="form-control" id="name"/>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label>车型</label>
                  <select className="form-control" id="model">
                    {this.state.modelList.map(item =>
                      <option value={item.value} key={item.id}>{item.value}</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="col-12">
                <div className="btn-group pull-right">
                  <a href="./admin.train-list.html" className="btn btn-secondary">
                    <i className="fa fa-fw fa-arrow-left"></i> 返回
                  </a>

                  <button type="button" className="btn btn-primary" onClick={this.submit}>
                    <i className="fa fa-fw fa-check-square-o"></i> 确定
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<AdminTrain/>, document.getElementById('app'))
