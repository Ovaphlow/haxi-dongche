import React from 'react'

export default class Sidebar extends React.Component {
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-dark sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="./index.html">
                <i className="fa fa-fw fa-home"></i> 账项
              </a>
            </li>
            {this.props.category === '账项' &&
              <li className="nav-item">
                <a className="nav-link" href="./journal.01.html">
                  <i className="fa fa-file-o fa-fw"></i> 01.检修车间禁动牌管理台账
                </a>
              </li>
            }
            <li className="nav-item">
              <a className="nav-link" href="./index.html">
                <i className="fa fa-fw fa-home"></i> 单据
              </a>
            </li>
            {this.props.category === '单据' &&
              <li className="nav-item">
                <a className="nav-link" href="./journal.02.html">
                  <i className="fa fa-file-o fa-fw"></i>&nbsp;02.一体化作业申请单
                </a>
              </li>
            }
          </ul>

          <h6 className="sidebar-heading d-flex align-items-center px-3 mt-4 mb-1 text-muted">
            <i className="fa fa-fw fa-cogs"></i> 系统管理
          </h6>

          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="admin.dept-list.html">
                <i className="fa fa-fw fa-cubes"></i> 部门
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="admin.user-list.html">
                <i className="fa fa-fw fa-users"></i> 用户
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="admin.train-list.html">
                <i className="fa fa-fw fa-train"></i> 车组
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
