import React from 'react'

export default class Sidebar extends React.Component {
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-dark sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="./index.html">
                功能
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="./index.html">
                <i className="fa fa-warning fa-fw"></i> 修程预警
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="./index.html">
                <i className="fa fa-fw fa-upload"></i> 上传数据文件
              </a>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex align-items-center px-3 mt-4 mb-1 text-muted">
            <i className="fa fa-cogs fa-fw"></i>系统管理
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a href="./mgr.model.html" className="nav-link">
                <i className="fa fa-cogs fa-fw"></i> 车型
              </a>
            </li>
            <li className="nav-item">
              <a href="mgr.train.html" className="nav-link">
                <i className="fa fa-cogs fa-fw"></i> 车组
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}