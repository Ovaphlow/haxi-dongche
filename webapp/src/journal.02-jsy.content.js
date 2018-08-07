import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-b.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let sign = JSON.parse(sessionStorage.getItem('sign'))

let app = new Vue({
  el: '#app',

  data: { journal: {}, deptList: [] },

  methods: {
    change: function () {
      if (app.journal.p_jsy_content === '同意') {
        document.getElementById('p-jsy.p-bz').setAttribute('disabled', true)
        document.getElementById('p-jsy.qc').setAttribute('disabled', true)
        app.journal.p_jsy_bz = ''
        app.journal.p_jsy_qc = ''
      } else if (app.journal.p_jsy_content === '班组跟踪、质检确认') {
        document.getElementById('p-jsy.p-bz').removeAttribute('disabled')
        document.getElementById('p-jsy.qc').removeAttribute('disabled')
        app.journal.p_jsy_qc = '质检1'
      } else if (app.journal.p_jsy_content === '班组、质检跟踪') {
        document.getElementById('p-jsy.p-bz').removeAttribute('disabled')
        document.getElementById('p-jsy.qc').removeAttribute('disabled')
        app.journal.p_jsy_qc = '质检1'
      }
    },
    submit: function () {
      axios({
        method: 'put',
        url: './api/journal02/' + sign.item_id + '/jsy/content',
        data: app.journal,
        responseType: 'json'
      }).then(function (response) {
        if (response.data.message) {
          alert(response.data.message)
          return false
        }
        location.href = './journal.02-check.html'
      })
    }
  },

  created: function () {
    if (sessionStorage.getItem('deptList')) {
      let list = JSON.parse(sessionStorage.getItem('deptList'))
      for (let i = 0; i < list.length; i++) {
        if (list[i].category === '班组') this.deptList.push(list[i])
      }
    } else {
      axios({
        method: 'GET',
        url: './api/dept/',
        responseType: 'json'
      }).then(function (response) {
        sessionStorage.setItem('deptList', JSON.stringify(response.data.content))
        app.deptList = response.data.content
      })
    }
  }
})
