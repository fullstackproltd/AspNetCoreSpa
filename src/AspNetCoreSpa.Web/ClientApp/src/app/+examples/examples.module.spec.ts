import { ExamplesModule } from './examples.module';

describe('ExamplesModule', () => {
  let examplesModule: ExamplesModule;

  beforeEach(() => {
    examplesModule = new ExamplesModule();
  });

  it('should create an instance', () => {
    expect(examplesModule).toBeTruthy();
  });
});
