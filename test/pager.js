/*global describe, it, beforeEach, afterEach*/
var Pager = require('../lib/pager.js')
var query = require('query')
var assert = require('assert')
var classes = require('classes')

describe('Pager', function () {
  var pager
  beforeEach(function () {
    pager = new Pager()
    pager.perpage(5)
    document.body.appendChild(pager.el)
  })

  afterEach(function () {
    pager.remove()
  })

  function getLinks () {
    return pager.el.querySelectorAll('li.page')
  }

  it('should set pages according to total count and perpage', function () {
    pager.total(5)
    assert(pager.pages() === 1)
    pager.total(8)
    assert(pager.pages() === 2)
  })

  it('should reset pager elements on select', function () {
    pager.total(5)
    pager.select(0)
    assert(getLinks().length === 1)
    pager.total(8)
    pager.select(0)
    assert(getLinks().length === 2)
  })

  it('should active the selected link', function () {
    pager.total(15)
    pager.select(2)
    var links = getLinks()
    assert(links.length === 3)
    assert(classes(links[2]).has('active'))
  })

  it('should hide prev/next link when not available', function () {
    var prev = query('.prev', pager.el)
    var next = query('.next', pager.el)
    pager.total(10)
    pager.select(0)
    assert(classes(prev).has('exgrid-pager-hide'))
    assert(classes(next).has('exgrid-pager-hide') === false)
    pager.select(1)
    assert(classes(prev).has('exgrid-pager-hide') === false)
    assert(classes(next).has('exgrid-pager-hide'))
  })

  it('should activate previous page on prev() when available', function () {
    pager.total(10)
    pager.select(1)
    pager.prev()
    var links = getLinks()
    assert(classes(links[0]).has('active'))
  })

  it('should activate next page on next() when available', function () {
    pager.total(10)
    pager.select(0)
    pager.next()
    var links = getLinks()
    assert(classes(links[1]).has('active'))
  })

  it('should activate the link and emit show event on show()', function () {
    var showed
    pager.on('show', function () {
      showed = true
    })
    pager.total(10)
    pager.show(1)
    assert(showed === true)
    var links = getLinks()
    assert(classes(links[1]).has('active'))
  })

  it('should remove el on remove()', function () {
    pager.total(10)
    pager.remove()
    assert(pager.el.parentNode == null)
  })

  it('should remove event listeners on remove()', function () {
    var showed
    pager.total(10)
    pager.on('show', function () {
      showed = true
    })
    pager.remove()
    pager.emit('show')
    assert(showed !== true)
  })
})
