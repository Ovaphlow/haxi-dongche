import navbar from './navbar.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './journal.sidebar.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

import authDialog from './auth-dialog.html'
document.getElementById('authDialog').innerHTML = authDialog

let app = new Vue({
  el: '#app',
  data: {
    content: {},
    request: {}
  },
  methods: {
    auth: function () {
      $('#auth').modal()
    },
    submit: function () {
      axios({
        method: 'POST',
        url: './api/user/login',
        data: {
          account: document.getElementById('authAccount').value,
          password: md5(document.getElementById('authPassword').value)
        },
        responseType: 'json'
      }).then(response => {
        if (response.data.content.length !== 1) {
          alert('账号或密码错误，用户鉴权失败。')
          return false
        }
        axios({
          method: 'PUT',
          url: './api/journal02/verify/leader/' + this.content.id,
          data: {
            verify_report: this.request.verify_report,
            verify_leader: response.data.content[0].name,
            verify_leader_id: response.data.content[0].id,
            verify_leader_date: this.request.verify_leader_date,
            verify_leader_time: this.request.verify_leader_time,
            remark: this.request.remark
          },
          responseType: 'json'
        }).then(response => {
          if (response.data.status === 200) {
            alert('操作已提交至服务器，请稍后查看结果。')
            location.href = './journal.02-verify.html'
          } else {
            alert(response.data.message)
          }
        })
      })
    }
  },
  created: function () {
    axios({
      method: 'GET',
      url: './api/journal02/' + sessionStorage.getItem('verifyId'),
      responseType: 'json'
    }).then(response => {
      if (response.data.status === 200) {
        this.content = response.data.content
        this.request.verify_leader_date = this.content.date_end
        this.request.verify_leader_time = this.content.time_end
      }
    })
  }
})