import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-b.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',
  data: {
    journal0: {},
    journal: {},
    content: {},
    contentList: [],
    trainList: []
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
      }).then(function (response) {
        if (response.data.status === 200) {
          location.reload(true)
        } else {
          alert(response.data.message)
        }
      })
    },
    submit: function () {
      axios({
        method: 'POST',
        url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
        data: {
          subject: app.journal0.subject || '',
          approval_sn: app.journal0.approval_sn || '',
          train_sn: app.journal0.train_sn || '',
          date: app.journal0.date || '1970-01-01',
          carriage: app.journal.carriage || '',
          carriage_subject: app.journal.carriage_subject || '',
          time_begin: app.journal.time_begin || '00:00:00',
          time_end: app.journal.time_end || '00:00:00',
          result: app.journal.result || '良好',
          report: app.journal.report || '',
          dept: app.journal.dept || '',
          executor: app.journal.executor || '',
          watcher: app.journal.watcher || '',
          watcher_group: app.journal.watcher_group || '',
          qc: app.journal.qc || '',
          remark: app.journal.remark || ''
        },
        responseType: 'json'
      }).then(function (response) {
        if (response.data.status === 200) {
          location.reload(true)
        } else {
          alert(response.data.message)
        }
      })
    },
    save: function () {
      axios({
        method: 'PUT',
        url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
        data: {
          subject: app.journal0.subject || '',
          approval_sn: app.journal0.approval_sn || '',
          train_sn: app.journal0.train_sn || '',
          date: app.journal0.date || '1970-01-01'
        },
        responseType: 'json'
      }).then(function (response) {
        if (response.data.status === 200) {
          location.href = './journal.02-verify.leader.html'
        } else {
          alert(response.data.message)
        }
      })
    }
  },
  created: function () {
    this.journal0.date = moment().format('YYYY-MM-DD')
    axios({
      method: 'GET',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/01/',
      responseType: 'json'
    }).then(function (response) {
      app.contentList = response.data.content
      if (app.contentList.length > 0) {
        app.journal0.subject = app.contentList[0].subject
        app.journal0.approval_sn = app.contentList[0].approval_sn
        app.journal0.train_sn = app.contentList[0].train_sn
        app.journal0.date = app.contentList[0].date
      }
    })

    axios({
      method: 'get',
      url: './api/common/train',
      responseType: 'json'
    }).then(function (response) {
      if (response.data.message) {
        app.message = response.data.message
        return false
      }
      app.trainList = response.data.content
    })
  }
})
