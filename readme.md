# require-glob-array

`require` node modules and place their exported values in an array

[![npm](https://img.shields.io/npm/v/require-glob-array.svg?style=flat-square)](https://www.npmjs.com/package/require-glob-array)
[![Build Status](https://img.shields.io/travis/seangenabe/require-glob-array/master.svg?style=flat-square)](https://travis-ci.org/seangenabe/require-glob-array)
[![Dependency Status](https://img.shields.io/david/seangenabe/require-glob-array.svg?style=flat-square)](https://david-dm.org/seangenabe/require-glob-array)

## Usage

```
- dir
  - unicorn.js: module.exports = 'foo'
  - cake.js: module.exports = 'bar'
  - rainbow.js: module.exports = 'baz'
```

```javascript
const requireGlobArray = require('require-glob-array')
let out = requireGlobArray({ cwd: 'dir' })
out //=> ['bar', 'baz', 'foo']
```

## API

### requireGlobArray([patterns], [options])

Returns an array containing all of the exported values of the modules that
are globbed.

Parameters:
* `patterns: string|array`: `minimatch` [patterns](https://github.com/isaacs/minimatch#usage) passed to `globby`. Defaults to `**/*.js`.
* `options: object`: `glob` [options](https://github.com/isaacs/node-glob#options) passed to globby.

## NOT compatible with Browserify

Obviously, this module is not compatible with Browserify since it uses dynamic `require` calls.

## License

MIT
