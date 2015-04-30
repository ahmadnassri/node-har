'use strict'

module.exports = {
  toObject: function (array) {
    return array.reduce(function reducer (obj, pair) {
      if (obj[pair.name] === undefined) {
        obj[pair.name] = pair.value
        return obj
      }

      // convert to array
      var arr = [
        obj[pair.name],
        pair.value
      ]

      obj[pair.name] = arr

      return obj
    }, {})
  },

  toArray: function (obj) {
    return Object.keys(obj).map(function (name) {
      return {
        name: name,
        value: obj[name]
      }
    })
  }
}
