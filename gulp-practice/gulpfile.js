// https://blog.engineyard.com/2014/frontend-dependencies-management-part-2
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('add-headers', ['fix-template'], function() {
    gulp.src('src/templates/layout.tpl')
        .pipe(plugins.header("<!-- This file is generated — do not edit by hand! -->\n"))
        .pipe(gulp.dest('src/templates'));

    gulp.src('public/js/site.js')
        .pipe(plugins.header("/* This file is generated — do not edit by hand! */\n"))
        .pipe(gulp.dest('public/js'));

    gulp.src('public/css/site.css')
        .pipe(plugins.header("/* This file is generated — do not edit by hand! */\n"))
        .pipe(gulp.dest('public/css'));
});

gulp.task('clean', function() {
    var generated = ['public/js/site.js', 'public/css/site.css', 'src/templates/layout.tpl'];
    return gulp.src(generated)
        .pipe(plugins.rimraf());
});

// gulp.task('dev', ['clean'], function() {
//     gulp.src('src/templates/layout.src.tpl')
//         .pipe(plugins.rename('layout.tpl'))
//         .pipe(gulp.dest('src/templates'));
// });

gulp.task('fix-paths', ['minify'], function() {
    gulp.src('public/css/site.css')
        .pipe(plugins.replace('../', '../bower_components/bootstrap/dist/'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('fix-template', ['minify'], function() {
    return gulp.src('public/layout.src.tpl')
        .pipe(plugins.rimraf())
        .pipe(plugins.rename('layout.tpl'))
        .pipe(gulp.dest('src/templates'));
});

gulp.task('minify', ['clean'], function() {
  return gulp.src('src/templates/layout.src.tpl')
        .pipe(plugins.usemin({
            assetsDir: 'public',
            css: [plugins.minifyCss(), 'concat'],
            js: [plugins.uglify(), 'concat']
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('watch', ['default'], function() {
    var watchFiles = [
        'src/templates/layout.src.tpl',
        'public/bower_components/*/dist/js/*.js',
        '!public/bower_components/*/dist/js/*.min.js',
        'public/bower_components/*/dist/*.js',
        'public/bower_components/*/dist/css/*.css',
        '!public/bower_components/*/dist/css/*.min.css',
        'public/bower_components/*/dist/font/*'
    ];

    gulp.watch(watchFiles, ['default']);
});

gulp.task('default', ['minify', 'fix-template', 'fix-paths', 'add-headers']);
