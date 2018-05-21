import navbar from './navbar.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './journal.sidebar.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',
  data: {
    journal: {},
    detailList: [],
    detail: {}
  },
  methods: {},
  created: function () {
    axios({
      method: 'GET',
      url: './api/journal02/' + sessionStorage.getItem('journal02'),
      responseType: 'json'
    }).then(response => {
      this.journal = response.data.content
      if (response.data.content.tag === '一般部件普查记录单') {
        axios({
          method: 'GET',
          url: './api/journal02/' + response.data.content.id + '/01/',
          responseType: 'json'
        }).then(response => {
          this.detailList = response.data.content
          this.detail.subject = response.data.content[0].subject
          this.detail.approval_sn = response.data.content[0].approval_sn
          this.detail.train_sn = response.data.content[0].train_sn
          this.detail.date = response.data.content[0].date
        })
      } else if (response.data.content.tag === '一般配件更换记录表') {
        axios({
          method: 'GET',
          url: './api/journal02/' + response.data.content.id + '/02/',
          responseType: 'json'
        }).then(response => {
          this.detailList = response.data.content
        })
      } else if (response.data.content.tag === '关键配件更换记录表') {
        axios({
          method: 'GET',
          url: './api/journal02/' + response.data.content.id + '/03/',
          responseType: 'json'
        }).then(response => {
          this.detailList = response.data.content
        })
      } else if (response.data.content.tag === '加装改造（软件升级）记录单') {
        axios({
          method: 'GET',
          url: './api/journal02/' + response.data.content.id + '/04/',
          responseType: 'json'
        }).then(response => {
          this.detailList = response.data.content
          this.detail.subject = response.data.content[0].subject
        })
      } else { return false }
    })
  }
})