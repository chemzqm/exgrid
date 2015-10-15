var Emitter = require('emitter')
var events = require('events')
var domify = require('domify')
var query = require('query')
var classes = require('classes')
var util = require('./util')
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
