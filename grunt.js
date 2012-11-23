/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>*/'
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>',
              'server.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    lint: {
      files: ['grunt.js',
              'server.js',
              'libs/**/*.js',
              'routes/**/*.js'
              //'public/**/*.js'
      ]
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        plusplus: false,
        smarttabs:true
      },
      globals: {
        bucefalo: true,
        console: true,
        module: true,
        require: true,
        process: true,
        __dirname: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint');

};
