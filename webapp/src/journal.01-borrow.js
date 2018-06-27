import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-2.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.01-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

const user = JSON.parse(sessionStorage.getItem('auth'))

let app = new Vue({
  el: '#app',

  data: {
    user: JSON.parse(sessionStorage.getItem('auth')),
    content: [],
    message: ''
  },

  methods: {
    borrow: function (event) {
      axios({
        method: 'PUT',
        url: './api/journal01/' + event.target.getAttribute('data-id') + '/borrow',
        data: {
          borrow: user.name,
          borrowId: user.id
        },
        responseType: 'json'
      }).then(response => {
        location.reload(true)
      })
    },
  },

  created: function () {
    if (user.auth_01) {
      axios({
        method: 'GET',
        url: './api/journal01/admin/',
        responseType: 'json'
      }).then(function (response) {
        app.content = response.data.content
      })
    } else {
      axios({
        method: 'GET',
        url: './api/journal01/applicant/' + user.id + '/',
        responseType: 'json'
      }).then(function (response) {
        app.content = response.data.content
      })
    }
  }
})