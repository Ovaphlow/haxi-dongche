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
      }).then(response => {
        console.log(response.data)
      })
    },
    detail: function (event) {
      if (event.target.getAttribute('data-content') === '一般部件普查记录单') {
        $('#journal02Info01').modal()
        axios({
          method: 'GET',
          url: './api/journal02/' + event.target.getAttribute('data-id') + '/01/',
          responseType: 'json'
        }).then(response => {
          this.journalList = response.data.content
          this.journal.subject = this.journalList[0].subject
          this.journal.approval_sn = this.journalList[0].approval_sn
          this.journal.train_sn = this.journalList[0].train_sn
          this.journal.date = this.journalList[0].date
        })
      } else if (event.target.getAttribute('data-content') === '一般配件更换记录表') {
        $('#journal02Info02').modal()
        axios({
          method: 'GET',
          url: './api/journal02/' + event.target.getAttribute('data-id') + '/02/',
          responseType: 'json'
        }).then(response => {
          this.journalList = response.data.content
        })
      } else if (event.target.getAttribute('data-content') === '关键配件更换记录表') {
        $('#journal02Info03').modal()
        axios({
          method: 'GET',
          url: './api/journal02/' + event.target.getAttribute('data-id') + '/03/',
          responseType: 'json'
        }).then(response => {
          this.journalList = response.data.content
        })
      } else if (event.target.getAttribute('data-content') === '加装改造（软件升级）记录单') {
        $('#journal02Info04').modal()
        axios({
          method: 'GET',
          url: './api/journal02/' + event.target.getAttribute('data-id') + '/04/',
          responseType: 'json'
        }).then(response => {
          this.journalList = response.data.content
          this.journal.subject = this.journalList[0].subject
          this.journal.software_version_old = this.journalList[0].software_version_old
          this.journal.software_version_new = this.journalList[0].software_version_new
          this.journal.approval_sn = this.journalList[0].approval_sn
          this.journal.train = this.journalList[0].train
          this.journal.date = this.journalList[0].date
        })
      }
    }
  },
  created: function () {
    this.filter.date_begin = moment().format('YYYY-MM-DD')
    axios({
      method: 'GET',
      url: './api/journal02/',
      responseType: 'json'
    }).then(response => {
      this.content = response.data.content
    })
  }
})