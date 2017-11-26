import {Injectable} from "@angular/core";

@Injectable()
export class MaskService {
    phoneCallback(raw: string): any {
        const digits = raw.replace(/[^0-9]/g,"").length;

        const phoneMask = ['+', /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
        const length = [0, 2, 3, 5, 6, 7, 9, 10, 12, 13, 15, 16];

        if (raw == null || digits == 0) {
            return [/\d/];
        }

        return phoneMask.slice(0, length[digits]);
    }

    get phone(): any {
        return {
            mask: this.phoneCallback
        }
    }
}
