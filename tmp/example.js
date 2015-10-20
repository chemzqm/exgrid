/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2)
	__webpack_require__(6)
	var tabify = __webpack_require__(8)
	var classes = __webpack_require__(10)
	var Overlay = __webpack_require__(12)
	var spin = __webpack_require__(17)
	var Notice = __webpack_require__(51)
	var template = __webpack_require__(57)
	var data = __webpack_require__(58)
	var Grid = __webpack_require__(59)
	__webpack_require__(94)
	__webpack_require__(96)

	var el = document.getElementById('tabs')
	tabify(el)

	var placeholder = document.getElementById('tab1')
	placeholder.className = 'shows-table'

	var grid = new Grid(template, {
	  perpage: 10,
	  formatters: {
	    chineseMoney: function (money) {
	      return '¥' + money.toFixed(2)
	    }
	  },
	  renders: {
	    percentage: function (model, el) {
	      el.textContent = (model.percent * 100).toFixed() + '%'
	    },
	    setActive: function (model, el) {
	      var cb = document.createElement('input')
	      cb.type = 'checkbox'
	      cb.checked = model.isActive
	      el.innerHTML = ''
	      cb.addEventListener('change', function () {
	        // save value to model
	        model.isActive = cb.checked
	      }, false)
	      el.appendChild(cb)
	    },
	    renderAction: function (model, el) {
	      el.innerHTML = '<button class="save" ' + (model.changed() ? '' : 'disabled') + '>save</button>'
	    }
	  }
	})

	grid.on('click', function (e, row) {
	  if (e.target.className === 'save') {
	    var model = row.model
	    var changed = model.changed()
	    changed.id = row.id
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
	        model.clean()
	      }, 400)
	    }
	  }
	})

	grid.on('click', function (e, row) {
	  var el = e.target
	  if (classes(el).has('money')) {
	    var model = row.model
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
	  }
	})

	var overlay = Overlay(grid.el)
	placeholder.appendChild(grid.el)
	grid.setData(data)



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "\r\n.overlay {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  opacity: 1;\r\n  width: 100%;\r\n  height: 100%;\r\n  background: rgba(0,0,0,.75);\r\n  -webkit-transition: opacity 300ms;\r\n  -moz-transition: opacity 300ms;\r\n  transition: opacity 300ms;\r\n  z-index: 500;\r\n}\r\n\r\n.overlay.hidden {\r\n  pointer-events: none;\r\n  opacity: 0;\r\n}\r\n\r\n.overlay.closable {\r\n  cursor: pointer;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 4 */
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
/* 5 */
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
		if(false) {
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".notice-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 999999;\n}\n.notice-container .notice-item {\n  position: relative;\n  font: 500 16px/1.8 \"Georgia\",\"Xin Gothic\",\"Hiragino Sans GB\",\"WenQuanYi Micro Hei\",sans-serif;\n  background: #fefefe;\n  background: rgba(255,255,255,0.9);\n  color: #565656;\n  padding: 10px 20px;\n  box-sizing: border-box;\n  border-bottom: 1px solid #efefef;\n  text-align: center;\n  transition: all .2s ease-in-out;\n  transform-origin: top;\n}\n/* colors from bootstrap */\n.notice-container .notice-warning {\n  background: #fcf8e3;\n  background: rgba(252, 248, 227, 0.9);\n  border-color: #fbeed5;\n  color: #c09853;\n}\n\n.notice-container .notice-success {\n  background: #EAFBE3;\n  background: rgba(221, 242, 210, 0.9);\n  border-color: #D6E9C6;\n  color: #3FB16F;\n}\n\n.notice-container .notice-danger,\n.notice-container .notice-error {\n  background: #f2dede;\n  background: rgba(242, 222, 222, 0.9);\n  border-color: #ebccd1;\n  color: #a94442;\n}\n\n.notice-container .notice-content {\n  color: inherit;\n  text-decoration: none;\n  margin: 0 auto;\n  max-width: 650px;\n}\n.notice-container .notice-close {\n  position: absolute;\n  top: 5px;\n  height: 40px;\n  right: 20px;\n  width: 40px;\n  cursor: pointer;\n  font: 400 normal 22px/40px \"Arial\", sans-serif;\n  color: rgba(231, 76, 60, 0.6);\n}\n.notice-container .notice-dismiss {\n  transform: rotateX(-75deg);\n  opacity: 0;\n}\n", ""]);

	// exports


/***/ },
/* 8 */
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

	var Emitter = __webpack_require__(9)

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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var index = __webpack_require__(11);

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
/* 11 */
/***/ function(module, exports) {

	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(13);
	var tmpl = __webpack_require__(14);
	var domify = __webpack_require__(15);
	var event = __webpack_require__(16);
	var classes = __webpack_require__(10);

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
/* 13 */
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
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div class=\"overlay hidden\"></div>\r\n";

/***/ },
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Spinner = __webpack_require__(18)
	  , debug = __webpack_require__(23)('spin')
	  , css = __webpack_require__(26)
	  , removed = __webpack_require__(44);

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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var supported = __webpack_require__(19);
	var raf = __webpack_require__(20);
	var text = __webpack_require__(21);
	var autoscale = __webpack_require__(22);

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
/* 19 */
/***/ function(module, exports) {

	
	/**
	 * Export `bool`
	 */

	module.exports = (function(){
	  var el = document.createElement('canvas');
	  return !! el.getContext;
	})();


/***/ },
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(24);
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
/* 24 */
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
	exports.humanize = __webpack_require__(25);

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
/* 25 */
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */

	var debug = __webpack_require__(23)('css');
	var set = __webpack_require__(27);
	var get = __webpack_require__(39);

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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */

	var debug = __webpack_require__(23)('css:style');
	var camelcase = __webpack_require__(28);
	var support = __webpack_require__(31);
	var property = __webpack_require__(32);
	var hooks = __webpack_require__(34);

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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	
	var toSpace = __webpack_require__(29);


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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	
	var clean = __webpack_require__(30);


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
/* 30 */
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
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies
	 */

	var debug = __webpack_require__(23)('css:prop');
	var camelcase = __webpack_require__(28);
	var vendor = __webpack_require__(33);

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
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */

	var each = __webpack_require__(35);
	var css = __webpack_require__(39);
	var cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
	var rnumnonpx = new RegExp( '^(' + pnum + ')(?!px)[a-z%]+$', 'i');
	var rnumsplit = new RegExp( '^(' + pnum + ')(.*)$', 'i');
	var rdisplayswap = /^(none|table(?!-c[ea]).+)/;
	var styles = __webpack_require__(42);
	var support = __webpack_require__(31);
	var swap = __webpack_require__(43);
	var computed = __webpack_require__(40);
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	try {
	  var type = __webpack_require__(36);
	} catch (err) {
	  var type = __webpack_require__(36);
	}

	var toFunction = __webpack_require__(37);

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
/* 36 */
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module Dependencies
	 */

	var expr;
	try {
	  expr = __webpack_require__(38);
	} catch(e) {
	  expr = __webpack_require__(38);
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
/* 38 */
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */

	var debug = __webpack_require__(23)('css:css');
	var camelcase = __webpack_require__(28);
	var computed = __webpack_require__(40);
	var property = __webpack_require__(32);

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
	  var hooks = __webpack_require__(34);
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */

	var debug = __webpack_require__(23)('css:computed');
	var withinDocument = __webpack_require__(41);
	var styles = __webpack_require__(42);

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
	    var style = __webpack_require__(27);
	    ret = style(el, prop);
	  }

	  debug('computed value of %s: %s', prop, ret);

	  // Support: IE
	  // IE returns zIndex value as an integer.
	  return undefined === ret ? ret : ret + '';
	}


