import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'

class MgrModel extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = { message: '', tag: '', model: {} }
    this.change = this.change.bind(this)
    this.submit = this.submit.bind(this)
  }

  change(event) {
    this.setState({ model: { value: event.target.value } })
  }

  submit() {
    this.setState({ message: '' })

    if (!!!document.getElementById('name').value) {
      this.setState({ message: '请完整填写车型信息。' })
      return false
    }

    if (this.state.tag === 'post') {
      axios({
        method: 'post',
        url: '../api/common/model',
        data: this.state.model,
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        location.href = './mgr.model-list.html'
      })
    } else if (this.state.tag === 'put') {
      axios({
        method: 'put',
        url: '../api/common/model/' + urlParameter('uuid'),
        data: this.state.model,
        responseType: 'json'
      }).then(response => {
        if (response.data.message) {
          this.setState({ message: response.data.message })
          return false
        }
        location.href = './mgr.model-list.html'
      })
    }
  }

  componentDidMount() {
    if (urlParameter('uuid')) {
      this.setState({ tag: 'put' })

      axios({
        method: 'get',
        url: '../api/common/model/' + urlParameter('uuid'),
        responseType: 'json'
      }).then(response => {
        if (response.data.content.length === 1) {
          this.setState({ model: response.data.content[0] })
        } else {
          this.setState({ message: response.data.message || '数据异常。' })
        }
      })
    } else this.setState({ tag: 'post' })
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
                    <i className="fa fa-fw fa-cogs"></i> 车型
                  </h3>

                  <div className="btn-group pull-right">
                    <a href="./mgr.model-list.html" className="btn btn-outline-secondary btn-sm">
                      <i className="fa fa-fw fa-search"></i> 检索数据
                    </a>

                    <a href="./mgr.model.html" className="btn btn-outline-secondary btn-sm">
                      <i className="fa fa-fw fa-plus"></i> 添加车型
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label>车型</label>
                  <input type="text" className="form-control" id="name" value={this.state.model.value} onChange={this.change}/>
                </div>
              </div>

              <div className="col-12">
                <div className="btn-group pull-right">
                  <a href="./mgr.model-list.html" className="btn btn-secondary">
                    <i className="fa fa-fw fa-arrow-left"></i> 返回
                  </a>

                  <button type="button" className="btn btn-primary" onClick={this.submit}>
                    <i className="fa fa-fw fa-check-square-o"></i> 确定
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

ReactDOM.render(<MgrModel/>, document.getElementById('app'))