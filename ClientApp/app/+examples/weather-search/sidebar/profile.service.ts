import { Profile } from './profile';
export class WeatherProfileService {
    private profiles: Profile[] = [
        { profileName: '1', cities: 'New York' },
        { profileName: '2', cities: 'London' },
        { profileName: '3', cities: 'Berlin' }
    ];

    public saveNewProfile(profile: Profile) {
        return this.profiles.push(profile);
    }

    public getProfiles() {
        return this.profiles;
    }

    public deleteProfile(profile: Profile) {
        this.profiles.splice(this.profiles.indexOf(profile), 1);
    }
}
