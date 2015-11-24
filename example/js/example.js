/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)
	__webpack_require__(5)
	__webpack_require__(7)
	var tabify = __webpack_require__(9)
	var Overlay = __webpack_require__(11)
	var spin = __webpack_require__(18)
	var Notice = __webpack_require__(52)
	var template = __webpack_require__(58)
	var data = __webpack_require__(59)
	var Grid = __webpack_require__(60)
	var Pager = __webpack_require__(79)
	var classes = __webpack_require__(16)
	__webpack_require__(85)
	
	var el = document.getElementById('tabs')
	tabify(el)
	
	var placeholder = document.getElementById('tab1')
	placeholder.className = 'shows-table'
	var grid = new Grid(template, {
	  perpage: 10,
	  filters: {
	    percentage: function (val) {
	      return (val*100).toFixed() + '%'
	    }
	  },
	  bindings: {
	    react: function (prop) {
	      this.bind('$stat', function (model, el) {
	        var changed = model.changed()
	        if (prop === '$stat') {
	          el.disabled = changed === false ? true : false
	        } else {
	          if (changed && changed.hasOwnProperty(prop)) {
	            classes(el).add('dirty')
	          } else {
	            classes(el).remove('dirty')
	          }
	        }
	      })
	    }
	  },
	  delegate: {
	    setActive: function (model, el) {
	      el.innerHTML = ''
	      var cb = document.createElement('input')
	      cb.type = 'checkbox'
	      cb.checked = model.isActive
	      cb.addEventListener('change', function () {
	        // save value to model
	        model.isActive = cb.checked
	      }, false)
	      el.appendChild(cb)
	    }
	  }
	})
	grid.local()
	
	grid.bind('click', 'button.save',function (e, model) {
	  if (e.delegateTarget.disabled) return
	  var changed = model.changed()
	  overlay.show()
	  var s = spin(overlay.el).text('saving')
	  if (changed) {
	    setTimeout(function () {
	      s.remove()
	      overlay.hide()
	      Notice('saved', {
	        type: 'success',
	        closable: false,
	        duration: 2000
	      })
	      // mark model as clean
	      model.clean()
	    }, 500)
	  }
	})
	
	grid.bind('click', 'td.money',function (e, model) {
	  var el = e.target
	  el.innerHTML = '<input style="width:100%;" type="number" required  min="0.00" value="' + model.money + '">'
	  var input = el.children[0]
	  input.focus()
	  var save = function () {
	    var v = Number(input.value)
	    model.money = v
	  }
	  input.addEventListener('keyup', function (e) {
	    if (e.which === 13) {
	      input.blur()
	    }
	  })
	  input.addEventListener('blur', save)
	})
	
	var overlay = Overlay(grid.el)
	placeholder.appendChild(grid.el)
	var pager = Pager(grid)
	placeholder.appendChild(pager.el)
	grid.setData(data)
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../css-loader/index.js!./overlay.css", function() {
				var newContent = require("!!./../css-loader/index.js!./overlay.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "\r\n.overlay {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  opacity: 1;\r\n  width: 100%;\r\n  height: 100%;\r\n  background: rgba(0,0,0,.75);\r\n  -webkit-transition: opacity 300ms;\r\n  -moz-transition: opacity 300ms;\r\n  transition: opacity 300ms;\r\n  z-index: 500;\r\n}\r\n\r\n.overlay.hidden {\r\n  pointer-events: none;\r\n  opacity: 0;\r\n}\r\n\r\n.overlay.closable {\r\n  cursor: pointer;\r\n}\r\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../css-loader/index.js!./notice.css", function() {
				var newContent = require("!!./../css-loader/index.js!./notice.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".notice-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 999999;\n}\n.notice-container .notice-item {\n  position: relative;\n  font: 500 16px/1.8 \"Georgia\",\"Xin Gothic\",\"Hiragino Sans GB\",\"WenQuanYi Micro Hei\",sans-serif;\n  background: #fefefe;\n  background: rgba(255,255,255,0.9);\n  color: #565656;\n  padding: 10px 20px;\n  box-sizing: border-box;\n  border-bottom: 1px solid #efefef;\n  text-align: center;\n  transition: all .2s ease-in-out;\n  transform-origin: top;\n}\n/* colors from bootstrap */\n.notice-container .notice-warning {\n  background: #fcf8e3;\n  background: rgba(252, 248, 227, 0.9);\n  border-color: #fbeed5;\n  color: #c09853;\n}\n\n.notice-container .notice-success {\n  background: #EAFBE3;\n  background: rgba(221, 242, 210, 0.9);\n  border-color: #D6E9C6;\n  color: #3FB16F;\n}\n\n.notice-container .notice-danger,\n.notice-container .notice-error {\n  background: #f2dede;\n  background: rgba(242, 222, 222, 0.9);\n  border-color: #ebccd1;\n  color: #a94442;\n}\n\n.notice-container .notice-content {\n  color: inherit;\n  text-decoration: none;\n  margin: 0 auto;\n  max-width: 650px;\n}\n.notice-container .notice-close {\n  position: absolute;\n  top: 5px;\n  height: 40px;\n  right: 20px;\n  width: 40px;\n  cursor: pointer;\n  font: 400 normal 22px/40px \"Arial\", sans-serif;\n  color: rgba(231, 76, 60, 0.6);\n}\n.notice-container .notice-dismiss {\n  transform: rotateX(-75deg);\n  opacity: 0;\n}\n", ""]);
	
	// exports


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../css-loader/index.js!./pager.css", function() {
				var newContent = require("!!./../css-loader/index.js!./pager.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".pager {\n  margin-top: 10px;\n  padding: 0;\n  font-size: 14px;\n}\n\n.pager li {\n  display: inline-block;\n}\n\nli.prev.pager-hide a,\nli.next.pager-hide a {\n  color: #999;\n  border-color: #999;\n}\n.pager li.active a {\n  font-weight: bold;\n  border-color: #ddd;\n}\n.pager li a {\n  text-decoration: none;\n  border-radius: 3px;\n  padding: 3px 8px;\n  margin: 0 2px;\n  color: #444;\n}\n\n.pager li.prev a,\n.pager li.next a{\n  font-weight: bolder;\n  border: 1px solid #eee;\n}\n\n\n", ""]);
	
	// exports


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 *
	 * tabify
	 *
	 * MIT licence
	 *
	 */
	
	/**
	 * Module dependencies.
	 */
	
	var Emitter = __webpack_require__(10)
	
	/**
	 * Exports.
	 */
	
	module.exports = tabify
	
	/**
	 * Convert a list to tabs.
	 *
	 * @param {Element} el
	 * @return {Object} tabs
	 * @api public
	 */
	
	function tabify (el) {
	  var links = []
	  var targets = []
	
	  var tabs = {}
	
	  Emitter(tabs)
	
	  /**
	   * Show tab of link `el`.
	   *
	   * @param {Element} el
	   * @api private
	   */
	
	  tabs.show = function (el) {
	    el.classList.add('active')
	    el.parentNode.classList.add('active')
	    el.__target.classList.remove('hide')
	    tabs.active = el
	    tabs.activeTarget = el.__target
	    tabs.activeTargetId = el.__targetId
	  }
	
	  /**
	   * Hide tab of link `el`.
	   *
	   * @param {Element} el
	   * @api private
	   */
	
	  tabs.hide = function (el) {
	    el.classList.remove('active')
	    el.parentNode.classList.remove('active')
	    el.__target.classList.add('hide')
	  }
	
	  /**
	   * Hide all tabs.
	   *
	   * @api private
	   */
	
	  tabs.hideAll = function () {
	    // change classes for new active
	    links.forEach(function (a) {
	      a.classList.remove('active')
	      a.parentNode.classList.remove('active')
	    })
	    targets.forEach(function (t) {
	      t.classList.add('hide')
	    })
	  }
	
	  /**
	   * Unbind all listeners.
	   *
	   * @api public
	   */
	
	  tabs.unbind = function () {
	    links.forEach(function (a) {
	      a.removeEventListener('click', tabs.onclick)
	    })
	    tabs.removeAllListeners('change')
	  }
	
	  /**
	   * onclick listener.
	   *
	   * @param {Event} ev [description]
	   * @api private
	   */
	
	  tabs.onclick = function (ev) {
	    // don't do the default (jump to anchor)
	    ev.preventDefault()
	    ev.stopPropagation()
	
	    // only emit if changed
	    if (tabs.active !== this) {
	      tabs.emit('change', this.__targetId, this.__target, this)
	      tabs.show(this)
	    }
	
	    tabs.hideAll()
	    tabs.show(this)
	
	    return false
	  }
	
	  // find tab links
	  var res = el.querySelectorAll('a')
	  var active = el.querySelectorAll('a.active')[0]
	
	  // make tabs
	  for (var i = 0; i < res.length; i++) {
	    var a = res[i]
	    var id = a.attributes.href.textContent
	
	    var target = document.getElementById(id.substr(1))
	    if (!target) continue
	
	    links.push(a)
	    targets.push(target)
	
	    a.__target = target
	    a.__targetId = id
	
	    if (active ? a === active : i == 0) tabs.show(a)
	    else tabs.hide(a)
	
	    a.addEventListener('click', tabs.onclick)
	  }
	
	  return tabs
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var Emitter = __webpack_require__(12);
	var tmpl = __webpack_require__(13);
	var domify = __webpack_require__(14);
	var event = __webpack_require__(15);
	var classes = __webpack_require__(16);
	
	/**
	 * Expose `overlay()`.
	 */
	
	exports = module.exports = overlay;
	
	/**
	 * Expose `Overlay`.
	 */
	
	exports.Overlay = Overlay;
	
	/**
	 * Return a new `Overlay` with the given `options`.
	 *
	 * @param {Object|Element} options
	 * @return {Overlay}
	 * @api public
	 */
	
	function overlay(options){
	  options = options || {};
	
	  // element
	  if (options.nodeName) {
	    options = { target: options };
	  }
	
	  return new Overlay(options);
	}
	
	/**
	 * Initialize a new `Overlay`.
	 *
	 * @param {Object} options
	 * @api public
	 */
	
	function Overlay(options) {
	  Emitter.call(this);
	  options = options || {};
	  this.target = options.target || document.body;
	  this.closable = options.closable;
	  this.el = domify(tmpl);
	  if (this.closable) {
		event.bind(this.el, 'click', this.hide.bind(this));
	    classes(this.el).add('closable');
	  }
	}
	
	/**
	 * Mixin emitter.
	 */
	
	Emitter(Overlay.prototype);
	
	/**
	 * Show the overlay.
	 *
	 * Emits "show" event.
	 *
	 * @return {Overlay}
	 * @api public
	 */
	
	Overlay.prototype.show = function(){
	  var self = this;
	
	  this.emit('show');
	  this.target.appendChild(this.el);
	
	  //class removed in a timeout to save animation
	  setTimeout( function () {
	  	classes(self.el).remove('hidden');
	  });
	
	  return this;
	};
	
	/**
	 * Hide the overlay.
	 *
	 * Emits "hide" event.
	 *
	 * @return {Overlay}
	 * @api public
	 */
	
	Overlay.prototype.hide = function(){
	  this.emit('hide');
	  return this.remove();
	};
	
	/**
	 * Hide the overlay without emitting "hide".
	 *
	 * Emits "close" event.
	 *
	 * @return {Overlay}
	 * @api public
	 */
	
	Overlay.prototype.remove = function(){
	  var self = this;
	  this.emit('close');
	  classes(this.el).add('hidden');
	  setTimeout(function(){
	    self.target.removeChild(self.el);
	  }, 350);
	  return this;
	};
	


/***/ },
/* 12 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};
	
	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<div class=\"overlay hidden\"></div>\r\n";

/***/ },
/* 14 */
/***/ function(module, exports) {

	
	/**
	 * Expose `parse`.
	 */
	
	module.exports = parse;
	
	/**
	 * Tests for browser support.
	 */
	
	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}
	
	/**
	 * Wrap map from jquery.
	 */
	
	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};
	
	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];
	
	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];
	
	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */
	
	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');
	
	  // default to the global `document` object
	  if (!doc) doc = document;
	
	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);
	
	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace
	
	  var tag = m[1];
	
	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }
	
	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;
	
	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }
	
	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }
	
	  return fragment;
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
	    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
	    prefix = bind !== 'addEventListener' ? 'on' : '';
	
	/**
	 * Bind `el` event `type` to `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.bind = function(el, type, fn, capture){
	  el[bind](prefix + type, fn, capture || false);
	  return fn;
	};
	
	/**
	 * Unbind `el` event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.unbind = function(el, type, fn, capture){
	  el[unbind](prefix + type, fn, capture || false);
	  return fn;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var index = __webpack_require__(17);
	
	/**
	 * Whitespace regexp.
	 */
	
	var re = /\s+/;
	
	/**
	 * toString reference.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Wrap `el` in a `ClassList`.
	 *
	 * @param {Element} el
	 * @return {ClassList}
	 * @api public
	 */
	
	module.exports = function(el){
	  return new ClassList(el);
	};
	
	/**
	 * Initialize a new ClassList for `el`.
	 *
	 * @param {Element} el
	 * @api private
	 */
	
	function ClassList(el) {
	  if (!el || !el.nodeType) {
	    throw new Error('A DOM element reference is required');
	  }
	  this.el = el;
	  this.list = el.classList;
	}
	
	/**
	 * Add class `name` if not already present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.add = function(name){
	  // classList
	  if (this.list) {
	    this.list.add(name);
	    return this;
	  }
	
	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (!~i) arr.push(name);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	/**
	 * Remove class `name` when present, or
	 * pass a regular expression to remove
	 * any which match.
	 *
	 * @param {String|RegExp} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.remove = function(name){
	  if ('[object RegExp]' == toString.call(name)) {
	    return this.removeMatching(name);
	  }
	
	  // classList
	  if (this.list) {
	    this.list.remove(name);
	    return this;
	  }
	
	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (~i) arr.splice(i, 1);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	/**
	 * Remove all classes matching `re`.
	 *
	 * @param {RegExp} re
	 * @return {ClassList}
	 * @api private
	 */
	
	ClassList.prototype.removeMatching = function(re){
	  var arr = this.array();
	  for (var i = 0; i < arr.length; i++) {
	    if (re.test(arr[i])) {
	      this.remove(arr[i]);
	    }
	  }
	  return this;
	};
	
	/**
	 * Toggle class `name`, can force state via `force`.
	 *
	 * For browsers that support classList, but do not support `force` yet,
	 * the mistake will be detected and corrected.
	 *
	 * @param {String} name
	 * @param {Boolean} force
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.toggle = function(name, force){
	  // classList
	  if (this.list) {
	    if ("undefined" !== typeof force) {
	      if (force !== this.list.toggle(name, force)) {
	        this.list.toggle(name); // toggle again to correct
	      }
	    } else {
	      this.list.toggle(name);
	    }
	    return this;
	  }
	
	  // fallback
	  if ("undefined" !== typeof force) {
	    if (!force) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  } else {
	    if (this.has(name)) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return an array of classes.
	 *
	 * @return {Array}
	 * @api public
	 */
	
	ClassList.prototype.array = function(){
	  var className = this.el.getAttribute('class') || '';
	  var str = className.replace(/^\s+|\s+$/g, '');
	  var arr = str.split(re);
	  if ('' === arr[0]) arr.shift();
	  return arr;
	};
	
	/**
	 * Check if class `name` is present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.has =
	ClassList.prototype.contains = function(name){
	  return this.list
	    ? this.list.contains(name)
	    : !! ~index(this.array(), name);
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Spinner = __webpack_require__(19)
	  , debug = __webpack_require__(24)('spin')
	  , css = __webpack_require__(27)
	  , removed = __webpack_require__(45);
	
	/**
	 * Add a spinner to `el`,
	 * and adjust size and position
	 * based on `el`'s box.
	 *
	 * Options:
	 *
	 *    - `delay` milliseconds defaulting to 300
	 *    - `size` size defaults to 1/5th the parent dimensions
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Spinner}
	 * @api public
	 */
	
	module.exports = function(el, options){
	  if (!el) throw new Error('element required');
	
	  var appended = false;
	  var spin = new Spinner(el);
	  options = options || {};
	  var ms = options.delay || 300;
	
	  // update size and position
	  spin.update = function(){
	    debug('update');
	    var w = el.offsetWidth;
	    var h = el.offsetHeight;
	
	    // size
	    var s = options.size || w / 5;
	    spin.size(s);
	    debug('show %dpx (%dms)', s, ms);
	
	    // position
	    css(spin.el, {
	      position: 'absolute',
	      top: h / 2 - s / 2,
	      left: w / 2 - s / 2
	    });
	  }
	
	  spin.update();
	
	  // remove
	  spin.remove = function(){
	    debug('remove');
	    if (appended) el.removeChild(spin.el);
	    spin.stop();
	    clearTimeout(timer);
	  };
	
	  // append
	  var timer = setTimeout(function(){
	    debug('append');
	    appended = true;
	    el.appendChild(spin.el);
	  }, ms);
	
	  removed(spin.el, function() {
	    appended = false;
	  });
	
	  return spin;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var supported = __webpack_require__(20);
	var raf = __webpack_require__(21);
	var text = __webpack_require__(22);
	var autoscale = __webpack_require__(23);
	
	/**
	 * Expose `Spinner`.
	 */
	
	module.exports = Spinner;
	
	/**
	 * Initialize a new `Spinner`.
	 */
	
	function Spinner() {
	  var self = this;
	  this.percent = 0;
	
	  if (supported) {
	    this.el = document.createElement('canvas');
	    this.el.className = 'spinner';
	  } else {
	    this.el = document.createElement('div');
	    this.el.className = 'spinner fallback';
	    return;
	  }
	
	  this.ctx = this.el.getContext('2d');
	  this.size(50);
	  this.fontSize(11);
	  this.speed(60);
	  this.font('helvetica, arial, sans-serif');
	  this.stopped = false;
	
	  (function animate() {
	    if (self.stopped) return;
	    raf(animate);
	    self.percent = (self.percent + self._speed / 36) % 100;
	    self.draw(self.ctx);
	  })();
	}
	
	/**
	 * Stop the animation.
	 *
	 * @api public
	 */
	
	Spinner.prototype.stop = function(){
	  this.stopped = true;
	};
	
	/**
	 * Set spinner size to `n`.
	 *
	 * @param {Number} n
	 * @return {Spinner}
	 * @api public
	 */
	
	Spinner.prototype.size = function(n){
	  this.el.width = n;
	  this.el.height = n;
	  if (supported) autoscale(this.el);
	  return this;
	};
	
	/**
	 * Set text to `str`.
	 *
	 * @param {String} str
	 * @return {Spinner}
	 * @api public
	 */
	
	Spinner.prototype.text = function(str){
	  this._text = str;
	  if (!supported) text(this.el, str);
	  return this;
	};
	
	/**
	 * Set font size to `n`.
	 *
	 * @param {Number} n
	 * @return {Spinner}
	 * @api public
	 */
	
	Spinner.prototype.fontSize = function(n){
	  this._fontSize = n;
	  return this;
	};
	
	/**
	 * Set font `family`.
	 *
	 * @param {String} family
	 * @return {Spinner}
	 * @api public
	 */
	
	Spinner.prototype.font = function(family){
	  this._font = family;
	  return this;
	};
	
	/**
	 * Set speed to `n` rpm.
	 *
	 * @param {Number} n
	 * @return {Spinner}
	 * @api public
	 */
	
	Spinner.prototype.speed = function(n) {
	  this._speed = n;
	  return this;
	};
	
	/**
	 * Make the spinner light colored.
	 *
	 * @return {Spinner}
	 * @api public
	 */
	
	Spinner.prototype.light = function(){
	  this._light = true;
	  return this;
	};
	
	/**
	 * Draw on `ctx`.
	 *
	 * @param {CanvasRenderingContext2d} ctx
	 * @return {Spinner}
	 * @api private
	 */
	
	Spinner.prototype.draw = function(ctx){
	  var percent = Math.min(this.percent, 100)
	    , ratio = window.devicePixelRatio || 1
	    , size = this.el.width / ratio
	    , half = size / 2
	    , x = half
	    , y = half
	    , rad = half - 1
	    , fontSize = this._fontSize
	    , light = this._light;
	
	  ctx.font = fontSize + 'px ' + this._font;
	
	  var angle = Math.PI * 2 * (percent / 100);
	  ctx.clearRect(0, 0, size, size);
	
	  // outer circle
	  var grad = ctx.createLinearGradient(
	    half + Math.sin(Math.PI * 1.5 - angle) * half,
	    half + Math.cos(Math.PI * 1.5 - angle) * half,
	    half + Math.sin(Math.PI * 0.5 - angle) * half,
	    half + Math.cos(Math.PI * 0.5 - angle) * half
	  );
	
	  // color
	  if (light) {
	    grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
	    grad.addColorStop(1, 'rgba(255, 255, 255, 1)');
	  } else {
	    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
	    grad.addColorStop(1, 'rgba(0, 0, 0, 1)');
	  }
	
	  ctx.strokeStyle = grad;
	  ctx.beginPath();
	  ctx.arc(x, y, rad, angle - Math.PI, angle, false);
	  ctx.stroke();
	
	  // inner circle
	  ctx.strokeStyle = light ? 'rgba(255, 255, 255, .4)' : '#eee';
	  ctx.beginPath();
	  ctx.arc(x, y, rad - 1, 0, Math.PI * 2, true);
	  ctx.stroke();
	
	  // text
	  var text = this._text || ''
	    , w = ctx.measureText(text).width;
	
	  if (light) ctx.fillStyle = 'rgba(255, 255, 255, .9)';
	  ctx.fillText(
	      text
	    , x - w / 2 + 1
	    , y + fontSize / 2 - 1);
	
	  return this;
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	
	/**
	 * Export `bool`
	 */
	
	module.exports = (function(){
	  var el = document.createElement('canvas');
	  return !! el.getContext;
	})();


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Expose `requestAnimationFrame()`.
	 */
	
	exports = module.exports = window.requestAnimationFrame
	  || window.webkitRequestAnimationFrame
	  || window.mozRequestAnimationFrame
	  || fallback;
	
	/**
	 * Fallback implementation.
	 */
	
	var prev = new Date().getTime();
	function fallback(fn) {
	  var curr = new Date().getTime();
	  var ms = Math.max(0, 16 - (curr - prev));
	  var req = setTimeout(fn, ms);
	  prev = curr;
	  return req;
	}
	
	/**
	 * Cancel.
	 */
	
	var cancel = window.cancelAnimationFrame
	  || window.webkitCancelAnimationFrame
	  || window.mozCancelAnimationFrame
	  || window.clearTimeout;
	
	exports.cancel = function(id){
	  cancel.call(window, id);
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(node, value) {
	  var text = (node.textContent !== undefined ?
	    'textContent' : 'innerText'
	  )
	
	  if (typeof value != 'undefined') {
	    node[text] = value
	  }
	
	  return node[text]
	}


/***/ },
/* 23 */
/***/ function(module, exports) {

	
	/**
	 * Retina-enable the given `canvas`.
	 *
	 * @param {Canvas} canvas
	 * @return {Canvas}
	 * @api public
	 */
	
	module.exports = function(canvas){
	  var ctx = canvas.getContext('2d');
	  var ratio = window.devicePixelRatio || 1;
	  if (1 != ratio) {
	    canvas.style.width = canvas.width + 'px';
	    canvas.style.height = canvas.height + 'px';
	    canvas.width *= ratio;
	    canvas.height *= ratio;
	    ctx.scale(ratio, ratio);
	  }
	  return canvas;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(25);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(26);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */
	
	var debug = __webpack_require__(24)('css');
	var set = __webpack_require__(28);
	var get = __webpack_require__(40);
	
	/**
	 * Expose `css`
	 */
	
	module.exports = css;
	
	/**
	 * Get and set css values
	 *
	 * @param {Element} el
	 * @param {String|Object} prop
	 * @param {Mixed} val
	 * @return {Element} el
	 * @api public
	 */
	
	function css(el, prop, val) {
	  if (!el) return;
	
	  if (undefined !== val) {
	    var obj = {};
	    obj[prop] = val;
	    debug('setting styles %j', obj);
	    return setStyles(el, obj);
	  }
	
	  if ('object' == typeof prop) {
	    debug('setting styles %j', prop);
	    return setStyles(el, prop);
	  }
	
	  debug('getting %s', prop);
	  return get(el, prop);
	}
	
	/**
	 * Set the styles on an element
	 *
	 * @param {Element} el
	 * @param {Object} props
	 * @return {Element} el
	 */
	
	function setStyles(el, props) {
	  for (var prop in props) {
	    set(el, prop, props[prop]);
	  }
	
	  return el;
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */
	
	var debug = __webpack_require__(24)('css:style');
	var camelcase = __webpack_require__(29);
	var support = __webpack_require__(32);
	var property = __webpack_require__(33);
	var hooks = __webpack_require__(35);
	
	/**
	 * Expose `style`
	 */
	
	module.exports = style;
	
	/**
	 * Possibly-unitless properties
	 *
	 * Don't automatically add 'px' to these properties
	 */
	
	var cssNumber = {
	  "columnCount": true,
	  "fillOpacity": true,
	  "fontWeight": true,
	  "lineHeight": true,
	  "opacity": true,
	  "order": true,
	  "orphans": true,
	  "widows": true,
	  "zIndex": true,
	  "zoom": true
	};
	
	/**
	 * Set a css value
	 *
	 * @param {Element} el
	 * @param {String} prop
	 * @param {Mixed} val
	 * @param {Mixed} extra
	 */
	
	function style(el, prop, val, extra) {
	  // Don't set styles on text and comment nodes
	  if (!el || el.nodeType === 3 || el.nodeType === 8 || !el.style ) return;
	
	  var orig = camelcase(prop);
	  var style = el.style;
	  var type = typeof val;
	
	  if (!val) return get(el, prop, orig, extra);
	
	  prop = property(prop, style);
	
	  var hook = hooks[prop] || hooks[orig];
	
	  // If a number was passed in, add 'px' to the (except for certain CSS properties)
	  if ('number' == type && !cssNumber[orig]) {
	    debug('adding "px" to end of number');
	    val += 'px';
	  }
	
	  // Fixes jQuery #8908, it can be done more correctly by specifying setters in cssHooks,
	  // but it would mean to define eight (for every problematic property) identical functions
	  if (!support.clearCloneStyle && '' === val && 0 === prop.indexOf('background')) {
	    debug('set property (%s) value to "inherit"', prop);
	    style[prop] = 'inherit';
	  }
	
	  // If a hook was provided, use that value, otherwise just set the specified value
	  if (!hook || !hook.set || undefined !== (val = hook.set(el, val, extra))) {
	    // Support: Chrome, Safari
	    // Setting style to blank string required to delete "style: x !important;"
	    debug('set hook defined. setting property (%s) to %s', prop, val);
	    style[prop] = '';
	    style[prop] = val;
	  }
	
	}
	
	/**
	 * Get the style
	 *
	 * @param {Element} el
	 * @param {String} prop
	 * @param {String} orig
	 * @param {Mixed} extra
	 * @return {String}
	 */
	
	function get(el, prop, orig, extra) {
	  var style = el.style;
	  var hook = hooks[prop] || hooks[orig];
	  var ret;
	
	  if (hook && hook.get && undefined !== (ret = hook.get(el, false, extra))) {
	    debug('get hook defined, returning: %s', ret);
	    return ret;
	  }
	
	  ret = style[prop];
	  debug('getting %s', ret);
	  return ret;
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	
	var toSpace = __webpack_require__(30);
	
	
	/**
	 * Expose `toCamelCase`.
	 */
	
	module.exports = toCamelCase;
	
	
	/**
	 * Convert a `string` to camel case.
	 *
	 * @param {String} string
	 * @return {String}
	 */
	
	
	function toCamelCase (string) {
	  return toSpace(string).replace(/\s(\w)/g, function (matches, letter) {
	    return letter.toUpperCase();
	  });
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	
	var clean = __webpack_require__(31);
	
	
	/**
	 * Expose `toSpaceCase`.
	 */
	
	module.exports = toSpaceCase;
	
	
	/**
	 * Convert a `string` to space case.
	 *
	 * @param {String} string
	 * @return {String}
	 */
	
	
	function toSpaceCase (string) {
	  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
	    return match ? ' ' + match : '';
	  });
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	
	/**
	 * Expose `toNoCase`.
	 */
	
	module.exports = toNoCase;
	
	
	/**
	 * Test whether a string is camel-case.
	 */
	
	var hasSpace = /\s/;
	var hasCamel = /[a-z][A-Z]/;
	var hasSeparator = /[\W_]/;
	
	
	/**
	 * Remove any starting case from a `string`, like camel or snake, but keep
	 * spaces and punctuation that may be important otherwise.
	 *
	 * @param {String} string
	 * @return {String}
	 */
	
	function toNoCase (string) {
	  if (hasSpace.test(string)) return string.toLowerCase();
	
	  if (hasSeparator.test(string)) string = unseparate(string);
	  if (hasCamel.test(string)) string = uncamelize(string);
	  return string.toLowerCase();
	}
	
	
	/**
	 * Separator splitter.
	 */
	
	var separatorSplitter = /[\W_]+(.|$)/g;
	
	
	/**
	 * Un-separate a `string`.
	 *
	 * @param {String} string
	 * @return {String}
	 */
	
	function unseparate (string) {
	  return string.replace(separatorSplitter, function (m, next) {
	    return next ? ' ' + next : '';
	  });
	}
	
	
	/**
	 * Camelcase splitter.
	 */
	
	var camelSplitter = /(.)([A-Z]+)/g;
	
	
	/**
	 * Un-camelcase a `string`.
	 *
	 * @param {String} string
	 * @return {String}
	 */
	
	function uncamelize (string) {
	  return string.replace(camelSplitter, function (m, previous, uppers) {
	    return previous + ' ' + uppers.toLowerCase().split('').join(' ');
	  });
	}

/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * Support values
	 */
	
	var reliableMarginRight;
	var boxSizingReliableVal;
	var pixelPositionVal;
	var clearCloneStyle;
	
	/**
	 * Container setup
	 */
	
	var docElem = document.documentElement;
	var container = document.createElement('div');
	var div = document.createElement('div');
	
	/**
	 * Clear clone style
	 */
	
	div.style.backgroundClip = 'content-box';
	div.cloneNode(true).style.backgroundClip = '';
	exports.clearCloneStyle = div.style.backgroundClip === 'content-box';
	
	container.style.cssText = 'border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px';
	container.appendChild(div);
	
	/**
	 * Pixel position
	 *
	 * Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	 * getComputedStyle returns percent when specified for top/left/bottom/right
	 * rather than make the css module depend on the offset module, we just check for it here
	 */
	
	exports.pixelPosition = function() {
	  if (undefined == pixelPositionVal) computePixelPositionAndBoxSizingReliable();
	  return pixelPositionVal;
	}
	
	/**
	 * Reliable box sizing
	 */
	
	exports.boxSizingReliable = function() {
	  if (undefined == boxSizingReliableVal) computePixelPositionAndBoxSizingReliable();
	  return boxSizingReliableVal;
	}
	
	/**
	 * Reliable margin right
	 *
	 * Support: Android 2.3
	 * Check if div with explicit width and no margin-right incorrectly
	 * gets computed margin-right based on width of container. (#3333)
	 * WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	 * This support function is only executed once so no memoizing is needed.
	 *
	 * @return {Boolean}
	 */
	
	exports.reliableMarginRight = function() {
	  var ret;
	  var marginDiv = div.appendChild(document.createElement("div" ));
	
	  marginDiv.style.cssText = div.style.cssText = divReset;
	  marginDiv.style.marginRight = marginDiv.style.width = "0";
	  div.style.width = "1px";
	  docElem.appendChild(container);
	
	  ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight);
	
	  docElem.removeChild(container);
	
	  // Clean up the div for other support tests.
	  div.innerHTML = "";
	
	  return ret;
	}
	
	/**
	 * Executing both pixelPosition & boxSizingReliable tests require only one layout
	 * so they're executed at the same time to save the second computation.
	 */
	
	function computePixelPositionAndBoxSizingReliable() {
	  // Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
	  div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
	    "box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;" +
	    "position:absolute;top:1%";
	  docElem.appendChild(container);
	
	  var divStyle = window.getComputedStyle(div, null);
	  pixelPositionVal = divStyle.top !== "1%";
	  boxSizingReliableVal = divStyle.width === "4px";
	
	  docElem.removeChild(container);
	}
	
	


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies
	 */
	
	var debug = __webpack_require__(24)('css:prop');
	var camelcase = __webpack_require__(29);
	var vendor = __webpack_require__(34);
	
	/**
	 * Export `prop`
	 */
	
	module.exports = prop;
	
	/**
	 * Normalize Properties
	 */
	
	var cssProps = {
	  'float': 'cssFloat' in document.documentElement.style ? 'cssFloat' : 'styleFloat'
	};
	
	/**
	 * Get the vendor prefixed property
	 *
	 * @param {String} prop
	 * @param {String} style
	 * @return {String} prop
	 * @api private
	 */
	
	function prop(prop, style) {
	  prop = cssProps[prop] || (cssProps[prop] = vendor(prop, style));
	  debug('transform property: %s => %s', prop, style);
	  return prop;
	}


/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * Module Dependencies
	 */
	
	var prefixes = ['Webkit', 'O', 'Moz', 'ms'];
	
	/**
	 * Expose `vendor`
	 */
	
	module.exports = vendor;
	
	/**
	 * Get the vendor prefix for a given property
	 *
	 * @param {String} prop
	 * @param {Object} style
	 * @return {String}
	 */
	
	function vendor(prop, style) {
	  // shortcut for names that are not vendor prefixed
	  if (style[prop]) return prop;
	
	  // check for vendor prefixed names
	  var capName = prop[0].toUpperCase() + prop.slice(1);
	  var original = prop;
	  var i = prefixes.length;
	
	  while (i--) {
	    prop = prefixes[i] + capName;
	    if (prop in style) return prop;
	  }
	
	  return original;
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */
	
	var each = __webpack_require__(36);
	var css = __webpack_require__(40);
	var cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
	var rnumnonpx = new RegExp( '^(' + pnum + ')(?!px)[a-z%]+$', 'i');
	var rnumsplit = new RegExp( '^(' + pnum + ')(.*)$', 'i');
	var rdisplayswap = /^(none|table(?!-c[ea]).+)/;
	var styles = __webpack_require__(43);
	var support = __webpack_require__(32);
	var swap = __webpack_require__(44);
	var computed = __webpack_require__(41);
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	/**
	 * Height & Width
	 */
	
	each(['width', 'height'], function(name) {
	  exports[name] = {};
	
	  exports[name].get = function(el, compute, extra) {
	    if (!compute) return;
	    // certain elements can have dimension info if we invisibly show them
	    // however, it must have a current display style that would benefit from this
	    return 0 == el.offsetWidth && rdisplayswap.test(css(el, 'display'))
	      ? swap(el, cssShow, function() { return getWidthOrHeight(el, name, extra); })
	      : getWidthOrHeight(el, name, extra);
	  }
	
	  exports[name].set = function(el, val, extra) {
	    var styles = extra && styles(el);
	    return setPositiveNumber(el, val, extra
	      ? augmentWidthOrHeight(el, name, extra, 'border-box' == css(el, 'boxSizing', false, styles), styles)
	      : 0
	    );
	  };
	
	});
	
	/**
	 * Opacity
	 */
	
	exports.opacity = {};
	exports.opacity.get = function(el, compute) {
	  if (!compute) return;
	  var ret = computed(el, 'opacity');
	  return '' == ret ? '1' : ret;
	}
	
	/**
	 * Utility: Set Positive Number
	 *
	 * @param {Element} el
	 * @param {Mixed} val
	 * @param {Number} subtract
	 * @return {Number}
	 */
	
	function setPositiveNumber(el, val, subtract) {
	  var matches = rnumsplit.exec(val);
	  return matches ?
	    // Guard against undefined 'subtract', e.g., when used as in cssHooks
	    Math.max(0, matches[1]) + (matches[2] || 'px') :
	    val;
	}
	
	/**
	 * Utility: Get the width or height
	 *
	 * @param {Element} el
	 * @param {String} prop
	 * @param {Mixed} extra
	 * @return {String}
	 */
	
	function getWidthOrHeight(el, prop, extra) {
	  // Start with offset property, which is equivalent to the border-box value
	  var valueIsBorderBox = true;
	  var val = prop === 'width' ? el.offsetWidth : el.offsetHeight;
	  var styles = computed(el);
	  var isBorderBox = support.boxSizing && css(el, 'boxSizing') === 'border-box';
	
	  // some non-html elements return undefined for offsetWidth, so check for null/undefined
	  // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	  // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	  if (val <= 0 || val == null) {
	    // Fall back to computed then uncomputed css if necessary
	    val = computed(el, prop, styles);
	
	    if (val < 0 || val == null) {
	      val = el.style[prop];
	    }
	
	    // Computed unit is not pixels. Stop here and return.
	    if (rnumnonpx.test(val)) {
	      return val;
	    }
	
	    // we need the check for style in case a browser which returns unreliable values
	    // for getComputedStyle silently falls back to the reliable el.style
	    valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === el.style[prop]);
	
	    // Normalize ', auto, and prepare for extra
	    val = parseFloat(val) || 0;
	  }
	
	  // use the active box-sizing model to add/subtract irrelevant styles
	  extra = extra || (isBorderBox ? 'border' : 'content');
	  val += augmentWidthOrHeight(el, prop, extra, valueIsBorderBox, styles);
	  return val + 'px';
	}
	
	/**
	 * Utility: Augment the width or the height
	 *
	 * @param {Element} el
	 * @param {String} prop
	 * @param {Mixed} extra
	 * @param {Boolean} isBorderBox
	 * @param {Array} styles
	 */
	
	function augmentWidthOrHeight(el, prop, extra, isBorderBox, styles) {
	  // If we already have the right measurement, avoid augmentation,
	  // Otherwise initialize for horizontal or vertical properties
	  var i = extra === (isBorderBox ? 'border' : 'content') ? 4 : 'width' == prop ? 1 : 0;
	  var val = 0;
	
	  for (; i < 4; i += 2) {
	    // both box models exclude margin, so add it if we want it
	    if (extra === 'margin') {
	      val += css(el, extra + cssExpand[i], true, styles);
	    }
	
	    if (isBorderBox) {
	      // border-box includes padding, so remove it if we want content
	      if (extra === 'content') {
	        val -= css(el, 'padding' + cssExpand[i], true, styles);
	      }
	
	      // at this point, extra isn't border nor margin, so remove border
	      if (extra !== 'margin') {
	        val -= css(el, 'border' + cssExpand[i] + 'Width', true, styles);
	      }
	    } else {
	      // at this point, extra isn't content, so add padding
	      val += css(el, 'padding' + cssExpand[i], true, styles);
	
	      // at this point, extra isn't content nor padding, so add border
	      if (extra !== 'padding') {
	        val += css(el, 'border' + cssExpand[i] + 'Width', true, styles);
	      }
	    }
	  }
	
	  return val;
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	try {
	  var type = __webpack_require__(37);
	} catch (err) {
	  var type = __webpack_require__(37);
	}
	
	var toFunction = __webpack_require__(38);
	
	/**
	 * HOP reference.
	 */
	
	var has = Object.prototype.hasOwnProperty;
	
	/**
	 * Iterate the given `obj` and invoke `fn(val, i)`
	 * in optional context `ctx`.
	 *
	 * @param {String|Array|Object} obj
	 * @param {Function} fn
	 * @param {Object} [ctx]
	 * @api public
	 */
	
	module.exports = function(obj, fn, ctx){
	  fn = toFunction(fn);
	  ctx = ctx || this;
	  switch (type(obj)) {
	    case 'array':
	      return array(obj, fn, ctx);
	    case 'object':
	      if ('number' == typeof obj.length) return array(obj, fn, ctx);
	      return object(obj, fn, ctx);
	    case 'string':
	      return string(obj, fn, ctx);
	  }
	};
	
	/**
	 * Iterate string chars.
	 *
	 * @param {String} obj
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @api private
	 */
	
	function string(obj, fn, ctx) {
	  for (var i = 0; i < obj.length; ++i) {
	    fn.call(ctx, obj.charAt(i), i);
	  }
	}
	
	/**
	 * Iterate object keys.
	 *
	 * @param {Object} obj
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @api private
	 */
	
	function object(obj, fn, ctx) {
	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      fn.call(ctx, key, obj[key]);
	    }
	  }
	}
	
	/**
	 * Iterate array-ish.
	 *
	 * @param {Array|Object} obj
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @api private
	 */
	
	function array(obj, fn, ctx) {
	  for (var i = 0; i < obj.length; ++i) {
	    fn.call(ctx, obj[i], i);
	  }
	}


/***/ },
/* 37 */
/***/ function(module, exports) {

	
	/**
	 * toString ref.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */
	
	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Function]': return 'function';
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object String]': return 'string';
	  }
	
	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val && val.nodeType === 1) return 'element';
	  if (val === Object(val)) return 'object';
	
	  return typeof val;
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module Dependencies
	 */
	
	var expr;
	try {
	  expr = __webpack_require__(39);
	} catch(e) {
	  expr = __webpack_require__(39);
	}
	
	/**
	 * Expose `toFunction()`.
	 */
	
	module.exports = toFunction;
	
	/**
	 * Convert `obj` to a `Function`.
	 *
	 * @param {Mixed} obj
	 * @return {Function}
	 * @api private
	 */
	
	function toFunction(obj) {
	  switch ({}.toString.call(obj)) {
	    case '[object Object]':
	      return objectToFunction(obj);
	    case '[object Function]':
	      return obj;
	    case '[object String]':
	      return stringToFunction(obj);
	    case '[object RegExp]':
	      return regexpToFunction(obj);
	    default:
	      return defaultToFunction(obj);
	  }
	}
	
	/**
	 * Default to strict equality.
	 *
	 * @param {Mixed} val
	 * @return {Function}
	 * @api private
	 */
	
	function defaultToFunction(val) {
	  return function(obj){
	    return val === obj;
	  };
	}
	
	/**
	 * Convert `re` to a function.
	 *
	 * @param {RegExp} re
	 * @return {Function}
	 * @api private
	 */
	
	function regexpToFunction(re) {
	  return function(obj){
	    return re.test(obj);
	  };
	}
	
	/**
	 * Convert property `str` to a function.
	 *
	 * @param {String} str
	 * @return {Function}
	 * @api private
	 */
	
	function stringToFunction(str) {
	  // immediate such as "> 20"
	  if (/^ *\W+/.test(str)) return new Function('_', 'return _ ' + str);
	
	  // properties such as "name.first" or "age > 18" or "age > 18 && age < 36"
	  return new Function('_', 'return ' + get(str));
	}
	
	/**
	 * Convert `object` to a function.
	 *
	 * @param {Object} object
	 * @return {Function}
	 * @api private
	 */
	
	function objectToFunction(obj) {
	  var match = {};
	  for (var key in obj) {
	    match[key] = typeof obj[key] === 'string'
	      ? defaultToFunction(obj[key])
	      : toFunction(obj[key]);
	  }
	  return function(val){
	    if (typeof val !== 'object') return false;
	    for (var key in match) {
	      if (!(key in val)) return false;
	      if (!match[key](val[key])) return false;
	    }
	    return true;
	  };
	}
	
	/**
	 * Built the getter function. Supports getter style functions
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */
	
	function get(str) {
	  var props = expr(str);
	  if (!props.length) return '_.' + str;
	
	  var val, i, prop;
	  for (i = 0; i < props.length; i++) {
	    prop = props[i];
	    val = '_.' + prop;
	    val = "('function' == typeof " + val + " ? " + val + "() : " + val + ")";
	
	    // mimic negative lookbehind to avoid problems with nested properties
	    str = stripNested(prop, str, val);
	  }
	
	  return str;
	}
	
	/**
	 * Mimic negative lookbehind to avoid problems with nested properties.
	 *
	 * See: http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript
	 *
	 * @param {String} prop
	 * @param {String} str
	 * @param {String} val
	 * @return {String}
	 * @api private
	 */
	
	function stripNested (prop, str, val) {
	  return str.replace(new RegExp('(\\.)?' + prop, 'g'), function($0, $1) {
	    return $1 ? $0 : val;
	  });
	}


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * Global Names
	 */
	
	var globals = /\b(Array|Date|Object|Math|JSON)\b/g;
	
	/**
	 * Return immediate identifiers parsed from `str`.
	 *
	 * @param {String} str
	 * @param {String|Function} map function or prefix
	 * @return {Array}
	 * @api public
	 */
	
	module.exports = function(str, fn){
	  var p = unique(props(str));
	  if (fn && 'string' == typeof fn) fn = prefixed(fn);
	  if (fn) return map(str, p, fn);
	  return p;
	};
	
	/**
	 * Return immediate identifiers in `str`.
	 *
	 * @param {String} str
	 * @return {Array}
	 * @api private
	 */
	
	function props(str) {
	  return str
	    .replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, '')
	    .replace(globals, '')
	    .match(/[a-zA-Z_]\w*/g)
	    || [];
	}
	
	/**
	 * Return `str` with `props` mapped with `fn`.
	 *
	 * @param {String} str
	 * @param {Array} props
	 * @param {Function} fn
	 * @return {String}
	 * @api private
	 */
	
	function map(str, props, fn) {
	  var re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g;
	  return str.replace(re, function(_){
	    if ('(' == _[_.length - 1]) return fn(_);
	    if (!~props.indexOf(_)) return _;
	    return fn(_);
	  });
	}
	
	/**
	 * Return unique array.
	 *
	 * @param {Array} arr
	 * @return {Array}
	 * @api private
	 */
	
	function unique(arr) {
	  var ret = [];
	
	  for (var i = 0; i < arr.length; i++) {
	    if (~ret.indexOf(arr[i])) continue;
	    ret.push(arr[i]);
	  }
	
	  return ret;
	}
	
	/**
	 * Map with prefix `str`.
	 */
	
	function prefixed(str) {
	  return function(_){
	    return str + _;
	  };
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */
	
	var debug = __webpack_require__(24)('css:css');
	var camelcase = __webpack_require__(29);
	var computed = __webpack_require__(41);
	var property = __webpack_require__(33);
	
	/**
	 * Expose `css`
	 */
	
	module.exports = css;
	
	/**
	 * CSS Normal Transforms
	 */
	
	var cssNormalTransform = {
	  letterSpacing: 0,
	  fontWeight: 400
	};
	
	/**
	 * Get a CSS value
	 *
	 * @param {Element} el
	 * @param {String} prop
	 * @param {Mixed} extra
	 * @param {Array} styles
	 * @return {String}
	 */
	
	function css(el, prop, extra, styles) {
	  var hooks = __webpack_require__(35);
	  var orig = camelcase(prop);
	  var style = el.style;
	  var val;
	
	  prop = property(prop, style);
	  var hook = hooks[prop] || hooks[orig];
	
	  // If a hook was provided get the computed value from there
	  if (hook && hook.get) {
	    debug('get hook provided. use that');
	    val = hook.get(el, true, extra);
	  }
	
	  // Otherwise, if a way to get the computed value exists, use that
	  if (undefined == val) {
	    debug('fetch the computed value of %s', prop);
	    val = computed(el, prop);
	  }
	
	  if ('normal' == val && cssNormalTransform[prop]) {
	    val = cssNormalTransform[prop];
	    debug('normal => %s', val);
	  }
	
	  // Return, converting to number if forced or a qualifier was provided and val looks numeric
	  if ('' == extra || extra) {
	    debug('converting value: %s into a number', val);
	    var num = parseFloat(val);
	    return true === extra || isNumeric(num) ? num || 0 : val;
	  }
	
	  return val;
	}
	
	/**
	 * Is Numeric
	 *
	 * @param {Mixed} obj
	 * @return {Boolean}
	 */
	
	function isNumeric(obj) {
	  return !isNan(parseFloat(obj)) && isFinite(obj);
	}


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */
	
	var debug = __webpack_require__(24)('css:computed');
	var withinDocument = __webpack_require__(42);
	var styles = __webpack_require__(43);
	
	/**
	 * Expose `computed`
	 */
	
	module.exports = computed;
	
	/**
	 * Get the computed style
	 *
	 * @param {Element} el
	 * @param {String} prop
	 * @param {Array} precomputed (optional)
	 * @return {Array}
	 * @api private
	 */
	
	function computed(el, prop, precomputed) {
	  var computed = precomputed || styles(el);
	  var ret;
	  
	  if (!computed) return;
	
	  if (computed.getPropertyValue) {
	    ret = computed.getPropertyValue(prop) || computed[prop];
	  } else {
	    ret = computed[prop];
	  }
	
	  if ('' === ret && !withinDocument(el)) {
	    debug('element not within document, try finding from style attribute');
	    var style = __webpack_require__(28);
	    ret = style(el, prop);
	  }
	
	  debug('computed value of %s: %s', prop, ret);
	
	  // Support: IE
	  // IE returns zIndex value as an integer.
	  return undefined === ret ? ret : ret + '';
	}


/***/ },
/* 42 */
/***/ function(module, exports) {

	
	/**
	 * Check if `el` is within the document.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 * @api private
	 */
	
	module.exports = function(el) {
	  var node = el;
	  while (node = node.parentNode) {
	    if (node == document) return true;
	  }
	  return false;
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	/**
	 * Expose `styles`
	 */
	
	module.exports = styles;
	
	/**
	 * Get all the styles
	 *
	 * @param {Element} el
	 * @return {Array}
	 */
	
	function styles(el) {
	  if (window.getComputedStyle) {
	    return el.ownerDocument.defaultView.getComputedStyle(el, null);
	  } else {
	    return el.currentStyle;
	  }
	}


/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * Export `swap`
	 */
	
	module.exports = swap;
	
	/**
	 * Initialize `swap`
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Function} fn
	 * @param {Array} args
	 * @return {Mixed}
	 */
	
	function swap(el, options, fn, args) {
	  // Remember the old values, and insert the new ones
	  for (var key in options) {
	    old[key] = el.style[key];
	    el.style[key] = options[key];
	  }
	
	  ret = fn.apply(el, args || []);
	
	  // Revert the old values
	  for (key in options) {
	    el.style[key] = old[key];
	  }
	
	  return ret;
	}


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var Observer = __webpack_require__(46);
	
	/**
	 * Exports the `MutationObserver` based approach, the
	 * `MutationEvent` based approach, or the fallback one
	 * depending on UA capabilities.
	 */
	
	module.exports = Observer
	  ? __webpack_require__(47)
	  : document.addEventListener
	    ? __webpack_require__(50)
	    : __webpack_require__(51);


/***/ },
/* 46 */
/***/ function(module, exports) {

	var MutationObserver = window.MutationObserver
	  || window.WebKitMutationObserver
	  || window.MozMutationObserver;
	
	/*
	 * Copyright 2012 The Polymer Authors. All rights reserved.
	 * Use of this source code is goverened by a BSD-style
	 * license that can be found in the LICENSE file.
	 */
	
	var WeakMap = window.WeakMap;
	
	if (typeof WeakMap === 'undefined') {
	  var defineProperty = Object.defineProperty;
	  var counter = Date.now() % 1e9;
	
	  WeakMap = function() {
	    this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
	  };
	
	  WeakMap.prototype = {
	    set: function(key, value) {
	      var entry = key[this.name];
	      if (entry && entry[0] === key)
	        entry[1] = value;
	      else
	        defineProperty(key, this.name, {value: [key, value], writable: true});
	      return this;
	    },
	    get: function(key) {
	      var entry;
	      return (entry = key[this.name]) && entry[0] === key ?
	          entry[1] : undefined;
	    },
	    delete: function(key) {
	      var entry = key[this.name];
	      if (!entry) return false;
	      var hasValue = entry[0] === key;
	      entry[0] = entry[1] = undefined;
	      return hasValue;
	    },
	    has: function(key) {
	      var entry = key[this.name];
	      if (!entry) return false;
	      return entry[0] === key;
	    }
	  };
	}
	
	var registrationsTable = new WeakMap();
	
	// We use setImmediate or postMessage for our future callback.
	var setImmediate = window.msSetImmediate;
	
	// Use post message to emulate setImmediate.
	if (!setImmediate) {
	  var setImmediateQueue = [];
	  var sentinel = String(Math.random());
	  window.addEventListener('message', function(e) {
	    if (e.data === sentinel) {
	      var queue = setImmediateQueue;
	      setImmediateQueue = [];
	      queue.forEach(function(func) {
	        func();
	      });
	    }
	  });
	  setImmediate = function(func) {
	    setImmediateQueue.push(func);
	    window.postMessage(sentinel, '*');
	  };
	}
	
	// This is used to ensure that we never schedule 2 callas to setImmediate
	var isScheduled = false;
	
	// Keep track of observers that needs to be notified next time.
	var scheduledObservers = [];
	
	/**
	 * Schedules |dispatchCallback| to be called in the future.
	 * @param {MutationObserver} observer
	 */
	function scheduleCallback(observer) {
	  scheduledObservers.push(observer);
	  if (!isScheduled) {
	    isScheduled = true;
	    setImmediate(dispatchCallbacks);
	  }
	}
	
	function wrapIfNeeded(node) {
	  return window.ShadowDOMPolyfill &&
	      window.ShadowDOMPolyfill.wrapIfNeeded(node) ||
	      node;
	}
	
	function dispatchCallbacks() {
	  // http://dom.spec.whatwg.org/#mutation-observers
	
	  isScheduled = false; // Used to allow a new setImmediate call above.
	
	  var observers = scheduledObservers;
	  scheduledObservers = [];
	  // Sort observers based on their creation UID (incremental).
	  observers.sort(function(o1, o2) {
	    return o1.uid_ - o2.uid_;
	  });
	
	  var anyNonEmpty = false;
	  observers.forEach(function(observer) {
	
	    // 2.1, 2.2
	    var queue = observer.takeRecords();
	    // 2.3. Remove all transient registered observers whose observer is mo.
	    removeTransientObserversFor(observer);
	
	    // 2.4
	    if (queue.length) {
	      observer.callback_(queue, observer);
	      anyNonEmpty = true;
	    }
	  });
	
	  // 3.
	  if (anyNonEmpty)
	    dispatchCallbacks();
	}
	
	function removeTransientObserversFor(observer) {
	  observer.nodes_.forEach(function(node) {
	    var registrations = registrationsTable.get(node);
	    if (!registrations)
	      return;
	    registrations.forEach(function(registration) {
	      if (registration.observer === observer)
	        registration.removeTransientObservers();
	    });
	  });
	}
	
	/**
	 * This function is used for the "For each registered observer observer (with
	 * observer's options as options) in target's list of registered observers,
	 * run these substeps:" and the "For each ancestor ancestor of target, and for
	 * each registered observer observer (with options options) in ancestor's list
	 * of registered observers, run these substeps:" part of the algorithms. The
	 * |options.subtree| is checked to ensure that the callback is called
	 * correctly.
	 *
	 * @param {Node} target
	 * @param {function(MutationObserverInit):MutationRecord} callback
	 */
	function forEachAncestorAndObserverEnqueueRecord(target, callback) {
	  for (var node = target; node; node = node.parentNode) {
	    var registrations = registrationsTable.get(node);
	
	    if (registrations) {
	      for (var j = 0; j < registrations.length; j++) {
	        var registration = registrations[j];
	        var options = registration.options;
	
	        // Only target ignores subtree.
	        if (node !== target && !options.subtree)
	          continue;
	
	        var record = callback(options);
	        if (record)
	          registration.enqueue(record);
	      }
	    }
	  }
	}
	
	var uidCounter = 0;
	
	/**
	 * The class that maps to the DOM MutationObserver interface.
	 * @param {Function} callback.
	 * @constructor
	 */
	function JsMutationObserver(callback) {
	  this.callback_ = callback;
	  this.nodes_ = [];
	  this.records_ = [];
	  this.uid_ = ++uidCounter;
	}
	
	JsMutationObserver.prototype = {
	  observe: function(target, options) {
	    target = wrapIfNeeded(target);
	
	    // 1.1
	    if (!options.childList && !options.attributes && !options.characterData ||
	
	        // 1.2
	        options.attributeOldValue && !options.attributes ||
	
	        // 1.3
	        options.attributeFilter && options.attributeFilter.length &&
	            !options.attributes ||
	
	        // 1.4
	        options.characterDataOldValue && !options.characterData) {
	
	      throw new SyntaxError();
	    }
	
	    var registrations = registrationsTable.get(target);
	    if (!registrations)
	      registrationsTable.set(target, registrations = []);
	
	    // 2
	    // If target's list of registered observers already includes a registered
	    // observer associated with the context object, replace that registered
	    // observer's options with options.
	    var registration;
	    for (var i = 0; i < registrations.length; i++) {
	      if (registrations[i].observer === this) {
	        registration = registrations[i];
	        registration.removeListeners();
	        registration.options = options;
	        break;
	      }
	    }
	
	    // 3.
	    // Otherwise, add a new registered observer to target's list of registered
	    // observers with the context object as the observer and options as the
	    // options, and add target to context object's list of nodes on which it
	    // is registered.
	    if (!registration) {
	      registration = new Registration(this, target, options);
	      registrations.push(registration);
	      this.nodes_.push(target);
	    }
	
	    registration.addListeners();
	  },
	
	  disconnect: function() {
	    this.nodes_.forEach(function(node) {
	      var registrations = registrationsTable.get(node);
	      for (var i = 0; i < registrations.length; i++) {
	        var registration = registrations[i];
	        if (registration.observer === this) {
	          registration.removeListeners();
	          registrations.splice(i, 1);
	          // Each node can only have one registered observer associated with
	          // this observer.
	          break;
	        }
	      }
	    }, this);
	    this.records_ = [];
	  },
	
	  takeRecords: function() {
	    var copyOfRecords = this.records_;
	    this.records_ = [];
	    return copyOfRecords;
	  }
	};
	
	/**
	 * @param {string} type
	 * @param {Node} target
	 * @constructor
	 */
	function MutationRecord(type, target) {
	  this.type = type;
	  this.target = target;
	  this.addedNodes = [];
	  this.removedNodes = [];
	  this.previousSibling = null;
	  this.nextSibling = null;
	  this.attributeName = null;
	  this.attributeNamespace = null;
	  this.oldValue = null;
	}
	
	function copyMutationRecord(original) {
	  var record = new MutationRecord(original.type, original.target);
	  record.addedNodes = original.addedNodes.slice();
	  record.removedNodes = original.removedNodes.slice();
	  record.previousSibling = original.previousSibling;
	  record.nextSibling = original.nextSibling;
	  record.attributeName = original.attributeName;
	  record.attributeNamespace = original.attributeNamespace;
	  record.oldValue = original.oldValue;
	  return record;
	};
	
	// We keep track of the two (possibly one) records used in a single mutation.
	var currentRecord, recordWithOldValue;
	
	/**
	 * Creates a record without |oldValue| and caches it as |currentRecord| for
	 * later use.
	 * @param {string} oldValue
	 * @return {MutationRecord}
	 */
	function getRecord(type, target) {
	  return currentRecord = new MutationRecord(type, target);
	}
	
	/**
	 * Gets or creates a record with |oldValue| based in the |currentRecord|
	 * @param {string} oldValue
	 * @return {MutationRecord}
	 */
	function getRecordWithOldValue(oldValue) {
	  if (recordWithOldValue)
	    return recordWithOldValue;
	  recordWithOldValue = copyMutationRecord(currentRecord);
	  recordWithOldValue.oldValue = oldValue;
	  return recordWithOldValue;
	}
	
	function clearRecords() {
	  currentRecord = recordWithOldValue = undefined;
	}
	
	/**
	 * @param {MutationRecord} record
	 * @return {boolean} Whether the record represents a record from the current
	 * mutation event.
	 */
	function recordRepresentsCurrentMutation(record) {
	  return record === recordWithOldValue || record === currentRecord;
	}
	
	/**
	 * Selects which record, if any, to replace the last record in the queue.
	 * This returns |null| if no record should be replaced.
	 *
	 * @param {MutationRecord} lastRecord
	 * @param {MutationRecord} newRecord
	 * @param {MutationRecord}
	 */
	function selectRecord(lastRecord, newRecord) {
	  if (lastRecord === newRecord)
	    return lastRecord;
	
	  // Check if the the record we are adding represents the same record. If
	  // so, we keep the one with the oldValue in it.
	  if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord))
	    return recordWithOldValue;
	
	  return null;
	}
	
	/**
	 * Class used to represent a registered observer.
	 * @param {MutationObserver} observer
	 * @param {Node} target
	 * @param {MutationObserverInit} options
	 * @constructor
	 */
	function Registration(observer, target, options) {
	  this.observer = observer;
	  this.target = target;
	  this.options = options;
	  this.transientObservedNodes = [];
	}
	
	Registration.prototype = {
	  enqueue: function(record) {
	    var records = this.observer.records_;
	    var length = records.length;
	
	    // There are cases where we replace the last record with the new record.
	    // For example if the record represents the same mutation we need to use
	    // the one with the oldValue. If we get same record (this can happen as we
	    // walk up the tree) we ignore the new record.
	    if (records.length > 0) {
	      var lastRecord = records[length - 1];
	      var recordToReplaceLast = selectRecord(lastRecord, record);
	      if (recordToReplaceLast) {
	        records[length - 1] = recordToReplaceLast;
	        return;
	      }
	    } else {
	      scheduleCallback(this.observer);
	    }
	
	    records[length] = record;
	  },
	
	  addListeners: function() {
	    this.addListeners_(this.target);
	  },
	
	  addListeners_: function(node) {
	    var options = this.options;
	    if (options.attributes)
	      node.addEventListener('DOMAttrModified', this, true);
	
	    if (options.characterData)
	      node.addEventListener('DOMCharacterDataModified', this, true);
	
	    if (options.childList)
	      node.addEventListener('DOMNodeInserted', this, true);
	
	    if (options.childList || options.subtree)
	      node.addEventListener('DOMNodeRemoved', this, true);
	  },
	
	  removeListeners: function() {
	    this.removeListeners_(this.target);
	  },
	
	  removeListeners_: function(node) {
	    var options = this.options;
	    if (options.attributes)
	      node.removeEventListener('DOMAttrModified', this, true);
	
	    if (options.characterData)
	      node.removeEventListener('DOMCharacterDataModified', this, true);
	
	    if (options.childList)
	      node.removeEventListener('DOMNodeInserted', this, true);
	
	    if (options.childList || options.subtree)
	      node.removeEventListener('DOMNodeRemoved', this, true);
	  },
	
	  /**
	   * Adds a transient observer on node. The transient observer gets removed
	   * next time we deliver the change records.
	   * @param {Node} node
	   */
	  addTransientObserver: function(node) {
	    // Don't add transient observers on the target itself. We already have all
	    // the required listeners set up on the target.
	    if (node === this.target)
	      return;
	
	    this.addListeners_(node);
	    this.transientObservedNodes.push(node);
	    var registrations = registrationsTable.get(node);
	    if (!registrations)
	      registrationsTable.set(node, registrations = []);
	
	    // We know that registrations does not contain this because we already
	    // checked if node === this.target.
	    registrations.push(this);
	  },
	
	  removeTransientObservers: function() {
	    var transientObservedNodes = this.transientObservedNodes;
	    this.transientObservedNodes = [];
	
	    transientObservedNodes.forEach(function(node) {
	      // Transient observers are never added to the target.
	      this.removeListeners_(node);
	
	      var registrations = registrationsTable.get(node);
	      for (var i = 0; i < registrations.length; i++) {
	        if (registrations[i] === this) {
	          registrations.splice(i, 1);
	          // Each node can only have one registered observer associated with
	          // this observer.
	          break;
	        }
	      }
	    }, this);
	  },
	
	  handleEvent: function(e) {
	    // Stop propagation since we are managing the propagation manually.
	    // This means that other mutation events on the page will not work
	    // correctly but that is by design.
	    e.stopImmediatePropagation();
	
	    switch (e.type) {
	      case 'DOMAttrModified':
	        // http://dom.spec.whatwg.org/#concept-mo-queue-attributes
	
	        var name = e.attrName;
	        var namespace = e.relatedNode.namespaceURI;
	        var target = e.target;
	
	        // 1.
	        var record = new getRecord('attributes', target);
	        record.attributeName = name;
	        record.attributeNamespace = namespace;
	
	        // 2.
	        var oldValue =
	            e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
	
	        forEachAncestorAndObserverEnqueueRecord(target, function(options) {
	          // 3.1, 4.2
	          if (!options.attributes)
	            return;
	
	          // 3.2, 4.3
	          if (options.attributeFilter && options.attributeFilter.length &&
	              options.attributeFilter.indexOf(name) === -1 &&
	              options.attributeFilter.indexOf(namespace) === -1) {
	            return;
	          }
	          // 3.3, 4.4
	          if (options.attributeOldValue)
	            return getRecordWithOldValue(oldValue);
	
	          // 3.4, 4.5
	          return record;
	        });
	
	        break;
	
	      case 'DOMCharacterDataModified':
	        // http://dom.spec.whatwg.org/#concept-mo-queue-characterdata
	        var target = e.target;
	
	        // 1.
	        var record = getRecord('characterData', target);
	
	        // 2.
	        var oldValue = e.prevValue;
	
	
	        forEachAncestorAndObserverEnqueueRecord(target, function(options) {
	          // 3.1, 4.2
	          if (!options.characterData)
	            return;
	
	          // 3.2, 4.3
	          if (options.characterDataOldValue)
	            return getRecordWithOldValue(oldValue);
	
	          // 3.3, 4.4
	          return record;
	        });
	
	        break;
	
	      case 'DOMNodeRemoved':
	        this.addTransientObserver(e.target);
	        // Fall through.
	      case 'DOMNodeInserted':
	        // http://dom.spec.whatwg.org/#concept-mo-queue-childlist
	        var target = e.relatedNode;
	        var changedNode = e.target;
	        var addedNodes, removedNodes;
	        if (e.type === 'DOMNodeInserted') {
	          addedNodes = [changedNode];
	          removedNodes = [];
	        } else {
	
	          addedNodes = [];
	          removedNodes = [changedNode];
	        }
	        var previousSibling = changedNode.previousSibling;
	        var nextSibling = changedNode.nextSibling;
	
	        // 1.
	        var record = getRecord('childList', target);
	        record.addedNodes = addedNodes;
	        record.removedNodes = removedNodes;
	        record.previousSibling = previousSibling;
	        record.nextSibling = nextSibling;
	
	        forEachAncestorAndObserverEnqueueRecord(target, function(options) {
	          // 2.1, 3.2
	          if (!options.childList)
	            return;
	
	          // 2.2, 3.3
	          return record;
	        });
	
	    }
	
	    clearRecords();
	  }
	};
	
	if (!MutationObserver) {
	  MutationObserver = JsMutationObserver;
	}
	
	module.exports = MutationObserver;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var withinDoc = __webpack_require__(48)
	  , Observer = __webpack_require__(46);
	
	/**
	 * Expose `removed`.
	 */
	
	module.exports = removed;
	
	/**
	 * Watched elements.
	 *
	 * @api private
	 */
	
	var watched = [];
	
	/**
	 * Set up observer.
	 *
	* @api private
	 */
	
	var observer = new Observer(onchanges);
	
	/**
	 * Generic observer callback.
	 *
	 * @api private
	 */
	
	function onchanges(changes){
	  // keep track of number of found els
	  var found = 0;
	
	  for (var i = 0, l = changes.length; i < l; i++) {
	    if (changes[i].removedNodes.length) {
	      // allow for manipulation of `watched`
	      // from within the callback
	      var w = watched.slice();
	
	      for (var i2 = 0, l2 = w.length; i2 < l2; i2++) {
	        var el = w[i2][0];
	
	        // check that the element is no longer in the dom
	        if (!withinDoc(el)) {
	          watched.splice(i2 - found++, 1)[0][1]();
	
	          // abort if nothing else left to watch
	          if (!watched.length) observer.disconnect();
	        }
	      }
	
	      // we only need to loop through watched els once
	      break;
	    }
	  }
	}
	
	/**
	 * Starts observing the DOM.
	 *
	 * @api private
	 */
	
	function observe(){
	  var html = document.documentElement;
	  observer.observe(html, {
	    subtree: true,
	    childList: true
	  });
	}
	
	/**
	 * Watches for the removal of `el` from DOM.
	 *
	 * @param {Element} el
	 * @param {Function} fn
	 * @api private
	 */
	
	function removed(el, fn){
	  // reattach observer if we weren't watching
	  if (!watched.length) observe();
	
	  // we add it to the list of elements to check
	  watched.push([el, fn]);
	}


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var withinElement = __webpack_require__(49);
	
	/**
	 * Check if the DOM element `child` is within the page global `document`.
	 *
	 * @param {DOMElement} child - the element to check if it with within `document`
	 * @return {Boolean} True if `child` is within the `document`. False otherwise.
	 * @public
	 */
	
	module.exports = function within (child) {
	  return withinElement(child, document);
	};


