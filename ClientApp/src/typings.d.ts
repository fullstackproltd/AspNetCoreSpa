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
interface ILoginModel {
    username: string;
    password: string;
}

interface IProfileModel {
    sub: string | null;
    jti: string | null;
    useage: string | null;
    at_hash: string | null;
    nbf: number | null;
    exp: number | null;
    iat: number | null;
    iss: string | null;
    unique_name: string | null;
    email_confirmed: boolean;
    role: string[];
}

interface IRegisterModel {
    userName: string;
    password: string;
    confirmPassword: string;
    email: string;
    firstname: string;
    lastname: string;
}
