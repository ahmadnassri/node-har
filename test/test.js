test('HTTPArchivePage', function() {
    var page = new HTTPArchivePage(data.log.pages[0]);

    ok(page instanceof HTTPArchivePage, 'created instance of HTTPArchivePage');
    //deepEqual(page.toJSON(), data.log.pages[0], 'input JSON === output JSON');
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

    //equal(request.headersSize, 666, 'header size recalculated');

    request.removeHeader('X-Content-Type');

    ok(!request.hasHeader('X-Content-Type'), 'custom header removed');

    // reset all headers
    request.headers = [];
    equal(request.headersSize, -1, 'headers reset');

    // cookies
    request.setCookie('MyCookie', 'cookievalue');

    ok(request.hasCookie('MyCookie'), 'custom cookie added');

    equal(request.getCookie('MyCookie'), 'cookievalue', 'custom cookie value verified');

    request.setCookie('MyCookie', 'anothercookievalue');

    equal(request.getCookie('MyCookie'), 'anothercookievalue', 'adjust pre-existing cookie value');
});

test('HTTPArchiveResponse', function() {
    var response = new HTTPArchiveResponse(data.log.entries[0].response);

    ok(response instanceof HTTPArchiveResponse, 'created instance of HTTPArchiveResponse');
    deepEqual(response.toJSON(), data.log.entries[0].response, 'input JSON === output JSON');
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
