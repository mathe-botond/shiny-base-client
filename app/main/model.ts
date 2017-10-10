export enum CustomerType {
    Person = "person",
    Business = "business"
}

export enum OrderType {
    Patch = "patch",
    Full = "full"
}

export class Customer {
    id: number;
    name: string;
    type: CustomerType;
    phoneFormatted: string;
    phone: string;
    anonymous: boolean;

    constructor() {
        this.type = CustomerType.Person;
    }

    removePhoneFormatting() {
        if (typeof this.phoneFormatted === "string") {
            this.phone = this.phoneFormatted.replace(/[+-]/g, '');
        }
    }
}

export class Order {
    customer: Customer;
    id: number;
    type: OrderType;
    price: number;
    details: string;
    isEmergency: boolean;

    constructor(customer: Customer = null) {
        this.type = OrderType.Patch;
        this.customer = customer;
    }
}

export class Product {
    price: number;
    description: string;
    formatted: string;
}

export class PrintData {
    settings: Settings;
    order: Order;
    count: number = 2;
}

export class Settings {
    print: PrintSettings;
    currency: string;

    constructor() {
        this.print = new PrintSettings();
    }
}

export class PrintSettings {
    printer: string = "POS58 10.0.0.6";
    width: number = 150;
    marginLeft: number = 10;
    marginTop: number = 10;
    footer: string = "<b>Lorem ipsum dolor sit amen</b>";
}

export class MenuItem {
    label: string;
    target: string;
    icon: string;
}
