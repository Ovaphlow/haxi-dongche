import React from 'react'

import { Sidebar, PageTitle, PageTitle2 } from '../component/Common'

export class Ledger03Save extends React.Component {
  render() {
    return (
      <div>Save</div>
    )
  }
}

export class Ledger03Home extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="03." />
          <PageTitle2 fa="fa-search" title="检索数据" toolbar="Ledger03Toolbar" />

          <div>
          </div>
        </div>
      </div>
    )
  }
}