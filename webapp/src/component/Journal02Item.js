import React from 'react'

// import { RejectSubmit } from './Journal02Util'
import { ProgressTag, DetailLink, ProgressButton } from './Journal02Util'

export default class Journal02Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = { auth: {} }
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    this.setState({ auth: auth })
  }

  update(event) {
    sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
    window.location.href = './#/journal.02-update'
  }

  render() {
    return (
      <li className="list-group-item">
        <p className="lead">
          【
          <strong>{this.props.item.content}</strong>
          】
          {this.props.item.content_detail}
          <ProgressTag item={this.props.item} />
        </p>

        <ul className="list-inline">
          <li className="list-inline-item">
            <span className="text-secondary">申请单位：</span>
            {this.props.item.dept}
          </li>
          <li className="list-inline-item">
            <span className="text-secondary">申请人：</span>
            {this.props.item.applicant} ({this.props.item.applicant_phone})
          </li>
          <li className="list-inline-item">
            <span className="text-secondary">作业负责人：</span>
            {this.props.item.leader} ({this.props.item.leader_phone})
          </li>
          <li className="list-inline-item">
            <span className="text-secondary">作业车组号：</span>
            {this.props.item.group_sn}
          </li>
          <li className="list-inline-item">
            <span className="text-secondary">申请作业时间：</span>
            {this.props.item.date_begin} {this.props.item.time_begin} 至 {this.props.item.date_end} {this.props.item.time_end}
          </li>
        </ul>

        <div className="row">
          <div className="col-12 mt-3">
            {this.props.item.leader_id === this.state.auth.id && (!!!this.props.item.sign_p_jsy || this.props.item.sign_p_jsy === '') &&
              <button type="button" className="btn btn-sm btn-outline-secondary" data-id={this.props.item.id} onClick={this.update}>
                <i className="fa fa-fw fa-edit"></i>
                修改
              </button>
            }
            {/* {this.props.operation === 'p_jsy' &&
              <RejectSubmit id={this.props.item.id} operation={this.props.operation} auth={this.state.auth} />
            }
            {this.props.operation === 'p_jsy_bz' &&
              <RejectSubmit id={this.props.item.id} operation={this.props.operation} auth={this.state.auth} />
            }
            {this.props.operation === 'p_jsy_qc' &&
              <RejectSubmit id={this.props.item.id} operation={this.props.operation} auth={this.state.auth} />
            }
            {this.props.operation === 'p_dd' &&
              <RejectSubmit id={this.props.item.id} operation={this.props.operation} auth={this.state.auth} />
            }
            {this.props.operation === 'p_zbsz' &&
              <RejectSubmit id={this.props.item.id} operation={this.props.operation} auth={this.state.auth} />
            } */}
            <div className="btn-group pull-right">
              <DetailLink id={this.props.item.id} />
              {!!!this.props.item.reject &&
                <ProgressButton auth={this.state.auth} item={this.props.item} />
              }
            </div>
          </div>
        </div>
      </li>
    )
  }
}
