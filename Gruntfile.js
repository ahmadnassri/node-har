module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n' +
              ' * HTTPArchive.js v<%= pkg.version %> (<%= pkg.repository.url %>)\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
              ' */\n\n',

        clean: {
            dist: ['dist'],
            all: ['dist', 'bower_components', 'node_modules'],
            report: ['test/report']
        },

        concat: {
            options: {
                banner: '<%= banner %>'
            },

            dist: {
                files: {
                    'dist/HTTPArchive.js': [
                        'src/HTTPArchiveLog.js',
                        'src/HTTPArchivePage.js',
                        'src/HTTPArchiveEntry.js',
                        'src/HTTPArchiveRequest.js',
                        'src/HTTPArchiveResponse.js',
                        'src/HTTPArchiveUtils.js'
                    ]
                }
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },

            dist: {
                files: {
                    'dist/HTTPArchive.min.js': 'dist/HTTPArchive.js'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },

            dist: ['Gruntfile.js', 'src/*.js'],
        },

        qunit: {
            dist: {
                options: {
                    urls: ['test/index.html'],
                    coverage: {
                        src: ['src/*.js'],
                        instrumentedFiles: 'tmp/',
                        htmlReport: 'test/report/coverage',
                        lcovReport: 'test/report/lcov',
                        linesThresholdPct: 0
                    }
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    keepalive: true
                }
            }
        },

        coveralls: {
            all: {
                src: 'test/report/lcov/lcov.info'
            }
        },

        watch: {
            scripts: {
                files: ['src/*.js'],
                tasks: ['jshint', 'concat'],
                options: {
                    spawn: false,
                }
            }
        },

        bump: {
            files: ['package.json', 'bower.json']
        }
    });

    grunt.registerTask('default', [
        'test',
        'concat',
        'watch'
    ]);

    grunt.registerTask('test', [
        'clean:report',
        'jshint',
        'qunit'
    ]);

    grunt.registerTask('release', [
        'test',
        'default',
        'uglify'
    ]);
};
