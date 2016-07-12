'use strict'

var t = require('tap')
var req = require('..')

t.same(req({ cwd: __dirname + '/fixture1/dir' }), [1, 2], 'basic functionality')

t.same(
  req(['**/*.js', '!b.data.js'], { cwd: __dirname + '/fixture1/dir'}),
  [1],
  'globs'
)

t.same(req({ cwd: __dirname + '/fixture_nonexistent' }), [], 'modules missing')

t.test('glob without cwd', function(t) {
  var result3 = req('test/fixture1/**/*.data.js')
  result3.sort()
  t.same(result3, [1, 2, 3])
  t.end()
})

t.deepEqual(
  req({ cwd: __dirname + '/fixture1/dir', returnPath: true }),
  [['a.data.js', 1], ['b.data.js', 2]],
  "return path"
)

t.test('async', function(t) {
  req.async({ cwd: __dirname + '/fixture1/dir'}).then(function(result) {
    t.same(result, [1, 2])
    t.end()
  })
})
