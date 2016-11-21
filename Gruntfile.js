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
            base: {
                src: '<%= pkg.base %>'
            },
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
            base: {
                src: '<%= pkg.base %>',
                dest: 'dist/zn.base.js'
            },
            core: {
                src: '<%= pkg.core %>',
                dest: 'dist/zn.core.js'
            },
            data: {
                src: '<%= pkg.data %>',
                dest: 'dist/zn.data.js'
            }
        },
        uglify: {
            base: {
                src: ['dist/zn.base.js'],
                dest: 'dist/zn.base.minx.js',
                options: {
                    beautify: {
                        ascii_only: true
                    }
                }
            },
            core: {
                src: ['dist/zn.core.js'],
                dest: 'dist/zn.core.minx.js',
                options: {
                    beautify: {
                        ascii_only: true
                    }
                }
            },
            data: {
                src: ['dist/zn.data.js'],
                dest: 'dist/zn.data.minx.js',
                options: {
                    beautify: {
                        ascii_only: true
                    }
                }
            },
            zn: {
                src: ['dist/zn.core.js', 'dist/zn.data.js'],
                dest: 'dist/zn.minx.js',
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
