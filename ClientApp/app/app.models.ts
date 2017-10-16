export interface IGlobals {
    window: Window;
    document: Document;
}

export enum ExternalLoginStatus {
    Ok = 0,
    Error = 1,
    Invalid = 2,
    TwoFactor = 3,
    Lockout = 4,
    CreateAccount = 5
}
