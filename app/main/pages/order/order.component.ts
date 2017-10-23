import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Customer, CustomerType, Order, OrderType, Product} from "../../app.model";
import {SettingsService} from "../settings/settings.service";
import {OrderRemoteService} from "./order-remote.service";
import {NotificationService} from "../../../dx-ui/common/notification.service";
import {DxNotification, MessageType} from "../../../dx-ui/dx-ui.model";
import {NavigationService} from "../../ui/nav/navigation.service";
import {MaskService} from "../../common/mask.service";
import {PrintService} from "../../common/service/print.service";
import { Subject } from 'rxjs/Rx';
import {DataTableDirective} from "angular-datatables";

@Component({
    templateUrl: './order.component.html',
    providers: [OrderRemoteService]
})
export class OrderPageComponent implements OnInit, AfterViewInit {
    @ViewChild(DataTableDirective) dtElement: DataTableDirective;

    customerListOptions: DataTables.Settings = {};

    order: Order;
    customerTypes = CustomerType;
    orderTypes = OrderType;

    customers: Customer[] = [];
    dtTrigger: Subject<any> = new Subject();

    constructor(
            public settings: SettingsService,
            public mask: MaskService,
            private remote: OrderRemoteService,
            private notificationService: NotificationService,
            private navigation: NavigationService,
            private printer: PrintService) {

        this.init();
        this.getCustomers();
    };

    private init() {
        this.order = new Order();
        this.order.customer = new Customer();
        this.order.customer.phone = '40';
    }

    ngOnInit(): void {
        this.customerListOptions = {
            lengthChange: false,
            searching: false
        };
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    productSelected = (product: Product) => {
        this.order.price = product.price;
        this.order.details = product.description;
    };

    saveAndPrint() {
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

    getCustomers() {
        this.remote.getCustomers(this.order.customer).subscribe((customerResponse: Customer[]) => {
            this.customers = customerResponse;
            this.reRenderClientList();
        });
    };

    changeCustomerType(value: CustomerType) {
        this.order.customer.type = value;
        this.getCustomers();
    }

    changePhone(value: string) {
        this.order.customer.phoneFormatted = value;
        this.getCustomers();
    }

    changeName(value: string) {
        this.order.customer.name = value;
        this.getCustomers();
    }

    selectCustomer(customer: Customer) {
        this.order.customer = Customer.fromObject(customer);
    }

    clearCustomerId() {
        this.order.customer.id = null;
    }

    reRenderClientList(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
        });
    }
}
