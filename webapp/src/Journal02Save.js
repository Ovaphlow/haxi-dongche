import React from 'react'

import Sidebar from './component/Sidebar'
import PageTitle from './component/PageTitle'
import PageTitle2 from './component/PageTitle2'
import Journal02Master from './component/Journal02Master'

export default class Journal02Save extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-plus" title="新增申请" toolbar="Journal02Toolbar" />

          <Journal02Master mode="save" />
        </div>
      </div>
    )
  }
}
