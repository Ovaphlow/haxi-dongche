import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'

class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    Dropzone.options.dropzone = {
      method: 'post',
      url: '../api/common/upload/schedule',
      paramName: 'file',
      clickable: true,
      acceptedFiles: '.xlsx',
      dictDefaultMessage: '拖放Excel文件到此位置或单击选择文件',
      dictInvalidFileType: '文件类型错误',
      dictFileTooBig: '文件过大',
      dictResponseError: '与服务器连接失败',
      dictCancelUpload: '已取消',
      dictCanceluploadConfirmation: '确认取消上传'
    }
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
                  <i className="fa fa-fw fa-upload"></i> 上传数据文件
                </h3>
              </div>

              <div className="col-12 text-center">
                <p className="lead">选择并上传Excel文件</p>
                <form action="../api/common/upload/schedule" method="post" enctype="multipart/form-data" className="dropzone" id="dropzone"></form>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Index/>, document.getElementById('app'))