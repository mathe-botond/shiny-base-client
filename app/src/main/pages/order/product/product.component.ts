import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Customer, Order, OrderType, Product} from "../../../app.model";
import {ProductService} from "./product.service";
import {SettingsService} from "../../settings/settings.service";

@Component({
    selector: 'app-product',
    template: require('./product.component.html'),
    providers: [ProductService]
})
export class ProductComponent {
    @Input() order: Order;
    @Output() orderChange: EventEmitter<Order> = new EventEmitter();

    orderTypes = OrderType;

    constructor(public settings: SettingsService,
                public service: ProductService) {
        this.order = new Order();
        this.order.customer = new Customer();
    }

    productSelected = (product: Product) => {
        this.order.price = product.price;
        this.order.details = product.description;
    };

    getProducts = (query: string): any => {
        return this.service.getProducts(query);
    };

    get type() {
        return this.order.type;
    }

    set type(value: OrderType) {
        this.order.type = value;
        this.orderChange.emit(this.order);
    }

    get details() {
        return this.order.details;
    }

    set details(value: string) {
        this.order.details = value;
        this.orderChange.emit(this.order);
    }

    get price() {
        return this.order.price;
    }

    set price(value: number) {
        this.order.price = value;
        this.orderChange.emit(this.order);
    }

    get isEmergency() {
        return this.order.isEmergency;
    }

    set isEmergency(value: boolean) {
        this.order.isEmergency = value;
        this.orderChange.emit(this.order);
    }
}
