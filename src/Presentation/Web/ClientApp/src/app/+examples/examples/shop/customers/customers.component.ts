import { Component, OnInit } from '@angular/core';
import { CustomersClient, CustomerLookupDto } from '@app/api-client';
import { GridColumn } from '@app/shared';

@Component({
  selector: 'appc-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  constructor(private customerClient: CustomersClient) {}
  customers: CustomerLookupDto[];
  columns: GridColumn[];
  ngOnInit() {
    this.customerClient.getAll().subscribe(res => {
      this.customers = res.customers;
      this.columns = [
        {
          field: 'id',
          filter: true,
          sortable: true,
        },
        {
          field: 'name',
          filter: true,
          sortable: true,
        },
      ];
    });
  }
}
