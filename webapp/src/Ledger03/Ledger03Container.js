import React from 'react'

import { Sidebar, PageTitle, PageTitle2 } from '../component/Common'
import { Table } from './Ledger03Component'
import { List, Save, ListReview, Get, ReviewHandler } from './Ledger03Action'
import { DeptSelector, TrainSelector } from '../components/CommonComponent';

export class Ledger03Stats extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="03.检修车间运用钥匙管理记录簿" />
          <PageTitle2 fa="fa-pie-chart" title="统计图表" toolbar="Ledger03Toolbar" />

          <div>
            Stats
          </div>
        </div>
      </div>
    )
  }
}

export class Ledger03ReviewItem extends React.Component {
  constructor() {
    super()
    this.state = { item: {} }
  }

  componentDidMount() {
    Get(sessionStorage.getItem('ledger03.item'))
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
          <PageTitle title="03.检修车间运用钥匙管理记录簿" />
          <PageTitle2 fa="fa-download" title="归还" toolbar="Ledger03Toolbar" />

          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>归还人</label>
                <input type="text" className="form-control" id="review"
                    defaultValue={this.state.item.applicant}
                />
              </div>

              <div className="form-group">
                <label>签收人</label>
                <input type="text" className="form-control" id="review_by" />
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
    ReviewHandler(sessionStorage.getItem('ledger03.item'), {
      review: document.getElementById('review').value,
      review_by: document.getElementById('review_by').value,
      remark: document.getElementById('remark').value
    })
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      window.location = './#/ledger.03-review'
    })
    .catch(err => window.console && console.error(err))
  }
}

export class Ledger03Review extends React.Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  componentDidMount() {
    ListReview()
    .then(response => this.setState({ list: response.content }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="03.检修车间运用钥匙管理记录簿" />
          <PageTitle2 fa="fa-download" title="归还" toolbar="Ledger03Toolbar" />

          {
            this.state.list.length > 0 &&
            <Table list={this.state.list}/>
          }
        </div>
      </div>
    )
  }
}

export class Ledger03Save extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="03.检修车间运用钥匙管理记录簿" />
          <PageTitle2 fa="fa-plus" title="新增" toolbar="Ledger03Toolbar" />

          <div className="row">
            <div className="col">
              <TrainSelector caption="车组号" />
            </div>

            <div className="col">
              <DeptSelector caption="借领单位/部门" />
            </div>

            <div className="col">
              <div className="form-group">
                <label>借领人</label>
                <input type="text" className="form-control" id="applicant" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>主控钥匙数量</label>
                <input type="number" defaultValue="0" className="form-control" id="count_p_zk" />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>摆门钥匙数量</label>
                <input type="number" defaultValue="0" className="form-control" id="count_p_bm" />
              </div>
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
    )
  }

  handler() {
    let body = {
      train: document.getElementById('component.train-selector').value,
      dept: document.getElementById('component.dept-selector').value,
      applicant: document.getElementById('applicant').value,
      count_p_zk: document.getElementById('count_p_zk').value,
      count_p_bm: document.getElementById('count_p_bm').value,
      remark: document.getElementById('remark').value
    }
    Save(body)
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      window.location = './#/ledger.03'
    })
    .catch(err => window.console && console.error(err))
  }
}

export class Ledger03Home extends React.Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  componentDidMount() {
    List()
    .then(response => {
      this.setState({ list: response.content })
    })
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="03.检修车间运用钥匙管理记录簿" />
          <PageTitle2 fa="fa-search" title="检索数据" toolbar="Ledger03Toolbar" />

          <Table list={this.state.list} no_op={true} />
        </div>
      </div>
    )
  }
}