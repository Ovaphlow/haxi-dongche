import axios from 'axios'
import React from 'react'
import moment from 'moment'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import { Journal02Detail03 } from './component/Journal02Detail'
import { TrainList, CarriageList } from './component/Common'

export default class Journal02Save03 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', trainList: [] }
    this.save = this.save.bind(this)
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'

    document.getElementById('date').value = moment().format('YYYY-MM-DD')
    document.getElementById('operator').value = auth.name
  }

  submit() {
    axios({
      method: 'post',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/03/',
      data: {
        name: document.getElementById('name').value,
        train: document.getElementById('component.train-list').value,
        carriage: document.getElementById("component.carriage-list").value,
        position: document.getElementById('position').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        production_date: document.getElementById('production_date').value,
        reason: document.getElementById('reason').value,
        p_gywj: document.getElementById('p_gywj').value,
        p_ljbs: document.getElementById('p_ljbs').value,
        component_sn_old: document.getElementById('component_sn_old').value,
        component_sn_new: document.getElementById('component_sn_new').value,
        p_bjaz: document.getElementById('p_bjaz').value,
        operator: document.getElementById('operator').value
      },
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      window.location.reload(true)
    }).catch(err => this.setState({ message: '服务器通信异常' }))
  }

  save() {
    window.location.href = './#/journal.02-verify.leader'
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-archive" title="作业完成销记" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <div className="col-12">
              <div className="alert alert-danger">
                {this.state.message}
              </div>
            </div>
          }

          <div className="col-12">
            <div className="card">
              <div className="card-body row">
                <div className="col-12">
                  <p className="lead">动车组关键配件更换记录表</p>
                </div>

                <div className="form-group col-4">
                  <label>部件名称</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group col-2">
                  <label>车组</label>
                  <TrainList />
                </div>
                <div className="form-group col-2">
                  <label>车号</label>
                  <CarriageList />
                </div>
                <div className="form-group col-4">
                  <label>位置</label>
                  <input type="text" className="form-control" id="position" />
                </div>

                <div className="clearfix"></div>

                <div className="form-group col-4">
                  <label>更换日期</label>
                  <input type="date" className="form-control" id="date" />
                </div>
                <div className="form-group col-4">
                  <label>更换时间 (格式：12:34:56 或 123456)</label>
                  <input type="text" className="form-control" id="time" />
                </div>
                <div className="form-group col-4">
                  <label>生产日期</label>
                  <input type="text" className="form-control" id="production_date" />
                </div>

                <div className="clearfix"></div>

                <div className="form-group col-12">
                  <label>更换原因</label>
                  <input type="text" className="form-control" id="reason" />
                </div>

                <div className="clearflx"></div>

                <div className="form-group col-3">
                  <label>工艺文件及各步骤</label>
                  <select className="form-control" id="p_gywj">
                    <option value="是">已阅读并掌握</option>
                    <option value="否">未阅读并掌握</option>
                  </select>
                </div>
                <div className="form-group col-3">
                  <label>力矩扳手</label>
                  <select className="form-control" id="p_ljbs">
                    <option value="是">已校验</option>
                    <option value="否">未校验</option>
                  </select>
                </div>
                <div className="col-3 form-group">
                  <label>换下部件序列号</label>
                  <input type="text" className="form-control" id="component_sn_old" />
                </div>
                <div className="col-3 form-group">
                  <label>换上部件序列号</label>
                  <input type="text" className="form-control" id="component_sn_new" />
                </div>

                <div className="clearfix"></div>

                <div className="col-6 form-group">
                  <label>部件、螺栓力矩、防松标记</label>
                  <select className="form-control" id="p_bjaz">
                    <option value="是">部件安装良好，螺栓力矩已紧固，放松标记已涂打</option>
                    <option value="否">否</option>
                  </select>
                </div>
                <div className="col-6 form-group">
                  <label>作业者</label>
                  <input type="text" className="form-control" id="operator" />
                </div>

                <div className="col-12">
                  <div className="btn-group pull-right">
                    <button type="button" className="btn btn-secondary" onClick={this.submit}>
                      <i className="fa fa-fw fa-plus"></i>
                      新增记录
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row"><br /></div>

          <Journal02Detail03 />

          <div className="col-12">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-primary pull-right" onClick={this.save}>
                <i className="fa fa-fw fa-check-square-o"></i>
                完成
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
