var Overlay = require('overlay')
var Notice = require('notice')
var spin = require('spin')
var Grid = require('../..')
var template = require('../template/bind.html')
var data = require('../data.json')
var Reactive = require('reactive')
var Changed = require('form-changed')
var Pager = require('pager')

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
