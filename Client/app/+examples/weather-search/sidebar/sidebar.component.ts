import { Component, OnInit } from '@angular/core';
import { Profile } from './profile';
import { WeatherService } from '../weather.service';
import { WeatherProfileService } from './profile.service';
import { Weather } from '../weather';

@Component({
    selector: 'appc-we-sidebar',
    styleUrls: ['sidebar.component.scss'],
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {
    public profiles: Profile[];
    public weatherItem: Weather[];
    public newProfile: Profile = { profileName: '', cities: '' };

    constructor(private _profileService: WeatherProfileService, private _weatherService: WeatherService) { }

    public ngOnInit() {
        this.profiles = this.getProfiles();
    }

    public getProfiles() {
        return this._profileService.getProfiles();
    }

    public onSaveNew() {
        const profileItem: Profile = {
            profileName: this.newProfile.profileName,
            cities: this.newProfile.cities
        };
        console.log(profileItem);
        this._profileService.saveNewProfile(profileItem);
        this.getProfiles();
        this.newProfile.profileName = '';
        this.newProfile.cities = '';
    }

    public onLoadProfile(profile: Profile) {
        this._weatherService.searchWeatherData(profile.cities)
            .subscribe(
            data => this.weatherItem = data
            );
    }

    public onDeleteProfile(event: Event, profile: Profile) {
        event.stopPropagation();
        this._profileService.deleteProfile(profile);
    }

}
