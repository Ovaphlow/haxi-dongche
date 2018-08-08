import React from 'react'

export default class Journal02Toolbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href="./journal.02.html" className="btn btn-light btn-sm">
          <i className="fa fa-search"></i> 检索数据
        </a>
        <a href="./journal.02-save.html" className="btn btn-light btn-sm">
          <i className="fa fa-plus"></i>
          新增申请
        </a>
        <a href="./journal.02-check.html" className="btn btn-light btn-sm">
          <i className="fa fa-check-square-o"></i>
          动车所审核
        </a>
        <a href="./journal.02-verify.html" className="btn btn-light btn-sm">
          <i className="fa fa-archive"></i>
          作业完成销记
        </a>
        <a href="./journal.02-stats.html" className="btn btn-light btn-sm">
          <i className="fa fa-pie-chart"></i>
          数据统计
        </a>
      </div>
    )
  }
}