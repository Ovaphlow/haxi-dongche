import React from 'react'

import { Sidebar, PageTitle, PageTitle2 } from '../component/Common'
import { Form, Table } from './Ledger08Component'
import { List, Get } from './Ledger08Action'

export class Update extends React.Component {
  constructor() {
    super()
    this.state = { item: {} }
  }

  componentDidMount() {
    Get(this.props.match.params.id).then(response => this.setState({ item: response.content[0] || {} }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="08.外接电源供断电记录簿" />
          <PageTitle2 fa="fa-edit" title="编辑" toolbar="Ledger08Toolbar" />

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
          <PageTitle title="08.外接电源供断电记录簿" />
          <PageTitle2 fa="fa-plus" title="新增" toolbar="Ledger08Toolbar" />

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
          <PageTitle title="08.外接电源供断电记录簿" />
          <PageTitle2 fa="fa-search" title="检索" toolbar="Ledger08Toolbar" />

          <Table list={this.state.list} />
        </div>
      </div>
    )
  }
}