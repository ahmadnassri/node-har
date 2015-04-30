'use strict'

var Comment = require('./comment')
var DateTime = require('./date-time')

var CacheEntry = function (options) {
  var opts = options || {}

  Comment.call(this, opts.comment)
  DateTime.call(this, 'expires', opts.expires, true)
  DateTime.call(this, 'lastAccess', opts.expires, true)

  Object.defineProperty(this, 'eTag', {
    enumerable: true,
    writable: true,
    value: opts.eTag
  })

  Object.defineProperty(this, 'hitCount', {
    enumerable: true,
    writable: true,
    value: opts.hitCount
  })
}

module.exports = CacheEntry
