'use strict'

var Comment = require('./comment')
var crypto = require('crypto')
var DateTime = require('./date-time')

var Page = function (options) {
  var opts = options || {}

  opts.pageTimings = opts.pageTimings || {}

  Comment.call(this, opts.comment)
  DateTime.call(this, 'startedDateTime', opts.startedDateTime)

  Object.defineProperty(this, 'id', {
    enumerable: true,
    writable: true,
    value: opts.id || crypto.randomBytes(Math.ceil(10 / 2)).toString('hex').slice(0, 10)
  })

  Object.defineProperty(this, 'title', {
    enumerable: true,
    writable: true,
    value: opts.title || ''
  })

  Object.defineProperty(this, 'pageTimings', {
    enumerable: true,
    writable: true,
    value: {
      onLoad: opts.pageTimings.onLoad !== undefined ? opts.pageTimings.onLoad : -1,
      onContentLoad: opts.pageTimings.onContentLoad !== undefined ? opts.pageTimings.onContentLoad : -1
    }
  })
}

module.exports = Page
