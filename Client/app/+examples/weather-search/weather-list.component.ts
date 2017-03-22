import { Component, OnInit } from '@angular/core';

import { Weather } from './weather';
import { WeatherService } from './weather.service';

@Component({
    selector: 'appc-we-list',
    template: `
        <div class="card weather-list">
            <appc-we-item *ngFor="let weatherItem of weatherItems"
                [weatherItem]="weatherItem">
           </appc-we-item>
        </div>
    `
})
export class WeatherListComponent implements OnInit {
    public weatherItems: Weather[];

    constructor(private _weatherService: WeatherService) { }

    public ngOnInit(): void {
        this.weatherItems = this._weatherService.getWeatherItems();
    }
}
