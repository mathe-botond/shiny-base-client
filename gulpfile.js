var gulp = require('gulp');
var merge = require('merge2');
var cache = require('gulp-cached');

var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject('app/xtsconfig.json');

gulp.task('compile-ts', function () {
    var result = gulp.src(['app/**/*.ts', '!app/node_modules/**/*'])
        .pipe(cache('de-typing'))
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        result.pipe(sourcemaps.mapSources(function(sourcePath, file) {
                return '/main/' + sourcePath;
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./app/gen/'))
    ]);
});

gulp.task('copy-resources', function () {
    var result = gulp.src(['app/**/*.css', 'app/**/*.html', '!app/node_modules/**/*', '!app/gen/**/*'])
        .pipe(cache('resources'));

    return merge([
        result.pipe(gulp.dest('./app/gen/'))
    ]);
});

gulp.task('watch', ['compile-ts'], function() {
    gulp.watch(['app/**/*.ts', '!app/node_modules/**/*', '!app/gen/**/*'],
        ['compile-ts']);
});