/***/ },
/* 49 */
/***/ function(module, exports) {

	
	/**
	 * Check if the DOM element `child` is within the given `parent` DOM element.
	 *
	 * @param {DOMElement|Range} child - the DOM element or Range to check if it's within `parent`
	 * @param {DOMElement} parent  - the parent node that `child` could be inside of
	 * @return {Boolean} True if `child` is within `parent`. False otherwise.
	 * @public
	 */
	
	module.exports = function within (child, parent) {
	  // don't throw if `child` is null
	  if (!child) return false;
	
	  // Range support
	  if (child.commonAncestorContainer) child = child.commonAncestorContainer;
	  else if (child.endContainer) child = child.endContainer;
	
	  // traverse up the `parentNode` properties until `parent` is found
	  var node = child;
	  while (node = node.parentNode) {
	    if (node == parent) return true;
	  }
	
	  return false;
	};


/***/ },
/* 50 */
/***/ function(module, exports) {

	
	module.exports = removed;
	
	/**
	 * Watch for removal with a DOM3 MutationEvent.
	 *
	 * @param {Element} el
	 * @param {Function} fn
	 * @api private
	 */
	
	function removed(el, fn) {
	  function cb(mutationEvent) {
	    var target = mutationEvent.target
	      , children = [].slice.call(target.getElementsByTagName('*'));
	
	    if (target === el || ~children.indexOf(el)) {
	      fn(el);
	      document.removeEventListener('DOMNodeRemoved', cb);
	    }
	  }
	
	  document.addEventListener('DOMNodeRemoved', cb);
	}


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var withinDocument = __webpack_require__(48);
	
	/**
	 * Expose `removed`.
	 */
	
	exports = module.exports = removed;
	
	/**
	 * Default interval.
	 */
	
	exports.interval = 200;
	
	/**
	 * Watch for removal and invoke `fn(el)`.
	 *
	 * @param {Element} el
	 * @param {Function} fn
	 * @api public
	 */
	
	function removed(el, fn){
	  interval(el, fn);
	}
	
	/**
	 * Watch for removal with an interval.
	 *
	 * @param {Element} el
	 * @param {Function} fn
	 * @api private
	 */
	
	function interval(el, fn) {
	  var id = setInterval(function(){
	    if (el.parentNode && withinDocument(el)) return;
	    clearInterval(id);
	    fn(el);
	  }, exports.interval);
	}


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Notice
	 *
	 * A notice message at the top of a webpage.
	 *
	 */
	
	var classes = __webpack_require__(16);
	var events = __webpack_require__(53);
	
	//var hasTouch = 'ontouchend' in window;
	var zIndex = 999;
	
	function create(o) {
	  var el = document.createElement(o.tag || 'div');
	  el.className = o.className;
	  el.innerHTML = o.html || '';
	  if (o.parent) o.parent.appendChild(el);
	  return el;
	}
	var container;
	
	function Notice(msg, options) {
	  if (! (this instanceof Notice)) return new Notice(msg, options);
	  options = options || {};
	  if (!container) {
	    container = create({
	      className: 'notice-container',
	      parent: options.parent || document.body
	    })
	  }
	  if (options.type == 'success') options.duration = options.duration || 2000;
	  var closable = options.hasOwnProperty('closable')? options.closable : true;
	  var duration = options.duration;
	  if (!closable && duration == null) duration = 2000;
	  options.message = msg;
	  var el = createElement(options, closable);
	  el.style.zIndex = -- zIndex;
	  this.el = el;
	  container.appendChild(this.el);
	  this.events = events(el, this);
	  //this.events.bind('tap .notice-close', 'hide');
	  this.events.bind('click .notice-close', 'hide');
	  if (duration) {
	    setTimeout(this.hide.bind(this), duration);
	  }
	}
	
	Notice.prototype.hide = function(e) {
	  if (e) {
	    e.preventDefault();
	    e.stopPropagation();
	  }
	  if (this._hide) return;
	  this._hide = true;
	  var self = this;
	  this.events.unbind();
	  dismiss(this.el);
	}
	
	Notice.prototype.clear = function () {
	  var el = this.el;
	  if (el && el.parentNode) {
	    el.parentNode.removeChild(el);
	  }
	}
	
	function createElement(options, closable) {
	  var className = 'notice-item' + (options.type
	    ? ' notice-' + options.type
	    : '');
	  var item = create({className: className});
	  create({
	    className: 'notice-content',
	    html: options.message,
	    parent: item
	  });
	
	  if (closable) {
	    var close = create({
	      className : 'notice-close',
	      html: '×',
	      parent: item
	    });
	  }
	
	  return item;
	}
	
	function dismiss(el) {
	  classes(el).add('notice-dismiss');
	  setTimeout(function() {
	    if (el && el.parentNode) {
	      el.parentNode.removeChild(el);
	    }
	  }, 200);
	}
	
	module.exports = Notice;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var events = __webpack_require__(15);
	var delegate = __webpack_require__(54);
	
	/**
	 * Expose `Events`.
	 */
	
	module.exports = Events;
	
	/**
	 * Initialize an `Events` with the given
	 * `el` object which events will be bound to,
	 * and the `obj` which will receive method calls.
	 *
	 * @param {Object} el
	 * @param {Object} obj
	 * @api public
	 */
	
	function Events(el, obj) {
	  if (!(this instanceof Events)) return new Events(el, obj);
	  if (!el) throw new Error('element required');
	  if (!obj) throw new Error('object required');
	  this.el = el;
	  this.obj = obj;
	  this._events = {};
	}
	
	/**
	 * Subscription helper.
	 */
	
	Events.prototype.sub = function(event, method, cb){
	  this._events[event] = this._events[event] || {};
	  this._events[event][method] = cb;
	};
	
	/**
	 * Bind to `event` with optional `method` name.
	 * When `method` is undefined it becomes `event`
	 * with the "on" prefix.
	 *
	 * Examples:
	 *
	 *  Direct event handling:
	 *
	 *    events.bind('click') // implies "onclick"
	 *    events.bind('click', 'remove')
	 *    events.bind('click', 'sort', 'asc')
	 *
	 *  Delegated event handling:
	 *
	 *    events.bind('click li > a')
	 *    events.bind('click li > a', 'remove')
	 *    events.bind('click a.sort-ascending', 'sort', 'asc')
	 *    events.bind('click a.sort-descending', 'sort', 'desc')
	 *
	 * @param {String} event
	 * @param {String|function} [method]
	 * @return {Function} callback
	 * @api public
	 */
	
	Events.prototype.bind = function(event, method){
	  var e = parse(event);
	  var el = this.el;
	  var obj = this.obj;
	  var name = e.name;
	  var method = method || 'on' + name;
	  var args = [].slice.call(arguments, 2);
	
	  // callback
	  function cb(){
	    var a = [].slice.call(arguments).concat(args);
	    obj[method].apply(obj, a);
	  }
	
	  // bind
	  if (e.selector) {
	    cb = delegate.bind(el, e.selector, name, cb);
	  } else {
	    events.bind(el, name, cb);
	  }
	
	  // subscription for unbinding
	  this.sub(name, method, cb);
	
	  return cb;
	};
	
	/**
	 * Unbind a single binding, all bindings for `event`,
	 * or all bindings within the manager.
	 *
	 * Examples:
	 *
	 *  Unbind direct handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * Unbind delegate handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * @param {String|Function} [event]
	 * @param {String|Function} [method]
	 * @api public
	 */
	
	Events.prototype.unbind = function(event, method){
	  if (0 == arguments.length) return this.unbindAll();
	  if (1 == arguments.length) return this.unbindAllOf(event);
	
	  // no bindings for this event
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  // no bindings for this method
	  var cb = bindings[method];
	  if (!cb) return;
	
	  events.unbind(this.el, event, cb);
	};
	
	/**
	 * Unbind all events.
	 *
	 * @api private
	 */
	
	Events.prototype.unbindAll = function(){
	  for (var event in this._events) {
	    this.unbindAllOf(event);
	  }
	};
	
	/**
	 * Unbind all events for `event`.
	 *
	 * @param {String} event
	 * @api private
	 */
	
	Events.prototype.unbindAllOf = function(event){
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  for (var method in bindings) {
	    this.unbind(event, method);
	  }
	};
	
	/**
	 * Parse `event`.
	 *
	 * @param {String} event
	 * @return {Object}
	 * @api private
	 */
	
	function parse(event) {
	  var parts = event.split(/ +/);
	  return {
	    name: parts.shift(),
	    selector: parts.join(' ')
	  }
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var closest = __webpack_require__(55)
	  , event = __webpack_require__(15);
	
	/**
	 * Delegate event `type` to `selector`
	 * and invoke `fn(e)`. A callback function
	 * is returned which may be passed to `.unbind()`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.bind = function(el, selector, type, fn, capture){
	  return event.bind(el, type, function(e){
	    var target = e.target || e.srcElement;
	    e.delegateTarget = closest(target, selector, true, el);
	    if (e.delegateTarget) fn.call(el, e);
	  }, capture);
	};
	
	/**
	 * Unbind event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @api public
	 */
	
	exports.unbind = function(el, type, fn, capture){
	  event.unbind(el, type, fn, capture);
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */
	
	var matches = __webpack_require__(56)
	
	/**
	 * Export `closest`
	 */
	
	module.exports = closest
	
	/**
	 * Closest
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {Element} scope (optional)
	 */
	
	function closest (el, selector, scope) {
	  scope = scope || document.documentElement;
	
	  // walk up the dom
	  while (el && el !== scope) {
	    if (matches(el, selector)) return el;
	    el = el.parentNode;
	  }
	
	  // check scope for match
	  return matches(el, selector) ? el : null;
	}


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var query = __webpack_require__(57);
	
	/**
	 * Element prototype.
	 */
	
	var proto = Element.prototype;
	
	/**
	 * Vendor function.
	 */
	
	var vendor = proto.matches
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;
	
	/**
	 * Expose `match()`.
	 */
	
	module.exports = match;
	
	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */
	
	function match(el, selector) {
	  if (!el || el.nodeType !== 1) return false;
	  if (vendor) return vendor.call(el, selector);
	  var nodes = query.all(selector, el.parentNode);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}


/***/ },
/* 57 */
/***/ function(module, exports) {

	function one(selector, el) {
	  return el.querySelector(selector);
	}
	
	exports = module.exports = function(selector, el){
	  el = el || document;
	  return one(selector, el);
	};
	
	exports.all = function(selector, el){
	  el = el || document;
	  return el.querySelectorAll(selector);
	};
	
	exports.engine = function(obj){
	  if (!obj.one) throw new Error('.one callback required');
	  if (!obj.all) throw new Error('.all callback required');
	  one = obj.one;
	  exports.all = obj.all;
	  return exports;
	};


/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = "<table>\n  <thead>\n    <tr>\n      <th class=\"sort\" data-sort=\"name\">name</th>\n      <th class=\"sort\" data-sort=\"age\">age</th>\n      <th class=\"sort\" data-sort=\"score\">score</th>\n      <th class=\"sort\" data-sort=\"percent\">percentage</th>\n      <th class=\"sort\" data-sort=\"money\">money</th>\n      <th>active</th>\n      <th>action</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td class=\"left\">{name}</td>\n      <td>{age}</td>\n      <td>{score | currency 0}</td>\n      <td>{percent | percentage}</td>\n      <td react=\"money\" class=\"money\">¥{money | currency 2}</td>\n      <td react=\"isActive\" data-render=\"setActive\" class=\"center\"></td>\n      <td><button class=\"save\" react=\"$stat\">save</button></td>\n    </tr>\n  </tbody>\n</table>\n";

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = [
		{
			"_id": "561eb4e2ebd3da83cca919cd",
			"index": 0,
			"guid": "e4a3c415-cc1e-4ea2-ac51-643ab7682749",
			"isActive": false,
			"balance": "$1,973.10",
			"picture": "http://placehold.it/32x32",
			"age": 25,
			"eyeColor": "green",
			"name": "Beth Henderson",
			"gender": "female",
			"company": "COMTRACT",
			"email": "bethhenderson@comtract.com",
			"phone": "+1 (812) 525-3569",
			"address": "557 Hinckley Place, Baker, Rhode Island, 109",
			"score": 7472,
			"money": 3286.94,
			"percent": 0.4786
		},
		{
			"_id": "561eb4e213d9e9e666e19e38",
			"index": 1,
			"guid": "3ccd03d7-a31d-400a-b5df-d330ceb629f0",
			"isActive": true,
			"balance": "$2,865.54",
			"picture": "http://placehold.it/32x32",
			"age": 40,
			"eyeColor": "brown",
			"name": "Dillard Johnson",
			"gender": "male",
			"company": "AQUOAVO",
			"email": "dillardjohnson@aquoavo.com",
			"phone": "+1 (918) 476-3583",
			"address": "566 Summit Street, Alderpoint, Guam, 9601",
			"score": 1858,
			"money": 9013.75,
			"percent": 0.7015
		},
		{
			"_id": "561eb4e26c32747cb4f5a165",
			"index": 2,
			"guid": "0db9f86f-8c8e-498d-880f-7f21448383c7",
			"isActive": true,
			"balance": "$2,982.97",
			"picture": "http://placehold.it/32x32",
			"age": 35,
			"eyeColor": "brown",
			"name": "Marilyn Hayes",
			"gender": "female",
			"company": "ISOSWITCH",
			"email": "marilynhayes@isoswitch.com",
			"phone": "+1 (954) 476-2974",
			"address": "307 Brooklyn Avenue, Roy, Florida, 1662",
			"score": 8629,
			"money": 5762.29,
			"percent": 0.4416
		},
		{
			"_id": "561eb4e2d6337eb4457380c7",
			"index": 3,
			"guid": "141787e1-36b5-4236-8b51-6a6ff081c2f4",
			"isActive": true,
			"balance": "$3,581.89",
			"picture": "http://placehold.it/32x32",
			"age": 25,
			"eyeColor": "blue",
			"name": "Hamilton Merritt",
			"gender": "male",
			"company": "VERBUS",
			"email": "hamiltonmerritt@verbus.com",
			"phone": "+1 (849) 447-3091",
			"address": "243 Remsen Street, Barstow, Arizona, 4191",
			"score": 2847,
			"money": 3278.73,
			"percent": 0.4951
		},
		{
			"_id": "561eb4e204ef3a867a2089bd",
			"index": 4,
			"guid": "34297338-4835-45fd-9738-162e637c30d7",
			"isActive": false,
			"balance": "$3,713.53",
			"picture": "http://placehold.it/32x32",
			"age": 23,
			"eyeColor": "green",
			"name": "Greene Watson",
			"gender": "male",
			"company": "INTERFIND",
			"email": "greenewatson@interfind.com",
			"phone": "+1 (987) 455-2375",
			"address": "687 Tompkins Avenue, Glenville, Virgin Islands, 3661",
			"score": 4882,
			"money": 6089.72,
			"percent": 0.7374
		},
		{
			"_id": "561eb4e2b79c0ce08da5db1b",
			"index": 5,
			"guid": "166ca0b1-54ba-4e0a-afd2-abca0d0a240d",
			"isActive": false,
			"balance": "$1,138.01",
			"picture": "http://placehold.it/32x32",
			"age": 31,
			"eyeColor": "brown",
			"name": "Bryant Irwin",
			"gender": "male",
			"company": "UXMOX",
			"email": "bryantirwin@uxmox.com",
			"phone": "+1 (913) 462-3690",
			"address": "869 Noble Street, Coaldale, North Carolina, 9542",
			"score": 5333,
			"money": 8405.4,
			"percent": 0.9098
		},
		{
			"_id": "561eb4e2e0f524682a1d375c",
			"index": 6,
			"guid": "2c6262c8-1951-491d-9229-5ca9de953e43",
			"isActive": true,
			"balance": "$3,623.61",
			"picture": "http://placehold.it/32x32",
			"age": 38,
			"eyeColor": "brown",
			"name": "Peters Cooper",
			"gender": "male",
			"company": "ZOGAK",
			"email": "peterscooper@zogak.com",
			"phone": "+1 (966) 442-3250",
			"address": "175 Cox Place, Idamay, Nebraska, 1177",
			"score": 4252,
			"money": 2368.27,
			"percent": 0.9168
		},
		{
			"_id": "561eb4e2de4f3e20013e522a",
			"index": 7,
			"guid": "c5368365-ef62-4c62-ba35-e4ed4e34da30",
			"isActive": false,
			"balance": "$1,542.41",
			"picture": "http://placehold.it/32x32",
			"age": 40,
			"eyeColor": "brown",
			"name": "Mercer Mullen",
			"gender": "male",
			"company": "BEZAL",
			"email": "mercermullen@bezal.com",
			"phone": "+1 (915) 436-2751",
			"address": "193 Bushwick Place, Outlook, New Hampshire, 9450",
			"score": 562,
			"money": 8875.18,
			"percent": 0.8606
		},
		{
			"_id": "561eb4e2366bb5718312e0e7",
			"index": 8,
			"guid": "69d9ef15-5d2d-4942-997a-c719a4ac7111",
			"isActive": false,
			"balance": "$3,844.90",
			"picture": "http://placehold.it/32x32",
			"age": 33,
			"eyeColor": "blue",
			"name": "Stark Pace",
			"gender": "male",
			"company": "ONTAGENE",
			"email": "starkpace@ontagene.com",
			"phone": "+1 (907) 493-2544",
			"address": "863 Hawthorne Street, Brooktrails, Texas, 4754",
			"score": 2811,
			"money": 8659.11,
			"percent": 0.3582
		},
		{
			"_id": "561eb4e2db05a1d66070c590",
			"index": 9,
			"guid": "3e56f58c-858c-4c21-a30e-5c58848edbcc",
			"isActive": true,
			"balance": "$3,109.24",
			"picture": "http://placehold.it/32x32",
			"age": 36,
			"eyeColor": "blue",
			"name": "Marsha Mcbride",
			"gender": "female",
			"company": "UNIWORLD",
			"email": "marshamcbride@uniworld.com",
			"phone": "+1 (977) 406-3353",
			"address": "414 Kingsland Avenue, Richmond, Arkansas, 6421",
			"score": 7734,
			"money": 7035.38,
			"percent": 0.9847
		},
		{
			"_id": "561eb4e26eb9d916460c6d6c",
			"index": 10,
			"guid": "0e50995a-7c0b-4abb-b5c3-b6b588b84b2f",
			"isActive": false,
			"balance": "$1,437.12",
			"picture": "http://placehold.it/32x32",
			"age": 22,
			"eyeColor": "green",
			"name": "Aguirre Holloway",
			"gender": "male",
			"company": "GEOFORMA",
			"email": "aguirreholloway@geoforma.com",
			"phone": "+1 (978) 522-2386",
			"address": "693 Melba Court, Harmon, Massachusetts, 7425",
			"score": 4542,
			"money": 302.93,
			"percent": 0.2301
		},
		{
			"_id": "561eb4e29cbaf80c7b03a72a",
			"index": 11,
			"guid": "38cc6a95-d69e-4327-845f-bd2a0704bfbc",
			"isActive": false,
			"balance": "$1,347.80",
			"picture": "http://placehold.it/32x32",
			"age": 21,
			"eyeColor": "blue",
			"name": "Hale Baldwin",
			"gender": "male",
			"company": "EXOSPACE",
			"email": "halebaldwin@exospace.com",
			"phone": "+1 (831) 427-2932",
			"address": "956 Ferry Place, Evergreen, North Dakota, 6906",
			"score": 6118,
			"money": 1384.88,
			"percent": 0.8457
		},
		{
			"_id": "561eb4e21ea43ea747b5e496",
			"index": 12,
			"guid": "92801423-352a-489e-a220-c234bcef9628",
			"isActive": true,
			"balance": "$1,949.50",
			"picture": "http://placehold.it/32x32",
			"age": 34,
			"eyeColor": "blue",
			"name": "Bean Rollins",
			"gender": "male",
			"company": "AUTOGRATE",
			"email": "beanrollins@autograte.com",
			"phone": "+1 (973) 559-2415",
			"address": "882 Willow Place, Cartwright, Alabama, 7654",
			"score": 8629,
			"money": 6422.5,
			"percent": 0.8685
		},
		{
			"_id": "561eb4e29088d22b28de2a26",
			"index": 13,
			"guid": "ec60989b-5113-4e0e-96b6-df4e6863d708",
			"isActive": false,
			"balance": "$3,349.11",
			"picture": "http://placehold.it/32x32",
			"age": 23,
			"eyeColor": "green",
			"name": "Jeanie Santos",
			"gender": "female",
			"company": "PAWNAGRA",
			"email": "jeaniesantos@pawnagra.com",
			"phone": "+1 (990) 554-2930",
			"address": "929 Auburn Place, Shrewsbury, New York, 4348",
			"score": 5144,
			"money": 1026.38,
			"percent": 0.5715
		},
		{
			"_id": "561eb4e27da66d878b1ee62e",
			"index": 14,
			"guid": "f77bf3e8-7e8d-49c0-a8f3-01bb94915bd0",
			"isActive": true,
			"balance": "$3,766.02",
			"picture": "http://placehold.it/32x32",
			"age": 37,
			"eyeColor": "green",
			"name": "Avery Holder",
			"gender": "male",
			"company": "EZENT",
			"email": "averyholder@ezent.com",
			"phone": "+1 (912) 474-3863",
			"address": "553 Olive Street, Dupuyer, Oklahoma, 7885",
			"score": 4146,
			"money": 2176.13,
			"percent": 0.5429
		},
		{
			"_id": "561eb4e224098ec7dc2293a6",
			"index": 15,
			"guid": "5c22b549-5af0-45d0-8e06-981854ec9dfa",
			"isActive": true,
			"balance": "$2,742.83",
			"picture": "http://placehold.it/32x32",
			"age": 28,
			"eyeColor": "brown",
			"name": "Long Le",
			"gender": "male",
			"company": "IRACK",
			"email": "longle@irack.com",
			"phone": "+1 (841) 498-2593",
			"address": "359 Grove Street, Finderne, Virginia, 7757",
			"score": 7819,
			"money": 4300.1,
			"percent": 0.2581
		},
		{
			"_id": "561eb4e2c6f3bffb70608207",
			"index": 16,
			"guid": "abb925ad-6119-40a6-b9b5-954e1bfd92f7",
			"isActive": false,
			"balance": "$3,480.85",
			"picture": "http://placehold.it/32x32",
			"age": 34,
			"eyeColor": "blue",
			"name": "Roy Davidson",
			"gender": "male",
			"company": "ISOPLEX",
			"email": "roydavidson@isoplex.com",
			"phone": "+1 (985) 528-2461",
			"address": "756 Wilson Street, Calvary, Minnesota, 7315",
			"score": 4640,
			"money": 2019.3,
			"percent": 0.7373
		},
		{
			"_id": "561eb4e28af28c8a6e892264",
			"index": 17,
			"guid": "52cdec5e-9b16-4efd-91db-1da7743d96d3",
			"isActive": false,
			"balance": "$2,765.48",
			"picture": "http://placehold.it/32x32",
			"age": 28,
			"eyeColor": "green",
			"name": "Stacey Sawyer",
			"gender": "female",
			"company": "NAMEGEN",
			"email": "staceysawyer@namegen.com",
			"phone": "+1 (922) 483-3580",
			"address": "228 Bartlett Street, Limestone, Wisconsin, 1843",
			"score": 521,
			"money": 1197.02,
			"percent": 0.0239
		}
	];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(61)
	var events = __webpack_require__(62)
	var Emitter = __webpack_require__(10)
	var ListRender = __webpack_require__(63)
	var domify = __webpack_require__(78)
	var classes = __webpack_require__(16)
	
	/**
	 * List constructor
	 *
	 * `option` optional option for [list-render](https://github.com/chemzqm/list-render)
	 * `option.delegate` delegate object for [reactive](https://github.com/chemzqm/reactive-lite)
	 * `option.bindings` bindings object for [reactive](https://github.com/chemzqm/reactive-lite)
	 * `option.filters` filters object for [reactive](https://github.com/chemzqm/reactive-lite)
	 * `option.model` optinal model class used for generate model
	 * `option.empty` String or Element rendered in parentNode when internal data list is empty
	 * `option.limit` the limit number for render when `setData()` (default no limit)
	 *
	 * @param {Element | String} el
	 * @param {Element} scrollable
	 * @param {Object} option
	 * @api public
	 */
	function Grid(el, option) {
	  if (!(this instanceof Grid)) return new Grid(el , option)
	  if (typeof el === 'string') el = domify(el)
	  this.el = el
	  option = option || {}
	  var template = el.querySelector('tbody > tr:last-child')
	  template.parentNode.removeChild(template)
	  var parentNode = el.querySelector('tbody')
	  option.limit = option.perpage
	  // super constructor
	  ListRender.call(this, template, parentNode, option)
	  this.handlers = {}
	  this.params = {perpage: option.perpage}
	  this.events = events(el, this.handlers)
	  this.headerEvents = events(el, this)
	  this.headerEvents.bind('click thead th', 'headerClick')
	  this.total = 0
	}
	
	inherits(Grid, ListRender)
	
	Emitter(Grid.prototype)
	
	/**
	 * Header click handler
	 *
	 * @param  {Event}  e
	 * @api private
	 */
	Grid.prototype.headerClick = function (e) {
	  var th = e.delegateTarget
	  if (!th.hasAttribute('data-sort')) return
	  e.preventDefault()
	  var field = th.getAttribute('data-sort')
	  var dir = (classes(th).has('desc')) ? -1 : 1
	  var ths = [].slice.call(th.parentNode.children)
	  ths.forEach(function (node) {
	    if (th === node) {
	      if (dir === 1) {
	        classes(th).remove('asc').add('desc')
	      } else {
	        classes(th).remove('desc').add('asc')
	      }
	    } else {
	      classes(node).remove('desc').remove('asc')
	    }
	  })
	  if (!field) throw new Error('no binding field found')
	  this.sort(field, dir)
	}
	
	
	/**
	 * Do something on dom change
	 *
	 * @api private
	 */
	Grid.prototype.onchange = function () {
	  if (this._local) {
	    var list = this.filtered || this.data
	    this.total = list.length
	  }
	  this.emit('change')
	}
	
	/**
	 * Set the total to `count`
	 * Used for remote mode only
	 *
	 * @param  {Number}  n
	 * @api public
	 */
	Grid.prototype.setTotal = function (count) {
	  if (this._local) throw new Error('setTotal expect to work at remote mode')
	  this.total = count
	  return this
	}
	
	/**
	 * Delegate event `type` to `selector` with `handler`,
	 * handler is called with event and a reactive model with content of
	 * delegate target
	 *
	 * @param {String} type
	 * @param {String} selector
	 * @param {Function} handler
	 * @api public
	 */
	Grid.prototype.bind = function (type, selector, handler) {
	  var name = type + ' ' + selector
	  var args = [].slice.call(arguments, 3)
	  var self = this
	  this.handlers[name] = function (e) {
	    var el = e.delegateTarget
	    var model = self.findModel(el)
	    var a = [e, model].concat(args)
	    handler.apply(e.target, a)
	  }
	  this.events.bind(name, name)
	  return this
	}
	
	/**
	 * Sort the data by field, direction or method, when it's remote mode(default mode), emit event only
	 *
	 * @param {String} field
	 * @param {Number|String} dir 1 or -1
	 * @param {Function} method
	 * @api public
	 */
	Grid.prototype.sort = function (field, dir, method) {
	  dir = parseInt(dir, 10)
	  if (this._local) {
	    this.sortData(field, dir, method)
	  } else {
	    this.params.sortField = field
	    this.params.sortDirection = dir
	    var params = assign({curpage: this.curpage}, this.params)
	    this.emit('sort', params)
	  }
	  return this
	}
	
	/**
	 * Filter the data with field and value
	 *
	 * @param {String} field
	 * @param {String | Function} val
	 * @api public
	 */
	Grid.prototype.filter = function (field, val) {
	  if (this._local) {
	    this.filterData(field, val)
	  } else {
	    var params = this.params
	    if (!field || val === '' || val == null) {
	      params.filterField = null
	      params.filterValue = null
	    } else {
	      params.filterField = field
	      params.filterValue = val
	    }
	    this.curpage = 0
	    params = assign({curpage: 0}, params)
	    this.emit('filter', params)
	  }
	  return this
	}
	
	/**
	 * Select page `n`
	 *
	 * @param  {Element}  n
	 * @api public
	 */
	Grid.prototype.select = function (n) {
	  if (!this.perpage) throw new Error('select expect perpage option')
	  if (this._local) {
	    ListRender.prototype.select.apply(this, arguments)
	  } else {
	    this.curpage = n
	    var params = this.params
	    params = assign({curpage: this.curpage}, params)
	    this.emit('page', params)
	  }
	  return this
	}
	
	/**
	 * Works in local mode
	 *
	 * @api public
	 */
	Grid.prototype.local = function () {
	  this._local = true
	  return this
	}
	
	/**
	 * Clean the list and unbind all event listeners
	 *
	 * @api public
	 */
	Grid.prototype.remove = function () {
	  if (this._removed) return
	  ListRender.prototype.remove.call(this)
	  this.emit('remove')
	  this.events.unbind()
	  this.off()
	  return this
	}
	
	/**
	 * Assign props
	 *
	 * @param {Object} to
	 * @param {Object} from
	 * @return {undefined}
	 * @api public
	 */
	function assign(to, from) {
	  Object.keys(from).forEach(function (k) {
	    to[k] = from[k]
	  })
	  return to
	}
	
	module.exports = Grid


/***/ },
/* 61 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var events = __webpack_require__(15);
	var delegate = __webpack_require__(54);
	
	/**
	 * Expose `Events`.
	 */
	
	module.exports = Events;
	
	/**
	 * Initialize an `Events` with the given
	 * `el` object which events will be bound to,
	 * and the `obj` which will receive method calls.
	 *
	 * @param {Object} el
	 * @param {Object} obj
	 * @api public
	 */
	
	function Events(el, obj) {
	  if (!(this instanceof Events)) return new Events(el, obj);
	  if (!el) throw new Error('element required');
	  if (!obj) throw new Error('object required');
	  this.el = el;
	  this.obj = obj;
	  this._events = {};
	}
	
	/**
	 * Subscription helper.
	 */
	
	Events.prototype.sub = function(event, method, cb){
	  this._events[event] = this._events[event] || {};
	  this._events[event][method] = cb;
	};
	
	/**
	 * Bind to `event` with optional `method` name.
	 * When `method` is undefined it becomes `event`
	 * with the "on" prefix.
	 *
	 * Examples:
	 *
	 *  Direct event handling:
	 *
	 *    events.bind('click') // implies "onclick"
	 *    events.bind('click', 'remove')
	 *    events.bind('click', 'sort', 'asc')
	 *
	 *  Delegated event handling:
	 *
	 *    events.bind('click li > a')
	 *    events.bind('click li > a', 'remove')
	 *    events.bind('click a.sort-ascending', 'sort', 'asc')
	 *    events.bind('click a.sort-descending', 'sort', 'desc')
	 *
	 * @param {String} event
	 * @param {String|function} [method]
	 * @return {Function} callback
	 * @api public
	 */
	
	Events.prototype.bind = function(event, method){
	  var e = parse(event);
	  var el = this.el;
	  var obj = this.obj;
	  var name = e.name;
	  var method = method || 'on' + name;
	  var args = [].slice.call(arguments, 2);
	
	  // callback
	  function cb(){
	    var a = [].slice.call(arguments).concat(args);
	    obj[method].apply(obj, a);
	  }
	
	  // bind
	  if (e.selector) {
	    cb = delegate.bind(el, e.selector, name, cb);
	  } else {
	    events.bind(el, name, cb);
	  }
	
	  // subscription for unbinding
	  this.sub(name, method, cb);
	
	  return cb;
	};
	
	/**
	 * Unbind a single binding, all bindings for `event`,
	 * or all bindings within the manager.
	 *
	 * Examples:
	 *
	 *  Unbind direct handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * Unbind delegate handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * @param {String|Function} [event]
	 * @param {String|Function} [method]
	 * @api public
	 */
	
	Events.prototype.unbind = function(event, method){
	  if (0 == arguments.length) return this.unbindAll();
	  if (1 == arguments.length) return this.unbindAllOf(event);
	
	  // no bindings for this event
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  // no bindings for this method
	  var cb = bindings[method];
	  if (!cb) return;
	
	  events.unbind(this.el, event, cb);
	};
	
	/**
	 * Unbind all events.
	 *
	 * @api private
	 */
	
	Events.prototype.unbindAll = function(){
	  for (var event in this._events) {
	    this.unbindAllOf(event);
	  }
	};
	
	/**
	 * Unbind all events for `event`.
	 *
	 * @param {String} event
	 * @api private
	 */
	
	Events.prototype.unbindAllOf = function(event){
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  for (var method in bindings) {
	    this.unbind(event, method);
	  }
	};
	
	/**
	 * Parse `event`.
	 *
	 * @param {String} event
	 * @return {Object}
	 * @api private
	 */
	
	function parse(event) {
	  var parts = event.split(/ +/);
	  return {
	    name: parts.shift(),
	    selector: parts.join(' ')
	  }
	}


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var Model = __webpack_require__(64)
	var Reactive = __webpack_require__(68)
	var domify = __webpack_require__(76)
	var uid = __webpack_require__(77)
	var body = document.body
	
	/**
	 * Cteate ListRender
	 *
	 * `template` repeat element or (template string) for rendering
	 * `parentNode` element for list element to append to
	 * `option` optional config obj
	 * `option.delegate` delegate object for [reactive]
	 * `option.bindings` bindings object for [reactive]
	 * `option.filters` filters object for [reactive]
	 * `option.model` model class used for generate model
	 * `option.limit` the limit number for render when `setData()` (default Infinity)
	 * `option.perpage` the limit number for paging, should >= limit
	 * `option.empty` String or Element rendered in parentNode when internal data list is empty
	 *
	 * @param  {Element}  template
	 * @param {Element} parentNode
	 * @param {Object} option
	 * @api public
	 */
	function ListRender(template, parentNode, option) {
	  if (!(this instanceof ListRender)) return new ListRender(template, parentNode, option)
	  if (typeof template === 'string') template = domify(template)
	  option = option || {}
	  var empty = option.empty
	  if (empty) {
	    this.emptyEl = typeof empty === 'string' ? domify(empty) : empty
	    delete option.empty
	  }
	  this.curpage = 0
	  this.curr = 0
	  this.parentNode = parentNode
	  this.template = template
	  this.reactives = []
	  this.data = []
	  assign(this, option)
	  this.limit = this.limit || Infinity
	}
	
	/**
	 * Set internal data array, and render them limit by `option.limit`
	 *
	 * @param {Array} array
	 * @api public
	 */
	ListRender.prototype.setData = function (array) {
	  this.data = array.slice()
	  this.renderRange(0, this.limit)
	}
	
	/**
	  Render more internal data, return `false` if no data to render
	 *
	 * @param {Number} max
	 * @return {Boolean}
	 * @api public
	 */
	ListRender.prototype.more = function (max) {
	  if (this.limit === Infinity) return false
	  var d = this.maxMoreCount()
	  if (d === 0) return false //no more items could render
	  var list = this.filtered || this.data
	  var from = this.curr
	  var to = from + Math.min(max, d)
	  var arr = list.slice(from ,to)
	  var fragment = this.createFragment(arr)
	  this.parentNode.appendChild(fragment)
	  this.curr = to
	  this.onchange()
	  return true
	}
	
	/**
	 * The max count of items can be rendered by more
	 *
	 * @return {number}
	 * @api public
	 */
	ListRender.prototype.maxMoreCount = function () {
	  // filter
	  var list = this.filtered || this.data
	  var l = list.length
	  var perpage = this.perpage
	  // no more data
	  if (this.curr >= l) return 0
	  var still = l - this.curr
	  // paging
	  if (perpage) {
	    var c = this.reactives.length
	    // page is full
	    if (c >= perpage) return 0
	    return Math.min(perpage - c, still)
	  }
	  return still
	}
	/**
	 * Append more data and render them, no refresh
	 *
	 * @param {Array} array
	 * @api public
	 */
	ListRender.prototype.appendData = function (array) {
	  this.data = this.data.concat(array)
	  var fragment = this.createFragment(array)
	  this.parentNode.appendChild(fragment)
	  this.curr = this.curr + array.length
	  this.onchange()
	}
	/**
	 * Prepend more data and render them, no refresh
	 *
	 * @param {Array} array
	 * @api public
	 */
	ListRender.prototype.prependData = function (array) {
	  this.data = array.concat(this.data)
	  var fragment = this.createFragment(array)
	  prepend(this.parentNode, fragment)
	  this.curr = this.curr + array.length
	  this.onchange()
	}
	
	/**
	 * Empty the exist list, and render the specific range of
	 * internal data array (end not included, no option.limit restrict)
	 *
	 * @param {Number} start
	 * @param {Number}  [end]
	 * @api public
	 */
	ListRender.prototype.renderRange = function (start, end) {
	  this.clean()
	  var list = this.filtered || this.data
	  this.curr= end = Math.min(list.length, end)
	  var arr = list.slice(start, end)
	  if (arr.length === 0) {
	    this.empty(true)
	    this.onchange()
	    return
	  }
	  this.empty(false)
	  var fragment = this.createFragment(arr)
	  this.parentNode.appendChild(fragment)
	  this.onchange()
	}
	/**
	 * Filter the internal data with `field` and `val` (or function used for array.filter), and render them limit by `option.limit`
	 * When val or field is falsy, render all with limit by `option.limit`
	 *
	 * @param {String} field
	 * @param {String|Function} val
	 * @return {Number}
	 * @api public
	 */
	ListRender.prototype.filterData = function (field, val) {
	  var fn
	  if (typeof field === 'function') {
	    fn = field
	  } else if (typeof val ==='function') {
	    fn = val
	  } else if (!field || val === '' || typeof val === 'undefined') {
	    fn = function () {return true}
	  } else if (typeof val === 'string') {
	    val = val.replace('\\','\\\\').replace(/\s+/,'').split(/\s*/g).join('.*')
	    var re = new RegExp(val, 'i')
	    fn = function (o) {
	      return re.test(String(o[field]))
	    }
	  } else {
	    fn = function (o) {
	      return String(o[field]) == String(val)
	    }
	  }
	  var arr = this.filtered = this.data.filter(fn)
	  var l = arr.length
	  if (l === this.data.length) this.filtered = null
	  if (this.perpage) {
	    this.select(0)
	  } else {
	    this.renderRange(0, this.limit)
	  }
	  return l
	}
	
	/**
	 * Sort the data with `field` `direction` ( 1 or -1 for ascend and descend)
	 * and optional method (`string` or `number`, or a sort function for javascript array),
	 * render them limit by `option.limit`
	 *
	 * @param {String} field
	 * @param {Number} dir
	 * @param {String|Function} method
	 * @return {undefined}
	 * @api public
	 */
	ListRender.prototype.sortData = function (field, dir, method) {
	  var data = this.filtered || this.data
	  dir = parseInt(dir, 10)
	  if (!dir) throw new Error('direction should only be 1 or -1')
	  data.sort(function (obj, other) {
	    if (typeof method === 'function') {
	      return method(obj, other) * dir
	    }
	    var a = obj[field]
	    var b = other[field]
	    switch (method) {
	      case 'number':
	        a = Number(a)
	        b = Number(b)
	        break
	      case 'string':
	        a = a.trim()
	        b = b.trim()
	        break
	    }
	    return (a < b ? 1 : -1) * dir
	  })
	  if (this.perpage) {
	    this.select(this.curpage)
	  } else {
	    this.renderRange(0, this.limit)
	  }
	}
	
	/**
	 * Find a specific model instance related by element, useful for event delegate
	 *
	 * @param  {Element}  el
	 * @return {reactive}
	 * @api public
	 */
	ListRender.prototype.findModel = function (el) {
	  do {
	    if (el.parentNode === this.parentNode) break
	    if (el === body) return null
	    el = el.parentNode
	  } while (el.parentNode);
	  for (var i = this.reactives.length - 1; i >= 0; i--) {
	    var r = this.reactives[i];
	    if (r.el === el) return r.model;
	  }
	  return null
	}
	
	ListRender.prototype.remove = function () {
	  if (this._removed) return
	  this._removed = true
	  this.clean()
	  delete this.reactives
	  delete this.data
	  delete this.filtered
	}
	
	/**
	 * Show or hide the empty element
	 *
	 * @param {Boolean} show
	 * @api private
	 */
	ListRender.prototype.empty = function (show) {
	  var el = this.emptyEl
	  if (!el) return
	  if (show) {
	    this.parentNode.appendChild(el)
	  } else if (el.parentNode) {
	    this.parentNode.removeChild(el)
	  }
	}
	
	/**
	 * Clean all list items
	 *
	 * @api private
	 */
	ListRender.prototype.clean = function () {
	  // reactive remove would trigger array splice
	  this.reactives.slice().forEach(function (reactive) {
	    reactive.remove()
	  })
	}
	
	/**
	 * Create reactive config and model class by plain obj
	 *
	 * @param  {Object} obj
	 * @return {undefined}
	 * @api public
	 */
	ListRender.prototype.createReactiveConfig = function (obj) {
	  var model
	  if (this.model) {
	    model = this.model(obj)
	  } else {
	    var clz = this.model = createModelClass(Object.keys(obj))
	    model = clz(obj)
	  }
	  this.primaryKey = obj.hasOwnProperty('id') ? 'id' :
	                    obj.hasOwnProperty('_id') ? '_id': null
	  var opt = {
	    delegate: this.delegate,
	    bindings: this.bindings,
	    filters: this.filters
	  }
	  return Reactive.generateConfig(this.template, model, opt)
	}
	
	/**
	 * Append remove to model
	 *
	 * @param {Object} model
	 * @api private
	 */
	ListRender.prototype.appendRemove = function (model, reactive) {
	  var orig = model.remove
	  var id = reactive.id
	  var self = this
	  var fn = function (res) {
	    if (res === false) return
	    self.removeDataById(id)
	    self.curr = Math.max(0, self.curr - 1)
	    reactive.remove()
	    self.onchange(true)
	  }
	  if (orig && typeof orig !== 'function') throw new TypeError('remove is not a function on model')
	  if (!orig) {
	    model.remove = fn
	  } else {
	    model.remove = function () {
	      var res = orig.apply(this, arguments)
	      if (res && typeof res.then === 'function') {
	        res.then(fn, function () {})
	      } else {
	        fn()
	      }
	    }
	  }
	}
	
	/**
	 * Create reactive instance from object
	 *
	 * @param  {Object}  obj
	 * @return {Reactive}
	 * @api private
	 */
	ListRender.prototype.createReactive = function (obj) {
	  var el = this.template.cloneNode(true)
	  var model = this.model(obj)
	  var id
	  if (this.primaryKey == null) {
	    this.primaryKey = '_id'
	    id = obj[this.primaryKey] = uid(10)
	  } else {
	    id = obj[this.primaryKey]
	  }
	  var opt = {
	    delegate: this.delegate,
	    bindings: this.bindings,
	    filters: this.filters,
	    config: this.config
	  }
	  var reactive = Reactive(el, model, opt)
	  reactive.id = id
	  this.appendRemove(model, reactive)
	  var list = this.reactives
	  list.push(reactive)
	  // remove from list
	  reactive.on('remove', function () {
	    var i = list.indexOf(reactive)
	    list.splice(i, 1)
	  })
	  return reactive
	}
	
	/**
	 * Remove data inside internal list by id
	 *
	 * @param {String|Number} id
	 * @return {undefined}
	 * @api private
	 */
	ListRender.prototype.removeDataById = function (id) {
	  var pk = this.primaryKey
	  removeItem(this.data, pk, id)
	  if (this.filtered) {
	    removeItem(this.filtered, pk, id)
	  }
	}
	
	function removeItem(arr, key, val) {
	  for (var i = arr.length - 1; i >= 0; i--) {
	    var v = arr[i]
	    if (v && v[key] === val) {
	      arr.splice(i, 1)
	      return
	    }
	  }
	}
	/**
	 * Get fragment from array of object
	 *
	 * @param  {Array}  arr
	 * @api private
	 */
	ListRender.prototype.createFragment = function (arr) {
	  var obj = arr[0]
	  if (typeof this.config === 'undefined' && obj) this.config = this.createReactiveConfig(obj)
	  var fragment = document.createDocumentFragment()
	  arr.forEach(function (obj) {
	    var reactive = this.createReactive(obj)
	    fragment.appendChild(reactive.el)
	  }, this)
	  return fragment
	}
	
	/**
	 * Select page by page number,
	 * rerender even if page number not change, eg: filter
	 *
	 * @param  {Number}  n
	 * @api public
	 */
	ListRender.prototype.select = function (n) {
	  if (!this.perpage) throw new Error('perpage required in option')
	  var s = n*this.perpage
	  var e = (n + 1)*this.perpage
	  e = Math.min(e, s + this.limit)
	  this.curpage = n
	  this.renderRange(s, e)
	}
	
	/**
	 * Show previous page
	 *
	 * @api public
	 */
	ListRender.prototype.prev = function () {
	  this.select(Math.max(0, this.curpage - 1))
	}
	
	/**
	 * Show next page
	 *
	 * @api public
	 */
	ListRender.prototype.next = function () {
	  var list = this.filtered || this.data
	  var max = Math.ceil(list.length/this.perpage) -1
	  this.select(Math.min(max, this.curpage + 1))
	}
	
	/**
	 * Interface for extra action after dom changed
	 *
	 * @api private
	 */
	ListRender.prototype.onchange = function (isRemove) { // eslint-disable-line
	}
	
	/**
	 * Prepend parentNode with newNode
	 *
	 * @param {Element} parentNode
	 * @param {Element} newNode
	 * @api private
	 */
	function prepend(parentNode, newNode) {
	  var node = parentNode.firstChild;
	  if (node) {
	    parentNode.insertBefore(newNode, node)
	  } else {
	    parentNode.appendChild(newNode)
	  }
	}
	
	/**
	 * Assign properties
	 *
	 * @param {Object} to
	 * @param {Object} from
	 * @return {Object}
	 * @api private
	 */
	function assign(to, from) {
	  Object.keys(from).forEach(function (k) {
	    to[k] = from[k]
	  })
	  return to
	}
	
	/**
	 * Create model class by keys
	 *
	 * @param {Array} keys
	 * @return {Function}
	 */
	function createModelClass(keys) {
	  var name = uid(5)
	  var clz = Model(name)
	  keys.forEach(function (k) {
	    clz.attr(k)
	  })
	  return clz
	}
	
	module.exports = ListRender


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var proto = __webpack_require__(65)
	var util = __webpack_require__(67)
	var buildinRe = /^(\$stat|changed|emit|clean|on|off|attrs)$/
	
	/**
	 * Expose `createModel`.
	 */
	
	module.exports = createModel
	
	/**
	 * Create a new model constructor with the given `name`.
	 *
	 * @param {String} name
	 * @return {Function}
	 * @api public
	 */
	
	function createModel(name) {
	  if ('string' != typeof name) throw new TypeError('model name required')
	
	  /**
	   * Initialize a new model with the given `attrs`.
	   *
	   * @param {Object} attrs
	   * @api public
	   */
	
	  function model(attrs) {
	    if (!(this instanceof model)) return new model(attrs)
	    attrs = attrs || {}
	    this._callbacks = {}
	    this.origAttrs = attrs
	    this.attrs = util.assign({}, attrs)
	  }
	
	  // statics
	
	  model.modelName = name
	  model.options = {}
	
	  // prototype
	
	  model.prototype = {}
	  model.prototype.model = model;
	
	  /**
	   * Define instance method
	   *
	   * @param {String} name
	   * @param {Function} fn
	   * @return {Function} self
	   * @api public
	   */
	  model.method = function (name, fn) {
	    this.prototype[name] = fn
	    return this
	  }
	
	  /**
	   * Use function as plugin
	   *
	   * @param {Function} fn
	   * @return {Function} self
	   * @api public
	   */
	  model.use = function (fn) {
	    fn(this)
	    return this
	  }
	
	  /**
	  * Define attr with the given `name` and `options`.
	  *
	  * @param {String} name
	  * @param {Object} optional options
	  * @return {Function} self
	  * @api public
	  */
	
	  model.attr = function(name, options){
	    options = options || {}
	    this.options[name] = options
	
	    if ('id' === name || '_id' === name) {
	      this.options[name].primaryKey = true
	      this.primaryKey = name
	    }
	
	    if (buildinRe.test(name)) throw new Error(name + ' could not be used as field name')
	
	    Object.defineProperty(this.prototype, name, {
	      set: function (val) {
	        var prev = this.attrs[name]
	        var diff = util.diffObject(this.attrs, this.origAttrs)
	        var changedNum = Object.keys(diff).length
	        this.attrs[name] = val
	        this.emit('change', name, val, prev)
	        this.emit('change ' + name, val, prev)
	        if (prev === val) return
	        // make sure when multiple properties changed, only emit once
	        if (changedNum === 0) return this.emit('change $stat', true)
	        if (changedNum === 1 && diff[name] === val) {
	          // became clean
	          this.emit('change $stat', false)
	        }
	      },
	      get: function () {
	        return this.attrs[name]
	      }
	    })
	
	    return this
	  }
	
	  var key
	  for (key in proto) model.prototype[key] = proto[key]
	
	  return model
	}
	


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var Emitter = __webpack_require__(66)
	var util = __webpack_require__(67)
	
	/**
	 * Mixin emitter.
	 */
	
	Emitter(exports)
	
	
	/**
	 * Return `false` or an object
	 * containing the "dirty" attributes.
	 *
	 * Optionally check for a specific `attr`.
	 *
	 * @param {String} [attr]
	 * @return {Object|Boolean}
	 * @api public
	 */
	
	exports.changed = function(attr){
	  var changed = util.diffObject(this.origAttrs, this.attrs)
	  if (typeof changed[attr] !== 'undefined') {
	    return changed[attr]
	  }
	  if (Object.keys(changed).length === 0) return false
	  return changed
	}
	
	/**
	 * Set current attrs as original attrs
	 *
	 * @api public
	 */
	exports.clean = function(){
	  for (var k in this.attrs) {
	    this.origAttrs[k] = this.attrs[k]
	  }
	  this.emit('change $stat', false)
	}
	
	
	/**
	 * Set multiple `attrs`.
	 *
	 * @param {Object} attrs
	 * @return {Object} self
	 * @api public
	 */
	
	exports.set = function(attrs){
	  for (var key in attrs) {
	    this[key] = attrs[key]
	  }
	  return this
	}
	
	
	/**
	 * Return the JSON representation of the model.
	 *
	 * @return {Object}
	 * @api public
	 */
	
	exports.toJSON = function(){
	  return this.attrs
	}
	
	/**
	 * Check if `attr` is present (not `null` or `undefined`).
	 *
	 * @param {String} attr
	 * @return {Boolean}
	 * @api public
	 */
	
	exports.has = function(attr){
	  return null != this.attrs[attr]
	}


/***/ },
/* 66 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 67 */
/***/ function(module, exports) {

	/**
	 * Simple diff without nested check
	 * Return the changed props from b
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @api public
	 */
	exports.diffObject = function (a, b) {
	  var res = {}
	  for (var k in a) {
	    if (a[k] !== b[k]) {
	      res[k] = b[k]
	    }
	  }
	  return res
	}
	
	/**
	 * Assign props from `from` to `to` return to
	 *
	 * @param {Object} to
	 * @param {Object} from
	 * @return {Object}
	 * @api public
	 */
	exports.assign = function (to, from) {
	  Object.keys(from).forEach(function (k) {
	    to[k] = from[k]
	  })
	  return to
	}
	


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(69)


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(70)
	var domify = __webpack_require__(72)
	var Binding = __webpack_require__(73)
	var bindings = __webpack_require__(74)
	var Emitter = __webpack_require__(10)
	var filters = __webpack_require__(75)
	
	/**
	 * Reactive
	 *
	 * @param {Element|String} el element or template string
	 * @param {Object} model model with change event emitted
	 * @param {Object} option [Optional] object with `delegate` `bindings` `filters` etc
	 * @api public
	 */
	function Reactive(el, model, option) {
	  if(!(this instanceof Reactive)) return new Reactive(el, model, option)
	  if (typeof el === 'string') el = domify(el)
	  option = option || {}
	  this.bindings = util.assign({}, bindings)
	  // custom bindings first
	  util.assign(this.bindings, option.bindings || {})
	  this.filters = util.assign({}, filters)
	  // custom filters first
	  util.assign(this.filters, option.filters || {})
	  this.binding_names = Object.keys(this.bindings)
	  this.delegate = option.delegate || {}
	  this.model = model
	  this.el = el
	  var config = option.config
	  if (option.nobind) return
	  if (config == null) {
	    // this.checkModel(model)
	    config = this.config = this.generateConfig()
	    this._bindConfig(config)
	  } else {
	    this._bindConfig(config)
	  }
	}
	
	Emitter(Reactive.prototype)
	
	/**
	 * Remove element and unbind events
	 *
	 * @api public
	 */
	Reactive.prototype.remove = function () {
	  if (this._removed) return
	  if (this.el.parentNode) this.el.parentNode.removeChild(this.el)
	  this._removed = true
	  this.emit('remove')
	  // The model may still using, not destroy it
	  this.model = null
	  this.off()
	}
	
	/**
	 * Use generated binding config
	 *
	 * @param {Array} config
	 * @api private
	 */
	Reactive.prototype._bindConfig = function (config) {
	  var root = this.el
	  var reactive = this
	  config.forEach(function (o) {
	    var el = util.findElement(root, o.indexes)
	    var binding = new Binding(reactive, el, o.bindings)
	    binding.active(el)
	    reactive.on('remove', function () {
	      binding.remove()
	    })
	  })
	}
	
	/**
	 * Parse binding object for no
	 *
	 * @param {Element} node
	 * @return {Binding}
	 * @api public
	 */
	Reactive.prototype.parseBinding = function (node, single) {
	  var binding
	  if (node.nodeType === 3) {
	    binding = new Binding(this, node)
	    binding.interpolation(node.textContent)
	  } else if (node.nodeType === 1) {
	    var attributes = node.attributes
	    binding = new Binding(this, node)
	    for (var i = 0, l = attributes.length; i < l; i++) {
	      var name = attributes[i].name
	      var val = attributes[i].value
	      if (~this.binding_names.indexOf(name)) {
	        binding.add(name, val)
	      }
	    }
	    if (single) {
	      binding.interpolation(node.textContent)
	    }
	  }
	  // empty binding
	  if (binding && binding.bindings.length === 0) {
	    binding.remove()
	    binding = null
	  }
	  return binding
	}
	
	/**
	 * Subscribe to prop change on model
	 *
	 * @param {String} prop
	 * @param {Function} fn
	 * @api public
	 */
	Reactive.prototype.sub = function (prop, fn) {
	  var model = this.model
	  model.on('change ' + prop, fn)
	  this.on('remove', function () {
	    model.off('change ' + prop, fn)
	  })
	}
	
	/**
	 * Get delegate function by function name
	 *
	 * @param {String} name
	 * @param {Object} reactive
	 * @return {Function}
	 * @api public
	 */
	Reactive.prototype.getDelegate = function (name) {
	  var delegate = this.delegate
	  var fn = delegate[name]
	  if (!fn || typeof fn !== 'function') throw new Error('can\'t find delegate function for[' + name + ']')
	  return fn
	}
	
	/**
	 * Generate config array
	 *
	 * @return {Array}
	 * @api public
	 */
	Reactive.prototype.generateConfig = function () {
	  var reactive = this
	  var config = []
	  util.iterate(this.el, function (node, indexes) {
	    var single = util.isSingle(node)
	    var binding = reactive.parseBinding(node, single)
	    if (binding) {
	      config.push({
	        indexes: indexes,
	        bindings: binding.bindings
	      })
	      binding.remove()
	    }
	  }.bind(this), [])
	  return config
	}
	
	/**
	 * Bind a new model
	 *
	 * @param {Object} model
	 * @api public
	 */
	Reactive.prototype.bind = function (model) {
	  this.model = model
	  this._bindConfig(this.config)
	}
	
	/**
	 * Generate config array by the same arguments as Reactive constructor
	 *
	 * @param {Element} el
	 * @param {Object} model
	 * @param {Object} opt
	 * @return {Array}
	 * @api public
	 */
	Reactive.generateConfig = function (el, model, opt) {
	  if (typeof el === 'string') el = domify(el)
	  opt = opt || {}
	  opt.nobind = true
	  var reactive =  Reactive(el, model, opt)
	  return reactive.generateConfig()
	}
	
	/**
	 * Create custom bindings with attribute name and function witch is call with
	 * property value eg:
	 * Reactive.createBinding('data-sum', function (value) {
	 *    var props = value.split(',')
	 *    this.bind(props, function (el, model) {
	 *      var val = props.reduce(function(pre, name) {
	 *        return pre + model[name]
	 *      }, 0)
	 *      el.textContent = val
	 *   })
	 * })
	 *
	 *
	 * @param {String} name attribute name
	 * @param {Function} fn
	 * @api public
	 */
	Reactive.createBinding = function (name, fn) {
	  var names = Object.keys(bindings)
	  if (~names.indexOf(name)) throw new Error('Global binding name [' + name+ '] already in use')
	  bindings[name] = fn
	}
	
	/**
	 * Create global custom filter with `name` and `function`
	 * eg:
	 *  Reactive.createFilter('integer', function (str) {
	 *   if (!str) return 0
	 *   var res = parseInt(str, 10)
	 *   return isNaN(res) ? 0 : res
	 * })
	 *
	 * @param {String} name
	 * @param {Function} fn
	 * @api public
	 */
	Reactive.createFilter = function (name, fn) {
	  if (filters[name]) throw new Error('Global filter name [' + name + '] already in use')
	  filters[name] = fn
	}
	
	// use with caution
	Reactive.filters = filters
	Reactive.bindings = bindings
	
	module.exports = Reactive


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var unique = __webpack_require__(71)
	var funcRe = /\([^\s]*\)$/
	
	/**
	 * Check if node has no element child
	 *
	 * @param {Element} node
	 * @return {Boolean}
	 * @api public
	 */
	var isSingle = exports.isSingle = function (node) {
	  var list = node.childNodes
	  var single = true
	  for (var i = list.length - 1; i >= 0; i--) {
	    var v = list[i]
	    if (v.nodeType === 1) {
	      single = false
	      break
	    }
	  }
	  return single
	}
	
	/**
	 * Parse bindings from function, function calls ignored
	 *
	 * @param {Function} fn
	 * @param {Boolean} firstParam or this
	 * @return {Array}
	 * @api private
	 */
	exports.parseBindings = function (fn, firstParam) {
	  var res = []
	  var str = fn.toString()
	  var arr
	  var param
	  if (firstParam) {
	    var ms = str.match(/\(([A-Za-z0-9_$]+?)(?:[\s,)])/)
	    param = ms ? ms[1] : null
	  } else {
	    param = 'this'
	  }
	  var re = new RegExp('\\b' + param + '\\.([\\w_$]+)\\b(?!([\\w$_]|\\s*\\())', 'g')
	  while ((arr = re.exec(str)) !== null) {
	    res.push(arr[1])
	  }
	  return unique(res)
	}
	
	
	/**
	 * Parse str to get the bindings and render function
	 * eg: {first} {last} => {
	 *  bindings: ['first', 'last'],
	 *  fn: function(model) { return model.first + '' + model.last}
	 * }
	 *
	 * @param {string} str textContent
	 * @return {object} bindings and render function
	 * @api public
	 */
	exports.parseInterpolationConfig = function (str) {
	  var bindings = []
	  // function names
	  var fns = []
	  var res = '"'
	  var inside = false
	  var name = ''
	  for (var i = 0; i < str.length; i++) {
	    var c = str[i]
	    if (c === '{') {
	      inside = true
	      res = res + '"'
	    } else if (c === '}') {
	      inside = false
	      res = res + ' + '
	      name = name.trim()
	      if (!name) {
	        res = res + '""'
	      } else if (/\|/.test(name)) {
	        res = res + parseFilters(name, bindings, fns)
	      } else {
	        res = res + 'model.' + name
	        parseStringBinding(name, bindings, fns)
	      }
	      res = res + '+ "'
	      name = ''
	    } else if (inside) {
	      name = name + c
	    } else {
	      if (c === '"') c = '\\"'
	      res = res + c
	    }
	  }
	  res = res.replace(/\n/g, '\\n')
	  res = res + '"'
	  var fn = new Function('model', 'filter', ' return ' + res)
	  return {
	    bindings: unique(bindings),
	    fns: unique(fns),
	    fn: fn
	  }
	}
	
	/**
	 * Parse filters in string, concat them into js function
	 * If there is function call, push the function name into fns eg:
	 * 'first | json' => 'filter.json(model.first)'
	 * 'first | nonull | json' => 'filter.json(filter.nonull(model.first))'
	 *
	 * @param {String} str
	 * @param {Array} fns
	 * @return {String}
	 * @api public
	 */
	var parseFilters = exports.parseFilters = function (str, bindings, fns) {
	  var res = ''
	  if (str[0] === '|') throw new Error('Interpolation can\'t starts with `|` [' + str + ']')
	  var arr = str.split(/\s*\|\s*/)
	  var name = arr[0]
	  res = 'model.' + name
	  parseStringBinding(name, bindings, fns)
	  for (var i = 1; i < arr.length; i++) {
	    var f = arr[i].trim()
	    if (f) {
	      var parts = f.match(/^([\w$_]+)(.*)$/)
	      var args
	      if (parts[2]) {
	        args = parseArgs(parts[2].trim())
	        res = 'filter.' + parts[1] + '(' + res + ', ' + args.join(', ') + ')'
	      } else {
	        res = 'filter.' + f + '(' + res + ')'
	      }
	    }
	  }
	  return res
	}
	
	/**
	 * Parse string binding into bindings or fns
	 * eg: 'first' => bindings.push('first')
	 *     'first.last' => bindings.push('first')
	 *     'name.first()' => bindings.push('name')
	 *     'first()' => fns.push('first')
	 *
	 * @param {String} str
	 * @api public
	 */
	var parseStringBinding = exports.parseStringBinding = function (str, bindings, fns) {
	  // if nested, only bind the root property
	  if (~str.indexOf('.')) str = str.replace(/\.[^\s]+$/,'')
	  if (funcRe.test(str)) {
	    fns.push(str.replace(funcRe, ''))
	  } else {
	    bindings.push(str)
	  }
	}
	
	/**
	 * Parse the filter function name from function string
	 * Used for check
	 *
	 * @param {Function} fn
	 * @return {Array}
	 * @api public
	 */
	var filterCallRe = /\bfilter\.([^\s(]+?)\b/g
	exports.parseFilterNames = function (fn) {
	  var res = []
	  var str = fn.toString()
	  var arr
	  while ((arr = filterCallRe.exec(str)) !== null) {
	    res.push(arr[1])
	  }
	  return unique(res)
	}
	
	/**
	 * Check if `str` has interpolation.
	 *
	 * @param {String} str
	 * @return {Boolean}
	 * @api private
	 */
	
	exports.hasInterpolation = function(str) {
	  return !!~str.indexOf('{')
	}
	
	/**
	 * Iterate element with process function and pass generated indexes
	 *
	 * @param {Element} el
	 * @param {Function} process
	 * @param {Array} indexes
	 * @api public
	 */
	var iterate = exports.iterate = function (el, process, indexes) {
	  var single = isSingle(el)
	  process(el, indexes)
	  if (single) return
	  for (var i = 0, l = el.childNodes.length; i < l; i++) {
	    var node = el.childNodes[i]
	    iterate(node, process, indexes.slice().concat([i]))
	  }
	}
	
	/**
	 * Find element with indexes array and root element
	 *
	 * @param {Element} root
	 * @param {Array} indexes
	 * @api public
	 */
	exports.findElement = function (root, indexes) {
	  var res = root
	  for (var i = 0; i < indexes.length; i++) {
	    var index = indexes[i]
	    res = res.childNodes[index]
	    if (!res) return
	  }
	  return res
	}
	
	/**
	 * Parse arguments from string eg:
	 * 'a' false 3 => ['a', false, 3]
	 *
	 * @param {String} str
	 * @return {Array}
	 * @api public
	 */
	var parseArgs = exports.parseArgs = function(str) {
	  var strings = []
	  var s = str.replace(/(['"]).+?\1/g, function (str) {
	    strings.push(str)
	    return '$'
	  })
	  var arr = s.split(/\s+/)
	  for (var i = 0, l = arr.length; i < l; i++) {
	    var v= arr[i]
	    if (v === '$') {
	      arr[i] = strings.shift()
	    }
	  }
	  return arr
	}
	
	/**
	 * Copy properties from `from` to `to` and return `to`
	 *
	 * @param {Object} to
	 * @param {Object} from
	 * @return {Object}
	 * @api public
	 */
	exports.assign = function (to, from) {
	  Object.keys(from).forEach(function (k) {
	    to[k] = from[k]
	  })
	  return to
	}


/***/ },
/* 71 */
/***/ function(module, exports) {

	/*!
	 * array-unique <https://github.com/jonschlinkert/array-unique>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	module.exports = function unique(arr) {
	  if (!Array.isArray(arr)) {
	    throw new TypeError('array-unique expects an array.');
	  }
	
	  var len = arr.length;
	  var i = -1;
	
	  while (i++ < len) {
	    var j = i + 1;
	
	    for (; j < arr.length; ++j) {
	      if (arr[i] === arr[j]) {
	        arr.splice(j--, 1);
	      }
	    }
	  }
	  return arr;
	};


/***/ },
/* 72 */
/***/ function(module, exports) {

	
	/**
	 * Expose `parse`.
	 */
	
	module.exports = parse;
	
	/**
	 * Tests for browser support.
	 */
	
	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}
	
	/**
	 * Wrap map from jquery.
	 */
	
	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};
	
	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];
	
	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];
	
	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */
	
	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');
	
	  // default to the global `document` object
	  if (!doc) doc = document;
	
	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);
	
	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace
	
	  var tag = m[1];
	
	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }
	
	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;
	
	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }
	
	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }
	
	  return fragment;
	}


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var unique = __webpack_require__(71)
	var util = __webpack_require__(70)
	
	/**
	 * Create binding instance with reactive and el
	 *
	 * @param {Reactive} reactive
	 * @param {Element} el
	 * @param {Array} optional predefined bindings
	 * @api public
	 */
	function Binding(reactive, el, bindings) {
	  this._reactive = reactive
	  this.bindings = bindings || []
	  this.el = el
	}
	
	/**
	 * Add text interpolation binding
	 *
	 * @param {String} textContent el textContent
	 * @api public
	 */
	Binding.prototype.interpolation = function (textContent) {
	  if (textContent.trim() === '') return
	  if (!util.hasInterpolation(textContent)) return
	  var config = util.parseInterpolationConfig(textContent)
	  var props = config.bindings
	  var filters = this._reactive.filters
	  var fns = config.fns
	  if (fns.length) {
	    var arr = this.parseFunctionBindings(fns)
	    props = unique(props.concat(arr))
	  }
	  props = this.filterBindings(props)
	  var func = function (el) {
	    var model = this._reactive.model
	    var render = function () {
	      // much better performance than innerHTML
	      el.textContent = config.fn(model, filters)
	    }
	    this.bindReactive(props, render)
	    render()
	  }
	  this.bindings.push(func)
	}
	
	/**
	 * Get model bindings from function names
	 *
	 * @param {Array} fns function name
	 * @return {Array}
	 * @api private
	 */
	Binding.prototype.parseFunctionBindings = function (fns) {
	  var res = []
	  var model = this._reactive.model
	  fns.forEach(function (name) {
	    var fn = model[name]
	    if (!fn || typeof fn !== 'function') throw new Error('Can\'t find function [' + name + '] on model')
	    res = res.concat(util.parseBindings(fn))
	  })
	  return unique(res)
	}
	
	/**
	 * Add a binding by element attribute
	 *
	 * @param {String} attr attribute name
	 * @param {String} value attribute value
	 * @api public
	 */
	Binding.prototype.add = function (attr, value) {
	  // custom bindings first
	  var fn = this._reactive.bindings[attr]
	  // no binding should be ok
	  if (!fn) return
	  // custom bindings don't return function
	  var func = fn.call(this, value)
	  if (func) this.bindings.push(func)
	}
	
	/**
	 * Filter binding names with model
	 *
	 * @param {Array} props binding names
	 * @return {Array}
	 * @api public
	 */
	Binding.prototype.filterBindings = function (props) {
	  var model = this._reactive.model
	  return props.filter(function (name) {
	    return (name in model)
	  })
	}
	
	/**
	 * Bind all bindings to the element
	 *
	 * @param {Element} el
	 * @api public
	 */
	Binding.prototype.active = function (el) {
	  var self = this
	  if (this.bindings.length === 0) return
	  this.bindings.forEach(function (fn) {
	    fn.call(self, el)
	  })
	}
	
	/**
	 * Bind eventlistener to model attribute[s]
	 *
	 * @param {String|Array} props model attribute[s]
	 * @param {Function} fn listener
	 * @api private
	 */
	Binding.prototype.bindReactive = function (props, fn) {
	  var reactive = this._reactive
	  if (typeof props === 'string') {
	    reactive.sub(props, fn)
	  } else {
	    props.forEach(function (prop) {
	      reactive.sub(prop, fn)
	    })
	  }
	}
	
	/**
	 * Remove this binding
	 *
	 * @api public
	 */
	Binding.prototype.remove = function () {
	  this.bindings = null
	  delete this._reactive
	  delete this.el
	}
	
	/**
	 * Custom binding method: bind properties with function
	 * function is called with element and model
	 *
	 * @param {String|Array} bindings bind properties
	 * @param {Function} fn callback function
	 * @api public
	 */
	Binding.prototype.bind = function (bindings, fn) {
	  var func = function (el) {
	    var self = this
	    var model = this._reactive.model
	    var render = function () {
	      fn.call(self, model, el)
	    }
	    this.bindReactive(bindings, render)
	    render()
	  }
	  this.bindings.push(func)
	}
	
	
	module.exports = Binding


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(70)
	var event = __webpack_require__(15)
	
	/**
	 * Attributes supported.
	 */
	var attrs = [
	  'id',
	  'src',
	  'rel',
	  'cols',
	  'rows',
	  'name',
	  'href',
	  'title',
	  'class',
	  'style',
	  'width',
	  'value',
	  'height',
	  'tabindex',
	  'placeholder'
	]
	/*
	 * events supported
	 */
	var events = [
	  'change',
	  'touchstart',
	  'touchend',
	  'click',
	  'dblclick',
	  'mousedown',
	  'mouseup',
	  'mousemove',
	  'mouseenter',
	  'mouseleave',
	  'scroll',
	  'blur',
	  'focus',
	  'input',
	  'submit',
	  'keydown',
	  'keypress',
	  'keyup'
	]
	
	/**
	 * Create data-render binding with property value
	 *
	 * @param {String} value
	 * @api public
	 */
	exports['data-render'] = function (value) {
	  var fn = this._reactive.getDelegate(value)
	  var bindings = util.parseBindings(fn, true)
	  bindings = this.filterBindings(bindings)
	  return function (el) {
	    var model = this._reactive.model
	    var context = this._reactive.delegate
	    var render = function () {
	      fn.call(context, model, el)
	    }
	    this.bindReactive(bindings, render)
	    render()
	  }
	}
	
	/**
	 * Create attribute interpolation bindings
	 *
	 */
	attrs.forEach(function (attr) {
	  // attribute bindings
	  exports['data-' + attr] = function (value) {
	    var hasInterpolation = util.hasInterpolation(value)
	    var config = util.parseInterpolationConfig(value)
	    var bindings = config.bindings
	    bindings = this.filterBindings(bindings)
	    var func = config.fn
	    var filters = this._reactive.filters
	    return function (el) {
	      var model = this._reactive.model
	      var fn = function () {
	        if (!hasInterpolation) {
	          el.setAttribute(attr, value)
	        } else {
	          // no escape for attribute
	          var str = func(model, filters)
	          el.setAttribute(attr, str)
	        }
	      }
	      this.bindReactive(bindings, fn)
	      fn()
	    }
	  }
	})
	
	/**
	 * Create event bindings
	 *
	 */
	events.forEach(function (name) {
	  exports['on-' + name] = function (value) {
	    var fn = this._reactive.getDelegate(value)
	    return function (el) {
	      var model = this._reactive.model
	      var context = this._reactive.delegate
	      var handler = function (e) {
	        fn.call(context, e, model, el)
	      }
	      event.bind(el, name, handler)
	      this._reactive.on('remove', function () {
	        event.unbind(el, name, handler)
	      })
	    }
	  }
	})
	
	/**
	 * Create checked&selected binding
	 *
	 * @api public
	 */
	var arr = ['checked', 'selected']
	arr.forEach(function (name) {
	  exports['data-' + name] = function (val) {
	    return function (el) {
	      var attr = val || el.getAttribute('name')
	      var value = el.getAttribute('value')
	      var model = this._reactive.model
	      var fn = function () {
	        var v = model[attr]
	        // single checkbox
	        if (value == null) {
	          if (v) {
	            el.setAttribute(name, '')
	          } else {
	            el.removeAttribute(name)
	          }
	          return
	        }
	        if (v == null) return el.removeAttribute(name)
	        // checkbox
	        if (Array.isArray(v) && ~v.indexOf(value)) {
	          el.setAttribute(name, '')
	        // radio
	        } else if (v.toString() === value) {
	          el.setAttribute(name, '')
	        } else {
	          el.removeAttribute(name)
	        }
	      }
	      this.bindReactive(attr, fn)
	      fn()
	    }
	  }
	})
	
	exports['data-html'] = function (value) {
	  return function (el) {
	    var model = this._reactive.model
	    var fn = function () {
	      var v = model[value]
	      el.innerHTML = v == null ? '' : v
	    }
	    this.bindReactive(value, fn)
	    fn()
	  }
	}


