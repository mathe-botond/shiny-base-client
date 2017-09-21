var gulp = require('gulp');
var electron = require('gulp-electron');
var packageJson = require('./app/package.json');
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
        result.pipe(gulp.dest('./app/dist/'))
    ]);
});

gulp.task('watch', ['compile-ts'], function() {
    gulp.watch('./app/main/**/*.ts', ['compile-ts']);
});

gulp.task('electron', function() {
    gulp.src("")
        .pipe(electron({
            src: './app',
            packageJson: packageJson,
            release: './release',
            cache: './cache',
            version: 'v1.7.5',
            packaging: true,
            token: '',
            platforms: ['win32-ia32'],
            platformResources: {
                win: {
                    "version-string": packageJson.version,
                    "file-version": packageJson.version,
                    "product-version": packageJson.version,
                    "icon": 'gulp-electron.ico'
                }
            }
        }))
        .pipe(gulp.dest(""));
});