/***/ },
/* 41 */
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
/* 42 */
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
/* 43 */
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var Observer = __webpack_require__(45);

	/**
	 * Exports the `MutationObserver` based approach, the
	 * `MutationEvent` based approach, or the fallback one
	 * depending on UA capabilities.
	 */

	module.exports = Observer
	  ? __webpack_require__(46)
	  : document.addEventListener
	    ? __webpack_require__(49)
	    : __webpack_require__(50);


/***/ },
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var withinDoc = __webpack_require__(47)
	  , Observer = __webpack_require__(45);

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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var withinElement = __webpack_require__(48);

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
/* 48 */
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
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var withinDocument = __webpack_require__(47);

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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Notice
	 *
	 * A notice message at the top of a webpage.
	 *
	 */

	var classes = __webpack_require__(10);
	var events = __webpack_require__(52);

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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var events = __webpack_require__(16);
	var delegate = __webpack_require__(53);

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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var closest = __webpack_require__(54)
	  , event = __webpack_require__(16);

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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */

	var matches = __webpack_require__(55)

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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var query = __webpack_require__(56);

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
/* 56 */
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
/* 57 */
/***/ function(module, exports) {

	module.exports = "<table>\n  <thead>\n    <tr>\n      <th class=\"sort\" data-sort=\"string\">name</th>\n      <th class=\"sort\" data-sort=\"number\">age</th>\n      <th class=\"sort\" data-sort=\"number\">score</th>\n      <th class=\"sort\" data-sort=\"number\">percentage</th>\n      <th class=\"sort\" data-sort=\"number\">money</th>\n      <th>active</th>\n      <th>action</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td class=\"left\">{name}</td>\n      <td>{age}</td>\n      <td data-format=\"integer\">{score}</td>\n      <td data-render=\"percentage\"></td>\n      <td class=\"money\" data-format=\"chineseMoney\">{money}</td>\n      <td data-render=\"setActive\" class=\"center\"></td>\n      <td data-react=\"$stat\" data-render=\"renderAction\"></td>\n    </tr>\n  </tbody>\n</table>\n";

/***/ },
/* 58 */
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var query = __webpack_require__(56)
	var classes = __webpack_require__(10)
	var domify = __webpack_require__(15)
	var events = __webpack_require__(52)
	var uid = __webpack_require__(60)
	var traverse = __webpack_require__(84)
	var formatter = __webpack_require__(86)
	var util = __webpack_require__(87)
	var Emitter = __webpack_require__(9)
	var Model = __webpack_require__(89)
	var Row = __webpack_require__(90)
	var nextTick = __webpack_require__(91)
	var indexof = __webpack_require__(11)
	var DefaultPager = __webpack_require__(93)

	function Grid (el, config) {
	  if (typeof el === 'string') el = domify(el)
	  var opt = this.opt = config || {}
	  // perpage page sortField sortDirection filterField filterValue
	  this.params = {page: opt.page || 0}
	  this.params.perpage = opt.perpage || Infinity
	  this.remote = this.params.remote = opt.remote || false
	  this.el = document.createElement('div')
	  this.el.style.display = 'none'
	  this.el.appendChild(el)
	  this.formatters = util.merge(opt.formatters || {}, formatter)
	  var tmplEl = query('tbody > tr:last-child', el)
	  this.root = tmplEl.cloneNode(true)
	  this.bodyEl = query('tbody', el)
	  // [{index: i, format:fn, render: fn, bindings:fields, start: str, end: str}]
	  this.rowConfig = util.createRowConfig(tmplEl, this.formatters, opt.renders || {})
	  tmplEl.parentNode.removeChild(tmplEl)
	  this.renderFn = util.createRenderFn(this.rowConfig)
	  this.rows = []
	  var self = this
	  var Pager = opt.Pager || DefaultPager
	  if (opt.perpage) {
	    var pager = this.pager = new Pager(this)
	    this.el.appendChild(pager.el)
	    pager.perpage(this.params.perpage)
	    pager.on('show', function (i) {
	      self.setPage(i)
	    })
	  }
	  nextTick(function () {
	    if (self.emit) self.emit('construct', self.params)
	  })
	  this.events = events(el, this)
	  this.events.bind('click thead', 'headerClick')
	  this.events.bind('click tbody', 'bodyClick')
	}

	Grid.Pager = DefaultPager

	Emitter(Grid.prototype)

	/**
	 * Reset grid data for rendering
	 *
	 * @param {Array} data
	 * @api public
	 */
	Grid.prototype.setData = function (data) {
	  this.el.style.display = 'block'
	  this.data = data
	  var page = this.params.page
	  if (!this.ModelClass) {
	    var obj = data[0]
	    if (obj) {
	      var keys = Object.keys(obj)
	      this.ModelClass = Model(keys)
	    }
	  }
	  if (this.remote === true) {
	    this.renderData(data)
	  } else {
	    var max = this.params.perpage
	    this.setTotal(data.length)
	    this.renderData(data.slice(page * max, (page + 1) * max))
	  }
	  if (this.pager) this.pager.select(page)
	}

	/**
	 * refresh the body with new data array.
	 *
	 * @param {Array} data
	 * @api private
	 */
	Grid.prototype.renderData = function (data) {
	  this.rows.forEach(function (row) {
	    row.remove(false)
	  })
	  this.rows = []
	  if (data.length === 0) {
	    // no data
	    this.emit('empty')
	    return
	  }
	  var fragment = document.createDocumentFragment()
	  for (var i = 0, len = data.length; i < len; i++) {
	    var obj = data[i]
	    var row = this.createRow(obj)
	    fragment.appendChild(row.el)
	    this.rows.push(row)
	  }
	  this.bodyEl.appendChild(fragment)
	}

	/**
	 * Set current page number(0 based) and paging the data
	 *
	 * @param {Number} page
	 * @api public
	 */
	Grid.prototype.setPage = function (page) {
	  if (this.pager) this.pager.select(page)
	  if (page === this.params.page) return
	  this.params.page = page
	  var max = this.params.perpage
	  if (this.remote === true) {
	    this.emit('page', this.params)
	  } else {
	    var list = this.selected ? this.selected : this.data
	    var data = list.slice(page * max, (page + 1) * max)
	    this.renderData(data)
	  }
	}

	/**
	 * Set the total data count
	 *
	 * @param {Number} count
	 * @api public
	 */
	Grid.prototype.setTotal = function (count) {
	  if (this.pager) this.pager.total(count)
	}

	/**
	 * Create row with obj and prepend to el (default: frist child of tbody)
	 *
	 * @param {String} obj
	 * @param {String} el
	 * @api public
	 */
	Grid.prototype.prepend = function (obj, el) {
	  el = el || this.bodyEl.firstChild
	  var row = this.createRow(obj)
	  this.rows.unshift(row)
	  this.bodyEl.insertBefore(row.el, el)
	}

	/**
	 * emit `refresh` event to accept the data from listeners
	 *
	 * @api public
	 */
	Grid.prototype.refresh = function () {
	  this.params.refresh = true
	  this.emit('refresh', this.params)
	  this.params.refresh = false
	}

	/**
	 * create row from object obj
	 * @param {Object} obj
	 * @return {Row}
	 * @api private
	 */
	Grid.prototype.createRow = function (obj) {
	  var pk = this.ModelClass.primaryKey
	  var id = pk ? obj[pk] : uid(10)
	  var row = new Row({
	    id: id,
	    root: this.root,
	    rowConfig: this.rowConfig,
	    renderFn: this.renderFn,
	    model: new this.ModelClass(obj)
	  })
	  var self = this
	  row.once('destroy', function () {
	    var i = indexof(self.rows, row)
	    if (i !== -1) self.rows.splice(i, 1)
	  })
	  return row
	}

	/**
	 * Filter data with field and val (optional filter function)
	 * redirect to first page
	 * render all data when the val is null or empty string
	 *
	 * @param {String} field
	 * @param {String | Function} val
	 * @api public
	 */
	Grid.prototype.filter = function (field, val) {
	  var arr
	  var params = this.params
	  var fn = typeof val === 'function' ? val : null
	  if (val == null || val === '') {
	    params.filterField = null
	    params.filterValue = ''
	  } else {
	    params.filterField = field
	    params.filterValue = val
	  }
	  // show first page on filter
	  params.page = 0
	  if (this.remote) return this.emit('filter', params)
	  fn = fn || function (o) {
	    if (val === '') return true
	    if (typeof val === 'boolean') return o[field] === val
	    if (typeof val === 'number') return val <= o[field]
	    var re = new RegExp(val.replace('\\', '\\\\').replace(/\s+/g, '\\s*'), 'i')
	    return re.test(o[field].toString())
	  }
	  arr = this.selected = this.data.filter(fn)
	  // save memory
	  if (arr.length === this.data.length) this.selected = null
	  this.setTotal(arr.length)
	  this.renderData(arr.slice(0, params.perpage))
	  if (this.pager) this.pager.select(0)
	}

	/**
	 * Sort the grid with given field, direction and method
	 *
	 * @param {String} field
	 * @param {Number} dir (1 or -1)
	 * @param {String | Function} method Function or method name for sorting
	 * @api public
	 */
	Grid.prototype.sort = function (field, dir, method) {
	  this.params.sortField = field
	  this.params.sortDirection = dir
	  if (this.remote) {
	    this.emit('sort', this.params)
	  } else {
	    var page = this.params.page
	    var max = this.params.perpage
	    // use filted data if exist
	    var data = this.selected || this.data
	    data.sort(function (obj, other) {
	      var a = obj[field]
	      var b = other[field]
	      if (typeof method === 'function') {
	        return method(a, b) * dir
	      }
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
	    this.renderData(data.slice(page * max, (page + 1) * max))
	  }
	}

	/**
	 * Destroy the grid
	 *
	 * @api public
	 */
	Grid.prototype.remove = function () {
	  if (!this.el.parentNode) return
	  if (this.pager) this.pager.remove()
	  this.events.unbind()
	  this.rows.forEach(function (row) {
	    row.remove()
	  })
	  this.emit('destroy')
	  this.rows = null
	  this.el.parentNode.removeChild(this.el)
	  this.off()
	}

	/**
	 * Body click event listener
	 *
	 * @param {Event} e
	 * @api private
	 */
	Grid.prototype.bodyClick = function (e) {
	  var row
	  var tr
	  if (e.target.nodeName.toLowerCase() === 'tr') tr = e.target
	  if (!tr) tr = traverse('parentNode', e.target, 'tr')[0]
	  if (!tr) return
	  var id = tr.getAttribute('data-id')
	  if (!id) return
	  for (var i = 0, len = this.rows.length; i < len; i++) {
	    row = this.rows[i]
	    if (String(row.id) === id) break
	  }
	  if (!row) return
	  this.emit('click', e, row)
	}

	/**
	 * Header click event listener
	 *
	 * @param {Event} e
	 * @api private
	 */
	Grid.prototype.headerClick = function (e) {
	  var el = e.target
	  var th
	  if (el.nodeName.toLowerCase() === 'th') th = e.target
	  if (!th) th = traverse('parentNode', e.target, 'th')[0]
	  if (!th || !th.getAttribute('data-sort')) return
	  e.preventDefault()
	  var method = th.getAttribute('data-sort')
	  var dir = (classes(th).has('desc')) ? -1 : 1
	  var ths = th.parentNode.children
	  var index
	  util.toArray(ths).forEach(function (node, i) {
	    if (th === node) {
	      index = i
	      if (dir === 1) {
	        classes(th).remove('asc').add('desc')
	      } else {
	        classes(th).remove('desc').add('asc')
	      }
	    } else {
	      classes(node).remove('desc').remove('asc')
	    }
	  })
	  var field = this.rowConfig[index].bindings[0]
	  if (!field) throw new Error('no binding field found')
	  this.sort(field, dir, method)
	}

	module.exports = Grid


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Base 64 characters
	 */

	var BASE64 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';

	/**
	 * Make a Uint8Array into a string
	 *
	 * @param {Uint8Array}
	 * @returns {String}
	 * @api private
	 */

	function tostr(bytes) {
	  var r, i;

	  r = [];
	  for (i = 0; i < bytes.length; i++) {
	    r.push(BASE64[bytes[i] % 64]);
	  }

	  return r.join('');
	}

	/**
	 * Generate an unique id
	 *
	 * @param {Number} The number of chars of the uid
	 * @api public
	 */

	function uid(length) {
	  if (typeof window != 'undefined') {
	    if (typeof window.crypto != 'undefined') {
	      return tostr(window.crypto.getRandomValues(new Uint8Array(length)));
	    } else {
	      var a = new Array(length);
	      for (var i = 0; i < length; i++) {
	        a[i] = Math.floor(Math.random() * 256);
	      }
	      return tostr(a);
	    }
	  } else {
	    var crypto = __webpack_require__(61); // avoid browserify polyfill
	    try {
	      return tostr(crypto.randomBytes(length));
	    } catch (e) {
	      // entropy sources are drained
	      return tostr(crypto.pseudoRandomBytes(length));
	    }
	  }
	}

	/**
	 * Exports
	 */

	module.exports = uid;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var rng = __webpack_require__(66)

	function error () {
	  var m = [].slice.call(arguments).join(' ')
	  throw new Error([
	    m,
	    'we accept pull requests',
	    'http://github.com/dominictarr/crypto-browserify'
	    ].join('\n'))
	}

	exports.createHash = __webpack_require__(68)

	exports.createHmac = __webpack_require__(81)

	exports.randomBytes = function(size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)))
	    } catch (err) { callback(err) }
	  } else {
	    return new Buffer(rng(size))
	  }
	}

	function each(a, f) {
	  for(var i in a)
	    f(a[i], i)
	}

	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160']
	}

	var p = __webpack_require__(82)(exports)
	exports.pbkdf2 = p.pbkdf2
	exports.pbkdf2Sync = p.pbkdf2Sync


	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials'
	, 'createCipher'
	, 'createCipheriv'
	, 'createDecipher'
	, 'createDecipheriv'
	, 'createSign'
	, 'createVerify'
	, 'createDiffieHellman'
	], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet')
	  }
	})

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62).Buffer))

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	var base64 = __webpack_require__(63)
	var ieee754 = __webpack_require__(64)
	var isArray = __webpack_require__(65)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : (function () {
	      function Bar () {}
	      try {
	        var arr = new Uint8Array(1)
	        arr.foo = function () { return 42 }
	        arr.constructor = Bar
	        return arr.foo() === 42 && // typed array instances can be augmented
	            arr.constructor === Bar && // constructor can be set
	            typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	            arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	      } catch (e) {
	        return false
	      }
	    })()

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62).Buffer, (function() { return this; }())))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 64 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 65 */
/***/ function(module, exports) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function() {
	  var g = ('undefined' === typeof window ? global : window) || {}
	  _crypto = (
	    g.crypto || g.msCrypto || __webpack_require__(67)
	  )
	  module.exports = function(size) {
	    // Modern Browsers
	    if(_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */
	    
	      _crypto.getRandomValues(bytes);
	      return bytes;
	    }
	    else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size)
	    }
	    else
	      throw new Error(
	        'secure random number generation not supported by this browser\n'+
	        'use chrome, FireFox or Internet Explorer 11'
	      )
	  }
	}())

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(62).Buffer))

