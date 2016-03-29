'use strict'

var globby = require('globby')
var Path = require('path')
var CompositeError = require('composite-error')
var Util = require('util')

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
    .map(function(path) {
      let realpath
      try {
        realpath = Path.join(opts.cwd || process.cwd(), path)
        return require(realpath)
      }
      catch (err) {
        throw new RequireError(
          realpath,
          "An error occurred while trying to require the file " + realpath,
          err
        )
      }
    })
}

function RequireError(realpath, message, innerErrors) {
  CompositeError.call(this, message, innerErrors)
  this.path = realpath
  this.name = 'RequireError'
}

Util.inherits(RequireError, CompositeError)
