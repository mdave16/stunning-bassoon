var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function i(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function s(t,n,e){t.insertBefore(n,e||null)}function c(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function a(t){return document.createTextNode(t)}function l(t,n){t.value=null==n?"":n}class f{constructor(t=null){this.a=t,this.e=this.n=null}m(t,n,e=null){this.e||(this.e=u(n.nodeName),this.t=n,this.h(t)),this.i(e)}h(t){this.e.innerHTML=t,this.n=Array.from(this.e.childNodes)}i(t){for(let n=0;n<this.n.length;n+=1)s(this.t,this.n[n],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(c)}}let h;function d(t){h=t}const p=[],m=[],$=[],g=[],b=Promise.resolve();let y=!1;function _(t){$.push(t)}let x=!1;const v=new Set;function k(){if(!x){x=!0;do{for(let t=0;t<p.length;t+=1){const n=p[t];d(n),E(n.$$)}for(d(null),p.length=0;m.length;)m.pop()();for(let t=0;t<$.length;t+=1){const n=$[t];v.has(n)||(v.add(n),n())}$.length=0}while(p.length);for(;g.length;)g.pop()();y=!1,x=!1,v.clear()}}function E(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(_)}}const w=new Set;function A(t,n){-1===t.$$.dirty[0]&&(p.push(t),y||(y=!0,b.then(k)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function N(i,s,u,a,l,f,p=[-1]){const m=h;d(i);const $=s.props||{},g=i.$$={fragment:null,ctx:null,props:f,update:t,not_equal:l,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(m?m.$$.context:[]),callbacks:e(),dirty:p,skip_bound:!1};let b=!1;if(g.ctx=u?u(i,$,((t,n,...e)=>{const o=e.length?e[0]:n;return g.ctx&&l(g.ctx[t],g.ctx[t]=o)&&(!g.skip_bound&&g.bound[t]&&g.bound[t](o),b&&A(i,t)),n})):[],g.update(),b=!0,o(g.before_update),g.fragment=!!a&&a(g.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);g.fragment&&g.fragment.l(t),t.forEach(c)}else g.fragment&&g.fragment.c();s.intro&&((y=i.$$.fragment)&&y.i&&(w.delete(y),y.i(x))),function(t,e,i){const{fragment:s,on_mount:c,on_destroy:u,after_update:a}=t.$$;s&&s.m(e,i),_((()=>{const e=c.map(n).filter(r);u?u.push(...e):o(e),t.$$.on_mount=[]})),a.forEach(_)}(i,s.target,s.anchor),k()}var y,x;d(m)}function j(n){let e,o,r,i,h,d;return{c(){var t,n,s;e=u("textarea"),o=a(" "),i=a(""),t=e,n="class",null==(s="svelte-hyxn8s")?t.removeAttribute(n):t.getAttribute(n)!==s&&t.setAttribute(n,s),r=new f(i)},m(t,c){var u,a,f,p;s(t,e,c),l(e,n[0]),s(t,o,c),r.m(n[0],t,c),s(t,i,c),h||(u=e,a="input",f=n[1],u.addEventListener(a,f,p),d=()=>u.removeEventListener(a,f,p),h=!0)},p(t,[n]){1&n&&l(e,t[0]),1&n&&r.p(t[0])},i:t,o:t,d(t){t&&c(e),t&&c(o),t&&c(i),t&&r.d(),h=!1,d()}}}function L(t,n,e){let o="Some words are <em>italic</em> and some are <b>bold</b>";return[o,function(){o=this.value,e(0,o)}]}return new class extends class{$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),N(this,t,L,j,i,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
