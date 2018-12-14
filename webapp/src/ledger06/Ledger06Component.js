import React from 'react'
import { TextField } from '../components/CommonComponent';
import { Save, Update } from './Ledger06Action';

export class Form extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col form-group">
              <label>日期</label>
              <input type="date" className="form-control" id="date"
                  defaultValue={this.props.op === 'update' ? this.props.item.date : ''}
              />
            </div>

            <div className="col">
              <TextField caption="车间" id="workshop"
                  value={this.props.op === 'update' ? this.props.item.workshop : ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="作业人" id="operator"
                  value={this.props.op === 'update' ? this.props.item.operator : ''}
              />
            </div>

            <div className="col">
              <TextField caption="作业地点" id="place"
                  value={this.props.op === 'update' ? this.props.item.place : ''}
              />
            </div>

            <div className="col-6">
              <TextField caption="作业项目" id="content"
                  value={this.props.op === 'update' ? this.props.item.content : ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="作业开始时间" id="time_begin"
                  value={this.props.op === 'update' ? this.props.item.time_begin : ''}
              />
            </div>

            <div className="col">
              <TextField caption="作业结束时间" id="time_end"
                  value={this.props.op === 'update' ? this.props.item.time_end : ''}
              />
            </div>

            <div className="col">
              <TextField caption="现场监控人" id="observer"
                  value={this.props.op === 'update' ? this.props.item.observer : ''}
              />
            </div>
          </div>

          <TextField caption="备注" id="remark"
                  value={this.props.op === 'update' ? this.props.item.remark : ''}
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
      workshop: document.getElementById('workshop').value,
      operator: document.getElementById('operator').value,
      place: document.getElementById('place').value,
      content: document.getElementById('content').value,
      time_begin: document.getElementById('time_begin').value,
      time_end: document.getElementById('time_end').value,
      observer: document.getElementById('observer').value,
      remark: document.getElementById('remark').value
    }
    if (this.props.op === 'save') {
      Save(body)
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        window.location = './#/ledger.06'
      })
      .catch(err => window.console && console.error(err))
    } else if (this.props.op === 'update') {
      Update(this.props.item.id, body)
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        window.location = './#/ledger.06'
      })
      .catch(err => window.console && console.error(err))
    }
  }
}

class TableItem extends React.Component {
  render() {
    return (
      <tr>
        <td className="text-center">
          <a href={`./#/ledger.06-update/${this.props.item.id}`} className="pull-left">
            <i className="fa fa-fw fa-edit"></i>
          </a>
          {this.props.item.id}
        </td>
        <td>{this.props.item.date}</td>
        <td>{this.props.item.workshop}</td>
        <td>{this.props.item.operator}</td>
        <td>{this.props.item.place}</td>
        <td>{this.props.item.content}</td>
        <td>{this.props.item.time_begin}</td>
        <td>{this.props.item.time_end}</td>
        <td>{this.props.item.observer}</td>
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
          {
            this.props.list.length > 0 &&
            this.props.list.map(item => <TableItem key={item.id} item={item} />)
          }
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