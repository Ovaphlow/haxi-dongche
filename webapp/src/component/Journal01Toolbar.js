import React from 'react'
import { Link } from 'react-router-dom'

export default class Journal01Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <Link to={'./journal.01'} className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </Link>
        <Link to={'./journal.01-save'} className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增申请
        </Link>
        <Link to={'./journal.01-borrow'} className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-upload"></i> 发放
        </Link>
        <Link to={'./journal.01-return'} className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-download"></i> 返还
        </Link>
        <Link to={'./journal.01-stats'} className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-pie-chart"></i> 数据统计
        </Link>
      </div>
    )
  }
}
