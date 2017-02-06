import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class UtilityService {

    public _router: Router;

    constructor(router: Router) {
        this._router = router;
    }

    public convertDateTime(date: Date) {
        let _formattedDate = new Date(date.toString());
        return _formattedDate.toDateString();
    }

    public navigate(path: string) {
        this._router.navigate([path]);
    }

    public navigateToSignIn() {
        this.navigate('/login');
    }
}
