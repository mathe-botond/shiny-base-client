import {Injectable} from "@angular/core";
import {Settings} from "../../app.model";
import {Defaults} from "../../../config";
import {ipcRenderer} from 'electron';

@Injectable()
export class SettingsService {
    data: Settings = Defaults;

    get endpoint(): string {
        return this.data.endpoint;
    }

    get currency(): string {
        return this.data.currency;
    }

    init() {
        ipcRenderer.send("settings-init", Defaults);
        ipcRenderer.on('settings-data', (event: any, storedSettings: Settings) => {
            this.data = storedSettings;
            console.log('Settings: ');
            console.log(this.data);
        });
    }

    save(settings: Settings) {
        this.data = settings;
        ipcRenderer.send('settings-save', this.data);
    }
}
