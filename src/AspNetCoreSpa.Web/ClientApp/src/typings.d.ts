/* SystemJS module definition */
declare var module: NodeModule;
declare var global: NodeJS.Global;
declare module NodeJS {
    interface Global {
        appData: IApplicationConfig
    }
}
interface NodeModule {
    id: string;
}

interface IApplicationConfig {
    cultures: ICulture[];
    content: StringMap[];
    loginProviders: string[];
    cookieConsent: ICookieConsent;
    stsAuthority: string;
}

interface ICulture {
    value: string;
    text: string;
    current: boolean;
}

interface StringMap {
    [s: string]: string;
}
interface ICookieConsent {
    showConsent: boolean;
    cookieString: string;
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

/**
 * Options passed when opening a confirmation modal
 */
interface IModalOptions {
    /**
     * The title of the confirmation modal
     */
    title: string;

    /**
     * The message in the confirmation modal
     */
    message: string;
}