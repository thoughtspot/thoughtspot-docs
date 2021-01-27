!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery"),require("./util.js")):"function"==typeof define&&define.amd?define(["jquery","./util.js"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).Tab=t(e.jQuery,e.Util)}(this,function(e,t){"use strict";function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var d=a(e),o=a(t);function l(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var n="tab",r="bs.tab",t="."+r,i=d.default.fn[n],u="active",s="fade",f="show",c=".active",m="> li > .active",h=function(){function n(e){this._element=e}var e,t,a=n.prototype;return a.show=function(){var e,t,a,n,l,r,i=this;this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&d.default(this._element).hasClass(u)||d.default(this._element).hasClass("disabled")||(r=d.default(this._element).closest(".nav, .list-group")[0],t=o.default.getSelectorFromElement(this._element),r&&(l="UL"===r.nodeName||"OL"===r.nodeName?m:c,a=(a=d.default.makeArray(d.default(r).find(l)))[a.length-1]),n=d.default.Event("hide.bs.tab",{relatedTarget:this._element}),l=d.default.Event("show.bs.tab",{relatedTarget:a}),a&&d.default(a).trigger(n),d.default(this._element).trigger(l),l.isDefaultPrevented()||n.isDefaultPrevented()||(t&&(e=document.querySelector(t)),this._activate(this._element,r),r=function(){var e=d.default.Event("hidden.bs.tab",{relatedTarget:i._element}),t=d.default.Event("shown.bs.tab",{relatedTarget:a});d.default(a).trigger(e),d.default(i._element).trigger(t)},e?this._activate(e,e.parentNode,r):r()))},a.dispose=function(){d.default.removeData(this._element,r),this._element=null},a._activate=function(e,t,a){var n=this,l=(!t||"UL"!==t.nodeName&&"OL"!==t.nodeName?d.default(t).children(c):d.default(t).find(m))[0],r=a&&l&&d.default(l).hasClass(s),t=function(){return n._transitionComplete(e,l,a)};l&&r?(r=o.default.getTransitionDurationFromElement(l),d.default(l).removeClass(f).one(o.default.TRANSITION_END,t).emulateTransitionEnd(r)):t()},a._transitionComplete=function(e,t,a){var n;t&&(d.default(t).removeClass(u),(n=d.default(t.parentNode).find("> .dropdown-menu .active")[0])&&d.default(n).removeClass(u),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!1)),d.default(e).addClass(u),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!0),o.default.reflow(e),e.classList.contains(s)&&e.classList.add(f),e.parentNode&&d.default(e.parentNode).hasClass("dropdown-menu")&&((t=d.default(e).closest(".dropdown")[0])&&(t=[].slice.call(t.querySelectorAll(".dropdown-toggle")),d.default(t).addClass(u)),e.setAttribute("aria-expanded",!0)),a&&a()},n._jQueryInterface=function(a){return this.each(function(){var e=d.default(this),t=e.data(r);if(t||(t=new n(this),e.data(r,t)),"string"==typeof a){if(void 0===t[a])throw new TypeError('No method named "'+a+'"');t[a]()}})},e=n,t=[{key:"VERSION",get:function(){return"4.5.3"}}],(a=null)&&l(e.prototype,a),t&&l(e,t),n}();return d.default(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',function(e){e.preventDefault(),h._jQueryInterface.call(d.default(this),"show")}),d.default.fn[n]=h._jQueryInterface,d.default.fn[n].Constructor=h,d.default.fn[n].noConflict=function(){return d.default.fn[n]=i,h._jQueryInterface},h});
//# sourceMappingURL=tab.js.map