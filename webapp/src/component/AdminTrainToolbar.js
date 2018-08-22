import React from 'react'

export default class ToolbarAdminDept extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href="./#/admin.train-list" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>

        <a href="./#/admin.train" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          添加车组
        </a>
      </div>
    )
  }
}