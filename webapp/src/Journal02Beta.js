import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import Journal02Item from './component/Journal02Item'

// 集中显示待处理任务
// 不完整
// 未使用
export class Journal02Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      listApprovePjsy: [],
      listApprovePbz: [],
      listApproveQc: [],
      listApprovePdd: [],
      listApprovePzbsz: [],
      listReviewLeader: [],
      listReviewPbz: [],
      listReviewQc: [],
      listReviewPjsy: [],
      listReviewPdd: []
    }
  }

  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (auth.auth_p_jsy) {
      fetch(`./api/journal02/jsy/?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ listApprovePjsy: response.content })
      })
      .catch(err => window.console && console.error(err))
    }
    if (auth.auth_p_dd) {
      fetch(`./api/journal02/dd/?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ listApprovePdd: response.content })
      })
      .catch(err => window.console && console.error(err))
    }
    if (auth.auth_p_zbsz) {
      fetch(`./api/journal02/zbsz/?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ listApprovePzbsz: response.content })
      })
      .catch(err => window.console && console.error(err))
    }
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-list-alt" title="待处理申请" toolbar="Journal02Toolbar" />

          <div className="col-12">
            {this.state.listApprovePjsy.length > 0 &&
              <ul className="list-group">
                <p className="lead">技术员审核</p>
                {this.state.listApprovePjsy.map(item =>
                  <Journal02Item key={item.id} item={item} />
                )}
              </ul>
            }
            {this.state.listApprovePbz.length > 0 &&
              <ul className="list-group">
                <p className="lead">班组确认</p>
                {this.state.listApprovePbz.map(item =>
                  <Journal02Item key={item.id} item={item} />
                )}
              </ul>
            }
            {this.state.listApproveQc.length > 0 &&
              <ul className="list-group">
                <p className="lead">质检确认</p>
                {this.state.listApproveQc.map(item =>
                  <Journal02Item key={item.id} item={item} />
                )}
              </ul>
            }
            {this.state.listApprovePdd.length > 0 &&
              <ul className="list-group">
                <p className="lead">调度审核</p>
                {this.state.listApprovePdd.map(item =>
                  <Journal02Item key={item.id} item={item} />
                )}
              </ul>
            }
            {this.state.listApprovePzbsz.length > 0 &&
              <ul className="list-group">
                <p className="lead">值班所长审核</p>
                {this.state.listApprovePzbsz.map(item =>
                  <Journal02Item key={item.id} item={item} />
                )}
              </ul>
            }
            {this.state.listReviewLeader.length > 0 &&
              <ul className="list-group">
                <p className="lead">作业负责人销记</p>
                {this.state.listReviewLeader.map(item =>
                  <Journal02Item key={item.id} item={item} />
                )}
              </ul>
            }
            {this.state.listReviewPbz.length > 0 &&
              <ul className="list-group">
                <p className="lead">班组销记</p>
                {this.state.listReviewPbz.map(item =>
                  <Journal02Item key={item.id} item={item} />
                )}
              </ul>
            }
            {this.state.listReviewQc.length > 0 &&
              <ul className="list-group">
                <p className="lead">质检销记</p>
                {this.state.listReviewQc.map(item =>
                  <Journal02Item key={item.id} item={item} />
                )}
              </ul>
            }
            {this.state.listReviewPjsy.length > 0 &&
              <ul className="list-group">
                <p className="lead">技术员销记</p>
                {this.state.listReviewPjsy.map(item =>
                  <Journal02Item key={item.id} item={item} />
                )}
              </ul>
            }
            {this.state.listReviewPdd.length > 0 &&
              <ul className="list-group">
                <p className="lead">调度销记</p>
                {this.state.listReviewPdd.map(item =>
                  <Journal02Item key={item.id} item={item} />
                )}
              </ul>
            }
          </div>
        </div>
      </div>
    )
  }
}
