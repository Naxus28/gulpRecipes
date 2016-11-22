var gulp = require('gulp');
var babel = require('gulp-babel');
var plugins = require('gulp-load-plugins')();

// keep pipes in this order
gulp.task('scripts', function() {
  gulp.src('src/*.js')
    .pipe(babel()) // need to create .babelrc file and pass the presets or pass presets here. See below*
    .pipe(plugins.concat('script.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist'));
});

/* babel preset to work with uglify
  .pipe(babel({
    presets: ['es2015']
  }))
*/

// run task "scripts" then start watching files in /src 
// and run task scripts if they change
// run default task before watch task
gulp.task('watch', ['scripts'], function() {
  gulp.watch('src/*.js', ['scripts'])
});

gulp.task('default', ['watch']);


