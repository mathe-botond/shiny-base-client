import {Component} from '@angular/core';
import {DashboardPageComponent} from '../dashboard/dashboard';
import {OrderPageComponent} from '../order/order';
import {SettingsPageComponent} from '../settings/settings';
import {PrintPageComponent} from "../print/print";
import {LayoutComponent} from "../layout/layout";
import {AuthPageComponent} from "../auth/auth";
import {NavigationService, TOKEN_APP, TOKEN_DASHBOARD, TOKEN_NEW_ORDER, TOKEN_SETTINGS} from "./navigationService";

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
            {path: TOKEN_DASHBOARD, component: DashboardPageComponent},
            {path: TOKEN_NEW_ORDER, component: OrderPageComponent},
            {path: TOKEN_SETTINGS, component: SettingsPageComponent},
        ]},
        {path: '**', redirectTo: TOKEN_APP + '/' + TOKEN_DASHBOARD, pathMatch: 'full' },
    ];

    constructor(public navigation: NavigationService) {
    }
}

