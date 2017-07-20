import { Action } from '@ngrx/store';
import { AuthTokenActionTypes } from './auth-token.actions';
import { AuthTokenModel } from '../models/auth-tokens-model';

const initalState: AuthTokenModel = {
    id_token: null,
    access_token: null,
    refresh_token: null,
    expires_in: 0,
    token_type: null,
    expiration_date: null
};

export function authTokenReducer(state = initalState, action: Action): AuthTokenModel {
    switch (action.type) {
        case AuthTokenActionTypes.LOAD:
            return action.payload;

        case AuthTokenActionTypes.DELETE:
            return initalState;

        default:
            return state;
    }
}
