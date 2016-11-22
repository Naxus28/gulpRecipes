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
      // 'this' refers to the Document
      // manipulate the DOM using any DOM methods
      this.querySelector('body').setAttribute('class', 'gulp-html');
      return this; // return the entire Document
    }))
    .pipe(gulp.dest('dist'));
});

// minify html
gulp.task('minifyHtml', ['replaceHtmlAttrValues'], function() {
  gulp.src('dist/index.html')
    .pipe(plugins.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true }))
});

// the order of task dependencies doesn't matter
gulp.task('watch', ['minifyHtml', 'browserSync'], function() {
  gulp.watch('app/index.html', ['minifyHtml'])
});

gulp.task('default', ['watch']);

