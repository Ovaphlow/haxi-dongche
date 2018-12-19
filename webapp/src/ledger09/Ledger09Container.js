import React from 'react'

import { Sidebar, PageTitle, PageTitle2 } from '../component/Common'
import { Form, Table } from './Ledger09Component'
import { List, Get } from '../ledger09/Ledger09Action';

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
          <PageTitle title="09.融冰除雪库、LU检测棚接触网供断电作业登记簿" />
          <PageTitle2 fa="fa-plus" title="新增" toolbar="Ledger09Toolbar" />

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
          <PageTitle title="09.融冰除雪库、LU检测棚接触网供断电作业登记簿" />
          <PageTitle2 fa="fa-plus" title="新增" toolbar="Ledger09Toolbar" />

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
          <PageTitle title="09.融冰除雪库、LU检测棚接触网供断电作业登记簿" />
          <PageTitle2 fa="fa-search" title="检索" toolbar="Ledger09Toolbar" />

          <Table list={this.state.list} />
        </div>
      </div>
    )
  }
}