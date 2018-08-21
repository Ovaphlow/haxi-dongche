import React from 'react'

export default class AdminUserToolbar extends React.Component {
  render() {
    return(
      <div className="btn-group pull-right" role="group">
        <a href="./admin.user-list.html" className="btn btn-light btn-sm">
          <i className="fa fa-fw fa-search"></i> 检索数据
        </a>
        <a href="./admin.user-save.html" className="btn btn-light btn-sm">
          <i className="fa fa-fw fa-plus"></i> 新增用户
        </a>
      </div>
    )
  }
}