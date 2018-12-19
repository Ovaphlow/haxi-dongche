import React from 'react'

import { Sidebar, PageTitle, PageTitle2 } from '../component/Common'
import { Form } from './Ledger10Component'

export class Save extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="10.检修车间临时作业记录簿" />
          <PageTitle2 fa="fa-plus" title="新增" toolbar="Ledger10Toolbar" />

          <Form op="save" />
        </div>
      </div>
    )
  }
}

export class Home extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="10.检修车间临时作业记录簿" />
          <PageTitle2 fa="fa-search" title="检索" toolbar="Ledger10Toolbar" />

        </div>
      </div>
    )
  }
}