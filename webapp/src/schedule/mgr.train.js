import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'

class MgrTrain extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = { message: '', modelList: [] }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '../api/common/train/',
      responseType: 'json'
    }).then(response => {
      console.log(response.data)
    })
  }

  render() {
    return (
      <div>
        <Navbar/>

        <div className="container-fluid">
          <div className="row">
            <Sidebar/>

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="col-12">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h3>
                    <i className="fa fa-fw fa-cogs"></i> 车组
                  </h3>

                  <div className="btn-group pull-right">
                    <a href="#" className="btn btn-outline-secondary btn-sm">
                      <i className="fa fa-fw fa-search"></i> 检索数据
                    </a>
                  </div>
                </div>
              </div>

              {this.state.message && <div className="col-12">
                <div className="alert alert-danger">
                  {this.state.message}
                </div>
              </div>}

              <div className="col-12">
                <div className="list-group">
                  <a href="#" className="list-group-item list-group-item-action">
                    车组
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<MgrTrain/>, document.getElementById('app'))