import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { IAppTableOptions, FieldTypes } from '@app/models';
import { IOrder } from '../crud-shop.models';

@Component({
  selector: 'appc-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  options: IAppTableOptions<IOrder>;
  constructor() { }

  ngOnInit() {
    this.options = {
      title: 'Order list',
      apiUrl: 'api/order',
      columns: [
        { prop: 'id', name: 'Id' },
        { prop: 'discount', name: 'Discount', fieldType: FieldTypes.Textbox, fieldValidations: [Validators.required] },
        { prop: 'comments', name: 'Comments', fieldType: FieldTypes.Textarea },
      ]
    };
  }

}
