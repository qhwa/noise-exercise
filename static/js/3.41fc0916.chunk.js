(this.webpackJsonpnoise=this.webpackJsonpnoise||[]).push([[3],{9:function(n,t,r){"use strict";r.r(t),r.d(t,"seed",(function(){return a})),r.d(t,"default",(function(){return c}));var o=r(1),e=256,u=e-1;function a(){return Array.from({length:e*e},(function(n,t){return[Math.floor(255*Math.random()),Math.floor(255*Math.random())]}))}function c(n,t,r){var o=n&u,a=t&u,c=o+1&u,s=a+1&u,h=r[o+a*e],d=r[o+s*e],M=r[c+a*e],p=r[c+s*e],b=i(n-o),l=i(t-a),m=f(h,M,b),v=f(d,p,b),j=f(m,v,l);return(j[0]+j[1])/2}function i(n){return.5*(1-Math.cos(n*Math.PI))}function f(n,t,r){var e=Object(o.a)(n,2),u=e[0],a=e[1],c=Object(o.a)(t,2);return[u+(c[0]-u)*r,a+(c[1]-a)*r]}}}]);
//# sourceMappingURL=3.41fc0916.chunk.js.map