/***/ },
/* 67 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(69)

	var md5 = toConstructor(__webpack_require__(78))
	var rmd160 = toConstructor(__webpack_require__(80))

	function toConstructor (fn) {
	  return function () {
	    var buffers = []
	    var m= {
	      update: function (data, enc) {
	        if(!Buffer.isBuffer(data)) data = new Buffer(data, enc)
	        buffers.push(data)
	        return this
	      },
	      digest: function (enc) {
	        var buf = Buffer.concat(buffers)
	        var r = fn(buf)
	        buffers = null
	        return enc ? r.toString(enc) : r
	      }
	    }
	    return m
	  }
	}

	module.exports = function (alg) {
	  if('md5' === alg) return new md5()
	  if('rmd160' === alg) return new rmd160()
	  return createHash(alg)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62).Buffer))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var exports = module.exports = function (alg) {
	  var Alg = exports[alg]
	  if(!Alg) throw new Error(alg + ' is not supported (we accept pull requests)')
	  return new Alg()
	}

	var Buffer = __webpack_require__(62).Buffer
	var Hash   = __webpack_require__(70)(Buffer)

	exports.sha1 = __webpack_require__(71)(Buffer, Hash)
	exports.sha256 = __webpack_require__(76)(Buffer, Hash)
	exports.sha512 = __webpack_require__(77)(Buffer, Hash)


/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = function (Buffer) {

	  //prototype class for hash functions
	  function Hash (blockSize, finalSize) {
	    this._block = new Buffer(blockSize) //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize
	    this._blockSize = blockSize
	    this._len = 0
	    this._s = 0
	  }

	  Hash.prototype.init = function () {
	    this._s = 0
	    this._len = 0
	  }

	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8"
	      data = new Buffer(data, enc)
	    }

	    var l = this._len += data.length
	    var s = this._s = (this._s || 0)
	    var f = 0
	    var buffer = this._block

	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - (s % this._blockSize))
	      var ch = (t - f)

	      for (var i = 0; i < ch; i++) {
	        buffer[(s % this._blockSize) + i] = data[i + f]
	      }

	      s += ch
	      f += ch

	      if ((s % this._blockSize) === 0) {
	        this._update(buffer)
	      }
	    }
	    this._s = s

	    return this
	  }

	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8

	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80

	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1)

	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block)
	      this._block.fill(0)
	    }

	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4)

	    var hash = this._update(this._block) || this._hash()

	    return enc ? hash.toString(enc) : hash
	  }

	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass')
	  }

	  return Hash
	}


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */

	var inherits = __webpack_require__(72).inherits

	module.exports = function (Buffer, Hash) {

	  var A = 0|0
	  var B = 4|0
	  var C = 8|0
	  var D = 12|0
	  var E = 16|0

	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80)

	  var POOL = []

	  function Sha1 () {
	    if(POOL.length)
	      return POOL.pop().init()

	    if(!(this instanceof Sha1)) return new Sha1()
	    this._w = W
	    Hash.call(this, 16*4, 14*4)

	    this._h = null
	    this.init()
	  }

	  inherits(Sha1, Hash)

	  Sha1.prototype.init = function () {
	    this._a = 0x67452301
	    this._b = 0xefcdab89
	    this._c = 0x98badcfe
	    this._d = 0x10325476
	    this._e = 0xc3d2e1f0

	    Hash.prototype.init.call(this)
	    return this
	  }

	  Sha1.prototype._POOL = POOL
	  Sha1.prototype._update = function (X) {

	    var a, b, c, d, e, _a, _b, _c, _d, _e

	    a = _a = this._a
	    b = _b = this._b
	    c = _c = this._c
	    d = _d = this._d
	    e = _e = this._e

	    var w = this._w

	    for(var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j*4)
	        : rol(w[j - 3] ^ w[j -  8] ^ w[j - 14] ^ w[j - 16], 1)

	      var t = add(
	        add(rol(a, 5), sha1_ft(j, b, c, d)),
	        add(add(e, W), sha1_kt(j))
	      )

	      e = d
	      d = c
	      c = rol(b, 30)
	      b = a
	      a = t
	    }

	    this._a = add(a, _a)
	    this._b = add(b, _b)
	    this._c = add(c, _c)
	    this._d = add(d, _d)
	    this._e = add(e, _e)
	  }

	  Sha1.prototype._hash = function () {
	    if(POOL.length < 100) POOL.push(this)
	    var H = new Buffer(20)
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a|0, A)
	    H.writeInt32BE(this._b|0, B)
	    H.writeInt32BE(this._c|0, C)
	    H.writeInt32BE(this._d|0, D)
	    H.writeInt32BE(this._e|0, E)
	    return H
	  }

	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if(t < 20) return (b & c) | ((~b) & d);
	    if(t < 40) return b ^ c ^ d;
	    if(t < 60) return (b & c) | (b & d) | (c & d);
	    return b ^ c ^ d;
	  }

	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
	           (t < 60) ? -1894007588 : -899497514;
	  }

	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return (x + y ) | 0
	  //lets see how this goes on testling.
	  //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  //  return (msw << 16) | (lsw & 0xFFFF);
	  }

	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt));
	  }

	  return Sha1
	}


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(74);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(75);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(73)))

