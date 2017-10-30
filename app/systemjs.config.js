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
            'shim': 'npm:core-js/client/shim.min.js',
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
            'bootstrap': 'npm:bootstrap/dist/js/bootstrap.min.js',
            '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
            'popper': 'npm:popper.js/dist/umd/popper.js',
            'angular2-wizard': 'npm:angular2-wizard/dist/index.js',
            'moment': 'npm:moment/moment.js',
            'fullcalendar': 'npm:fullcalendar/dist/fullcalendar.js',
            'ap-angular2-fullcalendar': 'npm:ap-angular2-fullcalendar',

            'rxjs': 'npm:rxjs',
            'tslib': 'npm:tslib/tslib.js',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            'zone': 'npm:zone.js/dist/zone.js',
            // other libraries
            'dx-ui': 'gen/dx-ui',
            'ag-grid-angular': 'npm:ag-grid-angular',
            'ag-grid': 'npm:ag-grid',
        },
        meta: {
            'npm:jquery/dist/jquery.js': {
                format: 'global'
            },
            'npm:core-js/client/shim.min.js': {
                format: 'global'
            },
            'popper': {
                format: 'global'
            },
            'npm:bootstrap/dist/js/bootstrap.min.js': {
                format: 'global',
                deps: [ 'npm:jquery/dist/jquery.js', 'popper' ]
            },
            'npm:zone.js/dist/zone.js': {
                format: 'global',
                deps: [ 'npm:jquery/dist/jquery.js' ]
            }
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
            },
            'node_modules/angular2-wizard/dist/src/': {
                defaultExtension: 'js'
            },
            'ag-grid': {
                main: 'main.js'
            },
            'ag-grid-angular': {
                main: 'main.js'
            },
            'ap-angular2-fullcalendar': {
                main: 'index.js',
                defaultExtension: 'js'
            }
        },

        transpiler: 'plugin-traceur',
        transpilerRuntime: false
    });

    Promise.all([
        System.import('jquery'),
        System.import('shim'),
        System.import('popper'),
        System.import('bootstrap'),
        System.import('zone')

    ]).then(function() {
        System.import('gen/main/main').catch(function(err){ console.error(err); });
    });
})(this);
