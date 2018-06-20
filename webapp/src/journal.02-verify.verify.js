import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-2.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

import authDialog from './auth-dialog.html'
document.getElementById('authDialog').innerHTML = authDialog

let auth = JSON.parse(sessionStorage.getItem('auth'))

let app = new Vue({
  el: '#app',
  data: {
    content: {},
    request: {}
  },
  methods: {
    sign: function () {
      axios({
        method: 'PUT',
        url: './api/journal02/verify/' + app.content.id,
        data: {
          verify: auth.name,
          verify_id: auth.id,
          remark: app.content.remark
        },
        responseType: 'json'
      }).then(function (response) {
        if (response.data.status !== 200) {
          alert(response.data.message)
          return false
        }
        let sign = {
          category: 'journal02',
          from: './journal.02-verify.verify.html',
          to: './journal.02-verify.html',
          operation: 'verify',
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
        if (!!!response.data.content[0].auth_p_dd) {
          alert('鉴权用户没有当前操作对应的权限。')
          return false
        }
        axios({
          method: 'PUT',
          url: './api/journal02/verify/' + app.content.id,
          data: {
            verify: response.data.content[0].name,
            verify_id: response.data.content[0].id,
            remark: app.content.remark
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
        app.content = response.data.content
      }
    })
  }
})
