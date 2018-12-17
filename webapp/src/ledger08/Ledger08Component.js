import React from 'react'

import { DateField, TextField } from '../components/CommonComponent';
import { Save, Update } from './Ledger08Action'

export class Form extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">

          <div className="row">
            <div className="col">
              <DateField value={this.props.op === 'update' && this.props.item.date} />
            </div>

            <div className="col">
              <TextField caption="股道" id="rail"
                  value={(this.props.op === 'update' && this.props.item.rail) || ''}
              />
            </div>

            <div className="col">
              <TextField caption="列位" id="location"
                  value={(this.props.op === 'update' && this.props.item.location) || ''}
              />
            </div>

            <div className="col">
              <TextField caption="车次" id="route"
                  value={(this.props.op === 'update' && this.props.item.route) || ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="供电时间" id="time_begin"
                  value={(this.props.op === 'update' && this.props.item.time_begin) || ''}
              />
            </div>

            <div className="col">
              <TextField caption="操作人" id="operator"
                  value={(this.props.op === 'date' && this.props.item.operator) || ''}
              />
            </div>

            <div className="col">
              <TextField caption="安全调度员" id="dispatcher"
                  value={(this.props.op === 'update' && this.props.item.dispatcher) || ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="断电时间" id="time_end"
                  value={(this.props.op === 'update' && this.props.item.time_end) || ''}
              />
            </div>
            <div className="col">
              <TextField caption="操作人" id="operator_2"
                  value={(this.props.op === 'update' && this.props.item.operator_2) || ''}
              />
            </div>
            <div className="col">
              <TextField caption="安全调查员" id="dispatcher_2"
                  value={(this.props.op === 'update' && this.props.item.dispatcher_2) || ''}
              />
            </div>
          </div>

          <TextField caption="备注" id="remark"
              value={(this.props.op === 'update' && this.props.item.remark) || ''}
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
      rail: document.getElementById('rail').value,
      location: document.getElementById('location').value,
      route: document.getElementById('route').value,
      time_begin: document.getElementById('time_begin').value,
      operator: document.getElementById('operator').value,
      dispatcher: document.getElementById('dispatcher').value,
      time_end: document.getElementById('time_end').value,
      operator_2: document.getElementById('operator_2').value,
      dispatcher_2: document.getElementById('dispatcher_2').value,
      remark: document.getElementById('remark').value
    }
    if (this.props.op === 'save') {
      Save(body)
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        window.location = './#/ledger.08'
      })
      .catch(err => window.console && console.error(err))
    } else if (this.props.op === 'update') {
      Update(this.props.item.id, body)
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        window.location = './#/ledger.08'
      })
      .catch(err => window.console && console.error(err))
    }
  }
}

class TableItem extends  React.Component {
  render() {
    return (
      <tr>
        <td className="text-center">
          <a href={`./#/ledger.08-update/${this.props.item.id}`} className="pull-left">
            <i className="fa fa-fw fa-edit"></i>
          </a>
          {this.props.item.date}
        </td>
        <td>{this.props.item.rail}</td>
        <td>{this.props.item.location}</td>
        <td>{this.props.item.route}</td>
        <td>{this.props.item.time_begin}</td>
        <td>{this.props.item.operator}</td>
        <td>{this.props.item.dispatcher}</td>
        <td>{this.props.item.time_end}</td>
        <td>{this.props.item.operator_2}</td>
        <td>{this.props.item.dispatcher_2}</td>
        <td>{this.props.item.remark}</td>
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
            <td>股道</td>
            <td>列位</td>
            <td>车次</td>
            <td>供电时间</td>
            <td>操作人</td>
            <td>安全调度员</td>
            <td>断电时间</td>
            <td>操作人</td>
            <td>安全调度员</td>
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

export class Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href='./#/ledger.08' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href='./#/ledger.08-save' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>
    )
  }
}