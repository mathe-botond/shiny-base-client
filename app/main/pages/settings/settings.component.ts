import {Component, NgZone, OnInit} from '@angular/core';
import {ipcRenderer} from 'electron';
import {SettingsService} from './settings.service';
import {Settings, UseMode} from '../../app.model';
import * as $ from 'jquery';
import {NavigationService} from "../../ui/nav/navigation.service";

@Component({
    templateUrl: 'settings.component.html'
})
export class SettingsPageComponent implements OnInit {
    readonly currencies = [{
        type: 'Euro',
        symbol: '€',
    }, {
        type: 'Dollar',
        symbol: '$',
    }, {
        type: 'Pound',
        symbol: '£'
    }, {
        type: 'Hungarian Forint',
        symbol: 'HUF'
    }, {
        type: 'Romanian New',
        symbol: 'RON'
    }];

    printers: any;

    useMode: any = UseMode;

    underEdit: Settings;

    constructor(
        private zone: NgZone,
        private service: SettingsService,
        private navigation: NavigationService) {

        this.underEdit = $.extend({}, this.service.data);
    }

    ngOnInit(): void {
        let component = this;
        let zone = this.zone;
        ipcRenderer.send('get-printer-list');
        ipcRenderer.on('printer-list', (event: any, arg: any) => {
            zone.run(() => {
                component.printers = arg;
            });
        });
    }

    get settings(): Settings {
        return this.underEdit;
    }

    saveSettings() {
        this.service.save(this.underEdit);
        this.navigation.goToDashboard();
    }
}

