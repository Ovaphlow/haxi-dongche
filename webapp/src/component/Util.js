import React from 'react'

export class Message extends React.Component {
  render() {
    return (
      <div className="col-12">
        <div className="alert alert-danger">{this.props.message}</div>
      </div>
    )
  }
}