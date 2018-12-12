import React from 'react'

import { TextField } from '../components/CommonComponent'
import { Save, Update } from './Ledger05Action'

export class Form extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-4 form-group">
              <label>日期</label>
              <input type="date" className="form-control" id="date" />
            </div>
          </div>

          <h4>
            <span className="text-primary">早班</span>
            &nbsp;
            <span className="text-info">一列位</span>
          </h4>

          <div className="row">
            <div className="col">
              <TextField caption="接班人员" id="stuff_succession_1_1_1" />
            </div>

            <div className="col">
              <TextField caption="接班时间" id="time_succession_1_1_1" />
            </div>

            <div className="col">
              <TextField caption="交班人员" id="stuff_shift_1_1_1" />
            </div>

            <div className="col">
              <TextField caption="交班时间" id="time_shift_1_1_1" />
            </div>

            <div className="col-4">
              <TextField caption="备注" id="remark_1_1_1" />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="接班人员" id="stuff_succession_1_1_2" />
            </div>

            <div className="col">
              <TextField caption="接班时间" id="time_succession_1_1_2" />
            </div>

            <div className="col">
              <TextField caption="交班人员" id="stuff_shift_1_1_2" />
            </div>

            <div className="col">
              <TextField caption="交班时间" id="time_shift_1_1_2" />
            </div>

            <div className="col-4">
              <TextField caption="备注" id="remark_1_1_2" />
            </div>
          </div>

          <h4>
            <span className="text-primary">早班</span>
            &nbsp;
            <span className="text-info">二列位</span>
          </h4>

          <div className="row">
            <div className="col">
              <TextField caption="接班人员" id="stuff_succession_1_2_1" />
            </div>

            <div className="col">
              <TextField caption="接班时间" id="time_succession_1_2_1" />
            </div>

            <div className="col">
              <TextField caption="交班人员" id="stuff_shift_1_2_1" />
            </div>

            <div className="col">
              <TextField caption="交班时间" id="time_shift_1_2_1" />
            </div>

            <div className="col-4">
              <TextField caption="备注" id="remark_1_2_1" />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="接班人员" id="stuff_succession_1_2_2" />
            </div>

            <div className="col">
              <TextField caption="接班时间" id="time_succession_1_2_2" />
            </div>

            <div className="col">
              <TextField caption="交班人员" id="stuff_shift_1_2_2" />
            </div>

            <div className="col">
              <TextField caption="交班时间" id="time_shift_1_2_2" />
            </div>

            <div className="col-4">
              <TextField caption="备注" id="remark_1_2_2" />
            </div>
          </div>

          <h4>
            <span className="text-primary">晚班</span>
            &nbsp;
            <span className="text-info">一列位</span>
          </h4>

          <div className="row">
            <div className="col">
              <TextField caption="接班人员" id="stuff_succession_2_1_1" />
            </div>

            <div className="col">
              <TextField caption="接班时间" id="time_succession_2_1_1" />
            </div>

            <div className="col">
              <TextField caption="交班人员" id="stuff_shift_2_1_1" />
            </div>

            <div className="col">
              <TextField caption="交班时间" id="time_shift_2_1_1" />
            </div>

            <div className="col-4">
              <TextField caption="备注" id="remark_2_1_1" />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="接班人员" id="stuff_succession_2_1_2" />
            </div>

            <div className="col">
              <TextField caption="接班时间" id="time_succession_2_1_2" />
            </div>

            <div className="col">
              <TextField caption="交班人员" id="stuff_shift_2_1_2" />
            </div>

            <div className="col">
              <TextField caption="交班时间" id="time_shift_2_1_2" />
            </div>

            <div className="col-4">
              <TextField caption="备注" id="remark_2_1_2" />
            </div>
          </div>

          <h4>
            <span className="text-primary">晚班</span>
            &nbsp;
            <span className="text-info">二列位</span>
          </h4>

          <div className="row">
            <div className="col">
              <TextField caption="接班人员" id="stuff_succession_2_2_1" />
            </div>

            <div className="col">
              <TextField caption="接班时间" id="time_succession_2_2_1" />
            </div>

            <div className="col">
              <TextField caption="交班人员" id="stuff_shift_2_2_1" />
            </div>

            <div className="col">
              <TextField caption="交班时间" id="time_shift_2_2_1" />
            </div>

            <div className="col-4">
              <TextField caption="备注" id="remark_2_2_1" />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField caption="接班人员" id="stuff_succession_2_2_2" />
            </div>

            <div className="col">
              <TextField caption="接班时间" id="time_succession_2_2_2" />
            </div>

            <div className="col">
              <TextField caption="交班人员" id="stuff_shift_2_2_2" />
            </div>

            <div className="col">
              <TextField caption="交班时间" id="time_shift_2_2_2" />
            </div>

            <div className="col-4">
              <TextField caption="备注" id="remark_2_2_2" />
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
      stuff_succession_1_1_1: document.getElementById('stuff_succession_1_1_1').value,
      time_succession_1_1_1: document.getElementById('time_succession_1_1_1').value,
      stuff_shift_1_1_1: document.getElementById('stuff_shift_1_1_1').value,
      time_shift_1_1_1: document.getElementById('time_shift_1_1_1').value,
      remark_1_1_1: document.getElementById('remark_1_1_1').value,
      stuff_succession_1_1_2: document.getElementById('stuff_succession_1_1_2').value,
      time_succession_1_1_2: document.getElementById('time_succession_1_1_2').value,
      stuff_shift_1_1_2: document.getElementById('stuff_shift_1_1_2').value,
      time_shift_1_1_2: document.getElementById('time_shift_1_1_2').value,
      remark_1_1_2: document.getElementById('remark_1_1_2').value,
      stuff_succession_1_2_1: document.getElementById('stuff_succession_1_2_1').value,
      time_succession_1_2_1: document.getElementById('time_succession_1_2_1').value,
      stuff_shift_1_2_1: document.getElementById('stuff_shift_1_2_1').value,
      time_shift_1_2_1: document.getElementById('time_shift_1_2_1').value,
      remark_1_2_1: document.getElementById('remark_1_2_1').value,
      stuff_succession_1_2_2: document.getElementById('stuff_succession_1_2_2').value,
      time_succession_1_2_2: document.getElementById('time_succession_1_2_2').value,
      stuff_shift_1_2_2: document.getElementById('stuff_shift_1_2_2').value,
      time_shift_1_2_2: document.getElementById('time_shift_1_2_2').value,
      remark_1_2_2: document.getElementById('remark_1_2_2').value,
      stuff_succession_2_1_1: document.getElementById('stuff_succession_2_1_1').value,
      time_succession_2_1_1: document.getElementById('time_succession_2_1_1').value,
      stuff_shift_2_1_1: document.getElementById('stuff_shift_2_1_1').value,
      time_shift_2_1_1: document.getElementById('time_shift_2_1_1').value,
      remark_2_1_1: document.getElementById('remark_2_1_1').value,
      stuff_succession_2_1_2: document.getElementById('stuff_succession_2_1_2').value,
      time_succession_2_1_2: document.getElementById('time_succession_2_1_2').value,
      stuff_shift_2_1_2: document.getElementById('stuff_shift_2_1_2').value,
      time_shift_2_1_2: document.getElementById('time_shift_2_1_2').value,
      remark_2_1_2: document.getElementById('remark_2_1_2').value,
      stuff_succession_2_2_1: document.getElementById('stuff_succession_2_2_1').value,
      time_succession_2_2_1: document.getElementById('time_succession_2_2_1').value,
      stuff_shift_2_2_1: document.getElementById('stuff_shift_2_2_1').value,
      time_shift_2_2_1: document.getElementById('time_shift_2_2_1').value,
      remark_2_2_1: document.getElementById('remark_2_2_1').value,
      stuff_succession_2_2_2: document.getElementById('stuff_succession_2_2_2').value,
      time_succession_2_2_2: document.getElementById('time_succession_2_2_2').value,
      stuff_shift_2_2_2: document.getElementById('stuff_shift_2_2_2').value,
      time_shift_2_2_2: document.getElementById('time_shift_2_2_2').value,
      remark_2_2_2: document.getElementById('remark_2_2_2').value,
    }
    if (this.props.op === 'save') {
      Save(body)
      .then(response => {
        if (response.message) {
          alert(response.message)
          return
        }
        window.location = './#/ledger.05'
      })
      .catch(err => window.console && console.error(err))
    } else if (this.props.op === 'update') {
      console.info(this.props.id)
    }
  }
}

