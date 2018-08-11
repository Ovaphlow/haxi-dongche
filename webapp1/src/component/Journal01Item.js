import React from 'react'

export default class Journal01Item extends React.Component {
  constructor(props) {
    super(props)
    this.borrow = this.borrow.bind(this)
    this.dialog = this.dialog.bind(this)
  }

  borrow(event) {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth.auth_01) {
      this.setState({ message: `当前用户没有对应权限` })
      return false
    }
    axios({
      method: 'put',
      url: './api/journal01/' + event.target.getAttribute('data-id') + '/borrow',
      data: {
        borrow: auth.name,
        borrowId: auth.id
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      location.reload(true)
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}` })
    })
  }

  dialog() {
    document.getElementById('modal.return_by').value = this.props.item.applicant
    document.getElementById('modal.remark').value = this.props.item.remark
    document.getElementById('modal.id').setAttribute('data-id', this.props.item.id)
    $('#modal').modal()
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
          {this.props.borrow &&
            <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.borrow}>
              <i className="fa fa-fw fa-upload"></i> 发放
            </button>
          }
          {this.props.return &&
            <button type="button" className="btn btn-secondary btn-sm" data-id={this.props.item.id} onClick={this.dialog}>
              <i className="fa fa-fw fa-download"></i> 返还
            </button>
          }
        </div>
      </li>
    )
  }
}
