# HTTPArchive.js [![Build Status](https://travis-ci.org/codeinchaos/httparchive.js.png?branch=master)](https://travis-ci.org/codeinchaos/httparchive.js) [![devDependency Status](https://david-dm.org/codeinchaos/httparchive.js.png)](https://david-dm.org/codeinchaos/httparchive.js#info=devDependencies) [![Total views](https://sourcegraph.com/api/repos/github.com/codeinchaos/httparchive.js/counters/views.png)](https://sourcegraph.com/github.com/codeinchaos/httparchive.js)

a JavaScript library to manupilate [HTTP Archive 1.2](http://www.softwareishard.com/blog/har-12-spec/) JSON objects.


### Features
- validates dates / HAR object specs (strict mode)
- provides default values for common properties (Dates, Page IDs, etc...)
- import/export HAR files

### API Example

start here.

```javascript
var log = new HTTPArchiveLog({
    'creator':{
        'name':'Ahmad'
    }
});
```

create an HTTPArchivePage object and add to the log.

```javascript
var page = new HTTPArchivePage({
    'startedDateTime': new Date(),
    'id':'page_62143',
    'title':'Google',
    'comment': null,
    'pageTimings':{
        'onContentLoad':90,
        'onLoad':245
    }
});

log.addPage(page);
```

create an HTTPArchiveEntry object and add to log.

```javascript
var entry = new HTTPArchiveEntry({
    'pageref':'page_62143',
    'startedDateTime': new Date()
});

log.addEntry(entry);
```

set the entry's HTTPArchiveRequest object

```javascript
entry.request = new HTTPArchiveRequest({
    'method': 'GET',
    'url': 'http://www.google.ca/',
    'httpVersion': 'HTTP/1.1',
    'queryString':[]
});
```
lets see the result

```javascript
log.toJSON();
```

this should output:

```javascript
{
    "comment": "",
    "version": 1.2,
    "creator": {
        "name": "Ahmad"
    },
    "browser": {
        "name": null,
        "value": null
    },
    "pages": [{
        "comment": null,
        "id": "page_62143",
        "title": "Google",
        "pageTimings": {
            "onContentLoad": 90,
            "onLoad": 245
        },
        "startedDateTime": "2014-01-05T01:40:18.548Z"
    }],
    "entries": [{
        "pageref": "page_62143",
        "cache": {},
        "timings": {
            "dns": 0,
            "connect": 0,
            "blocked": 0,
            "send": 0,
            "wait": 0,
            "receive": 0
        },
        "startedDateTime": "2014-01-05T01:40:18.549Z",
        "time": "2014-01-05T01:40:18.549Z",
        "request": {
            "method": "GET",
            "url": "http://www.google.ca/",
            "httpVersion": "HTTP/1.1",
            "queryString": [],
            "headersSize": 0,
            "bodySize": 0,
            "cookies": [],
            "headers": []
        },
        "response": null
    }]
}
```

### Strict mode

by default all HTTPArchive* Objects adhere to the [HTTP Archive 1.2](http://www.softwareishard.com/blog/har-12-spec/) spec. If you are feeling adventureous, or have some special needs, you can disable strict validation by passing a `boolean` flag to the constructor:

```javascript
var page = new HTTPArchivePage({
    'custom_properties': 'FTW',
    'startedDateTime': '2010-01-02T13:51:01.186Z'
}, false);
```

## TODO

- detailed API Docs.
- auto-calc body size when body is set
- auto-calc header size when headers are added/removed
- construct XMLHTTPRequest objects with HTTPArchiveRequest data
- construct HTTPArchiveRequest object with XMLHTTPRequest response objects

## Resources

- [NPM Package][1]
- [Follow me on Twitter][2]
- [Report issues][3]
- [Donate][4]
- [HAR 1.2 Spec][5]
- [HAR Viewer][6]
- [Tools, projects and applications that support HTTP Archive format (HAR)][7]

[1]: https://npmjs.org/package/httparchive.js
[2]: http://twitter.com/ahmadnassri
[3]: https://github.com/codeinchaos/httparchive.js/issues
[4]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UJ2B2BTK9VLRS
[5]: http://www.softwareishard.com/blog/har-12-spec/
[6]: http://www.softwareishard.com/blog/har-viewer/
[7]: http://www.softwareishard.com/blog/har-adopters
