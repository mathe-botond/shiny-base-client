import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {MenuItem} from "../model";

export const TOKEN_APP = "app";
export const TOKEN_DASHBOARD = "dashboard";
export const TOKEN_NEW_ORDER = "order";
export const TOKEN_SETTINGS = "settings";

@Injectable()
export class NavigationService {
    menu: MenuItem[] = [
        { label: "menu.dashboard", target: TOKEN_DASHBOARD, icon: "list"},
        { label: "menu.newOrder", target: TOKEN_NEW_ORDER, icon: "tags"},
        { label: "menu.settings", target: TOKEN_SETTINGS, icon:  "cog"}
        /* , { label: "menu.logout", target: "logout", icon:  "log-out"}*/
    ];

    constructor(private router: Router) {

    }

    goToDashboard() {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigateByUrl(TOKEN_APP + '/' + TOKEN_DASHBOARD);
    }
}
