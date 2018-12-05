import React from 'react'
import { ReturnItem } from '../actions/Ledger01Action';

export class Ledger01ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.submitReturn = this.submitReturn.bind(this)
  }

  submitReturn(event) {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth.auth_01) {
      this.setState({ message: `当前用户没有对应权限` })
      return false
    }
    let body = {
      id: event.target.getAttribute('data-id'),
      return_by: auth.name,
      return_by_id: auth.id
    }
    ReturnItem(body)
    .then(response => {
      if (response.message) {
        window.alert(response.message)
        return
      }
      window.location.reload(true)
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <li className="list-group-item" key={this.props.item.id}>
        <h5 className="mb-1">
          数量：<span className="text-primary">{this.props.item.quantity}</span>
        </h5>
        <ul className="list-inline">
          <li className="list-inline-item">
            由 <span className="text-info">{this.props.item.dept}</span> 的
            <span className="text-primary"><i className="fa fa-fw fa-user"></i>{this.props.item.applicant}</span>
            于 <span className="text-secondary">{this.props.item.date} {this.props.item.time}</span> 申请
          </li>
          {this.props.item.borrow &&
            <li className="list-inline-item">
              <span className="text-danger">{this.props.item.borrow}</span>
              于 <span className="text-secondary">{this.props.item.borrow_date} {this.props.item.borrow_time}</span> 发放
            </li>
          }
          {this.props.item.return_by_id &&
            <li className="list-inline-item">
              <span className="text-warning">{this.props.item.return_name}</span>
              于 <span className="text-muted">{this.props.item.return_date} {this.props.item.return_time}</span> 归还，
              <span className="text-success">{this.props.item.return_by}</span> 确认
            </li>
          }
        </ul>

        <div className="btn-group pull-right" role="group">
          {this.props.return &&
            <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.submitReturn}>
              <i className="fa fa-fw fa-download"></i>
              返还
            </button>
          }
        </div>
      </li>
    )
  }
}

export class Ledger01Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href='./#/journal.01' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href='./#/journal.01-save' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增申请
        </a>
        <a href='./#/journal.01-return' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-download"></i> 返还
        </a>
        <a href='./#/journal.01-stats' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-pie-chart"></i> 数据统计
        </a>
      </div>
    )
  }
}
