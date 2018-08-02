import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-b.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',
  data: {
    list: [],
    journal: {},
  },
  methods: {
    plus: function () {
      $('#save').modal()
    },

    save: function () {
      axios({
        method: 'POST',
        url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/',
        data: app.journal,
        responseType: 'json'
      }).then(function (response) {
        if (response.data.status === 200) {
          location.reload(true)
        } else {
          alert(response.data.message)
        }
      })
    },

    remove: function (event) {
      if (!!!confirm('确认删除选定的记录？')) return false
      axios({
        method: 'DELETE',
        url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/' + event.target.getAttribute('data-id'),
        responseType: 'json'
      }).then(function (response) {
        location.reload(true)
      })
    },

    fin: function () {
      location.href = './journal.02-verify.leader.html'
    }
  },

  created: function () {
    this.journal.date = moment().format('YYYY-MM-DD')
    this.journal.p_gywj = '1'
    this.journal.p_ljbs = '1'
    this.journal.p_bjaz = '1'
    this.journal.p_bjgnsy = '1'

    axios({
      method: 'GET',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/02/',
      responseType: 'json'
    }).then(function (response) {
      app.list = response.data.content
    })
  }
})
