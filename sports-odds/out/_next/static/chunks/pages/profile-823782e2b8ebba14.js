(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[283],{9344:function(e,s,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile",function(){return l(7329)}])},7329:function(e,s,l){"use strict";l.r(s);var n=l(5893),r=l(6154),a=l(7294),i=l(8094),o=l.n(i),t=l(183),c=l(4566);s.default=function(){let[e,s]=(0,a.useState)(),[l,i]=(0,a.useState)(),[d,h]=(0,a.useState)(),[u,_]=(0,a.useState)(),{user:m,setUser:x}=(0,c.b)(),f=e=>{s(e.target.value)},N=e=>{h(e.target.value)},j=e=>{i(e.target.value)},p=e=>{_(e.target.value)},M=()=>{_(""),i(""),s(""),h("")},k=async n=>{n.preventDefault();try{""===d&&h(m.username),""===e&&s(m.f_name),""===l&&i(m.l_name),""===u&&_(m.password),await r.Z.post("https://sports-odds.herokuapp.com/update_info",{username:d,password:u,firstName:e,lastName:l}).then(e=>{200===e.status?x(e.data):setError("Invalid username or password!"),console.log(e)})}catch(e){console.log(e)}M()};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.Z,{}),(0,n.jsxs)("div",{className:o().profile_container,children:[(0,n.jsx)("div",{className:o().profile_header,children:m?(0,n.jsxs)("h1",{children:[m.f_name," ",m.l_name]}):null}),(0,n.jsx)("div",{className:o().profile_body,children:(0,n.jsxs)("form",{onSubmit:k,children:[(0,n.jsx)("h2",{children:"Account Information"}),(0,n.jsx)("label",{htmlFor:"firstname",children:"First Name:"}),(0,n.jsx)("input",{type:"text",id:"firstname",value:e,onChange:f}),(0,n.jsx)("label",{htmlFor:"lastname",children:"Last Name:"}),(0,n.jsx)("input",{type:"text",id:"lastname",value:l,onChange:j}),(0,n.jsx)("label",{htmlFor:"password",children:"Password:"}),(0,n.jsx)("input",{type:"password",id:"password",value:u,onChange:p}),(0,n.jsx)("label",{htmlFor:"username",children:"Username:"}),(0,n.jsx)("input",{type:"text",id:"username",value:d,onChange:N}),(0,n.jsx)("button",{type:"submit",children:"Save Changes"})]})})]})]})}},183:function(e,s,l){"use strict";var n=l(5893),r=l(7294),a=l(6154),i=l(7355),o=l.n(i),t=l(1664),c=l.n(t),d=l(4566);s.Z=function(){let[e,s]=(0,r.useState)(!1),{user:l,setUser:i}=(0,d.b)(),t=()=>{try{a.Z.post("https://sports-odds.herokuapp.com/logout").then(e=>{200===e.status?i(null):console.log(e)})}catch(e){console.log(e)}};return(0,n.jsxs)("div",{className:o().navbar,children:[(0,n.jsx)("li",{onMouseEnter:()=>{s(!1)},className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/",children:"Home"})}),(0,n.jsx)("li",{onMouseEnter:()=>{s(!1)},className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/NFL",children:"NFL"})}),(0,n.jsx)("li",{onMouseEnter:()=>{s(!1)},className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/NBA",children:"NBA"})}),(0,n.jsx)("li",{onMouseEnter:()=>{s(!1)},className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/WNBA",children:"WNBA"})}),(0,n.jsx)("li",{onMouseEnter:()=>{s(!1)},className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/MLB",children:"MLB"})}),(0,n.jsx)("li",{onMouseEnter:()=>{s(!1)},className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/Soccer",children:"Soccer"})}),(0,n.jsx)("li",{onMouseEnter:()=>{s(!1)},className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/NHL",children:"NHL"})}),(0,n.jsxs)("li",{className:o().li,children:[(0,n.jsx)("div",{onMouseEnter:()=>{s(!0)},className:o().link,children:"NCAA"}),e?(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:o().seeMore,onMouseLeave:()=>{s(!1)},children:[(0,n.jsx)("li",{className:o().seeMoreli,children:(0,n.jsx)(c(),{className:o().seeMoreLink,href:"/MCBB",children:"MCBB"})}),(0,n.jsx)("li",{className:o().seeMoreli,children:(0,n.jsx)(c(),{className:o().seeMoreLink,href:"/WCBB",children:"WCBB"})}),(0,n.jsx)("li",{className:o().seeMoreli,children:(0,n.jsx)(c(),{className:o().seeMoreLink,href:"/CFB",children:"CFB"})})]})}):null]}),l?(0,n.jsxs)("div",{className:o().login_or_profile,children:[(0,n.jsx)("li",{onMouseEnter:()=>{s(!1)},className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/profile",children:"Profile"})}),(0,n.jsx)("li",{onMouseEnter:()=>{s(!1)},onClick:()=>{t()},className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/",children:"Logout"})})]}):(0,n.jsx)("div",{className:o().login_or_profile,children:(0,n.jsx)("li",{onMouseEnter:()=>{s(!1)},className:o().li,children:(0,n.jsx)(c(),{className:o().link,href:"/login",children:"Login"})})})]})}},7355:function(e){e.exports={li:"Header_li__hAG_C",link:"Header_link__nMT9k",navbar:"Header_navbar__7ndZO",seeMore:"Header_seeMore__QBAN3",seeMoreli:"Header_seeMoreli__aOKUk",seeMoreLink:"Header_seeMoreLink__HxtEr",login_or_profile:"Header_login_or_profile__Alwf4"}},8094:function(e){e.exports={profile_container:"profile_profile_container__aT3XU",profile_header:"profile_profile_header__Eiykh",profile_body:"profile_profile_body__ti6lI"}}},function(e){e.O(0,[470,774,888,179],function(){return e(e.s=9344)}),_N_E=e.O()}]);