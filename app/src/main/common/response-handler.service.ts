import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {MessageType} from "../dx-ui/dx-ui.model";

@Injectable()
export class ResponseHandler {
    handle(observable: Observable<Object>, callback: (state: MessageType) => any) {
        observable.subscribe(
            (data : any) => {
                if (data == null || data.code !== 200) {
                    callback(MessageType.Fail);
                } else {
                    callback(MessageType.Success);
                }
            },
            (error : any) => {
                callback(MessageType.Fail);
            }
        );
    }
}
