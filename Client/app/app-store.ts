import { AuthState, authReducer } from './core/auth-store/auth.store';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';

export interface AppState {
    auth: AuthState;
}

const reducers = {
    auth: authReducer
};

const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function appReducer(state: any, action: any) {
    if (process.env.ENV === 'Production') {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}
