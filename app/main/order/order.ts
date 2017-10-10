import { Component } from '@angular/core';
import { ipcRenderer } from 'electron';
import {Customer, CustomerType, Order, OrderType, PrintData, Product} from "../model";
import {SettingsService} from "../settings/settingsService";
import {OrderRemoteService} from "./orderRemoteService";
import {NotificationService} from "../../dx-ui/common/notificationService";
import {DxNotification, MessageType} from "../../dx-ui/model";
import {NavigationService} from "../nav/navigationService";

@Component({
    templateUrl: 'main/order/order.html',
    providers: [OrderRemoteService]
})
export class OrderPageComponent {
    public phoneMask = {
        mask: ['+', /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
    };

    order: Order;
    customerTypes = CustomerType;
    orderTypes = OrderType;

    constructor(
            public settings: SettingsService,
            private remote: OrderRemoteService,
            private notificationService: NotificationService,
            private navigation: NavigationService) {
        this.order = new Order();
        this.order.customer = new Customer();
        this.order.customer.phone = '40';
    };

    productSelected = (product: Product) => {
        this.order.price = product.price;
        this.order.details = product.description;
    };

    saveAndPrint() {
        this.notificationService.showBusy("order.status.savingAndPrinting");
        this.remote.saveOrder(this.order, (state: MessageType) => {
            this.notificationService.hideBusy();
            let message : string = (state == MessageType.Success) ? "order.notifications.success" : "order.notifications.fail";
            if (state == MessageType.Success) {
                this.print();
                this.navigation.goToDashboard();
            }
            this.notificationService.notify(new DxNotification(message, state));
        });
    };

    private print() {
        let data = new PrintData();
        data.order = this.order;
        data.settings = this.settings.data;
        ipcRenderer.send("print", data);
    }
}
