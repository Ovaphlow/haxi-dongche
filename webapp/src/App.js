import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'

import { Navbar } from './component/Common'
import Home from './Home'
import { Login, User, UserPassword } from './User'
import { MessageList } from './Message'
import { AdminDept, AdminDeptList, AdminDeptSave } from './AdminDept'
import { AdminUserList, AdminUserSave, AdminUser } from './AdminUser'
import { AdminTrain, AdminTrainList } from './AdminTrain'
import {
    Journal02, Journal02Detail, Journal02Check, Journal02PjsyContent,
    Journal02Verify, Journal02VerifyLeader, Document02ReviewPbz, Journal02ReviewPgz, Journal02VerifyQc, Journal02VerifyPjsy,
    Journal02VerifyPdd, Journal02RejectList
} from './Journal02'
import {
    Journal02Save, Journal02Update,
    Journal02Save01, Journal02Save02, Journal02Save03, Journal02Save04
} from './Journal02Save'
import { Journal02Dashboard } from './Journal02Beta'
import {
    Journal02AdminMaster, Journal02AdminDetail01, Journal02AdminDetail02,
    Journal02AdminDetail03, Journal02AdminDetail04
} from './Journal02Admin'

import {
  Ledger01Home, Ledger01Save, Ledger01Return, Ledger01ReturnItem, Ledger01Stats
} from './containers/Ledger01Container'

import {
  Document02UploadScheduleContainer, Document02SaveSchedule, Document02StatsIndex
} from './containers/Document02Container'

import { Ledger03Home, Ledger03Save, Ledger03Review, Ledger03ReviewItem } from './ledger03/Ledger03Container'
import { Ledger04Home, Ledger04Save, Ledger04Review, Ledger04ReviewItem } from './ledger04/Ledger04Container'
import { Ledger05Home, Ledger05Save, Ledger05Update } from './ledger05/Ledger05Container'
import { Ledger06Home, Ledger06Save, Ledger06Update } from './ledger06/Ledger06Container'
import { Home as Ledger07Home, Save as Ledger07Save, Update as Ledger07Update } from './ledger07/Ledger07Container'
import { Home as Ledger08Home, Save as Ledger08Save, Update as Ledger08Update } from './ledger08/Ledger08Container'
import { Home as Ledger09Home, Save as Ledger09Save, Update as Ledger09Update } from './ledger09/Ledger09Container'
import { Home as Ledger10Home, Save as Ledger10Save, Update as Ledger10Update } from './ledger10/Ledger10Container'
import {
  Home as Ledger11Home, Save as Ledger11Save, Update as Ledger11Update,
  Review as Ledger11Review
} from './ledger11/Ledger11Container'

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
            <Route path="/message" component={MessageList} />

            <Route path="/admin.dept-list" component={AdminDeptList} />
            <Route path="/admin.dept-save" component={AdminDeptSave} />
            <Route path="/admin.dept" component={AdminDept} />
            <Route path="/admin.user-list" component={AdminUserList} />
            <Route path="/admin.user-save" component={AdminUserSave} />
            <Route path="/admin.user" component={AdminUser} />
            <Route path="/admin.train-list" component={AdminTrainList} />
            <Route path="/admin.train" component={AdminTrain} />

            <Route path="/journal.01" component={Ledger01Home} />
            <Route path="/journal.01-save" component={Ledger01Save} />
            <Route path="/journal.01-return" component={Ledger01Return} />
            <Route path="/journal.01-return.item" component={Ledger01ReturnItem} />
            <Route path="/journal.01-stats" component={Ledger01Stats} />

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
            <Route path="/journal.02-review.p_bz" component={Document02ReviewPbz} />
            <Route path="/journal.02-review.p_gz" component={Journal02ReviewPgz} />
            <Route path="/journal.02-verify.qc" component={Journal02VerifyQc} />
            <Route path="/journal.02-verify.p_jsy" component={Journal02VerifyPjsy} />
            <Route path="/journal.02-verify.p_dd" component={Journal02VerifyPdd} />
            <Route path="/journal.02-stats" component={Document02StatsIndex} />
            <Route path="/journal.02-reject.list" component={Journal02RejectList} />
            <Route path="/journal.02-dashboard" component={Journal02Dashboard} />
            <Route path="/journal.02-upload.schedule" component={Document02UploadScheduleContainer} />
            <Route path="/journal.02-save.schedule" component={Document02SaveSchedule} />
            <Route path="/journal.02-admin.master" component={Journal02AdminMaster} />
            <Route path="/journal.02-admin.detail01" component={Journal02AdminDetail01} />
            <Route path="/journal.02-admin.detail02" component={Journal02AdminDetail02} />
            <Route path="/journal.02-admin.detail03" component={Journal02AdminDetail03} />
            <Route path="/journal.02-admin.detail04" component={Journal02AdminDetail04} />

            <Route path="/ledger.03" component={Ledger03Home} />
            <Route path="/ledger.03-save" component={Ledger03Save} />
            <Route path="/ledger.03-review" component={Ledger03Review} />
            <Route path="/ledger.03-review.item" component={Ledger03ReviewItem} />

            <Route path="/ledger.04" component={Ledger04Home} />
            <Route path="/ledger.04-save" component={Ledger04Save} />
            <Route path="/ledger.04-review" component={Ledger04Review} />
            <Route path="/ledger.04-review.item" component={Ledger04ReviewItem} />

            <Route path="/ledger.05" component={Ledger05Home} />
            <Route path="/ledger.05-save" component={Ledger05Save} />
            <Route path="/ledger.05-update/:id" component={Ledger05Update} />

            <Route path="/ledger.06" component={Ledger06Home} />
            <Route path="/ledger.06-save" component={Ledger06Save} />
            <Route path="/ledger.06-update/:id" component={Ledger06Update} />

            <Route path="/ledger.07" component={Ledger07Home} />
            <Route path="/ledger.07-save" component={Ledger07Save} />
            <Route path="/ledger.07-update/:id" component={Ledger07Update} />

            <Route path="/ledger.08" component={Ledger08Home} />
            <Route path="/ledger.08-save" component={Ledger08Save} />
            <Route path="/ledger.08-update/:id" component={Ledger08Update} />

            <Route path="/ledger.09" component={Ledger09Home} />
            <Route path="/ledger.09-save" component={Ledger09Save} />
            <Route path="/ledger.09-update/:id" component={Ledger09Update} />

            <Route path="/ledger.10" component={Ledger10Home} />
            <Route path="/ledger.10-save" component={Ledger10Save} />
            <Route path="/ledger.10-update/:id" component={Ledger10Update} />

            <Route path="/ledger.11" component={Ledger11Home} />
            <Route path="/ledger.11-save" component={Ledger11Save} />
            <Route path="/ledger.11-update/:id" component={Ledger11Update} />
            <Route path="/ledger.11-review" component={Ledger11Review} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
