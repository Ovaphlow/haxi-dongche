import React from 'react'

export class SubmitSignPjsy extends React.Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit() {
    console.info('p_jsy')
  }

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-check-square-o"></i>
        技术员签字
      </button>
    )
  }
}

export class RemoveButton extends React.Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit() {
    let id = sessionStorage.getItem('journal02')
    if (!!!id) {
      alert('操作失败')
      return false
    }
    fetch(`./api/journal02/${id}`, {
      method: 'delete'
    })
    .then(res => {
      res.json()
      window.location.href = './#/journal.02'
    })
  }

  render() {
    return (
      <button type="button" className="btn btn-danger" onClick={this.submit}>
        <i className="fa fa-fw fa-remove"></i>
        删除
      </button>
    )
  }
}