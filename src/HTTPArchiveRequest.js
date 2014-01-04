(function (window) {
    'use strict';

    var HTTPArchiveRequest = window.HTTPArchiveRequest = function (options) {
        /*var Request = {
            method: method,
            url: url,
            httpVersion: 'HTTP/1.1',
            headers: headers || [],
            queryString: query || [],
            cookies: cookies || [],
            headersSize: 0,
            bodySize: 0
        };*/

        this.setOptions(options);
    };
})(window || this);
