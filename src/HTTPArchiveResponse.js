(function (window) {
    'use strict';

    var HTTPArchiveResponse = window.HTTPArchiveResponse = function (options, strict) {
        this._strict = (strict === undefined) ? true : strict;

        Object.defineProperties(this, new HTTPArchiveHeadersProps(this));

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

            comment: {
                enumerable: true,
                writable: true,
                value: undefined
            }
        });

        this.setOptions(options);
    };

    HTTPArchiveResponse.prototype.printHeaders = function () {
        var headers = [];

        // generatae first header line
        headers.push(this.httpVersion + ' ' + this.status + ' ' + this.statusText);

        for (var name in this.props._headers) {
            headers.push(name + ': ' + this.props._headers[name]);
        }

        return headers.join('\r\n') + '\r\n\r\n';
    };

    HTTPArchiveResponse.prototype.toString = function () {
        return this.printHeaders();
    };
})(window || this);
