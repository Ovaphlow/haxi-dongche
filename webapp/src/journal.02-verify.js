import navbar from './navbar.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './journal.sidebar.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

// import infoDialog01 from './journal.02-info-01.dialog.html'
// document.getElementById('infoDialog01').innerHTML = infoDialog01

// import infoDialog02 from './journal.02-info-02.dialog.html'
// document.getElementById('infoDialog02').innerHTML = infoDialog02

// import infoDialog03 from './journal.02-info-03.dialog.html'
// document.getElementById('infoDialog03').innerHTML = infoDialog03

// import infoDialog04 from './journal.02-info-04.dialog.html'
// document.getElementById('infoDialog04').innerHTML = infoDialog04

import authDialog from './auth-dialog.html'
document.getElementById('authDialog').innerHTML = authDialog

let app = new Vue({
  el: '#app',
  data: {
    journalList: [],
    journal: {},
    contentLeader: [],
    contentVerify: [],
    op_cat: '',
    op_id: 0
  },
  methods: {
    detail: function (event) {
      sessionStorage.setItem('journal02', event.target.getAttribute('data-id'))
      location.href = './journal.02-detail.html'

      // if (event.target.getAttribute('data-tag') === '一般部件普查记录单') {
      //   $('#journal02Info01').modal()
      //   axios({
      //     method: 'GET',
      //     url: './api/journal02/' + event.target.getAttribute('data-id') + '/01/',
      //     responseType: 'json'
      //   }).then(function (response) {
      //     app.journalList = response.data.content
      //     app.journal.subject = app.journalList[0].subject
      //     app.journal.approval_sn = app.journalList[0].approval_sn
      //     app.journal.train_sn = app.journalList[0].train_sn
      //     app.journal.date = app.journalList[0].date
      //   })
      // } else if (event.target.getAttribute('data-tag') === '一般配件更换记录表') {
      //   $('#journal02Info02').modal()
      //   axios({
      //     method: 'GET',
      //     url: './api/journal02/' + event.target.getAttribute('data-id') + '/02/',
      //     responseType: 'json'
      //   }).then(function (response) {
      //     app.journalList = response.data.content
      //   })
      // } else if (event.target.getAttribute('data-tag') === '关键配件更换记录表') {
      //   $('#journal02Info03').modal()
      //   axios({
      //     method: 'GET',
      //     url: './api/journal02/' + event.target.getAttribute('data-id') + '/03/',
      //     responseType: 'json'
      //   }).then(function (response) {
      //     app.journalList = response.data.content
      //   })
      // } else if (event.target.getAttribute('data-tag') === '加装改造（软件升级）记录单') {
      //   $('#journal02Info04').modal()
      //   axios({
      //     method: 'GET',
      //     url: './api/journal02/' + event.target.getAttribute('data-id') + '/04/',
      //     responseType: 'json'
      //   }).then(function (response) {
      //     app.journalList = response.data.content
      //     app.journal.subject = app.journalList[0].subject
      //     app.journal.software_version_old = app.journalList[0].software_version_old
      //     app.journal.software_version_new = app.journalList[0].software_version_new
      //     app.journal.approval_sn = app.journalList[0].approval_sn
      //     app.journal.train = app.journalList[0].train
      //     app.journal.date = app.journalList[0].date
      //   })
      // }
    },
    verifyLeader: function (event) {
      app.op_cat = 'leader'
      app.op_id = event.target.getAttribute('data-id')
      // $('#auth').modal()

      sessionStorage.setItem('verifyId', app.op_id)
      location.href = './journal.02-verify.leader.html'
    },
    verify: function (event) {
      app.op_cat = 'verify'
      app.op_id = event.target.getAttribute('data-id')
      // $('#auth').modal()

      sessionStorage.setItem('verifyId', app.op_id)
      location.href = './journal.02-verify.verify.html'
    },
    submit: function () {
      // 取消先验证权限的步骤
      axios({
        method: 'POST',
        url: './api/user/login',
        data: {
          account: document.getElementById('authAccount').value,
          password: md5(document.getElementById('authPassword').value)
        },
        responseType: 'json'
      }).then(function (response) {
        if (response.data.content.length !== 1) {
          alert('账号或密码错误，用户鉴权失败。')
          return false
        }
        if (app.op_cat === 'leader') {
          sessionStorage.setItem('verifyId', app.op_id)
          location.href = './journal.02-verify.leader.html'
        } else if (app.op_cat === 'verify') {
          sessionStorage.setItem('verifyId', app.op_id)
          location.href = './journal.02-verify.verify.html'
        }
      })
    }
  },
  created: function () {
    axios({
      method: 'GET',
      url: './api/journal02/verify/leader/',
      responseType: 'json'
    }).then(function (response) {
      app.contentLeader = response.data.content
    })

    axios({
      method: 'GET',
      url: './api/journal02/verify/',
      responseType: 'json'
    }).then(function (response) {
      app.contentVerify = response.data.content
    })
  }
})
