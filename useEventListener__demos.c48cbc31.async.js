(self.webpackChunkjmi_hooks=self.webpackChunkjmi_hooks||[]).push([[792],{36371:function(g,l,e){"use strict";e.r(l);var s=e(48305),o=e.n(s),r=e(50959),n=e(31515),_=e(17898),f=e(11527),u=function(){var j=(0,r.useRef)(null),i=(0,_.C)(),a=o()(i,2),m=a[0],c=a[1];return(0,r.useEffect)(function(){var t;return(t=j.current)===null||t===void 0||t.addEventListener("click",c),function(){var E;(E=j.current)===null||E===void 0||E.removeEventListener("click",c)}},[]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(n.g,{ref:j}),m]})};l.default=u},45260:function(g,l,e){"use strict";e.r(l);var s=e(48305),o=e.n(s),r=e(50959),n=e(31515),_=e(17898),f=e(11527),u=function(i,a){var m=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},c=m.targetRef,t=c===void 0?{}:c,E=(0,r.useRef)(a);E.current=a;var d=function(O){return E.current(O)};(0,r.useEffect)(function(){var h="current"in t?t.current:window;return h==null||h.addEventListener(i,d),function(){h==null||h.removeEventListener(i,d)}},[])},v=function(){var i=(0,_.C)(),a=o()(i,2),m=a[0],c=a[1],t=(0,r.useRef)(null);return u("click",c,{targetRef:t}),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(n.g,{ref:t}),m]})};l.default=v},45886:function(g,l,e){"use strict";e.r(l);var s=e(48305),o=e.n(s),r=e(50959),n=e(36330),_=e(31515),f=e(17898),u=e(11527),v=function(){var i=(0,f.C)(),a=o()(i,2),m=a[0],c=a[1],t=(0,r.useRef)(null),E=(0,r.useRef)(null),d=(0,r.useState)(t),h=o()(d,2),O=h[0],P=h[1];return(0,n.O)("click",c,{target:O}),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{style:{display:"flex"},children:[(0,u.jsx)(_.g,{ref:t,showText:O===t}),(0,u.jsx)(_.g,{ref:E,style:{backgroundColor:"#f60"},showText:O===E})]}),m,(0,u.jsx)("div",{children:(0,u.jsx)("button",{onClick:function(){P(O===t?E:t)},children:"\u5207\u6362 target \u5BF9\u8C61"})})]})};l.default=v},31515:function(g,l,e){"use strict";e.d(l,{g:function(){return j}});var s=e(26068),o=e.n(s),r=e(67825),n=e.n(r),_=e(50959),f=e(11527),u=["style","showText","children"],v=_.forwardRef(function(i,a){console.log("Block \u6E32\u67D3");var m=i.style,c=m===void 0?{}:m,t=i.showText,E=t===void 0?!0:t,d=i.children,h=d===void 0?"\u9F20\u6807\u70B9\u51FB":d,O=n()(i,u);return(0,f.jsx)("div",o()(o()({ref:a,id:""},O),{},{style:o()({width:"100px",height:"100px",backgroundColor:"#db7171",display:"flex",alignItems:"center",justifyContent:"center",color:"#FFF"},c),children:E?h:null}))}),j=_.memo(v)},17898:function(g,l,e){"use strict";e.d(l,{C:function(){return _}});var s=e(48305),o=e.n(s),r=e(50959),n=e(11527),_=function(){var u=(0,r.useState)(0),v=o()(u,2),j=v[0],i=v[1],a=function(){alert("number: ".concat(j))},m=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{children:(0,n.jsxs)("span",{children:["Number\uFF1A",j]})}),(0,n.jsx)("button",{type:"button",onClick:function(){i(function(t){return t+1})},children:"+1"})]});return[m,a]}},11368:function(g,l,e){"use strict";e.d(l,{J:function(){return _}});var s=e(50959),o=e(5895),r=e(8718),n=function(u){var v=function(i,a){var m=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],c=(0,s.useRef)(!1),t=(0,s.useRef)([]),E=(0,s.useRef)([]),d=(0,s.useRef)();u(function(){var h=Array.isArray(m)?m:[m],O=h.map(function(b){return(0,r.v)(b)}).filter(Boolean);if(!c.current){c.current=!0,t.current=O,E.current=a,d.current=i();return}if(!(0,o.Z)(O,t.current)||!(0,o.Z)(a,E.current)){var P;(P=d.current)===null||P===void 0||P.call(d),t.current=O,E.current=a,d.current=i()}}),(0,s.useEffect)(function(){return function(){var h;(h=d.current)===null||h===void 0||h.call(d),c.current=!1}},[])};return v},_=n(s.useEffect)},36330:function(g,l,e){"use strict";e.d(l,{O:function(){return n},b:function(){return _}});var s=e(50959),o=e(11368),r=e(8718),n=function(u,v){var j=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=j.target,a=i===void 0?window:i,m=(0,s.useRef)(v);m.current=v;var c=function(E){return m.current(E)};(0,o.J)(function(){var t=(0,r.v)(a);return t==null||t.addEventListener(u,c),function(){t==null||t.removeEventListener(u,c)}},[u],a)},_=function(u){var v=u.eventName,j=u.fn,i=j===void 0?function(){}:j,a=u.options,m=a===void 0?{}:a,c=m.target,t=(0,s.useRef)(i);t.current=i;var E=function(h){return t.current(h)};(0,o.J)(function(){var d=(0,r.v)(c);return d==null||d.addEventListener(v,E),function(){d==null||d.removeEventListener(v,E)}},[v],c)}},5895:function(g,l,e){"use strict";e.d(l,{Z:function(){return s}});var s=function(r,n){if(r.length!==n.length)return!1;if(r===n)return!0;for(var _=0;_<r.length;_++)if(!Object.is(r[_],n[_]))return!1;return!0}},8718:function(g,l,e){"use strict";e.d(l,{v:function(){return o}});var s=!!(typeof window!="undefined"&&window.document&&window.document.createElement),o=function(n){if(s){if(!n)return null;var _;return"current"in n?_=n.current:typeof n=="function"?_=n():_=n,_}}},67825:function(g,l,e){var s=e(64382);function o(r,n){if(r==null)return{};var _=s(r,n),f,u;if(Object.getOwnPropertySymbols){var v=Object.getOwnPropertySymbols(r);for(u=0;u<v.length;u++)f=v[u],!(n.indexOf(f)>=0)&&Object.prototype.propertyIsEnumerable.call(r,f)&&(_[f]=r[f])}return _}g.exports=o,g.exports.__esModule=!0,g.exports.default=g.exports},64382:function(g){function l(e,s){if(e==null)return{};var o={},r=Object.keys(e),n,_;for(_=0;_<r.length;_++)n=r[_],!(s.indexOf(n)>=0)&&(o[n]=e[n]);return o}g.exports=l,g.exports.__esModule=!0,g.exports.default=g.exports}}]);
