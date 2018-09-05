import React from 'react'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'
import { BackButton } from './component/Common'
import { ReviewPddSubmit } from './component/Journal02Util'

export default class Journal02VerifyPdd extends React.Component {
  componentDidMount() {
    let auth = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!auth) window.location.href = './#/login'
    fetch(`./api/journal02/${sessionStorage.getItem('journal02')}`)
    .then(res => res.json())
    .then(response => {
      if (response.content.remark) {
        document.getElementById('remark').value = response.content.remark
      }
    })
  }

  render() {
    return (
      <div className="row">
        <Sidebar category='单据' />

        <div role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="02.一体化作业申请单" />
          <PageTitle2 fa="fa-archive" title="作业完成销记" toolbar="Journal02Toolbar" />

          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>调度员</h5>
              </div>

              <div className="card-body row">
                <div className="col-12">
                  <div className="form-group">
                    <label>备注</label>
                    <textarea rows="3" className="form-control" id="remark"></textarea>
                  </div>
                </div>

                <div className="col-12">
                  <BackButton />
                  <div className="btn-group pull-right">
                    <ReviewPddSubmit />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
