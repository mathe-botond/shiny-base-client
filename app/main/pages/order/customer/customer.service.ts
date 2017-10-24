import {Injectable} from "@angular/core";
import {Customer} from "../../../app.model";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../../common/api.service";
import {Response} from "../../../common/common.model";

@Injectable()
export class CustomerService {
    constructor(
        private api: ApiService,
        private http: HttpClient) {
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
}