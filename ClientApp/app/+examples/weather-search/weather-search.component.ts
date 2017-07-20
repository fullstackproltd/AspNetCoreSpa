import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherService } from './weather.service';
import { Weather } from './weather';

@Component({
    selector: 'appc-we-search',
    template: `
        <div class="weather-search">
            <form (ngSubmit)="onSubmit()">
              <div class="form-group">
              <h3>Add City: </h3>
                <input
                    [formControl]="searchInput"
                    type="text"
                    class="form-control input-sm"
                    placeholder="City">
                </div>
                  <button class="btn btn-success profile-btn" type="submit">
                       Submit
                  </button>
            </form>
            <div *ngIf="city.name">
                <h4>City found: <small>{{city.name}}</small></h4>
            </div>
        </div>
    `
})
export class WeatherSearchComponent implements OnInit {
    public searchInput: FormControl;
    public city: any = {};

    constructor(private _weatherService: WeatherService) { }

    public onSubmit() {
        const weatherItem: Weather = {
            cityName: this.city.name,
            description: this.city.weather[0].description,
            temperature: this.city.main.temp
        };
        this._weatherService.addWeatherItem(weatherItem);
        this.city.name = '';
    }

    public ngOnInit() {
        this.searchInput = new FormControl('');
        this.searchInput.valueChanges
            .debounceTime(300)            // wait 300 milliseconds
            .distinctUntilChanged()        // emit when the current value is different than last.
            .switchMap((input: string) =>        // takes current observable and makes svc request
                this._weatherService.searchWeatherData(input))
            .subscribe(
            city => this.city = city,
            err => {
                console.log(`Can't get weather. Error code: ${err.cod}, Message: ${err.message}`);
                console.log(err);
            });
    }
}
