require('../grid.css')
require('./test.css')
require('overlay-component/overlay.css')
require('component-notice/notice.css')
var classes = require('classes')
var Overlay = require('overlay')
var spin = require('spin')
var Notice = require('notice')
var template = require('./template.html')
var Grid = require('..')
var data = require('./data.json')
var placeholder = document.createElement('div')
document.body.appendChild(placeholder)
placeholder.id = 'placeholder'
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

placeholder.appendChild(grid.el)
var overlay = Overlay(grid.el)
grid.setData(data)

var filterEl = document.createElement('input')
filterEl.type = 'text'
placeholder.insertBefore(filterEl, placeholder.firstChild)
filterEl.addEventListener('keyup', function (e) {
  var v = filterEl.value
  grid.filter('name', v)
})
