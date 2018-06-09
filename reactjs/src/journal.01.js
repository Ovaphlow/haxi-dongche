import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './Navbar'
ReactDOM.render(
  <Navbar/>,
  document.getElementById('navbar')
)

import Sidebar from './Sidebar'
ReactDOM.render(
  <Sidebar/>,
  document.getElementById('sidebar')
)

import Journal01Toolbar from './Journal.01.Toolbar'
ReactDOM.render(
  <Journal01Toolbar/>,
  document.getElementById('toolbar')
)

import Journal01Filter from './Journal.01.Filter'

ReactDOM.render(
  <Journal01Filter/>,
  document.getElementById('app')
)