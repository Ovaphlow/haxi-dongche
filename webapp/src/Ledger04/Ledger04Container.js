import React from 'react'

import { Sidebar, PageTitle, PageTitle2 } from '../component/Common'
import { Table } from './Ledger04Component'
import { List, Save, ListReview, Get, Update } from './Ledger04Action';
import { DeptSelector, TrainSelector } from '../components/CommonComponent';

export class Ledger04ReviewItem extends React.Component {
  constructor() {
    super()
    this.state = { item: {} }
  }

  componentDidMount() {
    Get(sessionStorage.getItem('ledger04.item'))
    .then(response => {
      this.setState({ item: response.content })
      document.getElementById('remark').value = response.content.remark
    })
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="04.动车组钥匙管理记录簿" />
          <PageTitle2 fa="fa-download" title="归还" toolbar="Ledger04Toolbar" />

          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col form-group">
                  <label>归还人</label>
                  <input type="text" className="form-control" id="review"
                      defaultValue={this.state.item.applicant}
                  />
                </div>

                <div className="col form-group">
                  <label>接收人</label>
                  <input type="text" className="form-control" id="review_by" />
                </div>
              </div>

              <div className="form-group">
                <label>备注</label>
                <textarea rows="3" className="form-control" id="remark"></textarea>
              </div>

              <div className="form-group pull-right">
                <button type="button" className="btn btn-primary" onClick={this.handler.bind(this)}>
                  <i className="fa fa-fw fa-check-square-o"></i>
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handler() {
    let body = {
      review: document.getElementById('review').value,
      review_by: document.getElementById("review_by").value,
      remark: document.getElementById('remark').value
    }
    Update(sessionStorage.getItem('ledger04.item'), body)
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      window.location = './#/ledger.04-review'
    })
    .catch(err => window.console && console.error(err))
  }
}

export class Ledger04Review extends React.Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  componentDidMount() {
    ListReview().then(response => this.setState({ list: response.content }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="04.动车组钥匙管理记录簿" />
          <PageTitle2 fa="fa-download" title="归还" toolbar="Ledger04Toolbar" />

          <Table list={this.state.list} />
        </div>
      </div>
    )
  }
}

export class Ledger04Save extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="04.动车组钥匙管理记录簿" />
          <PageTitle2 fa="fa-plus" title="新增" toolbar="Ledger04Toolbar" />

          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <DeptSelector caption="借领单位/部门" />
                </div>

                <div className="col form-group">
                  <label>借领人</label>
                  <input type="text" className="form-control" id="applicant" />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <TrainSelector caption="车组号" />
                </div>

                <div className="col form-group">
                  <label>钥匙类型及数量</label>
                  <input type="text" className="form-control" id="detail" />
                </div>
              </div>

              <div className="form-group">
                <label>备注</label>
                <textarea rows="3" className="form-control" id="remark"></textarea>
              </div>

              <div className="form-group pull-right">
                <button type="button" className="btn btn-primary" onClick={this.handler.bind(this)}>
                  <i className="fa fa-fw fa-check-square-o"></i>
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handler() {
    let body = {
      dept: document.getElementById('component.dept-selector').value,
      applicant: document.getElementById('applicant').value,
      train: document.getElementById('component.train-selector').value,
      detail: document.getElementById('detail').value,
      remark: document.getElementById('remark').value
    }
    Save(body)
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      window.location = './#/ledger.04'
    })
    .catch(err => window.console && console.error(err))
  }
}

export class Ledger04Home extends React.Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  componentDidMount() {
    List().then(response => this.setState({ list: response.content }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="04.动车组钥匙管理记录簿" />
          <PageTitle2 fa="fa-search" title="检索数据" toolbar="Ledger04Toolbar" />

          <Table list={this.state.list} no_op={true} />
        </div>
      </div>
    )
  }
}