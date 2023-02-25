(function(){"use strict";var e={6296:function(e,t,n){var r=n(9242),o=n(3396),a=n(7139);const i={class:"main"},u={class:"layout"},c={class:"language"},l={class:"navigation"},s={class:"content"};function d(e,t,n,d,f,p){const m=(0,o.up)("AppHeader"),v=(0,o.up)("router-link"),h=(0,o.up)("router-view"),g=(0,o.up)("AppFooter");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(m),(0,o._)("main",i,[(0,o._)("div",u,[(0,o._)("div",c,["en"==e.$i18n.locale?((0,o.wg)(),(0,o.iD)("button",{key:0,class:"language-button",onClick:t[0]||(t[0]=t=>e.$i18n.locale="ua")},"Ua")):(0,o.kq)("",!0),"ua"==e.$i18n.locale?((0,o.wg)(),(0,o.iD)("button",{key:1,class:"language-button",onClick:t[1]||(t[1]=t=>e.$i18n.locale="en")},"En")):(0,o.kq)("",!0)]),(0,o._)("nav",l,[(0,o.Wm)(v,{to:"/"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,a.zw)(e.$t("nav.home")),1)])),_:1}),(0,o.Wm)(v,{to:"/favorites"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,a.zw)(e.$t("nav.fav")),1)])),_:1})]),(0,o._)("div",s,[(0,o.Wm)(h,null,{default:(0,o.w5)((({Component:e})=>[(0,o.Wm)(r.uT,{name:"route",mode:"out-in"},{default:(0,o.w5)((()=>[((0,o.wg)(),(0,o.j4)((0,o.LL)(e)))])),_:2},1024)])),_:1})])])]),(0,o.Wm)(g)],64)}var f=n.p+"img/logo.32c60963.png";const p={class:"header"},m={class:"logo"},v=(0,o._)("img",{class:"logo-img",alt:"Weather App logo",src:f},null,-1);function h(e,t,n,r,a,i){const u=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("header",p,[(0,o._)("div",m,[(0,o.Wm)(u,{to:"/",class:"logo-link"},{default:(0,o.w5)((()=>[v])),_:1})])])}var g={name:"AppHeader"},y=n(89);const b=(0,y.Z)(g,[["render",h]]);var w=b;const k={class:"footer"},O={class:"footer-text"};function _(e,t,n,r,i,u){return(0,o.wg)(),(0,o.iD)("footer",k,[(0,o._)("div",O,(0,a.zw)(e.$t("footer.text")),1)])}var A={name:"AppFooter"};const C=(0,y.Z)(A,[["render",_]]);var x=C,S={name:"App",components:{AppHeader:w,AppFooter:x}};const j=(0,y.Z)(S,[["render",d]]);var E=j,P=n(2483);const F=[{path:"/",name:"home",component:()=>Promise.all([n.e(794),n.e(201)]).then(n.bind(n,916))},{path:"/favorites",name:"favorites",component:()=>Promise.all([n.e(794),n.e(520)]).then(n.bind(n,49))}],W=(0,P.p7)({history:(0,P.PO)("/weather-app/"),routes:F});var N=W,T=n(5658),H=JSON.parse('{"title":"Weather","nav":{"home":"Home","fav":"Favorites"},"pages":{"favorites":{"title":"Favorites","no-items":"You haven\'t added your favorite cities yet, but it\'s easy to do. Choose any city from the list on Home page and follow the weather ;)"}},"buttons":{"add-card":"Add card","add-card-title":"Add new weather card","remove-card":"remove this weather card","add-to-favorite":"Add to favorite","remove-from-favorite":"Remove from favorite","week-state":{"day":"1 day","week":"5 days"}},"weather-card":{"header-text":"Weather forecast in","details-item":{"temp-feels":"Feels like: ","wind-speed":"Wind speed: ","pressure":"Pressure: ","humidity":"Humidity: "}},"metrics":{"m-s":"m/s","hpa":"hPa"},"select-city":{"label":"Select city","placeholder":"Start typing and select city"},"modals":{"remove-card":{"title":"Remove card?","text":"Remove card with weather forecast for ","button-cancel":"Cancel","button-remove":"Remove"},"favorites-limit":{"title":"Favorites limited","text":"Sorry, but you can\'t add more than 5 cards to your favorites, you can delete one of the existing ones and then add this one","button-cancel":"Ok"}},"footer":{"text":"© OlStan 2023 powered by openweathermap"}}'),L=JSON.parse('{"title":"Погода","nav":{"home":"Головна","fav":"Вибране"},"pages":{"favorites":{"title":"Вибране","no-items":"Ви ще не додали свої улюблені міста, але це легко зробити. Виберіть будь-яке місто зі списку на Головній сторінці та стежте за погодою ;)"}},"buttons":{"add-card":"Додати картку","add-card-title":"Додати нову картку погоди","remove-card":"видалити цю картку","add-to-favorite":"Додати у вибране","remove-from-favorite":"Видалити з вибраного","week-state":{"day":"1 день","week":"5 днів"}},"weather-card":{"header-text":"Прогноз погоди в ","details-item":{"temp-feels":"Відчувається як: ","wind-speed":"Швидкість вітру: ","pressure":"Тиск: ","humidity":"Вологість: "}},"metrics":{"m-s":"м/с","hpa":"гПа"},"select-city":{"label":"Виберить місто","placeholder":"Почніть вводити текст і виберіть місто"},"modals":{"remove-card":{"title":"Видалити картку?","text":"Видалити картку з прогнозом погоди для ","button-cancel":"Відмінити","button-remove":"Видалити"},"favorites-limit":{"title":"Вибране обмежено","text":"Вибачте, але ви не можете додати більше 5 карток у вибране, ви можете видалити одну з існуючих, а потім додати цю","button-cancel":"Ok"}},"footer":{"text":"© OlStan 2023 на основі openweathermap"}}');const D="en",$={en:H,ua:L},q=(0,T.o)({legacy:!1,globalInjection:!0,locale:D,fallbackLocale:D,messages:$});(0,r.ri)(E).use(N).use(q).mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,a){if(!r){var i=1/0;for(s=0;s<e.length;s++){r=e[s][0],o=e[s][1],a=e[s][2];for(var u=!0,c=0;c<r.length;c++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(u=!1,a<i&&(i=a));if(u){e.splice(s--,1);var l=o();void 0!==l&&(t=l)}}return t}a=a||0;for(var s=e.length;s>0&&e[s-1][2]>a;s--)e[s]=e[s-1];e[s]=[r,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{201:"c58a0295",520:"b1ced8e5",794:"f54553f6"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{201:"c34b7557",520:"2be98701"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="weather-app:";n.l=function(r,o,a,i){if(e[r])e[r].push(o);else{var u,c;if(void 0!==a)for(var l=document.getElementsByTagName("script"),s=0;s<l.length;s++){var d=l[s];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+a){u=d;break}}u||(c=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,n.nc&&u.setAttribute("nonce",n.nc),u.setAttribute("data-webpack",t+a),u.src=r),e[r]=[o];var f=function(t,n){u.onerror=u.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=f.bind(null,u.onerror),u.onload=f.bind(null,u.onload),c&&document.head.appendChild(u)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/weather-app/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,n,r,o){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var i=function(n){if(a.onerror=a.onload=null,"load"===n.type)r();else{var i=n&&("load"===n.type?"missing":n.type),u=n&&n.target&&n.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+u+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=u,a.parentNode.removeChild(a),o(c)}};return a.onerror=a.onload=i,a.href=t,n?n.parentNode.insertBefore(a,n.nextSibling):document.head.appendChild(a),a},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){o=i[r],a=o.getAttribute("data-href");if(a===e||a===t)return o}},r=function(r){return new Promise((function(o,a){var i=n.miniCssF(r),u=n.p+i;if(t(i,u))return o();e(r,u,null,o,a)}))},o={143:0};n.f.miniCss=function(e,t){var n={201:1,520:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}}(),function(){var e={143:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=a);var i=n.p+n.u(t),u=new Error,c=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;u.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",u.name="ChunkLoadError",u.type=a,u.request=i,o[1](u)}};n.l(i,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,i=r[0],u=r[1],c=r[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(o in u)n.o(u,o)&&(n.m[o]=u[o]);if(c)var s=c(n)}for(t&&t(r);l<i.length;l++)a=i[l],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(s)},r=self["webpackChunkweather_app"]=self["webpackChunkweather_app"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(6296)}));r=n.O(r)})();
//# sourceMappingURL=app.1dce977a.js.map