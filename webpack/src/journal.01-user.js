import navbar from './journal.navbar.html'
import sidebar from './journal.01-sidebar.html'

document.getElementById('navbar').innerHTML = navbar

document.getElementById('sidebar').innerHTML = sidebar

const user = JSON.parse(sessionStorage.getItem('auth'))

let app = new Vue({
  el: '#app',
  data: {
    user: JSON.parse(sessionStorage.getItem('auth')),
    content: [],
    message: ''
  },
  methods: {
    borrow: event => {
      axios({
        method: 'PUT',
        url: '../api/journal01/' + event.target.getAttribute('data-id') + '/borrow',
        data: {
          borrow: user.name,
          borrowId: user.id
        },
        responseType: 'json'
      }).then(response => {
        location.reload(true)
      })
    },
    detail: event => {
      console.log(event.target.getAttribute('data-id'))
    }
  },
  created: () => {
    if (user.auth_01) {
      axios({
        method: 'GET',
        url: '../api/journal01/admin/',
        responseType: 'json'
      }).then(response => {
        app.content = response.data.content
      })
    } else {
      axios({
        method: 'GET',
        url: '../api/journal01/applicant/' + user.id + '/',
        responseType: 'json'
      }).then((response) => {
        app.content = response.data.content
      })
    }
  }
})