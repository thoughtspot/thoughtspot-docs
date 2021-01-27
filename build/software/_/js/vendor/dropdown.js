!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery"),require("popper.js"),require("./util.js")):"function"==typeof define&&define.amd?define(["jquery","popper.js","./util.js"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).Dropdown=t(e.jQuery,e.Popper,e.Util)}(this,function(e,t,n){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var f=r(e),o=r(t),i=r(n);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,r=arguments[t];for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l="dropdown",d="bs.dropdown",h="."+d,e=".data-api",u=f.default.fn[l],p=new RegExp("38|40|27"),c="hide"+h,g="hidden"+h,t="click"+h+e,n="keydown"+h+e,m="disabled",_="show",y="dropdown-menu-right",v='[data-toggle="dropdown"]',b=".dropdown-menu",w={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic",popperConfig:null},C={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string",popperConfig:"(null|object)"},E=function(){function u(e,t){this._element=e,this._popper=null,this._config=this._getConfig(t),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var e,t,n=u.prototype;return n.toggle=function(){var e;this._element.disabled||f.default(this._element).hasClass(m)||(e=f.default(this._menu).hasClass(_),u._clearMenus(),e||this.show(!0))},n.show=function(e){if(void 0===e&&(e=!1),!(this._element.disabled||f.default(this._element).hasClass(m)||f.default(this._menu).hasClass(_))){var t={relatedTarget:this._element},n=f.default.Event("show.bs.dropdown",t),r=u._getParentFromElement(this._element);if(f.default(r).trigger(n),!n.isDefaultPrevented()){if(!this._inNavbar&&e){if(void 0===o.default)throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");e=this._element;"parent"===this._config.reference?e=r:i.default.isElement(this._config.reference)&&(e=this._config.reference,void 0!==this._config.reference.jquery&&(e=this._config.reference[0])),"scrollParent"!==this._config.boundary&&f.default(r).addClass("position-static"),this._popper=new o.default(e,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===f.default(r).closest(".navbar-nav").length&&f.default(document.body).children().on("mouseover",null,f.default.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),f.default(this._menu).toggleClass(_),f.default(r).toggleClass(_).trigger(f.default.Event("shown.bs.dropdown",t))}}},n.hide=function(){var e,t,n;this._element.disabled||f.default(this._element).hasClass(m)||!f.default(this._menu).hasClass(_)||(e={relatedTarget:this._element},t=f.default.Event(c,e),n=u._getParentFromElement(this._element),f.default(n).trigger(t),t.isDefaultPrevented()||(this._popper&&this._popper.destroy(),f.default(this._menu).toggleClass(_),f.default(n).toggleClass(_).trigger(f.default.Event(g,e))))},n.dispose=function(){f.default.removeData(this._element,d),f.default(this._element).off(h),this._element=null,(this._menu=null)!==this._popper&&(this._popper.destroy(),this._popper=null)},n.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},n._addEventListeners=function(){var t=this;f.default(this._element).on("click.bs.dropdown",function(e){e.preventDefault(),e.stopPropagation(),t.toggle()})},n._getConfig=function(e){return e=a({},this.constructor.Default,f.default(this._element).data(),e),i.default.typeCheckConfig(l,e,this.constructor.DefaultType),e},n._getMenuElement=function(){var e;return this._menu||(e=u._getParentFromElement(this._element))&&(this._menu=e.querySelector(b)),this._menu},n._getPlacement=function(){var e=f.default(this._element.parentNode),t="bottom-start";return e.hasClass("dropup")?t=f.default(this._menu).hasClass(y)?"top-end":"top-start":e.hasClass("dropright")?t="right-start":e.hasClass("dropleft")?t="left-start":f.default(this._menu).hasClass(y)&&(t="bottom-end"),t},n._detectNavbar=function(){return 0<f.default(this._element).closest(".navbar").length},n._getOffset=function(){var t=this,e={};return"function"==typeof this._config.offset?e.fn=function(e){return e.offsets=a({},e.offsets,t._config.offset(e.offsets,t._element)||{}),e}:e.offset=this._config.offset,e},n._getPopperConfig=function(){var e={placement:this._getPlacement(),modifiers:{offset:this._getOffset(),flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(e.modifiers.applyStyle={enabled:!1}),a({},e,this._config.popperConfig)},u._jQueryInterface=function(t){return this.each(function(){var e=f.default(this).data(d);if(e||(e=new u(this,"object"==typeof t?t:null),f.default(this).data(d,e)),"string"==typeof t){if(void 0===e[t])throw new TypeError('No method named "'+t+'"');e[t]()}})},u._clearMenus=function(e){if(!e||3!==e.which&&("keyup"!==e.type||9===e.which))for(var t=[].slice.call(document.querySelectorAll(v)),n=0,r=t.length;n<r;n++){var o,i,a=u._getParentFromElement(t[n]),s=f.default(t[n]).data(d),l={relatedTarget:t[n]};e&&"click"===e.type&&(l.clickEvent=e),s&&(o=s._menu,f.default(a).hasClass(_)&&(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&9===e.which)&&f.default.contains(a,e.target)||(i=f.default.Event(c,l),f.default(a).trigger(i),i.isDefaultPrevented()||("ontouchstart"in document.documentElement&&f.default(document.body).children().off("mouseover",null,f.default.noop),t[n].setAttribute("aria-expanded","false"),s._popper&&s._popper.destroy(),f.default(o).removeClass(_),f.default(a).removeClass(_).trigger(f.default.Event(g,l))))))}},u._getParentFromElement=function(e){var t,n=i.default.getSelectorFromElement(e);return n&&(t=document.querySelector(n)),t||e.parentNode},u._dataApiKeydownHandler=function(e){if((/input|textarea/i.test(e.target.tagName)?!(32===e.which||27!==e.which&&(40!==e.which&&38!==e.which||f.default(e.target).closest(b).length)):p.test(e.which))&&!this.disabled&&!f.default(this).hasClass(m)){var t=u._getParentFromElement(this),n=f.default(t).hasClass(_);if(n||27!==e.which){if(e.preventDefault(),e.stopPropagation(),!n||27===e.which||32===e.which)return 27===e.which&&f.default(t.querySelector(v)).trigger("focus"),void f.default(this).trigger("click");n=[].slice.call(t.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function(e){return f.default(e).is(":visible")});0!==n.length&&(t=n.indexOf(e.target),38===e.which&&0<t&&t--,40===e.which&&t<n.length-1&&t++,t<0&&(t=0),n[t].focus())}}},e=u,t=[{key:"VERSION",get:function(){return"4.5.3"}},{key:"Default",get:function(){return w}},{key:"DefaultType",get:function(){return C}}],(n=null)&&s(e.prototype,n),t&&s(e,t),u}();return f.default(document).on(n,v,E._dataApiKeydownHandler).on(n,b,E._dataApiKeydownHandler).on(t+" keyup.bs.dropdown.data-api",E._clearMenus).on(t,v,function(e){e.preventDefault(),e.stopPropagation(),E._jQueryInterface.call(f.default(this),"toggle")}).on(t,".dropdown form",function(e){e.stopPropagation()}),f.default.fn[l]=E._jQueryInterface,f.default.fn[l].Constructor=E,f.default.fn[l].noConflict=function(){return f.default.fn[l]=u,E._jQueryInterface},E});
//# sourceMappingURL=dropdown.js.map