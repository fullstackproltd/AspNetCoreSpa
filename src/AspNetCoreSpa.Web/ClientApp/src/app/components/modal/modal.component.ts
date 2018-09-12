import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ModalStateService } from '@app/core';

/**
 * The component displayed in the confirmation modal opened by the ModalService.
 */
@Component({
    selector: 'appc-modal-component',
    templateUrl: './modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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
