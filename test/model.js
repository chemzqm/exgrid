/*global describe, it, beforeEach*/
var Model = require('../lib/model.js')
var assert = require('assert')

describe('model', function () {
  describe('create model class', function () {
    it('should create model class', function () {
      var User = Model(['name', 'age'])
      var u = new User({name: 'tobi', age: 30})
      assert(u.name === 'tobi')
      assert(u.age === 30)
    })

    it('should throw error when field name is invalid', function () {
      var o
      try {
        Model(['changed'])
      } catch (e) {
        o = e
      }
      assert(o instanceof Error)
    })
  })

  describe('#Event', function () {
    var user

    beforeEach(function () {
      var User = Model(['name', 'age'])
      user = new User({name: 'tobi', age: 30})
    })

    it('should emit change event when setting attribute', function () {
      var val
      var pre
      var field
      user.on('change', function (f, v, p) {
        field = f
        val = v
        pre = p
      })
      user.name = 'july'
      assert(field === 'name')
      assert(val === 'july')
      assert(pre === 'tobi')
    })

    it('should emit change field event when setting attribute', function () {
      var val
      var pre
      user.on('change name', function (v, p) {
        val = v
        pre = p
      })
      user.name = 'july'
      assert(val === 'july')
      assert(pre === 'tobi')
    })

    it('should emit stat event when changed', function () {
      var dirty
      user.on('stat', function (d) {
        dirty = d
      })
      user.name = 'kong'
      assert(dirty === true)
    })

    it('should emit stat event when changed back', function () {
      var dirty
      user.name = 'kong'
      user.on('stat', function (d) {
        dirty = d
      })
      user.name = 'tobi'
      assert(dirty === false)
    })
  })

  describe('#changed()', function () {
    var user

    beforeEach(function () {
      var User = Model(['name', 'age'])
      user = new User({name: 'tobi', age: 30})
    })

    it('should return changed properties when changed', function () {
      user.name = 'bear'
      var changed = user.changed()
      assert(Object.keys(changed).length === 1)
      assert(changed.name === 'bear')
    })

    it('should return false when not changed', function () {
      var changed = user.changed()
      assert(changed === false)
      user.name = 'bear'
      user.name = 'tobi'
      assert(changed === false)
    })
  })

  describe('#clean()', function () {
    var user

    beforeEach(function () {
      var User = Model(['name', 'age'])
      user = new User({name: 'tobi', age: 30})
    })

    it('should cleanup the properties on model', function () {
      assert(user.origAttrs.name === 'tobi')
      user.name = 'grrr'
      user.clean()
      assert(user.origAttrs.name === 'grrr')
    })

    it('should emit clean and stat event on clean', function () {
      var i = 0
      var stat
      user.on('clean', function () {
        i++
      })
      user.on('stat', function (s) {
        i++
        stat = s
      })
      user.clean()
      assert(i === 2)
      assert(stat === false)
    })
  })
})
