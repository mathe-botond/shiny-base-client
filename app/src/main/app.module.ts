import {APP_INITIALIZER, NgModule} from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TextMaskModule } from 'angular2-text-mask';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {AgGridModule} from 'ag-grid-angular';

import {AppComponent} from './app.component';
import {NavComponent} from './ui/nav/nav.component';
import {DashboardPageComponent} from './pages/dashboard/dashboard.component';
import {OrderPageComponent} from './pages/order/order.component';
import {SettingsPageComponent} from './pages/settings/settings.component';
import {PrintPageComponent} from './print/print.component';
import {LayoutComponent} from './ui/layout/layout.component';
import {AuthPageComponent} from './pages/auth/auth.component';
import {KeysPipe} from './common/pipes/keys.pipe';
import {SettingsService} from './pages/settings/settings.service';
import {DxUiModule} from './dx-ui/dx-ui.module';
import {ResponseHandler} from './common/response-handler.service';
import {NavigationService} from './ui/nav/navigation.service';
import {MaskService} from './common/mask.service';
import {ApiService} from './common/api.service';
import {PrintService} from './common/service/print.service';
import {CustomerComponent} from './pages/order/customer/customer.component';
import {ProductComponent} from './pages/order/product/product.component';
import {FormWizardModule} from 'angular2-wizard';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OrderListComponent} from './pages/dashboard/order-list/order-list.component';
import {CalendarPlannerComponent} from './pages/dashboard/calendar-planner/calendar-planner.component';
import {OrderService} from './common/service/order.service';
import {GridUtil} from './common/service/grid.util';
import {CustomerService} from './common/service/customer.service';
import {CalendarModule} from 'ap-angular2-fullcalendar/angular2-fullcalendar';

export function createTranslateLoader(http: HttpClient) {
    let base = 'file://' + __dirname + '/locale/';
    return new TranslateHttpLoader(http, base, '.json');
}

export function initShinyBaseApp(settings: SettingsService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise((resolve) => {
            settings.init();
            resolve();
        });
    };
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
        NgbModule.forRoot(),
        AgGridModule.withComponents([]),
        TextMaskModule, NguiAutoCompleteModule, FormWizardModule,
        CalendarModule,
        DxUiModule
    ],
    declarations: [
        AppComponent,
        LayoutComponent,
        NavComponent,
        AuthPageComponent,
        OrderPageComponent, CustomerComponent, ProductComponent,
        DashboardPageComponent, OrderListComponent,
        CalendarPlannerComponent,
        SettingsPageComponent,
        PrintPageComponent,
        KeysPipe],
    bootstrap: [AppComponent],
    providers: [SettingsService, ResponseHandler, NavigationService,
        MaskService, ApiService, PrintService, OrderService, CustomerService, GridUtil,
        {
            provide: APP_INITIALIZER,
            useFactory: initShinyBaseApp,
            deps: [SettingsService],
            multi: true
        }]
})
export class AppModule {
}
