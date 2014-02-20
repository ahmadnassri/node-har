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

    HTTPArchiveRequest.prototype.toCurl = function (multiLine) {
        var curl = ['curl'];

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

        return curl.join(multiLine === true ? ' \\\n\t' : ' ');
    };

    HTTPArchiveRequest.prototype.toString = function () {
        return this.printHeaders();
    };
})(window || this);
