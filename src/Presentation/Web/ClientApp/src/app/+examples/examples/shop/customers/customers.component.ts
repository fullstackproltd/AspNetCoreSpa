import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '@app/shared';

@Component({
  selector: 'appc-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.get('customers/GetAll').subscribe(console.log);
  }
}
