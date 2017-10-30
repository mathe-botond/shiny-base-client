import {Component, Input} from "@angular/core";
import {Customer, CustomerType} from "../../../app.model";
import {CustomerService} from "../../../common/service/customer.service";
import {MaskService} from "../../../common/mask.service";
import {GridOptions} from "ag-grid";
import {GridUtil} from "../../../common/service/grid.util";

@Component({
    selector: 'app-customer',
    templateUrl: 'customer.component.html'
})
export class CustomerComponent {
    @Input() customer: Customer;

    customerTypes = CustomerType;
    customerColumns: any[] = [
        {headerNameKey: 'customer.id', field: 'id'},
        {headerNameKey: 'customer.type.name', translate: 'customer.type.', field: 'type'},
        {headerNameKey: 'customer.name', field: 'name'},
        {headerNameKey: 'customer.telephone', field: 'phoneFormatted'}
    ];

    customerListOptions: GridOptions;

    customers: Customer[] = [];

    constructor(private remote: CustomerService,
                public grids: GridUtil,
                public mask: MaskService) {

        this.customer = new Customer();
        this.getCustomers();
        this.customerListOptions = grids.getDefaults(this.customerColumns);
    }

    getCustomers() {
        this.remote.getCustomers(this.customer).subscribe((customerResponse: Customer[]) => {
            this.customers = customerResponse;
        });
    }

    changeCustomerType(value: CustomerType) {
        this.customer.type = value;
        this.getCustomers();
    }

    changePhone(value: string) {
        this.customer.phoneFormatted = value;
        this.getCustomers();
    }

    changeName(value: string) {
        this.customer.name = value;
        this.getCustomers();
    }

    selectCustomer(customer: Customer) {
        this.customer = Customer.fromObject(customer);
    }

    clearCustomerId() {
        this.customer.id = null;
    }
}