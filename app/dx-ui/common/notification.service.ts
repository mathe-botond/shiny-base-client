import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {DxNotification, MessageType} from "../dx-ui.model";

@Injectable()
export class NotificationService {
    notificationList: DxNotification[] = [];

    busyMessage: string = "";
    busyVisible: boolean = false;

    showBusy(message : string) {
        this.busyMessage = message;
        this.busyVisible = true;
    }

    hideBusy() {
        this.busyMessage = "";
        this.busyVisible = false;
    }

    notify(notification: DxNotification) {
        this.notificationList.push(notification);
        notification.expire = () => {
            let index = this.notificationList.indexOf(notification);
            if(index !== -1) {
                this.notificationList.splice(index, 1);
            }
        };
    }

    error(message: string) {
        this.notify(new DxNotification(message, MessageType.Fail));
    }

    success(message: string) {
        this.notify(new DxNotification(message, MessageType.Success));
    }
}
