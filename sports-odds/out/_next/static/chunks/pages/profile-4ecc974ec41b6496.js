(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[277],{9344:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile",function(){return s(7329)}])},7329:function(e,t,s){"use strict";s.r(t);var l=s(5893),n=s(6154),a=s(7294),r=s(8094),i=s.n(r),o=s(183),c=s(4566),d=s(1298);t.default=function(){let[e,t]=(0,a.useState)(),[s,r]=(0,a.useState)(),[_,h]=(0,a.useState)(),[m,p]=(0,a.useState)(),[u,f]=(0,a.useState)(),[x,j]=(0,a.useState)(!1),{user:y,setUser:b,allBets:g,setAllBets:N,allBetsOutcome:v,setAllBetsOutcome:k}=(0,c.b)(),C=e=>{if(e){for(let t=0;t<e.length;t++)if(e[t].name===u.teams){let s=e[t].competitions[0].competitors[0],l=e[t].competitions[0].competitors[1];if(!0!==e[t].status.type.completed){alert("This game is not over yet. Please try again later!"),f(""),j(!1);break}let a={money_line:!0===s.winner?s.team.name:l.team.name,point_spread:u.money_line_team===s.team.name?s.score-l.score:l.score-s.score,total_points:parseInt(s.score)+parseInt(l.score)},r={bet_id:u.bet_id};if(u.point_spread&&(u.point_spread.slice(0,u.point_spread.indexOf("(")).trim()===a.point_spread?r.point_spread=!0:r.point_spread=!1),u.total_points){let e=u.total_points.slice(0,u.total_points.indexOf("(")).trim();"O"===e.charAt(0)?e.slice(1)>a.total_points&&(r.total_points=!0):"U"===e.charAt(0)&&e.slice(1)<a.total_points&&(r.total_points=!1)}if(u.money_line_team&&(u.money_line_team===a.money_line?r.money_line=!0:r.money_line=!1),!1!==Object.values(r)?r.payout=!0:r.payout=!1,!0===r.payout){let e=y.fake_money+u.payout;n.Z.post("https://sports-odds.herokuapp.com/update_money",{fake_money:e}).then(e=>{200===e.status&&b(e.data)})}n.Z.post("https://sports-odds.herokuapp.com/addBetOutcome",r).then(e=>{200===e.status&&n.Z.get("https://sports-odds.herokuapp.com/seeBetsOutcome").then(e=>{200===e.status&&k(e.data)})});break}}},w=()=>{n.Z.get("https://site.api.espn.com/apis/site/v2/sports/".concat(u.sport,"/").concat(u.league,"/scoreboard?dates=").concat(u.game_date)).then(e=>{C(e.data.events)})},M=e=>{t(e.target.value)},B=e=>{h(e.target.value)},O=e=>{r(e.target.value)},E=e=>{p(e.target.value)},F=()=>{p(""),r(""),t(""),h("")};(0,a.useEffect)(()=>{n.Z.get("https://sports-odds.herokuapp.com/seeBets").then(e=>{200===e.status?(N(e.data),n.Z.get("https://sports-odds.herokuapp.com/seeBetsOutcome").then(e=>{200===e.status&&k(e.data)})):console.log("Did not work as planned")})},[]);let L=async l=>{l.preventDefault();try{""===_&&h(y.username),""===e&&t(y.f_name),""===s&&r(y.l_name),""===m&&p(y.password),await n.Z.post("https://sports-odds.herokuapp.com/update_info",{username:_,password:m,firstName:e,lastName:s}).then(e=>{200===e.status?b(e.data):setError("Invalid username or password!")})}catch(e){console.log(e)}F()};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(o.Z,{}),(0,l.jsxs)("div",{className:i().profile_container,children:[(0,l.jsx)("div",{className:i().profile_header,children:y?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("h1",{children:[y.f_name," ",y.l_name]}),(0,l.jsxs)("h3",{children:["Fake Money: $",y.fake_money]})]}):null}),(0,l.jsx)("div",{className:i().profile_body,children:(0,l.jsxs)("form",{onSubmit:L,children:[(0,l.jsx)("h2",{children:"Account Information"}),(0,l.jsx)("label",{htmlFor:"firstname",children:"First Name:"}),(0,l.jsx)("input",{type:"text",id:"firstname",value:e,onChange:M}),(0,l.jsx)("label",{htmlFor:"lastname",children:"Last Name:"}),(0,l.jsx)("input",{type:"text",id:"lastname",value:s,onChange:O}),(0,l.jsx)("label",{htmlFor:"password",children:"Password:"}),(0,l.jsx)("input",{type:"password",id:"password",value:m,onChange:E}),(0,l.jsx)("label",{htmlFor:"username",children:"Username:"}),(0,l.jsx)("input",{type:"text",id:"username",value:_,onChange:B}),(0,l.jsx)("button",{type:"submit",children:"Save Changes"})]})}),x?(0,l.jsx)("div",{children:(0,l.jsx)("button",{className:i().findGame,onClick:()=>{w()},children:"Find Results"})}):null,g?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("h2",{style:{paddingTop:20},children:"Your Bets"}),(0,l.jsxs)("table",{className:i().bet_table,children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{className:i().bet_table_header,children:"Teams"}),(0,l.jsx)("th",{className:i().bet_table_header,children:"Point Spread"}),(0,l.jsx)("th",{className:i().bet_table_header,children:"Total Points"}),(0,l.jsx)("th",{className:i().bet_table_header,children:"Money Line"}),(0,l.jsx)("th",{className:i().bet_table_header,children:"Bet Amount"}),(0,l.jsx)("th",{className:i().bet_table_header,children:"Payout"})]})}),(0,l.jsx)("tbody",{children:g.map((e,t)=>{var s,n,a,r;return(0,l.jsxs)("tr",{onClick:()=>{v[t]||(u?(f(""),j(!1)):(f(e),j(!0)))},className:i().bet_table_row,style:{backgroundColor:u&&u.bet_id===e.bet_id?"lightgray":null},children:[(0,l.jsx)("td",{className:i().bet_table_cell,children:e.teams}),(0,l.jsx)("td",{className:i().bet_table_cell,children:(null===(s=v[t])||void 0===s?void 0:s.point_spread)?(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,l.jsx)(d.mny,{style:{marginRight:10},color:"green"}),e.point_spread]}):(0,l.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:e.point_spread})}),(0,l.jsx)("td",{className:i().bet_table_cell,children:(null===(n=v[t])||void 0===n?void 0:n.total_points)?(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,l.jsx)(d.mny,{style:{marginRight:10},color:"green"}),e.total_points]}):(0,l.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:e.total_points})}),(0,l.jsx)("td",{className:i().bet_table_cell,children:(null===(a=v[t])||void 0===a?void 0:a.money_line)?(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,l.jsx)(d.mny,{style:{marginRight:10},color:"green"}),e.money_line," ",e.money_line_team]}):(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[e.money_line," ",e.money_line_team]})}),(0,l.jsxs)("td",{className:i().bet_table_cell,children:["$",e.bet_amount]}),(0,l.jsx)("td",{className:i().bet_table_cell,children:(null===(r=v[t])||void 0===r?void 0:r.payout)?(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,l.jsx)(d.mny,{style:{marginRight:10},color:"green"}),"$",e.payout]}):(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:["$",e.payout]})})]},e.bet_id)})})]})]}):null]})]})}},183:function(e,t,s){"use strict";var l=s(5893),n=s(7294),a=s(6154),r=s(7355),i=s.n(r),o=s(1664),c=s.n(o),d=s(4566);t.Z=function(){let[e,t]=(0,n.useState)(!1),{user:s,setUser:r}=(0,d.b)(),o=()=>{try{a.Z.post("https://sports-odds.herokuapp.com/logout").then(e=>{200===e.status?r(null):console.log(e)})}catch(e){console.log(e)}};return(0,l.jsxs)("div",{className:i().navbar,children:[(0,l.jsx)("div",{style:{marginLeft:10},children:(0,l.jsx)(c(),{href:"/",children:(0,l.jsx)("img",{alt:"",style:{left:10,position:"absolute"},src:"/out/Sports Odds-1.png"})})}),(0,l.jsx)("li",{className:i().li,children:(0,l.jsx)(c(),{className:i().link,href:"/NFL",children:"NFL"})}),(0,l.jsx)("li",{className:i().li,children:(0,l.jsx)(c(),{className:i().link,href:"/NBA",children:"NBA"})}),(0,l.jsx)("li",{className:i().li,children:(0,l.jsx)(c(),{className:i().link,href:"/WNBA",children:"WNBA"})}),(0,l.jsx)("li",{className:i().li,children:(0,l.jsx)(c(),{className:i().link,href:"/MLB",children:"MLB"})}),(0,l.jsx)("li",{className:i().li,children:(0,l.jsx)(c(),{className:i().link,href:"/NHL",children:"NHL"})}),(0,l.jsxs)("li",{className:i().li,children:[(0,l.jsx)("div",{onMouseEnter:()=>{t(!0)},className:i().link,children:"NCAA"}),e?(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:i().seeMore,onMouseLeave:()=>{t(!1)},children:[(0,l.jsx)("li",{className:i().seeMoreli,children:(0,l.jsx)(c(),{className:i().seeMoreLink,href:"/MCBB",children:"MCBB"})}),(0,l.jsx)("li",{className:i().seeMoreli,children:(0,l.jsx)(c(),{className:i().seeMoreLink,href:"/WCBB",children:"WCBB"})}),(0,l.jsx)("li",{className:i().seeMoreli,children:(0,l.jsx)(c(),{className:i().seeMoreLink,href:"/CFB",children:"CFB"})})]})}):null]}),s?(0,l.jsxs)("div",{className:i().login_or_profile,children:[(0,l.jsx)("li",{onMouseEnter:()=>{t(!1)},className:i().li,children:(0,l.jsx)(c(),{className:i().link,href:"/profile",children:"Profile"})}),(0,l.jsx)("li",{onMouseEnter:()=>{t(!1)},onClick:()=>{o()},className:i().li,children:(0,l.jsx)(c(),{className:i().link,href:"/",children:"Logout"})})]}):(0,l.jsx)("div",{className:i().login_or_profile,children:(0,l.jsx)("li",{onMouseEnter:()=>{t(!1)},className:i().li,children:(0,l.jsx)(c(),{className:i().link,href:"/login",children:"Login"})})})]})}},7355:function(e){e.exports={li:"Header_li__hAG_C",link:"Header_link__nMT9k",navbar:"Header_navbar__7ndZO",seeMore:"Header_seeMore__QBAN3",seeMoreli:"Header_seeMoreli__aOKUk",seeMoreLink:"Header_seeMoreLink__HxtEr",login_or_profile:"Header_login_or_profile__Alwf4"}},8094:function(e){e.exports={profile_container:"profile_profile_container__aT3XU",profile_header:"profile_profile_header__Eiykh",profile_body:"profile_profile_body__ti6lI",bet_table:"profile_bet_table___nxZQ",bet_table_header:"profile_bet_table_header__Fnrqz",bet_table_cell:"profile_bet_table_cell__ffSBH",bet_table_row:"profile_bet_table_row__CQhv_",findGame:"profile_findGame__FG_7u"}},8357:function(e,t,s){"use strict";s.d(t,{w_:function(){return o}});var l=s(7294),n={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},a=l.createContext&&l.createContext(n),r=function(){return(r=Object.assign||function(e){for(var t,s=1,l=arguments.length;s<l;s++)for(var n in t=arguments[s])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},i=function(e,t){var s={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&0>t.indexOf(l)&&(s[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var n=0,l=Object.getOwnPropertySymbols(e);n<l.length;n++)0>t.indexOf(l[n])&&Object.prototype.propertyIsEnumerable.call(e,l[n])&&(s[l[n]]=e[l[n]]);return s};function o(e){return function(t){return l.createElement(c,r({attr:r({},e.attr)},t),function e(t){return t&&t.map(function(t,s){return l.createElement(t.tag,r({key:s},t.attr),e(t.child))})}(e.child))}}function c(e){var t=function(t){var s,n=e.attr,a=e.size,o=e.title,c=i(e,["attr","size","title"]),d=a||t.size||"1em";return t.className&&(s=t.className),e.className&&(s=(s?s+" ":"")+e.className),l.createElement("svg",r({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,n,c,{className:s,style:r(r({color:e.color||t.color},t.style),e.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),o&&l.createElement("title",null,o),e.children)};return void 0!==a?l.createElement(a.Consumer,null,function(e){return t(e)}):t(n)}}},function(e){e.O(0,[423,470,774,888,179],function(){return e(e.s=9344)}),_N_E=e.O()}]);