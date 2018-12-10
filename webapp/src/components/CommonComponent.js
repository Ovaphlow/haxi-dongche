import React from 'react'

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
        <label>{this.props.caption}</label>
        <select className="form-control" id="component.dept-selector">
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