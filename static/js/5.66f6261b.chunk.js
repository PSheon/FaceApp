(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{707:function(e,t,n){"use strict";n.r(t);var a=n(299);n.d(t,"default",function(){return a.a})},774:function(e,t,n){"use strict";var a=n(362);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=i.default.memo(i.default.forwardRef(function(t,n){return i.default.createElement(s.default,(0,r.default)({ref:n},t),e)}));0;return n.muiName=s.default.muiName,n};var r=a(n(91)),i=a(n(0)),s=a(n(707))},784:function(e,t,n){"use strict";var a=n(362);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(0)),i=(0,a(n(774)).default)(r.default.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"}),"AccountCircle");t.default=i},785:function(e,t,n){"use strict";var a=n(362);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(0)),i=(0,a(n(774)).default)(r.default.createElement("path",{d:"M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"PersonAdd");t.default=i},786:function(e,t,n){"use strict";var a=n(362);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(0)),i=(0,a(n(774)).default)(r.default.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.default=i},787:function(e,t,n){"use strict";var a=n(362);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(0)),i=(0,a(n(774)).default)(r.default.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");t.default=i},788:function(module,exports,__webpack_require__){var factory;factory=function(__WEBPACK_EXTERNAL_MODULE_react__){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./src/react-webcam.tsx")}({"./src/react-webcam.tsx":function srcReactWebcamTsx(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __rest = (undefined && undefined.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === "function")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\n                t[p[i]] = s[p[i]];\n        }\n    return t;\n};\n\nfunction hasGetUserMedia() {\n    return !!((navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ||\n        navigator.webkitGetUserMedia ||\n        navigator.mozGetUserMedia ||\n        navigator.msGetUserMedia);\n}\nvar Webcam = /** @class */ (function (_super) {\n    __extends(Webcam, _super);\n    function Webcam(props) {\n        var _this = _super.call(this, props) || this;\n        _this.ctx = null;\n        _this.state = {\n            hasUserMedia: false\n        };\n        return _this;\n    }\n    Webcam.prototype.componentDidMount = function () {\n        if (!hasGetUserMedia())\n            return;\n        var state = this.state;\n        Webcam.mountedInstances.push(this);\n        if (!state.hasUserMedia && !Webcam.userMediaRequested) {\n            this.requestUserMedia();\n        }\n    };\n    Webcam.prototype.componentDidUpdate = function (nextProps) {\n        var props = this.props;\n        if (JSON.stringify(nextProps.audioConstraints) !==\n            JSON.stringify(props.audioConstraints) ||\n            JSON.stringify(nextProps.videoConstraints) !==\n                JSON.stringify(props.videoConstraints)) {\n            this.requestUserMedia();\n        }\n    };\n    Webcam.prototype.componentWillUnmount = function () {\n        var state = this.state;\n        var index = Webcam.mountedInstances.indexOf(this);\n        Webcam.mountedInstances.splice(index, 1);\n        Webcam.userMediaRequested = false;\n        if (Webcam.mountedInstances.length === 0 && state.hasUserMedia) {\n            if (this.stream.getVideoTracks && this.stream.getAudioTracks) {\n                this.stream.getVideoTracks().map(function (track) { return track.stop(); });\n                this.stream.getAudioTracks().map(function (track) { return track.stop(); });\n            }\n            else {\n                this.stream.stop();\n            }\n            if (state.src) {\n                window.URL.revokeObjectURL(state.src);\n            }\n        }\n    };\n    Webcam.prototype.getScreenshot = function () {\n        var _a = this, state = _a.state, props = _a.props;\n        if (!state.hasUserMedia)\n            return null;\n        var canvas = this.getCanvas();\n        return (canvas &&\n            canvas.toDataURL(props.screenshotFormat, props.screenshotQuality));\n    };\n    Webcam.prototype.getCanvas = function () {\n        var _a = this, state = _a.state, props = _a.props;\n        if (!this.video) {\n            return null;\n        }\n        if (!state.hasUserMedia || !this.video.videoHeight)\n            return null;\n        if (!this.ctx) {\n            var canvas_1 = document.createElement("canvas");\n            var aspectRatio = this.video.videoWidth / this.video.videoHeight;\n            var canvasWidth = props.minScreenshotWidth || this.video.clientWidth;\n            var canvasHeight = canvasWidth / aspectRatio;\n            if (props.minScreenshotHeight &&\n                canvasHeight < props.minScreenshotHeight) {\n                canvasHeight = props.minScreenshotHeight;\n                canvasWidth = canvasHeight * aspectRatio;\n            }\n            canvas_1.width = canvasWidth;\n            canvas_1.height = canvasHeight;\n            this.canvas = canvas_1;\n            this.ctx = canvas_1.getContext("2d");\n        }\n        var _b = this, ctx = _b.ctx, canvas = _b.canvas;\n        if (ctx) {\n            if (props.mirrored) {\n                ctx.translate(canvas.width, 0);\n                ctx.scale(-1, 1);\n            }\n            else {\n                ctx.translate(0, 0);\n                ctx.scale(1, 1);\n            }\n            ctx.imageSmoothingEnabled = props.imageSmoothing;\n            ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);\n        }\n        return canvas;\n    };\n    Webcam.prototype.requestUserMedia = function () {\n        var props = this.props;\n        navigator.getUserMedia =\n            navigator.mediaDevices.getUserMedia ||\n                navigator.webkitGetUserMedia ||\n                navigator.mozGetUserMedia ||\n                navigator.msGetUserMedia;\n        var sourceSelected = function (audioConstraints, videoConstraints) {\n            var constraints = {\n                video: typeof videoConstraints !== "undefined" ? videoConstraints : true\n            };\n            if (props.audio) {\n                constraints.audio =\n                    typeof audioConstraints !== "undefined" ? audioConstraints : true;\n            }\n            navigator.mediaDevices\n                .getUserMedia(constraints)\n                .then(function (stream) {\n                Webcam.mountedInstances.forEach(function (instance) {\n                    return instance.handleUserMedia(null, stream);\n                });\n            })\n                .catch(function (e) {\n                Webcam.mountedInstances.forEach(function (instance) {\n                    return instance.handleUserMedia(e);\n                });\n            });\n        };\n        if ("mediaDevices" in navigator) {\n            sourceSelected(props.audioConstraints, props.videoConstraints);\n        }\n        else {\n            var optionalSource_1 = function (id) { return ({ optional: [{ sourceId: id }] }); };\n            var constraintToSourceId_1 = function (constraint) {\n                var deviceId = constraint.deviceId;\n                if (typeof deviceId === "string") {\n                    return deviceId;\n                }\n                if (Array.isArray(deviceId) && deviceId.length > 0) {\n                    return deviceId[0];\n                }\n                if (typeof deviceId === "object" && deviceId.ideal) {\n                    return deviceId.ideal;\n                }\n                return null;\n            };\n            // @ts-ignore: deprecated api\n            MediaStreamTrack.getSources(function (sources) {\n                var audioSource = null;\n                var videoSource = null;\n                sources.forEach(function (source) {\n                    if (source.kind === "audio") {\n                        audioSource = source.id;\n                    }\n                    else if (source.kind === "video") {\n                        videoSource = source.id;\n                    }\n                });\n                var audioSourceId = constraintToSourceId_1(props.audioConstraints);\n                if (audioSourceId) {\n                    audioSource = audioSourceId;\n                }\n                var videoSourceId = constraintToSourceId_1(props.videoConstraints);\n                if (videoSourceId) {\n                    videoSource = videoSourceId;\n                }\n                sourceSelected(optionalSource_1(audioSource), optionalSource_1(videoSource));\n            });\n        }\n        Webcam.userMediaRequested = true;\n    };\n    Webcam.prototype.handleUserMedia = function (err, stream) {\n        var props = this.props;\n        if (err || !stream) {\n            this.setState({ hasUserMedia: false });\n            props.onUserMediaError(err);\n            return;\n        }\n        this.stream = stream;\n        try {\n            if (this.video) {\n                this.video.srcObject = stream;\n            }\n            this.setState({ hasUserMedia: true });\n        }\n        catch (error) {\n            this.setState({\n                hasUserMedia: true,\n                src: window.URL.createObjectURL(stream)\n            });\n        }\n        props.onUserMedia();\n    };\n    Webcam.prototype.render = function () {\n        var _this = this;\n        var _a = this, state = _a.state, props = _a.props;\n        var audio = props.audio, onUserMedia = props.onUserMedia, onUserMediaError = props.onUserMediaError, screenshotFormat = props.screenshotFormat, screenshotQuality = props.screenshotQuality, minScreenshotWidth = props.minScreenshotWidth, minScreenshotHeight = props.minScreenshotHeight, audioConstraints = props.audioConstraints, videoConstraints = props.videoConstraints, imageSmoothing = props.imageSmoothing, mirrored = props.mirrored, _b = props.style, style = _b === void 0 ? {} : _b, rest = __rest(props, ["audio", "onUserMedia", "onUserMediaError", "screenshotFormat", "screenshotQuality", "minScreenshotWidth", "minScreenshotHeight", "audioConstraints", "videoConstraints", "imageSmoothing", "mirrored", "style"]);\n        var videoStyle = mirrored ? __assign(__assign({}, style), { transform: (style.transform || "") + " scaleX(-1)" }) : style;\n        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("video", __assign({ autoPlay: true, src: state.src, muted: audio, playsInline: true, ref: function (ref) {\n                _this.video = ref;\n            }, style: videoStyle }, rest)));\n    };\n    Webcam.defaultProps = {\n        audio: true,\n        imageSmoothing: true,\n        mirrored: false,\n        onUserMedia: function () { },\n        onUserMediaError: function () { },\n        screenshotFormat: "image/webp",\n        screenshotQuality: 0.92,\n    };\n    Webcam.mountedInstances = [];\n    Webcam.userMediaRequested = false;\n    return Webcam;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));\n/* harmony default export */ __webpack_exports__["default"] = (Webcam);\n\n\n//# sourceURL=webpack://Webcam/./src/react-webcam.tsx?')},react:function react(module,exports){eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://Webcam/external_%7B%22root%22:%22React%22,%22commonjs2%22:%22react%22,%22commonjs%22:%22react%22,%22amd%22:%22react%22%7D?")}}).default},module.exports=factory(__webpack_require__(0))},805:function(e,t,n){"use strict";n.r(t);var a=n(62),r=n.n(a),i=n(89),s=n(24),o=n(0),c=n.n(o),u=n(119),l=n(738),d=n(33),m=n(10),M=n(7),p=n(3),L=n(360),f=n(757),h=n(2),j=n(6),b=(n(5),n(8)),w=n(11),g=c.a.forwardRef(function(e,t){var n=e.badgeContent,a=e.children,r=e.classes,i=e.className,s=e.color,o=void 0===s?"default":s,u=e.component,l=void 0===u?"span":u,d=e.invisible,m=e.max,M=void 0===m?99:m,L=e.showZero,f=void 0!==L&&L,b=e.variant,g=void 0===b?"standard":b,v=Object(j.a)(e,["badgeContent","children","classes","className","color","component","invisible","max","showZero","variant"]),y=d;null==d&&(0===n&&!f||null==n&&"dot"!==g)&&(y=!0);var x="";return"dot"!==g&&(x=n>M?"".concat(M,"+"):n),c.a.createElement(l,Object(h.a)({className:Object(p.a)(r.root,i),ref:t},v),a,c.a.createElement("span",{className:Object(p.a)(r.badge,"default"!==o&&r["color".concat(Object(w.a)(o))],y&&r.invisible,{dot:r.dot}[g])},x))}),v=Object(b.a)(function(e){return{root:{position:"relative",display:"inline-flex",verticalAlign:"middle"},badge:{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",alignItems:"center",position:"absolute",top:0,right:0,boxSizing:"border-box",fontFamily:e.typography.fontFamily,fontWeight:e.typography.fontWeightMedium,fontSize:e.typography.pxToRem(12),minWidth:20,padding:"0 4px",height:20,borderRadius:10,backgroundColor:e.palette.color,color:e.palette.textColor,zIndex:1,transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.enteringScreen})},colorPrimary:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText},colorSecondary:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText},colorError:{backgroundColor:e.palette.error.main,color:e.palette.error.contrastText},invisible:{transition:e.transitions.create("transform",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.leavingScreen}),transform:"scale(0) translate(50%, -50%)",transformOrigin:"100% 0%"},dot:{height:6,minWidth:6,padding:0}}},{name:"MuiBadge"})(g),y=n(761),x=n(759),I=n(742),O=n(756),E=n(694),_=n(743),N=n(85),S=c.a.forwardRef(function(e,t){var n=e.classes,a=e.className,r=Object(j.a)(e,["classes","className"]),i=c.a.useContext(N.a);return c.a.createElement("div",Object(h.a)({className:Object(p.a)(n.root,a,"flex-start"===i.alignItems&&n.alignItemsFlexStart),ref:t},r))}),T=Object(b.a)({root:{minWidth:56,flexShrink:0},alignItemsFlexStart:{marginTop:8}},{name:"MuiListItemAvatar"})(S),D=n(688),C=n(765),z=n(764),k=n(692),W=n(695),U=n(786),A=n.n(U),Y=n(787),P=n.n(Y),R=n(784),B=n.n(R),H=n(785),G=n.n(H),Q=n(12),J=n(60),F=n(127),Z=c.a.forwardRef(function(e,t){return c.a.createElement(k.a,Object.assign({direction:"up",ref:t},e))}),X=Object(L.a)(function(e){return{root:{position:"absolute",right:10,bottom:20,zIndex:1,transition:"all .5s ease-in-out","&:hover":{transform:"translate(-10px, -10px)"}},modal:{display:"flex",alignItems:"center",justifyContent:"center"},paper:{backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}}});var q=function(e){var t=e.getScreenShot,n=Object(M.b)(),a=X(),u=Object(o.useState)(null),l=Object(s.a)(u,2),L=l[0],h=l[1],j=Object(o.useState)(null),b=Object(s.a)(j,2),w=b[0],g=b[1],N=Object(o.useState)(""),S=Object(s.a)(N,2),k=S[0],U=S[1],Y=Object(o.useState)([]),R=Object(s.a)(Y,2),H=R[0],q=R[1],V=Object(o.useState)(!1),K=Object(s.a)(V,2),$=K[0],ee=K[1],te=Object(o.useState)(!1),ne=Object(s.a)(te,2),ae=ne[0],re=ne[1],ie=Object(o.useState)(!1),se=Object(s.a)(ie,2),oe=se[0],ce=se[1],ue=Object(o.useState)(!1),le=Object(s.a)(ue,2),de=le[0],me=le[1],Me=function(){var e=Object(i.a)(r.a.mark(function e(){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t();case 2:n=e.sent,g(n),me(!0);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),pe=function(){g(null),h(null),me(!1)},Le=Object(o.useCallback)(function(){var e=Object(i.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return ee(!0),e.next=3,Object(J.c)(t,160).then(function(e){re(!0),ee(!1),q(e),console.log(e)}).catch(function(e){console.log("err, ",e)});case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),[]);return Object(o.useEffect)(function(){F.a.hasDescriptor()&&h(F.a.getDescriptor())},[]),c.a.createElement("div",{className:Object(p.a)(a.root,"flex flex-col opacity-25 hover:opacity-100")},c.a.createElement(W.a,{onClick:function(){ce(!0)},className:"text-white w-64 h-64","aria-label":"\u8fa8\u8b58\u81c9\u90e8"},c.a.createElement(O.a,{title:"\u8cb4\u8cd3\u540d\u55ae","aria-label":"\u8cb4\u8cd3\u540d\u55ae",placement:"left"},c.a.createElement(v,{badgeContent:L?Object.keys(L).length:0,color:"primary"},c.a.createElement(B.a,null)))),c.a.createElement(W.a,{onClick:Me,className:"text-white w-64 h-64","aria-label":"\u65b0\u589e\u8cb4\u8cd3"},c.a.createElement(O.a,{title:"\u65b0\u589e\u8cb4\u8cd3","aria-label":"\u65b0\u589e\u8cb4\u8cd3",placement:"left"},c.a.createElement(G.a,null))),c.a.createElement(W.a,{onClick:function(){F.a.removeDescriptor(),n(Q.p({message:"\u5df2\u522a\u9664\u8cb4\u8cd3\u8cc7\u8a0a"}))},className:"text-white w-64 h-64","aria-label":"\u522a\u9664\u8fa8\u8b58\u8cc7\u6599"},c.a.createElement(O.a,{title:"\u522a\u9664\u8cb4\u8cd3\u8cc7\u6599","aria-label":"\u522a\u9664\u8cb4\u8cd3\u8cc7\u6599",placement:"left"},c.a.createElement(A.a,null))),c.a.createElement(x.a,{open:oe,TransitionComponent:Z,keepMounted:!0,onClose:function(){ce(!1)},"aria-labelledby":"alert-dialog-slide-title","aria-describedby":"alert-dialog-slide-description"},c.a.createElement(z.a,{id:"alert-dialog-slide-title"},"\u5df2\u8fa8\u8b58\u7684\u8cb4\u8cd3\u540d\u55ae"),c.a.createElement(C.a,null,c.a.createElement(I.a,{dense:!0},!!L&&Object.entries(L).map(function(e){return c.a.createElement(E.a,{className:"rounded-32 my-12 sm:w-360",key:"list-".concat(e[0])},c.a.createElement(T,null,c.a.createElement(D.a,null,c.a.createElement(B.a,null))),c.a.createElement(_.a,{primary:e[0],className:"h2 text-grey"}))})))),c.a.createElement(x.a,{open:de,TransitionComponent:Z,keepMounted:!0,onClose:pe,"aria-labelledby":"alert-dialog-slide-title","aria-describedby":"alert-dialog-slide-description"},c.a.createElement(z.a,{id:"alert-dialog-slide-title"},"\u65b0\u589e\u8cb4\u8cd3"),c.a.createElement(C.a,null,w&&c.a.createElement(c.a.Fragment,null,c.a.createElement("img",{className:"rounded-12",src:w,alt:"\u87a2\u5e55\u64f7\u53d6"}),ae?H.length?c.a.createElement("div",{className:"flex flex-col justify-center items-center"},c.a.createElement(f.a,{className:"mt-16 mb-32 rounded-12",id:"outlined-basic",label:"\u8cb4\u8cd3\u59d3\u540d",value:k,onChange:function(e){return U(e.target.value)},variant:"outlined"}),c.a.createElement(y.a,{variant:"contained",color:"primary",size:"large",disabled:""===k||!!Object.entries(L).find(function(e){return e[0].toLowerCase()===k.toLowerCase()}),onClick:function(){return function(e,t){var a=F.a.getDescriptor(),r=JSON.stringify(Object(m.a)({},a,Object(d.a)({},e,{name:e,descriptors:[Array.from(t[0].descriptor)]})));F.a.setDescriptor(r),n(Q.p({message:"\u5df2\u65b0\u589e\u8cb4\u8cd3\u8cc7\u8a0a"})),me(!1)}(k,H)}},"\u52a0\u5165\u8cb4\u8cd3",c.a.createElement(B.a,null))):c.a.createElement("div",{className:"flex flex-col justify-center items-center"},c.a.createElement(y.a,{variant:"contained",color:"primary",size:"large",onClick:pe},c.a.createElement(P.a,null),"\u91cd\u65b0\u62cd\u651d")):c.a.createElement("div",{className:"flex justify-center items-center"},c.a.createElement(y.a,{variant:"contained",color:"primary",size:"large",onClick:pe},c.a.createElement(P.a,null),"\u91cd\u65b0\u62cd\u651d"),c.a.createElement(y.a,{variant:"contained",color:"primary",size:"large",className:"",onClick:function(){return Le(w)},disabled:$},$?"\u8a13\u7df4\u5716\u7247\u4e2d...":"\u8a13\u7df4\u5716\u7247",c.a.createElement(B.a,null)))))))},V=n(788),K=n.n(V),$=n(257),ee=Object(L.a)(function(e){return{scanBar:{backgroundColor:"#3182ce",position:"relative",borderRadius:"32rem",height:"5px",animation:"$scan 1s infinite"},"@keyframes scan":{"0%":{opacity:.8,transform:"translateY(0)"},"50%":{opacity:1,transform:"translateY(12.8rem)"},"100%":{opacity:.8,transform:"translateY(0)"}}}}),te=function(e){var t=ee();return c.a.createElement("div",e,c.a.createElement("img",{className:"absolute",src:"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMzE4MmNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGQ9Ik05Mi43LDY4LjhjLTEuMiwwLTIuMiwxLTIuMiwyLjJ2OS4yYzAsNS43LTQuNiwxMC4zLTEwLjMsMTAuM2gtMTBjLTEuMiwwLTIuMiwxLTIuMiwyLjJzMSwyLjIsMi4yLDIuMmgxMCAgIGM4LjEsMCwxNC43LTYuNiwxNC43LTE0LjdWNzFDOTQuOSw2OS44LDkzLjksNjguOCw5Mi43LDY4Ljh6Ij48L3BhdGg+PHBhdGggZD0iTTgwLjIsNS4xaC0xMGMtMS4yLDAtMi4yLDEtMi4yLDIuMnMxLDIuMiwyLjIsMi4yaDEwYzUuNywwLDEwLjMsNC42LDEwLjMsMTAuM3YxMC43YzAsMS4yLDEsMi4yLDIuMiwyLjJzMi4yLTEsMi4yLTIuMiAgIFYxOS44Qzk0LjksMTEuNyw4OC4zLDUuMSw4MC4yLDUuMXoiPjwvcGF0aD48cGF0aCBkPSJNNjguOSw0OC45YzEuNSwwLDIuNy0xLjIsMi44LTIuN1YzOWMwLTEuNi0xLjItMi44LTIuOC0yLjhjLTEuNiwwLTIuOCwxLjMtMi44LDIuOHY3LjFDNjYuMSw0Ny43LDY3LjQsNDguOSw2OC45LDQ4Ljl6Ij48L3BhdGg+PHBhdGggZD0iTTYzLjcsNjguM2MtMy42LDMuNi04LjQsNS42LTEzLjMsNS42aC0wLjhjLTUsMC05LjctMi0xMy4zLTUuNmMtMC44LTAuOS0yLjItMC45LTMuMSwwYy0wLjksMC44LTAuOSwyLjIsMCwzLjEgICBjNC41LDQuNSwxMC4zLDYuOSwxNi40LDYuOWgwLjhjNi4xLDAsMTItMi40LDE2LjQtNi45YzAuOS0wLjgsMC45LTIuMiwwLTMuMUM2Niw2Ny40LDY0LjYsNjcuNCw2My43LDY4LjN6Ij48L3BhdGg+PHBhdGggZD0iTTQ0LjUsNjIuMkg0NWM0LjUsMCw4LjEtMy42LDguMS04VjM5YzAtMS4yLTEtMi4yLTIuMi0yLjJzLTIuMiwxLTIuMiwyLjJ2MTUuMWMwLDIuMS0xLjcsMy43LTMuNywzLjdoLTAuNSAgIGMtMS4yLDAtMi4yLDEtMi4yLDIuMlM0My4zLDYyLjIsNDQuNSw2Mi4yeiI+PC9wYXRoPjxwYXRoIGQ9Ik0yOS43LDM2LjJjLTEuNiwwLTIuOCwxLjMtMi44LDIuOHY3LjFjMCwxLjYsMS4zLDIuOCwyLjgsMi44YzEuNiwwLDIuOC0xLjIsMi44LTIuN1YzOUMzMi41LDM3LjQsMzEuMiwzNi4yLDI5LjcsMzYuMnoiPjwvcGF0aD48cGF0aCBkPSJNNy4zLDMyLjdjMS4yLDAsMi4yLTEsMi4yLTIuMlYxOS44YzAtNS43LDQuNi0xMC4zLDEwLjMtMTAuM2gxMGMxLjIsMCwyLjItMSwyLjItMi4ycy0xLTIuMi0yLjItMi4yaC0xMCAgIGMtOC4xLDAtMTQuNyw2LjYtMTQuNywxNC43djEwLjdDNS4xLDMxLjcsNi4xLDMyLjcsNy4zLDMyLjd6Ij48L3BhdGg+PHBhdGggZD0iTTI5LjcsOTAuNWgtMTBjLTUuNywwLTEwLjMtNC42LTEwLjMtMTAuM1Y3MWMwLTEuMi0xLTIuMi0yLjItMi4yUzUsNjkuOCw1LDcxdjkuMmMwLDguMSw2LjYsMTQuNywxNC43LDE0LjdoMTAgICBjMS4zLDAsMi4yLTEsMi4yLTIuMlMzMC45LDkwLjUsMjkuNyw5MC41eiI+PC9wYXRoPjwvZz48L3N2Zz4=",alt:"face logo"}),c.a.createElement("div",{className:t.scanBar}))},ne=Object(L.a)(function(e){return{faceLogo:{position:"relative",width:"12.8rem",height:"12.8rem",marginBottom:"3.2rem",zIndex:1},hintFrame:{position:"absolute",height:"80vh",width:"50vw",transform:"translate(25vw, 10vh)","& .topLeft":{width:"15%",height:"15%",position:"absolute",top:0,left:0,borderTopLeftRadius:"15%",borderTop:"15px solid #3182ce",borderLeft:"15px solid #3182ce"},"& .topRight":{width:"15%",height:"15%",position:"absolute",top:0,right:0,borderTopRightRadius:"15%",borderTop:"15px solid #3182ce",borderRight:"15px solid #3182ce"},"& .bottomLeft":{width:"15%",height:"15%",position:"absolute",bottom:0,left:0,borderBottomLeftRadius:"15%",borderBottom:"15px solid #3182ce",borderLeft:"15px solid #3182ce"},"& .bottomRight":{width:"15%",height:"15%",position:"absolute",bottom:0,right:0,borderBottomRightRadius:"15%",borderBottom:"15px solid #3182ce",borderRight:"15px solid #3182ce"}},faceFrame:{"& .topLeft":{width:"5%",height:"5%",position:"absolute",top:0,left:0,borderTopLeftRadius:"15%",borderTop:"10px solid #3182ce",borderLeft:"10px solid #3182ce"},"& .topRight":{width:"5%",height:"5%",position:"absolute",top:0,right:0,borderTopRightRadius:"15%",borderTop:"10px solid #3182ce",borderRight:"10px solid #3182ce"},"& .bottomLeft":{width:"5%",height:"5%",position:"absolute",bottom:0,left:0,borderBottomLeftRadius:"15%",borderBottom:"10px solid #3182ce",borderLeft:"10px solid #3182ce"},"& .bottomRight":{width:"5%",height:"5%",position:"absolute",bottom:0,right:0,borderBottomRightRadius:"15%",borderBottom:"10px solid #3182ce",borderRight:"10px solid #3182ce"}}}}),ae=160;t.default=function(){var e=Object(o.useRef)(null),t=function(){var e="object"===typeof window;function t(){return{width:e?window.innerWidth:void 0,height:e?window.innerHeight:void 0}}var n=Object(o.useState)(t),a=Object(s.a)(n,2),r=a[0],i=a[1];return Object(o.useEffect)(function(){if(!e)return!1;function n(){i(t())}return window.addEventListener("resize",n),function(){return window.removeEventListener("resize",n)}},[]),r}(),n=ne(),a=Object(l.a)("(min-width: 600px)"),d=t.width,m=t.height,M=Object(o.useState)(!0),p=Object(s.a)(M,2),L=p[0],f=p[1],h=Object(o.useState)(!1),j=Object(s.a)(h,2),b=j[0],w=j[1],g=Object(o.useState)(!1),v=Object(s.a)(g,2),y=v[0],x=v[1],I=Object(o.useState)(null),O=Object(s.a)(I,2),E=O[0],_=O[1],N=Object(o.useState)(null),S=Object(s.a)(N,2),T=S[0],D=S[1],C=Object(o.useState)(null),z=Object(s.a)(C,2),k=z[0],W=z[1],U=Object(o.useState)(null),A=Object(s.a)(U,2),Y=A[0],P=A[1],R=Object(o.useState)(null),B=Object(s.a)(R,2),H=B[0],G=B[1],Q=null;H&&(Q={width:d,height:m,facingMode:H});var Z=null;E&&(Z=E.map(function(e,t){var a=e.box.height,r=e.box.width,i=e.box._x,s=e.box._y;return c.a.createElement("div",{key:t,className:"absolute top-0 left-0"},Y&&Y[t]?c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:n.faceFrame,style:{height:a,width:r,transform:"translate(".concat(i,"px,").concat(s,"px)")}},c.a.createElement("div",{className:"topLeft"}),c.a.createElement("div",{className:"topRight"}),c.a.createElement("div",{className:"bottomLeft"}),c.a.createElement("div",{className:"bottomRight"})),c.a.createElement("div",{className:"flex justify-center items-center relative w-128 absolute",style:{transform:"translate(".concat(i-.3*r,"px, ").concat(s-a,"px)")}},c.a.createElement(u.a,{variant:"h3",className:"h1 text-center bg-blue-300 min-h-64 w-128 text-white leading-loose rounded-8"},Y[t]._label)),c.a.createElement("div",{className:"flex justify-center items-center relative w-200 absolute",style:{transform:"translate(".concat(i+r,"px, ").concat(s-a-64,"px)")}},c.a.createElement(u.a,{variant:"h3",className:"h1 text-center bg-blue-300 min-h-64 w-128 text-white leading-loose rounded-8"},"\u9019\u908a\u53ef\u4ee5\u986f\u793a\u8cb4\u8cd3\u4ecb\u7d39(\u6216\u5716\u7247)"))):null)}));var X=function(){var t=Object(i.a)(r.a.mark(function t(){var n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.current.getScreenshot();case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),V=Object(o.useCallback)(Object(i.a)(r.a.mark(function t(){var n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.current){t.next=11;break}return t.next=3,Object(J.c)(e.current.getScreenshot(),ae).then(function(e){e?(x(!0),_(e.map(function(e){return e.detection})),D(e.map(function(e){return e.descriptor}))):x(!1)});case 3:if(!T||!k){t.next=10;break}return t.next=6,T.map(function(e){return k.findBestMatch(e)});case 6:n=t.sent,P(n),t.next=11;break;case 10:x(!1);case 11:case"end":return t.stop()}},t)})),[T,k]),ee=Object(o.useCallback)(function(){navigator.mediaDevices.enumerateDevices().then(function(){var e=Object(i.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.filter(function(e){return"videoinput"===e.kind});case 2:if(!(e.sent.length<2)){e.next=8;break}return e.next=6,G("user");case 6:e.next=10;break;case 8:return e.next=10,G({exact:"environment"});case 10:w(!0);case 11:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())},[]);return Object(o.useEffect)(function(){function e(){return(e=Object(i.a)(r.a.mark(function e(){var t,n,a,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(J.d)();case 2:if(!F.a.hasDescriptor()){e.next=10;break}return t=F.a.getDescriptor(),e.next=6,Object(J.b)(t);case 6:n=e.sent,W(n),e.next=15;break;case 10:return a=F.a.getInitDescriptor(),e.next=13,Object(J.b)(a);case 13:i=e.sent,W(i);case 15:ee(),f(!1);case 17:case"end":return e.stop()}},e)}))).apply(this,arguments)}H||function(){e.apply(this,arguments)}()},[H,L,ee]),function(e,t){var n=Object(o.useRef)();Object(o.useEffect)(function(){n.current=e},[e]),Object(o.useEffect)(function(){if(null!==t){var e=setInterval(function(){n.current()},t);return function(){return clearInterval(e)}}},[t])}(Object(i.a)(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!b){e.next=3;break}return e.next=3,V();case 3:case"end":return e.stop()}},e)})),500),a?c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"Camera flex flex-col justify-center items-center",style:{width:d,height:m}},L&&c.a.createElement("div",{className:"w-full h-640 absolute flex flex-col justify-center items-center z-10"},c.a.createElement(u.a,{variant:"h6",className:"text-gray-600"},"\u8f09\u5165\u6a21\u578b\u4e2d"),c.a.createElement($.a,{width:"128",height:"128"})),Q&&!y?c.a.createElement("div",{className:"w-full h-full absolute flex flex-col justify-center items-center z-10 bottom-0"},c.a.createElement(te,{className:n.faceLogo}),c.a.createElement(u.a,{variant:"h6",className:"text-white flex justify-center"},c.a.createElement("span",null,"\u5c0b\u627e\u8cb4\u8cd3 "),c.a.createElement($.a,{width:32,height:32}))):null,Q?c.a.createElement(K.a,{mirrored:!0,audio:!1,width:d,height:m,ref:e,screenshotFormat:"image/jpeg",videoConstraints:Q}):null,Z||null),c.a.createElement("div",{className:n.hintFrame},c.a.createElement("div",{className:"topLeft"}),c.a.createElement("div",{className:"topRight"}),c.a.createElement("div",{className:"bottomLeft"}),c.a.createElement("div",{className:"bottomRight"})),Q&&!y?null:c.a.createElement(q,{getScreenShot:X})):c.a.createElement("div",{className:"flex flex-col justify-center items-center bg-blue-300 absolute h-full w-full"},c.a.createElement("img",{className:"w-128 h-128 mb-32",src:"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMzE4MmNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGQ9Ik05Mi43LDY4LjhjLTEuMiwwLTIuMiwxLTIuMiwyLjJ2OS4yYzAsNS43LTQuNiwxMC4zLTEwLjMsMTAuM2gtMTBjLTEuMiwwLTIuMiwxLTIuMiwyLjJzMSwyLjIsMi4yLDIuMmgxMCAgIGM4LjEsMCwxNC43LTYuNiwxNC43LTE0LjdWNzFDOTQuOSw2OS44LDkzLjksNjguOCw5Mi43LDY4Ljh6Ij48L3BhdGg+PHBhdGggZD0iTTgwLjIsNS4xaC0xMGMtMS4yLDAtMi4yLDEtMi4yLDIuMnMxLDIuMiwyLjIsMi4yaDEwYzUuNywwLDEwLjMsNC42LDEwLjMsMTAuM3YxMC43YzAsMS4yLDEsMi4yLDIuMiwyLjJzMi4yLTEsMi4yLTIuMiAgIFYxOS44Qzk0LjksMTEuNyw4OC4zLDUuMSw4MC4yLDUuMXoiPjwvcGF0aD48cGF0aCBkPSJNNjguOSw0OC45YzEuNSwwLDIuNy0xLjIsMi44LTIuN1YzOWMwLTEuNi0xLjItMi44LTIuOC0yLjhjLTEuNiwwLTIuOCwxLjMtMi44LDIuOHY3LjFDNjYuMSw0Ny43LDY3LjQsNDguOSw2OC45LDQ4Ljl6Ij48L3BhdGg+PHBhdGggZD0iTTYzLjcsNjguM2MtMy42LDMuNi04LjQsNS42LTEzLjMsNS42aC0wLjhjLTUsMC05LjctMi0xMy4zLTUuNmMtMC44LTAuOS0yLjItMC45LTMuMSwwYy0wLjksMC44LTAuOSwyLjIsMCwzLjEgICBjNC41LDQuNSwxMC4zLDYuOSwxNi40LDYuOWgwLjhjNi4xLDAsMTItMi40LDE2LjQtNi45YzAuOS0wLjgsMC45LTIuMiwwLTMuMUM2Niw2Ny40LDY0LjYsNjcuNCw2My43LDY4LjN6Ij48L3BhdGg+PHBhdGggZD0iTTQ0LjUsNjIuMkg0NWM0LjUsMCw4LjEtMy42LDguMS04VjM5YzAtMS4yLTEtMi4yLTIuMi0yLjJzLTIuMiwxLTIuMiwyLjJ2MTUuMWMwLDIuMS0xLjcsMy43LTMuNywzLjdoLTAuNSAgIGMtMS4yLDAtMi4yLDEtMi4yLDIuMlM0My4zLDYyLjIsNDQuNSw2Mi4yeiI+PC9wYXRoPjxwYXRoIGQ9Ik0yOS43LDM2LjJjLTEuNiwwLTIuOCwxLjMtMi44LDIuOHY3LjFjMCwxLjYsMS4zLDIuOCwyLjgsMi44YzEuNiwwLDIuOC0xLjIsMi44LTIuN1YzOUMzMi41LDM3LjQsMzEuMiwzNi4yLDI5LjcsMzYuMnoiPjwvcGF0aD48cGF0aCBkPSJNNy4zLDMyLjdjMS4yLDAsMi4yLTEsMi4yLTIuMlYxOS44YzAtNS43LDQuNi0xMC4zLDEwLjMtMTAuM2gxMGMxLjIsMCwyLjItMSwyLjItMi4ycy0xLTIuMi0yLjItMi4yaC0xMCAgIGMtOC4xLDAtMTQuNyw2LjYtMTQuNywxNC43djEwLjdDNS4xLDMxLjcsNi4xLDMyLjcsNy4zLDMyLjd6Ij48L3BhdGg+PHBhdGggZD0iTTI5LjcsOTAuNWgtMTBjLTUuNywwLTEwLjMtNC42LTEwLjMtMTAuM1Y3MWMwLTEuMi0xLTIuMi0yLjItMi4yUzUsNjkuOCw1LDcxdjkuMmMwLDguMSw2LjYsMTQuNywxNC43LDE0LjdoMTAgICBjMS4zLDAsMi4yLTEsMi4yLTIuMlMzMC45LDkwLjUsMjkuNyw5MC41eiI+PC9wYXRoPjwvZz48L3N2Zz4=",alt:"face logo"}),c.a.createElement(u.a,{variant:"h6",className:"h3 text-white text-center"},"\u6b64 APP \u4e0d\u652f\u63f4\u60a8\u7684\u88dd\u7f6e\uff0c\u8acb\u4f7f\u7528\u500b\u4eba\u96fb\u8166\u518d\u6b21\u958b\u555f"))}}}]);