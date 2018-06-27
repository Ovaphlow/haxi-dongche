import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

// import sidebar from './journal.sidebar.html'
import sidebar from './sidebar-2.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',

  data: {
    content: [],
    journalList: [],
    journal: {},
    filter: {}
  },

  methods: {
    filterSubmit: function () {
      axios({
        method: 'POST',
        url: './api/journal02/filter/',
        data: {
          dept: app.filter.date || '',
          group_sn: app.filter.group_sn || '',
          date_begin: app.filter.date_begin || ''
        },
        responseType: 'json'
      }).then(function (response) {
        app.content = response.data.content
      })
    },

    detail: function (event) {
      // 跳转到详细信息页面
      sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
      location.href = './journal.02-detail.html'
    }
  },

  created: function () {
    this.filter.date_begin = moment().format('YYYY-MM-DD')
    axios({
      method: 'GET',
      url: './api/journal02/?timestamp=' + new Date().getTime(),
      responseType: 'json'
    }).then(function (response) {
      app.content = response.data.content
    })
  }
})
