import navbar from './navbar.html'
import sidebar from './journal.sidebar.html'
import toolbar from './journal.02-toolbar.html'

document.getElementById('navbar').innerHTML = navbar
document.getElementById('sidebar').innerHTML = sidebar
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',
  data: {
    content: []
  },
  created: function () {
    axios({
      method: 'GET',
      url: './api/journal02/',
      responseType: 'json'
    }).then(response => {
      this.content = response.data.content
    })
  }
})