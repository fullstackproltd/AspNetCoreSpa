import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Validators } from '@angular/forms';

import { CustomersService } from './customers.service';
import { ICustomer, Gender } from '../crud-shop.models';
import { FieldTypes, IAppTableOptions } from '@app/models';

@Component({
  selector: 'appc-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  options: IAppTableOptions<ICustomer>;
  constructor(
    private customerService: CustomersService,
  ) { }

  ngOnInit() {
    this.customerService.get().subscribe((data: ICustomer[]) => {
      this.options = {
        title: 'Customer list',
        rows: data,
        apiUrl: 'api/customers',
        columns: [
          { prop: 'name', name: 'Name', fieldType: FieldTypes.Textbox, fieldValidations: [Validators.required] },
          { prop: 'email', name: 'Email', fieldType: FieldTypes.Email, fieldValidations: [Validators.required] },
          { prop: 'dateOfBirth', name: 'Date of birth', fieldType: FieldTypes.Date, fieldValidations: [Validators.required] },
          { prop: 'phoneNumber', name: 'Phone number', fieldType: FieldTypes.Number },
          { prop: 'address', name: 'Address', fieldType: FieldTypes.Textarea },
          { prop: 'city', name: 'City', fieldType: FieldTypes.Textbox },
          {
            prop: 'gender',
            name: 'Gender',
            fieldType: FieldTypes.Select,
            fieldOptions: [
              { key: Gender.Male, value: 'Male' },
              { key: Gender.Female, value: 'Female' }
            ]
          },
        ]
      };
    });
  }

}
