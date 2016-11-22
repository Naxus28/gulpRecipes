/***** There are 4 node glob patterns we normally use in gulp *****/
//1. * – * is a wildcard that matches everything in the current directory.
//2. **/*.scss – This is a more extreme version of the * pattern that 
// matches everything in the current directory and its child directories.
//3. *.+(pattern1|pattern2)– This matches files that end with either pattern1 or pattern2 (say .sass and .scss ).
//4. ! - This excludes files from a match.

var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var plugins = require('gulp-load-plugins')();

// minifyCss should be the last task
gulp.task('sass', function() {
  gulp.src('sass/**/*.scss')
  .pipe(plugins.sass())
  .pipe(plugins.concat('styles.min.css'))
  .pipe(plugins.minifyCss())
  .pipe(gulp.dest('dest/css'))
});

gulp.task('watch', ['sass'], function() {
  gulp.watch('sass/**/*.scss', ['sass'])
});

gulp.task('default', ['watch']);