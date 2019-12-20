import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

import { ButtonType } from '../../../../models';

@Component({
  selector: 'appc-action-button',
  styleUrls: ['./action-button.component.scss'],
  templateUrl: './action-button.component.html',
})
export class ActionButtonComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public click(event: Event) {
    this.params.click(this.params.data);
  }

  public show(): boolean {
    return this.params.show(this.params.data);
  }

  refresh(): boolean {
    return false;
  }

  public getButtonClass(): string {
    switch (this.params.buttonType as ButtonType) {
      case ButtonType.Secondary:
        return 'btn-secondary';
      case ButtonType.Success:
        return 'btn-success';
      case ButtonType.Warning:
        return 'btn-warning';
      case ButtonType.Danger:
        return 'btn-danger';
      default:
        return 'btn-primary';
    }
  }
}
