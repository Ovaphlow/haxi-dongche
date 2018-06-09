import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './Navbar'
import Sidebar from './Sidebar'

ReactDOM.render(
  <Navbar/>,
  document.getElementById('navbar')
)

ReactDOM.render(
  <Sidebar/>,
  document.getElementById('sidebar')
)