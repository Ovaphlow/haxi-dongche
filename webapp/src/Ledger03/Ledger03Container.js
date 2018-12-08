import React from 'react'

import { Sidebar, PageTitle, PageTitle2 } from '../component/Common'

export class Ledger03Stats extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="03." />
          <PageTitle2 fa="fa-pie-chart" title="统计图表" toolbar="Ledger03Toolbar" />

          <div>
            Stats
          </div>
        </div>
      </div>
    )
  }
}

export class Ledger03Review extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="03." />
          <PageTitle2 fa="fa-check" title="新增" toolbar="Ledger03Toolbar" />

          <div>
            Review
          </div>
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
          <PageTitle title="03." />
          <PageTitle2 fa="fa-plus" title="新增" toolbar="Ledger03Toolbar" />

          <div>
            Save
          </div>
        </div>
      </div>
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