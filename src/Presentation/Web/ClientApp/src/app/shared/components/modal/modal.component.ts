import { Component } from '@angular/core';
import { ModalStateService } from '../../services';
import { ModalOptions } from '../../models';

/**
 * The component displayed in the confirmation modal opened by the ModalService.
 */
@Component({
  selector: 'appc-modal-component',
  styleUrls: ['modal.component.scss'],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  options: ModalOptions;

  constructor(private state: ModalStateService) {
    this.options = state.options;
  }

  yes() {
    this.state.modal.close('confirmed');
  }

  no() {
    this.state.modal.dismiss('not confirmed');
  }
}
