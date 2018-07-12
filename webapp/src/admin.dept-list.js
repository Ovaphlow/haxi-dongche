import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-a.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './admin.dept-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',

  data: {
    auth: JSON.parse(sessionStorage.getItem('auth')),
    deptList: []
  },

  methods: {
    detail: function (event) {
      sessionStorage.setItem('dept', event.target.getAttribute('data-id'))
      location.href = 'admin.dept.html'
    }
  },

  created: function () {
    if (!!!this.auth.auth_admin) {
      alert('当前用户没有该页面的权限。')
      location.href = './journal.index.html'
      return false
    }

    axios({
      method: 'GET',
      url: './api/dept/',
      responseType: 'json'
    }).then(function (response) {
      app.deptList = response.data.content
    })
  }
})