!function(n){var a={};function r(t){if(a[t])return a[t].exports;var e=a[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=n,r.c=a,r.d=function(n,a,t){r.o(n,a)||Object.defineProperty(n,a,{configurable:!1,enumerable:!0,get:t})},r.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},r.n=function(n){var a=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(a,"a",a),a},r.o=function(n,a){return Object.prototype.hasOwnProperty.call(n,a)},r.p="",r(r.s=2)}([function(n,a){n.exports='<nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">\r\n  <a class="navbar-brand" href="./">哈尔滨动车段</a>\r\n\r\n  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\r\n    <span class="navbar-toggler-icon"></span>\r\n  </button>\r\n\r\n  <div class="collapse navbar-collapse" id="navbarSupportedContent">\r\n    <ul class="navbar-nav mr-auto">\r\n      <li class="nav-item active">\r\n        <a class="nav-link" href="./index.html">\r\n          首页\r\n        </a>\r\n      </li>\r\n      <li class="nav-item active">\r\n        <a class="nav-link" href="./journal.index.html">\r\n          账项\r\n        </a>\r\n      </li>\r\n      <li class="nav-item active">\r\n        <a href="./user.html" class="nav-link">用户</a>\r\n      </li>\r\n    </ul>\r\n    <ul class="navbar-nav float-right">\r\n      <li class="nav-item"><a href="../login.html" class="nav-link">注销</a></li>\r\n    </ul>\r\n  </div>\r\n</nav>'},function(n,a){n.exports='<div class="btn-group pull-right" role="group">\r\n  <a href="./journal.01.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-search"></i>\r\n    检索数据\r\n  </a>\r\n  <a href="./journal.01-save.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-plus"></i>\r\n    新增申请\r\n  </a>\r\n  <a href="./journal.01-user.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-user"></i>\r\n    当前申请\r\n  </a>\r\n</div>'},function(n,a,r){"use strict";r.r(a);var t=r(0),e=r.n(t),l=r(7),s=r.n(l),o=r(1),i=r.n(o);document.getElementById("navbar").innerHTML=e.a,document.getElementById("sidebar").innerHTML=s.a,document.getElementById("toolbar").innerHTML=i.a;const u=JSON.parse(sessionStorage.getItem("auth"));let c=new Vue({el:"#app",data:{user:JSON.parse(sessionStorage.getItem("auth")),content:[],message:""},methods:{borrow:n=>{axios({method:"PUT",url:"./api/journal01/"+n.target.getAttribute("data-id")+"/borrow",data:{borrow:u.name,borrowId:u.id},responseType:"json"}).then(n=>{location.reload(!0)})},detail:n=>{console.log(n.target.getAttribute("data-id"))}},created:()=>{u.auth_01?axios({method:"GET",url:"./api/journal01/admin/",responseType:"json"}).then(n=>{c.content=n.data.content}):axios({method:"GET",url:"./api/journal01/applicant/"+u.id+"/",responseType:"json"}).then(n=>{c.content=n.data.content})}})},,,,,function(n,a){n.exports='<div class="list-group" style="font-size:0.8em;">\r\n  <a href="./journal.01.html" class="list-group-item list-group-item-action">\r\n    01-检修车间禁动牌管理台账\r\n    <i class="fa fa-angle-right pull-right" aria-hidden="true"></i>\r\n  </a>\r\n\r\n  <a href="./journal.02.html" class="list-group-item list-group-item-action">\r\n    02-检修车间临时作业记录簿\r\n    <i class="fa fa-angle-right pull-right" aria-hidden="true"></i>\r\n  </a>\r\n</div>'}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdmJhci5odG1sIiwid2VicGFjazovLy8uL3NyYy9qb3VybmFsLjAxLXRvb2xiYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvam91cm5hbC4wMS11c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qb3VybmFsLnNpZGViYXIuaHRtbCJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJ2YWx1ZSIsIm4iLCJfX2VzTW9kdWxlIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsIl9uYXZiYXJfaHRtbF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fX2RlZmF1bHQiLCJhIiwiX2pvdXJuYWxfc2lkZWJhcl9odG1sX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX19fZGVmYXVsdCIsIl9qb3VybmFsXzAxX3Rvb2xiYXJfaHRtbF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fX2RlZmF1bHQiLCJ1c2VyIiwiSlNPTiIsInBhcnNlIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiYXBwIiwiVnVlIiwiZWwiLCJkYXRhIiwiY29udGVudCIsIm1lc3NhZ2UiLCJtZXRob2RzIiwiYm9ycm93IiwiZXZlbnQiLCJheGlvcyIsIm1ldGhvZCIsInVybCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsImJvcnJvd0lkIiwiaWQiLCJyZXNwb25zZVR5cGUiLCJ0aGVuIiwicmVzcG9uc2UiLCJsb2NhdGlvbiIsInJlbG9hZCIsImRldGFpbCIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVkIiwiYXV0aF8wMSJdLCJtYXBwaW5ncyI6ImFBQ0EsSUFBQUEsS0FHQSxTQUFBQyxFQUFBQyxHQUdBLEdBQUFGLEVBQUFFLEdBQ0EsT0FBQUYsRUFBQUUsR0FBQUMsUUFHQSxJQUFBQyxFQUFBSixFQUFBRSxJQUNBRyxFQUFBSCxFQUNBSSxHQUFBLEVBQ0FILFlBVUEsT0FOQUksRUFBQUwsR0FBQU0sS0FBQUosRUFBQUQsUUFBQUMsSUFBQUQsUUFBQUYsR0FHQUcsRUFBQUUsR0FBQSxFQUdBRixFQUFBRCxRQUtBRixFQUFBUSxFQUFBRixFQUdBTixFQUFBUyxFQUFBVixFQUdBQyxFQUFBVSxFQUFBLFNBQUFSLEVBQUFTLEVBQUFDLEdBQ0FaLEVBQUFhLEVBQUFYLEVBQUFTLElBQ0FHLE9BQUFDLGVBQUFiLEVBQUFTLEdBQ0FLLGNBQUEsRUFDQUMsWUFBQSxFQUNBQyxJQUFBTixLQU1BWixFQUFBbUIsRUFBQSxTQUFBakIsR0FDQVksT0FBQUMsZUFBQWIsRUFBQSxjQUFpRGtCLE9BQUEsS0FJakRwQixFQUFBcUIsRUFBQSxTQUFBbEIsR0FDQSxJQUFBUyxFQUFBVCxLQUFBbUIsV0FDQSxXQUEyQixPQUFBbkIsRUFBQSxTQUMzQixXQUFpQyxPQUFBQSxHQUVqQyxPQURBSCxFQUFBVSxFQUFBRSxFQUFBLElBQUFBLEdBQ0FBLEdBSUFaLEVBQUFhLEVBQUEsU0FBQVUsRUFBQUMsR0FBc0QsT0FBQVYsT0FBQVcsVUFBQUMsZUFBQW5CLEtBQUFnQixFQUFBQyxJQUd0RHhCLEVBQUEyQixFQUFBLEdBSUEzQixJQUFBNEIsRUFBQSxtQkNuRUF6QixFQUFBRCxRQUFBLGdrQ0NBQUMsRUFBQUQsUUFBQSxzZ0JDSUEyQixTQUFBQyxlQUFBLFVBQUFDLFVBQUFDLEVBQUFDLEVBQ0FKLFNBQUFDLGVBQUEsV0FBQUMsVUFBQUcsRUFBQUQsRUFDQUosU0FBQUMsZUFBQSxXQUFBQyxVQUFBSSxFQUFBRixFQUVBLE1BQUFHLEVBQUFDLEtBQUFDLE1BQUFDLGVBQUFDLFFBQUEsU0FFQSxJQUFBQyxFQUFBLElBQUFDLEtBQ0FDLEdBQUEsT0FDQUMsTUFDQVIsS0FBQUMsS0FBQUMsTUFBQUMsZUFBQUMsUUFBQSxTQUNBSyxXQUNBQyxRQUFBLElBRUFDLFNBQ0FDLE9BQUFDLElBQ0FDLE9BQ0FDLE9BQUEsTUFDQUMsSUFBQSxtQkFBQUgsRUFBQUksT0FBQUMsYUFBQSxxQkFDQVYsTUFDQUksT0FBQVosRUFBQXpCLEtBQ0E0QyxTQUFBbkIsRUFBQW9CLElBRUFDLGFBQUEsU0FDT0MsS0FBQUMsSUFDUEMsU0FBQUMsUUFBQSxNQUdBQyxPQUFBYixJQUNBYyxRQUFBQyxJQUFBZixFQUFBSSxPQUFBQyxhQUFBLGNBR0FXLFFBQUEsS0FDQTdCLEVBQUE4QixRQUNBaEIsT0FDQUMsT0FBQSxNQUNBQyxJQUFBLHlCQUNBSyxhQUFBLFNBQ09DLEtBQUFDLElBQ1BsQixFQUFBSSxRQUFBYyxFQUFBZixLQUFBQyxVQUdBSyxPQUNBQyxPQUFBLE1BQ0FDLElBQUEsNkJBQUFoQixFQUFBb0IsR0FBQSxJQUNBQyxhQUFBLFNBQ09DLEtBQUFDLElBQ1BsQixFQUFBSSxRQUFBYyxFQUFBZixLQUFBQyxnQ0NsREExQyxFQUFBRCxRQUFBIiwiZmlsZSI6ImpvdXJuYWwuMDEtdXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG5hdiBjbGFzcz1cXFwibmF2YmFyIG5hdmJhci1leHBhbmQtc20gbmF2YmFyLWRhcmsgYmctZGFyayBmaXhlZC10b3BcXFwiPlxcclxcbiAgPGEgY2xhc3M9XFxcIm5hdmJhci1icmFuZFxcXCIgaHJlZj1cXFwiLi9cXFwiPuWTiOWwlOa7qOWKqOi9puautTwvYT5cXHJcXG5cXHJcXG4gIDxidXR0b24gY2xhc3M9XFxcIm5hdmJhci10b2dnbGVyXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtdG9nZ2xlPVxcXCJjb2xsYXBzZVxcXCIgZGF0YS10YXJnZXQ9XFxcIiNuYXZiYXJTdXBwb3J0ZWRDb250ZW50XFxcIiBhcmlhLWNvbnRyb2xzPVxcXCJuYXZiYXJTdXBwb3J0ZWRDb250ZW50XFxcIiBhcmlhLWV4cGFuZGVkPVxcXCJmYWxzZVxcXCIgYXJpYS1sYWJlbD1cXFwiVG9nZ2xlIG5hdmlnYXRpb25cXFwiPlxcclxcbiAgICA8c3BhbiBjbGFzcz1cXFwibmF2YmFyLXRvZ2dsZXItaWNvblxcXCI+PC9zcGFuPlxcclxcbiAgPC9idXR0b24+XFxyXFxuXFxyXFxuICA8ZGl2IGNsYXNzPVxcXCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcXFwiIGlkPVxcXCJuYXZiYXJTdXBwb3J0ZWRDb250ZW50XFxcIj5cXHJcXG4gICAgPHVsIGNsYXNzPVxcXCJuYXZiYXItbmF2IG1yLWF1dG9cXFwiPlxcclxcbiAgICAgIDxsaSBjbGFzcz1cXFwibmF2LWl0ZW0gYWN0aXZlXFxcIj5cXHJcXG4gICAgICAgIDxhIGNsYXNzPVxcXCJuYXYtbGlua1xcXCIgaHJlZj1cXFwiLi9pbmRleC5odG1sXFxcIj5cXHJcXG4gICAgICAgICAg6aaW6aG1XFxyXFxuICAgICAgICA8L2E+XFxyXFxuICAgICAgPC9saT5cXHJcXG4gICAgICA8bGkgY2xhc3M9XFxcIm5hdi1pdGVtIGFjdGl2ZVxcXCI+XFxyXFxuICAgICAgICA8YSBjbGFzcz1cXFwibmF2LWxpbmtcXFwiIGhyZWY9XFxcIi4vam91cm5hbC5pbmRleC5odG1sXFxcIj5cXHJcXG4gICAgICAgICAg6LSm6aG5XFxyXFxuICAgICAgICA8L2E+XFxyXFxuICAgICAgPC9saT5cXHJcXG4gICAgICA8bGkgY2xhc3M9XFxcIm5hdi1pdGVtIGFjdGl2ZVxcXCI+XFxyXFxuICAgICAgICA8YSBocmVmPVxcXCIuL3VzZXIuaHRtbFxcXCIgY2xhc3M9XFxcIm5hdi1saW5rXFxcIj7nlKjmiLc8L2E+XFxyXFxuICAgICAgPC9saT5cXHJcXG4gICAgPC91bD5cXHJcXG4gICAgPHVsIGNsYXNzPVxcXCJuYXZiYXItbmF2IGZsb2F0LXJpZ2h0XFxcIj5cXHJcXG4gICAgICA8bGkgY2xhc3M9XFxcIm5hdi1pdGVtXFxcIj48YSBocmVmPVxcXCIuLi9sb2dpbi5odG1sXFxcIiBjbGFzcz1cXFwibmF2LWxpbmtcXFwiPuazqOmUgDwvYT48L2xpPlxcclxcbiAgICA8L3VsPlxcclxcbiAgPC9kaXY+XFxyXFxuPC9uYXY+XCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImJ0bi1ncm91cCBwdWxsLXJpZ2h0XFxcIiByb2xlPVxcXCJncm91cFxcXCI+XFxyXFxuICA8YSBocmVmPVxcXCIuL2pvdXJuYWwuMDEuaHRtbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLXNtXFxcIj5cXHJcXG4gICAgPGkgY2xhc3M9XFxcImZhIGZhLXNlYXJjaFxcXCI+PC9pPlxcclxcbiAgICDmo4DntKLmlbDmja5cXHJcXG4gIDwvYT5cXHJcXG4gIDxhIGhyZWY9XFxcIi4vam91cm5hbC4wMS1zYXZlLmh0bWxcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxpZ2h0IGJ0bi1zbVxcXCI+XFxyXFxuICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1wbHVzXFxcIj48L2k+XFxyXFxuICAgIOaWsOWinueUs+ivt1xcclxcbiAgPC9hPlxcclxcbiAgPGEgaHJlZj1cXFwiLi9qb3VybmFsLjAxLXVzZXIuaHRtbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLXNtXFxcIj5cXHJcXG4gICAgPGkgY2xhc3M9XFxcImZhIGZhLXVzZXJcXFwiPjwvaT5cXHJcXG4gICAg5b2T5YmN55Sz6K+3XFxyXFxuICA8L2E+XFxyXFxuPC9kaXY+XCI7IiwiaW1wb3J0IG5hdmJhciBmcm9tICcuL25hdmJhci5odG1sJ1xyXG5pbXBvcnQgc2lkZWJhciBmcm9tICcuL2pvdXJuYWwuc2lkZWJhci5odG1sJ1xyXG5pbXBvcnQgdG9vbGJhciBmcm9tICcuL2pvdXJuYWwuMDEtdG9vbGJhci5odG1sJ1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhcicpLmlubmVySFRNTCA9IG5hdmJhclxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZWJhcicpLmlubmVySFRNTCA9IHNpZGViYXJcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rvb2xiYXInKS5pbm5lckhUTUwgPSB0b29sYmFyXHJcblxyXG5jb25zdCB1c2VyID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhdXRoJykpXHJcblxyXG5sZXQgYXBwID0gbmV3IFZ1ZSh7XHJcbiAgZWw6ICcjYXBwJyxcclxuICBkYXRhOiB7XHJcbiAgICB1c2VyOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2F1dGgnKSksXHJcbiAgICBjb250ZW50OiBbXSxcclxuICAgIG1lc3NhZ2U6ICcnXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBib3Jyb3c6IGV2ZW50ID0+IHtcclxuICAgICAgYXhpb3Moe1xyXG4gICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgdXJsOiAnLi9hcGkvam91cm5hbDAxLycgKyBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykgKyAnL2JvcnJvdycsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgYm9ycm93OiB1c2VyLm5hbWUsXHJcbiAgICAgICAgICBib3Jyb3dJZDogdXNlci5pZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbidcclxuICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKHRydWUpXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZGV0YWlsOiBldmVudCA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSlcclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZWQ6ICgpID0+IHtcclxuICAgIGlmICh1c2VyLmF1dGhfMDEpIHtcclxuICAgICAgYXhpb3Moe1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgdXJsOiAnLi9hcGkvam91cm5hbDAxL2FkbWluLycsXHJcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbidcclxuICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgYXBwLmNvbnRlbnQgPSByZXNwb25zZS5kYXRhLmNvbnRlbnRcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGF4aW9zKHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIHVybDogJy4vYXBpL2pvdXJuYWwwMS9hcHBsaWNhbnQvJyArIHVzZXIuaWQgKyAnLycsXHJcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbidcclxuICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBhcHAuY29udGVudCA9IHJlc3BvbnNlLmRhdGEuY29udGVudFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufSkiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCIgc3R5bGU9XFxcImZvbnQtc2l6ZTowLjhlbTtcXFwiPlxcclxcbiAgPGEgaHJlZj1cXFwiLi9qb3VybmFsLjAxLmh0bWxcXFwiIGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvblxcXCI+XFxyXFxuICAgIDAxLeajgOS/rui9pumXtOemgeWKqOeJjOeuoeeQhuWPsOi0plxcclxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtcmlnaHQgcHVsbC1yaWdodFxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPjwvaT5cXHJcXG4gIDwvYT5cXHJcXG5cXHJcXG4gIDxhIGhyZWY9XFxcIi4vam91cm5hbC4wMi5odG1sXFxcIiBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb25cXFwiPlxcclxcbiAgICAwMi3mo4Dkv67ovabpl7TkuLTml7bkvZzkuJrorrDlvZXnsL9cXHJcXG4gICAgPGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLXJpZ2h0IHB1bGwtcmlnaHRcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj48L2k+XFxyXFxuICA8L2E+XFxyXFxuPC9kaXY+XCI7Il0sInNvdXJjZVJvb3QiOiIifQ==