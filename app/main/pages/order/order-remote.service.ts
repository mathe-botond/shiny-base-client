import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {SettingsService} from "../settings/settings.service";
import {Customer, Order, Product} from "../../app.model";
import {MessageType} from "dx-ui/dx-ui.model";
import {ResponseHandler} from "../../common/response-handler.service";
import {ApiService} from "../../common/api.service";
import {Response} from "../../common/common.model";

@Injectable()
export class OrderRemoteService {

    constructor(
        private api: ApiService,
        private http: HttpClient,
        private settings: SettingsService,
        private responseHandler: ResponseHandler,) {
    };

    getProducts = (query: string) : Observable<any[]> => {
        return this.http.get(this.api.getProductSearchEndpoint(query)).map((response : any) => {
            let result : any[] = response.params;
            result.forEach((product : Product) => {
                product.formatted = product.description + ' - ' + product.price + ' ' + this.settings.currency;
            });
            return result;
        });
    };

    getCustomers = (query: Customer) : Observable<any[]> => {
        return this.http.post<Response<Customer[]>>(this.api.customerSearch, query.toObject())
            .map((response : Response<Customer[]>) => {
                let rawResult : Customer[] = response.params;
                let result: Customer[] = [];
                rawResult.forEach(item => {
                    result.push(Customer.fromObject(item));
                });
                return result;
            });
    };

    saveOrder(order: Order, callback: (state: MessageType) => any) {
        this.responseHandler.handle(this.http.post(this.api.saveOrderEndpoint, order), callback);
    }
}
