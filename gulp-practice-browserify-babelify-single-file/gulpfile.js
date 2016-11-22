var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
//no need to import if we are not using the plugin directly, 
//but we need to have the node module if we are going to use the option "babelify"
//in the browserify transform like we do here
// var babelify = require('babelify'); 
var source = require('vinyl-source-stream');
var plugins = require('gulp-load-plugins')();

// the best way to use browserify is to import all js into a 'main.js' and use that file as the source for browserify
// use this if for any reason we cannot import all files to a 'main.js' and browserify that file only
gulp.task('scripts', function(done) {
  browserify('src/main.js') // if we need to add more files we can pass something like ['src/main.js', 'src/first.js', 'src/second.js'] into 'browserify'
  // alternatively to the transform below we can add the following config in package.json
  // "browserify": {"transform": [["babelify", { "presets": ["es2015"] }]]}
  // and simply pass babelify, the plugin itself (no quotes) to the transform
  .transform("babelify", {presets: ["es2015"]}) 
  .bundle()
    .on('error', function (err) { console.error(err); })
  .pipe(source('script.min.js')) // in memory bundled file
  .pipe(buffer()) // need to buffer to be able to use other js plugins
  .pipe(plugins.uglify())
  .pipe(gulp.dest('dist'));
});


// run task "scripts" then start watching files in /src 
// and run task scripts if they change
// run default task before watch task
gulp.task('watch', ['scripts'], function() {
  gulp.watch('src/*.js', ['scripts'])
});

gulp.task('default', ['watch']);


