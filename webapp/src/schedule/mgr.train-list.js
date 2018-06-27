import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'

class MgrTrainList extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = { message: '', trainList: [] }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '../api/common/train',
      responseType: 'json'
    }).then(response => {
      this.setState({ trainList: response.data.content })
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
                    <a href="./mgr.train-list.html" className="btn btn-outline-secondary btn-sm">
                      <i className="fa fa-fw fa-search"></i> 检索数据
                    </a>

                    <a href="./mgr.train.html" className="btn btn-outline-secondary btn-sm">
                      <i className="fa fa-fw fa-plus"></i> 添加车组
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
                  {this.state.trainList.map(item =>
                    <a href={'./mgr.train.html?uuid=' + item.uuid} className="list-group-item list-group-item-action">
                      {item.name} <span className="text-secondary">( {item.model} )</span>
                    </a>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<MgrTrainList/>, document.getElementById('app'))