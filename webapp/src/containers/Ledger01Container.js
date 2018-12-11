import echarts from 'echarts'
import React from 'react'

import {
  Sidebar, PageTitle, PageTitle2
} from '../component/Common'
import { Ledger01ListItem } from '../components/Ledger01Component'
import { FilterDeptByRemark } from '../actions/Common'
import { GetList, Save, GetItem, ReturnList, ReturnItem, Stats } from '../actions/Ledger01Action'

export class Ledger01Stats extends React.Component {
  componentDidMount() {
    Stats()
    .then(response => {
      if (response.message) {
        window.alert(response.message)
        return
      }
      var chart = echarts.init(document.getElementById('chart'))
      var option = {
        title: {
          text: '借出禁动牌次数 数据统计',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '借出次数',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: response.content,
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        ]
      }
      chart.setOption(option)
    }).catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='账项' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="01.检修车间禁动牌管理台账" />
          <PageTitle2 fa="fa-pie-chart" title="数据统计" toolbar="Journal01Toolbar" />

          <div className="col-12 text-center">
            <div id="chart" style={{ width: '100%', height: '40em' }}></div>
          </div>
        </div>
      </div>
    )
  }
}

export class Ledger01ReturnItem extends React.Component {
  componentDidMount() {
    GetItem(window.sessionStorage.getItem('ledger.01-item'))
    .then(response => {
      document.getElementById('quantity').value = response.content.quantity
      document.getElementById('return').value = response.content.applicant
      document.getElementById('remark').value = response.content.remark
    })
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='账项' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="01.检修车间禁动牌管理台账" />
          <PageTitle2 fa="fa-download" title="返还" toolbar="Journal01Toolbar" />

          <div className="row">
            <div className="col form-group">
              <label>归还数量</label>
              <input type="text" className="form-control" id="quantity" />
            </div>

            <div className="col form-group">
              <label>归还人</label>
              <input type="text" className="form-control" id="return" />
            </div>

            <div className="col">
              <div className="form-group">
                <label>接受人</label>
                <input type="text" className="form-control" id="return_by" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>备注</label>
            <textarea rows="3" className="form-control" id="remark"></textarea>
          </div>

          <div className="form-group">
            <button type="button" className="btn btn-primary pull-right" onClick={this.handler.bind(this)}>
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
      id: sessionStorage.getItem('ledger.01-item'),
      return_quantity: document.getElementById('quantity').value,
      return_name: document.getElementById('return').value,
      return_by: document.getElementById('return_by').value,
      remark: document.getElementById('remark').value
    }
    ReturnItem(body)
    .then(response => {
      if (response.message) {
        alert(response.message)
        return
      }
      window.location = './#/journal.01-return'
    })
    .catch(err => window.console && console.error(err))
  }
}

export class Ledger01Return extends React.Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  componentDidMount() {
    ReturnList()
    .then(response => {
      if (response.message) {
        window.alert(response.data.message)
        return
      }
      this.setState({ list: response.content })
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='账项' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="01.检修车间禁动牌管理台账" />
          <PageTitle2 fa="fa-download" title="返还" toolbar="Journal01Toolbar" />

          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr className="text-success">
                <td>序号</td>
                <td>领取日期</td>
                <td>领取时间</td>
                <td>数量</td>
                <td>领取人员</td>
                <td>作业部门</td>
                <td>借出人</td>
                <td>归还日期</td>
                <td>归还时间</td>
                <td>归还数量</td>
                <td>归还人</td>
                <td>接受人</td>
                <td>备注</td>
                <td>操作</td>
              </tr>
            </thead>
            <tbody>
              {
                this.state.list.length > 0 &&
                this.state.list.map(item => <Ledger01ListItem key={item.id} item={item} op_return={true} />)
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export class Ledger01Save extends React.Component {
  constructor() {
    super()
    this.state = { listDept: [] }
  }

  componentDidMount() {
    document.getElementById('qty').value = 1
    FilterDeptByRemark('班组')
    .then(response => {
      this.setState({ listDept: response.content })
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="01.检修车间禁动牌管理台账" />
          <PageTitle2 fa="fa-plus" title="新增申请" toolbar="Journal01Toolbar" />

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>作业部门</label>
                <select className="form-control" id="dept">
                  {
                    this.state.listDept.map(item =>
                      <option value={item.name} key={item.id}>{item.name}</option>
                    )
                  }
                </select>
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>申请人</label>
                <input type="text" className="form-control" id="applicant" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>申请数量</label>
                <input type="number" className="form-control" id="qty" />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>发放人</label>
                <input type="text" className="form-control" id="borrow" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>备注</label>
            <textarea rows="3" className="form-control" id="remark"></textarea>
          </div>

          <div className="btn btn-group pull-right">
            <button type="button" className="btn btn-primary" onClick={this.submit.bind(this)}>
              <i className="fa fa-fw fa-check-square-o"></i> 确定
            </button>
          </div>
        </div>
      </div>
    )
  }

  submit() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    let body = {
      applicant: document.getElementById('applicant').value,
      dept: document.getElementById('dept').value,
      quantity: document.getElementById('qty').value,
      borrow: document.getElementById('borrow').value,
      remark: document.getElementById('remark').value
    }
    Save(body)
    .then(response => {
      if (response.message) {
        window.alert(response.data.message)
        return
      }
      window.location = './#/journal.01'
    })
    .catch(err => window.console && console.error(err))
  }
}

export class Ledger01Home extends React.Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  componentDidMount() {
    GetList()
    .then(response => {
      this.setState({ list: response.content })
    })
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category="账项" />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">

          <PageTitle title="01.检修车间禁动牌管理台账" />
          <PageTitle2 fa="fa-search" title="检索数据" toolbar="Journal01Toolbar" />

          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr className="text-success">
                <td>序号</td>
                <td>领取日期</td>
                <td>领取时间</td>
                <td>数量</td>
                <td>领取人员</td>
                <td>作业部门</td>
                <td>发放人</td>
                <td>归还日期</td>
                <td>归还时间</td>
                <td>归还数量</td>
                <td>归还人</td>
                <td>接受人</td>
                <td>备注</td>
              </tr>
            </thead>
            <tbody>
              {
                this.state.list.length > 0 &&
                this.state.list.map(item => <Ledger01ListItem key={item.id} item={item} />)
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}