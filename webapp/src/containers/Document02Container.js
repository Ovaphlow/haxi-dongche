import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from '../component/Common'

export class Document02SaveSchedule extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-plus" title="新增计划内作业申请" toolbar="Journal02Toolbar" />

          <div className="col-12">
          </div>
        </div>
      </div>  
    )
  }
}

export class Document02UploadScheduleContainer extends React.Component {
  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-upload" title="上传每日作业计划单" toolbar="Journal02Toolbar" />

          <div className="col-12">
            <form action="./api/common/upload/document/02/schedule" className="dropzone" encType="multipart/form-data">
              {/* <input type="file" name="file" /> */}
            </form>
          </div>
        </div>
      </div>  
    )
  }
}