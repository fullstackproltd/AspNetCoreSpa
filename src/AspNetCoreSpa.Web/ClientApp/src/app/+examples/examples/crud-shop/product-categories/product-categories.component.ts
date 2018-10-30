import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { IAppTableOptions, FieldTypes } from '@app/models';

import { IProductCategory } from '../crud-shop.models';

@Component({
  selector: 'appc-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {
  options: IAppTableOptions<IProductCategory>;
  constructor() { }

  ngOnInit() {
    this.options = {
      title: 'Product categories',
      apiUrl: 'api/productcategory',
      columns: [
        { prop: 'name', name: 'Name', fieldType: FieldTypes.Textbox, fieldValidations: [Validators.required] },
        { prop: 'description', name: 'Description', fieldType: FieldTypes.Textarea },
        { prop: 'icon', name: 'Icon', fieldType: FieldTypes.Textbox }
      ]
    };
  }
}
