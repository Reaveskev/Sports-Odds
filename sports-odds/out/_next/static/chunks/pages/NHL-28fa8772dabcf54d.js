(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[734],{2104:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/NHL",function(){return a(3467)}])},3467:function(e,s,a){"use strict";a.r(s);var i=a(5893),r=a(6154),d=a(7294),l=a(239),n=a.n(l),c=a(183),m=a(2963),o=a.n(m);s.default=function(){let[e,s]=(0,d.useState)(!0),[a,l]=(0,d.useState)([]),[m,t]=(0,d.useState)([]),[h,g]=(0,d.useState)([]),[j,x]=(0,d.useState)([]),[_,p]=(0,d.useState)([]),[N,v]=(0,d.useState)(!1),[u,w]=(0,d.useState)([]);return(0,d.useEffect)(()=>{let e=[];r.Z.get("https://statmilk.bleacherreport.com/api/scores/carousel?league=NHL&team=none&carousel_context=league&tz=-25200&appversion=500.0").then(e=>{void 0===e.data.game_groups[0]?v(!0):"In Progress"===e.data.game_groups[0].name&&"Completed"===e.data.game_groups[1].name?(t(e.data.game_groups[0]),l(e.data.game_groups[1]),g(e.data.game_groups[2])):"Completed"===e.data.game_groups[0].name?(l(e.data.game_groups[0]),g(e.data.game_groups[1])):"In Progress"===e.data.game_groups[0].name&&"Upcoming"===e.data.game_groups[1].name?(t(e.data.game_groups[0]),g(e.data.game_groups[1])):g(e.data.game_groups[0])}).then(()=>{r.Z.get("https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/news").then(e=>{x(e.data.articles),s(!1)})}).then(()=>{r.Z.get("https://sports-odds.herokuapp.com/NHL_NEWS").then(e=>{p(e.data)})}),o().forEach(s=>{"NHL"===s.League&&e.push(s)}),w(e)},[]),(0,i.jsxs)("div",{children:[(0,i.jsx)(c.Z,{}),(0,i.jsx)("div",{className:n().scoreboard,style:N?{justifyContent:"center"}:null,children:e?(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("p",{children:"Data is loading..."})}):(0,i.jsx)(i.Fragment,{children:N?(0,i.jsx)("div",{className:n().offseason,children:(0,i.jsx)("p",{children:"It is currently the offseason."})}):(0,i.jsxs)(i.Fragment,{children:[void 0!==m.games?(0,i.jsx)(i.Fragment,{children:m.games.map(e=>(0,i.jsxs)("div",{className:n().games,children:[(0,i.jsx)("div",{className:n().date,children:e.game_progress.primary}),(0,i.jsx)("div",{className:n().time,children:e.game_progress.header}),(0,i.jsxs)("div",{className:n().teamContainer,children:[(0,i.jsx)("div",{className:n().logoDiv,children:(0,i.jsx)("img",{alt:"",className:n().logo,src:e.team_one.logo})}),(0,i.jsx)("div",{className:n().teamName,children:e.team_one.abbrev}),(0,i.jsx)("div",{className:n().record,children:e.team_one.record}),(0,i.jsx)("span",{children:e.team_one.score})]}),(0,i.jsxs)("div",{className:n().teamContainer,children:[(0,i.jsx)("div",{className:n().logoDiv,children:(0,i.jsx)("img",{alt:"",className:n().logo,src:e.team_two.logo})}),(0,i.jsx)("div",{className:n().teamName,children:e.team_two.abbrev}),(0,i.jsx)("div",{className:n().record,children:e.team_two.record}),(0,i.jsx)("span",{children:e.team_two.score})]})]},e.id))}):null,void 0!==a.games?(0,i.jsx)(i.Fragment,{children:a.games.map(e=>(0,i.jsxs)("div",{className:n().games,children:[(0,i.jsx)("div",{className:n().date,children:e.game_progress.primary}),(0,i.jsx)("div",{className:n().time,children:e.game_progress.header}),(0,i.jsxs)("div",{className:n().teamContainer,children:[(0,i.jsx)("div",{className:n().logoDiv,children:(0,i.jsx)("img",{alt:"",className:n().logo,src:e.team_one.logo})}),(0,i.jsx)("div",{className:n().teamName,children:e.team_one.abbrev}),(0,i.jsx)("div",{className:n().record,children:e.team_one.record}),(0,i.jsx)("span",{children:e.team_one.score})]}),(0,i.jsxs)("div",{className:n().teamContainer,children:[(0,i.jsx)("div",{className:n().logoDiv,children:(0,i.jsx)("img",{alt:"",className:n().logo,src:e.team_two.logo})}),(0,i.jsx)("div",{className:n().teamName,children:e.team_two.abbrev}),(0,i.jsx)("div",{className:n().record,children:e.team_two.record}),(0,i.jsx)("span",{children:e.team_two.score})]})]},e.id))}):null,h.games.map(e=>(0,i.jsxs)("div",{className:n().games,children:[(0,i.jsx)("div",{className:n().date,children:e.game_progress.primary}),(0,i.jsx)("div",{className:n().time,children:e.game_progress.header}),(0,i.jsxs)("div",{className:n().teamContainer,children:[(0,i.jsx)("div",{className:n().logoDiv,children:(0,i.jsx)("img",{alt:"",className:n().logo,src:e.team_one.logo})}),(0,i.jsx)("div",{className:n().teamName,children:e.team_one.abbrev}),(0,i.jsx)("div",{className:n().record,children:e.team_one.record}),(0,i.jsx)("span",{children:e.team_one.score})]}),(0,i.jsxs)("div",{className:n().teamContainer,children:[(0,i.jsx)("div",{className:n().logoDiv,children:(0,i.jsx)("img",{alt:"",className:n().logo,src:e.team_two.logo})}),(0,i.jsx)("div",{className:n().teamName,children:e.team_two.abbrev}),(0,i.jsx)("div",{className:n().record,children:e.team_two.record}),(0,i.jsx)("span",{children:e.team_two.score})]})]},e.id))]})})}),(0,i.jsxs)("div",{className:n().news,children:[(0,i.jsx)("header",{className:"newsHeader",children:"NHL News"}),j.map(e=>(0,i.jsxs)("div",{className:n().newInfo,children:[(0,i.jsx)("header",{children:e.headline}),(0,i.jsx)("a",{href:e.links.web.href,children:(0,i.jsx)("img",{className:n().Pic,height:325,width:575,alt:"",src:e.images[0].url})}),(0,i.jsx)("p",{children:e.description})]},e.headline)),_.map(e=>(0,i.jsxs)("div",{className:n().newInfo,children:[(0,i.jsx)("header",{children:e.headline}),(0,i.jsx)("a",{href:e.links,children:(0,i.jsx)("img",{className:n().Pic,height:325,width:575,alt:"",src:e.image})}),(0,i.jsx)("p",{children:e.description})]},e.headline))]}),(0,i.jsx)("div",{className:n().odds_div,children:(0,i.jsxs)("div",{className:n().odds,children:[(0,i.jsx)("h1",{className:n().upcoming,children:"Upcoming Game Odds"}),u.map(e=>(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:n().team_info,children:[(0,i.jsxs)("div",{className:n().team_header,children:[(0,i.jsx)("p",{style:{minWidth:180}}),(0,i.jsx)("p",{style:{minWidth:72},children:"Money Line"}),(0,i.jsx)("p",{style:{minWidth:120},children:"Point Spread"}),(0,i.jsx)("p",{style:{minWidth:120},children:"Total Points"})]}),(0,i.jsxs)("div",{className:n().team_format,children:[(0,i.jsxs)("div",{className:n().name_logo,children:[(0,i.jsx)("img",{alt:"",className:n().odds_logo,src:e.Away_logo}),(0,i.jsxs)("div",{className:n().name_record,children:[(0,i.jsx)("h4",{children:e.Away_Team}),(0,i.jsx)("span",{children:e.Away_Record}),(0,i.jsx)("span",{style:{paddingTop:5},children:"@"})]})]}),(0,i.jsx)("p",{children:e.Away_Money_line}),(0,i.jsx)("p",{children:e.Away_Point_spread}),(0,i.jsx)("p",{children:e.Away_Total_points})]}),(0,i.jsxs)("div",{className:n().team_format,children:[(0,i.jsxs)("div",{className:n().name_logo,children:[(0,i.jsx)("img",{alt:"",className:n().odds_logo,src:e.Home_logo}),(0,i.jsxs)("div",{className:n().name_record,children:[(0,i.jsx)("h4",{children:e.Home_Team}),(0,i.jsx)("span",{children:e.Home_Record})]})]}),(0,i.jsx)("p",{children:e.Home_Money_line}),(0,i.jsx)("p",{children:e.Home_Point_spread}),(0,i.jsx)("p",{children:e.Home_Total_points})]})]})}))]})})]})}}},function(e){e.O(0,[664,154,364,774,888,179],function(){return e(e.s=2104)}),_N_E=e.O()}]);