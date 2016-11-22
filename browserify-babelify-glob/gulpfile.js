var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var glob = require('glob');
var plugins = require('gulp-load-plugins')();

// the best way to use browserify is to import all js into a 'main.js' and use that file as the source for browserify
// use this if for any reason we cannot import all files to a 'main.js' and browserify that file only
gulp.task('scripts', function(done) {
    glob('src/*.js', function(err, files) {
      if(err) console.log('gulp error: ', err);

      files.map(function(entry) {
        return browserify({ entries: [entry] })
          .transform(babelify)
          .bundle()
            .on('error', function (err) { console.error(err); })
          .pipe(source('script.min.js')) // in memory bundled file
          .pipe(buffer()) // need to buffer to be able to use other js plugins
          .pipe(plugins.uglify())
          .pipe(gulp.dest('dist'));
        });
    })
});


// run task "scripts" then start watching files in /src 
// and run task scripts if they change
// run default task before watch task
gulp.task('watch', ['scripts'], function() {
  gulp.watch('src/*.js', ['scripts'])
});

gulp.task('default', ['watch']);
