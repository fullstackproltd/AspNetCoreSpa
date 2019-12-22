import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/shared';

@Component({
  selector: 'appc-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.get('products/GetAll').subscribe(console.log);
  }
}
