export class MockAppService {
  public get appData(): IApplicationConfig {
    return <any>{
      content: {},
      cultures: [{}],
      cookieConsent: {},
      loginProviders: {}
    };
  }
}
