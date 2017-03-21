var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('default', function() {
  gulp.src('src/css/styles.css')
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(gulp.dest('dist'))
  }
);