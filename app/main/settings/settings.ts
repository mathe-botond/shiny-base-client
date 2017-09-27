import {Component, NgZone, OnInit} from '@angular/core';
import {ipcRenderer} from 'electron';

@Component({
    templateUrl: 'main/settings/settings.html'
})
export class SettingsPageComponent implements OnInit {
    printers: any;

    constructor(private zone: NgZone) {
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
}

