(function (window) {
    'use strict';

    var HTTPArchiveRequest = window.HTTPArchiveRequest = function (options, strict) {
        this._strict = (strict === undefined) ? true : strict;

        Object.defineProperties(this, {
            _strict: {
                enumerable: false,
                writable: true,
                value: true
            },

            method: {
                enumerable: true,
                writable: true,
                value: null
            },

            url: {
                enumerable: true,
                writable: true,
                value: null
            },

            httpVersion: {
                enumerable: true,
                writable: true,
                value: 'HTTP/1.1'
            },

            queryString: {
                enumerable: true,
                writable: true,
                value: []
            },

            headersSize: {
                enumerable: true,
                writable: true,
                value: 0
            },

            bodySize: {
                enumerable: true,
                writable: true,
                value: 0
            },

            cookies: {
                enumerable: true,
                writable: true,
                value: []
            },

            headers: {
                enumerable: true,
                writable: true,
                value: []
            }
        });

        this.setOptions(options);
    };

    HTTPArchiveLog.prototype.addCookie = function (name, value) {
        this.cookies.push({name: name, value: value});
        return this;
    };

    HTTPArchiveLog.prototype.addHeader = function (name, value) {
        this.headers.push({name: name, value: value});
        return this;
    };
})(window || this);
