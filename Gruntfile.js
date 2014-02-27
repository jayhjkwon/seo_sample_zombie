module.exports = function (grunt) {
  grunt.initConfig({
    watch : {
      options: {
        livereload: true
      },
      less : {
        tasks : 'less:dev',
        files : 'public/stylesheets/app.less'
      },
      handlebars: {
        tasks : 'emberTemplates:dev',
        files : 'public/templates/**/*.hbs'
      },
      uglify : {
        tasks : 'uglify:dev',
        files : 'public/javascripts/**/*.js'
      },
      less : {
        tasks : 'less:dev',
        files : 'public/stylesheets/**/*.less'
      }
    },

    emberTemplates: {
      dev: {
        options: {
          /* This will reduce template compilation time during development */
          precompile: false,  
          templateBasePath: /public\/templates\//
        },
        files: {
          'public/dist/templates.js': 'public/templates/**/*.hbs'
        }
      },
      dist: {
        options: {
          templateBasePath: /public\/templates\//
        },
        files: {
          'public/dist/templates.js': 'public/templates/**/*.hbs'
        }
      }
    },
    
    uglify: {      
      vendor: {
        files: {
          'public/dist/vendor.min.js':
          [
            'public/vendor/jquery/jquery.js',
            'public/vendor/handlebars/handlebars.js',
            'public/vendor/ember/ember.js',
            'public/vendor/markdown/lib/markdown.js',
            'public/vendor/lodash/dist/lodash.js'
          ]
        }
      },

      dev: {
        options: {
          mangle: false,
          sourceMap: true,
          beautify: true,
          compress: false
        },
        files: {
          'public/dist/app.min.js': 'public/javascripts/**/*.js'
        }
      },

      dist: {
        files: {
          'public/dist/app.min.js': 'public/javascripts/**/*.js'
        }
      }
    },

    less: {
      dev: {
        options: {
          paths    : ['public/stylesheets']
        },
        files: {
          'public/dist/app.min.css': ['public/stylesheets/**/*.less']
        }
      },
      dist: {
        options: {
          paths    : ['public/stylesheets'],
          cleancss : true
        },
        files  : {
          'public/dist/app.min.css': ['public/stylesheets/**/*.less']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dev_watch', ['emberTemplates:dev', 'uglify:vendor', 'uglify:dev', 'less:dev', 'watch']);
  grunt.registerTask('dist_build', ['emberTemplates:dist', 'uglify:vendor', 'uglify:dist', 'less:dist']);
};