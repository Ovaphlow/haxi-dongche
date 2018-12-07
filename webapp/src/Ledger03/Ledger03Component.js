import React from 'react'

export class Ledger03Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href='./#/ledger.03' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href='./#/ledger.03-save' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
        <a href='./#/ledger.03-stats' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-pie-chart"></i>
          数据统计
        </a>
      </div>
    )
  }
}