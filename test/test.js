/*global describe, it, beforeEach, afterEach*/
var USERS = require('./data.json')
var template = require('./template.html')
var Grid = require('..')
var expect = require('expect')
var domify = require('domify')

var grid
var parentNode = document.createElement('div')
document.body.appendChild(parentNode)

afterEach(function () {
  if (grid) grid.remove()
})

describe('Grid()', function() {
  it('should init with new', function () {
    grid = new Grid(template)
    expect(grid.el).toExist()
  })

  it('should init without new', function () {
    grid = Grid(template)
    expect(grid.el).toExist()
  })

  it('should init with element template', function () {
    grid = Grid(domify(template))
    expect(grid.el).toExist()
  })

  it('should init with options', function () {
    grid = new Grid(template, {perpage: 10})
    expect(grid.params.perpage).toBe(10)
  })
})



describe('.bind(type, selector, handler)', function() {
  it('should bind event', function () {
    grid = new Grid(template)
    parentNode.appendChild(grid.el)
    grid.setData(USERS)
    var fired
    var tr = grid.el.querySelector('tbody > tr:first-child')
    grid.bind('click', '.remove', function (e, model) {
      fired = true
      expect(e.delegateTarget.tagName.toLowerCase()).toBe('button')
      expect(model).toExist()
    })
    tr.querySelector('.remove').click()
    expect(fired).toBe(true)
  })

  it('should pass extra arguments', function () {
    grid = new Grid(template)
    parentNode.appendChild(grid.el)
    grid.setData(USERS)
    var fired
    var tr = grid.el.querySelector('tbody > tr:first-child')
    grid.bind('click', '.remove', function (e, model, order) {
      fired = true
      expect(order).toBe('asc')
    }, 'asc')
    tr.querySelector('.remove').click()
    expect(fired).toBe(true)
  })
})

describe('.sort(field, dir, method)', function() {
  it('should sort on local mode', function () {
    grid = new Grid(template, {perpage: 10})
    parentNode.appendChild(grid.el)
    grid.local()
    grid.setData(USERS)
    grid.sort('age', 1)
    var data = grid.data
    data.reduce(function (pre, cur) {
      expect(cur.age <= pre.age).toBe(true)
      return cur
    }, {age: Infinity})
  })

  it('should emit on remote mode', function () {
    grid = new Grid(template, {perpage: 10})
    parentNode.appendChild(grid.el)
    grid.setData(USERS)
    var fired
    grid.on('sort', function (params) {
      expect(params.sortField).toBe('age')
      expect(params.sortDirection).toBe(1)
      fired = true
    })
    grid.sort('age', 1)
    expect(fired).toBe(true)
  })
})

describe('sort on header click', function () {
  it('should sort on herder click', function () {
    grid = new Grid(template, {perpage: 10})
    parentNode.appendChild(grid.el)
    grid.local()
    grid.setData(USERS)
    var td = grid.el.querySelector('thead th.sort')
    td.click()
    expect(td.className).toMatch(/desc/)
    var field = td.getAttribute('data-sort')
    var trs = [].slice.call(grid.el.querySelectorAll('tbody > tr'))
    trs.reduce(function (pre, cur) {
      var val = grid.findModel(cur)[field]
      if (pre) {
        expect(pre > val).toBe(true)
      }
      return val
    }, null)
  })

  it('should sort asc on another click', function () {
    grid = new Grid(template, {perpage: 10})
    parentNode.appendChild(grid.el)
    grid.local()
    grid.setData(USERS)
    var td = grid.el.querySelector('thead th.sort')
    td.click()
    td.click()
    expect(td.className).toMatch(/asc/)
    var field = td.getAttribute('data-sort')
    var trs = [].slice.call(grid.el.querySelectorAll('tbody > tr'))
    trs.reduce(function (pre, cur) {
      var val = grid.findModel(cur)[field]
      if (pre) {
        expect(pre < val).toBe(true)
      }
      return val
    }, null)
  })

  it('should throw if field not in model', function () {
    grid = new Grid(template, {perpage: 10})
    parentNode.appendChild(grid.el)
    grid.local()
    grid.setData(USERS)
    var td = grid.el.querySelector('thead th.error')
    var e = new UIEvent('click', {
        bubbles: true,
        cancelable: false,
        detail: 1
    })
    e.delegateTarget = td
    expect(function(){
      grid.headerClick(e)
    }).toThrow(/model/)
  })
})

