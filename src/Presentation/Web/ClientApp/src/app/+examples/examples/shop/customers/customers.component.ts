import { Component, OnInit } from '@angular/core';
import { CustomersClient } from '@app/api-client';

@Component({
  selector: 'appc-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  constructor(private customerClient: CustomersClient) {}

  ngOnInit() {
    this.customerClient.getAll().subscribe(res => console.log(res.customers));
  }
}
