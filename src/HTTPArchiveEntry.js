(function (window) {
    'use strict';

    var HTTPArchiveEntry = window.HTTPArchiveEntry = function (options) {
        Object.defineProperties(this, {
            props: {
                enumerable: false,
                configurable: false,
                value: {
                    _startedDateTime: new Date,
                    _time: new Date,
                    _request: null,
                    _response: null,
                }
            },

            startedDateTime: {
                enumerable: true,

                get: function () {
                    return this.props._startedDateTime;
                },

                set: function (value) {
                    if (!(value instanceof Date)) {
                        try {
                            value = new Date(value);
                        } catch (e) {
                            throw new Error('invalid date object.');
                        }
                    }

                    this.props._startedDateTime = value;
                }
            },

            time: {
                enumerable: true,

                get: function () {
                    return this.props._time;
                },

                set: function (value) {
                    if (typeof value !== 'number') {
                        throw new Error('invalid time value.');
                    }

                    this.props._time = value;
                }
            },

            request: {
                enumerable: true,

                get: function () {
                    return this.props._request;
                },

                set: function (value) {
                    if (!(value instanceof HTTPArchiveRequest)) {
                        try {
                            value = new HTTPArchiveRequest(value);
                        } catch (e) {
                            throw new Error('invalid request object.');
                        }
                    }

                    this.props._request = value;
                }
            },

            response: {
                enumerable: true,

                get: function () {
                    return this.props._response;
                },

                set: function (value) {
                    if (!(value instanceof HTTPArchiveResponse)) {
                        try {
                            value = new HTTPArchiveResponse(value);
                        } catch (e) {
                            throw new Error('invalid response object.');
                        }
                    }

                    this.props._response = value;
                }
            }
        });

        this.setOptions(options);
    };
})(window || this);
