import React from 'React'

export default class Journal01Item extends React.Component {
  constructor(props) {
    super(props)

    this.state = { item: this.props.item }
  }

  render() {
    return (
      <li className="list-group-item">
        <h5 className="mb-1">
          数量：<span className="text-primary">{this.props.item.quantity}</span>
        </h5>
        <ul className="list-inline">
          <li className="list-inline-item">
            由 {this.props.item.dept}<span className="text-info"></span> 的
            <span className="text-primary"><i className="fa fa-user"></i> {this.props.item.applicant}</span>
            于 <span className="text-secondary">{this.props.item.date} {this.props.item.time}</span> 申请
          </li>
          <li className="list-inline-item">
            <span className="text-danger">{this.props.item.borrow}</span>
            于 <span className="text-secondary">{this.props.item.borrow_date} {this.props.item.bowrrow_time}</span> 发放
          </li>
          <li className="list-inline-item">
            <span className="text-success"></span>
            于 <span className="text-muted"></span> 归还，
            <span className="text-success"></span> 确认
          </li>
        </ul>
      </li>
    )
  }
}
