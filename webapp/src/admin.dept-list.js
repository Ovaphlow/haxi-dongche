import navbar from './navbar.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './admin.sidebar.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './admin.dept-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',
  data: {
    deptList: []
  },
  methods: {
    detail: function (event) {
      sessionStorage.setItem('dept', event.target.getAttribute('data-id'))
      location.href = 'admin.dept.html'
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