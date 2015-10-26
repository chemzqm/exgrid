var query = require('query')
var classes = require('classes')
var domify = require('domify')
var events = require('events')
var uid = require('uid')
var traverse = require('traverse')
var formatter = require('./formatter')
var util = require('./util')
var Emitter = require('emitter')
var Model = require('./model')
var Row = require('./row')
var nextTick = require('next-tick')
var indexof = require('indexof')
var DefaultPager = require('./pager')

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
    row.remove(true)
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
    row.remove(true)
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
