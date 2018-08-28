import React from 'react'

export default class Journal02Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href="./#/journal.02" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href="./#/journal.02-save" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增申请
        </a>
        <a href="./#/journal.02-check" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-check-square-o"></i>
          动车所审核
        </a>
        <a href="./#/journal.02-verify" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-archive"></i>
          作业完成销记
        </a>
        <a href="./#/journal.02-stats" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-pie-chart"></i>
          数据统计
        </a>
        <a href="./#/journal.02-reject.list" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-reply"></i>
          已驳回申请
        </a>
      </div>
    )
  }
}