describe('.filter(field, val)', function() {

  it('should filter data on local mode', function () {
    grid = new Grid(template, {perpage: 10})
    parentNode.appendChild(grid.el)
    grid.local()
    grid.setData(USERS)
    expect(USERS.length).toBe(grid.data.length)
    grid.filter('name', 'a')
    expect(USERS.length).toNotBe(grid.filtered.length)
    grid.filtered.forEach(function (m) {
      expect(m.name).toMatch(/a/i)
    })
  })

  it('should emit filter event on remove mode', function () {
    grid = new Grid(template, {perpage: 10})
    parentNode.appendChild(grid.el)
    grid.setData(USERS)
    var fired
    grid.on('filter', function (params) {
      fired = true
      expect(params.filterField).toBe('name')
      expect(params.filterValue).toBe('a')
    })
    grid.filter('name', 'a')
    expect(grid.filtered).toBeA('undefined')
    expect(fired).toBe(true)
  })

  it('should set field and value empty when emit with empty filter', function () {
    grid = new Grid(template, {perpage: 10})
    parentNode.appendChild(grid.el)
    grid.setData(USERS)
    var fired
    grid.on('filter', function (params) {
      fired = true
      expect(params.filterField).toNotExist()
      expect(params.filterValue).toNotExist()
    })
    grid.filter('name', '')
    expect(fired).toBe(true)
  })

})

describe('.select(n)', function() {

  it('should throw if not perpage defined', function () {
    grid = new Grid(template)
    parentNode.appendChild(grid.el)
    grid.setData(USERS)
    expect(function(){
      grid.select(2)
    }).toThrow(/expect/)
  })

  it('should select page on local mode', function () {
    grid = new Grid(template, { perpage: 10})
    parentNode.appendChild(grid.el)
    grid.local()
    grid.setData(USERS)
    grid.select(1)
    var ids = grid.reactives.map(function (r) {
      return r.model._id
    })
    expect(ids).toEqual(USERS.slice(10, 20).map(function (m) {
      return m._id
    }))
  })

  it('should emit on remote mode', function () {
    grid = new Grid(template, {
      perpage: 20
    })
    parentNode.appendChild(grid.el)
    grid.setData(USERS)
    var fired
    grid.on('page', function (params) {
      fired = true
      expect(params.perpage).toBe(20)
      expect(params.curpage).toBe(2)
    })
    grid.select(2)
    expect(fired).toBe(true)
  })

})

describe('.setTotal', function() {

  it('should set total', function () {
    grid = new Grid(template)
    parentNode.appendChild(grid.el)
    grid.setData(USERS)
    grid.setTotal(100)
    expect(grid.total).toBe(100)
  })

  it('should throw on local mode', function () {
    grid = new Grid(template)
    parentNode.appendChild(grid.el)
    grid.local()
    grid.setData(USERS)
    expect(function(){
      grid.setTotal(100)
    }).toThrow(Error)
  })

})

describe('.remove()', function() {

  it('should ok with called more than once', function () {
    grid = new Grid(template)
    parentNode.appendChild(grid.el)
    grid.local()
    grid.setData(USERS)
    grid.remove()
    grid.remove()
    grid.remove()
    expect(grid._removed).toBe(true)
  })

  it('should emit remove event', function () {
    grid = new Grid(template)
    parentNode.appendChild(grid.el)
    grid.local()
    grid.setData(USERS)
    var fired
    grid.on('remove', function () {
      fired = true
    })
    grid.remove()
    expect(fired).toBe(true)
  })

  it('should unbind events', function () {
    grid = new Grid(template, {perpage: 10})
    parentNode.appendChild(grid.el)
    grid.setData(USERS)
    var fired
    grid.on('sort', function () {
      fired = true
    })
    grid.remove()
    grid.sort('age', 1)
    expect(fired).toNotExist()
  })

  it('should unbind user defined events', function () {
    grid = new Grid(template, {perpage: 10})
    parentNode.appendChild(grid.el)
    grid.setData(USERS)
    var fired
    var tr = grid.el.querySelector('tbody > tr:first-child')
    grid.bind('click', '.remove', function () {
      fired = true
    })
    grid.remove()
    tr.querySelector('.remove').click()
    expect(fired).toNotExist()
  })

})

