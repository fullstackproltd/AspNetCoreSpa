import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

    public printSuccessMessage(message: string) {
        console.log(message);
    }

    public printErrorMessage(message: string) {
        console.error(message);
    }
}
