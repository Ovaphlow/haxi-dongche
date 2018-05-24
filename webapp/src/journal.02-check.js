import navbar from './navbar.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './journal.sidebar.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

import authDialog from './auth-dialog.html'
document.getElementById('authDialog').innerHTML = authDialog

// import infoDialog01 from './journal.02-info-01.dialog.html'
// document.getElementById('infoDialog01').innerHTML = infoDialog01

// import infoDialog02 from './journal.02-info-02.dialog.html'
// document.getElementById('infoDialog02').innerHTML = infoDialog02

// import infoDialog03 from './journal.02-info-03.dialog.html'
// document.getElementById('infoDialog03').innerHTML = infoDialog03

// import infoDialog04 from './journal.02-info-04.dialog.html'
// document.getElementById('infoDialog04').innerHTML = infoDialog04

let user = JSON.parse(sessionStorage.getItem('auth'))

// if (!!!user.auth_p_jsy && !!!user.auth_p_zbsz && !!!user.auth_p_dd) {
//   alert('当前用户没有对应权限。')
//   location.href = './journal.02.html'
// }

let app = new Vue({
  el: '#app',
  data: {
    journalList: [],
    journal: {},
    content_jsy: [],
    content_zbsz: [],
    content_dd: [],
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
    jsy: function (event) {
      $('#auth').modal()
      app.op_cat = 'jsy'
      app.op_id = event.target.getAttribute('data-id')
    },
    zbsz: function (event) {
      $('#auth').modal()
      app.op_cat = 'zbsz'
      app.op_id = event.target.getAttribute('data-id')
    },
    dd: function (event) {
      $('#auth').modal()
      app.op_cat = 'dd'
      app.op_id = event.target.getAttribute('data-id')
    },
    submit: function (event) {
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
        if (app.op_cat === 'jsy' && response.data.content[0].auth_p_jsy) {
          axios({
            method: 'PUT',
            url: './api/journal02/jsy/' + app.op_id,
            data: {
              p_jsy: response.data.content[0].name,
              p_jsy_id: response.data.content[0].id,
              id: app.op_id
            },
            responseType: 'json'
          }).then(function (response) {
            if (response.data.status === 200) {
              alert('操作已提交至服务器，请稍后查看结果。')
              location.reload(true)
            } else {
              $('#auth').modal('hide')
              document.getElementById('authAccount').value = ''
              document.getElementById('authPassword').value = ''
            }
          })
        } else if (app.op_cat === 'zbsz' && response.data.content[0].auth_p_zbsz) {
          axios({
            method: 'PUT',
            url: './api/journal02/zbsz/' + app.op_id,
            data: {
              p_zbsz: response.data.content[0].name,
              p_zbsz_id: response.data.content[0].id,
              id: app.op_id
            },
            responseType: 'json'
          }).then(function (response) {
            if (response.data.status === 200) {
              alert('操作已提交至服务器，请稍后查看结果。')
              location.reload(true)
            } else {
              $('#auth').modal('hide')
              document.getElementById('authAccount').value = ''
              document.getElementById('authPassword').value = ''
            }
          })
        } else if (app.op_cat === 'dd' && response.data.content[0].auth_p_dd) {
          axios({
            method: 'PUT',
            url: './api/journal02/dd/' + app.op_id,
            data: {
              p_dd: response.data.content[0].name,
              p_dd_id: response.data.content[0].id,
              id: app.op_id
            },
            responseType: 'json'
          }).then(function (response) {
            if (response.data.status === 200) {
              alert('操作已提交至服务器，请稍后查看结果。')
              location.reload(true)
            } else {
              $('#auth').modal('hide')
              document.getElementById('authAccount').value = ''
              document.getElementById('authPassword').value = ''
            }
          })
        } else {
          alert('鉴权用户没有当前操作对应的权限。')
        }
      })
    }
  },
  created: function () {
    axios({
      method: 'GET',
      url: './api/journal02/jsy/',
      responseType: 'json'
    }).then(function (response) {
      app.content_jsy = response.data.content
    })

    axios({
      method: 'GET',
      url: './api/journal02/zbsz/',
      responseType: 'json'
    }).then(function (response) {
      app.content_zbsz = response.data.content
    })

    axios({
      method: 'GET',
      url: './api/journal02/dd/',
      responseType: 'json'
    }).then(function (response) {
      app.content_dd = response.data.content
    })
  }
})
