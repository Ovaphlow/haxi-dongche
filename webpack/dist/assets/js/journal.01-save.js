!function(a){var n={};function t(r){if(n[r])return n[r].exports;var e=n[r]={i:r,l:!1,exports:{}};return a[r].call(e.exports,e,e.exports,t),e.l=!0,e.exports}t.m=a,t.c=n,t.d=function(a,n,r){t.o(a,n)||Object.defineProperty(a,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(a){Object.defineProperty(a,"__esModule",{value:!0})},t.n=function(a){var n=a&&a.__esModule?function(){return a.default}:function(){return a};return t.d(n,"a",n),n},t.o=function(a,n){return Object.prototype.hasOwnProperty.call(a,n)},t.p="",t(t.s=5)}([function(a,n){a.exports='<div class="list-group" style="font-size:0.8em;">\r\n  <a href="./journal.01.html" class="list-group-item list-group-item-action">\r\n    01-检修车间禁动牌管理台账\r\n    <i class="fa fa-angle-right pull-right" aria-hidden="true"></i>\r\n  </a>\r\n\r\n  <a href="./journal.02.html" class="list-group-item list-group-item-action">\r\n    02-检修车间临时作业记录簿\r\n    <i class="fa fa-angle-right pull-right" aria-hidden="true"></i>\r\n  </a>\r\n</div>'},function(a,n){a.exports='<nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">\r\n  <a class="navbar-brand" href="./">哈尔滨动车段</a>\r\n\r\n  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\r\n    <span class="navbar-toggler-icon"></span>\r\n  </button>\r\n\r\n  <div class="collapse navbar-collapse" id="navbarSupportedContent">\r\n    <ul class="navbar-nav mr-auto">\r\n      <li class="nav-item active">\r\n        <a class="nav-link" href="./index.html">\r\n          首页\r\n        </a>\r\n      </li>\r\n      <li class="nav-item active">\r\n        <a class="nav-link" href="./journal.index.html">\r\n          账项\r\n        </a>\r\n      </li>\r\n      <li class="nav-item active">\r\n        <a href="./user.html" class="nav-link">用户</a>\r\n      </li>\r\n    </ul>\r\n    <ul class="navbar-nav float-right">\r\n      <li class="nav-item"><a href="../login.html" class="nav-link">注销</a></li>\r\n    </ul>\r\n  </div>\r\n</nav>'},function(a,n){a.exports='<div class="btn-group pull-right" role="group">\r\n  <a href="./journal.01.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-search"></i>\r\n    检索数据\r\n  </a>\r\n  <a href="./journal.01-save.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-plus"></i>\r\n    新增申请\r\n  </a>\r\n  <a href="./journal.01-borrow.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-upload"></i>\r\n    发放\r\n  </a>\r\n  <a href="./journal.01-return.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-download"></i>\r\n    返还\r\n  </a>\r\n</div>'},,,function(a,n,t){"use strict";t.r(n);var r=t(1),e=t.n(r),l=t(0),i=t.n(l),s=t(2),o=t.n(s);document.getElementById("navbar").innerHTML=e.a,document.getElementById("sidebar").innerHTML=i.a,document.getElementById("toolbar").innerHTML=o.a;let u=JSON.parse(sessionStorage.getItem("auth")),c=new Vue({el:"#app",data:{data:{},message:""},methods:{setQty:function(a){document.getElementById("quantity").innerHTML=c.data.quantity},submit:function(){axios({method:"POST",url:"./api/journal01/",data:{quantity:c.data.quantity,applicantId:u.id,applicant:u.name,dept:u.dept,remark:c.data.remark},responseType:"json"}).then(a=>{location.href="./journal.01-borrow.html"})}},created:function(){this.data.quantity=1,this.data.applicant=u.name,this.data.dept=u.dept,this.data.remark=""}})}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pvdXJuYWwuc2lkZWJhci5odG1sIiwid2VicGFjazovLy8uL3NyYy9uYXZiYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvam91cm5hbC4wMS10b29sYmFyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pvdXJuYWwuMDEtc2F2ZS5qcyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJ2YWx1ZSIsIm4iLCJfX2VzTW9kdWxlIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsIl9uYXZiYXJfaHRtbF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fX2RlZmF1bHQiLCJhIiwiX2pvdXJuYWxfc2lkZWJhcl9odG1sX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX19fZGVmYXVsdCIsIl9qb3VybmFsXzAxX3Rvb2xiYXJfaHRtbF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fX2RlZmF1bHQiLCJ1c2VyIiwiSlNPTiIsInBhcnNlIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiYXBwIiwiVnVlIiwiZWwiLCJkYXRhIiwibWVzc2FnZSIsIm1ldGhvZHMiLCJzZXRRdHkiLCJldmVudCIsInF1YW50aXR5Iiwic3VibWl0IiwiYXhpb3MiLCJtZXRob2QiLCJ1cmwiLCJhcHBsaWNhbnRJZCIsImlkIiwiYXBwbGljYW50IiwiZGVwdCIsInJlbWFyayIsInJlc3BvbnNlVHlwZSIsInRoZW4iLCJyZXNwb25zZSIsImxvY2F0aW9uIiwiaHJlZiIsImNyZWF0ZWQiLCJ0aGlzIl0sIm1hcHBpbmdzIjoiYUFDQSxJQUFBQSxLQUdBLFNBQUFDLEVBQUFDLEdBR0EsR0FBQUYsRUFBQUUsR0FDQSxPQUFBRixFQUFBRSxHQUFBQyxRQUdBLElBQUFDLEVBQUFKLEVBQUFFLElBQ0FHLEVBQUFILEVBQ0FJLEdBQUEsRUFDQUgsWUFVQSxPQU5BSSxFQUFBTCxHQUFBTSxLQUFBSixFQUFBRCxRQUFBQyxJQUFBRCxRQUFBRixHQUdBRyxFQUFBRSxHQUFBLEVBR0FGLEVBQUFELFFBS0FGLEVBQUFRLEVBQUFGLEVBR0FOLEVBQUFTLEVBQUFWLEVBR0FDLEVBQUFVLEVBQUEsU0FBQVIsRUFBQVMsRUFBQUMsR0FDQVosRUFBQWEsRUFBQVgsRUFBQVMsSUFDQUcsT0FBQUMsZUFBQWIsRUFBQVMsR0FDQUssY0FBQSxFQUNBQyxZQUFBLEVBQ0FDLElBQUFOLEtBTUFaLEVBQUFtQixFQUFBLFNBQUFqQixHQUNBWSxPQUFBQyxlQUFBYixFQUFBLGNBQWlEa0IsT0FBQSxLQUlqRHBCLEVBQUFxQixFQUFBLFNBQUFsQixHQUNBLElBQUFTLEVBQUFULEtBQUFtQixXQUNBLFdBQTJCLE9BQUFuQixFQUFBLFNBQzNCLFdBQWlDLE9BQUFBLEdBRWpDLE9BREFILEVBQUFVLEVBQUFFLEVBQUEsSUFBQUEsR0FDQUEsR0FJQVosRUFBQWEsRUFBQSxTQUFBVSxFQUFBQyxHQUFzRCxPQUFBVixPQUFBVyxVQUFBQyxlQUFBbkIsS0FBQWdCLEVBQUFDLElBR3REeEIsRUFBQTJCLEVBQUEsR0FJQTNCLElBQUE0QixFQUFBLG1CQ25FQXpCLEVBQUFELFFBQUEsaWNDQUFDLEVBQUFELFFBQUEsZ2tDQ0FBQyxFQUFBRCxRQUFBLDBvQkNJQTJCLFNBQUFDLGVBQUEsVUFBQUMsVUFBQUMsRUFBQUMsRUFDQUosU0FBQUMsZUFBQSxXQUFBQyxVQUFBRyxFQUFBRCxFQUNBSixTQUFBQyxlQUFBLFdBQUFDLFVBQUFJLEVBQUFGLEVBRUEsSUFBQUcsRUFBQUMsS0FBQUMsTUFBQUMsZUFBQUMsUUFBQSxTQUVBQyxFQUFBLElBQUFDLEtBQ0FDLEdBQUEsT0FDQUMsTUFDQUEsUUFDQUMsUUFBQSxJQUVBQyxTQUNBQyxPQUFBLFNBQUFDLEdBQ0FuQixTQUFBQyxlQUFBLFlBQUFDLFVBQUFVLEVBQUFHLEtBQUFLLFVBRUFDLE9BQUEsV0FDQUMsT0FDQUMsT0FBQSxPQUNBQyxJQUFBLG1CQUNBVCxNQUNBSyxTQUFBUixFQUFBRyxLQUFBSyxTQUNBSyxZQUFBbEIsRUFBQW1CLEdBQ0FDLFVBQUFwQixFQUFBekIsS0FDQThDLEtBQUFyQixFQUFBcUIsS0FDQUMsT0FBQWpCLEVBQUFHLEtBQUFjLFFBRUFDLGFBQUEsU0FDT0MsS0FBQUMsSUFDUEMsU0FBQUMsS0FBQSwrQkFJQUMsUUFBQSxXQUNBQyxLQUFBckIsS0FBQUssU0FBQSxFQUNBZ0IsS0FBQXJCLEtBQUFZLFVBQUFwQixFQUFBekIsS0FDQXNELEtBQUFyQixLQUFBYSxLQUFBckIsRUFBQXFCLEtBQ0FRLEtBQUFyQixLQUFBYyxPQUFBIiwiZmlsZSI6ImpvdXJuYWwuMDEtc2F2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCIgc3R5bGU9XFxcImZvbnQtc2l6ZTowLjhlbTtcXFwiPlxcclxcbiAgPGEgaHJlZj1cXFwiLi9qb3VybmFsLjAxLmh0bWxcXFwiIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvblxcXCI+XFxyXFxuICAgIDAxLeajgOS/rui9pumXtOemgeWKqOeJjOeuoeeQhuWPsOi0plxcclxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtcmlnaHQgcHVsbC1yaWdodFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPjwvaT5cXHJcXG4gIDwvYT5cXHJcXG5cXHJcXG4gIDxhIGhyZWY9XFxcIi4vam91cm5hbC4wMi5odG1sXFxcIiBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb25cXFwiPlxcclxcbiAgICAwMi3mo4Dkv67ovabpl7TkuLTml7bkvZzkuJrorrDlvZXnsL9cXHJcXG4gICAgPGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLXJpZ2h0IHB1bGwtcmlnaHRcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj48L2k+XFxyXFxuICA8L2E+XFxyXFxuPC9kaXY+XCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYgY2xhc3M9XFxcIm5hdmJhciBuYXZiYXItZXhwYW5kLXNtIG5hdmJhci1kYXJrIGJnLWRhcmsgZml4ZWQtdG9wXFxcIj5cXHJcXG4gIDxhIGNsYXNzPVxcXCJuYXZiYXItYnJhbmRcXFwiIGhyZWY9XFxcIi4vXFxcIj7lk4jlsJTmu6jliqjovabmrrU8L2E+XFxyXFxuXFxyXFxuICA8YnV0dG9uIGNsYXNzPVxcXCJuYXZiYXItdG9nZ2xlclxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLXRvZ2dsZT1cXFwiY29sbGFwc2VcXFwiIGRhdGEtdGFyZ2V0PVxcXCIjbmF2YmFyU3VwcG9ydGVkQ29udGVudFxcXCIgYXJpYS1jb250cm9scz1cXFwibmF2YmFyU3VwcG9ydGVkQ29udGVudFxcXCIgYXJpYS1leHBhbmRlZD1cXFwiZmFsc2VcXFwiIGFyaWEtbGFiZWw9XFxcIlRvZ2dsZSBuYXZpZ2F0aW9uXFxcIj5cXHJcXG4gICAgPHNwYW4gY2xhc3M9XFxcIm5hdmJhci10b2dnbGVyLWljb25cXFwiPjwvc3Bhbj5cXHJcXG4gIDwvYnV0dG9uPlxcclxcblxcclxcbiAgPGRpdiBjbGFzcz1cXFwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXFxcIiBpZD1cXFwibmF2YmFyU3VwcG9ydGVkQ29udGVudFxcXCI+XFxyXFxuICAgIDx1bCBjbGFzcz1cXFwibmF2YmFyLW5hdiBtci1hdXRvXFxcIj5cXHJcXG4gICAgICA8bGkgY2xhc3M9XFxcIm5hdi1pdGVtIGFjdGl2ZVxcXCI+XFxyXFxuICAgICAgICA8YSBjbGFzcz1cXFwibmF2LWxpbmtcXFwiIGhyZWY9XFxcIi4vaW5kZXguaHRtbFxcXCI+XFxyXFxuICAgICAgICAgIOmmlumhtVxcclxcbiAgICAgICAgPC9hPlxcclxcbiAgICAgIDwvbGk+XFxyXFxuICAgICAgPGxpIGNsYXNzPVxcXCJuYXYtaXRlbSBhY3RpdmVcXFwiPlxcclxcbiAgICAgICAgPGEgY2xhc3M9XFxcIm5hdi1saW5rXFxcIiBocmVmPVxcXCIuL2pvdXJuYWwuaW5kZXguaHRtbFxcXCI+XFxyXFxuICAgICAgICAgIOi0pumhuVxcclxcbiAgICAgICAgPC9hPlxcclxcbiAgICAgIDwvbGk+XFxyXFxuICAgICAgPGxpIGNsYXNzPVxcXCJuYXYtaXRlbSBhY3RpdmVcXFwiPlxcclxcbiAgICAgICAgPGEgaHJlZj1cXFwiLi91c2VyLmh0bWxcXFwiIGNsYXNzPVxcXCJuYXYtbGlua1xcXCI+55So5oi3PC9hPlxcclxcbiAgICAgIDwvbGk+XFxyXFxuICAgIDwvdWw+XFxyXFxuICAgIDx1bCBjbGFzcz1cXFwibmF2YmFyLW5hdiBmbG9hdC1yaWdodFxcXCI+XFxyXFxuICAgICAgPGxpIGNsYXNzPVxcXCJuYXYtaXRlbVxcXCI+PGEgaHJlZj1cXFwiLi4vbG9naW4uaHRtbFxcXCIgY2xhc3M9XFxcIm5hdi1saW5rXFxcIj7ms6jplIA8L2E+PC9saT5cXHJcXG4gICAgPC91bD5cXHJcXG4gIDwvZGl2PlxcclxcbjwvbmF2PlwiOyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJidG4tZ3JvdXAgcHVsbC1yaWdodFxcXCIgcm9sZT1cXFwiZ3JvdXBcXFwiPlxcclxcbiAgPGEgaHJlZj1cXFwiLi9qb3VybmFsLjAxLmh0bWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1zbVxcXCI+XFxyXFxuICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1zZWFyY2hcXFwiPjwvaT5cXHJcXG4gICAg5qOA57Si5pWw5o2uXFxyXFxuICA8L2E+XFxyXFxuICA8YSBocmVmPVxcXCIuL2pvdXJuYWwuMDEtc2F2ZS5odG1sXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1saWdodCBidG4tc21cXFwiPlxcclxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEtcGx1c1xcXCI+PC9pPlxcclxcbiAgICDmlrDlop7nlLPor7dcXHJcXG4gIDwvYT5cXHJcXG4gIDxhIGhyZWY9XFxcIi4vam91cm5hbC4wMS1ib3Jyb3cuaHRtbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLXNtXFxcIj5cXHJcXG4gICAgPGkgY2xhc3M9XFxcImZhIGZhLXVwbG9hZFxcXCI+PC9pPlxcclxcbiAgICDlj5HmlL5cXHJcXG4gIDwvYT5cXHJcXG4gIDxhIGhyZWY9XFxcIi4vam91cm5hbC4wMS1yZXR1cm4uaHRtbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLXNtXFxcIj5cXHJcXG4gICAgPGkgY2xhc3M9XFxcImZhIGZhLWRvd25sb2FkXFxcIj48L2k+XFxyXFxuICAgIOi/lOi/mFxcclxcbiAgPC9hPlxcclxcbjwvZGl2PlwiOyIsImltcG9ydCBuYXZiYXIgZnJvbSAnLi9uYXZiYXIuaHRtbCdcclxuaW1wb3J0IHNpZGViYXIgZnJvbSAnLi9qb3VybmFsLnNpZGViYXIuaHRtbCdcclxuaW1wb3J0IHRvb2xiYXIgZnJvbSAnLi9qb3VybmFsLjAxLXRvb2xiYXIuaHRtbCdcclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZiYXInKS5pbm5lckhUTUwgPSBuYXZiYXJcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXInKS5pbm5lckhUTUwgPSBzaWRlYmFyXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b29sYmFyJykuaW5uZXJIVE1MID0gdG9vbGJhclxyXG5cclxubGV0IHVzZXIgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2F1dGgnKSlcclxuXHJcbmxldCBhcHAgPSBuZXcgVnVlKHtcclxuICBlbDogJyNhcHAnLFxyXG4gIGRhdGE6IHtcclxuICAgIGRhdGE6IHt9LFxyXG4gICAgbWVzc2FnZTogJydcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIHNldFF0eTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWFudGl0eScpLmlubmVySFRNTCA9IGFwcC5kYXRhLnF1YW50aXR5XHJcbiAgICB9LFxyXG4gICAgc3VibWl0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGF4aW9zKHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICB1cmw6ICcuL2FwaS9qb3VybmFsMDEvJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBxdWFudGl0eTogYXBwLmRhdGEucXVhbnRpdHksXHJcbiAgICAgICAgICBhcHBsaWNhbnRJZDogdXNlci5pZCxcclxuICAgICAgICAgIGFwcGxpY2FudDogdXNlci5uYW1lLFxyXG4gICAgICAgICAgZGVwdDogdXNlci5kZXB0LFxyXG4gICAgICAgICAgcmVtYXJrOiBhcHAuZGF0YS5yZW1hcmtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nXHJcbiAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcuL2pvdXJuYWwuMDEtYm9ycm93Lmh0bWwnXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBjcmVhdGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmRhdGEucXVhbnRpdHkgPSAxXHJcbiAgICB0aGlzLmRhdGEuYXBwbGljYW50ID0gdXNlci5uYW1lXHJcbiAgICB0aGlzLmRhdGEuZGVwdCA9IHVzZXIuZGVwdFxyXG4gICAgdGhpcy5kYXRhLnJlbWFyayA9ICcnXHJcbiAgfVxyXG59KSJdLCJzb3VyY2VSb290IjoiIn0=