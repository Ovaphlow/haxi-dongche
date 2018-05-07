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
    contentLeader: [],
    contentVerify: [],
    op_cat: '',
    op_id: 0
  },
  methods: {
    verifyLeader: function (event) {
      this.op_cat = 'leader'
      this.op_id = event.target.getAttribute('data-id')
      // $('#auth').modal()

      sessionStorage.setItem('verifyId', this.op_id)
      location.href = './journal.02-verify.leader.html'
    },
    verify: function (event) {
      this.op_cat = 'verify'
      this.op_id = event.target.getAttribute('data-id')
      // $('#auth').modal()

      sessionStorage.setItem('verifyId', this.op_id)
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
      }).then(response => {
        if (response.data.content.length !== 1) {
          alert('账号或密码错误，用户鉴权失败。')
          return false
        }
        if (this.op_cat === 'leader') {
          sessionStorage.setItem('verifyId', this.op_id)
          location.href = './journal.02-verify.leader.html'
        } else if (this.op_cat === 'verify') {
          sessionStorage.setItem('verifyId', this.op_id)
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
    }).then(response => {
      this.contentLeader = response.data.content
    })

    axios({
      method: 'GET',
      url: './api/journal02/verify/',
      responseType: 'json'
    }).then(response => {
      this.contentVerify = response.data.content
    })
  }
})