import React from 'react'

import UserToolbar from './UserToolbar'
import { AdminDeptToolbar, AdminUserToolbar, AdminTrainToolbar } from './AdminUtil'
import Journal01Toolbar from './Journal01Toolbar'
import Journal02Toolbar from './Journal02Util'

export class MessageReadButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
    this.handler = this.handler.bind(this)
  }

  handler() {
    fetch(`./api/common/message/${this.props.id}/read`, {
      method: 'put'
    })
    .then(() => window.location.reload(true))
  }

  render() {
    return (
      <button type="button" className="btn btn-outline-dark" onClick={this.handler}>
        <i className="fa fa-fw fa-check-square-o"></i>
        标记为已读
      </button>
    )
  }
}

export class MessageAlert extends React.Component {
  constructor() {
    super()
    this.state = { message: '' }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    fetch(`./api/common/message/${auth.id}/unread/qty`)
    .then(res => res.json())
    .then(response => {
      if (response.content.qty === 0) return false
      this.setState({ message: `您有 ${response.content.qty} 条新通知` })
    })
  }

  render() {
    return (
      <div className="alert alert-success" style={{display: this.state.message ? 'block' : 'none'}}>
        {this.state.message}
        <span className="pull-right">
          <a href="./#/message">查看</a>
        </span>
      </div>
    )
  }
}

export class CarriageList extends React.Component {
  render() {
    return (
      <select className="form-control form-control-sm" id="component.carriage-list">
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
        <option value="04">04</option>
        <option value="05">05</option>
        <option value="06">06</option>
        <option value="07">07</option>
        <option value="08">08</option>
      </select>
    )
  }
}

export class TrainList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [] }
  }

  componentDidMount() {
    fetch('./api/common/train')
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
  }

  renderComponent() {
    if (this.props.mode === 'read') return (
      <input type="text" readOnly className="form-control" id="component.train-list" />
    )
    else return (
      <select className="form-control" disabled={this.props.mode === 'read' ? true : false} id="component.train-list">
        <option value="">选择车组</option>
        {this.state.list.map(item =>
          <option value={item.name} key={item.id}>{item.name}</option>
        )}
      </select>
    )
  }

  render() {
    return (
      <span>{this.renderComponent()}</span>
    )
  }
}

// 制定部门用户列表
export class UserSelectorDept extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [] }
    this.renderElement = this.renderElement.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    fetch(`./api/common/user/dept/name/${auth.dept}`)
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
    document.getElementById('component.user-selector').value = this.props.val
  }

  renderElement() {
    if (this.props.mode !== 'read') {
      return (
        <select className="form-control" id="component.user-selector">
          <option value="">选择用户</option>
          {this.state.list.map(item =>
            <option value={item.name} key={item.id}>{item.name}</option>
          )}
        </select>
      )
    } else {
      return (
        <input type="text" readOnly={this.props.mode === 'read' ? true : false} className="form-control" id="component.user-selector" />
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderElement()}
      </div>
    )
  }
}

export class DeptList extends React.Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  componentDidMount() {
    fetch('./api/common/dept')
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
  }

  render () {
    return (
      <select className="form-control" id="component.dept-list">
        <option value="">选择单位</option>
        {this.state.list.map(item =>
          <option value={item.name} key={item.id}>{item.name}</option>
        )}
      </select>
    )
  }
}

export class DeptListPbz extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [] }
  }

  componentDidMount() {
    fetch('./api/common/dept/filter/remark/班组')
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
  }

  render() {
    return (
      <select className="form-control" id="component.p_bz-list">
        <option value="">选择班组</option>
        {this.state.list.map(item =>
          <option value={item.name} key={item.id}>{item.name}</option>
        )}
      </select>
    )
  }
}

export class QCList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [] }
  }

  componentDidMount() {
    fetch('./api/common/user/dept/name/质检')
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
  }

  render() {
    return (
      <select className="form-control" id="component.qc-list">
        <option value="">选择质检</option>
        {this.state.list.map(item =>
          <option value={item.name} key={item.id}>{item.name}</option>
        )}
      </select>
    )
  }
}

export class ReloadButton extends React.Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit() {
    window.location.reload(true)
  }

  render() {
    return (
      <button type="button" className="btn btn-outline-secondary" onClick={this.submit}>
        <i className="fa fa-fw fa-refresh"></i>
        重置/刷新
      </button>
    )
  }
}

export class BackButton extends React.Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit() {
    window.history.go(-1)
  }

  render() {
    return (
      <button type="button" className="btn btn-outline-secondary" onClick={this.submit}>
        <i className="fa fa-fw fa-arrow-left"></i>
        返回
      </button>
    )
  }
}

