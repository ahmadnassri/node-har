test('HTTPArchivePage', function() {
    var page = new HTTPArchivePage(data.log.pages[0]);

    ok(page instanceof HTTPArchivePage, 'created instance of HTTPArchivePage');
    deepEqual(page.toJSON(), data.log.pages[0], 'input JSON === output JSON');
});

test('HTTPArchiveRequest', function() {
    var request = new HTTPArchiveRequest(data.log.entries[0].request);

    ok(request instanceof HTTPArchiveRequest, 'created instance of HTTPArchiveRequest');
    deepEqual(request.toJSON(), data.log.entries[0].request, 'input JSON === output JSON');
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
