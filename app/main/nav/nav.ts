import {Component} from '@angular/core';
import {HomePageComponent} from '../home/home';
import {OrderPageComponent} from '../order/order';
import {SettingsPageComponent} from '../settings/settings';
import {PrintPageComponent} from "../print/print";
import {LayoutComponent} from "../layout/layout";
import {AuthPageComponent} from "../auth/auth";

type MenuItem = {
    label: string,
    target: string,
    icon: string
}

const TOKEN_APP = "app";
const TOKEN_HOME = "home";
const TOKEN_NEW_ORDER = "new-order";
const TOKEN_SETTIGNS = "settings";

@Component({
    selector: 'shy-nav',
    templateUrl: 'main/nav/nav.html',
    styleUrls: ['main/nav/nav.css']
})
export class NavComponent {
    static ROUTES = [
        {path: "auth", component: AuthPageComponent},
        {path: "print", component: PrintPageComponent},
        {path: TOKEN_APP, component: LayoutComponent, children: [
            {path: TOKEN_HOME, component: HomePageComponent},
            {path: TOKEN_NEW_ORDER, component: OrderPageComponent},
            {path: TOKEN_SETTIGNS, component: SettingsPageComponent},
        ]},
        {path: '**', redirectTo: TOKEN_APP + '/' + TOKEN_HOME, pathMatch: 'full' },
    ];

    constructor() {
    }

    menu: MenuItem[] = [
        { label: "menu.home", target: TOKEN_HOME, icon: "home"},
        { label: "menu.newOrder", target: TOKEN_NEW_ORDER, icon: "file"},
        { label: "menu.settings", target: TOKEN_SETTIGNS, icon:  "cog"},
        { label: "menu.quit", target: "quit", icon:  "log-out"}
    ];
}

