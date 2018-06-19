import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

// import sidebar from './journal.sidebar.html'
import sidebar from './sidebar-2.html'
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
    content_jsy_bz: [],
    content_jsy_qc: [],
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
      // $('#auth').modal()
      // app.op_cat = 'jsy'
      // app.op_id = event.target.getAttribute('data-id')
      // 签字
      let sign = {
        category: 'journal02',
        from: './journal.02-check.html',
        to: './journal.02-jsy.content.html',
        operation: 'jsy',
        item_id: event.target.getAttribute('data-id')
      }
      sessionStorage.setItem('sign', JSON.stringify(sign))
      location.href = './sign.html'
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

    submitJSYContent: function (event) {
      axios({
        method: 'PUT',
        url: './api/journal02/jsy/' + app.op_id + '/content',
        data: {
          p_jsy_content: app.journal.p_jsy_content,
          p_jsy_bz: app.journal.p_jsy_bz,
          p_jsy_qc: app.journal.p_jsy_qc
        },
        responseType: 'json'
      }).then(function (response) {
        location.reload(true)
      })
    },

    submitJsyBz: function (event) {
      let sign = {
        category: 'journal02',
        from: './journal.02-check.html',
        to: './journal.02-check.html',
        operation: 'jsy-bz',
        item_id: event.target.getAttribute('data-id')
      }
      sessionStorage.setItem('sign', JSON.stringify(sign))
      location.href = './sign.html'
    },

    submitJsyQc: function (event) {
      let sign = {
        category: 'journal02',
        from: './journal.02-check.html',
        to: './journal.02-check.html',
        operation: 'jsy-qc',
        item_id: event.target.getAttribute('data-id')
      }
      sessionStorage.setItem('sign', JSON.stringify(sign))
      location.href = './sign.html'
    },

    zbsz: function (event) {
      let sign = {
        category: 'journal02',
        from: './journal.02-check.html',
        to: './journal.02-check.html',
        operation: 'zbsz',
        item_id: event.target.getAttribute('data-id')
      }
      sessionStorage.setItem('sign', JSON.stringify(sign))
      location.href = './sign.html'
      // $('#auth').modal()
      // app.op_cat = 'zbsz'
      // app.op_id = event.target.getAttribute('data-id')
    },
    
    dd: function (event) {
      let sign = {
        category: 'journal02',
        from: './journal.02-check.html',
        to: './journal.02-check.html',
        operation: 'dd',
        item_id: event.target.getAttribute('data-id')
      }
      sessionStorage.setItem('sign', JSON.stringify(sign))
      location.href = './sign.html'
      // $('#auth').modal()
      // app.op_cat = 'dd'
      // app.op_id = event.target.getAttribute('data-id')
    },

    submitSign: function (event) {
      console.log(1123)
    },

    submit: function (event) {
      $('#auth').modal('hide')
      // $('#sign').modal('hide')
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
            $('#auth').modal('hide')
            if (response.data.status === 200) {
              $('#p-jsy-content').modal()
            } else {
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
    let auth = JSON.parse(sessionStorage.getItem("auth"))

    axios({
      method: 'GET',
      url: './api/journal02/jsy/bz/' + auth.dept,
      responseType: 'json'
    }).then(function (response) {
      app.content_jsy_bz = response.data.content
    })

    if (auth.dept === '质检') {
      axios({
        method: 'GET',
        url: './api/journal02/jsy/qc/' + auth.name,
        responseType: 'json'
      }).then(function (response) {
        app.content_jsy_qc = response.data.content
      })
    }

    if (auth.auth_p_jsy) {
      axios({
        method: 'GET',
        url: './api/journal02/jsy/?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(function (response) {
        app.content_jsy = response.data.content
      })
    }

    if (auth.auth_p_zbsz) {
      axios({
        method: 'GET',
        url: './api/journal02/zbsz/?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(function (response) {
        app.content_zbsz = response.data.content
      })
    }

    if (auth.auth_p_dd) {
      axios({
        method: 'GET',
        url: './api/journal02/dd/?timestamp=' + new Date().getTime(),
        responseType: 'json'
      }).then(function (response) {
        app.content_dd = response.data.content
      })
    }
  }
})
