import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/SidebarA'
import Toolbar from './component/Journal02Toolbar'
import Journal02Master from './component/Journal02Master'
import Journal02Detail01 from './component/Journal02Detail01'
import Journal02Detail02 from './component/Journal02Detail02'
import Journal02Detail03 from './component/Journal02Detail03'
import Journal02Detail04 from './component/Journal02Detail04'
import Journal02Toolbar from './component/Journal02Toolbar';

class Journal02Detail extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', master: {}, detail01: [], detail02: [], detail03: [], detail04: [] }
    this.back = this.back.bind(this)
  }

  back() {
    window.history.go(-1)
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container-fluid">
          <div className="row">
            <Sidebar />

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  02.一体化作业申请单
                </h3>
              </div>

              <div className="lead">
                <Toolbar className="pull-right" />
                <i className="fa fa-list fa-fw"></i> 详细信息
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

              <Journal02Master read={true} check={true} verify={true} />

              <p><hr /></p>

              <Journal02Detail01 read={true} />

              <p><hr /></p>

              <Journal02Detail02 read={true} />

              <p><hr /></p>

              <Journal02Detail03 detail={this.state.detail03} read={true} />

              <p><hr /></p>

              {this.state.detail04 &&
                <Journal02Detail04 detail={this.state.detail04} read={true} />
              }
            </main>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Journal02Detail />, document.getElementById('app'))