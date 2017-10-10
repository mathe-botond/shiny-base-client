import {Component} from "@angular/core";
import {NotificationService} from "../common/notificationService";

@Component({
    selector: "flyout-container",
    templateUrl: "dx-ui/flyout/flyoutContainer.html",
    styleUrls: ["dx-ui/flyout/flyoutContainer.css"]
})
export class FlyoutContainerComponent {
    constructor(public notifications: NotificationService) {

    }
}