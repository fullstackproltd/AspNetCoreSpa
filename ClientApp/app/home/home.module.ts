import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { routing } from './home.routes';

@NgModule({
    imports: [routing],
    declarations: [HomeComponent]
})
export class HomeModule { }
