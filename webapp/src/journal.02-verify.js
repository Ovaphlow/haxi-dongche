import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-b.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

import authDialog from './auth-dialog.html'
document.getElementById('authDialog').innerHTML = authDialog

let user = JSON.parse(sessionStorage.getItem('auth'))

let app = new Vue({
  el: '#app',
  data: {
    journalList: [],
    journal: {},
    contentLeader: [],
    contentLeaderBz: [],
    contentLeaderQc: [],
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

    verifyLeaderBz: function (event) {
      // let sign = {
      //   category: 'journal02',
      //   from: './journal.02-verify.html',
      //   to: './journal.02-verify.html',
      //   operation: 'verify-leader-bz',
      //   item_id: event.target.getAttribute('data-id')
      // }
      // sessionStorage.setItem('sign', JSON.stringify(sign))
      // location.href = './sign.html'
      location.href = './journal.02-verify.p_bz.html'
    },

    verifyLeaderQc: function (event) {
      let sign = {
        category: 'journal02',
        from: './journal.02-verify.html',
        to: './journal.02-verify.html',
        operation: 'verify-leader-qc',
        item_id: event.target.getAttribute('data-id')
      }
      sessionStorage.setItem('sign', JSON.stringify(sign))
      location.href = './sign.html'
      // app.op_cat = 'leaderQc'
      // app.op_id = event.target.getAttribute('data-id')
      // $('#auth').modal()
    },

    verify: function (event) {
      app.op_cat = 'verify'
      app.op_id = event.target.getAttribute('data-id')
      // $('#auth').modal()

      sessionStorage.setItem('verifyId', app.op_id)
      location.href = './journal.02-verify.verify.html'
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
      }).then(function (response) {
        if (response.data.content.length !== 1) {
          alert('账号或密码错误，用户鉴权失败。')
          return false
        }
        if (app.op_cat === 'leader') {
          sessionStorage.setItem('verifyId', app.op_id)
          location.href = './journal.02-verify.leader.html'
        } else if (app.op_cat === 'leaderBz') {
          axios({
            method: 'PUT',
            url: './api/journal02/verify/leader/bz/' + app.op_id,
            data: {},
            responseType: 'json'
          }).then(function (response) {
            if (response.data.status !== 200) {
              alert(response.data.message)
              return false
            }
            location.reload(true)
          })
        } else if (app.op_cat === 'leaderQc') {
          axios({
            method: 'PUT',
            url: './api/journal02/verify/leader/qc/' + app.op_id,
            data: {},
            responseType: 'json'
          }).then(function (response) {
            if (response.data.status !== 200) {
              alert(response.data.message)
              return false
            }
            location.reload(true)
          })
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
      url: './api/journal02/verify/leader/' + user.name + '?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(function (response) {
      app.contentLeader = response.data.content
    })

    axios({
      method: 'GET',
      url: './api/journal02/verify/leader/bz/' + user.dept + '?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(function (response) {
      app.contentLeaderBz = response.data.content
    })

    if (user.dept === '质检') {
      axios({
        method: 'GET',
        url: './api/journal02/verify/leader/qc/' + user.name + '?timestamp=' + new Date().getTime(),
        responseTupe: 'json'
      }).then(function (response) {
        app.contentLeaderQc = response.data.content
      })
    }

    if (user.auth_p_dd) {
      axios({
        method: 'GET',
        url: './api/journal02/verify/' + '?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(function (response) {
        app.contentVerify = response.data.content
      })
    }
  }
})
