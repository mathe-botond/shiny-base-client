import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Customer, Order} from "../../app.model";
import {SettingsService} from "../settings/settings.service";
import {OrderRemoteService} from "./order.service";
import {NotificationService} from "../../../dx-ui/common/notification.service";
import {DxNotification, MessageType} from "../../../dx-ui/dx-ui.model";
import {NavigationService} from "../../ui/nav/navigation.service";
import {PrintService} from "../../common/service/print.service";
import {WizardComponent} from "angular2-wizard";

@Component({
    templateUrl: './order.component.html',
    providers: [OrderRemoteService]
})
export class OrderPageComponent implements AfterViewInit {
    order: Order;

    @ViewChild('wizard') wizard: WizardComponent;

    constructor(
            public settings: SettingsService,
            private remote: OrderRemoteService,
            private notificationService: NotificationService,
            private navigation: NavigationService,
            private printer: PrintService) {

        this.init();
    };

    private init() {
        this.order = new Order();
        this.order.customer = new Customer();
        this.order.customer.phone = '40';
    }

    ngAfterViewInit(): void {
        console.log(this.wizard);
        setTimeout(() => {
            this.wizard.complete();
        }, 1);
    }

    private saveCustomer() {
        this.remote.saveCustomer(this.order.customer, (message: MessageType) => {
            const textMessage = (message == MessageType.Success) ? 'customer.saved' : 'customer.saveFailed';
            this.notificationService.notify(new DxNotification(textMessage, message));
        });
    }

    saveAndClearCustomer() {
        this.saveCustomer();
        this.order.customer = new Customer();
    }

    saveClientAndContinue() {
        this.wizard.next();
        this.saveCustomer();
    }

    continueWithoutClient() {
        this.order.customer.anonymous = true;
        this.wizard.next();
    }

    backToClientEdit() {
        this.order.customer.anonymous = false;
        this.wizard.previous();
    }

    saveAndPrintOrder() {
        this.notificationService.showBusy('order.status.savingAndPrinting');
        this.remote.saveOrder(this.order, (state: MessageType) => {
            this.notificationService.hideBusy();
            let message : string = (state == MessageType.Success) ?
                'order.notifications.success' : 'order.notifications.fail';
            if (state == MessageType.Success) {
                this.printer.print(this.order);
                this.init();
                this.navigation.goToDashboard();
            }
            this.notificationService.notify(new DxNotification(message, state));
        });
    };
}
