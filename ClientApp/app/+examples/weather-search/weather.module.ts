import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { routing } from './weather.routes';
import { WeatherComponent } from './weather.component';
import { WeatherListComponent } from './weather-list.component';
import { WeatherItemComponent } from './weather-item.component';
import { WeatherSearchComponent } from './weather-search.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        routing,
        SharedModule
    ],
    providers: [],
    declarations: [
        SidebarComponent,
        WeatherComponent,
        WeatherListComponent,
        WeatherItemComponent,
        WeatherSearchComponent
    ]
})
export class WeatherModule { }
