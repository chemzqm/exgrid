var unique = require('array-unique')
var domify = require('domify')

var buildinRe = exports.buildinRe = /^(\$stat|changed|emit|clean|on|off|attrs)$/
/**
 * parse bindings from function string
 *
 * @return {Array}
 * @param {String} fn
 * @api public
 */
var parseBindings = exports.parseBindings = function (fn) {
  var res = []
  var str = fn.toString()
  var arr
  var ms = str.match(/\(([A-Za-z0-9_$]+?)(?:[\s,)])/)
  var param = ms && ms.length ? ms[1] : null
  if (!param) return res
  var re = new RegExp(param.replace('$', '\\$') + '\\.(\\w+)', 'g')
  while ((arr = re.exec(str)) !== null) {
    res.push(arr[1])
  }
  res = res.filter(function (str) {
    return !buildinRe.test(str)
  })
  // console.log(res)
  return unique(res)
}

/**
 * Analyze the render functions for each child
 * return list of config
 * config.formatter: function for change innerHTML of <td>
 *
 * @param {String} el
 * @param {String} formatters
 * @param {String} renders
 * @api public
 */
exports.createRowConfig = function (el, formatters, renders) {
  var res = []
  var name
  toArray(el.children).forEach(function (el, i) {
    var o = {index: i, bindings: []}
    o.start = el.outerHTML.match(/^<.*?>/)[0]
    o.end = '</' + el.tagName.toLowerCase() + '>'
    if (el.hasAttribute('data-react')) {
      if (!el.hasAttribute('data-render')) throw new Error('render function required for stat change')
      var react = el.getAttribute('data-react').trim()
      // special attribute
      if (react === '$stat') {
        o.stat = true
      } else {
        o.bindings = react.split(/,\s*/)
      }
    }
    if (el.hasAttribute('data-render')) {
      if (el.hasAttribute('data-lazy')) o.lazy = true
      name = el.getAttribute('data-render').trim()
      var render = renders[name]
      if (!render) throw new Error("render '" + name + "' not found")
      if (!o.bindings.length) o.bindings = parseBindings(render)
      o.render = render
    } else {
      parseFormatter(el, o, formatters)
    }
    res.push(o)
  })
  return res
}

/**
 * Parse formatter for td element and set it to config
 *
 * @param {Element} td element
 * @param {Object} config config for td
 * @param {Object} formatters format functions
 * @api public
 */
function parseFormatter (el, config, formatters) {
  var html = el.innerHTML
  var arr = html.split(/[{}]/)
  // no binding attribute
  if (arr.length === 1) {
    config.html = html
    return
  }
  var prefix = arr[0]
  var field = arr[1]
  var suffix = arr[2]
  config.bindings.push(field)
  if (el.hasAttribute('data-format')) {
    var name = el.getAttribute('data-format')
    var formatter = formatters[name]
    if (!formatter) throw new Error('formatter ' + name + ' not found')
    config.formatter = function (model) {
      var v = model[field]
      if (v == null) return ''
      return prefix + formatter(v) + suffix
    }
  } else {
    config.formatter = function (model) {
      var v = model[field]
      if (v == null) return ''
      return prefix + v + suffix
    }
  }
}

/**
 * create row rendering function
 *
 * @param {String} rowConfig
 * @api public
 */
exports.createRenderFn = function (rowConfig) {
  var renders = rowConfig.filter(function (o) {
    return o.render
  })
  return function (parentNode, model) {
    var html = ''
    rowConfig.forEach(function (config) {
      html += config.start
      if (config.html) {
        html += config.html
      } else if (config.formatter) {
        html += config.formatter(model)
      }
      html += config.end
    })
    var fragment = domify(html)
    parentNode.appendChild(fragment)
    renders.forEach(function (o) {
      var el = parentNode.children[o.index]
      // TODO check lazy renders
      o.render(model, el)
    })
  }
}

/**
 * merge i to o, return o
 *
 * @param {Object} o
 * @param {Object} i
 * @return {Object}
 * @api public
 */
exports.merge = function (o, i) {
  for (var k in i) {
    o[k] = i[k]
  }
  return o
}

/**
 * Simple diff without nested check
 * Return the change props from b
 *
 * @param {Object} a
 * @param {Object} b
 * @api public
 */
exports.diffObject = function (a, b) {
  var res = {}
  for (var k in a) {
    if (a[k] !== b[k]) {
      res[k] = b[k]
    }
  }
  return res
}

/**
 * check if two array interact
 *
 * @param {Array} a
 * @param {Array} b
 * @return {Boolean}
 * @api public
 */
exports.interact = function (a, b) {
  return a.some(function (v) {
    return ~b.indexOf(v)
  })
}

/**
 * Change array like object to array (better performance)
 *
 * @param {ArrayLike} arr
 * @api public
 */
var toArray = exports.toArray = function (arr) {
  var res = new Array(arr.length)
  for (var i = 0, len = arr.length; i < len; i++) {
    res[i] = arr[i]
  }
  return res
}
