'use strict'

var Comment = function (comment) {
  Object.defineProperty(this, 'comment', {
    enumerable: true,
    writable: true,
    value: comment
  })
}

module.exports = Comment
