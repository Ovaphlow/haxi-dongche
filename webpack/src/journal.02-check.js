import navbar from './navbar.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './journal.sidebar.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

import authDialog from './auth-dialog.html'
document.getElementById('authDialog').innerHTML = authDialog

import infoDialog01 from './journal.02-info-01.dialog.html'
document.getElementById('infoDialog01').innerHTML = infoDialog01

import infoDialog02 from './journal.02-info-02.dialog.html'
document.getElementById('infoDialog02').innerHTML = infoDialog02

import infoDialog03 from './journal.02-info-03.dialog.html'
document.getElementById('infoDialog03').innerHTML = infoDialog03

import infoDialog04 from './journal.02-info-04.dialog.html'
document.getElementById('infoDialog04').innerHTML = infoDialog04

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
    },
    jsy: function (event) {
      $('#auth').modal()
      this.op_cat = 'jsy'
      this.op_id = event.target.getAttribute('data-id')
    },
    zbsz: function (event) {
      $('#auth').modal()
      this.op_cat = 'zbsz'
      this.op_id = event.target.getAttribute('data-id')
    },
    dd: function (event) {
      $('#auth').modal()
      this.op_cat = 'dd'
      this.op_id = event.target.getAttribute('data-id')
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
      }).then(response => {
        if (response.data.content.length !== 1) {
          alert('账号或密码错误，用户鉴权失败。')
          return false
        }
        if (this.op_cat === 'jsy' && response.data.content[0].auth_p_jsy) {
          axios({
            method: 'PUT',
            url: './api/journal02/jsy/' + this.op_id,
            data: {
              p_jsy: response.data.content[0].name,
              p_jsy_id: response.data.content[0].id,
              id: this.op_id
            },
            responseType: 'json'
          }).then(response => {
            if (response.data.status === 200) {
              alert('操作已提交至服务器，请稍后查看结果。')
              location.reload(true)
            } else {
              $('#auth').modal('hide')
              document.getElementById('authAccount').value = ''
              document.getElementById('authPassword').value = ''
            }
          })
        } else if (this.op_cat === 'zbsz' && response.data.content[0].auth_p_zbsz) {
          axios({
            method: 'PUT',
            url: './api/journal02/zbsz/' + this.op_id,
            data: {
              p_zbsz: response.data.content[0].name,
              p_zbsz_id: response.data.content[0].id,
              id: this.op_id
            },
            responseType: 'json'
          }).then(response => {
            if (response.data.status === 200) {
              alert('操作已提交至服务器，请稍后查看结果。')
              location.reload(true)
            } else {
              $('#auth').modal('hide')
              document.getElementById('authAccount').value = ''
              document.getElementById('authPassword').value = ''
            }
          })
        } else if (this.op_cat === 'dd' && response.data.content[0].auth_p_dd) {
          axios({
            method: 'PUT',
            url: './api/journal02/dd/' + this.op_id,
            data: {
              p_dd: response.data.content[0].name,
              p_dd_id: response.data.content[0].id,
              id: this.op_id
            },
            responseType: 'json'
          }).then(response => {
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
    }).then(response => {
      this.content_jsy = response.data.content
    })

    axios({
      method: 'GET',
      url: './api/journal02/zbsz/',
      responseType: 'json'
    }).then(response => {
      this.content_zbsz = response.data.content
    })

    axios({
      method: 'GET',
      url: './api/journal02/dd/',
      responseType: 'json'
    }).then(response => {
      this.content_dd = response.data.content
    })
  }
})