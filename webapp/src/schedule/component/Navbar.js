import React from 'react'

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="index.html">哈尔滨动车段</a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="../login.html">
              <i className="fa fa-sign-out"></i> 注销
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}