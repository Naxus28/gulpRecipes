var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var browserify = require('browserify');

var sources = {
  html: 'src/index.html',
  js: 'src/js/*.js',
  coffee: 'src/coffee/*.coffee',
  compiledCoffee: 'src/js/compiledCoffee/*.js'
};

var outputFiles = {
  minJs: 'script.min.js'
}

// browser-sync config
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist' // serves index.html from /dist
    },
  });
});

// coffee task
gulp.task('coffee', function() {
  // need to return this stream so 'scripts' processes 'sources.compiledCoffee' when 'watch' task runs for coffee files
  return gulp.src(sources.coffee)
    .pipe(plugins.coffeescriptConcat('compiledCoffee.coffee'))
    .pipe(plugins.coffee())
      .on('error', function(error) {
        plugins.util.log(plugins.util.colors.magenta(error))
      })
    .pipe(gulp.dest('src/js/compiledCoffee'))
});

// scripts task--register 'coffee' as a dependency of 'scripts' so it always runs first
gulp.task('scripts', ['coffee'], function() {
   gulp.src([sources.js, sources.compiledCoffee])
    .pipe(plugins.concat(outputFiles.minJs))
    .pipe(plugins.uglify())
      .on('error', function(error) {
         plugins.util.log(plugins.util.colors.red('Uglify error: ', error));
      })
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true}))
});

// html task to bundle html into /dist so we can serve that dir
gulp.task('minifyHtml', function() {
  gulp.src(sources.html)
    .pipe(plugins.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true }))
});

// run ['browserSync', 'scripts', 'minifyHtml'] before watch task
gulp.task('watch', ['browserSync', 'scripts', 'minifyHtml'], function() {
  gulp.watch(sources.html, ['minifyHtml']);
  gulp.watch(['src/js/*.js', 'src/coffee/*.coffee'], ['scripts']);
});

gulp.task('default', ['watch']);


