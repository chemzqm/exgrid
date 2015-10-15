/*global describe, it*/
var util = require('../lib/util.js')
var assert = require('assert')

describe('util', function () {
  describe('#parseBindings', function () {
    it('should extract binding from function', function () {
      var fn = function (model, a, b) {
        return model.name + model._date
      }
      var res = util.parseBindings(fn)
      assert(res.length === 2)
      assert(res[0] === 'name')
      assert(res[1] === '_date')
    })

    it('should not extract binding from function without parameter', function () {
      var fn = function () { }
      var res = util.parseBindings(fn)
      assert(res.length === 0)
    })
  })

  describe('#merge', function () {
    it('should merge to object', function () {
      var res = util.merge({}, {a: 1, b: 2})
      assert(res.a === 1)
      assert(res.b === 2)
    })

    it('should return the first parameter', function () {
      var o = {}
      var res = util.merge(o, {a: 1, b: 2})
      assert(res === o)
      assert(o.a === 1)
      assert(o.b === 2)
    })
  })

  describe('#diffObject', function () {
    it('should return the diff object', function () {
      var res = util.diffObject({a: 1, b: 2, c: 3}, {a: 1, b: 1})
      assert(res.b === 1)
      assert(res.c == null)
    })
  })

  describe('#interact', function () {
    it('should interact', function () {
      assert(util.interact(['a', 'b'], ['a']))
      assert(util.interact(['a'], ['a', 'b']))
    })

    it('should not interact', function () {
      assert(util.interact(['a', 'b'], []) === false)
      assert(util.interact([], ['a', 'b']) === false)
      assert(util.interact(['a', 'b'], ['c', 'd']) === false)
      assert(util.interact(['1', '2'], [1, 2]) === false)
    })
  })

  describe('#toArray', function () {
    it('should make array on arguments', function () {
      var fn = function (a, b, c) {
        return util.toArray(arguments)
      }
      var res = fn(1, 2, 3)
      assert(res[0] === 1)
      assert(res[1] === 2)
      assert(res[2] === 3)
    })
  })
})
