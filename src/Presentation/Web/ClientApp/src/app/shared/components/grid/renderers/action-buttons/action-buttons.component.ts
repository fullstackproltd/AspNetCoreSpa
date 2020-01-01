import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'appc-action-buttons',
  styleUrls: ['./action-buttons.component.scss'],
  templateUrl: './action-buttons.component.html',
})
export class ActionButtonsComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public primaryClicked($event: Event) {
    this.params.primaryClicked(this.params.data);
  }

  public secondaryClicked($event: Event) {
    this.params.secondaryClicked(this.params.data);
  }

  refresh(): boolean {
    return false;
  }
}
