module.exports = function(grunt) {
   // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['./client/**/*.js'],
        tasks: ['build'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
    },
    uglify: {
      options: {   
         mangle: true, 
         compress: {  
             sequences: true,    
             dead_code: true,   
             unused: true,    
             conditionals: true, 
             booleans: true,    
             if_return: true,     
             join_vars: true    } 
         },  
      js: {    
        src: ['./client/js/bundle.js'],
        dest: './client/js/bundle.min.js'  
      }
    },
    express: {
      options: {
        port: process.env.PORT || 3000
      },
      dev: {
        options: {
          script: 'server/index.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
      }
    },
    browserify: {
          dist: {
             options: {
                transform: [
                   ["babelify", {
                      loose: "all"
                   }]
                ]
             },
             files: {
                "./client/js/bundle.js": ["./client/js/app.js"]
             }
          }
       }
  });

 

  // Default task(s).
  grunt.registerTask('build', ['browserify', 'uglify']);
  grunt.registerTask('serve',['build','express:dev','watch'])

};