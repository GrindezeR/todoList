(this.webpackJsonptodolist=this.webpackJsonptodolist||[]).push([[0],{106:function(t,e,a){"use strict";a.r(e);var n=a(0),c=a.n(n),i=a(24),s=a.n(i),r=(a(97),a(159)),o=a(155),l=a(156),d=a(162),u=a(160),j=a(161),b=a(158),O=a(157),p=a(81),T=a.n(p),f=a(14),k=a(16),m=a(153),I=[],h=a(39),x=a(4),_={},S=a(13),A=a(49),v=a.n(A),C=a(82),E=a(146),g=a(2),D=c.a.memo((function(t){var e=t.title,a=t.callback,c=Object(n.useState)(""),i=Object(S.a)(c,2),s=i[0],r=i[1],o=Object(n.useState)(!1),l=Object(S.a)(o,2),d=l[0],u=l[1],j=function(){var t=s.trim();""!==t?(a(t),r("")):u(!0)};return Object(g.jsxs)("div",{className:v.a.wrapper,children:[Object(g.jsx)("h3",{children:e}),Object(g.jsxs)("div",{className:v.a.addItemWrapper,children:[Object(g.jsx)(C.a,{className:v.a.input,error:d,id:"standard-basic",label:"Insert name",variant:"standard",value:s,onChange:function(t){d&&u(!1),r(t.currentTarget.value)},onKeyPress:function(t){"Enter"===t.key&&j()}}),Object(g.jsx)(O.a,{onClick:j,color:"primary",size:"small",children:Object(g.jsx)(E.a,{})})]}),d&&Object(g.jsx)("div",{className:v.a.error,children:"Title is required!"})]})})),L=a(30),N=a.n(L),y=a(64),W=a.n(y),F=c.a.memo((function(t){var e=t.title,a=t.callback,c=Object(n.useState)(!1),i=Object(S.a)(c,2),s=i[0],r=i[1],o=Object(n.useState)(e),l=Object(S.a)(o,2),d=l[0],u=l[1],j=function(){var t=d.trim();""!==t?a(t):u(e),u(t.trim()),r(!1)};return Object(g.jsx)(g.Fragment,{children:s?Object(g.jsx)(C.a,{className:W.a.input,size:"small",variant:"outlined",value:d,onBlur:j,onChange:function(t){return u(t.currentTarget.value)},onKeyPress:function(t){"Enter"===t.key&&j()},autoFocus:!0}):Object(g.jsx)("span",{className:W.a.task,onDoubleClick:function(){r(!0)},children:e})})})),B=a(80),G=a.n(B),K=a(152),w=a(147),H=c.a.memo((function(t){var e=t.todolistId,a=t.task,c=t.changeTaskStatus,i=t.changeTaskTitle,s=t.deleteTask,r=a.id,o=a.title,l=a.isDone,d=Object(n.useCallback)((function(){s(e,r)}),[s,e,r]),u=Object(n.useCallback)((function(){c(e,r)}),[c,e,r]),j=Object(n.useCallback)((function(t){i(e,r,t)}),[i,e,r]);return Object(g.jsxs)("div",{className:l?G.a.done:"",children:[Object(g.jsx)(K.a,{color:"info",onChange:u,checked:l}),Object(g.jsx)(F,{title:o,callback:j}),Object(g.jsx)(O.a,{size:"small",onClick:d,children:Object(g.jsx)(w.a,{})})]})})),z=a(148),R=c.a.memo((function(t){var e=t.tasks,a=t.title,c=t.filter,i=t.todolistId,s=t.deleteTask,r=t.changeTaskStatus,o=t.addTask,l=t.changeTaskTitle,d=t.changeTodolistFilter,u=t.deleteTodolist,j=t.changeTodolistTitle,p=e;"active"===c&&(p=e.filter((function(t){return!t.isDone}))),"completed"===c&&(p=e.filter((function(t){return t.isDone})));var T=p.map((function(t){return Object(g.jsx)(H,{task:t,todolistId:i,changeTaskTitle:l,changeTaskStatus:r,deleteTask:s},t.id)})),f="all"===c?"contained":"text",k="active"===c?"contained":"text",m="completed"===c?"contained":"text",I=Object(n.useCallback)((function(){d(i,"all")}),[d,i]),h=Object(n.useCallback)((function(){d(i,"active")}),[d,i]),x=Object(n.useCallback)((function(){d(i,"completed")}),[d,i]),_=Object(n.useCallback)((function(){u(i)}),[u,i]),S=Object(n.useCallback)((function(t){j(i,t)}),[j,i]),A=Object(n.useCallback)((function(t){o(i,t)}),[o,i]);return Object(g.jsxs)("div",{className:N.a.wrapper,children:[Object(g.jsxs)("h3",{className:N.a.title,children:[Object(g.jsx)(F,{title:a,callback:S}),Object(g.jsx)(O.a,{onClick:_,children:Object(g.jsx)(z.a,{color:"error"})})]}),Object(g.jsx)(D,{callback:A}),Object(g.jsx)("div",{className:N.a.tasksWrapper,children:T}),Object(g.jsxs)("div",{className:N.a.btnWrapper,children:[Object(g.jsx)(b.a,{title:"All",className:N.a.filterBtn,color:"info",variant:f,onClick:I,children:"All"}),Object(g.jsx)(b.a,{title:"Active",className:N.a.filterBtn,color:"warning",variant:k,onClick:h,children:"Active"}),Object(g.jsx)(b.a,{title:"All",className:N.a.filterBtn,color:"success",variant:m,onClick:x,children:"Completed"})]})]},i)})),J=a(41),P=a.n(J);var U=function(){var t=Object(h.b)();Object(n.useEffect)((function(){var e=localStorage.getItem("todolists");e&&t({type:"TODOLIST-LOCALSTORAGE",todolist:JSON.parse(e)});var a=localStorage.getItem("tasks");a&&t(function(t){return{type:"TASKS-LOCALSTORAGE",tasks:t}}(JSON.parse(a)))}),[t]);var e=Object(h.c)((function(t){return t.todolists})),a=Object(h.c)((function(t){return t.tasks}));Object(n.useEffect)((function(){localStorage.setItem("todolists",JSON.stringify(e))}),[e]),Object(n.useEffect)((function(){localStorage.setItem("tasks",JSON.stringify(a))}),[a]);var c=Object(n.useCallback)((function(e,a){t(function(t,e){return{type:"DELETE-TASK",todolistId:t,taskId:e}}(e,a))}),[t]),i=Object(n.useCallback)((function(e,a){t(function(t,e){return{type:"CHANGE-TASK-STATUS",todolistId:t,taskId:e}}(e,a))}),[t]),s=Object(n.useCallback)((function(e,a){t(function(t,e){return{type:"ADD-TASK",todolistId:t,title:e}}(e,a))}),[t]),p=Object(n.useCallback)((function(e,a,n){t(function(t,e,a){return{type:"CHANGE-TASK-TITLE",todolistId:t,taskId:e,title:a}}(e,a,n))}),[t]),f=Object(n.useCallback)((function(e,a){t(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",todolistId:t,title:e}}(e,a))}),[t]),k=Object(n.useCallback)((function(e,a){t(function(t,e){return{type:"CHANGE-TODOLIST-FILTER",todolistId:t,filter:e}}(e,a))}),[t]),I=Object(n.useCallback)((function(e){t(function(t){return{type:"ADD-TODOLIST",title:t,todolistId:Object(m.a)()}}(e))}),[t]),x=Object(n.useCallback)((function(e){t(function(t){return{type:"DELETE-TODOLIST",todolistId:t}}(e))}),[t]),_=e.map((function(t){var e=a[t.id];return Object(g.jsx)(o.a,{item:!0,children:Object(g.jsx)(l.a,{className:P.a.todolistWrapper,elevation:5,children:Object(g.jsx)(R,{todolistId:t.id,tasks:e,title:t.title,filter:t.filter,changeTodolistTitle:f,deleteTodolist:x,changeTodolistFilter:k,changeTaskTitle:p,addTask:s,changeTaskStatus:i,deleteTask:c})})},t.id)}));return Object(g.jsxs)("div",{className:P.a.mainApp,children:[Object(g.jsx)(r.a,{position:"static",children:Object(g.jsxs)(u.a,{children:[Object(g.jsx)(O.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},children:Object(g.jsx)(T.a,{})}),Object(g.jsx)(j.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"Todolist"}),Object(g.jsx)(b.a,{color:"inherit",children:"Login"})]})}),Object(g.jsxs)(d.a,{className:P.a.todolistsContainer,fixed:!0,children:[Object(g.jsx)(o.a,{className:P.a.addTodolistWrapper,container:!0,children:Object(g.jsx)(D,{title:"Add list",callback:I})}),Object(g.jsx)(o.a,{className:P.a.todoWrapper,container:!0,spacing:4,children:_})]})]})},M=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,163)).then((function(e){var a=e.getCLS,n=e.getFID,c=e.getFCP,i=e.getLCP,s=e.getTTFB;a(t),n(t),c(t),i(t),s(t)}))},X=a(150),q=a(66),Y=Object(q.a)({todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.todolistId?Object(k.a)(Object(k.a)({},t),{},{filter:e.filter}):t}));case"ADD-TODOLIST":return[].concat(Object(f.a)(t),[{id:e.todolistId,title:e.title,filter:"all"}]);case"DELETE-TODOLIST":return t.filter((function(t){return t.id!==e.todolistId}));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.todolistId?Object(k.a)(Object(k.a)({},t),{},{title:e.title}):t}));case"TODOLIST-LOCALSTORAGE":return e.todolist.map((function(t){return Object(k.a)(Object(k.a)({},t),{},{filter:"all"})}));default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"DELETE-TASK":return Object(k.a)(Object(k.a)({},t),{},Object(x.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.taskId}))));case"CHANGE-TASK-STATUS":return Object(k.a)(Object(k.a)({},t),{},Object(x.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(k.a)(Object(k.a)({},t),{},{isDone:!t.isDone}):t}))));case"ADD-TASK":return Object(k.a)(Object(k.a)({},t),{},Object(x.a)({},e.todolistId,[{id:Object(m.a)(),title:e.title,isDone:!1}].concat(Object(f.a)(t[e.todolistId]))));case"CHANGE-TASK-TITLE":return Object(k.a)(Object(k.a)({},t),{},Object(x.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(k.a)(Object(k.a)({},t),{},{title:e.title}):t}))));case"ADD-TODOLIST":return Object(k.a)(Object(k.a)({},t),{},Object(x.a)({},e.todolistId,[]));case"DELETE-TODOLIST":var a=Object(k.a)({},t);return delete a[e.todolistId],a;case"TASKS-LOCALSTORAGE":return e.tasks;default:return t}}}),Q=Object(q.b)(Y);window.store=Q,s.a.render(Object(g.jsx)(c.a.StrictMode,{children:Object(g.jsx)(h.a,{store:Q,children:Object(g.jsx)(X.a,{injectFirst:!0,children:Object(g.jsx)(U,{})})})}),document.getElementById("root")),M()},30:function(t,e,a){t.exports={wrapper:"Todolist_wrapper__3zpNK",tasksWrapper:"Todolist_tasksWrapper__1yF8x",btnWrapper:"Todolist_btnWrapper__P1oYm",deleteBtn:"Todolist_deleteBtn__UBS97",title:"Todolist_title__1m9d9",filterBtn:"Todolist_filterBtn__3ujEA"}},41:function(t,e,a){t.exports={mainApp:"App_mainApp__2g3cs",todolistWrapper:"App_todolistWrapper__32sfF",todolistsContainer:"App_todolistsContainer__36Kbh",addTodolistWrapper:"App_addTodolistWrapper__18EMb",todoWrapper:"App_todoWrapper__2XxrH"}},49:function(t,e,a){t.exports={addItemWrapper:"AddItemForm_addItemWrapper__3xczE",error:"AddItemForm_error__r1ap8",input:"AddItemForm_input__3S4CR",errorInput:"AddItemForm_errorInput__3SbG3"}},64:function(t,e,a){t.exports={input:"EditableSpan_input__y3r8A",task:"EditableSpan_task__iU_zk"}},80:function(t,e,a){t.exports={deleteBtn:"Task_deleteBtn__3PyXM",done:"Task_done__RzDSB"}},97:function(t,e,a){}},[[106,1,2]]]);
//# sourceMappingURL=main.7a086bd8.chunk.js.map