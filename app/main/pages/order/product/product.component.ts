import {Component, Input} from "@angular/core";
import {Customer, Order, OrderType, Product} from "../../../app.model";
import {ProductService} from "./product.service";
import {SettingsService} from "../../settings/settings.service";

@Component({
    selector: 'app-product',
    templateUrl: 'product.component.html',
    providers: [ProductService]
})
export class ProductComponent {
    @Input() order: Order;

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
    }
}
