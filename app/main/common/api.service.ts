import {SettingsService} from "../pages/settings/settings.service";
import {Injectable} from "@angular/core";

@Injectable()
export class ApiService {
    constructor(private settings: SettingsService) {

    }

    getProductSearchEndpoint(query: string) {
        return this.settings.endpoint + 'q/product/?search=' + query;
    }

    get saveOrderEndpoint(): string {
        return this.settings.endpoint + 'q/save-order/';
    }


    get customerSearch(): string {
        return this.settings.endpoint + 'q/find-customer/';
    }
}
