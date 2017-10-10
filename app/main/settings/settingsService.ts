import {Injectable} from "@angular/core";
import {Settings} from "../model";
import {Defaults} from "../../config";

@Injectable()
export class SettingsService {
    data: Settings;

    constructor() {
        this.data = new Settings();
        this.loadDefaultsForMissing();
    }

    private loadDefaultsForMissing() {
        if (this.data.currency == null) {
            this.data.currency = Defaults.currency;
        }
    }

    getEndpoint() : string {
        return Defaults.endpoint;
    }

    getCurrency() : string {
        return this.data.currency;
    }
}
