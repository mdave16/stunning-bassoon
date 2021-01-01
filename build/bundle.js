var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t){t.parentNode.removeChild(t)}let s;function i(t){s=t}function f(){const t=function(){if(!s)throw new Error("Function called outside component initialization");return s}();return(n,e)=>{const o=t.$$.callbacks[n];if(o){const r=function(t,n){const e=document.createEvent("CustomEvent");return e.initCustomEvent(t,!1,!1,n),e}(n,e);o.slice().forEach((n=>{n.call(t,r)}))}}}const a=[],l=[],d=[],$=[],p=Promise.resolve();let h=!1;function m(t){d.push(t)}let g=!1;const y=new Set;function b(){if(!g){g=!0;do{for(let t=0;t<a.length;t+=1){const n=a[t];i(n),_(n.$$)}for(i(null),a.length=0;l.length;)l.pop()();for(let t=0;t<d.length;t+=1){const n=d[t];y.has(n)||(y.add(n),n())}d.length=0}while(a.length);for(;$.length;)$.pop()();h=!1,g=!1,y.clear()}}function _(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(m)}}const x=new Set;function E(t,n){t&&t.i&&(x.delete(t),t.i(n))}function k(t,n,e,o){if(t&&t.o){if(x.has(t))return;x.add(t),undefined.c.push((()=>{x.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}function v(t){t&&t.c()}function w(t,e,c){const{fragment:u,on_mount:s,on_destroy:i,after_update:f}=t.$$;u&&u.m(e,c),m((()=>{const e=s.map(n).filter(r);i?i.push(...e):o(e),t.$$.on_mount=[]})),f.forEach(m)}function C(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function j(t,n){-1===t.$$.dirty[0]&&(a.push(t),h||(h=!0,p.then(b)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function O(n,r,c,f,a,l,d=[-1]){const $=s;i(n);const p=r.props||{},h=n.$$={fragment:null,ctx:null,props:l,update:t,not_equal:a,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map($?$.$$.context:[]),callbacks:e(),dirty:d,skip_bound:!1};let m=!1;if(h.ctx=c?c(n,p,((t,e,...o)=>{const r=o.length?o[0]:e;return h.ctx&&a(h.ctx[t],h.ctx[t]=r)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](r),m&&j(n,t)),e})):[],h.update(),m=!0,o(h.before_update),h.fragment=!!f&&f(h.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);h.fragment&&h.fragment.l(t),t.forEach(u)}else h.fragment&&h.fragment.c();r.intro&&E(n.$$.fragment),w(n,r.target,r.anchor),b()}i($)}class L{$destroy(){C(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function N(n){let e,o,r;return{c(){var t;t="button",e=document.createElement(t),e.textContent="Click to say hello"},m(t,c){var u,s,i,f;!function(t,n,e){t.insertBefore(n,e||null)}(t,e,c),o||(u=e,s="click",i=n[0],u.addEventListener(s,i,f),r=()=>u.removeEventListener(s,i,f),o=!0)},p:t,i:t,o:t,d(t){t&&u(e),o=!1,r()}}}function S(t){const n=f();return[()=>{n("message",{text:"hello!"})}]}class q extends L{constructor(t){super(),O(this,t,S,N,c,{})}}function z(n){let e,o;return e=new q({}),e.$on("message",function(t){let n=!1;return function(...e){n||(n=!0,t.call(this,...e))}}(n[0])),{c(){v(e.$$.fragment)},m(t,n){w(e,t,n),o=!0},p:t,i(t){o||(E(e.$$.fragment,t),o=!0)},o(t){k(e.$$.fragment,t),o=!1},d(t){C(e,t)}}}function A(t){return[function(n){!function(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach((t=>t(n)))}(t,n)}]}class B extends L{constructor(t){super(),O(this,t,A,z,c,{})}}function F(n){let e,o;return e=new B({}),e.$on("message",n[0]),{c(){v(e.$$.fragment)},m(t,n){w(e,t,n),o=!0},p:t,i(t){o||(E(e.$$.fragment,t),o=!0)},o(t){k(e.$$.fragment,t),o=!1},d(t){C(e,t)}}}function M(t){return[t=>{console.log(t.detail.text)}]}return new class extends L{constructor(t){super(),O(this,t,M,F,c,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
