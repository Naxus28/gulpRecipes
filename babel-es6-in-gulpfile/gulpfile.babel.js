'use strict';
import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import coffee from 'gulp-coffee';
import es from 'event-stream';

gulp.task('scripts', () => {
  let compiledCoffee = gulp.src('src/*.coffee').pipe(coffee());
  let js = gulp.src('src/*.js');

  // construct pipes of streams of events
  es.merge(js, compiledCoffee)
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// watch files in /src and run task scripts if they change
// run default task before watch task
gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/*.{js, coffee}', ['scripts'])
});

gulp.task('default', ['watch']);


