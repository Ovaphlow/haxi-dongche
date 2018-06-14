import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-2.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

const user = JSON.parse(sessionStorage.getItem('auth'))

let app = new Vue({
  el: '#app',
  data: { message: '', req: {} },
  methods: {
    back: function () {
      location.href = './journal.02.html'
    },
    save: function () {
      app.message = ''
      if (!!!app.req.groupSN || !!!app.req.leader || !!!app.req.leaderPhone || !!!app.req.content) {
        app.message = '请完整填写申请内容。'
        return false
      }
      axios({
        method: 'POST',
        url: './api/journal02/',
        data: {
          applicant: app.req.applicant,
          applicantId: user.id,
          applicantPhone: app.req.applicantPhone,
          leader: app.req.leader,
          leaderPhone: app.req.leaderPhone,
          dept: app.req.dept,
          groupSN: app.req.groupSN,
          dateBegin: app.req.dateBegin,
          timeBegin: app.req.timeBegin,
          dateEnd: app.req.dateEnd,
          timeEnd: app.req.timeEnd,
          content: app.req.content,
          content_detail: app.req.content_detail,
          p_yq_xdc: app.req.p_yq_xdc,
          p_yq_jcw: app.req.p_yq_jcw,
          p_yq_zydd: app.req.p_yq_zydd,
          p_yq_qt: app.req.p_yq_qt || ''
        },
        responseType: 'json'
      }).then(function (response) {
        if (response.data.status !== 200) {
          app.message = response.data.message
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
    this.req.dateEnd = moment().format('YYYY-MM-DD')
    hour = moment({ hours: parseInt(hour) + 1 }).format('HH')
    this.req.timeEnd = hour + ':00'
    this.req.content_detail = ''
    this.req.p_yq_xdc = '无要求'
    this.req.p_yq_jcw = '无要求'
    this.req.p_yq_zydd = '无要求'
  }
})
