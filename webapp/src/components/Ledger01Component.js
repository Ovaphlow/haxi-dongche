import React from 'react'

export class Ledger01ListItem extends React.Component {
  render() {
    return (
      <tr className={this.props.item.return_by === '' ? 'table-danger' : ''}>
        <td>{this.props.item.id}</td>
        <td>{this.props.item.date}</td>
        <td>{this.props.item.time}</td>
        <td>{this.props.item.quantity}</td>
        <td>{this.props.item.applicant}</td>
        <td>{this.props.item.dept}</td>
        <td>{this.props.item.borrow}</td>
        <td>{this.props.item.return_date === '0001-01-01' ? '' : this.props.item.return_date}</td>
        <td>{this.props.item.return_time === '00:00:00' ? '' : this.props.item.return_time}</td>
        <td>{this.props.item.return_quantity}</td>
        <td>{this.props.item.return_name}</td>
        <td>{this.props.item.return_by}</td>
        <td>{this.props.item.remark}</td>
        {
          this.props.op_return &&
          <td>
            <button className="btn btn-outline-primary" data-id={this.props.item.id} onClick={this.handlerReturn.bind(this)}>
              <i className="fa fa-fw fa-download"></i>
              返还
            </button>
          </td>
        }
      </tr>
    )
  }

  handlerReturn(event) {
    window.sessionStorage.setItem('ledger.01-item', event.target.getAttribute('data-id'))
    window.location = './#/journal.01-return.item'
    // ReturnItem(body)
    // .then(response => {
    //   if (response.message) {
    //     window.alert(response.message)
    //     return
    //   }
    //   window.location.reload(true)
    // })
    // .catch(err => window.console && console.error(err))
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
