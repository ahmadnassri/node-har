(function (window) {
    'use strict';

    var HTTPArchiveURLRegExp = window.HTTPArchiveURLRegExp = /\b(https?|ftp):\/\/([\-A-Z0-9.]+)(\/[\-A-Z0-9+&@#\/%=~_|!:,.;]*)?(\?[A-Z0-9+&@#\/%=~_|!:,.;]*)?/i;


    var HTTPArchiveHeadersProps = window.HTTPArchiveHeadersProps = function(thisArg) {
        return {
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
                }.bind(thisArg),

                set: function () {
                    return this;
                }.bind(thisArg)
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
                }.bind(thisArg),

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
                }.bind(thisArg)
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
                }.bind(thisArg),

                set: function (cookies) {
                    if (!Array.isArray(cookies)) {
                        throw new Error('invalid cookies array. expected Array, instead got ' + typeof cookies);
                    }

                    cookies.forEach(this.setCookie, this);
                }.bind(thisArg)
            }
        };
    };

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

    /**
     * Headers
     */
    HTTPArchiveRequest.prototype.getHeader = HTTPArchiveResponse.prototype.getHeader = function (name) {
        return this.props._headers[name];
    };

    HTTPArchiveRequest.prototype.hasHeader = HTTPArchiveResponse.prototype.hasHeader = function (name) {
        return this.props._headers.hasOwnProperty(name);
    };

    HTTPArchiveRequest.prototype.removeHeader = HTTPArchiveResponse.prototype.removeHeader = function (name) {
        delete this.props._headers[name];
        return this;
    };

    HTTPArchiveRequest.prototype.setHeader = HTTPArchiveResponse.prototype.setHeader = function (name, value) {
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

    /**
     * Cookies
     */
    HTTPArchiveRequest.prototype.getCookieObject = HTTPArchiveResponse.prototype.getCookieObject = function (name) {
        return this.props._cookies[name];
    };

    HTTPArchiveRequest.prototype.getCookie = HTTPArchiveResponse.prototype.getCookie = function (name) {
        return this.props._cookies[name].value;
    };

    HTTPArchiveRequest.prototype.hasCookie = HTTPArchiveResponse.prototype.hasCookie = function (name) {
        return this.props._cookies.hasOwnProperty(name);
    };

    HTTPArchiveRequest.prototype.setCookie = HTTPArchiveResponse.prototype.setCookie = function (name, value, path, domain, expires, httpOnly, secure, comment) {
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
