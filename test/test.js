'use strict'

var t = require('tap')
var req = require('..')

t.ok(
  setEqual(req({ cwd: __dirname + '/fixture1/dir' }), [2, 1]),
  'basic functionality'
)

t.ok(
  setEqual(req({ cwd: './test/fixture1/dir' }), [2, 1]),
  'relative require'
)

t.same(
  req(['**/*.js', '!b.data.js'], { cwd: __dirname + '/fixture1/dir'}),
  [1],
  'globs'
)

t.same(req({ cwd: __dirname + '/fixture_nonexistent' }), [], 'modules missing')

t.test('glob without cwd', function(t) {
  var result3 = req('test/fixture1/**/*.data.js')
  t.ok(setEqual(result3, [3, 2, 1]))
  t.end()
})

t.test("return path", function(t) {
  var result = req({ cwd: __dirname + '/fixture1/dir', returnPath: true })
  t.ok(setEqual(result, [['b.data.js', 2], ['a.data.js', 1]], orderEqual))
  t.end()
})

t.test("return nested paths", function(t) {
  var result = req({ cwd: __dirname + '/fixture1', returnPath: true })
  t.ok(setEqual(
    result,
    [['dir/a.data.js', 1], ['c.data.js', 3], ['dir/b.data.js', 2]],
    orderEqual
  ))
  t.end()
})

t.test("async", function(t) {
  req.async({ cwd: __dirname + '/fixture1/dir'}).then(function(result) {
    t.ok(setEqual(result, [2, 1]))
    t.end()
  })
})

t.throws(function() {
  req({ cwd: __dirname + '/fixture2'})
}, req.RequireError, "require error")

function setEqual(array1, array2, comparer) {
  comparer = comparer || defaultComparer
  return array1.every(function(a) {
    return array2.some(function(b) {
      return comparer(a, b)
    })
  })
}

function orderEqual(array1, array2) {
  if (array1.length !== array2.length) { return false }
  for (var i = 0, len = array1.length; i < len; i++) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }
  return true
}

function defaultComparer(a, b) {
  return a === b
}
