module.exports = function (grunt) {
    grunt.initConfig({
    	watch: {
            scripts: {
                files: ["src/**/*.coffee"],
                tasks: ["coffee"],
                options: {
                    nospawn: true,
                    spawn: false
                }
            },
            lib: {
                files: ["lib/**/*.js"],
                tasks: ["uglify"]
            },

            css: {
                files: ["src/css/*.less"],
                tasks: ["less"],
                options: {
                    nospawn: true,
                    spawn: false
                }
            },

            configFiles: {
                files: [ 'Gruntfile.js'],
                tasks: ["coffee", "less", "uglify"],
                options: {
                    reload: true
                }
            }
        },
        uglify: {
//            css: {
//                files: {
//                    'dist/css/style.css': ['src/css/style.css']
//                }
//            },
            lib: {
                files: {
                    "dist/lib/libs.js": ["lib/*.js"]
                }
            }

        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'src/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/',
                ext: '.css'
            }
        },

	    less: {
		  build: {
		      options: {
			      paths: ['src/css']
			  },
			  files: {
		          'dist/css/blabla.css': 'src/css/blabla.less'	 
			  }
		  }	  
	    },

        coffee: {
            glob_to_multiple: {
                expand: true,
                cwd: 'src/js',
                src: ['**/*.coffee'],
                dest: 'dist/js',
                ext: '.js'
            }
        },

        copy: {
          main: {
              src: "res/**",
              dest: "dist/"
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask("buildlib", ["uglify"]);
    grunt.registerTask("default", ["check"]);
    grunt.registerTask("build", ["coffee"]);
    grunt.registerTask("buildcss", ["cssmin", "less"]);
    grunt.registerTask("copyres", ["copy"]);
};
