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
          subject: this.journal0.subject,
          software_version_new: this.journal0.software_version_new,
          software_version_old: this.journal0.software_version_old,
          approval_sn: this.journal0.approval_sn,
          train: this.journal0.train,
          date: this.journal0.date,
          carriage: this.journal.carriage,
          time_begin: this.journal.time_begin,
          time_end: this.journal.time_end,
          dept: this.journal.dept,
          operator: this.journal.operator,
          watcher: this.journal.watcher,
          watcher_group: this.journal.watcher_group,
          qc: this.journal.qc,
          remark: this.journal.remark
        },
        responseType: 'json'
      }).then(response => {
        if (response.data.status === 200) {
          location.reload(true)
        } else {
          alert(response.data.message)
        }
      })
    },
    remove: function (event) {
      if (!!!confirm('确认删除选定的记录？')) return false
      console.log(event.target.getAttribute('data-id'))
      axios({
        method: 'DELETE',
        url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/' + event.target.getAttribute('data-id'),
        responseType: 'json'
      }).then(response => {
        location.reload(true)
      })
    },
    update: function () {
      axios({
        method: 'PUT',
        url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/',
        data: {
          subject: this.journal0.subject || '',
          software_version_new: this.journal0.software_version_new || '',
          software_version_old: this.journal0.software_version_old || '',
          approval_sn: this.journal0.approval_sn || '',
          train: this.journal0.train || '',
          date: this.journal0.date || '1970-01-01'
        },
        responseType: 'json'
      }).then(response => {
        alert('保存完毕。')
        location.reload(true)
      })
    },
    fin: function () {
      location.href = './journal.02.html'
    }
  },
  created: function () {
    axios({
      method: 'GET',
      url: './api/journal02/' + sessionStorage.getItem('journal02') + '/04/',
      responseType: 'json'
    }).then(response => {
      this.list = response.data.content
      if (this.list.length > 0) {
        this.journal0.subject = this.list[0].subject
        this.journal0.software_version_new = this.list[0].software_version_new
        this.journal0.software_version_old = this.list[0].software_version_old
        this.journal0.approval_sn = this.list[0].approval_sn
        this.journal0.train = this.list[0].train
        this.journal0.date = this.list[0].date
      }
    })
  }
})