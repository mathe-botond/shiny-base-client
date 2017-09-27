var gulp = require('gulp');
var merge = require('merge2');
var cache = require('gulp-cached');

var ts = require('gulp-typescript');

gulp.task('compile-ts', function () {
    var result = gulp.src('./app/main/**/*.ts')
        .pipe(cache('de-typing'))
        .pipe(ts({
            target: "es5",
            lib: ["es2015", "dom"],
            module: "commonjs",
            moduleResolution: "node",
            sourceMap: true,
            noImplicitAny: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        }));

    return merge([
        result.pipe(gulp.dest('./app/gen/'))
    ]);
});

gulp.task('watch', ['compile-ts'], function() {
    gulp.watch('./app/main/**/*.ts', ['compile-ts']);
});
