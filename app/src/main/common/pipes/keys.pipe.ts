import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    transform(value:any, args:string[]) : any {
        let keys = [];
        for (let enumMember in value) {
            if (value.hasOwnProperty(enumMember) && 
                    typeof enumMember === 'string' && 
                    enumMember.length > 0 &&
                    enumMember[0] === enumMember[0].toUpperCase()) {
                keys.push({key: enumMember, value: value[enumMember]});
            }
        }
        return keys;
    }
}
