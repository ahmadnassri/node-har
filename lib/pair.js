'use strict'

var Comment = require('./comment')

var Pair = function (name, value, comment) {
  var opts = {
    name: name,
    value: value,
    comment: comment
  }

  if (typeof name === 'object') {
    opts = name
  }

  Comment.call(this, opts.comment)

  Object.defineProperty(this, 'name', {
    enumerable: true,
    writable: true,
    value: opts.name || ''
  })

  Object.defineProperty(this, 'value', {
    enumerable: true,
    writable: true,
    value: opts.value || ''
  })
}

module.exports = Pair
