(function (window) {
    'use strict';

    var HTTPArchiveResponse = window.HTTPArchiveResponse = function (options, strict) {
        this._strict = (strict === undefined) ? true : strict;

        Object.defineProperties(this, {
            _strict: {
                enumerable: false,
                writable: true,
                value: true
            },

            status: {
                enumerable: true,
                writable: true,
                value: 0
            },

            statusText: {
                enumerable: true,
                writable: true,
                value: ''
            },

            httpVersion: {
                enumerable: true,
                writable: true,
                value: 'HTTP/1.1'
            },

            redirectURL: {
                enumerable: true,
                writable: true,
                value: ''
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

            content: {
                enumerable: true,
                writable: true,
                value: {
                    size: 0,
                    mimeType: '',
                    text: ''
                }
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

    HTTPArchiveResponse.prototype.addCookie = function (name, value) {
        this.cookies.push({name: name, value: value});
        return this;
    };

    HTTPArchiveResponse.prototype.addHeader = function (name, value) {
        this.headers.push({name: name, value: value});
        return this;
    };
})(window || this);
