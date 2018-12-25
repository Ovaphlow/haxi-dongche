import React from 'react'

import { TrainSelector, TextField, DateField, DeptSelector } from '../components/CommonComponent'
import { Save, Update } from './Ledger11Action'

class TableItem extends React.Component {
  render() {
    return (
      <tr>
        <td className="text-center">
          <span className="pull-left">
            <a href={`./#/ledger.11-update/${this.props.item.id}`}>
              <i className="fa fa-fw fa-edit"></i>
            </a>
          </span>
          {this.props.item.id}
        </td>
        <td>{this.props.item.train}</td>
        <td>{this.props.item.parts}</td>
        <td>{this.props.item.content}</td>
        <td>{this.props.item.date === '0000-00-00' ? '' : this.props.item.date}</td>
        <td>{this.props.item.dept}</td>
        <td>{this.props.item.operator}</td>
        <td>{this.props.item.p_dbsz}</td>
        <td>{this.props.item.date_2 === '0000-00-00' ? '' : this.props.item.date_2}</td>
        <td>{this.props.item.dept_2}</td>
        <td>{this.props.item.operator_2}</td>
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
            <td>故障车号</td>
            <td>故障配件</td>
            <td>故障由来</td>
            <td>倒件日期</td>
            <td>作业班组</td>
            <td>作业者</td>
            <td>带班所长</td>
            <td>故障消除日期</td>
            <td>作业班组</td>
            <td>作业者</td>
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

export class Form extends React.Component {
  componentDidMount() {
    if (this.props.op === 'update' && this.props.item.remark !== '无') {
      document.getElementById('date_2').setAttribute('disabled', true)
      document.getElementById('dept_2').setAttribute('disabled', true)
      document.getElementById('operator_2').setAttribute('disabled', true)
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <TrainSelector caption="故障车号" id="train"
                  value={this.props.op === 'update' ? this.props.item.train : ''}
              />
            </div>

            <div className="col">
              <TextField caption="故障配件" id="parts"
                  value={this.props.op === 'update' ? this.props.item.parts : ''}
              />
            </div>

            <div className="col-6">
              <TextField caption="故障由来" id="content"
                  value={this.props.op === 'update' ? this.props.item.content : ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <DateField caption="倒件日期"
                  value={this.props.op === 'update' ? this.props.item.date : ''}
              />
            </div>

            <div className="col">
              <DeptSelector caption="作业班组" id="dept"
                  value={this.props.op === 'update' ? this.props.item.dept : ''}
              />
            </div>

            <div className="col">
              <TextField caption="作业者" id="operator"
                  value={this.props.op === 'update' ? this.props.item.operator : ''}
              />
            </div>

            <div className="col">
              <TextField caption="带班所长" id="p_dbsz"
                  value={this.props.op === 'update' ? this.props.item.p_dbsz : ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <DateField caption="故障消除日期" id="date_2"
                  value={this.props.op === 'update' ? this.props.item.date_2 : ''}
              />
            </div>

            <div className="col">
              <DeptSelector caption="作业班组" id="dept_2"
                  value={this.props.op === 'update' ? this.props.item.dept_2 : ''}
              />
            </div>

            <div className="col">
              <TextField caption="作业者" id="operator_2"
                  value={this.props.op === 'update' ? this.props.item.operator_2 : ''}
              />
            </div>
          </div>

          <div className="form-group">
            <label>备注</label>
            <select className="form-control" id="remark"
                onChange={this.handlerChangeRemark.bind(this)}
                defaultValue={this.props.op === 'update' ? this.props.item.remark : ''}
            >
              <option value="无">无</option>
              <option value="入厂后恢复">入厂后恢复</option>
            </select>
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

  handlerChangeRemark(event) {
    if (event.target.value === '无') {
      document.getElementById('date_2').removeAttribute('disabled')
      document.getElementById('dept_2').removeAttribute('disabled')
      document.getElementById('operator_2').removeAttribute('disabled')
    } else {
      document.getElementById('date_2').setAttribute('disabled', true)
      document.getElementById('dept_2').setAttribute('disabled', true)
      document.getElementById('operator_2').setAttribute('disabled', true)
    }
  }

  handler() {
    let body = {
      train: document.getElementById('train').value,
      parts: document.getElementById('parts').value,
      content: document.getElementById('content').value,
      date: document.getElementById('date').value,
      dept: document.getElementById('dept').value,
      operator: document.getElementById('operator').value,
      p_dbsz: document.getElementById('p_dbsz').value,
      date_2: document.getElementById('remark').value === '无' ? document.getElementById('date_2').value : '',
      dept_2: document.getElementById('remark').value === '无' ? document.getElementById('dept_2').value : '',
      operator_2: document.getElementById('remark').value === '无' ? document.getElementById('operator_2').value : '',
      remark: document.getElementById('remark').value
    }
    if (this.props.op === 'save') {
      Save(body)
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        window.location = './#/ledger.11'
      })
      .catch(err => window.console && console.error(err))
    } else if (this.props.op === 'update') {
      Update(this.props.item.id, body)
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        window.location = './#/ledger.11'
      })
      .catch(err => window.console && console.error(err))
    }
  }
}

export class Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href='./#/ledger.11' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href='./#/ledger.11-save' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>
    )
  }
}