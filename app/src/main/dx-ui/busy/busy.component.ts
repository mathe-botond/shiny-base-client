import {Component} from "@angular/core";
import {NotificationService} from "../common/notification.service";

@Component({
    selector: "busy",
    template: require('./busy.component.html'),
    styles: [require('./busy.component.scss')]
})
export class BusyComponent {
    public constructor(public busyService : NotificationService) {
    }
}
