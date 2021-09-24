(this.webpackJsonptodolist=this.webpackJsonptodolist||[]).push([[0],{16:function(t,e,c){},17:function(t,e,c){},19:function(t,e,c){"use strict";c.r(e);var i=c(2),a=c.n(i),n=c(11),r=c.n(n),l=(c(16),c(10)),o=c(1),s=c(3),u=c(5),j=(c(17),c(8)),b=c(4),d=c.n(b),O=c(0);function f(t){return Object(O.jsx)("button",{className:t.className,onClick:t.callback,children:t.title})}var p=function(t){var e=t.callback,c=t.inputValue,i=t.setInputValue,a=t.error,n=t.setError;Object(j.a)(t,["callback","inputValue","setInputValue","error","setError"]);return Object(O.jsxs)("div",{children:[Object(O.jsx)("input",{value:c,onChange:function(t){i(t.currentTarget.value)},onKeyPress:function(t){n(null),"Enter"===t.key&&e()},className:a?d.a.errorInput:""}),a&&Object(O.jsx)("div",{className:d.a.error,children:a})]})};function v(t){var e=t.title,c=t.callback,a=Object(i.useState)(!1),n=Object(u.a)(a,2),r=n[0],l=n[1],o=Object(i.useState)(""),s=Object(u.a)(o,2),j=s[0],b=s[1],d=function(){l(!1),c(j)};return r?Object(O.jsx)("input",{value:j,onBlur:d,onChange:function(t){return b(t.currentTarget.value)},onKeyPress:function(t){"Enter"===t.key&&d()},autoFocus:!0}):Object(O.jsxs)("span",{onDoubleClick:function(){l(!0),b(e)},children:[" ",e," "]})}function k(t){var e=t.tasks,c=t.filter,a=t.todolistID,n=Object(j.a)(t,["tasks","filter","todolistID"]),r=Object(i.useState)(""),l=Object(u.a)(r,2),o=l[0],s=l[1],b=Object(i.useState)(null),k=Object(u.a)(b,2),h=k[0],m=k[1],x=e.map((function(t){return Object(O.jsxs)("li",{className:t.isDone?d.a.done:d.a.list,children:[Object(O.jsx)("input",{type:"checkbox",onChange:function(e){n.changeTaskStatus(a,t.id,e.currentTarget.checked)},checked:t.isDone}),Object(O.jsx)(v,{title:t.title,callback:function(e){n.changeTaskTitle(a,t.id,e)}}),Object(O.jsx)("button",{onClick:function(){return n.removeTask(a,t.id)},children:"x"})]},t.id)})),T=function(t){return n.changeFilter(a,t)},g=function(){""!==o.trim()?(n.addTask(a,o.trim()),s("")):m("Title is required")},D="all"===c?d.a.activeFilter:"",S="active"===c?d.a.activeFilter:"",N="completed"===c?d.a.activeFilter:"";return Object(O.jsxs)("div",{children:[Object(O.jsx)("h3",{children:Object(O.jsx)(v,{title:n.title,callback:function(t){n.changeTitleTodolist(a,t)}})}),Object(O.jsx)(f,{title:"Delete list",callback:function(){return n.deleteTodolist(a)}}),Object(O.jsxs)("div",{className:d.a.inputWrapper,children:[Object(O.jsx)(p,{inputValue:o,setInputValue:s,error:h,setError:m,callback:g}),Object(O.jsx)(f,{title:"+",callback:g})]}),Object(O.jsx)("ul",{children:x}),Object(O.jsxs)("div",{children:[Object(O.jsx)(f,{title:"All",className:D,callback:function(){return T("all")}}),Object(O.jsx)(f,{title:"Active",className:S,callback:function(){return T("active")}}),Object(O.jsx)(f,{title:"Completed",className:N,callback:function(){return T("completed")}})]})]})}var h=c(21);var m=function(){var t,e=Object(h.a)(),c=Object(h.a)(),a=Object(i.useState)([{id:e,title:"What to Learn",filter:"all"},{id:c,title:"What to Buy",filter:"all"}]),n=Object(u.a)(a,2),r=n[0],j=n[1],b=Object(i.useState)((t={},Object(s.a)(t,e,[{id:Object(h.a)(),title:"HTML&CSS",isDone:!0},{id:Object(h.a)(),title:"JS",isDone:!0},{id:Object(h.a)(),title:"ReactJS",isDone:!1},{id:Object(h.a)(),title:"Rest API",isDone:!1},{id:Object(h.a)(),title:"GraphQL",isDone:!1}]),Object(s.a)(t,c,[{id:Object(h.a)(),title:"Bread",isDone:!0},{id:Object(h.a)(),title:"Beer",isDone:!0},{id:Object(h.a)(),title:"Water",isDone:!0},{id:Object(h.a)(),title:"Meat",isDone:!0},{id:Object(h.a)(),title:"Milk",isDone:!1}]),t)),d=Object(u.a)(b,2),p=d[0],v=d[1];function m(t,e){v(Object(o.a)(Object(o.a)({},p),{},Object(s.a)({},t,p[t].filter((function(t){return t.id!==e})))))}function x(t,e){v(Object(o.a)(Object(o.a)({},p),{},Object(s.a)({},t,[{id:Object(h.a)(),title:e,isDone:!1}].concat(Object(l.a)(p[t])))))}function T(t,e,c){v(Object(o.a)(Object(o.a)({},p),{},Object(s.a)({},t,p[t].map((function(t){return t.id===e?Object(o.a)(Object(o.a)({},t),{},{isDone:c}):t})))))}function g(t,e){j(r.map((function(c){return c.id===t?Object(o.a)(Object(o.a)({},c),{},{filter:e}):c})))}Object(i.useEffect)((function(){var t=localStorage.getItem("tasks");if(t){var e=JSON.parse(t);v(e)}var c=localStorage.getItem("todolists");if(c){var i=JSON.parse(c);j(i)}}),[]),Object(i.useEffect)((function(){localStorage.setItem("tasks",JSON.stringify(p))}),[p]),Object(i.useEffect)((function(){localStorage.setItem("todolists",JSON.stringify(r))}),[r]);var D=function(t,e,c){v(Object(o.a)(Object(o.a)({},p),{},Object(s.a)({},t,p[t].map((function(t){return t.id===e?Object(o.a)(Object(o.a)({},t),{},{title:c}):t})))))},S=function(t,e){j(r.map((function(c){return c.id===t?Object(o.a)(Object(o.a)({},c),{},{title:e}):c})))},N=function(t){j(r.filter((function(e){return e.id!==t})))};return Object(O.jsxs)("div",{className:"App",children:[r.map((function(t){var e=p[t.id];return"active"===t.filter&&(e=p[t.id].filter((function(t){return!t.isDone}))),"completed"===t.filter&&(e=p[t.id].filter((function(t){return t.isDone}))),Object(O.jsx)(k,{title:t.title,todolistID:t.id,tasks:e,removeTask:m,changeFilter:g,addTask:x,changeTaskStatus:T,changeTaskTitle:D,filter:t.filter,deleteTodolist:N,changeTitleTodolist:S},t.id)})),Object(O.jsx)(f,{title:"Add new list",className:"addButton",callback:function(){var t=prompt("Todolist Name");if(t){var e=Object(h.a)();v(Object(o.a)(Object(o.a)({},p),{},Object(s.a)({},e,[]))),j([].concat(Object(l.a)(r),[{id:e,title:t,filter:"all"}]))}else alert("Error! Name required!")}})]})},x=function(t){t&&t instanceof Function&&c.e(3).then(c.bind(null,22)).then((function(e){var c=e.getCLS,i=e.getFID,a=e.getFCP,n=e.getLCP,r=e.getTTFB;c(t),i(t),a(t),n(t),r(t)}))};r.a.render(Object(O.jsx)(a.a.StrictMode,{children:Object(O.jsx)(m,{})}),document.getElementById("root")),x()},4:function(t,e,c){t.exports={activeFilter:"TodoList_activeFilter__1DKYy",error:"TodoList_error__2LNBJ",inputWrapper:"TodoList_inputWrapper__2q5ii",errorInput:"TodoList_errorInput__2OKT9",done:"TodoList_done__2xzE1",list:"TodoList_list__2nlrB"}}},[[19,1,2]]]);
//# sourceMappingURL=main.30375d68.chunk.js.map