/***/ },
/* 75 */
/***/ function(module, exports) {

	/**
	 * Avoid of null and undefined in output
	 *
	 * @param {String} html
	 * @return {String}
	 * @api public
	 */
	exports.nonull = function (str) {
	  if (str == null) return ''
	  return String(str)
	}
	
	/**
	 * Stringify value.
	 *
	 * @param {Number} indent
	 */
	
	exports.json = function (value, indent) {
	  return typeof value === 'string'
	      ? value
	      : JSON.stringify(value, null, Number(indent) || 2)
	}
	
	/**
	 * 'abc' => 'Abc'
	 */
	
	exports.capitalize = function (value) {
	  if (!value && value !== 0) return ''
	  value = value.toString()
	  return value.charAt(0).toUpperCase() + value.slice(1)
	}
	
	/**
	 * 'abc' => 'ABC'
	 */
	
	exports.uppercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toUpperCase()
	    : ''
	}
	
	/**
	 * 'AbC' => 'abc'
	 */
	
	exports.lowercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toLowerCase()
	    : ''
	}
	
	/**
	 * 12345 => 12,345.00
	 *
	 * @param {Mixed} value
	 * @param {Number} precision
	 */
	
	var digitsRE = /(\d)(?=(?:\d{3})+$)/g
	exports.currency = function (value, precision) {
	  value = parseFloat(value)
	  if (!isFinite(value) || (!value && value !== 0)) return ''
	  precision = precision == null ? 2 : precision
	  value = Number(value)
	  value = value.toFixed(precision)
	  var parts = value.split('.'),
	  fnum = parts[0],
	  decimal = parts[1] ? '.' + parts[1] : ''
	
	  return fnum.replace(digitsRE, '$1,') + decimal
	}
	
	/**
	 * Reverse string
	 *
	 * @param {string} str
	 * @return {String}
	 * @api public
	 */
	exports.reverse = function (str) {
	  if (!str && str !== 0) return ''
	  return String(str).split(/\s*/).reverse().join('')
	}


