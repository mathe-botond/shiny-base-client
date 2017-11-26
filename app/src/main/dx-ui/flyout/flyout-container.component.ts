import {Component} from "@angular/core";
import {NotificationService} from "../common/notification.service";

@Component({
    selector: 'flyout-container',
    template: require('./flyout-container.html'),
    styles: [require('./flyout-container.component.scss')]
})
export class FlyoutContainerComponent {
    constructor(public notifications: NotificationService) {

    }
}