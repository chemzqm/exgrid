/*global describe, it, beforeEach, afterEach*/
var Grid = require('..')
var query = require('query')
var assert = require('assert')
var data = require('./data.json')
var template = require('./template.html')
var domify = require('domify')
var parentNode = domify('<div id="placeholder"></div>')
document.body.appendChild(parentNode)
var config = {
  perpage: 10,
  formatters: {
    formatMoney: function (money) {
      return '$' + money
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
}

describe('Grid', function () {
  describe('Render', function () {
    var row
    var grid
    beforeEach(function () {
      grid = new Grid(template, config)
      parentNode.appendChild(grid.el)
      grid.setData(data)
      row = query('tbody > tr:first-child', grid.el)
    })
    afterEach(function () {
      grid.remove()
    })

    it('should render normal props', function () {
      var id = row.getAttribute('data-id')
      var name = row.children[0].textContent
      var age = row.children[1].textContent
      assert(id === data[0]._id)
      assert(name === data[0].name)
      assert(age === data[0].age.toString())
    })

    it('should render default formater property', function () {
      var score = row.children[2].textContent.replace(/,/g, '')
      assert(score === data[0].score.toString())
    })

    it('should render user defined formater property', function () {
      var money = row.children[4].textContent
      assert(money === '$' + data[0].money.toString())
    })

    it('should render with user defined render function', function () {
      var percentage = row.children[3].textContent
      var el = {}
      config.renders.percentage(data[0], el)
      var content = el.textContent
      assert(percentage === content)
    })

    it('should render empty string with null values', function () {
      var obj = {}
      var o = data[0]
      var keys = Object.keys(o)
      keys.forEach(function (k) {
        obj[k] = o[k]
      })
      obj.name = null
      delete obj.age
      var arr = [obj]
      grid.setData(arr)
      row = query('tbody > tr:first-child', grid.el)
      assert(row.children[0].textContent === '')
      assert(row.children[1].textContent === '')
    })

    it('should refresh the page when setData', function () {
      var newData = data.slice(10, 15)
      var id = newData[0]._id
      grid.setData(newData)
      row = query('tbody > tr:first-child', grid.el)
      var row_id = row.getAttribute('data-id')
      var rows = query.all('tbody > tr', grid.el)
      assert(id === row_id)
      assert(grid.rows.length === 5)
      assert(rows.length === 5)
    })
  })

  describe('Config error', function () {
    it('should throw error when formatter function not found', function () {
      var formatMoney = config.formatters.formatMoney
      config.formatters.formatMoney = null
      var err
      try {
        Grid(template, config)
      } catch (e) {
        err = e
      }
      assert(err instanceof Error)
      config.formatters.formatMoney = formatMoney
    })

    it('should throw error when render function not found', function () {
      var percentage = config.renders.percentage
      config.renders.percentage = null
      var err
      try {
        Grid(template, config)
      } catch (e) {
        err = e
      }
      assert(err instanceof Error)
      config.renders.percentage = percentage
    })
  })

  describe('React', function () {
    var row
    var grid
    var model
    beforeEach(function () {
      grid = new Grid(template, config)
      parentNode.appendChild(grid.el)
      grid.setData(data)
      row = query('tbody > tr:first-child', grid.el)
      model = grid.rows[0].model
    })
    afterEach(function () {
      grid.remove()
    })

    it('should react model change on normal property', function () {
      model.name = 'jack'
      model.age = 30
      var name = row.children[0].textContent
      var age = row.children[1].textContent
      assert(name === 'jack')
      assert(age === '30')
    })

    it('should react model change on format property', function () {
      model.score = 3000
      var score = row.children[2].textContent
      assert(score === '3,000')
    })

    it('should react model change on render property', function () {
      var percentage = row.children[3].textContent
      model.percent = 0.11
      var p = row.children[3].textContent
      assert(percentage !== p)
      assert(p === '11%')
    })

    it('should react model stat change when data-react="$stat" is set', function () {
      var saveBtn = query('.save', row)
      assert(saveBtn.disabled === true)
      model.name = 'tobi'
      var btn = query('.save', row)
      assert(btn.disabled === false)
    })

    it('should react dirty class according to stat change', function () {
      var orig_name = model.name
      model.name = 'tobi'
      assert(row.firstChild.className === 'dirty')
      model.name = orig_name
      assert(row.firstChild.className !== 'dirty')
    })
  })

  describe('Local mode', function () {
    var row
    var grid
    beforeEach(function () {
      grid = new Grid(template, config)
      parentNode.appendChild(grid.el)
      grid.setData(data)
      row = query('tbody > tr:first-child', grid.el)
    })
    afterEach(function () {
      grid.remove()
    })

    it('should paging data when page change', function () {
      var old_id = row.getAttribute('data-id')
      var id = data[10]._id
      grid.setPage(1)
      var new_id = query('tbody > tr:first-child', grid.el).getAttribute('data-id')
      assert(old_id !== new_id)
      assert(new_id === id)
    })

    it('should sort data with string sort', function () {
      grid.sort('name', -1, 'string')
      row = query('tbody > tr:first-child', grid.el)
      var name = row.children[0].textContent
      assert(/^a/i.test(name))
    })

    it('should sort data with number sort', function () {
      var old_id = row.getAttribute('data-id')
      grid.sort('age', -1, 'number')
      var min_age = Infinity
      data.forEach(function (o) {
        if (o.age < min_age) min_age = o.age
      })
      row = query('tbody > tr:first-child', grid.el)
      assert(old_id !== row.getAttribute('data-id'))
      var age = row.children[1].textContent
      assert(age === min_age.toString())
    })

    it('should filter data with given string', function () {
      grid.filter('name', 'ar')
      var tds = query.all('tbody > tr td:first-child', grid.el)
      var name
      for (var i = 0, len = tds.length; i < len; i++) {
        name = tds[i].textContent
        assert(/ar/i.test(name))
      }
    })

    it('should filter data with given function', function () {
      grid.filter('name', function (obj) {
        return /be/i.test(obj.name)
      })
      var tds = query.all('tbody > tr td:first-child', grid.el)
      var name
      assert(tds.length !== 0)
      for (var i = 0, len = tds.length; i < len; i++) {
        name = tds[i].textContent
        assert(/be/i.test(name))
      }
    })
  })

  describe('Remote mode', function () {
    var grid
    var new_config = {remote: true}
    for (var k in config) {
      new_config[k] = config[k]
    }

    beforeEach(function () {
      grid = new Grid(template, new_config)
      parentNode.appendChild(grid.el)
    })

    afterEach(function () {
      grid.remove()
    })

    it('should emit construct event on next tick', function (done) {
      grid.on('construct', function (params) {
        assert(params.perpage === 10)
        assert(params.page === 0)
        done()
      })
    })

    it('should emit page event on remote paging', function (done) {
      grid.on('page', function (params) {
        assert(params.page === 2)
        done()
      })
      grid.setPage(2)
    })

    it('should emit sort event on remote sorting', function (done) {
      grid.setPage(2)
      grid.on('sort', function (params) {
        assert(params.page === 2)
        assert(params.sortField === 'name')
        assert(params.sortDirection === -1)
        done()
      })
      grid.sort('name', -1, 'string')
    })

    it('should emit filter event on remote filtering', function (done) {
      grid.on('filter', function (params) {
        assert(params.page === 0)
        assert(params.filterField === 'name')
        assert(params.sortField == null)
        assert(params.sortDirection == null)
        done()
      })
      grid.setPage(2)
      grid.filter('name', 'ar')
    })
  })

  describe('Click event', function () {
    var grid
    beforeEach(function () {
      grid = new Grid(template, config)
      grid.setData(data)
      parentNode.appendChild(grid.el)
    })

    afterEach(function () {
      grid.remove()
    })

    it('should emit click event with the clicked row', function (done) {
      grid.on('click', function (e, row) {
        var id = row.model._id
        assert(id === data[0]._id)
        assert(row.el.getAttribute('data-id') === data[0]._id)
        done()
      })
      var row = query('tbody > tr:first-child', grid.el)
      row.click()
    })

    it('should sort the data when data-sort header click', function () {
      var triggered
      grid.on('click', function (e, row) {
        triggered = true
      })
      var th = query('thead > tr th:nth-child(2)', grid.el)
      th.click()
      var row = query('tbody > tr:first-child', grid.el)
      var max_age = 0
      data.forEach(function (o) {
        if (o.age > max_age) max_age = o.age
      })
      assert(!triggered)
      assert(max_age.toString() === row.children[1].textContent)
    })
  })

  describe('Action', function () {
    var grid
    beforeEach(function () {
      grid = new Grid(template, config)
      grid.setData(data)
      parentNode.appendChild(grid.el)
    })

    afterEach(function () {
      grid.remove()
    })

    it('should append data as a row when append()', function () {
      var data = {
        '_id': '562023419743ca3f0e19730a',
        'index': 0,
        'guid': '3f76d8ef-e3b2-434c-bb10-e29683f44d89',
        'isActive': false,
        'balance': '$3,166.34',
        'picture': 'http://placehold.it/32x32',
        'age': 35,
        'eyeColor': 'brown',
        'name': 'Acosta England',
        'gender': 'male',
        'company': 'ASSISTIX',
        'email': 'acostaengland@assistix.com',
        'phone': '+1 (810) 477-3456',
        'address': '652 Just Court, Finzel, Virgin Islands, 1504',
        'score': 4723,
        'money': 7035.64,
        'percent': 0.1769
      }
      grid.prepend(data)
      var model = grid.rows[0].model
      assert(model._id === data._id)
      var row = query('tbody > tr:first-child', grid.el)
      var id = row.getAttribute('data-id')
      assert(model._id === id)
    })

    it('should trigger refresh event when refresh()', function (done) {
      grid.on('refresh', function (params) {
        assert(params.refresh === true)
        done()
      })
      grid.refresh()
    })

    it('should remove node and remove listeners when remove()', function () {
      var called
      grid.on('page', function () {
        called = true
      })
      grid.remove()
      grid.emit('page')
      assert(grid.rows == null)
      assert(grid.el.parentNode == null)
      assert(called !== true)
    })
  })
})
