import navbar from './navbar.html'
import sidebar from './journal.sidebar.html'

const user = JSON.parse(sessionStorage.getItem('auth'))

if (!!!user) location.href = '../login.html'

document.getElementById('navbar').innerHTML = navbar
document.getElementById('sidebar').innerHTML = sidebar