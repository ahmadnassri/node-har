(function(window) {
    'use strict';

    var HTTPArchive = window.HTTPArchive = function () {
        this.log = {
            version: '1.2',
            creator: {
                name: 'har.js',
                version: '1.0.0'
            },

            pages: [],
            entries: []
        };
    };

    HTTPArchive.prototype.toJSON = function () {
        return {log: this.log};
    };

    HTTPArchive.prototype.addPage = function (options) {
        var page = new HTTPArchivePage(options);
        this.log.pages.push(page);
        return page;
    };

    HTTPArchive.prototype.addEntry = function (options) {
        var entry = new HTTPArchiveEntry(options);
        this.log.entries.push(entry);
        return entry;
    };
})(window || this);
