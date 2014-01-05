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
