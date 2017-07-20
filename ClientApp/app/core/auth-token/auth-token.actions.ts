import { Action } from '@ngrx/store';
import { type } from '../../util/action-name-helper';
import { Injectable } from '@angular/core';
import { AuthTokenModel } from '../models/auth-tokens-model';

export const AuthTokenActionTypes = {
    LOAD: type('[AuthToken] Load'),
    DELETE: type('[AuthToken] Delete')
};

@Injectable()
export class AuthTokenActions {
    public delete(): Action {
        return {
            type: AuthTokenActionTypes.LOAD
        };
    }
    public load(payload: AuthTokenModel): Action {
        return {
            type: AuthTokenActionTypes.LOAD,
            payload
        };
    }
}
