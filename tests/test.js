test('initate objects', function() {
    var har = new HTTPArchive();
    ok(har instanceof HTTPArchive);

    var entry = new HTTPArchiveEntry({
        startedDateTime: new Date('2013-12-30T06:42:48.202Z'),
        time: 3231.657028198242,
        request: new HTTPArchiveRequest(),
        response: new HTTPArchiveResponse(),
        cache: null,
        timings: {
          blocked: 0.4260000023350585,
          dns: -1,
          connect: -1,
          send: 0.050999999075429514,
          wait: 2722.289000001183,
          receive: 508.8910281956487,
          ssl: -1
        },
        connection: '31669',
        pageref: 'page_1'
    });

    ok(entry instanceof HTTPArchiveEntry);

    console.log(entry.toJSON());
});
