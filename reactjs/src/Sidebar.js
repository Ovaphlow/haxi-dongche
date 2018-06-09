import React from 'react'

export default class Sidebar extends React.Component {
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-dark sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="index.html">
                <i className="fa fa-home"></i>
                账项
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="journal.01.html">
                <i className="fa fa-file-o fa-fw"></i>&nbsp;01.检修车间禁动牌管理台账
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="journal.02.html">
                <i className="fa fa-file-o fa-fw"></i>&nbsp;02.一体化作业申请单
              </a>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex align-items-center px-3 mt-4 mb-1 text-muted">
            <i className="fa fa-user"></i>&nbsp;当前用户
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="#">
                用户信息
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                修改密码
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