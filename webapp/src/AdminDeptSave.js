import axios from 'axios'
import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'
import { BackButton } from './component/Common'

export default class AdminDeptSave extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
    this.submit = this.submit.bind(this)
  }

  submit() {
    if (!!!document.getElementById('name').value) {
      this.setState({ message: '' })
      return false
    }
    axios({
      method: 'post',
      url: './api/common/dept/',
      data: { name: document.getElementById('name').value },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.response })
        return false
      }
      window.location.href = './#/admin.dept-list'
    })
  }

  render() {
    return (
      <div className="row">
        <Sidebar />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="系统管理" />
          <PageTitle2 fa="fa-plus" title="新增部门" toolbar="AdminDeptToolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="col-12">
            <div className="form-group">
              <label>部门名称</label>
              <input type="text" className="form-control" id="name" />
            </div>

            <BackButton />
            <div className="btn btn-group pull-right">
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
