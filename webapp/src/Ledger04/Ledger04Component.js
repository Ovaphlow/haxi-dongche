import React from 'react'

class TableItem extends React.Component {
  render() {
    return (
      <tr className={this.props.item.review_by === '' ? 'table-danger' : ''}>
        <td>{this.props.item.id}</td>
        <td>{this.props.item.applicant_datime_alt}</td>
        <td>{this.props.item.dept}</td>
        <td>{this.props.item.applicant}</td>
        <td>{this.props.item.train}</td>
        <td>{this.props.item.detail}</td>
        <td>{this.props.item.review_by === '' ? '' : this.props.item.review_datime_alt}</td>
        <td>{this.props.item.review}</td>
        <td>{this.props.item.review_by}</td>
        <td>{this.props.item.remark}</td>
        {
          !!!this.props.no_op &&
          <td>
            <button type="button" className="btn btn-outline-primary" data-id={this.props.item.id} onClick={this.handler.bind(this)}>
              <i className="fa fa-fw fa-download"></i>
              归还
            </button>
          </td>
        }
      </tr>
    )
  }

  handler(event) {
    sessionStorage.setItem('ledger04.item', event.target.getAttribute('data-id'))
    window.location = './#/ledger.04-review.item'
  }
}

export class Table extends React.Component {
  render() {
    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <td>序号</td>
            <td>借领时间</td>
            <td>借领单位/部门</td>
            <td>借领人</td>
            <td>车组号</td>
            <td>钥匙类型及数量</td>
            <td>归还时间</td>
            <td>归还人</td>
            <td>签收人</td>
            <td>备注</td>
            {
              !!!this.props.no_op &&
              <td>操作</td>
            }
          </tr>
        </thead>

        <tbody>
          {
            this.props.list.length > 0 &&
            this.props.list.map(item => <TableItem key={item.id} item={item} no_op={this.props.no_op} />)
          }
        </tbody>
      </table>
    )
  }
}

export class Ledger04Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href='./#/ledger.04' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href='./#/ledger.04-save' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
        <a href='./#/ledger.04-review' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-download"></i>
          归还
        </a>
      </div>
    )
  }
}