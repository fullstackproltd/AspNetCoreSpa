import { Component, OnInit } from '@angular/core';

import { ProductsClient, ProductDto } from '@app/api-client';
import { GridColumn, GridFieldType } from '@app/shared';
import { LargeTextCellEditor } from 'ag-grid-community';

@Component({
  selector: 'appc-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private productsClient: ProductsClient) {}
  products: ProductDto[];
  columns: GridColumn[] = [
    {
      field: 'productId',
      type: GridFieldType.Number,
      filter: true,
      sortable: true,
      width: 100,
    },
    {
      field: 'productName',
      filter: true,
      sortable: true,
      width: 180,
    },
    {
      field: 'unitPrice',
      type: GridFieldType.Number,
      filter: true,
      sortable: true,
      width: 120,
    },
    {
      field: 'supplierCompanyName',
      filter: true,
      sortable: true,
    },
    {
      field: 'categoryName',
      filter: true,
      sortable: true,
      width: 160,
    },
    {
      field: 'discontinued',
      type: GridFieldType.Boolean,
      filter: true,
      sortable: true,
      width: 120,
    },
    {
      type: GridFieldType.ActionButtons,
      cellRendererParams: {
        primaryClicked: this.editProduct.bind(this),
        secondaryClicked: this.deleteProduct.bind(this),
        primaryLabel: 'Edit Product',
        secondaryLabel: 'Delete Product',
      },
    },
  ];
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.productsClient.getAll().subscribe(res => {
      this.products = res.products;
    });
  }
  editProduct(product: ProductDto) {
    console.log(product);

    // this.productsClient.delete(product.productId).subscribe(this.getData);
  }

  deleteProduct(product: ProductDto) {
    this.productsClient.delete(product.productId).subscribe(this.getData);
  }
}
