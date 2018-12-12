import React from 'react'

import { Sidebar, PageTitle, PageTitle2 } from '../component/Common'
import { Table, Form } from './Ledger05Component'
import { List, Get } from './Ledger05Action';

export class Ledger05Update extends React.Component {
  constructor() {
    super()
    this.state = { item: {} }
  }

  componentDidMount() {
    // console.info(this.props.match.params.id)
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="05.隔离开关每日交接记录单" />
          <PageTitle2 fa="fa-edit" title="编辑" toolbar="Ledger05Toolbar" />

          <Form op="update" id={this.props.match.params.id} />
        </div>
      </div>
    )
  }
}

export class Ledger05Save extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="05.隔离开关每日交接记录单" />
          <PageTitle2 fa="fa-plus" title="新增" toolbar="Ledger05Toolbar" />

          <Form op="save" />
        </div>
      </div>
    )
  }
}

export class Ledger05Home extends React.Component {
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
          <PageTitle title="05.隔离开关每日交接记录单" />
          <PageTitle2 fa="fa-search" title="检索数据" toolbar="Ledger05Toolbar" />

          <Table list={this.state.list} />
        </div>
      </div>
    )
  }
}