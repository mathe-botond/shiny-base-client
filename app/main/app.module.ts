import {NgModule} from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateService} from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';
import {NguiAutoCompleteModule} from "@ngui/auto-complete";


import {AppComponent} from './app';
import {NavComponent} from './nav/nav';

import {DashboardPageComponent} from "./dashboard/dashboard";
import {OrderPageComponent} from "./order/order";
import {SettingsPageComponent} from "./settings/settings";
import {PrintPageComponent} from "./print/print";
import {LayoutComponent} from "./layout/layout";
import {AuthPageComponent} from "./auth/auth";
import {KeysPipe} from "./common/pipes/KeysPipe";
import {SettingsService} from "./settings/settingsService";
import {DxUiModule} from "../dx-ui/dx-ui.module";
import {ResponseHandler} from "./common/responseHandler";
import {NavigationService} from "./nav/navigationService";

export function createTranslateLoader(http: HttpClient) {
    let base = 'file://' + __dirname + '/../../locale/';
    return new TranslateHttpLoader(http, base, '.json');
}

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule.forRoot(
            NavComponent.ROUTES,
            {/*enableTracing: true,*/ useHash: true}
        ),
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        TextMaskModule,
        NguiAutoCompleteModule,
        DxUiModule
    ],
    declarations: [
        AppComponent,
        LayoutComponent,
        NavComponent,
        AuthPageComponent,
        OrderPageComponent,
        DashboardPageComponent,
        SettingsPageComponent,
        PrintPageComponent,
        KeysPipe],
    bootstrap: [AppComponent],
    providers: [TranslateService, SettingsService, ResponseHandler, NavigationService]
})
export class AppModule {
}
