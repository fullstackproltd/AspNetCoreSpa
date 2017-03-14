import { Component, Input } from '@angular/core';
import { Weather } from './weather';

@Component({
    selector: 'appc-we-item',
    template: `
        <div class="card">
            <h2>{{ weatherItem.cityName }}</h2>
            <p><span class="label label-primary">Temp </span>&nbsp;
                {{ weatherItem.temperature }}°F</p>
            <p><span class="label label-info">Outlook </span>&nbsp;
                {{ weatherItem.description }}</p>
        </div>
    `
})
export class WeatherItemComponent {
    @Input('weatherItem') public weatherItem: Weather;
}
