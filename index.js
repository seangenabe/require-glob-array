'use strict'

var globby = require('globby')
var Path = require('path')

module.exports = function requireGlobArray(patterns, opts) {
  if (typeof patterns === 'object' && !Array.isArray(patterns) &&
    opts === undefined) {

    opts = patterns
    patterns = null
  }
  opts = opts || {}
  if (!patterns) {
    patterns = ['**/*.js']
  }
  return globby.sync(patterns, opts)
    .map(path => require(Path.join(opts.cwd || process.cwd(), path)))
}
