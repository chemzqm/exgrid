var Emitter = require('emitter')
var util = require('./util')
var buildinRe = util.buildinRe

/**
 * create a model reactive class based on the field names
 *
 * @param {array} fields
 * @return {function} Model class constructor
 * @api public
 */
function createModelClz (fields) {
  /**
   * Model class
   *
   * @param {Object} attrs
   */
  function Model (attrs) {
    this.origAttrs = attrs
    this.attrs = util.merge({}, attrs)
  }
  Model.prototype = {}
  Emitter(Model.prototype)

  fields.forEach(function (name) {
    if (buildinRe.test(name)) throw new Error(name + ' could not be used as field name')
    if (name === 'id' || name === '_id') Model.primaryKey = name

    Object.defineProperty(Model.prototype, name, {
      set: function (val) {
        var prev = this.attrs[name]
        var diff = util.diffObject(this.attrs, this.origAttrs)
        var changedNum = Object.keys(diff).length
        this.attrs[name] = val
        this.emit('change', name, val, prev)
        this.emit('change ' + name, val, prev)
        if (prev === val) return
        if (changedNum === 0) return this.emit('stat', true)
        if (changedNum === 1 && diff[name] === val) {
          // became clean
          this.emit('stat', false)
        }
      },
      get: function () {
        return this.attrs[name]
      }
    })
  })

  /**
  * Return `false` or an object
  * Optionally check for a specific `attr`.
  *
  * @param {String} [attr]
  * @return {Object|Boolean}
  * @api public
  */

  Model.prototype.changed = function (attr) {
    var changed = util.diffObject(this.origAttrs, this.attrs)
    if (typeof changed[attr] !== 'undefined') {
      return changed[attr]
    }
    if (Object.keys(changed).length === 0) return false
    return changed
  }

  /**
   * Should be called when the Object is saved
   *
   * @api public
   */
  Model.prototype.clean = function () {
    for (var k in this.attrs) {
      this.origAttrs[k] = this.attrs[k]
    }
    this.emit('clean')
    this.emit('stat', false)
  }

  return Model
}

module.exports = createModelClz
