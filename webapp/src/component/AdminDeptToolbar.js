import React from 'react'

export default class ToolbarAdminDept extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href="./#/admin.dept-list" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href="./#/admin.dept-save" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增部门
        </a>
      </div>
    )
  }
}