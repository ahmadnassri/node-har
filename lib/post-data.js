'use strict'

var Comment = require('./comment')
var Param = require('./param')

var PostData = function (options) {
  var opts = options || {}

  // internal properties
  Object.defineProperties(this, {
    _params: {
      enumerable: false,
      configurable: false,
      writable: true,
      value: []
    }
  })

  Comment.call(this, opts.comment)

  Object.defineProperty(this, 'mimeType', {
    enumerable: true,
    writable: true,
    value: opts.mimeType || 'application/octet-stream'
  })

  Object.defineProperty(this, 'text', {
    enumerable: true,
    writable: true,
    value: opts.text || ''
  })

  Object.defineProperty(this, 'params', {
    enumerable: true,

    get: function () {
      return this._params
    },

    set: function (params) {
      this._params = []
      params.forEach(this.addParam, this)
    }
  })

  if (opts.params) {
    opts.params.forEach(this.addParam, this)
  }
}

PostData.prototype.addParam = function (param) {
  this._params.push(new Param(param))

  return this
}

PostData.prototype.toJSON = function () {
  if (this._params.length > 0) {
    return { mimeType: this.mimeType, params: this.params }
  } else {
    return { mimeType: this.mimeType, text: this.text }
  }
}

module.exports = PostData
