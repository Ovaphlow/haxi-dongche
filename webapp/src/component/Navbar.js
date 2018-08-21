import React from 'react'

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="./#/">账项管理系统</a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="./user.html">
              <i className="fa fa-fw fa-user"></i> 当前用户
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}
