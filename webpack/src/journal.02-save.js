import navbar from './navbar.html'
import sidebar from './journal.sidebar.html'
import toolbar from './journal.02-toolbar.html'

document.getElementById('navbar').innerHTML = navbar
document.getElementById('sidebar').innerHTML = sidebar
document.getElementById('toolbar').innerHTML = toolbar

const user = JSON.parse(sessionStorage.getItem('auth'))

let app = new Vue({
  el: '#app',
  data: { req: {} },
  methods: {
    back: function () {
      location.href = './journal.02.html'
    },
    save: function () {
      console.log(1123)
    }
  },
  created: function () {
    this.req.dept = user.dept
    this.req.applicant = user.name
    this.req.applicantPhone = user.phone
    this.req.leader = user.name
    this.req.leaderPhone = user.phone
    this.req.dateBegin = moment().format('YYYY-MM-DD')
    let hour = moment({ hours: parseInt(moment().format('HH')) + 1 }).format('HH')
    this.req.timeBegin = hour + ':00'
    this.req.dateEnd = this.req.dateBegin
    hour = moment({ hours: parseInt(hour) + 1 }).format('HH')
    this.req.timeEnd = hour + ':00'
    this.req.p_yq_xdc = '无要求'
    this.req.p_yq_jcw = '无要求'
    this.req.p_yq_zydd = '无要求'
  }
})