import {NgModule} from "@angular/core";
import {NotificationService} from "./common/notification.service";
import {FlyoutContainerComponent} from "./flyout/flyout-container.component";
import {BusyComponent} from "./busy/busy.component";
import {BrowserModule} from "@angular/platform-browser";
import {FlyoutComponent} from "./flyout/flyout.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        BrowserModule,
        TranslateModule.forChild()
    ],
    declarations: [
        BusyComponent,
        FlyoutContainerComponent,
        FlyoutComponent
    ],
    exports: [
        BusyComponent,
        FlyoutContainerComponent
    ],
    providers: [NotificationService]
})
export class DxUiModule {
}