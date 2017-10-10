import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {SettingsService} from "../settings/settingsService";
import {Order, Product} from "../model";
import {MessageType} from "dx-ui/model";
import {ResponseHandler} from "../common/responseHandler";

@Injectable()
export class OrderRemoteService {

    constructor(
        private settings: SettingsService,
        private http: HttpClient,
        private responseHandler: ResponseHandler) {
    };

    getProducts = (query: string) : Observable<any[]> => {
        return this.http.get(this.getProductSearchEndpoint(query)).map((response : any) => {
            let result : any[] = response.params;
            result.forEach((product : Product) => {
                product.formatted = product.description + ' - ' + product.price + ' ' + this.settings.getCurrency();
            });
            return result;
        });
    };

    saveOrder(order: Order, callback: (state: MessageType) => any) {
        order.customer.removePhoneFormatting();
        this.responseHandler.handle(this.http.post(this.getSaveOrderEndpoint(), order), callback);
    }

    private getProductSearchEndpoint(query: string) {
        return this.settings.getEndpoint() + 'q/product/?search=' + query;
    }

    private getSaveOrderEndpoint() {
        return this.settings.getEndpoint() + 'q/save-order/';
    }
}
