import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'

class Index extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>

        <div className="container">
          <br/><br/>
          <main>
            <div className="row">
              <div className="col-4 offset-1">
                <p><br/></p>
                <p><br/></p>
                <p><br/></p>
                <h1 className="text-center">
                  <a href="./journal.01.html">
                    <i className="fa fa-fw fa-5x fa-list-alt"></i>
                    <br/>
                    账项
                  </a>
                </h1>
              </div>

              <div className="col-4 offset-2">
                <p><br/></p>
                <p><br/></p>
                <p><br/></p>
                <h1 className="text-center">
                  <a href="./journal.02.html">
                    <i className="fa fa-fw fa-5x fa-newspaper-o"></i>
                    <br/>
                    单据
                  </a>
                </h1>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Index/>, document.getElementById('app'))