(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[277],{9344:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile",function(){return a(4654)}])},4654:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return x}});var s=a(5893),n=a(6154),l=a(7294),o=a(8094),i=a.n(o),r=a(183),d=a(4566),c=a(1298),p=a(8702),_=a.n(p),h=function(e){let{setMoney:t}=e,{user:a,setUser:o,setAllTransactions:i,allTransactions:r}=(0,d.b)(),[c,p]=(0,l.useState)(a.fake_money),[h,u]=(0,l.useState)(""),[m,b]=(0,l.useState)(""),x=new Date,f=String(x.getDate()).padStart(2,"0"),y=String(x.getMonth()+1).padStart(2,"0"),j=x.getFullYear(),g="".concat(y,"/").concat(f,"/").concat(j),v=()=>{if(m>0){let e=a.fake_money+parseFloat(m);n.Z.post("https://sports-odds.herokuapp.com/update_money",{fake_money:e}).then(a=>{200===a.status&&o(a.data),n.Z.post("https://sports-odds.herokuapp.com/addTransaction",{date:g,transaction_type:"Deposit",transaction_amount:m,money_in_account:e}).then(e=>{200===e.status&&(i(e.data),alert("$".concat(m," has been added to your account!")),b(""),t(!1))})})}},N=()=>{if(h>0&&c>=h){let e=a.fake_money-parseFloat(h);n.Z.post("https://sports-odds.herokuapp.com/update_money",{fake_money:e}).then(a=>{200===a.status&&o(a.data),n.Z.post("https://sports-odds.herokuapp.com/addTransaction",{date:g,transaction_type:"Withdrawal",transaction_amount:h,money_in_account:e}).then(e=>{200===e.status&&(i(e.data),alert("$".concat(h," has been withdrawn from your account!")),u(""),t(!1))})})}};return(0,s.jsxs)("div",{className:_().betting_account,children:[(0,s.jsx)("h1",{children:"Betting Account"}),(0,s.jsxs)("div",{style:{margin:5,paddingLeft:5,paddingRight:5},children:[(0,s.jsx)("label",{htmlFor:"deposit",children:"Deposit:"}),(0,s.jsx)("input",{type:"number",id:"deposit",value:m,onChange:e=>b(e.target.value)}),(0,s.jsx)("button",{onClick:v,children:"Deposit"})]}),(0,s.jsxs)("div",{style:{margin:5,paddingLeft:5,paddingRight:5},children:[(0,s.jsx)("label",{htmlFor:"withdraw",children:"Withdraw:"}),(0,s.jsx)("input",{type:"number",id:"withdraw",value:h,onChange:e=>u(e.target.value)}),(0,s.jsx)("button",{onClick:N,children:"Withdraw"})]})]})},u=a(3363),m=a.n(u);let b=()=>{let{setUser:e}=(0,d.b)(),[t,a]=(0,l.useState)(!1),[o,i]=(0,l.useState)(null);async function r(t){t.preventDefault(),a(!0);let s=new FormData;s.append("file",o);let l=await n.Z.post("https://sports-odds.herokuapp.com/api/dropbox/upload",s),i=l.data,r=i.url,d=r.replace("dl=0","raw=1");n.Z.post("https://sports-odds.herokuapp.com/api/update_image",{image:d}).then(t=>{200===t.status&&e(t.data),a(!1)})}return(0,s.jsx)("div",{className:m().container,children:(0,s.jsxs)("form",{style:{display:"flex",alignItems:"center",flexDirection:"column"},onSubmit:r,children:[(0,s.jsx)("input",{type:"file",name:"file",id:"file",className:m().fileInput,onChange:function(e){i(e.target.files[0])},disabled:t}),(0,s.jsx)("label",{htmlFor:"file",className:m().uploadLabel,children:"Choose a file"}),o&&(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,s.jsxs)("p",{className:m().fileUrl,children:["Upload ",o.name,"?"]})," "]}),(0,s.jsx)("button",{className:m().uploadButton,onClick:r,disabled:!o||t,children:t?"Uploading...":"Upload"})]})})};var x=function(){let[e,t]=(0,l.useState)(),[a,o]=(0,l.useState)(),[p,_]=(0,l.useState)(),[u,m]=(0,l.useState)(),[x,f]=(0,l.useState)(),[y,j]=(0,l.useState)(!1),[g,v]=(0,l.useState)(!1),[N,k]=(0,l.useState)(!1),{user:w,setUser:C,allBets:S,setAllBets:F,allBetsOutcome:I,setAllBetsOutcome:Z,setAllTransactions:D,allTransactions:B}=(0,d.b)(),T=e=>{if(e){for(let t=0;t<e.length;t++)if(e[t].name===x.teams){let a=e[t].competitions[0].competitors[0],s=e[t].competitions[0].competitors[1];if(!0!==e[t].status.type.completed){alert("This game is not over yet. Please try again later!"),f(""),k(!1);break}let l={money_line:!0===a.winner?a.team.name:s.team.name,point_spread:x.money_line_team===a.team.name?a.score-s.score:s.score-a.score,total_points:parseInt(a.score)+parseInt(s.score)},o={bet_id:x.bet_id};if(x.point_spread&&(x.point_spread.slice(0,x.point_spread.indexOf("(")).trim()===l.point_spread?o.point_spread=!0:o.point_spread=!1),x.total_points){let e=x.total_points.slice(0,x.total_points.indexOf("(")).trim();"O"===e.charAt(0)?e.slice(1)>l.total_points&&(o.total_points=!0):"U"===e.charAt(0)&&e.slice(1)<l.total_points&&(o.total_points=!1)}if(x.money_line_team&&(x.money_line_team===l.money_line?o.money_line=!0:o.money_line=!1),!1!==Object.values(o)?o.payout=!0:o.payout=!1,!0===o.payout){let e=w.fake_money+x.payout;n.Z.post("https://sports-odds.herokuapp.com/api/update_money",{fake_money:e}).then(t=>{200===t.status&&C(t.data);let a=new Date,s=String(a.getDate()).padStart(2,"0"),l=String(a.getMonth()+1).padStart(2,"0"),o=a.getFullYear(),i="".concat(l,"/").concat(s,"/").concat(o);n.Z.post("https://sports-odds.herokuapp.com/api/addTransaction",{date:i,transaction_type:"Won bet",transaction_amount:x.payout,money_in_account:e}).then(e=>{200===e.status&&(D(e.data),f(""),k(!1))})})}n.Z.post("https://sports-odds.herokuapp.com/api/addBetOutcome",o).then(e=>{200===e.status&&n.Z.get("https://sports-odds.herokuapp.com/api/seeBetsOutcome").then(e=>{200===e.status&&Z(e.data)})});break}}},P=()=>{n.Z.get("https://site.api.espn.com/apis/site/v2/sports/".concat(x.sport,"/").concat(x.league,"/scoreboard?dates=").concat(x.game_date)).then(e=>{T(e.data.events)})},E=e=>{t(e.target.value)},O=e=>{_(e.target.value)},U=e=>{o(e.target.value)},A=e=>{m(e.target.value)},R=()=>{m(""),o(""),t(""),_("")};(0,l.useEffect)(()=>{n.Z.get("https://sports-odds.herokuapp.com/api/seeBets").then(e=>{200===e.status?(F(e.data),n.Z.get("https://sports-odds.herokuapp.com/api/seeBetsOutcome").then(e=>{200===e.status&&(Z(e.data),n.Z.get("https://sports-odds.herokuapp.com/api/getTransaction").then(e=>{200===e.status&&D(e.data)}))})):console.log("Did not work as planned")})},[]);let L=async s=>{s.preventDefault();try{""===p&&_(w.username),""===e&&t(w.f_name),""===a&&o(w.l_name),""===u&&m(w.password),await n.Z.post("https://sports-odds.herokuapp.com/api/update_info",{username:p,password:u,firstName:e,lastName:a}).then(e=>{200===e.status?(C(e.data),j(!y)):setError("Invalid username or password!")})}catch(e){console.log(e)}R()};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.Z,{}),(0,s.jsxs)("div",{className:i().profile_container,children:[(0,s.jsx)("div",{className:i().profile_header,children:w?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:i().profile_title,children:[(0,s.jsx)("h1",{children:"Profile"}),(0,s.jsx)("h5",{style:{color:"#0047AB",cursor:"pointer"},onClick:()=>j(!y),children:"Edit?"})]}),null===w.image?(0,s.jsx)("img",{height:225,width:225,alt:"default",src:"/out/default.png"}):(0,s.jsx)("img",{height:225,width:225,alt:"avatar",src:w.image}),(0,s.jsx)("h2",{children:w.username}),(0,s.jsxs)("h3",{children:[w.f_name," ",w.l_name]}),(0,s.jsxs)("h3",{children:["Fake Money: $",w.fake_money]}),(0,s.jsx)("h4",{style:{color:"#0047AB",cursor:"pointer"},onClick:()=>v(!g),children:"Deposit/Withdraw"}),g?(0,s.jsx)(h,{setMoney:v}):null]}):null}),y?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:i().profile_body,children:(0,s.jsxs)("form",{onSubmit:L,children:[(0,s.jsx)("h2",{children:"Account Information"}),(0,s.jsx)("label",{htmlFor:"firstname",children:"First Name:"}),(0,s.jsx)("input",{type:"text",id:"firstname",value:e,onChange:E}),(0,s.jsx)("label",{htmlFor:"lastname",children:"Last Name:"}),(0,s.jsx)("input",{type:"text",id:"lastname",value:a,onChange:U}),(0,s.jsx)("label",{htmlFor:"password",children:"Password:"}),(0,s.jsx)("input",{type:"password",id:"password",value:u,onChange:A}),(0,s.jsx)("label",{htmlFor:"username",children:"Username:"}),(0,s.jsx)("input",{type:"text",id:"username",value:p,onChange:O}),(0,s.jsx)("button",{type:"submit",children:"Save Changes"})]})}),(0,s.jsx)(b,{})]}):null,N?(0,s.jsx)("div",{children:(0,s.jsx)("button",{className:i().findGame,onClick:()=>{P()},children:"Find Results"})}):null,S?(0,s.jsxs)("div",{className:i().table_div,children:[(0,s.jsx)("h2",{style:{paddingTop:20},children:"Your Bets"}),(0,s.jsxs)("table",{className:i().bet_table,children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:i().bet_table_header,children:"Teams"}),(0,s.jsx)("th",{className:i().bet_table_header,children:"Point Spread"}),(0,s.jsx)("th",{className:i().bet_table_header,children:"Total Points"}),(0,s.jsx)("th",{className:i().bet_table_header,children:"Money Line"}),(0,s.jsx)("th",{className:i().bet_table_header,children:"Bet Amount"}),(0,s.jsx)("th",{className:i().bet_table_header,children:"Payout"})]})}),(0,s.jsx)("tbody",{children:S.map((e,t)=>{var a,n,l,o;return(0,s.jsxs)("tr",{onClick:()=>{I[t]||(x?(f(""),k(!1)):(f(e),k(!0)))},className:i().bet_table_row,style:{backgroundColor:x&&x.bet_id===e.bet_id?"#424242":null},children:[(0,s.jsx)("td",{className:i().bet_table_cell,children:e.teams}),(0,s.jsx)("td",{className:i().bet_table_cell,children:(null===(a=I[t])||void 0===a?void 0:a.point_spread)?(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,s.jsx)(c.mny,{style:{marginRight:10},color:"green"}),e.point_spread]}):(0,s.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:e.point_spread})}),(0,s.jsx)("td",{className:i().bet_table_cell,children:(null===(n=I[t])||void 0===n?void 0:n.total_points)?(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,s.jsx)(c.mny,{style:{marginRight:10},color:"green"}),e.total_points]}):(0,s.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:e.total_points})}),(0,s.jsx)("td",{className:i().bet_table_cell,children:(null===(l=I[t])||void 0===l?void 0:l.money_line)?(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,s.jsx)(c.mny,{style:{marginRight:10},color:"green"}),e.money_line," ",e.money_line_team]}):(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[e.money_line," ",e.money_line_team]})}),(0,s.jsxs)("td",{className:i().bet_table_cell,children:["$",e.bet_amount]}),(0,s.jsx)("td",{className:i().bet_table_cell,children:(null===(o=I[t])||void 0===o?void 0:o.payout)?(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,s.jsx)(c.mny,{style:{marginRight:10},color:"green"}),"$",e.payout]}):(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:["$",e.payout]})})]},e.bet_id)})})]})]}):null,B?(0,s.jsxs)("div",{className:i().table_div,children:[(0,s.jsx)("h2",{style:{paddingTop:20},children:"Transaction History"}),(0,s.jsxs)("table",{className:i().transaction_table,children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:i().bet_table_header,children:"Date"}),(0,s.jsx)("th",{className:i().bet_table_header,children:"Type"}),(0,s.jsx)("th",{className:i().bet_table_header,children:"Amount"}),(0,s.jsx)("th",{className:i().bet_table_header,children:"Balance"})]})}),(0,s.jsx)("tbody",{children:B.map(e=>(0,s.jsxs)("tr",{className:i().bet_table_row,children:[(0,s.jsx)("td",{className:i().bet_table_cell,children:e.date}),(0,s.jsx)("td",{className:i().bet_table_cell,children:e.transaction_type}),(0,s.jsx)("td",{className:i().bet_table_cell,children:e.transaction_amount}),(0,s.jsxs)("td",{className:i().bet_table_cell,children:["$",e.money_in_account]})]},e.transaction_id))})]})]}):null]})]})}},3363:function(e){e.exports={container:"dropbox_container__PSH_h",fileInput:"dropbox_fileInput__kEDPn",uploadLabel:"dropbox_uploadLabel___sPfg",uploadButton:"dropbox_uploadButton__U1BJx",fileUrl:"dropbox_fileUrl__5DMHe"}},8702:function(e){e.exports={betting_account:"money_change_betting_account__vAHRm"}},8094:function(e){e.exports={profile_container:"profile_profile_container__aT3XU",profile_header:"profile_profile_header__Eiykh",profile_title:"profile_profile_title__fHYd4",profile_body:"profile_profile_body__ti6lI",bet_table:"profile_bet_table___nxZQ",transaction_table:"profile_transaction_table__ylOik",bet_table_header:"profile_bet_table_header__Fnrqz",bet_table_cell:"profile_bet_table_cell__ffSBH",bet_table_row:"profile_bet_table_row__CQhv_",findGame:"profile_findGame__FG_7u",table_div:"profile_table_div__ZMavS"}}},function(e){e.O(0,[423,470,202,774,888,179],function(){return e(e.s=9344)}),_N_E=e.O()}]);