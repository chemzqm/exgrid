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

	var template = __webpack_require__(1);
	var Grid = __webpack_require__(2);

	var grid = new Grid(template, {
	  renders: {
	    percentage: function (model, el) {
	      el.textContent = (model.percent * 100).toFixed() + '%';
	    }
	  }
	})



/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = "<table>\n  <thead>\n    <tr>\n      <th>name</th><th>age</th><th>score</th><th>percentage</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>{name}</td>\n      <td>{age}</td>\n      <td data-format=\"integer\">{score}</td>\n      <td data-render=\"percentage\"></td>\n    </tr>\n  </tbody>\n</table>\n";

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var query = __webpack_require__(3);
	var domify = __webpack_require__(4);
	var formatter = __webpack_require__(5);
	var util = __webpack_require__(6);
	var Emitter = __webpack_require__(8);
	var Model = __webpack_require__(9);
	var Row = __webpack_require__(10);
	var nextTick = __webpack_require__(11);
	var indexof = __webpack_require__(14);
	var DefaultPager = __webpack_require__(15);

	function Grid(el, config) {
	  if (typeof el === 'string') el = domify(el);
	  var opt = this.opt = config || {};
	  //perpage page sortField sortOrder
	  this.params = {page: opt.page || 0, sortField: null, sortDirection: null};
	  this.params.perpage = this.opt.perpage || 200;
	  this.remote = this.params.remote = opt.remote || false;
	  this.el = document.createElement('div');
	  this.el.appendChild(el);
	  this.formatters = merge(this.opt.formatters || {}, formatter);
	  var tmplEl = query('tbody > tr:last-child', el);
	  this.root = document.cloneNode(tmplEl);
	  this.root.innerHTML = '';
	  this.bodyEl = query('tbody', el);
	  //[{index: i, format:fn, render: fn, bindings:fields, start: str, end: str}]
	  this.rowConfig = util.createRowConfig(tmplEl, this.formatters, this.opt.renders || {});
	  this.renderFn = util.createRenderFn(this.rowConfig);
	  this.rows = [];
	  var self = this;
	  var Pager = opt.Pager || DefaultPager;
	  if (opt.paging) {
	    var pager = this.pager = new Pager(this);
	    this.el.appendChild(pager.el);
	    pager.perpage(this.params.perpage);
	    pager.on('show', function(i) {
	      self.setPage(i);
	    })
	  }
	  nextTick(function() {
	    self.emit('construct', self.params);
	  });
	}

	Grid.Pager = DefaultPager;

	Emitter(Grid.prototype);

	/**
	 * Reset grid data
	 *
	 * @param {Array} data
	 * @api public
	 */
	Grid.prototype.setData = function(data) {
	  this.data = data;
	  var page = this.params.page;
	  if (!this.modelClass) {
	    var obj = data[0];
	    if (obj) {
	      var keys = Object.keys(obj);
	      this.modelClass = Model(keys);
	    }
	  }
	  if (this.remote === true) {
	    this.renderData(data);
	  } else {
	    var max = this.params.perpage;
	    this.setTotal(data.length);
	    this.renderData(data.slice(page*max, (page + 1)*max));
	  }
	  if (this.pager) this.pager.select(page);
	}

	/**
	 * refresh the body with new data array.
	 *
	 * @param {Array} data
	 * @api public
	 */
	Grid.prototype.renderData = function(data) {
	  this.rows.forEach(function(row) {
	    row.remove();
	  })
	  this.rows = [];
	  if (data.length === 0) {
	    //no data
	    this.emit('empty');
	    return;
	  }
	  var fragment = document.createDocumentFragment();
	  for (var i = 0, len = data.length; i < len; i++) {
	    var obj = data[i];
	    var row = this.createRow(obj);
	    fragment.appendChild(row.el);
	    this.rows.push(row);
	  }
	  this.bodyEl.appendChild(fragment);
	}

	/**
	 * Set current page number(0 based) and paging the data
	 *
	 * @param {Number} page
	 * @api public
	 */
	Grid.prototype.setPage = function (page) {
	  if (typeof page !== 'number') throw new Error(page + ' is not a valid page number');
	  if (this.pager) this.pager.select(page);
	  if (page == this.params.page) return;
	  this.params.page = page;
	  var max = this.params.perpage;
	  if (this.remote === true) {
	    this.emit('page', this.params);
	  } else {
	    var list = this.selected ? this.selected : this.data;
	    var data = list.slice(page*max, (page + 1)*max);
	    this.renderData(data);
	  }
	}

	/**
	 * Set the total data count
	 *
	 * @param {Number} count
	 * @api public
	 */
	Grid.prototype.setTotal = function (count) {
	  if (this.pager) this.pager.total(count);
	}

	/**
	 * Create row with obj and prepend to el (default: frist child of tbody)
	 *
	 * @param {String} obj
	 * @param {String} el
	 * @api public
	 */
	Grid.prototype.prepend = function (obj, el) {
	  el = el || this.bodyEl.firstChild;
	  var row = this.createRow(obj);
	  this.rows.unshift(row);
	  this.bodyEl.insertBefore(row.el, el);
	}

	/**
	 * emit `refresh` event to accept the data from listeners
	 *
	 * @api public
	 */
	Grid.prototype.refresh = function () {
	  this.params.refresh = true;
	  this.emit('refresh', this.params);
	  this.params.refresh = false;
	}

	/**
	 * create row from object obj
	 * @param {Object} obj
	 * @return {Row}
	 * @api private
	 */
	Grid.prototype.createRow = function (obj) {
	  var row = new Row({
	    root: this.root,
	    rowConfig: this.rowConfig,
	    renderFn: this.renderFn,
	    model: new this.modelClass(obj)
	  })
	  var self = this;
	  row.once('destroy', function () {
	    var i = indexof(self.rows, row);
	    if (i !== -1) self.rows.splice(i, 1);
	  })
	  return row;
	}

	/**
	 * Filter data with field and val(optional filter function)
	 * redirect to first page
	 * render all data when the val is empty string
	 *
	 * @param {String} field
	 * @param {String | Function} val
	 * @api public
	 */
	Grid.prototype.filter = function (field, val) {
	  var arr;
	  var fn = typeof val === 'function' ? val : null;
	  if (val === '') {
	    this.params.filterField = null;
	    this.params.filterValue = '';
	  } else {
	    this.params.filterField = field;
	    this.params.filterValue = val;
	  }
	  //show first page on filter
	  this.params.page = 1;
	  if (this.pager) this.pager.select(1);
	  if (this.remote) {
	    this.emit('filter', this.params);
	    return;
	  }
	  arr = this.selected = this.data.filter(fn ? fn : function(v) {
	    if (val === '') return true;
	    if (typeof val === 'boolean' || typeof val === 'number') {
	      return v[field] == v;
	    }
	    var re = new RegExp(val.replace('\\', '\\\\').replace(/\s+/g, '\\s*'))
	    return re.test(v[field].toString());
	  })
	  //save memory
	  if (arr.length === this.data.length) this.selected = null;
	  var max = this.params.perpage;
	  this.setTotal(arr.length);
	  this.renderData(arr.slice(0, max));
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
	  this.params.sortField = field;
	  this.params.sortDirection = dir;
	  if (this.remote) {
	    this.emit('sort', this.params);
	  } else {
	    var page = this.params.page;
	    var max = this.params.perpage;
	    //use filted data if exist
	    var data = this.selected || this.data;
	    data.sort(function(a, b) {
	      if (typeof method === 'function') {
	        return method(a, b) * dir;
	      }
	      switch (method) {
	        case 'number':
	          a = Number(a);
	          b = Number(b);
	          break;
	        case 'string':
	          a = a.trim();
	          b = b.trim();
	          break;
	      }
	      return (a < b? 1 : -1) * dir;
	    })
	    this.renderData(data.slice(page*max, (page + 1)*max));
	  }
	}

	Grid.prototype.remove = function() {
	  if (this.pager) this.pager.remove();
	  this.rows.forEach(function(row) {
	    row.remove();
	  })
	  this.el.parentNode.remove(this.el);
	  this.off();
	}

	/**
	 * merge i to o, return o
	 *
	 * @param {Object} o
	 * @param {Object} i
	 * @return {Object}
	 * @api public
	 */
	function merge(o, i) {
	  for(var k in i) {
	    o[k] = i[k];
	  }
	  return o;
	}

	module.exports = Grid;


