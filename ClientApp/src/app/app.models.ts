import { InjectionToken } from '@angular/core';

export const COOKIES = new InjectionToken<string>('COOKIES');

export enum ExternalLoginStatus {
    Ok = 0,
    Error = 1,
    Invalid = 2,
    TwoFactor = 3,
    Lockout = 4,
    CreateAccount = 5
}
