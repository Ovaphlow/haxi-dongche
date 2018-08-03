import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './component/Navbar'
import Sidebar from './component/SidebarA'
import Toolbar from './component/Journal02Toolbar'

class Journal02Save extends React.Component {
  constructor(props) {
    super(props)

    this.state = { message: '', trainList: [] }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: './api/common/train',
      responseType: 'json'
    }).then(response => {
      if (response.data.message) {
        this.setState({ message: response.data.message })
        return false
      }
      this.setState({ trainList: response.data.content })
    }).catch(err => {
      this.setState({ message: '' })
    })
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container-fluid">
          <div className="row">
            <Sidebar />

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>
                  02.一体化作业申请单
                </h3>
              </div>

              <div className="lead">
                <Toolbar className="pull-right" />
                <i className="fa fa-plus fa-fw"></i> 新增申请
                <br />
                <br />
              </div>

              {this.state.message &&
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-danger" role="alert">
                      {{ message }}
                    </div>
                  </div>
                </div>
              }

              <table className="table table-bordered table-sm" style={{border: '2px solid black'}}>
                <tbody>
                  <tr>
                    <td rowspan="2" width="20%" className="align-middle">CRH</td>
                    <td>哈尔滨动车段哈尔滨西动车组运用所</td>
                    <td width="15%"></td>
                  </tr>
                  <tr>
                    <td colspan="2">一体化作业申请单</td>
                  </tr>
                </tbody>
              </table>

              <table class="table table-bordered table-dark table-sm" style={{border: '2px solid black'}}>
                <tbody>
                  <tr>
                    <td width="15%" className="text-center">申请单位</td>
                    <td colspan="3"><input type="text" className="form-control form-control-sm" /></td>
                  </tr>
                  <tr>
                    <td width="15%" className="text-center">申请人</td>
                    <td width="35%" className="text-center"><input type="text" className="form-control form-control-sm" /></td>
                    <td width="15%" className="text-center">联系电话</td>
                    <td width="35%" className="text-center"><input type="text" className="form-control form-control-sm" /></td>
                  </tr>
                  <tr>
                    <td width="15%" className="text-center">作业负责人</td>
                    <td width="35%" className="text-center"><input type="text" className="form-control form-control-sm" /></td>
                    <td width="15%" className="text-center">联系电话</td>
                    <td width="35%" className="text-center"><input type="text" className="form-control form-control-sm" /></td>
                  </tr>
                  <tr>
                    <td width="15%" className="text-center">作业车组号</td>
                    <td colspan="3">
                      <select className="form-control form-control-sm">
                        {this.state.trainList.map(item =>
                          <option value={item.name}>{item.name} ({item.model})</option>
                        )}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td width="15%" className="text-center">申请作业时间</td>
                    <td colspan="3">
                    </td>
                  </tr>
                </tbody>
              </table>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Journal02Save />, document.getElementById('app'))

          // import navbar from './navbar-2.html'
          // document.getElementById('navbar').innerHTML = navbar

          // import sidebar from './sidebar-b.html'
          // document.getElementById('sidebar').innerHTML = sidebar

          // import toolbar from './journal.02-toolbar.html'
          // document.getElementById('toolbar').innerHTML = toolbar

          // const user = JSON.parse(sessionStorage.getItem('auth'))

// let app = new Vue({
//   el: '#app',
//   data: { message: '', req: {}, trainList: [] },
//   methods: {
//     back: function () {
//       location.href = './journal.02.html'
//     },
//     save: function () {
//       app.message = ''
//       if (!!!app.req.groupSN || !!!app.req.leader || !!!app.req.leaderPhone || !!!app.req.content) {
//         app.message = '请完整填写申请内容。'
//         return false
//       }
//       axios({
//         method: 'POST',
//         url: './api/journal02/',
//         data: {
//           applicant: app.req.applicant,
//           applicantId: user.id,
//           applicantPhone: app.req.applicantPhone,
//           leader: app.req.leader,
//           leaderPhone: app.req.leaderPhone,
//           dept: app.req.dept,
//           groupSN: app.req.groupSN,
//           dateBegin: app.req.dateBegin,
//           timeBegin: app.req.timeBegin,
//           dateEnd: app.req.dateEnd,
//           timeEnd: app.req.timeEnd,
//           content: app.req.content,
//           content_detail: app.req.content_detail,
//           p_yq_xdc: app.req.p_yq_xdc,
//           p_yq_jcw: app.req.p_yq_jcw,
//           p_yq_zydd: app.req.p_yq_zydd,
//           p_yq_qt: app.req.p_yq_qt || ''
//         },
//         responseType: 'json'
//       }).then(function (response) {
//         if (response.data.status !== 200) {
//           app.message = response.data.message
//         } else {
//           location.href = './journal.02.html'
//         }
//       })
//     }
//   },
//   created: function () {
//     this.req.dept = user.dept
//     this.req.applicant = user.name
//     this.req.applicantPhone = user.phone
//     this.req.leader = user.name
//     this.req.leaderPhone = user.phone
//     this.req.dateBegin = moment().format('YYYY-MM-DD')
//     let hour = moment({ hours: parseInt(moment().format('HH')) + 1 }).format('HH')
//     this.req.timeBegin = hour + ':00'
//     this.req.dateEnd = moment().format('YYYY-MM-DD')
//     hour = moment({ hours: parseInt(hour) + 1 }).format('HH')
//     this.req.timeEnd = hour + ':00'
//     this.req.content_detail = ''
//     this.req.p_yq_xdc = '无要求'
//     this.req.p_yq_jcw = '无要求'
//     this.req.p_yq_zydd = '无要求'

//     axios({
//       method: 'get',
//       url: './api/common/train',
//       responseType: 'json'
//     }).then(function (response) {
//       if (response.data.message) {
//         app.message = response.data.message
//         return false
//       }
//       app.trainList = response.data.content
//     })
//   }
// })
