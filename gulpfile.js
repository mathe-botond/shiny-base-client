var gulp = require('gulp');
var merge = require('merge2');
var cache = require('gulp-cached');

var ts = require('gulp-typescript');

var tsProject = ts.createProject('app/xtsconfig.json');

gulp.task('compile-ts', function () {
    var result = gulp.src(['app/**/*.ts', '!app/node_modules/**/*'])
        .pipe(cache('de-typing'))
        .pipe(tsProject());

    return merge([
        result.pipe(gulp.dest('./app/gen/'))
    ]);
});

gulp.task('watch', ['compile-ts'], function() {
    gulp.watch(['app/**/*.ts', '!app/node_modules/**/*'], ['compile-ts']);
});
