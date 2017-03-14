import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Weather } from './weather';
import { WEATHER_ITEMS } from './weather.data';

@Injectable()
export class WeatherService {
    private URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
    private KEY = '16b0f73c6b8a9412f74b1b56a485e456';
    private IMP = '&units=imperial';

    constructor(private _http: Http) { }

    public getWeatherItems() {
        return WEATHER_ITEMS;
    }

    public addWeatherItem(weatherItem: Weather) {
        WEATHER_ITEMS.push(weatherItem);
    }

    public clearWeatherItems() {
        WEATHER_ITEMS.splice(0);
    }

    public searchWeatherData(cityName: string): Observable<Weather[]> {
        return this._http.get(this.URL + cityName + '&APPID=' + this.KEY + this.IMP)
            // tslint:disable-next-line:whitespace
            .map((res: Response) => <Weather[]>res.json())
            .do(res => console.log('Weather Data Object: ' + JSON.stringify(res)))
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json());
            });
    }
}
