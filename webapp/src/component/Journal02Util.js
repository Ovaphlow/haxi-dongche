import React from 'react'

export class SubmitSignPjsy extends React.Component {
  constructor() {
    this.submit = this.submit.bind(this)
  }

  submit() {
    console.info('p_jsy')
  }

  render() {
    renturn (
      <button type="button" className="btn btn-primary" onClick={this.submit}>
        <i className="fa fa-fw fa-check-square-o"></i>
        技术员签字
      </button>
    )
  }
}