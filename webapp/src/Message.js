import React from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import { MessageReadButton } from './component/Common'

export class MessageList extends React.Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  componentDidMount() {
    moment.locale('zh-cn')
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) {
      window.location.href = './#/login'
      return false
    }
    fetch(`./api/common/message/${auth.id}/`)
    .then(res => res.json())
    .then(response => {
      this.setState({ list: response.content })
    })
  }

  render() {
    return (
      <div className="row">
        <Sidebar />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="通知" />

          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <PageTitle2 fa="fa-comments-o" title="通知列表" />
                </div>

                <ul className="list-group">
                  {this.state.list.map(item =>
                    <li className="list-group-item" key={item.id}>
                      <strong>{item.title}</strong>
                      <span className="text-secondary">（发送自：{item.send_by}）</span>
                      <span className="pull-right text-secondary">
                        &nbsp;
                        {moment(item.send_time).from(moment().utc(true))}
                      </span>
                      <div className="clearfix"></div>
                      <p className="mt-3">{item.content}</p>
                      <div className="clearfix"></div>
                      <div className="btn-group pull-right">
                        <MessageReadButton id={item.id} />
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}