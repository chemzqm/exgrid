var util = require('./util')
var Emitter = require('emitter')
var classes = require('classes')
var interact = require('./util').interact

/**
 * Row class
 *
 * @param {object} config row config
 */
function Row (config) {
  var el = this.el = config.root.cloneNode(false)
  this.id = config.id
  el.setAttribute('data-id', config.id)
  var fn = config.renderFn
  var model = this.model = config.model
  var rowConfig = this.rowConfig = config.rowConfig
  fn(el, model)
  this.bind(el, rowConfig, model)
  model.on('change', this.onModelChange.bind(this))
  model.on('clean', this.onModelChange.bind(this))
}

Emitter(Row.prototype)

/**
 * bind model react
 * @api private
 */
Row.prototype.bind = function (tr, rowConfig, model) {
  rowConfig.forEach(function (config, i) {
    var el = tr.children[i]
    var bindings = config.bindings
    if (bindings.length) {
      bindings.forEach(function (field) {
        model.on('change ' + field, function () {
          if (config.render) {
            config.render(model, el, true)
          } else if (config.formatter) {
            el.innerHTML = config.formatter(model)
          }
        })
      })
    } else if (config.stat) {
      model.on('stat', function () {
        config.render(model, el)
      })
    }
  })
}

/**
 * onModelChange
 *
 * @api private
 */
Row.prototype.onModelChange = function () {
  var config = this.rowConfig
  var children = this.el.children
  var changed = this.model.changed()
  var keys = changed ? Object.keys(changed) : []
  util.toArray(children).forEach(function (node, i) {
    if (!changed) return classes(node).remove('dirty')
    var bindings = config[i].bindings
    if (interact(bindings, keys)) {
      classes(node).add('dirty')
    } else {
      classes(node).remove('dirty')
    }
  })
}

/**
 * destroy row
 *
 * @param {boolean} emit
 * @api public
 */
Row.prototype.remove = function (emit) {
  this.model.off()
  this.el.parentNode.removeChild(this.el)
  if (emit) this.emit('destroy')
  this.off()
}

module.exports = Row
