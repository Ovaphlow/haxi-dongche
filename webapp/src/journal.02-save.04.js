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
    list: []
  },
  methods: {
    plus: function () {
      $('#save').modal()
    },
    submit: function () {
      axios({
        method: 'POST',
        url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/',
        data: {
          subject: app.journal0.subject,
          software_version_new: app.journal0.software_version_new,
          software_version_old: app.journal0.software_version_old,
          approval_sn: app.journal0.approval_sn,
          train: app.journal0.train,
          date: app.journal0.date,
          carriage: app.journal.carriage,
          time_begin: app.journal.time_begin,
          time_end: app.journal.time_end,
          dept: app.journal.dept,
          operator: app.journal.operator,
          watcher: app.journal.watcher,
          watcher_group: app.journal.watcher_group,
          qc: app.journal.qc,
          remark: app.journal.remark
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
    remove: function (event) {
      if (!!!confirm('确认删除选定的记录？')) return false
      axios({
        method: 'DELETE',
        url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/' + event.target.getAttribute('data-id'),
        responseType: 'json'
      }).then(function (response) {
        location.reload(true)
      })
    },
    update: function () {
      axios({
        method: 'PUT',
        url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/',
        data: {
          subject: app.journal0.subject || '',
          software_version_new: app.journal0.software_version_new || '',
          software_version_old: app.journal0.software_version_old || '',
          approval_sn: app.journal0.approval_sn || '',
          train: app.journal0.train || '',
          date: app.journal0.date || '1970-01-01'
        },
        responseType: 'json'
      }).then(function (response) {
        alert('保存完毕。')
        location.reload(true)
      })
    },
    fin: function () {
      location.href = './journal.02-verify.leader.html'
    }
  },
  created: function () {
    axios({
      method: 'GET',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/',
      responseType: 'json'
    }).then(function (response) {
      app.list = response.data.content
      if (app.list.length > 0) {
        app.journal0.subject = app.list[0].subject
        app.journal0.software_version_new = app.list[0].software_version_new
        app.journal0.software_version_old = app.list[0].software_version_old
        app.journal0.approval_sn = app.list[0].approval_sn
        app.journal0.train = app.list[0].train
        app.journal0.date = app.list[0].date
      }
    })
  }
})
