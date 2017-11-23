/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}

interface IApplicationConfig {
    cultures: ICulture[];
    content: StringMap[];
    loginProviders: string[];
}

interface ICulture {
    value: string;
    text: string;
    current: boolean;
}

interface StringMap {
    [s: string]: string;
}
interface KeyValuePair<T> {
    key: string;
    value: T;
}

interface ISocialLogins {
    loginProvider: string;
    providerKey: string;
    providerDisplayName: string;
    active: boolean;
}

interface ITwoFactorModel {
    hasAuthenticator: boolean;

    recoveryCodesLeft: number;

    is2faEnabled: boolean;
}


interface IEnableAuthenticatorModel {
    code: string;
    sharedKey: string;
    authenticatorUri: string;
}