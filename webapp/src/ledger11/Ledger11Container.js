import React from 'react'

import { Sidebar, PageTitle, PageTitle2 } from '../component/Common'
import { Table, Form } from './Ledger11Component'
import { List, Get, ListReview } from './Ledger11Action'

export class Review extends React.Component {
  constructor() {
    super()
    this.state = { list: [], auth: {} }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth || !!!auth.auth_p_zbsz) {
      window.alert('当前用户没有对应的操作权限')
      window.location = './#/ledger.11'
      return
    } else {
      ListReview().then(response => this.setState({ list: response.content }))
      this.setState({ auth: auth })
    }
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="11.倒换配件产生故障记录簿（试行）" />
          <PageTitle2 fa="fa-edit" title="带班所长签字" toolbar="Ledger11Toolbar" />

          {
            this.state.auth.id > 0 &&
            <Table list={this.state.list} op_review={true} auth={this.state.auth} />
          }
        </div>
      </div>
    )
  }
}

export class Update extends React.Component {
  constructor() {
    super()
    this.state = { item: {} }
  }

  componentDidMount() {
    Get(this.props.match.params.id).then(response => this.setState({ item: response.content }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="11.倒换配件产生故障记录簿（试行）" />
          <PageTitle2 fa="fa-edit" title="编辑" toolbar="Ledger11Toolbar" />

          {
            this.state.item.id > 0 &&
            <Form op="update" item={this.state.item} />
          }
        </div>
      </div>
    )
  }
}

export class Save extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="11.倒换配件产生故障记录簿（试行）" />
          <PageTitle2 fa="fa-plus" title="新增" toolbar="Ledger11Toolbar" />

          <Form op="save" />
        </div>
      </div>
    )
  }
}

export class Home extends React.Component {
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
          <PageTitle title="11.倒换配件产生故障记录簿（试行）" />
          <PageTitle2 fa="fa-search" title="检索" toolbar="Ledger11Toolbar" />

          <Table list={this.state.list} />
        </div>
      </div>
    )
  }
}