import {Settings, UseMode} from "./main/app.model";

export const Defaults: Settings = {
    currency: '€',
    print: {
        mode: UseMode.Silent,
        printer: '',
        width: 150,
        marginLeft: 10,
        marginTop: 10,
        footer: ''
    }
};

export const endpoint: string = 'http://localhost/shiny-base-backend/';
// export const endpoint: string = 'http://stylemile.ro/sm-base/';
