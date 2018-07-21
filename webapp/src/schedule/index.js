import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'

class AlertItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a href={"./train/" + this.props.item.train} className="list-group-item list-group-item-action flex-column align-items-start">
        <div calssName="d-flex w-100 justify-content-between">
          <h5 className="mb-1">
            {this.props.item.train} [{this.props.item.model}]
            <span className="pull-right badge badge-danger">
              {this.props.item.remark}
            </span>
          </h5>
        </div>
        <ul className="list-inline">
          <li className="list-inline-item">更新时间：<span className="text-secondary">{this.props.item.update_time.split('T')[0]}</span></li>
          <li className="list-inline-item">上传时间：<span className="text-secondary">{this.props.item.upload_time.split('T')[0]}</span></li>
          <li className="list-inline-item">当前里程：<span className="text-primary"><strong>{this.props.item.total_mileage}</strong></span></li>
          <br/>
          <li className="list-inline-item">上次修程里程：{this.props.item.last_total_mileage}</li>
          <li className="list-inline-item">上次修程日期：<span className="text-secondary">{this.props.item.last_date.split('T')[0]}</span></li>
          <li className="list-inline-item">下次修程里程：{this.props.item.next_mileage}</li>
          <li className="list-inline-item">下次修程日期：<span className="text-primary">{this.props.item.next_date.split('T')[0]}</span></li>
        </ul>
      </a>
    )
  }
}

class Index extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      alert5APEjx: [],
      alert5GPEjx: [],
      alert380BGPEjx: [],
      alert5APTs: [],
      alert5GPTs: [],
      alert5APXx: [],
      alert5GPXx: [],
      alert380BGPXx: [],
      alert5APWxz: [],
      alert5GPWxz: [],
      alert5AM4: [],
      alert5GM4: [],
      alert380BGI2: [],
      alert380BGM3: [],
    }
  }

  componentDidMount() {
    // 二级修：5A
    axios({
      method: 'get',
      url: './api/schedule/second/CRH5A',
      responseType: 'json'
    }).then(response => {
      let list = this.state.alert5APEjx
      response.data.content.map(item => {
        if (item.remark !== '正常') list.push(item)
        this.setState({ alert5APEjx: list })
      })
    })

    // 二级修：5G
    axios({
      method: 'get',
      url: './api/schedule/second/CRH5G',
      responseType: 'json'
    }).then(response => {
      let list = this.state.alert5GPEjx
      response.data.content.map(item => {
        if (item.remark !== '正常') list.push(item)
        this.setState({ alert5GPEjx: list })
      })
    })

    // 探伤：5A
    axios({
      method: 'get',
      url: './api/schedule/detectionFlaw/CRH5A',
      responseType: 'json'
    }).then(response => {
      console.info(response.data)
      let list = this.state.alert5APTs
      response.data.content.map(item => {
        if (item.remark !== '正常') list.push(item)
        this.setState({ alert5APTs: list })
      })
    })

    // 探伤：5G
    axios({
      method: 'get',
      url: './api/schedule/detectionFlaw/CRH5G',
      responseType: 'json'
    }).then(response => {
      console.info(response.data)
      let list = this.state.alert5GPTs
      response.data.content.map(item => {
        if (item.remark !== '正常') list.push(item)
        this.setState({ alert5GPTs: list })
      })
    })

    // 镟修 5A
    axios({
      method: 'get',
      url: './api/schedule/turnRepair/CRH5A',
      responseType: 'json'
    }).then(response => {
      console.info(response.data)
      let list = this.state.alert5APXx
      response.data.content.map(item => {
        if (item.remark !== '正常') list.push(item)
        this.setState({ alert5APXx: list })
      })
    })

    // 镟修 5G
    axios({
      method: 'get',
      url: './api/schedule/turnRepair/CRH5G',
      responseType: 'json'
    }).then(response => {
      console.info(response.data)
      let list = this.state.alert5GPXx
      response.data.content.map(item => {
        if (item.remark !== '正常') list.push(item)
        this.setState({ alert5GPXx: list })
      })
    })

    // 万向轴 5A
    axios({
      method: 'get',
      url: './api/schedule/shaft/CRH5A',
      responseType: 'json'
    }).then(response => {
      console.info(response.data)
      let list = this.state.alert5APWxz
      response.data.content.map(item => {
        if (item.remark !== '正常') list.push(item)
        this.setState({ alert5APWxz: list })
      })
    })

    // 万向轴 5G
    axios({
      method: 'get',
      url: './api/schedule/shaft/CRH5G',
      responseType: 'json'
    }).then(response => {
      console.info(response.data)
      let list = this.state.alert5GPWxz
      response.data.content.map(item => {
        if (item.remark !== '正常') list.push(item)
        this.setState({ alert5GPWxz: list })
      })
    })

    // M4 5A
    axios({
      method: 'get',
      url: './api/schedule/m4/CRH5A',
      responseType: 'json'
    }).then(response => {
      console.info(response.data)
      let list = this.state.alert5AM4
      response.data.content.map(item => {
        if (item.remark !== '正常') list.push(item)
        this.setState({ alert5AM4: list })
      })
    })

    // M4 5G
    axios({
      method: 'get',
      url: './api/schedule/m4/CRH5G',
      responseType: 'json'
    }).then(response => {
      console.info(response.data)
      let list = this.state.alert5GM4
      response.data.content.map(item => {
        if (item.remark !== '正常') list.push(item)
        this.setState({ alert5GM4: list })
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

              <p className="lead">CRH5A / CRH5G / CRH380BG 车型二级修 报警</p>
              <div className="list-group">
                {this.state.alert5APEjx.map(item =>
                  <AlertItem item={item} />
                )}
                {this.state.alert5GPEjx.map(item =>
                  <AlertItem item={item} />
                )}
              </div>

              <p className="lead"><br/>CRH5A / CRH5G 车型探伤 报警</p>
              <div className="list-group">
                {this.state.alert5APTs.map(item =>
                  <AlertItem item={item} />
                )}
                {this.state.alert5GPTs.map(item =>
                  <AlertItem item={item} />
                )}
              </div>

              <p className="lead"><br/>CRH5A / CRH5G / CRH380BG 车型镟修 报警</p>
              <div className="list-group">
                {this.state.alert5APXx.map(item => {
                  <AlertItem item={item} />
                })}
                {this.state.alert5GPXx.map(item => {
                  <AlertItem item={item} />
                })}
                {this.state.alert380BGPXx.map(item => {
                  <AlertItem item={item} />
                })}
              </div>

              <p className="lead"><br/>CRH5A / CRH5G 车型万向轴 报警</p>
              <div className="list-group">
                {this.state.alert5APWxz.map(item => {
                  <AlertItem item={item} />
                })}
                {this.state.alert5GPWxz.map(item => {
                  <AlertItem item={item} />
                })}
              </div>

              <p className="lead"><br/>CRH5A / CRH5G 车型M4 报警</p>
              <div className="list-group">
                {this.state.alert5AM4.map(item =>
                  <AlertItem item={item} />
                )}
                {this.state.alert5GM4.map(item =>
                  <AlertItem item={item} />
                )}
              </div>

              <p className="lead"><br/>CRH380BG 车型I2 报警</p>
              <div className="list-group">
                {this.state.alert380BGI2.map(item =>
                  <AlertItem item={item} />
                )}
              </div>

              <p className="lead"><br/>CRH380BG 车型M3 报警</p>
              <div className="list-group">
                {this.state.alert380BGM3.map(item =>
                  <AlertItem item={item} />
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