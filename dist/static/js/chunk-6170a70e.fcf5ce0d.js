(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6170a70e"],{"00c5":function(e,t,a){"use strict";a("cf97")},"02ac":function(e,t,a){},"0627":function(e,t,a){},"06ca":function(e,t,a){"use strict";a("3aeb")},"0748":function(e,t,a){"use strict";var c=a("7a23");function r(e,t,a,r,n,o){var i=Object(c["resolveComponent"])("expand-dom"),l=Object(c["resolveComponent"])("el-table-column"),u=Object(c["resolveComponent"])("el-table");return Object(c["openBlock"])(),Object(c["createBlock"])(u,Object(c["mergeProps"])({data:a.data},e.$attrs,{class:a.customClass}),{default:Object(c["withCtx"])((function(){return[a.columns.length?(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],{key:1},Object(c["renderList"])(a.columns,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])(l,Object(c["mergeProps"])({key:e.prop},e),Object(c["createSlots"])({_:2},[e.render&&"function"===typeof e.render?{name:"default",fn:Object(c["withCtx"])((function(t){return[Object(c["createVNode"])(i,Object(c["mergeProps"])(e,{$scope:t}),null,16,["$scope"])]}))}:void 0]),1040)})),128)):Object(c["renderSlot"])(e.$slots,"default",{key:0})]})),_:3},16,["data","class"])}var n=a("5530"),o={components:{expandDom:function(e){if(-1!==e.$scope.$index)return e.render(c["h"],Object(n["a"])({},e.$scope))}},inheritAttrs:!1,props:{columns:{type:Array,default:function(){return[]}},data:{type:Array,default:function(){return[]}},customClass:{type:String,default:"reset-style"}}};o.render=r;t["a"]=o},"07c7f":function(e,t,a){"use strict";a("94d8")},"0c78":function(e,t,a){"use strict";a("8e38")},"0fda":function(e,t,a){},"1af1":function(e,t,a){},"291c":function(e,t,a){"use strict";a("6643")},3418:function(e,t,a){"use strict";a("ffe2")},"374f":function(e,t,a){"use strict";a("0fda")},"3aeb":function(e,t,a){},"40cd":function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var c=a("7a23"),r=a("9ee5");const n=Object(c["defineComponent"])({name:"ArrowRight"}),o={class:"icon",width:"200",height:"200",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},i=Object(c["createElementVNode"])("path",{fill:"currentColor",d:"M340.864 149.312a30.592 30.592 0 000 42.752L652.736 512 340.864 831.872a30.592 30.592 0 000 42.752 29.12 29.12 0 0041.728 0L714.24 534.336a32 32 0 000-44.672L382.592 149.376a29.12 29.12 0 00-41.728 0z"},null,-1),l=[i];function u(e,t,a,r,n,i){return Object(c["openBlock"])(),Object(c["createElementBlock"])("svg",o,l)}var s=Object(r["a"])(n,[["render",u]])},4241:function(e,t,a){},"4a4e":function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var c=a("7a23"),r=a("9ee5");const n=Object(c["defineComponent"])({name:"CaretBottom"}),o={class:"icon",width:"200",height:"200",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},i=Object(c["createElementVNode"])("path",{fill:"currentColor",d:"M192 384l320 384 320-384z"},null,-1),l=[i];function u(e,t,a,r,n,i){return Object(c["openBlock"])(),Object(c["createElementBlock"])("svg",o,l)}var s=Object(r["a"])(n,[["render",u]])},"52af":function(e,t,a){},"53ef":function(e,t,a){},"54c8":function(e,t,a){},"54e3":function(e,t,a){"use strict";a("4241")},5725:function(e,t,a){},6592:function(e,t,a){"use strict";a("bb1a")},6643:function(e,t,a){},"6f46":function(e,t,a){"use strict";a.r(t);var c=a("7a23"),r=a("6c02"),n=a("47e2"),o=a("3aee"),i=a("a4e3"),l=a("40cd"),u={props:{list:{type:Array,required:!0}},setup:function(e,t){var a=t.expose;a();var c={ArrowRight:l["a"]};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}};a("d9ed");u.__scopeId="data-v-69b26d9a";var s=u,p=(a("99af"),a("4a4e")),b={props:{list:{type:Array,default:function(){return[]}}},emits:["onClick"],setup:function(e,t){var a=t.expose,r=t.emit;a();var n=Object(c["ref"])(null),o=function(e){n.value.open=!1,e.path||r("onClick",e)},i={emits:r,tooltip:n,onClick:o,ref:c["ref"],CaretBottom:p["a"]};return Object.defineProperty(i,"__isScriptSetup",{enumerable:!1,value:!0}),i}};a("07c7f");b.__scopeId="data-v-fc748e82";var v=b,d={setup:function(e,t){var a=t.expose;a();var r=Object(n["b"])(),o=r.t,i=Object(c["reactive"])({current_time:"24h",time_droplist:[{value:"24h",label:"".concat(o("24h")," ").concat(o("low_high"))},{value:"1m",label:"".concat(o("1m")," ").concat(o("low_high"))},{value:"1y",label:"".concat(o("1y")," ").concat(o("low_high"))}]}),l={t:o,state:i,reactive:c["reactive"],useI18n:n["b"],tagTooltip:v};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}};a("edd2");d.__scopeId="data-v-46656407";var f=d,_={setup:function(e,t){var a=t.expose;a();var r=Object(n["b"])(),i=r.t,u=Object(c["ref"])(!1),s={t:i,visible:u,ref:c["ref"],useI18n:n["b"],tagTooltip:v,ArrowRight:l["a"],replacePath:o["c"]};return Object.defineProperty(s,"__isScriptSetup",{enumerable:!1,value:!0}),s}};a("726e");_.__scopeId="data-v-30faf992";var h=_,m={setup:function(e,t){var a=t.expose;a();var r=Object(n["b"])(),o=r.t,i=Object(c["reactive"])({list:[{value:"",label:"market_cap",tip:"market_cap_tip"},{value:"",label:"fd_market_cap",tip:"fd_market_cap_tip"},{value:"",label:"volume",tip:"volume_tip"},{value:"",label:"vol_market_cap"},{value:"",label:"circulating_supply",tip:"circulating_supply_tip",progress:!0}]}),l={t:o,state:i,reactive:c["reactive"],useI18n:n["b"]};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}};a("6592");m.__scopeId="data-v-303a9bc8";var g=m,O={class:"chart"};function j(e,t){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",O," 图表 ")}a("e425");const y={};y.render=j,y.__scopeId="data-v-524769b3";var w=y,C={setup:function(e,t){var a=t.expose;a();var r=Object(n["b"])(),o=r.t,i=Object(c["reactive"])({checked_list:["USD"],coins:["USD","BTC"]}),l={t:o,state:i,reactive:c["reactive"],useI18n:n["b"],Chart:w};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}};a("0c78");C.__scopeId="data-v-203811d2";var S=C,k={setup:function(e,t){var a=t.expose;a();var r=Object(n["b"])(),o=r.t,i=Object(c["reactive"])({list_map:{today:{label:o("price_today",{fullname:"币种全称"}),children:[{label:"币种全称 ".concat(o("price")),value:"$47,857.88",label_cls:"color-1"},{label:o("price_change"),value:"$-1,297.87",change:-.3,tag:!0},{label:o("24h_low_high"),value:"$47,857.88",value2:"$77,857.88"},{label:o("trading_volume"),value:"$47,857.88",change:.3,tag:!0},{label:o("vol_market_cap"),value:"$47,857.88"},{label:o("market_dominance"),value:"$47,857.88"},{label:o("market_rank"),value:"10"}]},market_cap:{label:"币种全称 ".concat(o("market_cap")),children:[{label:o("market_cap"),value:"$906,192,986,593.91",change:-.3},{label:o("fd_market_cap"),value:"$1,006,143,789,787.49",change:10.3}]},yesterday:{label:o("price_yesterday",{fullname:"币种全称"}),children:[{label:o("yesterday_lh"),value:"$47,857.88",value2:"$77,857.88"},{label:o("yesterday_oc"),value:"$47,857.88",value2:"$77,857.88"},{label:o("yesterday_change"),change:10},{label:o("yesterday_vol"),value:"$1,006,143,789,787.49"}]},history:{label:o("price_history",{fullname:"币种全称"}),children:[{label:o("7d_lh"),value:"$47,857.88",value2:"$77,857.88"},{label:o("30d_lh"),value:"$47,857.88",value2:"$77,857.88"},{label:o("90d_lh"),value:"$47,857.88",value2:"$77,857.88"},{label:o("52w_lh"),value:"$47,857.88",value2:"$77,857.88"},{label:o("all_time_high"),value:"$47,857.88",change:1e4},{label:o("all_time_low"),value:"$47,857.88",change:-1e4},{label:o("coin_roi",{fullname:"币种全称"}),change:-1e4}]},supply:{label:o("coin_supply",{fullname:"币种全称"}),children:[{label:o("circulating_supply"),value:"$1,006,143,789,787.49"},{label:o("total_supply"),value:"$1,006,143,789,787.49"},{label:o("max_supply"),value:"$1,006,143,789,787.49"}]}},show_more:!1}),l={t:o,state:i,reactive:c["reactive"],useI18n:n["b"]};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}};a("00c5");k.__scopeId="data-v-785d8250";var x=k,I={setup:function(e,t){var a=t.expose;a();var c=Object(n["b"])(),r=c.t,o={t:r,useI18n:n["b"]};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}};a("f9cc");I.__scopeId="data-v-27460a16";var $=I,B=a("9ee5");const L=Object(c["defineComponent"])({name:"Switch"}),P={class:"icon",width:"200",height:"200",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},H=Object(c["createElementVNode"])("path",{fill:"currentColor",d:"M118.656 438.656a32 32 0 010-45.248L416 96l4.48-3.776A32 32 0 01461.248 96l3.712 4.48a32.064 32.064 0 01-3.712 40.832L218.56 384H928a32 32 0 110 64H141.248a32 32 0 01-22.592-9.344zM64 608a32 32 0 0132-32h786.752a32 32 0 0122.656 54.592L608 928l-4.48 3.776a32.064 32.064 0 01-40.832-49.024L805.632 640H96a32 32 0 01-32-32z"},null,-1),T=[H];function V(e,t,a,r,n,o){return Object(c["openBlock"])(),Object(c["createElementBlock"])("svg",P,T)}var N=Object(B["a"])(L,[["render",V]]),E={setup:function(e,t){var a=t.expose;a();var c=Object(n["b"])(),r=c.t,o={t:r,useI18n:n["b"],Switch:N};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}};a("06ca");E.__scopeId="data-v-358c263a";var M=E;const A=Object(c["defineComponent"])({name:"CaretTop"}),z={class:"icon",width:"200",height:"200",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},D=Object(c["createElementVNode"])("path",{fill:"currentColor",d:"M512 320L192 704h639.936z"},null,-1),R=[D];function Z(e,t,a,r,n,o){return Object(c["openBlock"])(),Object(c["createElementBlock"])("svg",z,R)}var q=Object(B["a"])(A,[["render",Z]]),W={props:{content:{type:String,default:""}},setup:function(e,t){var a=t.expose;a();var r=e,o=Object(n["b"])(),i=o.t,l=Object(c["ref"])(null),u=Object(c["reactive"])({show_more:!1,unfold:!1}),s={setLine:function(){if(l.value){var e=l.value.scrollHeight;u.show_more=e>510}},onFold:function(){u.unfold=!u.unfold,s.setLine()}};Object(c["watch"])((function(){return r.content}),(function(){Object(c["nextTick"])().then((function(){s.setLine()}))}),{immediate:!0});var b={props:r,t:i,refDom:l,state:u,methods:s,ref:c["ref"],reactive:c["reactive"],watch:c["watch"],nextTick:c["nextTick"],useI18n:n["b"],CaretBottom:p["a"],CaretTop:q};return Object.defineProperty(b,"__isScriptSetup",{enumerable:!1,value:!0}),b}};a("b0ab");W.__scopeId="data-v-2d13f55e";var F=W,G=a("0748"),J={setup:function(e,t){var a=t.expose;a();var c=Object(n["b"])(),r=c.t,o={t:r,useI18n:n["b"]};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}};a("97ea");J.__scopeId="data-v-0eb2d376";var U=J,X={setup:function(e,t){var a=t.expose;a();var c=Object(n["b"])(),r=c.t,o={t:r,useI18n:n["b"]};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}};a("291c");X.__scopeId="data-v-3b83d004";var K=X,Q={props:{active:{type:String,required:!0}},setup:function(e,t){var a=t.expose;a();var r=Object(n["b"])(),i=r.t,u=Object(c["reactive"])({menu_list:[{id:"token",label:i("menu_token")},{id:"game",label:i("menu_game")}],columns:[{prop:"",label:"#",width:50,render:function(e,t){var a=t.$index;return a+1}},{prop:"coin",label:i("th_source"),"min-width":"140px",render:function(e,t){var a=t.row;return Object(c["createVNode"])(Object(c["resolveComponent"])("router-link"),{class:"flex-row flex-items-center",to:Object(o["c"])("/currency/".concat(a.currency,"/"))},{default:function(){return[Object(c["createVNode"])("img",{src:"https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",alt:a.currency,width:"24",height:"24"},null),Object(c["createVNode"])("span",{class:"mr8 ml4",style:"color: var(--text-color-1)"},[a.coin]),Object(c["createVNode"])("span",{class:"text-uppercase color-light"},[a.currency])]}})}},{prop:"price",align:"right",label:i("th_pairs")},{prop:"price",align:"right",label:i("th_price")},{prop:"1h",align:"right",label:i("th_depth")},{prop:"24h",align:"right",label:i("th_depth")},{prop:"7d",align:"right",label:i("th_vol")},{prop:"vol",align:"right",width:170,label:"".concat(i("th_vol"),"%")},{prop:"market",align:"right",width:170,renderHeader:function(){return Object(c["createVNode"])(U,null,null)},render:function(){return Object(c["createVNode"])("span",Object(c["mergeProps"])({class:"tag"},{class:"tag-low"}),[i("tag_low")])}},{prop:"last7d",align:"right",label:i("th_liquidity"),renderHeader:function(){return Object(c["createVNode"])(K,null,null)}},{prop:"last7d",align:"right",label:i("th_updated")}],data:[{coin:"Bitcoin",label:"bit",market:"$28,047,254,195",currency:"BTC","1h":"-0.4","24h":"12",price:"21312312313",vol:"123123"},{coin:"Bitcoin",label:"bit",market:"$28,047,254,195",currency:"BTC","1h":"-0.4","24h":"12"},{coin:"Bitcoin",label:"bit",market:"$28,047,254,195",currency:"BTC","1h":"-0.4","24h":"12"},{coin:"Bitcoin",label:"bit",market:"$28,047,254,195",currency:"BTC","1h":"-0.4","24h":"12"}],page:1,pages:{current:1,size:100,total:1e4}}),s={getList:function(){},sizeChange:function(e){u.pages.size=e},pageChange:function(e){e!==u.page&&(u.page=e,s.getList())}},p={t:i,state:u,methods:s,reactive:c["reactive"],useI18n:n["b"],replacePath:o["c"],cTable:G["a"],ArrowRight:l["a"],confidenceTipDom:U,liquidityTipDom:K};return Object.defineProperty(p,"__isScriptSetup",{enumerable:!1,value:!0}),p}};a("e616");Q.__scopeId="data-v-b468ebc8";var Y=Q,ee={props:{vertical:{type:Boolean,default:!0}},setup:function(e,t){var a=t.expose;a();var c={};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}};a("9ca6");ee.__scopeId="data-v-6140b62f";var te=ee,ae={setup:function(e,t){var a=t.expose;a();var c=Object(n["b"])(),r=c.t,i={t:r,useI18n:n["b"],replacePath:o["c"],ArrowRight:l["a"],newsCard:te};return Object.defineProperty(i,"__isScriptSetup",{enumerable:!1,value:!0}),i}};a("7cb6");ae.__scopeId="data-v-27496312";var ce=ae,re={setup:function(e,t){var a=t.expose;a();var l=Object(r["c"])(),u=Object(n["b"])(),p=u.t,b=Object(c["reactive"])({breadcrumb:[{path:Object(o["c"])("/"),label:p("nav_home")},{path:"",label:l.params.coin}]}),v={route:l,t:p,state:b,reactive:c["reactive"],useRoute:r["c"],useI18n:n["b"],replacePath:o["c"],layoutDefault:i["a"],breadcrumb:s,coinInfo:f,coinTags:h,marketCap:g,chart:S,priceStatistics:x,trendList:$,converter:M,coinIntroduce:F,marketTable:Y,news:ce};return Object.defineProperty(v,"__isScriptSetup",{enumerable:!1,value:!0}),v}};a("9c59");re.__scopeId="data-v-074bc6e9";t["default"]=re},"726e":function(e,t,a){"use strict";a("fc35")},"7cb6":function(e,t,a){"use strict";a("5725")},8142:function(e,t,a){},"8a79":function(e,t,a){"use strict";var c=a("23e7"),r=a("e330"),n=a("06cf").f,o=a("50c4"),i=a("577e"),l=a("5a34"),u=a("1d80"),s=a("ab13"),p=a("c430"),b=r("".endsWith),v=r("".slice),d=Math.min,f=s("endsWith"),_=!p&&!f&&!!function(){var e=n(String.prototype,"endsWith");return e&&!e.writable}();c({target:"String",proto:!0,forced:!_&&!f},{endsWith:function(e){var t=i(u(this));l(e);var a=arguments.length>1?arguments[1]:void 0,c=t.length,r=void 0===a?c:d(o(a),c),n=i(e);return b?b(t,n,r):v(t,r-n.length,r)===n}})},"8e38":function(e,t,a){},"94d8":function(e,t,a){},"97ea":function(e,t,a){"use strict";a("02ac")},"9bad":function(e,t,a){"use strict";a("e862")},"9c59":function(e,t,a){"use strict";a("54c8")},"9ca6":function(e,t,a){"use strict";a("53ef")},"9ee5":function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var c=(e,t)=>{const a=e.__vccOpts||e;for(const[c,r]of t)a[c]=r;return a}},a4e3:function(e,t,a){"use strict";var c=a("7a23"),r=a("47e2"),n=a("4a4e"),o={setup:function(e,t){var a=t.expose;a();var c=Object(r["b"])(),n=c.t,o={t:n,useI18n:r["b"]};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}};a("54e3");o.__scopeId="data-v-fd69393a";var i=o,l={setup:function(e,t){var a=t.expose;a();var o=Object(r["b"])(),l=o.t,u=Object(c["reactive"])({list:[{label:l("game_fi_crptos"),value:""},{label:l("exchanges"),value:""},{label:l("market_cap"),value:"$2,395,282,218,685"},{label:l("24vol"),value:"$73,105,696,693"},{label:l("dominance"),value:"BTC: 40.1% ETH: 20.2%"},{label:l("gas"),value:"41 Gwei",tooltip:!0}]}),s={t:l,state:u,reactive:c["reactive"],useI18n:r["b"],CaretBottom:n["a"],iGwei:i};return Object.defineProperty(s,"__isScriptSetup",{enumerable:!1,value:!0}),s}};a("374f");l.__scopeId="data-v-d2bf5e2a";var u=l,s=(a("8a79"),a("6c02")),p=(a("b0c0"),{props:{name:{type:String,required:!0},color:{type:String,default:"currentColor"}},setup:function(e){var t={logo:Object(c["createVNode"])("svg",{width:"92",height:"39",viewBox:"0 0 92 39",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[Object(c["createVNode"])("path",{d:"M14.3828 27.6914H7.32812L6.35742 31H0.0273438L7.56055 10.957H14.3145L21.8477 31H15.3672L14.3828 27.6914ZM13.084 23.3574L10.8691 16.1523L8.66797 23.3574H13.084ZM36.1758 27.6914H29.1211L28.1504 31H21.8203L29.3535 10.957H36.1074L43.6406 31H37.1602L36.1758 27.6914ZM34.877 23.3574L32.6621 16.1523L30.4609 23.3574H34.877ZM45.5684 10.957H53.7168L56.8613 23.1523L59.9922 10.957H68.1133V31H63.0547V15.7148L59.1309 31H54.5508L50.6406 15.7148V31H45.5684V10.957ZM85.4219 22.8105L90.8496 24.4512C90.485 25.9733 89.9108 27.2448 89.127 28.2656C88.3431 29.2865 87.3678 30.0566 86.2012 30.5762C85.0436 31.0957 83.5671 31.3555 81.7715 31.3555C79.5931 31.3555 77.8112 31.041 76.4258 30.4121C75.0495 29.7741 73.86 28.6576 72.8574 27.0625C71.8548 25.4674 71.3535 23.4258 71.3535 20.9375C71.3535 17.6198 72.2331 15.0723 73.9922 13.2949C75.7604 11.5085 78.2578 10.6152 81.4844 10.6152C84.0091 10.6152 85.9915 11.1257 87.4316 12.1465C88.8809 13.1673 89.9564 14.735 90.6582 16.8496L85.1895 18.0664C84.998 17.4557 84.7975 17.0091 84.5879 16.7266C84.2415 16.2526 83.8177 15.888 83.3164 15.6328C82.8151 15.3776 82.2546 15.25 81.6348 15.25C80.2311 15.25 79.1556 15.8151 78.4082 16.9453C77.8431 17.7839 77.5605 19.1009 77.5605 20.8965C77.5605 23.1204 77.8978 24.6471 78.5723 25.4766C79.2467 26.2969 80.1947 26.707 81.416 26.707C82.6009 26.707 83.4941 26.3743 84.0957 25.709C84.7064 25.0436 85.1484 24.0775 85.4219 22.8105Z",fill:e.color},null)])};return function(){return t[e.name]?t[e.name]:""}}}),b=p,v=a("3aee"),d={setup:function(e,t){var a=t.expose;a();var n=Object(s["c"])(),o=Object(r["b"])(),i=o.t,l=Object(c["reactive"])({route_list:[{id:Object(v["c"])("/"),name:i("nav_home")},{id:Object(v["c"])("/information/"),name:i("nav_information")},{id:Object(v["c"])("/strategy/"),name:i("nav_strategy")},{id:Object(v["c"])("/learn/"),name:i("nav_learn")},{id:Object(v["c"])("/about-us/"),name:i("nav_about_us")}]}),u=Object(c["computed"])((function(){return n.path.endsWith("/")?n.path:"".concat(n.path,"/")})),p={route:n,t:i,state:l,path:u,reactive:c["reactive"],computed:c["computed"],useRoute:s["c"],useI18n:r["b"],svgIcon:b,replacePath:v["c"]};return Object.defineProperty(p,"__isScriptSetup",{enumerable:!1,value:!0}),p}};a("3418");d.__scopeId="data-v-ff3779f8";var f=d,_=a("9ee5");const h=Object(c["defineComponent"])({name:"Promotion"}),m={class:"icon",width:"200",height:"200",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},g=Object(c["createElementVNode"])("path",{fill:"currentColor",d:"M64 448l832-320-128 704-446.08-243.328L832 192 242.816 545.472 64 448zm256 512V657.024L512 768 320 960z"},null,-1),O=[g];function j(e,t,a,r,n,o){return Object(c["openBlock"])(),Object(c["createElementBlock"])("svg",m,O)}var y=Object(_["a"])(h,[["render",j]]),w={props:{showFooter:{type:Boolean,default:!0}},setup:function(e,t){var a=t.expose;a();var c={headerMarket:u,headerNav:f,svgIcon:b,Promotion:y};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}};a("9bad");w.__scopeId="data-v-0e480c99";t["a"]=w},b0ab:function(e,t,a){"use strict";a("b8ac")},b0c0:function(e,t,a){var c=a("83ab"),r=a("5e77").EXISTS,n=a("e330"),o=a("9bf2").f,i=Function.prototype,l=n(i.toString),u=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,s=n(u.exec),p="name";c&&!r&&o(i,p,{configurable:!0,get:function(){try{return s(u,l(this))[1]}catch(e){return""}}})},b8ac:function(e,t,a){},bb1a:function(e,t,a){},c35a4:function(e,t,a){},cf97:function(e,t,a){},d9ed:function(e,t,a){"use strict";a("52af")},e425:function(e,t,a){"use strict";a("0627")},e616:function(e,t,a){"use strict";a("1af1")},e862:function(e,t,a){},edd2:function(e,t,a){"use strict";a("8142")},f9cc:function(e,t,a){"use strict";a("c35a4")},fc35:function(e,t,a){},ffe2:function(e,t,a){}}]);