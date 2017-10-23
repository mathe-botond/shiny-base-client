export enum MessageType {
    Success = "success",
    Fail = "fail"
}

export class DxNotification {
    message: string;
    typeAsString: string;
    type: MessageType;
    visible: boolean = true;
    expire: () => any;

    constructor(message: string, type:MessageType) {
        this.message = message;
        this.type = type;
        this.setTypeAsString(type);
    }

    setTypeAsString(type: MessageType) {
        switch (type) {
            case MessageType.Success:
                this.typeAsString = "success";
                break;
            case MessageType.Fail:
                this.typeAsString = "danger";
                break;
            default:
                this.typeAsString = "info";
        }
    }
}