"use strict";(()=>{var rn="computed",Ie={type:1,name:rn,keyReq:1,valReq:1,onLoad:({key:t,signals:e,genRX:n})=>{let r=n();e.setComputed(t,r)}};var O=t=>t.trim()==="true",$=t=>t.replace(/[A-Z]+(?![a-z])|[A-Z]/g,(e,n)=>(n?"-":"")+e.toLowerCase()),ke=t=>t.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,n){return n==0?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,""),ne=t=>new Function(`return Object.assign({}, ${t})`)();var Le={type:1,name:"signals",valReq:1,removeOnLoad:!0,onLoad:t=>{let{key:e,genRX:n,signals:r}=t;if(e!="")r.setValue(e,n()());else{let i=ne(t.value);t.value=JSON.stringify(i),r.merge(n()())}}};var Ce={type:1,name:"star",keyReq:2,valReq:2,onLoad:()=>{alert("YOU ARE PROBABLY OVERCOMPLICATING IT")}};var De={name:"signalValue",type:0,fn:t=>{let e=/(?<path>[\w0-9.]*)((\.value))/gm;return t.replaceAll(e,"ctx.signals.signal('$1').value")}};var L="datastar";var Ve="Datastar-Request",Oe="0.21.1";var Fe="type module";var C={Morph:"morph",Inner:"inner",Outer:"outer",Prepend:"prepend",Append:"append",Before:"before",After:"after",UpsertAttributes:"upsertAttributes"},He=C.Morph,I={MergeFragments:"datastar-merge-fragments",MergeSignals:"datastar-merge-signals",RemoveFragments:"datastar-remove-fragments",RemoveSignals:"datastar-remove-signals",ExecuteScript:"datastar-execute-script"};function qe(t){if(t.id)return t.id;let e=0,n=i=>(e=(e<<5)-e+i,e&e),r=i=>i.split("").forEach(s=>n(s.charCodeAt(0)));for(;t.parentNode;){if(t.id){r(`${t.id}`);break}else if(t===t.ownerDocument.documentElement)r(t.tagName);else{for(let i=1,s=t;s.previousElementSibling;s=s.previousElementSibling,i++)n(i);t=t.parentNode}t=t.parentNode}return L+e}function We(t,e){let n=new MutationObserver(r=>{for(let i of r)for(let s of i.removedNodes)if(s===t){n.disconnect(),e();return}});n.observe(t.parentNode,{childList:!0})}var sn="https://data-star.dev/errors";var c=(t,e)=>{let n=new Error;t=t.charAt(0).toUpperCase()+t.slice(1),n.name=`error ${t}`;let r=`${sn}/${t}?${new URLSearchParams(e)}`;return n.message=`for more info see ${r}`,n};var on=Symbol.for("preact-signals"),D=1,B=2,X=4,j=8,re=16,G=32;function ye(){ie++}function Ee(){if(ie>1){ie--;return}let t,e=!1;for(;z!==void 0;){let n=z;for(z=void 0,be++;n!==void 0;){let r=n._nextBatchedEffect;if(n._nextBatchedEffect=void 0,n._flags&=~B,!(n._flags&j)&&$e(n))try{n._callback()}catch(i){e||(t=i,e=!0)}n=r}}if(be=0,ie--,e)throw c("BatchError, error",{error:t})}var E;var z,ie=0,be=0,se=0;function Ue(t){if(E===void 0)return;let e=t._node;if(e===void 0||e._target!==E)return e={_version:0,_source:t,_prevSource:E._sources,_nextSource:void 0,_target:E,_prevTarget:void 0,_nextTarget:void 0,_rollbackNode:e},E._sources!==void 0&&(E._sources._nextSource=e),E._sources=e,t._node=e,E._flags&G&&t._subscribe(e),e;if(e._version===-1)return e._version=0,e._nextSource!==void 0&&(e._nextSource._prevSource=e._prevSource,e._prevSource!==void 0&&(e._prevSource._nextSource=e._nextSource),e._prevSource=E._sources,e._nextSource=void 0,E._sources._nextSource=e,E._sources=e),e}function N(t){this._value=t,this._version=0,this._node=void 0,this._targets=void 0}N.prototype.brand=on;N.prototype._refresh=function(){return!0};N.prototype._subscribe=function(t){this._targets!==t&&t._prevTarget===void 0&&(t._nextTarget=this._targets,this._targets!==void 0&&(this._targets._prevTarget=t),this._targets=t)};N.prototype._unsubscribe=function(t){if(this._targets!==void 0){let e=t._prevTarget,n=t._nextTarget;e!==void 0&&(e._nextTarget=n,t._prevTarget=void 0),n!==void 0&&(n._prevTarget=e,t._nextTarget=void 0),t===this._targets&&(this._targets=n)}};N.prototype.subscribe=function(t){return oe(()=>{let e=this.value,n=E;E=void 0;try{t(e)}finally{E=n}})};N.prototype.valueOf=function(){return this.value};N.prototype.toString=function(){return this.value+""};N.prototype.toJSON=function(){return this.value};N.prototype.peek=function(){let t=E;E=void 0;try{return this.value}finally{E=t}};Object.defineProperty(N.prototype,"value",{get(){let t=Ue(this);return t!==void 0&&(t._version=this._version),this._value},set(t){if(t!==this._value){if(be>100)throw c("SignalCycleDetected");this._value=t,this._version++,se++,ye();try{for(let e=this._targets;e!==void 0;e=e._nextTarget)e._target._notify()}finally{Ee()}}}});function $e(t){for(let e=t._sources;e!==void 0;e=e._nextSource)if(e._source._version!==e._version||!e._source._refresh()||e._source._version!==e._version)return!0;return!1}function Be(t){for(let e=t._sources;e!==void 0;e=e._nextSource){let n=e._source._node;if(n!==void 0&&(e._rollbackNode=n),e._source._node=e,e._version=-1,e._nextSource===void 0){t._sources=e;break}}}function Ge(t){let e=t._sources,n;for(;e!==void 0;){let r=e._prevSource;e._version===-1?(e._source._unsubscribe(e),r!==void 0&&(r._nextSource=e._nextSource),e._nextSource!==void 0&&(e._nextSource._prevSource=r)):n=e,e._source._node=e._rollbackNode,e._rollbackNode!==void 0&&(e._rollbackNode=void 0),e=r}t._sources=n}function q(t){N.call(this,void 0),this._fn=t,this._sources=void 0,this._globalVersion=se-1,this._flags=X}q.prototype=new N;q.prototype._refresh=function(){if(this._flags&=~B,this._flags&D)return!1;if((this._flags&(X|G))===G||(this._flags&=~X,this._globalVersion===se))return!0;if(this._globalVersion=se,this._flags|=D,this._version>0&&!$e(this))return this._flags&=~D,!0;let t=E;try{Be(this),E=this;let e=this._fn();(this._flags&re||this._value!==e||this._version===0)&&(this._value=e,this._flags&=~re,this._version++)}catch(e){this._value=e,this._flags|=re,this._version++}return E=t,Ge(this),this._flags&=~D,!0};q.prototype._subscribe=function(t){if(this._targets===void 0){this._flags|=X|G;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._subscribe(e)}N.prototype._subscribe.call(this,t)};q.prototype._unsubscribe=function(t){if(this._targets!==void 0&&(N.prototype._unsubscribe.call(this,t),this._targets===void 0)){this._flags&=~G;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e)}};q.prototype._notify=function(){if(!(this._flags&B)){this._flags|=X|B;for(let t=this._targets;t!==void 0;t=t._nextTarget)t._target._notify()}};Object.defineProperty(q.prototype,"value",{get(){if(this._flags&D)throw c("SignalCycleDetected");let t=Ue(this);if(this._refresh(),t!==void 0&&(t._version=this._version),this._flags&re)throw c("GetComputedError",{value:this._value});return this._value}});function je(t){return new q(t)}function Ke(t){let e=t._cleanup;if(t._cleanup=void 0,typeof e=="function"){ye();let n=E;E=void 0;try{e()}catch(r){throw t._flags&=~D,t._flags|=j,Se(t),c("CleanupEffectError",{error:r})}finally{E=n,Ee()}}}function Se(t){for(let e=t._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e);t._fn=void 0,t._sources=void 0,Ke(t)}function an(t){if(E!==this)throw c("EndEffectError");Ge(this),E=t,this._flags&=~D,this._flags&j&&Se(this),Ee()}function Y(t){this._fn=t,this._cleanup=void 0,this._sources=void 0,this._nextBatchedEffect=void 0,this._flags=G}Y.prototype._callback=function(){let t=this._start();try{if(this._flags&j||this._fn===void 0)return;let e=this._fn();typeof e=="function"&&(this._cleanup=e)}finally{t()}};Y.prototype._start=function(){if(this._flags&D)throw c("SignalCycleDetected");this._flags|=D,this._flags&=~j,Ke(this),Be(this),ye();let t=E;return E=this,an.bind(this,t)};Y.prototype._notify=function(){this._flags&B||(this._flags|=B,this._nextBatchedEffect=z,z=this)};Y.prototype._dispose=function(){this._flags|=j,this._flags&D||Se(this)};function oe(t){let e=new Y(t);try{e._callback()}catch(n){throw e._dispose(),c("EffectError",{error:n})}return e._dispose.bind(e)}function Je(t,e=!1){let n={};for(let r in t)if(t.hasOwnProperty(r)){let i=t[r];if(i instanceof N){if(e&&r.startsWith("_"))continue;n[r]=i.value}else n[r]=Je(i)}return n}function ze(t,e,n=!1){for(let r in e)if(e.hasOwnProperty(r)){if(r.match(/\_\_+/))throw c("InvalidSignalKey",{key:r});let i=e[r];if(i instanceof Object&&!Array.isArray(i))t[r]||(t[r]={}),ze(t[r],i,n);else{if(n&&t[r])continue;t[r]=new N(i)}}}function Xe(t,e){for(let n in t)if(t.hasOwnProperty(n)){let r=t[n];r instanceof N?e(n,r):Xe(r,(i,s)=>{e(`${n}.${i}`,s)})}}function ln(t,...e){let n={};for(let r of e){let i=r.split("."),s=t,o=n;for(let l=0;l<i.length-1;l++){let f=i[l];if(!s[f])return{};o[f]||(o[f]={}),s=s[f],o=o[f]}let a=i[i.length-1];o[a]=s[a]}return n}var ae=class{constructor(){this._signals={}}exists(e){return!!this.signal(e)}signal(e){let n=e.split("."),r=this._signals;for(let o=0;o<n.length-1;o++){let a=n[o];if(!r[a])return null;r=r[a]}let i=n[n.length-1],s=r[i];if(!s)throw c("SignalNotFound",{path:e});return s}setSignal(e,n){let r=e.split("."),i=this._signals;for(let o=0;o<r.length-1;o++){let a=r[o];i[a]||(i[a]={}),i=i[a]}let s=r[r.length-1];i[s]=n}setComputed(e,n){let r=je(()=>n());this.setSignal(e,r)}value(e){return this.signal(e)?.value}setValue(e,n){let r=this.upsert(e,n);r.value=n}upsert(e,n){let r=e.split("."),i=this._signals;for(let l=0;l<r.length-1;l++){let f=r[l];i[f]||(i[f]={}),i=i[f]}let s=r[r.length-1],o=i[s];if(o)return(o.value===null||o.value===void 0)&&(o.value=n),o;let a=new N(n);return i[s]=a,a}remove(...e){for(let n of e){let r=n.split("."),i=this._signals;for(let o=0;o<r.length-1;o++){let a=r[o];if(!i[a])return;i=i[a]}let s=r[r.length-1];delete i[s]}}merge(e,n=!1){ze(this._signals,e,n)}subset(...e){return ln(this.values(),...e)}walk(e){Xe(this._signals,e)}values(e=!1){return Je(this._signals,e)}JSON(e=!0,n=!1){let r=this.values(n);return e?JSON.stringify(r,null,2):JSON.stringify(r)}toString(){return this.JSON()}};var le=class{constructor(){this._signals=new ae;this.plugins=[];this.macros=[];this.actions={};this.watchers=[];this.removals=new Map}get version(){return Oe}load(...e){e.forEach(n=>{let r;switch(n.type){case 0:this.macros.push(n);break;case 2:let i=n;this.watchers.push(i),r=i.onGlobalInit;break;case 3:this.actions[n.name]=n;break;case 1:let s=n;this.plugins.push(s),r=s.onGlobalInit;break;default:throw c("InvalidPluginType",{name:n.name,type:n.type})}if(r){let i=this;r({get signals(){return i._signals},effect:s=>oe(s),actions:this.actions,apply:this.apply.bind(this),cleanup:this.cleanup.bind(this)})}}),this.apply(document.body)}cleanup(e){let n=this.removals.get(e);if(n){for(let r of n.set)r();this.removals.delete(e)}}apply(e){let n=new Set;this.plugins.forEach((r,i)=>{this.walkDownDOM(e,s=>{i||this.cleanup(s);for(let o in s.dataset){if(!o.startsWith(r.name))continue;let a=o.slice(r.name.length),[l,...f]=a.split(/\_\_+/),u=l.length>0;u&&(l=l[0].toLowerCase()+l.slice(1));let d=`${s.dataset[o]}`||"",g=d,p=g.length>0,m=r.keyReq||0;if(u){if(m===2)throw c(r.name+"KeyNotAllowed")}else if(m===1)throw c(r.name+"KeyRequired");let x=r.valReq||0;if(p){if(x===2)throw c(r.name+"ValueNotAllowed")}else if(x===1)throw c(r.name+"ValueRequired");if(m===3||x===3){if(u&&p)throw c(r.name+"KeyAndValueProvided");if(!u&&!p)throw c(r.name+"KeyOrValueRequired")}s.id.length||(s.id=qe(s)),n.clear();let A=new Map;f.forEach(T=>{let[k,...M]=T.split(".");A.set(ke(k),new Set(M))});let _=[...r.macros?.pre||[],...this.macros,...r.macros?.post||[]];for(let T of _)n.has(T)||(n.add(T),g=T.fn(g));let{actions:S,apply:b,cleanup:h}=this,v=this,R;R={get signals(){return v._signals},effect:T=>oe(T),apply:b.bind(this),cleanup:h.bind(this),actions:S,genRX:()=>this.genRX(R,...r.argNames||[]),el:s,rawKey:o,rawValue:d,key:l,value:g,mods:A};let w=r.onLoad(R);w&&(this.removals.has(s)||this.removals.set(s,{id:s.id,set:new Set}),this.removals.get(s).set.add(w)),r?.removeOnLoad&&delete s.dataset[o]}})})}genRX(e,...n){let r=e.value.split(/;|\n/).map(m=>m.trim()).filter(m=>m!=""),i=r.length-1;r[i].startsWith("return")||(r[i]=`return (${r[i]});`);let o=r.join(`
`),a=/(\w*)\(/gm,l=o.matchAll(a),f=new Set;for(let m of l)f.add(m[1]);let u=Object.keys(this.actions).filter(m=>f.has(m)),g=`${u.map(m=>`const ${m} = ctx.actions.${m}.fn;`).join(`
`)}return (()=> {${o}})()`,p=g.trim();u.forEach(m=>{p=p.replaceAll(m+"(",m+"(ctx,")});try{let m=n||[],x=new Function("ctx",...m,p);return(...A)=>x(e,...A)}catch(m){throw c("GeneratingExpressionFailed",{error:m,fnContent:g})}}walkDownDOM(e,n){if(!e||!(e instanceof HTMLElement||e instanceof SVGElement))return null;for(n(e),e=e.firstElementChild;e;)this.walkDownDOM(e,n),e=e.nextElementSibling}};var Ye=new le;Ye.load(Ce,De,Le,Ie);var Ze=Ye;async function un(t,e){let n=t.getReader(),r;for(;!(r=await n.read()).done;)e(r.value)}function cn(t){let e,n,r,i=!1;return function(o){e===void 0?(e=o,n=0,r=-1):e=dn(e,o);let a=e.length,l=0;for(;n<a;){i&&(e[n]===10&&(l=++n),i=!1);let f=-1;for(;n<a&&f===-1;++n)switch(e[n]){case 58:r===-1&&(r=n-l);break;case 13:i=!0;case 10:f=n;break}if(f===-1)break;t(e.subarray(l,f),r),l=n,r=-1}l===a?e=void 0:l!==0&&(e=e.subarray(l),n-=l)}}function fn(t,e,n){let r=Qe(),i=new TextDecoder;return function(o,a){if(o.length===0)n?.(r),r=Qe();else if(a>0){let l=i.decode(o.subarray(0,a)),f=a+(o[a+1]===32?2:1),u=i.decode(o.subarray(f));switch(l){case"data":r.data=r.data?r.data+`
`+u:u;break;case"event":r.event=u;break;case"id":t(r.id=u);break;case"retry":let d=parseInt(u,10);isNaN(d)||e(r.retry=d);break}}}}function dn(t,e){let n=new Uint8Array(t.length+e.length);return n.set(t),n.set(e,t.length),n}function Qe(){return{data:"",event:"",id:"",retry:void 0}}var pn="text/event-stream",mn=1e3,et="last-event-id";function tt(t,{signal:e,headers:n,onopen:r,onmessage:i,onclose:s,onerror:o,openWhenHidden:a,fetch:l,retryScaler:f=2,retryMaxWaitMs:u=3e4,retryMaxCount:d=10,...g}){return new Promise((p,m)=>{let x=0,A={...n};A.accept||(A.accept=pn);let _;function S(){_.abort(),document.hidden||T()}a||document.addEventListener("visibilitychange",S);let b=mn,h=0;function v(){document.removeEventListener("visibilitychange",S),window.clearTimeout(h),_.abort()}e?.addEventListener("abort",()=>{v(),p()});let R=l??window.fetch,w=r??function(){};async function T(){_=new AbortController;try{let k=await R(t,{...g,headers:A,signal:_.signal});await w(k),await un(k.body,cn(fn(M=>{M?A[et]=M:delete A[et]},M=>{b=M},i))),s?.(),v(),p()}catch(k){if(!_.signal.aborted)try{let M=o?.(k)??b;window.clearTimeout(h),h=window.setTimeout(T,M),b*=f,b=Math.min(b,u),x++,x>=d?(v(),m(c("SSE_MAX_RETRIES",{retryInterval:b,retryMaxCount:d,...g}))):console.error(`Datastar failed to reach ${g.method}:${t.toString()} retry in ${M}ms`)}catch(M){v(),m(M)}}}T()})}var K=`${L}-sse`,Te=`${L}-settling`,W=`${L}-swapping`,ue="started",ce="finished";function V(t,e){document.addEventListener(K,n=>{if(n.detail.type!=t)return;let{argsRaw:r}=n.detail;e(r)})}function Ae(t,e){document.dispatchEvent(new CustomEvent(K,{detail:{type:t,argsRaw:e}}))}var nt=t=>`${t}`.includes("text/event-stream"),rt={type:3,name:"sse",fn:async(t,e,n)=>{let{el:{id:r},signals:i}=t,{method:s,headers:o,includeLocal:a,openWhenHidden:l,retryScaler:f,retryMaxWaitMs:u,retryMaxCount:d,abort:g}=Object.assign({method:"GET",headers:{},includeLocal:!1,openWhenHidden:!1,retryScaler:2,retryMaxWaitMs:3e4,retryMaxCount:10,abort:void 0},n),p=s.toUpperCase();try{if(Ae(ue,{elId:r}),!e?.length)throw c("NoUrlProvided");let m=Object.assign({"Content-Type":"application/json",[Ve]:!0},o),x={method:p,headers:m,openWhenHidden:l,retryScaler:f,retryMaxWaitMs:u,retryMaxCount:d,signal:g,onmessage:S=>{if(!S.event.startsWith(L))return;let b=S.event,h={},v=S.data.split(`
`);for(let w of v){let T=w.indexOf(" "),k=w.slice(0,T),M=h[k];M||(M=[],h[k]=M);let te=w.slice(T+1).trim();M.push(te)}let R={};for(let[w,T]of Object.entries(h))R[w]=T.join(`
`);Ae(b,R)},onerror:S=>{if(nt(S))throw c("InvalidContentType",{url:e,error:S});S&&console.error(S.message)}},A=new URL(e,window.location.origin),_=i.JSON(!1,!a);if(p==="GET"){let S=new URLSearchParams(A.search);S.set(L,_),A.search=S.toString()}else x.body=_;try{await tt(A.toString(),x)}catch(S){if(!nt(S))throw c("SseFetchFailed",{method:p,url:e,error:S})}}finally{Ae(ce,{elId:r})}}};var gn=`${L}-indicator`,Qr=`${gn}-loading`,it={type:1,name:"indicator",keyReq:3,valReq:3,onLoad:({value:t,signals:e,el:n,key:r})=>{let i=r||t,s=e.upsert(i,!1),o=a=>{let{type:l,argsRaw:{elId:f}}=a.detail;if(f===n.id)switch(l){case ue:s.value=!0;break;case ce:s.value=!1;break}};return document.addEventListener(K,o),()=>{document.removeEventListener(K,o)}}};var st={type:2,name:I.ExecuteScript,onGlobalInit:async()=>{V(I.ExecuteScript,({autoRemove:t=`${!0}`,attributes:e=Fe,script:n})=>{let r=O(t);if(!n?.length)throw c("NoScriptProvided");let i=document.createElement("script");e.split(`
`).forEach(s=>{let o=s.indexOf(" "),a=o?s.slice(0,o):s,l=o?s.slice(o):"";i.setAttribute(a.trim(),l.trim())}),i.text=n,document.head.appendChild(i),r&&i.remove()})}};var Z=document,J=!!Z.startViewTransition;var de=new WeakSet;function ut(t,e,n={}){t instanceof Document&&(t=t.documentElement);let r;typeof e=="string"?r=Sn(e):r=e;let i=Tn(r),s=bn(t,i,n);return ct(t,i,s)}function ct(t,e,n){if(n.head.block){let r=t.querySelector("head"),i=e.querySelector("head");if(r&&i){let s=dt(i,r,n);Promise.all(s).then(()=>{ct(t,e,Object.assign(n,{head:{block:!1,ignore:!0}}))});return}}if(n.morphStyle==="innerHTML")return ft(e,t,n),t.children;if(n.morphStyle==="outerHTML"||n.morphStyle==null){let r=_n(e,t,n);if(!r)throw c("NoBestMatchFound",{old:t,new:e});let i=r?.previousSibling,s=r?.nextSibling,o=pe(t,r,n);return r?An(i,o,s):[]}else throw c("InvalidMorphStyle",{style:n.morphStyle})}function pe(t,e,n){if(!(n.ignoreActive&&t===document.activeElement))if(e==null){if(n.callbacks.beforeNodeRemoved(t)===!1)return;t.remove(),n.callbacks.afterNodeRemoved(t);return}else{if(me(t,e))return n.callbacks.beforeNodeMorphed(t,e)===!1?void 0:(t instanceof HTMLHeadElement&&n.head.ignore||(e instanceof HTMLHeadElement&&t instanceof HTMLHeadElement&&n.head.style!==C.Morph?dt(e,t,n):(vn(e,t),ft(e,t,n))),n.callbacks.afterNodeMorphed(t,e),t);if(n.callbacks.beforeNodeRemoved(t)===!1||n.callbacks.beforeNodeAdded(e)===!1)return;if(!t.parentElement)throw c("NoParentElementFound",{oldNode:t});return t.parentElement.replaceChild(e,t),n.callbacks.afterNodeAdded(e),n.callbacks.afterNodeRemoved(t),e}}function ft(t,e,n){let r=t.firstChild,i=e.firstChild,s;for(;r;){if(s=r,r=s.nextSibling,i==null){if(n.callbacks.beforeNodeAdded(s)===!1)return;e.appendChild(s),n.callbacks.afterNodeAdded(s),U(n,s);continue}if(pt(s,i,n)){pe(i,s,n),i=i.nextSibling,U(n,s);continue}let o=yn(t,e,s,i,n);if(o){i=ot(i,o,n),pe(o,s,n),U(n,s);continue}let a=En(t,s,i,n);if(a){i=ot(i,a,n),pe(a,s,n),U(n,s);continue}if(n.callbacks.beforeNodeAdded(s)===!1)return;e.insertBefore(s,i),n.callbacks.afterNodeAdded(s),U(n,s)}for(;i!==null;){let o=i;i=i.nextSibling,mt(o,n)}}function vn(t,e){let n=t.nodeType;if(n===1){for(let r of t.attributes)e.getAttribute(r.name)!==r.value&&e.setAttribute(r.name,r.value);for(let r of e.attributes)t.hasAttribute(r.name)||e.removeAttribute(r.name)}if((n===Node.COMMENT_NODE||n===Node.TEXT_NODE)&&e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue),t instanceof HTMLInputElement&&e instanceof HTMLInputElement&&t.type!=="file")e.value=t.value||"",fe(t,e,"value"),fe(t,e,"checked"),fe(t,e,"disabled");else if(t instanceof HTMLOptionElement)fe(t,e,"selected");else if(t instanceof HTMLTextAreaElement&&e instanceof HTMLTextAreaElement){let r=t.value,i=e.value;r!==i&&(e.value=r),e.firstChild&&e.firstChild.nodeValue!==r&&(e.firstChild.nodeValue=r)}}function fe(t,e,n){let r=t.getAttribute(n),i=e.getAttribute(n);r!==i&&(r?e.setAttribute(n,r):e.removeAttribute(n))}function dt(t,e,n){let r=[],i=[],s=[],o=[],a=n.head.style,l=new Map;for(let u of t.children)l.set(u.outerHTML,u);for(let u of e.children){let d=l.has(u.outerHTML),g=n.head.shouldReAppend(u),p=n.head.shouldPreserve(u);d||p?g?i.push(u):(l.delete(u.outerHTML),s.push(u)):a===C.Append?g&&(i.push(u),o.push(u)):n.head.shouldRemove(u)!==!1&&i.push(u)}o.push(...l.values());let f=[];for(let u of o){let d=document.createRange().createContextualFragment(u.outerHTML).firstChild;if(!d)throw c("NewElementCouldNotBeCreated",{newNode:u});if(n.callbacks.beforeNodeAdded(d)){if(d.hasAttribute("href")||d.hasAttribute("src")){let g,p=new Promise(m=>{g=m});d.addEventListener("load",function(){g(void 0)}),f.push(p)}e.appendChild(d),n.callbacks.afterNodeAdded(d),r.push(d)}}for(let u of i)n.callbacks.beforeNodeRemoved(u)!==!1&&(e.removeChild(u),n.callbacks.afterNodeRemoved(u));return n.head.afterHeadMorphed(e,{added:r,kept:s,removed:i}),f}function F(){}function bn(t,e,n){return{target:t,newContent:e,config:n,morphStyle:n.morphStyle,ignoreActive:n.ignoreActive,idMap:Mn(t,e),deadIds:new Set,callbacks:Object.assign({beforeNodeAdded:F,afterNodeAdded:F,beforeNodeMorphed:F,afterNodeMorphed:F,beforeNodeRemoved:F,afterNodeRemoved:F},n.callbacks),head:Object.assign({style:"merge",shouldPreserve:r=>r.getAttribute("im-preserve")==="true",shouldReAppend:r=>r.getAttribute("im-re-append")==="true",shouldRemove:F,afterHeadMorphed:F},n.head)}}function pt(t,e,n){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName?t?.id?.length&&t.id===e.id?!0:Q(n,t,e)>0:!1}function me(t,e){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName}function ot(t,e,n){for(;t!==e;){let r=t;if(t=t?.nextSibling,!r)throw c("NoTemporaryNodeFound",{startInclusive:t,endExclusive:e});mt(r,n)}return U(n,e),e.nextSibling}function yn(t,e,n,r,i){let s=Q(i,n,e),o=null;if(s>0){o=r;let a=0;for(;o!=null;){if(pt(n,o,i))return o;if(a+=Q(i,o,t),a>s)return null;o=o.nextSibling}}return o}function En(t,e,n,r){let i=n,s=e.nextSibling,o=0;for(;i&&s;){if(Q(r,i,t)>0)return null;if(me(e,i))return i;if(me(s,i)&&(o++,s=s.nextSibling,o>=2))return null;i=i.nextSibling}return i}var at=new DOMParser;function Sn(t){let e=t.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");if(e.match(/<\/html>/)||e.match(/<\/head>/)||e.match(/<\/body>/)){let n=at.parseFromString(t,"text/html");if(e.match(/<\/html>/))return de.add(n),n;{let r=n.firstChild;return r?(de.add(r),r):null}}else{let r=at.parseFromString(`<body><template>${t}</template></body>`,"text/html").body.querySelector("template")?.content;if(!r)throw c("NoContentFound",{newContent:t});return de.add(r),r}}function Tn(t){if(t==null)return document.createElement("div");if(de.has(t))return t;if(t instanceof Node){let e=document.createElement("div");return e.append(t),e}else{let e=document.createElement("div");for(let n of[...t])e.append(n);return e}}function An(t,e,n){let r=[],i=[];for(;t;)r.push(t),t=t.previousSibling;for(;r.length>0;){let s=r.pop();i.push(s),e?.parentElement?.insertBefore(s,e)}for(i.push(e);n;)r.push(n),i.push(n),n=n.nextSibling;for(;r.length;)e?.parentElement?.insertBefore(r.pop(),e.nextSibling);return i}function _n(t,e,n){let r=t.firstChild,i=r,s=0;for(;r;){let o=wn(r,e,n);o>s&&(i=r,s=o),r=r.nextSibling}return i}function wn(t,e,n){return me(t,e)?.5+Q(n,t,e):0}function mt(t,e){U(e,t),e.callbacks.beforeNodeRemoved(t)!==!1&&(t.remove(),e.callbacks.afterNodeRemoved(t))}function Rn(t,e){return!t.deadIds.has(e)}function xn(t,e,n){return t.idMap.get(n)?.has(e)||!1}function U(t,e){let n=t.idMap.get(e);if(n)for(let r of n)t.deadIds.add(r)}function Q(t,e,n){let r=t.idMap.get(e);if(!r)return 0;let i=0;for(let s of r)Rn(t,s)&&xn(t,s,n)&&++i;return i}function lt(t,e){let n=t.parentElement,r=t.querySelectorAll("[id]");for(let i of r){let s=i;for(;s!==n&&s;){let o=e.get(s);o==null&&(o=new Set,e.set(s,o)),o.add(i.id),s=s.parentElement}}}function Mn(t,e){let n=new Map;return lt(t,n),lt(e,n),n}var ht={type:2,name:I.MergeFragments,onGlobalInit:async t=>{let e=document.createElement("template");V(I.MergeFragments,({fragments:n="<div></div>",selector:r="",mergeMode:i=He,settleDuration:s=`${300}`,useViewTransition:o=`${!1}`})=>{let a=parseInt(s),l=O(o);e.innerHTML=n.trim(),[...e.content.children].forEach(u=>{if(!(u instanceof Element))throw c("NoFragmentsFound");let d=r||`#${u.getAttribute("id")}`,g=[...document.querySelectorAll(d)||[]];if(!g.length)throw c("NoTargetsFound",{selectorOrID:d});J&&l?Z.startViewTransition(()=>gt(t,i,a,u,g)):gt(t,i,a,u,g)})})}};function gt(t,e,n,r,i){for(let s of i){s.classList.add(W);let o=s.outerHTML,a=s;switch(e){case C.Morph:let u=ut(a,r,{callbacks:{beforeNodeRemoved:(d,g)=>(t.cleanup(d),!0)}});if(!u?.length)throw c("MorphFailed");a=u[0];break;case C.Inner:a.innerHTML=r.innerHTML;break;case C.Outer:a.replaceWith(r);break;case C.Prepend:a.prepend(r);break;case C.Append:a.append(r);break;case C.Before:a.before(r);break;case C.After:a.after(r);break;case C.UpsertAttributes:r.getAttributeNames().forEach(d=>{let g=r.getAttribute(d);a.setAttribute(d,g)});break;default:throw c("InvalidMergeMode",{mergeMode:e})}t.cleanup(a);let l=a.classList;l.add(W),t.apply(document.body),setTimeout(()=>{s.classList.remove(W),l.remove(W)},n);let f=a.outerHTML;o!==f&&(l.add(Te),setTimeout(()=>{l.remove(Te)},n))}}var vt={type:2,name:I.MergeSignals,onGlobalInit:async t=>{V(I.MergeSignals,({signals:e="{}",onlyIfMissing:n=`${!1}`})=>{let{signals:r}=t,i=O(n);r.merge(ne(e),i),t.apply(document.body)})}};var bt={type:2,name:I.RemoveFragments,onGlobalInit:async()=>{V(I.RemoveFragments,({selector:t,settleDuration:e=`${300}`,useViewTransition:n=`${!1}`})=>{if(!t.length)throw c("NoSelectorProvided");let r=parseInt(e),i=O(n),s=document.querySelectorAll(t),o=()=>{for(let a of s)a.classList.add(W);setTimeout(()=>{for(let a of s)a.remove()},r)};J&&i?Z.startViewTransition(()=>o()):o()})}};var yt={type:2,name:I.RemoveSignals,onGlobalInit:async t=>{V(I.RemoveSignals,({paths:e=""})=>{let n=e.split(`
`).map(r=>r.trim());if(!n?.length)throw c("NoPathsProvided");t.signals.remove(...n),t.apply(document.body)})}};var Et={type:3,name:"clipboard",fn:(t,e)=>{if(!navigator.clipboard)throw c("ClipboardNotAvailable");navigator.clipboard.writeText(e)}};var St="once",Tt="half",At="full",_t={type:1,name:"intersects",keyReq:2,mods:new Set([St,Tt,At]),onLoad:({el:t,rawKey:e,mods:n,genRX:r})=>{let i={threshold:0};n.has(At)?i.threshold=1:n.has(Tt)&&(i.threshold=.5);let s=r(),o=new IntersectionObserver(a=>{a.forEach(l=>{l.isIntersecting&&(s(),n.has(St)&&(o.disconnect(),delete t.dataset[e]))})},i);return o.observe(t),()=>o.disconnect()}};var wt="session",Rt={type:1,name:"persist",mods:new Set([wt]),onLoad:({key:t,value:e,signals:n,effect:r,mods:i})=>{t===""&&(t=L);let s=i.has(wt)?sessionStorage:localStorage,o=e.split(/\s+/).filter(f=>f!==""),a=()=>{let f=s.getItem(t)||"{}",u=JSON.parse(f);n.merge(u)},l=()=>{let f;o.length?f=n.subset(...o):f=n.values(),s.setItem(t,JSON.stringify(f))};return a(),r(()=>{l()})}};var xt={type:1,name:"replaceUrl",keyReq:2,valReq:1,onLoad:({effect:t,genRX:e})=>{let n=e();return t(()=>{let r=n(),i=window.location.href,s=new URL(r,i).toString();window.history.replaceState({},"",s)})}};var ge="smooth",Re="instant",xe="auto",Mt="hstart",Nt="hcenter",Pt="hend",It="hnearest",kt="vstart",Lt="vcenter",Ct="vend",Dt="vnearest",Pn="focus",he="center",Vt="start",Ot="end",Ft="nearest",Ht={type:1,name:"scrollIntoView",keyReq:2,valReq:2,mods:new Set([ge,Re,xe,Mt,Nt,Pt,It,kt,Lt,Ct,Dt,Pn]),onLoad:({el:t,mods:e,rawKey:n})=>{t.tabIndex||t.setAttribute("tabindex","0");let r={behavior:ge,block:he,inline:he};if(e.has(ge)&&(r.behavior=ge),e.has(Re)&&(r.behavior=Re),e.has(xe)&&(r.behavior=xe),e.has(Mt)&&(r.inline=Vt),e.has(Nt)&&(r.inline=he),e.has(Pt)&&(r.inline=Ot),e.has(It)&&(r.inline=Ft),e.has(kt)&&(r.block=Vt),e.has(Lt)&&(r.block=he),e.has(Ct)&&(r.block=Ot),e.has(Dt)&&(r.block=Ft),!(t instanceof HTMLElement||t instanceof SVGElement))throw c("NotHtmlSvgElement, el");return t.tabIndex||t.setAttribute("tabindex","0"),t.scrollIntoView(r),e.has("focus")&&t.focus(),delete t.dataset[n],()=>{}}};var qt="none",Wt="display",Ut={type:1,name:"show",keyReq:2,valReq:1,onLoad:({el:{style:t},genRX:e,effect:n})=>{let r=e();return n(async()=>{r()?t.display===qt&&t.removeProperty(Wt):t.setProperty(Wt,qt)})}};var Me="view-transition",$t={type:1,name:Me,keyReq:2,valReq:1,onGlobalInit(){let t=!1;if(document.head.childNodes.forEach(e=>{e instanceof HTMLMetaElement&&e.name===Me&&(t=!0)}),!t){let e=document.createElement("meta");e.name=Me,e.content="same-origin",document.head.appendChild(e)}},onLoad:({effect:t,el:e,genRX:n})=>{if(!J){console.error("Browser does not support view transitions");return}let r=n();return t(()=>{let i=r();if(!i?.length)return;let s=e.style;s.viewTransitionName=i})}};var Bt={type:1,name:"attributes",valReq:1,onLoad:({el:t,genRX:e,key:n,effect:r})=>{let i=e();return n===""?r(async()=>{let s=i();Object.entries(s).forEach(([o,a])=>{t.setAttribute(o,a)})}):(n=$(n),r(async()=>{let s=!1;try{s=i()}catch{}let o;typeof s=="string"?o=s:o=JSON.stringify(s),!o||o==="false"||o==="null"||o==="undefined"?t.removeAttribute(n):t.setAttribute(n,o)}))}};var In=/^data:(?<mime>[^;]+);base64,(?<contents>.*)$/,Gt=["change","input","keydown"],jt={type:1,name:"bind",keyReq:3,valReq:3,onLoad:t=>{let{el:e,value:n,key:r,signals:i,effect:s}=t,o=r||n,a=()=>{},l=()=>{};if(typeof o!="string")throw c("InvalidExpression");let f=e.tagName.toLowerCase(),u="",d=f.includes("input"),g=e.getAttribute("type"),p=f.includes("checkbox")||d&&g==="checkbox";p&&(u=!1),d&&g==="number"&&(u=0);let x=f.includes("select"),A=f.includes("radio")||d&&g==="radio",_=d&&g==="file";A&&(e.getAttribute("name")?.length||e.setAttribute("name",o)),i.upsert(o,u),a=()=>{let b="value"in e,h=i.value(o),v=`${h}`;if(p||A){let R=e;p?R.checked=!!h||h==="true":A&&(R.checked=v===R.value)}else if(!_)if(x){let R=e;R.multiple?Array.from(R.options).forEach(w=>{w?.disabled||(Array.isArray(h)||typeof h=="string"?w.selected=h.includes(w.value):typeof h=="number"?w.selected=h===Number(w.value):w.selected=h)}):R.value=v}else b?e.value=v:e.setAttribute("value",v)},l=async()=>{if(_){let v=[...e?.files||[]],R=[],w=[],T=[];await Promise.all(v.map(te=>new Promise(nn=>{let H=new FileReader;H.onload=()=>{if(typeof H.result!="string")throw c("InvalidFileResultType",{type:typeof H.result});let ve=H.result.match(In);if(!ve?.groups)throw c("InvalidDataUri",{result:H.result});R.push(ve.groups.contents),w.push(ve.groups.mime),T.push(te.name)},H.onloadend=()=>nn(void 0),H.readAsDataURL(te)}))),i.setValue(o,R);let k=`${o}Mimes`,M=`${o}Names`;k in i&&i.upsert(k,w),M in i&&i.upsert(M,T);return}let b=i.value(o),h=e||e;if(typeof b=="number"){let v=Number(h.value||h.getAttribute("value"));i.setValue(o,v)}else if(typeof b=="string"){let v=h.value||h.getAttribute("value")||"";i.setValue(o,v)}else if(typeof b=="boolean")if(p){let v=h.checked||h.getAttribute("checked")==="true";i.setValue(o,v)}else{let v=!!(h.value||h.getAttribute("value"));i.setValue(o,v)}else if(!(typeof b>"u"))if(Array.isArray(b))if(x){let w=[...e.selectedOptions].filter(T=>T.selected).map(T=>T.value);i.setValue(o,w)}else{let v=JSON.stringify(h.value.split(","));i.setValue(o,v)}else throw c("UnsupportedSignalType",{current:typeof b})},Gt.forEach(b=>e.addEventListener(b,l));let S=s(()=>a());return()=>{S(),Gt.forEach(b=>{e.removeEventListener(b,l)})}}};var Kt={type:1,name:"class",valReq:1,onLoad:({key:t,el:e,genRX:n,effect:r})=>{let i=e.classList,s=n();return r(()=>{if(t===""){let o=s();for(let[a,l]of Object.entries(o)){let f=a.split(/\s+/);l?i.add(...f):i.remove(...f)}}else{let o=s(),a=$(t);o?i.add(a):i.remove(a)}})}};function Ne(t){if(!t||t.size<=0)return 0;for(let e of t){if(e.endsWith("ms"))return Number(e.replace("ms",""));if(e.endsWith("s"))return Number(e.replace("s",""))*1e3;try{return parseFloat(e)}catch{}}return 0}function ee(t,e,n=!1){return t?t.has(e):n}function Jt(t,e,n=!1,r=!0){let i=-1,s=()=>i&&clearTimeout(i);return function(...a){s(),n&&!i&&t(...a),i=setTimeout(()=>{r&&t(...a),s()},e)}}function zt(t,e,n=!0,r=!1){let i=!1;return function(...o){i||(n&&t(...o),i=!0,setTimeout(()=>{i=!1,r&&t(...o)},e))}}var Pe=new Map,kn="evt",Xt={type:1,name:"on",keyReq:1,valReq:1,argNames:[kn],macros:{pre:[{type:0,name:"evtEsc",fn:t=>t.replaceAll(/evt.([\w\.]+)value/gm,"EVT_$1_VALUE")}],post:[{type:0,name:"evtUnesc",fn:t=>t.replaceAll(/EVT_([\w\.]+)_VALUE/gm,"evt.$1value")}]},onLoad:({el:t,key:e,genRX:n,mods:r,signals:i,effect:s})=>{let o=n(),a=t;r.has("window")&&(a=window);let l=p=>{p&&(r.has("noPrevent")||p.preventDefault(),r.has("noPropagation")||p.stopPropagation()),o(p)},f=r.get("debounce");if(f){let p=Ne(f),m=ee(f,"leading",!1),x=!ee(f,"noTrail",!1);l=Jt(l,p,m,x)}let u=r.get("throttle");if(u){let p=Ne(u),m=!ee(u,"noLeading",!1),x=ee(u,"trail",!1);l=zt(l,p,m,x)}let d={capture:!0,passive:!1,once:!1};r.has("capture")||(d.capture=!1),r.has("passive")&&(d.passive=!0),r.has("once")&&(d.once=!0);let g=$(e).toLowerCase();switch(g){case"load":return l(),delete t.dataset.onLoad,()=>{};case"raf":let p,m=()=>{l(),p=requestAnimationFrame(m)};return p=requestAnimationFrame(m),()=>{p&&cancelAnimationFrame(p)};case"signals-change":return We(t,()=>{Pe.delete(t.id)}),s(()=>{let A=r.has("remote"),_=i.JSON(!1,A);(Pe.get(t.id)||"")!==_&&(Pe.set(t.id,_),l())});default:if(r.has("outside")){a=document;let A=l,_=!1;l=b=>{let h=b?.target;if(!h)return;let v=t.id===h.id;v&&_&&(_=!1),!v&&!_&&(A(b),_=!0)}}return a.addEventListener(g,l,d),()=>{a.removeEventListener(g,l)}}}};var Yt={type:1,name:"ref",keyReq:3,valReq:3,onLoad:({el:t,key:e,value:n,signals:r})=>{let i=e||n;return r.upsert(i,t),()=>r.setValue(i,null)}};var Zt={type:1,name:"text",keyReq:2,valReq:1,onLoad:t=>{let{el:e,genRX:n,effect:r}=t,i=n();return e instanceof HTMLElement||c("NotHtmlElement"),r(()=>{let s=i(t);e.textContent=`${s}`})}};var{round:Ln,max:Cn,min:Dn}=Math,Qt={type:3,name:"fit",fn:(t,e,n,r,i,s,o=!1,a=!1)=>{let l=(e-n)/(r-n)*(s-i)+i;return a&&(l=Ln(l)),o&&(l=Cn(i,Dn(s,l))),l}};var en={type:3,name:"setAll",fn:({signals:t},e,n)=>{t.walk((r,i)=>{r.startsWith(e)&&(i.value=n)})}};var tn={type:3,name:"toggleAll",fn:({signals:t},e)=>{t.walk((n,r)=>{n.startsWith(e)&&(r.value=!r.value)})}};Ze.load(jt,it,Yt,Bt,Kt,Xt,Ut,Zt,rt,ht,vt,bt,yt,st,Et,_t,Rt,xt,Ht,$t,Qt,en,tn);})();
//# sourceMappingURL=datastar.js.map
