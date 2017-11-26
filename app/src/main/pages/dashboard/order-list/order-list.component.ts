import {Component, OnInit} from "@angular/core";
import {OrderService} from "../../../common/service/order.service";
import {Order} from "../../../app.model";
import {PrintCount, PrintService} from "../../../common/service/print.service";
import {SettingsService} from "../../settings/settings.service";

@Component({
    selector: 'app-order-list',
    template: require('./order-list.component.html')
})
export class OrderListComponent implements OnInit {
    orders: Order[];

    constructor(
            private service: OrderService,
            private printer: PrintService,
            public settings: SettingsService) {
        this.orders = [];
    }

    ngOnInit(): void {
        this.service.getOrders().subscribe((orders: Order[]) => {
            this.orders = orders;
        });
    }

    reprint(order: Order) {
        this.printer.print(order, PrintCount.Single);
    }
}
