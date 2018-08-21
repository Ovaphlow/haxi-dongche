import React, { Component } from 'react'

export default class PageTitle extends Component {
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
