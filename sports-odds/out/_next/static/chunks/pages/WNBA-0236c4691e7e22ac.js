(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[68],{201:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/WNBA",function(){return a(4766)}])},4766:function(e,s,a){"use strict";a.r(s);var r=a(5893),l=a(6154),n=a(7294),i=a(239),o=a.n(i),c=a(183),d=a(5675),m=a.n(d);s.default=function(){let[e,s]=(0,n.useState)(!0),[a,i]=(0,n.useState)([]),[d,t]=(0,n.useState)([]),[_,h]=(0,n.useState)([]),[N,g]=(0,n.useState)([]),[x,j]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{l.Z.get("https://statmilk.bleacherreport.com/api/scores/carousel?league=WNBA&team=none&carousel_context=league&tz=-25200&appversion=500.0").then(e=>{void 0===e.data.game_groups[0]?j(!0):"In Progress"===e.data.game_groups[0].name&&"Completed"===e.data.game_groups[1].name?(t(e.data.game_groups[0]),i(e.data.game_groups[1]),h(e.data.game_groups[2])):"Completed"===e.data.game_groups[0].name?(i(e.data.game_groups[0]),h(e.data.game_groups[1])):"In Progress"===e.data.game_groups[0].name&&"Upcoming"===e.data.game_groups[1].name?(t(e.data.game_groups[0]),h(e.data.game_groups[1])):h(e.data.game_groups[0])}).then(()=>{l.Z.get("https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/news").then(e=>{g(e.data.articles),s(!1)})})},[]),(0,r.jsxs)("div",{children:[(0,r.jsx)(c.Z,{}),(0,r.jsx)("div",{className:o().scoreboard,style:x?{justifyContent:"center"}:null,children:e?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("p",{children:"Data is loading..."})}):(0,r.jsx)(r.Fragment,{children:x?(0,r.jsx)("div",{className:o().offseason,children:(0,r.jsx)("p",{children:"It is currently the offseason."})}):(0,r.jsxs)(r.Fragment,{children:[void 0!==d.game_groups?(0,r.jsx)(r.Fragment,{children:d.games.map(e=>(0,r.jsxs)("div",{className:o().games,children:[(0,r.jsx)("div",{className:o().date,children:e.game_progress.primary}),(0,r.jsx)("div",{className:o().time,children:e.game_progress.header}),(0,r.jsxs)("div",{className:o().teamContainer,children:[(0,r.jsx)("div",{className:o().logoDiv,children:(0,r.jsx)(m(),{alt:"",className:o().logo,src:e.team_one.logo})}),(0,r.jsx)("div",{className:o().teamName,children:e.team_one.abbrev}),(0,r.jsx)("div",{className:o().record,children:e.team_one.record}),(0,r.jsx)("span",{children:e.team_one.score})]}),(0,r.jsxs)("div",{className:o().teamContainer,children:[(0,r.jsx)("div",{className:o().logoDiv,children:(0,r.jsx)(m(),{alt:"",className:o().logo,src:e.team_two.logo})}),(0,r.jsx)("div",{className:o().teamName,children:e.team_two.abbrev}),(0,r.jsx)("div",{className:o().record,children:e.team_two.record}),(0,r.jsx)("span",{children:e.team_one.score})]})]},e.id))}):null,void 0!==a.games?(0,r.jsx)(r.Fragment,{children:a.games.map(e=>(0,r.jsxs)("div",{className:o().games,children:[(0,r.jsx)("div",{className:o().date,children:e.game_progress.primary}),(0,r.jsx)("div",{className:o().time,children:e.game_progress.header}),(0,r.jsxs)("div",{className:o().teamContainer,children:[(0,r.jsx)("div",{className:o().logoDiv,children:(0,r.jsx)(m(),{alt:"",className:o().logo,src:e.team_one.logo})}),(0,r.jsx)("div",{className:o().teamName,children:e.team_one.abbrev}),(0,r.jsx)("div",{className:o().record,children:e.team_one.record}),(0,r.jsx)("span",{children:e.team_one.score})]}),(0,r.jsxs)("div",{className:o().teamContainer,children:[(0,r.jsx)("div",{className:o().logoDiv,children:(0,r.jsx)(m(),{alt:"",className:o().logo,src:e.team_two.logo})}),(0,r.jsx)("div",{className:o().teamName,children:e.team_two.abbrev}),(0,r.jsx)("div",{className:o().record,children:e.team_two.record}),(0,r.jsx)("span",{children:e.team_one.score})]})]},e.id))}):null,_.games.map(e=>(0,r.jsxs)("div",{className:o().games,children:[(0,r.jsx)("div",{className:o().date,children:e.game_progress.primary}),(0,r.jsx)("div",{className:o().time,children:e.game_progress.header}),(0,r.jsxs)("div",{className:o().teamContainer,children:[(0,r.jsx)("div",{className:o().logoDiv,children:(0,r.jsx)(m(),{alt:"",className:o().logo,src:e.team_one.logo})}),(0,r.jsx)("div",{className:o().teamName,children:e.team_one.abbrev}),(0,r.jsx)("div",{className:o().record,children:e.team_one.record}),(0,r.jsx)("span",{children:e.team_one.score})]}),(0,r.jsxs)("div",{className:o().teamContainer,children:[(0,r.jsx)("div",{className:o().logoDiv,children:(0,r.jsx)(m(),{alt:"",className:o().logo,src:e.team_two.logo})}),(0,r.jsx)("div",{className:o().teamName,children:e.team_two.abbrev}),(0,r.jsx)("div",{className:o().record,children:e.team_two.record}),(0,r.jsx)("span",{children:e.team_one.score})]})]},e.id))]})})}),(0,r.jsxs)("div",{className:o().news,children:[(0,r.jsx)("header",{className:"newsHeader",children:"WNBA News"}),N.map(e=>(0,r.jsxs)("div",{className:o().newInfo,children:[(0,r.jsx)("header",{children:e.headline}),(0,r.jsx)("a",{href:e.links.web.href,children:(0,r.jsx)(m(),{className:o().Pic,height:325,width:575,alt:"",src:e.images[0].url})}),(0,r.jsx)("p",{children:e.description})]},e.headline))]})]})}},183:function(e,s,a){"use strict";var r=a(5893),l=a(7294),n=a(7355),i=a.n(n),o=a(1664),c=a.n(o);s.Z=function(){let[e,s]=(0,l.useState)(!1);return(0,r.jsxs)("div",{className:i().navbar,children:[(0,r.jsx)("li",{onMouseEnter:()=>{s(!1)},className:i().li,children:(0,r.jsx)(c(),{className:i().link,href:"/",children:"Home"})}),(0,r.jsx)("li",{onMouseEnter:()=>{s(!1)},className:i().li,children:(0,r.jsx)(c(),{className:i().link,href:"/NFL",children:"NFL"})}),(0,r.jsx)("li",{onMouseEnter:()=>{s(!1)},className:i().li,children:(0,r.jsx)(c(),{className:i().link,href:"/NBA",children:"NBA"})}),(0,r.jsx)("li",{onMouseEnter:()=>{s(!1)},className:i().li,children:(0,r.jsx)(c(),{className:i().link,href:"/WNBA",children:"WNBA"})}),(0,r.jsx)("li",{onMouseEnter:()=>{s(!1)},className:i().li,children:(0,r.jsx)(c(),{className:i().link,href:"/MLB",children:"MLB"})}),(0,r.jsx)("li",{onMouseEnter:()=>{s(!1)},className:i().li,children:(0,r.jsx)(c(),{className:i().link,href:"/Soccer",children:"Soccer"})}),(0,r.jsx)("li",{onMouseEnter:()=>{s(!1)},className:i().li,children:(0,r.jsx)(c(),{className:i().link,href:"/NHL",children:"NHL"})}),(0,r.jsxs)("li",{className:i().li,children:[(0,r.jsx)("div",{onMouseEnter:()=>{s(!0)},className:i().link,children:"NCAA"}),e?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:i().seeMore,onMouseLeave:()=>{s(!1)},children:[(0,r.jsx)("li",{className:i().seeMoreli,children:(0,r.jsx)(c(),{className:i().seeMoreLink,href:"/MCBB",children:"MCBB"})}),(0,r.jsx)("li",{className:i().seeMoreli,children:(0,r.jsx)(c(),{className:i().seeMoreLink,href:"/WCBB",children:"WCBB"})}),(0,r.jsx)("li",{className:i().seeMoreli,children:(0,r.jsx)(c(),{className:i().seeMoreLink,href:"/CFB",children:"CFB"})})]})}):null]}),(0,r.jsx)("li",{onMouseEnter:()=>{s(!1)},className:i().li,children:(0,r.jsx)(c(),{className:i().link,href:"/test",children:"Test"})})]})}},7355:function(e){e.exports={li:"Header_li__hAG_C",link:"Header_link__nMT9k",navbar:"Header_navbar__7ndZO",seeMore:"Header_seeMore__QBAN3",seeMoreli:"Header_seeMoreli__aOKUk",seeMoreLink:"Header_seeMoreLink__HxtEr"}},239:function(e){e.exports={games:"NBA_games__2YwTQ",teamContainer:"NBA_teamContainer__OWg5v",logo:"NBA_logo__2FM5M",time:"NBA_time__hkaud",date:"NBA_date__hNSFt",logoDiv:"NBA_logoDiv__D8OQT",teamName:"NBA_teamName__vQ_pQ",record:"NBA_record__6wHPi",scoreboard:"NBA_scoreboard__c9n6o",news:"NBA_news__Hsn_j",newInfo:"NBA_newInfo__59vvD",Pic:"NBA_Pic__6et1R",newsHeader:"NBA_newsHeader__8har7",offseason:"NBA_offseason__28GAk",odds:"NBA_odds__f_e2Y",odds_div:"NBA_odds_div__snSxc",upcoming:"NBA_upcoming__ZB0__",team_info:"NBA_team_info__kJrM5",team_format:"NBA_team_format__pP0xZ",team_header:"NBA_team_header__1OPZ8",name_record:"NBA_name_record__7YoH1",odds_logo:"NBA_odds_logo__DtMzD",name_logo:"NBA_name_logo__obU3J"}}},function(e){e.O(0,[664,675,154,774,888,179],function(){return e(e.s=201)}),_N_E=e.O()}]);