module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('files.json'),
        clean: {
            all: {
                src: ['lib']
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
                dest: 'lib/zn.js'
            },
            data: {
                src: '<%= pkg.data %>',
                dest: 'lib/zn-data.js'
            }
        },
        uglify: {
            core: {
                src: ['lib/zn.js'],
                dest: 'lib/zn.minx.js',
                options: {
                    beautify: {
                        ascii_only: true
                    }
                }
            },
            data: {
                src: ['lib/zn-data.js'],
                dest: 'lib/zn-data.minx.js',
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
