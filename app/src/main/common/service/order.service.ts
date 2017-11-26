import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";
import {Order} from "../../app.model";
import {ResponseHandler} from "../response-handler.service";
import {ApiService} from "../api.service";
import {Observable} from "rxjs/Observable";
import {MessageType} from "../../dx-ui/dx-ui.model";

@Injectable()
export class OrderService {

    constructor(
        private api: ApiService,
        private http: HttpClient,
        private responseHandler: ResponseHandler) {
    };

    saveOrder(order: Order, callback: (state: MessageType) => any) {
        this.responseHandler.handle(this.http.post(this.api.saveOrder, order), callback);
    }

    getOrders(): Observable<any> {
        return this.http.get(this.api.listOrders)
            .map((response : any) => {
                let rawResult : any[] = response.params;
                let result: Order[] = [];
                rawResult.forEach(item => {
                    result.push(Order.fromObject(item));
                });
                return result;
            });
    }

    saveCalendarChange(event: any, callback: (state: MessageType) => any) {
        this.responseHandler.handle(this.http.post(this.api.saveCalendarChange, event), callback);
    }
}
