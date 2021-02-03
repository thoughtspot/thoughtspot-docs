!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("jquery"),require("popper.js"),require("./util.js")):"function"==typeof define&&define.amd?define(["jquery","popper.js","./util"],e):(t="undefined"!=typeof globalThis?globalThis:t||self).Tooltip=e(t.jQuery,t.Popper,t.Util)}(this,function(t,e,n){"use strict";function i(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var r=i(t),a=i(e),s=i(n);function l(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function u(){return(u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n,i=arguments[e];for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}).apply(this,arguments)}var c=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],n={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},f=/^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,h=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;function d(t,r,e){if(0===t.length)return t;if(e&&"function"==typeof e)return e(t);for(var t=(new window.DOMParser).parseFromString(t,"text/html"),a=Object.keys(r),s=[].slice.call(t.body.querySelectorAll("*")),n=function(t,e){var n=s[t],i=n.nodeName.toLowerCase();if(-1===a.indexOf(n.nodeName.toLowerCase()))return n.parentNode.removeChild(n),"continue";var t=[].slice.call(n.attributes),o=[].concat(r["*"]||[],r[i]||[]);t.forEach(function(t){!function(t,e){var n=t.nodeName.toLowerCase();if(-1!==e.indexOf(n))return-1===c.indexOf(n)||Boolean(t.nodeValue.match(f)||t.nodeValue.match(h));for(var i=e.filter(function(t){return t instanceof RegExp}),o=0,r=i.length;o<r;o++)if(n.match(i[o]))return 1}(t,o)&&n.removeAttribute(t.nodeName)})},i=0,o=s.length;i<o;i++)n(i);return t.body.innerHTML}var g="tooltip",p="bs.tooltip",m="."+p,o=r.default.fn[g],v="bs-tooltip",_=new RegExp("(^|\\s)"+v+"\\S+","g"),E=["sanitize","whiteList","sanitizeFn"],T={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string|function)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)",customClass:"(string|function)",sanitize:"boolean",sanitizeFn:"(null|function)",whiteList:"object",popperConfig:"(null|object)"},b={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},y={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent",customClass:"",sanitize:!0,sanitizeFn:null,whiteList:n,popperConfig:null},C="show",w="out",A={HIDE:"hide"+m,HIDDEN:"hidden"+m,SHOW:"show"+m,SHOWN:"shown"+m,INSERTED:"inserted"+m,CLICK:"click"+m,FOCUSIN:"focusin"+m,FOCUSOUT:"focusout"+m,MOUSEENTER:"mouseenter"+m,MOUSELEAVE:"mouseleave"+m},S="fade",O="show",D="hover",N="focus",j=function(){function o(t,e){if(void 0===a.default)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}var t,e,n=o.prototype;return n.enable=function(){this._isEnabled=!0},n.disable=function(){this._isEnabled=!1},n.toggleEnabled=function(){this._isEnabled=!this._isEnabled},n.toggle=function(t){var e,n;this._isEnabled&&(t?(e=this.constructor.DATA_KEY,(n=r.default(t.currentTarget).data(e))||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),r.default(t.currentTarget).data(e,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)):r.default(this.getTipElement()).hasClass(O)?this._leave(null,this):this._enter(null,this))},n.dispose=function(){clearTimeout(this._timeout),r.default.removeData(this.element,this.constructor.DATA_KEY),r.default(this.element).off(this.constructor.EVENT_KEY),r.default(this.element).closest(".modal").off("hide.bs.modal",this._hideModalHandler),this.tip&&r.default(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},n.show=function(){var e=this;if("none"===r.default(this.element).css("display"))throw new Error("Please use show on visible elements");var t,n,i=r.default.Event(this.constructor.Event.SHOW);this.isWithContent()&&this._isEnabled&&(r.default(this.element).trigger(i),n=s.default.findShadowRoot(this.element),t=r.default.contains(null!==n?n:this.element.ownerDocument.documentElement,this.element),!i.isDefaultPrevented()&&t&&(n=this.getTipElement(),i=s.default.getUID(this.constructor.NAME),n.setAttribute("id",i),this.element.setAttribute("aria-describedby",i),this.setContent(),this.config.animation&&r.default(n).addClass(S),t="function"==typeof this.config.placement?this.config.placement.call(this,n,this.element):this.config.placement,i=this._getAttachment(t),this.addAttachmentClass(i),t=this._getContainer(),r.default(n).data(this.constructor.DATA_KEY,this),r.default.contains(this.element.ownerDocument.documentElement,this.tip)||r.default(n).appendTo(t),r.default(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new a.default(this.element,n,this._getPopperConfig(i)),r.default(n).addClass(O),r.default(n).addClass(this.config.customClass),"ontouchstart"in document.documentElement&&r.default(document.body).children().on("mouseover",null,r.default.noop),i=function(){e.config.animation&&e._fixTransition();var t=e._hoverState;e._hoverState=null,r.default(e.element).trigger(e.constructor.Event.SHOWN),t===w&&e._leave(null,e)},r.default(this.tip).hasClass(S)?(n=s.default.getTransitionDurationFromElement(this.tip),r.default(this.tip).one(s.default.TRANSITION_END,i).emulateTransitionEnd(n)):i()))},n.hide=function(t){function e(){n._hoverState!==C&&i.parentNode&&i.parentNode.removeChild(i),n._cleanTipClass(),n.element.removeAttribute("aria-describedby"),r.default(n.element).trigger(n.constructor.Event.HIDDEN),null!==n._popper&&n._popper.destroy(),t&&t()}var n=this,i=this.getTipElement(),o=r.default.Event(this.constructor.Event.HIDE);r.default(this.element).trigger(o),o.isDefaultPrevented()||(r.default(i).removeClass(O),"ontouchstart"in document.documentElement&&r.default(document.body).children().off("mouseover",null,r.default.noop),this._activeTrigger.click=!1,this._activeTrigger[N]=!1,this._activeTrigger[D]=!1,r.default(this.tip).hasClass(S)?(o=s.default.getTransitionDurationFromElement(i),r.default(i).one(s.default.TRANSITION_END,e).emulateTransitionEnd(o)):e(),this._hoverState="")},n.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},n.isWithContent=function(){return Boolean(this.getTitle())},n.addAttachmentClass=function(t){r.default(this.getTipElement()).addClass(v+"-"+t)},n.getTipElement=function(){return this.tip=this.tip||r.default(this.config.template)[0],this.tip},n.setContent=function(){var t=this.getTipElement();this.setElementContent(r.default(t.querySelectorAll(".tooltip-inner")),this.getTitle()),r.default(t).removeClass(S+" "+O)},n.setElementContent=function(t,e){"object"!=typeof e||!e.nodeType&&!e.jquery?this.config.html?(this.config.sanitize&&(e=d(e,this.config.whiteList,this.config.sanitizeFn)),t.html(e)):t.text(e):this.config.html?r.default(e).parent().is(t)||t.empty().append(e):t.text(r.default(e).text())},n.getTitle=function(){return this.element.getAttribute("data-original-title")||("function"==typeof this.config.title?this.config.title.call(this.element):this.config.title)},n._getPopperConfig=function(t){var e=this;return u({},{placement:t,modifiers:{offset:this._getOffset(),flip:{behavior:this.config.fallbackPlacement},arrow:{element:".arrow"},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){return e._handlePopperPlacementChange(t)}},this.config.popperConfig)},n._getOffset=function(){var e=this,t={};return"function"==typeof this.config.offset?t.fn=function(t){return t.offsets=u({},t.offsets,e.config.offset(t.offsets,e.element)||{}),t}:t.offset=this.config.offset,t},n._getContainer=function(){return!1===this.config.container?document.body:s.default.isElement(this.config.container)?r.default(this.config.container):r.default(document).find(this.config.container)},n._getAttachment=function(t){return b[t.toUpperCase()]},n._setListeners=function(){var n=this;this.config.trigger.split(" ").forEach(function(t){var e;"click"===t?r.default(n.element).on(n.constructor.Event.CLICK,n.config.selector,function(t){return n.toggle(t)}):"manual"!==t&&(e=t===D?n.constructor.Event.MOUSEENTER:n.constructor.Event.FOCUSIN,t=t===D?n.constructor.Event.MOUSELEAVE:n.constructor.Event.FOCUSOUT,r.default(n.element).on(e,n.config.selector,function(t){return n._enter(t)}).on(t,n.config.selector,function(t){return n._leave(t)}))}),this._hideModalHandler=function(){n.element&&n.hide()},r.default(this.element).closest(".modal").on("hide.bs.modal",this._hideModalHandler),this.config.selector?this.config=u({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},n._fixTitle=function(){var t=typeof this.element.getAttribute("data-original-title");!this.element.getAttribute("title")&&"string"==t||(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},n._enter=function(t,e){var n=this.constructor.DATA_KEY;(e=e||r.default(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),r.default(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusin"===t.type?N:D]=!0),r.default(e.getTipElement()).hasClass(O)||e._hoverState===C?e._hoverState=C:(clearTimeout(e._timeout),e._hoverState=C,e.config.delay&&e.config.delay.show?e._timeout=setTimeout(function(){e._hoverState===C&&e.show()},e.config.delay.show):e.show())},n._leave=function(t,e){var n=this.constructor.DATA_KEY;(e=e||r.default(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),r.default(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusout"===t.type?N:D]=!1),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState=w,e.config.delay&&e.config.delay.hide?e._timeout=setTimeout(function(){e._hoverState===w&&e.hide()},e.config.delay.hide):e.hide())},n._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},n._getConfig=function(t){var e=r.default(this.element).data();return Object.keys(e).forEach(function(t){-1!==E.indexOf(t)&&delete e[t]}),"number"==typeof(t=u({},this.constructor.Default,e,"object"==typeof t&&t?t:{})).delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),s.default.typeCheckConfig(g,t,this.constructor.DefaultType),t.sanitize&&(t.template=d(t.template,t.whiteList,t.sanitizeFn)),t},n._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},n._cleanTipClass=function(){var t=r.default(this.getTipElement()),e=t.attr("class").match(_);null!==e&&e.length&&t.removeClass(e.join(""))},n._handlePopperPlacementChange=function(t){this.tip=t.instance.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},n._fixTransition=function(){var t=this.getTipElement(),e=this.config.animation;null===t.getAttribute("x-placement")&&(r.default(t).removeClass(S),this.config.animation=!1,this.hide(),this.show(),this.config.animation=e)},o._jQueryInterface=function(i){return this.each(function(){var t=r.default(this),e=t.data(p),n="object"==typeof i&&i;if((e||!/dispose|hide/.test(i))&&(e||(e=new o(this,n),t.data(p,e)),"string"==typeof i)){if(void 0===e[i])throw new TypeError('No method named "'+i+'"');e[i]()}})},t=o,e=[{key:"VERSION",get:function(){return"4.6.0"}},{key:"Default",get:function(){return y}},{key:"NAME",get:function(){return g}},{key:"DATA_KEY",get:function(){return p}},{key:"Event",get:function(){return A}},{key:"EVENT_KEY",get:function(){return m}},{key:"DefaultType",get:function(){return T}}],(n=null)&&l(t.prototype,n),e&&l(t,e),o}();return r.default.fn[g]=j._jQueryInterface,r.default.fn[g].Constructor=j,r.default.fn[g].noConflict=function(){return r.default.fn[g]=o,j._jQueryInterface},j});
//# sourceMappingURL=tooltip.js.map