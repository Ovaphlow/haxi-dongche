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
      axios({
        method: 'POST',
        url: './api/journal02/',
        data: {
          applicant: this.req.applicant,
          applicantId: user.id,
          leader: this.req.leader,
          leaderPhone: this.req.leaderPhone,
          dept: this.req.dept,
          groupSN: this.req.groupSN,
          dateBegin: this.req.dateBegin,
          timeBegin: this.req.timeBegin,
          dateEnd: this.req.dateEnd,
          timeEnd: this.req.timeEnd,
          content: this.req.content,
          p_yq_xdc: this.req.p_yq_xdc,
          p_yq_jcw: this.req.p_yq_jcw,
          p_yq_zydd: this.req.p_yq_zydd,
          p_yq_qt: this.req.p_yq_qt || ''
        },
        responseType: 'json'
      }).then(response => {
        if (response.data.status !== 200) {
          alert(response.data.message)
        } else {
          location.href = './journal.02.html'
        }
      })
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