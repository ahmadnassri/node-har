(function (window) {
    'use strict';

    var URLRegExp = /\b(https?|ftp):\/\/([\-A-Z0-9.]+)(\/[\-A-Z0-9+&@#\/%=~_|!:,.;]*)?(\?[A-Z0-9+&@#\/%=~_|!:,.;]*)?/i;

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
            },

            props: {
                enumerable: false,
                configurable: false,
                value: {
                    _headers: {},
                    _cookies: {}
                }
            },

            headersSize: {
                enumerable: true,

                get: function () {
                    var headers = this.printHeaders();

                    return headers.length > 0 ? headers.length : -1;
                },

                set: function () {
                    return this;
                }
            },

            headers: {
                enumerable: true,

                get: function () {
                    // construct headers object
                    var headers = [];

                    for (var name in this.props._headers) {
                        headers.push({name: name, value: this.props._headers[name]});
                    }

                    return headers;
                },

                set: function (headers) {
                    if (!Array.isArray(headers)) {
                        throw new Error('invalid headers array. expected Array, instead got ' + typeof headers);
                    }

                    // special condition for clearing headers
                    if (headers.length === 0) {
                        this.props._headers = {};
                    } else {
                        headers.forEach(this.setHeader, this);
                    }

                    return this;
                }
            },

            cookies: {
                enumerable: true,

                get: function () {
                    // construct cookies object
                    var cookies = [];

                    for (var name in this.props._cookies) {
                        // add the name to the cookie object before returning
                        var cookie = this.props._cookies[name];
                        cookie.name = name;

                        cookies.push(cookie);
                    }

                    return cookies;
                },

                set: function (cookies) {
                    if (!Array.isArray(cookies)) {
                        throw new Error('invalid cookies array. expected Array, instead got ' + typeof cookies);
                    }

                    cookies.forEach(this.setCookie, this);
                }
            }
        });

        this.setOptions(options);
    };

    /**
     * Headers
     */
    HTTPArchiveRequest.prototype.getHeader = function (name) {
        return this.props._headers[name];
    };

    HTTPArchiveRequest.prototype.hasHeader = function (name) {
        return this.props._headers.hasOwnProperty(name);
    };

    HTTPArchiveRequest.prototype.removeHeader = function (name) {
        delete this.props._headers[name];
        return this;
    };

    HTTPArchiveRequest.prototype.setHeader = function (name, value) {
        if (typeof name === 'object') {
            if (!name.hasOwnProperty('name') || !name.hasOwnProperty('value')) {
                throw new Error('invalid header object');
            } else {
                this.setHeader(name.name, name.value);
            }
        } else {
            // TODO validate both name and value are proper strings
            this.props._headers[name] = value;
        }

        return this;
    };

    HTTPArchiveRequest.prototype.printHeaders = function () {
        if (Object.keys(this.props._headers).length === 0) {
            return '';
        }

        var headers = [];

        // get the URL parts
        var url = URLRegExp.exec(this.url);
        var path = url[4] ? url[3] + url[4] : url[3];

        // add to headers
        headers.push(this.method + ' ' + path + ' ' + this.httpVersion);

        for (var name in this.props._headers) {
            headers.push(name + ': ' + this.props._headers[name]);
        }

        return headers.join('\r\n') + '\r\n\r\n';
    };

    /**
     * Cookies
     */
    HTTPArchiveRequest.prototype.getCookieObject = function (name) {
        return this.props._cookies[name];
    };

    HTTPArchiveRequest.prototype.getCookie = function (name) {
        return this.props._cookies[name].value;
    };

    HTTPArchiveRequest.prototype.hasCookie = function (name) {
        return this.props._cookies.hasOwnProperty(name);
    };

    HTTPArchiveRequest.prototype.setCookie = function (name, value, path, domain, expires, httpOnly, secure, comment) {
        if (typeof arguments[0] === 'object') {
            return this.setCookie.apply(this, [
                arguments[0].name,
                arguments[0].value,
                arguments[0].path,
                arguments[0].domain,
                arguments[0].expires,
                arguments[0].httpOnly,
                arguments[0].secure,
                arguments[0].comment
            ]);
        }


        if (name === undefined || value === undefined) {
            throw new Error('cookie must have a name and value');
        }

        // TODO validate both name and value are proper strings
        this.props._cookies[name] = {
            name: name,
            value: value,
            path: path || '/',
            domain: domain || '',
            expires: expires !== undefined ? expires : new Date().toISOString(),
            httpOnly: httpOnly || false,
            secure: secure || false,
            comment: comment || ''
        };

        return this;
    };
})(window || this);
