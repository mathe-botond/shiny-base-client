(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            'app': 'gen',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@ngx-translate/core': 'npm:@ngx-translate/core/bundles/core.umd.js',
            '@ngx-translate/http-loader': 'npm:@ngx-translate/http-loader/bundles/http-loader.umd.js',
            'angular2-text-mask': 'npm:angular2-text-mask/dist/angular2TextMask.js',
            'text-mask-core': 'npm:text-mask-core',
            '@ngui/auto-complete': 'npm:@ngui/auto-complete/dist/auto-complete.umd.js',
            'electron': '@node/electron',
            'jquery': 'npm:jquery/dist/jquery.js',

            'rxjs': 'npm:rxjs',
            'tslib': 'npm:tslib/tslib.js',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',

            // other libraries
            'dx-ui': 'gen/dx-ui'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                defaultExtension: 'js',
                meta: {
                    './*.js': {
                        loader: 'systemjs-angular-loader.js'
                    }
                }
            },
            '@ngx-translate/core': {
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'text-mask-core': {
                defaultExtension: 'js'
            },
            'dx-ui': {
                defaultExtension: 'js'
            }
        }
    });
})(this);
