const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HRDashboard-DySU_TpJ.js","assets/OnLeaveTodayWidget-C2_sBF-y.js","assets/ManagerDashboard-BSIziHEl.js","assets/TLDashboard-DAhlxsLx.js","assets/MDDashboard-B38-EiHa.js"])))=>i.map(i=>d[i]);
var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,a)=>(a=n==null?{}:e(i(n)),c(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var ee=Array.isArray;function S(){}var C={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function w(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ne(e,t){return w(e.type,t,e.props)}function re(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ie(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ae=/\/+/g;function T(e,t){return typeof e==`object`&&e&&e.key!=null?ie(``+e.key):t.toString(36)}function oe(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(S,S):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function E(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,E(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+T(e,0):a,ee(o)?(i=``,c!=null&&(i=c.replace(ae,`$&/`)+`/`),E(o,r,i,``,function(e){return e})):o!=null&&(re(o)&&(o=ne(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ae,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(ee(e))for(var u=0;u<e.length;u++)a=e[u],s=l+T(a,u),c+=E(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+T(a,u++),c+=E(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return E(oe(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function D(e,t,n){if(e==null)return e;var r=[],i=0;return E(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function se(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var O=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},k={map:D,forEach:function(e,t,n){D(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return D(e,function(){t++}),t},toArray:function(e){return D(e,function(e){return e})||[]},only:function(e){if(!re(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=k,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=C,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return C.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!te.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return w(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)te.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return w(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=re,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:se}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=C.T,n={};C.T=n;try{var r=e(),i=C.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(S,O)}catch(e){O(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),C.T=t}},e.unstable_useCacheRefresh=function(){return C.H.useCacheRefresh()},e.use=function(e){return C.H.use(e)},e.useActionState=function(e,t,n){return C.H.useActionState(e,t,n)},e.useCallback=function(e,t){return C.H.useCallback(e,t)},e.useContext=function(e){return C.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return C.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return C.H.useEffect(e,t)},e.useEffectEvent=function(e){return C.H.useEffectEvent(e)},e.useId=function(){return C.H.useId()},e.useImperativeHandle=function(e,t,n){return C.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return C.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return C.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return C.H.useMemo(e,t)},e.useOptimistic=function(e,t){return C.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return C.H.useReducer(e,t,n)},e.useRef=function(e){return C.H.useRef(e)},e.useState=function(e){return C.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return C.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return C.H.useTransition()},e.version=`19.2.7`})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,ee||(ee=!0,re());else{var t=n(l);t!==null&&T(x,t.startTime-e)}}var ee=!1,S=-1,C=5,te=-1;function w(){return g?!0:!(e.unstable_now()-te<C)}function ne(){if(g=!1,ee){var t=e.unstable_now();te=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(S),S=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&w());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&T(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?re():ee=!1}}}var re;if(typeof y==`function`)re=function(){y(ne)};else if(typeof MessageChannel<`u`){var ie=new MessageChannel,ae=ie.port2;ie.port1.onmessage=ne,re=function(){ae.postMessage(null)}}else re=function(){_(ne,0)};function T(t,n){S=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):C=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(S),S=-1):h=!0,T(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,ee||(ee=!0,re()))),r},e.unstable_shouldYield=w,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),h=o(((e,t)=>{t.exports=m()})),g=o((e=>{var t=p();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.7`})),_=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=o((e=>{var t=h(),n=p(),r=_();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function d(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=d(e),t!==null)return t;e=e.sibling}return null}var f=Object.assign,m=Symbol.for(`react.element`),g=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),ee=Symbol.for(`react.consumer`),S=Symbol.for(`react.context`),C=Symbol.for(`react.forward_ref`),te=Symbol.for(`react.suspense`),w=Symbol.for(`react.suspense_list`),ne=Symbol.for(`react.memo`),re=Symbol.for(`react.lazy`),ie=Symbol.for(`react.activity`),ae=Symbol.for(`react.memo_cache_sentinel`),T=Symbol.iterator;function oe(e){return typeof e!=`object`||!e?null:(e=T&&e[T]||e[`@@iterator`],typeof e==`function`?e:null)}var E=Symbol.for(`react.client.reference`);function D(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===E?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case te:return`Suspense`;case w:return`SuspenseList`;case ie:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case S:return e.displayName||`Context`;case ee:return(e._context.displayName||`Context`)+`.Consumer`;case C:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ne:return t=e.displayName||null,t===null?D(e.type)||`Memo`:t;case re:t=e._payload,e=e._init;try{return D(e(t))}catch{}}return null}var se=Array.isArray,O=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,A={pending:!1,data:null,method:null,action:null},ce=[],le=-1;function ue(e){return{current:e}}function de(e){0>le||(e.current=ce[le],ce[le]=null,le--)}function j(e,t){le++,ce[le]=e.current,e.current=t}var fe=ue(null),pe=ue(null),me=ue(null),he=ue(null);function ge(e,t){switch(j(me,t),j(pe,e),j(fe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}de(fe),j(fe,e)}function _e(){de(fe),de(pe),de(me)}function ve(e){e.memoizedState!==null&&j(he,e);var t=fe.current,n=Hd(t,e.type);t!==n&&(j(pe,e),j(fe,n))}function ye(e){pe.current===e&&(de(fe),de(pe)),he.current===e&&(de(he),Qf._currentValue=A)}var be,xe;function Se(e){if(be===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);be=t&&t[1]||``,xe=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+be+e+xe}var Ce=!1;function we(e,t){if(!e||Ce)return``;Ce=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ce=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Se(n):``}function Te(e,t){switch(e.tag){case 26:case 27:case 5:return Se(e.type);case 16:return Se(`Lazy`);case 13:return e.child!==t&&t!==null?Se(`Suspense Fallback`):Se(`Suspense`);case 19:return Se(`SuspenseList`);case 0:case 15:return we(e.type,!1);case 11:return we(e.type.render,!1);case 1:return we(e.type,!0);case 31:return Se(`Activity`);default:return``}}function Ee(e){try{var t=``,n=null;do t+=Te(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var De=Object.prototype.hasOwnProperty,Oe=t.unstable_scheduleCallback,ke=t.unstable_cancelCallback,Ae=t.unstable_shouldYield,je=t.unstable_requestPaint,Me=t.unstable_now,Ne=t.unstable_getCurrentPriorityLevel,Pe=t.unstable_ImmediatePriority,Fe=t.unstable_UserBlockingPriority,Ie=t.unstable_NormalPriority,Le=t.unstable_LowPriority,Re=t.unstable_IdlePriority,ze=t.log,Be=t.unstable_setDisableYieldValue,Ve=null,He=null;function Ue(e){if(typeof ze==`function`&&Be(e),He&&typeof He.setStrictMode==`function`)try{He.setStrictMode(Ve,e)}catch{}}var We=Math.clz32?Math.clz32:qe,Ge=Math.log,Ke=Math.LN2;function qe(e){return e>>>=0,e===0?32:31-(Ge(e)/Ke|0)|0}var Je=256,Ye=262144,Xe=4194304;function Ze(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Qe(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Ze(n))):i=Ze(o):i=Ze(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Ze(n))):i=Ze(o)):i=Ze(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function $e(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function et(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tt(){var e=Xe;return Xe<<=1,!(Xe&62914560)&&(Xe=4194304),e}function nt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function rt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function it(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-We(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&at(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function at(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-We(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ot(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-We(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function st(e,t){var n=t&-t;return n=n&42?1:ct(n),(n&(e.suspendedLanes|t))===0?n:0}function ct(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function lt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function ut(){var e=k.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function dt(e,t){var n=k.p;try{return k.p=e,t()}finally{k.p=n}}var ft=Math.random().toString(36).slice(2),pt=`__reactFiber$`+ft,mt=`__reactProps$`+ft,ht=`__reactContainer$`+ft,gt=`__reactEvents$`+ft,_t=`__reactListeners$`+ft,vt=`__reactHandles$`+ft,yt=`__reactResources$`+ft,bt=`__reactMarker$`+ft;function xt(e){delete e[pt],delete e[mt],delete e[gt],delete e[_t],delete e[vt]}function St(e){var t=e[pt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ht]||n[pt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[pt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function Ct(e){if(e=e[pt]||e[ht]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function wt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Tt(e){var t=e[yt];return t||=e[yt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Et(e){e[bt]=!0}var Dt=new Set,Ot={};function kt(e,t){At(e,t),At(e+`Capture`,t)}function At(e,t){for(Ot[e]=t,e=0;e<t.length;e++)Dt.add(t[e])}var jt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Mt={},Nt={};function Pt(e){return De.call(Nt,e)?!0:De.call(Mt,e)?!1:jt.test(e)?Nt[e]=!0:(Mt[e]=!0,!1)}function Ft(e,t,n){if(Pt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function It(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Lt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Rt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function zt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Bt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Vt(e){if(!e._valueTracker){var t=zt(e)?`checked`:`value`;e._valueTracker=Bt(e,t,``+e[t])}}function Ht(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=zt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Ut(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Wt=/[\n"\\]/g;function Gt(e){return e.replace(Wt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Kt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Rt(t)):e.value!==``+Rt(t)&&(e.value=``+Rt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Jt(e,o,Rt(n)):Jt(e,o,Rt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Rt(s):e.removeAttribute(`name`)}function qt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Vt(e);return}n=n==null?``:``+Rt(n),t=t==null?n:``+Rt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Vt(e)}function Jt(e,t,n){t===`number`&&Ut(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function M(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Rt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Yt(e,t,n){if(t!=null&&(t=``+Rt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Rt(n)}function Xt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(se(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Rt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Vt(e)}function Zt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Qt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function $t(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Qt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function en(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&$t(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&$t(e,o,t[o])}function tn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var nn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),rn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function an(e){return rn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function on(){}var sn=null;function cn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ln=null,un=null;function dn(e){var t=Ct(e);if(t&&(e=t.stateNode)){var n=e[mt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Kt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Gt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[mt]||null;if(!a)throw Error(i(90));Kt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Ht(r)}break a;case`textarea`:Yt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&M(e,!!n.multiple,t,!1)}}}var fn=!1;function pn(e,t,n){if(fn)return e(t,n);fn=!0;try{return e(t)}finally{if(fn=!1,(ln!==null||un!==null)&&(bu(),ln&&(t=ln,e=un,un=ln=null,dn(t),e)))for(t=0;t<e.length;t++)dn(e[t])}}function mn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[mt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var hn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),gn=!1;if(hn)try{var _n={};Object.defineProperty(_n,"passive",{get:function(){gn=!0}}),window.addEventListener(`test`,_n,_n),window.removeEventListener(`test`,_n,_n)}catch{gn=!1}var vn=null,yn=null,bn=null;function xn(){if(bn)return bn;var e,t=yn,n=t.length,r,i=`value`in vn?vn.value:vn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return bn=i.slice(e,1<r?1-r:void 0)}function Sn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Cn(){return!0}function wn(){return!1}function Tn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Cn:wn,this.isPropagationStopped=wn,this}return f(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Cn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Cn)},persist:function(){},isPersistent:Cn}),t}var En={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Dn=Tn(En),On=f({},En,{view:0,detail:0}),kn=Tn(On),An,jn,Mn,Nn=f({},On,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Mn&&(Mn&&e.type===`mousemove`?(An=e.screenX-Mn.screenX,jn=e.screenY-Mn.screenY):jn=An=0,Mn=e),An)},movementY:function(e){return`movementY`in e?e.movementY:jn}}),Pn=Tn(Nn),Fn=Tn(f({},Nn,{dataTransfer:0})),In=Tn(f({},On,{relatedTarget:0})),Ln=Tn(f({},En,{animationName:0,elapsedTime:0,pseudoElement:0})),Rn=Tn(f({},En,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),zn=Tn(f({},En,{data:0})),N={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},P={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Bn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Vn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Bn[e])?!!t[e]:!1}function Hn(){return Vn}var Un=Tn(f({},On,{key:function(e){if(e.key){var t=N[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Sn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?P[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hn,charCode:function(e){return e.type===`keypress`?Sn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Sn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Wn=Tn(f({},Nn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Gn=Tn(f({},On,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hn})),Kn=Tn(f({},En,{propertyName:0,elapsedTime:0,pseudoElement:0})),qn=Tn(f({},Nn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Jn=Tn(f({},En,{newState:0,oldState:0})),Yn=[9,13,27,32],Xn=hn&&`CompositionEvent`in window,Zn=null;hn&&`documentMode`in document&&(Zn=document.documentMode);var Qn=hn&&`TextEvent`in window&&!Zn,$n=hn&&(!Xn||Zn&&8<Zn&&11>=Zn),er=` `,tr=!1;function nr(e,t){switch(e){case`keyup`:return Yn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function rr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var ir=!1;function ar(e,t){switch(e){case`compositionend`:return rr(t);case`keypress`:return t.which===32?(tr=!0,er):null;case`textInput`:return e=t.data,e===er&&tr?null:e;default:return null}}function or(e,t){if(ir)return e===`compositionend`||!Xn&&nr(e,t)?(e=xn(),bn=yn=vn=null,ir=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return $n&&t.locale!==`ko`?null:t.data;default:return null}}var sr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function cr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!sr[e.type]:t===`textarea`}function lr(e,t,n,r){ln?un?un.push(r):un=[r]:ln=r,t=Ed(t,`onChange`),0<t.length&&(n=new Dn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var ur=null,dr=null;function fr(e){yd(e,0)}function pr(e){if(Ht(wt(e)))return e}function mr(e,t){if(e===`change`)return t}var hr=!1;if(hn){var gr;if(hn){var _r=`oninput`in document;if(!_r){var vr=document.createElement(`div`);vr.setAttribute(`oninput`,`return;`),_r=typeof vr.oninput==`function`}gr=_r}else gr=!1;hr=gr&&(!document.documentMode||9<document.documentMode)}function yr(){ur&&(ur.detachEvent(`onpropertychange`,br),dr=ur=null)}function br(e){if(e.propertyName===`value`&&pr(dr)){var t=[];lr(t,dr,e,cn(e)),pn(fr,t)}}function xr(e,t,n){e===`focusin`?(yr(),ur=t,dr=n,ur.attachEvent(`onpropertychange`,br)):e===`focusout`&&yr()}function Sr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return pr(dr)}function Cr(e,t){if(e===`click`)return pr(t)}function wr(e,t){if(e===`input`||e===`change`)return pr(t)}function Tr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Er=typeof Object.is==`function`?Object.is:Tr;function Dr(e,t){if(Er(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!De.call(t,i)||!Er(e[i],t[i]))return!1}return!0}function Or(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function kr(e,t){var n=Or(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Or(n)}}function Ar(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ar(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function jr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ut(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ut(e.document)}return t}function Mr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Nr=hn&&`documentMode`in document&&11>=document.documentMode,Pr=null,Fr=null,Ir=null,Lr=!1;function Rr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Lr||Pr==null||Pr!==Ut(r)||(r=Pr,`selectionStart`in r&&Mr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ir&&Dr(Ir,r)||(Ir=r,r=Ed(Fr,`onSelect`),0<r.length&&(t=new Dn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Pr)))}function zr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Br={animationend:zr(`Animation`,`AnimationEnd`),animationiteration:zr(`Animation`,`AnimationIteration`),animationstart:zr(`Animation`,`AnimationStart`),transitionrun:zr(`Transition`,`TransitionRun`),transitionstart:zr(`Transition`,`TransitionStart`),transitioncancel:zr(`Transition`,`TransitionCancel`),transitionend:zr(`Transition`,`TransitionEnd`)},Vr={},Hr={};hn&&(Hr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Br.animationend.animation,delete Br.animationiteration.animation,delete Br.animationstart.animation),`TransitionEvent`in window||delete Br.transitionend.transition);function Ur(e){if(Vr[e])return Vr[e];if(!Br[e])return e;var t=Br[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Hr)return Vr[e]=t[n];return e}var Wr=Ur(`animationend`),Gr=Ur(`animationiteration`),Kr=Ur(`animationstart`),qr=Ur(`transitionrun`),Jr=Ur(`transitionstart`),Yr=Ur(`transitioncancel`),Xr=Ur(`transitionend`),Zr=new Map,Qr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Qr.push(`scrollEnd`);function $r(e,t){Zr.set(e,t),kt(t,[e])}var ei=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ti=[],ni=0,ri=0;function ii(){for(var e=ni,t=ri=ni=0;t<e;){var n=ti[t];ti[t++]=null;var r=ti[t];ti[t++]=null;var i=ti[t];ti[t++]=null;var a=ti[t];if(ti[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ci(n,i,a)}}function ai(e,t,n,r){ti[ni++]=e,ti[ni++]=t,ti[ni++]=n,ti[ni++]=r,ri|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function oi(e,t,n,r){return ai(e,t,n,r),li(e)}function si(e,t){return ai(e,null,null,t),li(e)}function ci(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-We(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function li(e){if(50<du)throw du=0,fu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ui={};function di(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function fi(e,t,n,r){return new di(e,t,n,r)}function pi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function mi(e,t){var n=e.alternate;return n===null?(n=fi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function hi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function gi(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)pi(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,fe.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case ie:return e=fi(31,n,t,a),e.elementType=ie,e.lanes=o,e;case y:return _i(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=fi(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case te:return e=fi(13,n,t,a),e.elementType=te,e.lanes=o,e;case w:return e=fi(19,n,t,a),e.elementType=w,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case S:s=10;break a;case ee:s=9;break a;case C:s=11;break a;case ne:s=14;break a;case re:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=fi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function _i(e,t,n,r){return e=fi(7,e,r,t),e.lanes=n,e}function F(e,t,n){return e=fi(6,e,null,t),e.lanes=n,e}function vi(e){var t=fi(18,null,null,0);return t.stateNode=e,t}function yi(e,t,n){return t=fi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var bi=new WeakMap;function xi(e,t){if(typeof e==`object`&&e){var n=bi.get(e);return n===void 0?(t={value:e,source:t,stack:Ee(t)},bi.set(e,t),t):n}return{value:e,source:t,stack:Ee(t)}}var Si=[],Ci=0,wi=null,Ti=0,Ei=[],Di=0,Oi=null,ki=1,Ai=``;function ji(e,t){Si[Ci++]=Ti,Si[Ci++]=wi,wi=e,Ti=t}function Mi(e,t,n){Ei[Di++]=ki,Ei[Di++]=Ai,Ei[Di++]=Oi,Oi=e;var r=ki;e=Ai;var i=32-We(r)-1;r&=~(1<<i),n+=1;var a=32-We(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,ki=1<<32-We(t)+i|n<<i|r,Ai=a+e}else ki=1<<a|n<<i|r,Ai=e}function Ni(e){e.return!==null&&(ji(e,1),Mi(e,1,0))}function Pi(e){for(;e===wi;)wi=Si[--Ci],Si[Ci]=null,Ti=Si[--Ci],Si[Ci]=null;for(;e===Oi;)Oi=Ei[--Di],Ei[Di]=null,Ai=Ei[--Di],Ei[Di]=null,ki=Ei[--Di],Ei[Di]=null}function Fi(e,t){Ei[Di++]=ki,Ei[Di++]=Ai,Ei[Di++]=Oi,ki=t.id,Ai=t.overflow,Oi=e}var Ii=null,I=null,L=!1,R=null,Li=!1,Ri=Error(i(519));function zi(e){throw Gi(xi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Ri}function Bi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[pt]=e,t[mt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),qt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),Xt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=on),t=!0):t=!1,t||zi(e,!0)}function Vi(e){for(Ii=e.return;Ii;)switch(Ii.tag){case 5:case 31:case 13:Li=!1;return;case 27:case 3:Li=!0;return;default:Ii=Ii.return}}function Hi(e){if(e!==Ii)return!1;if(!L)return Vi(e),L=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&I&&zi(e),Vi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));I=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));I=uf(e)}else t===27?(t=I,Zd(e.type)?(e=lf,lf=null,I=e):I=t):I=Ii?cf(e.stateNode.nextSibling):null;return!0}function Ui(){I=Ii=null,L=!1}function Wi(){var e=R;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),R=null),e}function Gi(e){R===null?R=[e]:R.push(e)}var Ki=ue(null),qi=null,Ji=null;function Yi(e,t,n){j(Ki,t._currentValue),t._currentValue=n}function Xi(e){e._currentValue=Ki.current,de(Ki)}function Zi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Qi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Zi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Zi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function $i(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Er(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===he.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&Qi(t,e,n,r),t.flags|=262144}function ea(e){for(e=e.firstContext;e!==null;){if(!Er(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ta(e){qi=e,Ji=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function na(e){return ia(qi,e)}function ra(e,t){return qi===null&&ta(e),ia(e,t)}function ia(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Ji===null){if(e===null)throw Error(i(308));Ji=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ji=Ji.next=t;return n}var aa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},oa=t.unstable_scheduleCallback,sa=t.unstable_NormalPriority,ca={$$typeof:S,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function la(){return{controller:new aa,data:new Map,refCount:0}}function ua(e){e.refCount--,e.refCount===0&&oa(sa,function(){e.controller.abort()})}var da=null,fa=0,pa=0,ma=null;function ha(e,t){if(da===null){var n=da=[];fa=0,pa=dd(),ma={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return fa++,t.then(ga,ga),t}function ga(){if(--fa===0&&da!==null){ma!==null&&(ma.status=`fulfilled`);var e=da;da=null,pa=0,ma=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function _a(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var va=O.S;O.S=function(e,t){eu=Me(),typeof t==`object`&&t&&typeof t.then==`function`&&ha(e,t),va!==null&&va(e,t)};var ya=ue(null);function ba(){var e=ya.current;return e===null?q.pooledCache:e}function xa(e,t){t===null?j(ya,ya.current):j(ya,t.pool)}function Sa(){var e=ba();return e===null?null:{parent:ca._currentValue,pool:e}}var Ca=Error(i(460)),wa=Error(i(474)),Ta=Error(i(542)),Ea={then:function(){}};function Da(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Oa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(on,on),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ma(e),e;default:if(typeof t.status==`string`)t.then(on,on);else{if(e=q,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ma(e),e}throw Aa=t,Ca}}function ka(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Aa=e,Ca):e}}var Aa=null;function ja(){if(Aa===null)throw Error(i(459));var e=Aa;return Aa=null,e}function Ma(e){if(e===Ca||e===Ta)throw Error(i(483))}var Na=null,Pa=0;function Fa(e){var t=Pa;return Pa+=1,Na===null&&(Na=[]),Oa(Na,e,t)}function Ia(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function La(e,t){throw t.$$typeof===m?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Ra(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=mi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=F(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===re&&ka(i)===t.type)?(t=a(t,n.props),Ia(t,n),t.return=e,t):(t=gi(n.type,n.key,n.props,null,e.mode,r),Ia(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=yi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=_i(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=F(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case g:return n=gi(t.type,t.key,t.props,null,e.mode,n),Ia(n,t),n.return=e,n;case v:return t=yi(t,e.mode,n),t.return=e,t;case re:return t=ka(t),f(e,t,n)}if(se(t)||oe(t))return t=_i(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Fa(t),n);if(t.$$typeof===S)return f(e,ra(e,t),n);La(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case g:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case re:return n=ka(n),p(e,t,n,r)}if(se(n)||oe(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Fa(n),r);if(n.$$typeof===S)return p(e,t,ra(e,n),r);La(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case g:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case re:return r=ka(r),m(e,t,n,r,i)}if(se(r)||oe(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Fa(r),i);if(r.$$typeof===S)return m(e,t,n,ra(t,r),i);La(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),L&&ji(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return L&&ji(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),L&&ji(i,h),l}function _(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),L&&ji(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return L&&ji(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),L&&ji(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case g:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===re&&ka(l)===r.type){n(e,r.sibling),c=a(r,o.props),Ia(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=_i(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=gi(o.type,o.key,o.props,null,e.mode,c),Ia(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=yi(o,e.mode,c),c.return=e,e=c}return s(e);case re:return o=ka(o),b(e,r,o,c)}if(se(o))return h(e,r,o,c);if(oe(o)){if(l=oe(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),_(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Fa(o),c);if(o.$$typeof===S)return b(e,r,ra(e,o),c);La(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=F(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Pa=0;var i=b(e,t,n,r);return Na=null,i}catch(t){if(t===Ca||t===Ta)throw t;var a=fi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var za=Ra(!0),Ba=Ra(!1),Va=!1;function Ha(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ua(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Wa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ga(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,K&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=li(e),ci(e,null,n),t}return ai(e,r,t,n),li(e)}function Ka(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ot(e,n)}}function qa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ja=!1;function Ya(){if(Ja){var e=ma;if(e!==null)throw e}}function Xa(e,t,n,r){Ja=!1;var i=e.updateQueue;Va=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var p=s.lane&-536870913,m=p!==s.lane;if(m?(Y&p)===p:(r&p)===p){p!==0&&p===pa&&(Ja=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;p=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,p);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,p=typeof h==`function`?h.call(_,d,p):h,p==null)break a;d=f({},d,p);break a;case 2:Va=!0}}p=s.callback,p!==null&&(e.flags|=64,m&&(e.flags|=8192),m=i.callbacks,m===null?i.callbacks=[p]:m.push(p))}else m={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=m,c=d):u=u.next=m,o|=p;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;m=s,s=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function Za(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Qa(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Za(n[e],t)}var $a=ue(null),eo=ue(0);function to(e,t){e=Ul,j(eo,e),j($a,t),Ul=e|t.baseLanes}function no(){j(eo,Ul),j($a,$a.current)}function ro(){Ul=eo.current,de($a),de(eo)}var io=ue(null),ao=null;function oo(e){var t=e.alternate;j(z,z.current&1),j(io,e),ao===null&&(t===null||$a.current!==null||t.memoizedState!==null)&&(ao=e)}function so(e){j(z,z.current),j(io,e),ao===null&&(ao=e)}function co(e){e.tag===22?(j(z,z.current),j(io,e),ao===null&&(ao=e)):lo(e)}function lo(){j(z,z.current),j(io,io.current)}function uo(e){de(io),ao===e&&(ao=null),de(z)}var z=ue(0);function fo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var po=0,B=null,V=null,H=null,mo=!1,ho=!1,go=!1,_o=0,vo=0,U=null,W=0;function yo(){throw Error(i(321))}function bo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Er(e[n],t[n]))return!1;return!0}function xo(e,t,n,r,i,a){return po=a,B=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,O.H=e===null||e.memoizedState===null?Rs:zs,go=!1,a=n(r,i),go=!1,ho&&(a=Co(t,n,r,i)),So(e),a}function So(e){O.H=Ls;var t=V!==null&&V.next!==null;if(po=0,H=V=B=null,mo=!1,vo=0,U=null,t)throw Error(i(300));e===null||nc||(e=e.dependencies,e!==null&&ea(e)&&(nc=!0))}function Co(e,t,n,r){B=e;var a=0;do{if(ho&&(U=null),vo=0,ho=!1,25<=a)throw Error(i(301));if(a+=1,H=V=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}O.H=Bs,o=t(n,r)}while(ho);return o}function wo(){var e=O.H,t=e.useState()[0];return t=typeof t.then==`function`?jo(t):t,e=e.useState()[0],(V===null?null:V.memoizedState)!==e&&(B.flags|=1024),t}function To(){var e=_o!==0;return _o=0,e}function Eo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Do(e){if(mo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}mo=!1}po=0,H=V=B=null,ho=!1,vo=_o=0,U=null}function Oo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return H===null?B.memoizedState=H=e:H=H.next=e,H}function ko(){if(V===null){var e=B.alternate;e=e===null?null:e.memoizedState}else e=V.next;var t=H===null?B.memoizedState:H.next;if(t!==null)H=t,V=e;else{if(e===null)throw B.alternate===null?Error(i(467)):Error(i(310));V=e,e={memoizedState:V.memoizedState,baseState:V.baseState,baseQueue:V.baseQueue,queue:V.queue,next:null},H===null?B.memoizedState=H=e:H=H.next=e}return H}function Ao(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function jo(e){var t=vo;return vo+=1,U===null&&(U=[]),e=Oa(U,e,t),t=B,(H===null?t.memoizedState:H.next)===null&&(t=t.alternate,O.H=t===null||t.memoizedState===null?Rs:zs),e}function Mo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return jo(e);if(e.$$typeof===S)return na(e)}throw Error(i(438,String(e)))}function No(e){var t=null,n=B.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=B.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Ao(),B.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ae;return t.index++,n}function Po(e,t){return typeof t==`function`?t(e):t}function Fo(e){return Io(ko(),V,e)}function Io(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(po&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===pa&&(d=!0);else if((po&p)===p){u=u.next,p===pa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,B.lanes|=p,Gl|=p;f=u.action,go&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,B.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Er(o,e.memoizedState)&&(nc=!0,d&&(n=ma,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Lo(e){var t=ko(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Er(o,t.memoizedState)||(nc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Ro(e,t,n){var r=B,a=ko(),o=L;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Er((V||a).memoizedState,n);if(s&&(a.memoizedState=n,nc=!0),a=a.queue,ls(Vo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||H!==null&&H.memoizedState.tag&1){if(r.flags|=2048,is(9,{destroy:void 0},Bo.bind(null,r,a,n,t),null),q===null)throw Error(i(349));o||po&127||zo(r,t,n)}return n}function zo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=B.updateQueue,t===null?(t=Ao(),B.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Bo(e,t,n,r){t.value=n,t.getSnapshot=r,Ho(t)&&Uo(e)}function Vo(e,t,n){return n(function(){Ho(t)&&Uo(e)})}function Ho(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Er(e,n)}catch{return!0}}function Uo(e){var t=si(e,2);t!==null&&hu(t,e,2)}function Wo(e){var t=Oo();if(typeof e==`function`){var n=e;if(e=n(),go){Ue(!0);try{n()}finally{Ue(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Po,lastRenderedState:e},t}function Go(e,t,n,r){return e.baseState=n,Io(e,V,typeof r==`function`?r:Po)}function Ko(e,t,n,r,a){if(Ps(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};O.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,qo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function qo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=O.T,o={};O.T=o;try{var s=n(i,r),c=O.S;c!==null&&c(o,s),Jo(e,t,s)}catch(n){Xo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),O.T=a}}else try{a=n(i,r),Jo(e,t,a)}catch(n){Xo(e,t,n)}}function Jo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Yo(e,t,n)},function(n){return Xo(e,t,n)}):Yo(e,t,n)}function Yo(e,t,n){t.status=`fulfilled`,t.value=n,Zo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,qo(e,n)))}function Xo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Zo(t),t=t.next;while(t!==r)}e.action=null}function Zo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Qo(e,t){return t}function $o(e,t){if(L){var n=q.formState;if(n!==null){a:{var r=B;if(L){if(I){b:{for(var i=I,a=Li;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){I=cf(i.nextSibling),r=i.data===`F!`;break a}}zi(r)}r=!1}r&&(t=n[0])}}return n=Oo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qo,lastRenderedState:t},n.queue=r,n=js.bind(null,B,r),r.dispatch=n,r=Wo(!1),a=Ns.bind(null,B,!1,r.queue),r=Oo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Ko.bind(null,B,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function es(e){return ts(ko(),V,e)}function ts(e,t,n){if(t=Io(e,t,Qo)[0],e=Fo(Po)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=jo(t)}catch(e){throw e===Ca?Ta:e}else r=t;t=ko();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(B.flags|=2048,is(9,{destroy:void 0},ns.bind(null,i,n),null)),[r,a,e]}function ns(e,t){e.action=t}function rs(e){var t=ko(),n=V;if(n!==null)return ts(t,n,e);ko(),t=t.memoizedState,n=ko();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function is(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=B.updateQueue,t===null&&(t=Ao(),B.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function as(){return ko().memoizedState}function os(e,t,n,r){var i=Oo();B.flags|=e,i.memoizedState=is(1|t,{destroy:void 0},n,r===void 0?null:r)}function ss(e,t,n,r){var i=ko();r=r===void 0?null:r;var a=i.memoizedState.inst;V!==null&&r!==null&&bo(r,V.memoizedState.deps)?i.memoizedState=is(t,a,n,r):(B.flags|=e,i.memoizedState=is(1|t,a,n,r))}function cs(e,t){os(8390656,8,e,t)}function ls(e,t){ss(2048,8,e,t)}function us(e){B.flags|=4;var t=B.updateQueue;if(t===null)t=Ao(),B.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function ds(e){var t=ko().memoizedState;return us({ref:t,nextImpl:e}),function(){if(K&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function fs(e,t){return ss(4,2,e,t)}function ps(e,t){return ss(4,4,e,t)}function ms(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function hs(e,t,n){n=n==null?null:n.concat([e]),ss(4,4,ms.bind(null,t,e),n)}function gs(){}function _s(e,t){var n=ko();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&bo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function vs(e,t){var n=ko();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&bo(t,r[1]))return r[0];if(r=e(),go){Ue(!0);try{e()}finally{Ue(!1)}}return n.memoizedState=[r,t],r}function ys(e,t,n){return n===void 0||po&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),B.lanes|=e,Gl|=e,n)}function bs(e,t,n,r){return Er(n,t)?n:$a.current===null?!(po&42)||po&1073741824&&!(Y&261930)?(nc=!0,e.memoizedState=n):(e=mu(),B.lanes|=e,Gl|=e,t):(e=ys(e,n,r),Er(e,t)||(nc=!0),e)}function xs(e,t,n,r,i){var a=k.p;k.p=a!==0&&8>a?a:8;var o=O.T,s={};O.T=s,Ns(e,!1,t,n);try{var c=i(),l=O.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Ms(e,t,_a(c,r),pu(e)):Ms(e,t,r,pu(e))}catch(n){Ms(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{k.p=a,o!==null&&s.types!==null&&(o.types=s.types),O.T=o}}function Ss(){}function Cs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=ws(e).queue;xs(e,a,t,A,n===null?Ss:function(){return Ts(e),n(r)})}function ws(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:A,baseState:A,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Po,lastRenderedState:A},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Po,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Ts(e){var t=ws(e);t.next===null&&(t=e.alternate.memoizedState),Ms(e,t.next.queue,{},pu())}function Es(){return na(Qf)}function Ds(){return ko().memoizedState}function Os(){return ko().memoizedState}function ks(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Wa(n);var r=Ga(t,e,n);r!==null&&(hu(r,t,n),Ka(r,t,n)),t={cache:la()},e.payload=t;return}t=t.return}}function As(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ps(e)?Fs(t,n):(n=oi(e,t,n,r),n!==null&&(hu(n,e,r),Is(n,t,r)))}function js(e,t,n){Ms(e,t,n,pu())}function Ms(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ps(e))Fs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Er(s,o))return ai(e,t,i,0),q===null&&ii(),!1}catch{}if(n=oi(e,t,i,r),n!==null)return hu(n,e,r),Is(n,t,r),!0}return!1}function Ns(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ps(e)){if(t)throw Error(i(479))}else t=oi(e,n,r,2),t!==null&&hu(t,e,2)}function Ps(e){var t=e.alternate;return e===B||t!==null&&t===B}function Fs(e,t){ho=mo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Is(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ot(e,n)}}var Ls={readContext:na,use:Mo,useCallback:yo,useContext:yo,useEffect:yo,useImperativeHandle:yo,useLayoutEffect:yo,useInsertionEffect:yo,useMemo:yo,useReducer:yo,useRef:yo,useState:yo,useDebugValue:yo,useDeferredValue:yo,useTransition:yo,useSyncExternalStore:yo,useId:yo,useHostTransitionStatus:yo,useFormState:yo,useActionState:yo,useOptimistic:yo,useMemoCache:yo,useCacheRefresh:yo};Ls.useEffectEvent=yo;var Rs={readContext:na,use:Mo,useCallback:function(e,t){return Oo().memoizedState=[e,t===void 0?null:t],e},useContext:na,useEffect:cs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),os(4194308,4,ms.bind(null,t,e),n)},useLayoutEffect:function(e,t){return os(4194308,4,e,t)},useInsertionEffect:function(e,t){os(4,2,e,t)},useMemo:function(e,t){var n=Oo();t=t===void 0?null:t;var r=e();if(go){Ue(!0);try{e()}finally{Ue(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Oo();if(n!==void 0){var i=n(t);if(go){Ue(!0);try{n(t)}finally{Ue(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=As.bind(null,B,e),[r.memoizedState,e]},useRef:function(e){var t=Oo();return e={current:e},t.memoizedState=e},useState:function(e){e=Wo(e);var t=e.queue,n=js.bind(null,B,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:gs,useDeferredValue:function(e,t){return ys(Oo(),e,t)},useTransition:function(){var e=Wo(!1);return e=xs.bind(null,B,e.queue,!0,!1),Oo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=B,a=Oo();if(L){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),q===null)throw Error(i(349));Y&127||zo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,cs(Vo.bind(null,r,o,e),[e]),r.flags|=2048,is(9,{destroy:void 0},Bo.bind(null,r,o,n,t),null),n},useId:function(){var e=Oo(),t=q.identifierPrefix;if(L){var n=Ai,r=ki;n=(r&~(1<<32-We(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=_o++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=W++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Es,useFormState:$o,useActionState:$o,useOptimistic:function(e){var t=Oo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ns.bind(null,B,!0,n),n.dispatch=t,[e,t]},useMemoCache:No,useCacheRefresh:function(){return Oo().memoizedState=ks.bind(null,B)},useEffectEvent:function(e){var t=Oo(),n={impl:e};return t.memoizedState=n,function(){if(K&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},zs={readContext:na,use:Mo,useCallback:_s,useContext:na,useEffect:ls,useImperativeHandle:hs,useInsertionEffect:fs,useLayoutEffect:ps,useMemo:vs,useReducer:Fo,useRef:as,useState:function(){return Fo(Po)},useDebugValue:gs,useDeferredValue:function(e,t){return bs(ko(),V.memoizedState,e,t)},useTransition:function(){var e=Fo(Po)[0],t=ko().memoizedState;return[typeof e==`boolean`?e:jo(e),t]},useSyncExternalStore:Ro,useId:Ds,useHostTransitionStatus:Es,useFormState:es,useActionState:es,useOptimistic:function(e,t){return Go(ko(),V,e,t)},useMemoCache:No,useCacheRefresh:Os};zs.useEffectEvent=ds;var Bs={readContext:na,use:Mo,useCallback:_s,useContext:na,useEffect:ls,useImperativeHandle:hs,useInsertionEffect:fs,useLayoutEffect:ps,useMemo:vs,useReducer:Lo,useRef:as,useState:function(){return Lo(Po)},useDebugValue:gs,useDeferredValue:function(e,t){var n=ko();return V===null?ys(n,e,t):bs(n,V.memoizedState,e,t)},useTransition:function(){var e=Lo(Po)[0],t=ko().memoizedState;return[typeof e==`boolean`?e:jo(e),t]},useSyncExternalStore:Ro,useId:Ds,useHostTransitionStatus:Es,useFormState:rs,useActionState:rs,useOptimistic:function(e,t){var n=ko();return V===null?(n.baseState=e,[e,n.queue.dispatch]):Go(n,V,e,t)},useMemoCache:No,useCacheRefresh:Os};Bs.useEffectEvent=ds;function Vs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:f({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Hs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Wa(r);i.payload=t,n!=null&&(i.callback=n),t=Ga(e,i,r),t!==null&&(hu(t,e,r),Ka(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Wa(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ga(e,i,r),t!==null&&(hu(t,e,r),Ka(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Wa(n);r.tag=2,t!=null&&(r.callback=t),t=Ga(e,r,n),t!==null&&(hu(t,e,n),Ka(t,e,n))}};function Us(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Dr(n,r)||!Dr(i,a):!0}function Ws(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Hs.enqueueReplaceState(t,t.state,null)}function Gs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=f({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Ks(e){ei(e)}function qs(e){console.error(e)}function Js(e){ei(e)}function Ys(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Xs(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Zs(e,t,n){return n=Wa(n),n.tag=3,n.payload={element:null},n.callback=function(){Ys(e,t)},n}function Qs(e){return e=Wa(e),e.tag=3,e}function $s(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Xs(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Xs(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function ec(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&$i(t,n,a,!0),n=io.current,n!==null){switch(n.tag){case 31:case 13:return ao===null?Du():n.alternate===null&&Wl===0&&(Wl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ea?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,a)),!1;case 22:return n.flags|=65536,r===Ea?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,a)),!1}throw Error(i(435,n.tag))}return Gu(e,r,a),Du(),!1}if(L)return t=io.current,t===null?(r!==Ri&&(t=Error(i(423),{cause:r}),Gi(xi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=xi(r,n),a=Zs(e.stateNode,r,a),qa(e,a),Wl!==4&&(Wl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Ri&&(e=Error(i(422),{cause:r}),Gi(xi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=xi(o,n),Xl===null?Xl=[o]:Xl.push(o),Wl!==4&&(Wl=2),t===null)return!0;r=xi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Zs(n.stateNode,r,e),qa(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(ru===null||!ru.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Qs(a),$s(a,e,n,r),qa(n,a),!1}n=n.return}while(n!==null);return!1}var tc=Error(i(461)),nc=!1;function rc(e,t,n,r){t.child=e===null?Ba(t,null,n,r):za(t,e.child,n,r)}function ic(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ta(t),r=xo(e,t,n,o,a,i),s=To(),e!==null&&!nc?(Eo(e,t,i),Oc(e,t,i)):(L&&s&&Ni(t),t.flags|=1,rc(e,t,r,i),t.child)}function ac(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!pi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,oc(e,t,a,r,i)):(e=gi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!kc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Dr:n,n(o,r)&&e.ref===t.ref)return Oc(e,t,i)}return t.flags|=1,e=mi(a,r),e.ref=t.ref,e.return=t,t.child=e}function oc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Dr(a,r)&&e.ref===t.ref)if(nc=!1,t.pendingProps=r=a,kc(e,i))e.flags&131072&&(nc=!0);else return t.lanes=e.lanes,Oc(e,t,i)}return mc(e,t,n,r,i)}function sc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return lc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&xa(t,a===null?null:a.cachePool),a===null?no():to(t,a),co(t);else return r=t.lanes=536870912,lc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&xa(t,null),no(),lo(t)):(xa(t,a.cachePool),to(t,a),lo(t),t.memoizedState=null);return rc(e,t,i,n),t.child}function cc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function lc(e,t,n,r,i){var a=ba();return a=a===null?null:{parent:ca._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&xa(t,null),no(),co(t),e!==null&&$i(e,t,r,!0),t.childLanes=i,null}function uc(e,t){return t=Cc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function dc(e,t,n){return za(t,e.child,null,n),e=uc(t,t.pendingProps),e.flags|=2,uo(t),t.memoizedState=null,e}function fc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(L){if(r.mode===`hidden`)return e=uc(t,r),t.lanes=536870912,cc(null,e);if(so(t),(e=I)?(e=rf(e,Li),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Oi===null?null:{id:ki,overflow:Ai},retryLane:536870912,hydrationErrors:null},n=vi(e),n.return=t,t.child=n,Ii=t,I=null)):e=null,e===null)throw zi(t);return t.lanes=536870912,null}return uc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(so(t),a)if(t.flags&256)t.flags&=-257,t=dc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(nc||$i(e,t,n,!1),a=(n&e.childLanes)!==0,nc||a){if(r=q,r!==null&&(s=st(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,si(e,s),hu(r,e,s),tc;Du(),t=dc(e,t,n)}else e=o.treeContext,I=cf(s.nextSibling),Ii=t,L=!0,R=null,Li=!1,e!==null&&Fi(t,e),t=uc(t,r),t.flags|=4096;return t}return e=mi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function pc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function mc(e,t,n,r,i){return ta(t),n=xo(e,t,n,r,void 0,i),r=To(),e!==null&&!nc?(Eo(e,t,i),Oc(e,t,i)):(L&&r&&Ni(t),t.flags|=1,rc(e,t,n,i),t.child)}function hc(e,t,n,r,i,a){return ta(t),t.updateQueue=null,n=Co(t,r,n,i),So(e),r=To(),e!==null&&!nc?(Eo(e,t,a),Oc(e,t,a)):(L&&r&&Ni(t),t.flags|=1,rc(e,t,n,a),t.child)}function gc(e,t,n,r,i){if(ta(t),t.stateNode===null){var a=ui,o=n.contextType;typeof o==`object`&&o&&(a=na(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Hs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ha(t),o=n.contextType,a.context=typeof o==`object`&&o?na(o):ui,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Vs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Hs.enqueueReplaceState(a,a.state,null),Xa(t,r,a,i),Ya(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Gs(n,s);a.props=c;var l=a.context,u=n.contextType;o=ui,typeof u==`object`&&u&&(o=na(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Ws(t,a,r,o),Va=!1;var f=t.memoizedState;a.state=f,Xa(t,r,a,i),Ya(),l=t.memoizedState,s||f!==l||Va?(typeof d==`function`&&(Vs(t,n,d,r),l=t.memoizedState),(c=Va||Us(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ua(e,t),o=t.memoizedProps,u=Gs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ui,typeof l==`object`&&l&&(c=na(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Ws(t,a,r,c),Va=!1,f=t.memoizedState,a.state=f,Xa(t,r,a,i),Ya();var p=t.memoizedState;o!==d||f!==p||Va||e!==null&&e.dependencies!==null&&ea(e.dependencies)?(typeof s==`function`&&(Vs(t,n,s,r),p=t.memoizedState),(u=Va||Us(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ea(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,pc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=za(t,e.child,null,i),t.child=za(t,null,n,i)):rc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Oc(e,t,i),e}function _c(e,t,n,r){return Ui(),t.flags|=256,rc(e,t,n,r),t.child}var vc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function yc(e){return{baseLanes:e,cachePool:Sa()}}function bc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function xc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(z.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(L){if(a?oo(t):lo(t),(e=I)?(e=rf(e,Li),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Oi===null?null:{id:ki,overflow:Ai},retryLane:536870912,hydrationErrors:null},n=vi(e),n.return=t,t.child=n,Ii=t,I=null)):e=null,e===null)throw zi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(lo(t),a=t.mode,c=Cc({mode:`hidden`,children:c},a),r=_i(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=yc(n),r.childLanes=bc(e,s,n),t.memoizedState=vc,cc(null,r)):(oo(t),Sc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(oo(t),t.flags&=-257,t=wc(e,t,n)):t.memoizedState===null?(lo(t),c=r.fallback,a=t.mode,r=Cc({mode:`visible`,children:r.children},a),c=_i(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,za(t,e.child,null,n),r=t.child,r.memoizedState=yc(n),r.childLanes=bc(e,s,n),t.memoizedState=vc,t=cc(null,r)):(lo(t),t.child=e.child,t.flags|=128,t=null);else if(oo(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Gi({value:r,source:null,stack:null}),t=wc(e,t,n)}else if(nc||$i(e,t,n,!1),s=(n&e.childLanes)!==0,nc||s){if(s=q,s!==null&&(r=st(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,si(e,r),hu(s,e,r),tc;af(c)||Du(),t=wc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,I=cf(c.nextSibling),Ii=t,L=!0,R=null,Li=!1,e!==null&&Fi(t,e),t=Sc(t,r.children),t.flags|=4096);return t}return a?(lo(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=mi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=_i(c,a,n,null),c.flags|=2):c=mi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,cc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=yc(n):(a=c.cachePool,a===null?a=Sa():(l=ca._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=bc(e,s,n),t.memoizedState=vc,cc(e.child,r)):(oo(t),n=e.child,e=n.sibling,n=mi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function Sc(e,t){return t=Cc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Cc(e,t){return e=fi(22,e,null,t),e.lanes=0,e}function wc(e,t,n){return za(t,e.child,null,n),e=Sc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Tc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Zi(e.return,t,n)}function Ec(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Dc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=z.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,j(z,o),rc(e,t,r,n),r=L?Ti:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Tc(e,n,t);else if(e.tag===19)Tc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&fo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Ec(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&fo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Ec(t,!0,n,null,a,r);break;case`together`:Ec(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Oc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if($i(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=mi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=mi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function kc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&ea(e))):!0}function Ac(e,t,n){switch(t.tag){case 3:ge(t,t.stateNode.containerInfo),Yi(t,ca,e.memoizedState.cache),Ui();break;case 27:case 5:ve(t);break;case 4:ge(t,t.stateNode.containerInfo);break;case 10:Yi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,so(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(oo(t),e=Oc(e,t,n),e===null?null:e.sibling):xc(e,t,n):(oo(t),t.flags|=128,null);oo(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=($i(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Dc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),j(z,z.current),r)break;return null;case 22:return t.lanes=0,sc(e,t,n,t.pendingProps);case 24:Yi(t,ca,e.memoizedState.cache)}return Oc(e,t,n)}function jc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)nc=!0;else{if(!kc(e,n)&&!(t.flags&128))return nc=!1,Ac(e,t,n);nc=!!(e.flags&131072)}else nc=!1,L&&t.flags&1048576&&Mi(t,Ti,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=ka(t.elementType),t.type=e,typeof e==`function`)pi(e)?(r=Gs(e,r),t.tag=1,t=gc(null,t,e,r,n)):(t.tag=0,t=mc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===C){t.tag=11,t=ic(null,t,e,r,n);break a}else if(a===ne){t.tag=14,t=ac(null,t,e,r,n);break a}}throw t=D(e)||e,Error(i(306,t,``))}}return t;case 0:return mc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Gs(r,t.pendingProps),gc(e,t,r,a,n);case 3:a:{if(ge(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ua(e,t),Xa(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Yi(t,ca,r),r!==o.cache&&Qi(t,[ca],n,!0),Ya(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=_c(e,t,r,n);break a}else if(r!==a){a=xi(Error(i(424)),t),Gi(a),t=_c(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(I=cf(e.firstChild),Ii=t,L=!0,R=null,Li=!0,n=Ba(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ui(),r===a){t=Oc(e,t,n);break a}rc(e,t,r,n)}t=t.child}return t;case 26:return pc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:L||(n=t.type,e=t.pendingProps,r=Bd(me.current).createElement(n),r[pt]=t,r[mt]=e,Pd(r,n,e),Et(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ve(t),e===null&&L&&(r=t.stateNode=ff(t.type,t.pendingProps,me.current),Ii=t,Li=!0,a=I,Zd(t.type)?(lf=a,I=cf(r.firstChild)):I=a),rc(e,t,t.pendingProps.children,n),pc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&L&&((a=r=I)&&(r=tf(r,t.type,t.pendingProps,Li),r===null?a=!1:(t.stateNode=r,Ii=t,I=cf(r.firstChild),Li=!1,a=!0)),a||zi(t)),ve(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=xo(e,t,wo,null,null,n),Qf._currentValue=a),pc(e,t),rc(e,t,r,n),t.child;case 6:return e===null&&L&&((e=n=I)&&(n=nf(n,t.pendingProps,Li),n===null?e=!1:(t.stateNode=n,Ii=t,I=null,e=!0)),e||zi(t)),null;case 13:return xc(e,t,n);case 4:return ge(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=za(t,null,r,n):rc(e,t,r,n),t.child;case 11:return ic(e,t,t.type,t.pendingProps,n);case 7:return rc(e,t,t.pendingProps,n),t.child;case 8:return rc(e,t,t.pendingProps.children,n),t.child;case 12:return rc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Yi(t,t.type,r.value),rc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,ta(t),a=na(a),r=r(a),t.flags|=1,rc(e,t,r,n),t.child;case 14:return ac(e,t,t.type,t.pendingProps,n);case 15:return oc(e,t,t.type,t.pendingProps,n);case 19:return Dc(e,t,n);case 31:return fc(e,t,n);case 22:return sc(e,t,n,t.pendingProps);case 24:return ta(t),r=na(ca),e===null?(a=ba(),a===null&&(a=q,o=la(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Ha(t),Yi(t,ca,a)):((e.lanes&n)!==0&&(Ua(e,t),Xa(t,null,null,n),Ya()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Yi(t,ca,r),r!==a.cache&&Qi(t,[ca],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Yi(t,ca,r))),rc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Mc(e){e.flags|=4}function Nc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw Aa=Ea,wa}else e.flags&=-16777217}function Pc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(wu())e.flags|=8192;else throw Aa=Ea,wa}function Fc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:tt(),e.lanes|=t,Yl|=t)}function Ic(e,t){if(!L)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function G(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Lc(e,t,n){var r=t.pendingProps;switch(Pi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return G(t),null;case 1:return G(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Xi(ca),_e(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Hi(t)?Mc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Wi())),G(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Mc(t),o===null?(G(t),Nc(t,a,null,r,n)):(G(t),Pc(t,o))):o?o===e.memoizedState?(G(t),t.flags&=-16777217):(Mc(t),G(t),Pc(t,o)):(e=e.memoizedProps,e!==r&&Mc(t),G(t),Nc(t,a,e,r,n)),null;case 27:if(ye(t),n=me.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Mc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return G(t),null}e=fe.current,Hi(t)?Bi(t,e):(e=ff(a,r,n),t.stateNode=e,Mc(t))}return G(t),null;case 5:if(ye(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Mc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return G(t),null}if(o=fe.current,Hi(t))Bi(t,o);else{var s=Bd(me.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[pt]=t,o[mt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Mc(t)}}return G(t),Nc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Mc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=me.current,Hi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Ii,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[pt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||zi(t,!0)}else e=Bd(e).createTextNode(r),e[pt]=t,t.stateNode=e}return G(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Hi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[pt]=t}else Ui(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;G(t),e=!1}else n=Wi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(uo(t),t):(uo(t),null);if(t.flags&128)throw Error(i(558))}return G(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Hi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[pt]=t}else Ui(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;G(t),a=!1}else a=Wi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(uo(t),t):(uo(t),null)}return uo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Fc(t,t.updateQueue),G(t),null);case 4:return _e(),e===null&&Sd(t.stateNode.containerInfo),G(t),null;case 10:return Xi(t.type),G(t),null;case 19:if(de(z),r=t.memoizedState,r===null)return G(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Ic(r,!1);else{if(Wl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=fo(e),o!==null){for(t.flags|=128,Ic(r,!1),e=o.updateQueue,t.updateQueue=e,Fc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)hi(n,e),n=n.sibling;return j(z,z.current&1|2),L&&ji(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Me()>tu&&(t.flags|=128,a=!0,Ic(r,!1),t.lanes=4194304)}else{if(!a)if(e=fo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Fc(t,e),Ic(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!L)return G(t),null}else 2*Me()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,a=!0,Ic(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(G(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Me(),e.sibling=null,n=z.current,j(z,a?n&1|2:n&1),L&&ji(t,r.treeForkCount),e);case 22:case 23:return uo(t),ro(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(G(t),t.subtreeFlags&6&&(t.flags|=8192)):G(t),n=t.updateQueue,n!==null&&Fc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&de(ya),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Xi(ca),G(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Rc(e,t){switch(Pi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Xi(ca),_e(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ye(t),null;case 31:if(t.memoizedState!==null){if(uo(t),t.alternate===null)throw Error(i(340));Ui()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(uo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Ui()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return de(z),null;case 4:return _e(),null;case 10:return Xi(t.type),null;case 22:case 23:return uo(t),ro(),e!==null&&de(ya),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Xi(ca),null;case 25:return null;default:return null}}function zc(e,t){switch(Pi(t),t.tag){case 3:Xi(ca),_e();break;case 26:case 27:case 5:ye(t);break;case 4:_e();break;case 31:t.memoizedState!==null&&uo(t);break;case 13:uo(t);break;case 19:de(z);break;case 10:Xi(t.type);break;case 22:case 23:uo(t),ro(),e!==null&&de(ya);break;case 24:Xi(ca)}}function Bc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Vc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Hc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Qa(t,n)}catch(t){Z(e,e.return,t)}}}function Uc(e,t,n){n.props=Gs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Wc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Gc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Kc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function qc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[mt]=t}catch(t){Z(e,e.return,t)}}function Jc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Yc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Jc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Xc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=on));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Xc(e,t,n),e=e.sibling;e!==null;)Xc(e,t,n),e=e.sibling}function Zc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Zc(e,t,n),e=e.sibling;e!==null;)Zc(e,t,n),e=e.sibling}function Qc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[pt]=e,t[mt]=n}catch(t){Z(e,e.return,t)}}var $c=!1,el=!1,tl=!1,nl=typeof WeakSet==`function`?WeakSet:Set,rl=null;function il(e,t){if(e=e.containerInfo,Rd=sp,e=jr(e),Mr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,rl=t;rl!==null;)if(t=rl,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,rl=e;else for(;rl!==null;){switch(t=rl,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Gs(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,rl=e;break}rl=t.return}}function al(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:bl(e,n),r&4&&Bc(5,n);break;case 1:if(bl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Gs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Hc(n),r&512&&Wc(n,n.return);break;case 3:if(bl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Qa(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Qc(n);case 26:case 5:bl(e,n),t===null&&r&4&&Kc(n),r&512&&Wc(n,n.return);break;case 12:bl(e,n);break;case 31:bl(e,n),r&4&&dl(e,n);break;case 13:bl(e,n),r&4&&fl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||$c,!r){t=t!==null&&t.memoizedState!==null||el,i=$c;var a=el;$c=r,(el=t)&&!a?Sl(e,n,(n.subtreeFlags&8772)!=0):bl(e,n),$c=i,el=a}break;case 30:break;default:bl(e,n)}}function ol(e){var t=e.alternate;t!==null&&(e.alternate=null,ol(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&xt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var sl=null,cl=!1;function ll(e,t,n){for(n=n.child;n!==null;)ul(e,t,n),n=n.sibling}function ul(e,t,n){if(He&&typeof He.onCommitFiberUnmount==`function`)try{He.onCommitFiberUnmount(Ve,n)}catch{}switch(n.tag){case 26:el||Gc(n,t),ll(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:el||Gc(n,t);var r=sl,i=cl;Zd(n.type)&&(sl=n.stateNode,cl=!1),ll(e,t,n),pf(n.stateNode),sl=r,cl=i;break;case 5:el||Gc(n,t);case 6:if(r=sl,i=cl,sl=null,ll(e,t,n),sl=r,cl=i,sl!==null)if(cl)try{(sl.nodeType===9?sl.body:sl.nodeName===`HTML`?sl.ownerDocument.body:sl).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{sl.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:sl!==null&&(cl?(e=sl,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(sl,n.stateNode));break;case 4:r=sl,i=cl,sl=n.stateNode.containerInfo,cl=!0,ll(e,t,n),sl=r,cl=i;break;case 0:case 11:case 14:case 15:Vc(2,n,t),el||Vc(4,n,t),ll(e,t,n);break;case 1:el||(Gc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Uc(n,t,r)),ll(e,t,n);break;case 21:ll(e,t,n);break;case 22:el=(r=el)||n.memoizedState!==null,ll(e,t,n),el=r;break;default:ll(e,t,n)}}function dl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function fl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function pl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new nl),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new nl),t;default:throw Error(i(435,e.tag))}}function ml(e,t){var n=pl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function hl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){sl=c.stateNode,cl=!1;break a}break;case 5:sl=c.stateNode,cl=!1;break a;case 3:case 4:sl=c.stateNode.containerInfo,cl=!0;break a}c=c.return}if(sl===null)throw Error(i(160));ul(o,s,a),sl=null,cl=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)_l(t,e),t=t.sibling}var gl=null;function _l(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:hl(t,e),vl(e),r&4&&(Vc(3,e,e.return),Bc(3,e),Vc(5,e,e.return));break;case 1:hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),r&64&&$c&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=gl;if(hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[bt]||o[pt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[pt]=e,Et(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[pt]=e,Et(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&qc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),n!==null&&r&4&&qc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),e.flags&32){a=e.stateNode;try{Zt(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,qc(e,a,n===null?a:n.memoizedProps)),r&1024&&(tl=!0);break;case 6:if(hl(t,e),vl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,a=gl,gl=gf(t.containerInfo),hl(t,e),gl=a,vl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}tl&&(tl=!1,yl(e));break;case 4:r=gl,gl=gf(e.stateNode.containerInfo),hl(t,e),vl(e),gl=r;break;case 12:hl(t,e),vl(e);break;case 31:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 13:hl(t,e),vl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=Me()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=$c,d=el;if($c=u||a,el=d||l,hl(t,e),el=d,$c=u,vl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||$c||el||xl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,ml(e,n))));break;case 19:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 30:break;case 21:break;default:hl(t,e),vl(e)}}function vl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Jc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Zc(e,Yc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Zt(o,``),n.flags&=-33),Zc(e,Yc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Xc(e,Yc(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function yl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;yl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function bl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)al(e,t.alternate,t),t=t.sibling}function xl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Vc(4,t,t.return),xl(t);break;case 1:Gc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Uc(t,t.return,n),xl(t);break;case 27:pf(t.stateNode);case 26:case 5:Gc(t,t.return),xl(t);break;case 22:t.memoizedState===null&&xl(t);break;case 30:xl(t);break;default:xl(t)}e=e.sibling}}function Sl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Sl(i,a,n),Bc(4,a);break;case 1:if(Sl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Za(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Hc(a),Wc(a,a.return);break;case 27:Qc(a);case 26:case 5:Sl(i,a,n),n&&r===null&&o&4&&Kc(a),Wc(a,a.return);break;case 12:Sl(i,a,n);break;case 31:Sl(i,a,n),n&&o&4&&dl(i,a);break;case 13:Sl(i,a,n),n&&o&4&&fl(i,a);break;case 22:a.memoizedState===null&&Sl(i,a,n),Wc(a,a.return);break;case 30:break;default:Sl(i,a,n)}t=t.sibling}}function Cl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ua(n))}function wl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ua(e))}function Tl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)El(e,t,n,r),t=t.sibling}function El(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Tl(e,t,n,r),i&2048&&Bc(9,t);break;case 1:Tl(e,t,n,r);break;case 3:Tl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ua(e)));break;case 12:if(i&2048){Tl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Tl(e,t,n,r);break;case 31:Tl(e,t,n,r);break;case 13:Tl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Tl(e,t,n,r):(a._visibility|=2,Dl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Tl(e,t,n,r):Ol(e,t),i&2048&&Cl(o,t);break;case 24:Tl(e,t,n,r),i&2048&&wl(t.alternate,t);break;default:Tl(e,t,n,r)}}function Dl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Dl(a,o,s,c,i),Bc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Dl(a,o,s,c,i)):u._visibility&2?Dl(a,o,s,c,i):Ol(a,o),i&&l&2048&&Cl(o.alternate,o);break;case 24:Dl(a,o,s,c,i),i&&l&2048&&wl(o.alternate,o);break;default:Dl(a,o,s,c,i)}t=t.sibling}}function Ol(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Ol(n,r),i&2048&&Cl(r.alternate,r);break;case 24:Ol(n,r),i&2048&&wl(r.alternate,r);break;default:Ol(n,r)}t=t.sibling}}var kl=8192;function Al(e,t,n){if(e.subtreeFlags&kl)for(e=e.child;e!==null;)jl(e,t,n),e=e.sibling}function jl(e,t,n){switch(e.tag){case 26:Al(e,t,n),e.flags&kl&&e.memoizedState!==null&&Gf(n,gl,e.memoizedState,e.memoizedProps);break;case 5:Al(e,t,n);break;case 3:case 4:var r=gl;gl=gf(e.stateNode.containerInfo),Al(e,t,n),gl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=kl,kl=16777216,Al(e,t,n),kl=r):Al(e,t,n));break;default:Al(e,t,n)}}function Ml(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Nl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];rl=r,Il(r,e)}Ml(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pl(e),e=e.sibling}function Pl(e){switch(e.tag){case 0:case 11:case 15:Nl(e),e.flags&2048&&Vc(9,e,e.return);break;case 3:Nl(e);break;case 12:Nl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Fl(e)):Nl(e);break;default:Nl(e)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];rl=r,Il(r,e)}Ml(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Vc(8,t,t.return),Fl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Fl(t));break;default:Fl(t)}e=e.sibling}}function Il(e,t){for(;rl!==null;){var n=rl;switch(n.tag){case 0:case 11:case 15:Vc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ua(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,rl=r;else a:for(n=e;rl!==null;){r=rl;var i=r.sibling,a=r.return;if(ol(r),r===n){rl=null;break a}if(i!==null){i.return=a,rl=i;break a}rl=a}}}var Ll={getCacheForType:function(e){var t=na(ca),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return na(ca).controller.signal}},Rl=typeof WeakMap==`function`?WeakMap:Map,K=0,q=null,J=null,Y=0,X=0,zl=null,Bl=!1,Vl=!1,Hl=!1,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return K&2&&Y!==0?Y&-Y:O.T===null?ut():dd()}function mu(){if(Jl===0)if(!(Y&536870912)||L){var e=Ye;Ye<<=1,!(Ye&3932160)&&(Ye=262144),Jl=e}else Jl=536870912;return e=io.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===q&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,Y,Jl,!1)),rt(e,n),(!(K&2)||e!==q)&&(e===q&&(!(K&2)&&(Kl|=n),Wl===4&&yu(e,Y,Jl,!1)),rd(e))}function gu(e,t,n){if(K&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||$e(e,t),a=r?Au(e,t):Ou(e,t,!0),o=r;do{if(a===0){Vl&&!r&&yu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!vu(n)){a=Ou(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,s).flags|=256),s=Ou(c,s,!1),s!==2){if(Hl&&!l){c.errorRecoveryDisabledLanes|=o,Kl|=o,a=4;break a}o=Zl,Zl=a,o!==null&&(Zl===null?Zl=o:Zl.push.apply(Zl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Bl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=$l+300-Me(),10<a)){if(yu(r,t,Jl,!Bl),Qe(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,`Throttled`,-0,0),a);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,null,-0,0)}}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:on},jl(t,a,d);var m=(a&62914560)===a?$l-Me():(a&4194048)===a?eu-Me():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Er(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-We(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&at(e,n,t)}function bu(){return K&6?!0:(id(0,!1),!1)}function xu(){if(J!==null){if(X===0)var e=J.return;else e=J,Ji=qi=null,Do(e),Na=null,Pa=0,e=J;for(;e!==null;)zc(e.alternate,e),e=e.return;J=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),q=e,J=n=mi(e.current,null),Y=t,X=0,zl=null,Bl=!1,Vl=$e(e,t),Hl=!1,Yl=Jl=ql=Kl=Gl=Wl=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-We(r),a=1<<i;t|=e[i],r&=~a}return Ul=t,ii(),n}function Cu(e,t){B=null,O.H=Ls,t===Ca||t===Ta?(t=ja(),X=3):t===wa?(t=ja(),X=4):X=t===tc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,zl=t,J===null&&(Wl=1,Ys(e,xi(t,e.current)))}function wu(){var e=io.current;return e===null?!0:(Y&4194048)===Y?ao===null:(Y&62914560)===Y||Y&536870912?e===ao:!1}function Tu(){var e=O.H;return O.H=Ls,e===null?Ls:e}function Eu(){var e=O.A;return O.A=Ll,e}function Du(){Wl=4,Bl||(Y&4194048)!==Y&&io.current!==null||(Vl=!0),!(Gl&134217727)&&!(Kl&134217727)||q===null||yu(q,Y,Jl,!1)}function Ou(e,t,n){var r=K;K|=2;var i=Tu(),a=Eu();(q!==e||Y!==t)&&(nu=null,Su(e,t)),t=!1;var o=Wl;a:do try{if(X!==0&&J!==null){var s=J,c=zl;switch(X){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:io.current===null&&(t=!0);var l=X;if(X=0,zl=null,Pu(e,s,c,l),n&&Vl){o=0;break a}break;default:l=X,X=0,zl=null,Pu(e,s,c,l)}}ku(),o=Wl;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,Ji=qi=null,K=r,O.H=i,O.A=a,J===null&&(q=null,Y=0,ii()),o}function ku(){for(;J!==null;)Mu(J)}function Au(e,t){var n=K;K|=2;var r=Tu(),a=Eu();q!==e||Y!==t?(nu=null,tu=Me()+500,Su(e,t)):Vl=$e(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=zl;b:switch(X){case 1:X=0,zl=null,Pu(e,t,o,1);break;case 2:case 9:if(Da(o)){X=0,zl=null,Nu(t);break}t=function(){X!==2&&X!==9||q!==e||(X=7),rd(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:Da(o)?(X=0,zl=null,Nu(t)):(X=0,zl=null,Pu(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(s?Wf(s):c.stateNode.complete){X=0,zl=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,Fu(u))}break b}}X=0,zl=null,Pu(e,t,o,5);break;case 6:X=0,zl=null,Pu(e,t,o,6);break;case 8:xu(),Wl=6;break a;default:throw Error(i(462))}}ju();break}catch(t){Cu(e,t)}while(1);return Ji=qi=null,O.H=r,O.A=a,K=n,J===null?(q=null,Y=0,ii(),Wl):0}function ju(){for(;J!==null&&!Ae();)Mu(J)}function Mu(e){var t=jc(e.alternate,e,Ul);e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=hc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=hc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:Do(t);default:zc(n,t),t=J=hi(t,Ul),t=jc(n,t,Ul)}e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Pu(e,t,n,r){Ji=qi=null,Do(t),Na=null,Pa=0;var i=t.return;try{if(ec(e,i,t,n,Y)){Wl=1,Ys(e,xi(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;Wl=1,Ys(e,xi(n,e.current)),J=null;return}t.flags&32768?(L||r===1?e=!0:Vl||Y&536870912?e=!1:(Bl=e=!0,(r===2||r===9||r===3||r===6)&&(r=io.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Bl);return}e=t.return;var n=Lc(t.alternate,t,Ul);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);Wl===0&&(Wl=5)}function Iu(e,t){do{var n=Rc(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);Wl=6,J=null}function Lu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(K&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=ri,it(e,n,o,s,c,l),e===q&&(J=q=null,Y=0),ou=t,au=e,su=n,cu=o,lu=a,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(Ie,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=O.T,O.T=null,a=k.p,k.p=2,s=K,K|=4;try{il(e,t,n)}finally{K=s,k.p=a,O.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=O.T,O.T=null;var r=k.p;k.p=2;var i=K;K|=4;try{_l(t,e);var a=zd,o=jr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Ar(s.ownerDocument.documentElement,s)){if(c!==null&&Mr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=kr(s,h),v=kr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{K=i,k.p=r,O.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=O.T,O.T=null;var r=k.p;k.p=2;var i=K;K|=4;try{al(e,t.alternate,t)}finally{K=i,k.p=r,O.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,je();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),lt(n),t=t.stateNode,He&&typeof He.onCommitFiberRoot==`function`)try{He.onCommitFiberRoot(Ve,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=O.T,i=k.p,k.p=2,O.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{O.T=t,k.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ua(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=lt(su),r=O.T,a=k.p;try{k.p=32>n?32:n,O.T=null,n=lu,lu=null;var o=au,s=su;if(iu=0,ou=au=null,su=0,K&6)throw Error(i(331));var c=K;if(K|=4,Pl(o.current),El(o,o.current,s,n),K=c,id(0,!1),He&&typeof He.onPostCommitFiberRoot==`function`)try{He.onPostCommitFiberRoot(Ve,o)}catch{}return!0}finally{k.p=a,O.T=r,Vu(e,t)}}function Wu(e,t,n){t=xi(n,t),t=Zs(e.stateNode,t,2),e=Ga(e,t,2),e!==null&&(rt(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=xi(n,e),n=Qs(2),r=Ga(t,n,2),r!==null&&($s(n,r,t,e),rt(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Rl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Hl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,q===e&&(Y&n)===n&&(Wl===4||Wl===3&&(Y&62914560)===Y&&300>Me()-$l?!(K&2)&&Su(e,0):ql|=n,Yl===Y&&(Yl=0)),rd(e)}function qu(e,t){t===0&&(t=tt()),e=si(e,t),e!==null&&(rt(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return Oe(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-We(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=Y,a=Qe(r,r===q?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||$e(r,a)||(n=!0,ld(r,a));r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Me(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}iu!==0&&iu!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-We(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=et(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=q,n=Y,n=Qe(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&ke(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||$e(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&ke(r),lt(n)){case 2:case 8:n=Fe;break;case 32:n=Ie;break;case 268435456:n=Re;break;default:n=Ie}return r=cd.bind(null,e),n=Oe(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&ke(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=Y;return r=Qe(e,e===q?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,Me()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){K&6?Oe(Pe,ad):od()})}function dd(){if(nd===0){var e=pa;e===0&&(e=Je,Je<<=1,!(Je&261888)&&(Je=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:an(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[mt]||null).action),o=r.submitter;o&&(t=(t=o[mt]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Dn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Cs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Cs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<Qr.length;hd++){var gd=Qr[hd];$r(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}$r(Wr,`onAnimationEnd`),$r(Gr,`onAnimationIteration`),$r(Kr,`onAnimationStart`),$r(`dblclick`,`onDoubleClick`),$r(`focusin`,`onFocus`),$r(`focusout`,`onBlur`),$r(qr,`onTransitionRun`),$r(Jr,`onTransitionStart`),$r(Yr,`onTransitionCancel`),$r(Xr,`onTransitionEnd`),At(`onMouseEnter`,[`mouseout`,`mouseover`]),At(`onMouseLeave`,[`mouseout`,`mouseover`]),At(`onPointerEnter`,[`pointerout`,`pointerover`]),At(`onPointerLeave`,[`pointerout`,`pointerover`]),kt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),kt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),kt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),kt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),kt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),kt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ei(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ei(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[gt];n===void 0&&(n=t[gt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,Dt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!gn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=St(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}pn(function(){var r=a,i=cn(n),s=[];a:{var c=Zr.get(e);if(c!==void 0){var l=Dn,u=e;switch(e){case`keypress`:if(Sn(n)===0)break a;case`keydown`:case`keyup`:l=Un;break;case`focusin`:u=`focus`,l=In;break;case`focusout`:u=`blur`,l=In;break;case`beforeblur`:case`afterblur`:l=In;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Pn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Fn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Gn;break;case Wr:case Gr:case Kr:l=Ln;break;case Xr:l=Kn;break;case`scroll`:case`scrollend`:l=kn;break;case`wheel`:l=qn;break;case`copy`:case`cut`:case`paste`:l=Rn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Wn;break;case`toggle`:case`beforetoggle`:l=Jn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=mn(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==sn&&(u=n.relatedTarget||n.fromElement)&&(St(u)||u[ht]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?St(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=Pn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Wn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:wt(l),h=u==null?c:wt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,St(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?wt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=mr;else if(cr(c))if(hr)v=wr;else{v=Sr;var y=xr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&tn(r.elementType)&&(v=mr):v=Cr;if(v&&=v(e,r)){lr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Jt(c,`number`,c.value)}switch(y=r?wt(r):window,e){case`focusin`:(cr(y)||y.contentEditable===`true`)&&(Pr=y,Fr=r,Ir=null);break;case`focusout`:Ir=Fr=Pr=null;break;case`mousedown`:Lr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Lr=!1,Rr(s,n,i);break;case`selectionchange`:if(Nr)break;case`keydown`:case`keyup`:Rr(s,n,i)}var b;if(Xn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else ir?nr(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&($n&&n.locale!==`ko`&&(ir||x!==`onCompositionStart`?x===`onCompositionEnd`&&ir&&(b=xn()):(vn=i,yn=`value`in vn?vn.value:vn.textContent,ir=!0)),y=Ed(r,x),0<y.length&&(x=new zn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=rr(n),b!==null&&(x.data=b)))),(b=Qn?ar(e,n):or(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new zn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=mn(e,n),i!=null&&r.unshift(Td(e,i,a)),i=mn(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=mn(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=mn(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Zt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Zt(e,``+r);break;case`className`:It(e,`class`,r);break;case`tabIndex`:It(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:It(e,n,r);break;case`style`:en(e,r,o);break;case`data`:if(t!==`object`){It(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=an(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=an(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=on);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=an(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Ft(e,`popover`,r);break;case`xlinkActuate`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Ft(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=nn.get(n)||n,Ft(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:en(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Zt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Zt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=on);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!Ot.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[mt]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Ft(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}qt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&M(e,!!r,n,!0):M(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}Xt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(tn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Kt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?M(e,!!n,n?[]:``,!1):M(e,!!n,t,!0)):M(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Yt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(tn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[bt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),xt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[bt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);xt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=k.d;k.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=Ct(e);t!==null&&t.tag===5&&t.type===`form`?Ts(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Gt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),Et(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Gt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Gt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Gt(n.imageSizes)+`"]`)):i+=`[href="`+Gt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=f({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),Et(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Gt(r)+`"][href="`+Gt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=f({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),Et(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=Tt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=f({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);Et(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=Tt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=f({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Et(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=Tt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=f({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Et(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=me.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=Tt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=Tt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=Tt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Gt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return f({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),Et(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Gt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Gt(n.href)+`"]`);if(r)return t.instance=r,Et(r),r;var a=f({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Et(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,Et(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),Et(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,Et(a),a):(r=n,(a=mf.get(o))&&(r=f({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Et(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[bt]||a[pt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Et(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),Et(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:S,Provider:null,Consumer:null,_currentValue:A,_currentValue2:A,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=nt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=nt(0),this.hiddenUpdates=nt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=fi(3,null,null,t),e.current=a,a.stateNode=e,t=la(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ha(a),e}function tp(e){return e?(e=ui,e):ui}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Wa(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ga(e,r,t),n!==null&&(hu(n,e,t),Ka(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=si(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=ct(t);var n=si(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=O.T;O.T=null;var a=k.p;try{k.p=2,up(e,t,n,r)}finally{k.p=a,O.T=i}}function lp(e,t,n,r){var i=O.T;O.T=null;var a=k.p;try{k.p=8,up(e,t,n,r)}finally{k.p=a,O.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=Ct(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Ze(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-We(o);s.entanglements[1]|=c,o&=~c}rd(a),!(K&6)&&(tu=Me()+500,id(0,!1))}}break;case 31:case 13:s=si(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=cn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=St(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ne()){case Pe:return 2;case Fe:return 8;case Ie:case Le:return 32;case Re:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ct(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=St(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,dt(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,dt(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);sn=r,n.target.dispatchEvent(r),sn=null}else return t=Ct(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=Ct(n);a!==null&&(e.splice(t,3),t-=3,Cs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[mt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[mt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[ht]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=ut();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.7`)throw Error(i(527,Lp,`19.2.7`));k.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:d(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.7`,rendererPackageName:`react-dom`,currentDispatcherRef:O,reconcilerVersion:`19.2.7`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Ve=zp.inject(Rp),He=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Ks,s=qs,c=Js;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[ht]=t.current,Sd(e),new Fp(t)}})),y=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=v()})),b=d(),x=l(p(),1),ee=y(),S=`modulepreload`,C=function(e){return`/`+e},te={},w=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=C(t,n),t=s(t),t in te)return;te[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:S,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},ne=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,re=/^[\\/]{2}/;function ie(e,t){return t+e.replace(/\\/g,`/`)}var ae=`popstate`;function T(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function oe(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return k(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:A(t)}return le(t,n,null,e)}function E(e,t){if(e===!1||e==null)throw Error(t)}function D(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function se(){return Math.random().toString(36).substring(2,10)}function O(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function k(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?ce(t):t,state:n,key:t&&t.key||r||se(),mask:i}}function A({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function ce(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function le(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=T(e)?e:k(h.location,e,t);n&&n(r,e),l=u()+1;let d=O(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=T(e)?e:k(h.location,e,t);n&&n(r,e),l=u();let i=O(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return ue(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(ae,d),c=e,()=>{i.removeEventListener(ae,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function ue(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),E(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:A(t);return i=i.replace(/ $/,`%20`),!n&&re.test(i)&&(i=r+i),new URL(i,r)}function de(e,t,n=`/`){return j(e,t,n,!1)}function j(e,t,n,r,i){let a=je((typeof t==`string`?ce(t):t).pathname||`/`,n);if(a==null)return null;let o=i??pe(e),s=null,c=Ae(a);for(let e=0;s==null&&e<o.length;++e)s=Ee(o[e],c,r);return s}function fe(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function pe(e){let t=me(e);return ge(t),t}function me(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;E(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=ze([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(E(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),me(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:we(l,e.index),routesMeta:u.map((e,t)=>{let[n,r]=ke(e.relativePath,e.caseSensitive,t===u.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of he(e.path))a(e,t,!0,n)}),t}function he(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=he(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function ge(e){e.sort((e,t)=>e.score===t.score?Te(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var _e=/^:[\w-]+$/,ve=3,ye=2,be=1,xe=10,Se=-2,Ce=e=>e===`*`;function we(e,t){let n=e.split(`/`),r=n.length;return n.some(Ce)&&(r+=Se),t&&(r+=ye),n.filter(e=>!Ce(e)).reduce((e,t)=>e+(_e.test(t)?ve:t===``?be:xe),r)}function Te(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function Ee(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?Oe(u,l,s.matcher,s.compiledParams):De(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=De({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:ze([a,d.pathname]),pathnameBase:Ve(ze([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=ze([a,d.pathnameBase]))}return o}function De(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=ke(e.path,e.caseSensitive,e.end);return Oe(e,t,n,r)}function Oe(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function ke(e,t=!1,n=!0){D(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Ae(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return D(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function je(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function Me(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?ce(e):e,a;return n?(n=Re(n),a=n.startsWith(`/`)?Ne(n.substring(1),`/`):Ne(n,t)):a=t,{pathname:a,search:He(r),hash:Ue(i)}}function Ne(e,t){let n=Be(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Pe(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Fe(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Ie(e){let t=Fe(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Le(e,t,n,r=!1){let i;typeof e==`string`?i=ce(e):(i={...e},E(!i.pathname||!i.pathname.includes(`?`),Pe(`?`,`pathname`,`search`,i)),E(!i.pathname||!i.pathname.includes(`#`),Pe(`#`,`pathname`,`hash`,i)),E(!i.search||!i.search.includes(`#`),Pe(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Me(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Re=e=>e.replace(/[\\/]{2,}/g,`/`),ze=e=>Re(e.join(`/`)),Be=e=>e.replace(/\/+$/,``),Ve=e=>Be(e).replace(/^\/*/,`/`),He=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Ue=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,We=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Ge(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Ke(e){return ze(e.map(e=>e.route.path).filter(Boolean))||`/`}var qe=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Je(e,t){let n=e;if(typeof n!=`string`||!ne.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(qe)try{let e=new URL(window.location.href),r=re.test(n)?new URL(ie(n,e.protocol)):new URL(n),a=je(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{D(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Ye=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Ye);var Xe=[`GET`,...Ye];new Set(Xe);var Ze=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function Qe(e){try{return Ze.includes(new URL(e).protocol)}catch{return!1}}var $e=x.createContext(null);$e.displayName=`DataRouter`;var et=x.createContext(null);et.displayName=`DataRouterState`;var tt=x.createContext(!1);function nt(){return x.useContext(tt)}var rt=x.createContext({isTransitioning:!1});rt.displayName=`ViewTransition`;var it=x.createContext(new Map);it.displayName=`Fetchers`;var at=x.createContext(null);at.displayName=`Await`;var ot=x.createContext(null);ot.displayName=`Navigation`;var st=x.createContext(null);st.displayName=`Location`;var ct=x.createContext({outlet:null,matches:[],isDataRoute:!1});ct.displayName=`Route`;var lt=x.createContext(null);lt.displayName=`RouteError`;var ut=`REACT_ROUTER_ERROR`,dt=`REDIRECT`,ft=`ROUTE_ERROR_RESPONSE`;function pt(e){if(e.startsWith(`${ut}:${dt}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function mt(e){if(e.startsWith(`${ut}:${ft}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new We(t.status,t.statusText,t.data)}catch{}}function ht(e,{relative:t}={}){E(gt(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=x.useContext(ot),{hash:i,pathname:a,search:o}=wt(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:ze([n,a])),r.createHref({pathname:s,search:o,hash:i})}function gt(){return x.useContext(st)!=null}function _t(){return E(gt(),`useLocation() may be used only in the context of a <Router> component.`),x.useContext(st).location}var vt=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function yt(e){x.useContext(ot).static||x.useLayoutEffect(e)}function bt(){let{isDataRoute:e}=x.useContext(ct);return e?Ut():xt()}function xt(){E(gt(),`useNavigate() may be used only in the context of a <Router> component.`);let e=x.useContext($e),{basename:t,navigator:n}=x.useContext(ot),{matches:r}=x.useContext(ct),{pathname:i}=_t(),a=JSON.stringify(Ie(r)),o=x.useRef(!1);return yt(()=>{o.current=!0}),x.useCallback((r,s={})=>{if(D(o.current,vt),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Le(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:ze([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}var St=x.createContext(null);function Ct(e){let t=x.useContext(ct).outlet;return x.useMemo(()=>t&&x.createElement(St.Provider,{value:e},t),[t,e])}function wt(e,{relative:t}={}){let{matches:n}=x.useContext(ct),{pathname:r}=_t(),i=JSON.stringify(Ie(n));return x.useMemo(()=>Le(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function Tt(e,t){return Et(e,t)}function Et(e,t,n){E(gt(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=x.useContext(ot),{matches:i}=x.useContext(ct),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Gt(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=_t(),d;if(t){let e=typeof t==`string`?ce(t):t;E(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):de(e,{pathname:p});D(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),D(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=Nt(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:ze([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:ze([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?x.createElement(st.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function Dt(){let e=Ht(),t=Ge(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=x.createElement(x.Fragment,null,x.createElement(`p`,null,`💿 Hey developer 👋`),x.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,x.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,x.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),x.createElement(x.Fragment,null,x.createElement(`h2`,null,`Unexpected Application Error!`),x.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?x.createElement(`pre`,{style:i},n):null,o)}var Ot=x.createElement(Dt,null),kt=class extends x.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=mt(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:x.createElement(ct.Provider,{value:this.props.routeContext},x.createElement(lt.Provider,{value:e,children:this.props.component}));return this.context?x.createElement(jt,{error:e},t):t}};kt.contextType=tt;var At=new WeakMap;function jt({children:e,error:t}){let{basename:n}=x.useContext(ot);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=pt(t.digest);if(e){let r=At.get(t);if(r)throw r;let i=Je(e.location,n),a=i.absoluteURL||i.to;if(Qe(a))throw Error(`Invalid redirect location`);if(qe&&!At.get(t))if(i.isExternal||e.reloadDocument)window.location.href=a;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw At.set(t,n),n}return x.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${a}`})}}return e}function Mt({routeContext:e,match:t,children:n}){let r=x.useContext($e);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),x.createElement(ct.Provider,{value:e},n)}function Nt(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);E(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:Ke(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||Ot,o&&(s<0&&c===0?(Gt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?x.createElement(n.route.Component,null):n.route.element?n.route.element:e,x.createElement(Mt,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?x.createElement(kt,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function Pt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Ft(e){let t=x.useContext($e);return E(t,Pt(e)),t}function It(e){let t=x.useContext(et);return E(t,Pt(e)),t}function Lt(e){let t=x.useContext(ct);return E(t,Pt(e)),t}function Rt(e){let t=Lt(e),n=t.matches[t.matches.length-1];return E(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function zt(){return Rt(`useRouteId`)}function Bt(){let e=It(`useNavigation`);return x.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function Vt(){let{matches:e,loaderData:t}=It(`useMatches`);return x.useMemo(()=>e.map(e=>fe(e,t)),[e,t])}function Ht(){let e=x.useContext(lt),t=It(`useRouteError`),n=Rt(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Ut(){let{router:e}=Ft(`useNavigate`),t=Rt(`useNavigate`),n=x.useRef(!1);return yt(()=>{n.current=!0}),x.useCallback(async(r,i={})=>{D(n.current,vt),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Wt={};function Gt(e,t,n){!t&&!Wt[e]&&(Wt[e]=!0,D(!1,n))}x.memo(Kt);function Kt({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return Et(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function qt({to:e,replace:t,state:n,relative:r}){E(gt(),`<Navigate> may be used only in the context of a <Router> component.`);let{static:i}=x.useContext(ot);D(!i,`<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`);let{matches:a}=x.useContext(ct),{pathname:o}=_t(),s=bt(),c=Le(e,Ie(a),o,r===`path`),l=JSON.stringify(c);return x.useEffect(()=>{s(JSON.parse(l),{replace:t,state:n,relative:r})},[s,l,r,t,n]),null}function Jt(e){return Ct(e.context)}function M(e){E(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Yt({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){E(!gt(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=x.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=ce(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=x.useMemo(()=>{let e=je(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return D(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:x.createElement(ot.Provider,{value:c},x.createElement(st.Provider,{children:t,value:h}))}function Xt({children:e,location:t}){return Tt(Zt(e),t)}x.Component;function Zt(e,t=[]){let n=[];return x.Children.forEach(e,(e,r)=>{if(!x.isValidElement(e))return;let i=[...t,r];if(e.type===x.Fragment){n.push.apply(n,Zt(e.props.children,i));return}E(e.type===M,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),E(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Zt(e.props.children,i)),n.push(a)}),n}var Qt=`get`,$t=`application/x-www-form-urlencoded`;function en(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function tn(e){return en(e)&&e.tagName.toLowerCase()===`button`}function nn(e){return en(e)&&e.tagName.toLowerCase()===`form`}function rn(e){return en(e)&&e.tagName.toLowerCase()===`input`}function an(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function on(e,t){return e.button===0&&(!t||t===`_self`)&&!an(e)}var sn=null;function cn(){if(sn===null)try{new FormData(document.createElement(`form`),0),sn=!1}catch{sn=!0}return sn}var ln=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function un(e){return e!=null&&!ln.has(e)?(D(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${$t}"`),null):e}function dn(e,t){let n,r,i,a,o;if(nn(e)){let o=e.getAttribute(`action`);r=o?je(o,t):null,n=e.getAttribute(`method`)||Qt,i=un(e.getAttribute(`enctype`))||$t,a=new FormData(e)}else if(tn(e)||rn(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?je(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Qt,i=un(e.getAttribute(`formenctype`))||un(o.getAttribute(`enctype`))||$t,a=new FormData(o,e),!cn()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(en(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Qt,r=null,i=$t,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var fn={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},pn=/[&><\u2028\u2029]/g;function mn(e){return e.replace(pn,e=>fn[e])}function hn(e,t){if(e===!1||e==null)throw Error(t)}function gn(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&je(i.pathname,t)===`/`?i.pathname=`${Be(t)}/_root.${r}`:i.pathname=`${Be(i.pathname)}.${r}`,i}async function _n(e,t){if(e.id in t)return t[e.id];try{let n=await w(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function vn(e){return e!=null&&typeof e.page==`string`}function yn(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function bn(e,t,n){return Tn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await _n(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(yn).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function xn(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function Sn(e,t,{includeHydrateFallback:n}={}){return Cn(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function Cn(e){return[...new Set(e)]}function wn(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function Tn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!vn(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(wn(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function En(){let e=x.useContext($e);return hn(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function Dn(){let e=x.useContext(et);return hn(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var On=x.createContext(void 0);On.displayName=`FrameworkContext`;function kn(){let e=x.useContext(On);return hn(e,`You must render this element inside a <HydratedRouter> element`),e}function An(e,t){let n=x.useContext(On),[r,i]=x.useState(!1),[a,o]=x.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=x.useRef(null);x.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),x.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:jn(s,p),onBlur:jn(c,m),onMouseEnter:jn(l,p),onMouseLeave:jn(u,m),onTouchStart:jn(d,p)}]:[a,f,{}]:[!1,f,{}]}function jn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Mn({page:e,...t}){let n=nt(),{nonce:r}=kn(),{router:i}=En(),a=x.useMemo(()=>de(i.routes,e,i.basename),[i.routes,e,i.basename]);return a?(t.nonce==null&&r&&(t={...t,nonce:r}),n?x.createElement(Pn,{page:e,matches:a,...t}):x.createElement(Fn,{page:e,matches:a,...t})):null}function Nn(e){let{manifest:t,routeModules:n}=kn(),[r,i]=x.useState([]);return x.useEffect(()=>{let r=!1;return bn(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function Pn({page:e,matches:t,...n}){let r=_t(),{future:i}=kn(),{basename:a}=En(),o=x.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=gn(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return x.createElement(x.Fragment,null,o.map(e=>x.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function Fn({page:e,matches:t,...n}){let r=_t(),{future:i,manifest:a,routeModules:o}=kn(),{basename:s}=En(),{loaderData:c,matches:l}=Dn(),u=x.useMemo(()=>xn(e,t,l,a,r,`data`),[e,t,l,a,r]),d=x.useMemo(()=>xn(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=x.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=gn(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=x.useMemo(()=>Sn(d,a),[d,a]),m=Nn(d);return x.createElement(x.Fragment,null,f.map(e=>x.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>x.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>x.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function In(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}x.Component;var Ln=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{Ln&&(window.__reactRouterVersion=`7.18.0`)}catch{}function Rn({basename:e,children:t,useTransitions:n,window:r}){let i=x.useRef();i.current??=oe({window:r,v5Compat:!0});let a=i.current,[o,s]=x.useState({action:a.action,location:a.location}),c=x.useCallback(e=>{n===!1?s(e):x.startTransition(()=>s(e))},[n]);return x.useLayoutEffect(()=>a.listen(c),[a,c]),x.createElement(Yt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function zn({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=x.useState({action:n.action,location:n.location}),o=x.useCallback(e=>{r===!1?a(e):x.startTransition(()=>a(e))},[r]);return x.useLayoutEffect(()=>n.listen(o),[n,o]),x.createElement(Yt,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}zn.displayName=`unstable_HistoryRouter`;var N=x.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=x.useContext(ot),v=typeof l==`string`&&ne.test(l),y=Je(l,h);l=y.to;let b=ht(l,{relative:r}),ee=_t(),S=null;if(o){let e=Le(o,[],ee.mask?ee.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:ze([h,e.pathname])),S=g.createHref(e)}let[C,te,w]=An(n,p),re=Gn(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function ie(t){e&&e(t),t.defaultPrevented||re(t)}let ae=!(y.isExternal||i),T=x.createElement(`a`,{...p,...w,href:(ae?S:void 0)||y.absoluteURL||b,onClick:ae?ie:e,ref:In(m,te),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return C&&!v?x.createElement(x.Fragment,null,T,x.createElement(Mn,{page:b})):T});N.displayName=`Link`;var P=x.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=wt(a,{relative:c.relative}),d=_t(),f=x.useContext(et),{navigator:p,basename:m}=x.useContext(ot),h=f!=null&&tr(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=je(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,ee=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),S={isActive:b,isPending:ee,isTransitioning:h},C=b?e:void 0,te;te=typeof n==`function`?n(S):[n,b?`active`:null,ee?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let w=typeof i==`function`?i(S):i;return x.createElement(N,{...c,"aria-current":C,className:te,ref:l,style:w,to:a,viewTransition:o},typeof s==`function`?s(S):s)});P.displayName=`NavLink`;var Bn=x.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Qt,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=x.useContext(ot),g=Jn(),_=Yn(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&ne.test(s);return x.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?x.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});Bn.displayName=`Form`;function Vn({getKey:e,storageKey:t,...n}){let r=x.useContext(On),{basename:i}=x.useContext(ot),a=_t(),o=Vt();$n({getKey:e,storageKey:t});let s=x.useMemo(()=>{if(!r||!e)return null;let t=Qn(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return n.nonce==null&&r?.nonce&&(n.nonce=r.nonce),x.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${mn(JSON.stringify(t||Xn))}, ${mn(JSON.stringify(s))})`}})}Vn.displayName=`ScrollRestoration`;function Hn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Un(e){let t=x.useContext($e);return E(t,Hn(e)),t}function Wn(e){let t=x.useContext(et);return E(t,Hn(e)),t}function Gn(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=bt(),d=_t(),f=wt(e,{relative:o});return x.useCallback(p=>{if(on(p,t)){p.preventDefault();let t=n===void 0?A(d)===A(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?x.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var Kn=0,qn=()=>`__${String(++Kn)}__`;function Jn(){let{router:e}=Un(`useSubmit`),{basename:t}=x.useContext(ot),n=zt(),r=e.fetch,i=e.navigate;return x.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=dn(e,t);a.navigate===!1?await r(a.fetcherKey||qn(),n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync}):await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Yn(e,{relative:t}={}){let{basename:n}=x.useContext(ot),r=x.useContext(ct);E(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...wt(e||`.`,{relative:t})},o=_t();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:ze([n,a.pathname])),A(a)}var Xn=`react-router-scroll-positions`,Zn={};function Qn(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:je(e.pathname,n)||e.pathname},t)),i??=e.key,i}function $n({getKey:e,storageKey:t}={}){let{router:n}=Un(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Wn(`useScrollRestoration`),{basename:a}=x.useContext(ot),o=_t(),s=Vt(),c=Bt();x.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),er(x.useCallback(()=>{if(c.state===`idle`){let t=Qn(o,s,a,e);Zn[t]=window.scrollY}try{sessionStorage.setItem(t||Xn,JSON.stringify(Zn))}catch(e){D(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(x.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Xn);e&&(Zn=JSON.parse(e))}catch{}},[t]),x.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Zn,()=>window.scrollY,e?(t,n)=>Qn(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),x.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{D(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function er(e,t){let{capture:n}=t||{};x.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function tr(e,{relative:t}={}){let n=x.useContext(rt);E(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Un(`useViewTransitionState`),i=wt(e,{relative:t});if(!n.isTransitioning)return!1;let a=je(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=je(n.nextLocation.pathname,r)||n.nextLocation.pathname;return De(i.pathname,o)!=null||De(i.pathname,a)!=null}function nr(e,t){return function(){return e.apply(t,arguments)}}var{toString:rr}=Object.prototype,{getPrototypeOf:ir}=Object,{iterator:ar,toStringTag:or}=Symbol,sr=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),cr=(e,t)=>{let n=e,r=[];for(;n!=null&&n!==Object.prototype;){if(r.indexOf(n)!==-1)return!1;if(r.push(n),sr(n,t))return!0;n=ir(n)}return!1},lr=(e,t)=>e!=null&&cr(e,t)?e[t]:void 0,ur=(e=>t=>{let n=rr.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),dr=e=>(e=e.toLowerCase(),t=>ur(t)===e),fr=e=>t=>typeof t===e,{isArray:pr}=Array,mr=fr(`undefined`);function hr(e){return e!==null&&!mr(e)&&e.constructor!==null&&!mr(e.constructor)&&yr(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}var gr=dr(`ArrayBuffer`);function _r(e){let t;return t=typeof ArrayBuffer<`u`&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&gr(e.buffer),t}var vr=fr(`string`),yr=fr(`function`),br=fr(`number`),xr=e=>typeof e==`object`&&!!e,Sr=e=>e===!0||e===!1,Cr=e=>{if(!xr(e))return!1;let t=ir(e);return(t===null||t===Object.prototype||ir(t)===null)&&!cr(e,or)&&!cr(e,ar)},wr=e=>{if(!xr(e)||hr(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Tr=dr(`Date`),Er=dr(`File`),Dr=e=>!!(e&&e.uri!==void 0),Or=e=>e&&e.getParts!==void 0,kr=dr(`Blob`),Ar=dr(`FileList`),jr=e=>xr(e)&&yr(e.pipe);function Mr(){return typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}}var Nr=Mr(),Pr=Nr.FormData===void 0?void 0:Nr.FormData,Fr=e=>{if(!e)return!1;if(Pr&&e instanceof Pr)return!0;let t=ir(e);if(!t||t===Object.prototype||!yr(e.append))return!1;let n=ur(e);return n===`formdata`||n===`object`&&yr(e.toString)&&e.toString()===`[object FormData]`},Ir=dr(`URLSearchParams`),[Lr,Rr,zr,Br]=[`ReadableStream`,`Request`,`Response`,`Headers`].map(dr),Vr=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,``);function Hr(e,t,{allOwnKeys:n=!1}={}){if(e==null)return;let r,i;if(typeof e!=`object`&&(e=[e]),pr(e))for(r=0,i=e.length;r<i;r++)t.call(null,e[r],r,e);else{if(hr(e))return;let i=n?Object.getOwnPropertyNames(e):Object.keys(e),a=i.length,o;for(r=0;r<a;r++)o=i[r],t.call(null,e[o],o,e)}}function Ur(e,t){if(hr(e))return null;t=t.toLowerCase();let n=Object.keys(e),r=n.length,i;for(;r-->0;)if(i=n[r],t===i.toLowerCase())return i;return null}var Wr=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:global,Gr=e=>!mr(e)&&e!==Wr;function Kr(...e){let{caseless:t,skipUndefined:n}=Gr(this)&&this||{},r={},i=(e,i)=>{if(i===`__proto__`||i===`constructor`||i===`prototype`)return;let a=t&&typeof i==`string`&&Ur(r,i)||i,o=sr(r,a)?r[a]:void 0;Cr(o)&&Cr(e)?r[a]=Kr(o,e):Cr(e)?r[a]=Kr({},e):pr(e)?r[a]=e.slice():(!n||!mr(e))&&(r[a]=e)};for(let t=0,n=e.length;t<n;t++){let n=e[t];if(!n||hr(n)||(Hr(n,i),typeof n!=`object`||pr(n)))continue;let r=Object.getOwnPropertySymbols(n);for(let e=0;e<r.length;e++){let t=r[e];ii.call(n,t)&&i(n[t],t)}}return r}var qr=(e,t,n,{allOwnKeys:r}={})=>(Hr(t,(t,r)=>{n&&yr(t)?Object.defineProperty(e,r,{__proto__:null,value:nr(t,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,r,{__proto__:null,value:t,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),Jr=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Yr=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,"constructor",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{__proto__:null,value:t.prototype}),n&&Object.assign(e.prototype,n)},Xr=(e,t,n,r)=>{let i,a,o,s={};if(t||={},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),a=i.length;a-->0;)o=i[a],(!r||r(o,e,t))&&!s[o]&&(t[o]=e[o],s[o]=!0);e=n!==!1&&ir(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Zr=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;let r=e.indexOf(t,n);return r!==-1&&r===n},Qr=e=>{if(!e)return null;if(pr(e))return e;let t=e.length;if(!br(t))return null;let n=Array(t);for(;t-->0;)n[t]=e[t];return n},$r=(e=>t=>e&&t instanceof e)(typeof Uint8Array<`u`&&ir(Uint8Array)),ei=(e,t)=>{let n=(e&&e[ar]).call(e),r;for(;(r=n.next())&&!r.done;){let n=r.value;t.call(e,n[0],n[1])}},ti=(e,t)=>{let n,r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},ni=dr(`HTMLFormElement`),ri=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(e,t,n){return t.toUpperCase()+n}),{propertyIsEnumerable:ii}=Object.prototype,ai=dr(`RegExp`),oi=(e,t)=>{let n=Object.getOwnPropertyDescriptors(e),r={};Hr(n,(n,i)=>{let a;(a=t(n,i,e))!==!1&&(r[i]=a||n)}),Object.defineProperties(e,r)},si=e=>{oi(e,(t,n)=>{if(yr(e)&&[`arguments`,`caller`,`callee`].includes(n))return!1;let r=e[n];if(yr(r)){if(t.enumerable=!1,`writable`in t){t.writable=!1;return}t.set||=()=>{throw Error(`Can not rewrite read-only method '`+n+`'`)}}})},ci=(e,t)=>{let n={},r=e=>{e.forEach(e=>{n[e]=!0})};return pr(e)?r(e):r(String(e).split(t)),n},li=()=>{},ui=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function di(e){return!!(e&&yr(e.append)&&e[or]===`FormData`&&e[ar])}var fi=e=>{let t=new WeakSet,n=e=>{if(xr(e)){if(t.has(e))return;if(hr(e))return e;if(!(`toJSON`in e)){t.add(e);let r=pr(e)?[]:{};return Hr(e,(e,t)=>{let i=n(e);!mr(i)&&(r[t]=i)}),t.delete(e),r}}return e};return n(e)},pi=dr(`AsyncFunction`),mi=e=>e&&(xr(e)||yr(e))&&yr(e.then)&&yr(e.catch),hi=((e,t)=>e?setImmediate:t?((e,t)=>(Wr.addEventListener(`message`,({source:n,data:r})=>{n===Wr&&r===e&&t.length&&t.shift()()},!1),n=>{t.push(n),Wr.postMessage(e,`*`)}))(`axios@${Math.random()}`,[]):e=>setTimeout(e))(typeof setImmediate==`function`,yr(Wr.postMessage)),gi=typeof queueMicrotask<`u`?queueMicrotask.bind(Wr):typeof process<`u`&&process.nextTick||hi,_i=e=>e!=null&&yr(e[ar]),F={isArray:pr,isArrayBuffer:gr,isBuffer:hr,isFormData:Fr,isArrayBufferView:_r,isString:vr,isNumber:br,isBoolean:Sr,isObject:xr,isPlainObject:Cr,isEmptyObject:wr,isReadableStream:Lr,isRequest:Rr,isResponse:zr,isHeaders:Br,isUndefined:mr,isDate:Tr,isFile:Er,isReactNativeBlob:Dr,isReactNative:Or,isBlob:kr,isRegExp:ai,isFunction:yr,isStream:jr,isURLSearchParams:Ir,isTypedArray:$r,isFileList:Ar,forEach:Hr,merge:Kr,extend:qr,trim:Vr,stripBOM:Jr,inherits:Yr,toFlatObject:Xr,kindOf:ur,kindOfTest:dr,endsWith:Zr,toArray:Qr,forEachEntry:ei,matchAll:ti,isHTMLForm:ni,hasOwnProperty:sr,hasOwnProp:sr,hasOwnInPrototypeChain:cr,getSafeProp:lr,reduceDescriptors:oi,freezeMethods:si,toObjectSet:ci,toCamelCase:ri,noop:li,toFiniteNumber:ui,findKey:Ur,global:Wr,isContextDefined:Gr,isSpecCompliantForm:di,toJSONObject:fi,isAsyncFn:pi,isThenable:mi,setImmediate:hi,asap:gi,isIterable:_i,isSafeIterable:e=>e!=null&&cr(e,ar)&&_i(e)},vi=F.toObjectSet([`age`,`authorization`,`content-length`,`content-type`,`etag`,`expires`,`from`,`host`,`if-modified-since`,`if-unmodified-since`,`last-modified`,`location`,`max-forwards`,`proxy-authorization`,`referer`,`retry-after`,`user-agent`]),yi=e=>{let t={},n,r,i;return e&&e.split(`
`).forEach(function(e){i=e.indexOf(`:`),n=e.substring(0,i).trim().toLowerCase(),r=e.substring(i+1).trim(),!(!n||t[n]&&vi[n])&&(n===`set-cookie`?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+`, `+r:r)}),t};function bi(e){let t=0,n=e.length;for(;t<n;){let n=e.charCodeAt(t);if(n!==9&&n!==32)break;t+=1}for(;n>t;){let t=e.charCodeAt(n-1);if(t!==9&&t!==32)break;--n}return t===0&&n===e.length?e:e.slice(t,n)}var xi=RegExp(`[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+`,`g`),Si=RegExp(`[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+`,`g`);function Ci(e,t){return F.isArray(e)?e.map(e=>Ci(e,t)):bi(String(e).replace(t,``))}var wi=e=>Ci(e,xi),Ti=e=>Ci(e,Si);function Ei(e){let t=Object.create(null);return F.forEach(e.toJSON(),(e,n)=>{t[n]=Ti(e)}),t}var Di=Symbol(`internals`);function Oi(e){return e&&String(e).trim().toLowerCase()}function ki(e){return e===!1||e==null?e:F.isArray(e)?e.map(ki):wi(String(e))}function Ai(e){let t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g,r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}var ji=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Mi(e,t,n,r,i){if(F.isFunction(r))return r.call(this,t,n);if(i&&(t=n),F.isString(t)){if(F.isString(r))return t.indexOf(r)!==-1;if(F.isRegExp(r))return r.test(t)}}function Ni(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,n)=>t.toUpperCase()+n)}function Pi(e,t){let n=F.toCamelCase(` `+t);[`get`,`set`,`has`].forEach(r=>{Object.defineProperty(e,r+n,{__proto__:null,value:function(e,n,i){return this[r].call(this,t,e,n,i)},configurable:!0})})}var Fi=class{constructor(e){e&&this.set(e)}set(e,t,n){let r=this;function i(e,t,n){let i=Oi(t);if(!i)return;let a=F.findKey(r,i);(!a||r[a]===void 0||n===!0||n===void 0&&r[a]!==!1)&&(r[a||t]=ki(e))}let a=(e,t)=>F.forEach(e,(e,n)=>i(e,n,t));if(F.isPlainObject(e)||e instanceof this.constructor)a(e,t);else if(F.isString(e)&&(e=e.trim())&&!ji(e))a(yi(e),t);else if(F.isObject(e)&&F.isSafeIterable(e)){let n=Object.create(null),r,i;for(let t of e){if(!F.isArray(t))throw TypeError(`Object iterator must return a key-value pair`);i=t[0],F.hasOwnProp(n,i)?(r=n[i],n[i]=F.isArray(r)?[...r,t[1]]:[r,t[1]]):n[i]=t[1]}a(n,t)}else e!=null&&i(t,e,n);return this}get(e,t){if(e=Oi(e),e){let n=F.findKey(this,e);if(n){let e=this[n];if(!t)return e;if(t===!0)return Ai(e);if(F.isFunction(t))return t.call(this,e,n);if(F.isRegExp(t))return t.exec(e);throw TypeError(`parser must be boolean|regexp|function`)}}}has(e,t){if(e=Oi(e),e){let n=F.findKey(this,e);return!!(n&&this[n]!==void 0&&(!t||Mi(this,this[n],n,t)))}return!1}delete(e,t){let n=this,r=!1;function i(e){if(e=Oi(e),e){let i=F.findKey(n,e);i&&(!t||Mi(n,n[i],i,t))&&(delete n[i],r=!0)}}return F.isArray(e)?e.forEach(i):i(e),r}clear(e){let t=Object.keys(this),n=t.length,r=!1;for(;n--;){let i=t[n];(!e||Mi(this,this[i],i,e,!0))&&(delete this[i],r=!0)}return r}normalize(e){let t=this,n={};return F.forEach(this,(r,i)=>{let a=F.findKey(n,i);if(a){t[a]=ki(r),delete t[i];return}let o=e?Ni(i):String(i).trim();o!==i&&delete t[i],t[o]=ki(r),n[o]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){let t=Object.create(null);return F.forEach(this,(n,r)=>{n!=null&&n!==!1&&(t[r]=e&&F.isArray(n)?n.join(`, `):n)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+`: `+t).join(`
`)}getSetCookie(){return this.get(`set-cookie`)||[]}get[Symbol.toStringTag](){return`AxiosHeaders`}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){let n=new this(e);return t.forEach(e=>n.set(e)),n}static accessor(e){let t=(this[Di]=this[Di]={accessors:{}}).accessors,n=this.prototype;function r(e){let r=Oi(e);t[r]||(Pi(n,e),t[r]=!0)}return F.isArray(e)?e.forEach(r):r(e),this}};Fi.accessor([`Content-Type`,`Content-Length`,`Accept`,`Accept-Encoding`,`User-Agent`,`Authorization`]),F.reduceDescriptors(Fi.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(e){this[n]=e}}}),F.freezeMethods(Fi);var Ii=`[REDACTED ****]`;function I(e){if(F.hasOwnProp(e,`toJSON`))return!0;let t=Object.getPrototypeOf(e);for(;t&&t!==Object.prototype;){if(F.hasOwnProp(t,`toJSON`))return!0;t=Object.getPrototypeOf(t)}return!1}function L(e,t){let n=new Set(t.map(e=>String(e).toLowerCase())),r=[],i=e=>{if(typeof e!=`object`||!e||F.isBuffer(e))return e;if(r.indexOf(e)!==-1)return;e instanceof Fi&&(e=e.toJSON()),r.push(e);let t;if(F.isArray(e))t=[],e.forEach((e,n)=>{let r=i(e);F.isUndefined(r)||(t[n]=r)});else{if(!F.isPlainObject(e)&&I(e))return r.pop(),e;t=Object.create(null);for(let[r,a]of Object.entries(e)){let e=n.has(r.toLowerCase())?Ii:i(a);F.isUndefined(e)||(t[r]=e)}}return r.pop(),t};return i(e)}var R=class e extends Error{static from(t,n,r,i,a,o){let s=new e(t.message,n||t.code,r,i,a);return Object.defineProperty(s,"cause",{__proto__:null,value:t,writable:!0,enumerable:!1,configurable:!0}),s.name=t.name,t.status!=null&&s.status==null&&(s.status=t.status),o&&Object.assign(s,o),s}constructor(e,t,n,r,i){super(e),Object.defineProperty(this,"message",{__proto__:null,value:e,enumerable:!0,writable:!0,configurable:!0}),this.name=`AxiosError`,this.isAxiosError=!0,t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),i&&(this.response=i,this.status=i.status)}toJSON(){let e=this.config,t=e&&F.hasOwnProp(e,`redact`)?e.redact:void 0,n=F.isArray(t)&&t.length>0?L(e,t):F.toJSONObject(e);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:n,code:this.code,status:this.status}}};R.ERR_BAD_OPTION_VALUE=`ERR_BAD_OPTION_VALUE`,R.ERR_BAD_OPTION=`ERR_BAD_OPTION`,R.ECONNABORTED=`ECONNABORTED`,R.ETIMEDOUT=`ETIMEDOUT`,R.ECONNREFUSED=`ECONNREFUSED`,R.ERR_NETWORK=`ERR_NETWORK`,R.ERR_FR_TOO_MANY_REDIRECTS=`ERR_FR_TOO_MANY_REDIRECTS`,R.ERR_DEPRECATED=`ERR_DEPRECATED`,R.ERR_BAD_RESPONSE=`ERR_BAD_RESPONSE`,R.ERR_BAD_REQUEST=`ERR_BAD_REQUEST`,R.ERR_CANCELED=`ERR_CANCELED`,R.ERR_NOT_SUPPORT=`ERR_NOT_SUPPORT`,R.ERR_INVALID_URL=`ERR_INVALID_URL`,R.ERR_FORM_DATA_DEPTH_EXCEEDED=`ERR_FORM_DATA_DEPTH_EXCEEDED`;function Li(e){return F.isPlainObject(e)||F.isArray(e)}function Ri(e){return F.endsWith(e,`[]`)?e.slice(0,-2):e}function zi(e,t,n){return e?e.concat(t).map(function(e,t){return e=Ri(e),!n&&t?`[`+e+`]`:e}).join(n?`.`:``):t}function Bi(e){return F.isArray(e)&&!e.some(Li)}var Vi=F.toFlatObject(F,{},null,function(e){return/^is[A-Z]/.test(e)});function Hi(e,t,n){if(!F.isObject(e))throw TypeError(`target must be an object`);t||=new FormData,n=F.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(e,t){return!F.isUndefined(t[e])});let r=n.metaTokens,i=n.visitor||m,a=n.dots,o=n.indexes,s=n.Blob||typeof Blob<`u`&&Blob,c=n.maxDepth===void 0?100:n.maxDepth,l=s&&F.isSpecCompliantForm(t),u=[];if(!F.isFunction(i))throw TypeError(`visitor must be a function`);function d(e){if(e===null)return``;if(F.isDate(e))return e.toISOString();if(F.isBoolean(e))return e.toString();if(!l&&F.isBlob(e))throw new R(`Blob is not supported. Use a Buffer instead.`);if(F.isArrayBuffer(e)||F.isTypedArray(e)){if(l&&typeof s==`function`)return new s([e]);if(typeof Buffer<`u`)return Buffer.from(e);throw new R(`Blob is not supported. Use a Buffer instead.`,R.ERR_NOT_SUPPORT)}return e}function f(e){if(e>c)throw new R(`Object is too deeply nested (`+e+` levels). Max depth: `+c,R.ERR_FORM_DATA_DEPTH_EXCEEDED)}function p(e,t){if(c===1/0)return JSON.stringify(e);let n=[];return JSON.stringify(e,function(e,r){if(!F.isObject(r))return r;for(;n.length&&n[n.length-1]!==this;)n.pop();return n.push(r),f(t+n.length-1),r})}function m(e,n,i){let s=e;if(F.isReactNative(t)&&F.isReactNativeBlob(e))return t.append(zi(i,n,a),d(e)),!1;if(e&&!i&&typeof e==`object`){if(F.endsWith(n,`{}`))n=r?n:n.slice(0,-2),e=p(e,1);else if(F.isArray(e)&&Bi(e)||(F.isFileList(e)||F.endsWith(n,`[]`))&&(s=F.toArray(e)))return n=Ri(n),s.forEach(function(e,r){!(F.isUndefined(e)||e===null)&&t.append(o===!0?zi([n],r,a):o===null?n:n+`[]`,d(e))}),!1}return Li(e)?!0:(t.append(zi(i,n,a),d(e)),!1)}let h=Object.assign(Vi,{defaultVisitor:m,convertValue:d,isVisitable:Li});function g(e,n,r=0){if(!F.isUndefined(e)){if(f(r),u.indexOf(e)!==-1)throw Error(`Circular reference detected in `+n.join(`.`));u.push(e),F.forEach(e,function(e,a){(!(F.isUndefined(e)||e===null)&&i.call(t,e,F.isString(a)?a.trim():a,n,h))===!0&&g(e,n?n.concat(a):[a],r+1)}),u.pop()}}if(!F.isObject(e))throw TypeError(`data must be an object`);return g(e),t}function Ui(e){let t={"!":`%21`,"'":`%27`,"(":`%28`,")":`%29`,"~":`%7E`,"%20":`+`};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(e){return t[e]})}function Wi(e,t){this._pairs=[],e&&Hi(e,this,t)}var Gi=Wi.prototype;Gi.append=function(e,t){this._pairs.push([e,t])},Gi.toString=function(e){let t=e?t=>e.call(this,t,Ui):Ui;return this._pairs.map(function(e){return t(e[0])+`=`+t(e[1])},``).join(`&`)};function Ki(e){return encodeURIComponent(e).replace(/%3A/gi,`:`).replace(/%24/g,`$`).replace(/%2C/gi,`,`).replace(/%20/g,`+`)}function qi(e,t,n){if(!t)return e;e||=``;let r=F.isFunction(n)?{serialize:n}:n,i=F.getSafeProp(r,`encode`)||Ki,a=F.getSafeProp(r,`serialize`),o;if(o=a?a(t,r):F.isURLSearchParams(t)?t.toString():new Wi(t,r).toString(i),o){let t=e.indexOf(`#`);t!==-1&&(e=e.slice(0,t)),e+=(e.indexOf(`?`)===-1?`?`:`&`)+o}return e}var Ji=class{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&=[]}forEach(e){F.forEach(this.handlers,function(t){t!==null&&e(t)})}},Yi={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0,advertiseZstdAcceptEncoding:!1,validateStatusUndefinedResolves:!0},Xi={isBrowser:!0,classes:{URLSearchParams:typeof URLSearchParams<`u`?URLSearchParams:Wi,FormData:typeof FormData<`u`?FormData:null,Blob:typeof Blob<`u`?Blob:null},protocols:[`http`,`https`,`file`,`blob`,`url`,`data`]},Zi=s({hasBrowserEnv:()=>Qi,hasStandardBrowserEnv:()=>ea,hasStandardBrowserWebWorkerEnv:()=>ta,navigator:()=>$i,origin:()=>na}),Qi=typeof window<`u`&&typeof document<`u`,$i=typeof navigator==`object`&&navigator||void 0,ea=Qi&&(!$i||[`ReactNative`,`NativeScript`,`NS`].indexOf($i.product)<0),ta=typeof WorkerGlobalScope<`u`&&self instanceof WorkerGlobalScope&&typeof self.importScripts==`function`,na=Qi&&window.location.href||`http://localhost`,ra={...Zi,...Xi};function ia(e,t){return Hi(e,new ra.classes.URLSearchParams,{visitor:function(e,t,n,r){return ra.isNode&&F.isBuffer(e)?(this.append(t,e.toString(`base64`)),!1):r.defaultVisitor.apply(this,arguments)},...t})}var aa=100;function oa(e){if(e>aa)throw new R(`FormData field is too deeply nested (`+e+` levels). Max depth: `+aa,R.ERR_FORM_DATA_DEPTH_EXCEEDED)}function sa(e){let t=[],n=/\w+|\[(\w*)]/g,r;for(;(r=n.exec(e))!==null;)oa(t.length),t.push(r[0]===`[]`?``:r[1]||r[0]);return t}function ca(e){let t={},n=Object.keys(e),r,i=n.length,a;for(r=0;r<i;r++)a=n[r],t[a]=e[a];return t}function la(e){function t(e,n,r,i){oa(i);let a=e[i++];if(a===`__proto__`)return!0;let o=Number.isFinite(+a),s=i>=e.length;return a=!a&&F.isArray(r)?r.length:a,s?(F.hasOwnProp(r,a)?r[a]=F.isArray(r[a])?r[a].concat(n):[r[a],n]:r[a]=n,!o):((!F.hasOwnProp(r,a)||!F.isObject(r[a]))&&(r[a]=[]),t(e,n,r[a],i)&&F.isArray(r[a])&&(r[a]=ca(r[a])),!o)}if(F.isFormData(e)&&F.isFunction(e.entries)){let n={};return F.forEachEntry(e,(e,r)=>{t(sa(e),r,n,0)}),n}return null}var ua=(e,t)=>e!=null&&F.hasOwnProp(e,t)?e[t]:void 0;function da(e,t,n){if(F.isString(e))try{return(t||JSON.parse)(e),F.trim(e)}catch(e){if(e.name!==`SyntaxError`)throw e}return(n||JSON.stringify)(e)}var fa={transitional:Yi,adapter:[`xhr`,`http`,`fetch`],transformRequest:[function(e,t){let n=t.getContentType()||``,r=n.indexOf(`application/json`)>-1,i=F.isObject(e);if(i&&F.isHTMLForm(e)&&(e=new FormData(e)),F.isFormData(e))return r?JSON.stringify(la(e)):e;if(F.isArrayBuffer(e)||F.isBuffer(e)||F.isStream(e)||F.isFile(e)||F.isBlob(e)||F.isReadableStream(e))return e;if(F.isArrayBufferView(e))return e.buffer;if(F.isURLSearchParams(e))return t.setContentType(`application/x-www-form-urlencoded;charset=utf-8`,!1),e.toString();let a;if(i){let t=ua(this,`formSerializer`);if(n.indexOf(`application/x-www-form-urlencoded`)>-1)return ia(e,t).toString();if((a=F.isFileList(e))||n.indexOf(`multipart/form-data`)>-1){let n=ua(this,`env`),r=n&&n.FormData;return Hi(a?{"files[]":e}:e,r&&new r,t)}}return i||r?(t.setContentType(`application/json`,!1),da(e)):e}],transformResponse:[function(e){let t=ua(this,`transitional`)||fa.transitional,n=t&&t.forcedJSONParsing,r=ua(this,`responseType`),i=r===`json`;if(F.isResponse(e)||F.isReadableStream(e))return e;if(e&&F.isString(e)&&(n&&!r||i)){let n=!(t&&t.silentJSONParsing)&&i;try{return JSON.parse(e,ua(this,`parseReviver`))}catch(e){if(n)throw e.name===`SyntaxError`?R.from(e,R.ERR_BAD_RESPONSE,this,null,ua(this,`response`)):e}}return e}],timeout:0,xsrfCookieName:`XSRF-TOKEN`,xsrfHeaderName:`X-XSRF-TOKEN`,maxContentLength:-1,maxBodyLength:-1,env:{FormData:ra.classes.FormData,Blob:ra.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:`application/json, text/plain, */*`,"Content-Type":void 0}}};F.forEach([`delete`,`get`,`head`,`post`,`put`,`patch`,`query`],e=>{fa.headers[e]={}});function pa(e,t){let n=this||fa,r=t||n,i=Fi.from(r.headers),a=r.data;return F.forEach(e,function(e){a=e.call(n,a,i.normalize(),t?t.status:void 0)}),i.normalize(),a}function ma(e){return!!(e&&e.__CANCEL__)}var ha=class extends R{constructor(e,t,n){super(e??`canceled`,R.ERR_CANCELED,t,n),this.name=`CanceledError`,this.__CANCEL__=!0}};function ga(e,t,n){let r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new R(`Request failed with status code `+n.status,n.status>=400&&n.status<500?R.ERR_BAD_REQUEST:R.ERR_BAD_RESPONSE,n.config,n.request,n))}function _a(e){let t=/^([-+\w]{1,25}):(?:\/\/)?/.exec(e);return t&&t[1]||``}function va(e,t){e||=10;let n=Array(e),r=Array(e),i=0,a=0,o;return t=t===void 0?1e3:t,function(s){let c=Date.now(),l=r[a];o||=c,n[i]=s,r[i]=c;let u=a,d=0;for(;u!==i;)d+=n[u++],u%=e;if(i=(i+1)%e,i===a&&(a=(a+1)%e),c-o<t)return;let f=l&&c-l;return f?Math.round(d*1e3/f):void 0}}function ya(e,t){let n=0,r=1e3/t,i,a,o=(t,r=Date.now())=>{n=r,i=null,a&&=(clearTimeout(a),null),e(...t)};return[(...e)=>{let t=Date.now(),s=t-n;s>=r?o(e,t):(i=e,a||=setTimeout(()=>{a=null,o(i)},r-s))},()=>i&&o(i)]}var ba=(e,t,n=3)=>{let r=0,i=va(50,250);return ya(n=>{if(!n||typeof n.loaded!=`number`)return;let a=n.loaded,o=n.lengthComputable?n.total:void 0,s=o==null?a:Math.min(a,o),c=Math.max(0,s-r),l=i(c);r=Math.max(r,s),e({loaded:s,total:o,progress:o?s/o:void 0,bytes:c,rate:l||void 0,estimated:l&&o?(o-s)/l:void 0,event:n,lengthComputable:o!=null,[t?`download`:`upload`]:!0})},n)},xa=(e,t)=>{let n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},Sa=e=>(...t)=>F.asap(()=>e(...t)),Ca=ra.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,ra.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(ra.origin),ra.navigator&&/(msie|trident)/i.test(ra.navigator.userAgent)):()=>!0,wa=ra.hasStandardBrowserEnv?{write(e,t,n,r,i,a,o){if(typeof document>`u`)return;let s=[`${e}=${encodeURIComponent(t)}`];F.isNumber(n)&&s.push(`expires=${new Date(n).toUTCString()}`),F.isString(r)&&s.push(`path=${r}`),F.isString(i)&&s.push(`domain=${i}`),a===!0&&s.push(`secure`),F.isString(o)&&s.push(`SameSite=${o}`),document.cookie=s.join(`; `)},read(e){if(typeof document>`u`)return null;let t=document.cookie.split(`;`);for(let n=0;n<t.length;n++){let r=t[n].replace(/^\s+/,``),i=r.indexOf(`=`);if(i!==-1&&r.slice(0,i)===e)try{return decodeURIComponent(r.slice(i+1))}catch{return r.slice(i+1)}}return null},remove(e){this.write(e,``,Date.now()-864e5,`/`)}}:{write(){},read(){return null},remove(){}};function Ta(e){return typeof e==`string`?/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e):!1}function Ea(e,t){return t?e.replace(/\/?\/$/,``)+`/`+t.replace(/^\/+/,``):e}var Da=/^https?:(?!\/\/)/i,Oa=/[\t\n\r]/g;function ka(e){let t=0;for(;t<e.length&&e.charCodeAt(t)<=32;)t++;return e.slice(t)}function Aa(e){return ka(e).replace(Oa,``)}function ja(e,t){if(typeof e==`string`&&Da.test(Aa(e)))throw new R(`Invalid URL: missing "//" after protocol`,R.ERR_INVALID_URL,t)}function Ma(e,t,n,r){ja(t,r);let i=!Ta(t);return e&&(i||n===!1)?(ja(e,r),Ea(e,t)):t}var Na=e=>e instanceof Fi?{...e}:e;function Pa(e,t){e||={},t||={};let n=Object.create(null);Object.defineProperty(n,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function r(e,t,n,r){return F.isPlainObject(e)&&F.isPlainObject(t)?F.merge.call({caseless:r},e,t):F.isPlainObject(t)?F.merge({},t):F.isArray(t)?t.slice():t}function i(e,t,n,i){if(!F.isUndefined(t))return r(e,t,n,i);if(!F.isUndefined(e))return r(void 0,e,n,i)}function a(e,t){if(!F.isUndefined(t))return r(void 0,t)}function o(e,t){if(!F.isUndefined(t))return r(void 0,t);if(!F.isUndefined(e))return r(void 0,e)}function s(n){let r=F.hasOwnProp(t,`transitional`)?t.transitional:void 0;if(!F.isUndefined(r))if(F.isPlainObject(r)){if(F.hasOwnProp(r,n))return r[n]}else return;let i=F.hasOwnProp(e,`transitional`)?e.transitional:void 0;if(F.isPlainObject(i)&&F.hasOwnProp(i,n))return i[n]}function c(n,i,a){if(F.hasOwnProp(t,a))return r(n,i);if(F.hasOwnProp(e,a))return r(void 0,n)}let l={url:a,method:a,data:a,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,allowedSocketPaths:o,responseEncoding:o,validateStatus:c,headers:(e,t,n)=>i(Na(e),Na(t),n,!0)};return F.forEach(Object.keys({...e,...t}),function(r){if(r===`__proto__`||r===`constructor`||r===`prototype`)return;let a=F.hasOwnProp(l,r)?l[r]:i,o=a(F.hasOwnProp(e,r)?e[r]:void 0,F.hasOwnProp(t,r)?t[r]:void 0,r);F.isUndefined(o)&&a!==c||(n[r]=o)}),F.hasOwnProp(t,`validateStatus`)&&F.isUndefined(t.validateStatus)&&s(`validateStatusUndefinedResolves`)===!1&&(F.hasOwnProp(e,`validateStatus`)?n.validateStatus=r(void 0,e.validateStatus):delete n.validateStatus),n}var Fa=[`content-type`,`content-length`];function Ia(e,t,n){if(n!==`content-only`){e.set(t);return}Object.entries(t||{}).forEach(([t,n])=>{Fa.includes(t.toLowerCase())&&e.set(t,n)})}var La=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16)));function Ra(e){let t=Pa({},e),n=e=>F.hasOwnProp(t,e)?t[e]:void 0,r=n(`data`),i=n(`withXSRFToken`),a=n(`xsrfHeaderName`),o=n(`xsrfCookieName`),s=n(`headers`),c=n(`auth`),l=n(`baseURL`),u=n(`allowAbsoluteUrls`),d=n(`url`);if(t.headers=s=Fi.from(s),t.url=qi(Ma(l,d,u,t),n(`params`),n(`paramsSerializer`)),c){let t=F.getSafeProp(c,`username`)||``,n=F.getSafeProp(c,`password`)||``;try{s.set(`Authorization`,`Basic `+btoa(t+`:`+(n?La(n):``)))}catch(t){throw R.from(t,R.ERR_BAD_OPTION_VALUE,e)}}if(F.isFormData(r)&&(ra.hasStandardBrowserEnv||ra.hasStandardBrowserWebWorkerEnv||F.isReactNative(r)?s.setContentType(void 0):F.isFunction(r.getHeaders)&&Ia(s,r.getHeaders(),n(`formDataHeaderPolicy`))),ra.hasStandardBrowserEnv&&(F.isFunction(i)&&(i=i(t)),i===!0||i==null&&Ca(t.url))){let e=a&&o&&wa.read(o);e&&s.set(a,e)}return t}var za=typeof XMLHttpRequest<`u`&&function(e){return new Promise(function(t,n){let r=Ra(e),i=r.data,a=Fi.from(r.headers).normalize(),{responseType:o,onUploadProgress:s,onDownloadProgress:c}=r,l,u,d,f,p;function m(){f&&f(),p&&p(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener(`abort`,l)}let h=new XMLHttpRequest;h.open(r.method.toUpperCase(),r.url,!0),h.timeout=r.timeout;function g(){if(!h)return;let r=Fi.from(`getAllResponseHeaders`in h&&h.getAllResponseHeaders());ga(function(e){t(e),m()},function(e){n(e),m()},{data:!o||o===`text`||o===`json`?h.responseText:h.response,status:h.status,statusText:h.statusText,headers:r,config:e,request:h}),h=null}`onloadend`in h?h.onloadend=g:h.onreadystatechange=function(){!h||h.readyState!==4||h.status===0&&!(h.responseURL&&h.responseURL.startsWith(`file:`))||setTimeout(g)},h.onabort=function(){h&&=(n(new R(`Request aborted`,R.ECONNABORTED,e,h)),m(),null)},h.onerror=function(t){let r=new R(t&&t.message?t.message:`Network Error`,R.ERR_NETWORK,e,h);r.event=t||null,n(r),m(),h=null},h.ontimeout=function(){let t=r.timeout?`timeout of `+r.timeout+`ms exceeded`:`timeout exceeded`,i=r.transitional||Yi;r.timeoutErrorMessage&&(t=r.timeoutErrorMessage),n(new R(t,i.clarifyTimeoutError?R.ETIMEDOUT:R.ECONNABORTED,e,h)),m(),h=null},i===void 0&&a.setContentType(null),`setRequestHeader`in h&&F.forEach(Ei(a),function(e,t){h.setRequestHeader(t,e)}),F.isUndefined(r.withCredentials)||(h.withCredentials=!!r.withCredentials),o&&o!==`json`&&(h.responseType=r.responseType),c&&([d,p]=ba(c,!0),h.addEventListener(`progress`,d)),s&&h.upload&&([u,f]=ba(s),h.upload.addEventListener(`progress`,u),h.upload.addEventListener(`loadend`,f)),(r.cancelToken||r.signal)&&(l=t=>{h&&=(n(!t||t.type?new ha(null,e,h):t),h.abort(),m(),null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener(`abort`,l)));let _=_a(r.url);if(_&&!ra.protocols.includes(_)){n(new R(`Unsupported protocol `+_+`:`,R.ERR_BAD_REQUEST,e)),m();return}h.send(i||null)})},Ba=(e,t)=>{if(e=e?e.filter(Boolean):[],!t&&!e.length)return;let n=new AbortController,r=!1,i=function(e){if(!r){r=!0,o();let t=e instanceof Error?e:this.reason;n.abort(t instanceof R?t:new ha(t instanceof Error?t.message:t))}},a=t&&setTimeout(()=>{a=null,i(new R(`timeout of ${t}ms exceeded`,R.ETIMEDOUT))},t),o=()=>{e&&=(a&&clearTimeout(a),a=null,e.forEach(e=>{e.unsubscribe?e.unsubscribe(i):e.removeEventListener(`abort`,i)}),null)};e.forEach(e=>e.addEventListener(`abort`,i,{once:!0}));let{signal:s}=n;return s.unsubscribe=()=>F.asap(o),s},Va=function*(e,t){let n=e.byteLength;if(!t||n<t){yield e;return}let r=0,i;for(;r<n;)i=r+t,yield e.slice(r,i),r=i},Ha=async function*(e,t){for await(let n of Ua(e))yield*Va(n,t)},Ua=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}let t=e.getReader();try{for(;;){let{done:e,value:n}=await t.read();if(e)break;yield n}}finally{await t.cancel()}},Wa=(e,t,n,r)=>{let i=Ha(e,t),a=0,o,s=e=>{o||(o=!0,r&&r(e))};return new ReadableStream({async pull(e){try{let{done:t,value:r}=await i.next();if(t){s(),e.close();return}let o=r.byteLength;n&&n(a+=o),e.enqueue(new Uint8Array(r))}catch(e){throw s(e),e}},cancel(e){return s(e),i.return()}},{highWaterMark:2})},Ga=e=>e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102,Ka=(e,t,n)=>t+2<n&&Ga(e.charCodeAt(t+1))&&Ga(e.charCodeAt(t+2));function qa(e){if(!e||typeof e!=`string`||!e.startsWith(`data:`))return 0;let t=e.indexOf(`,`);if(t<0)return 0;let n=e.slice(5,t),r=e.slice(t+1);if(/;base64/i.test(n)){let e=r.length,t=r.length;for(let n=0;n<t;n++)if(r.charCodeAt(n)===37&&n+2<t){let t=r.charCodeAt(n+1),i=r.charCodeAt(n+2);Ga(t)&&Ga(i)&&(e-=2,n+=2)}let n=0,i=t-1,a=e=>e>=2&&r.charCodeAt(e-2)===37&&r.charCodeAt(e-1)===51&&(r.charCodeAt(e)===68||r.charCodeAt(e)===100);i>=0&&(r.charCodeAt(i)===61?(n++,i--):a(i)&&(n++,i-=3)),n===1&&i>=0&&(r.charCodeAt(i)===61||a(i))&&n++;let o=Math.floor(e/4)*3-(n||0);return o>0?o:0}let i=0;for(let e=0,t=r.length;e<t;e++){let n=r.charCodeAt(e);if(n===37&&Ka(r,e,t))i+=1,e+=2;else if(n<128)i+=1;else if(n<2048)i+=2;else if(n>=55296&&n<=56319&&e+1<t){let t=r.charCodeAt(e+1);t>=56320&&t<=57343?(i+=4,e++):i+=3}else i+=3}return i}var Ja=`1.18.1`,Ya=64*1024,{isFunction:Xa}=F,Za=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16))),Qa=e=>{if(!F.isString(e))return e;try{return decodeURIComponent(e)}catch{return e}},$a=(e,...t)=>{try{return!!e(...t)}catch{return!1}},eo=e=>{let t=e.indexOf(`://`),n=e;return t!==-1&&(n=n.slice(t+3)),n.includes(`@`)||n.includes(`:`)},to=e=>{let t=F.global!==void 0&&F.global!==null?F.global:globalThis,{ReadableStream:n,TextEncoder:r}=t;e=F.merge.call({skipUndefined:!0},{Request:t.Request,Response:t.Response},e);let{fetch:i,Request:a,Response:o}=e,s=i?Xa(i):typeof fetch==`function`,c=Xa(a),l=Xa(o);if(!s)return!1;let u=s&&Xa(n),d=s&&(typeof r==`function`?(e=>t=>e.encode(t))(new r):async e=>new Uint8Array(await new a(e).arrayBuffer())),f=c&&u&&$a(()=>{let e=!1,t=new a(ra.origin,{body:new n,method:`POST`,get duplex(){return e=!0,`half`}}),r=t.headers.has(`Content-Type`);return t.body!=null&&t.body.cancel(),e&&!r}),p=l&&u&&$a(()=>F.isReadableStream(new o(``).body)),m={stream:p&&(e=>e.body)};s&&[`text`,`arrayBuffer`,`blob`,`formData`,`stream`].forEach(e=>{!m[e]&&(m[e]=(t,n)=>{let r=t&&t[e];if(r)return r.call(t);throw new R(`Response type '${e}' is not supported`,R.ERR_NOT_SUPPORT,n)})});let h=async e=>{if(e==null)return 0;if(F.isBlob(e))return e.size;if(F.isSpecCompliantForm(e))return(await new a(ra.origin,{method:`POST`,body:e}).arrayBuffer()).byteLength;if(F.isArrayBufferView(e)||F.isArrayBuffer(e))return e.byteLength;if(F.isURLSearchParams(e)&&(e+=``),F.isString(e))return(await d(e)).byteLength},g=async(e,t)=>F.toFiniteNumber(e.getContentLength())??h(t);return async e=>{let{url:t,method:n,data:s,signal:l,cancelToken:d,timeout:_,onDownloadProgress:v,onUploadProgress:y,responseType:b,headers:x,withCredentials:ee=`same-origin`,fetchOptions:S,maxContentLength:C,maxBodyLength:te}=Ra(e),w=F.isNumber(C)&&C>-1,ne=F.isNumber(te)&&te>-1,re=t=>F.hasOwnProp(e,t)?e[t]:void 0,ie=i||fetch;b=b?(b+``).toLowerCase():`text`;let ae=Ba([l,d&&d.toAbortSignal()],_),T=null,oe=ae&&ae.unsubscribe&&(()=>{ae.unsubscribe()}),E,D=null,se=()=>new R(`Request body larger than maxBodyLength limit`,R.ERR_BAD_REQUEST,e,T);try{let i,l=re(`auth`);if(l&&(i={username:F.getSafeProp(l,`username`)||``,password:F.getSafeProp(l,`password`)||``}),eo(t)){let e=new URL(t,ra.origin);!i&&(e.username||e.password)&&(i={username:Qa(e.username),password:Qa(e.password)}),(e.username||e.password)&&(e.username=``,e.password=``,t=e.href)}if(i&&(x.delete(`authorization`),x.set(`Authorization`,`Basic `+btoa(Za((i.username||``)+`:`+(i.password||``))))),w&&typeof t==`string`&&t.startsWith(`data:`)&&qa(t)>C)throw new R(`maxContentLength size of `+C+` exceeded`,R.ERR_BAD_RESPONSE,e,T);if(ne&&n!==`get`&&n!==`head`){let e=await h(s);if(typeof e==`number`&&isFinite(e)&&(E=e,e>te))throw se()}let d=ne&&(F.isReadableStream(s)||F.isStream(s)),_=(e,t,n)=>Wa(e,Ya,e=>{if(ne&&e>te)throw D=se();t&&t(e)},n);if(f&&n!==`get`&&n!==`head`&&(y||d)){if(E??=await g(x,s),E!==0||d){let e=new a(t,{method:`POST`,body:s,duplex:`half`}),n;if(F.isFormData(s)&&(n=e.headers.get(`content-type`))&&x.setContentType(n),e.body){let[t,n]=y&&xa(E,ba(Sa(y)))||[];s=_(e.body,t,n)}}}else if(d&&!c&&u&&n!==`get`&&n!==`head`)s=_(s);else if(d&&c&&!f&&n!==`get`&&n!==`head`)throw new R(`Stream request bodies are not supported by the current fetch implementation`,R.ERR_NOT_SUPPORT,e,T);F.isString(ee)||(ee=ee?`include`:`omit`);let O=c&&`credentials`in a.prototype;if(F.isFormData(s)){let e=x.getContentType();e&&/^multipart\/form-data/i.test(e)&&!/boundary=/i.test(e)&&x.delete(`content-type`)}x.set(`User-Agent`,`axios/`+Ja,!1);let k={...S,signal:ae,method:n.toUpperCase(),headers:Ei(x.normalize()),body:s,duplex:`half`,credentials:O?ee:void 0};T=c&&new a(t,k);let A=await(c?ie(T,S):ie(t,k)),ce=Fi.from(A.headers);if(w){let t=F.toFiniteNumber(ce.getContentLength());if(t!=null&&t>C)throw new R(`maxContentLength size of `+C+` exceeded`,R.ERR_BAD_RESPONSE,e,T)}let le=p&&(b===`stream`||b===`response`);if(p&&A.body&&(v||w||le&&oe)){let t={};[`status`,`statusText`,`headers`].forEach(e=>{t[e]=A[e]});let n=F.toFiniteNumber(ce.getContentLength()),[r,i]=v&&xa(n,ba(Sa(v),!0))||[],a=0;A=new o(Wa(A.body,Ya,t=>{if(w&&(a=t,a>C))throw new R(`maxContentLength size of `+C+` exceeded`,R.ERR_BAD_RESPONSE,e,T);r&&r(t)},()=>{i&&i(),oe&&oe()}),t)}b||=`text`;let ue=await m[F.findKey(m,b)||`text`](A,e);if(w&&!p&&!le){let t;if(ue!=null&&(typeof ue.byteLength==`number`?t=ue.byteLength:typeof ue.size==`number`?t=ue.size:typeof ue==`string`&&(t=typeof r==`function`?new r().encode(ue).byteLength:ue.length)),typeof t==`number`&&t>C)throw new R(`maxContentLength size of `+C+` exceeded`,R.ERR_BAD_RESPONSE,e,T)}return!le&&oe&&oe(),await new Promise((t,n)=>{ga(t,n,{data:ue,headers:Fi.from(A.headers),status:A.status,statusText:A.statusText,config:e,request:T})})}catch(t){if(oe&&oe(),ae&&ae.aborted&&ae.reason instanceof R){let n=ae.reason;throw n.config=e,T&&(n.request=T),t!==n&&Object.defineProperty(n,"cause",{__proto__:null,value:t,writable:!0,enumerable:!1,configurable:!0}),n}if(D)throw T&&!D.request&&(D.request=T),D;if(t instanceof R)throw T&&!t.request&&(t.request=T),t;if(t&&t.name===`TypeError`&&/Load failed|fetch/i.test(t.message)){let n=new R(`Network Error`,R.ERR_NETWORK,e,T,t&&t.response);throw Object.defineProperty(n,"cause",{__proto__:null,value:t.cause||t,writable:!0,enumerable:!1,configurable:!0}),n}throw R.from(t,t&&t.code,e,T,t&&t.response)}}},no=new Map,ro=e=>{let t=e&&e.env||{},{fetch:n,Request:r,Response:i}=t,a=[r,i,n],o=a.length,s,c,l=no;for(;o--;)s=a[o],c=l.get(s),c===void 0&&l.set(s,c=o?new Map:to(t)),l=c;return c};ro();var io={http:null,xhr:za,fetch:{get:ro}};F.forEach(io,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{__proto__:null,value:t})}catch{}Object.defineProperty(e,"adapterName",{__proto__:null,value:t})}});var ao=e=>`- ${e}`,oo=e=>F.isFunction(e)||e===null||e===!1;function so(e,t){e=F.isArray(e)?e:[e];let{length:n}=e,r,i,a={};for(let o=0;o<n;o++){r=e[o];let n;if(i=r,!oo(r)&&(i=io[(n=String(r)).toLowerCase()],i===void 0))throw new R(`Unknown adapter '${n}'`);if(i&&(F.isFunction(i)||(i=i.get(t))))break;a[n||`#`+o]=i}if(!i){let e=Object.entries(a).map(([e,t])=>`adapter ${e} `+(t===!1?`is not supported by the environment`:`is not available in the build`));throw new R(`There is no suitable adapter to dispatch the request `+(n?e.length>1?`since :
`+e.map(ao).join(`
`):` `+ao(e[0]):`as no adapter specified`),R.ERR_NOT_SUPPORT)}return i}var co={getAdapter:so,adapters:io};function lo(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new ha(null,e)}function uo(e){return lo(e),e.headers=Fi.from(e.headers),e.data=pa.call(e,e.transformRequest),[`post`,`put`,`patch`].indexOf(e.method)!==-1&&e.headers.setContentType(`application/x-www-form-urlencoded`,!1),co.getAdapter(e.adapter||fa.adapter,e)(e).then(function(t){lo(e),e.response=t;try{t.data=pa.call(e,e.transformResponse,t)}finally{delete e.response}return t.headers=Fi.from(t.headers),t},function(t){if(!ma(t)&&(lo(e),t&&t.response)){e.response=t.response;try{t.response.data=pa.call(e,e.transformResponse,t.response)}finally{delete e.response}t.response.headers=Fi.from(t.response.headers)}return Promise.reject(t)})}var z={};[`object`,`boolean`,`number`,`function`,`string`,`symbol`].forEach((e,t)=>{z[e]=function(n){return typeof n===e||`a`+(t<1?`n `:` `)+e}});var fo={};z.transitional=function(e,t,n){function r(e,t){return`[Axios v`+Ja+`] Transitional option '`+e+`'`+t+(n?`. `+n:``)}return(n,i,a)=>{if(e===!1)throw new R(r(i,` has been removed`+(t?` in `+t:``)),R.ERR_DEPRECATED);return t&&!fo[i]&&(fo[i]=!0,console.warn(r(i,` has been deprecated since v`+t+` and will be removed in the near future`))),e?e(n,i,a):!0}},z.spelling=function(e){return(t,n)=>(console.warn(`${n} is likely a misspelling of ${e}`),!0)};function po(e,t,n){if(typeof e!=`object`||!e)throw new R(`options must be an object`,R.ERR_BAD_OPTION_VALUE);let r=Object.keys(e),i=r.length;for(;i-->0;){let a=r[i],o=Object.prototype.hasOwnProperty.call(t,a)?t[a]:void 0;if(o){let t=e[a],n=t===void 0||o(t,a,e);if(n!==!0)throw new R(`option `+a+` must be `+n,R.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new R(`Unknown option `+a,R.ERR_BAD_OPTION)}}var B={assertOptions:po,validators:z},V=B.validators,H=class{constructor(e){this.defaults=e||{},this.interceptors={request:new Ji,response:new Ji}}async request(e,t){try{return await this._request(e,t)}catch(e){if(e instanceof Error){let t={};Error.captureStackTrace?Error.captureStackTrace(t):t=Error();let n=(()=>{if(!t.stack)return``;let e=t.stack.indexOf(`
`);return e===-1?``:t.stack.slice(e+1)})();try{if(!e.stack)e.stack=n;else if(n){let t=n.indexOf(`
`),r=t===-1?-1:n.indexOf(`
`,t+1),i=r===-1?``:n.slice(r+1);String(e.stack).endsWith(i)||(e.stack+=`
`+n)}}catch{}}throw e}}_request(e,t){typeof e==`string`?(t||={},t.url=e):t=e||{},t=Pa(this.defaults,t);let{transitional:n,paramsSerializer:r,headers:i}=t;n!==void 0&&B.assertOptions(n,{silentJSONParsing:V.transitional(V.boolean),forcedJSONParsing:V.transitional(V.boolean),clarifyTimeoutError:V.transitional(V.boolean),legacyInterceptorReqResOrdering:V.transitional(V.boolean),advertiseZstdAcceptEncoding:V.transitional(V.boolean),validateStatusUndefinedResolves:V.transitional(V.boolean)},!1),r!=null&&(F.isFunction(r)?t.paramsSerializer={serialize:r}:B.assertOptions(r,{encode:V.function,serialize:V.function},!0)),t.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls===void 0?t.allowAbsoluteUrls=!0:t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls),B.assertOptions(t,{baseUrl:V.spelling(`baseURL`),withXsrfToken:V.spelling(`withXSRFToken`)},!0),t.method=(t.method||this.defaults.method||`get`).toLowerCase();let a=i&&F.merge(i.common,i[t.method]);i&&F.forEach([`delete`,`get`,`head`,`post`,`put`,`patch`,`query`,`common`],e=>{delete i[e]}),t.headers=Fi.concat(a,i);let o=[],s=!0;this.interceptors.request.forEach(function(e){if(typeof e.runWhen==`function`&&e.runWhen(t)===!1)return;s&&=e.synchronous;let n=t.transitional||Yi;n&&n.legacyInterceptorReqResOrdering?o.unshift(e.fulfilled,e.rejected):o.push(e.fulfilled,e.rejected)});let c=[];this.interceptors.response.forEach(function(e){c.push(e.fulfilled,e.rejected)});let l,u=0,d;if(!s){let e=[uo.bind(this),void 0];for(e.unshift(...o),e.push(...c),d=e.length,l=Promise.resolve(t);u<d;)l=l.then(e[u++],e[u++]);return l}d=o.length;let f=t;for(;u<d;){let e=o[u++],t=o[u++];try{f=e(f)}catch(e){t.call(this,e);break}}try{l=uo.call(this,f)}catch(e){return Promise.reject(e)}for(u=0,d=c.length;u<d;)l=l.then(c[u++],c[u++]);return l}getUri(e){return e=Pa(this.defaults,e),qi(Ma(e.baseURL,e.url,e.allowAbsoluteUrls,e),e.params,e.paramsSerializer)}};F.forEach([`delete`,`get`,`head`,`options`],function(e){H.prototype[e]=function(t,n){return this.request(Pa(n||{},{method:e,url:t,data:n&&F.hasOwnProp(n,`data`)?n.data:void 0}))}}),F.forEach([`post`,`put`,`patch`,`query`],function(e){function t(t){return function(n,r,i){return this.request(Pa(i||{},{method:e,headers:t?{"Content-Type":`multipart/form-data`}:{},url:n,data:r}))}}H.prototype[e]=t(),e!==`query`&&(H.prototype[e+`Form`]=t(!0))});var mo=class e{constructor(e){if(typeof e!=`function`)throw TypeError(`executor must be a function.`);let t;this.promise=new Promise(function(e){t=e});let n=this;this.promise.then(e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-->0;)n._listeners[t](e);n._listeners=null}),this.promise.then=e=>{let t,r=new Promise(e=>{n.subscribe(e),t=e}).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e(function(e,r,i){n.reason||(n.reason=new ha(e,r,i),t(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;let t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}toAbortSignal(){let e=new AbortController,t=t=>{e.abort(t)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let t;return{token:new e(function(e){t=e}),cancel:t}}};function ho(e){return function(t){return e.apply(null,t)}}function go(e){return F.isObject(e)&&e.isAxiosError===!0}var _o={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(_o).forEach(([e,t])=>{_o[t]=e});function vo(e){let t=new H(e),n=nr(H.prototype.request,t);return F.extend(n,H.prototype,t,{allOwnKeys:!0}),F.extend(n,t,null,{allOwnKeys:!0}),n.create=function(t){return vo(Pa(e,t))},n}var U=vo(fa);U.Axios=H,U.CanceledError=ha,U.CancelToken=mo,U.isCancel=ma,U.VERSION=Ja,U.toFormData=Hi,U.AxiosError=R,U.Cancel=U.CanceledError,U.all=function(e){return Promise.all(e)},U.spread=ho,U.isAxiosError=go,U.mergeConfig=Pa,U.AxiosHeaders=Fi,U.formToJSON=e=>la(F.isHTMLForm(e)?new FormData(e):e),U.getAdapter=co.getAdapter,U.HttpStatusCode=_o,U.default=U;var W=U.create({baseURL:(()=>{let e=window.location.hostname||`127.0.0.1`,t=window.location.protocol||`http:`;return e===`localhost`||e===`127.0.0.1`?`http://${e}:8000`:e.includes(`rrgobalitservices.com`)?`${t}//${e}`:`${t}//${e}:8000`})(),withCredentials:!0,headers:{"Content-Type":`application/json`},xsrfCookieName:`csrftoken`,xsrfHeaderName:`X-CSRFToken`}),yo=e=>{let t=`; ${document.cookie}`.split(`; ${e}=`);return t.length===2?t.pop().split(`;`).shift():null};W.interceptors.request.use(e=>{let t=yo(`csrftoken`);return t&&(e.headers[`X-CSRFToken`]=t),e},e=>Promise.reject(e)),W.interceptors.response.use(e=>e,e=>(e.response&&e.response.status===401&&window.location.pathname!==`/login`&&(localStorage.removeItem(`user`),window.location.href=`/login`),Promise.reject(e)));var bo={login:e=>W.post(`/api/auth/login/`,e),logout:()=>W.post(`/api/auth/logout/`),getCurrentUser:()=>W.get(`/api/auth/user/`),getCSRF:()=>W.get(`/api/auth/csrf/`),register:e=>W.post(`/api/register/`,e,{headers:{"Content-Type":`multipart/form-data`}})},xo={getStatus:()=>W.get(`/api/attendance/status/`),checkIn:e=>W.post(`/api/attendance/check-in/`,e),checkOut:e=>W.post(`/api/attendance/check-out/`,e),getList:e=>W.get(`/api/attendance/`,{params:e}),getCorrections:()=>W.get(`/api/attendance/corrections/`),submitCorrection:e=>W.post(`/api/attendance/corrections/`,e),approveCorrection:(e,t)=>W.post(`/api/attendance/corrections/${e}/action/`,{action:t})},So={getRooms:()=>W.get(`/api/chatrooms/`),createRoom:e=>W.post(`/api/chatrooms/`,e),getChatMessages:e=>W.get(`/api/chat-messages/`,{params:{peer_id:e}}),sendChatMessage:e=>W.post(`/api/chat-messages/`,e),getGroupMessages:e=>W.get(`/api/group-messages/`,{params:{room_id:e}}),sendGroupMessage:e=>W.post(`/api/group-messages/`,e),getCalls:()=>W.get(`/api/calls/`),initiateCall:e=>W.post(`/api/calls/`,e),callAction:(e,t)=>W.post(`/api/calls/${e}/action/`,{action:t}),getAllUsers:()=>W.get(`/api/users/`),getAllChatRooms:(e={})=>{let t=Object.entries(e).map(([e,t])=>`${e}:${t}`).join(`,`);return W.get(`/api/all-chatrooms/`,{params:t?{last_read_ids:t}:{}})},getChatHistory:e=>W.get(`/api/chat-history/`,{params:e}),sendMessage:e=>W.post(`/api/send-message/`,e,{headers:{"Content-Type":`multipart/form-data`}}),toggleReaction:e=>W.post(`/api/toggle-reaction/`,e),editMessage:e=>W.post(`/api/edit-message/`,e),deleteMessage:e=>W.post(`/api/delete-message/`,e),updatePresence:e=>W.post(`/api/presence/`,e),getPresence:e=>W.get(`/api/presence/`,{params:{user_ids:e.join(`,`)}}),createTeam:e=>W.post(`/api/create-team/`,e),forwardMessage:e=>W.post(`/api/forward-message/`,e)},Co={getProjects:e=>W.get(`/api/projects/`,{params:e}),createProject:(e,t={})=>W.post(`/api/projects/`,e,t),getProjectDetail:e=>W.get(`/api/projects/${e}/`),updateProject:(e,t,n={})=>W.put(`/api/projects/${e}/`,t,n),deleteProject:e=>W.delete(`/api/projects/${e}/`),archiveProject:(e,t)=>W.post(`/api/projects/${e}/archive/`,{archive:t}),transferProject:(e,t)=>W.post(`/api/projects/${e}/transfer/`,{manager_id:t}),getTeams:e=>W.get(`/api/projects/${e}/teams/`),createTeam:(e,t)=>W.post(`/api/projects/${e}/teams/`,t),updateTeam:(e,t)=>W.put(`/api/teams/${e}/`,t),deleteTeam:e=>W.delete(`/api/teams/${e}/`),addTeamMember:(e,t)=>W.post(`/api/teams/${e}/members/`,{employee_id:t}),removeTeamMember:(e,t)=>W.delete(`/api/teams/${e}/members/`,{data:{employee_id:t},params:{employee_id:t}}),getComments:e=>W.get(`/api/projects/${e}/comments/`),addComment:(e,t)=>W.post(`/api/projects/${e}/comments/`,{content:t}),getDocuments:e=>W.get(`/api/projects/${e}/documents/`),uploadDocument:(e,t,n={})=>W.post(`/api/projects/${e}/documents/`,t,n),getDashboard:()=>W.get(`/api/projects/dashboard/`),getReports:e=>W.get(`/api/projects/reports/`,{params:e}),getNotifications:()=>W.get(`/api/notifications/`),markNotificationRead:e=>W.post(`/api/notifications/`,e)},wo=(0,x.createContext)(null),To=({children:e})=>{let[t,n]=(0,x.useState)(null),[r,i]=(0,x.useState)(!0),[a,o]=(0,x.useState)(!0);(0,x.useEffect)(()=>{(async()=>{try{await bo.getCSRF(),n((await bo.getCurrentUser()).data)}catch{n(null)}finally{i(!1),o(!1)}})()},[]);let s=async(e,t,r)=>{i(!0);try{await bo.getCSRF();let i=await bo.login({username:e,password:t,remember_me:r});return n(i.data.user),{success:!0,user:i.data.user}}catch(e){console.error(`Login error detailed:`,e);let t=`An error occurred during login.`;return e.response&&e.response.data&&e.response.data.detail?t=e.response.data.detail:e.message&&(t=`Connection Error: ${e.message}`),{success:!1,error:t}}finally{i(!1)}},c=async()=>{i(!0);try{await bo.logout()}catch(e){console.error(`Logout request failed:`,e)}finally{n(null),i(!1),window.location.href=`/login`}},l=!!t;return(0,b.jsx)(wo.Provider,{value:{user:t,loading:r,checkingAuth:a,isAuthenticated:l,login:s,logout:c,setUser:n},children:e})},Eo=()=>{let e=(0,x.useContext)(wo);if(!e)throw Error(`useAuth must be used within an AuthProvider`);return e},Do=({children:e,allowedRoles:t})=>{let{user:n,loading:r,isAuthenticated:i}=Eo();return r?(0,b.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,height:`100vh`,backgroundColor:`#f8fafc`,fontFamily:`sans-serif`,color:`#64748b`},children:(0,b.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,b.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`,style:{fontSize:`2.5rem`,color:`#3b82f6`,marginBottom:`1rem`}}),(0,b.jsx)(`div`,{children:`Loading HRMS Portal...`})]})}):i?t&&!t.includes(n.role)?(0,b.jsx)(qt,{to:{Employee:`/employee-dashboard`,TeamLead:`/tl-dashboard`,Manager:`/manager-dashboard`,HR:`/hr-dashboard`,MD:`/md-dashboard`}[n.role]||`/login`,replace:!0}):e:(0,b.jsx)(qt,{to:`/login`,replace:!0})},Oo=(0,x.createContext)(null),ko=({children:e})=>{let[t,n]=(0,x.useState)(()=>localStorage.getItem(`theme`)||`light`);return(0,x.useEffect)(()=>{let e=document.documentElement;t===`dark`?e.classList.add(`dark-mode`):e.classList.remove(`dark-mode`),localStorage.setItem(`theme`,t)},[t]),(0,b.jsx)(Oo.Provider,{value:{theme:t,toggleTheme:()=>{n(e=>e===`light`?`dark`:`light`)}},children:e})},Ao=()=>{let e=(0,x.useContext)(Oo);if(!e)throw Error(`useTheme must be used within a ThemeProvider`);return e},jo=()=>{let{user:e,logout:t}=Eo(),{theme:n,toggleTheme:r}=Ao(),[i,a]=(0,x.useState)(!1),[o,s]=(0,x.useState)(!1);if(!e)return null;let c=()=>{switch(e.role){case`MD`:return`Managing Director Dashboard`;case`HR`:return`HR Dashboard`;case`Manager`:return`Manager Dashboard`;case`TeamLead`:return`Team Lead Dashboard`;default:return`Employee Dashboard`}},l=e=>e?e.slice(0,2).toUpperCase():`YG`,u=(W.defaults.baseURL||`http://127.0.0.1:8000`).replace(/\/$/,``);return(0,b.jsxs)(`header`,{children:[(0,b.jsx)(`div`,{className:`header-left`,children:(0,b.jsx)(N,{to:`/`,children:(0,b.jsxs)(`div`,{className:`logo-card`,children:[(0,b.jsx)(`img`,{src:`/logo.png`,alt:`YGR TEAM Logo`,style:{height:`48px`,width:`auto`,objectFit:`contain`},onError:e=>{e.target.style.display=`none`}}),(0,b.jsx)(`span`,{className:`logo-company-name`,children:`YGR TEAM`})]})})}),(0,b.jsx)(`div`,{className:`header-center`,children:(0,b.jsx)(`h1`,{className:`header-title`,children:c()})}),(0,b.jsxs)(`div`,{className:`header-right`,children:[(0,b.jsx)(`button`,{className:`theme-toggle-btn`,onClick:r,title:n===`dark`?`Switch to Light Mode`:`Switch to Dark Mode`,style:{background:`none`,border:`none`,fontSize:`1.25rem`,cursor:`pointer`,padding:`8px`,borderRadius:`50%`,display:`flex`,alignItems:`center`,justifyContent:`center`,marginRight:`15px`,transition:`background-color 0.2s`},onMouseEnter:e=>e.currentTarget.style.backgroundColor=`rgba(100, 116, 139, 0.1)`,onMouseLeave:e=>e.currentTarget.style.backgroundColor=`transparent`,children:(0,b.jsx)(`i`,{className:`fa-solid ${n===`dark`?`fa-sun`:`fa-moon`}`,style:{color:n===`dark`?`#fbbf24`:`#64748b`}})}),(0,b.jsxs)(`div`,{className:`profile-dropdown-container`,children:[(0,b.jsxs)(`div`,{className:`hr-profile`,onClick:()=>a(!i),children:[(0,b.jsxs)(`div`,{className:`avatar-container`,children:[e.profile_pic?(0,b.jsx)(`img`,{src:e.profile_pic.startsWith(`http`)?e.profile_pic:`${u}${e.profile_pic}`,className:`user-profile-img`,alt:e.username}):(0,b.jsx)(`div`,{className:`initials-avatar`,children:l(e.first_name||e.username)}),(0,b.jsx)(`div`,{className:`online-indicator`})]}),(0,b.jsxs)(`div`,{className:`hr-info`,children:[(0,b.jsx)(`span`,{className:`hr-name`,children:e.first_name?`${e.first_name} ${e.last_name||``}`:e.usernamey}),(0,b.jsx)(`span`,{className:`role-badge-pill`,children:e.designation||e.role})]}),(0,b.jsx)(`i`,{className:`fa-solid fa-chevron-down dropdown-arrow`,style:{transform:i?`rotate(180deg)`:`none`,transition:`transform 0.25s`}})]}),(0,b.jsxs)(`div`,{className:`dropdown-menu ${i?`active`:``}`,style:{display:i?`flex`:`none`},children:[(0,b.jsxs)(N,{to:`/profile`,onClick:()=>a(!1),children:[(0,b.jsx)(`i`,{className:`fa-solid fa-user`}),` My Profile`]}),(0,b.jsxs)(N,{to:`/attendance`,onClick:()=>a(!1),children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-days`}),` My Attendance`]}),(0,b.jsxs)(N,{to:`/payslips`,onClick:()=>a(!1),children:[(0,b.jsx)(`i`,{className:`fa-solid fa-file-invoice-dollar`}),` My Payslips`]}),(0,b.jsx)(`div`,{className:`dropdown-divider`}),(0,b.jsxs)(`a`,{href:`#`,className:`dropdown-logout`,onClick:e=>{e.preventDefault(),a(!1),s(!0)},children:[(0,b.jsx)(`i`,{className:`fa-solid fa-power-off`}),` Sign Out`]})]})]}),(0,b.jsx)(`a`,{href:`#`,className:`logout-btn`,title:`Logout`,onClick:e=>{e.preventDefault(),s(!0)},children:(0,b.jsx)(`i`,{className:`fa-solid fa-power-off`})})]}),o&&(0,b.jsx)(`div`,{style:{position:`fixed`,top:0,left:0,right:0,bottom:0,background:`rgba(15, 23, 42, 0.6)`,backdropFilter:`blur(4px)`,display:`flex`,justifyContent:`center`,alignItems:`center`,zIndex:9999,animation:`fadeIn 0.2s ease-out`},children:(0,b.jsxs)(`div`,{style:{background:n===`dark`?`#1e293b`:`#ffffff`,borderRadius:`12px`,padding:`24px`,width:`90%`,maxWidth:`400px`,boxShadow:`0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`,textAlign:`center`,border:n===`dark`?`1px solid #334155`:`1px solid #e2e8f0`},children:[(0,b.jsx)(`div`,{style:{background:`rgba(239, 68, 68, 0.1)`,color:`#ef4444`,width:`56px`,height:`56px`,borderRadius:`50%`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`24px`,margin:`0 auto 16px`},children:(0,b.jsx)(`i`,{className:`fa-solid fa-right-from-bracket`})}),(0,b.jsx)(`h3`,{style:{fontSize:`1.25rem`,fontWeight:700,color:n===`dark`?`#f1f5f9`:`#0f172a`,marginBottom:`8px`,border:`none`,background:`none`},children:`Confirm Sign Out`}),(0,b.jsx)(`p`,{style:{color:n===`dark`?`#94a3b8`:`#64748b`,fontSize:`0.95rem`,marginBottom:`24px`,lineHeight:`1.5`},children:`Are you sure you want to sign out? You will need to log in again to access your dashboard.`}),(0,b.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,justifyContent:`center`},children:[(0,b.jsx)(`button`,{onClick:()=>s(!1),style:{padding:`10px 18px`,borderRadius:`6px`,border:n===`dark`?`1px solid #334155`:`1px solid #e2e8f0`,background:n===`dark`?`#1e293b`:`#ffffff`,color:n===`dark`?`#94a3b8`:`#475569`,fontWeight:600,fontSize:`0.9rem`,cursor:`pointer`,flex:1,transition:`background-color 0.2s`},onMouseEnter:e=>e.currentTarget.style.backgroundColor=n===`dark`?`#334155`:`#f1f5f9`,onMouseLeave:e=>e.currentTarget.style.backgroundColor=n===`dark`?`#1e293b`:`#ffffff`,children:`Cancel`}),(0,b.jsx)(`button`,{onClick:()=>{s(!1),t()},style:{padding:`10px 18px`,borderRadius:`6px`,border:`none`,background:`#ef4444`,color:`#ffffff`,fontWeight:600,fontSize:`0.9rem`,cursor:`pointer`,flex:1,transition:`background-color 0.2s`},onMouseEnter:e=>e.currentTarget.style.backgroundColor=`#dc2626`,onMouseLeave:e=>e.currentTarget.style.backgroundColor=`#ef4444`,children:`Sign Out`})]})]})})]})},Mo=(0,x.createContext)(null),No=({children:e})=>{let[t,n]=(0,x.useState)([]),r=(0,x.useCallback)((e,t=`info`)=>{let r=Date.now()+Math.random().toString(36).substr(2,9);n(n=>[...n,{id:r,message:e,type:t}]),setTimeout(()=>{n(e=>e.filter(e=>e.id!==r))},4e3)},[]),i=(0,x.useCallback)(e=>{n(t=>t.filter(t=>t.id!==e))},[]);return(0,b.jsxs)(Mo.Provider,{value:{showToast:r},children:[e,(0,b.jsx)(`div`,{className:`toast-container`,children:t.map(e=>(0,b.jsxs)(`div`,{className:`toast toast-${e.type}`,children:[(0,b.jsxs)(`span`,{className:`toast-icon`,children:[e.type===`success`&&(0,b.jsx)(`i`,{className:`fa-solid fa-circle-check`}),e.type===`error`&&(0,b.jsx)(`i`,{className:`fa-solid fa-circle-xmark`}),e.type===`warning`&&(0,b.jsx)(`i`,{className:`fa-solid fa-triangle-exclamation`}),e.type===`info`&&(0,b.jsx)(`i`,{className:`fa-solid fa-circle-info`})]}),(0,b.jsx)(`span`,{className:`toast-message`,children:e.message}),(0,b.jsx)(`button`,{className:`toast-close`,onClick:()=>i(e.id),children:`×`})]},e.id))})]})},Po=()=>{let e=(0,x.useContext)(Mo);if(!e)throw Error(`useToast must be used within a ToastProvider`);return e},Fo=()=>{let{user:e}=Eo(),t=_t(),{showToast:n}=Po(),[r,i]=(0,x.useState)({createAccountMenu:!1,memberListMenu:!1,accountsMenu:!1,hrMenu:!1,attendanceMenu:!1,financeMenu:!1}),[a,o]=(0,x.useState)(()=>{try{let e=localStorage.getItem(`msg_unread_count`);return e?parseInt(e,10):0}catch{return 0}}),[s,c]=(0,x.useState)(null),[l,u]=(0,x.useState)(!0),[d,f]=(0,x.useState)(!1),[p,m]=(0,x.useState)(!0),[h,g]=(0,x.useState)(null),[_,v]=(0,x.useState)(null),[y,ee]=(0,x.useState)(``),[S,C]=(0,x.useState)({latitude:null,longitude:null}),[te,w]=(0,x.useState)(``),[ne,re]=(0,x.useState)(!1),[ie,ae]=(0,x.useState)(!1),[T,oe]=(0,x.useState)(null),[E,D]=(0,x.useState)(!1),se=(0,x.useRef)(null),O=(0,x.useRef)(null),k=async()=>{try{c((await xo.getStatus()).data)}catch(e){console.error(`Error fetching attendance status:`,e)}finally{u(!1)}};if((0,x.useEffect)(()=>{e&&k()},[e]),(0,x.useEffect)(()=>{let e=e=>{let t=e.detail||0;o(t),localStorage.setItem(`msg_unread_count`,String(t))};return window.addEventListener(`msg-unread-update`,e),()=>window.removeEventListener(`msg-unread-update`,e)},[]),(0,x.useEffect)(()=>()=>{h&&h.getTracks().forEach(e=>e.stop())},[h]),!e)return null;let A=e=>{i(t=>({...t,[e]:!t[e]}))},ce=e=>{m(e),f(!0),v(null),ee(``),C({latitude:null,longitude:null}),w(``),re(!1),oe(null),pe(),setTimeout(()=>{ue()},200)},le=()=>{de(),f(!1),v(null),ee(``),C({latitude:null,longitude:null}),w(``),re(!1),oe(null)},ue=async()=>{try{let e=await navigator.mediaDevices.getUserMedia({video:{width:480,height:360,facingMode:`user`}});g(e),se.current&&(se.current.srcObject=e)}catch(e){console.error(`Camera access error:`,e),oe(`Could not access camera. Face photo/selfie is mandatory for attendance.`)}},de=()=>{h&&(h.getTracks().forEach(e=>e.stop()),g(null))},j=()=>{if(se.current&&O.current){let e=se.current,t=O.current;t.width=320,t.height=240,t.getContext(`2d`).drawImage(e,0,0,t.width,t.height),v(t.toDataURL(`image/jpeg`,.7)),de()}},fe=()=>{v(null),ue()},pe=()=>{if(ae(!0),oe(null),!navigator.geolocation){oe(`Geolocation is not supported by your browser.`),ae(!1);return}navigator.geolocation.getCurrentPosition(e=>{let{latitude:t,longitude:n}=e.coords;re(e.mocked||e.coords&&e.coords.mocked||!1),C({latitude:t,longitude:n}),ee(`${t.toFixed(6)}, ${n.toFixed(6)}`),fetch(`https://nominatim.openstreetmap.org/reverse?lat=${t}&lon=${n}&format=json`,{headers:{"Accept-Language":`en`}}).then(e=>e.json()).then(e=>{e&&e.display_name?w(e.display_name):w(`Coords: ${t.toFixed(5)}, ${n.toFixed(5)}`)}).catch(e=>{console.warn(`Reverse geocode failed, using lat/lng`,e),w(`Coords: ${t.toFixed(5)}, ${n.toFixed(5)}`)}).finally(()=>{ae(!1)})},e=>{console.error(`Geolocation error:`,e);let t=`Unable to retrieve location.`;e.code===e.PERMISSION_DENIED&&(t=`GPS permission denied. Location is required by HR policy.`),oe(t),ae(!1)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})},me=async()=>{if(!E){if(!_){n(`Check-in selfie is mandatory. Please capture your photo first.`,`warning`);return}if(!S.latitude||!S.longitude){n(`GPS location coordinates are mandatory to mark attendance.`,`error`);return}if(ne){n(`Fake/Mock GPS location detected! Reverting check-in.`,`error`);return}D(!0);try{let e={selfie:_,photo:_,latitude:S.latitude,longitude:S.longitude,address:te,location:y,is_mocked:ne,user_agent:navigator.userAgent},t=await xo.checkIn(e);c(e=>({...e,attendance_record:t.data.attendance})),n(`Checked in successfully!`,`success`),le()}catch(e){n(e.response?.data?.detail||`Check-in failed`,`error`)}finally{D(!1)}}},he=async()=>{if(!E){if(!_){n(`Check-out selfie is mandatory. Please capture your photo first.`,`warning`);return}if(!S.latitude||!S.longitude){n(`GPS location coordinates are mandatory to mark attendance.`,`error`);return}if(ne){n(`Fake/Mock GPS location detected! Reverting check-out.`,`error`);return}D(!0);try{let e={selfie:_,photo:_,latitude:S.latitude,longitude:S.longitude,address:te,location:y,is_mocked:ne,user_agent:navigator.userAgent},t=await xo.checkOut(e);c(e=>({...e,attendance_record:t.data.attendance})),n(`Checked out successfully!`,`success`),le()}catch(e){n(e.response?.data?.detail||`Check-out failed`,`error`)}finally{D(!1)}}},ge=()=>{switch(e.role){case`MD`:return`/md-dashboard`;case`HR`:return`/hr-dashboard`;case`Manager`:return`/manager-dashboard`;case`TeamLead`:return`/tl-dashboard`;default:return`/employee-dashboard`}};return(0,b.jsxs)(`aside`,{className:`sidebar`,children:[(0,b.jsxs)(N,{to:ge(),state:e.role===`Manager`?{tab:`overview`}:void 0,className:t.pathname===ge()&&(!t.state?.tab||t.state?.tab===`overview`)?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-gauge`,style:{color:`#3b82f6`}}),(0,b.jsx)(`span`,{children:`Dashboard`})]}),e.role===`MD`&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`div`,{className:`menu-item`,onClick:()=>A(`createAccountMenu`),children:[(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`i`,{className:`fa-solid fa-user-plus`,style:{color:`#f59e0b`}}),` Create Account`]}),(0,b.jsx)(`i`,{className:`fa-solid fa-angle-down ${r.createAccountMenu?`fa-rotate-180`:``}`,style:{marginLeft:`auto`,transition:`transform 0.2s`}})]}),(0,b.jsx)(`div`,{className:`dropdown ${r.createAccountMenu?`active`:``}`,children:(0,b.jsxs)(P,{to:`/register`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-user`}),` Register Account`]})}),(0,b.jsxs)(`div`,{className:`menu-item`,onClick:()=>A(`memberListMenu`),children:[(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`i`,{className:`fa-solid fa-users`,style:{color:`#10b981`}}),` Member List`]}),(0,b.jsx)(`i`,{className:`fa-solid fa-angle-down ${r.memberListMenu?`fa-rotate-180`:``}`,style:{marginLeft:`auto`,transition:`transform 0.2s`}})]}),(0,b.jsxs)(`div`,{className:`dropdown ${r.memberListMenu?`active`:``}`,children:[(0,b.jsxs)(P,{to:`/hr-list`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-user-tie`}),` HR List`]}),(0,b.jsxs)(P,{to:`/manager-list`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-briefcase`}),` Manager List`]}),(0,b.jsxs)(P,{to:`/tl-list`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-sitemap`}),` Team Lead List`]}),(0,b.jsxs)(P,{to:`/employee-list`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-user`}),` Employee List`]})]}),(0,b.jsxs)(P,{to:`/leave-requests`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#eab308`}}),(0,b.jsx)(`span`,{children:`Leave Approvals`})]}),(0,b.jsxs)(P,{to:`/project-dashboard`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-folder-open`,style:{color:`#14b8a6`}}),(0,b.jsx)(`span`,{children:`Projects`})]}),(0,b.jsxs)(P,{to:`/attendance-list`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#eab308`}}),(0,b.jsx)(`span`,{children:`Daily Attendance`})]}),(0,b.jsxs)(P,{to:`/monthly-attendance`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar`,style:{color:`#a855f7`}}),(0,b.jsx)(`span`,{children:`Monthly Attendance`})]}),(0,b.jsxs)(P,{to:`/all-leaves`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-clipboard-check`,style:{color:`#22c55e`}}),(0,b.jsx)(`span`,{children:`All Leaves`})]}),(0,b.jsxs)(P,{to:`/attendance-approvals`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-circle-check`,style:{color:`#06b6d4`}}),(0,b.jsx)(`span`,{children:`Attendance Approvals`})]}),(0,b.jsxs)(P,{to:`/holiday-approvals`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-umbrella`,style:{color:`#f59e0b`}}),(0,b.jsx)(`span`,{children:`Holiday Approvals`})]})]}),e.role===`HR`&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(P,{to:`/register`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-users-gear`,style:{color:`#ec4899`}}),(0,b.jsx)(`span`,{children:`Accounts`})]}),(0,b.jsxs)(`div`,{className:`menu-item`,onClick:()=>A(`hrMenu`),children:[(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`i`,{className:`fa-solid fa-users`,style:{color:`#f59e0b`}}),` HR Tools`]}),(0,b.jsx)(`i`,{className:`fa-solid fa-angle-down ${r.hrMenu?`fa-rotate-180`:``}`,style:{marginLeft:`auto`,transition:`transform 0.2s`}})]}),(0,b.jsxs)(`div`,{className:`dropdown ${r.hrMenu?`active`:``}`,children:[(0,b.jsxs)(P,{to:`/leave-status`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-check`}),` Leave Portal`]}),(0,b.jsxs)(P,{to:`/hr-approved-leaves`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-clipboard-check`}),` HR Approved Leaves`]}),(0,b.jsxs)(P,{to:`/leave-requests`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-minus`}),` All Leave Requests`]})]}),(0,b.jsxs)(`div`,{className:`menu-item`,onClick:()=>A(`attendanceMenu`),children:[(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#eab308`}}),` Attendance`]}),(0,b.jsx)(`i`,{className:`fa-solid fa-angle-down ${r.attendanceMenu?`fa-rotate-180`:``}`,style:{marginLeft:`auto`,transition:`transform 0.2s`}})]}),(0,b.jsxs)(`div`,{className:`dropdown ${r.attendanceMenu?`active`:``}`,children:[(0,b.jsxs)(P,{to:`/attendance-list`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-clipboard-user`}),` Daily Registry`]}),(0,b.jsxs)(P,{to:`/monthly-attendance`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-days`}),` Monthly Summary`]}),(0,b.jsxs)(P,{to:`/attendance-correct`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-pen-to-square`}),` Correction (Single)`]}),(0,b.jsxs)(P,{to:`/attendance-correct-bulk`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-layer-group`}),` Correction (Bulk)`]}),(0,b.jsxs)(P,{to:`/attendance`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-check`}),` My Attendance`]})]}),(0,b.jsxs)(`div`,{className:`menu-item`,onClick:()=>A(`financeMenu`),children:[(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`i`,{className:`fa-solid fa-wallet`,style:{color:`#10b981`}}),` Finance`]}),(0,b.jsx)(`i`,{className:`fa-solid fa-angle-down ${r.financeMenu?`fa-rotate-180`:``}`,style:{marginLeft:`auto`,transition:`transform 0.2s`}})]}),(0,b.jsxs)(`div`,{className:`dropdown ${r.financeMenu?`active`:``}`,children:[(0,b.jsxs)(P,{to:`/finance/invoices`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-file-invoice-dollar`}),` Invoices`]}),(0,b.jsxs)(P,{to:`/finance/clients/new`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-user-plus`}),` Create Client`]}),(0,b.jsxs)(P,{to:`/finance/services/new`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-gears`}),` Create Service`]}),(0,b.jsxs)(P,{to:`/finance/invoices/create`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-receipt`}),` Create Invoice`]}),(0,b.jsxs)(P,{to:`/finance/salary-structures`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calculator`}),` Salary Structures`]}),(0,b.jsxs)(P,{to:`/finance/payroll`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-file-invoice-dollar`}),` Payslips / Payroll`]})]}),(0,b.jsxs)(P,{to:`/holidays`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-umbrella-beach`,style:{color:`#ef4444`}}),(0,b.jsx)(`span`,{children:`Holiday Calendar`})]}),(0,b.jsxs)(P,{to:`/settings`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-gear`,style:{color:`#8b5cf6`}}),(0,b.jsx)(`span`,{children:`HR Settings`})]}),(0,b.jsxs)(P,{to:`/questions`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-circle-question`,style:{color:`#8b5cf6`}}),(0,b.jsx)(`span`,{children:`Questions`})]}),(0,b.jsxs)(P,{to:`/project-dashboard`,className:({isActive:e})=>e?`active`:``,id:`linkProjectsHR`,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-folder-open`,style:{color:`#14b8a6`}}),(0,b.jsx)(`span`,{children:`Projects`})]}),(0,b.jsxs)(P,{to:`/tasks`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-list-check`,style:{color:`#22c55e`}}),(0,b.jsx)(`span`,{children:`Tasks & Reports`})]})]}),e.role===`Manager`&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(P,{to:`/register`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-user-plus`,style:{color:`#22c55e`}}),(0,b.jsx)(`span`,{children:`Add Member`})]}),(0,b.jsxs)(P,{to:`/project-dashboard`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-folder-open`,style:{color:`#14b8a6`}}),(0,b.jsx)(`span`,{children:`Projects & Teams`})]}),(0,b.jsxs)(N,{to:`/manager-dashboard`,state:{tab:`developers`},className:t.pathname===`/manager-dashboard`&&t.state?.tab===`developers`?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-users`,style:{color:`#22c55e`}}),(0,b.jsx)(`span`,{children:`Developers List`})]}),(0,b.jsxs)(N,{to:`/manager-dashboard`,state:{tab:`teamleads`},className:t.pathname===`/manager-dashboard`&&t.state?.tab===`teamleads`?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-users-gear`,style:{color:`#f59e0b`}}),(0,b.jsx)(`span`,{children:`Team Leads List`})]}),(0,b.jsxs)(P,{to:`/leave-status`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#6366f1`}}),(0,b.jsx)(`span`,{children:`Leave Portal`})]}),(0,b.jsxs)(P,{to:`/manager-approved-leaves`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-clipboard-check`,style:{color:`#eab308`}}),(0,b.jsx)(`span`,{children:`Manager Approved Leaves`})]}),(0,b.jsxs)(P,{to:`/leave-requests`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-minus`,style:{color:`#f43f5e`}}),(0,b.jsx)(`span`,{children:`TeamLead/Emp Leaves`})]}),(0,b.jsxs)(P,{to:`/tasks`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-list-check`,style:{color:`#a855f7`}}),(0,b.jsx)(`span`,{children:`Tasks & Reports`})]}),(0,b.jsxs)(P,{to:`/attendance-list`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#eab308`}}),(0,b.jsx)(`span`,{children:`Team Attendance`})]}),(0,b.jsxs)(P,{to:`/profile`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-user-circle`,style:{color:`#6366f1`}}),(0,b.jsx)(`span`,{children:`My Profile`})]}),(0,b.jsxs)(P,{to:`/attendance`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#06b6d4`}}),(0,b.jsx)(`span`,{children:`My Attendance`})]}),(0,b.jsxs)(P,{to:`/payslips`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-file-invoice-dollar`,style:{color:`#10b981`}}),(0,b.jsx)(`span`,{children:`My Payslips`})]})]}),e.role===`TeamLead`&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(P,{to:`/profile`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-user-circle`,style:{color:`#6366f1`}}),(0,b.jsx)(`span`,{children:`My Profile`})]}),(0,b.jsxs)(P,{to:`/attendance`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#06b6d4`}}),(0,b.jsx)(`span`,{children:`My Attendance`})]}),(0,b.jsxs)(P,{to:`/attendance-list`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#eab308`}}),(0,b.jsx)(`span`,{children:`Team Attendance`})]}),(0,b.jsxs)(P,{to:`/payslips`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-file-invoice-dollar`,style:{color:`#10b981`}}),(0,b.jsx)(`span`,{children:`My Payslips`})]}),(0,b.jsxs)(P,{to:`/holidays`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-days`,style:{color:`#f43f5e`}}),(0,b.jsx)(`span`,{children:`Attendance Calendar`})]}),(0,b.jsxs)(P,{to:`/leave-status`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#6366f1`}}),(0,b.jsx)(`span`,{children:`Leave Portal`})]}),(0,b.jsxs)(P,{to:`/tl-approved-leaves`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-clipboard-check`,style:{color:`#14b8a6`}}),(0,b.jsx)(`span`,{children:`TL Approved Leaves`})]}),(0,b.jsxs)(P,{to:`/leave-requests`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-minus`,style:{color:`#f43f5e`}}),(0,b.jsx)(`span`,{children:`Employee Leaves`})]}),(0,b.jsxs)(P,{to:`/project-dashboard`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-folder-open`,style:{color:`#14b8a6`}}),(0,b.jsx)(`span`,{children:`Projects`})]}),(0,b.jsxs)(P,{to:`/tasks`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-list-check`,style:{color:`#22c55e`}}),(0,b.jsx)(`span`,{children:`Tasks & Reports`})]})]}),e.role===`Employee`&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(P,{to:`/profile`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-user-circle`,style:{color:`#6366f1`}}),(0,b.jsx)(`span`,{children:`My Profile`})]}),(0,b.jsxs)(P,{to:`/attendance`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#06b6d4`}}),(0,b.jsx)(`span`,{children:`My Attendance`})]}),(0,b.jsxs)(P,{to:`/payslips`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-file-invoice-dollar`,style:{color:`#10b981`}}),(0,b.jsx)(`span`,{children:`My Payslips`})]}),(0,b.jsxs)(P,{to:`/holidays`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-days`,style:{color:`#f43f5e`}}),(0,b.jsx)(`span`,{children:`Attendance Calendar`})]}),(0,b.jsxs)(P,{to:`/leave-status`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-calendar-check`,style:{color:`#6366f1`}}),(0,b.jsx)(`span`,{children:`Leave Portal`})]}),(0,b.jsxs)(P,{to:`/tasks`,className:({isActive:e})=>e?`active`:``,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-list-check`,style:{color:`#22c55e`}}),(0,b.jsx)(`span`,{children:`Tasks & Reports`})]})]}),(0,b.jsxs)(P,{to:`/messages`,className:({isActive:e})=>e?`active`:``,style:{position:`relative`},children:[(0,b.jsx)(`i`,{className:`fa-solid fa-comments`,style:{color:`#06b6d4`}}),(0,b.jsx)(`span`,{children:`Messages`}),a>0&&(0,b.jsx)(`span`,{style:{position:`absolute`,top:`4px`,right:`8px`,background:`#ef4444`,color:`#fff`,fontSize:`10px`,fontWeight:800,minWidth:`18px`,height:`18px`,borderRadius:`9px`,display:`flex`,alignItems:`center`,justifyContent:`center`,padding:`0 4px`,lineHeight:1},children:a>99?`99+`:a})]}),(0,b.jsx)(`div`,{className:`sidebar-footer`,children:l?(0,b.jsxs)(`div`,{style:{textAlign:`center`,color:`var(--muted)`,fontSize:`12px`},children:[(0,b.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`}),` Loading...`]}):s?.on_leave_today?(0,b.jsxs)(`button`,{className:`checkin-btn`,style:{background:`#ef4444`,cursor:`default`},disabled:!0,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-umbrella-beach`}),` On Leave`]}):s?.attendance_record?.check_in_time&&!s?.attendance_record?.check_out_time?(0,b.jsxs)(`button`,{className:`checkout-btn`,onClick:()=>ce(!1),children:[(0,b.jsx)(`i`,{className:`fa-solid fa-circle-xmark`}),` Check Out`]}):s?.attendance_record?.check_in_time&&s?.attendance_record?.check_out_time?(0,b.jsxs)(`button`,{className:`checkin-btn`,style:{background:`#10b981`,cursor:`default`},disabled:!0,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-circle-check`}),` Done today`]}):(0,b.jsxs)(`button`,{className:`checkin-btn`,onClick:()=>ce(!0),children:[(0,b.jsx)(`i`,{className:`fa-solid fa-circle-check`}),` Check In`]})}),d&&(0,b.jsx)(`div`,{className:`attendance-modal-overlay`,children:(0,b.jsxs)(`div`,{className:`attendance-modal`,children:[(0,b.jsxs)(`div`,{className:`attendance-modal-header`,children:[(0,b.jsxs)(`h3`,{children:[(0,b.jsx)(`i`,{className:`fa-solid ${p?`fa-sign-in-alt`:`fa-sign-out-alt`}`,style:{marginRight:`8px`,color:p?`var(--success)`:`var(--danger)`}}),`Attendance `,p?`Check In`:`Check Out`]}),(0,b.jsx)(`button`,{className:`attendance-modal-close`,onClick:le,children:(0,b.jsx)(`i`,{className:`fa-solid fa-xmark`})})]}),(0,b.jsxs)(`div`,{className:`attendance-modal-body`,children:[(0,b.jsxs)(`div`,{className:`camera-preview-container`,children:[_?(0,b.jsx)(`img`,{src:_,className:`camera-preview-img`,alt:`Face Capture`}):(0,b.jsx)(`video`,{ref:se,className:`camera-video`,autoPlay:!0,playsInline:!0,muted:!0}),(0,b.jsx)(`canvas`,{ref:O,style:{display:`none`}})]}),(0,b.jsx)(`div`,{className:`location-info-box ${ie?`loading`:T?`error`:`success`}`,children:ie?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`}),(0,b.jsxs)(`div`,{className:`location-text-container`,children:[(0,b.jsx)(`div`,{className:`location-title`,children:`Acquiring GPS...`}),(0,b.jsx)(`div`,{className:`location-desc`,children:`Verifying your physical location coords`})]})]}):T?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`i`,{className:`fa-solid fa-triangle-exclamation`}),(0,b.jsxs)(`div`,{className:`location-text-container`,children:[(0,b.jsx)(`div`,{className:`location-title`,children:`GPS Acquisition Failed`}),(0,b.jsx)(`div`,{className:`location-desc`,children:T})]})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`i`,{className:`fa-solid fa-location-dot`}),(0,b.jsxs)(`div`,{className:`location-text-container`,children:[(0,b.jsx)(`div`,{className:`location-title`,children:`Location Verified`}),(0,b.jsxs)(`div`,{className:`location-desc`,children:[y,` (Accuracy Lock ✅)`]})]})]})})]}),(0,b.jsxs)(`div`,{className:`attendance-modal-footer`,children:[(0,b.jsx)(`button`,{type:`button`,className:`modal-btn modal-btn-secondary`,onClick:le,disabled:E,children:`Cancel`}),_?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`button`,{type:`button`,className:`modal-btn modal-btn-secondary`,onClick:fe,disabled:E,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-rotate-left`}),` Retake`]}),(0,b.jsx)(`button`,{type:`button`,className:`modal-btn modal-btn-primary`,onClick:p?me:he,disabled:E,children:E?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`}),` Submitting...`]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`i`,{className:`fa-solid fa-cloud-arrow-up`}),` Submit Attendance`]})})]}):(0,b.jsxs)(`button`,{type:`button`,className:`modal-btn modal-btn-primary`,style:{background:`#3b82f6`},onClick:j,disabled:ie,children:[(0,b.jsx)(`i`,{className:`fa-solid fa-camera`}),` Capture Face`]})]})]})})]})},Io=()=>(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(jo,{}),(0,b.jsxs)(`div`,{className:`layout`,children:[(0,b.jsx)(Fo,{}),(0,b.jsx)(`main`,{className:`main`,children:(0,b.jsx)(Jt,{})})]}),(0,b.jsx)(`div`,{id:`toastContainer`})]}),Lo=({message:e=`Loading records...`})=>(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,padding:`40px`,gap:`12px`},children:[(0,b.jsx)(`i`,{className:`fa-solid fa-spinner fa-spin`,style:{fontSize:`32px`,color:`var(--accent-blue)`}}),(0,b.jsx)(`span`,{style:{color:`var(--muted)`,fontSize:`14px`,fontWeight:600},children:e})]}),Ro=[{label:`Home`,to:`/`},{label:`About Us`,to:`#`,children:[{label:`Company Overview`,to:`/about`},{label:`Meet the Team`,to:`/team`}]},{label:`Services`,to:`/services`},{label:`Portfolio`,to:`/portfolio`},{label:`Careers`,to:`/careers`},{label:`Blog`,to:`/blog`},{label:`Contact`,to:`/contact`},{label:`Demo`,to:`#`,children:[{label:`Customer Care Vizag`,href:`http://demo.ygrgobalitservices.com/`},{label:`Trip`,href:`http://trip.ygrgobalitservices.com/`},{label:`CodeLabs`,href:`http://uiux.ygrgobalitservices.com/`}]}],zo=()=>{let e=_t(),[t,n]=(0,x.useState)(!1),[r,i]=(0,x.useState)(!1),a=e.pathname===`/`;(0,x.useEffect)(()=>{let e=()=>n(window.scrollY>60);return window.addEventListener(`scroll`,e),()=>window.removeEventListener(`scroll`,e)},[]),(0,x.useEffect)(()=>{let e=new IntersectionObserver(t=>t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`active`),e.unobserve(t.target))}),{threshold:.12}),t=()=>document.querySelectorAll(`.reveal-up, .reveal-left, .reveal-right, .reveal-scale`).forEach(t=>e.observe(t));t();let n=setTimeout(t,600);return()=>{clearTimeout(n),e.disconnect()}},[e.pathname]),(0,x.useEffect)(()=>{i(!1)},[e.pathname]);let o=t=>e.pathname===t||t!==`/`&&e.pathname.startsWith(t);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`div`,{className:`ygr-topbar d-none d-lg-flex`,children:(0,b.jsxs)(`div`,{className:`topbar-inner`,children:[(0,b.jsxs)(`div`,{className:`topbar-left`,children:[(0,b.jsxs)(`div`,{className:`topbar-info`,children:[(0,b.jsx)(`i`,{className:`far fa-clock`}),(0,b.jsx)(`span`,{children:`Mon – Fri, 9:30 AM – 6:30 PM`})]}),(0,b.jsxs)(`div`,{className:`topbar-info`,children:[(0,b.jsx)(`i`,{className:`fa fa-phone-alt`}),(0,b.jsx)(`a`,{href:`tel:+917794053340`,children:`+91 77940 53340`})]}),(0,b.jsxs)(`div`,{className:`topbar-info`,children:[(0,b.jsx)(`i`,{className:`fa fa-envelope`}),(0,b.jsx)(`a`,{href:`mailto:info@ygrgobalitservices.com`,children:`info@ygrgobalitservices.com`})]})]}),(0,b.jsxs)(`div`,{className:`topbar-right`,children:[(0,b.jsx)(`a`,{href:`https://x.com/ygrgobalit2024`,target:`_blank`,rel:`noreferrer`,className:`topbar-social`,children:(0,b.jsx)(`i`,{className:`fab fa-x-twitter`})}),(0,b.jsx)(`a`,{href:`https://www.facebook.com/profile.php?id=61568888033386`,target:`_blank`,rel:`noreferrer`,className:`topbar-social`,children:(0,b.jsx)(`i`,{className:`fab fa-facebook-f`})}),(0,b.jsx)(`a`,{href:`https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/`,target:`_blank`,rel:`noreferrer`,className:`topbar-social`,children:(0,b.jsx)(`i`,{className:`fab fa-linkedin-in`})}),(0,b.jsx)(`a`,{href:`https://www.instagram.com/ygrgobalitservices/`,target:`_blank`,rel:`noreferrer`,className:`topbar-social`,children:(0,b.jsx)(`i`,{className:`fab fa-instagram`})}),(0,b.jsx)(`a`,{href:`https://www.youtube.com/@rrtalktrends`,target:`_blank`,rel:`noreferrer`,className:`topbar-social`,children:(0,b.jsx)(`i`,{className:`fab fa-youtube`})})]})]})}),(0,b.jsx)(`header`,{className:`ygr-header ${t?`scrolled`:``} ${a?``:`solid`}`,children:(0,b.jsxs)(`div`,{className:`header-inner`,children:[(0,b.jsx)(N,{to:`/`,className:`header-logo`,children:(0,b.jsx)(`img`,{src:`/images/logo1.jpeg`,alt:`YGR Global IT Services`})}),(0,b.jsx)(`ul`,{className:`header-nav`,children:Ro.map(e=>(0,b.jsx)(`li`,{className:`nav-link-item`,children:e.children?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`a`,{href:`#`,onClick:e=>e.preventDefault(),children:[e.label,` `,(0,b.jsx)(`i`,{className:`fas fa-chevron-down`})]}),(0,b.jsx)(`div`,{className:`nav-dropdown`,children:e.children.map(e=>e.href?(0,b.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noreferrer`,children:e.label},e.label):(0,b.jsx)(N,{to:e.to,children:e.label},e.label))})]}):(0,b.jsx)(N,{to:e.to,className:o(e.to)?`active`:``,children:e.label})},e.label))}),(0,b.jsxs)(N,{to:`/login`,className:`nav-cta d-none d-lg-flex`,children:[(0,b.jsx)(`i`,{className:`fas fa-user-shield`}),` Employee Login`]}),(0,b.jsxs)(`button`,{className:`mobile-toggle-btn d-lg-none`,onClick:()=>i(!0),"aria-label":`Open menu`,children:[(0,b.jsx)(`span`,{className:`toggle-bar`}),(0,b.jsx)(`span`,{className:`toggle-bar`}),(0,b.jsx)(`span`,{className:`toggle-bar`})]})]})}),(0,b.jsx)(`div`,{className:`drawer-overlay ${r?`open`:``}`,onClick:()=>i(!1)}),(0,b.jsxs)(`nav`,{className:`mobile-drawer ${r?`open`:``}`,children:[(0,b.jsx)(`button`,{className:`drawer-close`,onClick:()=>i(!1),"aria-label":`Close menu`,children:(0,b.jsx)(`i`,{className:`fas fa-times`})}),(0,b.jsxs)(`ul`,{className:`drawer-nav`,children:[(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/`,children:`Home`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/about`,children:`About Us`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/team`,children:`Meet the Team`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/services`,children:`Services`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/portfolio`,children:`Portfolio`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/careers`,children:`Careers`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/blog`,children:`Blog`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/contact`,children:`Contact`})})]}),(0,b.jsxs)(N,{to:`/login`,className:`drawer-cta`,children:[(0,b.jsx)(`i`,{className:`fas fa-user-shield`}),` Employee Login`]})]}),(0,b.jsx)(`a`,{href:`https://wa.me/917794053340`,className:`wa-float`,target:`_blank`,rel:`noreferrer`,"aria-label":`Chat on WhatsApp`,children:(0,b.jsx)(`i`,{className:`fab fa-whatsapp`})})]})},Bo=()=>(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`footer`,{className:`footer-section`,children:(0,b.jsxs)(`div`,{className:`footer-inner`,children:[(0,b.jsxs)(`div`,{className:`footer-top-grid`,children:[(0,b.jsxs)(`div`,{className:`footer-brand-col`,children:[(0,b.jsx)(N,{to:`/`,children:(0,b.jsx)(`img`,{className:`footer-brand-logo`,src:`/images/logo1.jpeg`,alt:`YGR Global IT Services`})}),(0,b.jsx)(`p`,{className:`footer-brand-desc`,children:`YGR Gobal IT Services Pvt. Ltd. provides complete enterprise IT solutions including software engineering, mobile app development, growth marketing, and professional technology training.`}),(0,b.jsxs)(`div`,{className:`footer-social-row`,children:[(0,b.jsx)(`a`,{href:`https://x.com/ygrgobalit2024`,target:`_blank`,rel:`noreferrer`,"aria-label":`Twitter`,children:(0,b.jsx)(`i`,{className:`fab fa-x-twitter`})}),(0,b.jsx)(`a`,{href:`https://www.facebook.com/profile.php?id=61568888033386`,target:`_blank`,rel:`noreferrer`,"aria-label":`Facebook`,children:(0,b.jsx)(`i`,{className:`fab fa-facebook-f`})}),(0,b.jsx)(`a`,{href:`https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/`,target:`_blank`,rel:`noreferrer`,"aria-label":`LinkedIn`,children:(0,b.jsx)(`i`,{className:`fab fa-linkedin-in`})}),(0,b.jsx)(`a`,{href:`https://www.instagram.com/ygrgobalitservices/`,target:`_blank`,rel:`noreferrer`,"aria-label":`Instagram`,children:(0,b.jsx)(`i`,{className:`fab fa-instagram`})}),(0,b.jsx)(`a`,{href:`https://www.youtube.com/@rrtalktrends`,target:`_blank`,rel:`noreferrer`,"aria-label":`YouTube`,children:(0,b.jsx)(`i`,{className:`fab fa-youtube`})})]})]}),(0,b.jsxs)(`div`,{className:`footer-links-col`,children:[(0,b.jsx)(`h4`,{children:`Navigation`}),(0,b.jsxs)(`ul`,{children:[(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/`,children:`Home`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/about`,children:`About Us`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/portfolio`,children:`Portfolio`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/careers`,children:`Careers`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/blog`,children:`Blog`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/contact`,children:`Contact Us`})})]})]}),(0,b.jsxs)(`div`,{className:`footer-links-col`,children:[(0,b.jsx)(`h4`,{children:`Quick Links`}),(0,b.jsxs)(`ul`,{children:[(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/services`,children:`Services`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/global-internships`,children:`Global Internships`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/client-registration`,children:`Client Registration`})}),(0,b.jsx)(`li`,{children:(0,b.jsx)(N,{to:`/login`,children:`Employee Portal`})})]})]}),(0,b.jsxs)(`div`,{className:`footer-contact-col`,children:[(0,b.jsx)(`h4`,{children:`Head Office`}),(0,b.jsxs)(`div`,{className:`footer-contact-item`,children:[(0,b.jsx)(`i`,{className:`fas fa-map-marker-alt`}),(0,b.jsx)(`p`,{children:`Manjeera Trinity Corporate, Next to Lulu Mall, Kukatpally Housing Board Colony, Hyderabad, Telangana 500072`})]}),(0,b.jsxs)(`div`,{className:`footer-contact-item`,children:[(0,b.jsx)(`i`,{className:`fas fa-phone-alt`}),(0,b.jsx)(`p`,{children:(0,b.jsx)(`a`,{href:`tel:+917794053340`,children:`+91 77940 53340`})})]}),(0,b.jsxs)(`div`,{className:`footer-contact-item`,children:[(0,b.jsx)(`i`,{className:`fas fa-envelope`}),(0,b.jsx)(`p`,{children:(0,b.jsx)(`a`,{href:`mailto:info@ygrgobalitservices.com`,children:`info@ygrgobalitservices.com`})})]})]})]}),(0,b.jsxs)(`div`,{className:`footer-bottom-bar`,children:[(0,b.jsxs)(`p`,{children:[`© `,new Date().getFullYear(),` `,(0,b.jsx)(`a`,{href:`https://ygrgobalitservices.com`,children:`YGR Global IT Services Pvt. Ltd.`}),` All Rights Reserved.`]}),(0,b.jsx)(`p`,{children:`Architected for Enterprise Excellence`})]})]})}),(0,b.jsxs)(`nav`,{className:`mobile-bottom-bar`,children:[(0,b.jsxs)(N,{to:`/`,className:`mobile-bar-item`,children:[(0,b.jsx)(`i`,{className:`fas fa-home`}),(0,b.jsx)(`span`,{children:`Home`})]}),(0,b.jsxs)(N,{to:`/services`,className:`mobile-bar-item`,children:[(0,b.jsx)(`i`,{className:`fas fa-laptop-code`}),(0,b.jsx)(`span`,{children:`Services`})]}),(0,b.jsxs)(N,{to:`/careers`,className:`mobile-bar-item`,children:[(0,b.jsx)(`i`,{className:`fas fa-briefcase`}),(0,b.jsx)(`span`,{children:`Careers`})]}),(0,b.jsxs)(N,{to:`/contact`,className:`mobile-bar-item`,children:[(0,b.jsx)(`i`,{className:`fas fa-envelope`}),(0,b.jsx)(`span`,{children:`Contact`})]})]})]}),Vo=({hideHeaderFooter:e=!1})=>((0,x.useEffect)(()=>{let e=document.createElement(`link`);e.rel=`stylesheet`,e.href=`https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css`,e.id=`bootstrap-css`;let t=document.createElement(`link`);t.rel=`stylesheet`,t.href=`https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css`,t.id=`bootstrap-icons`,document.getElementById(`bootstrap-css`)||document.head.appendChild(e),document.getElementById(`bootstrap-icons`)||document.head.appendChild(t);let n=document.createElement(`link`);return n.rel=`stylesheet`,n.href=`/css/modern_ui.css`,n.id=`modern-ui-css`,document.getElementById(`modern-ui-css`)||document.head.appendChild(n),()=>{let e=document.getElementById(`bootstrap-css`),t=document.getElementById(`bootstrap-icons`),n=document.getElementById(`modern-ui-css`);e&&e.remove(),t&&t.remove(),n&&n.remove()}},[]),(0,b.jsxs)(`div`,{style:{width:`100%`,height:`100vh`,overflowY:`auto`,overflowX:`hidden`,backgroundColor:`#f5f6fa`},children:[!e&&(0,b.jsx)(zo,{}),(0,b.jsx)(`main`,{children:(0,b.jsx)(Jt,{})}),!e&&(0,b.jsx)(Bo,{})]})),Ho=[{id:`01`,category:`WEB DEVELOPMENT`,titleLine1:`Architecting Scalable`,titleGradient:`Modern Web Solutions`,titleLine2:`for Business Growth`,description:`YGR Gobal partners with leading enterprises to build ultra-fast, responsive, and SEO-optimized websites and web portals engineered for maximum online authority and conversion.`,btnPrimary:`Explore Web Solutions`,btnPrimaryLink:`/services?type=web`,btnSecondary:`Schedule Consultation`,btnSecondaryLink:`/contact`,image:`/images/ygr_company_artwork.png`,stat1:`100%`,stat1Label:`Responsive`,stat2:`99.9%`,stat2Label:`SLA Uptime`,stat3:`SEO`,stat3Label:`Dominance`},{id:`02`,category:`SOFTWARE DEVELOPMENT`,titleLine1:`Custom Enterprise`,titleGradient:`Software Engineering`,titleLine2:`& Cloud Solutions`,description:`Transforming complex business requirements into agile, scalable, and secure cloud software applications designed to accelerate speed-to-market and operational efficiency.`,btnPrimary:`Explore Software Engineering`,btnPrimaryLink:`/services?type=webapp`,btnSecondary:`View Case Studies`,btnSecondaryLink:`/portfolio`,image:`/images/hero_bg.png`,stat1:`Agile`,stat1Label:`Delivery Engine`,stat2:`ISO 9001`,stat2Label:`Certified QA`,stat3:`Bank-Grade`,stat3Label:`Security`},{id:`03`,category:`APP DEVELOPMENT`,titleLine1:`High-Performance`,titleGradient:`iOS & Android Mobile Apps`,titleLine2:`Built for Scale`,description:`Crafting intuitive native-grade mobile applications with smooth user interfaces, high security, and real-time backend synchronization for enterprise global reach.`,btnPrimary:`Explore App Solutions`,btnPrimaryLink:`/services?type=mobile`,btnSecondary:`View Mobile Apps`,btnSecondaryLink:`/portfolio`,image:`/images/company_team.png`,stat1:`iOS & Android`,stat1Label:`Cross-Platform`,stat2:`1M+`,stat2Label:`User Capacity`,stat3:`24/7`,stat3Label:`App Support`},{id:`04`,category:`UI/UX DESIGN`,titleLine1:`Human-Centric`,titleGradient:`UI/UX Experience Design`,titleLine2:`& Prototyping`,description:`Creating visually stunning, user-focused interface designs, wireframes, and design systems that elevate brand perception and boost customer engagement.`,btnPrimary:`Explore UI/UX Design`,btnPrimaryLink:`/services?type=uiux`,btnSecondary:`View Design Portfolio`,btnSecondaryLink:`/portfolio`,image:`/images/services_hero.png`,stat1:`Pixel Perfect`,stat1Label:`Design System`,stat2:`User-First`,stat2Label:`Prototyping`,stat3:`Figma`,stat3Label:`Interactive UX`}],Uo=()=>{let[e,t]=(0,x.useState)(0);(0,x.useEffect)(()=>{let e=setInterval(()=>{t(e=>(e+1)%Ho.length)},7e3);return()=>clearInterval(e)},[]);let n=Ho[e];return(0,b.jsxs)(`section`,{className:`executive-hero-section`,children:[(0,b.jsx)(`div`,{className:`executive-bg-orb orb-primary`}),(0,b.jsx)(`div`,{className:`executive-bg-orb orb-cyan`}),(0,b.jsx)(`div`,{className:`executive-grid-overlay`}),(0,b.jsxs)(`div`,{className:`executive-hero-container`,children:[(0,b.jsxs)(`div`,{className:`executive-top-bar`,children:[(0,b.jsxs)(`div`,{className:`executive-pill-tag`,children:[(0,b.jsx)(`span`,{className:`live-dot`}),(0,b.jsx)(`span`,{className:`tag-text`,children:n.category})]}),(0,b.jsxs)(`div`,{className:`slide-counter`,children:[(0,b.jsx)(`span`,{className:`count-active`,children:n.id}),(0,b.jsx)(`span`,{className:`count-sep`,children:`/`}),(0,b.jsxs)(`span`,{className:`count-total`,children:[`0`,Ho.length]})]})]}),(0,b.jsxs)(`div`,{className:`executive-hero-grid`,children:[(0,b.jsxs)(`div`,{className:`executive-text-col`,children:[(0,b.jsxs)(`h1`,{className:`executive-title`,children:[n.titleLine1,` `,(0,b.jsx)(`br`,{}),(0,b.jsx)(`span`,{className:`gradient-text`,children:n.titleGradient}),` `,(0,b.jsx)(`br`,{}),n.titleLine2]}),(0,b.jsx)(`p`,{className:`executive-lead-desc`,children:n.description}),(0,b.jsxs)(`div`,{className:`executive-cta-group`,children:[(0,b.jsxs)(N,{to:n.btnPrimaryLink||`/services`,className:`btn-executive-primary`,children:[(0,b.jsx)(`span`,{children:n.btnPrimary}),(0,b.jsx)(`i`,{className:`fas fa-arrow-right`})]}),(0,b.jsxs)(N,{to:n.btnSecondaryLink||`/contact`,className:`btn-executive-outline`,children:[(0,b.jsx)(`span`,{children:n.btnSecondary}),(0,b.jsx)(`i`,{className:`fas fa-chevron-right`})]})]}),(0,b.jsxs)(`div`,{className:`executive-metrics-ribbon`,children:[(0,b.jsxs)(`div`,{className:`metric-box`,children:[(0,b.jsx)(`h4`,{children:n.stat1}),(0,b.jsx)(`p`,{children:n.stat1Label})]}),(0,b.jsx)(`div`,{className:`metric-v-line`}),(0,b.jsxs)(`div`,{className:`metric-box`,children:[(0,b.jsx)(`h4`,{children:n.stat2}),(0,b.jsx)(`p`,{children:n.stat2Label})]}),(0,b.jsx)(`div`,{className:`metric-v-line`}),(0,b.jsxs)(`div`,{className:`metric-box`,children:[(0,b.jsx)(`h4`,{children:n.stat3}),(0,b.jsx)(`p`,{children:n.stat3Label})]})]})]}),(0,b.jsx)(`div`,{className:`executive-media-col`,children:(0,b.jsx)(`div`,{className:`executive-image-card`,children:(0,b.jsx)(`img`,{src:n.image,alt:n.titleLine1,className:`executive-hero-img`,onError:e=>{e.target.src=`/images/ygr.jpeg`}})})})]}),(0,b.jsx)(`div`,{className:`executive-slide-nav`,children:(0,b.jsx)(`div`,{className:`nav-tabs-container grid-4-tabs`,children:Ho.map((n,r)=>(0,b.jsxs)(`button`,{className:`nav-tab-item ${r===e?`active`:``}`,onClick:()=>t(r),children:[(0,b.jsxs)(`div`,{className:`tab-info`,children:[(0,b.jsx)(`span`,{className:`t-idx`,children:n.id}),(0,b.jsx)(`span`,{className:`t-name`,children:n.category})]}),(0,b.jsx)(`div`,{className:`tab-progress-track`,children:(0,b.jsx)(`div`,{className:`tab-progress-fill`})})]},n.id))})})]})]})},Wo=({target:e,duration:t=2e3})=>{let[n,r]=(0,x.useState)(0),i=(0,x.useRef)(null);return(0,x.useEffect)(()=>{let n=new IntersectionObserver(([i])=>{if(i.isIntersecting){let i=0,a=e/(t/16),o=()=>{i+=a,i<e?(r(Math.ceil(i)),requestAnimationFrame(o)):r(e)};o(),n.disconnect()}},{threshold:.1});return i.current&&n.observe(i.current),()=>n.disconnect()},[e,t]),(0,b.jsx)(`span`,{ref:i,children:n})},Go=()=>(0,b.jsx)(`section`,{className:`clean-intro-section`,children:(0,b.jsx)(`div`,{className:`clean-intro-container`,children:(0,b.jsxs)(`div`,{className:`clean-intro-grid`,children:[(0,b.jsx)(`div`,{className:`clean-intro-media`,children:(0,b.jsxs)(`div`,{className:`media-card-frame`,children:[(0,b.jsx)(`img`,{src:`/images/ygr_company_artwork.png`,alt:`YGR Global IT Services`,className:`media-team-photo`,onError:e=>{e.target.src=`/images/logo1.jpeg`}}),(0,b.jsxs)(`div`,{className:`media-badges-row`,children:[(0,b.jsxs)(`div`,{className:`trust-pill-badge`,children:[(0,b.jsx)(`i`,{className:`fas fa-certificate text-primary`}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`h5`,{children:`ISO 9001:2015`}),(0,b.jsx)(`p`,{children:`Certified Quality Standard`})]})]}),(0,b.jsxs)(`div`,{className:`trust-pill-badge`,children:[(0,b.jsx)(`i`,{className:`fas fa-shield-halved text-purple`}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`h5`,{children:`Bank-Grade`}),(0,b.jsx)(`p`,{children:`Cybersecurity Framework`})]})]})]})]})}),(0,b.jsxs)(`div`,{className:`clean-intro-content`,children:[(0,b.jsxs)(`div`,{className:`clean-eyebrow-pill`,children:[(0,b.jsx)(`i`,{className:`fas fa-bolt`}),(0,b.jsx)(`span`,{children:`YGR Excellence Hub`})]}),(0,b.jsxs)(`h2`,{className:`clean-intro-title`,children:[`Transforming Complexity Into`,` `,(0,b.jsx)(`span`,{className:`clean-gradient-text`,children:`Elegant Digital Solutions`})]}),(0,b.jsx)(`p`,{className:`clean-intro-para`,children:`Since our inception, YGR Gobal IT Services has been pioneering the digital frontier. We don't just write code — we engineer scalable, secure, and hyper-efficient digital ecosystems that drive measurable Fortune-level growth for our partners.`}),(0,b.jsxs)(`div`,{className:`clean-capabilities-grid`,children:[(0,b.jsxs)(`div`,{className:`clean-cap-card`,children:[(0,b.jsx)(`div`,{className:`cap-icon-circle`,children:(0,b.jsx)(`i`,{className:`fas fa-layer-group`})}),(0,b.jsxs)(`div`,{className:`cap-text-content`,children:[(0,b.jsx)(`h4`,{children:`Agile Delivery Engine`}),(0,b.jsx)(`p`,{children:`Rapid iterative sprints ensuring strict speed-to-market and seamless deployment.`})]})]}),(0,b.jsxs)(`div`,{className:`clean-cap-card`,children:[(0,b.jsx)(`div`,{className:`cap-icon-circle circle-cyan`,children:(0,b.jsx)(`i`,{className:`fas fa-brain`})}),(0,b.jsxs)(`div`,{className:`cap-text-content`,children:[(0,b.jsx)(`h4`,{children:`AI-Driven Architecture`}),(0,b.jsx)(`p`,{children:`Future-proof infrastructure engineered to handle tomorrow's scale and data demands.`})]})]})]}),(0,b.jsxs)(`div`,{className:`clean-bottom-row`,children:[(0,b.jsxs)(`div`,{className:`clean-metric-card`,children:[(0,b.jsxs)(`h3`,{children:[(0,b.jsx)(Wo,{target:10}),`+`]}),(0,b.jsx)(`p`,{children:`Years Innovation`})]}),(0,b.jsxs)(`div`,{className:`clean-metric-card`,children:[(0,b.jsxs)(`h3`,{children:[(0,b.jsx)(Wo,{target:99}),`%`]}),(0,b.jsx)(`p`,{children:`Client Retention`})]}),(0,b.jsxs)(N,{to:`/about`,className:`clean-btn-primary`,children:[(0,b.jsx)(`span`,{children:`Discover Our Legacy`}),(0,b.jsx)(`i`,{className:`fas fa-arrow-right`})]})]})]})]})})}),Ko=[{id:`web`,category:`dev`,title:`Website Architecture`,desc:`High-speed, SEO-optimized digital platforms designed for maximum conversion and brand authority.`,icon:`fa-solid fa-code`,metaLabel:`Delivery SLA`,metaValue:`4 Weeks`,link:`/services?type=web`,tag:`Web Tech`},{id:`webapp`,category:`dev`,title:`Enterprise Web Apps`,desc:`Robust, scalable cloud applications built with React, Node.js, and high-security architecture.`,icon:`fa-solid fa-layer-group`,metaLabel:`Delivery SLA`,metaValue:`8 Weeks`,link:`/services?type=webapp`,tag:`Cloud & SaaS`},{id:`mobile`,category:`dev`,title:`Mobile Experiences`,desc:`Native-grade iOS and Android apps that blend fluid performance with intuitive user interactions.`,icon:`fa-solid fa-mobile-screen-button`,metaLabel:`Delivery SLA`,metaValue:`10 Weeks`,link:`/services?type=mobile`,tag:`iOS & Android`},{id:`dm`,category:`growth`,title:`Growth Marketing`,desc:`Data-driven SEO, PPC, and lead generation strategies focused on measurable business ROI.`,icon:`fa-solid fa-chart-line`,metaLabel:`ROI Impact`,metaValue:`High Growth`,link:`/services?type=dm`,tag:`Marketing`},{id:`uiux`,category:`design`,title:`Experience Design`,desc:`Human-centric UI/UX research and prototyping that drives user engagement and long-term loyalty.`,icon:`fa-solid fa-pen-ruler`,metaLabel:`Cycle Time`,metaValue:`3 Weeks`,link:`/services?type=uiux`,tag:`UI / UX`},{id:`testing`,category:`dev`,title:`Quality Engineering`,desc:`Comprehensive manual and automated testing cycles ensuring zero-defect product launches.`,icon:`fa-solid fa-bug-slash`,metaLabel:`QA Coverage`,metaValue:`99.9%`,link:`/services?type=testing`,tag:`Cyber QA`}],qo=[{key:`all`,label:`All Solutions`},{key:`dev`,label:`Software Engineering`},{key:`design`,label:`Creative Design`},{key:`growth`,label:`Business Growth`}],Jo=()=>{let[e,t]=(0,x.useState)(`all`),n=e===`all`?Ko:Ko.filter(t=>t.category===e);return(0,b.jsx)(`section`,{className:`neat-services-section`,children:(0,b.jsxs)(`div`,{className:`neat-services-container`,children:[(0,b.jsxs)(`div`,{className:`neat-services-header`,children:[(0,b.jsxs)(`div`,{className:`neat-services-pill`,children:[(0,b.jsx)(`i`,{className:`fas fa-rocket`}),` Enterprise Capabilities`]}),(0,b.jsxs)(`h2`,{className:`neat-services-title`,children:[`Empowering Your `,(0,b.jsx)(`span`,{className:`neat-gradient-text`,children:`Digital Ecosystem`})]}),(0,b.jsx)(`p`,{className:`neat-services-subtext`,children:`We deliver cutting-edge IT services tailored for growth, high security, and unmatched user experiences on a global scale.`})]}),(0,b.jsx)(`div`,{className:`neat-services-tabs`,children:qo.map(n=>(0,b.jsx)(`button`,{className:`neat-tab-btn ${e===n.key?`active`:``}`,onClick:()=>t(n.key),children:(0,b.jsx)(`span`,{children:n.label})},n.key))}),(0,b.jsx)(`div`,{className:`neat-services-grid`,children:n.map(e=>(0,b.jsxs)(N,{to:e.link,className:`neat-service-card`,children:[(0,b.jsxs)(`div`,{className:`card-top-row`,children:[(0,b.jsx)(`div`,{className:`service-icon-box`,children:(0,b.jsx)(`i`,{className:e.icon})}),(0,b.jsx)(`span`,{className:`service-tag-chip`,children:e.tag})]}),(0,b.jsx)(`h3`,{className:`service-card-title`,children:e.title}),(0,b.jsx)(`p`,{className:`service-card-desc`,children:e.desc}),(0,b.jsxs)(`div`,{className:`service-card-footer`,children:[(0,b.jsxs)(`div`,{className:`service-meta`,children:[(0,b.jsxs)(`span`,{className:`meta-lbl`,children:[e.metaLabel,`:`]}),(0,b.jsx)(`span`,{className:`meta-val`,children:e.metaValue})]}),(0,b.jsx)(`div`,{className:`service-btn-arrow`,children:(0,b.jsx)(`i`,{className:`fas fa-arrow-right`})})]})]},e.id))})]})})},Yo=()=>(0,b.jsxs)(`section`,{className:`neat-cta-section`,children:[(0,b.jsxs)(`div`,{className:`neat-cta-mesh`,children:[(0,b.jsx)(`div`,{className:`cta-orb cta-orb-1`}),(0,b.jsx)(`div`,{className:`cta-orb cta-orb-2`}),(0,b.jsx)(`div`,{className:`cta-orb cta-orb-3`})]}),(0,b.jsx)(`div`,{className:`neat-cta-container`,children:(0,b.jsxs)(`div`,{className:`neat-cta-glass-card reveal-scale`,children:[(0,b.jsxs)(`div`,{className:`neat-cta-content`,children:[(0,b.jsxs)(`div`,{className:`cta-pill-badge`,children:[(0,b.jsx)(`i`,{className:`fas fa-sparkles text-accent`}),(0,b.jsx)(`span`,{children:`Free Architecture Review`})]}),(0,b.jsxs)(`h2`,{className:`neat-cta-heading`,children:[`Ready to Architect Your `,(0,b.jsx)(`span`,{className:`text-gradient`,children:`Digital Future?`})]}),(0,b.jsx)(`p`,{className:`neat-cta-subtext`,children:`Consult with our senior enterprise architects and receive a tailored scalability roadmap for your company — at zero cost.`})]}),(0,b.jsxs)(`div`,{className:`neat-cta-action-row`,children:[(0,b.jsxs)(N,{to:`/contact`,className:`btn-cta-primary`,children:[(0,b.jsx)(`span`,{children:`Start Your Project`}),(0,b.jsx)(`i`,{className:`fas fa-arrow-right`})]}),(0,b.jsx)(N,{to:`/services`,className:`btn-cta-ghost`,children:(0,b.jsx)(`span`,{children:`Explore Services`})})]})]})})]}),Xo=[{id:`security`,title:`Bank-Grade Cybersecurity & Compliance`,desc:`Multi-layered encryption protocols, zero-trust architecture, and strict ISO 9001 quality compliance.`,icon:`fas fa-shield-halved`,isLarge:!0,tag:`Enterprise Standard`},{id:`speed`,title:`Rapid Speed-to-Market`,desc:`Agile 2-week sprint cycles ensuring fast feature deployment.`,icon:`fas fa-bolt`,tag:`Agile Engine`},{id:`uptime`,title:`99.99% Cloud SLA Uptime`,desc:`High-availability infrastructure engineered for zero downtime.`,icon:`fas fa-server`,tag:`Cloud Reliability`},{id:`team`,title:`Dedicated Senior Engineers`,desc:`Hand-picked developers, architects, and QA engineers working as an extension of your team.`,icon:`fas fa-user-gear`,tag:`Expert Talent`},{id:`support`,title:`Borderless 24/7 Delivery`,desc:`Round-the-clock technical operations across USA, UK, Canada, and India timezones.`,icon:`fas fa-globe-americas`,tag:`Global Hubs`}],Zo=()=>(0,b.jsx)(`section`,{className:`bento-why-section`,children:(0,b.jsxs)(`div`,{className:`bento-why-container`,children:[(0,b.jsxs)(`div`,{className:`bento-why-header`,children:[(0,b.jsxs)(`div`,{className:`bento-eyebrow-pill`,children:[(0,b.jsx)(`i`,{className:`fas fa-award text-accent`}),(0,b.jsx)(`span`,{children:`Unmatched Excellence`})]}),(0,b.jsxs)(`h2`,{className:`bento-why-title`,children:[`Why Global Leaders `,(0,b.jsx)(`span`,{className:`text-gradient`,children:`Partner With YGR`})]}),(0,b.jsx)(`p`,{className:`bento-why-subtext`,children:`We combine deep technical expertise, bulletproof security, and agile execution to deliver digital products that dominate markets.`})]}),(0,b.jsx)(`div`,{className:`bento-grid-layout`,children:Xo.map(e=>(0,b.jsxs)(`div`,{className:`bento-card ${e.isLarge?`bento-card-large`:``}`,children:[(0,b.jsxs)(`div`,{className:`bento-card-header`,children:[(0,b.jsx)(`div`,{className:`bento-icon-box`,children:(0,b.jsx)(`i`,{className:e.icon})}),(0,b.jsx)(`span`,{className:`bento-chip`,children:e.tag})]}),(0,b.jsx)(`h3`,{className:`bento-card-title`,children:e.title}),(0,b.jsx)(`p`,{className:`bento-card-desc`,children:e.desc})]},e.id))})]})}),Qo=[{id:`1`,client_name:`David Miller`,role:`Chief Technology Officer`,company_name:`FinTech Dynamics`,country:`USA`,message:`YGR Gobal delivered our core cloud payment engine 3 weeks ahead of schedule. Their zero-trust security architecture gave us complete peace of mind.`,rating:5},{id:`2`,client_name:`Sarah Jenkins`,role:`VP of Engineering`,company_name:`CloudScale Logistics`,country:`Canada`,message:`The speed and execution quality of YGR senior engineers are outstanding. They seamlessly integrated with our team and scaled our mobile app to 1M+ users.`,rating:5},{id:`3`,client_name:`Vikram Malhotra`,role:`Managing Director`,company_name:`Apex Health Systems`,country:`UK`,message:`Working with YGR transformed our digital presence. Their data-driven marketing and custom web portal delivered a 300% surge in qualified client leads.`,rating:5}],$o=e=>{if(!e)return`YG`;let t=e.trim().split(` `);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():e.substring(0,2).toUpperCase()},es=[`#2563EB`,`#06B6D4`,`#8B5CF6`,`#10B981`,`#F59E0B`],ts=()=>{let[e,t]=(0,x.useState)(Qo);return(0,x.useEffect)(()=>{fetch(`/api/public/testimonials/`).then(e=>{if(!e.ok)throw Error(`API Error`);return e.json()}).then(e=>{Array.isArray(e)&&e.length>0&&t(e)}).catch(e=>{console.warn(`Falling back to default testimonials:`,e)})},[]),(0,b.jsx)(`section`,{className:`neat-testi-section`,children:(0,b.jsxs)(`div`,{className:`neat-testi-container`,children:[(0,b.jsxs)(`div`,{className:`neat-testi-header`,children:[(0,b.jsxs)(`div`,{className:`testi-eyebrow-pill`,children:[(0,b.jsx)(`i`,{className:`fas fa-quote-left text-primary`}),(0,b.jsx)(`span`,{children:`Client Trust & Impact`})]}),(0,b.jsxs)(`h2`,{className:`neat-testi-title`,children:[`What Enterprise Leaders `,(0,b.jsx)(`span`,{className:`text-gradient`,children:`Say About YGR`})]}),(0,b.jsx)(`p`,{className:`neat-testi-subtext`,children:`Read dynamic testimonials from CTOs, product leaders, and enterprise partners connected to our live backend.`})]}),(0,b.jsx)(`div`,{className:`neat-testi-grid`,children:e.map((e,t)=>{let n=$o(e.client_name),r=es[t%es.length],i=e.rating||5;return(0,b.jsxs)(`div`,{className:`neat-testi-card`,children:[(0,b.jsx)(`div`,{className:`testi-stars-row`,children:[...Array(i)].map((e,t)=>(0,b.jsx)(`i`,{className:`fas fa-star text-gold`},t))}),(0,b.jsxs)(`p`,{className:`testi-quote-text`,children:[`"`,e.message,`"`]}),(0,b.jsxs)(`div`,{className:`testi-author-row`,children:[(0,b.jsx)(`div`,{className:`author-avatar`,style:{backgroundColor:r},children:n}),(0,b.jsxs)(`div`,{className:`author-details`,children:[(0,b.jsx)(`h4`,{children:e.client_name}),(0,b.jsxs)(`p`,{children:[e.role?`${e.role} • `:``,(0,b.jsx)(`span`,{children:e.company_name||`Enterprise Client`}),e.country?` (${e.country})`:``]})]})]})]},e.id||t)})})]})})},ns=({target:e,duration:t=2e3})=>{let[n,r]=(0,x.useState)(0),i=(0,x.useRef)(null);return(0,x.useEffect)(()=>{let n=new IntersectionObserver(([i])=>{if(i.isIntersecting){let i=0,a=e/(t/16),o=()=>{i+=a,i<e?(r(Math.ceil(i)),requestAnimationFrame(o)):r(e)};o(),n.disconnect()}},{threshold:.1});return i.current&&n.observe(i.current),()=>n.disconnect()},[e,t]),(0,b.jsx)(`span`,{ref:i,children:n})},rs=[{id:`1`,number:100,suffix:`K+`,label:`Lines of Code Shipped`,icon:`fas fa-code-branch`},{id:`2`,number:4,suffix:``,label:`Global Operation Hubs`,icon:`fas fa-globe-americas`},{id:`3`,number:50,suffix:`+`,label:`Enterprise Clients`,icon:`fas fa-building`},{id:`4`,number:99,suffix:`.99%`,label:`Guaranteed SLA Uptime`,icon:`fas fa-server`}],is=()=>(0,b.jsx)(`section`,{className:`neat-stats-section`,children:(0,b.jsxs)(`div`,{className:`neat-stats-container`,children:[(0,b.jsxs)(`div`,{className:`neat-stats-header`,children:[(0,b.jsxs)(`div`,{className:`stats-eyebrow-pill`,children:[(0,b.jsx)(`i`,{className:`fas fa-chart-bar text-accent`}),(0,b.jsx)(`span`,{children:`Measured Performance`})]}),(0,b.jsxs)(`h2`,{className:`neat-stats-title`,children:[`Quantifiable Impact `,(0,b.jsx)(`span`,{className:`text-gradient`,children:`Delivered`})]}),(0,b.jsx)(`p`,{className:`neat-stats-subtext`,children:`Our numbers reflect our relentless commitment to speed, security, and global delivery standards.`})]}),(0,b.jsx)(`div`,{className:`neat-stats-grid`,children:rs.map(e=>(0,b.jsxs)(`div`,{className:`neat-stat-card`,children:[(0,b.jsx)(`div`,{className:`stat-icon-box`,children:(0,b.jsx)(`i`,{className:e.icon})}),(0,b.jsxs)(`h3`,{className:`stat-number`,children:[(0,b.jsx)(ns,{target:e.number}),e.suffix]}),(0,b.jsx)(`p`,{className:`stat-label`,children:e.label})]},e.id))})]})}),as=[{id:`usa`,country:`United States`,city:`Delaware Hub`,desc:`Strategic North American client engagement & cloud architecture center.`,status:`Online`,flag:`🇺🇸`},{id:`uk`,country:`United Kingdom`,city:`London Operations`,desc:`European enterprise relations & financial software consulting.`,status:`Online`,flag:`🇬🇧`},{id:`ca`,country:`Canada`,city:`Toronto Tech Center`,desc:`Cross-border SaaS engineering & AI product acceleration.`,status:`Online`,flag:`🇨🇦`},{id:`in`,country:`India`,city:`Visakhapatnam R&D Engine`,desc:`Primary 24/7 software development & quality assurance hub.`,status:`Active 24/7`,flag:`🇮🇳`}],os=()=>(0,b.jsx)(`section`,{className:`neat-presence-section`,children:(0,b.jsxs)(`div`,{className:`neat-presence-container`,children:[(0,b.jsxs)(`div`,{className:`neat-presence-header`,children:[(0,b.jsxs)(`div`,{className:`presence-eyebrow-pill`,children:[(0,b.jsx)(`i`,{className:`fas fa-globe text-primary`}),(0,b.jsx)(`span`,{children:`Global Delivery Network`})]}),(0,b.jsxs)(`h2`,{className:`neat-presence-title`,children:[`Borderless Operations Across `,(0,b.jsx)(`span`,{className:`text-gradient`,children:`Key Timezones`})]}),(0,b.jsx)(`p`,{className:`neat-presence-subtext`,children:`Our strategic global hubs enable continuous 24/7 engineering sprint cycles and zero-delay client support.`})]}),(0,b.jsx)(`div`,{className:`neat-presence-grid`,children:as.map(e=>(0,b.jsxs)(`div`,{className:`neat-hub-card`,children:[(0,b.jsxs)(`div`,{className:`hub-top-row`,children:[(0,b.jsx)(`span`,{className:`hub-flag`,children:e.flag}),(0,b.jsxs)(`div`,{className:`hub-status-pill`,children:[(0,b.jsx)(`span`,{className:`status-dot`}),(0,b.jsx)(`span`,{className:`status-txt`,children:e.status})]})]}),(0,b.jsx)(`h3`,{className:`hub-country`,children:e.country}),(0,b.jsx)(`h4`,{className:`hub-city`,children:e.city}),(0,b.jsx)(`p`,{className:`hub-desc`,children:e.desc})]},e.id))})]})}),ss=()=>((0,x.useEffect)(()=>{let e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`active`),e.unobserve(t.target))})},{threshold:.1}),t=()=>{document.querySelectorAll(`.reveal, .reveal-left, .reveal-right, .reveal-up`).forEach(t=>{e.observe(t)})};t();let n=setTimeout(()=>{t()},500);return()=>{clearTimeout(n),e.disconnect()}},[]),(0,b.jsxs)(`main`,{className:`home-page-wrapper`,children:[(0,b.jsx)(Uo,{}),(0,b.jsx)(Go,{}),(0,b.jsx)(Jo,{}),(0,b.jsx)(Yo,{}),(0,b.jsx)(Zo,{}),(0,b.jsx)(ts,{}),(0,b.jsx)(is,{}),(0,b.jsx)(os,{})]})),cs=()=>(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`section`,{className:`hero-wrap`,children:[(0,b.jsxs)(`video`,{autoplay:!0,muted:!0,loop:!0,playsinline:!0,className:`hero-video`,poster:`https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80`,children:[(0,b.jsx)(`source`,{src:``,type:`video/mp4`}),`Your browser does not support the video tag.`]}),(0,b.jsx)(`div`,{className:`hero-overlay`}),(0,b.jsxs)(`div`,{className:`hero-container`,children:[(0,b.jsxs)(`div`,{className:`hero-text`,children:[(0,b.jsx)(`span`,{children:`Strategic Technology Partner`}),(0,b.jsx)(`h1`,{children:`Architecting The Digital Future`}),(0,b.jsx)(`p`,{children:`Guiding enterprises through complex transformations with precision engineering and visionary strategy.`})]}),(0,b.jsxs)(`div`,{className:`hero-image-card`,children:[(0,b.jsx)(`img`,{src:`https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80`,alt:`About Us 1`,className:`hero-card-img`}),(0,b.jsx)(`img`,{src:`https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80`,alt:`About Us 2`,className:`hero-card-img`}),(0,b.jsx)(`img`,{src:`https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80`,alt:`About Us 3`,className:`hero-card-img`}),(0,b.jsx)(`img`,{src:`https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80`,alt:`About Us 4`,className:`hero-card-img`})]})]})]}),(0,b.jsx)(`section`,{className:`mnc-section reveal reveal-left`,children:(0,b.jsxs)(`div`,{className:`mnc-container`,children:[(0,b.jsxs)(`div`,{className:`mnc-identity-grid`,children:[(0,b.jsx)(`div`,{className:`mnc-heading-block`,children:(0,b.jsxs)(`div`,{className:`mnc-section-head`,children:[(0,b.jsx)(`span`,{className:`mnc-eyebrow`,children:`WHO WE ARE`}),(0,b.jsx)(`h2`,{className:`mnc-title`,children:`Driving Gobal Digital Transformation`})]})}),(0,b.jsx)(`div`,{className:`mnc-image-frame`,children:(0,b.jsx)(`div`,{className:`hero-collage`,children:(0,b.jsx)(`div`,{className:`collage-img collage-img-main`,children:(0,b.jsx)(`img`,{src:`/images/corporate_office.jpeg`,alt:`YGR Team Workspace`})})})}),(0,b.jsxs)(`div`,{className:`mnc-content`,children:[(0,b.jsxs)(`p`,{className:`mnc-desc-standard`,children:[(0,b.jsx)(`b`,{children:`YGR Gobal IT Services Pvt. Ltd., is a leading Best IT company in Hyderabad`}),`providing software development, web development, mobile app development, cloud solutions, DevOps services, AWS solutions, corporate training, internships, and professional IT courses. We offer industry-focused training in `,(0,b.jsx)(`b`,{children:`Java Full Stack, Python Full Stack, MERN Stack, MEAN Stack, Data Science, Software Testing, UI/UX Design, Artificial Intelligence, and Machine Learning.`})]}),(0,b.jsx)(`p`,{className:`mnc-desc-standard`,children:`YGR Gobal IT Services Pvt. Ltd. – Empowering Your Growth Through Technology. The name YGR stands for Your Growth Resource, reflecting our commitment to helping businesses and professionals achieve success through innovative technology solutions. We specialize in software development, AI automation, cloud services, digital transformation, and IT consulting.`}),(0,b.jsx)(`p`,{className:`mnc-desc-standard`,children:`With a strong focus on quality, innovation, and customer satisfaction, we deliver reliable and scalable solutions that drive business growth. Whether you are a business seeking technology expertise or a student looking to build a successful IT career, YGR Gobal IT Services Pvt. Ltd. is your trusted technology and training partner.`})]})]}),(0,b.jsxs)(`div`,{className:`section-head mnc-center-head`,children:[(0,b.jsx)(`span`,{className:`mnc-eyebrow`,children:`OUR PHILOSOPHY`}),(0,b.jsx)(`h2`,{className:`mnc-title`,children:`What YGR Stands For`}),(0,b.jsx)(`p`,{className:`values-desc`,children:`Every letter in YGR reflects our purpose — to discover and deliver unique, creative solutions that make your brand unforgettable.`})]}),(0,b.jsxs)(`div`,{className:`ygr-stands-grid`,children:[(0,b.jsxs)(`div`,{className:`ygr-letter-card`,children:[(0,b.jsx)(`p`,{className:`ygr-card-top-text`,children:`We explore ideas beyond the ordinary, empowering the next generation.`}),(0,b.jsxs)(`div`,{className:`ygr-card-header-flex`,children:[(0,b.jsx)(`div`,{className:`ygr-card-icon-top`,children:(0,b.jsx)(`i`,{className:`fas fa-user-graduate`})}),(0,b.jsx)(`h4`,{className:`ygr-card-title`,children:`YOUR`})]}),(0,b.jsx)(`p`,{className:`ygr-card-subtitle`,children:`Empowering the next generation`}),(0,b.jsx)(`div`,{className:`ygr-large-circle`,children:`Y`}),(0,b.jsxs)(`div`,{className:`ygr-card-bottom-flex`,children:[(0,b.jsx)(`div`,{className:`ygr-card-icon-bottom`,children:(0,b.jsx)(`i`,{className:`fas fa-lightbulb`})}),(0,b.jsx)(`h4`,{className:`ygr-card-bottom-title`,children:`INNOVATE`})]}),(0,b.jsx)(`p`,{className:`ygr-card-bottom-text`,children:`Find fresh ways to fuel growth`})]}),(0,b.jsxs)(`div`,{className:`ygr-letter-card`,children:[(0,b.jsx)(`p`,{className:`ygr-card-top-text`,children:`We stay ahead of the curve, driving sustainable business evolution.`}),(0,b.jsxs)(`div`,{className:`ygr-card-header-flex`,children:[(0,b.jsx)(`div`,{className:`ygr-card-icon-top`,children:(0,b.jsx)(`i`,{className:`fas fa-chart-line`})}),(0,b.jsx)(`h4`,{className:`ygr-card-title`,children:`GROWTH`})]}),(0,b.jsx)(`p`,{className:`ygr-card-subtitle`,children:`Driving sustainable evolution`}),(0,b.jsx)(`div`,{className:`ygr-large-circle`,children:`G`}),(0,b.jsxs)(`div`,{className:`ygr-card-bottom-flex`,children:[(0,b.jsx)(`div`,{className:`ygr-card-icon-bottom`,children:(0,b.jsx)(`i`,{className:`fas fa-cogs`})}),(0,b.jsx)(`h4`,{className:`ygr-card-bottom-title`,children:`SCALE`})]}),(0,b.jsx)(`p`,{className:`ygr-card-bottom-text`,children:`New solutions for evolving challenges`})]}),(0,b.jsxs)(`div`,{className:`ygr-letter-card`,children:[(0,b.jsx)(`p`,{className:`ygr-card-top-text`,children:`We guide enterprises with precision strategy, ensuring impactful investments.`}),(0,b.jsxs)(`div`,{className:`ygr-card-header-flex`,children:[(0,b.jsx)(`div`,{className:`ygr-card-icon-top`,children:(0,b.jsx)(`i`,{className:`fas fa-compass`})}),(0,b.jsx)(`h4`,{className:`ygr-card-title`,children:`RIGHT DIRECTION`})]}),(0,b.jsx)(`p`,{className:`ygr-card-subtitle`,children:`Guiding with precision strategy`}),(0,b.jsx)(`div`,{className:`ygr-large-circle`,children:`R`}),(0,b.jsxs)(`div`,{className:`ygr-card-bottom-flex`,children:[(0,b.jsx)(`div`,{className:`ygr-card-icon-bottom`,children:(0,b.jsx)(`i`,{className:`fas fa-handshake`})}),(0,b.jsx)(`h4`,{className:`ygr-card-bottom-title`,children:`COLLABORATE`})]}),(0,b.jsx)(`p`,{className:`ygr-card-bottom-text`,children:`Collaborate to create impactful results`})]})]})]})}),(0,b.jsx)(`section`,{className:`iso-impact-sec`,children:(0,b.jsxs)(`div`,{className:`iso-modern-flex`,children:[(0,b.jsxs)(`div`,{className:`iso-heading-block reveal reveal-right`,children:[(0,b.jsx)(`span`,{className:`mnc-eyebrow`,children:`CERTIFIED EXCELLENCE`}),(0,b.jsxs)(`h2`,{children:[`YGR Gobal IT Services `,(0,b.jsx)(`br`,{}),` ISO Certified Excellence`]})]}),(0,b.jsx)(`div`,{className:`iso-visual-side reveal reveal-left`,children:(0,b.jsx)(`img`,{src:`/images/iso1.jpeg`,alt:`ISO Certification`,className:`iso-badge`})}),(0,b.jsxs)(`div`,{className:`iso-info-side reveal reveal-right`,children:[(0,b.jsxs)(`p`,{children:[(0,b.jsx)(`b`,{children:`At YGR Gobal IT Services Pvt. Ltd.`}),`, quality, trust, and customer satisfaction are at the core of everything we `,(0,b.jsx)(`b`,{children:` We are proud to announce our achievement of ISO Certification`}),`, a significant milestone that reflects our commitment to maintaining international standards in service quality, business operations, and customer excellence.`]}),(0,b.jsx)(`p`,{children:`Our ISO-certified processes ensure that we consistently deliver reliable, secure, and high-performance IT solutions tailored to the evolving needs of businesses and organizations.`}),(0,b.jsxs)(`div`,{className:`iso-stats-integrated`,children:[(0,b.jsxs)(`div`,{className:`mnc-stat-inline`,children:[(0,b.jsx)(`h4`,{className:`counter`,"data-count":`144`,children:`0`}),(0,b.jsx)(`p`,{children:`Successful Projects`})]}),(0,b.jsxs)(`div`,{className:`mnc-stat-inline`,children:[(0,b.jsx)(`h4`,{className:`counter`,"data-count":`48`,children:`0`}),(0,b.jsx)(`p`,{children:`Expert Engineers`})]}),(0,b.jsxs)(`div`,{className:`mnc-stat-inline`,children:[(0,b.jsx)(`h4`,{className:`counter`,"data-count":`4`,children:`0`}),(0,b.jsx)(`p`,{children:`Gobal Markets`})]})]})]})]})}),(0,b.jsx)(`section`,{className:`global-services-sec reveal reveal-up`,children:(0,b.jsxs)(`div`,{className:`mnc-container`,children:[(0,b.jsxs)(`div`,{className:`section-head mnc-center-head`,children:[(0,b.jsx)(`span`,{className:`mnc-eyebrow`,children:`SOLUTIONS WITHOUT BORDERS`}),(0,b.jsx)(`h2`,{className:`mnc-title`,children:`Gobal IT Service Ecosystem`}),(0,b.jsx)(`p`,{className:`values-desc`,children:`Delivering end-to-end digital excellence across diverse industry verticals with precision and scale.`})]}),(0,b.jsxs)(`div`,{className:`global-services-grid`,children:[(0,b.jsxs)(`div`,{className:`service-item-card`,children:[(0,b.jsx)(`div`,{className:`service-icon-box`,children:(0,b.jsx)(`i`,{className:`fas fa-laptop-code`})}),(0,b.jsx)(`h4`,{children:`Custom Software`}),(0,b.jsx)(`p`,{children:`High-performance, scalable applications tailored to unique business needs and complex workflows.`})]}),(0,b.jsxs)(`div`,{className:`service-item-card`,children:[(0,b.jsx)(`div`,{className:`service-icon-box`,children:(0,b.jsx)(`i`,{className:`fas fa-cloud`})}),(0,b.jsx)(`h4`,{children:`Cloud Engineering`}),(0,b.jsx)(`p`,{children:`Strategic cloud migration and infrastructure optimization for the modern, distributed enterprise.`})]}),(0,b.jsxs)(`div`,{className:`service-item-card`,children:[(0,b.jsx)(`div`,{className:`service-icon-box`,children:(0,b.jsx)(`i`,{className:`fas fa-mobile-alt`})}),(0,b.jsx)(`h4`,{children:`Mobile Innovation`}),(0,b.jsx)(`p`,{children:`Native and cross-platform mobile experiences that engage users and drive business growth.`})]}),(0,b.jsxs)(`div`,{className:`service-item-card`,children:[(0,b.jsx)(`div`,{className:`service-icon-box`,children:(0,b.jsx)(`i`,{className:`fas fa-brain`})}),(0,b.jsx)(`h4`,{children:`Data Analytics & AI`}),(0,b.jsx)(`p`,{children:`Turning complex data into actionable insights using advanced machine learning and predictive models.`})]}),(0,b.jsxs)(`div`,{className:`service-item-card`,children:[(0,b.jsx)(`div`,{className:`service-icon-box`,children:(0,b.jsx)(`i`,{className:`fas fa-shield-alt`})}),(0,b.jsx)(`h4`,{children:`Cyber Security`}),(0,b.jsx)(`p`,{children:`Protecting digital assets with robust encryption, compliance frameworks, and proactive threat detection.`})]}),(0,b.jsxs)(`div`,{className:`service-item-card`,children:[(0,b.jsx)(`div`,{className:`service-icon-box`,children:(0,b.jsx)(`i`,{className:`fas fa-pencil-ruler`})}),(0,b.jsx)(`h4`,{children:`UI/UX Strategy`}),(0,b.jsx)(`p`,{children:`Human-centric design systems that bridge the gap between complex technology and intuitive user experience.`})]})]})]})}),(0,b.jsx)(`section`,{className:`strategy-sec reveal reveal-right`,children:(0,b.jsxs)(`div`,{className:`strategy-container`,children:[(0,b.jsxs)(`div`,{className:`section-head`,children:[(0,b.jsx)(`div`,{className:`tech-label`,children:`SYSTEM_ARCHITECTURE_V2.0`}),(0,b.jsx)(`span`,{className:`blueprint-eyebrow`,children:`Our Blueprint`}),(0,b.jsx)(`h2`,{className:`blueprint-title`,children:`Strategic Architecture`})]}),(0,b.jsxs)(`div`,{className:`strategy-grid`,children:[(0,b.jsxs)(`div`,{className:`blueprint-card`,children:[(0,b.jsx)(`i`,{className:`fas fa-bullseye`}),(0,b.jsx)(`h4`,{children:`Our Vision`}),(0,b.jsx)(`p`,{children:`To be a trusted gobal technology partner providing innovative and scalable IT solutions that foster a culture of technical excellence and sustainable growth.`})]}),(0,b.jsxs)(`div`,{className:`blueprint-card`,children:[(0,b.jsx)(`i`,{className:`fas fa-microchip`}),(0,b.jsx)(`h4`,{children:`Our Mission`}),(0,b.jsx)(`p`,{children:`To deliver high-quality, scalable digital ecosystems and provide world-class IT training that empowers the next generation of full-stack developers.`})]}),(0,b.jsxs)(`div`,{className:`blueprint-card`,children:[(0,b.jsx)(`i`,{className:`fas fa-handshake`}),(0,b.jsx)(`h4`,{children:`Our Commitment`}),(0,b.jsx)(`p`,{children:`Building strong client partnerships based on trust, performance, and transparency while continuously upgrading our technology stack.`})]})]})]})}),(0,b.jsxs)(`section`,{className:`trust-sec reveal reveal-left`,children:[(0,b.jsx)(`i`,{className:`fas fa-handshake edge-bg-icon edge-bg-l1`}),(0,b.jsx)(`i`,{className:`fas fa-gem edge-bg-icon edge-bg-l2`}),(0,b.jsx)(`i`,{className:`fas fa-award edge-bg-icon edge-bg-r1`}),(0,b.jsx)(`i`,{className:`fas fa-chart-line edge-bg-icon edge-bg-r2`}),(0,b.jsxs)(`div`,{className:`trust-container`,children:[(0,b.jsxs)(`div`,{className:`trust-intro`,children:[(0,b.jsx)(`span`,{className:`trust-eyebrow`,children:`THE YGR EDGE`}),(0,b.jsxs)(`h2`,{className:`trust-title`,children:[`Why Partner `,(0,b.jsx)(`br`,{}),`With Us?`]}),(0,b.jsx)(`p`,{className:`trust-desc`,children:`We combine technical precision with a client-centric approach to deliver measurable business impact.`})]}),(0,b.jsxs)(`div`,{className:`trust-grid-refined`,children:[(0,b.jsxs)(`div`,{className:`edge-card`,children:[(0,b.jsx)(`div`,{className:`edge-number`,children:`01`}),(0,b.jsxs)(`div`,{className:`edge-card-header`,children:[(0,b.jsx)(`div`,{className:`edge-icon-box`,children:(0,b.jsx)(`i`,{className:`fas fa-users-gear`})}),(0,b.jsx)(`h4`,{children:`Expert Team`})]}),(0,b.jsx)(`p`,{children:`Skilled professionals with deep domain expertise in full-stack development and digital transformation.`})]}),(0,b.jsxs)(`div`,{className:`edge-card`,children:[(0,b.jsx)(`div`,{className:`edge-number`,children:`02`}),(0,b.jsxs)(`div`,{className:`edge-card-header`,children:[(0,b.jsx)(`div`,{className:`edge-icon-box`,children:(0,b.jsx)(`i`,{className:`fas fa-clock-rotate-left`})}),(0,b.jsx)(`h4`,{children:`On-Time Delivery`})]}),(0,b.jsx)(`p`,{children:`Our agile methodology and rigorous project management ensure high-quality projects are delivered on time.`})]}),(0,b.jsxs)(`div`,{className:`edge-card`,children:[(0,b.jsx)(`div`,{className:`edge-number`,children:`03`}),(0,b.jsxs)(`div`,{className:`edge-card-header`,children:[(0,b.jsx)(`div`,{className:`edge-icon-box`,children:(0,b.jsx)(`i`,{className:`fas fa-globe-americas`})}),(0,b.jsx)(`h4`,{children:`Gobal Standards`})]}),(0,b.jsx)(`p`,{children:`Serving clients in USA, UK, and Canada with benchmarks that meet international service quality standards.`})]})]})]})]}),(0,b.jsxs)(`section`,{className:`tree-journey-sec`,children:[(0,b.jsx)(`div`,{className:`ygr-rotate-brand`,children:`YGR`}),(0,b.jsx)(`i`,{className:`fas fa-cog tree-big-symbol symbol-1`}),(0,b.jsx)(`i`,{className:`fas fa-globe tree-big-symbol symbol-2`}),(0,b.jsx)(`i`,{className:`fas fa-rocket tree-big-symbol symbol-3`}),(0,b.jsx)(`i`,{className:`fas fa-microchip tree-big-symbol symbol-4`}),(0,b.jsx)(`i`,{className:`fas fa-lightbulb tree-big-symbol symbol-5`}),(0,b.jsxs)(`div`,{className:`mnc-container`,children:[(0,b.jsxs)(`div`,{className:`section-head mnc-center-head reveal reveal-up`,children:[(0,b.jsx)(`span`,{className:`mnc-eyebrow`,children:`THE ROAD TO EXCELLENCE`}),(0,b.jsx)(`h2`,{className:`mnc-title`,children:`Our Corporate Journey`}),(0,b.jsx)(`p`,{className:`values-desc`,children:`Tracing the evolution of YGR Gobal from a specialized consultancy to a full-spectrum IT powerhouse.`})]}),(0,b.jsxs)(`div`,{className:`tree-container`,children:[(0,b.jsxs)(`div`,{className:`tree-branch reveal reveal-right`,children:[(0,b.jsx)(`div`,{className:`tree-node-marker`}),(0,b.jsx)(`div`,{className:`tree-year-display`,children:`2023`}),(0,b.jsx)(`div`,{className:`tree-content-wrap`,children:(0,b.jsxs)(`div`,{className:`tree-card`,children:[(0,b.jsx)(`div`,{className:`tree-card-curve`}),(0,b.jsx)(`span`,{className:`tree-year-badge`,children:`2023 - FOUNDATION`}),(0,b.jsx)(`h5`,{children:` YGR Gobal Services`}),(0,b.jsx)(`p`,{children:`YGR began as an overseas consultancy, helping Indian students pursue higher education opportunities in other countries. This marked the foundation of our global vision and international exposure. Over time, we became one of the best software companies in KPHB Hyderabad.`})]})})]}),(0,b.jsxs)(`div`,{className:`tree-branch reveal reveal-right`,children:[(0,b.jsx)(`div`,{className:`tree-node-marker`}),(0,b.jsx)(`div`,{className:`tree-year-display`,children:`2024`}),(0,b.jsx)(`div`,{className:`tree-content-wrap`,children:(0,b.jsxs)(`div`,{className:`tree-card`,children:[(0,b.jsx)(`div`,{className:`tree-card-curve`}),(0,b.jsx)(`span`,{className:`tree-year-badge`,children:`2024 - PIVOT`}),(0,b.jsx)(`h5`,{children:` YGR Gobal IT Services Pvt. Ltd.`}),(0,b.jsx)(`p`,{children:`With increasing demand for digital solutions, we expanded into the IT services domain. We started serving startups and businesses with a wide range of services including: Web Design, Web Applications, Mobile App Development, Digital Marketing, UI/UX Design, Software Testing, IT Support & Maintenance, and Internship & Training programs. Our focus has always been on delivering scalable, reliable, and high-quality digital solutions tailored to the needs of our clients..`})]})})]}),(0,b.jsxs)(`div`,{className:`tree-branch reveal reveal-right`,children:[(0,b.jsx)(`div`,{className:`tree-node-marker`}),(0,b.jsx)(`div`,{className:`tree-year-display`,children:`2025`}),(0,b.jsx)(`div`,{className:`tree-content-wrap`,children:(0,b.jsxs)(`div`,{className:`tree-card`,children:[(0,b.jsx)(`div`,{className:`tree-card-curve`}),(0,b.jsx)(`span`,{className:`tree-year-badge`,children:`2025 - ECOSYSTEM`}),(0,b.jsx)(`h5`,{children:`IT Trainings & Co-Working Spaces`}),(0,b.jsx)(`p`,{children:`We launched IT training programs to empower students, professionals, and entrepreneurs with practical skills and real-world exposure. The IT training programs include full stack development, software training, and hands-on workshops designed to equip learners with industry-ready skills.`}),(0,b.jsx)(`h5`,{children:`Co-Working Spaces`}),(0,b.jsx)(`p`,{children:`Our co-working spaces provide modern office infrastructure, high-speed internet, meeting rooms, and a collaborative community where startups and freelancers can work, network, and innovate together.`})]})})]}),(0,b.jsxs)(`div`,{className:`tree-branch reveal reveal-right`,children:[(0,b.jsx)(`div`,{className:`tree-node-marker`}),(0,b.jsx)(`div`,{className:`tree-year-display`,children:`2026`}),(0,b.jsx)(`div`,{className:`tree-content-wrap`,children:(0,b.jsxs)(`div`,{className:`tree-card`,children:[(0,b.jsx)(`div`,{className:`tree-card-curve`}),(0,b.jsx)(`span`,{className:`tree-year-badge`,children:`2026 - FUTURE`}),(0,b.jsx)(`h5`,{children:` Expansion & Innovation`}),(0,b.jsx)(`p`,{children:`We are preparing for future upgrades, advanced technology services, and global expansion to build a stronger innovation-driven ecosystem.`}),(0,b.jsx)(`h5`,{children:`Upgrade U App`}),(0,b.jsx)(`p`,{children:`As part of this expansion, we are developing a new "upgrade U" app that will help businesses manage their operations efficiently, track project progress, and collaborate seamlessly with their teams. This app will integrate digital tools, cloud services, and analytics to enhance productivity and streamline workflows for startups and enterprises alike.`})]})})]})]})]})]}),(0,b.jsx)(`section`,{className:`values-sec reveal reveal-right`,children:(0,b.jsxs)(`div`,{className:`mnc-container`,children:[(0,b.jsxs)(`div`,{className:`section-head`,children:[(0,b.jsx)(`span`,{className:`values-eyebrow`,children:`OUR DNA`}),(0,b.jsx)(`h2`,{className:`values-title`,children:`Corporate Values`}),(0,b.jsx)(`p`,{className:`values-desc`,children:`The ethical framework that guides our gobal operations and client partnerships.`})]}),(0,b.jsxs)(`div`,{className:`values-grid-mnc`,children:[(0,b.jsxs)(`div`,{className:`value-card`,children:[(0,b.jsx)(`i`,{className:`fas fa-shield-alt`}),(0,b.jsx)(`h4`,{children:`Integrity`}),(0,b.jsx)(`p`,{children:`We operate with uncompromising honesty, ethics, and full accountability in every client engagement.`})]}),(0,b.jsxs)(`div`,{className:`value-card`,children:[(0,b.jsx)(`i`,{className:`fas fa-lightbulb`}),(0,b.jsx)(`h4`,{children:`Innovation`}),(0,b.jsx)(`p`,{children:`Continuously embracing emerging technologies and creative thinking to deliver future-proof solutions.`})]}),(0,b.jsxs)(`div`,{className:`value-card`,children:[(0,b.jsx)(`i`,{className:`fas fa-smile`}),(0,b.jsx)(`h4`,{children:`Client Focus`}),(0,b.jsx)(`p`,{children:`Our success is measured by the growth and satisfaction of the businesses we empower gobally.`})]}),(0,b.jsxs)(`div`,{className:`value-card`,children:[(0,b.jsx)(`i`,{className:`fas fa-search`}),(0,b.jsx)(`h4`,{children:`Transparency`}),(0,b.jsx)(`p`,{children:`Ensuring complete process visibility and clear communication through every stage of development.`})]})]})]})}),(0,b.jsx)(`script`,{dangerouslySetInnerHTML:{__html:`
        document.addEventListener('DOMContentLoaded', function () {
            const video = document.querySelector('.hero-video');
            if (video) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Autoplay prevented.");
                        document.body.addEventListener('click', () => {
                            video.play();
                        }, { once: true });
                    });
                }
            }

            // REVEAL ON SCROLL
            const reveal = () => {
                const reveals = document.querySelectorAll('.reveal');
                reveals.forEach(el => {
                    const windowHeight = window.innerHeight;
                    const elementTop = el.getBoundingClientRect().top;
                    const elementVisible = 150;
                    if (elementTop < windowHeight - elementVisible) {
                        el.classList.add('active');
                    }
                });
            };
            window.addEventListener('scroll', reveal);
            reveal(); // Initial check


            // COUNTER SCRIPT
            const counters = document.querySelectorAll('.counter');
            const animateCounter = (counter) => {
                const target = +counter.getAttribute('data-count');
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                function update() {
                    count += increment;
                    if (count < target) {
                        counter.innerText = Math.floor(count);
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = target + "+";
                    }
                }
                update();
            };

            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            counters.forEach(counter => { observer.observe(counter); });
        });
    `}})]}),ls=()=>{let e=_t(),t=new URLSearchParams(e.search).get(`type`)||`web`;return x.useEffect(()=>{let e=document.querySelectorAll(`.service-main-container`),n={web:0,webapp:1,mobile:2,dm:3,uiux:4,testing:5,support:6,intern:7}[t];n===void 0&&(n=0),e.forEach((e,t)=>{t===n?e.style.display=`block`:e.style.display=`none`}),document.querySelectorAll(`.desktop-nav-links .service-nav-link`).forEach(e=>{e.classList.remove(`active`),e.getAttribute(`href`)&&e.getAttribute(`href`).includes(`?type=`+t)&&e.classList.add(`active`)}),document.querySelectorAll(`.custom-select-options a`).forEach(e=>{e.classList.remove(`active`),e.getAttribute(`href`)&&e.getAttribute(`href`).includes(`?type=`+t)&&e.classList.add(`active`)}),window.scrollTo(0,0)},[t]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`nav`,{className:`service-nav-bar`,children:[(0,b.jsxs)(`div`,{className:`container desktop-nav-links`,children:[(0,b.jsx)(N,{to:`?type=web`,className:`service-nav-link active`,children:`Web Design`}),(0,b.jsx)(N,{to:`?type=webapp`,className:`service-nav-link active`,children:`Web Apps`}),(0,b.jsx)(N,{to:`?type=mobile`,className:`service-nav-link active`,children:`Mobile Apps`}),(0,b.jsx)(N,{to:`?type=dm`,className:`service-nav-link active`,children:`Marketing`}),(0,b.jsx)(N,{to:`?type=uiux`,className:`service-nav-link active`,children:`UI / UX`}),(0,b.jsx)(N,{to:`?type=testing`,className:`service-nav-link active`,children:`Testing`}),(0,b.jsx)(N,{to:`?type=support`,className:`service-nav-link active`,children:`Support`}),(0,b.jsx)(N,{to:`?type=intern`,className:`service-nav-link active`,children:`Internships`})]}),(0,b.jsx)(`div`,{className:`container mobile-nav-dropdown`,children:(0,b.jsxs)(`div`,{className:`custom-service-select`,children:[(0,b.jsxs)(`button`,{type:`button`,className:`custom-select-trigger`,children:[(0,b.jsx)(`span`,{children:`Web Design Web Apps Mobile Apps Marketing UI / UX Testing Support Internships Services`}),(0,b.jsx)(`i`,{className:`fas fa-chevron-down`})]}),(0,b.jsxs)(`div`,{className:`custom-select-options`,children:[(0,b.jsx)(N,{to:`?type=web`,className:`active`,children:`Web Design`}),(0,b.jsx)(N,{to:`?type=webapp`,className:`active`,children:`Web Apps`}),(0,b.jsx)(N,{to:`?type=mobile`,className:`active`,children:`Mobile Apps`}),(0,b.jsx)(N,{to:`?type=dm`,className:`active`,children:`Marketing`}),(0,b.jsx)(N,{to:`?type=uiux`,className:`active`,children:`UI / UX`}),(0,b.jsx)(N,{to:`?type=testing`,className:`active`,children:`Testing`}),(0,b.jsx)(N,{to:`?type=support`,className:`active`,children:`Support`}),(0,b.jsx)(N,{to:`?type=intern`,className:`active`,children:`Internships`})]})]})})]}),(0,b.jsxs)(`div`,{className:`service-main-container mesh-gradient animated-bg`,children:[(0,b.jsxs)(`section`,{className:`hero-glass-container reveal`,children:[(0,b.jsxs)(`div`,{className:`hero-glass-content`,children:[(0,b.jsx)(`span`,{className:`reveal`,children:`Development Excellence`}),(0,b.jsx)(`h1`,{children:`Modern Website Architecture`}),(0,b.jsx)(`p`,{children:`We blend aesthetic excellence with technical precision to build websites that are fast, secure, and conversion-optimized.`}),(0,b.jsx)(`div`,{className:`hero-actions`,children:(0,b.jsx)(`a`,{href:`/contact`,className:`gold-btn`,children:`Start Your Project`})})]}),(0,b.jsx)(`div`,{className:`hero-abstract-art d-none d-lg-block`,children:(0,b.jsx)(`img`,{src:`/images/web.png`,style:{maxWidth:`500px`,borderRadius:`30px`,transform:`perspective(1000px) rotateY(-15deg)`,boxShadow:`0 20px 60px rgba(0,0,0,0.3)`}})})]}),(0,b.jsx)(`section`,{className:`execution-model-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`The Blueprint`}),(0,b.jsx)(`h2`,{children:`Strategic Delivery Model`}),(0,b.jsx)(`p`,{children:`A structured approach to engineering digital excellence for your brand.`})]}),(0,b.jsxs)(`div`,{className:`model-grid`,children:[(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`01`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-search-dollar`})}),(0,b.jsx)(`h4`,{children:`Discovery`}),(0,b.jsx)(`p`,{children:`In-depth analysis of your market, competitors, and core business objectives to define a winning strategy.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`02`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-drafting-compass`})}),(0,b.jsx)(`h4`,{children:`Architecture`}),(0,b.jsx)(`p`,{children:`Defining the technical stack and UI/UX wireframes to ensure scalability and user-centric navigation.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`03`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-layer-group`})}),(0,b.jsx)(`h4`,{children:`Development`}),(0,b.jsx)(`p`,{children:`Agile engineering with clean code practices, transforming designs into a high-performance digital asset.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`04`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-rocket`})}),(0,b.jsx)(`h4`,{children:`Optimization`}),(0,b.jsx)(`p`,{children:`Rigorous testing, SEO fine-tuning, and deployment followed by continuous performance monitoring.`})]})]})]})}),(0,b.jsx)(`section`,{className:`pricing-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Flexible Plans`}),(0,b.jsx)(`h2`,{children:`Choose Your Digital Scale`})]}),(0,b.jsxs)(`div`,{className:`row g-4 pricing-scroll-track`,children:[(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Startup`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹16,999`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` 5 Custom Pages`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Basic Logo Design`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Free Hosting (1st Year)`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` SSL Certificate`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Social Integration`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Get Started`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsx)(`div`,{className:`badge-popular`,children:`MOST POPULAR`}),(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Business`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹27,999`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` 10 Professional Pages`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Premium Logo Design`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` 2 Business Emails`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Advanced SEO`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Priority Support`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Get Started`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`E-Commerce`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹39,999`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` 30+ Products`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Inventory Management`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Payment Gateway`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Order Tracking`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Secure Checkout`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Get Started`})]})})]})]})}),(0,b.jsxs)(`section`,{className:`advantage-section py-5`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`The YGR Advantage`}),(0,b.jsx)(`h2`,{children:`Why Businesses Trust Us`})]}),(0,b.jsxs)(`div`,{className:`advantage-grid`,children:[(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-code`}),(0,b.jsx)(`h4`,{children:`Clean Architecture`}),(0,b.jsx)(`p`,{children:`We write scalable, maintainable code using the latest industry standards.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-shield-alt`}),(0,b.jsx)(`h4`,{children:`Ironclad Security`}),(0,b.jsx)(`p`,{children:`Advanced encryption and security protocols protect your data 24/7.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-bolt`}),(0,b.jsx)(`h4`,{children:`Lightning Speed`}),(0,b.jsx)(`p`,{children:`Optimized assets and server-side performance for instant load times.`})]})]})]})]}),(0,b.jsxs)(`div`,{className:`service-main-container mesh-gradient animated-bg`,children:[(0,b.jsxs)(`section`,{className:`hero-glass-container reveal`,children:[(0,b.jsxs)(`div`,{className:`hero-glass-content`,children:[(0,b.jsx)(`span`,{className:`reveal`,children:`Enterprise Solutions`}),(0,b.jsx)(`h1`,{children:`Scalable Web Applications`}),(0,b.jsx)(`p`,{children:`We build robust, multi-tenant web applications with seamless integrations and cloud-native architectures.`}),(0,b.jsx)(`div`,{className:`hero-actions`,children:(0,b.jsx)(`a`,{href:`/contact`,className:`gold-btn`,children:`Consult Our Experts`})})]}),(0,b.jsx)(`div`,{className:`hero-abstract-art d-none d-lg-block`,children:(0,b.jsx)(`img`,{src:`/images/wds.jpg`,style:{maxWidth:`500px`,borderRadius:`30px`,transform:`perspective(1000px) rotateY(-15deg)`,boxShadow:`0 20px 60px rgba(0,0,0,0.3)`}})})]}),(0,b.jsx)(`section`,{className:`execution-model-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Engineering Core`}),(0,b.jsx)(`h2`,{children:`Scalability Framework`}),(0,b.jsx)(`p`,{children:`How we build robust applications that grow with your enterprise.`})]}),(0,b.jsxs)(`div`,{className:`model-grid`,children:[(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`01`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-microchip`})}),(0,b.jsx)(`h4`,{children:`System Design`}),(0,b.jsx)(`p`,{children:`Architecting database schemas and server logic for maximum efficiency and data integrity.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`02`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-network-wired`})}),(0,b.jsx)(`h4`,{children:`API Integration`}),(0,b.jsx)(`p`,{children:`Building secure, RESTful endpoints and integrating third-party services seamlessly.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`03`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-shield-virus`})}),(0,b.jsx)(`h4`,{children:`Security Layer`}),(0,b.jsx)(`p`,{children:`Implementing JWT, OAuth, and multi-factor authentication to protect enterprise data.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`04`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-cloud-upload-alt`})}),(0,b.jsx)(`h4`,{children:`CI/CD Pipeline`}),(0,b.jsx)(`p`,{children:`Automated deployment workflows ensuring zero downtime and rapid feature releases.`})]})]})]})}),(0,b.jsx)(`section`,{className:`pricing-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Tailored Engineering`}),(0,b.jsx)(`h2`,{children:`Scalable Pricing Models`})]}),(0,b.jsxs)(`div`,{className:`row g-4 pricing-scroll-track`,children:[(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`MVP`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹49,999`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Core Logic Dev`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` User Auth System`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Basic Database`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` API Integration`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Deployment Setup`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Start MVP`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsx)(`div`,{className:`badge-popular`,children:`BEST FOR SCALING`}),(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Business`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹99,999`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Advanced Dashboard`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Payment Gateways`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Role Based Access`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Data Analytics`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` 3 Months Maintenance`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Start Projectr`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Enterprise`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`Custom`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Microservices Arch`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Multi-region Cloud`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` AI/ML Integration`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Dedicated DevOps`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` 24/7 SLA Support`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Contact Sales`})]})})]})]})}),(0,b.jsxs)(`section`,{className:`advantage-section py-5`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`The YGR Advantage`}),(0,b.jsx)(`h2`,{children:`Why Businesses Trust Us`})]}),(0,b.jsxs)(`div`,{className:`advantage-grid`,children:[(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-code`}),(0,b.jsx)(`h4`,{children:`Clean Architecture`}),(0,b.jsx)(`p`,{children:`We write scalable, maintainable code using the latest industry standards.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-shield-alt`}),(0,b.jsx)(`h4`,{children:`Ironclad Security`}),(0,b.jsx)(`p`,{children:`Advanced encryption and security protocols protect your data 24/7.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-bolt`}),(0,b.jsx)(`h4`,{children:`Lightning Speed`}),(0,b.jsx)(`p`,{children:`Optimized assets and server-side performance for instant load times.`})]})]})]})]}),(0,b.jsxs)(`div`,{className:`service-main-container mesh-gradient animated-bg`,children:[(0,b.jsxs)(`section`,{className:`hero-glass-container reveal`,children:[(0,b.jsxs)(`div`,{className:`hero-glass-content`,children:[(0,b.jsx)(`span`,{className:`reveal`,children:`Mobility Innovation`}),(0,b.jsx)(`h1`,{children:`Next-Gen Mobile Experiences`}),(0,b.jsx)(`p`,{children:`Native performance with cross-platform efficiency. We build apps that users love to keep on their home screens.`}),(0,b.jsx)(`div`,{className:`hero-actions`,children:(0,b.jsx)(`a`,{href:`/contact`,className:`gold-btn`,children:`Get a Quote`})})]}),(0,b.jsx)(`div`,{className:`hero-abstract-art d-none d-lg-block`,children:(0,b.jsx)(`img`,{src:`/images/mp.png`,style:{maxWidth:`500px`,borderRadius:`30px`,transform:`perspective(1000px) rotateY(-15deg)`,boxShadow:`0 20px 60px rgba(0,0,0,0.3)`}})})]}),(0,b.jsx)(`section`,{className:`execution-model-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Mobility Focus`}),(0,b.jsx)(`h2`,{children:`App Engineering Lifecycle`}),(0,b.jsx)(`p`,{children:`Optimized for performance, battery life, and superior user engagement.`})]}),(0,b.jsxs)(`div`,{className:`model-grid`,children:[(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`01`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-mobile-alt`})}),(0,b.jsx)(`h4`,{children:`Native Optimization`}),(0,b.jsx)(`p`,{children:`Ensuring smooth 60FPS animations and responsive touch interactions across all devices.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`02`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-sync-alt`})}),(0,b.jsx)(`h4`,{children:`Offline-First`}),(0,b.jsx)(`p`,{children:`Implementing robust local caching to keep your app functional even without connectivity.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`03`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-bell`})}),(0,b.jsx)(`h4`,{children:`Push Strategy`}),(0,b.jsx)(`p`,{children:`Intelligent notification systems to drive user retention without being intrusive.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`04`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-store`})}),(0,b.jsx)(`h4`,{children:`App Store Ready`}),(0,b.jsx)(`p`,{children:`Full compliance with Apple and Google guidelines for a seamless approval process.`})]})]})]})}),(0,b.jsx)(`section`,{className:`pricing-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`App Store Success`}),(0,b.jsx)(`h2`,{children:`Mobile Development Packages`})]}),(0,b.jsxs)(`div`,{className:`row g-4 pricing-scroll-track`,children:[(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Basic App`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹29,999`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Single Platform (Android)`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` 5 Screen Design`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Firebase Auth`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Basic Analytics`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Play Store Upload`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Select Plan`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsx)(`div`,{className:`badge-popular`,children:`RECOMMENDED`}),(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Cross-Platform`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹59,999`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Flutter / React Native`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` iOS + Android`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Custom UI / UX`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Push Notifications`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` API Integration`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Select Plan`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Premium App`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹99,999+`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Complex Logic / AI`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Real-time Features`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Payment Wallet`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Offline Mode`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` 6 Months Support`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Select Plan`})]})})]})]})}),(0,b.jsxs)(`section`,{className:`advantage-section py-5`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`The YGR Advantage`}),(0,b.jsx)(`h2`,{children:`Why Businesses Trust Us`})]}),(0,b.jsxs)(`div`,{className:`advantage-grid`,children:[(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-code`}),(0,b.jsx)(`h4`,{children:`Clean Architecture`}),(0,b.jsx)(`p`,{children:`We write scalable, maintainable code using the latest industry standards.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-shield-alt`}),(0,b.jsx)(`h4`,{children:`Ironclad Security`}),(0,b.jsx)(`p`,{children:`Advanced encryption and security protocols protect your data 24/7.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-bolt`}),(0,b.jsx)(`h4`,{children:`Lightning Speed`}),(0,b.jsx)(`p`,{children:`Optimized assets and server-side performance for instant load times.`})]})]})]})]}),(0,b.jsxs)(`div`,{className:`service-main-container mesh-gradient animated-bg`,children:[(0,b.jsxs)(`section`,{className:`hero-glass-container reveal`,children:[(0,b.jsxs)(`div`,{className:`hero-glass-content`,children:[(0,b.jsx)(`span`,{className:`reveal`,children:`Market Dominance`}),(0,b.jsx)(`h1`,{children:`Data-Driven Growth`}),(0,b.jsx)(`p`,{children:`We combine analytics with creativity to drive meaningful engagement and ROI-focused marketing campaigns.`}),(0,b.jsx)(`div`,{className:`hero-actions`,children:(0,b.jsx)(`a`,{href:`/contact`,className:`gold-btn`,children:`Scale My Brand`})})]}),(0,b.jsx)(`div`,{className:`hero-abstract-art d-none d-lg-block`,children:(0,b.jsx)(`img`,{src:`/images/dmmm.jpeg`,style:{maxWidth:`500px`,borderRadius:`30px`,transform:`perspective(1000px) rotateY(-15deg)`,boxShadow:`0 20px 60px rgba(0,0,0,0.3)`}})})]}),(0,b.jsx)(`section`,{className:`execution-model-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Growth Engine`}),(0,b.jsx)(`h2`,{children:`ROI-First Strategy`}),(0,b.jsx)(`p`,{children:`A data-driven approach to acquiring and retaining high-value customers.`})]}),(0,b.jsxs)(`div`,{className:`model-grid`,children:[(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`01`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-bullseye`})}),(0,b.jsx)(`h4`,{children:`Precision Targeting`}),(0,b.jsx)(`p`,{children:`Using demographic and behavioral data to reach the exact audience likely to convert.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`02`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-funnel-dollar`})}),(0,b.jsx)(`h4`,{children:`Funnel Mastery`}),(0,b.jsx)(`p`,{children:`Optimizing every touchpoint from awareness to final purchase for maximum conversion.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`03`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-chart-line`})}),(0,b.jsx)(`h4`,{children:`Real-time Analytics`}),(0,b.jsx)(`p`,{children:`Constant A/B testing and performance tracking to pivot strategies for better results.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`04`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-users-cog`})}),(0,b.jsx)(`h4`,{children:`Retention Loop`}),(0,b.jsx)(`p`,{children:`Implementing loyalty programs and remarketing to increase customer lifetime value.`})]})]})]})}),(0,b.jsx)(`section`,{className:`pricing-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Strategic Performance`}),(0,b.jsx)(`h2`,{children:`Marketing Growth Plans`})]}),(0,b.jsxs)(`div`,{className:`row g-4 pricing-scroll-track`,children:[(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Starter`}),(0,b.jsxs)(`div`,{className:`price-amount`,children:[`₹9,999`,(0,b.jsx)(`span`,{children:`/mo`})]})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Basic SEO Optimization`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Social Media (2 Plat.)`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` 8 Custom Posts`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Google My Business`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Monthly Report`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Select Plan`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsx)(`div`,{className:`badge-popular`,children:`BEST ROI`}),(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Growth`}),(0,b.jsxs)(`div`,{className:`price-amount`,children:[`₹19,999`,(0,b.jsx)(`span`,{children:`/mo`})]})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Advanced SEO (On/Off)`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Social Media (3 Plat.)`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` 16 Custom Posts`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Google Ads Setup`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Bi-weekly Analytics`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Select Plan`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Scale`}),(0,b.jsxs)(`div`,{className:`price-amount`,children:[`₹39,999`,(0,b.jsx)(`span`,{children:`/mo`})]})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Full Funnel Strategy`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Ads (Google & Meta)`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Content Marketing`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Lead Gen Focus`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Weekly Deep Dive`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Select Plan`})]})})]})]})}),(0,b.jsxs)(`section`,{className:`advantage-section py-5`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`The YGR Advantage`}),(0,b.jsx)(`h2`,{children:`Why Businesses Trust Us`})]}),(0,b.jsxs)(`div`,{className:`advantage-grid`,children:[(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-code`}),(0,b.jsx)(`h4`,{children:`Clean Architecture`}),(0,b.jsx)(`p`,{children:`We write scalable, maintainable code using the latest industry standards.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-shield-alt`}),(0,b.jsx)(`h4`,{children:`Ironclad Security`}),(0,b.jsx)(`p`,{children:`Advanced encryption and security protocols protect your data 24/7.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-bolt`}),(0,b.jsx)(`h4`,{children:`Lightning Speed`}),(0,b.jsx)(`p`,{children:`Optimized assets and server-side performance for instant load times.`})]})]})]})]}),(0,b.jsxs)(`div`,{className:`service-main-container mesh-gradient animated-bg`,children:[(0,b.jsxs)(`section`,{className:`hero-glass-container reveal`,children:[(0,b.jsxs)(`div`,{className:`hero-glass-content`,children:[(0,b.jsx)(`span`,{className:`reveal`,children:`Visual Mastery`}),(0,b.jsx)(`h1`,{children:`Intuitive Product Design`}),(0,b.jsx)(`p`,{children:`We create digital experiences that feel as good as they look. User-centric design that converts curiosity into loyalty.`}),(0,b.jsx)(`div`,{className:`hero-actions`,children:(0,b.jsx)(`a`,{href:`/contact`,className:`gold-btn`,children:`Discuss Design`})})]}),(0,b.jsx)(`div`,{className:`hero-abstract-art d-none d-lg-block`,children:(0,b.jsx)(`img`,{src:`/images/ui.png`,style:{maxWidth:`500px`,borderRadius:`30px`,transform:`perspective(1000px) rotateY(-15deg)`,boxShadow:`0 20px 60px rgba(0,0,0,0.3)`}})})]}),(0,b.jsx)(`section`,{className:`execution-model-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Aesthetic Logic`}),(0,b.jsx)(`h2`,{children:`User-Centric Design Model`}),(0,b.jsx)(`p`,{children:`Where behavioral psychology meets pixel-perfect digital craftsmanship.`})]}),(0,b.jsxs)(`div`,{className:`model-grid`,children:[(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`01`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-user-friends`})}),(0,b.jsx)(`h4`,{children:`Persona Research`}),(0,b.jsx)(`p`,{children:`Deep diving into user behaviors to understand their pain points and expectations.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`02`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-stream`})}),(0,b.jsx)(`h4`,{children:`User Journeys`}),(0,b.jsx)(`p`,{children:`Mapping every possible interaction to ensure the path to goal is frictionless.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`03`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-palette`})}),(0,b.jsx)(`h4`,{children:`Visual Identity`}),(0,b.jsx)(`p`,{children:`Crafting a unique design system that reflects your brand's soul across all screens.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`04`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-vial`})}),(0,b.jsx)(`h4`,{children:`Usability Testing`}),(0,b.jsx)(`p`,{children:`Validating designs with real users to refine interactions before development starts.`})]})]})]})}),(0,b.jsx)(`section`,{className:`pricing-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Pixel Perfection`}),(0,b.jsx)(`h2`,{children:`Creative Design Packages`})]}),(0,b.jsxs)(`div`,{className:`row g-4 pricing-scroll-track`,children:[(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Essential`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹14,999`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Up to 5 Key Screens`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Basic Wireframing`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Brand Style Guide`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Clickable Prototype`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Figma Source Files`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Order Design`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsx)(`div`,{className:`badge-popular`,children:`BEST SELLER`}),(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Professional`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹29,999`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Up to 15 Screens`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` UX Research / Audits`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Micro-animations`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Design System`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Dev Handoff Support`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Order Design`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Premium Suite`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹49,999+`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Unlimited Screens`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Product Discovery`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` High-end Prototyping`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` User Testing Sessions`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Icon & Asset Library`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Order Design`})]})})]})]})}),(0,b.jsxs)(`section`,{className:`advantage-section py-5`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`The YGR Advantage`}),(0,b.jsx)(`h2`,{children:`Why Businesses Trust Us`})]}),(0,b.jsxs)(`div`,{className:`advantage-grid`,children:[(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-code`}),(0,b.jsx)(`h4`,{children:`Clean Architecture`}),(0,b.jsx)(`p`,{children:`We write scalable, maintainable code using the latest industry standards.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-shield-alt`}),(0,b.jsx)(`h4`,{children:`Ironclad Security`}),(0,b.jsx)(`p`,{children:`Advanced encryption and security protocols protect your data 24/7.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-bolt`}),(0,b.jsx)(`h4`,{children:`Lightning Speed`}),(0,b.jsx)(`p`,{children:`Optimized assets and server-side performance for instant load times.`})]})]})]})]}),(0,b.jsxs)(`div`,{className:`service-main-container mesh-gradient animated-bg`,children:[(0,b.jsxs)(`section`,{className:`hero-glass-container reveal`,children:[(0,b.jsxs)(`div`,{className:`hero-glass-content`,children:[(0,b.jsx)(`span`,{className:`reveal`,children:`Quality Assurance`}),(0,b.jsx)(`h1`,{children:`Flawless Software Delivery`}),(0,b.jsx)(`p`,{children:`We eliminate technical debt and security risks through rigorous manual and automated testing protocols.`}),(0,b.jsx)(`div`,{className:`hero-actions`,children:(0,b.jsx)(`a`,{href:`/contact`,className:`gold-btn`,children:`Secure My App`})})]}),(0,b.jsx)(`div`,{className:`hero-abstract-art d-none d-lg-block`,children:(0,b.jsx)(`img`,{src:`/images/st.webp`,style:{maxWidth:`500px`,borderRadius:`30px`,transform:`perspective(1000px) rotateY(-15deg)`,boxShadow:`0 20px 60px rgba(0,0,0,0.3)`}})})]}),(0,b.jsx)(`section`,{className:`execution-model-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Zero Bug Policy`}),(0,b.jsx)(`h2`,{children:`Quality Assurance Protocol`}),(0,b.jsx)(`p`,{children:`Rigorous testing frameworks to ensure your software is bulletproof before launch.`})]}),(0,b.jsxs)(`div`,{className:`model-grid`,children:[(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`01`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-vials`})}),(0,b.jsx)(`h4`,{children:`Manual Audit`}),(0,b.jsx)(`p`,{children:`Human-led testing to verify UI consistency, usability, and edge-case behavior.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`02`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-robot`})}),(0,b.jsx)(`h4`,{children:`Automation`}),(0,b.jsx)(`p`,{children:`Scripted regression tests that run on every build to prevent technical debt.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`03`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-tachometer-alt`})}),(0,b.jsx)(`h4`,{children:`Load Testing`}),(0,b.jsx)(`p`,{children:`Simulating high-traffic scenarios to ensure your infrastructure scales under pressure.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`04`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-user-check`})}),(0,b.jsx)(`h4`,{children:`UAT Phase`}),(0,b.jsx)(`p`,{children:`User Acceptance Testing to ensure the final product meets all business requirements.`})]})]})]})}),(0,b.jsx)(`section`,{className:`pricing-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Zero Bug Policy`}),(0,b.jsx)(`h2`,{children:`QA & Testing Packages`})]}),(0,b.jsxs)(`div`,{className:`row g-4 pricing-scroll-track`,children:[(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Basic QA`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹14,999`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Manual Testing`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Bug Tracking`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` UI / UX Validation`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Cross-browser Test`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Final QA Report`]})]}),(0,b.jsx)(`a`,{href:`/client-create`,className:`gold-btn w-100 d-inline-block text-center`,children:`Start Testing`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsx)(`div`,{className:`badge-popular`,children:`HIGH DEMAND`}),(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Standard`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹29,999`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Manual + Automation`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` API Testing`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Performance Testing`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Regression Cycles`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Weekly Status`]})]}),(0,b.jsx)(`a`,{href:`/client-create`,className:`gold-btn w-100 d-inline-block text-center`,children:`Start Testing`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Full Suite`}),(0,b.jsx)(`div`,{className:`price-amount`,children:`₹49,999+`})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Security Pen-Testing`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Load & Stress Test`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Continuous CI/CD QA`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Database Validation`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Dedicated Lead`]})]}),(0,b.jsx)(`a`,{href:`/client-create`,className:`gold-btn w-100 d-inline-block text-center`,children:`Start Testing`})]})})]})]})}),(0,b.jsxs)(`section`,{className:`advantage-section py-5`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`The YGR Advantage`}),(0,b.jsx)(`h2`,{children:`Why Businesses Trust Us`})]}),(0,b.jsxs)(`div`,{className:`advantage-grid`,children:[(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-code`}),(0,b.jsx)(`h4`,{children:`Clean Architecture`}),(0,b.jsx)(`p`,{children:`We write scalable, maintainable code using the latest industry standards.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-shield-alt`}),(0,b.jsx)(`h4`,{children:`Ironclad Security`}),(0,b.jsx)(`p`,{children:`Advanced encryption and security protocols protect your data 24/7.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-bolt`}),(0,b.jsx)(`h4`,{children:`Lightning Speed`}),(0,b.jsx)(`p`,{children:`Optimized assets and server-side performance for instant load times.`})]})]})]})]}),(0,b.jsxs)(`div`,{className:`service-main-container mesh-gradient animated-bg`,children:[(0,b.jsxs)(`section`,{className:`hero-glass-container reveal`,children:[(0,b.jsxs)(`div`,{className:`hero-glass-content`,children:[(0,b.jsx)(`span`,{className:`reveal`,children:`Technical Stability`}),(0,b.jsx)(`h1`,{children:`24/7 Managed Infrastructure`}),(0,b.jsx)(`p`,{children:`We provide proactive monitoring and maintenance to ensure your digital ecosystem is always operational, secure, and fast.`}),(0,b.jsx)(`div`,{className:`hero-actions`,children:(0,b.jsx)(`a`,{href:`/contact`,className:`gold-btn`,children:`Secure Support`})})]}),(0,b.jsx)(`div`,{className:`hero-abstract-art d-none d-lg-block`,children:(0,b.jsx)(`img`,{src:`/images/im.webp`,style:{maxWidth:`500px`,borderRadius:`30px`,transform:`perspective(1000px) rotateY(-15deg)`,boxShadow:`0 20px 60px rgba(0,0,0,0.3)`}})})]}),(0,b.jsx)(`section`,{className:`execution-model-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Uptime Priority`}),(0,b.jsx)(`h2`,{children:`Proactive Support Model`}),(0,b.jsx)(`p`,{children:`Managed infrastructure designed for zero downtime and maximum security.`})]}),(0,b.jsxs)(`div`,{className:`model-grid`,children:[(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`01`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-heartbeat`})}),(0,b.jsx)(`h4`,{children:`Real-time Mon.`}),(0,b.jsx)(`p`,{children:`Continuous health checks on servers and databases to identify issues before they occur.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`02`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-user-shield`})}),(0,b.jsx)(`h4`,{children:`Hardening`}),(0,b.jsx)(`p`,{children:`Regular security patches and firewall optimizations to protect against evolving threats.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`03`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-database`})}),(0,b.jsx)(`h4`,{children:`Data Safety`}),(0,b.jsx)(`p`,{children:`Automated multi-region backups and disaster recovery drills to ensure data persistence.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`04`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-headset`})}),(0,b.jsx)(`h4`,{children:`SLA Guarantee`}),(0,b.jsx)(`p`,{children:`Dedicated response times and technical support to keep your business running smoothly.`})]})]})]})}),(0,b.jsx)(`section`,{className:`pricing-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Reliable Care`}),(0,b.jsx)(`h2`,{children:`Maintenance & Support`})]}),(0,b.jsxs)(`div`,{className:`row g-4 pricing-scroll-track`,children:[(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Essential`}),(0,b.jsxs)(`div`,{className:`price-amount`,children:[`₹7,999`,(0,b.jsx)(`span`,{children:`/mo`})]})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Weekly Backups`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Security Updates`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Bug Fixes (Standard)`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Email Support`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Performance Check`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Select Plan`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsx)(`div`,{className:`badge-popular`,children:`PROACTIVE`}),(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Business`}),(0,b.jsxs)(`div`,{className:`price-amount`,children:[`₹14,999`,(0,b.jsx)(`span`,{children:`/mo`})]})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Daily Backups`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Priority Bug Fixes`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` 24/7 Monitoring`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Chat Support`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Monthly Health Audit`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Select Plan`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Enterprise`}),(0,b.jsxs)(`div`,{className:`price-amount`,children:[`₹29,999`,(0,b.jsx)(`span`,{children:`/mo`})]})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Real-time Monitoring`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Dedicated Engineer`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Cloud Management`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Phone Support`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Disaster Recovery`]})]}),(0,b.jsx)(`a`,{href:`/client-registration`,className:`gold-btn w-100 d-inline-block text-center`,children:`Select Plan`})]})})]})]})}),(0,b.jsxs)(`section`,{className:`advantage-section py-5`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`The YGR Advantage`}),(0,b.jsx)(`h2`,{children:`Why Businesses Trust Us`})]}),(0,b.jsxs)(`div`,{className:`advantage-grid`,children:[(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-code`}),(0,b.jsx)(`h4`,{children:`Clean Architecture`}),(0,b.jsx)(`p`,{children:`We write scalable, maintainable code using the latest industry standards.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-shield-alt`}),(0,b.jsx)(`h4`,{children:`Ironclad Security`}),(0,b.jsx)(`p`,{children:`Advanced encryption and security protocols protect your data 24/7.`})]}),(0,b.jsxs)(`div`,{className:`advantage-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-bolt`}),(0,b.jsx)(`h4`,{children:`Lightning Speed`}),(0,b.jsx)(`p`,{children:`Optimized assets and server-side performance for instant load times.`})]})]})]})]}),(0,b.jsxs)(`div`,{className:`service-main-container mesh-gradient animated-bg`,children:[(0,b.jsxs)(`section`,{className:`hero-glass-container reveal`,children:[(0,b.jsxs)(`div`,{className:`hero-glass-content`,children:[(0,b.jsx)(`span`,{className:`reveal`,children:`Future Ready`}),(0,b.jsx)(`h1`,{children:`Industry-Led Training`}),(0,b.jsx)(`p`,{children:`Bridge the gap between academia and industry with real-world projects, expert mentorship, and career-launching certifications.`}),(0,b.jsx)(`div`,{className:`hero-actions`,children:(0,b.jsx)(`a`,{href:`/contact`,className:`gold-btn`,children:`Join Program`})})]}),(0,b.jsx)(`div`,{className:`hero-abstract-art d-none d-lg-block`,children:(0,b.jsx)(`img`,{src:`/images/internship.png`,style:{maxWidth:`500px`,borderRadius:`30px`,transform:`perspective(1000px) rotateY(-15deg)`,boxShadow:`0 20px 60px rgba(0,0,0,0.3)`}})})]}),(0,b.jsx)(`section`,{className:`execution-model-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`The Career Path`}),(0,b.jsx)(`h2`,{children:`Learning & Development Model`}),(0,b.jsx)(`p`,{children:`A comprehensive roadmap designed to transform students into industry-ready professionals.`})]}),(0,b.jsxs)(`div`,{className:`model-grid`,children:[(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`01`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-book-reader`})}),(0,b.jsx)(`h4`,{children:`Core Theory`}),(0,b.jsx)(`p`,{children:`Deep dive into the fundamental principles of your chosen technology stack with expert guidance.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`02`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-laptop-code`})}),(0,b.jsx)(`h4`,{children:`Practical Labs`}),(0,b.jsx)(`p`,{children:`Intensive hands-on coding sessions to apply theoretical knowledge in a controlled environment.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`03`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-project-diagram`})}),(0,b.jsx)(`h4`,{children:`Live Projects`}),(0,b.jsx)(`p`,{children:`Working on real-world industry requirements under the mentorship of senior developers.`})]}),(0,b.jsxs)(`div`,{className:`model-card reveal`,children:[(0,b.jsx)(`div`,{className:`step-number`,children:`04`}),(0,b.jsx)(`div`,{className:`model-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-user-tie`})}),(0,b.jsx)(`h4`,{children:`Career Readiness`}),(0,b.jsx)(`p`,{children:`Resume building, mock interviews, and certification to bridge the gap to your dream job.`})]})]})]})}),(0,b.jsxs)(`section`,{className:`py-5 bg-white`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Wall of Fame`}),(0,b.jsx)(`h2`,{children:`Our Success Stories`})]}),(0,b.jsx)(`div`,{className:`container`,children:(0,b.jsxs)(`div`,{className:`row g-4 justify-content-center`,children:[(0,b.jsx)(`div`,{className:`col-lg-2 col-md-4 col-6 reveal`,children:(0,b.jsxs)(`div`,{className:`student-card-modern`,children:[(0,b.jsx)(`img`,{src:`/media/team/tharun.jpeg`,alt:`Tharun`}),(0,b.jsx)(`h5`,{children:`Tharun`}),(0,b.jsx)(`p`,{children:`JAVA Intern`})]})}),(0,b.jsx)(`div`,{className:`col-lg-2 col-md-4 col-6 reveal`,children:(0,b.jsxs)(`div`,{className:`student-card-modern`,children:[(0,b.jsx)(`img`,{src:`/media/team/reddy_odFoq3p.jpeg`,alt:`Himesh`}),(0,b.jsx)(`h5`,{children:`Himesh`}),(0,b.jsx)(`p`,{children:`JAVA Intern`})]})}),(0,b.jsx)(`div`,{className:`col-lg-2 col-md-4 col-6 reveal`,children:(0,b.jsxs)(`div`,{className:`student-card-modern`,children:[(0,b.jsx)(`img`,{src:`/media/team/pavan.jpeg`,alt:`Pavan`}),(0,b.jsx)(`h5`,{children:`Pavan`}),(0,b.jsx)(`p`,{children:`JAVA Intern`})]})}),(0,b.jsx)(`div`,{className:`col-lg-2 col-md-4 col-6 reveal`,children:(0,b.jsxs)(`div`,{className:`student-card-modern`,children:[(0,b.jsx)(`img`,{src:`/media/team/vamsi.jpeg`,alt:`Vamsi`}),(0,b.jsx)(`h5`,{children:`Vamsi`}),(0,b.jsx)(`p`,{children:`JAVA Intern`})]})}),(0,b.jsx)(`div`,{className:`col-lg-2 col-md-4 col-6 reveal`,children:(0,b.jsxs)(`div`,{className:`student-card-modern`,children:[(0,b.jsx)(`img`,{src:`/media/team/sai.nikilesh.jpg.jpeg`,alt:`Nikilesh`}),(0,b.jsx)(`h5`,{children:`Nikilesh`}),(0,b.jsx)(`p`,{children:`PYTHON Intern`})]})})]})})]}),(0,b.jsx)(`section`,{className:`pricing-section`,children:(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsxs)(`div`,{className:`section-head reveal`,children:[(0,b.jsx)(`span`,{children:`Invest in Yourself`}),(0,b.jsx)(`h2`,{children:`Certification Programs`})]}),(0,b.jsxs)(`div`,{className:`row g-4 pricing-scroll-track`,children:[(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Starter`}),(0,b.jsxs)(`div`,{className:`price-amount`,children:[`₹5,899`,(0,b.jsx)(`span`,{children:`(incl. GST)`})]})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Basics & Fundamentals`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Recorded Sessions`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Weekly Assignments`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Basic Certification`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Community Access`]})]}),(0,b.jsx)(`a`,{href:`?plan=starter&amount=4999`,className:`gold-btn w-100`,children:`Enroll Now`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsx)(`div`,{className:`badge-popular`,children:`CAREER TRACK`}),(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Professional`}),(0,b.jsxs)(`div`,{className:`price-amount`,children:[`₹17,699`,(0,b.jsx)(`span`,{children:`(incl. GST)`})]})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Live Training Sessions`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Hands-on Projects`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Industry Certification`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Code Reviews`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Resume Building`]})]}),(0,b.jsx)(`a`,{href:`?plan=pro&amount=14999`,className:`gold-btn w-100`,children:`Enroll Now`})]})}),(0,b.jsx)(`div`,{className:`col-lg-4 reveal`,children:(0,b.jsxs)(`div`,{className:`pricing-card-modern`,children:[(0,b.jsxs)(`div`,{className:`price-header`,children:[(0,b.jsx)(`h4`,{children:`Advanced Plus`}),(0,b.jsxs)(`div`,{className:`price-amount`,children:[`₹29,499`,(0,b.jsx)(`span`,{children:`(incl. GST)`})]})]}),(0,b.jsxs)(`ul`,{className:`feature-list`,children:[(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Live Industry Projects`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` 1-on-1 Mentorship`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Interview Preparation`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Placement Assistance`]}),(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`i`,{className:`fas fa-check-circle`}),` Portfolio Showcase`]})]}),(0,b.jsx)(`a`,{href:`?plan=advanced&amount=24999`,className:`gold-btn w-100`,children:`Enroll Now`})]})})]})]})})]}),(0,b.jsx)(`script`,{dangerouslySetInnerHTML:{__html:`
        /* ================= REVEAL ANIMATION JS ================= */
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        /* ================= PRICING AUTO-SCROLL (MOBILE) ================= */
        if (window.innerWidth < 991) {
            const tracks = document.querySelectorAll('.pricing-scroll-track');
            tracks.forEach(track => {
                let isMoving = true;

                const autoScroll = () => {
                    if (!isMoving) return;
                    const cardWidth = track.offsetWidth * 0.85;
                    if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - 10) {
                        track.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    }
                };

                let scrollInterval = setInterval(autoScroll, 4000);

                track.addEventListener('touchstart', () => {
                    isMoving = false;
                    clearInterval(scrollInterval);
                }, { passive: true });
            });
        }

        /* ================= CUSTOM DROPDOWN MOBILE TOGGLE ================= */
        const dropdownTrigger = document.querySelector('.custom-select-trigger');
        const dropdownContainer = document.querySelector('.custom-service-select');
        
        if (dropdownTrigger && dropdownContainer) {
            dropdownTrigger.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdownContainer.classList.toggle('open');
            });
            
            document.addEventListener('click', function(e) {
                if (!dropdownContainer.contains(e.target)) {
                    dropdownContainer.classList.remove('open');
                }
            });
        }
    `}})]})},us=()=>{let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(!0),[i,a]=(0,x.useState)(null);(0,x.useEffect)(()=>{(async()=>{try{let e=await fetch(`/api/public/projects/`);if(!e.ok)throw Error(`Failed to fetch projects`);t(await e.json())}catch(e){console.error(`Error fetching projects:`,e),a(e.message)}finally{r(!1)}})()},[]);let o=e=>{let t=document.getElementById(`lightbox`),n=document.getElementById(`lightboxImg`);t&&n&&(n.src=e,t.classList.add(`active`),document.body.style.overflow=`hidden`)},s=()=>{let e=document.getElementById(`lightbox`);e&&(e.classList.remove(`active`),document.body.style.overflow=`auto`)},c=(e,t,n)=>{let r=document.getElementById(`mainImage`+n);r&&(r.style.opacity=`0`,setTimeout(()=>{r.src=t,r.style.opacity=`1`},200)),e.target.parentElement.querySelectorAll(`.thumb-item`).forEach(e=>e.classList.remove(`active`)),e.target.classList.add(`active`)};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`div`,{className:`portfolio-main-container mesh-gradient animated-bg`,children:[(0,b.jsx)(`div`,{className:`portfolio-hero reveal active`,children:(0,b.jsx)(`div`,{className:`container`,children:(0,b.jsxs)(`div`,{className:`section-head1`,children:[(0,b.jsx)(`span`,{children:`Showcase`}),(0,b.jsx)(`h1`,{children:`Engineering Excellence`}),(0,b.jsx)(`p`,{children:`A curated collection of digital products and enterprise solutions delivered globally.`})]})})}),(0,b.jsx)(`div`,{className:`projects-grid`,children:n?(0,b.jsx)(`div`,{style:{textAlign:`center`,gridColumn:`1 / -1`,padding:`50px`},children:`Loading projects...`}):i?(0,b.jsxs)(`div`,{style:{textAlign:`center`,gridColumn:`1 / -1`,padding:`50px`,color:`red`},children:[`Error: `,i]}):e.length===0?(0,b.jsx)(`div`,{style:{textAlign:`center`,gridColumn:`1 / -1`,padding:`50px`},children:`No projects found.`}):e.map(e=>(0,b.jsxs)(`div`,{className:`project-card-modern reveal active`,children:[(0,b.jsx)(`div`,{className:`project-badge`,children:`SUCCESSFUL DELIVERY`}),(0,b.jsxs)(`div`,{className:`project-image-wrapper img-zoom-container`,onClick:()=>o(document.getElementById(`mainImage`+e.id)?.src),children:[(0,b.jsx)(`div`,{id:`lens`+e.id,className:`zoom-lens`}),(0,b.jsx)(`img`,{id:`mainImage`+e.id,className:`project-main-img`,src:e.image1,alt:e.name,style:{cursor:`zoom-in`,transition:`opacity 0.3s`}})]}),(0,b.jsxs)(`div`,{className:`thumbnail-gallery`,children:[e.image1&&(0,b.jsx)(`img`,{src:e.image1,className:`thumb-item active`,onClick:t=>c(t,e.image1,e.id),alt:`thumb1`}),e.image2&&(0,b.jsx)(`img`,{src:e.image2,className:`thumb-item`,onClick:t=>c(t,e.image2,e.id),alt:`thumb2`}),e.image3&&(0,b.jsx)(`img`,{src:e.image3,className:`thumb-item`,onClick:t=>c(t,e.image3,e.id),alt:`thumb3`}),e.image4&&(0,b.jsx)(`img`,{src:e.image4,className:`thumb-item`,onClick:t=>c(t,e.image4,e.id),alt:`thumb4`})]}),(0,b.jsxs)(`div`,{className:`project-content`,children:[(0,b.jsx)(`h3`,{children:e.name}),(0,b.jsxs)(`div`,{className:`project-meta`,children:[(0,b.jsxs)(`div`,{className:`meta-item`,children:[(0,b.jsx)(`i`,{className:`far fa-calendar-alt`}),(0,b.jsx)(`span`,{children:e.time_taken})]}),e.link&&(0,b.jsxs)(`a`,{href:e.link,target:`_blank`,rel:`noopener noreferrer`,className:`visit-link`,children:[`Live Demo `,(0,b.jsx)(`i`,{className:`fas fa-external-link-alt`})]})]})]})]},e.id))})]}),(0,b.jsx)(`div`,{id:`zoomPreview`,className:`zoom-preview-container`}),(0,b.jsxs)(`div`,{id:`lightbox`,className:`lightbox-overlay`,onClick:s,children:[(0,b.jsx)(`div`,{className:`lightbox-close`,children:(0,b.jsx)(`i`,{className:`fas fa-times`})}),(0,b.jsx)(`img`,{id:`lightboxImg`,className:`lightbox-content`,src:``,alt:`Preview`})]})]})},ds=()=>(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`div`,{className:`careers-main-container mesh-gradient animated-bg`,children:[(0,b.jsx)(`div`,{className:`careers-hero reveal`,children:(0,b.jsx)(`div`,{className:`container`,children:(0,b.jsxs)(`div`,{className:`section-head1`,children:[(0,b.jsx)(`span`,{children:`Join Our Force`}),(0,b.jsx)(`h1`,{children:`Shape the Future of Tech`}),(0,b.jsx)(`p`,{children:`We are looking for visionaries, creators, and problem solvers to build the next generation of digital solutions.`})]})})}),(0,b.jsxs)(`div`,{className:`layout-wrapper`,children:[(0,b.jsx)(`div`,{className:`scroll-column reveal`,children:(0,b.jsx)(`div`,{className:`scrolling-wrapper-up`,children:(0,b.jsxs)(`div`,{className:`scrolling-content`,children:[(0,b.jsxs)(`div`,{className:`student-card-mini`,children:[(0,b.jsx)(`img`,{src:`/media/team/tharun.jpeg`,alt:`Tharun`}),(0,b.jsx)(`h4`,{children:`Tharun`}),(0,b.jsx)(`span`,{children:`JAVA INTERN`})]}),(0,b.jsxs)(`div`,{className:`student-card-mini`,children:[(0,b.jsx)(`img`,{src:`/media/team/reddy_odFoq3p.jpeg`,alt:`Himesh`}),(0,b.jsx)(`h4`,{children:`Himesh Reddy`}),(0,b.jsx)(`span`,{children:`JAVA INTERN`})]}),(0,b.jsxs)(`div`,{className:`student-card-mini`,children:[(0,b.jsx)(`img`,{src:`/media/team/pavan.jpeg`,alt:`Pavan`}),(0,b.jsx)(`h4`,{children:`Pavan`}),(0,b.jsx)(`span`,{children:`JAVA INTERN`})]}),(0,b.jsxs)(`div`,{className:`student-card-mini`,children:[(0,b.jsx)(`img`,{src:`/media/team/tharun.jpeg`,alt:`Tharun`}),(0,b.jsx)(`h4`,{children:`Tharun`}),(0,b.jsx)(`span`,{children:`JAVA INTERN`})]}),(0,b.jsxs)(`div`,{className:`student-card-mini`,children:[(0,b.jsx)(`img`,{src:`/media/team/reddy_odFoq3p.jpeg`,alt:`Himesh`}),(0,b.jsx)(`h4`,{children:`Himesh Reddy`}),(0,b.jsx)(`span`,{children:`JAVA INTERN`})]}),(0,b.jsxs)(`div`,{className:`student-card-mini`,children:[(0,b.jsx)(`img`,{src:`/media/team/pavan.jpeg`,alt:`Pavan`}),(0,b.jsx)(`h4`,{children:`Pavan`}),(0,b.jsx)(`span`,{children:`JAVA INTERN`})]})]})})}),(0,b.jsxs)(`div`,{className:`center-column`,children:[(0,b.jsxs)(`div`,{className:`career-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-briefcase`}),(0,b.jsx)(`h2`,{children:`Professional Careers`}),(0,b.jsx)(`p`,{children:`Join a fast-paced, innovative environment where your skills are valued and your growth is prioritized. Explore openings for developers, designers, and managers.`}),(0,b.jsx)(`a`,{href:`/vacancies`,className:`gold-btn`,children:`Explore Jobs`}),(0,b.jsxs)(`div`,{className:`already-registered`,children:[`Already registered? `,(0,b.jsx)(`a`,{href:`/legacy/exampages/job_applicant_login`,children:`Sign In`})]})]}),(0,b.jsxs)(`div`,{className:`career-card reveal`,children:[(0,b.jsx)(`i`,{className:`fas fa-graduation-cap`}),(0,b.jsx)(`h2`,{children:`Gobal Internships`}),(0,b.jsx)(`p`,{children:`Kickstart your journey with real-world experience. Our internship program offers mentorship, live projects, and a pathway to a full-time career.`}),(0,b.jsx)(`a`,{href:`/global-internships`,className:`gold-btn`,children:`View Internships`}),(0,b.jsxs)(`div`,{className:`already-registered`,children:[`Already registered? `,(0,b.jsx)(`a`,{href:`/login`,children:`Student Login`})]})]})]}),(0,b.jsx)(`div`,{className:`scroll-column reveal`,children:(0,b.jsx)(`div`,{className:`scrolling-wrapper-down`,children:(0,b.jsxs)(`div`,{className:`scrolling-content`,children:[(0,b.jsxs)(`div`,{className:`student-card-mini`,children:[(0,b.jsx)(`img`,{src:`/media/team/vamsi.jpeg`,alt:`Vamsi`}),(0,b.jsx)(`h4`,{children:`Vamsi`}),(0,b.jsx)(`span`,{children:`JAVA INTERN`})]}),(0,b.jsxs)(`div`,{className:`student-card-mini`,children:[(0,b.jsx)(`img`,{src:`/media/team/sai.nikilesh.jpg.jpeg`,alt:`Nikilesh`}),(0,b.jsx)(`h4`,{children:`Nikilesh`}),(0,b.jsx)(`span`,{children:`PYTHON INTERN`})]}),(0,b.jsxs)(`div`,{className:`student-card-mini`,children:[(0,b.jsx)(`img`,{src:`/media/team/anil.kumar.jpg.jpeg`,alt:`Anil`}),(0,b.jsx)(`h4`,{children:`Anil Kumar`}),(0,b.jsx)(`span`,{children:`JAVA INTERN`})]}),(0,b.jsxs)(`div`,{className:`student-card-mini`,children:[(0,b.jsx)(`img`,{src:`/media/team/vamsi.jpeg`,alt:`Vamsi`}),(0,b.jsx)(`h4`,{children:`Vamsi`}),(0,b.jsx)(`span`,{children:`JAVA INTERN`})]}),(0,b.jsxs)(`div`,{className:`student-card-mini`,children:[(0,b.jsx)(`img`,{src:`/media/team/sai.nikilesh.jpg.jpeg`,alt:`Nikilesh`}),(0,b.jsx)(`h4`,{children:`Nikilesh`}),(0,b.jsx)(`span`,{children:`PYTHON INTERN`})]}),(0,b.jsxs)(`div`,{className:`student-card-mini`,children:[(0,b.jsx)(`img`,{src:`/media/team/anil.kumar.jpg.jpeg`,alt:`Anil`}),(0,b.jsx)(`h4`,{children:`Anil Kumar`}),(0,b.jsx)(`span`,{children:`JAVA INTERN`})]})]})})})]})]}),(0,b.jsx)(`script`,{dangerouslySetInnerHTML:{__html:`
/* ================= REVEAL ANIMATION JS ================= */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
`}})]}),fs=()=>{let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(!0),[i,a]=(0,x.useState)(null);return(0,x.useEffect)(()=>{(async()=>{try{let e=await fetch(`/api/public/blogs/`);if(!e.ok)throw Error(`Failed to fetch blogs`);t(await e.json())}catch(e){console.error(`Error fetching blogs:`,e),a(e.message)}finally{r(!1)}})()},[]),(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)(`div`,{className:`blog-main-container mesh-gradient animated-bg`,children:[(0,b.jsx)(`div`,{className:`blog-hero reveal active`,children:(0,b.jsx)(`div`,{className:`container`,children:(0,b.jsxs)(`div`,{className:`section-head1`,children:[(0,b.jsx)(`span`,{children:`Knowledge Hub`}),(0,b.jsx)(`h1`,{children:`Latest Insights`}),(0,b.jsx)(`p`,{children:`Explore articles on software architecture, digital strategy, and the future of technology.`})]})})}),(0,b.jsx)(`div`,{className:`blog-grid`,children:n?(0,b.jsx)(`div`,{style:{textAlign:`center`,gridColumn:`1 / -1`,padding:`50px`},children:`Loading blogs...`}):i?(0,b.jsxs)(`div`,{style:{textAlign:`center`,gridColumn:`1 / -1`,padding:`50px`,color:`red`},children:[`Error: `,i]}):e.length===0?(0,b.jsxs)(`div`,{className:`empty-blog-state reveal active`,children:[(0,b.jsx)(`i`,{className:`far fa-newspaper`,style:{fontSize:`48px`,color:`#ccc`,marginBottom:`20px`,display:`block`}}),(0,b.jsx)(`h2`,{children:`No Articles Found`}),(0,b.jsx)(`p`,{children:`Our experts are currently drafting new insights. Please check back soon!`})]}):e.map(e=>(0,b.jsxs)(`article`,{className:`blog-card-modern reveal active`,children:[(0,b.jsx)(`div`,{className:`blog-image-wrapper`,children:(0,b.jsx)(`img`,{src:e.image,alt:e.title})}),(0,b.jsxs)(`div`,{className:`blog-content`,children:[(0,b.jsx)(`span`,{className:`blog-date`,children:`Featured Article`}),(0,b.jsx)(`h3`,{children:e.title}),(0,b.jsx)(`p`,{children:e.description?e.description.length>100?e.description.substring(0,100)+`...`:e.description:``}),(0,b.jsxs)(N,{to:`/blog/${e.id}`,className:`blog-link`,children:[`Read Full Story `,(0,b.jsx)(`i`,{className:`fas fa-arrow-right`})]})]})]},e.id))})]})})},ps=()=>(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)(`div`,{className:`main-article-wrapper`,children:[(0,b.jsx)(`div`,{className:`master-header-spacer`}),(0,b.jsxs)(`div`,{className:`blog-detail-container`,children:[(0,b.jsx)(`div`,{children:(0,b.jsx)(`span`,{className:`blog-category-badge`,children:`Technology Insight`})}),(0,b.jsx)(`h1`,{}),(0,b.jsx)(`img`,{src:``,alt:``,className:`blog-main-image`}),(0,b.jsx)(`div`,{className:`blog-rich-content`}),(0,b.jsxs)(`footer`,{className:`blog-footer-actions`,children:[(0,b.jsxs)(`a`,{href:``,className:`back-to-blogs`,children:[(0,b.jsx)(`i`,{className:`fas fa-arrow-left`}),` Back to Insights`]}),(0,b.jsxs)(`div`,{className:`share-icons`,children:[(0,b.jsx)(`span`,{className:`small text-muted mr-3`,children:`Share:`}),(0,b.jsx)(`a`,{href:`#`,className:`text-muted mr-2`,children:(0,b.jsx)(`i`,{className:`fab fa-linkedin-in`})}),(0,b.jsx)(`a`,{href:`#`,className:`text-muted mr-2`,children:(0,b.jsx)(`i`,{className:`fab fa-twitter`})}),(0,b.jsx)(`a`,{href:`#`,className:`text-muted`,children:(0,b.jsx)(`i`,{className:`fas fa-link`})})]})]})]})]})}),ms=()=>((0,x.useEffect)(()=>{let e=document.getElementById(`contactForm`),t=e=>{e.preventDefault();let t=`Hello! I have a project inquiry.\n\nName: ${document.getElementById(`fullName`).value}\nEmail: ${document.getElementById(`email`).value}\nService: ${document.getElementById(`service`).value}\nMessage: ${document.getElementById(`message`).value}`;window.open(`https://wa.me/917794053340?text=${encodeURIComponent(t)}`,`_blank`)};e&&e.addEventListener(`submit`,t);let n=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`active`)})},{threshold:.1});return document.querySelectorAll(`.reveal`).forEach(e=>n.observe(e)),()=>{e&&e.removeEventListener(`submit`,t),n.disconnect()}},[]),(0,b.jsx)(b.Fragment,{children:(0,b.jsx)(`div`,{className:`page-content-offset mesh-gradient`,children:(0,b.jsxs)(`div`,{className:`container-fluid px-md-5 px-3`,children:[(0,b.jsxs)(`div`,{className:`split-contact-container`,children:[(0,b.jsxs)(`div`,{className:`contact-info-side reveal-left`,children:[(0,b.jsxs)(`div`,{className:`info-header`,children:[(0,b.jsx)(`span`,{children:`Direct Connection`}),(0,b.jsxs)(`h2`,{children:[`Let's build`,(0,b.jsx)(`br`,{}),`something great`]}),(0,b.jsx)(`p`,{children:`Our team is dedicated to providing enterprise-grade IT solutions and personalized support for your vision.`})]}),(0,b.jsxs)(`div`,{className:`contact-method-list`,children:[(0,b.jsxs)(`div`,{className:`method-item`,children:[(0,b.jsx)(`div`,{className:`method-icon`,children:(0,b.jsx)(`i`,{className:`fas fa-building`})}),(0,b.jsxs)(`div`,{className:`method-text`,children:[(0,b.jsx)(`h5`,{children:`Gobal Headquarters`}),(0,b.jsx)(`p`,{children:`KPHB, Hyderabad, Telangana`}),(0,b.jsx)(`p`,{children:`HQ & OPERATIONS CENTER`})]})]}),(0,b.jsxs)(`div`,{className:`method-item`,children:[(0,b.jsx)(`div`,{className:`method-icon`,children:(0,b.jsx)(`i`,{className:`fas fa-map-marker-alt`})}),(0,b.jsxs)(`div`,{className:`method-text`,children:[(0,b.jsx)(`h5`,{children:`Guntur Branch`}),(0,b.jsx)(`p`,{children:`Guntur, Andhra Pradesh`}),(0,b.jsx)(`p`,{children:`TRAINING & DEVELOPMENT`})]})]}),(0,b.jsxs)(`div`,{className:`method-item`,children:[(0,b.jsx)(`div`,{className:`method-icon`,children:(0,b.jsx)(`i`,{className:`fas fa-rocket`})}),(0,b.jsxs)(`div`,{className:`method-text`,children:[(0,b.jsx)(`h5`,{children:`Vinukonda Branch`}),(0,b.jsx)(`p`,{children:`Vinukonda, Andhra Pradesh`}),(0,b.jsx)(`p`,{children:`Coming Soon`})]})]}),(0,b.jsxs)(`div`,{className:`method-item mt-5`,children:[(0,b.jsx)(`div`,{className:`method-icon`,children:(0,b.jsx)(`i`,{className:`fas fa-phone-alt`})}),(0,b.jsxs)(`div`,{className:`method-text`,children:[(0,b.jsx)(`h5`,{children:`24/7 Support`}),(0,b.jsx)(`p`,{children:`+91 7794053340`})]})]})]}),(0,b.jsxs)(`div`,{className:`social-links mt-5`,children:[(0,b.jsx)(`a`,{href:`#`,children:(0,b.jsx)(`i`,{className:`fab fa-linkedin`})}),(0,b.jsx)(`a`,{href:`#`,children:(0,b.jsx)(`i`,{className:`fab fa-twitter`})}),(0,b.jsx)(`a`,{href:`#`,children:(0,b.jsx)(`i`,{className:`fab fa-instagram`})})]})]}),(0,b.jsxs)(`div`,{className:`contact-form-side reveal-right`,children:[(0,b.jsxs)(`div`,{className:`form-header`,children:[(0,b.jsx)(`h3`,{children:`Send a message`}),(0,b.jsx)(`p`,{children:`Fill out the form below and an expert will reach out within 24 hours.`})]}),(0,b.jsxs)(`form`,{id:`contactForm`,children:[(0,b.jsxs)(`div`,{className:`modern-input-group`,children:[(0,b.jsx)(`label`,{children:`Full Name`}),(0,b.jsx)(`input`,{type:`text`,className:`modern-input`,id:`fullName`,placeholder:`e.g. John Doe`,required:!0})]}),(0,b.jsxs)(`div`,{className:`modern-input-group`,children:[(0,b.jsx)(`label`,{children:`Business Email`}),(0,b.jsx)(`input`,{type:`email`,className:`modern-input`,id:`email`,placeholder:`e.g. john@company.com`,required:!0})]}),(0,b.jsxs)(`div`,{className:`modern-input-group`,children:[(0,b.jsx)(`label`,{children:`Service Category`}),(0,b.jsxs)(`select`,{className:`modern-input`,id:`service`,required:!0,defaultValue:`Select an option`,children:[(0,b.jsx)(`option`,{disabled:!0,value:`Select an option`,children:`Select an option`}),(0,b.jsx)(`option`,{children:`Web Applications`}),(0,b.jsx)(`option`,{children:`Mobile Development`}),(0,b.jsx)(`option`,{children:`Digital Strategy`}),(0,b.jsx)(`option`,{children:`Cloud Infrastructure`})]})]}),(0,b.jsxs)(`div`,{className:`modern-input-group`,children:[(0,b.jsx)(`label`,{children:`Message`}),(0,b.jsx)(`textarea`,{className:`modern-input`,id:`message`,placeholder:`Tell us about your goals...`,required:!0})]}),(0,b.jsx)(`button`,{type:`submit`,className:`submit-gold-btn`,children:`Initialize Connection`})]})]})]}),(0,b.jsx)(`div`,{className:`map-section reveal mt-5 mb-5`,children:(0,b.jsx)(`div`,{className:`split-contact-container`,children:(0,b.jsx)(`iframe`,{src:`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8205.3507874237!2d78.392665!3d17.489361!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2aa1a33d59440f77%3A0x595e01da47d1657b!2sYGR%20GOBAL%20IT%20SERVICES%20Pvt.%20Ltd.!5e1!3m2!1sen!2sin!4v1767593924604!5m2!1sen!2sin`,width:`100%`,height:`450`,allowFullScreen:!0,loading:`lazy`})})})]})})})),hs=()=>{let[e,t]=(0,x.useState)(`mgmt`),[n,r]=(0,x.useState)([]),[i,a]=(0,x.useState)([]);return(0,x.useEffect)(()=>{fetch(`/api/public/team/`).then(e=>e.json()).then(e=>r(e)).catch(e=>console.error(`Team API error:`,e)),fetch(`/api/public/events/`).then(e=>e.json()).then(e=>{let t=[...e],n=0;for(;t.length>0&&t.length<3;)t.push({...e[n%e.length],id:`padded-`+n}),n++;a(t)}).catch(e=>console.error(`Events API error:`,e))},[]),(0,x.useEffect)(()=>{let e=document.querySelectorAll(`.cinerama-item`);if(e.length===0)return;let t=0,n;function r(){let n=window.innerWidth<=991,r=n?300:500;e.forEach((i,a)=>{let o=a-t;o>e.length/2&&(o-=e.length),o<-e.length/2&&(o+=e.length);let s=o*r,c=o===0?n?150:300:-250,l=o*-20,u=o===0?1.1:.85,d=Math.abs(o)>1&&n||Math.abs(o)>2?0:1;i.style.transform=`translateX(${s}px) translateZ(${c}px) rotateY(${l}deg) scale(${u})`,i.style.opacity=d,i.style.zIndex=100-Math.abs(o),i.classList.toggle(`active`,o===0)})}let i=!1;function a(){clearInterval(n),i=!0}window.stopCineramaTimer=a,window.prevCinerama=function(){a(),e.length>0&&(t=(t-1+e.length)%e.length,r())},window.nextCinerama=function(){a(),e.length>0&&(t=(t+1)%e.length,r())},window.selectCinerama=function(n){a(),n===t?e[n].querySelector(`img`).src:(t=n,r())};function o(){n=setInterval(()=>{e.length>0&&(t=(t+1)%e.length,r())},5e3)}let s=document.querySelector(`.cinerama-stage`);return s&&(s.addEventListener(`mouseenter`,()=>clearInterval(n)),s.addEventListener(`mouseleave`,()=>{i||o()})),r(),o(),()=>clearInterval(n)},[i]),(0,x.useEffect)(()=>{let e=document.querySelectorAll(`.counter`),t=e=>{let t=+e.getAttribute(`data-count`),n=0,r=t/(2e3/16),i=()=>{n+=r,n<t?(e.innerText=Math.ceil(n),requestAnimationFrame(i)):e.innerText=t};i()},n=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(t(e.target),n.unobserve(e.target))})},{threshold:.5});return e.forEach(e=>n.observe(e)),()=>{e.forEach(e=>n.unobserve(e))}},[]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`section`,{className:`team-hero`,children:(0,b.jsxs)(`div`,{className:`cinerama-stage`,children:[(0,b.jsx)(`button`,{type:`button`,className:`cinerama-control prev-btn`,onClick:()=>window.prevCinerama&&window.prevCinerama(),"aria-label":`Previous`,children:(0,b.jsx)(`i`,{className:`fas fa-chevron-left`})}),(0,b.jsx)(`div`,{className:`cinerama-track`,id:`cinerama-track`,children:i.length>0?i.map((e,t)=>(0,b.jsx)(`div`,{className:`cinerama-item`,onClick:()=>window.selectCinerama&&window.selectCinerama(t),children:(0,b.jsx)(`img`,{src:e.image||`/images/placeholder.jpg`,alt:`Team Scene`})},e.id)):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`div`,{className:`cinerama-item`,onClick:()=>window.selectCinerama&&window.selectCinerama(0),children:(0,b.jsx)(`img`,{src:`/images/placeholder.jpg`,alt:`Team Scene`})}),(0,b.jsx)(`div`,{className:`cinerama-item`,onClick:()=>window.selectCinerama&&window.selectCinerama(1),children:(0,b.jsx)(`img`,{src:`/images/placeholder.jpg`,alt:`Team Scene`})}),(0,b.jsx)(`div`,{className:`cinerama-item`,onClick:()=>window.selectCinerama&&window.selectCinerama(2),children:(0,b.jsx)(`img`,{src:`/images/placeholder.jpg`,alt:`Team Scene`})})]})}),(0,b.jsx)(`button`,{type:`button`,className:`cinerama-control next-btn`,onClick:()=>window.nextCinerama&&window.nextCinerama(),"aria-label":`Next`,children:(0,b.jsx)(`i`,{className:`fas fa-chevron-right`})})]})}),(0,b.jsxs)(`section`,{className:`stats-section`,children:[(0,b.jsx)(`div`,{className:`stat-orb stat-orb-1`}),(0,b.jsx)(`div`,{className:`stat-orb stat-orb-2`}),(0,b.jsxs)(`div`,{className:`container-fluid px-lg-5 px-3 stats-container`,children:[(0,b.jsxs)(`div`,{className:`stats-header-theatre`,children:[(0,b.jsxs)(`div`,{className:`stat-badge`,children:[(0,b.jsx)(`i`,{className:`fas fa-chart-line`}),` Our Impact`]}),(0,b.jsx)(`h2`,{children:`The Global Footprint`}),(0,b.jsx)(`p`,{children:`Our metrics of success reflect our relentless dedication to delivering world-class IT solutions and transformative growth.`})]}),(0,b.jsxs)(`div`,{className:`stats-theatre-grid`,children:[(0,b.jsxs)(`div`,{className:`stat-panel`,children:[(0,b.jsx)(`i`,{className:`fas fa-users stat-watermark`}),(0,b.jsx)(`div`,{className:`stat-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-users`})}),(0,b.jsxs)(`div`,{className:`stat-num-wrapper`,children:[(0,b.jsx)(`span`,{className:`stat-num counter`,"data-count":`97`,children:`0`}),(0,b.jsx)(`span`,{className:`stat-plus`,children:`+`})]}),(0,b.jsx)(`span`,{className:`stat-desc`,children:`Active Clients`})]}),(0,b.jsxs)(`div`,{className:`stat-panel`,children:[(0,b.jsx)(`i`,{className:`fas fa-layer-group stat-watermark`}),(0,b.jsx)(`div`,{className:`stat-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-layer-group`})}),(0,b.jsxs)(`div`,{className:`stat-num-wrapper`,children:[(0,b.jsx)(`span`,{className:`stat-num counter`,"data-count":`98`,children:`0`}),(0,b.jsx)(`span`,{className:`stat-plus`,children:`+`})]}),(0,b.jsx)(`span`,{className:`stat-desc`,children:`Projects Delivered`})]}),(0,b.jsxs)(`div`,{className:`stat-panel`,children:[(0,b.jsx)(`i`,{className:`fas fa-medal stat-watermark`}),(0,b.jsx)(`div`,{className:`stat-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-medal`})}),(0,b.jsxs)(`div`,{className:`stat-num-wrapper`,children:[(0,b.jsx)(`span`,{className:`stat-num counter`,"data-count":`5`,children:`0`}),(0,b.jsx)(`span`,{className:`stat-plus`,children:`+`})]}),(0,b.jsx)(`span`,{className:`stat-desc`,children:`Years Expertise`})]}),(0,b.jsxs)(`div`,{className:`stat-panel`,children:[(0,b.jsx)(`i`,{className:`fas fa-earth-americas stat-watermark`}),(0,b.jsx)(`div`,{className:`stat-icon-wrapper`,children:(0,b.jsx)(`i`,{className:`fas fa-earth-americas`})}),(0,b.jsxs)(`div`,{className:`stat-num-wrapper`,children:[(0,b.jsx)(`span`,{className:`stat-num counter`,"data-count":`4`,children:`0`}),(0,b.jsx)(`span`,{className:`stat-plus`,children:`+`})]}),(0,b.jsx)(`span`,{className:`stat-desc`,children:`Market Regions`})]})]})]})]}),(0,b.jsx)(`section`,{className:`director-kinetic-sec reverse-layout reveal`,children:(0,b.jsxs)(`div`,{className:`kinetic-container`,children:[(0,b.jsxs)(`div`,{className:`kinetic-content`,children:[(0,b.jsx)(`h1`,{children:`Chairman`}),(0,b.jsx)(`h2`,{children:`Driving Excellence & Growth`}),(0,b.jsxs)(`div`,{className:`executive-summary`,children:[(0,b.jsx)(`p`,{children:`We provide professional IT services including Website Development, Web Applications, Mobile Applications, and Digital Marketing solutions. Our goal is to deliver quality services that help businesses grow and succeed in the digital world. We are committed to innovation, customer satisfaction, and building long-term relationships with our clients. Thank you for your trust and support.`}),(0,b.jsxs)(`div`,{className:`signature-box`,children:[(0,b.jsx)(`div`,{className:`sig-line`}),(0,b.jsx)(`div`,{className:`sig-name`,children:`Y.Varalakshmi`})]})]})]}),(0,b.jsxs)(`div`,{className:`kinetic-stack`,children:[(0,b.jsx)(`div`,{className:`outline-bg-text`,children:`OPERATIONS`}),(0,b.jsx)(`div`,{className:`stack-card card-main`,children:(0,b.jsx)(`img`,{src:`/images/yg.jpeg`,alt:`Y.Vara Lakshmi`})})]})]})}),(0,b.jsx)(`section`,{className:`director-kinetic-sec reveal`,children:(0,b.jsxs)(`div`,{className:`kinetic-container`,children:[(0,b.jsxs)(`div`,{className:`kinetic-stack`,children:[(0,b.jsx)(`div`,{className:`outline-bg-text`,children:`LEADERSHIP`}),(0,b.jsx)(`div`,{className:`stack-card card-main`,children:(0,b.jsx)(`img`,{src:`/images/rr.jpeg`,alt:`Y. Ravindra Reddy`})})]}),(0,b.jsxs)(`div`,{className:`kinetic-content`,children:[(0,b.jsx)(`h4`,{children:`Director's Message`}),(0,b.jsx)(`h2`,{children:`Architect of Innovation`}),(0,b.jsxs)(`div`,{className:`executive-summary`,children:[(0,b.jsxs)(`p`,{children:[`We started our journey with a vision to empower individuals and businesses through technology, innovation, and quality services. With dedication, hard work, and continuous growth, we have built a platform that provides professional IT training and reliable technology solutions. `,(0,b.jsx)(`br`,{}),`Our commitment is to deliver excellence, create opportunities, and support our students and clients in achieving success. We thank everyone who has been part of our journey and trusted us throughout our growth. `,(0,b.jsx)(`br`,{}),`Together, let us build a smarter future with technology.`]}),(0,b.jsxs)(`div`,{className:`signature-box`,children:[(0,b.jsx)(`div`,{className:`sig-line`}),(0,b.jsx)(`div`,{className:`sig-name`,children:`Y. Ravindra Reddy`})]})]})]})]})}),(0,b.jsx)(`section`,{className:`director-kinetic-sec reverse-layout reveal`,children:(0,b.jsxs)(`div`,{className:`kinetic-container`,children:[(0,b.jsxs)(`div`,{className:`kinetic-content`,children:[(0,b.jsx)(`h4`,{children:`General Manager Message`}),(0,b.jsx)(`h2`,{children:`Driving Operational Excellence`}),(0,b.jsxs)(`div`,{className:`executive-summary`,children:[(0,b.jsx)(`p`,{children:`As the General Manager of our organization, I am proud to lead a dedicated team committed to excellence, innovation, and customer satisfaction. Our mission is to provide high-quality services while building strong relationships with our clients and community. We continuously strive to create new opportunities, maintain professional standards, and deliver the best possible experience to everyone associated with our company.`}),(0,b.jsxs)(`div`,{className:`signature-box`,children:[(0,b.jsx)(`div`,{className:`sig-line`}),(0,b.jsx)(`div`,{className:`sig-name`,children:`Y.Suneetha Reddy`})]})]})]}),(0,b.jsxs)(`div`,{className:`kinetic-stack`,children:[(0,b.jsx)(`div`,{className:`outline-bg-text`,children:`OPERATIONS`}),(0,b.jsx)(`div`,{className:`stack-card card-main`,children:(0,b.jsx)(`img`,{src:`/images/su.jpeg`,alt:`Suneetha Reddy`})})]})]})}),(0,b.jsx)(`div`,{className:`team-nav-outer`,children:(0,b.jsxs)(`div`,{className:`team-toggle`,children:[(0,b.jsx)(`button`,{className:`toggle-btn ${e===`mgmt`?`active`:``}`,onClick:()=>t(`mgmt`),children:`Executive Board`}),(0,b.jsx)(`button`,{className:`toggle-btn ${e===`team`?`active`:``}`,onClick:()=>t(`team`),children:`Creative Core`})]})}),(0,b.jsxs)(`section`,{className:`team-section`,children:[(0,b.jsxs)(`div`,{className:`team-grid ${e===`mgmt`?`active`:``}`,id:`grid-mgmt`,children:[(0,b.jsxs)(`div`,{className:`member-card`,children:[(0,b.jsx)(`div`,{className:`member-img-wrap`,children:(0,b.jsx)(`img`,{src:`/images/yg.jpeg`,alt:`Y.Vara Lakshmi`})}),(0,b.jsxs)(`div`,{className:`member-info`,children:[(0,b.jsx)(`h3`,{children:`Y.Vara Lakshmi`}),(0,b.jsx)(`p`,{children:`Chairman`})]})]}),(0,b.jsxs)(`div`,{className:`member-card`,children:[(0,b.jsx)(`div`,{className:`member-img-wrap`,children:(0,b.jsx)(`img`,{src:`/images/rr1.jpeg`,alt:`Y. Ravindra Reddy`})}),(0,b.jsxs)(`div`,{className:`member-info`,children:[(0,b.jsx)(`h3`,{children:`Y. Ravindra Reddy`}),(0,b.jsx)(`p`,{children:`Director & CEO`})]})]}),(0,b.jsxs)(`div`,{className:`member-card`,children:[(0,b.jsx)(`div`,{className:`member-img-wrap`,children:(0,b.jsx)(`img`,{src:`/images/su1.jpeg`,alt:`Suneetha Reddy`})}),(0,b.jsxs)(`div`,{className:`member-info`,children:[(0,b.jsx)(`h3`,{children:`Suneetha Reddy`}),(0,b.jsx)(`p`,{children:`General Manager`})]})]})]}),(0,b.jsx)(`div`,{className:`team-grid ${e===`team`?`active`:``}`,id:`grid-team`,children:n.length>0?n.map(e=>(0,b.jsxs)(`div`,{className:`member-card`,children:[(0,b.jsx)(`div`,{className:`member-img-wrap`,children:(0,b.jsx)(`img`,{src:e.image||`/images/placeholder.jpg`,alt:e.name})}),(0,b.jsxs)(`div`,{className:`member-info`,children:[(0,b.jsx)(`h3`,{children:e.name}),(0,b.jsx)(`p`,{children:e.role})]})]},e.id)):(0,b.jsx)(`div`,{style:{textAlign:`center`,width:`100%`,gridColumn:`1/-1`,padding:`50px`},children:(0,b.jsx)(`p`,{style:{color:`var(--text-slate)`,fontWeight:600},children:`The creative ensemble is growing. Stay tuned.`})})})]})]})},gs=()=>{let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(!0),[i,a]=(0,x.useState)(null);(0,x.useEffect)(()=>{(async()=>{try{let e=await fetch(`/api/public/internships/`);if(!e.ok)throw Error(`Failed to fetch internships`);t(await e.json())}catch(e){console.error(`Error fetching internships:`,e)}finally{r(!1)}})()},[]);let o=e=>{a(e),document.body.style.overflow=`hidden`},s=()=>{a(null),document.body.style.overflow=`auto`};return(0,b.jsxs)(`div`,{className:`internship-main-container mesh-gradient animated-bg`,children:[(0,b.jsx)(`div`,{className:`internship-hero`,children:(0,b.jsx)(`div`,{className:`container`,children:(0,b.jsxs)(`div`,{className:`section-head`,children:[(0,b.jsx)(`span`,{children:`Kickstart Your Career`}),(0,b.jsx)(`h1`,{children:`Gobal Internship Program`}),(0,b.jsx)(`p`,{children:`Master industry-standard technologies with hands-on projects and expert mentorship.`})]})})}),(0,b.jsx)(`div`,{className:`internship-grid`,children:n?(0,b.jsx)(`div`,{className:`text-center w-100`,children:(0,b.jsx)(`p`,{children:`Loading internships...`})}):e.length===0?(0,b.jsx)(`div`,{className:`text-center w-100`,children:(0,b.jsx)(`p`,{children:`No internships available at the moment.`})}):e.map(e=>(0,b.jsxs)(`div`,{className:`intern-card-modern reveal active`,onClick:()=>o(e),children:[(0,b.jsx)(`div`,{className:`intern-image-wrapper`,children:(0,b.jsx)(`img`,{alt:e.title,src:e.image||`/images/internship_placeholder.jpg`})}),(0,b.jsxs)(`div`,{className:`intern-content`,children:[(0,b.jsx)(`h3`,{children:e.title}),(0,b.jsxs)(`div`,{className:`intern-duration`,children:[(0,b.jsx)(`i`,{className:`far fa-clock`}),(0,b.jsxs)(`span`,{children:[`Duration: `,e.duration]})]}),(0,b.jsx)(`a`,{className:`gold-btn w-100`,href:`/register-internship?course_id=${e.id}`,onClick:e=>e.stopPropagation(),children:`Register Now`})]})]},e.id))}),i&&(0,b.jsx)(`div`,{className:`intern-modal-overlay active`,onClick:s,children:(0,b.jsxs)(`div`,{className:`intern-modal-card`,onClick:e=>e.stopPropagation(),children:[(0,b.jsx)(`div`,{className:`modal-close-btn`,onClick:s,children:(0,b.jsx)(`i`,{className:`fas fa-times`})}),(0,b.jsxs)(`h2`,{children:[i.title,` Syllabus`]}),(0,b.jsx)(`div`,{className:`syllabus-content`,dangerouslySetInnerHTML:(e=>e?{__html:e.replace(/Module\s?\d+:/gi,e=>`<b>${e}</b>`)}:{__html:``})(i.syllabus)}),(0,b.jsxs)(`div`,{className:`mt-5 text-center`,children:[(0,b.jsx)(`p`,{className:`text-muted small mb-4`,children:`Ready to begin your journey?`}),(0,b.jsx)(`a`,{className:`gold-btn`,href:`/register-internship?course_id=${i.id}`,children:`Secure Your Spot`})]})]})})]})},_s=()=>{let[e,t]=(0,x.useState)(null),n=async e=>{e.preventDefault();let n=new FormData(e.target),r=e=>{let t=null;if(document.cookie&&document.cookie!==``){let n=document.cookie.split(`;`);for(let r of n)if(r=r.trim(),r.startsWith(e+`=`)){t=decodeURIComponent(r.substring(e.length+1));break}}return t};try{await fetch(`/client_form/`,{method:`POST`,headers:{"X-CSRFToken":r(`csrftoken`)},body:n}),t(`Your details have been successfully submitted!`),e.target.reset()}catch(e){console.error(`Error submitting form`,e)}},r={width:`100%`,padding:`12px`,marginBottom:`15px`,border:`1px solid #ccc`,borderRadius:`8px`,outline:`none`,fontSize:`16px`,background:`#fff`,color:`#334155`};return(0,b.jsx)(`div`,{style:{minHeight:`calc(100vh - 120px)`,padding:`60px 20px`,display:`flex`,justifyContent:`center`,alignItems:`center`,background:`linear-gradient(135deg, #f8fafc, #edf2f7)`},children:(0,b.jsxs)(`div`,{style:{width:`350px`,background:`#fff`,padding:`30px`,borderRadius:`15px`,boxShadow:`0 10px 40px rgba(0,0,0,0.06)`,border:`1px solid #e2e8f0`},children:[(0,b.jsx)(`h2`,{style:{textAlign:`center`,marginBottom:`20px`,color:`#091c47`,fontFamily:`'Oswald', sans-serif`,textTransform:`uppercase`,letterSpacing:`1px`},children:`Client Form`}),e&&(0,b.jsx)(`div`,{style:{backgroundColor:`#d4edda`,color:`#155724`,padding:`12px`,borderRadius:`8px`,marginBottom:`20px`,textAlign:`center`,fontSize:`14px`,border:`1px solid #c3e6cb`},children:e}),(0,b.jsxs)(`form`,{onSubmit:n,children:[(0,b.jsx)(`input`,{type:`text`,name:`name`,placeholder:`Name`,required:!0,style:r}),(0,b.jsx)(`input`,{type:`text`,name:`phone`,placeholder:`Phone Number`,required:!0,style:r}),(0,b.jsx)(`input`,{type:`email`,name:`email`,placeholder:`Email`,required:!0,style:r}),(0,b.jsxs)(`select`,{name:`service`,required:!0,style:r,defaultValue:``,children:[(0,b.jsx)(`option`,{value:``,disabled:!0,children:`Select Service`}),(0,b.jsx)(`option`,{value:`Web Design`,children:`Web Design`}),(0,b.jsx)(`option`,{value:`Web Apps`,children:`Web Apps`}),(0,b.jsx)(`option`,{value:`Mobile Apps`,children:`Mobile Apps`}),(0,b.jsx)(`option`,{value:`Marketing`,children:`Marketing`}),(0,b.jsx)(`option`,{value:`UI / UX`,children:`UI / UX`}),(0,b.jsx)(`option`,{value:`Testing`,children:`Testing`}),(0,b.jsx)(`option`,{value:`Support`,children:`Support`}),(0,b.jsx)(`option`,{value:`Internships`,children:`Internships`})]}),(0,b.jsx)(`button`,{type:`submit`,style:{width:`100%`,padding:`12px`,border:`none`,borderRadius:`8px`,background:`linear-gradient(135deg, #fbcc27, #eab308)`,color:`#091c47`,fontWeight:`800`,fontSize:`16px`,cursor:`pointer`,transition:`all 0.3s ease`,textTransform:`uppercase`,letterSpacing:`1px`},onMouseOver:e=>{e.target.style.transform=`translateY(-2px)`,e.target.style.boxShadow=`0 5px 15px rgba(251, 204, 39, 0.4)`,e.target.style.background=`linear-gradient(135deg, #eab308, #ca8a04)`},onMouseOut:e=>{e.target.style.transform=`none`,e.target.style.boxShadow=`none`,e.target.style.background=`linear-gradient(135deg, #fbcc27, #eab308)`},children:`Submit`})]})]})})},vs=()=>{let e=bt(),t=(0,x.useRef)(null),[n,r]=(0,x.useState)([]),[i,a]=(0,x.useState)(!0);return(0,x.useEffect)(()=>{fetch(`/api/public/jobs/`).then(e=>e.json()).then(e=>{r(Array.isArray(e)?e:[]),a(!1)}).catch(e=>{console.error(e),a(!1)});let n=t=>{let n=t.target.closest(`a`);n&&n.getAttribute(`href`)&&n.getAttribute(`href`).startsWith(`/`)&&(t.preventDefault(),e(n.getAttribute(`href`)))};return document.addEventListener(`click`,n),t.current&&t.current.querySelectorAll(`script`).forEach(e=>{if(e.dataset.executed)return;let t=document.createElement(`script`);Array.from(e.attributes).forEach(e=>t.setAttribute(e.name,e.value)),e.innerHTML&&t.appendChild(document.createTextNode(e.innerHTML)),e.parentNode.replaceChild(t,e),t.dataset.executed=`true`}),()=>document.removeEventListener(`click`,n)},[e]),(0,b.jsxs)(`div`,{ref:t,children:[(0,b.jsx)(`div`,{dangerouslySetInnerHTML:{__html:`<link href="/images/logo.png" rel="icon" type="image/png"/>
<link href="/css/modern_ui.css" rel="stylesheet"/>
<style>
        /* ================= VACANCIES PAGE REFINEMENTS ================= */
        .vacancies-main-container {
            padding-bottom: 120px;
            min-height: 100vh;
        }

        .vacancies-hero {
            padding: 30px 0 10px;
            text-align: center;
        }

        .jobs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
            gap: 40px;
            padding: 0 40px;
            max-width: 1400px;
            margin: 0 auto;
        }

        .job-card-modern {
            background: var(--white);
            border-radius: 30px;
            padding: 40px;
            border: 1px solid #f0f0f0;
            transition: var(--transition-slow);
            position: relative;
            display: flex;
            flex-direction: column;
            box-shadow: 0 10px 40px rgba(0,0,0,0.02);
            height: 100%; /* Ensures consistent height in rows */
        }

        .job-card-modern:hover {
            transform: translateY(-10px);
            box-shadow: var(--shadow-lg);
            border-color: var(--accent-gold);
        }

        .job-card-modern h2 {
            font-size: 26px;
            color: var(--primary-navy);
            margin-bottom: 25px;
            letter-spacing: 0.5px;
        }

        .job-meta-list {
            list-style: none;
            padding: 0;
            margin: 0 0 25px 0;
        }

        .job-meta-item {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
            font-size: 15px;
            color: var(--text-dark);
        }

        .job-meta-item i {
            color: var(--accent-gold);
            width: 20px;
            text-align: center;
        }

        .job-meta-item b {
            color: var(--primary-navy);
            width: 90px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .job-details-hidden {
            display: none;
        }

        .gold-btn-outline {
            display: inline-block;
            padding: 12px 25px;
            border: 2px solid #fbcc27;
            color: #092a49;
            border-radius: 12px;
            font-weight: 700;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Oswald', sans-serif;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 1px;
        }

        .gold-btn-outline:hover {
            background: #fbcc27;
            color: #092a49;
        }

        /* Modal Specific Styles */
        .job-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(9, 42, 73, 0.85);
            backdrop-filter: blur(15px);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .job-modal-overlay.active {
            display: flex;
        }

        .job-modal-card {
            background: var(--white);
            width: 100%;
            max-width: 800px;
            max-height: 85vh; /* Prevents modal from going off-screen */
            overflow-y: auto; /* Enables scrolling for long content */
            border-radius: 40px;
            padding: 60px;
            position: relative;
            box-shadow: var(--shadow-lg);
            transform: translateY(50px);
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            scrollbar-width: thin;
            scrollbar-color: var(--accent-gold) transparent;
        }

        .job-modal-card::-webkit-scrollbar {
            width: 6px;
        }

        .job-modal-card::-webkit-scrollbar-thumb {
            background: var(--accent-gold);
            border-radius: 10px;
        }

        .job-modal-overlay.active .job-modal-card {
            transform: translateY(0);
            opacity: 1;
        }

        .modal-close {
            position: absolute;
            top: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #f5f5f5;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: var(--transition-fast);
        }

        .modal-close:hover {
            background: var(--accent-gold);
            transform: rotate(90deg);
        }

        .job-modal-card h2 {
            font-size: 32px;
            color: var(--primary-navy);
            margin-bottom: 30px;
        }

        .modal-info-section {
            margin-bottom: 30px;
        }

        .modal-info-section h4 {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--accent-gold);
            margin-bottom: 10px;
        }

        .modal-info-section p {
            font-size: 16px;
            line-height: 1.8;
            color: var(--text-dark);
            white-space: pre-line; /* Respects line breaks from DB */
        }

        .note-highlight {
            color: #e67e22;
            font-weight: 700;
            border-left: 3px solid #e67e22;
            padding-left: 15px;
            margin-top: 15px;
        }

        .empty-state {
            grid-column: 1 / -1;
            text-align: center;
            padding: 80px 40px;
            background: rgba(255,255,255,0.5);
            backdrop-filter: blur(10px);
            border-radius: 30px;
            border: 2px dashed #ddd;
        }

        @media (max-width: 768px) {
            .jobs-grid {
                grid-template-columns: 1fr;
                padding: 0 20px;
            }
            .job-card-modern {
                padding: 30px 20px;
            }
        }
    </style>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<!-- Bootstrap -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet"/>
<!-- Font Awesome 6 ONLY -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet"/>
<!-- Bootstrap Icons -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet"/>
<!-- Modern UI Design System -->
<link href="/css/modern_ui.css" rel="stylesheet"/>
<style>
    /* ===== General Styles ===== */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Lato', sans-serif;
      background-color: #f5f6fa;
      color: #797979
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Oswald', sans-serif;
      color: #092a49;
      font-weight: 700
    }

    a {
      text-decoration: none;
      color: #092a49;
      transition: color 0.3s
    }

    a:hover {
      color: #fbcc27;
      text-decoration: none;
    }

    /* Top bar */
    .top-bar {
      position: relative;
      height: 45px;
      background: #0796fe;
      /* Solid blue as per image */
      display: flex;
      align-items: center;
    }

    .top-bar .text {
      display: flex;
      align-items: center;
      height: 45px;
      padding: 0 20px;
      border-right: 1px solid rgba(255, 255, 255, .2);
    }

    .top-bar .text:first-child {
      border-left: 1px solid rgba(255, 255, 255, .2);
    }

    .top-bar .text i {
      font-size: 15px;
      color: #ffffff;
      margin-right: 10px;
    }

    .top-bar .text h2,
    .top-bar .text a,
    .top-bar .text p {
      color: #ffffff !important;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.5px;
      margin: 0;
    }

    .top-bar .text h2+p,
    .top-bar .text a+p {
      margin-left: 12px;
    }

    .top-bar .social {
      display: flex;
      height: 45px;
      justify-content: flex-end;
    }

    .top-bar .social a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 100%;
      font-size: 16px;
      color: #ffffff;
      border-left: 1px solid rgba(255, 255, 255, .2);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .top-bar .social a:hover {
      background: rgba(255, 255, 255, 0.1);
    }


    /* ================= TOP BAR SOCIAL BRAND COLORS ================= */

    .top-bar .social a[href*="x.com"]:hover {

      color: #000000;
    }

    .top-bar .social a[href*="facebook.com"]:hover {

      color: #1877f2;
    }

    .top-bar .social a[href*="linkedin.com"]:hover {

      color: #0a66c2;
    }

    .top-bar .social a[href*="instagram.com"]:hover {

      color: #e1306c;
      ;
    }

    .top-bar .social a[href*="youtube.com"]:hover {

      color: #ff0000;
    }

    /* Header */
    header {
      background-color: #092a49;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      /* Increased for better logo fit */
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    header .logo img {
      height: 50px;
      width: auto;
      display: block;
    }

    header nav {
      display: flex;
      gap: 30px
    }

    header nav a {
      color: #ffffff !important;
      font-size: 15px;
      font-weight: 500;
      transition: all 0.3s ease;
      text-transform: capitalize;
    }

    header nav a:hover {
      color: #fbcc27 !important;
      text-decoration: none;
    }

    header nav a.active {
      font-weight: 700 !important;
      color: #ffffff !important;
    }

    /* About Us Dropdown */
    .nav-item.about-dropdown {
      position: relative
    }

    .nav-item.about-dropdown .about-menu {
      position: absolute;
      top: 40px;
      left: -30px;
      min-width: 200px;
      background: #092a49;
      border-radius: 4px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.3s ease;
      z-index: 999
    }

    .nav-item.about-dropdown:hover .about-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0)
    }

    .about-menu a {
      display: block;
      padding: 10px 20px;
      font-size: 15px;
      color: #ffffff;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease
    }

    .about-menu a:hover {
      color: #fbcc27;
    }

    /* Floating Support Button */
    .support-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 55px;
      height: 55px;
      background: #092a49;
      color: #fff;
      border-radius: 50%;
      font-size: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
      z-index: 9999;
      transition: all 0.3s ease
    }

    .support-btn:hover {
      background: #092a49;
      text-decoration: none;
      transform: translateY(-3px)
    }

    .support-btn i {
      color: #fff
    }

    @media(max-width:768px) {
      .support-btn {
        width: 48px;
        height: 48px;
        font-size: 22px;
        bottom: 90px;
        right: 15px
      }
    }

    header nav a.active {
      color: #fff !important;
      font-weight: 600
    }

    /* ================= EMPLOYEE LOGIN BUTTON ================= */
    .btn-employee-login {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: linear-gradient(135deg, #fbcc27, #f39c12);
      color: #092a49 !important;
      font-size: 14px;
      font-weight: 700;
      padding: 8px 18px;
      border-radius: 50px;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(251, 204, 39, 0.35);
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-employee-login:hover {
      background: linear-gradient(135deg, #f39c12, #fbcc27);
      color: #092a49 !important;
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(251, 204, 39, 0.5);
      text-decoration: none;
    }

    .btn-employee-login i {
      font-size: 15px;
      color: #092a49 !important;
    }

    @media(max-width:991px) {
      .btn-employee-login {
        margin: 10px 20px;
        width: calc(100% - 40px);
        justify-content: center;
        padding: 12px 20px;
        font-size: 15px;
        border-radius: 8px;
      }
    }

    /* ================= MOBILE NAV ONLY ================= */
    @media(max-width:991px) {
      .top-bar {
        display: none !important
      }

      header {
        padding: 15px 20px;
        height: auto
      }

      header .logo img {
        height: 40px;
        border-radius: 50%;
      }

      .mobile-toggle {
        font-size: 26px;
        color: #fff;
        cursor: pointer;
        display: block
      }

      header nav {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #092a49;
        flex-direction: column;
        gap: 0;
        display: none;
        z-index: 999;
        max-height: 70vh;
        overflow-y: auto
      }

      header nav.active {
        display: flex
      }

      header nav a {
        padding: 14px 20px;
        color: #fff;
        font-size: 16px;
        width: 100%
      }

      /* Services Mobile Scrollable */
      .nav-item.dropdown .dropdown-menu {
        position: static;
        width: 100%;
        background: #0b355a;
        display: none;
        opacity: 1;
        visibility: visible;
        max-height: 70vh;
        overflow-y: auto
      }

      .nav-item.dropdown .dropdown-menu.show {
        display: block
      }

      .dropdown-grid {
        grid-template-columns: 1fr;
        padding: 0
      }

      .dropdown-grid a {
        padding: 12px 30px;
        font-size: 14px;
        color: #fff
      }

      .dropdown-grid a::before {
        content: "&#8250;";
        color: #fff
      }

      /* About Us Mobile Clickable */
      .nav-item.about-dropdown .about-menu {
        position: static;
        background: #0b355a;
        box-shadow: none;
        display: none;
        max-height: 70vh;
        overflow-y: auto
      }

      .nav-item.about-dropdown .about-menu a {
        padding: 12px 30px;
        font-size: 14px;
        color: #fff
      }

      .nav-item.about-dropdown .about-menu a:hover {
        background-color: #0796fe33;
        color: #fff
      }

      .nav-item.about-dropdown.active .about-menu {
        display: block
      }

      .nav-item.about-dropdown {
        padding-bottom: 14px;
        padding-top: 14px;
      }

      .nav-item.dropdown {
        padding-bottom: 14px;
        padding-top: 14px;
      }
    }
  </style>
</head>
<body>
<!-- Top Bar Start -->
<div class="top-bar d-none d-md-block">
<div class="container-fluid">
<div class="row">
<div class="col-md-8">
<div class="top-bar-left">
<div class="text">
<i class="far fa-clock"></i>
<h2>9:30 AM 6:30 PM</h2>
<p> Mon - Fri</p>
</div>
<div class="text">
<i class="fa fa-phone-alt"></i>
<a href="tel:+917794053340">+91 77940 53340</a>
<p>For Quotation</p>
</div>
</div>
</div>
<div class="col-md-4">
<div class="top-bar-right">
<div class="social">
<a href="https://x.com/ygrgobalit2024"><i class="fab fa-x-twitter"></i></a>
<a href="https://www.facebook.com/profile.php?id=61568888033386"><i class="fab fa-facebook-f"></i></a>
<a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/?viewAsMember=true/"><i class="fab fa-linkedin-in"></i></a>
<a href="https://www.instagram.com/ygrgobalitservices/"><i class="fab fa-instagram"></i></a>
<a href="https://www.youtube.com/@rrtalktrends"><i class="fab fa-youtube"></i></a>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Top Bar End -->
<header>
<div class="logo">
<a href="/"><img alt="logo" src="/images/logo1.jpeg"/></a>
</div>
<div class="mobile-toggle d-lg-none" id="mobileToggle">
<i class="fas fa-bars"></i>
</div>
<nav>
<a class="active" href="/">Home</a>
<!-- About Us Dropdown -->
<div class="nav-item about-dropdown">
<a class="active" href="javascript:void(0)" id="aboutToggle">About Us &#9662;</a>
<div class="about-menu">
<a href="/about">Company Overview</a>
<a href="/team">Meet the Team</a>
</div>
</div>
<div class="nav-item about-dropdown" id="servicesDropdown">
<a href="/services?type=web" id="servicesToggle">Services &#9662;</a>
<div class="about-menu">
<a href="/services?type=web">Web Design</a>
<a href="/services?type=webapp">Web Apps</a>
<a href="/services?type=mobile">Mobile Apps</a>
<a href="/services?type=dm">Marketing</a>
<a href="/services?type=uiux">UI / UX</a>
<a href="/services?type=testing">Testing</a>
<a href="/services?type=support">Support</a>
<a href="/services?type=intern">Internships</a>
</div>
</div>
<a class="active" href="/portfolio">Portfolio</a>
<a class="active" href="/careers">Careers</a>
<a class="active" href="/blog">Blog</a>
<a class="active" href="/contact">Contact Us</a>
<div class="nav-item about-dropdown">
<a href="javascript:void(0)" id="demoToggle">Demo For Client &#9662;</a>
<div class="about-menu">
<a href="http://demo.ygrgobalitservices.com/" target="_blank"> Customer Care Vizag</a>
<a href="http://trip.ygrgobalitservices.com/" target="_blank"> Trip</a>
<a href="http://uiux.ygrgobalitservices.com/" target="_blank">CodeLabs</a>
</div>
</div>
<!-- Employee Login Button -->
<a class="btn-employee-login" href="/login" id="employeeLoginBtn" rel="noopener noreferrer" target="_blank">
<i class="fas fa-user-circle"></i>
        Employee Login
      </a>
</nav>
</header>
<a aria-label="Chat on WhatsApp" class="support-btn" href="https://wa.me/917794053340" target="_blank">
<i class="bi bi-headset"></i>
</a>
<script>
    document.addEventListener("DOMContentLoaded", function () {
      const mobileToggle = document.getElementById("mobileToggle");
      const nav = document.querySelector("header nav");
      const aboutToggle = document.getElementById("aboutToggle");
      const aboutMenu = document.querySelector(".nav-item.about-dropdown .about-menu");
      const demoToggle = document.getElementById("demoToggle");
      const demoMenu = demoToggle.parentElement.querySelector(".about-menu");
      const servicesToggle = document.getElementById("servicesToggle");
      const servicesMenu = servicesToggle ? servicesToggle.parentElement.querySelector(".about-menu") : null;

      // Toggle mobile nav
      mobileToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        nav.classList.toggle("active");
      });

      // Toggle About Us
      aboutToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        aboutMenu.parentElement.classList.toggle("active");
      });

      // Toggle Services
      if (servicesToggle) { servicesToggle.addEventListener("click", function (e) { e.stopPropagation(); servicesMenu.parentElement.classList.toggle("active"); }); }

      // Toggle Demo For Client
      demoToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        demoMenu.parentElement.classList.toggle("active");
      });

      // Close everything on outside click
      document.addEventListener("click", function (e) {
        if (!nav.contains(e.target)) {
          nav.classList.remove("active");
          if (aboutMenu) aboutMenu.parentElement.classList.remove("active");
        }
      });

      // --- GOBAL REVEAL ENGINE ---
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      const handleReveals = () => {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));
      };

      handleReveals();
      window.addEventListener('scroll', handleReveals);
    });
  <\/script>
</body>
</html>
<div class="vacancies-main-container mesh-gradient animated-bg">
<!-- Hero Section -->
<div class="vacancies-hero reveal">
<div class="container">
<div class="section-head">
<span>Opportunities</span>
<h1>Current Openings</h1>
<p>Join a culture of innovation and excellence. Find the role that empowers your ambition.</p>
</div>
</div>
</div>
<!-- Jobs Grid -->
`}}),(0,b.jsx)(`div`,{className:`jobs-grid`,children:i?(0,b.jsx)(`div`,{style:{textAlign:`center`,width:`100%`,padding:`60px`},children:(0,b.jsx)(`h3`,{style:{color:`#092a49`},children:`Loading openings...`})}):n.length>0?n.map(e=>(0,b.jsxs)(`div`,{className:`job-card-modern reveal active`,children:[(0,b.jsxs)(`div`,{className:`job-header-modern`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`h3`,{className:`job-title-modern`,children:e.title}),(0,b.jsxs)(`div`,{className:`job-meta-modern`,children:[(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`i`,{className:`fas fa-briefcase`}),` `,e.experience||e.role]}),(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`i`,{className:`fas fa-map-marker-alt`}),` `,e.location]})]})]}),(0,b.jsx)(`span`,{className:`job-type-badge`,children:e.job_type||e.package})]}),(0,b.jsx)(`p`,{className:`job-desc-modern`,children:e.description?e.description.substring(0,150)+`...`:``}),(0,b.jsx)(`div`,{className:`job-footer-modern`,children:(0,b.jsxs)(`a`,{href:`/legacy/exampages/job_application?id=${e.id}`,className:`btn-apply-modern`,children:[`Apply Now `,(0,b.jsx)(`i`,{className:`fas fa-arrow-right`})]})})]},e.id)):(0,b.jsx)(`div`,{style:{textAlign:`center`,width:`100%`,padding:`50px`},children:(0,b.jsx)(`h3`,{children:`No openings available right now. Check back soon!`})})}),(0,b.jsx)(`div`,{dangerouslySetInnerHTML:{__html:`
</div>
 Job Detail Modal 
<div class="job-modal-overlay" id="jobModal" onclick="closeJobModal()">
<div class="job-modal-card" onclick="event.stopPropagation()">
<div class="modal-close" onclick="closeJobModal()"><i class="fas fa-times"></i></div>
<h2 id="modalTitle">Job Title</h2>
<div class="modal-info-section">
<h4>Description</h4>
<p id="modalDesc">Job description goes here...</p>
</div>
<div class="modal-info-section">
<h4>Requirements</h4>
<p id="modalReq">Requirements go here...</p>
</div>
<div class="note-highlight">
            Note: Position may require adaptability across different technology domains as per company requirements.
        </div>
</div>
</div>
<style>
/* ================= GOBAL FOOTER TYPOGRAPHY (MATCH SERVICES PAGE) ================= */
.footer,
.footer p,
.footer a,
.footer h2,
.mobile-footer,
.mobile-footer a {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400;
}

/* ================= DESKTOP FOOTER ================= */
.footer {
    position: relative;
    margin-top: 45px;
    padding-top: 10px;
    background: #092a49;
}

.container {
    max-width: 90%;
    padding: 0 20px;
    margin: 0 auto;
}

.footer .logo {
    height: 100px;
    width: auto;
    display: block;
    padding-bottom: 10px;
}

.footer-row {
    display: flex;
    justify-content: flex-start;
    gap: 80px;
}

/* SECTION WRAPPERS */
.footer-contact,
.footer-link,
.footer-newsletter {
    flex: 1;
    max-width: 25%;
    color: #ffffff;
    margin-bottom: 45px;
}

/* HEADINGS */
.footer .footer-contact h2,
.footer .footer-link h2,
.footer .footer-newsletter h2 {
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.5px;
    margin-bottom: 20px;
    padding-bottom: 8px;
    position: relative;
}

.footer .footer-contact h2::after,
.footer .footer-link h2::after,
.footer .footer-newsletter h2::after {
    content: "";
    position: absolute;
    width: 45px;
    height: 2px;
    bottom: 0;
    left: 0;
    background: #fbcc27;
}

/* TEXT & LINKS */
.footer p {
    color: #e6e6e6;
    margin-bottom: 12px;
}

.footer a {
    color: #e6e6e6;
    text-decoration: none;
    transition: 0.3s;
}

.footer a:hover {
    color: #fbcc27;
}

/* QUICK LINKS */
.footer .footer-link a {
    display: block;
    margin-bottom: 10px;
}

.footer .footer-link a::before {
    content: "\f105";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    margin-right: 10px;
}

/* CONTACT ICONS */
.footer-contact p i {
    width: 25px;
    font-size: 16px;
}

.fa-phone-alt {
    transform: rotate(90deg);
}

/* SOCIAL ICONS */
.footer-social {
    margin-top: 20px;
}

.footer-social a i {
    margin-right: 15px;
    font-size: 18px;
    color: #f0f2f3;
    transition: 0.3s;
}

.footer-social a:hover i {
    color: #fbcc27;
}

/* COPYRIGHT */
.footer .copyright {
    padding: 0 30px;
}
.footer .copyright .row {
    padding: 25px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.footer .copyright p {
    margin: 0;
    color: #999999;
}
.footer .copyright p a {
    color: #ffffff;
}
.footer .copyright p a:hover {
    color: #fbcc27;
}
/* ================= SOCIAL MEDIA BRAND HOVER COLORS ================= */
 
.footer-social a[href*="x.com"]:hover i {
    color: #000000;
}
 
.footer-social a[href*="facebook.com"]:hover i {
    color: #1877f2;
}
 
.footer-social a[href*="linkedin.com"]:hover i {
    color: #0a66c2;
}
 
.footer-social a[href*="instagram.com"]:hover i {
    color: #e1306c;
}
 
.footer-social a[href*="youtube.com"]:hover i {
    color: #ff0000;
}

/* ================= MOBILE VISIBILITY ================= */
@media (max-width: 767px) {
    .footer {
        display: none;
    }
}

/* ================= MOBILE FOOTER ================= */
.mobile-footer {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #092a49;
    border-top: 1px solid #fbcc27;
    justify-content: space-around;
    padding: 10px 0;
    z-index: 999;
}

.mobile-footer a {
    text-align: center;
    flex: 1;
    color: #ffffff;
    font-size: 14px;
    text-decoration: none;
    font-weight: 400;
}

.mobile-footer i {
    display: block;
    font-size: 20px;
    margin-bottom: 3px;
}

@media (max-width: 767px) {
    .mobile-footer {
        display: flex;
    }
}
</style>

<!-- ================= DESKTOP FOOTER HTML ================= -->

<div class="footer">
<div class="container">
<a href="/">
<img alt="YGR Gobal IT Services" class="logo" src="/images/logo1.jpeg"/>
</a>
<div class="footer-row">
<!-- CONTACT -->
<div class="footer-contact">
<h2>Our Head Office</h2>
<p><i class="fa fa-map-marker-alt"></i>
                    Manjeera Trinity Corporate,
                    Next to Lulu Mall, Kukatpally Housing Board Colony,
                    Hyderabad, Telangana 500072
                </p>
<p><i class="fa fa-phone"></i>
<a href="tel:+917794053340">+91 77940 53340</a>
</p>
<p><i class="fa fa-envelope"></i>
<a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a>
</p>
<div class="footer-social">
<a href="https://x.com/ygrgobalit2024"><i class="fab fa-x-twitter"></i></a>
<a href="https://www.facebook.com/profile.php?id=61568888033386"><i class="fab fa-facebook-f"></i></a>
<a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/"><i class="fab fa-linkedin-in"></i></a>
<a href="https://www.instagram.com/ygrgobalitservices/"><i class="fab fa-instagram"></i></a>
<a href="https://www.youtube.com/@rrtalktrends"><i class="fab fa-youtube"></i></a>
</div>
</div>
<!-- QUICK LINKS -->
<div class="footer-link">
<h2>Quick Links</h2>
<a href="/terms">Terms of Use</a>
<a href="/privacy">Privacy Policy</a>
<a href="/cookies">Cookies</a>
<a href="/help">Help</a>
<a href="/faqs">FAQs</a>
<a href="/refund">Refund Policy</a>
<a href="/shipping">Shipping</a>
</div>
<!-- NAVIGATION -->
<div class="footer-link">
<h2>Navigation</h2>
<a href="/">Home</a>
<a href="/about">About Us</a>
<a href="/portfolio">Portfolio</a>
<a href="/careers">Careers</a>
<a href="/blog">Blog</a>
<a href="/contact">Contact Us</a>
</div>
<!-- ABOUT -->
<div class="footer-newsletter">
<h2>YGR IT SERVICES</h2>
<p>
                    YGR Gobal IT Services Pvt. Ltd. provides complete IT solutions including software,
                    web &amp; mobile app development, digital marketing, professional IT training,
                    internships, and full stack courses.
                    <br/>
<a href="/about" style="color:#fbcc27;">Read more</a>
</p>
</div>
</div>
<!-- COPYRIGHT -->
<div class="container copyright" style="margin-top: 40px;">
<div class="row">
<div class="col-md-6">
<p>
                        &copy; <a href="https://ygrgobalitservices.com">YGR Gobal IT Services</a>. All Rights Reserved.
                    </p>
</div>
<div class="col-md-6 text-right">
<p>
                        Designed by <a href="https://ygrgobalitservices.com">YGR Gobal IT Services Pvt. Ltd, 2023.</a>
</p>
</div>
</div>
</div>
</div>
</div>
 ================= MOBILE FOOTER ================= 
<div class="mobile-footer">
<a href="/">
<i class="fa fa-home"></i>
</a>
<a href="/blog">
<i class="fa fa-blog"></i>
</a>
<a href="#">
<i class="fa fa-search"></i>
</a>
<a href="/careers">
<i class="fa fa-file-alt"></i>
</a>
<a href="#">
<i class="fa fa-shopping-cart"></i>
</a>
</div>
<script>
/* ================= JOB MODAL CONTROLLER ================= */
function openJobModal(title, desc, req) {
    const modal = document.getElementById('jobModal');
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    document.getElementById('modalReq').innerText = req;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeJobModal() {
    const modal = document.getElementById('jobModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/* ================= REVEAL ANIMATION JS ================= */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
<\/script>
`}})]})},ys=()=>{let e=bt(),t=(0,x.useRef)(null);return(0,x.useEffect)(()=>{let n=t=>{let n=t.target.closest(`a`);n&&n.getAttribute(`href`)&&n.getAttribute(`href`).startsWith(`/`)&&(t.preventDefault(),e(n.getAttribute(`href`)))};document.addEventListener(`click`,n);let r=async t=>{let n=t.target.closest(`form#jobForm`);if(!n)return;t.preventDefault();let r=(e=>{let t=null;if(document.cookie&&document.cookie!==``){let n=document.cookie.split(`;`);for(let r of n)if(r=r.trim(),r.startsWith(e+`=`)){t=decodeURIComponent(r.substring(e.length+1));break}}return t})(`csrftoken`),i=new FormData(n),a=n.querySelector(`.btn-submit`);a&&(a.disabled=!0,a.textContent=`Submitting...`);try{let t=await fetch(`/apply/`,{method:`POST`,headers:{"X-CSRFToken":r},body:i,credentials:`same-origin`});if(t.redirected)window.location.href=t.url;else if(t.ok)e(`/apply/success/`);else{await t.text();let e=n.querySelector(`.alert-danger`);if(e){e.style.display=`block`;let t=e.querySelector(`i`);e.textContent=`Submission failed. Please check all fields and try again.`,t&&e.prepend(t)}a&&(a.disabled=!1,a.innerHTML=`Submit Application <i class="fas fa-paper-plane ms-2"></i>`)}}catch(e){console.error(`Form submission error:`,e);let t=n.querySelector(`.alert-danger`);t&&(t.style.display=`block`,t.textContent=`Network error. Please try again.`),a&&(a.disabled=!1,a.innerHTML=`Submit Application <i class="fas fa-paper-plane ms-2"></i>`)}};return document.addEventListener(`submit`,r),t.current&&t.current.querySelectorAll(`script`).forEach(e=>{if(e.dataset.executed)return;let t=document.createElement(`script`);Array.from(e.attributes).forEach(e=>t.setAttribute(e.name,e.value)),e.innerHTML&&t.appendChild(document.createTextNode(e.innerHTML)),e.parentNode.replaceChild(t,e),t.dataset.executed=`true`}),()=>{document.removeEventListener(`click`,n),document.removeEventListener(`submit`,r)}},[e]),(0,b.jsx)(`div`,{ref:t,dangerouslySetInnerHTML:{__html:`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
<link href="/images/logo.png" rel="icon" type="image/png"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"/>
<link href="/css/modern_ui.css" rel="stylesheet"/>
<style>
        :root {
            --primary-navy: #092a49;
            --accent-gold: #fbcc27;
            --white: #ffffff;
            --step-inactive: #e2e8f0;
        }

        body {
            background: #f0f4f8 !important;
            font-family: 'Lato', sans-serif;
        }

        /* Clearance for Sticky Header */
        .apply-offset {
            padding-top: 160px;
            padding-bottom: 100px;
            min-height: 100vh;
        }

        .application-card {
            background: rgba(255, 255, 255, 0.98);
            border-radius: 40px;
            box-shadow: 0 40px 100px rgba(9, 42, 73, 0.12);
            padding: 60px;
            max-width: 950px;
            margin: 0 auto;
            position: relative;
            border: 1px solid rgba(0,0,0,0.03);
        }

        .header-section {
            text-align: center;
            margin-bottom: 50px;
        }

        .header-section img {
            width: 110px;
            margin-bottom: 25px;
        }

        .header-section h1 {
            font-size: 36px;
            color: var(--primary-navy);
            font-family: 'Oswald', sans-serif !important;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }

        /* Progress Tracker */
        .progress-tracker {
            display: flex;
            justify-content: space-between;
            margin-bottom: 60px;
            position: relative;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .progress-tracker::after {
            content: '';
            position: absolute;
            top: 20px;
            left: 0;
            width: 100%;
            height: 4px;
            background: var(--step-inactive);
            z-index: 0;
        }

        .step-item {
            width: 45px;
            height: 45px;
            background: var(--white);
            border: 4px solid var(--step-inactive);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            color: #94a3b8;
            position: relative;
            z-index: 1;
            transition: all 0.4s ease;
            font-size: 14px;
        }

        .step-item.active {
            border-color: var(--accent-gold);
            color: var(--primary-navy);
            background: var(--accent-gold);
            transform: scale(1.1);
        }

        .step-item.completed {
            border-color: var(--primary-navy);
            background: var(--primary-navy);
            color: var(--white);
        }

        /* Form Steps */
        .form-step {
            display: none;
            animation: fadeIn 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .form-step.active {
            display: block;
        }

        .section-title {
            font-family: 'Oswald', sans-serif;
            font-size: 24px;
            color: var(--primary-navy);
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--accent-gold);
            display: inline-block;
        }

        .modern-label {
            display: block;
            font-weight: 700;
            font-size: 13px;
            color: #64748b;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .modern-input {
            width: 100%;
            padding: 15px 18px;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 15px;
            transition: all 0.3s ease;
            color: var(--primary-navy);
            margin-bottom: 20px;
        }

        .modern-input:focus {
            border-color: var(--primary-navy);
            background: #fff;
            outline: none;
            box-shadow: 0 10px 20px rgba(9, 42, 73, 0.05);
        }

        textarea.modern-input {
            height: 100px;
        }

        /* Buttons */
        .btn-group-custom {
            display: flex;
            gap: 15px;
            margin-top: 40px;
        }

        .action-btn {
            padding: 18px 35px;
            border-radius: 14px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-size: 14px;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
            flex: 1;
        }

        .btn-next {
            background: var(--primary-navy);
            color: var(--white);
        }

        .btn-next:hover {
            background: #0d3b6c;
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(9, 42, 73, 0.2);
        }

        .btn-prev {
            background: #f1f5f9;
            color: #64748b;
        }

        .btn-submit {
            background: var(--accent-gold);
            color: var(--primary-navy);
        }

        /* File Upload */
        .file-upload-box {
            border: 2px dashed #cbd5e1;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            background: #f8fafc;
            position: relative;
            margin-bottom: 25px;
            transition: all 0.3s ease;
        }

        .file-upload-box:hover {
            border-color: var(--accent-gold);
            background: #fff;
        }

        .file-upload-box input {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        .file-upload-box i {
            font-size: 28px;
            color: var(--primary-navy);
            margin-bottom: 10px;
            display: block;
        }

        @media (max-width: 768px) {
            .apply-offset { padding-top: 120px; }
            .application-card { padding: 40px 20px; border-radius: 25px; }
            .progress-tracker { margin-bottom: 40px; }
            .step-item { width: 35px; height: 35px; font-size: 12px; }
        }
    </style>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<!-- Bootstrap -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet"/>
<!-- Font Awesome 6 ONLY -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet"/>
<!-- Bootstrap Icons -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet"/>
<!-- Modern UI Design System -->
<link href="/css/modern_ui.css" rel="stylesheet"/>
<style>
    /* ===== General Styles ===== */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Lato', sans-serif;
      background-color: #f5f6fa;
      color: #797979
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Oswald', sans-serif;
      color: #092a49;
      font-weight: 700
    }

    a {
      text-decoration: none;
      color: #092a49;
      transition: color 0.3s
    }

    a:hover {
      color: #fbcc27;
      text-decoration: none;
    }

    /* Top bar */
    .top-bar {
      position: relative;
      height: 45px;
      background: #0796fe;
      /* Solid blue as per image */
      display: flex;
      align-items: center;
    }

    .top-bar .text {
      display: flex;
      align-items: center;
      height: 45px;
      padding: 0 20px;
      border-right: 1px solid rgba(255, 255, 255, .2);
    }

    .top-bar .text:first-child {
      border-left: 1px solid rgba(255, 255, 255, .2);
    }

    .top-bar .text i {
      font-size: 15px;
      color: #ffffff;
      margin-right: 10px;
    }

    .top-bar .text h2,
    .top-bar .text a,
    .top-bar .text p {
      color: #ffffff !important;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.5px;
      margin: 0;
    }

    .top-bar .text h2+p,
    .top-bar .text a+p {
      margin-left: 12px;
    }

    .top-bar .social {
      display: flex;
      height: 45px;
      justify-content: flex-end;
    }

    .top-bar .social a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 100%;
      font-size: 16px;
      color: #ffffff;
      border-left: 1px solid rgba(255, 255, 255, .2);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .top-bar .social a:hover {
      background: rgba(255, 255, 255, 0.1);
    }


    /* ================= TOP BAR SOCIAL BRAND COLORS ================= */

    .top-bar .social a[href*="x.com"]:hover {

      color: #000000;
    }

    .top-bar .social a[href*="facebook.com"]:hover {

      color: #1877f2;
    }

    .top-bar .social a[href*="linkedin.com"]:hover {

      color: #0a66c2;
    }

    .top-bar .social a[href*="instagram.com"]:hover {

      color: #e1306c;
      ;
    }

    .top-bar .social a[href*="youtube.com"]:hover {

      color: #ff0000;
    }

    /* Header */
    header {
      background-color: #092a49;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      /* Increased for better logo fit */
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    header .logo img {
      height: 50px;
      width: auto;
      display: block;
    }

    header nav {
      display: flex;
      gap: 30px
    }

    header nav a {
      color: #ffffff !important;
      font-size: 15px;
      font-weight: 500;
      transition: all 0.3s ease;
      text-transform: capitalize;
    }

    header nav a:hover {
      color: #fbcc27 !important;
      text-decoration: none;
    }

    header nav a.active {
      font-weight: 700 !important;
      color: #ffffff !important;
    }

    /* About Us Dropdown */
    .nav-item.about-dropdown {
      position: relative
    }

    .nav-item.about-dropdown .about-menu {
      position: absolute;
      top: 40px;
      left: -30px;
      min-width: 200px;
      background: #092a49;
      border-radius: 4px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.3s ease;
      z-index: 999
    }

    .nav-item.about-dropdown:hover .about-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0)
    }

    .about-menu a {
      display: block;
      padding: 10px 20px;
      font-size: 15px;
      color: #ffffff;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease
    }

    .about-menu a:hover {
      color: #fbcc27;
    }

    /* Floating Support Button */
    .support-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 55px;
      height: 55px;
      background: #092a49;
      color: #fff;
      border-radius: 50%;
      font-size: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
      z-index: 9999;
      transition: all 0.3s ease
    }

    .support-btn:hover {
      background: #092a49;
      text-decoration: none;
      transform: translateY(-3px)
    }

    .support-btn i {
      color: #fff
    }

    @media(max-width:768px) {
      .support-btn {
        width: 48px;
        height: 48px;
        font-size: 22px;
        bottom: 90px;
        right: 15px
      }
    }

    header nav a.active {
      color: #fff !important;
      font-weight: 600
    }

    /* ================= EMPLOYEE LOGIN BUTTON ================= */
    .btn-employee-login {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: linear-gradient(135deg, #fbcc27, #f39c12);
      color: #092a49 !important;
      font-size: 14px;
      font-weight: 700;
      padding: 8px 18px;
      border-radius: 50px;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(251, 204, 39, 0.35);
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-employee-login:hover {
      background: linear-gradient(135deg, #f39c12, #fbcc27);
      color: #092a49 !important;
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(251, 204, 39, 0.5);
      text-decoration: none;
    }

    .btn-employee-login i {
      font-size: 15px;
      color: #092a49 !important;
    }

    @media(max-width:991px) {
      .btn-employee-login {
        margin: 10px 20px;
        width: calc(100% - 40px);
        justify-content: center;
        padding: 12px 20px;
        font-size: 15px;
        border-radius: 8px;
      }
    }

    /* ================= MOBILE NAV ONLY ================= */
    @media(max-width:991px) {
      .top-bar {
        display: none !important
      }

      header {
        padding: 15px 20px;
        height: auto
      }

      header .logo img {
        height: 40px;
        border-radius: 50%;
      }

      .mobile-toggle {
        font-size: 26px;
        color: #fff;
        cursor: pointer;
        display: block
      }

      header nav {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #092a49;
        flex-direction: column;
        gap: 0;
        display: none;
        z-index: 999;
        max-height: 70vh;
        overflow-y: auto
      }

      header nav.active {
        display: flex
      }

      header nav a {
        padding: 14px 20px;
        color: #fff;
        font-size: 16px;
        width: 100%
      }

      /* Services Mobile Scrollable */
      .nav-item.dropdown .dropdown-menu {
        position: static;
        width: 100%;
        background: #0b355a;
        display: none;
        opacity: 1;
        visibility: visible;
        max-height: 70vh;
        overflow-y: auto
      }

      .nav-item.dropdown .dropdown-menu.show {
        display: block
      }

      .dropdown-grid {
        grid-template-columns: 1fr;
        padding: 0
      }

      .dropdown-grid a {
        padding: 12px 30px;
        font-size: 14px;
        color: #fff
      }

      .dropdown-grid a::before {
        content: "&#8250;";
        color: #fff
      }

      /* About Us Mobile Clickable */
      .nav-item.about-dropdown .about-menu {
        position: static;
        background: #0b355a;
        box-shadow: none;
        display: none;
        max-height: 70vh;
        overflow-y: auto
      }

      .nav-item.about-dropdown .about-menu a {
        padding: 12px 30px;
        font-size: 14px;
        color: #fff
      }

      .nav-item.about-dropdown .about-menu a:hover {
        background-color: #0796fe33;
        color: #fff
      }

      .nav-item.about-dropdown.active .about-menu {
        display: block
      }

      .nav-item.about-dropdown {
        padding-bottom: 14px;
        padding-top: 14px;
      }

      .nav-item.dropdown {
        padding-bottom: 14px;
        padding-top: 14px;
      }
    }
  </style>
</head>
<body>
<!-- Top Bar Start -->
<div class="top-bar d-none d-md-block">
<div class="container-fluid">
<div class="row">
<div class="col-md-8">
<div class="top-bar-left">
<div class="text">
<i class="far fa-clock"></i>
<h2>9:30 AM 6:30 PM</h2>
<p> Mon - Fri</p>
</div>
<div class="text">
<i class="fa fa-phone-alt"></i>
<a href="tel:+917794053340">+91 77940 53340</a>
<p>For Quotation</p>
</div>
</div>
</div>
<div class="col-md-4">
<div class="top-bar-right">
<div class="social">
<a href="https://x.com/ygrgobalit2024"><i class="fab fa-x-twitter"></i></a>
<a href="https://www.facebook.com/profile.php?id=61568888033386"><i class="fab fa-facebook-f"></i></a>
<a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/?viewAsMember=true/"><i class="fab fa-linkedin-in"></i></a>
<a href="https://www.instagram.com/ygrgobalitservices/"><i class="fab fa-instagram"></i></a>
<a href="https://www.youtube.com/@rrtalktrends"><i class="fab fa-youtube"></i></a>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Top Bar End -->
<header>
<div class="logo">
<a href="/"><img alt="logo" src="/images/logo1.jpeg"/></a>
</div>
<div class="mobile-toggle d-lg-none" id="mobileToggle">
<i class="fas fa-bars"></i>
</div>
<nav>
<a class="active" href="/">Home</a>
<!-- About Us Dropdown -->
<div class="nav-item about-dropdown">
<a class="active" href="javascript:void(0)" id="aboutToggle">About Us &#9662;</a>
<div class="about-menu">
<a href="/about">Company Overview</a>
<a href="/team">Meet the Team</a>
</div>
</div>
<div class="nav-item about-dropdown" id="servicesDropdown">
<a href="/services?type=web" id="servicesToggle">Services &#9662;</a>
<div class="about-menu">
<a href="/services?type=web">Web Design</a>
<a href="/services?type=webapp">Web Apps</a>
<a href="/services?type=mobile">Mobile Apps</a>
<a href="/services?type=dm">Marketing</a>
<a href="/services?type=uiux">UI / UX</a>
<a href="/services?type=testing">Testing</a>
<a href="/services?type=support">Support</a>
<a href="/services?type=intern">Internships</a>
</div>
</div>
<a class="active" href="/portfolio">Portfolio</a>
<a class="active" href="/careers">Careers</a>
<a class="active" href="/blog">Blog</a>
<a class="active" href="/contact">Contact Us</a>
<div class="nav-item about-dropdown">
<a href="javascript:void(0)" id="demoToggle">Demo For Client &#9662;</a>
<div class="about-menu">
<a href="http://demo.ygrgobalitservices.com/" target="_blank"> Customer Care Vizag</a>
<a href="http://trip.ygrgobalitservices.com/" target="_blank"> Trip</a>
<a href="http://uiux.ygrgobalitservices.com/" target="_blank">CodeLabs</a>
</div>
</div>
<!-- Employee Login Button -->
<a class="btn-employee-login" href="/login" id="employeeLoginBtn" rel="noopener noreferrer" target="_blank">
<i class="fas fa-user-circle"></i>
        Employee Login
      </a>
</nav>
</header>
<a aria-label="Chat on WhatsApp" class="support-btn" href="https://wa.me/917794053340" target="_blank">
<i class="bi bi-headset"></i>
</a>
<script>
    document.addEventListener("DOMContentLoaded", function () {
      const mobileToggle = document.getElementById("mobileToggle");
      const nav = document.querySelector("header nav");
      const aboutToggle = document.getElementById("aboutToggle");
      const aboutMenu = document.querySelector(".nav-item.about-dropdown .about-menu");
      const demoToggle = document.getElementById("demoToggle");
      const demoMenu = demoToggle.parentElement.querySelector(".about-menu");
      const servicesToggle = document.getElementById("servicesToggle");
      const servicesMenu = servicesToggle ? servicesToggle.parentElement.querySelector(".about-menu") : null;

      // Toggle mobile nav
      mobileToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        nav.classList.toggle("active");
      });

      // Toggle About Us
      aboutToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        aboutMenu.parentElement.classList.toggle("active");
      });

      // Toggle Services
      if (servicesToggle) { servicesToggle.addEventListener("click", function (e) { e.stopPropagation(); servicesMenu.parentElement.classList.toggle("active"); }); }

      // Toggle Demo For Client
      demoToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        demoMenu.parentElement.classList.toggle("active");
      });

      // Close everything on outside click
      document.addEventListener("click", function (e) {
        if (!nav.contains(e.target)) {
          nav.classList.remove("active");
          if (aboutMenu) aboutMenu.parentElement.classList.remove("active");
        }
      });

      // --- GOBAL REVEAL ENGINE ---
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      const handleReveals = () => {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));
      };

      handleReveals();
      window.addEventListener('scroll', handleReveals);
    });
  <\/script>
</body>
</html>
<div class="apply-offset mesh-gradient">
<div class="container">
<div class="application-card reveal">
<div class="header-section">
<img alt="logo" src="/images/logo1.png"/>
<h1>Join Our Ecosystem</h1>
<p style="color: #64748b; font-weight: 600;">Fill out the form below to start your professional journey with YGR.</p>
</div>
<!-- Progress Tracker -->
<div class="progress-tracker" id="tracker">
<div class="step-item active" data-step="0">1</div>
<div class="step-item" data-step="1">2</div>
<div class="step-item" data-step="2">3</div>
<div class="step-item" data-step="3">4</div>
<div class="step-item" data-step="4">5</div>
<div class="step-item" data-step="5">6</div>
</div>
<form enctype="multipart/form-data" id="jobForm" method="post">
<div class="alert alert-danger mb-4" style="border-radius: 15px; font-weight: 600;">
<i class="fas fa-exclamation-circle me-2"></i>
</div>
<!-- STEP 1: PERSONAL -->
<div class="form-step active">
<div class="section-title">Personal Details</div>
<div class="row">
<div class="col-md-6">
<label class="modern-label">First Name *</label>
<input class="modern-input" name="first_name" placeholder="e.g. John" required="" type="text"/>
</div>
<div class="col-md-6">
<label class="modern-label">Last Name *</label>
<input class="modern-input" name="last_name" placeholder="e.g. Doe" required="" type="text"/>
</div>
</div>
<div class="row">
<div class="col-md-6">
<label class="modern-label">Date of Birth *</label>
<input class="modern-input" name="dob" required="" type="date"/>
</div>
<div class="col-md-6">
<label class="modern-label">Gender *</label>
<select class="modern-input" name="gender" required="">
<option value="">Select</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>
</div>
</div>
<div class="row">
<div class="col-md-6">
<label class="modern-label">Phone *</label>
<input class="modern-input" maxlength="10" name="phone" pattern="[0-9]{10}" placeholder="10 Digit Number" required="" type="tel"/>
</div>
<div class="col-md-6">
<label class="modern-label">Email *</label>
<input class="modern-input" name="email" placeholder="john@email.com" required="" type="email"/>
</div>
</div>
<label class="modern-label">Current Address *</label>
<textarea class="modern-input" name="current_address" required=""></textarea>
<div class="btn-group-custom">
<button class="action-btn btn-next" type="button">Save &amp; Continue <i class="fas fa-arrow-right ms-2"></i></button>
</div>
</div>
<!-- STEP 2: JOB -->
<div class="form-step">
<div class="section-title">Job Information</div>
<label class="modern-label">Job Role Applying For *</label>
<input class="modern-input" name="job_role" readonly="" type="text" value=""/>
<label class="modern-label">Department *</label>
<input class="modern-input" name="department" placeholder="e.g. Software Engineering" required="" type="text"/>
<div class="row">
<div class="col-md-6">
<label class="modern-label">Employment Type *</label>
<select class="modern-input" name="employment_type" required="">
<option>Full Time</option>
<option>Part Time</option>
<option>Internship</option>
<option>Contract</option>
</select>
</div>
<div class="col-md-6">
<label class="modern-label">Preferred Work Mode *</label>
<select class="modern-input" name="preferred_work_mode" required="">
<option>Work From Office</option>
<option>Work From Home</option>
<option>Hybrid</option>
</select>
</div>
</div>
<div class="btn-group-custom">
<button class="action-btn btn-prev" type="button"><i class="fas fa-arrow-left me-2"></i> Back</button>
<button class="action-btn btn-next" type="button">Continue <i class="fas fa-arrow-right ms-2"></i></button>
</div>
</div>
<!-- STEP 3: EDUCATION -->
<div class="form-step">
<div class="section-title">Academic History</div>
<label class="modern-label">Highest Qualification *</label>
<select class="modern-input" name="highest_qualification" required="">
<option value="">Select Qualification</option>
<option>Graduate</option>
<option>Post Graduate</option>
<option>PhD</option>
</select>
<label class="modern-label">College / University *</label>
<input class="modern-input" name="college_university" required="" type="text"/>
<div class="row">
<div class="col-md-6">
<label class="modern-label">Passout Year *</label>
<input class="modern-input" min="1950" name="passout_year" required="" type="number"/>
</div>
<div class="col-md-6">
<label class="modern-label">Course / Stream *</label>
<input class="modern-input" name="course" required="" type="text"/>
</div>
</div>
<div class="btn-group-custom">
<button class="action-btn btn-prev" type="button">Back</button>
<button class="action-btn btn-next" type="button">Continue</button>
</div>
</div>
<!-- STEP 4: SKILLS -->
<div class="form-step">
<div class="section-title">Technical Expertise</div>
<label class="modern-label">Primary Skills *</label>
<input class="modern-input" name="primary_skills" placeholder="e.g. Python, React" required="" type="text"/>
<label class="modern-label">Technical Skills Description *</label>
<textarea class="modern-input" name="technical_skills" placeholder="Describe your proficiency..." required=""></textarea>
<label class="modern-label">Certifications</label>
<input class="modern-input" name="certifications" type="text"/>
<div class="btn-group-custom">
<button class="action-btn btn-prev" type="button">Back</button>
<button class="action-btn btn-next" type="button">Continue</button>
</div>
</div>
<!-- STEP 5: EXPERIENCE -->
<div class="form-step">
<div class="section-title">Experience Summary</div>
<label class="modern-label">Candidate Type *</label>
<select class="modern-input" id="candidate_type" name="candidate_type" required="">
<option value="">Select Type</option>
<option>Fresher</option>
<option>Experienced</option>
</select>
<div id="experience_fields" style="display:none;">
<div class="row">
<div class="col-md-6">
<label class="modern-label">Total Exp (Years)</label>
<input class="modern-input" name="total_experience" step="0.1" type="number"/>
</div>
<div class="col-md-6">
<label class="modern-label">Relevant Exp (Years)</label>
<input class="modern-input" name="relevant_experience" step="0.1" type="number"/>
</div>
</div>
<label class="modern-label">Current Company</label>
<input class="modern-input" name="current_company" type="text"/>
</div>
<div class="btn-group-custom">
<button class="action-btn btn-prev" type="button">Back</button>
<button class="action-btn btn-next" type="button">Continue</button>
</div>
</div>
<!-- STEP 6: DOCUMENTS -->
<div class="form-step">
<div class="section-title">Verification &amp; Submission</div>
<div class="row">
<div class="col-md-6">
<label class="modern-label">Upload Resume (PDF) *</label>
<div class="file-upload-box">
<i class="fas fa-file-pdf"></i>
<span>Upload Resume</span>
<input accept=".pdf" name="resume" required="" type="file"/>
</div>
</div>
<div class="col-md-6">
<label class="modern-label">Profile Photo *</label>
<div class="file-upload-box">
<i class="fas fa-user-circle"></i>
<span>Upload Photo</span>
<input accept="image/*" name="profile_photo" required="" type="file"/>
</div>
</div>
</div>
<label class="modern-label">PAN Number</label>
<input class="modern-input" maxlength="10" name="pan_number" placeholder="ABCDE1234F" type="text"/>
<label class="modern-label">LinkedIn / Portfolio URL</label>
<input class="modern-input" name="linkedin" placeholder="https://linkedin.com/in/yourprofile" type="url"/>
<div class="mt-4">
<label class="d-flex align-items-center gap-3" style="cursor: pointer;">
<input required="" style="width: 20px; height: 20px;" type="checkbox"/>
<span style="font-size: 14px; font-weight: 600; color: #64748b;">I declare that the information provided is accurate.</span>
</label>
</div>
<div class="btn-group-custom">
<button class="action-btn btn-prev" type="button">Back</button>
<button class="action-btn btn-submit" type="submit">Submit Application <i class="fas fa-paper-plane ms-2"></i></button>
</div>
</div>
</form>
</div>
</div>
</div>
<style>
/* ================= GOBAL FOOTER TYPOGRAPHY (MATCH SERVICES PAGE) ================= */
.footer,
.footer p,
.footer a,
.footer h2,
.mobile-footer,
.mobile-footer a {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400;
}

/* ================= DESKTOP FOOTER ================= */
.footer {
    position: relative;
    margin-top: 45px;
    padding-top: 10px;
    background: #092a49;
}

.container {
    max-width: 90%;
    padding: 0 20px;
    margin: 0 auto;
}

.footer .logo {
    height: 100px;
    width: auto;
    display: block;
    padding-bottom: 10px;
}

.footer-row {
    display: flex;
    justify-content: flex-start;
    gap: 80px;
}

/* SECTION WRAPPERS */
.footer-contact,
.footer-link,
.footer-newsletter {
    flex: 1;
    max-width: 25%;
    color: #ffffff;
    margin-bottom: 45px;
}

/* HEADINGS */
.footer .footer-contact h2,
.footer .footer-link h2,
.footer .footer-newsletter h2 {
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.5px;
    margin-bottom: 20px;
    padding-bottom: 8px;
    position: relative;
}

.footer .footer-contact h2::after,
.footer .footer-link h2::after,
.footer .footer-newsletter h2::after {
    content: "";
    position: absolute;
    width: 45px;
    height: 2px;
    bottom: 0;
    left: 0;
    background: #fbcc27;
}

/* TEXT & LINKS */
.footer p {
    color: #e6e6e6;
    margin-bottom: 12px;
}

.footer a {
    color: #e6e6e6;
    text-decoration: none;
    transition: 0.3s;
}

.footer a:hover {
    color: #fbcc27;
}

/* QUICK LINKS */
.footer .footer-link a {
    display: block;
    margin-bottom: 10px;
}

.footer .footer-link a::before {
    content: "\f105";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    margin-right: 10px;
}

/* CONTACT ICONS */
.footer-contact p i {
    width: 25px;
    font-size: 16px;
}

.fa-phone-alt {
    transform: rotate(90deg);
}

/* SOCIAL ICONS */
.footer-social {
    margin-top: 20px;
}

.footer-social a i {
    margin-right: 15px;
    font-size: 18px;
    color: #f0f2f3;
    transition: 0.3s;
}

.footer-social a:hover i {
    color: #fbcc27;
}

/* COPYRIGHT */
.footer .copyright {
    padding: 0 30px;
}
.footer .copyright .row {
    padding: 25px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.footer .copyright p {
    margin: 0;
    color: #999999;
}
.footer .copyright p a {
    color: #ffffff;
}
.footer .copyright p a:hover {
    color: #fbcc27;
}
/* ================= SOCIAL MEDIA BRAND HOVER COLORS ================= */
 
.footer-social a[href*="x.com"]:hover i {
    color: #000000;
}
 
.footer-social a[href*="facebook.com"]:hover i {
    color: #1877f2;
}
 
.footer-social a[href*="linkedin.com"]:hover i {
    color: #0a66c2;
}
 
.footer-social a[href*="instagram.com"]:hover i {
    color: #e1306c;
}
 
.footer-social a[href*="youtube.com"]:hover i {
    color: #ff0000;
}

/* ================= MOBILE VISIBILITY ================= */
@media (max-width: 767px) {
    .footer {
        display: none;
    }
}

/* ================= MOBILE FOOTER ================= */
.mobile-footer {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #092a49;
    border-top: 1px solid #fbcc27;
    justify-content: space-around;
    padding: 10px 0;
    z-index: 999;
}

.mobile-footer a {
    text-align: center;
    flex: 1;
    color: #ffffff;
    font-size: 14px;
    text-decoration: none;
    font-weight: 400;
}

.mobile-footer i {
    display: block;
    font-size: 20px;
    margin-bottom: 3px;
}

@media (max-width: 767px) {
    .mobile-footer {
        display: flex;
    }
}
</style>

<!-- ================= DESKTOP FOOTER HTML ================= -->

<div class="footer">
<div class="container">
<a href="/">
<img alt="YGR Gobal IT Services" class="logo" src="/images/logo1.jpeg"/>
</a>
<div class="footer-row">
<!-- CONTACT -->
<div class="footer-contact">
<h2>Our Head Office</h2>
<p><i class="fa fa-map-marker-alt"></i>
                    Manjeera Trinity Corporate,
                    Next to Lulu Mall, Kukatpally Housing Board Colony,
                    Hyderabad, Telangana 500072
                </p>
<p><i class="fa fa-phone"></i>
<a href="tel:+917794053340">+91 77940 53340</a>
</p>
<p><i class="fa fa-envelope"></i>
<a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a>
</p>
<div class="footer-social">
<a href="https://x.com/ygrgobalit2024"><i class="fab fa-x-twitter"></i></a>
<a href="https://www.facebook.com/profile.php?id=61568888033386"><i class="fab fa-facebook-f"></i></a>
<a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/"><i class="fab fa-linkedin-in"></i></a>
<a href="https://www.instagram.com/ygrgobalitservices/"><i class="fab fa-instagram"></i></a>
<a href="https://www.youtube.com/@rrtalktrends"><i class="fab fa-youtube"></i></a>
</div>
</div>
<!-- QUICK LINKS -->
<div class="footer-link">
<h2>Quick Links</h2>
<a href="/terms">Terms of Use</a>
<a href="/privacy">Privacy Policy</a>
<a href="/cookies">Cookies</a>
<a href="/help">Help</a>
<a href="/faqs">FAQs</a>
<a href="/refund">Refund Policy</a>
<a href="/shipping">Shipping</a>
</div>
<!-- NAVIGATION -->
<div class="footer-link">
<h2>Navigation</h2>
<a href="/">Home</a>
<a href="/about">About Us</a>
<a href="/portfolio">Portfolio</a>
<a href="/careers">Careers</a>
<a href="/blog">Blog</a>
<a href="/contact">Contact Us</a>
</div>
<!-- ABOUT -->
<div class="footer-newsletter">
<h2>YGR IT SERVICES</h2>
<p>
                    YGR Gobal IT Services Pvt. Ltd. provides complete IT solutions including software,
                    web &amp; mobile app development, digital marketing, professional IT training,
                    internships, and full stack courses.
                    <br/>
<a href="/about" style="color:#fbcc27;">Read more</a>
</p>
</div>
</div>
<!-- COPYRIGHT -->
<div class="container copyright" style="margin-top: 40px;">
<div class="row">
<div class="col-md-6">
<p>
                        &copy; <a href="https://ygrgobalitservices.com">YGR Gobal IT Services</a>. All Rights Reserved.
                    </p>
</div>
<div class="col-md-6 text-right">
<p>
                        Designed by <a href="https://ygrgobalitservices.com">YGR Gobal IT Services Pvt. Ltd, 2023.</a>
</p>
</div>
</div>
</div>
</div>
</div>
 ================= MOBILE FOOTER ================= 
<div class="mobile-footer">
<a href="/">
<i class="fa fa-home"></i>
</a>
<a href="/blog">
<i class="fa fa-blog"></i>
</a>
<a href="#">
<i class="fa fa-search"></i>
</a>
<a href="/careers">
<i class="fa fa-file-alt"></i>
</a>
<a href="#">
<i class="fa fa-shopping-cart"></i>
</a>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"><\/script>
<script>
        const steps = document.querySelectorAll(".form-step");
        const nextBtns = document.querySelectorAll(".btn-next");
        const prevBtns = document.querySelectorAll(".btn-prev");
        const stepItems = document.querySelectorAll(".step-item");
        
        let current = 0;

        nextBtns.forEach(btn => {
            btn.onclick = () => {
                const inputs = steps[current].querySelectorAll("input,select,textarea");
                for(let i of inputs){
                    if(!i.checkValidity()){
                        i.reportValidity();
                        return;
                    }
                }
                current++;
                update();
                window.scrollTo({ top: 100, behavior: 'smooth' });
            };
        });

        prevBtns.forEach(btn => {
            btn.onclick = () => {
                current--;
                update();
                window.scrollTo({ top: 100, behavior: 'smooth' });
            };
        });

        function update(){
            steps.forEach((s,i) => s.classList.toggle("active", i === current));
            stepItems.forEach((item, i) => {
                item.classList.toggle("active", i === current);
                item.classList.toggle("completed", i < current);
            });
        }

        document.getElementById("candidate_type").addEventListener("change", function(){
            const exp = document.getElementById("experience_fields");
            exp.style.display = this.value === "Experienced" ? "block" : "none";
        });

        // Reveal Logic
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    <\/script>
`}})},bs=()=>{let e=bt(),t=(0,x.useRef)(null);return(0,x.useEffect)(()=>{let n=t=>{let n=t.target.closest(`a`);n&&n.getAttribute(`href`)&&n.getAttribute(`href`).startsWith(`/`)&&(t.preventDefault(),e(n.getAttribute(`href`)))};return document.addEventListener(`click`,n),t.current&&t.current.querySelectorAll(`script`).forEach(e=>{if(e.dataset.executed)return;let t=document.createElement(`script`);Array.from(e.attributes).forEach(e=>t.setAttribute(e.name,e.value)),e.innerHTML&&t.appendChild(document.createTextNode(e.innerHTML)),e.parentNode.replaceChild(t,e),t.dataset.executed=`true`}),()=>document.removeEventListener(`click`,n)},[e]),(0,b.jsx)(`div`,{ref:t,dangerouslySetInnerHTML:{__html:`<link href="/images/logo.png" rel="icon" type="image/png"/>
<style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      max-width: 100%;
      overflow-x: hidden;
      padding: 0;
    }

    .form-container {
      background-color: #fff;
      padding: 25px 20px;
      border-radius: 10px;
      max-width: 350px;
      margin: 50px auto;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      text-align: center;
    }

    .form-container img.logo1 {
      width: 80px;
      margin-bottom: 15px;
    }

    h2 {
      margin-bottom: 20px;
      color: #092A49;
      font-size: 22px;
    }

    input[type="text"],
    input[type="password"] {
      width: 100%;
      padding: 12px;
      margin: 8px 0;
      border-radius: 5px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      font-size: 14px;
    }

    input[type="submit"] {
      background-color: #092A49;
      color: #fff;
      padding: 12px;
      width: 100%;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }

    input[type="submit"]:hover {
opacity: 0.95;    }

    .error {
      color: red;
      font-size: 13px;
      margin-bottom: 10px;
      text-align: left;
    }

    .form-container p{
      font-size: 18px;
      margin-top: 20px;
    }

    .form-container p a {
      color: #092A49;
      text-decoration: none;
      font-weight: bold;
    }

    .form-container p a:hover{
 opacity: 0.95;   
 color: #fbcc27; }

    @media (max-width: 400px) {
      .form-container {
        margin: 20px 10px;
        padding: 20px 15px;
      }
  .form-container p{
      font-size: 16px; 
    }
      .form-container h2 {
        font-size: 1.8rem;
      }

      input[type="submit"] {
        font-size: 15px;
        padding: 10px;
      }
    }
  </style>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<!-- Bootstrap -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet"/>
<!-- Font Awesome 6 ONLY -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet"/>
<!-- Bootstrap Icons -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet"/>
<!-- Modern UI Design System -->
<link href="/css/modern_ui.css" rel="stylesheet"/>
<style>
    /* ===== General Styles ===== */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Lato', sans-serif;
      background-color: #f5f6fa;
      color: #797979
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Oswald', sans-serif;
      color: #092a49;
      font-weight: 700
    }

    a {
      text-decoration: none;
      color: #092a49;
      transition: color 0.3s
    }

    a:hover {
      color: #fbcc27;
      text-decoration: none;
    }

    /* Top bar */
    .top-bar {
      position: relative;
      height: 45px;
      background: #0796fe;
      /* Solid blue as per image */
      display: flex;
      align-items: center;
    }

    .top-bar .text {
      display: flex;
      align-items: center;
      height: 45px;
      padding: 0 20px;
      border-right: 1px solid rgba(255, 255, 255, .2);
    }

    .top-bar .text:first-child {
      border-left: 1px solid rgba(255, 255, 255, .2);
    }

    .top-bar .text i {
      font-size: 15px;
      color: #ffffff;
      margin-right: 10px;
    }

    .top-bar .text h2,
    .top-bar .text a,
    .top-bar .text p {
      color: #ffffff !important;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.5px;
      margin: 0;
    }

    .top-bar .text h2+p,
    .top-bar .text a+p {
      margin-left: 12px;
    }

    .top-bar .social {
      display: flex;
      height: 45px;
      justify-content: flex-end;
    }

    .top-bar .social a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 100%;
      font-size: 16px;
      color: #ffffff;
      border-left: 1px solid rgba(255, 255, 255, .2);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .top-bar .social a:hover {
      background: rgba(255, 255, 255, 0.1);
    }


    /* ================= TOP BAR SOCIAL BRAND COLORS ================= */

    .top-bar .social a[href*="x.com"]:hover {

      color: #000000;
    }

    .top-bar .social a[href*="facebook.com"]:hover {

      color: #1877f2;
    }

    .top-bar .social a[href*="linkedin.com"]:hover {

      color: #0a66c2;
    }

    .top-bar .social a[href*="instagram.com"]:hover {

      color: #e1306c;
      ;
    }

    .top-bar .social a[href*="youtube.com"]:hover {

      color: #ff0000;
    }

    /* Header */
    header {
      background-color: #092a49;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      /* Increased for better logo fit */
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    header .logo img {
      height: 50px;
      width: auto;
      display: block;
    }

    header nav {
      display: flex;
      gap: 30px
    }

    header nav a {
      color: #ffffff !important;
      font-size: 15px;
      font-weight: 500;
      transition: all 0.3s ease;
      text-transform: capitalize;
    }

    header nav a:hover {
      color: #fbcc27 !important;
      text-decoration: none;
    }

    header nav a.active {
      font-weight: 700 !important;
      color: #ffffff !important;
    }

    /* About Us Dropdown */
    .nav-item.about-dropdown {
      position: relative
    }

    .nav-item.about-dropdown .about-menu {
      position: absolute;
      top: 40px;
      left: -30px;
      min-width: 200px;
      background: #092a49;
      border-radius: 4px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.3s ease;
      z-index: 999
    }

    .nav-item.about-dropdown:hover .about-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0)
    }

    .about-menu a {
      display: block;
      padding: 10px 20px;
      font-size: 15px;
      color: #ffffff;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease
    }

    .about-menu a:hover {
      color: #fbcc27;
    }

    /* Floating Support Button */
    .support-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 55px;
      height: 55px;
      background: #092a49;
      color: #fff;
      border-radius: 50%;
      font-size: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
      z-index: 9999;
      transition: all 0.3s ease
    }

    .support-btn:hover {
      background: #092a49;
      text-decoration: none;
      transform: translateY(-3px)
    }

    .support-btn i {
      color: #fff
    }

    @media(max-width:768px) {
      .support-btn {
        width: 48px;
        height: 48px;
        font-size: 22px;
        bottom: 90px;
        right: 15px
      }
    }

    header nav a.active {
      color: #fff !important;
      font-weight: 600
    }

    /* ================= EMPLOYEE LOGIN BUTTON ================= */
    .btn-employee-login {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: linear-gradient(135deg, #fbcc27, #f39c12);
      color: #092a49 !important;
      font-size: 14px;
      font-weight: 700;
      padding: 8px 18px;
      border-radius: 50px;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(251, 204, 39, 0.35);
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-employee-login:hover {
      background: linear-gradient(135deg, #f39c12, #fbcc27);
      color: #092a49 !important;
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(251, 204, 39, 0.5);
      text-decoration: none;
    }

    .btn-employee-login i {
      font-size: 15px;
      color: #092a49 !important;
    }

    @media(max-width:991px) {
      .btn-employee-login {
        margin: 10px 20px;
        width: calc(100% - 40px);
        justify-content: center;
        padding: 12px 20px;
        font-size: 15px;
        border-radius: 8px;
      }
    }

    /* ================= MOBILE NAV ONLY ================= */
    @media(max-width:991px) {
      .top-bar {
        display: none !important
      }

      header {
        padding: 15px 20px;
        height: auto
      }

      header .logo img {
        height: 40px;
        border-radius: 50%;
      }

      .mobile-toggle {
        font-size: 26px;
        color: #fff;
        cursor: pointer;
        display: block
      }

      header nav {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #092a49;
        flex-direction: column;
        gap: 0;
        display: none;
        z-index: 999;
        max-height: 70vh;
        overflow-y: auto
      }

      header nav.active {
        display: flex
      }

      header nav a {
        padding: 14px 20px;
        color: #fff;
        font-size: 16px;
        width: 100%
      }

      /* Services Mobile Scrollable */
      .nav-item.dropdown .dropdown-menu {
        position: static;
        width: 100%;
        background: #0b355a;
        display: none;
        opacity: 1;
        visibility: visible;
        max-height: 70vh;
        overflow-y: auto
      }

      .nav-item.dropdown .dropdown-menu.show {
        display: block
      }

      .dropdown-grid {
        grid-template-columns: 1fr;
        padding: 0
      }

      .dropdown-grid a {
        padding: 12px 30px;
        font-size: 14px;
        color: #fff
      }

      .dropdown-grid a::before {
        content: "&#8250;";
        color: #fff
      }

      /* About Us Mobile Clickable */
      .nav-item.about-dropdown .about-menu {
        position: static;
        background: #0b355a;
        box-shadow: none;
        display: none;
        max-height: 70vh;
        overflow-y: auto
      }

      .nav-item.about-dropdown .about-menu a {
        padding: 12px 30px;
        font-size: 14px;
        color: #fff
      }

      .nav-item.about-dropdown .about-menu a:hover {
        background-color: #0796fe33;
        color: #fff
      }

      .nav-item.about-dropdown.active .about-menu {
        display: block
      }

      .nav-item.about-dropdown {
        padding-bottom: 14px;
        padding-top: 14px;
      }

      .nav-item.dropdown {
        padding-bottom: 14px;
        padding-top: 14px;
      }
    }
  </style>
</head>
<body>
<!-- Top Bar Start -->
<div class="top-bar d-none d-md-block">
<div class="container-fluid">
<div class="row">
<div class="col-md-8">
<div class="top-bar-left">
<div class="text">
<i class="far fa-clock"></i>
<h2>9:30 AM 6:30 PM</h2>
<p> Mon - Fri</p>
</div>
<div class="text">
<i class="fa fa-phone-alt"></i>
<a href="tel:+917794053340">+91 77940 53340</a>
<p>For Quotation</p>
</div>
</div>
</div>
<div class="col-md-4">
<div class="top-bar-right">
<div class="social">
<a href="https://x.com/ygrgobalit2024"><i class="fab fa-x-twitter"></i></a>
<a href="https://www.facebook.com/profile.php?id=61568888033386"><i class="fab fa-facebook-f"></i></a>
<a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/?viewAsMember=true/"><i class="fab fa-linkedin-in"></i></a>
<a href="https://www.instagram.com/ygrgobalitservices/"><i class="fab fa-instagram"></i></a>
<a href="https://www.youtube.com/@rrtalktrends"><i class="fab fa-youtube"></i></a>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Top Bar End -->
<header>
<div class="logo">
<a href="/"><img alt="logo" src="/images/logo1.jpeg"/></a>
</div>
<div class="mobile-toggle d-lg-none" id="mobileToggle">
<i class="fas fa-bars"></i>
</div>
<nav>
<a class="active" href="/">Home</a>
<!-- About Us Dropdown -->
<div class="nav-item about-dropdown">
<a class="active" href="javascript:void(0)" id="aboutToggle">About Us &#9662;</a>
<div class="about-menu">
<a href="/about">Company Overview</a>
<a href="/team">Meet the Team</a>
</div>
</div>
<div class="nav-item about-dropdown" id="servicesDropdown">
<a href="/services?type=web" id="servicesToggle">Services &#9662;</a>
<div class="about-menu">
<a href="/services?type=web">Web Design</a>
<a href="/services?type=webapp">Web Apps</a>
<a href="/services?type=mobile">Mobile Apps</a>
<a href="/services?type=dm">Marketing</a>
<a href="/services?type=uiux">UI / UX</a>
<a href="/services?type=testing">Testing</a>
<a href="/services?type=support">Support</a>
<a href="/services?type=intern">Internships</a>
</div>
</div>
<a class="active" href="/portfolio">Portfolio</a>
<a class="active" href="/careers">Careers</a>
<a class="active" href="/blog">Blog</a>
<a class="active" href="/contact">Contact Us</a>
<div class="nav-item about-dropdown">
<a href="javascript:void(0)" id="demoToggle">Demo For Client &#9662;</a>
<div class="about-menu">
<a href="http://demo.ygrgobalitservices.com/" target="_blank"> Customer Care Vizag</a>
<a href="http://trip.ygrgobalitservices.com/" target="_blank"> Trip</a>
<a href="http://uiux.ygrgobalitservices.com/" target="_blank">CodeLabs</a>
</div>
</div>
<!-- Employee Login Button -->
<a class="btn-employee-login" href="/login" id="employeeLoginBtn" rel="noopener noreferrer" target="_blank">
<i class="fas fa-user-circle"></i>
        Employee Login
      </a>
</nav>
</header>
<a aria-label="Chat on WhatsApp" class="support-btn" href="https://wa.me/917794053340" target="_blank">
<i class="bi bi-headset"></i>
</a>
<script>
    document.addEventListener("DOMContentLoaded", function () {
      const mobileToggle = document.getElementById("mobileToggle");
      const nav = document.querySelector("header nav");
      const aboutToggle = document.getElementById("aboutToggle");
      const aboutMenu = document.querySelector(".nav-item.about-dropdown .about-menu");
      const demoToggle = document.getElementById("demoToggle");
      const demoMenu = demoToggle.parentElement.querySelector(".about-menu");
      const servicesToggle = document.getElementById("servicesToggle");
      const servicesMenu = servicesToggle ? servicesToggle.parentElement.querySelector(".about-menu") : null;

      // Toggle mobile nav
      mobileToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        nav.classList.toggle("active");
      });

      // Toggle About Us
      aboutToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        aboutMenu.parentElement.classList.toggle("active");
      });

      // Toggle Services
      if (servicesToggle) { servicesToggle.addEventListener("click", function (e) { e.stopPropagation(); servicesMenu.parentElement.classList.toggle("active"); }); }

      // Toggle Demo For Client
      demoToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        demoMenu.parentElement.classList.toggle("active");
      });

      // Close everything on outside click
      document.addEventListener("click", function (e) {
        if (!nav.contains(e.target)) {
          nav.classList.remove("active");
          if (aboutMenu) aboutMenu.parentElement.classList.remove("active");
        }
      });

      // --- GOBAL REVEAL ENGINE ---
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      const handleReveals = () => {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));
      };

      handleReveals();
      window.addEventListener('scroll', handleReveals);
    });
  <\/script>
</body>
</html>
<div class="form-container">
<img alt="logo" class="logo1" src="/images/logo.png"/>
<h2>Job Applicant Login</h2>
<div class="error"></div>
<form method="POST">
<input name="login_value" placeholder="Email" required="" type="text"/>
<input name="password" placeholder="Phone Number" required="" type="password"/>
<input style="   background: linear-gradient(135deg, #0D3B6C, #095191);
" type="submit" value="Login"/>
</form>
<p>Don't have an application? <a href="">Apply Now</a></p>
</div>
<style>
/* ================= GOBAL FOOTER TYPOGRAPHY (MATCH SERVICES PAGE) ================= */
.footer,
.footer p,
.footer a,
.footer h2,
.mobile-footer,
.mobile-footer a {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400;
}

/* ================= DESKTOP FOOTER ================= */
.footer {
    position: relative;
    margin-top: 45px;
    padding-top: 10px;
    background: #092a49;
}

.container {
    max-width: 90%;
    padding: 0 20px;
    margin: 0 auto;
}

.footer .logo {
    height: 100px;
    width: auto;
    display: block;
    padding-bottom: 10px;
}

.footer-row {
    display: flex;
    justify-content: flex-start;
    gap: 80px;
}

/* SECTION WRAPPERS */
.footer-contact,
.footer-link,
.footer-newsletter {
    flex: 1;
    max-width: 25%;
    color: #ffffff;
    margin-bottom: 45px;
}

/* HEADINGS */
.footer .footer-contact h2,
.footer .footer-link h2,
.footer .footer-newsletter h2 {
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.5px;
    margin-bottom: 20px;
    padding-bottom: 8px;
    position: relative;
}

.footer .footer-contact h2::after,
.footer .footer-link h2::after,
.footer .footer-newsletter h2::after {
    content: "";
    position: absolute;
    width: 45px;
    height: 2px;
    bottom: 0;
    left: 0;
    background: #fbcc27;
}

/* TEXT & LINKS */
.footer p {
    color: #e6e6e6;
    margin-bottom: 12px;
}

.footer a {
    color: #e6e6e6;
    text-decoration: none;
    transition: 0.3s;
}

.footer a:hover {
    color: #fbcc27;
}

/* QUICK LINKS */
.footer .footer-link a {
    display: block;
    margin-bottom: 10px;
}

.footer .footer-link a::before {
    content: "\f105";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    margin-right: 10px;
}

/* CONTACT ICONS */
.footer-contact p i {
    width: 25px;
    font-size: 16px;
}

.fa-phone-alt {
    transform: rotate(90deg);
}

/* SOCIAL ICONS */
.footer-social {
    margin-top: 20px;
}

.footer-social a i {
    margin-right: 15px;
    font-size: 18px;
    color: #f0f2f3;
    transition: 0.3s;
}

.footer-social a:hover i {
    color: #fbcc27;
}

/* COPYRIGHT */
.footer .copyright {
    padding: 0 30px;
}
.footer .copyright .row {
    padding: 25px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.footer .copyright p {
    margin: 0;
    color: #999999;
}
.footer .copyright p a {
    color: #ffffff;
}
.footer .copyright p a:hover {
    color: #fbcc27;
}
/* ================= SOCIAL MEDIA BRAND HOVER COLORS ================= */
 
.footer-social a[href*="x.com"]:hover i {
    color: #000000;
}
 
.footer-social a[href*="facebook.com"]:hover i {
    color: #1877f2;
}
 
.footer-social a[href*="linkedin.com"]:hover i {
    color: #0a66c2;
}
 
.footer-social a[href*="instagram.com"]:hover i {
    color: #e1306c;
}
 
.footer-social a[href*="youtube.com"]:hover i {
    color: #ff0000;
}

/* ================= MOBILE VISIBILITY ================= */
@media (max-width: 767px) {
    .footer {
        display: none;
    }
}

/* ================= MOBILE FOOTER ================= */
.mobile-footer {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #092a49;
    border-top: 1px solid #fbcc27;
    justify-content: space-around;
    padding: 10px 0;
    z-index: 999;
}

.mobile-footer a {
    text-align: center;
    flex: 1;
    color: #ffffff;
    font-size: 14px;
    text-decoration: none;
    font-weight: 400;
}

.mobile-footer i {
    display: block;
    font-size: 20px;
    margin-bottom: 3px;
}

@media (max-width: 767px) {
    .mobile-footer {
        display: flex;
    }
}
</style>

<!-- ================= DESKTOP FOOTER HTML ================= -->

<div class="footer">
<div class="container">
<a href="/">
<img alt="YGR Gobal IT Services" class="logo" src="/images/logo1.jpeg"/>
</a>
<div class="footer-row">
<!-- CONTACT -->
<div class="footer-contact">
<h2>Our Head Office</h2>
<p><i class="fa fa-map-marker-alt"></i>
                    Manjeera Trinity Corporate,
                    Next to Lulu Mall, Kukatpally Housing Board Colony,
                    Hyderabad, Telangana 500072
                </p>
<p><i class="fa fa-phone"></i>
<a href="tel:+917794053340">+91 77940 53340</a>
</p>
<p><i class="fa fa-envelope"></i>
<a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a>
</p>
<div class="footer-social">
<a href="https://x.com/ygrgobalit2024"><i class="fab fa-x-twitter"></i></a>
<a href="https://www.facebook.com/profile.php?id=61568888033386"><i class="fab fa-facebook-f"></i></a>
<a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/"><i class="fab fa-linkedin-in"></i></a>
<a href="https://www.instagram.com/ygrgobalitservices/"><i class="fab fa-instagram"></i></a>
<a href="https://www.youtube.com/@rrtalktrends"><i class="fab fa-youtube"></i></a>
</div>
</div>
<!-- QUICK LINKS -->
<div class="footer-link">
<h2>Quick Links</h2>
<a href="/terms">Terms of Use</a>
<a href="/privacy">Privacy Policy</a>
<a href="/cookies">Cookies</a>
<a href="/help">Help</a>
<a href="/faqs">FAQs</a>
<a href="/refund">Refund Policy</a>
<a href="/shipping">Shipping</a>
</div>
<!-- NAVIGATION -->
<div class="footer-link">
<h2>Navigation</h2>
<a href="/">Home</a>
<a href="/about">About Us</a>
<a href="/portfolio">Portfolio</a>
<a href="/careers">Careers</a>
<a href="/blog">Blog</a>
<a href="/contact">Contact Us</a>
</div>
<!-- ABOUT -->
<div class="footer-newsletter">
<h2>YGR IT SERVICES</h2>
<p>
                    YGR Gobal IT Services Pvt. Ltd. provides complete IT solutions including software,
                    web &amp; mobile app development, digital marketing, professional IT training,
                    internships, and full stack courses.
                    <br/>
<a href="/about" style="color:#fbcc27;">Read more</a>
</p>
</div>
</div>
<!-- COPYRIGHT -->
<div class="container copyright" style="margin-top: 40px;">
<div class="row">
<div class="col-md-6">
<p>
                        &copy; <a href="https://ygrgobalitservices.com">YGR Gobal IT Services</a>. All Rights Reserved.
                    </p>
</div>
<div class="col-md-6 text-right">
<p>
                        Designed by <a href="https://ygrgobalitservices.com">YGR Gobal IT Services Pvt. Ltd, 2023.</a>
</p>
</div>
</div>
</div>
</div>
</div>
 ================= MOBILE FOOTER ================= 
<div class="mobile-footer">
<a href="/">
<i class="fa fa-home"></i>
</a>
<a href="/blog">
<i class="fa fa-blog"></i>
</a>
<a href="#">
<i class="fa fa-search"></i>
</a>
<a href="/careers">
<i class="fa fa-file-alt"></i>
</a>
<a href="#">
<i class="fa fa-shopping-cart"></i>
</a>
</div>
`}})},xs=()=>{let e=bt(),t=(0,x.useRef)(null),n=new URLSearchParams(window.location.search).get(`course_id`);return(0,x.useEffect)(()=>{let n=t=>{let n=t.target.closest(`a`);n&&n.getAttribute(`href`)&&n.getAttribute(`href`).startsWith(`/`)&&(t.preventDefault(),e(n.getAttribute(`href`)))};return document.addEventListener(`click`,n),t.current&&t.current.querySelectorAll(`script`).forEach(e=>{if(e.dataset.executed)return;let t=document.createElement(`script`);Array.from(e.attributes).forEach(e=>t.setAttribute(e.name,e.value)),e.innerHTML&&t.appendChild(document.createTextNode(e.innerHTML)),e.parentNode.replaceChild(t,e),t.dataset.executed=`true`}),()=>document.removeEventListener(`click`,n)},[e]),(0,b.jsx)(`div`,{ref:t,dangerouslySetInnerHTML:{__html:`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
<link href="/images/logo.png" rel="icon" type="image/png"/>
<link href="/css/modern_ui.css" rel="stylesheet"/>
<style>
        :root {
            --primary-navy: #092a49;
            --accent-gold: #fbcc27;
            --white: #ffffff;
        }

        body {
            background: #f8fafc !important;
            font-family: 'Lato', sans-serif;
        }

        /* Clearance for Sticky Header */
        .register-offset {
            padding-top: 160px;
            padding-bottom: 100px;
            min-height: 100vh;
        }

        .registration-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 40px;
            border: 1px solid rgba(0,0,0,0.05);
            box-shadow: 0 40px 80px rgba(9, 42, 73, 0.12);
            padding: 60px;
            max-width: 900px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
        }

        .registration-card::before {
            content: '';
            position: absolute;
            top: 0; right: 0; width: 150px; height: 150px;
            background: radial-gradient(circle, rgba(251, 204, 39, 0.1) 0%, transparent 70%);
            z-index: 0;
        }

        .reg-header {
            text-align: center;
            margin-bottom: 50px;
            position: relative;
            z-index: 1;
        }

        .reg-header img {
            width: 100px;
            margin-bottom: 25px;
        }

        .reg-header h1 {
            font-size: 38px;
            color: var(--primary-navy);
            font-family: 'Oswald', sans-serif !important;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .course-badge {
            display: inline-block;
            background: var(--primary-navy);
            color: var(--accent-gold);
            padding: 8px 25px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 14px;
            margin-top: 15px;
            box-shadow: 0 10px 20px rgba(9, 42, 73, 0.1);
        }

        /* Form Styling */
        .form-section-title {
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #94a3b8;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .form-section-title::after {
            content: '';
            height: 1px;
            background: #e2e8f0;
            flex: 1;
        }

        .modern-input-group {
            margin-bottom: 25px;
        }

        .modern-label {
            display: block;
            font-weight: 700;
            font-size: 13px;
            color: var(--primary-navy);
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .modern-label .required {
            color: #ef4444;
            margin-left: 3px;
        }

        .modern-input {
            width: 100%;
            padding: 16px 20px;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 15px;
            font-size: 16px;
            transition: all 0.3s ease;
            color: var(--primary-navy);
        }

        .modern-input:focus {
            border-color: var(--accent-gold);
            background: #ffffff;
            outline: none;
            box-shadow: 0 10px 25px rgba(251, 204, 39, 0.1);
        }

        .file-upload-wrapper {
            position: relative;
            background: #f8fafc;
            border: 2px dashed #e2e8f0;
            border-radius: 15px;
            padding: 20px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .file-upload-wrapper:hover {
            border-color: var(--accent-gold);
            background: #fff;
        }

        .file-upload-wrapper input[type="file"] {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        .file-upload-text {
            color: #64748b;
            font-size: 14px;
        }

        .file-upload-text i {
            display: block;
            font-size: 24px;
            color: var(--primary-navy);
            margin-bottom: 10px;
        }

        .error-msg {
            color: #ef4444;
            font-size: 12px;
            font-weight: 600;
            margin-top: 5px;
        }

        .pay-btn {
            background: var(--accent-gold);
            color: var(--primary-navy);
            border: none;
            padding: 22px;
            border-radius: 18px;
            width: 100%;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 16px;
            margin-top: 30px;
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 0 20px 40px rgba(251, 204, 39, 0.2);
        }

        .pay-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 30px 60px rgba(251, 204, 39, 0.3);
            background: #fbd24d;
        }

        .login-footer {
            text-align: center;
            margin-top: 35px;
            color: #64748b;
            font-weight: 600;
        }

        .login-footer a {
            color: var(--primary-navy);
            text-decoration: none;
            font-weight: 800;
            margin-left: 5px;
            border-bottom: 2px solid var(--accent-gold);
        }

        @media (max-width: 768px) {
            .registration-card { padding: 40px 25px; border-radius: 30px; }
            .reg-header h1 { font-size: 28px; }
            .register-offset { padding-top: 120px; }
        }
    </style>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<!-- Bootstrap -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet"/>
<!-- Font Awesome 6 ONLY -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet"/>
<!-- Bootstrap Icons -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet"/>
<!-- Modern UI Design System -->
<link href="/css/modern_ui.css" rel="stylesheet"/>
<style>
    /* ===== General Styles ===== */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Lato', sans-serif;
      background-color: #f5f6fa;
      color: #797979
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Oswald', sans-serif;
      color: #092a49;
      font-weight: 700
    }

    a {
      text-decoration: none;
      color: #092a49;
      transition: color 0.3s
    }

    a:hover {
      color: #fbcc27;
      text-decoration: none;
    }

    /* Top bar */
    .top-bar {
      position: relative;
      height: 45px;
      background: #0796fe;
      /* Solid blue as per image */
      display: flex;
      align-items: center;
    }

    .top-bar .text {
      display: flex;
      align-items: center;
      height: 45px;
      padding: 0 20px;
      border-right: 1px solid rgba(255, 255, 255, .2);
    }

    .top-bar .text:first-child {
      border-left: 1px solid rgba(255, 255, 255, .2);
    }

    .top-bar .text i {
      font-size: 15px;
      color: #ffffff;
      margin-right: 10px;
    }

    .top-bar .text h2,
    .top-bar .text a,
    .top-bar .text p {
      color: #ffffff !important;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.5px;
      margin: 0;
    }

    .top-bar .text h2+p,
    .top-bar .text a+p {
      margin-left: 12px;
    }

    .top-bar .social {
      display: flex;
      height: 45px;
      justify-content: flex-end;
    }

    .top-bar .social a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 100%;
      font-size: 16px;
      color: #ffffff;
      border-left: 1px solid rgba(255, 255, 255, .2);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .top-bar .social a:hover {
      background: rgba(255, 255, 255, 0.1);
    }


    /* ================= TOP BAR SOCIAL BRAND COLORS ================= */

    .top-bar .social a[href*="x.com"]:hover {

      color: #000000;
    }

    .top-bar .social a[href*="facebook.com"]:hover {

      color: #1877f2;
    }

    .top-bar .social a[href*="linkedin.com"]:hover {

      color: #0a66c2;
    }

    .top-bar .social a[href*="instagram.com"]:hover {

      color: #e1306c;
      ;
    }

    .top-bar .social a[href*="youtube.com"]:hover {

      color: #ff0000;
    }

    /* Header */
    header {
      background-color: #092a49;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      /* Increased for better logo fit */
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    header .logo img {
      height: 50px;
      width: auto;
      display: block;
    }

    header nav {
      display: flex;
      gap: 30px
    }

    header nav a {
      color: #ffffff !important;
      font-size: 15px;
      font-weight: 500;
      transition: all 0.3s ease;
      text-transform: capitalize;
    }

    header nav a:hover {
      color: #fbcc27 !important;
      text-decoration: none;
    }

    header nav a.active {
      font-weight: 700 !important;
      color: #ffffff !important;
    }

    /* About Us Dropdown */
    .nav-item.about-dropdown {
      position: relative
    }

    .nav-item.about-dropdown .about-menu {
      position: absolute;
      top: 40px;
      left: -30px;
      min-width: 200px;
      background: #092a49;
      border-radius: 4px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.3s ease;
      z-index: 999
    }

    .nav-item.about-dropdown:hover .about-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0)
    }

    .about-menu a {
      display: block;
      padding: 10px 20px;
      font-size: 15px;
      color: #ffffff;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease
    }

    .about-menu a:hover {
      color: #fbcc27;
    }

    /* Floating Support Button */
    .support-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 55px;
      height: 55px;
      background: #092a49;
      color: #fff;
      border-radius: 50%;
      font-size: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
      z-index: 9999;
      transition: all 0.3s ease
    }

    .support-btn:hover {
      background: #092a49;
      text-decoration: none;
      transform: translateY(-3px)
    }

    .support-btn i {
      color: #fff
    }

    @media(max-width:768px) {
      .support-btn {
        width: 48px;
        height: 48px;
        font-size: 22px;
        bottom: 90px;
        right: 15px
      }
    }

    header nav a.active {
      color: #fff !important;
      font-weight: 600
    }

    /* ================= EMPLOYEE LOGIN BUTTON ================= */
    .btn-employee-login {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: linear-gradient(135deg, #fbcc27, #f39c12);
      color: #092a49 !important;
      font-size: 14px;
      font-weight: 700;
      padding: 8px 18px;
      border-radius: 50px;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(251, 204, 39, 0.35);
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-employee-login:hover {
      background: linear-gradient(135deg, #f39c12, #fbcc27);
      color: #092a49 !important;
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(251, 204, 39, 0.5);
      text-decoration: none;
    }

    .btn-employee-login i {
      font-size: 15px;
      color: #092a49 !important;
    }

    @media(max-width:991px) {
      .btn-employee-login {
        margin: 10px 20px;
        width: calc(100% - 40px);
        justify-content: center;
        padding: 12px 20px;
        font-size: 15px;
        border-radius: 8px;
      }
    }

    /* ================= MOBILE NAV ONLY ================= */
    @media(max-width:991px) {
      .top-bar {
        display: none !important
      }

      header {
        padding: 15px 20px;
        height: auto
      }

      header .logo img {
        height: 40px;
        border-radius: 50%;
      }

      .mobile-toggle {
        font-size: 26px;
        color: #fff;
        cursor: pointer;
        display: block
      }

      header nav {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #092a49;
        flex-direction: column;
        gap: 0;
        display: none;
        z-index: 999;
        max-height: 70vh;
        overflow-y: auto
      }

      header nav.active {
        display: flex
      }

      header nav a {
        padding: 14px 20px;
        color: #fff;
        font-size: 16px;
        width: 100%
      }

      /* Services Mobile Scrollable */
      .nav-item.dropdown .dropdown-menu {
        position: static;
        width: 100%;
        background: #0b355a;
        display: none;
        opacity: 1;
        visibility: visible;
        max-height: 70vh;
        overflow-y: auto
      }

      .nav-item.dropdown .dropdown-menu.show {
        display: block
      }

      .dropdown-grid {
        grid-template-columns: 1fr;
        padding: 0
      }

      .dropdown-grid a {
        padding: 12px 30px;
        font-size: 14px;
        color: #fff
      }

      .dropdown-grid a::before {
        content: "&#8250;";
        color: #fff
      }

      /* About Us Mobile Clickable */
      .nav-item.about-dropdown .about-menu {
        position: static;
        background: #0b355a;
        box-shadow: none;
        display: none;
        max-height: 70vh;
        overflow-y: auto
      }

      .nav-item.about-dropdown .about-menu a {
        padding: 12px 30px;
        font-size: 14px;
        color: #fff
      }

      .nav-item.about-dropdown .about-menu a:hover {
        background-color: #0796fe33;
        color: #fff
      }

      .nav-item.about-dropdown.active .about-menu {
        display: block
      }

      .nav-item.about-dropdown {
        padding-bottom: 14px;
        padding-top: 14px;
      }

      .nav-item.dropdown {
        padding-bottom: 14px;
        padding-top: 14px;
      }
    }
  </style>
</head>
<body>
<!-- Top Bar Start -->
<div class="top-bar d-none d-md-block">
<div class="container-fluid">
<div class="row">
<div class="col-md-8">
<div class="top-bar-left">
<div class="text">
<i class="far fa-clock"></i>
<h2>9:30 AM 6:30 PM</h2>
<p> Mon - Fri</p>
</div>
<div class="text">
<i class="fa fa-phone-alt"></i>
<a href="tel:+917794053340">+91 77940 53340</a>
<p>For Quotation</p>
</div>
</div>
</div>
<div class="col-md-4">
<div class="top-bar-right">
<div class="social">
<a href="https://x.com/ygrgobalit2024"><i class="fab fa-x-twitter"></i></a>
<a href="https://www.facebook.com/profile.php?id=61568888033386"><i class="fab fa-facebook-f"></i></a>
<a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/?viewAsMember=true/"><i class="fab fa-linkedin-in"></i></a>
<a href="https://www.instagram.com/ygrgobalitservices/"><i class="fab fa-instagram"></i></a>
<a href="https://www.youtube.com/@rrtalktrends"><i class="fab fa-youtube"></i></a>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Top Bar End -->
<header>
<div class="logo">
<a href="/"><img alt="logo" src="/images/logo1.jpeg"/></a>
</div>
<div class="mobile-toggle d-lg-none" id="mobileToggle">
<i class="fas fa-bars"></i>
</div>
<nav>
<a class="active" href="/">Home</a>
<!-- About Us Dropdown -->
<div class="nav-item about-dropdown">
<a class="active" href="javascript:void(0)" id="aboutToggle">About Us &#9662;</a>
<div class="about-menu">
<a href="/about">Company Overview</a>
<a href="/team">Meet the Team</a>
</div>
</div>
<div class="nav-item about-dropdown" id="servicesDropdown">
<a href="/services?type=web" id="servicesToggle">Services &#9662;</a>
<div class="about-menu">
<a href="/services?type=web">Web Design</a>
<a href="/services?type=webapp">Web Apps</a>
<a href="/services?type=mobile">Mobile Apps</a>
<a href="/services?type=dm">Marketing</a>
<a href="/services?type=uiux">UI / UX</a>
<a href="/services?type=testing">Testing</a>
<a href="/services?type=support">Support</a>
<a href="/services?type=intern">Internships</a>
</div>
</div>
<a class="active" href="/portfolio">Portfolio</a>
<a class="active" href="/careers">Careers</a>
<a class="active" href="/blog">Blog</a>
<a class="active" href="/contact">Contact Us</a>
<div class="nav-item about-dropdown">
<a href="javascript:void(0)" id="demoToggle">Demo For Client &#9662;</a>
<div class="about-menu">
<a href="http://demo.ygrgobalitservices.com/" target="_blank"> Customer Care Vizag</a>
<a href="http://trip.ygrgobalitservices.com/" target="_blank"> Trip</a>
<a href="http://uiux.ygrgobalitservices.com/" target="_blank">CodeLabs</a>
</div>
</div>
<!-- Employee Login Button -->
<a class="btn-employee-login" href="/login" id="employeeLoginBtn" rel="noopener noreferrer" target="_blank">
<i class="fas fa-user-circle"></i>
        Employee Login
      </a>
</nav>
</header>
<a aria-label="Chat on WhatsApp" class="support-btn" href="https://wa.me/917794053340" target="_blank">
<i class="bi bi-headset"></i>
</a>
<script>
    document.addEventListener("DOMContentLoaded", function () {
      const mobileToggle = document.getElementById("mobileToggle");
      const nav = document.querySelector("header nav");
      const aboutToggle = document.getElementById("aboutToggle");
      const aboutMenu = document.querySelector(".nav-item.about-dropdown .about-menu");
      const demoToggle = document.getElementById("demoToggle");
      const demoMenu = demoToggle.parentElement.querySelector(".about-menu");
      const servicesToggle = document.getElementById("servicesToggle");
      const servicesMenu = servicesToggle ? servicesToggle.parentElement.querySelector(".about-menu") : null;

      // Toggle mobile nav
      mobileToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        nav.classList.toggle("active");
      });

      // Toggle About Us
      aboutToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        aboutMenu.parentElement.classList.toggle("active");
      });

      // Toggle Services
      if (servicesToggle) { servicesToggle.addEventListener("click", function (e) { e.stopPropagation(); servicesMenu.parentElement.classList.toggle("active"); }); }

      // Toggle Demo For Client
      demoToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        demoMenu.parentElement.classList.toggle("active");
      });

      // Close everything on outside click
      document.addEventListener("click", function (e) {
        if (!nav.contains(e.target)) {
          nav.classList.remove("active");
          if (aboutMenu) aboutMenu.parentElement.classList.remove("active");
        }
      });

      // --- GOBAL REVEAL ENGINE ---
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      const handleReveals = () => {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));
      };

      handleReveals();
      window.addEventListener('scroll', handleReveals);
    });
  <\/script>
</body>
</html>
<div class="register-offset mesh-gradient">
<div class="container">
<div class="registration-card reveal">
<div class="reg-header">
<img alt="logo" src="/images/logo1.png"/>
<h1>Internship Registration</h1>
<div class="course-badge"></div>
</div>
<form enctype="multipart/form-data" id="registerForm" method="POST" onsubmit="startPayment(); return false;">
<!-- Section 1: Personal -->
<div class="form-section-title">Personal Details</div>
<div class="row">
<div class="col-md-6">
<div class="modern-input-group">
<label class="modern-label">Full Name <span class="required">*</span></label>
<input class="modern-input" name="name" placeholder="e.g. John Doe" required="" type="text"/>
<div class="error-msg" id="error-name"></div>
</div>
</div>
<div class="col-md-6">
<div class="modern-input-group">
<label class="modern-label">Email Address <span class="required">*</span></label>
<input class="modern-input" name="email" placeholder="e.g. john@university.edu" required="" type="email"/>
<div class="error-msg" id="error-email"></div>
</div>
</div>
<div class="col-md-6">
<div class="modern-input-group">
<label class="modern-label">Phone Number <span class="required">*</span></label>
<input class="modern-input" name="phone" placeholder="e.g. 9876543210" required="" type="number"/>
<div class="error-msg" id="error-phone"></div>
</div>
</div>
<div class="col-md-6">
<div class="modern-input-group">
<label class="modern-label">WhatsApp Number</label>
<input class="modern-input" name="wphone" placeholder="e.g. 9876543210" type="number"/>
</div>
</div>
</div>
<!-- Section 2: Academic -->
<div class="form-section-title mt-4">Academic Background</div>
<div class="row">
<div class="col-12">
<div class="modern-input-group">
<label class="modern-label">College Name <span class="required">*</span></label>
<input class="modern-input" name="clg_name" placeholder="Full name of your institution" required="" type="text"/>
</div>
</div>
<div class="col-md-6">
<div class="modern-input-group">
<label class="modern-label">Roll Number <span class="required">*</span></label>
<input class="modern-input" name="roll_no" placeholder="Academic ID" required="" type="text"/>
</div>
</div>
<div class="col-md-6">
<div class="modern-input-group">
<label class="modern-label">Branch / Stream <span class="required">*</span></label>
<input class="modern-input" name="branch" placeholder="e.g. CSE, ECE" required="" type="text"/>
</div>
</div>
</div>
<!-- Section 3: Documents -->
<div class="form-section-title mt-4">Required Documents</div>
<div class="row">
<div class="col-md-6">
<div class="modern-input-group">
<label class="modern-label">Upload Photo</label>
<div class="file-upload-wrapper">
<input accept="image/*" name="photo" type="file"/>
<div class="file-upload-text">
<i class="fas fa-camera"></i>
                                        Click or drag image
                                    </div>
</div>
</div>
</div>
<div class="col-md-6">
<div class="modern-input-group">
<label class="modern-label">Upload Resume <span class="required">*</span></label>
<div class="file-upload-wrapper">
<input name="resume" required="" type="file"/>
<div class="file-upload-text">
<i class="fas fa-file-pdf"></i>
                                        Upload PDF Resume
                                    </div>
</div>
</div>
</div>
</div>
<button class="pay-btn" type="submit">Pay â‚¹299.00 &amp; Initialize Registration</button>
</form>
<div class="login-footer">
                    Already a member? <a href="">Login to Dashboard</a>
</div>
</div>
</div>
</div>
<style>
/* ================= GOBAL FOOTER TYPOGRAPHY (MATCH SERVICES PAGE) ================= */
.footer,
.footer p,
.footer a,
.footer h2,
.mobile-footer,
.mobile-footer a {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400;
}

/* ================= DESKTOP FOOTER ================= */
.footer {
    position: relative;
    margin-top: 45px;
    padding-top: 10px;
    background: #092a49;
}

.container {
    max-width: 90%;
    padding: 0 20px;
    margin: 0 auto;
}

.footer .logo {
    height: 100px;
    width: auto;
    display: block;
    padding-bottom: 10px;
}

.footer-row {
    display: flex;
    justify-content: flex-start;
    gap: 80px;
}

/* SECTION WRAPPERS */
.footer-contact,
.footer-link,
.footer-newsletter {
    flex: 1;
    max-width: 25%;
    color: #ffffff;
    margin-bottom: 45px;
}

/* HEADINGS */
.footer .footer-contact h2,
.footer .footer-link h2,
.footer .footer-newsletter h2 {
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.5px;
    margin-bottom: 20px;
    padding-bottom: 8px;
    position: relative;
}

.footer .footer-contact h2::after,
.footer .footer-link h2::after,
.footer .footer-newsletter h2::after {
    content: "";
    position: absolute;
    width: 45px;
    height: 2px;
    bottom: 0;
    left: 0;
    background: #fbcc27;
}

/* TEXT & LINKS */
.footer p {
    color: #e6e6e6;
    margin-bottom: 12px;
}

.footer a {
    color: #e6e6e6;
    text-decoration: none;
    transition: 0.3s;
}

.footer a:hover {
    color: #fbcc27;
}

/* QUICK LINKS */
.footer .footer-link a {
    display: block;
    margin-bottom: 10px;
}

.footer .footer-link a::before {
    content: "\f105";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    margin-right: 10px;
}

/* CONTACT ICONS */
.footer-contact p i {
    width: 25px;
    font-size: 16px;
}

.fa-phone-alt {
    transform: rotate(90deg);
}

/* SOCIAL ICONS */
.footer-social {
    margin-top: 20px;
}

.footer-social a i {
    margin-right: 15px;
    font-size: 18px;
    color: #f0f2f3;
    transition: 0.3s;
}

.footer-social a:hover i {
    color: #fbcc27;
}

/* COPYRIGHT */
.footer .copyright {
    padding: 0 30px;
}
.footer .copyright .row {
    padding: 25px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.footer .copyright p {
    margin: 0;
    color: #999999;
}
.footer .copyright p a {
    color: #ffffff;
}
.footer .copyright p a:hover {
    color: #fbcc27;
}
/* ================= SOCIAL MEDIA BRAND HOVER COLORS ================= */
 
.footer-social a[href*="x.com"]:hover i {
    color: #000000;
}
 
.footer-social a[href*="facebook.com"]:hover i {
    color: #1877f2;
}
 
.footer-social a[href*="linkedin.com"]:hover i {
    color: #0a66c2;
}
 
.footer-social a[href*="instagram.com"]:hover i {
    color: #e1306c;
}
 
.footer-social a[href*="youtube.com"]:hover i {
    color: #ff0000;
}

/* ================= MOBILE VISIBILITY ================= */
@media (max-width: 767px) {
    .footer {
        display: none;
    }
}

/* ================= MOBILE FOOTER ================= */
.mobile-footer {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #092a49;
    border-top: 1px solid #fbcc27;
    justify-content: space-around;
    padding: 10px 0;
    z-index: 999;
}

.mobile-footer a {
    text-align: center;
    flex: 1;
    color: #ffffff;
    font-size: 14px;
    text-decoration: none;
    font-weight: 400;
}

.mobile-footer i {
    display: block;
    font-size: 20px;
    margin-bottom: 3px;
}

@media (max-width: 767px) {
    .mobile-footer {
        display: flex;
    }
}
</style>

<!-- ================= DESKTOP FOOTER HTML ================= -->

<div class="footer">
<div class="container">
<a href="/">
<img alt="YGR Gobal IT Services" class="logo" src="/images/logo1.jpeg"/>
</a>
<div class="footer-row">
<!-- CONTACT -->
<div class="footer-contact">
<h2>Our Head Office</h2>
<p><i class="fa fa-map-marker-alt"></i>
                    Manjeera Trinity Corporate,
                    Next to Lulu Mall, Kukatpally Housing Board Colony,
                    Hyderabad, Telangana 500072
                </p>
<p><i class="fa fa-phone"></i>
<a href="tel:+917794053340">+91 77940 53340</a>
</p>
<p><i class="fa fa-envelope"></i>
<a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a>
</p>
<div class="footer-social">
<a href="https://x.com/ygrgobalit2024"><i class="fab fa-x-twitter"></i></a>
<a href="https://www.facebook.com/profile.php?id=61568888033386"><i class="fab fa-facebook-f"></i></a>
<a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/"><i class="fab fa-linkedin-in"></i></a>
<a href="https://www.instagram.com/ygrgobalitservices/"><i class="fab fa-instagram"></i></a>
<a href="https://www.youtube.com/@rrtalktrends"><i class="fab fa-youtube"></i></a>
</div>
</div>
<!-- QUICK LINKS -->
<div class="footer-link">
<h2>Quick Links</h2>
<a href="/terms">Terms of Use</a>
<a href="/privacy">Privacy Policy</a>
<a href="/cookies">Cookies</a>
<a href="/help">Help</a>
<a href="/faqs">FAQs</a>
<a href="/refund">Refund Policy</a>
<a href="/shipping">Shipping</a>
</div>
<!-- NAVIGATION -->
<div class="footer-link">
<h2>Navigation</h2>
<a href="/">Home</a>
<a href="/about">About Us</a>
<a href="/portfolio">Portfolio</a>
<a href="/careers">Careers</a>
<a href="/blog">Blog</a>
<a href="/contact">Contact Us</a>
</div>
<!-- ABOUT -->
<div class="footer-newsletter">
<h2>YGR IT SERVICES</h2>
<p>
                    YGR Gobal IT Services Pvt. Ltd. provides complete IT solutions including software,
                    web &amp; mobile app development, digital marketing, professional IT training,
                    internships, and full stack courses.
                    <br/>
<a href="/about" style="color:#fbcc27;">Read more</a>
</p>
</div>
</div>
<!-- COPYRIGHT -->
<div class="container copyright" style="margin-top: 40px;">
<div class="row">
<div class="col-md-6">
<p>
                        &copy; <a href="https://ygrgobalitservices.com">YGR Gobal IT Services</a>. All Rights Reserved.
                    </p>
</div>
<div class="col-md-6 text-right">
<p>
                        Designed by <a href="https://ygrgobalitservices.com">YGR Gobal IT Services Pvt. Ltd, 2023.</a>
</p>
</div>
</div>
</div>
</div>
</div>
 ================= MOBILE FOOTER ================= 
<div class="mobile-footer">
<a href="/">
<i class="fa fa-home"></i>
</a>
<a href="/blog">
<i class="fa fa-blog"></i>
</a>
<a href="#">
<i class="fa fa-search"></i>
</a>
<a href="/careers">
<i class="fa fa-file-alt"></i>
</a>
<a href="#">
<i class="fa fa-shopping-cart"></i>
</a>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"><\/script>
<script>
        // Reveal Logic
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let cookie of cookies) {
                    cookie = cookie.trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        function startPayment() {
            const form = document.getElementById("registerForm");
            const formData = new FormData(form);
            const courseId = ${n||`null`};

            document.querySelectorAll(".error-msg").forEach(e => e.textContent = "");

            fetch(\`/register/\${courseId}/\`, {
                method: "POST",
                body: formData,
                headers: {"X-CSRFToken": getCookie("csrftoken")}
            })
            .then(res => res.json().then(data => ({status: res.status, body: data})))
            .then(res => {
                if (res.status === 400 && res.body.errors) {
                    for (const field in res.body.errors) {
                        const errorDiv = document.getElementById(\`error-\${field}\`);
                        if (errorDiv) errorDiv.textContent = res.body.errors[field];
                    }
                    alert("Please correct the errors in the form.");
                } else if (res.body.status === "registered") {
                    fetch("/api/create-order/", {
                        method: "POST",
                        headers: {"X-CSRFToken": getCookie("csrftoken")}
                    })
                    .then(r => r.json())
                    .then(order => {
                        const options = {
                            key: order.key,
                            amount: order.amount,
                            currency: "INR",
                            order_id: order.order_id,
                            name: "Internship Registration",
                            prefill: {
                                name: formData.get("name"),
                                email: formData.get("email"),
                                contact: formData.get("phone")
                            },
                            handler: function(response) {
                                fetch("/api/verify-payment/", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie("csrftoken") },
                                    body: JSON.stringify(response)
                                })
                                .then(r => r.json())
                                .then(result => {
                                    if (result.status === "success") {
                                        window.location.href = "/payment-success/";
                                    } else {
                                        alert("Payment verification failed");
                                    }
                                });
                            },
                            modal: {
                                ondismiss: function() {
                                    fetch("/api/delete-pending-user/", { method: "POST", headers: {"X-CSRFToken": getCookie("csrftoken")} });
                                    alert("Payment cancelled.");
                                }
                            }
                        };
                        new Razorpay(options).open();
                    });
                }
            })
            .catch(err => {
                console.error(err);
                alert("Something went wrong. Please try again!");
            });
        }
    <\/script>
`}})},Ss=()=>(window.location.href=`http://13.201.218.175:8000/admin`,null),Cs=(0,x.lazy)(()=>w(()=>import(`./Login-Jl5mFKx5.js`),[])),ws=(0,x.lazy)(()=>w(()=>import(`./EmployeeDashboard-DQbkaJ5B.js`),[])),Ts=(0,x.lazy)(()=>w(()=>import(`./HRDashboard-DySU_TpJ.js`),__vite__mapDeps([0,1]))),Es=(0,x.lazy)(()=>w(()=>import(`./Employees-DhP7IhDt.js`),[])),Ds=(0,x.lazy)(()=>w(()=>import(`./ManagerDashboard-BSIziHEl.js`),__vite__mapDeps([2,1]))),Os=(0,x.lazy)(()=>w(()=>import(`./TLDashboard-DAhlxsLx.js`),__vite__mapDeps([3,1]))),ks=(0,x.lazy)(()=>w(()=>import(`./MDDashboard-B38-EiHa.js`),__vite__mapDeps([4,1]))),As=(0,x.lazy)(()=>w(()=>import(`./Profile-D9uB3FcI.js`),[])),js=(0,x.lazy)(()=>w(()=>import(`./Attendance-G29TpsOR.js`),[])),Ms=(0,x.lazy)(()=>w(()=>import(`./Payslips-DgjG4njE.js`),[])),Ns=(0,x.lazy)(()=>w(()=>import(`./Payroll-Cb3WoV2a.js`),[])),Ps=(0,x.lazy)(()=>w(()=>import(`./HolidayCalendar-BSG4JF1B.js`),[])),Fs=(0,x.lazy)(()=>w(()=>import(`./Leave-DBtgsS6W.js`),[])),Is=(0,x.lazy)(()=>w(()=>import(`./Messages-B7_UWTNc.js`),[])),Ls=(0,x.lazy)(()=>w(()=>import(`./Tasks-DityFC1I.js`),[])),Rs=(0,x.lazy)(()=>w(()=>import(`./Projects-CNExa0Sh.js`),[])),zs=(0,x.lazy)(()=>w(()=>import(`./Settings-D8WbHwQQ.js`),[])),Bs=(0,x.lazy)(()=>w(()=>import(`./Calls-205nrux5.js`),[])),Vs=(0,x.lazy)(()=>w(()=>import(`./Invoices-jkOE_FUt.js`),[])),Hs=(0,x.lazy)(()=>w(()=>import(`./Exams-Bj2DP8cD.js`),[])),Us=(0,x.lazy)(()=>w(()=>import(`./Register-vhBjFyhg.js`),[])),Ws=(0,x.lazy)(()=>w(()=>import(`./ClientCreate-BEWzDwDw.js`),[])),Gs=(0,x.lazy)(()=>w(()=>import(`./ServiceCreate-Cmh96EEY.js`),[])),Ks=(0,x.lazy)(()=>w(()=>import(`./InvoiceCreate-C-2Y-C0_.js`),[])),qs=(0,x.lazy)(()=>w(()=>import(`./SalaryStructures-DjvX10U-.js`),[])),Js=()=>{let{user:e}=Eo();return e?(0,b.jsx)(qt,{to:{Employee:`/employee-dashboard`,TeamLead:`/tl-dashboard`,Manager:`/manager-dashboard`,HR:`/hr-dashboard`,MD:`/md-dashboard`}[e.role]||`/login`,replace:!0}):(0,b.jsx)(qt,{to:`/login`,replace:!0})};function Ys(){return(0,b.jsx)(To,{children:(0,b.jsx)(Rn,{children:(0,b.jsx)(x.Suspense,{fallback:(0,b.jsx)(Lo,{message:`Loading portal dashboard...`}),children:(0,b.jsxs)(Xt,{children:[(0,b.jsxs)(M,{element:(0,b.jsx)(Vo,{}),children:[(0,b.jsx)(M,{path:`/`,element:(0,b.jsx)(ss,{})}),(0,b.jsx)(M,{path:`/about`,element:(0,b.jsx)(cs,{})}),(0,b.jsx)(M,{path:`/services`,element:(0,b.jsx)(ls,{})}),(0,b.jsx)(M,{path:`/portfolio`,element:(0,b.jsx)(us,{})}),(0,b.jsx)(M,{path:`/careers`,element:(0,b.jsx)(ds,{})}),(0,b.jsx)(M,{path:`/blog`,element:(0,b.jsx)(fs,{})}),(0,b.jsx)(M,{path:`/blog/:id`,element:(0,b.jsx)(ps,{})}),(0,b.jsx)(M,{path:`/contact`,element:(0,b.jsx)(ms,{})}),(0,b.jsx)(M,{path:`/client-registration`,element:(0,b.jsx)(_s,{})}),(0,b.jsx)(M,{path:`/team`,element:(0,b.jsx)(hs,{})}),(0,b.jsx)(M,{path:`/global-internships`,element:(0,b.jsx)(gs,{})}),(0,b.jsx)(M,{path:`/internships`,element:(0,b.jsx)(qt,{to:`/global-internships`,replace:!0})})]}),(0,b.jsxs)(M,{element:(0,b.jsx)(Vo,{hideHeaderFooter:!0}),children:[(0,b.jsx)(M,{path:`/vacancies`,element:(0,b.jsx)(vs,{})}),(0,b.jsx)(M,{path:`/legacy/exampages/internship_list`,element:(0,b.jsx)(qt,{to:`/global-internships`,replace:!0})}),(0,b.jsx)(M,{path:`/legacy/exampages/job_application`,element:(0,b.jsx)(ys,{})}),(0,b.jsx)(M,{path:`/legacy/exampages/job_applicant_login`,element:(0,b.jsx)(bs,{})}),(0,b.jsx)(M,{path:`/register-internship`,element:(0,b.jsx)(xs,{})}),(0,b.jsx)(M,{path:`/legacy/exampages/register`,element:(0,b.jsx)(qt,{to:`/register-internship`,replace:!0})})]}),(0,b.jsx)(M,{path:`/admin/*`,element:(0,b.jsx)(Ss,{})}),(0,b.jsx)(M,{path:`/admin`,element:(0,b.jsx)(Ss,{})}),(0,b.jsx)(M,{path:`/login`,element:(0,b.jsx)(Cs,{})}),(0,b.jsxs)(M,{element:(0,b.jsx)(Do,{children:(0,b.jsx)(Io,{})}),children:[(0,b.jsx)(M,{path:`/portal`,element:(0,b.jsx)(Js,{})}),(0,b.jsx)(M,{path:`employee-dashboard`,element:(0,b.jsx)(Do,{allowedRoles:[`Employee`],children:(0,b.jsx)(ws,{})})}),(0,b.jsx)(M,{path:`hr-dashboard`,element:(0,b.jsx)(Do,{allowedRoles:[`HR`],children:(0,b.jsx)(Ts,{})})}),(0,b.jsx)(M,{path:`manager-dashboard`,element:(0,b.jsx)(Do,{allowedRoles:[`Manager`],children:(0,b.jsx)(Ds,{})})}),(0,b.jsx)(M,{path:`tl-dashboard`,element:(0,b.jsx)(Do,{allowedRoles:[`TeamLead`],children:(0,b.jsx)(Os,{})})}),(0,b.jsx)(M,{path:`md-dashboard`,element:(0,b.jsx)(Do,{allowedRoles:[`MD`],children:(0,b.jsx)(ks,{})})}),(0,b.jsx)(M,{path:`profile`,element:(0,b.jsx)(As,{})}),(0,b.jsx)(M,{path:`profile/edit`,element:(0,b.jsx)(As,{})}),(0,b.jsx)(M,{path:`attendance`,element:(0,b.jsx)(js,{})}),(0,b.jsx)(M,{path:`payslips`,element:(0,b.jsx)(Ms,{})}),(0,b.jsx)(M,{path:`payroll`,element:(0,b.jsx)(Ns,{})}),(0,b.jsx)(M,{path:`holidays`,element:(0,b.jsx)(Ps,{})}),(0,b.jsx)(M,{path:`holiday-approvals`,element:(0,b.jsx)(Ps,{})}),(0,b.jsx)(M,{path:`leaves`,element:(0,b.jsx)(Fs,{})}),(0,b.jsx)(M,{path:`messages`,element:(0,b.jsx)(Is,{})}),(0,b.jsx)(M,{path:`tasks`,element:(0,b.jsx)(Ls,{})}),(0,b.jsx)(M,{path:`settings`,element:(0,b.jsx)(zs,{})}),(0,b.jsx)(M,{path:`calls`,element:(0,b.jsx)(Bs,{})}),(0,b.jsx)(M,{path:`invoices`,element:(0,b.jsx)(Vs,{})}),(0,b.jsx)(M,{path:`exams`,element:(0,b.jsx)(Hs,{})}),(0,b.jsx)(M,{path:`register`,element:(0,b.jsx)(Us,{})}),(0,b.jsx)(M,{path:`hr-list`,element:(0,b.jsx)(Es,{})}),(0,b.jsx)(M,{path:`manager-list`,element:(0,b.jsx)(Es,{})}),(0,b.jsx)(M,{path:`tl-list`,element:(0,b.jsx)(Es,{})}),(0,b.jsx)(M,{path:`employee-list`,element:(0,b.jsx)(Es,{})}),(0,b.jsx)(M,{path:`employees`,element:(0,b.jsx)(Es,{})}),(0,b.jsx)(M,{path:`all-member`,element:(0,b.jsx)(ks,{})}),(0,b.jsx)(M,{path:`leave-dashboard`,element:(0,b.jsx)(Fs,{})}),(0,b.jsx)(M,{path:`apply-leave`,element:(0,b.jsx)(Fs,{})}),(0,b.jsx)(M,{path:`leave-status`,element:(0,b.jsx)(Fs,{})}),(0,b.jsx)(M,{path:`all-leaves`,element:(0,b.jsx)(Fs,{})}),(0,b.jsx)(M,{path:`hr-approved-leaves`,element:(0,b.jsx)(Fs,{})}),(0,b.jsx)(M,{path:`manager-approved-leaves`,element:(0,b.jsx)(Fs,{})}),(0,b.jsx)(M,{path:`tl-approved-leaves`,element:(0,b.jsx)(Fs,{})}),(0,b.jsx)(M,{path:`leave-requests`,element:(0,b.jsx)(Fs,{})}),(0,b.jsx)(M,{path:`project-dashboard`,element:(0,b.jsx)(Rs,{})}),(0,b.jsx)(M,{path:`projects`,element:(0,b.jsx)(Rs,{})}),(0,b.jsx)(M,{path:`projects/:id`,element:(0,b.jsx)(Rs,{})}),(0,b.jsx)(M,{path:`assign-task`,element:(0,b.jsx)(Ls,{})}),(0,b.jsx)(M,{path:`assign-project`,element:(0,b.jsx)(Rs,{})}),(0,b.jsx)(M,{path:`reports-submit`,element:(0,b.jsx)(Ls,{})}),(0,b.jsx)(M,{path:`reports-list`,element:(0,b.jsx)(Ls,{})}),(0,b.jsx)(M,{path:`attendance-list`,element:(0,b.jsx)(js,{})}),(0,b.jsx)(M,{path:`monthly-attendance`,element:(0,b.jsx)(js,{})}),(0,b.jsx)(M,{path:`attendance-approvals`,element:(0,b.jsx)(js,{})}),(0,b.jsx)(M,{path:`attendance-correct`,element:(0,b.jsx)(js,{})}),(0,b.jsx)(M,{path:`attendance-correct-bulk`,element:(0,b.jsx)(js,{})}),(0,b.jsx)(M,{path:`finance/invoices`,element:(0,b.jsx)(Vs,{})}),(0,b.jsx)(M,{path:`finance/clients/new`,element:(0,b.jsx)(Ws,{})}),(0,b.jsx)(M,{path:`finance/services/new`,element:(0,b.jsx)(Gs,{})}),(0,b.jsx)(M,{path:`finance/invoices/create`,element:(0,b.jsx)(Ks,{})}),(0,b.jsx)(M,{path:`finance/salary-structures`,element:(0,b.jsx)(qs,{})}),(0,b.jsx)(M,{path:`finance/payroll`,element:(0,b.jsx)(Ms,{})}),(0,b.jsx)(M,{path:`client-create`,element:(0,b.jsx)(Ws,{})}),(0,b.jsx)(M,{path:`service-create`,element:(0,b.jsx)(Gs,{})}),(0,b.jsx)(M,{path:`invoice-create`,element:(0,b.jsx)(Ks,{})}),(0,b.jsx)(M,{path:`salary-structures`,element:(0,b.jsx)(qs,{})}),(0,b.jsx)(M,{path:`payslips-list`,element:(0,b.jsx)(Ms,{})}),(0,b.jsx)(M,{path:`questions`,element:(0,b.jsx)(Hs,{})})]}),(0,b.jsx)(M,{path:`*`,element:(0,b.jsx)(qt,{to:`/`,replace:!0})})]})})})})}var Xs=(0,x.createContext)(null),Zs=({children:e})=>{let[t,n]=(0,x.useState)({isOpen:!1,type:`confirm`,message:``,defaultValue:``,inputValue:``,resolveRef:null}),r=e=>new Promise(t=>{n({isOpen:!0,type:`confirm`,message:e,defaultValue:``,inputValue:``,resolveRef:t})}),i=(e,t=``)=>new Promise(r=>{n({isOpen:!0,type:`prompt`,message:e,defaultValue:t,inputValue:t,resolveRef:r})}),a=e=>{t.resolveRef&&t.resolveRef(e),n({isOpen:!1,type:`confirm`,message:``,defaultValue:``,inputValue:``,resolveRef:null})};return(0,b.jsxs)(Xs.Provider,{value:{confirm:r,prompt:i},children:[e,t.isOpen&&(0,b.jsx)(`div`,{className:`attendance-modal-overlay`,children:(0,b.jsxs)(`div`,{className:`attendance-modal`,style:{maxWidth:`400px`},children:[(0,b.jsxs)(`div`,{className:`attendance-modal-header`,children:[(0,b.jsx)(`h3`,{children:t.type===`confirm`?`Confirmation Required`:`Input Needed`}),(0,b.jsx)(`button`,{className:`attendance-modal-close`,onClick:()=>a(null),children:`×`})]}),(0,b.jsxs)(`div`,{className:`attendance-modal-body`,style:{padding:`20px`},children:[(0,b.jsx)(`p`,{style:{margin:`0 0 16px 0`,color:`var(--text-primary)`,fontSize:`0.95rem`,lineHeight:`1.5`},children:t.message}),t.type===`prompt`&&(0,b.jsx)(`input`,{type:`text`,value:t.inputValue,onChange:e=>n(t=>({...t,inputValue:e.target.value})),style:{width:`100%`,padding:`10px 14px`,borderRadius:`8px`,border:`1px solid var(--border)`,outline:`none`,fontSize:`0.9rem`,background:`var(--bg-surface)`,color:`var(--text-primary)`,boxSizing:`border-box`},autoFocus:!0,onKeyDown:e=>{e.key===`Enter`&&a(t.inputValue)}})]}),(0,b.jsxs)(`div`,{className:`attendance-modal-footer`,style:{padding:`12px 20px`},children:[(0,b.jsx)(`button`,{type:`button`,className:`modal-btn modal-btn-secondary`,onClick:()=>a(t.type===`confirm`?!1:null),children:`Cancel`}),(0,b.jsx)(`button`,{type:`button`,className:`modal-btn modal-btn-primary`,style:{background:t.type===`confirm`?`var(--accent-blue)`:`var(--success)`},onClick:()=>a(t.type===`confirm`?!0:t.inputValue),children:t.type===`confirm`?`Confirm`:`Submit`})]})]})})]})},Qs=()=>{let e=(0,x.useContext)(Xs);if(!e)throw Error(`useDialog must be used within a DialogProvider`);return e},$s=document.addEventListener;document.addEventListener=function(e,t,n){e===`DOMContentLoaded`&&(document.readyState===`complete`||document.readyState===`interactive`)?setTimeout(t,0):$s.call(document,e,t,n)},(0,ee.createRoot)(document.getElementById(`root`)).render((0,b.jsx)(x.StrictMode,{children:(0,b.jsx)(ko,{children:(0,b.jsx)(No,{children:(0,b.jsx)(Zs,{children:(0,b.jsx)(Ys,{})})})})}));export{So as a,_t as c,d,l as f,Co as i,bt as l,Po as n,W as o,Eo as r,N as s,Qs as t,p as u};