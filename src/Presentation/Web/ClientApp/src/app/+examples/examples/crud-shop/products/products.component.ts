import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { IAppTableOptions, FieldTypes } from '@app/models';
import { IProduct } from '../crud-shop.models';

@Component({
  selector: 'appc-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  options: IAppTableOptions<IProduct>;
  constructor() { }

  ngOnInit() {
    this.options = {
      title: 'Products',
      apiUrl: 'api/product',
      columns: [
        { prop: 'name', name: 'Name', fieldType: FieldTypes.Textbox, fieldValidations: [Validators.required] },
        { prop: 'description', name: 'Description', fieldType: FieldTypes.Textarea },
        { prop: 'icon', name: 'Icon', fieldType: FieldTypes.Textbox },
        { prop: 'buyingPrice', name: 'Buying price', fieldType: FieldTypes.Number, fieldValidations: [Validators.required] },
        { prop: 'sellingPrice', name: 'Selling price', fieldType: FieldTypes.Number, fieldValidations: [Validators.required] },
        { prop: 'unitsInStock', name: 'Units in stock', fieldType: FieldTypes.Number, fieldValidations: [Validators.required] },
        { prop: 'isActive', name: 'Is active', fieldType: FieldTypes.Checkbox },
        { prop: 'isDiscontinued', name: 'Is discontinued', fieldType: FieldTypes.Checkbox },
      ]
    };
  }

}
