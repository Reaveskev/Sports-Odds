(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[139],{6806:function(e,t,s){"use strict";var n=s(5893),i=s(7294),r=s(6154),l=s(161),o=s.n(l),a=s(4566),c=s(1298);let d=e=>{let t,{setOpenBet:s,game_ids:l,game_over_ids:d,completed:_}=e,{betInfo:h,user:u,allBets:m,setAllBets:p}=(0,a.b)(),[x,y]=(0,i.useState)(),[f,j]=(0,i.useState)(),[g,N]=(0,i.useState)(),[k,v]=(0,i.useState)(),[b,B]=(0,i.useState)(),[w,C]=(0,i.useState)(),A=h[1]+" vs "+h[7];(0,i.useEffect)(()=>{if(0!==Object.keys(_).length&&_.games.some(e=>e.id===t)){let e=_.games.filter(e=>e.id===t);e[0].team_one.name,e[0].team_two.name,parseInt(e[0].team_one.score),parseInt(e[0].team_two.score),parseInt(e[0].team_one.score),parseInt(e[0].team_two.score),parseInt(e[0].team_one.score)>parseInt(e[0].team_two.score)?e[0].team_one.name:e[0].team_two.name}},[d,d]);let M=async(e,t,n,i,l,o)=>{try{await r.Z.post("https://sports-odds.herokuapp.com/addBet",{teams:e,moneyline:t,pointSpread:n,totalPoints:i,parlayPayout:l,betAmount:o}).then(e=>{200===e.status?(C("Your bet has been added to your account!"),setTimeout(()=>{y(),j(),N(),v(),B(),s(!1)},"3000"),r.Z.get("https://sports-odds.herokuapp.com/seeBets").then(e=>{200===e.status&&p(e.data)})):console.log(e)})}catch(e){console.log(e)}};return(0,n.jsx)("div",{className:o().bets_container,children:(0,n.jsxs)("div",{style:{display:"block",fontSize:14,backgroundColor:"white",borderRadius:10,height:"auto",width:334,margin:"15% auto"},children:[(0,n.jsx)("span",{onClick:()=>s(!1),style:{color:"black"},children:(0,n.jsx)(c.LHV,{style:{margin:10,cursor:"pointer"},size:20})}),w?(0,n.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:(0,n.jsx)("span",{style:{color:"green"},children:w})}):null,(0,n.jsxs)("div",{style:{display:"flex",color:"black"},children:[(0,n.jsxs)("div",{style:{padding:15},children:[(0,n.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[(0,n.jsx)("img",{srcSet:h[0]}),(0,n.jsx)("div",{style:{padding:5,whiteSpace:"nowrap"},children:h[1]})]}),(0,n.jsxs)("div",{style:{padding:5,borderRadius:10,width:100},children:[(0,n.jsx)("input",{onClick:()=>{f===h[3]?j(""):j(h[3])},checked:f===h[3],type:"checkbox",style:{marginRight:"10px",cursor:"pointer"}})," ",h[3]]}),(0,n.jsxs)("div",{style:{padding:5,borderRadius:10,width:140},children:[(0,n.jsx)("input",{style:{marginRight:"10px",cursor:"pointer"},type:"checkbox",onClick:()=>{g===h[4]?N(""):N(h[4])},checked:g===h[4]}),h[4]]}),(0,n.jsxs)("div",{style:{padding:5,borderRadius:10,width:120},children:[(0,n.jsx)("input",{style:{marginRight:"10px",cursor:"pointer"},type:"checkbox",onClick:()=>{k===h[5]?v(""):v(h[5])},checked:k===h[5]}),h[5]]})]}),(0,n.jsxs)("div",{style:{padding:15,color:"black"},children:[(0,n.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[(0,n.jsx)("img",{style:{},srcSet:h[6]}),(0,n.jsx)("div",{style:{padding:5},children:h[7]})]}),(0,n.jsxs)("div",{style:{padding:5,borderRadius:10,width:100},children:[(0,n.jsx)("input",{style:{marginRight:"10px",cursor:"pointer"},type:"checkbox",onClick:()=>{f===h[9]?j(""):j(h[9])},checked:f===h[9]}),h[9]]}),(0,n.jsxs)("div",{style:{padding:5,borderRadius:10,width:135},children:[(0,n.jsx)("input",{style:{marginRight:"10px",cursor:"pointer"},type:"checkbox",onClick:()=>{g===h[10]?N(""):N(h[10])},checked:g===h[10]}),h[10]]}),(0,n.jsxs)("div",{style:{padding:5,borderRadius:10,width:120},children:[(0,n.jsx)("input",{style:{marginRight:"10px",cursor:"pointer"},type:"checkbox",onClick:()=>{k===h[11]?v(""):v(h[11])},checked:k===h[11]}),h[11]]})]})]}),(0,n.jsxs)("span",{style:{color:"black",padding:10,display:"flex",justifyContent:"center"},children:["Your projections: ",f,g,k]}),(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,n.jsx)("span",{style:{color:"black"},children:"How much do you want to bet? $"}),(0,n.jsx)("input",{className:o().money_input,onChange:function(e){B(e.target.value)},value:b,type:"text"})]}),(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,n.jsx)("button",{style:{margin:10,cursor:"pointer"},onClick:()=>(function(e,t,s,n){let i=parseInt(e);if(void 0!==t&&""!==t){let e=parseInt(t);i*=e>0?1+e/100:1+100/Math.abs(e)}if(void 0!==s&&""!==s){let e=parseInt(s.slice(-5,-1));!0!==isNaN(e)&&(i*=e>0?1+e/100:1+100/Math.abs(e))}if(void 0!==n&&""!==t){let e=parseInt(n.slice(-5,-1));!0!==isNaN(e)&&(console.log(e),i*=e>0?1+e/100:1+100/Math.abs(e))}return y("$"+i.toFixed(2))})(b,f,g,k),children:"Calculate"}),(0,n.jsxs)("span",{style:{color:"black"},children:["Potential payout: ",x]})]}),x?(0,n.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:u?(0,n.jsx)("button",{onClick:()=>{M(A,f,g,k,x,b)},style:{margin:10,cursor:"pointer"},children:"Add to bets"}):(0,n.jsx)("span",{style:{color:"black",paddingBottom:10},children:"Sign in to add bet to your account!"})}):null]})})};t.Z=d},183:function(e,t,s){"use strict";var n=s(5893),i=s(7294),r=s(6154),l=s(7355),o=s.n(l),a=s(1664),c=s.n(a),d=s(4566);t.Z=function(){let[e,t]=(0,i.useState)(!1),{user:s,setUser:l}=(0,d.b)(),a=()=>{try{r.Z.post("https://sports-odds.herokuapp.com/logout").then(e=>{200===e.status?l(null):console.log(e)})}catch(e){console.log(e)}};return(0,n.jsxs)("div",{className:o().navbar,children:[(0,n.jsx)("li",{className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/",children:"Home"})}),(0,n.jsx)("li",{className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/NFL",children:"NFL"})}),(0,n.jsx)("li",{className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/NBA",children:"NBA"})}),(0,n.jsx)("li",{className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/WNBA",children:"WNBA"})}),(0,n.jsx)("li",{className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/MLB",children:"MLB"})}),(0,n.jsx)("li",{className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/NHL",children:"NHL"})}),(0,n.jsxs)("li",{className:o().li,children:[(0,n.jsx)("div",{onMouseEnter:()=>{t(!0)},className:o().link,children:"NCAA"}),e?(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:o().seeMore,onMouseLeave:()=>{t(!1)},children:[(0,n.jsx)("li",{className:o().seeMoreli,children:(0,n.jsx)(c(),{className:o().seeMoreLink,href:"/MCBB",children:"MCBB"})}),(0,n.jsx)("li",{className:o().seeMoreli,children:(0,n.jsx)(c(),{className:o().seeMoreLink,href:"/WCBB",children:"WCBB"})}),(0,n.jsx)("li",{className:o().seeMoreli,children:(0,n.jsx)(c(),{className:o().seeMoreLink,href:"/CFB",children:"CFB"})})]})}):null]}),s?(0,n.jsxs)("div",{className:o().login_or_profile,children:[(0,n.jsx)("li",{onMouseEnter:()=>{t(!1)},className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/profile",children:"Profile"})}),(0,n.jsx)("li",{onMouseEnter:()=>{t(!1)},onClick:()=>{a()},className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/",children:"Logout"})})]}):(0,n.jsx)("div",{className:o().login_or_profile,children:(0,n.jsx)("li",{onMouseEnter:()=>{t(!1)},className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/login",children:"Login"})})})]})}},7355:function(e){e.exports={li:"Header_li__hAG_C",link:"Header_link__nMT9k",navbar:"Header_navbar__7ndZO",seeMore:"Header_seeMore__QBAN3",seeMoreli:"Header_seeMoreli__aOKUk",seeMoreLink:"Header_seeMoreLink__HxtEr",login_or_profile:"Header_login_or_profile__Alwf4"}},239:function(e){e.exports={games:"NBA_games__2YwTQ",teamContainer:"NBA_teamContainer__OWg5v",logo:"NBA_logo__2FM5M",time:"NBA_time__hkaud",date:"NBA_date__hNSFt",logoDiv:"NBA_logoDiv__D8OQT",teamName:"NBA_teamName__vQ_pQ",record:"NBA_record__6wHPi",scoreboard:"NBA_scoreboard__c9n6o",news:"NBA_news__Hsn_j",newInfo:"NBA_newInfo__59vvD",Pic:"NBA_Pic__6et1R",newsHeader:"NBA_newsHeader__8har7",offseason:"NBA_offseason__28GAk",odds:"NBA_odds__f_e2Y",odds_div:"NBA_odds_div__snSxc",upcoming:"NBA_upcoming__ZB0__",team_info:"NBA_team_info__kJrM5",team_format:"NBA_team_format__pP0xZ",team_header:"NBA_team_header__1OPZ8",name_record:"NBA_name_record__7YoH1",odds_logo:"NBA_odds_logo__DtMzD",name_logo:"NBA_name_logo__obU3J"}},161:function(e){e.exports={bets_container:"bet_bets_container__9HuLP",money_input:"bet_money_input__MIuhn"}},8357:function(e,t,s){"use strict";s.d(t,{w_:function(){return a}});var n=s(7294),i={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},r=n.createContext&&n.createContext(i),l=function(){return(l=Object.assign||function(e){for(var t,s=1,n=arguments.length;s<n;s++)for(var i in t=arguments[s])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},o=function(e,t){var s={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(s[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,n=Object.getOwnPropertySymbols(e);i<n.length;i++)0>t.indexOf(n[i])&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(s[n[i]]=e[n[i]]);return s};function a(e){return function(t){return n.createElement(c,l({attr:l({},e.attr)},t),function e(t){return t&&t.map(function(t,s){return n.createElement(t.tag,l({key:s},t.attr),e(t.child))})}(e.child))}}function c(e){var t=function(t){var s,i=e.attr,r=e.size,a=e.title,c=o(e,["attr","size","title"]),d=r||t.size||"1em";return t.className&&(s=t.className),e.className&&(s=(s?s+" ":"")+e.className),n.createElement("svg",l({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,i,c,{className:s,style:l(l({color:e.color||t.color},t.style),e.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),a&&n.createElement("title",null,a),e.children)};return void 0!==r?n.createElement(r.Consumer,null,function(e){return t(e)}):t(i)}}}]);