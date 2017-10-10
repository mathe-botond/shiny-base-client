import {Component, ElementRef, Input, ViewChild, AfterViewInit} from "@angular/core";
import {DxNotification, MessageType} from "../model";
import * as jQuery from 'jquery';

@Component({
    selector: "flyout",
    templateUrl: "dx-ui/flyout/flyout.html"
})
export class FlyoutComponent implements AfterViewInit{
    @Input() notification: DxNotification;

    @ViewChild('root') input : ElementRef;

    underTest : boolean = true;

    constructor() {
    }

    static nodeToString(node : any) {
        let tmpNode : any = document.createElement( "div" );
        tmpNode.appendChild( node.cloneNode( true ) );
        return tmpNode.innerHTML;
    }

    ngAfterViewInit(): void {
        let $notification = jQuery(this.input.nativeElement).hide().slideDown();
        if (this.notification.type == MessageType.Success) {
            $notification.delay(4000).slideUp()
                .promise().done(this.notification.expire);
        }
    }

    close() {
        this.notification.expire();
        return false;
    }
}
