(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[877],{4330:function(e,s,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/CFB",function(){return l(2087)}])},2087:function(e,s,l){"use strict";l.r(s);var a=l(5893),n=l(6154),i=l(7294),r=l(239),o=l.n(r),c=l(183);let _=()=>{let[e,s]=(0,i.useState)([]),[l,r]=(0,i.useState)([]),[_,d]=(0,i.useState)([!0]),[t,h]=(0,i.useState)([]),[N,m]=(0,i.useState)([]),[f,x]=(0,i.useState)([]);return(0,i.useEffect)(()=>{n.Z.get("https://site.api.espn.com/apis/site/v2/sports/football/college-football/news").then(e=>{s(e.data.articles),d(!1)}).then(()=>{n.Z.get("https://sports-odds.herokuapp.com/Odds/college-football").then(e=>{h(e.data[0].Upcoming),x(e.data[1].Inprogress),m(e.data[2].Final)})}).then(()=>{n.Z.get("https://sports-odds.herokuapp.com/Sport_News/ncaa-football").then(e=>{r(e.data)})})},[]),(0,a.jsxs)("div",{children:[(0,a.jsx)(c.Z,{}),_?(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("p",{children:"Data is loading..."})}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:o().offseason,children:(0,a.jsx)("p",{children:"It is currently the offseason."})}),(0,a.jsxs)("div",{className:o().news,children:[(0,a.jsx)("header",{className:"newsHeader",children:"CFB News"}),e.map(e=>(0,a.jsxs)("div",{className:o().newInfo,children:[(0,a.jsx)("header",{children:e.headline}),(0,a.jsx)("a",{href:e.links.web.href,children:(0,a.jsx)("img",{className:o().Pic,height:325,width:575,alt:"",src:e.images[0].url})}),(0,a.jsx)("p",{children:e.description})]},e.headline)),l.map(e=>(0,a.jsxs)("div",{className:o().newInfo,children:[(0,a.jsx)("header",{children:e.headline}),(0,a.jsx)("a",{href:e.links,children:(0,a.jsx)("img",{className:o().Pic,height:325,width:575,alt:"",src:e.image})}),(0,a.jsx)("p",{children:e.description})]},e.headline))]})]})]})};s.default=_},183:function(e,s,l){"use strict";var a=l(5893),n=l(7294),i=l(6154),r=l(7355),o=l.n(r),c=l(1664),_=l.n(c),d=l(4566);s.Z=function(){let[e,s]=(0,n.useState)(!1),{user:l,setUser:r}=(0,d.b)(),c=()=>{try{i.Z.post("https://sports-odds.herokuapp.com/logout").then(e=>{200===e.status?r(null):console.log(e)})}catch(e){console.log(e)}};return(0,a.jsxs)("div",{className:o().navbar,children:[(0,a.jsx)("li",{className:o().li,children:(0,a.jsx)(_(),{className:o().link,href:"/",children:"Home"})}),(0,a.jsx)("li",{className:o().li,children:(0,a.jsx)(_(),{className:o().link,href:"/NFL",children:"NFL"})}),(0,a.jsx)("li",{className:o().li,children:(0,a.jsx)(_(),{className:o().link,href:"/NBA",children:"NBA"})}),(0,a.jsx)("li",{className:o().li,children:(0,a.jsx)(_(),{className:o().link,href:"/WNBA",children:"WNBA"})}),(0,a.jsx)("li",{className:o().li,children:(0,a.jsx)(_(),{className:o().link,href:"/MLB",children:"MLB"})}),(0,a.jsx)("li",{className:o().li,children:(0,a.jsx)(_(),{className:o().link,href:"/NHL",children:"NHL"})}),(0,a.jsxs)("li",{className:o().li,children:[(0,a.jsx)("div",{onMouseEnter:()=>{s(!0)},className:o().link,children:"NCAA"}),e?(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:o().seeMore,onMouseLeave:()=>{s(!1)},children:[(0,a.jsx)("li",{className:o().seeMoreli,children:(0,a.jsx)(_(),{className:o().seeMoreLink,href:"/MCBB",children:"MCBB"})}),(0,a.jsx)("li",{className:o().seeMoreli,children:(0,a.jsx)(_(),{className:o().seeMoreLink,href:"/WCBB",children:"WCBB"})}),(0,a.jsx)("li",{className:o().seeMoreli,children:(0,a.jsx)(_(),{className:o().seeMoreLink,href:"/CFB",children:"CFB"})})]})}):null]}),l?(0,a.jsxs)("div",{className:o().login_or_profile,children:[(0,a.jsx)("li",{onMouseEnter:()=>{s(!1)},className:o().li,children:(0,a.jsx)(_(),{className:o().link,href:"/profile",children:"Profile"})}),(0,a.jsx)("li",{onMouseEnter:()=>{s(!1)},onClick:()=>{c()},className:o().li,children:(0,a.jsx)(_(),{className:o().link,href:"/",children:"Logout"})})]}):(0,a.jsx)("div",{className:o().login_or_profile,children:(0,a.jsx)("li",{onMouseEnter:()=>{s(!1)},className:o().li,children:(0,a.jsx)(_(),{className:o().link,href:"/login",children:"Login"})})})]})}},7355:function(e){e.exports={li:"Header_li__hAG_C",link:"Header_link__nMT9k",navbar:"Header_navbar__7ndZO",seeMore:"Header_seeMore__QBAN3",seeMoreli:"Header_seeMoreli__aOKUk",seeMoreLink:"Header_seeMoreLink__HxtEr",login_or_profile:"Header_login_or_profile__Alwf4"}},239:function(e){e.exports={games:"NBA_games__2YwTQ",teamContainer:"NBA_teamContainer__OWg5v",logo:"NBA_logo__2FM5M",time:"NBA_time__hkaud",date:"NBA_date__hNSFt",logoDiv:"NBA_logoDiv__D8OQT",teamName:"NBA_teamName__vQ_pQ",record:"NBA_record__6wHPi",scoreboard:"NBA_scoreboard__c9n6o",news:"NBA_news__Hsn_j",newInfo:"NBA_newInfo__59vvD",Pic:"NBA_Pic__6et1R",newsHeader:"NBA_newsHeader__8har7",offseason:"NBA_offseason__28GAk",odds:"NBA_odds__f_e2Y",odds_div:"NBA_odds_div__snSxc",upcoming:"NBA_upcoming__ZB0__",team_info:"NBA_team_info__kJrM5",team_format:"NBA_team_format__pP0xZ",team_header:"NBA_team_header__1OPZ8",name_record:"NBA_name_record__7YoH1",odds_logo:"NBA_odds_logo__DtMzD",name_logo:"NBA_name_logo__obU3J"}}},function(e){e.O(0,[470,774,888,179],function(){return e(e.s=4330)}),_N_E=e.O()}]);