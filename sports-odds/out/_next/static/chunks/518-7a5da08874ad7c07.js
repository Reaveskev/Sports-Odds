(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[518],{3727:function(e,s,t){"use strict";var a=t(5893);t(7294);var n=t(9034),i=t.n(n);let l=()=>(0,a.jsxs)("div",{className:i().whistle_container,children:[(0,a.jsx)("img",{className:i().whistle,alt:"whistle",src:"/out/Sports_Odds.png"}),(0,a.jsx)("p",{className:i().text,children:"Loading..."})]});s.Z=l},6898:function(e,s,t){"use strict";t.d(s,{Z:function(){return p}});var a=t(5893),n=t(7294),i=t(239),l=t.n(i),o=t(8193),d=t(4566),r=t(6154),c=t(161),m=t.n(c);let h=e=>{let s,t,i,{setOpenBet:l}=e,{betInfo:c,user:h,setUser:_,allBets:p,setAllBets:x}=(0,d.b)(),[g,j]=(0,n.useState)(),[y,u]=(0,n.useState)(),[N,v]=(0,n.useState)(),[f,w]=(0,n.useState)(),[b,W]=(0,n.useState)(),[S,C]=(0,n.useState)(),[B,A]=(0,n.useState)(),[k,L]=(0,n.useState)(),[F,O]=(0,n.useState)(),[D,R]=(0,n.useState)();function z(e){var s=e.split(" ");return s[s.length-1]}console.log(c);let P=c[1]+" at "+c[7];(0,n.useEffect)(()=>{let e,s=new Date,t=String(s.getFullYear());if(c[12].length<15){let t=String(s.getDate());e=String(s.getMonth()+1)+t}else e=(e=c[12]).slice(5,-9);A(t+(e=","===e[4]?(e="0"+e).slice(0,2)+e.slice(-3,-1):e.length<5?(e="0"+e).slice(0,2)+e.slice(-2):e.slice(0,2)+e.slice(-2))),O(c[13]),L(c[14])},[]);let I=async(e,s,t,a,n,i,o,d,c,m)=>{if(""===s&&(u(null),v(null)),""===a&&w(null),""===n&&W(null),o>h.fake_money){alert("You are trying to bet more fake money than you have. Please try again with a lower bet amount. You have $".concat(h.fake_money," available."));return}try{await r.Z.post("https://sports-odds.herokuapp.com/api/addBet",{teams:e,moneyline:s,moneyline_team:t,pointSpread:a,totalPoints:n,parlayPayout:i,betAmount:o,gameDate:d,league:c,sport:m}).then(e=>{200===e.status&&(R("Your bet has been added to your account!"),setTimeout(()=>{j(),u(),v(),w(),W(),C(),l(!1)},"3000"),r.Z.get("https://sports-odds.herokuapp.com/api/seeBets").then(e=>{if(200===e.status){x(e.data);let s=h.fake_money-o;r.Z.post("https://sports-odds.herokuapp.com/api/update_money",{fake_money:s}).then(e=>{200===e.status&&_(e.data);let t=new Date,a=String(t.getDate()).padStart(2,"0"),n=String(t.getMonth()+1).padStart(2,"0"),i=t.getFullYear(),l="".concat(n,"/").concat(a,"/").concat(i);r.Z.post("https://sports-odds.herokuapp.com/api/addTransaction",{date:l,transaction_type:"Placed bet",transaction_amount:o,money_in_account:s}).then(e=>{200===e.status&&setAllTransactions(e.data)})})}}))})}catch(e){console.log(e)}};return y&&(s=y===c[3]?"".concat(c[15]," ").concat(y):"".concat(c[16]," ").concat(y)),f&&(t=f===c[4]?"".concat(c[15]," ").concat(f):"".concat(c[16]," ").concat(f)),b&&(i=b===c[5]?"".concat(c[15]," ").concat(b):"".concat(c[16]," ").concat(b)),(0,a.jsx)("div",{className:m().bets_container,children:(0,a.jsxs)("div",{className:m().div_container,style:{width:460},children:[(0,a.jsx)("span",{onClick:()=>l(!1),style:{color:"white"},children:(0,a.jsx)(o.LHV,{style:{margin:10,cursor:"pointer"},size:20})}),D?(0,a.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:(0,a.jsx)("span",{style:{color:"green"},children:D})}):null,(0,a.jsxs)("div",{style:{display:"flex",color:"white",flexDirection:"column"},children:[(0,a.jsx)("div",{style:{padding:15},children:(0,a.jsxs)("table",{children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{}),(0,a.jsx)("th",{children:"Money"}),(0,a.jsx)("th",{children:"Spread"}),(0,a.jsx)("th",{children:"Total"})]})}),(0,a.jsxs)("tbody",{children:[(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[(0,a.jsx)("img",{srcSet:c[0]}),(0,a.jsx)("div",{style:{padding:5,whiteSpace:"nowrap"},children:c[1]})]})}),(0,a.jsx)("td",{onClick:()=>{y===c[3]?(u(""),v("")):(u(c[3]),v(z(c[1])))},children:(0,a.jsx)("div",{className:m().cells,style:{backgroundColor:y===c[3]?"#393939":null},children:c[3]})}),(0,a.jsx)("td",{onClick:()=>{f===c[4]?w(""):w(c[4])},children:(0,a.jsx)("div",{className:m().cells,style:{backgroundColor:f===c[4]?"#393939":null},children:c[4]})}),(0,a.jsx)("td",{onClick:()=>{b===c[5]?W(""):W(c[5])},children:(0,a.jsx)("div",{className:m().cells,style:{backgroundColor:b===c[5]?"#393939":null},children:c[5]})})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[(0,a.jsx)("img",{srcSet:c[6]}),(0,a.jsx)("div",{style:{padding:5,whiteSpace:"nowrap"},children:c[7]})]})}),(0,a.jsx)("td",{onClick:()=>{y===c[9]?(u(""),v("")):(u(c[9]),v(z(c[7])))},children:(0,a.jsx)("div",{className:m().cells,style:{backgroundColor:y===c[9]?"#393939":null},children:c[9]})}),(0,a.jsx)("td",{onClick:()=>{f===c[10]?w(""):w(c[10])},children:(0,a.jsx)("div",{className:m().cells,style:{backgroundColor:f===c[10]?"#393939":null},children:c[10]})}),(0,a.jsx)("td",{onClick:()=>{b===c[11]?W(""):W(c[11])},children:(0,a.jsx)("div",{className:m().cells,style:{backgroundColor:b===c[11]?"#393939":null},children:c[11]})})]})]})]})}),(0,a.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,a.jsx)("span",{style:{color:"white"},children:"How much do you want to bet? $"}),(0,a.jsx)("input",{className:m().money_input,onChange:function(e){C(e.target.value)},value:S,type:"text"})]}),(0,a.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:(0,a.jsx)("button",{className:m().calc_button,onClick:()=>(function(e,s,t,a){let n=parseInt(e);if(void 0!==s&&""!==s){let e=parseInt(s);n*=e>0?1+e/100:1+100/Math.abs(e)}if(void 0!==t&&""!==t){let e=parseInt(t.slice(-5,-1));!0!==isNaN(e)&&(n*=e>0?1+e/100:1+100/Math.abs(e))}if(void 0!==a&&""!==s){let e=parseInt(a.slice(-5,-1));!0!==isNaN(e)&&(n*=e>0?1+e/100:1+100/Math.abs(e))}return j(n.toFixed(2))})(S,y,f,b),children:"Calculate"})}),g?(0,a.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"},children:[(0,a.jsxs)("span",{style:{color:"white",padding:10,display:"flex",justifyContent:"center"},children:["Your projections: ",s," ",t," ",i]}),(0,a.jsxs)("span",{style:{color:"white",padding:10},children:["Potential payout: $",g]}),h?(0,a.jsx)("button",{onClick:()=>{I(P,y,N,f,b,g,S,B,F,k)},className:m().addbutton,children:"Add to bets"}):(0,a.jsx)("span",{style:{color:"white",paddingBottom:10},children:"Sign in to add bet to your account!"})]}):null]})]})})},_=e=>{let{inprogressSportsOdds:s,finalSportsOdds:t,upcomingSportsOdds:i,featuredSportsOdds:r,abbrev:c,sport:m,league:_}=e,[p,x]=(0,n.useState)(!1),{setBetInfo:g}=(0,d.b)(),j=(e,s,t)=>{let a="",n="";for(let[i,l]of Object.entries(e))if(s===i&&(a=l),t===i&&(n=l),a&&n)break;return[a,n]};return(0,a.jsx)("div",{className:l().odds_container,style:{width:r?"auto":"25%",paddingRight:r?0:"5%"},children:(0,a.jsx)("div",{className:l().odds_div,children:(0,a.jsxs)("div",{className:l().odds,children:[r?(0,a.jsx)(a.Fragment,{children:r.length>0?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h1",{className:l().upcoming,children:"Featured Game Odds"}),(0,a.jsx)("div",{className:l().featured_odds,children:r.map(e=>(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:l().featured_info,children:[(0,a.jsx)("span",{children:e.home.title}),(0,a.jsxs)("div",{className:l().team_header,children:[(0,a.jsx)("p",{style:{minWidth:35}}),(0,a.jsx)("p",{style:{minWidth:90,fontSize:10,paddingRight:15,paddingLeft:10},children:e.away.time_left}),(0,a.jsx)("p",{style:{minWidth:45},children:"Money"}),(0,a.jsx)("p",{style:{minWidth:75},children:"Spread"}),(0,a.jsx)("p",{style:{minWidth:90},children:"Total"})]}),(0,a.jsxs)("div",{className:l().team_format,children:[(0,a.jsxs)("div",{className:l().name_logo,children:[(0,a.jsx)("img",{alt:"",className:l().odds_logo,src:e.away.logo}),(0,a.jsx)("h4",{children:e.away.team}),(0,a.jsx)("div",{className:l().name_record,children:(0,a.jsx)("span",{style:{paddingLeft:5},children:e.away.score})})]}),(0,a.jsx)("p",{style:{minWidth:45},children:e.away.moneyline}),(0,a.jsx)("p",{style:{minWidth:70,paddingRight:15,paddingLeft:10},children:e.away.point_spread}),(0,a.jsx)("p",{style:{minWidth:93},children:e.away.total_points})]}),(0,a.jsxs)("div",{className:l().team_format,children:[(0,a.jsxs)("div",{className:l().name_logo,children:[(0,a.jsx)("img",{alt:"",className:l().odds_logo,src:e.home.logo}),(0,a.jsx)("h4",{children:e.home.team}),(0,a.jsx)("div",{className:l().name_record,children:(0,a.jsx)("span",{style:{paddingLeft:5},children:e.home.score})})]}),(0,a.jsx)("p",{style:{minWidth:45},children:e.home.moneyline}),(0,a.jsx)("p",{style:{minWidth:70,paddingRight:15,paddingLeft:10},children:e.home.point_spread}),(0,a.jsx)("p",{style:{minWidth:93},children:e.home.total_points})]})]})}))})]}):null}):null,s?(0,a.jsx)(a.Fragment,{children:s.length>0?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h1",{className:l().upcoming,children:"Live Game Odds"}),s.map(e=>{let s=e.home.team,t=e.away.team;return[t,s]=j(c,t,s),(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:l().team_info,children:[(0,a.jsxs)("div",{className:l().team_header,children:[(0,a.jsx)("div",{style:{minWidth:30,cursor:"pointer"},children:(0,a.jsx)(o.OzW,{onClick:()=>{g([e.away.logo,e.away.team,e.away.score,e.away.moneyline,e.away.point_spread,e.away.total_points,e.home.logo,e.home.team,e.home.score,e.home.moneyline,e.home.point_spread,e.home.total_points,_,m,t,s]),x(!p)},color:"green"})}),(0,a.jsx)("p",{style:{minWidth:"auto",fontSize:10,paddingRight:15,paddingLeft:10},children:e.away.time_left}),(0,a.jsx)("p",{style:{minWidth:45},children:"Money"}),(0,a.jsx)("p",{style:{minWidth:75},children:"Spread"}),(0,a.jsx)("p",{style:{minWidth:90},children:"Total"})]}),(0,a.jsxs)("div",{className:l().team_format,children:[(0,a.jsxs)("div",{className:l().name_logo,children:[(0,a.jsx)("img",{alt:"",className:l().odds_logo,src:e.away.logo}),(0,a.jsx)("h4",{children:t}),(0,a.jsx)("div",{className:l().name_record,children:(0,a.jsx)("span",{style:{paddingLeft:5},children:e.away.score})})]}),(0,a.jsx)("p",{style:{minWidth:45},children:e.away.moneyline}),(0,a.jsx)("p",{style:{minWidth:70,paddingRight:15,paddingLeft:10},children:e.away.point_spread}),(0,a.jsx)("p",{style:{minWidth:93},children:e.away.total_points})]}),(0,a.jsxs)("div",{className:l().team_format,children:[(0,a.jsxs)("div",{className:l().name_logo,children:[(0,a.jsx)("img",{alt:"",className:l().odds_logo,src:e.home.logo}),(0,a.jsx)("h4",{children:s}),(0,a.jsx)("div",{className:l().name_record,children:(0,a.jsx)("span",{style:{paddingLeft:5},children:e.home.score})})]}),(0,a.jsx)("p",{style:{minWidth:45},children:e.home.moneyline}),(0,a.jsx)("p",{style:{minWidth:70,paddingRight:15,paddingLeft:10},children:e.home.point_spread}),(0,a.jsx)("p",{style:{minWidth:93},children:e.home.total_points})]})]})})})]}):null}):null,i?(0,a.jsx)(a.Fragment,{children:i.length>0?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h1",{className:l().upcoming,children:"Upcoming Game Odds"}),i.map(e=>{let s=e.home.team,t=e.away.team;return[t,s]=j(c,t,s),(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:l().team_info,children:[(0,a.jsxs)("div",{className:l().team_header,children:[(0,a.jsx)("div",{style:{minWidth:"auto",cursor:"pointer",paddingLeft:10},children:(0,a.jsx)(o.OzW,{onClick:()=>{g([e.away.logo,e.away.team,e.away.record,e.away.moneyline,e.away.point_spread,e.away.total_points,e.home.logo,e.home.team,e.home.record,e.home.moneyline,e.home.point_spread,e.home.total_points,e.home.start_time,_,m,t,s]),x(!p)},color:"green"})}),(0,a.jsx)("p",{style:{minWidth:"auto",fontSize:10,paddingRight:15,paddingLeft:10},children:e.away.start_time.slice(4)}),(0,a.jsx)("p",{style:{minWidth:45},children:"Money"}),(0,a.jsx)("p",{style:{minWidth:70},children:"Spread"}),(0,a.jsx)("p",{style:{minWidth:93},children:"Total"})]}),(0,a.jsx)("div",{className:l().team_format,children:(0,a.jsxs)("div",{className:l().name_logo,children:[(0,a.jsx)("img",{alt:"",className:l().odds_logo,src:e.away.logo}),(0,a.jsx)("h4",{children:t}),(0,a.jsx)("div",{className:l().name_record,children:(0,a.jsx)("span",{style:{fontSize:10,paddingLeft:5},children:e.away.record})}),(0,a.jsx)("p",{style:{minWidth:45},children:e.away.moneyline}),(0,a.jsx)("p",{style:{minWidth:70,paddingRight:15,paddingLeft:10},children:e.away.point_spread}),(0,a.jsx)("p",{style:{minWidth:93},children:e.away.total_points})]})}),(0,a.jsx)("div",{className:l().team_format,children:(0,a.jsxs)("div",{className:l().name_logo,children:[(0,a.jsx)("img",{alt:"",className:l().odds_logo,src:e.home.logo}),(0,a.jsx)("h4",{children:s}),(0,a.jsx)("div",{className:l().name_record,children:(0,a.jsx)("span",{style:{fontSize:10,paddingLeft:5},children:e.home.record})}),(0,a.jsx)("p",{style:{minWidth:45},children:e.home.moneyline}),(0,a.jsx)("p",{style:{minWidth:70,paddingRight:15,paddingLeft:10},children:e.home.point_spread}),(0,a.jsx)("p",{style:{minWidth:93},children:e.home.total_points})]})})]})})})]}):null}):null,t?(0,a.jsx)(a.Fragment,{children:t.length>0?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h1",{className:l().upcoming,children:"Game Final Odds"}),t.map(e=>{let s=e.home.team,t=e.away.team;return[t,s]=j(c,t,s),(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:l().team_info,children:[(0,a.jsxs)("div",{className:l().team_header,children:[(0,a.jsx)("p",{style:{minWidth:100,fontSize:10,paddingRight:15,paddingLeft:10},children:"Final"}),(0,a.jsx)("p",{style:{minWidth:45},children:"Money"}),(0,a.jsx)("p",{style:{minWidth:75},children:"Spread"}),(0,a.jsx)("p",{style:{minWidth:93},children:"Total"})]}),(0,a.jsxs)("div",{className:l().team_format,children:[(0,a.jsxs)("div",{className:l().name_logo,children:[(0,a.jsx)("img",{alt:"",className:l().odds_logo,src:e.away.logo}),(0,a.jsx)("h4",{children:t}),(0,a.jsx)("div",{className:l().name_record,children:(0,a.jsx)("span",{style:{paddingLeft:5,paddingRight:5},children:e.away.score})})]}),e.away.moneyline.length>5?(0,a.jsxs)("p",{style:{minWidth:45},children:[(0,a.jsx)(o.mny,{style:{marginRight:5},color:"green"}),e.away.moneyline.slice(5)]}):(0,a.jsx)("p",{style:{minWidth:45},children:e.away.moneyline}),e.away.point_spread.length>5?(0,a.jsxs)("p",{style:{minWidth:75},children:[(0,a.jsx)(o.mny,{style:{marginRight:5},color:"green"}),e.away.point_spread.slice(5)]}):(0,a.jsx)("p",{style:{minWidth:75},children:e.away.point_spread}),e.away.total_points.length>8?(0,a.jsxs)("p",{style:{minWidth:93},children:[(0,a.jsx)(o.mny,{style:{marginRight:5},color:"green"}),e.away.total_points.slice(5)]}):(0,a.jsxs)(a.Fragment,{children:["(","basketball"!==m&&e.away.total_points.length>4?(0,a.jsx)("p",{style:{minWidth:93},children:e.away.total_points.slice(4)}):(0,a.jsx)("p",{style:{minWidth:93},children:e.away.total_points}),")"]})]}),(0,a.jsxs)("div",{className:l().team_format,children:[(0,a.jsxs)("div",{className:l().name_logo,children:[(0,a.jsx)("img",{alt:"",className:l().odds_logo,src:e.home.logo}),(0,a.jsx)("h4",{children:s}),(0,a.jsx)("div",{className:l().name_record,children:(0,a.jsx)("span",{style:{paddingLeft:5,paddingRight:5},children:e.home.score})})]}),e.home.moneyline.length>5?(0,a.jsxs)("p",{style:{minWidth:45},children:[(0,a.jsx)(o.mny,{style:{marginRight:5},color:"green"}),e.home.moneyline.slice(5)]}):(0,a.jsx)("p",{style:{minWidth:45},children:e.home.moneyline}),e.home.point_spread.length>5?(0,a.jsxs)("p",{style:{minWidth:75},children:[(0,a.jsx)(o.mny,{style:{marginRight:5},color:"green"}),e.home.point_spread.slice(5)]}):(0,a.jsx)("p",{style:{minWidth:75},children:e.home.point_spread}),e.home.total_points.length>8?(0,a.jsxs)("p",{style:{minWidth:93},children:[(0,a.jsx)(o.mny,{style:{marginRight:5},color:"green"}),e.home.total_points.slice(5)]}):(0,a.jsxs)(a.Fragment,{children:["(","basketball"!==m&&e.home.total_points.length>4?(0,a.jsx)("p",{style:{minWidth:93},children:e.home.total_points.slice(4)}):(0,a.jsx)("p",{style:{minWidth:93},children:e.home.total_points}),")"]})]})]})})})]}):null}):null,p?(0,a.jsx)(h,{setOpenBet:x}):null]})})})};var p=_},5695:function(e,s,t){"use strict";var a=t(5893);t(7294);var n=t(239),i=t.n(n);let l=e=>{let{inprogress:s,upcoming:t,completed:n}=e;return(0,a.jsx)("div",{className:i().scoreboard,children:(0,a.jsxs)(a.Fragment,{children:[void 0!==s.games?(0,a.jsx)(a.Fragment,{children:s.games.map(e=>(0,a.jsxs)("div",{className:i().games,children:[(0,a.jsx)("div",{className:i().date,children:e.game_progress.primary}),(0,a.jsx)("div",{className:i().time,children:e.game_progress.header}),(0,a.jsxs)("div",{className:i().teamContainer,children:[(0,a.jsx)("div",{className:i().logoDiv,children:(0,a.jsx)("img",{alt:"",className:i().logo,src:e.team_one.logo})}),(0,a.jsx)("div",{className:i().teamName,children:e.team_one.abbrev}),(0,a.jsx)("div",{className:i().record,children:e.team_one.record}),(0,a.jsx)("span",{children:e.team_one.score})]}),(0,a.jsxs)("div",{className:i().teamContainer,children:[(0,a.jsx)("div",{className:i().logoDiv,children:(0,a.jsx)("img",{alt:"",className:i().logo,src:e.team_two.logo})}),(0,a.jsx)("div",{className:i().teamName,children:e.team_two.abbrev}),(0,a.jsx)("div",{className:i().record,children:e.team_two.record}),(0,a.jsx)("span",{children:e.team_two.score})]})]},e.id))}):null,void 0!==n.games?(0,a.jsx)(a.Fragment,{children:n.games.map(e=>(0,a.jsxs)("div",{className:i().games,children:[(0,a.jsx)("div",{className:i().date,children:e.game_progress.primary}),(0,a.jsx)("div",{className:i().time,children:e.game_progress.header}),(0,a.jsxs)("div",{className:i().teamContainer,children:[(0,a.jsx)("div",{className:i().logoDiv,children:(0,a.jsx)("img",{alt:"",className:i().logo,src:e.team_one.logo})}),(0,a.jsx)("div",{className:i().teamName,children:e.team_one.abbrev}),(0,a.jsx)("div",{className:i().record,children:e.team_one.record}),(0,a.jsx)("span",{children:e.team_one.score})]}),(0,a.jsxs)("div",{className:i().teamContainer,children:[(0,a.jsx)("div",{className:i().logoDiv,children:(0,a.jsx)("img",{alt:"",className:i().logo,src:e.team_two.logo})}),(0,a.jsx)("div",{className:i().teamName,children:e.team_two.abbrev}),(0,a.jsx)("div",{className:i().record,children:e.team_two.record}),(0,a.jsx)("span",{children:e.team_two.score})]})]},e.id))}):null,void 0!==t.games?(0,a.jsx)(a.Fragment,{children:t.games.map(e=>(0,a.jsxs)("div",{className:i().games,children:[(0,a.jsx)("div",{className:i().date,children:e.game_progress.primary}),(0,a.jsx)("div",{className:i().time,children:e.game_progress.header}),(0,a.jsxs)("div",{className:i().teamContainer,children:[(0,a.jsx)("div",{className:i().logoDiv,children:(0,a.jsx)("img",{alt:"",className:i().logo,src:e.team_one.logo})}),(0,a.jsx)("div",{className:i().teamName,children:e.team_one.abbrev}),(0,a.jsx)("div",{className:i().record,children:e.team_one.record}),(0,a.jsx)("span",{children:e.team_one.score})]}),(0,a.jsxs)("div",{className:i().teamContainer,children:[(0,a.jsx)("div",{className:i().logoDiv,children:(0,a.jsx)("img",{alt:"",className:i().logo,src:e.team_two.logo})}),(0,a.jsx)("div",{className:i().teamName,children:e.team_two.abbrev}),(0,a.jsx)("div",{className:i().record,children:e.team_two.record}),(0,a.jsx)("span",{children:e.team_two.score})]})]},e.id))}):null]})})};s.Z=l},9034:function(e){e.exports={main:"Home_main__nLjiQ",whistle_container:"Home_whistle_container__UOf0g",whistle:"Home_whistle__2d2lT",blow:"Home_blow__RdG20",text:"Home_text__upzyl"}},239:function(e){e.exports={games:"NBA_games__2YwTQ",teamContainer:"NBA_teamContainer__OWg5v",logo:"NBA_logo__2FM5M",time:"NBA_time__hkaud",date:"NBA_date__hNSFt",logoDiv:"NBA_logoDiv__D8OQT",teamName:"NBA_teamName__vQ_pQ",record:"NBA_record__6wHPi",scoreboard:"NBA_scoreboard__c9n6o",news:"NBA_news__Hsn_j",newInfo:"NBA_newInfo__59vvD",welcome:"NBA_welcome__zmLJL",new_a:"NBA_new_a__pPXyo",Pic:"NBA_Pic__6et1R",newsHeader:"NBA_newsHeader__8har7",offseason:"NBA_offseason__28GAk",odds:"NBA_odds__f_e2Y",featured_odds:"NBA_featured_odds__V_cS8",featured_info:"NBA_featured_info__QCMKW",odds_div:"NBA_odds_div__snSxc",upcoming:"NBA_upcoming__ZB0__",team_info:"NBA_team_info__kJrM5",team_format:"NBA_team_format__pP0xZ",team_header:"NBA_team_header__1OPZ8",name_record:"NBA_name_record__7YoH1",odds_logo:"NBA_odds_logo__DtMzD",name_logo:"NBA_name_logo__obU3J",standing_div:"NBA_standing_div__fhQZ1",odds_container:"NBA_odds_container__Q6_TJ",Standings:"NBA_Standings__4SDQg",standings_title:"NBA_standings_title__4h7xW",mobile_sports:"NBA_mobile_sports__z6SP7",mobile_tab:"NBA_mobile_tab__pveZN",test:"NBA_test__IirkC",new_div:"NBA_new_div__pOYi3",buttons_div:"NBA_buttons_div__LX1Uq"}},161:function(e){e.exports={bets_container:"bet_bets_container__9HuLP",money_input:"bet_money_input__MIuhn",div_container:"bet_div_container__RZfln",calc_button:"bet_calc_button__lbqKN",addbutton:"bet_addbutton__5Kl5I",cells:"bet_cells__8YVY2"}},8357:function(e,s,t){"use strict";t.d(s,{w_:function(){return d}});var a=t(7294),n={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=a.createContext&&a.createContext(n),l=function(){return(l=Object.assign||function(e){for(var s,t=1,a=arguments.length;t<a;t++)for(var n in s=arguments[t])Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);return e}).apply(this,arguments)},o=function(e,s){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&0>s.indexOf(a)&&(t[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var n=0,a=Object.getOwnPropertySymbols(e);n<a.length;n++)0>s.indexOf(a[n])&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(t[a[n]]=e[a[n]]);return t};function d(e){return function(s){return a.createElement(r,l({attr:l({},e.attr)},s),function e(s){return s&&s.map(function(s,t){return a.createElement(s.tag,l({key:t},s.attr),e(s.child))})}(e.child))}}function r(e){var s=function(s){var t,n=e.attr,i=e.size,d=e.title,r=o(e,["attr","size","title"]),c=i||s.size||"1em";return s.className&&(t=s.className),e.className&&(t=(t?t+" ":"")+e.className),a.createElement("svg",l({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},s.attr,n,r,{className:t,style:l(l({color:e.color||s.color},s.style),e.style),height:c,width:c,xmlns:"http://www.w3.org/2000/svg"}),d&&a.createElement("title",null,d),e.children)};return void 0!==i?a.createElement(i.Consumer,null,function(e){return s(e)}):s(n)}}}]);