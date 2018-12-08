import React from 'react'

import { Sidebar, PageTitle, PageTitle2 } from '../component/Common'

export class Ledger04Stats extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="04." />
          <PageTitle2 fa="fa-pie-chart" title="统计图表" toolbar="Ledger04Toolbar" />

          <div>
            Stats
          </div>
        </div>
      </div>
    )
  }
}

export class Ledger04Review extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="04." />
          <PageTitle2 fa="fa-check" title="新增" toolbar="Ledger04Toolbar" />

          <div>
            Review
          </div>
        </div>
      </div>
    )
  }
}

export class Ledger04Save extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="04." />
          <PageTitle2 fa="fa-plus" title="新增" toolbar="Ledger04Toolbar" />

          <div>
            Save
          </div>
        </div>
      </div>
    )
  }
}

export class Ledger04Home extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="04." />
          <PageTitle2 fa="fa-search" title="检索数据" toolbar="Ledger04Toolbar" />

          <div>
          </div>
        </div>
      </div>
    )
  }
}