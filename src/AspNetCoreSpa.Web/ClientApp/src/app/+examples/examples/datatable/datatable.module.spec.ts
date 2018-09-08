import { DatatableModule } from './datatable.module';

describe('DatatableModule', () => {
  let datatableModule: DatatableModule;

  beforeEach(() => {
    datatableModule = new DatatableModule();
  });

  it('should create an instance', () => {
    expect(datatableModule).toBeTruthy();
  });
});
