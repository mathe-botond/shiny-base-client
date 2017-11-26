import {Component, ElementRef, NgZone, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
// noinspection TypeScriptCheckImport
import { ipcRenderer } from 'electron';
import {Customer, Order, PrintData, Settings} from "../app.model";
import {OrderService} from "../common/service/order.service";

@Component({
    template: require('./print.component.html'),
    styles: [require('./print.component.scss')],
    encapsulation: ViewEncapsulation.None
})
export class PrintPageComponent implements OnInit {
    @ViewChild('mainScreen') elementView: ElementRef;

    public settings: Settings;
    public order: Order;

    constructor(private zone: NgZone, private service: OrderService) {
        this.settings = new Settings();
        this.order = new Order(new Customer());
    }

    ngOnInit(): void {
        let zone = this.zone;
        let component = this;
        ipcRenderer.on("render-ticket", (event : any, arg : PrintData) => {
            zone.run(() => {
                component.settings = arg.settings;
                component.order = this.service.recoverTypes(arg.order);

                console.log(component.order);

                this.updatePrintCss();
                ipcRenderer.send("layout-print-ready", arg);
            });
        });
    }

    private updatePrintCss() {
        Array.from(document.styleSheets).forEach((ss: any) => {
            Array.from(ss.rules || ss.cssRules).forEach((rule : any) => {
                if (rule instanceof CSSPageRule) {
                    let printSettings = this.settings.print;
                    rule.style.marginLeft = printSettings.marginLeft + "px";
                    rule.style.marginTop = printSettings.marginTop + "px";
                    return ;
                }
            });
        });
    }
}
