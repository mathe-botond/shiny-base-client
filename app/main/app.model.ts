export enum CustomerType {
    Person = "person",
    Business = "business"
}

export enum OrderType {
    Patch = "patch",
    Full = "full"
}

export enum UseMode {
    Silent = "silent",
    WithSettings = "with-settings",
    NoPrinting = "no-printing"
}

export class Customer {
    id: number;
    name: string;
    type: CustomerType;
    anonymous: boolean;

    private _phoneFormatted: string;
    private _phone: string;

    constructor() {
        this.type = CustomerType.Person;
    }

    static fromObject(source: any): Customer {
        let customer = new Customer();
        customer.id = source.id;
        customer.phone = source.phone;
        customer.type = source.type;
        customer.name = source.name;
        return customer;
    }

    removePhoneFormatting(phone: string) {
        return phone.replace(/[+-]/g, '');
    }

    private format(phone: string) {
        return phone.replace(/(\d{2})(\d{3})(\d{2})(\d{2})(\d{2})/, "+$1-$2-$3-$4-$5");
    }

    get phone(): string {
        return this._phone;
    }

    set phone(phone: string) {
        this._phone = phone;
        this._phoneFormatted = phone != null ? this.format(phone) : null;
    }

    get phoneFormatted(): string {
        return this._phoneFormatted;
    }

    set phoneFormatted(phone: string) {
        this._phone = phone != null ? this.removePhoneFormatting(phone) : null;
        this._phoneFormatted = phone;
    }

    toObject() {
        return {
            id: this.id,
            phone: this._phone,
            phoneFormatted: this._phoneFormatted,
            type: this.type,
            name: this.name
        };
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

    static fromObject(raw: any) {
        let order = new Order();
        order.customer = raw.customer ? Customer.fromObject(raw.customer) : null;
        order.id = raw.id;
        order.type = raw.type;
        order.price = raw.price;
        order.details = raw.details;
        order.isEmergency = raw.isEmergency;
        return order;
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
    endpoint: string;

    constructor() {
        this.print = new PrintSettings();
    }
}

export class PrintSettings {
    mode: UseMode = UseMode.Silent;
    printer: string = "";
    width: number = 150;
    marginLeft: number = 10;
    marginTop: number = 10;
    footer: string = "";
}

export class MenuItem {
    label: string;
    target: string;
    icon: string;
}
