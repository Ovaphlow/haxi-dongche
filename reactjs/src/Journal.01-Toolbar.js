import React from 'react'

export default class Journal01Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href="./journal.01.html" className="btn btn-light btn-sm">
          <i className="fa fa-search"></i> 检索数据
        </a>
        <a href="./journal.01-save.html" className="btn btn-light btn-sm">
          <i className="fa fa-plus"></i> 新增申请
        </a>
        <a href="./journal.01-borrow.html" className="btn btn-light btn-sm">
          <i className="fa fa-upload"></i> 发放
        </a>
        <a href="./journal.01-return.html" className="btn btn-light btn-sm">
          <i className="fa fa-download"></i> 返还
        </a>
      </div>
    )
  }
}