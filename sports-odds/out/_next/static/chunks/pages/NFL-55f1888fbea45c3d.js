(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[125],{6504:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/NFL",function(){return a(9059)}])},9059:function(e,s,a){"use strict";a.r(s);var n=a(5893),t=a(6154),i=a(7294),l=a(239),r=a.n(l),o=a(183),d=a(6898),c=a(3727),h=a(7300),m=a(5695);s.default=function(){let[e,s]=(0,i.useState)(!0),[a,l]=(0,i.useState)([]),[p,g]=(0,i.useState)([]),[u,N]=(0,i.useState)([]),[x,j]=(0,i.useState)([]),[f,_]=(0,i.useState)([]),[S,w]=(0,i.useState)(!1),[v,b]=(0,i.useState)([]),[C,k]=(0,i.useState)([]),[y,I]=(0,i.useState)([]),[P,A]=(0,i.useState)([]),[L,B]=(0,i.useState)(!0),[E,O]=(0,i.useState)(!1),[Z,F]=(0,i.useState)(!1),T={"Arizona Cardinals":"ARI","Atlanta Falcons":"ATL","Baltimore Ravens":"BAL","Buffalo Bills":"BUF","Carolina Panthers":"CAR","Chicago Bears":"CHI","Cincinnati Bengals":"CIN","Cleveland Browns":"CLE","Dallas Cowboys":"DAL","Denver Broncos":"DEN","Detroit Lions":"DET","Green Bay Packers":"GB"," Houston Texans":"HOU","Indianapolis Colts":"IND","Jacksonville Jaguars":"JAX","Kansas City Chiefs":"KC","Las Vegas Raiders":"LV","Los Angeles Chargers":"LAC","Los Angeles Rams":"LAR","Miami Dolphins":"MIA","Minnesota Vikings":"MIN","New England Patriots":"NE","New Orleans Saints":"NO","New York Giants":"NYG","New York Jets":"NYJ","Philadelphia Eagles":"PHI","Pittsburgh Steelers":"PIT","San Francisco 49ers":"SF","Seattle Seahawks":"SEA","Tampa Bay Buccaneers":"TB","Tennessee Titans":"TEN","Washington Commanders":"WAS"};return(0,i.useEffect)(()=>{(async function(){try{let[e,a,n,i,r]=await Promise.all([t.Z.get("https://statmilk.bleacherreport.com/api/scores/carousel?league=NFL&team=none&carousel_context=league&tz=-25200&appversion=500.0"),t.Z.get("https://site.api.espn.com/apis/site/v2/sports/football/nfl/news"),t.Z.get("https://sports-odds.herokuapp.com/api/Odds/nfl"),t.Z.get("https://sports-odds.herokuapp.com/api/Sport_News/nfl"),t.Z.get("https://sports-odds.herokuapp.com/api/Sport_Standings/nfl")]);void 0===e.data.game_groups[0]?w(!0):"In Progress"===e.data.game_groups[0].name&&"Completed"===e.data.game_groups[1].name?(g(e.data.game_groups[0]),l(e.data.game_groups[1]),N(e.data.game_groups[2])):"Completed"===e.data.game_groups[0].name?(l(e.data.game_groups[0]),N(e.data.game_groups[1])):"In Progress"===e.data.game_groups[0].name&&"Upcoming"===e.data.game_groups[1].name?(g(e.data.game_groups[0]),N(e.data.game_groups[1])):N(e.data.game_groups[0]),j(a.data.articles),b(n.data[0].Upcoming),I(n.data[1].Inprogress),k(n.data[2].Final),_(i.data),A(r.data),s(!1)}catch(e){console.error(e)}})()},[]),(0,n.jsxs)("div",{children:[(0,n.jsx)(o.Z,{}),e?(0,n.jsx)("div",{style:{height:"100vh",important:!0},children:(0,n.jsx)(c.Z,{})}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{style:S?{justifyContent:"center"}:null,children:S?(0,n.jsx)("div",{className:r().offseason,children:(0,n.jsx)("p",{children:"It is currently the offseason."})}):(0,n.jsx)(m.Z,{inprogress:p,upcoming:u,completed:a})}),(0,n.jsx)("div",{className:r().test,children:S?null:(0,n.jsx)(h.Z,{standings:P})}),(0,n.jsx)("div",{className:r().test,children:(0,n.jsx)("div",{className:r().new_div,style:{width:S?"100%":"60%",float:S?"none":"left"},children:(0,n.jsxs)("div",{className:r().news,children:[(0,n.jsx)("h1",{className:r().upcoming,children:"NFL News"}),x.map(e=>(0,n.jsxs)("div",{className:r().newInfo,children:[(0,n.jsx)("a",{href:e.links.web.href,className:r().new_a,children:(0,n.jsx)("img",{className:r().Pic,height:325,alt:"",src:e.images[0].url})}),(0,n.jsx)("header",{style:{fontSize:22},children:e.headline}),(0,n.jsx)("p",{children:e.description})]},e.headline)),f.map(e=>(0,n.jsxs)("div",{className:r().newInfo,children:[(0,n.jsx)("a",{href:e.links,className:r().new_a,children:(0,n.jsx)("img",{className:r().Pic,height:325,alt:"",src:e.image})}),(0,n.jsx)("header",{style:{fontSize:22},children:e.headline}),(0,n.jsx)("p",{children:e.description})]},e.headline))]})})}),S?null:(0,n.jsx)("div",{className:r().test,children:(0,n.jsx)(d.Z,{inprogressSportsOdds:y,finalSportsOdds:C,upcomingSportsOdds:v,abbrev:T,sport:"football",league:"nfl"})})]}),(0,n.jsxs)("div",{className:r().mobile_sports,children:[(0,n.jsxs)("div",{className:r().buttons_div,children:[(0,n.jsx)("button",{className:r().mobile_tab,style:{backgroundColor:L?"181818":"222223"},onClick:()=>{B(!0),O(!1),F(!1)},children:"News"}),S?null:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("button",{className:r().mobile_tab,style:{backgroundColor:E?"181818":"222223"},onClick:()=>{B(!1),O(!0),F(!1)},children:"Odds"}),(0,n.jsx)("button",{className:r().mobile_tab,style:{backgroundColor:Z?"181818":"222223"},onClick:()=>{B(!1),O(!1),F(!0)},children:"Standings"})]})]}),L?(0,n.jsxs)("div",{className:r().news,children:[(0,n.jsx)("h1",{className:r().upcoming,children:"NFL News"}),x.map(e=>(0,n.jsxs)("div",{className:r().newInfo,children:[(0,n.jsx)("a",{href:e.links.web.href,className:r().new_a,children:(0,n.jsx)("img",{className:r().Pic,height:325,alt:"",src:e.images[0].url})}),(0,n.jsx)("header",{style:{fontSize:22},children:e.headline}),(0,n.jsx)("p",{children:e.description})]},e.headline)),f.map(e=>(0,n.jsxs)("div",{className:r().newInfo,children:[(0,n.jsx)("a",{href:e.links,className:r().new_a,children:(0,n.jsx)("img",{className:r().Pic,height:325,alt:"",src:e.image})}),(0,n.jsx)("header",{style:{fontSize:22},children:e.headline}),(0,n.jsx)("p",{children:e.description})]},e.headline))]}):null,E?(0,n.jsx)(d.Z,{inprogressSportsOdds:y,finalSportsOdds:C,upcomingSportsOdds:v,abbrev:T,sport:"football",league:"nfl"}):null,Z?(0,n.jsx)(h.Z,{standings:P}):null]})]})}}},function(e){e.O(0,[423,154,664,518,399,774,888,179],function(){return e(e.s=6504)}),_N_E=e.O()}]);