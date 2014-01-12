# HTTPArchive.js
[![Build Status](https://travis-ci.org/codeinchaos/httparchive.js.png?branch=master)](https://travis-ci.org/codeinchaos/httparchive.js)
[![Dependency Status](https://david-dm.org/codeinchaos/httparchive.js.png)](https://david-dm.org/codeinchaos/httparchive.js)
[![devDependency Status](https://david-dm.org/codeinchaos/httparchive.js/dev-status.png)](https://david-dm.org/codeinchaos/httparchive.js#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/codeinchaos/httparchive.js/badge.png)](https://coveralls.io/r/codeinchaos/httparchive.js)
[![Total views](https://sourcegraph.com/api/repos/github.com/codeinchaos/httparchive.js/counters/views.png)](https://sourcegraph.com/github.com/codeinchaos/httparchive.js)

a JavaScript library to manupilate [HTTP Archive 1.2](http://www.softwareishard.com/blog/har-12-spec/) JSON objects.

## Features

- import/export HAR files
- validates dates / HAR object specs (strict mode)
- provides default values for common properties (Dates, Page IDs, etc...)
- automatically calculates headersSize variable when headers are added/removed
- export headers array into printed header message as per RFC2616 specs

### TODO

- detailed API Docs.
- auto-calc body size when body is set
- construct XMLHTTPRequest objects with HTTPArchiveRequest data
- construct HTTPArchiveRequest object with XMLHTTPRequest response objects

## Table of contents

 - [Quick start](#quick-start)
 - [Documentation](#documentation)
 - [Bugs and feature requests](#bugs-and-feature-requests)
 - [Compiling](#compiling)
 - [Contributing](#contributing)
 - [Community](#community)
 - [Versioning](#versioning)
 - [Authors](#authors)
 - [License](#license)

## Quick start

Four quick start options are available:

- [Download the latest release](https://github.com/codeinchaos/httparchive.js/releases).
- Clone the repo: `git clone git@github.com:codeinchaos/httparchive.js.git`.
- Install with [Bower](http://bower.io): `bower install httparchive.js`.
- Install with [NPM](http://npmjs.org): `npm install httparchive.js`.

### What's included

Within the download you'll find the following files, providing both compiled and minified variations:

```
HTTPArchive.js/
└── dist
    ├── HTTPArchive.js
    └── HTTPArchive.min.js
```

### Sample Usage

start by creating a new log instance:

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

## Documentation

Refer to the [Wiki](https://github.com/codeinchaos/httparchive.js/wiki) for detailed API documentation.

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://github.com/codeinchaos/httparchive.js/blob/master/CONTRIBUTING.md#using-the-issue-tracker) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/codeinchaos/httparchive.js/issues/new).

## Compiling [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

HTTPArchive.js uses [Grunt](http://gruntjs.com/). If you haven't used Grunt before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide.

### Available Grunt commands

| Function  | Command       | Description                                                                                                                               |
| --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Build     | `grunt`       | Run `grunt` to run tests locally and compile the JavaScript files into `/dist`.                                                           |
| Tests     | `grunt test`  | Runs [JSHint](http://jshint.com) and [QUnit](http://qunitjs.com/) tests headlessly in [PhantomJS](http://phantomjs.org/) (used for CI).   |
| Watch     | `grunt watch` | This is a convenience method for watching just Less files and automatically building them whenever you save.                              |

### Troubleshooting dependencies

Should you encounter problems with installing dependencies or running Grunt commands, uninstall all previous dependency versions (global and local). Then, rerun `npm install`.

## Contributing

Please read through our [contributing guidelines](https://github.com/codeinchaos/httparchive.js/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

More over, if your pull request contains JavaScript patches or features, you must include relevant unit tests.

Editor preferences are available in the [editor config](https://github.com/codeinchaos/httparchive.js/blob/master/.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.

## Community

Keep track of development and updates.

- Follow [@ahmadnassri](http://twitter.com/ahmadnassri) & [@codeinchaos](http://twitter.com/codeinchaos) on Twitter.
- Tweet [@codeinchaos](http://twitter.com/codeinchaos) with any questions/personal support requests.
- Implementation help may be found at Stack Overflow (tagged [`httparchive.js`](http://stackoverflow.com/questions/tagged/httparchive.js)).
- Read and subscribe to [My Blog](http://blog.ahmadnassri.com).

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, HTTPArchive.js is maintained under the Semantic Versioning guidelines. Sometimes we screw up, but we'll adhere to these rules whenever possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

- Breaking backward compatibility **bumps the major** while resetting minor and patch
- New additions without breaking backward compatibility **bumps the minor** while resetting the patch
- Bug fixes and misc changes **bumps only the patch**

For more information on SemVer, please visit <http://semver.org/>.

## Authors

**Ahmad Nassri**

- [@AhmadNassri](http://twitter.com/ahmadnassri)
- [ahmadnassri.com](http://ahmadnassri.com)

## License

Licensed under [the MIT license](LICENSE).
