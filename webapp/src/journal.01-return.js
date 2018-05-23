import navbar from './navbar.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './journal.sidebar.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.01-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

const user = JSON.parse(sessionStorage.getItem('auth'))

let app = new Vue({
  el: '#app',
  data: {
    user: user,
    userList: [],
    content: [],
    cache: {}
  },
  methods: {
    linkReturn: function (event) {
      let journalId = event.target.getAttribute('data-id')
      componentReturn.refId = journalId

      $('#modal').modal({
        backdrop: 'static'
      })
    }
  },
  created: function () {
    if (user.auth_01) {
      axios({
        method: 'GET',
        url: './api/journal01/return/',
        responseType: 'json'
      }).then(function (response) {
        app.content = response.data.content
      })
    } else {
      // axios({
      //   method: 'GET',
      //   url: './api/journal01/applicant/' + user.id + '/',
      //   responseType: 'json'
      // }).then((response) => {
      //   // app.content = response.data.content
      // })
    }
  }
})

let componentReturn = new Vue({
  el: '#modal',
  data: {
    refId: 0,
    cache: {},
    userList: []
  },
  watch: {
    refId: function () {
      axios({
        method: 'GET',
        url: './api/journal01/' + app.refId,
        responseType: 'json'
      }).then(response => {
        // app.cache = response.data.content
      })
    }
  },
  methods: {
    setReturn: function () {
      var elReturn = document.getElementById('cache.return')
    }
  },
  created: function () {
    axios({
      method: 'GET',
      url: './api/user/dept/' + user.dept_id,
      responseType: 'json'
    }).then(function (response) {
      componentReturn.userList = response.data.content
    })
  }
})
