import {Component, ElementRef, NgZone, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ipcRenderer } from 'electron';
import {Customer, Order, PrintData, Settings} from "../model";

@Component({
    templateUrl: 'main/print/print.html',
    styleUrls: ['main/print/print.css'],
    encapsulation: ViewEncapsulation.None
})
export class PrintPageComponent implements OnInit {
    @ViewChild('mainScreen') elementView: ElementRef;

    public settings: Settings;
    public order: Order;

    constructor(private zone: NgZone) {
        this.settings = new Settings();
        this.order = new Order(new Customer());
    }

    ngOnInit(): void {
        let zone = this.zone;
        let component = this;
        ipcRenderer.on("render-ticket", (event : any, arg : PrintData) => {
            zone.run(() => {
                console.log(arg.settings);
                component.settings = arg.settings;
                component.order = arg.order;

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
