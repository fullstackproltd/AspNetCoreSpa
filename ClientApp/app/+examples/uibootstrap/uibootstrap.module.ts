import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { routing } from './uibootstrap.routes';
import { UibootstrapComponent } from './uibootstrap.component';
import { DatetimeComponent } from './datetime/datetime.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [
        UibootstrapComponent,
        DatetimeComponent,
        TypeaheadComponent
    ],
    providers: []
})
export class UiBootstrapModule { }
