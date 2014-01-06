(function (window) {
    'use strict';

    HTTPArchiveLog.prototype.setOptions = HTTPArchiveRequest.prototype.setOptions = HTTPArchiveResponse.prototype.setOptions = HTTPArchivePage.prototype.setOptions = HTTPArchiveEntry.prototype.setOptions = function (options) {
        if (arguments.length === 0 || options === undefined) {
            throw new Error('constructor called with no arguments, expected options.');
        }

        if (typeof options !== 'object' || Array.isArray(options)) {
            throw new Error('invalid options object.');
        }

        for (var key in options) {
            if (options.hasOwnProperty(key)) {

                if (this._strict && !this.hasOwnProperty(key)) {
                    // TODO: better error messages
                    throw new Error('invalid options object. [' + key + '].');
                }

                this[key] = options[key];
            }
        }
    };

    HTTPArchiveLog.prototype.toJSON = HTTPArchiveRequest.prototype.toJSON = HTTPArchiveResponse.prototype.toJSON = HTTPArchivePage.prototype.toJSON = HTTPArchiveEntry.prototype.toJSON = function () {
        var obj = {};

        for (var key in this) {
            var value = this[key];

            if (this.hasOwnProperty(key) && value !== undefined) {
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
    };
})(window || this);