/***/ },
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	
	function pad(str) {
	  str = str.toString();
	  if (str.length == 2) return str;
	  return '0' + str;
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
	  var d = new Date(n);
	  return d.getFullYear() + '-'
	        + pad(d.getMonth() + 1) + '-'
	        + pad(d.getDate());
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
	  n = parseInt(n, 10);
	  if (isNaN(n)) return '';
	  n = n.toString();
	  var arr = [];
	  var l = n.length;
	  for(var i = l - 1; i >= 0; i--) {
	    arr.push(n[i]);
	    if ((i != 0) && ((l - i)%3 === 0)) {
	      arr.push(',');
	    }
	  }
	  return arr.reverse().join('');
	}

	exports.percentage = function (n) {
	  return (n*100).toFixed() + '%';
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var unique = __webpack_require__(7);
	var domify = __webpack_require__(4);

	/**
	 * parse bindings from function string
	 *
	 * @return {Array}
	 * @param {String} fn
	 * @api public
	 */
	var parseBindings = exports.parseBindings = function (fn) {
	  var res = [];
	  var str = fn.toString();
	  var arr;
	  var param = str.match(/\(([A-Za-z0-9_$]+)(?:[\s,)])/)[1];
	  if (!param) return res;
	  var re = new RegExp(param.replace('$', '\\$') + '\\.(\\w+)', 'g');
	  while((arr = re.exec(str)) !== null) {
	    res.push(arr[1]);
	  }
	  return unique(res);
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
	exports.createRowConfig = function(el, formatters, renders) {
	  var res = [], name;
	  [].slice.call(el.children).forEach(function(el, i) {
	    var o = {index: i, bindings: []};
	    o.start = el.outerHTML.match(/^<.*?>/)[0];
	    o.end = '</' + el.tagName.toLowerCase() + '>';
	    if (el.hasAttribute('data-react')) {
	      if (!el.hasAttribute('data-render')) throw new Error('render function required for stat change');
	      var react = el.getAttribute('data-react').trim();
	      //special attribute
	      if (react == 'dirty') {
	        o.stat = true;
	      } else {
	        o.bindings = react.split(/,\s*/);
	      }
	    }
	    if (el.hasAttribute('data-render')) {
	      if (el.hasAttribute('data-lazy')) o.lazy = true;
	      name = el.getAttribute('data-render').trim();
	      var render = renders[name];
	      if (!render) throw new Error('render \'' + name + '\' not found');
	      if (!o.bindings.length) o.bindings = parseBindings(render);
	      o.render = render;
	    } else {
	      parseFormatter(el, o, formatters);
	    }
	    res.push(o);
	  })
	  return res;
	}

	function parseFormatter(el, config, formatters) {
	  var html = el.innerHTML;
	  var arr = html.split(/[{}]/);
	  //no binding attribute
	  if (arr.length === 1) {
	    config.html = html;
	    return;
	  }
	  var prefix = arr[0];
	  var field = arr[1];
	  var suffix = arr[2];
	  config.bindings.push(field);
	  if (el.hasAttribute('data-formatter')) {
	    var name = el.getAttribute('data-formatter');
	    var formatter = formatters[name];
	    if (!formatter) throw new Error('formatter ' + name + ' not found');
	    config.formatter = function (model) {
	      return prefix + formatter(model[field]) + suffix;
	    }
	  } else {
	    config.formatter = function (model) {
	      return prefix + model[field] + suffix;
	    }
	  }
	}

	/**
	 * create row rendering function
	 *
	 * @param {String} rowCofig
	 * @api public
	 */
	exports.createRenderFn = function(rowCofig) {
	  var renders = rowCofig.filter(function(o) {
	    return o.render ? true : false;
	  })
	  return function(parentNode, model) {
	    var html = '';
	    rowCofig.forEach(function(config) {
	      html + config.start;
	      if (config.html) {
	        html + config.html;
	      } else if (config.formatter) {
	        html + config.formatter(model);
	      }
	      html + config.end;
	    })
	    var fragment = domify(html);
	    parentNode.appendChild(fragment);
	    renders.forEach(function(o) {
	      var el = parentNode.children[o.index];
	      //TODO check lazy renders
	      o.render(model, el);
	    })
	  }
	}



/***/ },
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(8);

	function createModelClz (fields) {
	  function Model(attrs) {
	    this.attrs = attrs || {};
	    this.dirty = {};
	  }

	  Model.prototype = {};
	  Emitter(Model.prototype);

	  fields.forEach(function(field) {
	    Object.defineProperty(Model.prototype, field, {
	      set: function(val) {
	        var prev = this.attrs[name];
	        if (prev == val) return;
	        if (Object.keys(this.dirty).length === 0) {
	          this.emit('stat', true);
	        }
	        this.dirty[name] = val;
	        this.attrs[name] = val;
	        this.emit('change', name, val, prev);
	        this.emit('change ' + name, val, prev);
	      },
	      get: function() {
	        return this.attrs[name];
	      }
	    })
	  })

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

	  Model.prototype.changed = function(attr){
	    var dirty = this.dirty;
	    if (Object.keys(dirty).length) {
	      if (attr) return !! dirty[attr];
	      return dirty;
	    }
	    return false;
	  };


	  /**
	   * Should be called when the Object is saved
	   *
	   * @api public
	   */
	  Model.prototype.clean = function () {
	    this.dirty = {};
	    this.emit('stat', false);
	  }

	  return Model;
	}

	module.exports = createModelClz;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(8);

	function Row (config) {
	  var el = this.el = document.cloneNode(config.root);
	  var fn = config.createRenderFn;
	  var model = this.model = config.model;
	  var rowConfig = config.rowConfig;
	  fn(el, model);
	  this.bind(el, rowConfig, model);
	}

	Emitter(Row.prototype);

	/**
	 * bind model react
	 * @api private
	 */
	Row.prototype.bind = function (tr, rowConfig, model) {
	  rowConfig.forEach(function(config, i) {
	    var el = tr.children[i];
	    var bindings = config.bindings;
	    if (bindings) {
	      bindings.forEach(function(field) {
	        model.on(field + ' change', function() {
	          if (config.render) {
	            config.render(model, el, true);
	          } else if (config.formatter) {
	            el.innerHTML = config.formatter(model);
	          }
	        })
	      })
	    } else if (config.stat) {
	      model.on('stat', function() {
	        config.render(model, el);
	      })
	    }
	  })
	}

	Row.prototype.remove = function () {
	  this.model.off();
	  this.el.parentNode.removeChild(this.el);
	  this.emit('destroy');
	  this.off();
	}

	module.exports = Row;


/***/ },
/* 11 */
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), __webpack_require__(13).setImmediate))

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(12).nextTick;
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).setImmediate, __webpack_require__(13).clearImmediate))

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(8);
	var events = __webpack_require__(16);
	var template = __webpack_require__(21);
	var domify = __webpack_require__(4);
	var query = __webpack_require__(3);
	var classes = __webpack_require__(22);

	function Pager() {
	  var el = this.el = domify(template);
	  el.className = 'exgrid-pager';
	  this.events = events(el, this);
	  this.events.bind('click li > a');
	  this.perpage(5);
	  this.total(0);
	  this.show(0);
	}

	Emitter(Pager.prototype);

	/**
	 * Select the previous page.
	 *
	 * @api public
	 */

	Pager.prototype.prev = function(){
	  this.show(Math.max(0, this.current - 1));
	}

	/**
	 * Select the next page.
	 *
	 * @api public
	 */

	Pager.prototype.next = function(){
	  this.show(Math.min(this.pages() - 1, this.current + 1));
	}

	Pager.prototype.onclick = function(e) {
	  e.preventDefault();
	  var el = e.target.parentNode;
	  if (classes(el).has('prev')) return this.prev();
	  if (classes(el).has('next')) return this.next();
	  this.show(el.textContent - 1);
	}

	/**
	 * Return the total number of pages.
	 *
	 * @return {Number}
	 * @api public
	 */

	Pager.prototype.pages = function(){
	  return Math.ceil(this._total / this._perpage);
	}

	Pager.prototype.total = function(n) {
	  this._total = n;
	}

	Pager.prototype.select = function(n) {
	  this.current = n;
	  this.render();
	  return this;
	}

	/**
	 * Set perpage count to n
	 *
	 * @param {Number} n
	 * @api public
	 */
	Pager.prototype.perpage = function(n) {
	  this._perpage = n;
	}

	/**
	 * Select page n and emit `show` event with n
	 *
	 * @param {String} n
	 * @api public
	 */
	Pager.prototype.show = function(n) {
	  this.select(n);
	  this.emit('show', n);
	  return this;
	}

	Pager.prototype.limit = function (n) {
	  this._limit = n;
	}

	Pager.prototype.remove = function() {
	  this.off();
	  this.events.unbind();
	  if (this.el.parentNode) {
	    this.el.parentNode.removeChild(this.el);
	  }
	}

	Pager.prototype.render = function() {
	  var limit = this._limit;
	  var curr = this.current;
	  var pages = this.pages();
	  var el = this.el;
	  var prev = query('.prev', el);
	  var next = query('.next', el);
	  var links = '';

	  // remove old
	  var lis = el.children;
	  for (var i = 0, len = lis.length; i < len; i++) {
	    var li = lis[i];
	    if (classes(li).has('page')) {
	      el.removeChild(li);
	    }
	  }

	  // page links
	  for (i = 0; i < pages; ++i) {
	    var n = i + 1;
	    if (limit && n == limit) {
	      links += '<li class="page">...</li>';
	    } else if (limit && (n > limit && n !== pages - 1)) {
	      continue;
	    }
	    links += curr == i
	      ? '<li class="page active"><a href="#">' + n + '</a></li>'
	      : '<li class="page"><a href="#">' + n + '</a></li>';
	  }

	  // insert
	  if (links) el.insertBefore(domify(links), next);

	  // prev
	  if (curr) classes(prev).remove('exgrid-pager-hide')
	  else classes(prev).add('exgrid-pager-hide');

	  // next
	  if (curr < pages - 1) classes(next).remove('exgrid-pager-hide')
	  else classes(next).add('exgrid-pager-hide');
	}


	module.exports = Pager;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var events = __webpack_require__(17);
	var delegate = __webpack_require__(18);

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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var closest = __webpack_require__(19)
	  , event = __webpack_require__(17);

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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */

	var matches = __webpack_require__(20)

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var query = __webpack_require__(3);

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
/* 21 */
/***/ function(module, exports) {

	module.exports = "<ul class=\"exgrid-pager\">\n  <li class=\"prev\"><a href=\"#\">&lsaquo;</a></li>\n  <li class=\"next\"><a href=\"#\">&rsaquo;</a></li>\n</ul>\n";

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var index = __webpack_require__(14);

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


/***/ }
/******/ ]);