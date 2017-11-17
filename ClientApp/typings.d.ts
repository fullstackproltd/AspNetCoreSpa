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
}
