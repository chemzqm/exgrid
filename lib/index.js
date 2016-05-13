var inherits = require('inherits')
var events = require('events')
var Emitter = require('emitter')
var ListRender = require('list-render')
var domify = require('domify')
var classes = require('classes')

/**
 * Grid constructor
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
  if (!option.limit) option.limit = option.perpage
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
  if (!this.model) return
  e.preventDefault()
  var field = th.getAttribute('data-sort')
  var fields = Object.keys(this.model.options)
  if (fields.indexOf(field) === -1) throw new Error('Field [' + field + '] not in model')
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
  if (this.el.parentNode) this.el.parentNode.removeChild(this.el)
  this.emit('remove')
  this.events.unbind()
  this.off()
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
