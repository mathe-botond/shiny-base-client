import {SettingsService} from "../pages/settings/settings.service";
import {Injectable} from "@angular/core";

@Injectable()
export class ApiService {
    constructor(private settings: SettingsService) {

    }

    getProductSearch(query: string) {
        return this.settings.endpoint + 'q/product/?search=' + query;
    }

    get saveOrder(): string {
        return this.settings.endpoint + 'q/save-order/';
    }

    get saveCustomer(): string {
        return this.settings.endpoint + 'q/save-customer/';
    }

    get customerSearch(): string {
        return this.settings.endpoint + 'q/find-customer/';
    }

    get listOrders(): string {
        return this.settings.endpoint + 'q/list-orders';
    }

    get calendar() {
        return this.settings.endpoint + 'q/orders-calendar';
    }

    get saveCalendarChange() {
        return this.settings.endpoint + 'q/save-calendar-change';
    }
}
