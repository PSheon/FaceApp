(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{801:function(e,a,t){"use strict";t.r(a);var n=t(10),o=t(24),l=t(0),r=t.n(l),c=t(752),m=t(775),s=t(119),i=t(761),u=t(747),d=t(799),f=t(744),b=t(697),g=t(750),p=t(770),E=t(360),x=t(7),k=t(776),w=t.n(k),h=t(777),v=t.n(h),N=t(59),j=t(98),O=t.n(j),y=t(36),I=t(120),C=t(30),A=t(3),D=t(12),F=t(19),P=t(60),S=t(257),T=Object(E.a)(function(e){return{root:{backgroundImage:"url(/assets/images/backgrounds/ys-bg.jpg)",backgroundPosition:"center",backgroundAttachment:"fixed",backgroundRepeat:"no-repeat",backgroundSize:"cover",color:e.palette.primary.contrastText},googleButton:{backgroundColor:"#d9534f","&:hover":{backgroundColor:"#d9534f"}},facebookButton:{backgroundColor:"#428bca","&:hover":{backgroundColor:"#428bca"}}}});a.default=function(){var e=Object(x.b)(),a=T(),t=Object(x.c)(function(e){return e.auth.login}),E=Object(l.useState)(!1),k=Object(o.a)(E,2),h=k[0],j=k[1],B=Object(l.useState)(!1),L=Object(o.a)(B,2),R=L[0],q=L[1],z=Object(l.useRef)(null);Object(l.useEffect)(function(){t.error&&(t.error.email||t.error.password)&&(z.current.updateInputsWithError(Object(n.a)({},t.error)),J(),q(!1))},[t.error,t.success]);var U=Object(I.b)({email:"",password:"",remember:!0}),W=U.form,G=U.handleChange;function J(){j(!1)}return r.a.createElement("div",{className:Object(A.a)(a.root,"flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")},r.a.createElement("div",{className:"flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left"},r.a.createElement(N.a,{animation:"transition.expandIn"},r.a.createElement(C.a,{to:"/"},r.a.createElement("img",{className:"w-400 mb-32",src:"assets/images/logos/logo.png",alt:"logo"})))),r.a.createElement(N.a,{animation:{translateX:[0,"100%"]}},r.a.createElement(c.a,{className:"w-full max-w-400 mx-auto m-16 md:m-0 rounded-12"},r.a.createElement(m.a,{className:"flex flex-col items-center justify-center p-32 md:p-48 md:pt-96"},r.a.createElement(s.a,{variant:"h6",className:"md:w-full mb-32 text-center"},"\u767b\u5165\u60a8\u7684\u5e33\u865f"),r.a.createElement(w.a,{clientId:F.c,render:function(e){return r.a.createElement(i.a,{variant:"contained",size:"large",onClick:e.onClick,className:Object(A.a)(a.googleButton,"normal-case w-256 mb-8 rounded-full text-white hover:shadow-xl")},r.a.createElement("img",{className:"w-36 px-0 mr-20 bg-white rounded-full",src:Object(P.e)("google"),alt:"google logo"}),"\u4f7f\u7528 Google \u767b\u5165")},onSuccess:function(a){!function(a){var t=a.googleId,n=a.accessToken,o=a.profileObj;q(!0),j(!1);var l={googleID:t,googleAccessToken:n,googleDisplayName:o.name,googleEmail:o.email,googlePhotoURL:o.imageUrl};e(y.q(l))}(a)},onFailure:function(a){e(D.p({message:"\u767b\u5165 Google \u5931\u6557"}))}}),r.a.createElement(v.a,{appId:F.b,fields:"name,email,picture",render:function(e){return r.a.createElement(i.a,{variant:"contained",size:"large",onClick:e.onClick,className:Object(A.a)(a.facebookButton,"normal-case w-256 rounded-full text-white hover:shadow-xl")},r.a.createElement("img",{className:"w-36 px-0 mr-20 bg-white rounded-full",src:Object(P.e)("facebook"),alt:"facebook logo"}),"\u4f7f\u7528 Facebook \u767b\u5165")},callback:function(a){!function(a){var t=a.userID,n=a.accessToken,o=a.name,l=a.email,r=a.picture;q(!0),j(!1);var c={facebookID:t,facebookAccessToken:n,facebookDisplayName:o,facebookEmail:l,facebookPhotoURL:r.data?r.data.url:"assets/images/avatars/penguin.png"};e(y.p(c))}(a)},onFailure:function(a){e(D.p({message:"\u767b\u5165 Facebook \u5931\u6557"}))}}),r.a.createElement("div",{className:"my-24 flex items-center justify-center"},r.a.createElement(u.a,{className:"w-64"}),r.a.createElement("span",{className:"mx-8 font-bold"},"\u6216\u8005"),r.a.createElement(u.a,{className:"w-64"})),r.a.createElement(O.a,{onValidSubmit:function(a){q(!0),j(!1),e(y.o(a))},onValid:function(){j(!0),q(!1)},onInvalid:J,ref:z,className:"flex flex-col justify-center w-full"},r.a.createElement(N.v,{className:"mb-16",label:"\u4fe1\u7bb1",autoFocus:!0,type:"email",name:"email",validations:{minLength:4,isEmail:!0},validationErrors:{minLength:"\u8acb\u8f38\u5165\u6b63\u78ba\u4fe1\u7bb1\u5730\u5740",isEmail:"\u8acb\u8f38\u5165\u6b63\u78ba\u4fe1\u7bb1\u5730\u5740"},InputProps:{endAdornment:r.a.createElement(d.a,{position:"end"},r.a.createElement(f.a,{className:"text-20",color:"action"},"email"))},variant:"outlined",required:!0,fullWidth:!0}),r.a.createElement(N.v,{className:"mb-16",label:"\u5bc6\u78bc",type:"password",name:"password",InputProps:{endAdornment:r.a.createElement(d.a,{position:"end"},r.a.createElement(f.a,{className:"text-20",color:"action"},"vpn_key"))},variant:"outlined",required:!0,fullWidth:!0}),r.a.createElement("div",{className:"flex items-center justify-between"},r.a.createElement(b.a,null,r.a.createElement(g.a,{control:r.a.createElement(p.a,{name:"remember",checked:W.remember,onChange:G}),label:"\u4fdd\u6301\u767b\u5165"})),r.a.createElement(C.a,{className:"font-medium",to:"/forgot-password"},"\u5fd8\u8a18\u5bc6\u78bc\uff1f")),r.a.createElement(i.a,{type:"submit",variant:"contained",color:"primary",className:"w-full mx-auto mt-16 rounded-full hover:shadow-xl","aria-label":"\u767b\u5165",disabled:!h,value:"legacy"},R?"\u767b\u5165\u4e2d":"\u767b\u5165",R&&r.a.createElement(S.a,{width:32,height:32}))),r.a.createElement("div",{className:"flex flex-col items-center justify-center pt-32 pb-24"},r.a.createElement("span",{className:"font-medium"},"\u5c1a\u672a\u64c1\u6709\u5e33\u865f\uff1f"),r.a.createElement(C.a,{className:"font-medium",to:"/register"},"\u5efa\u7acb\u5e33\u865f"))))))}}}]);