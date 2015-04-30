'use strict'

var Comment = require('./comment')
var Version = require('./version')

var Creator = function (options) {
  var opts = options || {}

  if (!opts.name) {
    throw new Error('name required')
  }

  Comment.call(this, opts.comment)
  Version.call(this, opts.version)

  Object.defineProperty(this, 'name', {
    enumerable: true,
    writable: true,
    value: opts.name
  })
}

module.exports = Creator