export class Message extends React.Component {
  render() {
    return (
      <div className="alert alert-danger">{this.props.message}</div>
    )
  }
}

export class PageTitle2 extends React.Component {
  render() {
    return (
      <div className="lead">
        {this.props.toolbar === 'UserToolbar' &&
          <UserToolbar className="pull-right" />
        }
        {this.props.toolbar === 'AdminDeptToolbar' &&
          <AdminDeptToolbar className="pull-right" />
        }
        {this.props.toolbar === 'AdminUserToolbar' &&
          <AdminUserToolbar className="pull-right" />
        }
        {this.props.toolbar === 'AdminTrainToolbar' &&
          <AdminTrainToolbar className="pull-right" />
        }
        {this.props.toolbar === 'Journal01Toolbar' &&
          <Journal01Toolbar className="pull-right" />
        }
        {this.props.toolbar === 'Journal02Toolbar' &&
          <Journal02Toolbar className="pull-right" />
        }
        <i className={'fa fa-fw ' + this.props.fa}></i>
        {this.props.title}
        <br />
        <br />
      </div>
    )
  }
}

export class PageTitle extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3>
          {this.props.title}
        </h3>
      </div>
    )
  }
}

export class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = { todoQty: 0 }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      // 加载 Sidebar 时不跳转登录
      // window.location.href = './#/login'
      return false
    }
    if (this.props.category === '单据') {
      if (auth.auth_p_jsy) {
        fetch(`./api/journal02/todo/p_jsy?timestamp=${new Date().getTime()}`)
        .then(res => res.json())
        .then(response => {
          this.setState({ todoQty: this.state.todoQty + response.content.qty + response.content.qty1 })
        })
        .catch(err => window.console && console.error(err))
      }

      fetch(`./api/journal02/todo/p_bz/${auth.dept}?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ todoQty: this.state.todoQty + response.content.qty + response.content.qty1 })
      })
      .catch(err => window.console && console.error(err))

      fetch(`./api/journal02/todo/qc/${auth.dept}?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ todoQty: this.state.todoQty + response.content.qty1 })
      })
      .catch(err => window.console && console.error(err))

      if (auth.auth_p_dd) {
        fetch(`./api/journal02/todo/p_dd?timestamp=${new Date().getTime()}`)
        .then(res => res.json())
        .then(response => {
          let qty = this.state.todoQty + response.content.qty + response.content.qty1
          this.setState({ todoQty: qty })
        })
        .catch(err => window.console && console.error(err))
      }

      if (auth.auth_p_zbsz) {
        fetch(`./api/journal02/todo/p_zbsz?timestamp=${new Date().getTime()}`)
        .then(res => res.json())
        .then(response => {
          this.setState({ todoQty: this.state.todoQty + response.content.qty })
        })
        .catch(err => window.console && console.error(err))
      }
    }
  }

  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-dark sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="./#/journal.01">
                <i className="fa fa-fw fa-home"></i>
                账项
              </a>
            </li>
            {this.props.category === '账项' &&
              <li className="nav-item">
                <a className="nav-link" href="./#/journal.01">
                  <i className="fa fa-file-o fa-fw"></i>
                  01.检修车间禁动牌管理台账
                </a>
              </li>
            }
            <li className="nav-item">
              <a className="nav-link" href="./#/journal.02">
                <i className="fa fa-fw fa-home"></i>
                单据
              </a>
            </li>
            {this.props.category === '单据' &&
              <li className="nav-item">
                <a className="nav-link" href="./#/journal.02">
                  <i className="fa fa-file-o fa-fw"></i>
                  02.一体化作业申请单&nbsp;
                  {this.state.todoQty > 0 &&
                    <span className="badge badge-pill badge-danger">{this.state.todoQty}</span>
                  }
                </a>
              </li>
            }
          </ul>

          <h6 className="sidebar-heading d-flex align-items-center px-3 mt-4 mb-1 text-muted">
            <i className="fa fa-fw fa-cogs"></i>
            系统管理
          </h6>

          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="./#/admin.dept-list">
                <i className="fa fa-fw fa-cubes"></i>
                部门
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./#/admin.user-list">
                <i className="fa fa-fw fa-users"></i>
                用户
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./#/admin.train-list">
                <i className="fa fa-fw fa-train"></i>
                车组
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="./#/">账项管理系统</a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="./#/user">
              <i className="fa fa-fw fa-user"></i>
              当前用户
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}
