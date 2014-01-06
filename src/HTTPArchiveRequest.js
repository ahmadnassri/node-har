(function (window) {
    'use strict';

    var HTTPArchiveRequest = window.HTTPArchiveRequest = function (options, strict) {
        this._strict = (strict === undefined) ? true : strict;

        Object.defineProperties(this, new HTTPArchiveHeadersProps(this));

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

            // TODO validate URL with regexp
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

            bodySize: {
                enumerable: true,
                writable: true,
                value: 0
            },

            comment: {
                enumerable: true,
                writable: true,
                value: undefined
            }
        });

        this.setOptions(options);
    };

    HTTPArchiveRequest.prototype.printHeaders = function () {
        var headers = [];

        // get the URL parts
        var url = HTTPArchiveURLRegExp.exec(this.url);
        var path = url[4] ? url[3] + url[4] : url[3];

        // add to headers
        headers.push(this.method + ' ' + path + ' ' + this.httpVersion);

        for (var name in this.props._headers) {
            headers.push(name + ': ' + this.props._headers[name]);
        }

        return headers.join('\r\n') + '\r\n\r\n';
    };
})(window || this);
