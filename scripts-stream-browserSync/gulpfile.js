var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var es = require('event-stream');

var src = {
  html: 'src/index.html',
  js: 'src/*.js',
  coffee: 'src/*.coffee',
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

// scripts task: js and coffee using node 'event-stream'
gulp.task('scripts', ['minifyHtml'], function() {
  var compiledCoffee = gulp.src(src.coffee).pipe(plugins.coffee());
  var js = gulp.src(src.js);

  // construct pipes of streams of events
  es.merge(js, compiledCoffee)
    .pipe(plugins.concat(src.minJs))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true}))
});

// html task to bundle html into /dist so we can serve that dir
gulp.task('minifyHtml', function() {
  gulp.src(src.html)
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true }))
});

// watch files in /src and run task scripts if they change
// run default task before watch task
gulp.task('watch', ['browserSync', 'scripts'], function() {
  // another matching pattern could be .+(js|coffee)
  gulp.watch(src.html, ['minifyHtml']);
  gulp.watch('src/*.{js, coffee}', ['scripts']);
});

gulp.task('default', ['watch']);


