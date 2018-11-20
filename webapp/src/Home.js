import React, { Component } from 'react'

import { PageTitle, PageTitle2, Sidebar } from './component/Common'

export default class Home extends Component {
  render() {
    return (
      <div className="row">
        <Sidebar />

        <div rol="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <PageTitle title="首页" />
          <PageTitle2 title="选择分类" />

          <div className="row">
            <div className="col-4 offset-1">
              <p><br /></p>
              <p><br /></p>
              <h1 className="text-center">
                <a href="./#/journal.01">
                  <i className="fa fa-fw fa-5x fa-list-alt"></i>
                  <br />
                  账项
              </a>
              </h1>
            </div>

            <div className="col-4 offset-2">
              <p><br /></p>
              <p><br /></p>
              <h1 className="text-center">
                <a href="./#/journal.02">
                  <i className="fa fa-fw fa-5x fa-newspaper-o"></i>
                  <br />
                  单据
                </a>
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}