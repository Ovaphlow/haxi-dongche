import React from 'react'

import { DateField, TextField, PowerStatusSelector, DeptSelector } from '../components/CommonComponent';
import { Save, Update } from './Ledger09Action'

class TableItem extends React.Component {
  render() {
    return (
      <tr>
        <td className="text-center">
          <span className="pull-left">
            <a href={`./#/ledger.09-update/${this.props.item.id}`}>
              <i className="fa fa-fw fa-edit"></i>
            </a>
          </span>
          {this.props.item.date}
        </td>
        <td>{this.props.item.dept}</td>
        <td>{this.props.item.content}</td>
        <td>{this.props.item.applicant}</td>
        <td>{this.props.item.time}</td>
        <td>{this.props.item.rail}</td>
        <td>{this.props.item.location}</td>
        <td>{this.props.item.operator}</td>
        <td>{this.props.item.observer}</td>
        <td>{this.props.item.status}</td>
      </tr>
    )
  }
}

export class Table extends React.Component {
  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>日期</td>
            <td>申请供/断电部门</td>
            <td>申请供/断电</td>
            <td>申请人</td>
            <td>申请时间</td>
            <td>股道</td>
            <td>列位</td>
            <td>操作员</td>
            <td>监护员</td>
            <td>接触网状态</td>
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

export class Form extends React.Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <DateField
                  value={(this.props.op === 'update' && this.props.item.date) || ''}
              />
            </div>

            <div className="col">
              <DeptSelector caption="申请供/断电部门" id="dept"
                  value={(this.props.op === 'update' && this.props.item.dept) || ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <PowerStatusSelector caption="申请供/断电" id="content"
                  value={(this.props.op === 'update' && this.props.item.content) || ''}
              />
            </div>

            <div className="col">
              <TextField caption="申请人" id="applicant"
                  value={(this.props.op === 'update' && this.props.item.applicant) || ''}
              />
            </div>

            <div className="col">
              <TextField caption="申请时间" id="time"
                  value={(this.props.op === 'update' && this.props.item.time) || ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="申请股段 - 股道" id="rail"
                  value={(this.props.op === 'update' && this.props.item.rial) || ''}
              />
            </div>

            <div className="col">
              <TextField caption="申请股段 - 列位" id="location"
                  value={(this.props.op === 'update' && this.props.item.location) || ''}
              />
            </div>

            <div className="col">
              <TextField caption="隔离开关操作 - 操作员" id="operator"
                  value={(this.props.op === 'update' && this.props.item.operator) || ''}
              />
            </div>

            <div className="col">
              <TextField caption="隔离开关操作 - 监护员" id="observer"
                  value={(this.props.op === 'update' && this.props.item.observer) || ''}
              />
            </div>
          </div>

          <TextField caption="接触网状态" id="status"
              value={(this.props.op === 'update' && this.props.item.status) || ''}
          />
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
    let body = {
      date: document.getElementById('date').value,
      dept: document.getElementById('dept').value,
      content: document.getElementById('content').value,
      applicant: document.getElementById('applicant').value,
      time: document.getElementById('time').value,
      rail: document.getElementById('rail').value,
      location: document.getElementById('location').value,
      operator: document.getElementById('operator').value,
      observer: document.getElementById('observer').value,
      status: document.getElementById('status').value
    }
    if (this.props.op === 'save') {
      Save(body)
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        window.location = './#/ledger.09'
      })
      .catch(err => window.console && console.error(err))
    } else if (this.props.op === 'update') {
      Update(this.props.item.id, body)
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        window.location = './#/ledger.09'
      })
      .catch(err => window.console && console.error(err))
    }
  }
}

export class Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href='./#/ledger.09' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href='./#/ledger.09-save' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>
    )
  }
}