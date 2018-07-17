import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'

class Index extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = { alertList: [] }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/schedule/second/CRH5A',
      responseType: 'json'
    }).then(response => {
      let list = []
      response.data.content.map(item => {
        if (item.remark !== '正常') list.push(item)
        this.setState({ alertList: list })
      })
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
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  <i className="fa fa-fw fa-warning"></i> 修程预警
                </h3>
              </div>

              <div className="lead">
                <div className="pull-right" id="toolbar"></div>
              </div>

              <div className="col-12">
              </div>

              <div className="list-group">
                {this.state.alertList.map(item =>
                  <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div calssName="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">
                        {item.train} [{item.model}]
                        <span className="pull-right badge badge-danger">报警</span>
                      </h5>
                    </div>
                    <ul className="list-inline">
                      <li className="list-inline-item">更新时间：<span className="text-secondary">{item.update_time.split('T')[0]}</span></li>
                      <li className="list-inline-item">上传时间：<span className="text-secondary">{item.upload_time.split('T')[0]}</span></li>
                      <li className="list-inline-item">当前里程：<span className="text-danger"><strong>{item.total_mileage}</strong></span></li>
                      <br/>
                      <li className="list-inline-item">上次修程里程：{item.last_total_mileage}</li>
                      <li className="list-inline-item">上次修程日期：<span className="text-secondary">{item.last_date.split('T')[0]}</span></li>
                      <li className="list-inline-item">下次修程里程：{item.next_mileage}</li>
                      <li className="list-inline-item">下次修程日期：<span className="text-secondary">{item.next_date.split('T')[0]}</span></li>
                    </ul>
                  </a>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Index/>, document.getElementById('app'))