import navbar from './journal.navbar.html'
import sidebar from './journal.01-sidebar.html'

document.getElementById('navbar').innerHTML = navbar

document.getElementById('sidebar').innerHTML = sidebar

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
        url: '../api/journal01/',
        data: {
          date: app.data.date,
          time: app.data.time,
          quantity: app.data.quantity,
          applicantId: user.id,
          applicant: user.name,
          dept: user.dept,
          remark: app.data.remark
        },
        responseType: 'json'
      }).then((response) => {
        location.href = './journal.01-user.html'
      })
    }
  },
  created: function () {
    this.data.quantity = 1
    this.data.applicant = user.name
    this.data.dept = user.dept
    this.data.date = moment(new Date()).format('YYYY-MM-DD')
    this.data.time = moment(new Date()).format('HH:mm:ss')
    this.data.remark = ''
  }
})