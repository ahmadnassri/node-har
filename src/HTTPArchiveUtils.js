(function (window) {
    'use strict';

    HTTPArchiveLog.prototype.setOptions = HTTPArchiveRequest.prototype.setOptions = HTTPArchiveResponse.prototype.setOptions = HTTPArchivePage.prototype.setOptions = HTTPArchiveEntry.prototype.setOptions = function (options) {
        if (arguments.length == 0 || options === undefined) {
            throw new Error('constructor called with no arguments, expected options.');
        }

        if (typeof options !== 'object' || Array.isArray(options)) {
            throw new Error('invalid options object.');
        }

        for (var key in options) {
            if (options.hasOwnProperty(key)) {

                if (this._strict && !this.hasOwnProperty(key)) {
                    throw new Error('invalid options object. [' + key + '].');
                }

                this[key] = options[key];
            }
        }
    };

    function toJSON () {
        var obj = {};

        for (var key in this) {
            var value = this[key];

            if (this.hasOwnProperty(key)) {
                if (value === null) {
                    obj[key] = value;
                    continue;
                }

                if (value instanceof Date) {
                    obj[key] = value.toISOString();
                } else if (value.toJSON) {
                    obj[key] = value.toJSON();
                } else if (Array.isArray(value)) {
                    for (var x in value) {
                        if (value[x].toJSON) {
                            value[x] = value[x].toJSON();
                        }
                    }

                    obj[key] = value;
                } else {
                    obj[key] = value;
                }
            }
        }

        return obj;
    }

    HTTPArchiveLog.prototype.toJSON = toJSON;
    HTTPArchiveRequest.prototype.toJSON = toJSON;
    HTTPArchiveResponse.prototype.toJSON = toJSON;
    HTTPArchivePage.prototype.toJSON = toJSON;
    HTTPArchiveEntry.prototype.toJSON = toJSON;
})(window || this);
