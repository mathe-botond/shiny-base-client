import { Component } from '@angular/core';
import {ipcRenderer} from 'electron';

@Component({
    templateUrl: 'main/order/order.html'
})
export class OrderPageComponent {
    saveAndPrint() {
        ipcRenderer.send("print");
    };
}