/***/ },
/* 76 */
/***/ function(module, exports) {

	
	/**
	 * Expose `parse`.
	 */
	
	module.exports = parse;
	
	/**
	 * Tests for browser support.
	 */
	
	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}
	
	/**
	 * Wrap map from jquery.
	 */
	
	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};
	
	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];
	
	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];
	
	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */
	
	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');
	
	  // default to the global `document` object
	  if (!doc) doc = document;
	
	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);
	
	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace
	
	  var tag = m[1];
	
	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }
	
	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;
	
	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }
	
	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }
	
	  return fragment;
	}


/***/ },
/* 77 */
/***/ function(module, exports) {

	/**
	 * Export `uid`
	 */
	
	module.exports = uid;
	
	/**
	 * Create a `uid`
	 *
	 * @param {String} len
	 * @return {String} uid
	 */
	
	function uid(len) {
	  len = len || 7;
	  return Math.random().toString(35).substr(2, len);
	}


/***/ },
/* 78 */
/***/ function(module, exports) {

	
	/**
	 * Expose `parse`.
	 */
	
	module.exports = parse;
	
	/**
	 * Tests for browser support.
	 */
	
	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}
	
	/**
	 * Wrap map from jquery.
	 */
	
	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};
	
	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];
	
	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];
	
	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */
	
	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');
	
	  // default to the global `document` object
	  if (!doc) doc = document;
	
	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);
	
	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace
	
	  var tag = m[1];
	
	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }
	
	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;
	
	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }
	
	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }
	
	  return fragment;
	}


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(80)
	var events = __webpack_require__(81)
	var domify = __webpack_require__(82)
	var query = __webpack_require__(57)
	var classes = __webpack_require__(16)
	var tap = __webpack_require__(83)
	var template = __webpack_require__(84)
	
	var defineProperty = Object.defineProperty
	/**
	 * Init pager with optional list for bind
	 *
	 * @param {Object} list
	 * @api public
	 */
	function Pager (list, opts) {
	  if (!(this instanceof Pager)) return new Pager(list)
	  var el = this.el = domify(template)
	  el.className = 'pager'
	  this.events = events(el, this)
	  this.events.bind('click li > a')
	  this.events.bind('touchstart li > a', 'ontap')
	  if (list) this.bind(list, opts)
	}
	
	Emitter(Pager.prototype)
	
	/**
	 * Select the previous page.
	 *
	 * @api public
	 */
	
	Pager.prototype.prev = function () {
	  this.show(Math.max(0, this.current - 1))
	}
	
	Pager.prototype.bind = function (list, opts) {
	  opts = opts || {}
	  this.perpage(list[opts.perpage || 'perpage'] || 5)
	  this.total(list.total || 0)
	  this.select(list.curpage || 0)
	  var self = this
	  this.on('show', function (n) {
	    list[opts.select || 'select'](n)
	  })
	  this.defineProperty(list, opts, 'perpage', function () {
	    return self._perpage
	  }, function (v) {
	    self.perpage(v)
	  })
	  this.defineProperty(list, opts, 'total', function () {
	    return self._total
	  }, function (v) {
	    self.total(v)
	    self.select(self.current)
	  })
	  this.defineProperty(list, opts, 'curpage', function () {
	    return self.current
	  }, function (v) {
	    self.select(v)
	  })
	}
	
	Pager.prototype.defineProperty = function (list, opts, name, get, set) {
	  defineProperty(list, opts[name] || name, {
	    set: set,
	    get: get
	  })
	}
	
	/**
	 * Select the next page.
	 *
	 * @api public
	 */
	
	Pager.prototype.next = function () {
	  this.show(Math.min(this.pages() - 1, this.current + 1))
	}
	
	Pager.prototype.onclick = function (e) {
	  e.preventDefault()
	  var el = e.target.parentNode
	  if (classes(el).has('pager-hide')) return
	  if (classes(el).has('prev')) return this.prev()
	  if (classes(el).has('next')) return this.next()
	  this.show(el.textContent - 1)
	}
	
	Pager.prototype.ontap = tap(Pager.prototype.onclick)
	
	/**
	 * Return the total number of pages.
	 *
	 * @return {Number}
	 * @api public
	 */
	
	Pager.prototype.pages = function () {
	  return Math.ceil(this._total / this._perpage)
	}
	
	/**
	 * Set total items count
	 *
	 * @param {String} n
	 * @api public
	 */
	Pager.prototype.total = function (n) {
	  this._total = n
	  return this
	}
	
	Pager.prototype.select = function (n) {
	  n = Number(n)
	  if (n !== this.current) this.emit('change', n)
	  this.current = Number(n)
	  this.render()
	  return this
	}
	
	/**
	 * Set perpage count to n
	 *
	 * @param {Number} n
	 * @api public
	 */
	Pager.prototype.perpage = function (n) {
	  this._perpage = n
	  return this
	}
	
	/**
	 * Select page n and emit `show` event with n
	 *
	 * @param {String} n
	 * @api public
	 */
	Pager.prototype.show = function (n) {
	  this.select(n)
	  this.emit('show', n)
	  return this
	}
	
	/**
	 * limit the pagenation li 
	 *
	 * @param {Number} count
	 * @return {this}
	 * @api public
	 */
	Pager.prototype.limit = function (count) {
	  this._limit = Number(count)
	  return this
	}
	
	/**
	 * Unbind events and remove nodes
	 *
	 * @return {undefined}
	 * @api public
	 */
	Pager.prototype.remove = function () {
	  this.off()
	  this.events.unbind()
	  if (this.el.parentNode) {
	    this.el.parentNode.removeChild(this.el)
	  }
	}
	
	Pager.prototype.render = function () {
	  var limit = this._limit || Infinity
	  var curr = this.current
	  var pages = this.pages()
	  var el = this.el
	  var prev = query('.prev', el)
	  var next = query('.next', el)
	  var links = ''
	
	  // remove old
	  var lis = [].slice.call(el.children)
	  for (var i = 0, len = lis.length; i < len; i++) {
	    var li = lis[i]
	    if (classes(li).has('page')) {
	      el.removeChild(li)
	    }
	  }
	
	  // page links
	  for (i = 0; i < pages; ++i) {
	    var n = i + 1
	    if (limit && n === limit + 1) {
	      links += '<li class="dots">...</li>'
	    }
	    if (limit && (n > limit && n !== pages )) {
	      continue
	    }
	    links += curr === i
	      ? '<li class="page active"><a href="#">' + n + '</a></li>'
	      : '<li class="page"><a href="#">' + n + '</a></li>'
	  }
	
	  // insert
	  if (links) el.insertBefore(domify(links), next)
	
	  // prev
	  if (curr) classes(prev).remove('pager-hide')
	  else classes(prev).add('pager-hide')
	
	  // next
	  if (curr < pages - 1) classes(next).remove('pager-hide')
	  else classes(next).add('pager-hide')
	}
	
	module.exports = Pager
	


