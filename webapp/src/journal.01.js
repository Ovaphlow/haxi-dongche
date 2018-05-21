import navbar from './navbar.html'
import sidebar from './journal.sidebar.html'
import toolbar from './journal.01-toolbar.html'

document.getElementById('navbar').innerHTML = navbar
document.getElementById('sidebar').innerHTML = sidebar
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',
  data: {
    content: [],
    message: ''
  },
  created: () => {
    axios({
      method: 'GET',
      url: './api/journal01/',
      responseType: 'json'
    }).then(response => {
      console.log(response.data)
      app.content = response.data.content
      app.message = response.data.message
    })
  }
})