import navbar from './navbar.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './journal.sidebar.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

import authDialog from './auth-dialog.html'
document.getElementById('authDialog').innerHTML = authDialog

let user = JSON.parse(sessionStorage.getItem('auth'))

let app = new Vue({
  el: '#app',
  data: {
    journalList: [],
    journal: {},
    deptList: [],
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
    },
    jsy: function (event) {
      $('#auth').modal()
      app.op_cat = 'jsy'
      app.op_id = event.target.getAttribute('data-id')
    },
    jsyChange: function (event) {
      if (app.journal.p_jsy_content === '同意') {
        document.getElementById('p-jsy.p-bz').setAttribute('disabled', true)
        document.getElementById('p-jsy.qc').setAttribute('disabled', true)
        app.journal.p_jsy_bz = ''
        app.journal.p_jsy_qc = ''
      } else if (app.journal.p_jsy_content === '班组跟踪、质检确认') {
        document.getElementById('p-jsy.p-bz').removeAttribute('disabled')
        document.getElementById('p-jsy.qc').removeAttribute('disabled')
      } else if (app.journal.p_jsy_content === '班组、质检跟踪') {
        document.getElementById('p-jsy.p-bz').removeAttribute('disabled')
        document.getElementById('p-jsy.qc').removeAttribute('disabled')
        app.journal.p_jsy_qc = ''
      }
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
      $('#auth').modal('hide')
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
          $('#p-jsy-content').modal()
          if (sessionStorage.getItem('deptList')) {
            let deptList = JSON.parse(sessionStorage.getItem('deptList'))
            for (let i = 0; i < deptList.length; i++) {
              if (deptList[i].category === '班组') app.deptList.push(deptList[i])
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
          return false
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
              // location.reload(true)

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
