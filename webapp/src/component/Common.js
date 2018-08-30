import React from 'react'

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

  render() {
    return (
      <select className="form-control" disabled={this.props.mode === 'read' ? true : false} id="component.train-list">
        <option value="">选择车组</option>
        {this.state.list.map(item =>
          <option value={item.name} key={item.id}>{item.name}</option>
        )}
      </select>
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
      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.submit}>
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