/***/ },
/* 80 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var events = __webpack_require__(15);
	var delegate = __webpack_require__(54);
	
	/**
	 * Expose `Events`.
	 */
	
	module.exports = Events;
	
	/**
	 * Initialize an `Events` with the given
	 * `el` object which events will be bound to,
	 * and the `obj` which will receive method calls.
	 *
	 * @param {Object} el
	 * @param {Object} obj
	 * @api public
	 */
	
	function Events(el, obj) {
	  if (!(this instanceof Events)) return new Events(el, obj);
	  if (!el) throw new Error('element required');
	  if (!obj) throw new Error('object required');
	  this.el = el;
	  this.obj = obj;
	  this._events = {};
	}
	
	/**
	 * Subscription helper.
	 */
	
	Events.prototype.sub = function(event, method, cb){
	  this._events[event] = this._events[event] || {};
	  this._events[event][method] = cb;
	};
	
	/**
	 * Bind to `event` with optional `method` name.
	 * When `method` is undefined it becomes `event`
	 * with the "on" prefix.
	 *
	 * Examples:
	 *
	 *  Direct event handling:
	 *
	 *    events.bind('click') // implies "onclick"
	 *    events.bind('click', 'remove')
	 *    events.bind('click', 'sort', 'asc')
	 *
	 *  Delegated event handling:
	 *
	 *    events.bind('click li > a')
	 *    events.bind('click li > a', 'remove')
	 *    events.bind('click a.sort-ascending', 'sort', 'asc')
	 *    events.bind('click a.sort-descending', 'sort', 'desc')
	 *
	 * @param {String} event
	 * @param {String|function} [method]
	 * @return {Function} callback
	 * @api public
	 */
	
	Events.prototype.bind = function(event, method){
	  var e = parse(event);
	  var el = this.el;
	  var obj = this.obj;
	  var name = e.name;
	  var method = method || 'on' + name;
	  var args = [].slice.call(arguments, 2);
	
	  // callback
	  function cb(){
	    var a = [].slice.call(arguments).concat(args);
	    obj[method].apply(obj, a);
	  }
	
	  // bind
	  if (e.selector) {
	    cb = delegate.bind(el, e.selector, name, cb);
	  } else {
	    events.bind(el, name, cb);
	  }
	
	  // subscription for unbinding
	  this.sub(name, method, cb);
	
	  return cb;
	};
	
	/**
	 * Unbind a single binding, all bindings for `event`,
	 * or all bindings within the manager.
	 *
	 * Examples:
	 *
	 *  Unbind direct handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * Unbind delegate handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * @param {String|Function} [event]
	 * @param {String|Function} [method]
	 * @api public
	 */
	
	Events.prototype.unbind = function(event, method){
	  if (0 == arguments.length) return this.unbindAll();
	  if (1 == arguments.length) return this.unbindAllOf(event);
	
	  // no bindings for this event
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  // no bindings for this method
	  var cb = bindings[method];
	  if (!cb) return;
	
	  events.unbind(this.el, event, cb);
	};
	
	/**
	 * Unbind all events.
	 *
	 * @api private
	 */
	
	Events.prototype.unbindAll = function(){
	  for (var event in this._events) {
	    this.unbindAllOf(event);
	  }
	};
	
	/**
	 * Unbind all events for `event`.
	 *
	 * @param {String} event
	 * @api private
	 */
	
	Events.prototype.unbindAllOf = function(event){
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  for (var method in bindings) {
	    this.unbind(event, method);
	  }
	};
	
	/**
	 * Parse `event`.
	 *
	 * @param {String} event
	 * @return {Object}
	 * @api private
	 */
	
	function parse(event) {
	  var parts = event.split(/ +/);
	  return {
	    name: parts.shift(),
	    selector: parts.join(' ')
	  }
	}


