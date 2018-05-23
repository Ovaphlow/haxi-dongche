import navbar from './navbar.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './journal.sidebar.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

import infoDialog01 from './journal.02-info-01.dialog.html'
document.getElementById('infoDialog01').innerHTML = infoDialog01

import infoDialog02 from './journal.02-info-02.dialog.html'
document.getElementById('infoDialog02').innerHTML = infoDialog02

import infoDialog03 from './journal.02-info-03.dialog.html'
document.getElementById('infoDialog03').innerHTML = infoDialog03

import infoDialog04 from './journal.02-info-04.dialog.html'
document.getElementById('infoDialog04').innerHTML = infoDialog04

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
          dept: this.filter.date || '',
          group_sn: this.filter.group_sn || '',
          date_begin: this.filter.date_begin || ''
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
      url: './api/journal02/',
      responseType: 'json'
    }).then(function (response) {
      app.content = response.data.content
    })
  }
})