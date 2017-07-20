import { ActionReducer, combineReducers } from '@ngrx/store';
import { ProfileModel } from '../models/profile-model';
import { profileReducer } from '../profile/profile.reducer';
import { authTokenReducer } from '../auth-token/auth-token.reducer';
import { authReadyReducer } from './auth-ready.reducer';
import { loggedInReducer } from './logged-in.reducer';
import { AuthTokenModel } from '../models/auth-tokens-model';

export interface AuthState {
    authTokens: AuthTokenModel;
    profile: ProfileModel;
    loggedIn: boolean;
    authReady: boolean;
}

const reducers = combineReducers({
    profile: profileReducer,
    authTokens: authTokenReducer,
    loggedIn: loggedInReducer,
    authReady: authReadyReducer
});

export function authReducer( state: any, action: any ): ActionReducer<AuthState> {
    return reducers(state, action);
}
