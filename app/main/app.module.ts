import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateService} from '@ngx-translate/core';

import {AppComponent} from './app';
import {NavComponent} from './nav/nav';

import {RouterModule} from '@angular/router';
import {HomePageComponent} from "./home/home";
import {OrderPageComponent} from "./order/order";
import {SettingsPageComponent} from "./settings/settings";
import {PrintPageComponent} from "./print/print";
import {LayoutComponent} from "./layout/layout";
import {AuthPageComponent} from "./auth/auth";

export function createTranslateLoader(http: HttpClient) {
    let base = 'file://' + __dirname + '/../locale/';
    return new TranslateHttpLoader(http, base, '.json');
}

@NgModule({
    imports: [
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
        })
    ],
    declarations: [
        AppComponent,
        LayoutComponent,
        NavComponent,
        AuthPageComponent,
        OrderPageComponent,
        HomePageComponent,
        SettingsPageComponent,
        PrintPageComponent],
    bootstrap: [AppComponent],
    providers: [TranslateService]
})
export class AppModule {
}
