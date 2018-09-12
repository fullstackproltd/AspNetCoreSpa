import { Component, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';

import { DataService, ModalService } from '@app/core';
import { IAppTableOptions } from './app-table.model';

@Component({
  selector: 'appc-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTableComponent {

  @ViewChild('appTable') table: any;
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
  onEdit(row) {
    console.log('Edit', row);
  }
  onDelete(row) {
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
}
