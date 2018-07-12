import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-a.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.01-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',

  data: {
    auth: JSON.parse(sessionStorage.getItem('auth')),
    userList: [],
    content: [],
    cache: {},
    refId: 0
  },

  methods: {
    linkReturn: function (event) {
      let journalId = event.target.getAttribute('data-id')
      this.refId = journalId

      $('#modal').modal({
        backdrop: 'static'
      })
    },

    submit: function (event) {
      axios({
        method: 'put',
        url: './api/journal01/return/' + this.refId,
        data: {
          return_name: document.getElementById('cache.return').options[document.getElementById('cache.return').options.selectedIndex].text,
          return_by_id: this.auth.id,
          return_by: this.auth.name,
          remark: this.cache.remark
        }
      }).then(function (response) {
        if (response.data.message) {
          alert(response.data.message)
          return false
        }
        location.reload(true)
      })
    }
  },

  created: function () {
    if (this.auth.auth_01) {
      axios({
        method: 'GET',
        url: './api/journal01/return/',
        responseType: 'json'
      }).then(function (response) {
        app.content = response.data.content
      })
    } else {
      axios({
        method: 'get',
        url: './api/journal01/return/user/' + this.auth.id,
        responseType: 'json'
      }).then(response => {
        this.content = response.data.content
      })
    }

    axios({
      method: 'get',
      url: './api/user/',
      responseType: 'json'
    }).then(function (response) {
      app.userList = response.data.content
    })
  }
})
