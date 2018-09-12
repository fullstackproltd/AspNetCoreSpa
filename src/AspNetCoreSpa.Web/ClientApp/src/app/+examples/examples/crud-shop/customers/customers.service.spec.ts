import { TestBed } from '@angular/core/testing';

import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomersService = TestBed.get(CustomersService);
    expect(service).toBeTruthy();
  });
});
