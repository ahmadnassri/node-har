/*!
 * HTTPArchive.js v1.2.1 (https://github.com/codeinchaos/httparchive.js.git)
 * Copyright 2014 Ahmad Nassri
 * Licensed under https://github.com/codeinchaos/httparchive.js/blob/master/LICENSE
 */

(function (window) {
    'use strict';

    var HTTPArchiveLog = window.HTTPArchiveLog = function (options, strict) {
        this._strict = (strict === undefined) ? true : strict;

        Object.defineProperties(this, {
            _strict: {
                enumerable: false,
                writable: true,
                value: true
            },

            props: {
                enumerable: false,
                configurable: false,
                value: {
                    _pages: [],
                    _entries: []
                }
            },

            comment: {
                enumerable: true,
                writable: true,
                value: undefined
            },

            version: {
                enumerable: true,
                writable: true,
                value: 1.2
            },

            creator: {
                enumerable: true,
                writable: true,
                value: {
                    name: 'HTTPArchive.js',
                    version: '1.0.0'
                }
            },

            browser: {
                enumerable: true,
                writable: true,
                value: undefined
            },

            pages: {
                enumerable: true,

                get: function () {
                    return this.props._pages;
                },

                set: function (pages) {
                    if (!Array.isArray(pages)) {
                        throw new Error('invalid HTTPArchivePage object.');
                    }

                    for (var x in pages) {
                        this.addPage(pages[x]);
                    }
                }
            },

            entries: {
                enumerable: true,

                get: function () {
                    return this.props._entries;
                },

                set: function (entries) {
                    if (!Array.isArray(entries)) {
                        throw new Error('invalid HTTPArchiveEntry object.');
                    }

                    for (var x in entries) {
                        this.addEntry(entries[x]);
                    }
                }
            }
        });

        this.setOptions(options);
    };

    HTTPArchiveLog.prototype.addPage = function (page) {
        if (!(page instanceof HTTPArchivePage)) {
            page = new HTTPArchivePage(page);
        }

        this.props._pages.push(page);
        return page;
    };

    HTTPArchiveLog.prototype.addEntry = function (entry) {
        if (!(entry instanceof HTTPArchiveEntry)) {
            entry = new HTTPArchiveEntry(entry);
        }

        this.props._entries.push(entry);
        return entry;
    };
})(window || this);

(function (window) {
    'use strict';

    var HTTPArchivePage = window.HTTPArchivePage = function (options, strict) {
        this._strict = (strict === undefined) ? true : strict;

        Object.defineProperties(this, {
            _strict: {
                enumerable: false,
                writable: true
            },

            comment: {
                enumerable: true,
                writable: true,
                value: undefined
            },

            id: {
                enumerable: true,
                writable: true,
                value: Math.floor(Math.random() * 11)
            },

            title: {
                enumerable: true,
                writable: true,
                value: null
            },

            pageTimings: {
                enumerable: true,
                writable: true,
                value: {
                    onContentLoad: 0,
                    onLoad: 0
                }
            },

            props: {
                enumerable: false,
                configurable: false,
                value: {
                    _startedDateTime: new Date()
                }
            },

            startedDateTime: {
                enumerable: true,

                get: function () {
                    return this.props._startedDateTime;
                },

                set: function (value) {
                    if (!(value instanceof Date)) {
                        try {
                            value = new Date(value);
                        } catch (e) {
                            throw new Error('invalid date object.');
                        }
                    }

                    this.props._startedDateTime = value;
                }
            }
        });

        this.setOptions(options);
    };
})(window || this);

