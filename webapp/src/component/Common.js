import React from 'react'

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
      <select className="form-control" id="component.train-list">
        <option value="">选择车组</option>
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
