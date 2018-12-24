import React from 'react'

import { DateField, TextField, TrainSelector, PowerStatusSelector, LocationOfOperationSelector, DeptSelector } from '../components/CommonComponent';
import { Save, Update } from './Ledger10Action'

class TableItem extends React.Component {
  render() {
    return (
      <tr>
        <td className="text-center">
          <span className="pull-left">
            <a href={`./#/ledger.10-update/${this.props.item.id}`}>
              <i className="fa fa-fw fa-edit"></i>
            </a>
          </span>
          {this.props.item.id}
        </td>
        <td>{this.props.item.date}</td>
        <td>
          {this.props.item.time_begin === '00:00:00' ? '' : this.props.item.time_begin}
          &nbsp;至&nbsp;
          {this.props.item.time_begin === '00:00:00' ? '' : this.props.item.time_end}
        </td>
        <td>{this.props.item.train}</td>
        <td>{this.props.item.carriage}</td>
        <td>{this.props.item.content}</td>
        <td>{this.props.item.p_yq_jcw}</td>
        <td>{this.props.item.p_yq_xdc}</td>
        <td>{this.props.item.p_yq_zydd}</td>
        <td>{this.props.item.p_yq_move}</td>
        <td>{this.props.item.report}</td>
        <td>{this.props.item.dept}</td>
        <td>{this.props.item.applicant}</td>
        <td>{this.props.item.phone}</td>
        <td>
          {this.props.item.review_by === '' ? '' : this.props.item.review_time}
        </td>
        <td>{this.props.item.review_by}</td>
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
            <td>作业时间</td>
            <td>车组号</td>
            <td>车厢号</td>
            <td>作业内容</td>
            <td>接触网</td>
            <td>蓄电池</td>
            <td>作业地点</td>
            <td>能否动车</td>
            <td>完成情况</td>
            <td>申请部门</td>
            <td>申请人</td>
            <td>联系方式</td>
            <td>销记时间</td>
            <td>销记人</td>
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
          <div className="row">
            <div className="col">
              <DateField
                  value={this.props.op === 'update' ? this.props.item.date : ''}
              />
            </div>

            <div className="col">
              <TextField caption="作业时间 - 起" id="time_begin"
                  value={this.props.op === 'update' ? this.props.item.time_begin : ''}
              />
            </div>

            <div className="col">
              <TextField caption="作业时间 - 止" id="time_end"
                  value={this.props.op === 'update' ? this.props.item.time_end : ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TrainSelector id="train"
                  value={this.props.op === 'update' ? this.props.item.train : ''}
              />
            </div>

            <div className="col">
              <TextField caption="车厢号" id="carriage"
                  value={this.props.op === 'update' ? this.props.item.carriage : ''}
              />
            </div>

            <div className="col-6">
              <TextField caption="作业内容" id="content"
                  value={this.props.op === 'update' ? this.props.item.content : ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <PowerStatusSelector caption="接触网" id="p_yq_jcw"
                  value={this.props.op === 'update' ? this.props.item.p_yq_jcw : '无要求'}
              />
            </div>

            <div className="col">
              <PowerStatusSelector caption="蓄电池" id="p_yq_xdc"
                  value={this.props.op === 'update' ? this.props.item.p_yq_xdc : '无要求'}
              />
            </div>

            <div className="col">
              <LocationOfOperationSelector
                  value={this.props.op === 'update' ? this.props.item.p_yq_zydd : '无要求'}
              />
            </div>

            <div className="col">
              <label>能否动车</label>
              <select className="form-control" id="p_yq_move"
                  defaultValue={this.props.op === 'update' ? this.props.item.p_yq_move : ''}
              >
                <option value="能">能</option>
                <option value="否">否</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="完成情况" id="report"
                  value={this.props.op === 'update' ? this.props.item.report : ''}
              />
            </div>

            <div className="col">
              <DeptSelector caption="申请部门" id="dept"
                  value={this.props.op === 'update' ? this.props.item.dept : ''}
              />
            </div>

            <div className="col">
              <TextField caption="申请人" id="applicant"
                  value={this.props.op === 'update' ? this.props.item.applicant : ''}
              />
            </div>

            <div className="col">
              <TextField caption="联系方式" id="phone"
                  value={this.props.op === 'update' ? this.props.item.phone : ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="销记时间" id="review_time"
                  value={this.props.op === 'update' ? this.props.item.review_time : ''}
              />
            </div>

            <div className="col">
              <TextField caption="销记人" id="review_by"
                  value={this.props.op === 'update' ? this.props.item.review_by : ''}
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
      time_begin: document.getElementById('time_begin').value,
      time_end: document.getElementById('time_end').value,
      train: document.getElementById('train').value,
      carriage: document.getElementById('carriage').value,
      content: document.getElementById('content').value,
      p_yq_jcw: document.getElementById('p_yq_jcw').value,
      p_yq_xdc: document.getElementById('p_yq_xdc').value,
      p_yq_zydd: document.getElementById('p_yq_zydd').value,
      p_yq_move: document.getElementById('p_yq_move').value,
      report: document.getElementById('report').value,
      dept: document.getElementById('dept').value,
      applicant: document.getElementById('applicant').value,
      phone: document.getElementById('phone').value,
      review_time: document.getElementById('review_time').value,
      review_by: document.getElementById('review_by').value
    }
    if (this.props.op === 'save') {
      Save(body)
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        window.location = './#/ledger.10'
      })
      .catch(err => window.console && console.error(err))
    } else if (this.props.op === 'update') {
      Update(this.props.item.id, body)
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        window.location = './#/ledger.10'
      })
      .catch(err => window.console && console.error(err))
    }
  }
}

export class Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href='./#/ledger.10' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href='./#/ledger.10-save' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>
    )
  }
}