// polyfill for PhantomJS (https://github.com/ariya/phantomjs/issues/10522)
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

test('HTTPArchivePage', function() {
    var page = new HTTPArchivePage(data.log.pages[0]);

    ok(page instanceof HTTPArchivePage, 'created instance of HTTPArchivePage');
    deepEqual(page.toJSON(), data.log.pages[0], 'input JSON === output JSON');
});

test('HTTPArchiveRequest', function() {
    var request = new HTTPArchiveRequest(data.log.entries[0].request, false);

    ok(request instanceof HTTPArchiveRequest, 'created instance of HTTPArchiveRequest');
    deepEqual(request.toJSON(), data.log.entries[0].request, 'input JSON === output JSON');

    // headers
    request.setHeader('X-Content-Type', 'application/xml');

    ok(request.hasHeader('X-Content-Type'), 'custom header added');

    equal(request.getHeader('X-Content-Type'), 'application/xml', 'custom header value verified');

    request.setHeader('X-Content-Type', 'application/json');
    equal(request.getHeader('X-Content-Type'), 'application/json', 'adjust pre-existing header value');

    equal(request.headersSize, 666, 'header size recalculated');

    request.removeHeader('X-Content-Type');

    ok(!request.hasHeader('X-Content-Type'), 'custom header removed');

    // reset all headers
    request.headers = [];
    equal(request.headersSize, 18, 'headers reset');

    // cookies
    request.setCookie('MyCookie', 'cookievalue');

    ok(request.hasCookie('MyCookie'), 'custom cookie added');

    equal(request.getCookie('MyCookie'), 'cookievalue', 'custom cookie value verified');

    request.setCookie('MyCookie', 'anothercookievalue');

    equal(request.getCookie('MyCookie'), 'anothercookievalue', 'adjust pre-existing cookie value');

    // URL => Host & Query String
    request.url = 'http://yahoo.com?foo=bar&key=vale&key=othervalue';

    equal(request.getHeader('Host'), 'yahoo.com', 'Host header changed after changing the URL');

    equal(request.countQuery('key'), 2, 'Query count is correct');

    equal(request.getQuery('foo'), 'bar', 'Query value is correct');

    request.setQuery('foo', 'baz');

    equal(request.getQuery('foo'), 'baz', 'Query changed successfully');

    equal(request.url, 'http://yahoo.com?foo=baz&key=vale&key=othervalue', 'URL changed successfully');
});

test('HTTPArchiveResponse', function() {
    var response = new HTTPArchiveResponse(data.log.entries[0].response);

    ok(response instanceof HTTPArchiveResponse, 'created instance of HTTPArchiveResponse');
    deepEqual(response.toJSON(), data.log.entries[0].response, 'input JSON === output JSON');

    // headers
    response.setHeader('X-Content-Type', 'application/xml');

    ok(response.hasHeader('X-Content-Type'), 'custom header added');

    equal(response.getHeader('X-Content-Type'), 'application/xml', 'custom header value verified');

    response.setHeader('X-Content-Type', 'application/json');
    equal(response.getHeader('X-Content-Type'), 'application/json', 'adjust pre-existing header value');

    equal(response.headersSize, 258, 'header size recalculated');

    response.removeHeader('X-Content-Type');

    ok(!response.hasHeader('X-Content-Type'), 'custom header removed');

    // reset all headers
    response.headers = [];
    equal(response.headersSize, 19, 'headers reset');

    // cookies
    response.setCookie('MyCookie', 'cookievalue');

    ok(response.hasCookie('MyCookie'), 'custom cookie added');

    equal(response.getCookie('MyCookie'), 'cookievalue', 'custom cookie value verified');

    response.setCookie('MyCookie', 'anothercookievalue');

    equal(response.getCookie('MyCookie'), 'anothercookievalue', 'adjust pre-existing cookie value');
});

test('HTTPArchiveEntry', function() {
    var entry = new HTTPArchiveEntry(data.log.entries[0]);

    ok(entry instanceof HTTPArchiveEntry, 'created instance of HTTPArchiveEntry');
    deepEqual(entry.toJSON(), data.log.entries[0], 'input JSON === output JSON');
});

test('HTTPArchiveLog', function() {
    var log = new HTTPArchiveLog(data.log);

    ok(log instanceof HTTPArchiveLog, 'created instance of HTTPArchiveLog');
    deepEqual(log.toJSON(), data.log, 'input JSON === output JSON');
});
