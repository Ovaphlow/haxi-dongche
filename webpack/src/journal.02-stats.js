import navbar from './navbar.html'
document.getElementById('navbar').innerHTML = navbar

import sidebar from './journal.sidebar.html'
document.getElementById('sidebar').innerHTML = sidebar

import toolbar from './journal.02-toolbar.html'
document.getElementById('toolbar').innerHTML = toolbar

let app = new Vue({
  el: '#app',
  data: {},
  methods: {},
  created: function () {
    axios({
      method: 'GET',
      url: './api/journal02/stats',
      responseType: 'json'
    }).then(response => {
      var chart = echarts.init(document.getElementById('chart'))
      var option = {
        title: {
          text: '用户操作数据统计',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '操作',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: response.data.content,
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        ]
      }
      chart.setOption(option)
    })
  }
})