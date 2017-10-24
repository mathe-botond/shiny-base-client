import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";
import {SettingsService} from "../settings/settings.service";
import {Customer, Order} from "../../app.model";
import {MessageType} from "dx-ui/dx-ui.model";
import {ResponseHandler} from "../../common/response-handler.service";
import {ApiService} from "../../common/api.service";

@Injectable()
export class OrderRemoteService {

    constructor(
        private api: ApiService,
        private http: HttpClient,
        private responseHandler: ResponseHandler) {
    };

    saveOrder(order: Order, callback: (state: MessageType) => any) {
        this.responseHandler.handle(this.http.post(this.api.saveOrderEndpoint, order), callback);
    }

    saveCustomer(customer: Customer, callback: (state: MessageType) => any) {
        this.responseHandler.handle(this.http.post(this.api.saveCustomerEndpoint, customer), callback);
    }
}
