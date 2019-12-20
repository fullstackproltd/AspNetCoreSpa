import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalStateService } from './modal-state.service';
import { ModalOptions } from '../models';

/**
 * A confirmation service, allowing to open a confirmation modal from anywhere and get back a promise.
 */
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NgbModal, private state: ModalStateService) {}

  /**
   * Opens a confirmation modal
   * @param options the options for the modal (title and message)
   * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
   * the user chooses not to confirm, or closes the modal
   */
  open(options: ModalOptions): Promise<any> {
    this.state.options = options;
    const size: any = options.size ? options.size : this.state.options.template || this.state.options.component ? 'lg' : 'sm';
    this.state.modal = this.modalService.open(this.state.options.component || this.state.template, {
      centered: true,
      windowClass: 'modal-holder',
      size,
      // Whether a backdrop element should be created for a given modal (true by default).
      // Alternatively, specify 'static' for a backdrop which doesn't close the modal on click.
      // backdrop: options.sticky ? "static" : true,
      // keyboard: options.sticky ? false : true
    });

    // Pass additional data to modal component as `data` input property
    // This will be available as @Input from within component that is passed as content of the modal.
    if (this.state.options.data) {
      this.state.modal.componentInstance.data = this.state.options.data;
    }

    return this.state.modal.result;
  }

  /**
   * Opens a warning modal
   * @param options the options for the modal (title and message)
   * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
   * the user chooses not to confirm, or closes the modal
   */
  warn(options: ModalOptions): Promise<any> {
    options.showButtons = false;
    options.okLabel = options.okLabel || 'Ok';
    options.cancelLabel = options.cancelLabel || 'Close';
    this.state.options = options;
    this.state.modal = this.modalService.open(this.state.template, {
      centered: true,
      size: this.state.options.template ? 'lg' : 'sm',
      // Whether a backdrop element should be created for a given modal (true by default).
      // Alternatively, specify 'static' for a backdrop which doesn't close the modal on click.
      // backdrop: options.sticky ? "static" : true,
      // keyboard: options.sticky ? false : true
    });

    return this.state.modal.result;
  }

  close(data?: any) {
    this.state.modal.close(data);
  }

  dismiss(data?: any) {
    this.state.modal.dismiss(data);
  }

  get hasOpenModals(): boolean {
    return this.modalService.hasOpenModals();
  }
}
