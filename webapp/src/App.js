import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'

import Navbar from './component/Navbar'
import Home from './Home'
import Login from './Login'
import User from './User'
import UserPassword from './UserPassword'
import AdminDeptList from './AdminDeptList'
import AdminDeptSave from './AdminDeptSave'
import AdminDept from './AdminDept'
import AdminUserList from './AdminUserList'
import AdminUserSave from './AdminUserSave'
import AdminUser from './AdminUser'
import AdminTrainList from './AdminTrainList'
import AdminTrain from './AdminTrain'
import Journal01 from './Journal01'
import Journal01Save from './Journal01Save'
import Journal01Borrow from './Journal01Borrow'
import Journal01Return from './Journal01Return'
import Journal01Stats from './Journal01Stats'
import Journal02 from './Journal02'
import Journal02Detail from './Journal02Detail'
import Journal02Save from './Journal02Save'
import Journal02Update from './Journal02Update'
import Journal02Check from './Journal02Check'
import Journal02PjsyContent from './Journal02PjsyContent'
import Journal02Verify from './Journal02Verify'
import Journal02VerifyLeader from './Journal02VerifyLeader'
import Journal02Save01 from './Journal02Save01'
import Journal02Save02 from './Journal02Save02'
import Journal02Save03 from './Journal02Save03'
import Journal02Save04 from './Journal02Save04'
import Journal02VerifyPbz from './Journal02VerifyPbz'
import Journal02VerifyQc from './Journal02VerifyQc'
import Journal02VerifyPdd from './Journal02VerifyPdd'
import Journal02Stats from './Journal02Stats'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container-fluid">
          <Navbar />

          <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/user" component={User} />
            <Route path="/user.password" component={UserPassword} />
            <Route path="/admin.dept-list" component={AdminDeptList} />
            <Route path="/admin.dept-save" component={AdminDeptSave} />
            <Route path="/admin.dept" component={AdminDept} />
            <Route path="/admin.user-list" component={AdminUserList} />
            <Route path="/admin.user-save" component={AdminUserSave} />
            <Route path="/admin.user" component={AdminUser} />
            <Route path="/admin.train-list" component={AdminTrainList} />
            <Route path="/admin.train" component={AdminTrain} />
            <Route path="/journal.01" component={Journal01} />
            <Route path="/journal.01-save" component={Journal01Save} />
            <Route path="/journal.01-borrow" component={Journal01Borrow} />
            <Route path="/journal.01-return" component={Journal01Return} />
            <Route path="/journal.01-stats" component={Journal01Stats} />
            <Route path="/journal.02" component={Journal02} />
            <Route path="/journal.02-detail" component={Journal02Detail} />
            <Route path="/journal.02-save" component={Journal02Save} />
            <Route path="/journal.02-update" component={Journal02Update} />
            <Route path="/journal.02-check" component={Journal02Check} />
            <Route path="/journal.02-p_jsy.content" component={Journal02PjsyContent} />
            <Route path="/journal.02-verify" component={Journal02Verify} />
            <Route path="/journal.02-verify.leader" component={Journal02VerifyLeader} />
            <Route path="/journal.02-save.01" component={Journal02Save01} />
            <Route path="/journal.02-save.02" component={Journal02Save02} />
            <Route path="/journal.02-save.03" component={Journal02Save03} />
            <Route path="/journal.02-save.04" component={Journal02Save04} />
            <Route path="/journal.02-verify.p_bz" component={Journal02VerifyPbz} />
            <Route path="/journal.02-verify.qc" component={Journal02VerifyQc} />
            <Route path="/journal.02-verify.p_dd" component={Journal02VerifyPdd} />
            <Route path="/journal.02-stats" component={Journal02Stats} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
