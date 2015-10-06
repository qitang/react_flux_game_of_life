module.exports = function(grunt) {
   // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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

};