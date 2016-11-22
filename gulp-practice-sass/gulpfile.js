var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('sass', function() {
  gulp.src('sass/*.scss')
  .pipe(plugins.sass())
  .pipe(gulp.dest('dest/css'))
});

gulp.task('default', ['sass']);