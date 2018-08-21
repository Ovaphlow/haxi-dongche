!function(n){var a={};function t(r){if(a[r])return a[r].exports;var e=a[r]={i:r,l:!1,exports:{}};return n[r].call(e.exports,e,e.exports,t),e.l=!0,e.exports}t.m=n,t.c=a,t.d=function(n,a,r){t.o(n,a)||Object.defineProperty(n,a,{configurable:!1,enumerable:!0,get:r})},t.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},t.n=function(n){var a=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(a,"a",a),a},t.o=function(n,a){return Object.prototype.hasOwnProperty.call(n,a)},t.p="",t(t.s=46)}({14:function(n,a){n.exports='<nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">\r\n  <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="index.html">账项管理系统</a>\r\n  <ul class="navbar-nav px-3">\r\n    <li class="nav-item text-nowrap">\r\n      <a class="nav-link" href="login.html">\r\n        <i class="fa fa-sign-out"></i> 注销\r\n      </a>\r\n    </li>\r\n  </ul>\r\n</nav>'},21:function(n,a){n.exports='<div class="btn-group pull-right" role="group">\r\n  <a href="./journal.02.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-search"></i>\r\n    检索数据\r\n  </a>\r\n  <a href="./journal.02-save.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-plus"></i>\r\n    新增申请\r\n  </a>\r\n  <a href="./journal.02-check.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-check-square-o"></i>\r\n    动车所审核\r\n  </a>\r\n  <a href="./journal.02-verify.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-archive"></i>\r\n    作业完成销记\r\n  </a>\r\n  <a href="./journal.02-stats.html" class="btn btn-light btn-sm">\r\n    <i class="fa fa-pie-chart"></i>\r\n    数据统计\r\n  </a>\r\n</div>'},22:function(n,a){n.exports='<nav class="col-md-2 d-none d-md-block bg-dark sidebar">\r\n  <div class="sidebar-sticky">\r\n    <ul class="nav flex-column">\r\n      <li class="nav-item">\r\n        <a class="nav-link" href="index.html">\r\n          <i class="fa fa-fw fa-home"></i>\r\n          单据\r\n        </a>\r\n      </li>\r\n\r\n      <li class="nav-item">\r\n        <a class="nav-link" href="journal.02.html">\r\n          <i class="fa fa-file-o fa-fw"></i>&nbsp;02.一体化作业申请单\r\n        </a>\r\n      </li>\r\n    </ul>\r\n\r\n    <h6 class="sidebar-heading d-flex align-items-center px-3 mt-4 mb-1 text-muted">\r\n      <i class="fa fa-cogs"></i>&nbsp;系统管理\r\n    </h6>\r\n    <ul class="nav flex-column mb-2">\r\n      <li class="nav-item">\r\n        <a class="nav-link" href="admin.dept-list.html">\r\n          <i class="fa fa-cubes fa-fw"></i> 部门\r\n        </a>\r\n      </li>\r\n      <li class="nav-item">\r\n        <a class="nav-link" href="admin.user-list.html">\r\n          <i class="fa fa-users fa-fw"></i> 用户\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</nav>'},30:function(n,a){n.exports='<div id="auth" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="authTitle" aria-hidden="true">\r\n  <div class="modal-dialog modal-sm" role="document">\r\n    <div class="modal-content">\r\n      <div class="modal-header">\r\n        <h5 id="authTitle" class="modal-title">用户鉴权</h5>\r\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\r\n          <span aria-hidden="true">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class="modal-body">\r\n        <div class="form-group">\r\n          <label>账号</label>\r\n          <input type="text" id="authAccount" class="form-control">\r\n        </div>\r\n        <div class="form-group">\r\n          <label>密码</label>\r\n          <input type="password" id="authPassword" class="form-control">\r\n        </div>\r\n      </div>\r\n      <div class="modal-footer">\r\n        <button type="button" class="btn btn-primary" v-on:click="submit">\r\n          <i class="fa fa-check-square-o"></i>\r\n          确认\r\n        </button>\r\n        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>'},46:function(n,a,t){"use strict";var r=i(t(14)),e=i(t(22)),s=i(t(21)),l=i(t(30));function i(n){return n&&n.__esModule?n:{default:n}}document.getElementById("navbar").innerHTML=r.default,document.getElementById("sidebar").innerHTML=e.default,document.getElementById("toolbar").innerHTML=s.default,document.getElementById("authDialog").innerHTML=l.default;var o=JSON.parse(sessionStorage.getItem("auth")),d=new Vue({el:"#app",data:{content:{},request:{}},methods:{sign:function(){axios({method:"PUT",url:"./api/journal02/verify/"+d.content.id,data:{verify:o.name,verify_id:o.id,remark:d.content.remark},responseType:"json"}).then(function(n){if(200!==n.data.status)return alert(n.data.message),!1;var a={category:"journal02",from:"./journal.02-verify.verify.html",to:"./journal.02-verify.html",operation:"verify",item_id:sessionStorage.getItem("verifyId")};sessionStorage.setItem("sign",JSON.stringify(a)),location.href="./sign.html"})},auth:function(){$("#auth").modal()},submit:function(){axios({method:"POST",url:"./api/user/login",data:{account:document.getElementById("authAccount").value,password:md5(document.getElementById("authPassword").value)},responseType:"json"}).then(function(n){return 1!==n.data.content.length?(alert("账号或密码错误，用户鉴权失败。"),!1):n.data.content[0].auth_p_dd?void axios({method:"PUT",url:"./api/journal02/verify/"+d.content.id,data:{verify:n.data.content[0].name,verify_id:n.data.content[0].id,remark:d.content.remark},responseType:"json"}).then(function(n){200===n.data.status?(alert("操作已提交至服务器，请稍后查看结果。"),location.href="./journal.02-verify.html"):alert(n.data.message)}):(alert("鉴权用户没有当前操作对应的权限。"),!1)})}},created:function(){axios({method:"GET",url:"./api/journal02/"+sessionStorage.getItem("verifyId"),responseType:"json"}).then(function(n){200===n.data.status&&(d.content=n.data.content)})}})}});