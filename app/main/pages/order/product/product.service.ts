import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "../../settings/settings.service";
import {ApiService} from "../../../common/api.service";
import {Observable} from "rxjs/Observable";
import {Product} from "../../../app.model";
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
    constructor(
        private api: ApiService,
        private http: HttpClient,
        private settings: SettingsService) {
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
}