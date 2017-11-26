import {Injectable} from "@angular/core";
import {Order, PrintData} from "../../app.model";

import { ipcRenderer } from 'electron';
import {SettingsService} from "../../pages/settings/settings.service";

@Injectable()
export class PrintService {
    constructor(
        public settings: SettingsService) {
    };

    print(order: Order) {
        let data = new PrintData();
        data.order = order;
        data.settings = this.settings.data;
        ipcRenderer.send('print', data);
    }
}
