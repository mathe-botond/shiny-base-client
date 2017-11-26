import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './main/app.module';
import { reset } from './chrome-reset';

const platform = platformBrowserDynamic();

reset();
platform.bootstrapModule(AppModule);