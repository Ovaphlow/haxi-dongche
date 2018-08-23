import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Toolbar from './component/Journal01Toolbar'
import Journal01Item from './component/Journal01Item'

import './dashboard.css'

class Journal01Return extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list: [], listByUser: [] }
    this.submitReturn = this.submitReturn.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (auth.auth_01) {
      axios({
        method: 'get',
        url: './api/journal01/return',
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ list: response.data.content })
      }).catch(err => {
        this.setState({ message: `服务器通信异常 ${err}` })
      })
    } else if (auth.id){
      axios({
        method: 'get',
        url: './api/journal01/return/user' + auth.id,
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        this.setState({ listByUser: response.data.content })
      }).catch(err => {
        this.setState({ message: `服务器通信异常 ${err}` })
      })
    }
  }

  submitReturn(event) {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth.auth_01) {
      this.setState({ message: `当前用户没有对应权限` })
      return false
    }
    axios({
      method: 'put',
      url: './api/journal01/return/' + event.target.getAttribute('data-id'),
      data: {
        return_name: document.getElementById('modal.return_by').value,
        return_by: auth.name,
        return_by_id: auth.id,
        remark: document.getElementById('modal.remark').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      location.reload(true)
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}` })
    })
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="contrainer-fluid">
          <div className="row">
            <Sidebar category='账项' />

            <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  01.检修车间禁动牌管理台账
                </h3>
              </div>

              <div className="lead">
                <Toolbar className="pull-right" />
                <i className="fa fa-download fa-fw"></i> 返还
                <br />
                <br />
              </div>

              {this.state.message &&
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-danger">
                      {this.state.message}
                    </div>
                  </div>
                </div>
              }

              <div className="row">
                <div className="col-12">
                  <ul className="list-group">
                    {this.state.list.map(item =>
                      <Journal01Item key={item.id} item={item} return={true} />
                    )}
                    {this.state.listByUser.map(item =>
                      <Journal01Item key={item.id} item={item} />
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="modal" tabIndex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true" className="modal fade">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalTitle">
                  返还
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>返还人</label>
                  <input type="text" readOnly className="form-control" id="modal.return_by" />
                </div>
                <div className="form-group">
                  <label>备注</label>
                  <textarea rows="3" className="form-control" id="modal.remark"></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">关闭</button>
                <button type="button" data-id="0" className="btn btn-primary" id="modal.id" onClick={this.submitReturn}>
                  <i className="fa fa-fw fa-download"></i> 返还
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Journal01Return />, document.getElementById('app'))