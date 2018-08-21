import React from 'react'

export default class UserToolbar extends React.Component {
  render() {
    return (
      <div className="btn-group pull-right" role="group">
        <a href="./user.html" className="btn btn-light btn-sm">
          <i className="fa fa-fw fa-user"></i> 用户信息
        </a>
        <a href="./user.password.html" className="btn btn-light btn-sm">
          <i className="fa fa-fw fa-language"></i> 修改密码
        </a>
        <a href="./user.sign.html" className="btn btn-light btn-sm">
          <i className="fa fa-fw fa-crop"></i> 设定签字
        </a>
        <a href="./login.html" className="btn btn-light btn-sm">
          <i className="fa fa-fw fa-sign-out"></i> 注销
        </a>
      </div>
    )
  }
}
