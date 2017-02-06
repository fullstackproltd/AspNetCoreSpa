import { Action } from '@ngrx/store';
import { type } from '../../util/action-name-helper';
import { ProfileModel } from '../models/profile-model';
import { Injectable } from '@angular/core';

export const ProfileActionTypes = {
    LOAD: type('[Profile] Load'),
    DELETE: type('[Profile] Delete')
};

@Injectable()
export class ProfileActions {
    public load(payload: ProfileModel): Action {
        return {
            type: ProfileActionTypes.LOAD,
            payload
        };
    }
    public delete(): Action {
        return {
            type: ProfileActionTypes.DELETE
        };
    }
}
