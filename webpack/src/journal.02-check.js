import navbar from './navbar.html'
import sidebar from './journal.sidebar.html'
import toolbar from './journal.02-toolbar.html'

document.getElementById('navbar').innerHTML = navbar
document.getElementById('sidebar').innerHTML = sidebar
document.getElementById('toolbar').innerHTML = toolbar

let user = JSON.parse(sessionStorage.getItem('auth'))

// if (!!!user.auth_p_jsy && !!!user.auth_p_zbsz && !!!user.auth_p_dd) {
//   alert('当前用户没有对应权限。')
//   location.href = './journal.02.html'
// }

let app = new Vue({
  el: '#app',
  data: {
    content_jsy: [],
    content_zbsz: [],
    content_dd: [],
    op_cat: '',
    op_id: 0
  },
  methods: {
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
    check: function (event) {
      axios({
        method: 'POST',
        url: './api/user/login',
        data: {
          username: document.getElementById('authAccount').value,
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