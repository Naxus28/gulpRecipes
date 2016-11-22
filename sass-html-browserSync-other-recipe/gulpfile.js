var gulp = require('gulp');
var browserSync = require('browser-sync');
var plugins = require('gulp-load-plugins')();
var src = {
    scss: 'app/sass/**/*.scss',
    css:  'dist/css',
    html: 'app/index.html'
};

// replace html attribute values -- gulp-dom allows any DOM manipulation
gulp.task('replaceHtmlAttrValues', function() {
  // need to return stream here
  return gulp.src('app/index.html')
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

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'minifyHtml'], function() {
    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html, ['minifyHtml']); 
    // gulp.watch(src.html).on('change', reload); use this if there are not html tasks

    // initialize server after start watching the files
    browserSync.init({ server: 'dist' });
});

gulp.task('default', ['serve']);