/***/ },
/* 82 */
/***/ function(module, exports) {

	
	/**
	 * Expose `parse`.
	 */
	
	module.exports = parse;
	
	/**
	 * Tests for browser support.
	 */
	
	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}
	
	/**
	 * Wrap map from jquery.
	 */
	
	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};
	
	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];
	
	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];
	
	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */
	
	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');
	
	  // default to the global `document` object
	  if (!doc) doc = document;
	
	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);
	
	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace
	
	  var tag = m[1];
	
	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }
	
	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;
	
	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }
	
	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }
	
	  return fragment;
	}


/***/ },
/* 83 */
/***/ function(module, exports) {

	var endEvents = [
	  'touchend'
	]
	
	module.exports = Tap
	
	// default tap timeout in ms
	Tap.timeout = 200
	
	function Tap(callback, options) {
	  options = options || {}
	  // if the user holds his/her finger down for more than 200ms,
	  // then it's not really considered a tap.
	  // however, you can make this configurable.
	  var timeout = options.timeout || Tap.timeout
	
	  // to keep track of the original listener
	  listener.handler = callback
	
	  return listener
	
	  // el.addEventListener('touchstart', listener)
	  function listener(e1) {
	    // tap should only happen with a single finger
	    if (!e1.touches || e1.touches.length > 1) return
	
	    var el = e1.target
	    var context = this
	    var args = arguments;
	
	    var timeout_id = setTimeout(cleanup, timeout)
	
	    el.addEventListener('touchmove', cleanup)
	
	    endEvents.forEach(function (event) {
	      el.addEventListener(event, done)
	    })
	
	    function done(e2) {
	      // since touchstart is added on the same tick
	      // and because of bubbling,
	      // it'll execute this on the same touchstart.
	      // this filters out the same touchstart event.
	      if (e1 === e2) return
	      if (e2.clientX !== e1.clientX || e2.clientY !== e1.clientY) return
	
	      cleanup()
	
	      // already handled
	      if (e2.defaultPrevented) return
	
	      // overwrite these functions so that they all to both start and events.
	      var preventDefault = e1.preventDefault
	      var stopPropagation = e1.stopPropagation
	
	      e1.stopPropagation = function () {
	        stopPropagation.call(e1)
	        stopPropagation.call(e2)
	      }
	
	      e1.preventDefault = function () {
	        preventDefault.call(e1)
	        preventDefault.call(e2)
	      }
	
	      // calls the handler with the `end` event,
	      // but i don't think it matters.
	      callback.apply(context, args)
	    }
	
	    // cleanup end events
	    // to cancel the tap, just run this early
	    function cleanup(e2) {
	      // if it's the same event as the origin,
	      // then don't actually cleanup.
	      // hit issues with this - don't remember
	      if (e1 === e2) return
	
	      clearTimeout(timeout_id)
	
	      el.removeEventListener('touchmove', cleanup)
	
	      endEvents.forEach(function (event) {
	        el.removeEventListener(event, done)
	      })
	    }
	  }
	}


/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = "<ul class=\"pager\">\n  <li class=\"prev\"><a href=\"#\">&lsaquo;</a></li>\n  <li class=\"next\"><a href=\"#\">&rsaquo;</a></li>\n</ul>\n";

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var Overlay = __webpack_require__(11)
	var Notice = __webpack_require__(52)
	var spin = __webpack_require__(18)
	var Grid = __webpack_require__(60)
	var template = __webpack_require__(86)
	var data = __webpack_require__(59)
	var Reactive = __webpack_require__(68)
	var Changed = __webpack_require__(87)
	var Pager = __webpack_require__(79)
	
	var placeholder = document.getElementById('grid')
	placeholder.className = 'shows-table left'
	
	var grid = new Grid(template, {
	  perpage: 10,
	  delegate: {
	    setActive: function (model, el) {
	      if (model.isActive) {
	        el.textContent = '✓'
	      } else {
	        el.textContent = '✗'
	      }
	    }
	  }
	})
	grid.local()
	
	var pager = new Pager(grid)
	placeholder.appendChild(grid.el)
	placeholder.appendChild(pager.el)
	grid.setData(data)
	
	var form = document.getElementById('form')
	var overlay = Overlay(form)
	var checker = new Changed(form, {
	  isActive: 'boolean',
	  age: 'number',
	  money: 'number'
	})
	var reactive
	
	grid.bind('click', 'tbody > tr',function (e, model) {
	  if (!reactive) {
	    reactive = Reactive(form, model)
	  } else {
	    form.reset()
	    reactive.bind(model)
	  }
	  checker.reset()
	  form.onsubmit = function (e) {
	    e.preventDefault()
	    var changed = checker.changed()
	    if (!changed) return
	    overlay.show()
	    var s = spin(overlay.el).text('saving')
	    setTimeout(function () {
	      Object.keys(changed).forEach(function (k) {
	        model[k] = changed[k]
	      })
	      checker.reset()
	      s.remove()
	      overlay.hide()
	      Notice('saved', {
	        type: 'success',
	        closable: false,
	        duration: 2000
	      })
	      model.clean()
	    }, 1000)
	  }
	})


/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = "<table>\n  <thead>\n    <tr>\n      <th class=\"sort\" data-sort=\"name\">name</th>\n      <th class=\"sort\" data-sort=\"age\">age</th>\n      <th>company</th>\n      <th class=\"sort\" data-sort=\"number\">money</th>\n      <th>active</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td class=\"left\">{name}</td>\n      <td style=\"width:30px;\">{age}</td>\n      <td class=\"left\">{company}</td>\n      <td class=\"money\">¥{money | currency 2}</td>\n      <td data-render=\"setActive\" class=\"center\"></td>\n    </tr>\n  </tbody>\n</table>\n";

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var invalid = __webpack_require__(88)
	var query = __webpack_require__(57)
	var serialize = __webpack_require__(90)
	
	/**
	 * Init changed by `form` and `format` Object
	 * format support number, boolean, timestamp, function and array of strings
	 *
	 * @param {Element} form element
	 * @param {Object} format config [optional]
	 * @api public
	 */
	function Changed(form, format) {
	  if (!(this instanceof Changed)) return new Changed(form, format)
	  this.format = format || {}
	  if (!/^form$/i.test(form.tagName)) throw new Error('changed-form require form element')
	  this.form = form
	  this.origObj = serialize(form, {
	    hash: true,
	    empty: true
	  })
	}
	
	/**
	 * Get changed object with format
	 *
	 * @return {Object}
	 * @api public
	 */
	Changed.prototype.changed = function () {
	  var obj = serialize(this.form, {
	    hash: true,
	    empty: true
	  })
	  var diff = this.diffObj(this.origObj, obj, this.format)
	  if (Object.keys(diff).length === 0) return false
	  return diff
	}
	
	/**
	 * Reset the original form value
	 *
	 * @api public
	 */
	Changed.prototype.reset = function () {
	  this.origObj = serialize(this.form, {
	    hash: true,
	    empty: true
	  })
	}
	
	/**
	 * Get object with new properties
	 *
	 * @param {Object} origObj
	 * @param {Object} newObj
	 * @param {format} format
	 * @return {Object} object with new properties
	 * @api private
	 */
	Changed.prototype.diffObj =function (origObj, newObj, format) {
	  var res = {}
	  var arr
	  var form = this.form
	  Object.keys(newObj).forEach(function (k) {
	    var orig = origObj[k]
	    var v = newObj[k]
	    if (v === orig) return
	    var el = query('[name=' + k + ']', this.form)
	    if (invalid(el, form)) return
	    var type = format[k]
	    if (!type) {
	      res[k] = newObj[k]
	      return
	    }
	    if (type === 'array') {
	      arr = getDifferent(toArray(orig), toArray(v))
	      if (arr) res[k] = cleanArray(arr)
	    } else if (typeof type === 'function'){
	      res[k] = type(v)
	    } else {
	      res[k] = formatWithType(v, type)
	    }
	  })
	  return res
	}
	
	/**
	 * Check if two array has different values return new array if different or
	 * false if not
	 *
	 * @param {Array} arr
	 * @param {Array} newArr
	 * @return {Mixed}
	 * @api public
	 */
	function getDifferent(arr, newArr) {
	  if (arr.length !== newArr.length) return newArr
	  for (var i = 0, l = arr.length; i < l; i++) {
	    if (arr[i] !== newArr[i]) return newArr
	  }
	  return false
	}
	
	function toArray(str) {
	  if (typeof str === 'string') {
	    if (str.trim() === '') return []
	    return [str]
	  }
	  return str
	}
	
	/**
	 * Format value with type
	 *
	 * @param {string} val
	 * @param {String} type [number|boolean|timestamp]
	 * @return {Mixed} formatted value
	 * @api public
	 */
	function formatWithType(val, type) {
	  val = val.trim()
	  switch (type) {
	    case 'number':
	      if (val === '') return 0
	      val = val.replace(/[^\d\.]/g, '')
	      return parseFloat(val, 10)
	    case 'boolean':
	      return !!val
	    case 'timestamp':
	      return (new Date(val)).getTime()
	    default:
	      return val
	  }
	}
	
	/**
	 * Create new Array with empty string removed
	 *
	 * @param {Array} arr
	 * @return {Array}
	 * @api public
	 */
	function cleanArray(arr) {
	  return arr.filter(function (v) {
	    return v !== ''
	  })
	}
	
	module.exports = Changed
	


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var computedStyle = __webpack_require__(89)
	
	/**
	 * Check if element is invalid
	 *
	 * @param {Element} el
	 * @param {Element} [topEl] optional top element to check
	 * @return {Boolean}
	 * @api public
	 */
	module.exports = function (el, topEl) {
	  topEl = topEl || document.body
	  if (!el.disabled && computedStyle(el, 'display') === 'none' ) {
	    el = el.parentNode
	    if (!el) return false
	  }
	
	  do {
	    if (el.disabled) return true
	    if (hidden(el)) return true
	    el = el.parentNode
	    // parent could be removed
	    if (!el || el === topEl) break
	  } while(el)
	  return false
	}
	
	function hidden(el) {
	  var display = computedStyle(el, 'display')
	  if (display === 'none') return true
	  var visibility = computedStyle(el, 'visibility')
	  if (visibility === 'hidden') return true
	  return false
	}


/***/ },
/* 89 */
/***/ function(module, exports) {

	// DEV: We don't use var but favor parameters since these play nicer with minification
	function computedStyle(el, prop, getComputedStyle, style) {
	  getComputedStyle = window.getComputedStyle;
	  style =
	      // If we have getComputedStyle
	      getComputedStyle ?
	        // Query it
	        // TODO: From CSS-Query notes, we might need (node, null) for FF
	        getComputedStyle(el) :
	
	      // Otherwise, we are in IE and use currentStyle
	        el.currentStyle;
	  if (style) {
	    return style
	    [
	      // Switch to camelCase for CSSOM
	      // DEV: Grabbed from jQuery
	      // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
	      // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
	      prop.replace(/-(\w)/gi, function (word, letter) {
	        return letter.toUpperCase();
	      })
	    ];
	  }
	}
	
	module.exports = computedStyle;


/***/ },
/* 90 */
/***/ function(module, exports) {

	// get successful control from form and assemble into object
	// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2
	
	// types which indicate a submit action and are not successful controls
	// these will be ignored
	var k_r_submitter = /^(?:submit|button|image|reset|file)$/i;
	
	// node names which could be successful controls
	var k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;
	
	// Matches bracket notation.
	var brackets = /(\[[^\[\]]*\])/g;
	
	// serializes form fields
	// @param form MUST be an HTMLForm element
	// @param options is an optional argument to configure the serialization. Default output
	// with no options specified is a url encoded string
	//    - hash: [true | false] Configure the output type. If true, the output will
	//    be a js object.
	//    - serializer: [function] Optional serializer function to override the default one.
	//    The function takes 3 arguments (result, key, value) and should return new result
	//    hash and url encoded str serializers are provided with this module
	//    - disabled: [true | false]. If true serialize disabled fields.
	//    - empty: [true | false]. If true serialize empty fields
	function serialize(form, options) {
	    if (typeof options != 'object') {
	        options = { hash: !!options };
	    }
	    else if (options.hash === undefined) {
	        options.hash = true;
	    }
	
	    var result = (options.hash) ? {} : '';
	    var serializer = options.serializer || ((options.hash) ? hash_serializer : str_serialize);
	
	    var elements = form && form.elements ? form.elements : [];
	
	    //Object store each radio and set if it's empty or not
	    var radio_store = Object.create(null);
	
	    for (var i=0 ; i<elements.length ; ++i) {
	        var element = elements[i];
	
	        // ingore disabled fields
	        if ((!options.disabled && element.disabled) || !element.name) {
	            continue;
	        }
	        // ignore anyhting that is not considered a success field
	        if (!k_r_success_contrls.test(element.nodeName) ||
	            k_r_submitter.test(element.type)) {
	            continue;
	        }
	
	        var key = element.name;
	        var val = element.value;
	
	        // we can't just use element.value for checkboxes cause some browsers lie to us
	        // they say "on" for value when the box isn't checked
	        if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
	            val = undefined;
	        }
	
	        // If we want empty elements
	        if (options.empty) {
	            // for checkbox
	            if (element.type === 'checkbox' && !element.checked) {
	                val = '';
	            }
	
	            // for radio
	            if (element.type === 'radio') {
	                if (!radio_store[element.name] && !element.checked) {
	                    radio_store[element.name] = false;
	                }
	                else if (element.checked) {
	                    radio_store[element.name] = true;
	                }
	            }
	
	            // if options empty is true, continue only if its radio
	            if (!val && element.type == 'radio') {
	                continue;
	            }
	        }
	        else {
	            // value-less fields are ignored unless options.empty is true
	            if (!val) {
	                continue;
	            }
	        }
	
	        // multi select boxes
	        if (element.type === 'select-multiple') {
	            val = [];
	
	            var selectOptions = element.options;
	            var isSelectedOptions = false;
	            for (var j=0 ; j<selectOptions.length ; ++j) {
	                var option = selectOptions[j];
	                var allowedEmpty = options.empty && !option.value;
	                var hasValue = (option.value || allowedEmpty);
	                if (option.selected && hasValue) {
	                    isSelectedOptions = true;
	
	                    // If using a hash serializer be sure to add the
	                    // correct notation for an array in the multi-select
	                    // context. Here the name attribute on the select element
	                    // might be missing the trailing bracket pair. Both names
	                    // "foo" and "foo[]" should be arrays.
	                    if (options.hash && key.slice(key.length - 2) !== '[]') {
	                        result = serializer(result, key + '[]', option.value);
	                    }
	                    else {
	                        result = serializer(result, key, option.value);
	                    }
	                }
	            }
	
	            // Serialize if no selected options and options.empty is true
	            if (!isSelectedOptions && options.empty) {
	                result = serializer(result, key, '');
	            }
	
	            continue;
	        }
	
	        result = serializer(result, key, val);
	    }
	
	    // Check for all empty radio buttons and serialize them with key=""
	    if (options.empty) {
	        for (var key in radio_store) {
	            if (!radio_store[key]) {
	                result = serializer(result, key, '');
	            }
	        }
	    }
	
	    return result;
	}
	
	function parse_keys(string) {
	    var keys = [];
	    var prefix = /^([^\[\]]*)/;
	    var children = new RegExp(brackets);
	    var match = prefix.exec(string);
	
	    if (match[1]) {
	        keys.push(match[1]);
	    }
	
	    while ((match = children.exec(string)) !== null) {
	        keys.push(match[1]);
	    }
	
	    return keys;
	}
	
	function hash_assign(result, keys, value) {
	    if (keys.length === 0) {
	        result = value;
	        return result;
	    }
	
	    var key = keys.shift();
	    var between = key.match(/^\[(.+?)\]$/);
	
	    if (key === '[]') {
	        result = result || [];
	
	        if (Array.isArray(result)) {
	            result.push(hash_assign(null, keys, value));
	        }
	        else {
	            // This might be the result of bad name attributes like "[][foo]",
	            // in this case the original `result` object will already be
	            // assigned to an object literal. Rather than coerce the object to
	            // an array, or cause an exception the attribute "_values" is
	            // assigned as an array.
	            result._values = result._values || [];
	            result._values.push(hash_assign(null, keys, value));
	        }
	
	        return result;
	    }
	
	    // Key is an attribute name and can be assigned directly.
	    if (!between) {
	        result[key] = hash_assign(result[key], keys, value);
	    }
	    else {
	        var string = between[1];
	        var index = parseInt(string, 10);
	
	        // If the characters between the brackets is not a number it is an
	        // attribute name and can be assigned directly.
	        if (isNaN(index)) {
	            result = result || {};
	            result[string] = hash_assign(result[string], keys, value);
	        }
	        else {
	            result = result || [];
	            result[index] = hash_assign(result[index], keys, value);
	        }
	    }
	
	    return result;
	}
	
	// Object/hash encoding serializer.
	function hash_serializer(result, key, value) {
	    var matches = key.match(brackets);
	
	    // Has brackets? Use the recursive assignment function to walk the keys,
	    // construct any missing objects in the result tree and make the assignment
	    // at the end of the chain.
	    if (matches) {
	        var keys = parse_keys(key);
	        hash_assign(result, keys, value);
	    }
	    else {
	        // Non bracket notation can make assignments directly.
	        var existing = result[key];
	
	        // If the value has been assigned already (for instance when a radio and
	        // a checkbox have the same name attribute) convert the previous value
	        // into an array before pushing into it.
	        //
	        // NOTE: If this requirement were removed all hash creation and
	        // assignment could go through `hash_assign`.
	        if (existing) {
	            if (!Array.isArray(existing)) {
	                result[key] = [ existing ];
	            }
	
	            result[key].push(value);
	        }
	        else {
	            result[key] = value;
	        }
	    }
	
	    return result;
	}
	
	// urlform encoding serializer
	function str_serialize(result, key, value) {
	    // encode newlines as \r\n cause the html spec says so
	    value = value.replace(/(\r)?\n/g, '\r\n');
	    value = encodeURIComponent(value);
	
	    // spaces should be '+' rather than '%20'.
	    value = value.replace(/%20/g, '+');
	    return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
	}
	
	module.exports = serialize;


/***/ }
/******/ ]);
//# sourceMappingURL=example.js.map