// add folders and files to test this
// keep in mind we need to add browsersSync.reload({stream: true}) after the dest method so the 
// reload happens only after the changes--using a global reload task may need more configuration 
// to work with watchify because the bundle method happens after the reload task ends
// say we have something like this, the reload method finishes before js is bundled
/*
 * reload server
 */
// gulp.task('reload', () => {
//   browserSync.reload();
// });


/*
 * serve
 */
// gulp.task('serve', ['build'], () => {
//   browserSync({
//     server: {
//       baseDir: config.paths.development
//     }
//   });

//   let htmlSrc = path.join(config.paths.src, '/index.html');
//   let sassSrc = path.join(config.paths.src, '/styles/**/*.scss');
//   let jsSrc = path.join(config.paths.src, '/js/**/*.js');
//   gulp.watch(htmlSrc, ['html', 'inject-js', 'inject-css', 'reload']);
//   gulp.watch(sassSrc, ['sass', 'inject-css', 'reload']);
//   gulp.watch(jsSrc, () => {
//     runSequence(
//       'scripts',
//       'reload'
//     );
//   });
// }); 


/*
  * scripts
  */
gulp.task('scripts', () => {
   return bundleJs();
 }); 

  // handle browerify options + watchify + event handlers 
  function browserifyBundler() {
    let entries = glob.sync(path.join(config.paths.src, '/js/**/*.js')); // creates an array with the js files
    let browserifyCustomOpts = { entries, debug: true };
    let opts = assign({}, watchify.args, browserifyCustomOpts);
    let bundler = watchify(browserify(opts));
    // add transform and event listeners
    bundler.transform('babelify', {presets: ['es2015']});
    bundler.on('update', bundleJs); // bundle on any update--only bundles what changes
    bundler.on('log', (logInfo) => config.logCustomMessage('Browserify bundled js: ' + logInfo)); // logs plugin message

    return bundler;
}

  function bundleJs() {
    let bundler = browserifyBundler();

    return bundler.bundle()
      .on('error', (err) => plugins.util.log(config.errorHandler('Browserify Error')))
      .pipe(source('scripts.js')) // in memory bundled file
      .pipe(buffer())// need to buffer to be able to use other js plugins
      // .pipe(plugins.sourcemaps.init({loadMaps: true})) 
      // other js plugins need to go here
      // .pipe(plugins.uglify())
      .pipe(plugins.header('/*****This file is generated via gulp. Do not edit it.*****/\n\n'))
      .pipe(plugins.size())
      // .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(path.join(config.paths.development, '/js')))
 }