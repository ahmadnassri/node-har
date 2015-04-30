'use strict'

var Comment = require('./comment')

var Content = function (options) {
  var opts = options || {}

  Comment.call(this, opts.comment)

  Object.defineProperty(this, 'size', {
    enumerable: true,

    get: function () {
      if (this.text) {
        return new Buffer(this.text).length
      }

      return 0
    },

    set: function () {
      throw Error('not allowed')
    }
  })

  Object.defineProperty(this, 'compression', {
    enumerable: true,
    writable: true,
    value: opts.compression
  })

  Object.defineProperty(this, 'mimeType', {
    enumerable: true,
    writable: true,
    value: opts.mimeType || 'application/octet-stream'
  })

  Object.defineProperty(this, 'encoding', {
    enumerable: true,
    writable: true,
    value: opts.encoding
  })

  Object.defineProperty(this, 'text', {
    enumerable: true,
    writable: true,
    value: opts.text
  })
}

module.exports = Content
