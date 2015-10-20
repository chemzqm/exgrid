var Overlay = require('overlay')
var Notice = require('notice')
var spin = require('spin')
var query = require('query')
var Grid = require('../..')
var template = require('../template/bind.html')
var data = require('../data.json')
var toObject = require('form-to-object')

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
