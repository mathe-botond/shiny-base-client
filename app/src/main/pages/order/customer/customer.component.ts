import {Component, Input} from "@angular/core";
import {Customer, CustomerType} from "../../../app.model";
import {CustomerService} from "../../../common/service/customer.service";
import {MaskService} from "../../../common/mask.service";
import {GridOptions} from "ag-grid";
import {GridUtil} from "../../../common/service/grid.util";

@Component({
    selector: 'app-customer',
    template: require('./customer.component.html')
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
        this.customerListOptions.onSelectionChanged = () => { this.selectCustomer(); };
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

    selectCustomer() {
        const selectedCustomers = this.customerListOptions.api.getSelectedRows();
        if (selectedCustomers && selectedCustomers.length > 0) {
            this.customer = Customer.fromObject(selectedCustomers[0]);
        }
    }

    clearCustomerId() {
        this.customer.id = null;
    }
}