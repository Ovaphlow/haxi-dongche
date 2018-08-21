import React, { Component } from 'react'

import Journal01Toolbar from './Journal01Toolbar'
import Journal02Toolbar from './Journal02Toolbar'

export default class PageTitle2 extends Component {
  render() {
    return (
      <div className="lead">
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
