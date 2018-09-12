import { Injectable } from '@angular/core';
import { DataService } from '@app/core';

import { ICustomer } from '../crud-shop.models';

@Injectable()
export class CustomersService {

  constructor(private dataService: DataService) { }

  get() {
    return this.dataService.get<ICustomer[]>('api/customers');
  }
}