(function (window) {
    'use strict';

    var HTTPArchiveEntry = window.HTTPArchiveEntry = function (options, strict) {
        this._strict = (strict === undefined) ? true : strict;

        Object.defineProperties(this, {
            _strict: {
                enumerable: false,
                writable: true,
                value: true
            },

            pageref: {
                enumerable: true,
                writable: true,
                value: undefined
            },

            cache: {
                enumerable: true,
                writable: true,
                value: {}
            },

            serverIPAddress: {
                enumerable: true,
                writable: true,
                value: undefined
            },

            connection: {
                enumerable: true,
                writable: true,
                value: undefined
            },

            comment: {
                enumerable: true,
                writable: true,
                value: undefined
            },

            timings: {
                enumerable: true,
                writable: true,
                value: {
                    dns: 0,
                    connect: 0,
                    blocked: 0,
                    send: 0,
                    wait: 0,
                    receive: 0
                }
            },

            props: {
                enumerable: false,
                configurable: false,
                value: {
                    _startedDateTime: new Date(),
                    _time: new Date(),
                    _request: null,
                    _response: null,
                }
            },

            startedDateTime: {
                enumerable: true,

                get: function () {
                    return this.props._startedDateTime;
                },

                set: function (value) {
                    if (!(value instanceof Date)) {
                        try {
                            value = new Date(value);
                        } catch (e) {
                            throw new Error('invalid date object.');
                        }
                    }

                    this.props._startedDateTime = value;
                }
            },

            time: {
                enumerable: true,

                get: function () {
                    return this.props._time;
                },

                set: function (value) {
                    if (typeof value !== 'number') {
                        throw new Error('invalid time value.');
                    }

                    this.props._time = value;
                }
            },

            request: {
                enumerable: true,

                get: function () {
                    return this.props._request;
                },

                set: function (value) {
                    if (!(value instanceof HTTPArchiveRequest)) {
                        try {
                            value = new HTTPArchiveRequest(value);
                        } catch (e) {
                            throw new Error('invalid request object.');
                        }
                    }

                    this.props._request = value;
                }
            },

            response: {
                enumerable: true,

                get: function () {
                    return this.props._response;
                },

                set: function (value) {
                    if (!(value instanceof HTTPArchiveResponse)) {
                        try {
                            value = new HTTPArchiveResponse(value);
                        } catch (e) {
                            throw new Error('invalid response object.');
                        }
                    }

                    this.props._response = value;
                }
            }
        });

        this.setOptions(options);
    };
})(window || this);

