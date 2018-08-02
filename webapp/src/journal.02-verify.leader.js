import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-b.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let auth = JSON.parse(sessionStorage.getItem('auth'))

let app = new Vue({
  el: '#app',
  data: {
    content: {},
    request: {}
  },
  methods: {
    detail: function (event) {
      let sn = event.target.getAttribute('data-id')
      location.href = './journal.02-save.0' + sn + '.html'
    },

    sign: function () {
      axios({
        method: 'PUT',
        url: './api/journal02/verify/leader/' + app.content.id,
        data: {
          verify_report: app.request.verify_report,
          verify_leader: auth.name,
          verify_leader_id: auth.id,
          verify_leader_date: app.request.verify_leader_date,
          verify_leader_time: app.request.verify_leader_time,
          remark: app.request.remark
        },
        responseType: 'json'
      }).then(function (response) {
        if (response.data.status !== 200) {
          alert(response.data.message)
          return false
        }
        let sign = {
          category: 'journal02',
          from: './journal.02-verify.leader.html',
          to: './journal.02-verify.html',
          operation: 'verify-leader',
          item_id: sessionStorage.getItem('verifyId')
        }
        sessionStorage.setItem('sign', JSON.stringify(sign))
        location.href = './sign.html'
      })
    },

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
      }).then(function (response) {
        if (response.data.content.length !== 1) {
          alert('账号或密码错误，用户鉴权失败。')
          return false
        }
        axios({
          method: 'PUT',
          url: './api/journal02/verify/leader/' + app.content.id,
          data: {
            verify_report: app.request.verify_report,
            verify_leader: response.data.content[0].name,
            verify_leader_id: response.data.content[0].id,
            verify_leader_date: app.request.verify_leader_date,
            verify_leader_time: app.request.verify_leader_time,
            remark: app.request.remark
          },
          responseType: 'json'
        }).then(function (response) {
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
    }).then(function (response) {
      if (response.data.status === 200) {
        app.request.verify_leader_date = response.data.content.date_end
        app.request.verify_leader_time = response.data.content.time_end
        app.request.tag = response.data.content.tag
        app.content = response.data.content
        if (response.data.content.tag) {
          document.getElementById('tag').value = response.data.content.tag
          document.getElementById('tag').setAttribute('disabled', true)
        }
      }
    })
  }
})
