(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[125],{6504:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/NFL",function(){return a(9059)}])},9059:function(e,s,a){"use strict";a.r(s);var i=a(5893),l=a(6154),n=a(7294),r=a(239),o=a.n(r),d=a(183),t=a(1298),c=a(4566),m=a(6806);s.default=function(){let[e,s]=(0,n.useState)(!0),[a,r]=(0,n.useState)([]),[h,p]=(0,n.useState)([]),[j,x]=(0,n.useState)([]),[g,_]=(0,n.useState)([]),[N,y]=(0,n.useState)([]),[v,w]=(0,n.useState)(!1),[u,f]=(0,n.useState)([]),[b,S]=(0,n.useState)([]),[F,W]=(0,n.useState)([]),[C,P]=(0,n.useState)(!1),{setBetInfo:k,betInfo:O}=(0,c.b)();return(0,n.useEffect)(()=>{(async function(){try{let e=await l.Z.get("https://statmilk.bleacherreport.com/api/scores/carousel?league=NFL&team=none&carousel_context=league&tz=-25200&appversion=500.0"),a=await l.Z.get("https://site.api.espn.com/apis/site/v2/sports/football/nfl/news"),i=await l.Z.get("https://sports-odds.herokuapp.com/Odds/nfl"),n=await l.Z.get("https://sports-odds.herokuapp.com/Sport_News/nfl");void 0===e.data.game_groups[0]?w(!0):"In Progress"===e.data.game_groups[0].name&&"Completed"===e.data.game_groups[1].name?(p(e.data.game_groups[0]),r(e.data.game_groups[1]),x(e.data.game_groups[2])):"Completed"===e.data.game_groups[0].name?(r(e.data.game_groups[0]),x(e.data.game_groups[1])):"In Progress"===e.data.game_groups[0].name&&"Upcoming"===e.data.game_groups[1].name?(p(e.data.game_groups[0]),x(e.data.game_groups[1])):x(e.data.game_groups[0]),_(a.data.articles),f(i.data[0].Upcoming),W(i.data[1].Inprogress),S(i.data[2].Final),y(n.data),s(!1)}catch(e){console.error(e)}})()},[]),(0,i.jsxs)("div",{children:[(0,i.jsx)(d.Z,{}),e?(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("p",{children:"Data is loading..."})}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:o().scoreboard,style:v?{justifyContent:"center"}:null,children:v?(0,i.jsx)("div",{className:o().offseason,children:(0,i.jsx)("p",{children:"It is currently the offseason."})}):(0,i.jsxs)(i.Fragment,{children:[void 0!==h?(0,i.jsx)(i.Fragment,{children:h.games.map(e=>(0,i.jsxs)("div",{className:o().games,children:[(0,i.jsx)("div",{className:o().date,children:e.game_progress.primary}),(0,i.jsx)("div",{className:o().time,children:e.game_progress.header}),(0,i.jsxs)("div",{className:o().teamContainer,children:[(0,i.jsx)("div",{className:o().logoDiv,children:(0,i.jsx)("img",{alt:"",className:o().logo,src:e.team_one.logo})}),(0,i.jsx)("div",{className:o().teamName,children:e.team_one.abbrev}),(0,i.jsx)("div",{className:o().record,children:e.team_one.record}),(0,i.jsx)("span",{children:e.team_one.score})]}),(0,i.jsxs)("div",{className:o().teamContainer,children:[(0,i.jsx)("div",{className:o().logoDiv,children:(0,i.jsx)("img",{alt:"",className:o().logo,src:e.team_two.logo})}),(0,i.jsx)("div",{className:o().teamName,children:e.team_two.abbrev}),(0,i.jsx)("div",{className:o().record,children:e.team_two.record}),(0,i.jsx)("span",{children:e.team_two.score})]})]},e.id))}):null,void 0!==a.games?(0,i.jsx)(i.Fragment,{children:a.games.map(e=>(0,i.jsxs)("div",{className:o().games,children:[(0,i.jsx)("div",{className:o().date,children:e.game_progress.primary}),(0,i.jsx)("div",{className:o().time,children:e.game_progress.header}),(0,i.jsxs)("div",{className:o().teamContainer,children:[(0,i.jsx)("div",{className:o().logoDiv,children:(0,i.jsx)("img",{alt:"",className:o().logo,src:e.team_one.logo})}),(0,i.jsx)("div",{className:o().teamName,children:e.team_one.abbrev}),(0,i.jsx)("div",{className:o().record,children:e.team_one.record}),(0,i.jsx)("span",{children:e.team_one.score})]}),(0,i.jsxs)("div",{className:o().teamContainer,children:[(0,i.jsx)("div",{className:o().logoDiv,children:(0,i.jsx)("img",{alt:"",className:o().logo,src:e.team_two.logo})}),(0,i.jsx)("div",{className:o().teamName,children:e.team_two.abbrev}),(0,i.jsx)("div",{className:o().record,children:e.team_two.record}),(0,i.jsx)("span",{children:e.team_two.score})]})]},e.id))}):null,j.games.map(e=>(0,i.jsxs)("div",{className:o().games,children:[(0,i.jsx)("div",{className:o().date,children:e.game_progress.primary}),(0,i.jsx)("div",{className:o().time,children:e.game_progress.header}),(0,i.jsxs)("div",{className:o().teamContainer,children:[(0,i.jsx)("div",{className:o().logoDiv,children:(0,i.jsx)("img",{alt:"",className:o().logo,src:e.team_one.logo})}),(0,i.jsx)("div",{className:o().teamName,children:e.team_one.abbrev}),(0,i.jsx)("div",{className:o().record,children:e.team_one.record}),(0,i.jsx)("span",{children:e.team_one.score})]}),(0,i.jsxs)("div",{className:o().teamContainer,children:[(0,i.jsx)("div",{className:o().logoDiv,children:(0,i.jsx)("img",{alt:"",className:o().logo,src:e.team_two.logo})}),(0,i.jsx)("div",{className:o().teamName,children:e.team_two.abbrev}),(0,i.jsx)("div",{className:o().record,children:e.team_two.record}),(0,i.jsx)("span",{children:e.team_two.score})]})]},e.id))]})}),(0,i.jsx)("div",{style:{width:v?"100%":"60%",float:v?"none":"left"},children:(0,i.jsxs)("div",{className:o().news,children:[(0,i.jsx)("h1",{className:o().upcoming,children:"NFL News"}),g.map(e=>(0,i.jsxs)("div",{className:o().newInfo,children:[(0,i.jsx)("header",{children:e.headline}),(0,i.jsx)("a",{href:e.links.web.href,children:(0,i.jsx)("img",{className:o().Pic,height:325,width:575,alt:"",src:e.images[0].url})}),(0,i.jsx)("p",{children:e.description})]},e.headline)),N.map(e=>(0,i.jsxs)("div",{className:o().newInfo,children:[(0,i.jsx)("header",{children:e.headline}),(0,i.jsx)("a",{href:e.links,children:(0,i.jsx)("img",{className:o().Pic,height:325,width:575,alt:"",src:e.image})}),(0,i.jsx)("p",{children:e.description})]},e.headline))]})}),v?null:(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{style:{width:"40%",float:"right"},children:(0,i.jsx)("div",{style:{marginRight:"20%"},className:o().odds_div,children:(0,i.jsxs)("div",{className:o().odds,children:[F.length>0?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h1",{className:o().upcoming,children:"Live Game Odds"}),F.map(e=>(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:o().team_info,children:[(0,i.jsxs)("div",{className:o().team_header,children:[(0,i.jsx)("div",{style:{minWidth:60,cursor:"pointer"},children:(0,i.jsx)(t.OzW,{onClick:()=>{k([e.away.logo,e.away.team,e.away.score,e.away.moneyline,e.away.point_spread,e.away.total_points,e.home.logo,e.home.team,e.home.score,e.home.moneyline,e.home.point_spread,e.home.total_points,"nfl","football"]),P(!C)},color:"green"})}),(0,i.jsx)("p",{style:{minWidth:100}}),(0,i.jsx)("p",{style:{minWidth:72},children:"Money Line"}),(0,i.jsx)("p",{style:{minWidth:120},children:"Point Spread"}),(0,i.jsx)("p",{style:{minWidth:120},children:"Total Points"})]}),(0,i.jsxs)("div",{className:o().team_format,children:[(0,i.jsxs)("div",{className:o().name_logo,children:[(0,i.jsx)("img",{alt:"",className:o().odds_logo,src:e.away.logo}),(0,i.jsxs)("div",{className:o().name_record,children:[(0,i.jsx)("h4",{children:e.away.team}),(0,i.jsxs)("span",{children:["Current Score: ",e.away.score]}),(0,i.jsx)("span",{style:{paddingTop:5},children:"@"})]})]}),(0,i.jsx)("p",{children:e.away.moneyline}),(0,i.jsx)("p",{children:e.away.point_spread}),(0,i.jsx)("p",{children:e.away.total_points})]}),(0,i.jsxs)("div",{className:o().team_format,children:[(0,i.jsxs)("div",{className:o().name_logo,children:[(0,i.jsx)("img",{alt:"",className:o().odds_logo,src:e.home.logo}),(0,i.jsxs)("div",{className:o().name_record,children:[(0,i.jsx)("h4",{children:e.home.team}),(0,i.jsxs)("span",{children:["Current Score: ",e.home.score]})]})]}),(0,i.jsx)("p",{children:e.home.moneyline}),(0,i.jsx)("p",{children:e.home.point_spread}),(0,i.jsx)("p",{children:e.home.total_points})]})]})}))]}):null,u.length>0?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h1",{className:o().upcoming,children:"Upcoming Game Odds"}),u.map(e=>(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:o().team_info,children:[(0,i.jsxs)("div",{className:o().team_header,children:[(0,i.jsx)("div",{style:{minWidth:60,cursor:"pointer"},children:(0,i.jsx)(t.OzW,{onClick:()=>{k([e.away.logo,e.away.team,e.away.record,e.away.moneyline,e.away.point_spread,e.away.total_points,e.home.logo,e.home.team,e.home.record,e.home.moneyline,e.home.point_spread,e.home.total_points]),P(!C)},color:"green"})}),(0,i.jsx)("p",{style:{minWidth:100}}),(0,i.jsx)("p",{style:{minWidth:72},children:"Money Line"}),(0,i.jsx)("p",{style:{minWidth:120},children:"Point Spread"}),(0,i.jsx)("p",{style:{minWidth:120},children:"Total Points"})]}),(0,i.jsxs)("div",{className:o().team_format,children:[(0,i.jsxs)("div",{className:o().name_logo,children:[(0,i.jsx)("img",{alt:"",className:o().odds_logo,src:e.away.logo}),(0,i.jsxs)("div",{className:o().name_record,children:[(0,i.jsx)("h4",{children:e.away.team}),(0,i.jsx)("span",{children:e.away.record}),(0,i.jsx)("span",{style:{paddingTop:5},children:"@"})]})]}),(0,i.jsx)("p",{children:e.away.moneyline}),(0,i.jsx)("p",{children:e.away.point_spread}),(0,i.jsx)("p",{children:e.away.total_points})]}),(0,i.jsxs)("div",{className:o().team_format,children:[(0,i.jsxs)("div",{className:o().name_logo,children:[(0,i.jsx)("img",{alt:"",className:o().odds_logo,src:e.home.logo}),(0,i.jsxs)("div",{className:o().name_record,children:[(0,i.jsx)("h4",{children:e.home.team}),(0,i.jsx)("span",{children:e.home.record})]})]}),(0,i.jsx)("p",{children:e.home.moneyline}),(0,i.jsx)("p",{children:e.home.point_spread}),(0,i.jsx)("p",{children:e.home.total_points})]})]})}))]}):null,b.length>0?(0,i.jsx)("h1",{className:o().upcoming,children:"Game Final Odds"}):null,b.map(e=>(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:o().team_info,children:[(0,i.jsxs)("div",{className:o().team_header,children:[(0,i.jsx)("p",{style:{minWidth:100}}),(0,i.jsx)("p",{style:{minWidth:72},children:"Money Line"}),(0,i.jsx)("p",{style:{minWidth:120},children:"Point Spread"}),(0,i.jsx)("p",{style:{minWidth:120},children:"Total Points"})]}),(0,i.jsxs)("div",{className:o().team_format,children:[(0,i.jsxs)("div",{className:o().name_logo,children:[(0,i.jsx)("img",{alt:"",className:o().odds_logo,src:e.away.logo}),(0,i.jsxs)("div",{className:o().name_record,children:[(0,i.jsx)("h4",{children:e.away.team}),(0,i.jsxs)("span",{children:["Final Score: ",e.away.score]}),(0,i.jsx)("span",{style:{paddingTop:5},children:"@"})]})]}),e.away.moneyline.length>5?(0,i.jsxs)("p",{children:[(0,i.jsx)(t.mny,{style:{marginRight:10},color:"green"}),e.away.moneyline.slice(5)]}):(0,i.jsx)("p",{children:e.away.moneyline}),e.away.point_spread.length>5?(0,i.jsxs)("p",{children:[(0,i.jsx)(t.mny,{style:{marginRight:10},color:"green"}),e.away.point_spread.slice(5)]}):(0,i.jsx)("p",{children:e.away.point_spread}),e.away.total_points.length>5?(0,i.jsxs)("p",{children:[(0,i.jsx)(t.mny,{style:{marginRight:10},color:"green"}),e.away.total_points.slice(5)]}):(0,i.jsx)("p",{children:e.away.total_points})]}),(0,i.jsxs)("div",{className:o().team_format,children:[(0,i.jsxs)("div",{className:o().name_logo,children:[(0,i.jsx)("img",{alt:"",className:o().odds_logo,src:e.home.logo}),(0,i.jsxs)("div",{className:o().name_record,children:[(0,i.jsx)("h4",{children:e.home.team}),(0,i.jsxs)("span",{children:["Final Score: ",e.home.score]})]})]}),e.home.moneyline.length>5?(0,i.jsxs)("p",{children:[(0,i.jsx)(t.mny,{style:{marginRight:10},color:"green"}),e.home.moneyline.slice(5)]}):(0,i.jsx)("p",{children:e.home.moneyline}),e.home.point_spread.length>5?(0,i.jsxs)("p",{children:[(0,i.jsx)(t.mny,{style:{marginRight:10},color:"green"}),e.home.point_spread.slice(5)]}):(0,i.jsx)("p",{children:e.home.point_spread}),e.home.total_points.length>5?(0,i.jsxs)("p",{children:[(0,i.jsx)(t.mny,{style:{marginRight:10},color:"green"}),e.home.total_points.slice(5)]}):(0,i.jsx)("p",{children:e.home.total_points})]})]})})),C?(0,i.jsx)(m.Z,{openBet:C,setOpenBet:P}):null]})})})})]})]})}}},function(e){e.O(0,[423,470,139,774,888,179],function(){return e(e.s=6504)}),_N_E=e.O()}]);