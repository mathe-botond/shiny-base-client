import {Injectable} from "@angular/core";
import {Customer} from "../../app.model";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../api.service";
import {Response} from "../common.model";
import {MessageType} from "../../../dx-ui/dx-ui.model";
import {ResponseHandler} from "../response-handler.service";

@Injectable()
export class CustomerService {
    constructor(
        private api: ApiService,
        private http: HttpClient,
        private responseHandler: ResponseHandler) {
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

    saveCustomer(customer: Customer, callback: (state: MessageType) => any) {
        this.responseHandler.handle(this.http.post(this.api.saveCustomer, customer.toObject()), callback);
    }
}