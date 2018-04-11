document.addEventListener('DOMContentLoaded', function () {
  var app = new Vue({
    el: '#app',
    data: {
      message: '',
      account: '',
      password: ''
    },
    methods: {
      submit: function () {
        this.message = ''
        if (!!!this.account || !!!this.password) {
          this.message = '账号或密码不能为空'
          return false
        }
        axios({
          method: 'POST',
          url: '',
          data: {
            account: this.account,
            password: this.password
          },
          responseType: 'json'
        })
      }
    }
  })
})
