module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('files.json'),
        clean: {
            all: {
                src: ['dist']
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
                dest: 'dist/zn.js'
            },
            data: {
                src: '<%= pkg.data %>',
                dest: 'dist/zn-data.js'
            }
        },
        uglify: {
            core: {
                src: ['dist/zn.js'],
                dest: 'dist/zn.minx.js',
                options: {
                    beautify: {
                        ascii_only: true
                    }
                }
            },
            data: {
                src: ['dist/zn-data.js'],
                dest: 'dist/zn-data.minx.js',
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
