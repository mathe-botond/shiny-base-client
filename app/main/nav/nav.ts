import { Component } from '@angular/core';
import { OrderPageComponent } from '../order/order.component';
import { HomePageComponent } from '../home/home';

type MenuItem = {
    label: string,
    target: string,
    icon: string
}

const TOKEN_NEW_ORDER = "new-order";

@Component({
    selector: 'shy-nav',
    templateUrl: 'main/nav/nav.html',
    styleUrls: ['main/nav/style/navbar-side.css']
})
export class NavComponent {
    static ROUTES = [
        {path: '', component: HomePageComponent},
        {path: TOKEN_NEW_ORDER, component: OrderPageComponent},
        {path: '**', redirectTo: '', pathMatch: 'full' },
    ];

    constructor() {}

    menu: MenuItem[] = [
        { label: "i18n.menu.home", target: '', icon: "home"},
        { label: "i18n.menu.new-order", target: TOKEN_NEW_ORDER, icon: "file"},
        { label: "i18n.menu.quit", target: "quit", icon:  "log-out"}
    ];
}

