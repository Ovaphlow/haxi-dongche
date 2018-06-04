import navbar from './navbar.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './admin.sidebar.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './admin.user-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',
  data: { user: {}, deptList: [] },
  methods: {
    save: function () {
      if (!!!app.user.name || !!!app.user.username) {
        alert('请完整填写用户信息')
        return false
      }
      axios({
        method: 'PUT',
        url: './api/user/' + sessionStorage.getItem('user'),
        data: {
          name: app.user.name,
          username: app.user.username,
          dept_id: app.user.dept_id,
          phone: app.user.phone,
          auth_admin: app.user.auth_admin,
          auth_01: app.user.auth_01,
          auth_p_jsy: app.user.auth_p_jsy,
          auth_p_zbsz: app.user.auth_p_zbsz,
          auth_p_dd: app.user.auth_p_dd
        },
        responseType: 'json'
      }).then(function (response) {
        if (response.data.status === 200) {
          alert(response.data.message)
          location.href = './admin.user-list.html'
        } else if (response.data.status === 204) {
          alert('用户名称冲突')
        } else {
          alert('保存失败。')
        }
      })
    }
  },
  created: function () {
    axios({
      method: 'GET',
      url: './api/user/' + sessionStorage.getItem('user'),
      responseType: 'json'
    }).then(function (response) {
      app.user = response.data.content
    })

    axios({
      method: 'GET',
      url: './api/dept/',
      responseType: 'json'
    }).then(function (response) {
      app.deptList = response.data.content
    })
  }
})