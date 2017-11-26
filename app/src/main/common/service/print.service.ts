import {Injectable} from "@angular/core";
import {Order, PrintData} from "../../app.model";

// noinspection TypeScriptCheckImport
import { ipcRenderer } from 'electron';
import {SettingsService} from "../../pages/settings/settings.service";

export enum PrintCount {
    Single, Double
}

@Injectable()
export class PrintService {
    constructor(
        public settings: SettingsService) {
    };

    print(order: Order, count: PrintCount = PrintCount.Double) {
        let data = new PrintData();
        data.order = order;
        data.settings = this.settings.data;
        data.count = count == PrintCount.Double ? 2 : 1;
        ipcRenderer.send('print', data);
    }
}
