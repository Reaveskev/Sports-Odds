(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[682],{8665:function(e,s,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/MCBB",function(){return l(6624)}])},6624:function(e,s,l){"use strict";l.r(s);var i=l(5893),a=l(6154),n=l(7294),r=l(239),_=l.n(r),c=l(183),o=l(3727);let d=()=>{let[e,s]=(0,n.useState)([]),[l,r]=(0,n.useState)([!0]);return(0,n.useEffect)(()=>{a.Z.get("https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/news").then(e=>{s(e.data.articles),r(!1)})},[]),(0,i.jsxs)("div",{children:[(0,i.jsx)(c.Z,{}),l?(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(o.Z,{})}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:_().offseason,children:(0,i.jsx)("p",{children:"It is currently the offseason."})}),(0,i.jsx)("div",{className:_().test,children:(0,i.jsxs)("div",{className:_().news,children:[(0,i.jsx)("h1",{className:_().upcoming,children:"MCBB News"}),e.map(e=>(0,i.jsxs)("div",{className:_().newInfo,children:[(0,i.jsx)("a",{href:e.links.web.href,className:_().new_a,children:(0,i.jsx)("img",{className:_().Pic,height:325,alt:"",src:e.images[0].url})}),(0,i.jsx)("header",{style:{fontSize:22},children:e.headline}),(0,i.jsx)("p",{children:e.description})]},e.headline))]})})]}),(0,i.jsx)("div",{className:_().mobile_sports,children:(0,i.jsx)("div",{className:_().new_div,children:(0,i.jsxs)("div",{className:_().news,children:[(0,i.jsx)("h1",{className:_().upcoming,children:"MCBB News"}),e.map(e=>(0,i.jsxs)("div",{className:_().newInfo,children:[(0,i.jsx)("a",{href:e.links.web.href,className:_().new_a,children:(0,i.jsx)("img",{className:_().Pic,height:325,alt:"",src:e.images[0].url})}),(0,i.jsx)("header",{style:{fontSize:22},children:e.headline}),(0,i.jsx)("p",{children:e.description})]},e.headline))]})})})]})};s.default=d},183:function(e,s,l){"use strict";var i=l(5893),a=l(7294),n=l(6154),r=l(7355),_=l.n(r),c=l(1664),o=l.n(c),d=l(4566);s.Z=function(){let[e,s]=(0,a.useState)(!1),[l,r]=(0,a.useState)(!1),{user:c,setUser:t}=(0,d.b)(),h=()=>{try{n.Z.post("https://sports-odds.herokuapp.com/api/logout").then(e=>{200===e.status?t(null):console.log(e)})}catch(e){console.log(e)}};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{className:_().navbar,children:[(0,i.jsx)("div",{style:{marginLeft:10},children:(0,i.jsx)(o(),{href:"/",children:(0,i.jsx)("img",{alt:"",className:_().logo,src:"/out/Sports Odds-1.png"})})}),(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/NFL",children:"NFL"})}),(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/NBA",children:"NBA"})}),(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/WNBA",children:"WNBA"})}),(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/MLB",children:"MLB"})}),(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/NHL",children:"NHL"})}),(0,i.jsx)("li",{className:_().li,children:(0,i.jsxs)("div",{onMouseEnter:()=>{s(!0)},onMouseLeave:()=>{s(!1)},className:_().link,children:["NCAA",e?(0,i.jsxs)("div",{className:_().seeMore,children:[(0,i.jsx)("li",{className:_().seeMoreli,children:(0,i.jsx)(o(),{className:_().seeMoreLink,href:"/MCBB",children:"MCBB"})}),(0,i.jsx)("li",{className:_().seeMoreli,children:(0,i.jsx)(o(),{className:_().seeMoreLink,href:"/WCBB",children:"WCBB"})}),(0,i.jsx)("li",{className:_().seeMoreli,children:(0,i.jsx)(o(),{className:_().seeMoreLink,href:"/CFB",children:"CFB"})})]}):null]})}),c?(0,i.jsxs)("div",{className:_().login_or_profile,children:[(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/profile",children:"Profile"})}),(0,i.jsx)("li",{onClick:()=>{h()},className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/",children:"Logout"})})]}):(0,i.jsx)("div",{className:_().login_or_profile,children:(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/login",children:"Login"})})})]}),(0,i.jsxs)("div",{className:_().mobile_navbar,children:[(0,i.jsx)("div",{style:{marginLeft:10},children:(0,i.jsx)(o(),{href:"/",children:(0,i.jsx)("img",{alt:"",className:_().logo,src:"/out/Sports Odds-1.png"})})}),(0,i.jsx)("span",{onClick:()=>r(!l),className:_().hamburger,children:"☰"})]}),l?(0,i.jsxs)("div",{className:_().mobile_li,children:[(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/NFL",children:"NFL"})}),(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/NBA",children:"NBA"})}),(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/WNBA",children:"WNBA"})}),(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/MLB",children:"MLB"})}),(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/NHL",children:"NHL"})}),(0,i.jsx)("li",{className:_().li,children:(0,i.jsxs)("div",{onClick:()=>{s(!e)},className:_().link,children:["NCAA",e?(0,i.jsxs)("div",{className:_().seeMore,children:[(0,i.jsx)("li",{className:_().seeMoreli,children:(0,i.jsx)(o(),{className:_().seeMoreLink,href:"/MCBB",children:"MCBB"})}),(0,i.jsx)("li",{className:_().seeMoreli,children:(0,i.jsx)(o(),{className:_().seeMoreLink,href:"/WCBB",children:"WCBB"})}),(0,i.jsx)("li",{className:_().seeMoreli,children:(0,i.jsx)(o(),{className:_().seeMoreLink,href:"/CFB",children:"CFB"})})]}):null]})}),c?(0,i.jsxs)("div",{className:_().login_or_profile,children:[(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/profile",children:"Profile"})}),(0,i.jsx)("li",{onClick:()=>{h()},className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/",children:"Logout"})})]}):(0,i.jsx)("div",{className:_().login_or_profile,children:(0,i.jsx)("li",{className:_().li,children:(0,i.jsx)(o(),{className:_().link,href:"/login",children:"Login"})})})]}):null]})}},3727:function(e,s,l){"use strict";var i=l(5893);l(7294);var a=l(9034),n=l.n(a);let r=()=>(0,i.jsxs)("div",{className:n().whistle_container,children:[(0,i.jsx)("img",{className:n().whistle,alt:"whistle",src:"/out/Sports_Odds.png"}),(0,i.jsx)("p",{className:n().text,children:"Loading..."})]});s.Z=r},7355:function(e){e.exports={li:"Header_li__hAG_C",link:"Header_link__nMT9k",navbar:"Header_navbar__7ndZO",seeMore:"Header_seeMore__QBAN3",seeMoreli:"Header_seeMoreli__aOKUk",seeMoreLink:"Header_seeMoreLink__HxtEr",login_or_profile:"Header_login_or_profile__Alwf4",logo:"Header_logo__cDK8p",hamburger:"Header_hamburger__HopNH",mobile_navbar:"Header_mobile_navbar__v8otW",mobile_li:"Header_mobile_li__HnSQw"}},9034:function(e){e.exports={main:"Home_main__nLjiQ",whistle_container:"Home_whistle_container__UOf0g",whistle:"Home_whistle__2d2lT",blow:"Home_blow__RdG20",text:"Home_text__upzyl"}},239:function(e){e.exports={games:"NBA_games__2YwTQ",teamContainer:"NBA_teamContainer__OWg5v",logo:"NBA_logo__2FM5M",time:"NBA_time__hkaud",date:"NBA_date__hNSFt",logoDiv:"NBA_logoDiv__D8OQT",teamName:"NBA_teamName__vQ_pQ",record:"NBA_record__6wHPi",scoreboard:"NBA_scoreboard__c9n6o",news:"NBA_news__Hsn_j",newInfo:"NBA_newInfo__59vvD",welcome:"NBA_welcome__zmLJL",new_a:"NBA_new_a__pPXyo",Pic:"NBA_Pic__6et1R",newsHeader:"NBA_newsHeader__8har7",offseason:"NBA_offseason__28GAk",odds:"NBA_odds__f_e2Y",featured_odds:"NBA_featured_odds__V_cS8",featured_info:"NBA_featured_info__QCMKW",odds_div:"NBA_odds_div__snSxc",upcoming:"NBA_upcoming__ZB0__",team_info:"NBA_team_info__kJrM5",team_format:"NBA_team_format__pP0xZ",team_header:"NBA_team_header__1OPZ8",name_record:"NBA_name_record__7YoH1",odds_logo:"NBA_odds_logo__DtMzD",name_logo:"NBA_name_logo__obU3J",standing_div:"NBA_standing_div__fhQZ1",odds_container:"NBA_odds_container__Q6_TJ",Standings:"NBA_Standings__4SDQg",standings_title:"NBA_standings_title__4h7xW",mobile_sports:"NBA_mobile_sports__z6SP7",mobile_tab:"NBA_mobile_tab__pveZN",test:"NBA_test__IirkC",new_div:"NBA_new_div__pOYi3",buttons_div:"NBA_buttons_div__LX1Uq"}}},function(e){e.O(0,[154,664,774,888,179],function(){return e(e.s=8665)}),_N_E=e.O()}]);