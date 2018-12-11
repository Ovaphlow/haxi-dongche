import React from 'react'

class TableItem extends React.Component {
  render() {
    return (
      <tr className={this.props.item.review_by === '' ? 'table-danger' : ''}>
        <td>{this.props.item.id}</td>
        <td>{this.props.item.date}</td>
        <td>{this.props.item.p_bc}</td>
        <td>{this.props.item.p_lw_succession}</td>
        <td>{this.props.item.stuff_succession}</td>
        <td>{this.props.item.time_succession}</td>
        <td>{this.props.item.p_lw_shift}</td>
        <td>{this.props.item.stuff_shift}</td>
        <td>{this.props.item.time_shift}</td>
        <td>{this.props.item.remark}</td>
      </tr>
    )
  }
}

export class Table extends React.Component {
  render() {
    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <td>序号</td>
            <td>日期</td>
            <td>班次</td>
            <td>列位</td>
            <td>接班人员</td>
            <td>接班时间</td>
            <td>列位</td>
            <td>交班人员</td>
            <td>交班时间</td>
            <td>备注</td>
          </tr>
        </thead>

        <tbody>
          {
            this.props.list.length > 0 &&
            this.props.list.map(item => <TableItem key={item.id} item={item} />)
          }
        </tbody>
      </table>
    )
  }
}

export class Ledger05Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href='./#/ledger.05' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href='./#/ledger.05-save' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>
    )
  }
}