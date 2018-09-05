import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import { Message } from './component/Common'
import Journal02Item from './component/Journal02Item'

export default class Journal02RejectList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '', list: [] }
  }

  componentDidMount() {
    fetch('./api/journal02/reject/')
    .then(res => res.json())
    .then(response => this.setState({ list: response.content }))
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-reply" title="已驳回申请" toolbar="Journal02Toolbar" />

          {this.state.message &&
            <Message message={this.state.message} />
          }

          <div className="col-12">
            <ul className="list-group">
              {this.state.list.map(item => 
                <Journal02Item key={item.id} item={item} />
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}