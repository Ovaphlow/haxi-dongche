import React from 'react'
import { DateField, TextField, TrainSelector, PowerStatusSelector, LocationOfOperationSelector, DeptSelector } from '../components/CommonComponent';

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
              <TextField caption="作业时间 - 止" id="time_begin"
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
              <select className="form-control" id="p_yq_move">
                <option value="能">能</option>
                <option value="否">否</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="完成情况" id="result"
                  value={this.props.op === 'update' ? this.props.item.result : ''}
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
          </div>

        </div>

        <div className="card-footer">
          <div className="btn-group pull-right">
            <button type="button" className="btn btn-primary" onClick={this.handler.bind(this)}>
              <i className="fa fa-fw fa-primary"></i>
              确定
            </button>
          </div>
        </div>
      </div>
    )
  }

  handler() {
    console.info(1)
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