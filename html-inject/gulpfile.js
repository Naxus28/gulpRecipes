var injecthtml  = require('gulp-inject-html');
var gulp  = require('gulp');
 
gulp.task( 'build', function(){
  return gulp.src( './views/*.js' )
    .pipe( injecthtml({ 
      templates: 'templates',
      baseUrl: 'views',
      pathBuilder: [ '_buildTextPath', '_buildTextPath2' ]
    })) 
    .pipe( gulp.dest( './build/views' ));
})