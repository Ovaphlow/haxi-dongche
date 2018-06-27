import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-2.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.01-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',

  data: {
    content: [],
    message: ''
  },

  created: function () {
    axios({
      method: 'GET',
      url: './api/journal01/',
      responseType: 'json'
    }).then(function (response) {
      app.content = response.data.content
      app.message = response.data.message
    })
  }
})
