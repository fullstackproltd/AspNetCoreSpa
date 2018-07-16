import { TranslationModule } from './translation.module';

describe('TranslationModule', () => {
  let translationModule: TranslationModule;

  beforeEach(() => {
    translationModule = new TranslationModule();
  });

  it('should create an instance', () => {
    expect(translationModule).toBeTruthy();
  });
});
