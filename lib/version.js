'use strict'

var Version = function (version) {
  if (!version) {
    throw new Error('version required')
  }

  Object.defineProperty(this, 'version', {
    enumerable: true,
    writable: true,
    value: version.toString()
  })
}

module.exports = Version
