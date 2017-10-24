import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {Customer, CustomerType} from "../../../app.model";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";
import {CustomerService} from "./customer.service";
import {MaskService} from "../../../common/mask.service";

@Component({
    selector: 'app-customer',
    templateUrl: 'customer.component.html',
    providers: [CustomerService]
})
export class CustomerComponent implements OnInit, AfterViewInit {
    @Input() customer: Customer;

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;

    customerListOptions: DataTables.Settings = {};

    customerTypes = CustomerType;

    customers: Customer[] = [];
    dtTrigger: Subject<any> = new Subject();

    constructor(private remote: CustomerService,
                public mask: MaskService) {
        this.customer = new Customer();
        this.getCustomers();
    }

    ngOnInit(): void {
        this.customerListOptions = {
            lengthChange: false,
            searching: false
        };
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    getCustomers() {
        this.remote.getCustomers(this.customer).subscribe((customerResponse: Customer[]) => {
            this.customers = customerResponse;
            this.reRenderClientList();
        });
    };

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

    reRenderClientList(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
        });
    }
}