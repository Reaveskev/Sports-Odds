(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[544],{3303:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/HomePage",function(){return s(72)}])},72:function(e,t,s){"use strict";s.r(t);var a=s(5893),o=s(7294),n=s(3727),r=s(5695),i=s(239),c=s.n(i),u=s(6898),l=s(6154);let d=()=>{let[e,t]=(0,o.useState)(!0),[s,i]=(0,o.useState)([]),[d,p]=(0,o.useState)([]),[h,g]=(0,o.useState)([]),[m,f]=(0,o.useState)([]);return(0,o.useEffect)(()=>{(async function(){let e=new Date,s=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0"),n="".concat(s,"-").concat(a,"-").concat(o);try{let[e,s]=await Promise.all([l.Z.get("https://statmilk.bleacherreport.com/api/scores/schedules?date=".concat(n,"&appversion=500.0&context=")),l.Z.get("https://sports-odds.herokuapp.com/api/featured")]),a=e.data.game_groups,o=[];a.forEach(e=>{e&&e.games?o.push(...e.games):console.error("data is undefined or does not contain games property")}),g({games:o}),f(s.data),console.log(s.data),t(!1)}catch(e){console.error(e)}})()},[]),(0,a.jsx)("div",{children:e?(0,a.jsx)("div",{style:{height:"100vh",important:!0},children:(0,a.jsx)(n.Z,{})}):(0,a.jsxs)(a.Fragment,{children:[h?(0,a.jsx)(r.Z,{inprogress:h,upcoming:d,completed:s}):null,(0,a.jsxs)("div",{className:c().news,children:[(0,a.jsx)("h1",{className:c().upcoming,children:"Welcome to Sports Odds"}),(0,a.jsx)("div",{className:c().welcome,children:(0,a.jsx)("p",{children:"Welcome to our sports news and betting website! Here you can stay up-to-date with the latest news and standings for all your favorite sports. You can also place bets using fake money and receive payouts if you win. We track all the bets you make, and you can easily see your transaction history for withdrawals and deposits. You can also set your profile picture using Dropbox, and show off your favorite team's logo! We use various technologies like Flask, next.js, MySQL, Selenium, and Beautifulsoup to provide you with accurate and timely information. But don't worry, you don't need to be a tech expert to use our website. Just sit back, relax, and enjoy the latest sports news and betting odds!"})})]}),m?(0,a.jsx)(u.Z,{featuredSportsOdds:m}):null]})})};t.default=d}},function(e){e.O(0,[617,154,518,774,888,179],function(){return e(e.s=3303)}),_N_E=e.O()}]);