import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormsService, AppFormComponent } from '@app/shared';
import { IFieldConfig, FieldTypes } from '@app/models';

@Component({
  selector: 'appc-forms-playground',
  templateUrl: './forms-playground.component.html',
  styleUrls: ['./forms-playground.component.scss']
})
export class FormsPlaygroundComponent implements OnInit {
  @ViewChild(AppFormComponent, { static: true }) form: AppFormComponent;
  config: IFieldConfig[];
  constructor(private formsService: FormsService) { }

  ngOnInit() {
    this.config = [
      {
        name: 'title',
        label: 'Title',
        type: FieldTypes.Select,
        validation: [Validators.required],
        options: [
          { key: 'mr', value: 'Mr' },
          { key: 'mrs', value: 'Mrs' },
          { key: 'dr', value: 'Dr' }
        ]
      },
      {
        name: 'username',
        label: 'Username',
        type: FieldTypes.Textbox,
        validation: [Validators.required]
      },
      {
        name: 'password',
        label: 'Password',
        type: FieldTypes.Password,
        validation: [Validators.required]
      },
      {
        name: 'email',
        label: 'Email',
        type: FieldTypes.Email,
        validation: [Validators.required, this.formsService.emailValidator]
      },
      {
        name: 'telephone',
        label: 'Telephone',
        type: FieldTypes.Number,
        validation: [Validators.required, this.formsService.telehponeValidator]
      },
      {
        name: 'dob',
        label: 'Date of birth',
        type: FieldTypes.Date,
        validation: [Validators.required, this.formsService.dateValidator]
      },
      {
        name: 'dot',
        label: 'Date of time',
        type: FieldTypes.Time,
        validation: [Validators.required]
      },
      {
        name: 'website',
        label: 'Website',
        type: FieldTypes.Textbox,
        validation: [Validators.required, this.formsService.domainValidator]
      },
      {
        name: 'bio',
        label: 'Bio',
        type: FieldTypes.Textarea,
        validation: [Validators.required]
      },
      {
        name: 'image',
        label: 'Image',
        type: FieldTypes.FileUpload,
        validation: [Validators.required]
      },
      {
        name: 'programmingLanguage',
        label: 'Programming language',
        type: FieldTypes.Checkboxlist,
        validation: [this.formsService.multipleCheckboxRequireMoreThanOne],
        options: [
          { key: 'c#', value: 'Csharp' },
          { key: '.net', value: 'Dotnet' }
        ]
      },
      {
        name: 'programmingExperience',
        label: 'Programming experience?',
        type: FieldTypes.Radiolist,
        validation: [Validators.required],
        options: [
          { key: 'high', value: 'High' },
          { key: 'medium', value: 'Medium' },
          { key: 'low', value: 'Low' }
        ]
      },
      {
        name: 'terms',
        label: 'Terms accepted?',
        type: FieldTypes.Checkbox,
        validation: [Validators.requiredTrue]
      },
      {
        name: 'button',
        label: 'Submit',
        type: FieldTypes.Button,
        onSubmit: this.onSubmit.bind(this)
      },
    ];
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
