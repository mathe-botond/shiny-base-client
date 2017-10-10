import {Component} from "@angular/core";
import {NotificationService} from "../common/notificationService";

@Component({
    selector: "busy",
    templateUrl: "dx-ui/busy/busy.html",
    styleUrls: ["dx-ui/busy/busy.css"]
})
export class BusyComponent {
    public constructor(public busyService : NotificationService) {
    }
}
