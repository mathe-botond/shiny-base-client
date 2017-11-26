import {Component, OnInit} from "@angular/core";
import {OrderService} from "../../../common/service/order.service";
import {Order} from "../../../app.model";
import {GridUtil} from "../../../common/service/grid.util";
import {GridOptions} from "ag-grid";
import {SettingsService} from "../../settings/settings.service";

@Component({
    selector: 'app-order-list',
    template: require('./order-list.component.html')
})
export class OrderListComponent implements OnInit {
    orders: Order[];
    private listOptions: GridOptions;

    private columns: any[] = [
        {headerNameKey: 'order.type.name', translate: 'order.type.', field: 'type'},
        {headerNameKey: 'order.details', field: 'details'},
        {headerNameKey: 'order.price', field: 'price',
            cellRenderer: (cell: any) => {
                return cell.value + ' ' + this.settings.currency;
            }
        }
    ];

    constructor(private service: OrderService,
            private grids: GridUtil,
            private settings: SettingsService) {
        this.orders = [];
        this.listOptions = grids.getDefaults(this.columns);
    }

    ngOnInit(): void {
        this.service.getOrders().subscribe((orders: Order[]) => {
            this.orders = orders;
        });
    }
}
