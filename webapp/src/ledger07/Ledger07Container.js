import React from 'react'

import { Sidebar, PageTitle, PageTitle2 } from '../component/Common'
import { Form, Table } from './Ledger07Component'
import { List } from '../ledger07/Ledger07Action';

export class Update extends React.Component {
  render() {
    return (
      <div></div>
    )
  }
}

export class Save extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="07.动车组防冻排水及回复作业记录表" />
          <PageTitle2 fa="fa-plus" title="新增" toolbar="Ledger07Toolbar" />

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
    List().then(response => {
      console.info(response)
      this.setState({ list: response.content })
    })
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="07.动车组防冻排水及回复作业记录表" />
          <PageTitle2 fa="fa-search" title="检索数据" toolbar="Ledger07Toolbar" />

          <Table list={this.state.list} />
        </div>
      </div>
    )
  }
}