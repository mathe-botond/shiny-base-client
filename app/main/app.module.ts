import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app';
import {NavComponent} from './nav/nav';

import {RouterModule} from '@angular/router';
import {OrderPageComponent} from "./order/order.component";
import {HomePageComponent} from "./home/home";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(
            NavComponent.ROUTES,
            {enableTracing: true, useHash: true}
        )
    ],
    declarations: [AppComponent, NavComponent, OrderPageComponent, HomePageComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
