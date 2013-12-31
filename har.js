(function(window) {
    // define HTTPArchiveRequest object
    var HTTPArchiveRequest = window.HTTPArchiveRequest = function (method, url, http, query, headers, cookies) {
        var Request = {
            method: method,
            url: url,
            httpVersion: 'HTTP/1.1',
            headers: headers || [],
            queryString: query || [],
            cookies: cookies || [],
            headersSize: 0,
            bodySize: 0
        };

        return {
        }
    };

    // define HTTPArchive object
    var HTTPArchive = window.HTTPArchive = function () {
        var LOG = {
            version: '1.2',
            creator: {
                name: 'har.js',
                version: 'x.x.x'
            },

            pages: [],
            entries: []
        }

        this.addPage = function (date, title, timings, id) {
            LOG.pages.push({
                startedDateTime: date || null,
                id: id || null,
                title: title || null,
                pageTimings: timings || null
            });

            return id;
        };

        this.addEntry = function (page, date, time, request, response, cache, timings, connection) {
            LOG.entries.push({
                startedDateTime: date || null,
                time: time || null,
                request: request || new HTTPArchiveRequest(),
                response: response || new HTTPArchiveResponse(),
                cache: cache || null,
                timings: timings || null,
                connection: connection || null,
                pageref: page
            })
        };

    };
})(window || this);
