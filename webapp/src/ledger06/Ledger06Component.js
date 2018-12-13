import React from 'react'

export class Form extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col form-group">
              <label>日期</label>
              <input type="date" className="form-control" id="date" />
            </div>
          </div>
        </div>

        <div className="card-footer">
          <div className="btn-group pull-right">
            <button type="button" className="btn btn-primary" onClick={this.handler.bind(this)}>
              <i className="fa fa-fw fa-check-square-o"></i>
              确定
            </button>
          </div>
        </div>
      </div>
    )
  }

  handler() {
    console.info(1)
  }
}

export class Table extends React.Component {
  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>序号</td>
            <td>日期</td>
            <td>车间</td>
            <td>作业人</td>
            <td>作业地点</td>
            <td>作业项目</td>
            <td>作业开始时间</td>
            <td>作业结束时间</td>
            <td>现场监控人</td>
            <td>备注</td>
          </tr>
        </thead>

        <tbody>

        </tbody>
      </table>
    )
  }
}

export class Ledger06Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href='./#/ledger.06' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href='./#/ledger.06-save' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>
    )
  }
}