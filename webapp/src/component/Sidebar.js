import axios from 'axios'
import React from 'react'

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', todoQty: 0 }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      // this.props.history.push('./login')
      return false
    }
    if (this.props.category === '单据') {
      if (auth.auth_p_jsy) {
        axios({
          method: 'get',
          url: './api/journal02/todo/p_jsy?timestamp=' + new Date().getTime(),
          responseType: 'json'
        }).then(response => {
          this.setState({ todoQty: this.state.todoQty + response.data.content.qty + response.data.content.qty1 })
        })
      }

      axios({
        method: 'get',
        url: './api/journal02/todo/p_bz/' + auth.dept + '?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        this.setState({ todoQty: this.state.todoQty + response.data.content.qty + response.data.content.qty1 })
      }).catch(err => this.setState({ message: `服务器通信异常 ${err}` }))

      axios({
        method: 'get',
        url: './api/journal02/todo/qc/' + auth.name + '?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(response => {
        this.setState({ todoQty: this.state.todoQty + response.data.content.qty + response.data.content.qty1 })
      }).catch(err => this.setState({ message: `服务器通信异常 ${err}` }))

      if (auth.auth_p_dd) {
        axios({
          method: 'get',
          url: './api/journal02/todo/p_dd?timestamp=' + new Date().getTime(),
          responseType: 'json'
        }).then(response => {
          this.setState({ todoQty: this.state.todoQty + response.data.content.qty + response.data.content.qty1 })
        }).catch(err => this.setState({ message: `服务器通信异常 ${err}` }))
      }
      if (auth.auth_p_zbsz) {
        axios({
          method: 'get',
          url: './api/journal02/todo/p_zbsz?timestamp=' + new Date().getTime(),
          responseType: 'json'
        }).then(response => {
          this.setState({ todoQty: this.state.todoQty + response.data.content.qty })
        }).catch(err => this.setState({ message: `服务器通信异常 ${err}` }))
      }
    }
  }

  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-dark sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="./#/journal01">
                <i className="fa fa-fw fa-home"></i>
                账项
              </a>
            </li>
            {this.props.category === '账项' &&
              <li className="nav-item">
                <a className="nav-link" href="./#/journal01">
                  <i className="fa fa-file-o fa-fw"></i>
                  01.检修车间禁动牌管理台账
                </a>
              </li>
            }
            <li className="nav-item">
              <a className="nav-link" href="./#/journal02">
                <i className="fa fa-fw fa-home"></i>
                单据
              </a>
            </li>
            {this.props.category === '单据' &&
              <li className="nav-item">
                <a className="nav-link" href="./#/journal02">
                  <i className="fa fa-file-o fa-fw"></i>
                  02.一体化作业申请单&nbsp;
                  {this.state.todoQty > 0 &&
                    <span className="badge badge-pill badge-danger">{this.state.todoQty}</span>
                  }
                </a>
              </li>
            }
          </ul>

          <h6 className="sidebar-heading d-flex align-items-center px-3 mt-4 mb-1 text-muted">
            <i className="fa fa-fw fa-cogs"></i>
            系统管理
          </h6>

          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="admin.dept-list.html">
                <i className="fa fa-fw fa-cubes"></i>
                部门
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="admin.user-list.html">
                <i className="fa fa-fw fa-users"></i>
                用户
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="admin.train-list.html">
                <i className="fa fa-fw fa-train"></i>
                车组
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
