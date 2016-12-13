'use strict'

var globby = require('globby')
var Path = require('path')
var errorEx = require('error-ex')

var RequireError = errorEx('JSONError')

function requireGlobArrayCore(sync, patterns, opts) {
  if (typeof patterns === 'object' && !Array.isArray(patterns) &&
    opts === undefined) {

    opts = patterns
    patterns = null
  }
  opts = opts || {}
  var returnPath = opts.returnPath
  if (!patterns) {
    patterns = ['**/*.js']
  }

  function processPath(path) {
    try {
      var cwd = opts.cwd || '.'
      var req = require(Path.resolve(process.cwd(), cwd, path))
      if (returnPath) {
        return [path, req]
      }
      return req
    }
    catch (err) {
      let newErr = new RequireError("Error requiring file", {
        path: errorEx.append("%s"),
        errMessage: errorEx.line("%s")
      })
      newErr.err = err
      newErr.path = path
      newErr.errMessage = err.message
      throw newErr
    }
  }

  if (sync) {
    return globby.sync(patterns, opts).map(processPath)
  }
  return globby(patterns, opts).then(function(result) {
    return result.map(processPath)
  })
}

module.exports = function requireGlobArray(patterns, opts) {
  return requireGlobArrayCore(true, patterns, opts)
}

module.exports.async = function requireGlobArrayAsync(patterns, opts) {
  return requireGlobArrayCore(false, patterns, opts)
}

module.exports.RequireError = RequireError
