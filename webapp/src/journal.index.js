import navbar from './navbar-2.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './sidebar-2.html'
document.getElementById('sidebar').innerHTML = sidebar

const user = JSON.parse(sessionStorage.getItem('auth'))

if (!!!user) location.href = './login.html'
