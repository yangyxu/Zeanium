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
            base: {
                src: '<%= pkg.zn %>'
            },
            options: {
                eqnull: true
            }
        },
        concat: {
            base: {
                src: '<%= pkg.zn %>',
                dest: 'dest/js/zn.js'
            }
        },
        uglify: {
            base: {
                src: ['dest/js/zn.js'],
                dest: 'dest/js/zn.minx.js',
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