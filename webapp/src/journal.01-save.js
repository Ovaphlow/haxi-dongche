import navbar from './navbar.html'
document.getElementById('navbar').innerHTML = navbar
import sidebar from './journal.sidebar.html'
document.getElementById('sidebar').innerHTML = sidebar
import toolbar from './journal.01-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let user = JSON.parse(sessionStorage.getItem('auth'))

let app = new Vue({
  el: '#app',
  data: {
    data: {},
    message: ''
  },
  methods: {
    setQty: function (event) {
      document.getElementById('quantity').innerHTML = app.data.quantity
    },
    submit: function () {
      axios({
        method: 'POST',
        url: './api/journal01/',
        data: {
          quantity: app.data.quantity,
          applicantId: user.id,
          applicant: user.name,
          dept: user.dept,
          remark: app.data.remark
        },
        responseType: 'json'
      }).then(function (response) {
        location.href = './journal.01-borrow.html'
      })
    }
  },
  created: function () {
    app.data.quantity = 1
    app.data.applicant = user.name
    app.data.dept = user.dept
    app.data.remark = ''
  }
})