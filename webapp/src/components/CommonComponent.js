import React from 'react'

export class PowerStatusSelector extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label>{this.props.caption || '供/断电状态'}</label>
        <select className="form-control" id={this.props.id || 'power_status'} defaultValue={this.props.value || ''}>
          <option value="">未选择</option>
          <option value="供">供</option>
          <option value="断">断</option>
        </select>
      </div>
    )
  }
}

export class DateField extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label>{this.props.caption || '日期'}</label>
        <input type="date" className="form-control" id={this.props.id || 'date'} defaultValue={this.props.value} />
      </div>
    )
  }
}

export class TextField extends React.Component {
  render() {
    return(
      <div className="form-group">
        <label>{this.props.caption || '标题'}</label>
        <input type="text" className="form-control" id={this.props.id || 'text'} defaultValue={this.props.value} />
      </div>
    )
  }
}

export class TrainSelector extends React.Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  componentDidMount() {
    fetch(`./api/common/train`)
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <div className="form-group">
        <label>{this.props.caption}</label>
        <select className="form-control" id="component.train-selector">
          <option value="">未选择</option>
          {
            this.state.list.length > 0 &&
            this.state.list.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
          }
        </select>
      </div>
    )
  }
}

export class DeptSelector extends React.Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  componentDidMount() {
    fetch(`./api/common/dept/`)
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
    .catch(err => window.console && console.error(err))
  }

  render() {
    return (
      <div className="form-group">
        <label>{this.props.caption || '部门'}</label>
        <select className="form-control" id={this.props.id || "component.dept-selector"}
            defaultValue={this.props.value || ''}
        >
          <option value="">未选择</option>
          {
            this.state.list.length > 0 &&
            this.state.list.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
          }
        </select>
      </div>
    )
  }
}