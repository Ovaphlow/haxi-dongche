!function(a){var n={};function t(r){if(n[r])return n[r].exports;var e=n[r]={i:r,l:!1,exports:{}};return a[r].call(e.exports,e,e.exports,t),e.l=!0,e.exports}t.m=a,t.c=n,t.d=function(a,n,r){t.o(a,n)||Object.defineProperty(a,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(a){Object.defineProperty(a,"__esModule",{value:!0})},t.n=function(a){var n=a&&a.__esModule?function(){return a.default}:function(){return a};return t.d(n,"a",n),n},t.o=function(a,n){return Object.prototype.hasOwnProperty.call(a,n)},t.p="",t(t.s=3)}([function(a,n){a.exports='<nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">\r\n  <a class="navbar-brand" href="./">哈尔滨动车段</a>\r\n\r\n  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\r\n    <span class="navbar-toggler-icon"></span>\r\n  </button>\r\n\r\n  <div class="collapse navbar-collapse" id="navbarSupportedContent">\r\n    <ul class="navbar-nav mr-auto">\r\n      <li class="nav-item active">\r\n        <a class="nav-link" href="./index.html">\r\n          首页\r\n        </a>\r\n      </li>\r\n      <li class="nav-item active">\r\n        <a class="nav-link" href="./journal.index.html">\r\n          账项\r\n        </a>\r\n      </li>\r\n      <li class="nav-item active">\r\n        <a href="./user.html" class="nav-link">用户</a>\r\n      </li>\r\n    </ul>\r\n    <ul class="navbar-nav float-right">\r\n      <li class="nav-item"><a href="../login.html" class="nav-link">注销</a></li>\r\n    </ul>\r\n  </div>\r\n</nav>'},function(a,n){a.exports='<div class="btn-group pull-right" role="group">\r\n  <a href="./journal.01.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-search"></i>\r\n    检索数据\r\n  </a>\r\n  <a href="./journal.01-save.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-plus"></i>\r\n    新增申请\r\n  </a>\r\n  <a href="./journal.01-user.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-user"></i>\r\n    当前申请\r\n  </a>\r\n</div>'},,function(a,n,t){"use strict";t.r(n);var r=t(0),e=t.n(r),l=t(7),i=t.n(l),s=t(1),o=t.n(s);document.getElementById("navbar").innerHTML=e.a,document.getElementById("sidebar").innerHTML=i.a,document.getElementById("toolbar").innerHTML=o.a;let u=JSON.parse(sessionStorage.getItem("auth")),c=new Vue({el:"#app",data:{data:{},message:""},methods:{setQty:function(a){document.getElementById("quantity").innerHTML=c.data.quantity},submit:function(){axios({method:"POST",url:"./api/journal01/",data:{quantity:c.data.quantity,applicantId:u.id,applicant:u.name,dept:u.dept,remark:c.data.remark},responseType:"json"}).then(a=>{location.href="./journal.01-user.html"})}},created:function(){this.data.quantity=1,this.data.applicant=u.name,this.data.dept=u.dept,this.data.remark=""}})},,,,function(a,n){a.exports='<div class="list-group" style="font-size:0.8em;">\r\n  <a href="./journal.01.html" class="list-group-item list-group-item-action">\r\n    01-检修车间禁动牌管理台账\r\n    <i class="fa fa-angle-right pull-right" aria-hidden="true"></i>\r\n  </a>\r\n\r\n  <a href="./journal.02.html" class="list-group-item list-group-item-action">\r\n    02-检修车间临时作业记录簿\r\n    <i class="fa fa-angle-right pull-right" aria-hidden="true"></i>\r\n  </a>\r\n</div>'}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL25hdmJhci5odG1sIiwid2VicGFjazovLy8uL3NyYy9qb3VybmFsLjAxLXRvb2xiYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvam91cm5hbC4wMS1zYXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9qb3VybmFsLnNpZGViYXIuaHRtbCJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJ2YWx1ZSIsIm4iLCJfX2VzTW9kdWxlIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsIl9uYXZiYXJfaHRtbF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fX2RlZmF1bHQiLCJhIiwiX2pvdXJuYWxfc2lkZWJhcl9odG1sX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX19fZGVmYXVsdCIsIl9qb3VybmFsXzAxX3Rvb2xiYXJfaHRtbF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fX2RlZmF1bHQiLCJ1c2VyIiwiSlNPTiIsInBhcnNlIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiYXBwIiwiVnVlIiwiZWwiLCJkYXRhIiwibWVzc2FnZSIsIm1ldGhvZHMiLCJzZXRRdHkiLCJldmVudCIsInF1YW50aXR5Iiwic3VibWl0IiwiYXhpb3MiLCJtZXRob2QiLCJ1cmwiLCJhcHBsaWNhbnRJZCIsImlkIiwiYXBwbGljYW50IiwiZGVwdCIsInJlbWFyayIsInJlc3BvbnNlVHlwZSIsInRoZW4iLCJyZXNwb25zZSIsImxvY2F0aW9uIiwiaHJlZiIsImNyZWF0ZWQiLCJ0aGlzIl0sIm1hcHBpbmdzIjoiYUFDQSxJQUFBQSxLQUdBLFNBQUFDLEVBQUFDLEdBR0EsR0FBQUYsRUFBQUUsR0FDQSxPQUFBRixFQUFBRSxHQUFBQyxRQUdBLElBQUFDLEVBQUFKLEVBQUFFLElBQ0FHLEVBQUFILEVBQ0FJLEdBQUEsRUFDQUgsWUFVQSxPQU5BSSxFQUFBTCxHQUFBTSxLQUFBSixFQUFBRCxRQUFBQyxJQUFBRCxRQUFBRixHQUdBRyxFQUFBRSxHQUFBLEVBR0FGLEVBQUFELFFBS0FGLEVBQUFRLEVBQUFGLEVBR0FOLEVBQUFTLEVBQUFWLEVBR0FDLEVBQUFVLEVBQUEsU0FBQVIsRUFBQVMsRUFBQUMsR0FDQVosRUFBQWEsRUFBQVgsRUFBQVMsSUFDQUcsT0FBQUMsZUFBQWIsRUFBQVMsR0FDQUssY0FBQSxFQUNBQyxZQUFBLEVBQ0FDLElBQUFOLEtBTUFaLEVBQUFtQixFQUFBLFNBQUFqQixHQUNBWSxPQUFBQyxlQUFBYixFQUFBLGNBQWlEa0IsT0FBQSxLQUlqRHBCLEVBQUFxQixFQUFBLFNBQUFsQixHQUNBLElBQUFTLEVBQUFULEtBQUFtQixXQUNBLFdBQTJCLE9BQUFuQixFQUFBLFNBQzNCLFdBQWlDLE9BQUFBLEdBRWpDLE9BREFILEVBQUFVLEVBQUFFLEVBQUEsSUFBQUEsR0FDQUEsR0FJQVosRUFBQWEsRUFBQSxTQUFBVSxFQUFBQyxHQUFzRCxPQUFBVixPQUFBVyxVQUFBQyxlQUFBbkIsS0FBQWdCLEVBQUFDLElBR3REeEIsRUFBQTJCLEVBQUEsR0FJQTNCLElBQUE0QixFQUFBLG1CQ25FQXpCLEVBQUFELFFBQUEsZ2tDQ0FBQyxFQUFBRCxRQUFBLHVnQkNJQTJCLFNBQUFDLGVBQUEsVUFBQUMsVUFBQUMsRUFBQUMsRUFDQUosU0FBQUMsZUFBQSxXQUFBQyxVQUFBRyxFQUFBRCxFQUNBSixTQUFBQyxlQUFBLFdBQUFDLFVBQUFJLEVBQUFGLEVBRUEsSUFBQUcsRUFBQUMsS0FBQUMsTUFBQUMsZUFBQUMsUUFBQSxTQUVBQyxFQUFBLElBQUFDLEtBQ0FDLEdBQUEsT0FDQUMsTUFDQUEsUUFDQUMsUUFBQSxJQUVBQyxTQUNBQyxPQUFBLFNBQUFDLEdBQ0FuQixTQUFBQyxlQUFBLFlBQUFDLFVBQUFVLEVBQUFHLEtBQUFLLFVBRUFDLE9BQUEsV0FDQUMsT0FDQUMsT0FBQSxPQUNBQyxJQUFBLG1CQUNBVCxNQUNBSyxTQUFBUixFQUFBRyxLQUFBSyxTQUNBSyxZQUFBbEIsRUFBQW1CLEdBQ0FDLFVBQUFwQixFQUFBekIsS0FDQThDLEtBQUFyQixFQUFBcUIsS0FDQUMsT0FBQWpCLEVBQUFHLEtBQUFjLFFBRUFDLGFBQUEsU0FDT0MsS0FBQUMsSUFDUEMsU0FBQUMsS0FBQSw2QkFJQUMsUUFBQSxXQUNBQyxLQUFBckIsS0FBQUssU0FBQSxFQUNBZ0IsS0FBQXJCLEtBQUFZLFVBQUFwQixFQUFBekIsS0FDQXNELEtBQUFyQixLQUFBYSxLQUFBckIsRUFBQXFCLEtBQ0FRLEtBQUFyQixLQUFBYyxPQUFBLHdCQ3pDQXZELEVBQUFELFFBQUEiLCJmaWxlIjoiam91cm5hbC4wMS1zYXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2IGNsYXNzPVxcXCJuYXZiYXIgbmF2YmFyLWV4cGFuZC1zbSBuYXZiYXItZGFyayBiZy1kYXJrIGZpeGVkLXRvcFxcXCI+XFxyXFxuICA8YSBjbGFzcz1cXFwibmF2YmFyLWJyYW5kXFxcIiBocmVmPVxcXCIuL1xcXCI+5ZOI5bCU5ruo5Yqo6L2m5q61PC9hPlxcclxcblxcclxcbiAgPGJ1dHRvbiBjbGFzcz1cXFwibmF2YmFyLXRvZ2dsZXJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS10b2dnbGU9XFxcImNvbGxhcHNlXFxcIiBkYXRhLXRhcmdldD1cXFwiI25hdmJhclN1cHBvcnRlZENvbnRlbnRcXFwiIGFyaWEtY29udHJvbHM9XFxcIm5hdmJhclN1cHBvcnRlZENvbnRlbnRcXFwiIGFyaWEtZXhwYW5kZWQ9XFxcImZhbHNlXFxcIiBhcmlhLWxhYmVsPVxcXCJUb2dnbGUgbmF2aWdhdGlvblxcXCI+XFxyXFxuICAgIDxzcGFuIGNsYXNzPVxcXCJuYXZiYXItdG9nZ2xlci1pY29uXFxcIj48L3NwYW4+XFxyXFxuICA8L2J1dHRvbj5cXHJcXG5cXHJcXG4gIDxkaXYgY2xhc3M9XFxcImNvbGxhcHNlIG5hdmJhci1jb2xsYXBzZVxcXCIgaWQ9XFxcIm5hdmJhclN1cHBvcnRlZENvbnRlbnRcXFwiPlxcclxcbiAgICA8dWwgY2xhc3M9XFxcIm5hdmJhci1uYXYgbXItYXV0b1xcXCI+XFxyXFxuICAgICAgPGxpIGNsYXNzPVxcXCJuYXYtaXRlbSBhY3RpdmVcXFwiPlxcclxcbiAgICAgICAgPGEgY2xhc3M9XFxcIm5hdi1saW5rXFxcIiBocmVmPVxcXCIuL2luZGV4Lmh0bWxcXFwiPlxcclxcbiAgICAgICAgICDpppbpobVcXHJcXG4gICAgICAgIDwvYT5cXHJcXG4gICAgICA8L2xpPlxcclxcbiAgICAgIDxsaSBjbGFzcz1cXFwibmF2LWl0ZW0gYWN0aXZlXFxcIj5cXHJcXG4gICAgICAgIDxhIGNsYXNzPVxcXCJuYXYtbGlua1xcXCIgaHJlZj1cXFwiLi9qb3VybmFsLmluZGV4Lmh0bWxcXFwiPlxcclxcbiAgICAgICAgICDotKbpoblcXHJcXG4gICAgICAgIDwvYT5cXHJcXG4gICAgICA8L2xpPlxcclxcbiAgICAgIDxsaSBjbGFzcz1cXFwibmF2LWl0ZW0gYWN0aXZlXFxcIj5cXHJcXG4gICAgICAgIDxhIGhyZWY9XFxcIi4vdXNlci5odG1sXFxcIiBjbGFzcz1cXFwibmF2LWxpbmtcXFwiPueUqOaItzwvYT5cXHJcXG4gICAgICA8L2xpPlxcclxcbiAgICA8L3VsPlxcclxcbiAgICA8dWwgY2xhc3M9XFxcIm5hdmJhci1uYXYgZmxvYXQtcmlnaHRcXFwiPlxcclxcbiAgICAgIDxsaSBjbGFzcz1cXFwibmF2LWl0ZW1cXFwiPjxhIGhyZWY9XFxcIi4uL2xvZ2luLmh0bWxcXFwiIGNsYXNzPVxcXCJuYXYtbGlua1xcXCI+5rOo6ZSAPC9hPjwvbGk+XFxyXFxuICAgIDwvdWw+XFxyXFxuICA8L2Rpdj5cXHJcXG48L25hdj5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwiYnRuLWdyb3VwIHB1bGwtcmlnaHRcXFwiIHJvbGU9XFxcImdyb3VwXFxcIj5cXHJcXG4gIDxhIGhyZWY9XFxcIi4vam91cm5hbC4wMS5odG1sXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1saWdodCBidG4tc21cXFwiPlxcclxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEtc2VhcmNoXFxcIj48L2k+XFxyXFxuICAgIOajgOe0ouaVsOaNrlxcclxcbiAgPC9hPlxcclxcbiAgPGEgaHJlZj1cXFwiLi9qb3VybmFsLjAxLXNhdmUuaHRtbFxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGlnaHQgYnRuLXNtXFxcIj5cXHJcXG4gICAgPGkgY2xhc3M9XFxcImZhIGZhLXBsdXNcXFwiPjwvaT5cXHJcXG4gICAg5paw5aKe55Sz6K+3XFxyXFxuICA8L2E+XFxyXFxuICA8YSBocmVmPVxcXCIuL2pvdXJuYWwuMDEtdXNlci5odG1sXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1saWdodCBidG4tc21cXFwiPlxcclxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEtdXNlclxcXCI+PC9pPlxcclxcbiAgICDlvZPliY3nlLPor7dcXHJcXG4gIDwvYT5cXHJcXG48L2Rpdj5cIjsiLCJpbXBvcnQgbmF2YmFyIGZyb20gJy4vbmF2YmFyLmh0bWwnXHJcbmltcG9ydCBzaWRlYmFyIGZyb20gJy4vam91cm5hbC5zaWRlYmFyLmh0bWwnXHJcbmltcG9ydCB0b29sYmFyIGZyb20gJy4vam91cm5hbC4wMS10b29sYmFyLmh0bWwnXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyJykuaW5uZXJIVE1MID0gbmF2YmFyXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyJykuaW5uZXJIVE1MID0gc2lkZWJhclxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9vbGJhcicpLmlubmVySFRNTCA9IHRvb2xiYXJcclxuXHJcbmxldCB1c2VyID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhdXRoJykpXHJcblxyXG5sZXQgYXBwID0gbmV3IFZ1ZSh7XHJcbiAgZWw6ICcjYXBwJyxcclxuICBkYXRhOiB7XHJcbiAgICBkYXRhOiB7fSxcclxuICAgIG1lc3NhZ2U6ICcnXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBzZXRRdHk6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncXVhbnRpdHknKS5pbm5lckhUTUwgPSBhcHAuZGF0YS5xdWFudGl0eVxyXG4gICAgfSxcclxuICAgIHN1Ym1pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICBheGlvcyh7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgdXJsOiAnLi9hcGkvam91cm5hbDAxLycsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcXVhbnRpdHk6IGFwcC5kYXRhLnF1YW50aXR5LFxyXG4gICAgICAgICAgYXBwbGljYW50SWQ6IHVzZXIuaWQsXHJcbiAgICAgICAgICBhcHBsaWNhbnQ6IHVzZXIubmFtZSxcclxuICAgICAgICAgIGRlcHQ6IHVzZXIuZGVwdCxcclxuICAgICAgICAgIHJlbWFyazogYXBwLmRhdGEucmVtYXJrXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJ1xyXG4gICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnLi9qb3VybmFsLjAxLXVzZXIuaHRtbCdcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZGF0YS5xdWFudGl0eSA9IDFcclxuICAgIHRoaXMuZGF0YS5hcHBsaWNhbnQgPSB1c2VyLm5hbWVcclxuICAgIHRoaXMuZGF0YS5kZXB0ID0gdXNlci5kZXB0XHJcbiAgICB0aGlzLmRhdGEucmVtYXJrID0gJydcclxuICB9XHJcbn0pIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImxpc3QtZ3JvdXBcXFwiIHN0eWxlPVxcXCJmb250LXNpemU6MC44ZW07XFxcIj5cXHJcXG4gIDxhIGhyZWY9XFxcIi4vam91cm5hbC4wMS5odG1sXFxcIiBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb25cXFwiPlxcclxcbiAgICAwMS3mo4Dkv67ovabpl7TnpoHliqjniYznrqHnkIblj7DotKZcXHJcXG4gICAgPGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLXJpZ2h0IHB1bGwtcmlnaHRcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj48L2k+XFxyXFxuICA8L2E+XFxyXFxuXFxyXFxuICA8YSBocmVmPVxcXCIuL2pvdXJuYWwuMDIuaHRtbFxcXCIgY2xhc3M9XFxcImxpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uXFxcIj5cXHJcXG4gICAgMDIt5qOA5L+u6L2m6Ze05Li05pe25L2c5Lia6K6w5b2V57C/XFxyXFxuICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1yaWdodCBwdWxsLXJpZ2h0XFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+PC9pPlxcclxcbiAgPC9hPlxcclxcbjwvZGl2PlwiOyJdLCJzb3VyY2VSb290IjoiIn0=