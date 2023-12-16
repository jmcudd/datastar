var Datastar=function($){"use strict";function ie(t){return t instanceof HTMLElement||t instanceof SVGElement?t:null}function K(){throw new Error("Cycle detected")}function Ye(){throw new Error("Computed cannot have side-effects")}const Qe=Symbol.for("preact-signals"),E=1,O=2,H=4,C=8,D=16,L=32;function z(){F++}function Z(){if(F>1){F--;return}let t,e=!1;for(;x!==void 0;){let n=x;for(x=void 0,ae++;n!==void 0;){const r=n._nextBatchedEffect;if(n._nextBatchedEffect=void 0,n._flags&=~O,!(n._flags&C)&&_e(n))try{n._callback()}catch(s){e||(t=s,e=!0)}n=r}}if(ae=0,F--,e)throw t}function et(t){if(F>0)return t();z();try{return t()}finally{Z()}}let m,x,F=0,ae=0,X=0;function ve(t){if(m===void 0)return;let e=t._node;if(e===void 0||e._target!==m)return e={_version:0,_source:t,_prevSource:m._sources,_nextSource:void 0,_target:m,_prevTarget:void 0,_nextTarget:void 0,_rollbackNode:e},m._sources!==void 0&&(m._sources._nextSource=e),m._sources=e,t._node=e,m._flags&L&&t._subscribe(e),e;if(e._version===-1)return e._version=0,e._nextSource!==void 0&&(e._nextSource._prevSource=e._prevSource,e._prevSource!==void 0&&(e._prevSource._nextSource=e._nextSource),e._prevSource=m._sources,e._nextSource=void 0,m._sources._nextSource=e,m._sources=e),e}function v(t){this._value=t,this._version=0,this._node=void 0,this._targets=void 0}v.prototype.brand=Qe,v.prototype._refresh=function(){return!0},v.prototype._subscribe=function(t){this._targets!==t&&t._prevTarget===void 0&&(t._nextTarget=this._targets,this._targets!==void 0&&(this._targets._prevTarget=t),this._targets=t)},v.prototype._unsubscribe=function(t){if(this._targets!==void 0){const e=t._prevTarget,n=t._nextTarget;e!==void 0&&(e._nextTarget=n,t._prevTarget=void 0),n!==void 0&&(n._prevTarget=e,t._nextTarget=void 0),t===this._targets&&(this._targets=n)}},v.prototype.subscribe=function(t){const e=this;return ce(function(){const n=e.value,r=this._flags&L;this._flags&=~L;try{t(n)}finally{this._flags|=r}})},v.prototype.valueOf=function(){return this.value},v.prototype.toString=function(){return this.value+""},v.prototype.toJSON=function(){return this.value},v.prototype.peek=function(){return this._value},Object.defineProperty(v.prototype,"value",{get(){const t=ve(this);return t!==void 0&&(t._version=this._version),this._value},set(t){if(m instanceof T&&Ye(),t!==this._value){ae>100&&K(),this._value=t,this._version++,X++,z();try{for(let e=this._targets;e!==void 0;e=e._nextTarget)e._target._notify()}finally{Z()}}}});function ye(t){return new v(t)}function _e(t){for(let e=t._sources;e!==void 0;e=e._nextSource)if(e._source._version!==e._version||!e._source._refresh()||e._source._version!==e._version)return!0;return!1}function we(t){for(let e=t._sources;e!==void 0;e=e._nextSource){const n=e._source._node;if(n!==void 0&&(e._rollbackNode=n),e._source._node=e,e._version=-1,e._nextSource===void 0){t._sources=e;break}}}function Ee(t){let e=t._sources,n;for(;e!==void 0;){const r=e._prevSource;e._version===-1?(e._source._unsubscribe(e),r!==void 0&&(r._nextSource=e._nextSource),e._nextSource!==void 0&&(e._nextSource._prevSource=r)):n=e,e._source._node=e._rollbackNode,e._rollbackNode!==void 0&&(e._rollbackNode=void 0),e=r}t._sources=n}function T(t){v.call(this,void 0),this._compute=t,this._sources=void 0,this._globalVersion=X-1,this._flags=H}T.prototype=new v,T.prototype._refresh=function(){if(this._flags&=~O,this._flags&E)return!1;if((this._flags&(H|L))===L||(this._flags&=~H,this._globalVersion===X))return!0;if(this._globalVersion=X,this._flags|=E,this._version>0&&!_e(this))return this._flags&=~E,!0;const t=m;try{we(this),m=this;const e=this._compute();(this._flags&D||this._value!==e||this._version===0)&&(this._value=e,this._flags&=~D,this._version++)}catch(e){this._value=e,this._flags|=D,this._version++}return m=t,Ee(this),this._flags&=~E,!0},T.prototype._subscribe=function(t){if(this._targets===void 0){this._flags|=H|L;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._subscribe(e)}v.prototype._subscribe.call(this,t)},T.prototype._unsubscribe=function(t){if(this._targets!==void 0&&(v.prototype._unsubscribe.call(this,t),this._targets===void 0)){this._flags&=~L;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e)}},T.prototype._notify=function(){if(!(this._flags&O)){this._flags|=H|O;for(let t=this._targets;t!==void 0;t=t._nextTarget)t._target._notify()}},T.prototype.peek=function(){if(this._refresh()||K(),this._flags&D)throw this._value;return this._value},Object.defineProperty(T.prototype,"value",{get(){this._flags&E&&K();const t=ve(this);if(this._refresh(),t!==void 0&&(t._version=this._version),this._flags&D)throw this._value;return this._value}});function tt(t){return new T(t)}function be(t){const e=t._cleanup;if(t._cleanup=void 0,typeof e=="function"){z();const n=m;m=void 0;try{e()}catch(r){throw t._flags&=~E,t._flags|=C,le(t),r}finally{m=n,Z()}}}function le(t){for(let e=t._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e);t._compute=void 0,t._sources=void 0,be(t)}function nt(t){if(m!==this)throw new Error("Out-of-order effect");Ee(this),m=t,this._flags&=~E,this._flags&C&&le(this),Z()}function U(t){this._compute=t,this._cleanup=void 0,this._sources=void 0,this._nextBatchedEffect=void 0,this._flags=L}U.prototype._callback=function(){const t=this._start();try{if(this._flags&C||this._compute===void 0)return;const e=this._compute();typeof e=="function"&&(this._cleanup=e)}finally{t()}},U.prototype._start=function(){this._flags&E&&K(),this._flags|=E,this._flags&=~C,be(this),we(this),z();const t=m;return m=this,nt.bind(this,t)},U.prototype._notify=function(){this._flags&O||(this._flags|=O,this._nextBatchedEffect=x,x=this)},U.prototype._dispose=function(){this._flags|=C,this._flags&E||le(this)};function ce(t){const e=new U(t);try{e._callback()}catch(n){throw e._dispose(),n}return e._dispose.bind(e)}class Se{get value(){return fe(this)}set value(e){et(()=>rt(this,e))}peek(){return fe(this,{peek:!0})}}const ue=t=>Object.assign(new Se,Object.entries(t).reduce((e,[n,r])=>{if(["value","peek"].some(s=>s===n))throw new Error(`${n} is a reserved property name`);return typeof r!="object"||r===null||Array.isArray(r)?e[n]=ye(r):e[n]=ue(r),e},{})),rt=(t,e)=>Object.keys(e).forEach(n=>t[n].value=e[n]),fe=(t,{peek:e=!1}={})=>Object.entries(t).reduce((n,[r,s])=>(s instanceof v?n[r]=e?s.peek():s.value:s instanceof Se&&(n[r]=fe(s,{peek:e})),n),{}),st=/([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;function Te(t,e=2){return JSON.stringify(t,(r,s)=>typeof s=="bigint"?s.toString()+"n":s,e).replace(/"(-?\d+)n"/g,(r,s)=>s)}function ot(t){const e=t.replace(st,'$1"$2n"$3');return JSON.parse(e,(n,r)=>{switch(typeof r){case"number":return Number.isSafeInteger(r)?r:BigInt(r);case"string":return r.match(/(-?\d+)n/g)?.length?BigInt(r.slice(0,-1)):r;default:return r}})}function Ae(t,e){if(typeof e!="object"||Array.isArray(e)||!e)return e;if(typeof e=="object"&&e.toJSON!==void 0&&typeof e.toJSON=="function")return e.toJSON();let n=t;return typeof t!="object"&&(n={...e}),Object.keys(e).forEach(r=>{n.hasOwnProperty(r)||(n[r]=e[r]),e[r]===null?delete n[r]:n[r]=Ae(n[r],e[r])}),n}const it="[a-zA-Z_$][0-9a-zA-Z_$.]*";function de(t,e,n){return new RegExp(`(?<whole>\\${t}(?<${e}>${it})${n})`,"g")}const at={regexp:de("$","signal",""),replacer:t=>{const{signal:e}=t;return`ctx.store().${e}.value`}},lt={regexp:de("$\\$","action","(?<call>\\((?<args>.*)\\))?"),replacer:({action:t,args:e})=>{const n=["ctx"];e&&n.push(...e.split(",").map(s=>s.trim()));const r=n.join(",");return`ctx.actions.${t}(${r})`}},ct={regexp:de("~","ref",""),replacer({ref:t}){return`data.refs.${t}`}},ut=[lt,at,ct],ft=[{prefix:"mergeStore",preprocessors:{pre:[{regexp:/(?<whole>.+)/g,replacer:t=>{const{whole:e}=t;return`ctx.JSONParse('${e.replace(/'/g,"\\'")}')`}}]},onLoad:t=>{const e=t.expressionFn(t);t.mergeStore(e)}},{prefix:"ref",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,bypassExpressionFunctionCreation:()=>!0,onLoad:t=>{const{el:e,expression:n}=t;return t.refs[n]=e,()=>delete t.refs[n]}}];class Le{plugins=[];store=ue({});actions={};refs={};reactivity={signal:ye,computed:tt,effect:ce};parentID="";missingIDNext=0;removals=new Map;constructor(e={},...n){if(this.actions=Object.assign(this.actions,e),n=[...ft,...n],!n.length)throw new Error("no plugins");const r=new Set;for(const s of n){if(s.requiredPluginPrefixes){for(const o of s.requiredPluginPrefixes)if(!r.has(o))throw new Error(`${s.prefix} requires ${o}`)}this.plugins.push(s),r.add(s.prefix)}}run(){this.plugins.forEach(e=>{e.onGlobalInit&&e.onGlobalInit({actions:this.actions,refs:this.refs,reactivity:this.reactivity,mergeStore:this.mergeStore.bind(this),store:this.store})}),this.applyPlugins(document.body)}JSONStringify(e){return Te(e)}JSONParse(e){return ot(e)}cleanupElementRemovals(e){const n=this.removals.get(e);if(n){for(const r of n)r();this.removals.delete(e)}}mergeStore(e){const n=Ae(this.store.value,e);this.store=ue(n)}signalByName(e){return this.store[e]}applyPlugins(e){const n=new Set;this.plugins.forEach((r,s)=>{this.walkDownDOM(e,o=>{s===0&&this.cleanupElementRemovals(o);for(const i in o.dataset){let a=o.dataset[i]||"";if(!i.startsWith(r.prefix))continue;if(o.id.length===0&&(o.id=`ds-${this.parentID}-${this.missingIDNext++}`),n.clear(),r.allowedTagRegexps){const d=o.tagName.toLowerCase();if(![...r.allowedTagRegexps].some(h=>d.match(h)))throw new Error(`'${o.tagName}' not allowed for '${i}', allowed ${[[...r.allowedTagRegexps].map(h=>`'${h}'`)].join(", ")}`)}let f=i.slice(r.prefix.length),[u,...c]=f.split(".");if(r.mustHaveEmptyKey&&u.length>0)throw new Error(`'${i}' must have empty key`);if(r.mustNotEmptyKey&&u.length===0)throw new Error(`'${i}' must have non-empty key`);u.length&&(u=u[0].toLowerCase()+u.slice(1));const l=c.map(d=>{const[p,...h]=d.split("_");return{label:p,args:h}});if(r.allowedModifiers){for(const d of l)if(!r.allowedModifiers.has(d.label))throw new Error(`'${d.label}' is not allowed`)}const y=new Map;for(const d of l)y.set(d.label,d.args);if(r.mustHaveEmptyExpression&&a.length)throw new Error(`'${i}' must have empty expression`);if(r.mustNotEmptyExpression&&!a.length)throw new Error(`'${i}' must have non-empty expression`);const _=[...r.preprocessors?.pre||[],...ut,...r.preprocessors?.post||[]];for(const d of _){if(n.has(d))continue;n.add(d);const p=[...a.matchAll(d.regexp)];if(p.length)for(const h of p){if(!h.groups)continue;const{groups:S}=h,{whole:A}=S;a=a.replace(A,d.replacer(S))}}const w={store:()=>this.store,mergeStore:this.mergeStore.bind(this),applyPlugins:this.applyPlugins.bind(this),cleanupElementRemovals:this.cleanupElementRemovals.bind(this),walkSignals:this.walkSignals.bind(this),actions:this.actions,refs:this.refs,reactivity:this.reactivity,el:o,key:u,expression:a,expressionFn:()=>{throw new Error("Expression function not created")},JSONParse:this.JSONParse,JSONStringify:this.JSONStringify,modifiers:y};if(!r.bypassExpressionFunctionCreation?.(w)&&!r.mustHaveEmptyExpression&&a.length){const d=a.split(";");d[d.length-1]=`return ${d[d.length-1]}`;const p=`
try {
  ${d.join(";")}
} catch (e) {
  throw new Error(\`Eval '${a}' on ${o.id?`#${o.id}`:o.tagName}\`)
}
            `;try{const h=new Function("ctx",p);w.expressionFn=h}catch(h){console.error(`Error creating expression function for '${p}'`),console.error(h);return}}const g=r.onLoad(w);g&&(this.removals.has(o)||this.removals.set(o,new Set),this.removals.get(o).add(g))}})})}walkSignalsStore(e,n){const r=Object.keys(e);for(let s=0;s<r.length;s++){const o=r[s],i=e[o],a=i instanceof v,f=typeof i=="object"&&Object.keys(i).length>0;if(a){n(o,i);continue}f&&this.walkSignalsStore(i,n)}}walkSignals(e){this.walkSignalsStore(this.store,e)}walkDownDOM(e,n,r=0){if(!e)return;const s=ie(e);if(s)for(n(s),r=0,e=e.firstElementChild;e;)this.walkDownDOM(e,n,r++),e=e.nextElementSibling}}const Ne=t=>t.replace(/[A-Z]+(?![a-z])|[A-Z]/g,(e,n)=>(n?"-":"")+e.toLowerCase()),dt={prefix:"bind",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>t.reactivity.effect(()=>{const e=Ne(t.key),r=`${t.expressionFn(t)}`;!r||r==="false"||r==="null"||r==="undefined"?t.el.removeAttribute(e):t.el.setAttribute(e,r)})},ht=/^data:(?<mime>[^;]+);base64,(?<contents>.*)$/,Y=["change","input","keydown"],pt=[dt,{prefix:"model",mustHaveEmptyKey:!0,preprocessors:{post:[{regexp:/(?<whole>.+)/g,replacer:t=>{const{whole:e}=t;return`ctx.store().${e}`}}]},allowedTagRegexps:new Set(["input","textarea","select","checkbox","radio"]),onLoad:t=>{const{el:e,expression:n}=t,r=t.expressionFn(t),s=e.tagName.toLowerCase(),o=s.includes("input"),i=s.includes("select"),a=s.includes("textarea"),f=s.includes("radio"),u=e.getAttribute("type"),c=s.includes("checkbox")||o&&u==="checkbox",l=o&&u==="file";if(!o&&!i&&!a&&!c&&!f)throw new Error("Element must be input, select, textarea, checkbox or radio");const y=()=>{if(!r)throw new Error(`Signal ${n} not found`);const p="value"in e,h=r.value;c?e.checked=h:l||(p?e.value=`${h}`:e.setAttribute("value",`${h}`))},_=t.reactivity.effect(y),w=()=>{if(l){const[S]=e?.files||[];if(!S){r.value="";return}const A=new FileReader,M=t.store();A.onload=()=>{if(typeof A.result!="string")throw new Error("Unsupported type");const R=A.result.match(ht);if(!R?.groups)throw new Error("Invalid data URI");const{mime:G,contents:W}=R.groups;r.value=W;const q=`${n}Mime`;if(q in M){const oe=M[`${q}`];oe.value=G}},A.readAsDataURL(S);const J=`${n}Name`;if(J in M){const R=M[`${J}`];R.value=S.name}return}const p=r.value,h=e;if(typeof p=="number")r.value=Number(h.value);else if(typeof p=="string")r.value=h.value;else if(typeof p=="boolean")c?r.value=h.checked:r.value=!!h.value;else if(!(typeof p>"u"))if(typeof p=="bigint")r.value=BigInt(h.value);else throw console.log(typeof p),new Error("Unsupported type")},g=e.tagName.split("-");if(g.length>1){const p=g[0].toLowerCase();Y.forEach(h=>{Y.push(`${p}-${h}`)})}return Y.forEach(p=>e.addEventListener(p,w)),()=>{_(),Y.forEach(p=>e.removeEventListener(p,w))}}},{prefix:"text",mustHaveEmptyKey:!0,onLoad:t=>{const{el:e,expressionFn:n}=t;if(!(e instanceof HTMLElement))throw new Error("Element is not HTMLElement");return t.reactivity.effect(()=>{const r=n(t);e.textContent=`${r}`})}},{prefix:"focus",mustHaveEmptyKey:!0,mustHaveEmptyExpression:!0,onLoad:t=>(t.el.tabIndex||t.el.setAttribute("tabindex","0"),t.el.focus(),t.el.scrollIntoView({block:"center",inline:"center"}),()=>t.el.blur())},{prefix:"on",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,allowedModifiers:new Set(["once","passive","capture","debounce","throttle"]),onLoad:t=>{const{el:e,key:n,expressionFn:r}=t;let s=()=>{r(t)};const o=t.modifiers.get("debounce");if(o){const u=Pe(o),c=Q(o,"leading",!1),l=Q(o,"noTrail",!0);s=mt(s,u,c,l)}const i=t.modifiers.get("throttle");if(i){const u=Pe(i),c=Q(i,"noLead",!0),l=Q(i,"noTrail",!0);s=gt(s,u,c,l)}const a={capture:!0,passive:!1,once:!1};t.modifiers.has("capture")||(a.capture=!1),t.modifiers.has("passive")&&(a.passive=!0),t.modifiers.has("once")&&(a.once=!0);const f=Ne(n).toLowerCase();return f==="load"?(s(),()=>{}):(e.addEventListener(f,s,a),()=>e.removeEventListener(f,s))}}];function Pe(t){if(!t||t?.length===0)return 0;for(const e of t){if(e.endsWith("ms"))return Number(e.replace("ms",""));if(e.endsWith("s"))return Number(e.replace("s",""))*1e3;try{return parseFloat(e)}catch{}}return 0}function Q(t,e,n=!1){return t?t.includes(e)||n:!1}function mt(t,e,n=!1,r=!0){let s;const o=()=>s&&clearTimeout(s);return function(...a){o(),n&&!s&&t(...a),s=setTimeout(()=>{r&&t(...a),o()},e)}}function gt(t,e,n=!0,r=!1){let s=!1,o=null;return function(...a){s?o=a:(s=!0,n?t(...a):o=a,setTimeout(()=>{r&&o&&(t(...o),o=null),s=!1},e))}}const ee=new WeakSet;function vt(t,e,n={}){t instanceof Document&&(t=t.documentElement);let r;typeof e=="string"?r=bt(e):r=e;const s=St(r),o=_t(t,s,n);return ke(t,s,o)}function ke(t,e,n){if(n.head.block){const r=t.querySelector("head"),s=e.querySelector("head");if(r&&s){const o=Re(s,r,n);Promise.all(o).then(()=>{ke(t,e,Object.assign(n,{head:{block:!1,ignore:!0}}))});return}}if(n.morphStyle==="innerHTML")return Me(e,t,n),t.children;if(n.morphStyle==="outerHTML"||n.morphStyle==null){const r=At(e,t,n);if(!r)throw new Error("Could not find best match");const s=r?.previousSibling,o=r?.nextSibling,i=te(t,r,n);return r?Tt(s,i,o):[]}else throw"Do not understand how to morph style "+n.morphStyle}function te(t,e,n){if(!(n.ignoreActive&&t===document.activeElement))if(e==null){if(n.callbacks.beforeNodeRemoved(t)===!1)return;t.remove(),n.callbacks.afterNodeRemoved(t);return}else{if(re(t,e))return n.callbacks.beforeNodeMorphed(t,e)===!1?void 0:(t instanceof HTMLHeadElement&&n.head.ignore||(e instanceof HTMLHeadElement&&t instanceof HTMLHeadElement&&n.head.style!=="morph"?Re(e,t,n):(yt(e,t),Me(e,t,n))),n.callbacks.afterNodeMorphed(t,e),t);if(n.callbacks.beforeNodeRemoved(t)===!1||n.callbacks.beforeNodeAdded(e)===!1)return;if(!t.parentElement)throw new Error("oldNode has no parentElement");return t.parentElement.replaceChild(e,t),n.callbacks.afterNodeAdded(e),n.callbacks.afterNodeRemoved(t),e}}function Me(t,e,n){let r=t.firstChild,s=e.firstChild,o;for(;r;){if(o=r,r=o.nextSibling,s==null){if(n.callbacks.beforeNodeAdded(o)===!1)return;e.appendChild(o),n.callbacks.afterNodeAdded(o),k(n,o);continue}if($e(o,s,n)){te(s,o,n),s=s.nextSibling,k(n,o);continue}let i=wt(t,e,o,s,n);if(i){s=Oe(s,i,n),te(i,o,n),k(n,o);continue}let a=Et(t,o,s,n);if(a){s=Oe(s,a,n),te(a,o,n),k(n,o);continue}if(n.callbacks.beforeNodeAdded(o)===!1)return;e.insertBefore(o,s),n.callbacks.afterNodeAdded(o),k(n,o)}for(;s!==null;){let i=s;s=s.nextSibling,Ie(i,n)}}function yt(t,e){let n=t.nodeType;if(n===1){for(const r of t.attributes)e.getAttribute(r.name)!==r.value&&e.setAttribute(r.name,r.value);for(const r of e.attributes)t.hasAttribute(r.name)||e.removeAttribute(r.name)}if((n===Node.COMMENT_NODE||n===Node.TEXT_NODE)&&e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue),t instanceof HTMLInputElement&&e instanceof HTMLInputElement&&t.type!=="file")e.value=t.value||"",ne(t,e,"value"),ne(t,e,"checked"),ne(t,e,"disabled");else if(t instanceof HTMLOptionElement)ne(t,e,"selected");else if(t instanceof HTMLTextAreaElement&&e instanceof HTMLTextAreaElement){const r=t.value,s=e.value;r!==s&&(e.value=r),e.firstChild&&e.firstChild.nodeValue!==r&&(e.firstChild.nodeValue=r)}}function ne(t,e,n){const r=t.getAttribute(n),s=e.getAttribute(n);r!==s&&(r?e.setAttribute(n,r):e.removeAttribute(n))}function Re(t,e,n){const r=[],s=[],o=[],i=[],a=n.head.style,f=new Map;for(const c of t.children)f.set(c.outerHTML,c);for(const c of e.children){let l=f.has(c.outerHTML),y=n.head.shouldReAppend(c),_=n.head.shouldPreserve(c);l||_?y?s.push(c):(f.delete(c.outerHTML),o.push(c)):a==="append"?y&&(s.push(c),i.push(c)):n.head.shouldRemove(c)!==!1&&s.push(c)}i.push(...f.values()),console.log("to append: ",i);const u=[];for(const c of i){console.log("adding: ",c);const l=document.createRange().createContextualFragment(c.outerHTML).firstChild;if(!l)throw new Error("could not create new element from: "+c.outerHTML);if(console.log(l),n.callbacks.beforeNodeAdded(l)){if(l.hasAttribute("href")||l.hasAttribute("src")){let y;const _=new Promise(w=>{y=w});l.addEventListener("load",function(){y(void 0)}),u.push(_)}e.appendChild(l),n.callbacks.afterNodeAdded(l),r.push(l)}}for(const c of s)n.callbacks.beforeNodeRemoved(c)!==!1&&(e.removeChild(c),n.callbacks.afterNodeRemoved(c));return n.head.afterHeadMorphed(e,{added:r,kept:o,removed:s}),u}function N(){}function _t(t,e,n){return{target:t,newContent:e,config:n,morphStyle:n.morphStyle,ignoreActive:n.ignoreActive,idMap:kt(t,e),deadIds:new Set,callbacks:Object.assign({beforeNodeAdded:N,afterNodeAdded:N,beforeNodeMorphed:N,afterNodeMorphed:N,beforeNodeRemoved:N,afterNodeRemoved:N},n.callbacks),head:Object.assign({style:"merge",shouldPreserve:r=>r.getAttribute("im-preserve")==="true",shouldReAppend:r=>r.getAttribute("im-re-append")==="true",shouldRemove:N,afterHeadMorphed:N},n.head)}}function $e(t,e,n){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName?t?.id?.length&&t.id===e.id?!0:V(n,t,e)>0:!1}function re(t,e){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName}function Oe(t,e,n){for(;t!==e;){const r=t;if(t=t?.nextSibling,!r)throw new Error("tempNode is null");Ie(r,n)}return k(n,e),e.nextSibling}function wt(t,e,n,r,s){const o=V(s,n,e);let i=null;if(o>0){i=r;let a=0;for(;i!=null;){if($e(n,i,s))return i;if(a+=V(s,i,t),a>o)return null;i=i.nextSibling}}return i}function Et(t,e,n,r){let s=n,o=e.nextSibling,i=0;for(;s&&o;){if(V(r,s,t)>0)return null;if(re(e,s))return s;if(re(o,s)&&(i++,o=o.nextSibling,i>=2))return null;s=s.nextSibling}return s}const Ce=new DOMParser;function bt(t){const e=t.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");if(e.match(/<\/html>/)||e.match(/<\/head>/)||e.match(/<\/body>/)){const n=Ce.parseFromString(t,"text/html");if(e.match(/<\/html>/))return ee.add(n),n;{let r=n.firstChild;return r?(ee.add(r),r):null}}else{const r=Ce.parseFromString(`<body><template>${t}</template></body>`,"text/html").body.querySelector("template")?.content;if(!r)throw new Error("content is null");return ee.add(r),r}}function St(t){if(t==null)return document.createElement("div");if(ee.has(t))return t;if(t instanceof Node){const e=document.createElement("div");return e.append(t),e}else{const e=document.createElement("div");for(const n of[...t])e.append(n);return e}}function Tt(t,e,n){const r=[],s=[];for(;t;)r.push(t),t=t.previousSibling;for(;r.length>0;){const o=r.pop();s.push(o),e?.parentElement?.insertBefore(o,e)}for(s.push(e);n;)r.push(n),s.push(n),n=n.nextSibling;for(;r.length;)e?.parentElement?.insertBefore(r.pop(),e.nextSibling);return s}function At(t,e,n){let r=t.firstChild,s=r,o=0;for(;r;){let i=Lt(r,e,n);i>o&&(s=r,o=i),r=r.nextSibling}return s}function Lt(t,e,n){return re(t,e)?.5+V(n,t,e):0}function Ie(t,e){k(e,t),e.callbacks.beforeNodeRemoved(t)!==!1&&(t.remove(),e.callbacks.afterNodeRemoved(t))}function Nt(t,e){return!t.deadIds.has(e)}function Pt(t,e,n){return t.idMap.get(n)?.has(e)||!1}function k(t,e){const n=t.idMap.get(e);if(n)for(const r of n)t.deadIds.add(r)}function V(t,e,n){const r=t.idMap.get(e);if(!r)return 0;let s=0;for(const o of r)Nt(t,o)&&Pt(t,o,n)&&++s;return s}function He(t,e){const n=t.parentElement,r=t.querySelectorAll("[id]");for(const s of r){let o=s;for(;o!==n&&o;){let i=e.get(o);i==null&&(i=new Set,e.set(o,i)),i.add(s.id),o=o.parentElement}}}function kt(t,e){const n=new Map;return He(t,n),He(e,n),n}const Mt=["get","post","put","patch","delete"].reduce((t,e)=>(t[e]=async n=>{const r=Document;if(!r.startViewTransition){await xe(e,n);return}return new Promise(s=>{r.startViewTransition(async()=>{await xe(e,n),s()})})},t),{}),Rt="Accept",$t="Content-Type",Ot="datastar-request",Ct="application/json",It="text/event-stream",Ht="true",B="datastar-",j=`${B}indicator`,he=`${j}-loading`,De=`${B}settling`,se=`${B}swapping`,Dt="self",b={MorphElement:"morph_element",InnerElement:"inner_element",OuterElement:"outer_element",PrependElement:"prepend_element",AppendElement:"append_element",BeforeElement:"before_element",AfterElement:"after_element",DeleteElement:"delete_element",UpsertAttributes:"upsert_attributes"},xt=[{prefix:"header",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>{const e=t.store().fetch.headers,n=t.key[0].toUpperCase()+t.key.slice(1);return e[n]=t.reactivity.computed(()=>t.expressionFn(t)),()=>{delete e[n]}}},{prefix:"fetchUrl",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onGlobalInit:({mergeStore:t})=>{t({fetch:{headers:{},elementURLs:{},indicatorSelectors:{}}})},onLoad:t=>t.reactivity.effect(()=>{const e=t.reactivity.computed(()=>`${t.expressionFn(t)}`),n=t.store();return n.fetch.elementURLs[t.el.id]=e,()=>{delete n.fetch.elementURLs[t.el.id]}})},{prefix:"fetchIndicator",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onGlobalInit:()=>{const t=document.createElement("style");t.innerHTML=`
.${j}{
 opacity:0;
 transition: opacity 300ms ease-out;
}
.${he} {
 opacity:1;
 transition: opacity 300ms ease-in;
}
`,document.head.appendChild(t)},onLoad:t=>t.reactivity.effect(()=>{const e=t.reactivity.computed(()=>`${t.expressionFn(t)}`),n=t.store();n.fetch.indicatorSelectors[t.el.id]=e;const r=document.querySelector(e.value);if(!r)throw new Error(`No indicator found for ${e.value}`);return r.classList.add(j),()=>{delete n.fetch.indicatorSelectors[t.el.id]}})}],Ft=/(?<key>\w*): (?<value>.*)/gm;async function xe(t,e){const n=e.store(),r=n.fetch.elementURLs[e.el.id];if(!r)return;const s={...n.value};delete s.fetch;const o=Te(s);let i=e.el,a=!1;const f=n.fetch.indicatorSelectors[i.id];if(f){const g=document.querySelector(f);g&&(i=g,i.classList.remove(j),i.classList.add(he),a=!0)}const u=new URL(r.value,window.location.origin),c=new Headers;c.append(Rt,It),c.append($t,Ct),c.append(Ot,Ht);const l=n.fetch.headers.value;if(l)for(const g in l){const d=l[g];c.append(g,d)}t=t.toUpperCase();const y={method:t,headers:c};if(t==="GET"){const g=new URLSearchParams(u.search);g.append("datastar",o),u.search=g.toString()}else y.body=o;const _=await fetch(u,y);if(!_.ok)throw new Error(`Response was not ok, url: ${u}, status: ${_.status}`);if(!_.body)throw new Error("No response body");const w=_.body.pipeThrough(new TextDecoderStream).getReader();for(;;){const{done:g,value:d}=await w.read();if(g)break;d.split(`

`).forEach(p=>{const h=[...p.matchAll(Ft)];if(h.length){let S="",A="morph_element",M="",J=0,R=!1,G="",W,q=!1,oe=!1;for(const ze of h){if(!ze.groups)continue;const{key:zt,value:P}=ze.groups;switch(zt){case"event":if(!P.startsWith(B))throw new Error(`Unknown event: ${P}`);switch(P.slice(B.length)){case"redirect":R=!0;break;case"fragment":oe=!0;break;case"error":q=!0;break;default:throw new Error(`Unknown event: ${P}`)}break;case"data":const ge=P.indexOf(" ");if(ge===-1)throw new Error("Missing space in data");const Ze=P.slice(0,ge),I=P.slice(ge+1);switch(Ze){case"selector":M=I;break;case"merge":const Xe=I;if(!Object.values(b).includes(Xe))throw new Error(`Unknown merge option: ${P}`);A=Xe;break;case"settle":J=parseInt(I);break;case"fragment":case"html":S=I;break;case"redirect":G=I;break;case"error":W=new Error(I);break;default:throw new Error(`Unknown data type: ${Ze}`)}}}if(q&&W)throw W;if(R&&G)window.location.href=G;else if(oe&&S)Ut(e,M,A,S,J);else throw new Error(`Unknown event block: ${p}`)}})}a&&(i.classList.remove(he),i.classList.add(j))}const Fe=document.createElement("template");function Ut(t,e,n,r,s){const{el:o}=t;Fe.innerHTML=r;const i=Fe.content.firstChild;if(!(i instanceof Element))throw new Error(`Fragment is not an element, source '${r}'`);const a=e===Dt;let f;if(a)f=[o];else{const u=e||`#${i.getAttribute("id")}`;if(f=document.querySelectorAll(u)||[],!f)throw new Error(`No target elements, selector: ${e}`)}for(const u of f){u.classList.add(se);const c=u.outerHTML;let l=u;switch(n){case b.MorphElement:const _=vt(l,i);if(!_?.length)throw new Error("Failed to morph element");l=_[0];break;case b.InnerElement:l.innerHTML=i.innerHTML;break;case b.OuterElement:l.replaceWith(i);break;case b.PrependElement:l.prepend(i);break;case b.AppendElement:l.append(i);break;case b.BeforeElement:l.before(i);break;case b.AfterElement:l.after(i);break;case b.DeleteElement:setTimeout(()=>l.remove(),s);break;case b.UpsertAttributes:i.getAttributeNames().forEach(g=>{const d=i.getAttribute(g);l.setAttribute(g,d)});break;default:throw new Error(`Unknown merge type: ${n}`)}l.classList.add(se),t.cleanupElementRemovals(u),t.applyPlugins(l),u.classList.remove(se),l.classList.remove(se);const y=l.outerHTML;c!==y&&(l.classList.add(De),setTimeout(()=>{l.classList.remove(De)},s))}}const Vt={setAll:async(t,e,n)=>{const r=new RegExp(e);t.walkSignals((s,o)=>r.test(s)&&(o.value=n))},toggleAll:async(t,e)=>{const n=new RegExp(e);t.walkSignals((r,s)=>n.test(r)&&(s.value=!s.value))}},pe="display",Ue="none",me="important",Bt={prefix:"show",allowedModifiers:new Set([me]),onLoad:t=>{const{el:e,modifiers:n,expressionFn:r}=t;return ce(()=>{const o=!!r(t),a=n.has(me)?me:void 0;o?e.style.length===1&&e.style.display===Ue?e.style.removeProperty(pe):e.style.setProperty(pe,"",a):e.style.setProperty(pe,Ue,a)})}},jt="intersects",Ve="once",Be="half",je="full",Jt={prefix:jt,allowedModifiers:new Set([Ve,Be,je]),mustHaveEmptyKey:!0,onLoad:t=>{const{modifiers:e}=t,n={threshold:0};e.has(je)?n.threshold=1:e.has(Be)&&(n.threshold=.5);const r=new IntersectionObserver(s=>{s.forEach(o=>{o.isIntersecting&&(t.expressionFn(t),e.has(Ve)&&r.disconnect())})},n);return r.observe(t.el),()=>r.disconnect()}},Je="prepend",Ge="append",We=new Error("Target element must have a parent if using prepend or append"),Gt={prefix:"teleport",allowedModifiers:new Set([Je,Ge]),allowedTagRegexps:new Set(["template"]),bypassExpressionFunctionCreation:()=>!0,onLoad:t=>{const{el:e,modifiers:n,expression:r}=t;if(!(e instanceof HTMLTemplateElement))throw new Error;const s=document.querySelector(r);if(!s)throw new Error(`Target element not found: ${r}`);if(!e.content)throw new Error("Template element must have content");const o=e.content.cloneNode(!0);if(ie(o)?.firstElementChild)throw new Error("Empty template");if(n.has(Je)){if(!s.parentNode)throw We;s.parentNode.insertBefore(o,s)}else if(n.has(Ge)){if(!s.parentNode)throw We;s.parentNode.insertBefore(o,s.nextSibling)}else s.appendChild(o)}},Wt={prefix:"scrollIntoView",onLoad:t=>{const{el:e}=t;e.scrollIntoView({behavior:"smooth",block:"center",inline:"center"})}},qe="ds-view-transition-stylesheet",qt=[Bt,Jt,Gt,Wt,{prefix:"viewTransition",onGlobalInit(t){const e=document.createElement("style");e.id=qe,document.head.appendChild(e);let n=!1;if(document.head.childNodes.forEach(r=>{r instanceof HTMLMetaElement&&r.name==="view-transition"&&(n=!0)}),!n){const r=document.createElement("meta");r.name="view-transition",r.content="same-origin",document.head.appendChild(r)}t.mergeStore({viewTransitionRefCounts:{}})},onLoad:t=>{const{el:e,expressionFn:n}=t;let r=n(t);if(!r){if(!e.id)throw new Error("Element must have an id if no name is provided");r=e.id}const s=document.getElementById(qe);if(!s)throw new Error("View transition stylesheet not found");const o=`ds-vt-${r}`,i=`
.${o} {
  view-transition: ${r};
}

`;s.innerHTML+=i;const a=t.store();let f=a.viewTransitionRefCounts[r];return f||(f=t.reactivity.signal(0),a.viewTransitionRefCounts[r]=f),f.value++,e.classList.add(o),()=>{f.value--,f.value===0&&(delete a.viewTransitionRefCounts[r],s.innerHTML=s.innerHTML.replace(i,""))}}}];function Ke(t={},...e){const n=performance.now(),r=new Le(t,...e);r.run();const s=performance.now();return console.log(`Datastar loaded and attached to all DOM elements in ${s-n}ms`),r}function Kt(t={},...e){const n=Object.assign({},Vt,Mt,t),r=[...xt,...qt,...pt,...e];return Ke(n,...r)}return $.Datastar=Le,$.runDatastarWith=Ke,$.runDatastarWithAllPlugins=Kt,$.toHTMLorSVGElement=ie,Object.defineProperty($,Symbol.toStringTag,{value:"Module"}),$}({});
//# sourceMappingURL=datastar.iife.js.map
