'use strict'

var assert = require('assert')
var req = require('..')

assert.deepEqual(req({ cwd: __dirname + '/dir' }), [1, 2])

assert.deepEqual(req(['**/*.js', '!b.data.js'], { cwd: __dirname + '/dir'}), [1])

var result3 = req('**/*.data.js')
result3.sort()
assert.deepEqual(result3, [1, 2, 3])
