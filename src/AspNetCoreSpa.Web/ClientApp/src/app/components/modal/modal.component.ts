import { Component } from '@angular/core';

import { ModalStateService } from '@app/services';
import { IModalOptions } from '@app/models';

/**
 * The component displayed in the confirmation modal opened by the ModalService.
 */
@Component({
    selector: 'appc-modal-component',
    templateUrl: './modal.component.html'
})
export class ModalComponent {
    options: IModalOptions;

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
