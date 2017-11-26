import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent{
    constructor(
            private translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('ro');
    }
}