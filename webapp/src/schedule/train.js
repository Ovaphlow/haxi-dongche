import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'

class Train extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', p_xc: [], train: {} }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '../api/common/schedule/train/' + urlParameter('train') + '/model',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      if (response.data.content.length !== 1) {
        this.setState({ message: '未检索到车组信息' })
        return false
      }
      this.setState({ train: {
        train: urlParameter('train'),
        model: response.data.content[0].model
      }})
      if (response.data.content[0].model === 'CRH5A' || response.data.content[0].model === 'CRH5G') {
        let xc = ['二级修', '探伤', '镟修', '万向轴', 'M4']
        this.setState({ p_xc: xc })
      } else if (response.data.content[0].model === 'CRH380BG') {
        let xc = ['二级修', '镟修', 'I2', 'M3']
        this.setState({ p_xc: xc })
      }
    })
  }

  submit() {
    if (this.state.train.model === 'CRH5A' || this.state.train.model === 'CRH5G') {
      if (document.getElementById('p_xc').value === '二级修') {
        axios({
          method: 'get',
          url: './api/schedule/insertSecond/' + this.state.train.train,
          responseType: 'json'
        }).then(response => {
          if (response.data.message) this.setState({ message: response.data.message })
        }).catch(response => {
          this.setState({ message: '服务器通信异常' })
        })
      } else if (document.getElementById('p_xc').value === '探伤') {
        axios({
          method: 'get',
          url: './api/schedule/insertDetectionFlaw/' + this.state.train.train,
          responseType: 'json'
        }).then(response => {
          if (response.data.message) this.setState({ message: response.data.message })
        }).catch(err => {
          this.setState({ message: '服务器通信异常' })
        })
      } else if (document.getElementById('p_xc').value === '镟修') {
        axios({
          method: 'get',
          url: './api/schedule/insertTurnRepair/' + this.state.train.train,
          responseType: 'json'
        }).then(response => {
          if (response.data.message) this.setState({ message: response.data.message })
        }).catch(err => {
          this.setState({ message: '服务器通信异常' })
        })
      } else if (document.getElementById('p_xc').value === '万向轴') {
        axios({
          method: 'get',
          url: './api/schedule/insertShaft/' + this.state.train.train,
          responseType: 'json'
        }).then(response => {
          if (response.data.message) this.setState({ message: response.data.message })
        }).catch(err => {
          this.setState({ message: '服务器通信异常' })
        })
      } else if (document.getElementById('p_xc').value === 'M4') {
        axios({
          method: 'get',
          url: './api/schedule/insertM4/' + this.state.train.train,
          responseType: 'json'
        }).then(response => {
          if (response.data.message) this.setState({ message: response.data.message })
        }).catch(err => {
          this.setState({ message: '服务器通信异常' })
        })
      }
    } else if (this.state.train.model === 'CRH380BG') {
      if (document.getElementById('p_xc').value === '二级修') {
        axios({
          method: 'get',
          url: './api/schedule/insertbgSecond/' + this.state.train.train,
          responseType: 'json'
        }).then(response => {
          if (response.data.message) this.setState({ message: response.data.message })
        }).catch(err => {
          this.setState({ message: '服务器通信异常' })
        })
      } else if (document.getElementById('p_xc').value === '镟修') {
        axios({
          method: 'get',
          url: './api/schedule/insertturnbgRepair/' + this.state.train.train,
          responseType: 'json'
        }).then(response => {
          if (response.data.message) this.setState({ message: response.data.message })
        }).catch(err => {
          this.setState({ message: '服务器通信异常' })
        })
      } else if (document.getElementById('p_xc').value === 'I2') {
        axios({
          method: 'get',
          url: './api/schedule/inserti2bgRepair/' + this.state.train.train,
          responseType: 'json'
        }).then(response => {
          if (response.data.message) this.setState({ message: response.data.message })
        }).catch(err => {
          this.setState({ message: '服务器通信异常' })
        })
      } else if (document.getElementById('p_xc').value === 'M3') {
        axios({
          method: 'get',
          url: './api/schedule/insertm3Repair/' + this.state.train.train,
          responseType: 'json'
        }).then(response => {
          if (response.data.message) this.setState({ message: response.data.message })
        }).catch(err => {
          this.setState({ message: '服务器通信异常' })
        })
      }
    }
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container-fluid">
          <div className="row">
            <Sidebar/>

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  <i className="fa fa-fw fa-train"></i> 车组
                </h3>
              </div>

              {this.state.message && <div className="row">
                <div className="col-12">
                  <div className="alert alert-danger">{this.state.message}</div>
                </div>
              </div>}

              <div className="row">
                <div className="col-4">
                  <select className="form-control" id="p_xc">
                    {this.state.p_xc.map(item => 
                      <option value={item}>{item}</option>
                    )}
                  </select>
                </div>
                <div className="col-4">
                  <button type="button" className="btn btn-danger" onClick={this.submit}>
                    <i className="fa fa-fw fa-check-square-o"></i> 重置
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Train />, document.getElementById('app'))