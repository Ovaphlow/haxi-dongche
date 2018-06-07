import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-2.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

import authDialog from './auth-dialog.html'
document.getElementById('authDialog').innerHTML = authDialog

let app = new Vue({
  el: '#app',
  data: {
    journalList: [],
    journal: {},
    contentLeader: [],
    contentVerify: [],
    op_cat: '',
    op_id: 0
  },
  methods: {
    detail: function (event) {
      sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
      location.href = './journal.02-detail.html'
    },
    verifyLeader: function (event) {
      app.op_cat = 'leader'
      app.op_id = event.target.getAttribute('data-id')
      // $('#auth').modal()

      sessionStorage.setItem('verifyId', app.op_id)
      location.href = './journal.02-verify.leader.html'
    },
    verify: function (event) {
      app.op_cat = 'verify'
      app.op_id = event.target.getAttribute('data-id')
      // $('#auth').modal()

      sessionStorage.setItem('verifyId', app.op_id)
      location.href = './journal.02-verify.verify.html'
    },
    submit: function () {
      // 取消先验证权限的步骤
      axios({
        method: 'POST',
        url: './api/user/login',
        data: {
          account: document.getElementById('authAccount').value,
          password: md5(document.getElementById('authPassword').value)
        },
        responseType: 'json'
      }).then(function (response) {
        if (response.data.content.length !== 1) {
          alert('账号或密码错误，用户鉴权失败。')
          return false
        }
        if (app.op_cat === 'leader') {
          sessionStorage.setItem('verifyId', app.op_id)
          location.href = './journal.02-verify.leader.html'
        } else if (app.op_cat === 'verify') {
          sessionStorage.setItem('verifyId', app.op_id)
          location.href = './journal.02-verify.verify.html'
        }
      })
    }
  },
  created: function () {
    axios({
      method: 'GET',
      url: './api/journal02/verify/leader/',
      responseType: 'json'
    }).then(function (response) {
      app.contentLeader = response.data.content
    })

    axios({
      method: 'GET',
      url: './api/journal02/verify/',
      responseType: 'json'
    }).then(function (response) {
      app.contentVerify = response.data.content
    })
  }
})
