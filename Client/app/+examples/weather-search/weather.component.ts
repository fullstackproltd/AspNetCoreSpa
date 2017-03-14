import { Component, OnInit } from '@angular/core';

import { WeatherService } from './weather.service';
import { WeatherProfileService } from './sidebar/profile.service';
import { Weather } from './weather';

@Component({
    selector: 'appc-weather',
    template: `
        <!-- Sidebar -->
        <appc-we-sidebar></appc-we-sidebar>

        <!-- Weather Details -->
        <appc-we-search></appc-we-search>
        <appc-we-list></appc-we-list>
    `,
    providers: [WeatherService, WeatherProfileService]
})

export class WeatherComponent implements OnInit {
    public weatherItems: Weather[];

    constructor(private _weatherService: WeatherService) { }

    public ngOnInit(): void {
        this.weatherItems = this._weatherService.getWeatherItems();
    }
}
