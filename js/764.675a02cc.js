"use strict";(self["webpackChunkweather_app"]=self["webpackChunkweather_app"]||[]).push([[764],{1517:function(e,t,a){a.r(t),a.d(t,{default:function(){return m}});var i=a(3396),s=a(7139);const n={class:"favorites"},r={key:0,style:{display:"flex","align-items":"center","justify-content":"center","min-height":"420px"}},o={key:0,class:"favorites-content"},l={key:1,class:"favorites-noitems"},p={class:"favorites-noitems-text"};function c(e,t,a,c,u,v){const g=(0,i.up)("AppLoader"),d=(0,i.up)("WeatherCard");return(0,i.wg)(),(0,i.iD)("div",n,[(0,i._)("h1",null,(0,s.zw)(e.$t("pages.favorites.title")),1),c.isLoading?((0,i.wg)(),(0,i.iD)("div",r,[(0,i.Wm)(g)])):((0,i.wg)(),(0,i.iD)(i.HY,{key:1},[c.cities?.length?((0,i.wg)(),(0,i.iD)("div",o,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(c.cities,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{class:"weather",key:t},[(0,i.Wm)(d,{cityProp:e[0],change:!1},null,8,["cityProp"])])))),128))])):((0,i.wg)(),(0,i.iD)("div",l,[(0,i._)("p",p,(0,s.zw)(e.$t("pages.favorites.no-items")),1)]))],64))])}a(7658);var u=a(2068),v=a(8794),g=a(4870),d=a(7340),h=a(5939),w={name:"FavoritesView",components:{AppLoader:u.Z,WeatherCard:v.Z},setup(){const e=(0,g.iH)([]),t=(0,g.iH)([]),a=(0,g.iH)(!1),s=async(e,i)=>{a.value=!0,await h.Z.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${e}&lon=${i}&appid=${d.q}`).then((e=>{t.value.push(e.data)})),a.value=!1},n=()=>{e.value?.length&&e.value.forEach((e=>{const[t,a]=e.split("&");s(t,a)}))};return(0,i.bv)((()=>{e.value=JSON.parse(localStorage.getItem("favoritesCityLLK"))||[],n()})),{isLoading:a,cities:t}}},f=a(89);const y=(0,f.Z)(w,[["render",c],["__scopeId","data-v-78356828"]]);var m=y}}]);
//# sourceMappingURL=764.675a02cc.js.map