/***/ },
/* 73 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 75 */
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */

	var inherits = __webpack_require__(72).inherits

	module.exports = function (Buffer, Hash) {

	  var K = [
	      0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
	      0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
	      0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
	      0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
	      0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
	      0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
	      0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
	      0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
	      0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
	      0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
	      0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
	      0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
	      0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
	      0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
	      0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
	      0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
	    ]

	  var W = new Array(64)

	  function Sha256() {
	    this.init()

	    this._w = W //new Array(64)

	    Hash.call(this, 16*4, 14*4)
	  }

	  inherits(Sha256, Hash)

	  Sha256.prototype.init = function () {

	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0

	    this._len = this._s = 0

	    return this
	  }

	  function S (X, n) {
	    return (X >>> n) | (X << (32 - n));
	  }

	  function R (X, n) {
	    return (X >>> n);
	  }

	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }

	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }

	  function Sigma0256 (x) {
	    return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
	  }

	  function Sigma1256 (x) {
	    return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	  }

	  function Gamma0256 (x) {
	    return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
	  }

	  function Gamma1256 (x) {
	    return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
	  }

	  Sha256.prototype._update = function(M) {

	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var T1, T2

	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0

	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16
	        ? M.readInt32BE(j * 4)
	        : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16]

	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w

	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g; g = f; f = e; e = d + T1; d = c; c = b; b = a; a = T1 + T2;
	    }

	    this._a = (a + this._a) | 0
	    this._b = (b + this._b) | 0
	    this._c = (c + this._c) | 0
	    this._d = (d + this._d) | 0
	    this._e = (e + this._e) | 0
	    this._f = (f + this._f) | 0
	    this._g = (g + this._g) | 0
	    this._h = (h + this._h) | 0

	  };

	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32)

	    H.writeInt32BE(this._a,  0)
	    H.writeInt32BE(this._b,  4)
	    H.writeInt32BE(this._c,  8)
	    H.writeInt32BE(this._d, 12)
	    H.writeInt32BE(this._e, 16)
	    H.writeInt32BE(this._f, 20)
	    H.writeInt32BE(this._g, 24)
	    H.writeInt32BE(this._h, 28)

	    return H
	  }

	  return Sha256

	}


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(72).inherits

	module.exports = function (Buffer, Hash) {
	  var K = [
	    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	  ]

	  var W = new Array(160)

	  function Sha512() {
	    this.init()
	    this._w = W

	    Hash.call(this, 128, 112)
	  }

	  inherits(Sha512, Hash)

	  Sha512.prototype.init = function () {

	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0

	    this._al = 0xf3bcc908|0
	    this._bl = 0x84caa73b|0
	    this._cl = 0xfe94f82b|0
	    this._dl = 0x5f1d36f1|0
	    this._el = 0xade682d1|0
	    this._fl = 0x2b3e6c1f|0
	    this._gl = 0xfb41bd6b|0
	    this._hl = 0x137e2179|0

	    this._len = this._s = 0

	    return this
	  }

	  function S (X, Xl, n) {
	    return (X >>> n) | (Xl << (32 - n))
	  }

	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }

	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }

	  Sha512.prototype._update = function(M) {

	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var al, bl, cl, dl, el, fl, gl, hl

	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0

	    al = this._al | 0
	    bl = this._bl | 0
	    cl = this._cl | 0
	    dl = this._dl | 0
	    el = this._el | 0
	    fl = this._fl | 0
	    gl = this._gl | 0
	    hl = this._hl | 0

	    for (var i = 0; i < 80; i++) {
	      var j = i * 2

	      var Wi, Wil

	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4)
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4)

	      } else {
	        var x  = W[j - 15*2]
	        var xl = W[j - 15*2 + 1]
	        var gamma0  = S(x, xl, 1) ^ S(x, xl, 8) ^ (x >>> 7)
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7)

	        x  = W[j - 2*2]
	        xl = W[j - 2*2 + 1]
	        var gamma1  = S(x, xl, 19) ^ S(xl, x, 29) ^ (x >>> 6)
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6)

	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[j - 7*2]
	        var Wi7l = W[j - 7*2 + 1]

	        var Wi16  = W[j - 16*2]
	        var Wi16l = W[j - 16*2 + 1]

	        Wil = gamma0l + Wi7l
	        Wi  = gamma0  + Wi7 + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0)
	        Wil = Wil + gamma1l
	        Wi  = Wi  + gamma1  + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0)
	        Wil = Wil + Wi16l
	        Wi  = Wi  + Wi16 + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0)

	        W[j] = Wi
	        W[j + 1] = Wil
	      }

	      var maj = Maj(a, b, c)
	      var majl = Maj(al, bl, cl)

	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7)
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7)
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9)
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9)

	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j]
	      var Kil = K[j + 1]

	      var ch = Ch(e, f, g)
	      var chl = Ch(el, fl, gl)

	      var t1l = hl + sigma1l
	      var t1 = h + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0)
	      t1l = t1l + chl
	      t1 = t1 + ch + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0)
	      t1l = t1l + Kil
	      t1 = t1 + Ki + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0)
	      t1l = t1l + Wil
	      t1 = t1 + Wi + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0)

	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl
	      var t2 = sigma0h + maj + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0)

	      h  = g
	      hl = gl
	      g  = f
	      gl = fl
	      f  = e
	      fl = el
	      el = (dl + t1l) | 0
	      e  = (d + t1 + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	      d  = c
	      dl = cl
	      c  = b
	      cl = bl
	      b  = a
	      bl = al
	      al = (t1l + t2l) | 0
	      a  = (t1 + t2 + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0
	    }

	    this._al = (this._al + al) | 0
	    this._bl = (this._bl + bl) | 0
	    this._cl = (this._cl + cl) | 0
	    this._dl = (this._dl + dl) | 0
	    this._el = (this._el + el) | 0
	    this._fl = (this._fl + fl) | 0
	    this._gl = (this._gl + gl) | 0
	    this._hl = (this._hl + hl) | 0

	    this._a = (this._a + a + ((this._al >>> 0) < (al >>> 0) ? 1 : 0)) | 0
	    this._b = (this._b + b + ((this._bl >>> 0) < (bl >>> 0) ? 1 : 0)) | 0
	    this._c = (this._c + c + ((this._cl >>> 0) < (cl >>> 0) ? 1 : 0)) | 0
	    this._d = (this._d + d + ((this._dl >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	    this._e = (this._e + e + ((this._el >>> 0) < (el >>> 0) ? 1 : 0)) | 0
	    this._f = (this._f + f + ((this._fl >>> 0) < (fl >>> 0) ? 1 : 0)) | 0
	    this._g = (this._g + g + ((this._gl >>> 0) < (gl >>> 0) ? 1 : 0)) | 0
	    this._h = (this._h + h + ((this._hl >>> 0) < (hl >>> 0) ? 1 : 0)) | 0
	  }

	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64)

	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset)
	      H.writeInt32BE(l, offset + 4)
	    }

	    writeInt64BE(this._a, this._al, 0)
	    writeInt64BE(this._b, this._bl, 8)
	    writeInt64BE(this._c, this._cl, 16)
	    writeInt64BE(this._d, this._dl, 24)
	    writeInt64BE(this._e, this._el, 32)
	    writeInt64BE(this._f, this._fl, 40)
	    writeInt64BE(this._g, this._gl, 48)
	    writeInt64BE(this._h, this._hl, 56)

	    return H
	  }

	  return Sha512

	}


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */

	var helpers = __webpack_require__(79);

	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << ((len) % 32);
	  x[(((len + 64) >>> 9) << 4) + 14] = len;

	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;

	  for(var i = 0; i < x.length; i += 16)
	  {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;

	    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
	    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
	    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

	    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
	    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
	    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
	    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
	    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
	    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

	    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
	    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
	    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
	    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
	    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
	    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
	    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

	    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
	    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
	    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
	    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
	    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
	    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);

	}

	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t)
	{
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t)
	{
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t)
	{
	  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}

	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var intSize = 4;
	var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
	var chrsz = 8;

	function toArray(buf, bigEndian) {
	  if ((buf.length % intSize) !== 0) {
	    var len = buf.length + (intSize - (buf.length % intSize));
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }

	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}

	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}

	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}

	module.exports = { hash: hash };

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62).Buffer))

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = ripemd160



	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	// Constants table
	var zl = [
	    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	    7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	    3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	    1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	    4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13];
	var zr = [
	    5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	    6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	    15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	    8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	    12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11];
	var sl = [
	     11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	    7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	    11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	      11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	    9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ];
	var sr = [
	    8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	    9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	    9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	    15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	    8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ];

	var hl =  [ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr =  [ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];

	var bytesToWords = function (bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << (24 - b % 32);
	  }
	  return words;
	};

	var wordsToBytes = function (words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	  }
	  return bytes;
	};

	var processBlock = function (H, M, offset) {

	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];

	    // Swap
	    M[offset_i] = (
	        (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	        (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	    );
	  }

	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;

	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = (al +  M[offset+zl[i]])|0;
	    if (i<16){
	        t +=  f1(bl,cl,dl) + hl[0];
	    } else if (i<32) {
	        t +=  f2(bl,cl,dl) + hl[1];
	    } else if (i<48) {
	        t +=  f3(bl,cl,dl) + hl[2];
	    } else if (i<64) {
	        t +=  f4(bl,cl,dl) + hl[3];
	    } else {// if (i<80) {
	        t +=  f5(bl,cl,dl) + hl[4];
	    }
	    t = t|0;
	    t =  rotl(t,sl[i]);
	    t = (t+el)|0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;

	    t = (ar + M[offset+zr[i]])|0;
	    if (i<16){
	        t +=  f5(br,cr,dr) + hr[0];
	    } else if (i<32) {
	        t +=  f4(br,cr,dr) + hr[1];
	    } else if (i<48) {
	        t +=  f3(br,cr,dr) + hr[2];
	    } else if (i<64) {
	        t +=  f2(br,cr,dr) + hr[3];
	    } else {// if (i<80) {
	        t +=  f1(br,cr,dr) + hr[4];
	    }
	    t = t|0;
	    t =  rotl(t,sr[i]) ;
	    t = (t+er)|0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t    = (H[1] + cl + dr)|0;
	  H[1] = (H[2] + dl + er)|0;
	  H[2] = (H[3] + el + ar)|0;
	  H[3] = (H[4] + al + br)|0;
	  H[4] = (H[0] + bl + cr)|0;
	  H[0] =  t;
	};

	function f1(x, y, z) {
	  return ((x) ^ (y) ^ (z));
	}

	function f2(x, y, z) {
	  return (((x)&(y)) | ((~x)&(z)));
	}

	function f3(x, y, z) {
	  return (((x) | (~(y))) ^ (z));
	}

	function f4(x, y, z) {
	  return (((x) & (z)) | ((y)&(~(z))));
	}

	function f5(x, y, z) {
	  return ((x) ^ ((y) |(~(z))));
	}

	function rotl(x,n) {
	  return (x<<n) | (x>>>(32-n));
	}

	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];

	  if (typeof message == 'string')
	    message = new Buffer(message, 'utf8');

	  var m = bytesToWords(message);

	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;

	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	  m[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	      (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	      (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	  );

	  for (var i=0 ; i<m.length; i += 16) {
	    processBlock(H, m, i);
	  }

	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	      // Shortcut
	    var H_i = H[i];

	    // Swap
	    H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	          (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	  }

	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62).Buffer))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(68)

	var zeroBuffer = new Buffer(128)
	zeroBuffer.fill(0)

	module.exports = Hmac

	function Hmac (alg, key) {
	  if(!(this instanceof Hmac)) return new Hmac(alg, key)
	  this._opad = opad
	  this._alg = alg

	  var blocksize = (alg === 'sha512') ? 128 : 64

	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key

	  if(key.length > blocksize) {
	    key = createHash(alg).update(key).digest()
	  } else if(key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize)
	  }

	  var ipad = this._ipad = new Buffer(blocksize)
	  var opad = this._opad = new Buffer(blocksize)

	  for(var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36
	    opad[i] = key[i] ^ 0x5C
	  }

	  this._hash = createHash(alg).update(ipad)
	}

	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc)
	  return this
	}

	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest()
	  return createHash(this._alg).update(this._opad).update(h).digest(enc)
	}


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62).Buffer))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var pbkdf2Export = __webpack_require__(83)

	module.exports = function (crypto, exports) {
	  exports = exports || {}

	  var exported = pbkdf2Export(crypto)

	  exports.pbkdf2 = exported.pbkdf2
	  exports.pbkdf2Sync = exported.pbkdf2Sync

	  return exports
	}


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function(crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest
	      digest = undefined
	    }

	    if ('function' !== typeof callback)
	      throw new Error('No callback provided to pbkdf2')

	    setTimeout(function() {
	      var result

	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest)
	      } catch (e) {
	        return callback(e)
	      }

	      callback(undefined, result)
	    })
	  }

	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations)
	      throw new TypeError('Iterations not a number')

	    if (iterations < 0)
	      throw new TypeError('Bad iterations')

	    if ('number' !== typeof keylen)
	      throw new TypeError('Key length not a number')

	    if (keylen < 0)
	      throw new TypeError('Bad key length')

	    digest = digest || 'sha1'

	    if (!Buffer.isBuffer(password)) password = new Buffer(password)
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt)

	    var hLen, l = 1, r, T
	    var DK = new Buffer(keylen)
	    var block1 = new Buffer(salt.length + 4)
	    salt.copy(block1, 0, 0, salt.length)

	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length)

	      var U = crypto.createHmac(digest, password).update(block1).digest()

	      if (!hLen) {
	        hLen = U.length
	        T = new Buffer(hLen)
	        l = Math.ceil(keylen / hLen)
	        r = keylen - (l - 1) * hLen

	        if (keylen > (Math.pow(2, 32) - 1) * hLen)
	          throw new TypeError('keylen exceeds maximum length')
	      }

	      U.copy(T, 0, 0, hLen)

	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest()

	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k]
	        }
	      }

	      var destPos = (i - 1) * hLen
	      var len = (i == l ? r : hLen)
	      T.copy(DK, destPos, 0, len)
	    }

	    return DK
	  }

	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62).Buffer))

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * dependencies
	 */

	var matches = __webpack_require__(85);

	/**
	 * Traverse with the given `el`, `selector` and `len`.
	 *
	 * @param {String} type
	 * @param {Element} el
	 * @param {String|Element} selector
	 * @param {Number} len
	 * @return {Array}
	 * @api public
	 */

	module.exports = function(type, el, selector, len){
	  var el = el[type]
	    , n = len || 1
	    , ret = [];

	  if (!el) return ret;

	  // check if `selector` is a DOM node
	  var isElement = selector && selector.nodeName;

	  do {
	    if (n == ret.length) break;
	    if (1 != el.nodeType) continue;
	    if (isElement) el == selector && ret.push(el);
	    else if (matches(el, selector)) ret.push(el);
	    if (!selector) ret.push(el);
	  } while (el = el[type]);

	  return ret;
	}


