import { type } from '../../util/action-name-helper';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';

export const LoggedInActionTypes = {
    LOGGED_IN: type('[LoggedIn] True'),
    NOT_LOGGED_IN: type('[LoggedIn] False')
};

@Injectable()
export class LoggedInActions {
    public loggedIn(): Action {
        return {
            type: LoggedInActionTypes.LOGGED_IN
        };
    }
    public notLoggedIn(): Action {
        return {
            type: LoggedInActionTypes.NOT_LOGGED_IN
        };
    }
}
