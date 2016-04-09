require('overlay-component/overlay.css')
require('component-notice/notice.css')
require('component-pager/pager.css')
var tabify = require('./tabify.js')
var Overlay = require('overlay')
var spin = require('spin')
var Notice = require('notice')
var template = require('../template/local.html')
var data = require('../data.json')
var Grid = require('../..')
var Pager = require('pager')
var classes = require('classes')
require('./bind.js')

var el = document.getElementById('tabs')
tabify(el)

var placeholder = document.getElementById('tab1')
placeholder.className = 'shows-table'
var grid = new Grid(template, {
  perpage: 10,
  filters: {
    percentage: function (val) {
      return (val*100).toFixed() + '%'
    }
  },
  bindings: {
    react: function (prop) {
      this.bind('$stat', function (model, el) {
        var changed = model.changed()
        if (prop === '$stat') {
          el.disabled = changed === false ? true : false
        } else {
          if (changed && changed.hasOwnProperty(prop)) {
            classes(el).add('dirty')
          } else {
            classes(el).remove('dirty')
          }
        }
      })
    }
  },
  delegate: {
    toggleActive: function (e, model, el) {
      model.isActive = el.checked
    }
  }
})
grid.local()

grid.bind('click', 'button.save',function (e, model) {
  if (e.delegateTarget.disabled) return
  var changed = model.changed()
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
      // mark model as clean
      model.clean()
    }, 500)
  }
})

grid.bind('click', 'td.money',function (e, model) {
  var el = e.target
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
})

var overlay = Overlay(grid.el)
placeholder.appendChild(grid.el)
var pager = Pager(grid)
placeholder.appendChild(pager.el)
grid.setData(data)

