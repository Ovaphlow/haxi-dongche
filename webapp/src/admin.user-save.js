import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-a.html'
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
      app.user.password = md5(document.getElementById('password').value)
      axios({
        method: 'POST',
        url: './api/user/',
        data: app.user,
        responseType: 'json'
      }).then(function (response) {
        if (response.data.status === 200) {
          alert(response.data.message)
          location.href = './admin.user-list.html'
        } else {
          alert('保存失败。')
        }
      })
    }
  },
  created: function () {
    axios({
      method: 'GET',
      url: './api/dept/',
      responseType: 'json'
    }).then(function (response) {
      app.deptList = response.data.content
    })
  }
})