/**
 * pad a str with 0 if its single
 *
 * @param {string} str
 * @return {string}
 */
function pad (str) {
  str = str.toString()
  if (str.length === 1) return '0' + str
  return str
}

/**
 * Return 'YYYY-MM-DD' format from creating date with param `n` as construct
 * parameter
 *
 * @param {Number | String} n
 * @return {String}
 * @api public
 */
exports.ymd = function (n) {
  var d = new Date(n)
  return d.getFullYear() + '-' +
  pad(d.getMonth() + 1) + '-' +
  pad(d.getDate())
}

/**
 * return the integer format of `n`, ie:
 * 1000.01 => 1,000
 * return empty string if n can't be parse to number
 *
 * @param {Number | String} n
 * @return {String}
 * @api public
 */
exports.integer = function (n) {
  n = parseInt(n, 10)
  if (isNaN(n)) return ''
  n = n.toString()
  var arr = []
  var l = n.length
  for (var i = l - 1; i >= 0; i--) {
    arr.push(n[i])
    if ((i !== 0) && ((l - i) % 3 === 0)) {
      arr.push(',')
    }
  }
  return arr.reverse().join('')
}

/**
 * percentage
 *
 * @param {number} n
 * @return {number}
 * @api public
 */
exports.percentage = function (n) {
  n = parseFloat(n, 10)
  if (isNaN(n)) return ''
  return (n * 100).toFixed() + '%'
}
