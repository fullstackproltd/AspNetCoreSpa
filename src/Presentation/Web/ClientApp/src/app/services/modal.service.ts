import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalStateService } from './modal-state.service';
import { IModalOptions } from '@app/models';

/**
 * A confirmation service, allowing to open a confirmation modal from anywhere and get back a promise.
 */
@Injectable()
export class ModalService {

    constructor(private modalService: NgbModal, private state: ModalStateService) { }

    /**
     * Opens a confirmation modal
     * @param options the options for the modal (title and message)
     * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
     * the user chooses not to confirm, or closes the modal
     */
    confirm(options: IModalOptions): Promise<any> {
        this.state.options = options;
        this.state.modal = this.modalService.open(this.state.template, {
            centered: true,
            size: this.state.options.template ? 'lg' : 'sm'
            // Whether a backdrop element should be created for a given modal (true by default).
            // Alternatively, specify 'static' for a backdrop which doesn't close the modal on click.
            // backdrop: options.sticky ? "static" : true,
            // keyboard: options.sticky ? false : true
        });

        return this.state.modal.result;
    }

    close() {
        this.state.modal.close();
    }

    dismiss() {
        this.state.modal.dismiss();
    }
}
