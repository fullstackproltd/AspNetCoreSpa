export interface AppGlobalRef {
    appData: IApplicationConfig;
}

export abstract class GlobalRef {
    abstract get nativeGlobal(): AppGlobalRef;
}

export class BrowserGlobalRef extends GlobalRef {
    get nativeGlobal(): AppGlobalRef { return <any>window as AppGlobalRef; }
}
