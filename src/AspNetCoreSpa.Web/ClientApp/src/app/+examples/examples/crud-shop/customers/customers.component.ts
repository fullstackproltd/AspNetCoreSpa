import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Validators } from '@angular/forms';

import { ICustomer, Gender } from '../crud-shop.models';
import { FieldTypes, IAppTableOptions } from '@app/models';

@Component({
  selector: 'appc-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  @ViewChild('addressTemplate', { static: true }) addressTemplate: TemplateRef<any>;
  @ViewChild('genderTemplate', { static: true }) genderTemplate: TemplateRef<any>;
  options: IAppTableOptions<ICustomer>;
  constructor() { }

  ngOnInit() {
    this.options = {
      title: 'Customer list',
      apiUrl: 'api/customer',
      detailsTemplate: this.addressTemplate,
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
          cellTemplate: this.genderTemplate,
          fieldType: FieldTypes.Select,
          fieldOptions: [
            { key: Gender.Male, value: 'Male' },
            { key: Gender.Female, value: 'Female' }
          ]
        }
      ]
    };
  }

}
