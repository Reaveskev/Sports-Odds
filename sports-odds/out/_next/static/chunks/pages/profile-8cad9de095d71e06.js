(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[277],{3454:function(e,t,a){"use strict";var n,s;e.exports=(null==(n=a.g.process)?void 0:n.env)&&"object"==typeof(null==(s=a.g.process)?void 0:s.env)?a.g.process:a(7663)},9344:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile",function(){return a(4654)}])},4654:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return x}});var n=a(5893),s=a(6154),o=a(7294),r=a(8094),l=a.n(r),i=a(183),c=a(4566),d=a(1298),p=a(8702),u=a.n(p),h=function(e){let{setMoney:t}=e,{user:a,setUser:r,setAllTransactions:l,allTransactions:i}=(0,c.b)(),[d,p]=(0,o.useState)(a.fake_money),[h,_]=(0,o.useState)(""),[m,f]=(0,o.useState)(""),b=new Date,x=String(b.getDate()).padStart(2,"0"),y=String(b.getMonth()+1).padStart(2,"0"),g=b.getFullYear(),j="".concat(y,"/").concat(x,"/").concat(g),v=()=>{if(m>0){let e=a.fake_money+parseFloat(m);s.Z.post("https://sports-odds.herokuapp.com/update_money",{fake_money:e}).then(a=>{200===a.status&&r(a.data),s.Z.post("https://sports-odds.herokuapp.com/addTransaction",{date:j,transaction_type:"Deposit",transaction_amount:m,money_in_account:e}).then(e=>{200===e.status&&(l(e.data),alert("$".concat(m," has been added to your account!")),f(""),t(!1))})})}},N=()=>{if(h>0&&d>=h){let e=a.fake_money-parseFloat(h);s.Z.post("https://sports-odds.herokuapp.com/update_money",{fake_money:e}).then(a=>{200===a.status&&r(a.data),s.Z.post("https://sports-odds.herokuapp.com/addTransaction",{date:j,transaction_type:"Withdrawal",transaction_amount:h,money_in_account:e}).then(e=>{200===e.status&&(l(e.data),alert("$".concat(h," has been withdrawn from your account!")),_(""),t(!1))})})}};return(0,n.jsxs)("div",{className:u().betting_account,children:[(0,n.jsx)("h1",{children:"Betting Account"}),(0,n.jsxs)("div",{style:{margin:5,paddingLeft:5,paddingRight:5},children:[(0,n.jsx)("label",{htmlFor:"deposit",children:"Deposit:"}),(0,n.jsx)("input",{type:"number",id:"deposit",value:m,onChange:e=>f(e.target.value)}),(0,n.jsx)("button",{onClick:v,children:"Deposit"})]}),(0,n.jsxs)("div",{style:{margin:5,paddingLeft:5,paddingRight:5},children:[(0,n.jsx)("label",{htmlFor:"withdraw",children:"Withdraw:"}),(0,n.jsx)("input",{type:"number",id:"withdraw",value:h,onChange:e=>_(e.target.value)}),(0,n.jsx)("button",{onClick:N,children:"Withdraw"})]})]})},_=a(3363),m=a.n(_),f=a(3454);let b=()=>{let{setUser:e}=(0,c.b)(),[t,a]=(0,o.useState)(!1),[r,l]=(0,o.useState)(null),i=e=>{l(e.target.files[0])},d=()=>{if(!r)return;a(!0);let t=f.env.accessToken,n={Authorization:"Bearer ".concat(t),"Content-Type":"application/octet-stream","Dropbox-API-Arg":'{"path": "/'.concat(r.name,'", "mode": "add", "autorename": true, "mute": false}')};console.log(r),s.Z.post("https://content.dropboxapi.com/2/files/upload",r,{headers:n}).then(n=>{console.log(n),s.Z.post("https://api.dropboxapi.com/2/sharing/create_shared_link",{path:n.data.path_display},{headers:{Authorization:"Bearer ".concat(t),"Content-Type":"application/json"}}).then(t=>{if(t.data.url){let n=t.data.url,o=n.replace("dl=0","raw=1");s.Z.post("https://sports-odds.herokuapp.com/update_image",{image:o}).then(t=>{200===t.status&&e(t.data),a(!1)})}}).catch(e=>{console.error(e),a(!1)})}).catch(e=>{console.error(e),a(!1)})};return(0,n.jsxs)("div",{className:m().container,children:[(0,n.jsx)("input",{type:"file",name:"file",id:"file",className:m().fileInput,onChange:i,disabled:t}),(0,n.jsx)("label",{htmlFor:"file",className:m().uploadLabel,children:"Choose a file"}),r&&(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,n.jsxs)("p",{className:m().fileUrl,children:["Upload ",r.name,"?"]})," "]}),(0,n.jsx)("button",{className:m().uploadButton,onClick:d,disabled:!r||t,children:t?"Uploading...":"Upload"})]})};var x=function(){let[e,t]=(0,o.useState)(),[a,r]=(0,o.useState)(),[p,u]=(0,o.useState)(),[_,m]=(0,o.useState)(),[f,x]=(0,o.useState)(),[y,g]=(0,o.useState)(!1),[j,v]=(0,o.useState)(!1),[N,w]=(0,o.useState)(!1),{user:k,setUser:T,allBets:C,setAllBets:S,allBetsOutcome:F,setAllBetsOutcome:Z,setAllTransactions:I,allTransactions:B}=(0,c.b)(),A=e=>{if(e){for(let t=0;t<e.length;t++)if(e[t].name===f.teams){let a=e[t].competitions[0].competitors[0],n=e[t].competitions[0].competitors[1];if(!0!==e[t].status.type.completed){alert("This game is not over yet. Please try again later!"),x(""),w(!1);break}let o={money_line:!0===a.winner?a.team.name:n.team.name,point_spread:f.money_line_team===a.team.name?a.score-n.score:n.score-a.score,total_points:parseInt(a.score)+parseInt(n.score)},r={bet_id:f.bet_id};if(f.point_spread&&(f.point_spread.slice(0,f.point_spread.indexOf("(")).trim()===o.point_spread?r.point_spread=!0:r.point_spread=!1),f.total_points){let e=f.total_points.slice(0,f.total_points.indexOf("(")).trim();"O"===e.charAt(0)?e.slice(1)>o.total_points&&(r.total_points=!0):"U"===e.charAt(0)&&e.slice(1)<o.total_points&&(r.total_points=!1)}if(f.money_line_team&&(f.money_line_team===o.money_line?r.money_line=!0:r.money_line=!1),!1!==Object.values(r)?r.payout=!0:r.payout=!1,!0===r.payout){let e=k.fake_money+f.payout;s.Z.post("https://sports-odds.herokuapp.com/update_money",{fake_money:e}).then(t=>{200===t.status&&T(t.data);let a=new Date,n=String(a.getDate()).padStart(2,"0"),o=String(a.getMonth()+1).padStart(2,"0"),r=a.getFullYear(),l="".concat(o,"/").concat(n,"/").concat(r);s.Z.post("https://sports-odds.herokuapp.com/addTransaction",{date:l,transaction_type:"Won bet",transaction_amount:f.payout,money_in_account:e}).then(e=>{200===e.status&&(I(e.data),x(""),w(!1))})})}s.Z.post("https://sports-odds.herokuapp.com/addBetOutcome",r).then(e=>{200===e.status&&s.Z.get("https://sports-odds.herokuapp.com/seeBetsOutcome").then(e=>{200===e.status&&Z(e.data)})});break}}},D=()=>{s.Z.get("https://site.api.espn.com/apis/site/v2/sports/".concat(f.sport,"/").concat(f.league,"/scoreboard?dates=").concat(f.game_date)).then(e=>{A(e.data.events)})},E=e=>{t(e.target.value)},L=e=>{u(e.target.value)},P=e=>{r(e.target.value)},O=e=>{m(e.target.value)},U=()=>{m(""),r(""),t(""),u("")};(0,o.useEffect)(()=>{s.Z.get("https://sports-odds.herokuapp.com/seeBets").then(e=>{200===e.status?(S(e.data),s.Z.get("https://sports-odds.herokuapp.com/seeBetsOutcome").then(e=>{200===e.status&&(Z(e.data),s.Z.get("https://sports-odds.herokuapp.com/getTransaction").then(e=>{200===e.status&&I(e.data)}))})):console.log("Did not work as planned")})},[]);let R=async n=>{n.preventDefault();try{""===p&&u(k.username),""===e&&t(k.f_name),""===a&&r(k.l_name),""===_&&m(k.password),await s.Z.post("https://sports-odds.herokuapp.com/update_info",{username:p,password:_,firstName:e,lastName:a}).then(e=>{200===e.status?(T(e.data),g(!y)):setError("Invalid username or password!")})}catch(e){console.log(e)}U()};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.Z,{}),(0,n.jsxs)("div",{className:l().profile_container,children:[(0,n.jsx)("div",{className:l().profile_header,children:k?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:l().profile_title,children:[(0,n.jsx)("h1",{children:"Profile"}),(0,n.jsx)("h5",{style:{color:"#0047AB",cursor:"pointer"},onClick:()=>g(!y),children:"Edit?"})]}),null===k.image?(0,n.jsx)("img",{height:225,width:225,alt:"default",src:"/out/default.png"}):(0,n.jsx)("img",{height:225,width:225,alt:"avatar",src:k.image}),(0,n.jsx)("h2",{children:k.username}),(0,n.jsxs)("h3",{children:[k.f_name," ",k.l_name]}),(0,n.jsxs)("h3",{children:["Fake Money: $",k.fake_money]}),(0,n.jsx)("h4",{style:{color:"#0047AB",cursor:"pointer"},onClick:()=>v(!j),children:"Deposit/Withdraw"}),j?(0,n.jsx)(h,{setMoney:v}):null]}):null}),y?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:l().profile_body,children:(0,n.jsxs)("form",{onSubmit:R,children:[(0,n.jsx)("h2",{children:"Account Information"}),(0,n.jsx)("label",{htmlFor:"firstname",children:"First Name:"}),(0,n.jsx)("input",{type:"text",id:"firstname",value:e,onChange:E}),(0,n.jsx)("label",{htmlFor:"lastname",children:"Last Name:"}),(0,n.jsx)("input",{type:"text",id:"lastname",value:a,onChange:P}),(0,n.jsx)("label",{htmlFor:"password",children:"Password:"}),(0,n.jsx)("input",{type:"password",id:"password",value:_,onChange:O}),(0,n.jsx)("label",{htmlFor:"username",children:"Username:"}),(0,n.jsx)("input",{type:"text",id:"username",value:p,onChange:L}),(0,n.jsx)("button",{type:"submit",children:"Save Changes"})]})}),(0,n.jsx)(b,{})]}):null,N?(0,n.jsx)("div",{children:(0,n.jsx)("button",{className:l().findGame,onClick:()=>{D()},children:"Find Results"})}):null,C?(0,n.jsxs)("div",{className:l().table_div,children:[(0,n.jsx)("h2",{style:{paddingTop:20},children:"Your Bets"}),(0,n.jsxs)("table",{className:l().bet_table,children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{className:l().bet_table_header,children:"Teams"}),(0,n.jsx)("th",{className:l().bet_table_header,children:"Point Spread"}),(0,n.jsx)("th",{className:l().bet_table_header,children:"Total Points"}),(0,n.jsx)("th",{className:l().bet_table_header,children:"Money Line"}),(0,n.jsx)("th",{className:l().bet_table_header,children:"Bet Amount"}),(0,n.jsx)("th",{className:l().bet_table_header,children:"Payout"})]})}),(0,n.jsx)("tbody",{children:C.map((e,t)=>{var a,s,o,r;return(0,n.jsxs)("tr",{onClick:()=>{F[t]||(f?(x(""),w(!1)):(x(e),w(!0)))},className:l().bet_table_row,style:{backgroundColor:f&&f.bet_id===e.bet_id?"#424242":null},children:[(0,n.jsx)("td",{className:l().bet_table_cell,children:e.teams}),(0,n.jsx)("td",{className:l().bet_table_cell,children:(null===(a=F[t])||void 0===a?void 0:a.point_spread)?(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,n.jsx)(d.mny,{style:{marginRight:10},color:"green"}),e.point_spread]}):(0,n.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:e.point_spread})}),(0,n.jsx)("td",{className:l().bet_table_cell,children:(null===(s=F[t])||void 0===s?void 0:s.total_points)?(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,n.jsx)(d.mny,{style:{marginRight:10},color:"green"}),e.total_points]}):(0,n.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:e.total_points})}),(0,n.jsx)("td",{className:l().bet_table_cell,children:(null===(o=F[t])||void 0===o?void 0:o.money_line)?(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,n.jsx)(d.mny,{style:{marginRight:10},color:"green"}),e.money_line," ",e.money_line_team]}):(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[e.money_line," ",e.money_line_team]})}),(0,n.jsxs)("td",{className:l().bet_table_cell,children:["$",e.bet_amount]}),(0,n.jsx)("td",{className:l().bet_table_cell,children:(null===(r=F[t])||void 0===r?void 0:r.payout)?(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,n.jsx)(d.mny,{style:{marginRight:10},color:"green"}),"$",e.payout]}):(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:["$",e.payout]})})]},e.bet_id)})})]})]}):null,B?(0,n.jsxs)("div",{className:l().table_div,children:[(0,n.jsx)("h2",{style:{paddingTop:20},children:"Transaction History"}),(0,n.jsxs)("table",{className:l().transaction_table,children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{className:l().bet_table_header,children:"Date"}),(0,n.jsx)("th",{className:l().bet_table_header,children:"Type"}),(0,n.jsx)("th",{className:l().bet_table_header,children:"Amount"}),(0,n.jsx)("th",{className:l().bet_table_header,children:"Balance"})]})}),(0,n.jsx)("tbody",{children:B.map(e=>(0,n.jsxs)("tr",{className:l().bet_table_row,children:[(0,n.jsx)("td",{className:l().bet_table_cell,children:e.date}),(0,n.jsx)("td",{className:l().bet_table_cell,children:e.transaction_type}),(0,n.jsx)("td",{className:l().bet_table_cell,children:e.transaction_amount}),(0,n.jsxs)("td",{className:l().bet_table_cell,children:["$",e.money_in_account]})]},e.transaction_id))})]})]}):null]})]})}},3363:function(e){e.exports={container:"dropbox_container__PSH_h",fileInput:"dropbox_fileInput__kEDPn",uploadLabel:"dropbox_uploadLabel___sPfg",uploadButton:"dropbox_uploadButton__U1BJx",fileUrl:"dropbox_fileUrl__5DMHe"}},8702:function(e){e.exports={betting_account:"money_change_betting_account__vAHRm"}},8094:function(e){e.exports={profile_container:"profile_profile_container__aT3XU",profile_header:"profile_profile_header__Eiykh",profile_title:"profile_profile_title__fHYd4",profile_body:"profile_profile_body__ti6lI",bet_table:"profile_bet_table___nxZQ",transaction_table:"profile_transaction_table__ylOik",bet_table_header:"profile_bet_table_header__Fnrqz",bet_table_cell:"profile_bet_table_cell__ffSBH",bet_table_row:"profile_bet_table_row__CQhv_",findGame:"profile_findGame__FG_7u",table_div:"profile_table_div__ZMavS"}},7663:function(e){!function(){var t={229:function(e){var t,a,n,s=e.exports={};function o(){throw Error("setTimeout has not been defined")}function r(){throw Error("clearTimeout has not been defined")}function l(e){if(t===setTimeout)return setTimeout(e,0);if((t===o||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(a){try{return t.call(null,e,0)}catch(a){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:o}catch(e){t=o}try{a="function"==typeof clearTimeout?clearTimeout:r}catch(e){a=r}}();var i=[],c=!1,d=-1;function p(){c&&n&&(c=!1,n.length?i=n.concat(i):d=-1,i.length&&u())}function u(){if(!c){var e=l(p);c=!0;for(var t=i.length;t;){for(n=i,i=[];++d<t;)n&&n[d].run();d=-1,t=i.length}n=null,c=!1,function(e){if(a===clearTimeout)return clearTimeout(e);if((a===r||!a)&&clearTimeout)return a=clearTimeout,clearTimeout(e);try{a(e)}catch(t){try{return a.call(null,e)}catch(t){return a.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function _(){}s.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var a=1;a<arguments.length;a++)t[a-1]=arguments[a];i.push(new h(e,t)),1!==i.length||c||l(u)},h.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=_,s.addListener=_,s.once=_,s.off=_,s.removeListener=_,s.removeAllListeners=_,s.emit=_,s.prependListener=_,s.prependOnceListener=_,s.listeners=function(e){return[]},s.binding=function(e){throw Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw Error("process.chdir is not supported")},s.umask=function(){return 0}}},a={};function n(e){var s=a[e];if(void 0!==s)return s.exports;var o=a[e]={exports:{}},r=!0;try{t[e](o,o.exports,n),r=!1}finally{r&&delete a[e]}return o.exports}n.ab="//";var s=n(229);e.exports=s}()}},function(e){e.O(0,[423,470,202,774,888,179],function(){return e(e.s=9344)}),_N_E=e.O()}]);