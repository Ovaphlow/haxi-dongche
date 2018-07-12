import React from 'react'

export default class SidebarA extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav classNameName="col-md-2 d-none d-md-block bg-dark sidebar">
        <div classNameName="sidebar-sticky">
          <ul classNameName="nav flex-column">
            <li classNameName="nav-item">
              <a classNameName="nav-link" href="index.html">
                <i classNameName="fa fa-home"></i>
                单据
              </a>
            </li>
            <li classNameName="nav-item">
              <a className="nav-link" href="journal.02.html">
                <i className="fa fa-file-o fa-fw"></i>&nbsp;02.一体化作业申请单
              </a>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex align-items-center px-3 mt-4 mb-1 text-muted">
            <i className="fa fa-cogs"></i>&nbsp;系统管理
          </h6>

          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="admin.dept-list.html">
                <i className="fa fa-cubes fa-fw"></i> 部门
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="admin.user-list.html">
                <i className="fa fa-users fa-fw"></i> 用户
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}