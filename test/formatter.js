/*global describe, it*/
var formatter = require('../lib/formatter.js')
var assert = require('assert')

describe('formatter', function () {
  describe('#ymd', function () {
    it('should return YYYY-MM-DD format date', function () {
      var date = new Date()
      var str = formatter.ymd(date.getTime())
      assert(/^\d{4}-\d{2}-\d{2}$/.test(str))
    })

    it('should return YYYY-MM-DD format date with padding', function () {
      var date = new Date('2013-01-01')
      var str = formatter.ymd(date.toISOString())
      assert(str === '2013-01-01')
    })
  })

  describe('#integer', function () {
    it('should return empty string from invalid integer', function () {
      var s = 'abc'
      var res = formatter.integer(s)
      assert(res === '')
    })

    it('should not change the number if it\'s below 1000', function () {
      var s = '998'
      var res = formatter.integer(s)
      assert(res === '998')
    })

    it('should add comma if it\'s above 1000', function () {
      var s = '1998'
      var res = formatter.integer(s)
      assert(res === '1,998')
      assert(formatter.integer('12341234') === '12,341,234')
    })
  })

  describe('#percentage', function () {
    it('should return empty string for invalid number', function () {
      assert(formatter.percentage('abc') === '')
    })

    it('should convert number to percentage format', function () {
      assert(formatter.percentage('0.223') === '22%')
      assert(formatter.percentage(0.22) === '22%')
    })
  })
})

