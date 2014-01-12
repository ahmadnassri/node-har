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
            all: ['dist', 'bower_components', 'node_modules']
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
            all: ['test/*.html']
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
        'concat'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'qunit'
    ]);

    grunt.registerTask('release', [
        'test',
        'default',
        'uglify'
    ]);
};
