import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
    templateUrl: 'main/print/print.html'
})
export class PrintPageComponent implements OnInit {
    @ViewChild('mainScreen') elementView: ElementRef;

    constructor() {
    }

    ngOnInit(): void {
        window.resizeTo(window.innerWidth, this.elementView.nativeElement.offsetHeight);
    }
}

