import navbar from './navbar.html'
import sidebar from './journal.sidebar.html'
import toolbar from './journal.01-toolbar.html'

document.getElementById('navbar').innerHTML = navbar
document.getElementById('sidebar').innerHTML = sidebar
document.getElementById('toolbar').innerHTML = toolbar

const user = JSON.parse(sessionStorage.getItem('auth'))

let app = new Vue({
  el: '#app',
  data: {
    user: user,
    userList: [],
    content: [],
    cache: {}
  },
  methods: {
    linkReturn: function (event) {
      let journalId = event.target.getAttribute('data-id')
      componentReturn.refId = journalId

      $('#modal').modal({
        backdrop: 'static'
      })
    }
  },
  created: () => {
    if (user.auth_01) {
      axios({
        method: 'GET',
        url: './api/journal01/return/',
        responseType: 'json'
      }).then(response => {
        app.content = response.data.content
      })
    } else {
      // axios({
      //   method: 'GET',
      //   url: './api/journal01/applicant/' + user.id + '/',
      //   responseType: 'json'
      // }).then((response) => {
      //   console.log(response.data)
      //   // app.content = response.data.content
      // })
    }
  }
})

let componentReturn = new Vue({
  el: '#modal',
  data: {
    refId: 0,
    cache: {},
    userList: []
  },
  watch: {
    refId: function () {
      console.log(this.refId)
      axios({
        method: 'GET',
        url: './api/journal01/' + this.refId,
        responseType: 'json'
      }).then(response => {
        console.log(response.data)
        // this.cache = response.data.content
      })
    }
  },
  methods: {
    setReturn: function () {
      console.log('return id', this.cache.return)
      var elReturn = document.getElementById('cache.return')
      console.log('return', elReturn.options[elReturn.selectedIndex].text)
      console.log('quantity', this.cache.quantity)
      console.log('remark', this.cache.remark)
    }
  },
  created: function () {
    axios({
      method: 'GET',
      url: './api/user/dept/' + user.dept_id,
      responseType: 'json'
    }).then(response => {
      this.userList = response.data.content
    })
  }
})