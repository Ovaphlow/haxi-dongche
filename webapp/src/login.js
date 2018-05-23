document.addEventListener('DOMContentLoaded', function () {
  var app = new Vue({
    el: '#app',
    data: {
      data: {},
      message: '',
      content: {}
    },
    methods: {
      submit: function () {
        this.message = ''
        if (!!!this.data.username || !!!this.data.password) {
          this.message = '账号或密码不能为空'
          return false
        }
        axios({
          method: 'POST',
          url: './api/user/login',
          data: {
            account: this.data.username,
            password: md5(this.data.password)
            // password: this.data.password
          },
          responseType: 'json'
        }).then(function (response) {
          if (response.data.status !== 200) {
            this.message = response.data.message
            return false
          } else {
            if (response.data.content.length === 0) {
              this.message = '用户名或密码错误。'
              return false
            } else if (response.data.content.length > 1) {
              this.message = '用户数据异常，请联系管理员。'
              return false
            }
            sessionStorage.setItem('auth', JSON.stringify(response.data.content[0]))
            location.href = './index.html'
          }
        })
      }
    }
  })
})
