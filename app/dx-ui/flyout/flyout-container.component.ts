import {Component} from "@angular/core";
import {NotificationService} from "../common/notification.service";

@Component({
    selector: "flyout-container",
    templateUrl: "dx-ui/flyout/flyout-container.html",
    styleUrls: ["dx-ui/flyout/flyout-container.component.css"]
})
export class FlyoutContainerComponent {
    constructor(public notifications: NotificationService) {

    }
}