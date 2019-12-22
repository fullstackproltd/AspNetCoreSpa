import { Component, OnInit } from '@angular/core';

import { ProductsClient, ProductDto } from '@app/api-client';
import { GridColumn } from '@app/shared';

@Component({
  selector: 'appc-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private productsClient: ProductsClient) {}
  products: ProductDto[];
  columns: GridColumn[];
  ngOnInit() {
    this.productsClient.getAll().subscribe(res => {
      this.products = res.products;
      this.columns = [
        {
          field: 'productId',
        },
        {
          field: 'productName',
        },
        {
          field: 'unitPrice',
        },
        {
          field: 'supplierCompanyName',
        },
        {
          field: 'categoryName',
        },
        {
          field: 'discontinued',
        },
      ];
    });
  }
}
