import navbar from './navbar.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './journal.sidebar.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',
  data: {
    journal0: {},
    journal: {},
    content: {},
    contentList: []
  },
  methods: {
    plus: function () {
      $('#save').modal()
    },
    remove: function (event) {
      if (!!!confirm('确认删除该记录？')) return false
      axios({
        method: 'DELETE',
        url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/' + event.target.getAttribute('data-id'),
        responseType: 'json'
      }).then(response => {
        location.reload(true)
      })
    },
    submit: function () {
      axios({
        method: 'POST',
        url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
        data: {
          subject: this.journal0.subject || '',
          approval_sn: this.journal0.approval_sn || '',
          train_sn: this.journal0.train_sn || '',
          date: this.journal0.date || '1970-01-01',
          carriage: this.journal.carriage || '',
          carriage_subject: this.journal.carriage_subject || '',
          time_begin: this.journal.time_begin || '00:00:00',
          time_end: this.journal.time_end || '00:00:00',
          result: this.journal.result || '良好',
          report: this.journal.report || '',
          dept: this.journal.dept || '',
          executor: this.journal.executor || '',
          watcher: this.journal.watcher || '',
          watcher_group: this.journal.watcher_group || '',
          qc: this.journal.qc || '',
          remark: this.journal.remark || ''
        },
        responseType: 'json'
      }).then(response => {
        location.reload(true)
      })
    },
    save: function () {
      axios({
        method: 'PUT',
        url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
        data: {
          subject: this.journal0.subject || '',
          approval_sn: this.journal0.approval_sn || '',
          train_sn: this.journal0.train_sn || '',
          date: this.journal0.date || '1970-01-01'
        },
        responseType: 'json'
      }).then(response => {
        location.reload(true)
      })
    }
  },
  created: function () {
    axios({
      method: 'GET',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
      responseType: 'json'
    }).then(response => {
      this.contentList = response.data.content
      if (this.contentList.length > 0) {
        this.journal0.subject = this.contentList[0].subject
        this.journal0.approval_sn = this.contentList[0].approval_sn
        this.journal0.train_sn = this.contentList[0].train_sn
        this.journal0.date = this.contentList[0].date
      }
    })
  }
})