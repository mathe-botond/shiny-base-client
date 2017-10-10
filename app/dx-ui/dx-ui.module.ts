import {NgModule} from "@angular/core";
import {NotificationService} from "./common/notificationService";
import {FlyoutContainerComponent} from "./flyout/flyoutContainer";
import {BusyComponent} from "./busy/busy";
import {BrowserModule} from "@angular/platform-browser";
import {FlyoutComponent} from "./flyout/flyout";
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