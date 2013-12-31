(function(window) {
    'use strict';

    var HTTPArchiveEntry = window.HTTPArchiveEntry = function (options) {
        Object.defineProperties(this, {
            startedDateTime: {
                enumerable: true,

                get: function () {
                    return this._startedDateTime;
                },

                set: function (value) {
                    if (!(value instanceof Date)) {
                        throw new Error('invalid date object.');
                    }

                    this._startedDateTime = value;
                }
            },

            time: {
                enumerable: true,

                get: function () {
                    return this._time;
                },

                set: function (value) {
                    if (typeof value !== 'number') {
                        throw new Error('invalid time value.');
                    }

                    this._time = value;
                }
            },

            request: {
                enumerable: true,

                get: function () {
                    return this._request;
                },

                set: function (value) {
                    if (!(value instanceof HTTPArchiveRequest)) {
                        throw new Error('invalid request object.');
                    }

                    this._request = value;
                }
            },

            response: {
                enumerable: true,

                get: function () {
                    return this._response;
                },

                set: function (value) {
                    if (!(value instanceof HTTPArchiveResponse)) {
                        throw new Error('invalid request object.');
                    }

                    this._response = value;
                }
            }
        });

        this.setOptions(options);
    };

    HTTPArchiveEntry.prototype.setOptions = function (options) {
        if (arguments.length == 0) {
            throw new Error('constructor called with no arguments, expected options.');
        }

        if (typeof options !== 'object' || Array.isArray(options)) {
            throw new Error('invalid options object.');
        }

        for (var key in options) {
            if (options.hasOwnProperty(key)){
                this[key] = options[key];
            }
        }
    };

    HTTPArchiveEntry.prototype.toJSON = function () {
        return {
            startedDateTime: this._startedDateTime,
            time: this._time,
            request: this._request,
            response: this._response,
            cache: this._cache || null,
            timings: this._timings,
            connection: this._connection,
            pageref: this._pageref || null
        };
    };
})(window || this);
