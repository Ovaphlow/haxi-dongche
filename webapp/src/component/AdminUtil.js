import React from 'react'

export class AdminTrainToolbar extends React.Component {
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

export class AdminUserToolbar extends React.Component {
  render() {
    return(
      <div className="btn-group pull-right" role="group">
        <a href="./#/admin.user-list" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href="./#/admin.user-save" className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增用户
        </a>
      </div>
    )
  }
}

export class AdminDeptToolbar extends React.Component {
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