import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Toolbar from './component/Journal01Toolbar'

import './dashboard.css'

class Journal01Stats extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/journal01/stats',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      var chart = echarts.init(document.getElementById('chart'))
      var option = {
        title: {
          text: '借出禁动牌次数 数据统计',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '借出次数',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: response.data.content,
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        ]
      }
      chart.setOption(option)
    }).catch(err => {
      this.setState({ message: `服务器通信异常 ${err}` })
    })
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container-fluid">
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
                <i className="fa fa-pie-chart fa-fw"></i> 数据统计
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
                <div className="col-12 text-center">
                  <div id="chart" style={{ width: '100%', height: '40em' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Journal01Stats />, document.getElementById('app'))
