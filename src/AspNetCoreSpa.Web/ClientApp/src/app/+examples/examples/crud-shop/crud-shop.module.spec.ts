import { CrudShopModule } from './crud-shop.module';

describe('CrudShopModule', () => {
  let crudShopModule: CrudShopModule;

  beforeEach(() => {
    crudShopModule = new CrudShopModule();
  });

  it('should create an instance', () => {
    expect(crudShopModule).toBeTruthy();
  });
});
