"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var core_2 = require("@ngx-translate/core");
var http_1 = require("@angular/common/http");
var http_loader_1 = require("@ngx-translate/http-loader");
var core_3 = require("@ngx-translate/core");
var app_1 = require("./app");
var nav_1 = require("./nav/nav");
var router_1 = require("@angular/router");
var home_1 = require("./home/home");
var order_1 = require("./order/order");
var settings_1 = require("./settings/settings");
var print_1 = require("./print/print");
var layout_1 = require("./layout/layout");
var auth_1 = require("./auth/auth");
function createTranslateLoader(http) {
    var base = 'file://' + __dirname + '/../locale/';
    return new http_loader_1.TranslateHttpLoader(http, base, '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(nav_1.NavComponent.ROUTES, { /*enableTracing: true,*/ useHash: true }),
                http_1.HttpClientModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: createTranslateLoader,
                        deps: [http_1.HttpClient]
                    }
                })
            ],
            declarations: [
                app_1.AppComponent,
                layout_1.LayoutComponent,
                nav_1.NavComponent,
                auth_1.AuthPageComponent,
                order_1.OrderPageComponent,
                home_1.HomePageComponent,
                settings_1.SettingsPageComponent,
                print_1.PrintPageComponent
            ],
            bootstrap: [app_1.AppComponent],
            providers: [core_3.TranslateService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
