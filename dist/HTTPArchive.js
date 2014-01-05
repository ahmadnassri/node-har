/*!
 * HTTPArchive.js v1.0.0 (https://github.com/codeinchaos/httparchive.js.git)
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
                value: ''
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
                    name: 'HAR.js',
                    version: '1.0.0'
                }
            },

            browser: {
                enumerable: true,
                writable: true,
                value: {
                    name: null,
                    value: null
                }
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
                value: ''
            },

            id: {
                enumerable: true,
                writable: true,
                value: null
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

            pageref: {
                enumerable: true,
                writable: true,
                value: 0
            },

            cache: {
                enumerable: true,
                writable: true,
                value: {}
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

    HTTPArchiveLog.prototype.addCookie = function (name, value) {
        this.cookies.push({name: name, value: value});
        return this;
    };

    HTTPArchiveLog.prototype.addHeader = function (name, value) {
        this.headers.push({name: name, value: value});
        return this;
    };
})(window || this);

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

            if (this.hasOwnProperty(key)) {
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
