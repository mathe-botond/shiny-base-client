"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var home_1 = require("../home/home");
var order_1 = require("../order/order");
var settings_1 = require("../settings/settings");
var print_1 = require("../print/print");
var layout_1 = require("../layout/layout");
var auth_1 = require("../auth/auth");
var TOKEN_APP = "app";
var TOKEN_HOME = "home";
var TOKEN_NEW_ORDER = "new-order";
var TOKEN_SETTIGNS = "settings";
var NavComponent = /** @class */ (function () {
    function NavComponent() {
        this.menu = [
            { label: "menu.home", target: TOKEN_HOME, icon: "home" },
            { label: "menu.newOrder", target: TOKEN_NEW_ORDER, icon: "file" },
            { label: "menu.settings", target: TOKEN_SETTIGNS, icon: "cog" },
            { label: "menu.quit", target: "quit", icon: "log-out" }
        ];
    }
    NavComponent.ROUTES = [
        { path: "auth", component: auth_1.AuthPageComponent },
        { path: "print", component: print_1.PrintPageComponent },
        { path: TOKEN_APP, component: layout_1.LayoutComponent, children: [
                { path: TOKEN_HOME, component: home_1.HomePageComponent },
                { path: TOKEN_NEW_ORDER, component: order_1.OrderPageComponent },
                { path: TOKEN_SETTIGNS, component: settings_1.SettingsPageComponent },
            ] },
        { path: '**', redirectTo: TOKEN_APP + '/' + TOKEN_HOME, pathMatch: 'full' },
    ];
    NavComponent = __decorate([
        core_1.Component({
            selector: 'shy-nav',
            templateUrl: 'main/nav/nav.html',
            styleUrls: ['main/nav/nav.css']
        }),
        __metadata("design:paramtypes", [])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