class TableItem extends React.Component {
  render() {
    return (
      <tbody>
        <tr>
          <td rowSpan="8" className="text-center align-middle">
            {this.props.item.date}
            <br />
            <button type="button" className="btn btn-outline-info btn-sm" data-id={this.props.item.id} onClick={this.handler.bind(this)}>
              <i className="fa fa-fw fa-edit"></i>
              编辑
            </button>
          </td>
          <td rowSpan="4" className="text-center align-middle">早</td>
          <td rowSpan="2" className="text-center align-middle">一列位</td>
          <td className="align-middle">{this.props.item.stuff_succession_1_1_1}</td>
          <td className="align-middle">
            {this.props.item.time_succession_1_1_1 === '00:00:00' ? '' : this.props.item.time_succession_1_1_1}
          </td>
          <td rowSpan="2" className="text-center align-middle">一列位</td>
          <td className="align-middle">{this.props.item.stuff_shift_1_1_1}</td>
          <td className="align-middle">
            {this.props.item.time_shift_1_1_1 === '00:00:00' ? '' : this.props.item.time_shift_1_1_1}
          </td>
          <td className="align-middle">{this.props.item.remark_1_1_1}</td>
        </tr>

        <tr>
          <td className="align-middle">{this.props.item.stuff_succession_1_1_2}</td>
          <td className="align-middle">
            {this.props.item.time_succession_1_1_2 === '00:00:00' ? '' : this.props.item.time_succession_1_1_2}
          </td>
          <td className="align-middle">{this.props.item.stuff_shift_1_1_2}</td>
          <td className="align-middle">
            {this.props.item.time_shift_1_1_2 === '00:00:00' ? '' : this.props.item.time_shift_1_1_2}
          </td>
          <td>{this.props.item.remark_1_1_2}</td>
        </tr>

        <tr>
          <td rowSpan="2" className="text-center align-middle">二列位</td>
          <td className="align-middle">{this.props.item.stuff_succession_1_2_1}</td>
          <td className="align-middle">
            {this.props.item.time_succession_1_2_1 === '00:00:00' ? '' : this.props.item.time_succession_1_2_1}
          </td>
          <td rowSpan="2" className="text-center align-middle">二列位</td>
          <td className="align-middle">{this.props.item.stuff_shift_1_2_1}</td>
          <td className="align-middle">
            {this.props.item.time_shift_1_2_1 === '00:00:00' ? '' : this.props.item.time_shift_1_2_1}
          </td>
          <td className="align-middle">{this.props.item.remark_1_2_1}</td>
        </tr>

        <tr>
          <td className="align-middle">{this.props.item.stuff_succession_1_2_2}</td>
          <td className="align-middle">
            {this.props.item.time_succession_1_2_2 === '00:00:00' ? '' : this.props.item.time_succession_1_2_2}
          </td>
          <td className="align-middle">{this.props.item.stuff_shift_1_2_2}</td>
          <td className="align-middle">
            {this.props.item.time_shift_1_2_2 === '00:00:00' ? '' : this.props.item.time_shift_1_2_2}
          </td>
          <td>{this.props.item.remark_1_2_2}</td>
        </tr>

        <tr>
          <td rowSpan="4" className="text-center align-middle">晚</td>
          <td rowSpan="2" className="text-center align-middle">一列位</td>
          <td className="align-middle">{this.props.item.stuff_succession_2_1_1}</td>
          <td className="align-middle">
            {this.props.item.time_succession_2_1_1 === '00:00:00' ? '' : this.props.item.time_succession_2_1_1}
          </td>
          <td rowSpan="2" className="text-center align-middle">一列位</td>
          <td className="align-middle">{this.props.item.stuff_shift_2_1_1}</td>
          <td className="align-middle">
            {this.props.item.time_shift_2_1_1 === '00:00:00' ? '' : this.props.item.time_shift_2_1_1}
          </td>
          <td className="align-middle">{this.props.item.remark_2_1_1}</td>
        </tr>

        <tr>
          <td className="align-middle">{this.props.item.stuff_succession_2_1_2}</td>
          <td className="align-middle">
            {this.props.item.time_succession_2_1_2 === '00:00:00' ? '' : this.props.item.time_succession_2_1_2}
          </td>
          <td className="align-middle">{this.props.item.stuff_shift_2_1_2}</td>
          <td className="align-middle">
            {this.props.item.time_shift_2_1_2 === '00:00:00' ? '' : this.props.item.time_shift_2_1_2}
          </td>
          <td>{this.props.item.remark_2_1_2}</td>
        </tr>

        <tr>
          <td rowSpan="2" className="text-center align-middle">二列位</td>
          <td className="align-middle">{this.props.item.stuff_succession_2_2_1}</td>
          <td className="align-middle">
            {this.props.item.time_succession_2_2_1 === '00:00:00' ? '' : this.props.item.time_succession_2_2_1}
          </td>
          <td rowSpan="2" className="text-center align-middle">二列位</td>
          <td className="align-middle">{this.props.item.stuff_shift_2_2_1}</td>
          <td className="align-middle">
            {this.props.item.time_shift_2_2_1 === '00:00:00' ? '' : this.props.item.time_shift_2_2_1}
          </td>
          <td className="align-middle">{this.props.item.remark_2_2_1}</td>
        </tr>

        <tr>
          <td className="align-middle">{this.props.item.stuff_succession_2_2_2}</td>
          <td className="align-middle">
            {this.props.item.time_succession_2_2_2 === '00:00:00' ? '' : this.props.item.time_succession_2_2_2}
          </td>
          <td className="align-middle">{this.props.item.stuff_shift_2_2_2}</td>
          <td className="align-middle">
            {this.props.item.time_shift_2_2_2 === '00:00:00' ? '' : this.props.item.time_shift_2_2_2}
          </td>
          <td>{this.props.item.remark_2_2_2}</td>
        </tr>
      </tbody>
    )
  }

  handler(event) {
    window.location = `./#/ledger.05-update/${event.target.getAttribute('data-id')}`
  }
}

export class Table extends React.Component {
  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>日期</td>
            <td>班次</td>
            <td>列位</td>
            <td>接班人员</td>
            <td>接班时间</td>
            <td>列位</td>
            <td>交班人员</td>
            <td>交班时间</td>
            <td>备注</td>
          </tr>
        </thead>

        {
          this.props.list.length > 0 &&
          this.props.list.map(item => <TableItem key={item.id} item={item} />)
        }
      </table>
    )
  }
}

export class Ledger05Toolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href='./#/ledger.05' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-search"></i>
          检索数据
        </a>
        <a href='./#/ledger.05-save' className="btn btn-outline-secondary btn-sm">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>
    )
  }
}