/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';

	var proto = Element.prototype;
	var vendor = proto.matches
	  || proto.matchesSelector
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;

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
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; i++) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}

/***/ },
/* 86 */
/***/ function(module, exports) {

	/**
	 * pad a str with 0 if its single
	 *
	 * @param {string} str
	 * @return {string}
	 */
	function pad (str) {
	  str = str.toString()
	  if (str.length === 1) return '0' + str
	  return str
	}

	/**
	 * Return 'YYYY-MM-DD' format from creating date with param `n` as construct
	 * parameter
	 *
	 * @param {Number | String} n
	 * @return {String}
	 * @api public
	 */
	exports.ymd = function (n) {
	  var d = new Date(n)
	  return d.getFullYear() + '-' +
	  pad(d.getMonth() + 1) + '-' +
	  pad(d.getDate())
	}

	/**
	 * return the integer format of `n`, ie:
	 * 1000.01 => 1,000
	 * return empty string if n can't be parse to number
	 *
	 * @param {Number | String} n
	 * @return {String}
	 * @api public
	 */
	exports.integer = function (n) {
	  n = parseInt(n, 10)
	  if (isNaN(n)) return ''
	  n = n.toString()
	  var arr = []
	  var l = n.length
	  for (var i = l - 1; i >= 0; i--) {
	    arr.push(n[i])
	    if ((i !== 0) && ((l - i) % 3 === 0)) {
	      arr.push(',')
	    }
	  }
	  return arr.reverse().join('')
	}

	/**
	 * percentage
	 *
	 * @param {number} n
	 * @return {number}
	 * @api public
	 */
	exports.percentage = function (n) {
	  n = parseFloat(n, 10)
	  if (isNaN(n)) return ''
	  return (n * 100).toFixed() + '%'
	}


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var unique = __webpack_require__(88)
	var domify = __webpack_require__(15)

	var buildinRe = exports.buildinRe = /^(\$stat|changed|emit|clean|on|off|attrs)$/
	/**
	 * parse bindings from function string
	 *
	 * @return {Array}
	 * @param {String} fn
	 * @api public
	 */
	var parseBindings = exports.parseBindings = function (fn) {
	  var res = []
	  var str = fn.toString()
	  var arr
	  var ms = str.match(/\(([A-Za-z0-9_$]+?)(?:[\s,)])/)
	  var param = ms && ms.length ? ms[1] : null
	  if (!param) return res
	  var re = new RegExp(param.replace('$', '\\$') + '\\.(\\w+)', 'g')
	  while ((arr = re.exec(str)) !== null) {
	    res.push(arr[1])
	  }
	  res = res.filter(function (str) {
	    return !buildinRe.test(str)
	  })
	  // console.log(res)
	  return unique(res)
	}

	/**
	 * Analyze the render functions for each child
	 * return list of config
	 * config.formatter: function for change innerHTML of <td>
	 *
	 * @param {String} el
	 * @param {String} formatters
	 * @param {String} renders
	 * @api public
	 */
	exports.createRowConfig = function (el, formatters, renders) {
	  var res = []
	  var name
	  toArray(el.children).forEach(function (el, i) {
	    var o = {index: i, bindings: []}
	    o.start = el.outerHTML.match(/^<.*?>/)[0]
	    o.end = '</' + el.tagName.toLowerCase() + '>'
	    if (el.hasAttribute('data-react')) {
	      if (!el.hasAttribute('data-render')) throw new Error('render function required for stat change')
	      var react = el.getAttribute('data-react').trim()
	      // special attribute
	      if (react === '$stat') {
	        o.stat = true
	      } else {
	        o.bindings = react.split(/,\s*/)
	      }
	    }
	    if (el.hasAttribute('data-render')) {
	      if (el.hasAttribute('data-lazy')) o.lazy = true
	      name = el.getAttribute('data-render').trim()
	      var render = renders[name]
	      if (!render) throw new Error("render '" + name + "' not found")
	      if (!o.bindings.length) o.bindings = parseBindings(render)
	      o.render = render
	    } else {
	      parseFormatter(el, o, formatters)
	    }
	    res.push(o)
	  })
	  return res
	}

	/**
	 * Parse formatter for td element and set it to config
	 *
	 * @param {Element} td element
	 * @param {Object} config config for td
	 * @param {Object} formatters format functions
	 * @api public
	 */
	function parseFormatter (el, config, formatters) {
	  var html = el.innerHTML
	  var arr = html.split(/[{}]/)
	  // no binding attribute
	  if (arr.length === 1) {
	    config.html = html
	    return
	  }
	  var prefix = arr[0]
	  var field = arr[1]
	  var suffix = arr[2]
	  config.bindings.push(field)
	  if (el.hasAttribute('data-format')) {
	    var name = el.getAttribute('data-format')
	    var formatter = formatters[name]
	    if (!formatter) throw new Error('formatter ' + name + ' not found')
	    config.formatter = function (model) {
	      var v = model[field]
	      if (v == null) return ''
	      return prefix + formatter(v) + suffix
	    }
	  } else {
	    config.formatter = function (model) {
	      var v = model[field]
	      if (v == null) return ''
	      return prefix + v + suffix
	    }
	  }
	}

	/**
	 * create row rendering function
	 *
	 * @param {String} rowConfig
	 * @api public
	 */
	exports.createRenderFn = function (rowConfig) {
	  var renders = rowConfig.filter(function (o) {
	    return o.render
	  })
	  return function (parentNode, model) {
	    var html = ''
	    rowConfig.forEach(function (config) {
	      html += config.start
	      if (config.html) {
	        html += config.html
	      } else if (config.formatter) {
	        html += config.formatter(model)
	      }
	      html += config.end
	    })
	    var fragment = domify(html)
	    parentNode.appendChild(fragment)
	    renders.forEach(function (o) {
	      var el = parentNode.children[o.index]
	      // TODO check lazy renders
	      o.render(model, el)
	    })
	  }
	}

	/**
	 * merge i to o, return o
	 *
	 * @param {Object} o
	 * @param {Object} i
	 * @return {Object}
	 * @api public
	 */
	exports.merge = function (o, i) {
	  for (var k in i) {
	    o[k] = i[k]
	  }
	  return o
	}

	/**
	 * Simple diff without nested check
	 * Return the change props from b
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
	 * check if two array interact
	 *
	 * @param {Array} a
	 * @param {Array} b
	 * @return {Boolean}
	 * @api public
	 */
	exports.interact = function (a, b) {
	  return a.some(function (v) {
	    return ~b.indexOf(v)
	  })
	}

	/**
	 * Change array like object to array (better performance)
	 *
	 * @param {ArrayLike} arr
	 * @api public
	 */
	var toArray = exports.toArray = function (arr) {
	  var res = new Array(arr.length)
	  for (var i = 0, len = arr.length; i < len; i++) {
	    res[i] = arr[i]
	  }
	  return res
	}


/***/ },
/* 88 */
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
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(9)
	var util = __webpack_require__(87)
	var buildinRe = util.buildinRe

	/**
	 * create a model reactive class based on the field names
	 *
	 * @param {array} fields
	 * @return {function} Model class constructor
	 * @api public
	 */
	function createModelClz (fields) {
	  /**
	   * Model class
	   *
	   * @param {Object} attrs
	   */
	  function Model (attrs) {
	    this.origAttrs = attrs
	    this.attrs = util.merge({}, attrs)
	  }
	  Model.prototype = {}
	  Emitter(Model.prototype)

	  fields.forEach(function (name) {
	    if (buildinRe.test(name)) throw new Error(name + ' could not be used as field name')
	    if (name === 'id' || name === '_id') Model.primaryKey = name

	    Object.defineProperty(Model.prototype, name, {
	      set: function (val) {
	        var prev = this.attrs[name]
	        var diff = util.diffObject(this.attrs, this.origAttrs)
	        var changedNum = Object.keys(diff).length
	        this.attrs[name] = val
	        this.emit('change', name, val, prev)
	        this.emit('change ' + name, val, prev)
	        if (prev === val) return
	        if (changedNum === 0) return this.emit('stat', true)
	        if (changedNum === 1 && diff[name] === val) {
	          // became clean
	          this.emit('stat', false)
	        }
	      },
	      get: function () {
	        return this.attrs[name]
	      }
	    })
	  })

	  /**
	  * Return `false` or an object
	  * Optionally check for a specific `attr`.
	  *
	  * @param {String} [attr]
	  * @return {Object|Boolean}
	  * @api public
	  */

	  Model.prototype.changed = function (attr) {
	    var changed = util.diffObject(this.origAttrs, this.attrs)
	    if (typeof changed[attr] !== 'undefined') {
	      return changed[attr]
	    }
	    if (Object.keys(changed).length === 0) return false
	    return changed
	  }

	  /**
	   * Should be called when the Object is saved
	   *
	   * @api public
	   */
	  Model.prototype.clean = function () {
	    for (var k in this.attrs) {
	      this.origAttrs[k] = this.attrs[k]
	    }
	    this.emit('clean')
	    this.emit('stat', false)
	  }

	  return Model
	}

	module.exports = createModelClz


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(87)
	var Emitter = __webpack_require__(9)
	var classes = __webpack_require__(10)
	var interact = __webpack_require__(87).interact

	/**
	 * Row class
	 *
	 * @param {object} config row config
	 */
	function Row (config) {
	  var el = this.el = config.root.cloneNode(false)
	  this.id = config.id
	  el.setAttribute('data-id', config.id)
	  var fn = config.renderFn
	  var model = this.model = config.model
	  var rowConfig = this.rowConfig = config.rowConfig
	  fn(el, model)
	  this.bind(el, rowConfig, model)
	  model.on('change', this.onModelChange.bind(this))
	  model.on('clean', this.onModelChange.bind(this))
	}

	Emitter(Row.prototype)

	/**
	 * bind model react
	 * @api private
	 */
	Row.prototype.bind = function (tr, rowConfig, model) {
	  rowConfig.forEach(function (config, i) {
	    var el = tr.children[i]
	    var bindings = config.bindings
	    if (bindings.length) {
	      bindings.forEach(function (field) {
	        model.on('change ' + field, function () {
	          if (config.render) {
	            config.render(model, el, true)
	          } else if (config.formatter) {
	            el.innerHTML = config.formatter(model)
	          }
	        })
	      })
	    } else if (config.stat) {
	      model.on('stat', function () {
	        config.render(model, el)
	      })
	    }
	  })
	}

	/**
	 * onModelChange
	 *
	 * @api private
	 */
	Row.prototype.onModelChange = function () {
	  var config = this.rowConfig
	  var children = this.el.children
	  var changed = this.model.changed()
	  var keys = changed ? Object.keys(changed) : []
	  util.toArray(children).forEach(function (node, i) {
	    if (!changed) return classes(node).remove('dirty')
	    var bindings = config[i].bindings
	    if (interact(bindings, keys)) {
	      classes(node).add('dirty')
	    } else {
	      classes(node).remove('dirty')
	    }
	  })
	}

	/**
	 * destroy row
	 *
	 * @param {boolean} emit
	 * @api public
	 */
	Row.prototype.remove = function (emit) {
	  this.model.off()
	  this.el.parentNode.removeChild(this.el)
	  if (emit) this.emit('destroy')
	  this.off()
	}

	module.exports = Row


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, setImmediate) {'use strict';

	var callable, byObserver;

	callable = function (fn) {
		if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
		return fn;
	};

	byObserver = function (Observer) {
		var node = document.createTextNode(''), queue, i = 0;
		new Observer(function () {
			var data;
			if (!queue) return;
			data = queue;
			queue = null;
			if (typeof data === 'function') {
				data();
				return;
			}
			data.forEach(function (fn) { fn(); });
		}).observe(node, { characterData: true });
		return function (fn) {
			callable(fn);
			if (queue) {
				if (typeof queue === 'function') queue = [queue, fn];
				else queue.push(fn);
				return;
			}
			queue = fn;
			node.data = (i = ++i % 2);
		};
	};

	module.exports = (function () {
		// Node.js
		if ((typeof process !== 'undefined') && process &&
				(typeof process.nextTick === 'function')) {
			return process.nextTick;
		}

		// MutationObserver=
		if ((typeof document === 'object') && document) {
			if (typeof MutationObserver === 'function') {
				return byObserver(MutationObserver);
			}
			if (typeof WebKitMutationObserver === 'function') {
				return byObserver(WebKitMutationObserver);
			}
		}

		// W3C Draft
		// http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
		if (typeof setImmediate === 'function') {
			return function (cb) { setImmediate(callable(cb)); };
		}

		// Wide available standard
		if (typeof setTimeout === 'function') {
			return function (cb) { setTimeout(callable(cb), 0); };
		}

		return null;
	}());

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(73), __webpack_require__(92).setImmediate))

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(73).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(92).setImmediate, __webpack_require__(92).clearImmediate))

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(9)
	var events = __webpack_require__(52)
	var domify = __webpack_require__(15)
	var query = __webpack_require__(56)
	var classes = __webpack_require__(10)
	var util = __webpack_require__(87)
	var template = '<ul><li class="prev"><a href="#">&lsaquo;</a></li>' +
	  '<li class="next"><a href="#">&rsaquo;</a></li></ul>'

	function Pager () {
	  var el = this.el = domify(template)
	  el.className = 'exgrid-pager'
	  this.events = events(el, this)
	  this.events.bind('click li > a')
	  this.perpage(5)
	  this.total(0)
	  this.show(0)
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
	  if (classes(el).has('prev')) return this.prev()
	  if (classes(el).has('next')) return this.next()
	  this.show(el.textContent - 1)
	}

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
	}

	Pager.prototype.select = function (n) {
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

	Pager.prototype.limit = function (count) {
	  this._limit = Number(count)
	}

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
	  var lis = util.toArray(el.children)
	  for (var i = 0, len = lis.length; i < len; i++) {
	    var li = lis[i]
	    if (classes(li).has('page')) {
	      el.removeChild(li)
	    }
	  }

	  // page links
	  for (i = 0; i < pages; ++i) {
	    var n = i + 1
	    if (limit && n === limit) {
	      links += '<li class="page">...</li>'
	    } else if (limit && (n > limit && n !== pages - 1)) {
	      continue
	    }
	    links += curr === i
	      ? '<li class="page active"><a href="#">' + n + '</a></li>'
	      : '<li class="page"><a href="#">' + n + '</a></li>'
	  }

	  // insert
	  if (links) el.insertBefore(domify(links), next)

	  // prev
	  if (curr) classes(prev).remove('exgrid-pager-hide')
	  else classes(prev).add('exgrid-pager-hide')

	  // next
	  if (curr < pages - 1) classes(next).remove('exgrid-pager-hide')
	  else classes(next).add('exgrid-pager-hide')
	}

	module.exports = Pager


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(95);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./exgrid.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./exgrid.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".exgrid-pager {\n  margin-top: 15px;\n}\n.exgrid-pager {\n  margin-top: 10px;\n  padding: 0;\n  font-size: 14px;\n}\n\n.exgrid-pager li {\n  display: inline-block;\n}\n\n.exgrid-pager-hide {\n  opacity: .2;\n}\n.exgrid-pager li.active a {\n  font-weight: bold;\n  border-color: #ddd;\n}\n.exgrid-pager li a {\n  text-decoration: none;\n  border-radius: 3px;\n  border: 1px solid #eee;\n  padding: 3px 8px;\n  margin: 0 2px;\n  color: #2a2a2a;\n}\n.exgrid-pager li.prev a,\n.exgrid-pager li.next a{\n  font-weight: bolder;\n}\n\n", ""]);

	// exports


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var Overlay = __webpack_require__(12)
	var Notice = __webpack_require__(51)
	var spin = __webpack_require__(17)
	var query = __webpack_require__(56)
	var Grid = __webpack_require__(59)
	var template = __webpack_require__(97)
	var data = __webpack_require__(58)
	var toObject = __webpack_require__(98)

	var placeholder = document.getElementById('grid')
	placeholder.className = 'shows-table left'

	var grid = new Grid(template, {
	  perpage: 10,
	  formatters: {
	    chineseMoney: function (money) {
	      return '¥' + money.toFixed(2)
	    }
	  },
	  renders: {
	    setActive: function (model, el) {
	      if (model.isActive) {
	        el.textContent = '✓'
	      } else {
	        el.textContent = '✗'
	      }
	    }
	  }
	})

	placeholder.appendChild(grid.el)
	grid.setData(data)

	var form = document.getElementById('form')
	var overlay = Overlay(form)

	grid.on('click', function (e, row) {
	  var model = row.model
	  query('[name="id"]', form).value = model._id
	  query('[name="name"]', form).value = model.name
	  query('[name="age"]', form).value = model.age
	  query('[name="company"]', form).value = model.company
	  query('[name="money"]', form).value = model.money
	  query('[name="isActive"]', form).checked = model.isActive
	  form.onsubmit = function (e) {
	    e.preventDefault()
	    var obj = toObject(form)
	    for (var k in obj) {
	      if (k === 'age' || k === 'money') {
	        model[k] = Number(obj[k])
	      } else if (k !== 'id') {
	        model[k] = obj[k]
	      }
	    }
	    // wtf no property for no checked element
	    model['isActive'] = !!obj['isActive']
	    if (!model.changed()) return
	    overlay.show()
	    var s = spin(overlay.el).text('saving')
	    setTimeout(function () {
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
/* 97 */
/***/ function(module, exports) {

	module.exports = "<table>\n  <thead>\n    <tr>\n      <th class=\"sort\" data-sort=\"string\">name</th>\n      <th class=\"sort\" data-sort=\"number\">age</th>\n      <th>company</th>\n      <th class=\"sort\" data-sort=\"number\">money</th>\n      <th>active</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td class=\"left\">{name}</td>\n      <td style=\"width:30px;\">{age}</td>\n      <td class=\"left\">{company}</td>\n      <td class=\"money\" data-format=\"chineseMoney\">{money}</td>\n      <td data-render=\"setActive\" class=\"center\"></td>\n    </tr>\n  </tbody>\n</table>\n";

/***/ },
/* 98 */
/***/ function(module, exports) {

	/* jshint -W093 */

	module.exports = function (form) {
	  var body = Object.create(null)

	  Array.prototype.slice.call(form.querySelectorAll('input:not(:disabled), textarea:not(:disabled), select:not(:disabled)')).forEach(function (el) {
	    var key = el.name;

	    // if an element has no name, it wouldn't be sent to the server
	    if (!key) return

	    if (['file', 'reset', 'submit', 'button'].indexOf(el.type) > -1) return

	    if (['checkbox', 'radio'].indexOf(el.type) > -1 && !el.checked) return

	    if (/\[\]$/.test(key)) {
	      key = key.slice(0,-2);

	      // if using array notation, go ahead and put the first value into an array.
	      if (body[key] === undefined) {
	        body[key] = [];
	      }
	    }
	    
	    if (body[key] === undefined) {
	      body[key] = el.value;
	    } else if (Object.prototype.toString.call(body[key]) === '[object Array]') {
	      body[key].push(el.value);
	    } else {
	      body[key] = [body[key], el.value];
	    }
	  })

	  return body
	}


/***/ }
/******/ ]);