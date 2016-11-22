var gulp = require('gulp');
var browserSync = require('browser-sync');
var plugins = require('gulp-load-plugins')();

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist' // serves index.html from /dist
    },
  });
});

gulp.task('replaceHtmlAttrValues', function() {
  gulp.src('app/index.html')
    .pipe(plugins.dom(function(){
      this.getElementById('hrefLink').setAttribute('href', 'css/styles.min.css');
      return this;
    }))
    .pipe(gulp.dest('dist'));
});

// minify html
gulp.task('minifyHtml', ['replaceHtmlAttrValues'], function() {
  gulp.src('dist/index.html')
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true }))
});

// minifyCss should be the last task
gulp.task('sass', function() {
  gulp.src('app/sass/**/*.scss')
    .pipe(plugins.sass())
    .pipe(plugins.concat('styles.min.css'))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true }))
});

// the order of task dependencies doesn't matter
gulp.task('watch', ['minifyHtml', 'sass', 'browserSync'], function() {
  gulp.watch('app/index.html', ['minifyHtml']);
  gulp.watch('app/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);

