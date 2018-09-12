import { Component, OnInit } from '@angular/core';

import { CustomersService } from './customers.service';
import { IAppTableOptions } from '@app/shared';
import { ICustomer } from '../crud-shop.models';

@Component({
  selector: 'appc-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  options: IAppTableOptions<ICustomer>;

  constructor(private customerService: CustomersService) { }

  ngOnInit() {
    this.customerService.get().subscribe((data: ICustomer[]) => {
      this.options = {
        title: 'Customer list',
        rows: data,
        apiUrl: 'api/customers',
        columns: [
          { name: 'Name' },
          { name: 'Email' },
          { name: 'Phone number' },
          { name: 'Address', sortable: false }
        ]
      };
    });
  }

}
