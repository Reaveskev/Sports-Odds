(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[399],{183:function(e,s,l){"use strict";var i=l(5893),a=l(7294),n=l(6154),r=l(7355),c=l.n(r),d=l(1664),h=l.n(d),o=l(4566);s.Z=function(){let[e,s]=(0,a.useState)(!1),[l,r]=(0,a.useState)(!1),{user:d,setUser:m}=(0,o.b)(),N=()=>{try{n.Z.post("https://sports-odds.herokuapp.com/logout").then(e=>{200===e.status?m(null):console.log(e)})}catch(e){console.log(e)}};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{className:c().navbar,children:[(0,i.jsx)("div",{style:{marginLeft:10},children:(0,i.jsx)(h(),{href:"/",children:(0,i.jsx)("img",{alt:"",className:c().logo,src:"/out/Sports Odds-1.png"})})}),(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/NFL",children:"NFL"})}),(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/NBA",children:"NBA"})}),(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/WNBA",children:"WNBA"})}),(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/MLB",children:"MLB"})}),(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/NHL",children:"NHL"})}),(0,i.jsx)("li",{className:c().li,children:(0,i.jsxs)("div",{onMouseEnter:()=>{s(!0)},onMouseLeave:()=>{s(!1)},className:c().link,children:["NCAA",e?(0,i.jsxs)("div",{className:c().seeMore,children:[(0,i.jsx)("li",{className:c().seeMoreli,children:(0,i.jsx)(h(),{className:c().seeMoreLink,href:"/MCBB",children:"MCBB"})}),(0,i.jsx)("li",{className:c().seeMoreli,children:(0,i.jsx)(h(),{className:c().seeMoreLink,href:"/WCBB",children:"WCBB"})}),(0,i.jsx)("li",{className:c().seeMoreli,children:(0,i.jsx)(h(),{className:c().seeMoreLink,href:"/CFB",children:"CFB"})})]}):null]})}),d?(0,i.jsxs)("div",{className:c().login_or_profile,children:[(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/profile",children:"Profile"})}),(0,i.jsx)("li",{onClick:()=>{N()},className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/",children:"Logout"})})]}):(0,i.jsx)("div",{className:c().login_or_profile,children:(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/login",children:"Login"})})})]}),(0,i.jsxs)("div",{className:c().mobile_navbar,children:[(0,i.jsx)("div",{style:{marginLeft:10},children:(0,i.jsx)(h(),{href:"/",children:(0,i.jsx)("img",{alt:"",className:c().logo,src:"/out/Sports Odds-1.png"})})}),(0,i.jsx)("span",{onClick:()=>r(!l),className:c().hamburger,children:"☰"})]}),l?(0,i.jsxs)("div",{className:c().mobile_li,children:[(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/NFL",children:"NFL"})}),(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/NBA",children:"NBA"})}),(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/WNBA",children:"WNBA"})}),(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/MLB",children:"MLB"})}),(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/NHL",children:"NHL"})}),(0,i.jsx)("li",{className:c().li,children:(0,i.jsxs)("div",{onClick:()=>{s(!e)},className:c().link,children:["NCAA",e?(0,i.jsxs)("div",{className:c().seeMore,children:[(0,i.jsx)("li",{className:c().seeMoreli,children:(0,i.jsx)(h(),{className:c().seeMoreLink,href:"/MCBB",children:"MCBB"})}),(0,i.jsx)("li",{className:c().seeMoreli,children:(0,i.jsx)(h(),{className:c().seeMoreLink,href:"/WCBB",children:"WCBB"})}),(0,i.jsx)("li",{className:c().seeMoreli,children:(0,i.jsx)(h(),{className:c().seeMoreLink,href:"/CFB",children:"CFB"})})]}):null]})}),d?(0,i.jsxs)("div",{className:c().login_or_profile,children:[(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/profile",children:"Profile"})}),(0,i.jsx)("li",{onClick:()=>{N()},className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/",children:"Logout"})})]}):(0,i.jsx)("div",{className:c().login_or_profile,children:(0,i.jsx)("li",{className:c().li,children:(0,i.jsx)(h(),{className:c().link,href:"/login",children:"Login"})})})]}):null]})}},7300:function(e,s,l){"use strict";var i=l(5893);l(7294);var a=l(239),n=l.n(a);let r=e=>{let{standings:s}=e;return(0,i.jsx)("div",{className:n().standing_div,children:(0,i.jsxs)("div",{className:n().news,children:[(0,i.jsx)("h1",{className:n().upcoming,children:"Standings"}),(0,i.jsx)("div",{style:{width:350},className:n().Standings,children:s?(0,i.jsx)("div",{children:s.map((e,s)=>(0,i.jsxs)("div",{style:{width:"auto"},children:[(0,i.jsx)("h2",{children:e.conference}),(0,i.jsxs)("div",{className:n().standings_title,children:[(0,i.jsx)("p",{style:{width:35}}),(0,i.jsx)("p",{style:{width:100,marginRight:15,fontWeight:"bold"},children:"Team"}),(0,i.jsx)("p",{style:{width:80,marginRight:10,fontWeight:"bold"},children:"Wins/Losses"}),(0,i.jsx)("p",{style:{width:90,marginRight:10,fontWeight:"bold"},children:"Champion Odds"})]}),(0,i.jsx)("ul",{children:e.teams.map((e,s)=>(0,i.jsxs)("li",{style:{paddingBottom:5},className:n().name_logo,children:[(0,i.jsx)("img",{className:n().odds_logo,src:e.logo,alt:e.team_name}),(0,i.jsx)("span",{style:{marginRight:15,width:100},children:e.team_name}),(0,i.jsxs)("span",{style:{marginRight:15,width:80},children:["W: ",e.wins,"/ L: ",e.losses]}),(0,i.jsxs)("span",{style:{marginRight:15,width:90},children:["Odds: ",e.championship_odds]})]},s))})]},s))}):null})]})})};s.Z=r},7355:function(e){e.exports={li:"Header_li__hAG_C",link:"Header_link__nMT9k",navbar:"Header_navbar__7ndZO",seeMore:"Header_seeMore__QBAN3",seeMoreli:"Header_seeMoreli__aOKUk",seeMoreLink:"Header_seeMoreLink__HxtEr",login_or_profile:"Header_login_or_profile__Alwf4",logo:"Header_logo__cDK8p",hamburger:"Header_hamburger__HopNH",mobile_navbar:"Header_mobile_navbar__v8otW",mobile_li:"Header_mobile_li__HnSQw"}}}]);