import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-2.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './admin.dept-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',
  data: {
    dept: {}
  },
  methods: {
    save: function () {
      if (!!!app.dept.name) {
        alert('请填写部门名称')
        return false
      }
      axios({
        method: 'PUT',
        url: './api/dept/' + sessionStorage.getItem('dept'),
        data: { name: app.dept.name },
        responseType: 'json'
      }).then(function (response) {
        if (response.data.status === 200) {
          location.href = './admin.dept-list.html'
        } else if (response.data.status === 202) {
          alert('部门名称冲突')
        } else {
          alert('保存失败。')
        }
      })
    }
  },
  created: function () {
    axios({
      method: 'GET',
      url: './api/dept/' + sessionStorage.getItem('dept'),
      responseType: 'json'
    }).then(function (response) {
      app.dept = response.data.content
    })
  }
})