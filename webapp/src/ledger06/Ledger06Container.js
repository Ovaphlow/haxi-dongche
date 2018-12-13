import React from 'react'

import { Sidebar, PageTitle, PageTitle2 } from '../component/Common'
import { Table, Form } from './Ledger06Component'

export class Ledger06Update extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="06.检修车间电、气焊作业记录簿" />
          <PageTitle2 fa="fa-edit" title="编辑" toolbar="Ledger06Toolbar" />

        </div>
      </div>
    )
  }
}

export class Ledger06Save extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="06.检修车间电、气焊作业记录簿" />
          <PageTitle2 fa="fa-plus" title="新增" toolbar="Ledger06Toolbar" />

          <Form />
        </div>
      </div>
    )
  }
}

export class Ledger06Home extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="06.检修车间电、气焊作业记录簿" />
          <PageTitle2 fa="fa-search" title="检索数据" toolbar="Ledger06Toolbar" />

          <Table />
        </div>
      </div>
    )
  }
}