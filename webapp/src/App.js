import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'

import Navbar from './component/Navbar'
import Home from './Home'
import Login from './Login'
import Journal01 from './Journal01'
import Journal01Save from './Journal01Save'
import Journal01Borrow from './Journal01Borrow'
import Journal01Return from './Journal01Return'
import Journal01Stats from './Journal01Stats'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container-fluid">
          <Navbar />

          <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route exact path="/journal.01" component={Journal01} />
            <Route path="/journal.01-save" component={Journal01Save} />
            <Route path="/journal.01-borrow" component={Journal01Borrow} />
            <Route path="/journal.01-return" component={Journal01Return} />
            <Route path="/journal.01-stats" component={Journal01Stats} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
