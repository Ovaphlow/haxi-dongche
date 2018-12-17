import React from 'react'
import { DateField, TextField } from '../components/CommonComponent';

export class Form extends React.Component {
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
              <TextField caption="申请供/断电部门" id="dept"
                  value={(this.props.op === 'update' && this.props.item.dept) || ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="申请供/断电" id="content"
                  value={(this.props.op === 'update' && this.props.item.content) || ''}
              />
            </div>

            <div className="col">
              <TextField caption="申请人" id="applicant"
                  value={(this.props.op === 'update' && this.props.item.applicant) || ''}
              />
            </div>

            <div className="col">
              <TextField caption="申请时间" id="applicant"
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

          <TextField caption="接触网状态" id="result"
              value={(this.props.op === 'update' && this.props.item.result) || ''}
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
    console.info(1)
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