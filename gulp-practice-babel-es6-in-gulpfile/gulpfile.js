var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var es = require('event-stream');

gulp.task('scripts', ['clean'], function() {
  var compiledCoffee = gulp.src('src/*.coffee').pipe(plugins.coffee());
  var js = gulp.src('src/*.js');

  // construct pipes of streams of events
  es.merge(js, compiledCoffee)
    .pipe(plugins.concat('script.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist'));
});

// clean dist folder before the new build
// Make sure to return the stream so that gulp knows the clean task 
// is asynchronous and waits for it to terminate before starting the dependent one.
gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
    .pipe(plugins.clean({force: true}))
});

// watch files in /src and run task scripts if they change
// run default task before watch task
gulp.task('watch', function() {
  gulp.watch('src/*.{js, coffee}', ['scripts'])
});

gulp.task('default', ['watch']);


