import { Component, ViewChild, Input, ChangeDetectionStrategy, TemplateRef } from '@angular/core';

import { DataService, ModalService } from '@app/core';
import { IFieldConfig, IAppTableOptions, FieldTypes } from '@app/models';
import { AppFormComponent } from '@app/shared/components/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'appc-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTableComponent {

  @ViewChild('appTable') table: DatatableComponent;
  @ViewChild('formTemplate') formTemplate: TemplateRef<any>;
  @ViewChild('form') formRef: AppFormComponent;
  @Input() options: IAppTableOptions<any>;
  constructor(private dataService: DataService, private modalService: ModalService) { }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  onPage(event) {
    console.log('Page event', event);
  }
  onNew(row) {
    console.log('New', row);
  }
  onEdit(row, rowIndex) {
    // Form Template
    const template = <any>this.formTemplate;
    const formConfig = this.getFormFields(row, rowIndex);
    template.data = { formConfig, formModel: row };

    this.modalService.confirm({
      title: 'Edit',
      message: 'Edit the row',
      template,
    }).then(() => { }, () => { });

  }
  onDelete(row, rowIndex) {
    this.modalService.confirm({
      title: 'Delete',
      message: 'Are you sure you want to delete this data?'
    }).then(() => {
      this.dataService.delete(`${this.options.apiUrl}/${row.id}`)
        .subscribe(() => {
          this.options.rows = this.options.rows.filter(x => x.id !== row.id);
        });
    }, () => { });
  }

  private getFormFields(row, rowIndex): IFieldConfig[] {
    const fields = this.options.columns
      .filter(f => f.fieldType)
      .map(x => {
        const field: IFieldConfig = {
          name: x.prop.toString(),
          type: x.fieldType,
          label: x.name,
          validation: x.fieldValidations,
          options: x.fieldOptions,
        };
        return field;
      });

    fields.push({
      name: 'button',
      type: FieldTypes.Button,
      label: 'Submit',
      onSubmit: update.bind(this)
    });

    function update() {
      if (this.formRef.valid) {
        this.dataService.put(`${this.options.apiUrl}/${row.id}`, { ...this.formRef.value })
          .subscribe(res => {
            row = Object.assign({}, row, this.formRef.value);
            this.options.rows[rowIndex] = row;
            this.options.rows = this.options.rows.slice();
            this.modalService.dismiss();
          });
      }
    }

    return fields;
  }
}
