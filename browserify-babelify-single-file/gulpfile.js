// check this repo: https://github.com/babel/babelify#options
// check this forum: https://github.com/babel/babelify/issues/157
var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var size = require('gulp-size');

// server config
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist' // serves index.html from /dist
    },
  });
});

//no need to import if we are not using the plugin directly, 
//but we need to have the node module if we are going to use the option "babelify"
//in the browserify transform like we do here
// var babelify = require('babelify'); 
var source = require('vinyl-source-stream');
var plugins = require('gulp-load-plugins')();

// the best way to use browserify is to import all js into a 'main.js' and use that file as the source for browserify
// use this if for any reason we cannot import all files to a 'main.js' and browserify that file only
gulp.task('scripts', function() {
  browserify({entries: 'src/js/main.js', debug: true}) // if we need to add more files we can pass something like ['src/main.js', 'src/first.js', 'src/second.js'] into 'browserify'
  // alternatively to the transform below we can add the following config in package.json
  // "browserify": {"transform": [["babelify", { "presets": ["es2015"] }]]}
  // and simply pass babelify, the plugin itself (no quotes) to the transform
  .transform("babelify", {presets: ["es2015"]}) 
  .bundle()
    .on('error', function (err) { console.error(err); })
  .pipe(source('script.min.js')) // in memory bundled file
  .pipe(buffer()) // need to buffer to be able to use other js plugins
  .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(plugins.uglify())
    .pipe(size())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.reload({ stream: true }))
});

// minify html
gulp.task('minifyHtml', function() {
  gulp.src('src/index.html')
    .pipe(plugins.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true }))
});

// order of tasks matter here: 'minifyHtml' has to be executed first for browser sync to work properly
gulp.task('watch', ['minifyHtml', 'scripts', 'browserSync'], function() {
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/index.html', ['minifyHtml']);
});


gulp.task('default', ['watch']);


