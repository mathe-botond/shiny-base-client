import {Component} from '@angular/core';
import {DashboardPageComponent} from '../../pages/dashboard/dashboard.component';
import {OrderPageComponent} from '../../pages/order/order.component';
import {SettingsPageComponent} from '../../pages/settings/settings.component';
import {PrintPageComponent} from "../../print/print.component";
import {LayoutComponent} from "../layout/layout.component";
import {AuthPageComponent} from "../../pages/auth/auth.component";
import {NavigationService, TOKEN_APP, TOKEN_DASHBOARD, TOKEN_NEW_ORDER, TOKEN_SETTINGS} from "./navigation.service";

@Component({
    selector: 'shy-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.css']
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

