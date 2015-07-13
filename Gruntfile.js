module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('files.json'),
        clean: {
            all: {
                src: ['dest']
            }
        },
        jshint: {
            core: {
                src: '<%= pkg.core %>'
            },
            data: {
                src: '<%= pkg.data %>'
            },
            options: {
                eqnull: true
            }
        },
        concat: {
            core: {
                src: '<%= pkg.core %>',
                dest: 'dest/js/zn.js'
            },
            data: {
                src: '<%= pkg.data %>',
                dest: 'dest/js/zn-data.js'
            }
        },
        uglify: {
            core: {
                src: ['dest/js/zn.js'],
                dest: 'dest/js/zn.minx.js',
                options: {
                    beautify: {
                        ascii_only: true
                    }
                }
            },
            data: {
                src: ['dest/js/zn-data.js'],
                dest: 'dest/js/zn-data.minx.js',
                options: {
                    beautify: {
                        ascii_only: true
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib');

    grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify']);
    grunt.registerTask('test', ['clean', 'concat']);

};