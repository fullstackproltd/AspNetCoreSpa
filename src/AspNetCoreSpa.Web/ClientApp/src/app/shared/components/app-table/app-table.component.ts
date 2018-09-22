import { Component, ViewChild, Input, ChangeDetectionStrategy, TemplateRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { clone } from 'lodash';

import { DataService, ModalService } from '@app/services';
import { IFieldConfig, IAppTableOptions, FieldTypes } from '@app/models';
import { ToastrService } from '@app/toastr';

@Component({
  selector: 'appc-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTableComponent implements OnInit {

  @ViewChild('appTable') table: DatatableComponent;
  @ViewChild('formTemplate') formTemplate: TemplateRef<any>;
  @Input() options: IAppTableOptions<any>;
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private modalService: ModalService,
    private cd: ChangeDetectorRef) { }
  ngOnInit() {
    this.getData();
  }
  getData() {
    this.dataService.get<Array<any>>(this.options.apiUrl)
      .subscribe(data => {
        this.options.rows = data;
        this.toastr.info('Data loaded.', 'Info');
        this.cd.markForCheck();
      });
  }
  create() {
    this.createOrEdit()
      .then(() => {
        this.getData();
      }, () => { });
  }
  edit(row, rowIndex) {
    // Form Template
    this.createOrEdit(row, rowIndex)
      .then(() => {

      }, () => { });
  }
  delete(row, rowIndex) {
    this.modalService.confirm({
      title: 'Delete',
      message: 'Are you sure you want to delete this data?'
    }).then(() => {
      this.dataService.delete(`${this.options.apiUrl}/${row.id}`)
        .subscribe(() => {
          this.options.rows = this.options.rows.filter(x => x.id !== row.id);
          this.toastr.success('Deleted successfully.', 'Info');
          this.cd.markForCheck();
        });
    }, () => { });
  }
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
  private createOrEdit(row = null, rowIndex = null): Promise<any> {
    const title = row ? 'Update' : 'Create';
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
      label: title,
      onSubmit: row ? update.bind(this) : create.bind(this)
    });

    function update(form) {
      if (form.valid) {
        this.dataService.put(`${this.options.apiUrl}/${row.id}`, { ...form.value })
          .subscribe(res => {
            row = Object.assign({}, row, form.value);
            this.options.rows[rowIndex] = row;
            this.options.rows = this.options.rows.slice();
            this.toastr.success('Updated successfully.', 'Success');
            this.modalService.close();
            this.cd.markForCheck();
          });
      }
    }

    function create(form) {
      if (form.valid) {
        this.dataService.post(this.options.apiUrl, { ...form.value })
          .subscribe(res => {
            this.toastr.success('Created successfully.', 'Success');
            this.modalService.close();
          });
      }
    }

    const template = clone(<any>this.formTemplate);
    template.data = { formConfig: fields, formModel: (row || {}) };

    return this.modalService.confirm({
      title,
      template,
    });

  }

}
