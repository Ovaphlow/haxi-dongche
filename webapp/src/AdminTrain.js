import axios from 'axios'
import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'

export default class AdminTrain extends React.Component {
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
    }).catch(err => this.setState({ message: `服务器通信异常` }))
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
      }).catch(err => this.setState({ message: `服务器通信异常` }))
      sessionStorage.removeItem('admin')
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
        window.location.href = './#/admin.train-list'
      }).catch(err => this.setState({ message: `服务器通信异常` }))
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
        window.location.href = './#/admin.train-list'
      }).catch(err => this.setState({ message: `服务器通信异常` }))
    }
  }

  render() {
    return (
      <div className="row">
        <Sidebar />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="系统管理" />
          <PageTitle2 fa="fa-train" title="车组" toolbar="AdminTrainToolbar" />

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
              <a href="./#/admin.train-list" className="btn btn-secondary">
                <i className="fa fa-fw fa-arrow-left"></i>
                返回
              </a>

              <button type="button" className="btn btn-primary" onClick={this.submit}>
                <i className="fa fa-fw fa-check-square-o"></i>
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
