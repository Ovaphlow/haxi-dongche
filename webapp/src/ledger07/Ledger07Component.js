import React from 'react'
import { DateField, TextField } from '../components/CommonComponent';
import { Save, Update } from './Ledger07Action';

class TableItem extends React.Component {
  render() {
    return (
      <tr>
        <td className="text-center">
          <span className="pull-left">
            <a href={`./#/ledger.07-update/${this.props.item.id}`}>
              <i className="fa fa-fw fa-edit"></i>
            </a>
          </span>
          {this.props.item.id}
        </td>
        <td>{this.props.item.date}</td>
        <td>{this.props.item.train}</td>
        <td>{this.props.item.rail}</td>
        <td>{this.props.item.operator}</td>
        <td>{this.props.item.leader}</td>
        <td>{this.props.item.qc}</td>
        <td>{this.props.item.date_2}</td>
        <td>{this.props.item.train_2}</td>
        <td>{this.props.item.rail_2}</td>
        <td>{this.props.item.operator_2}</td>
        <td>{this.props.item.leader_2}</td>
        <td>{this.props.item.qc_2}</td>
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
            <td>车组号</td>
            <td>股道</td>
            <td>作业者</td>
            <td>工长</td>
            <td>质检员</td>
            <td>日期</td>
            <td>车组号</td>
            <td>股道</td>
            <td>作业者</td>
            <td>工长</td>
            <td>质检员</td>
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
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h3 className="text-primary">
            排水作业
          </h3>

          <div className="row">
            <div className="col">
              <DateField caption="日期" id="date"
                  value={this.props.op === 'update' && this.props.item.date}
              />
            </div>

            <div className="col">
              <TextField caption="车组号" id="train"
                  value={this.props.op === 'update' && this.props.item.train}
              />
            </div>

            <div className="col">
              <TextField caption="股道" id="rail"
                  value={this.props.op === 'update' && this.props.item.rail}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="作业者" id="operator"
                  value={this.props.op === 'update' && this.props.item.operator}
              />
            </div>

            <div className="col">
              <TextField caption="工长" id="leader"
                  value={this.props.op === 'update' && this.props.item.leader}
              />
            </div>

            <div className="col">
              <TextField caption="质检员" id="qc"
                  value={this.props.op === 'update' && this.props.item.qc}
              />
            </div>
          </div>

          <h3 className="text-success">恢复作业</h3>

          <div className="row">
            <div className="col">
              <DateField caption="日期" id="date_2"
                  value={this.props.op === 'update' && this.props.item.date_2}
              />
            </div>

            <div className="col">
              <TextField caption="车组号" id="train_2"
                  value={this.props.op === 'update' && this.props.item.train_2}
              />
            </div>

            <div className="col">
              <TextField caption="股道" id="rail_2"
                  value={this.props.op === 'update' && this.props.item.rail_2}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="作业者" id="operator_2"
                  value={this.props.op === 'update' && this.props.item.operator_2}
              />
            </div>

            <div className="col">
              <TextField caption="工长" id="leader_2"
                  value={this.props.op === 'update' && this.props.item.leader_2}
              />
            </div>

            <div className="col">
              <TextField caption="质检员" id="qc_2"
                  value={this.props.op === 'update' && this.props.item.qc_2}
              />
            </div>
          </div>
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
      train: document.getElementById('train').value,
      rail: document.getElementById('rail').value,
      operator: document.getElementById('operator').value,
      leader: document.getElementById('leader').value,
      qc: document.getElementById('qc').value,
      date_2: document.getElementById('date_2').value,
      train_2: document.getElementById('train_2').value,
      rail_2: document.getElementById('rail_2').value,
      operator_2: document.getElementById('operator_2').value,
      leader_2: document.getElementById('leader_2').value,
      qc_2: document.getElementById('qc_2').value
    }
    if (this.props.op === 'save') {
      Save(body)
      .then(response => {
        console.info(response)
        if (response.message) {
          alert(response.message)
          return
        }
        window.location = './#/ledger.07'
      })
      .catch(err => window.console && console.error(err))
    } else if (this.props.op === 'update') {
      Update(this.props.item.id, body)
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        window.location = './#/ledger.07'
      })
      .catch(err => window.console && console.error(err))
    }
  }
}

export class Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href='./#/ledger.07' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href='./#/ledger.07-save' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>
    )
  }
}