(function (window) {
    'use strict';

    // https://github.com/medialize/URI.js
    var Query = {
        parse: function(string) {
            function escapeQuerySpace (string) {
                return string.replace(/\+/g, '%20');
            }

            if (!string) {
                return {};
            }

            // throw out the funky business - "?"[name"="value"&"]+
            string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

            if (!string) {
                return {};
            }

            var items = {};
            var splits = string.split('&');
            var length = splits.length;
            var v, name, value;

            for (var i = 0; i < length; i++) {
                v = splits[i].split('=');
                name = decodeURIComponent(escapeQuerySpace(v.shift()));
                // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
                value = v.length ? decodeURIComponent(escapeQuerySpace(v.join('='))) : null;

                if (items[name]) {
                    if (typeof items[name] === 'string') {
                        items[name] = [items[name]];
                    }

                    items[name].push(value);
                } else {
                    items[name] = value;
                }
            }

            return items;
        },

        construct: function (parts) {
            var string = [];

            parts.forEach(function(part) {
                string.push(encodeURIComponent(part.name) + '=' + encodeURIComponent(part.value));
            });

            return string.join('&');
        }
    };

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

            httpVersion: {
                enumerable: true,
                writable: true,
                value: 'HTTP/1.1'
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

            _props: {
                enumerable: false,
                configurable: false,
                value: {
                    _url: null,
                    _queryString: []
                }
            },

            // TODO validate URL with regexp
            url: {
                enumerable: true,

                get: function () {
                    return this._props._url;
                },

                set: function (value) {
                    this._props._url = value;

                    // parse the URL
                    var url = HTTPArchiveURLRegExp.exec(this.url);

                    // overwrite Host header
                    this.setHeader('Host', url[2]);

                    // overwrite the query string
                    this.props._queryString = Query.parse(url[4]);
                }
            },

            queryString: {
                enumerable: true,

                get: function () {
                    // construct query object
                    var query = [];

                    for (var name in this.props._queryString) {
                        if (Array.isArray(this.props._queryString[name])) {
                            this.props._queryString[name].forEach(function(value) {
                                query.push({
                                    'name': name,
                                    'value': value
                                });
                            });
                        } else {
                            query.push({name: name, value: this.props._queryString[name]});
                        }
                    }

                    return query;
                },

                set: function (queryString) {
                    if (!Array.isArray(queryString)) {
                        throw new Error('invalid queryString array. expected Array, instead got ' + typeof queryString);
                    }

                    queryString.forEach(this.setQuery, this);

                    return this;
                }
            },
        });

        this.setOptions(options);
    };

    /**
     * queryString Utils
     */
    HTTPArchiveRequest.prototype.getQuery = function (name) {
        return this.props._queryString[name];
    };

    HTTPArchiveRequest.prototype.hasQuery = function (name) {
        return this.props._queryString.hasOwnProperty(name);
    };

    HTTPArchiveRequest.prototype.countQuery = function (name) {
        if (this.hasQuery(name)) {
            if (typeof this.props._queryString[name] === 'object') {
                return this.props._queryString[name].length;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    };

    HTTPArchiveRequest.prototype.removeQuery = function (name) {
        delete this.props._queryString[name];
        return this;
    };

    HTTPArchiveRequest.prototype.setQuery = function (name, value) {
        if (typeof name === 'object') {
            if (!name.hasOwnProperty('name') || !name.hasOwnProperty('value')) {
                throw new Error('invalid queryString object');
            } else {
                this.setQuery(name.name, name.value);
            }
        } else {
            // TODO validate both name and value are proper strings
            this.props._queryString[name] = value;
        }

        // udpate the URL

        // parse the URL
        var url = HTTPArchiveURLRegExp.exec(this._props._url);

        this._props._url = this._props._url.replace(url[4], '?' + this.getQueryString());

        return this;
    };

    HTTPArchiveRequest.prototype.getQueryString = function () {
        return Query.construct(this.queryString);
    };

    HTTPArchiveRequest.prototype.printHeaders = function () {
        var headers = [];

        // get the URL parts
        var url = HTTPArchiveURLRegExp.exec(this.url);
        var path = url[4] ? url[3] + url[4] : url[3];

        // add missing parts to header
        headers.push(this.method + ' ' + path + ' ' + this.httpVersion);
        //headers.push('Host: ' + url[2]);

        for (var name in this.props._headers) {
            headers.push(name + ': ' + this.props._headers[name]);
        }

        return headers.join('\r\n') + '\r\n\r\n';
    };

    HTTPArchiveRequest.prototype.toCurl = function (options) {
        var curl = ['curl'];

        var opt = {
            'beautify': (options.beautify === undefined) ? false : options.beautify,
            'indent_size': (options.indent_size === undefined) ? 2 : options.indent_size,
            'indent_char': (options.indent_char === undefined) ? ' ' : options.indent_char
        };

        var indent_string = '';

        while (opt.indent_size > 0) {
            indent_string += opt.indent_char;
            opt.indent_size -= 1;
        }

        curl.push('-X ' + this.method);

        var cookies = [];

        this.cookies.forEach(function(cookie) {
            cookies.push(cookie.name + '=' + cookie.value);
        });

        if (cookies.length > 0) {
            curl.push('--cookie "' + cookies.join(';') + '"');
        }

        this.headers.forEach(function(header) {
            curl.push('-H "' + header.name + ':' + header.value + '"');
        });

        curl.push('"' + this.url + '"');

        return curl.join(opt.beautify === true ? ' \\\n' + indent_string : ' ');
    };

    HTTPArchiveRequest.prototype.toString = function () {
        return this.printHeaders();
    };
})(window || this);

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
