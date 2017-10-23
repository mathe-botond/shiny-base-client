import {Component} from "@angular/core";
import {NotificationService} from "../common/notification.service";

@Component({
    selector: "busy",
    templateUrl: "dx-ui/busy/busy.component.html",
    styleUrls: ["dx-ui/busy/busy.component.css"]
})
export class BusyComponent {
    public constructor(public busyService : NotificationService) {
    }
}
