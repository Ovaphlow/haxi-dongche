import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Journal01Toolbar from './Journal.01-Toolbar'
import Journal01Filter from './Journal.01-Filter'

ReactDOM.render(
  <Navbar/>,
  document.getElementById('navbar')
)

ReactDOM.render(
  <Sidebar/>,
  document.getElementById('sidebar')
)

ReactDOM.render(
  <Journal01Toolbar/>,
  document.getElementById('toolbar')
)

axios({
  method: 'GET',
  url: '../api/journal01/',
  responseType: 'json'
}).then(function (response) {
  ReactDOM.render(
    <Journal01Filter list={response.data.content}/>,
    document.getElementById('app')
  )
})
