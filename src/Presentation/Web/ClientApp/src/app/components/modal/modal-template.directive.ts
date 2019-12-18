import { Directive, TemplateRef } from '@angular/core';

import { ModalStateService } from '@app/services';

/**
 * Directive allowing to get a reference to the template containing the modal component,
 * and to store it into the internal modal state service. Somewhere in the view, there must be
 *
 * ```
 * <ng-template modal>
 *   <app-modal-component></app-modal-component>
 * </ng-template>
 * ```
 *
 * in order to register the modal template to the internal modal state
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[modal]'
})
export class ModalTemplateDirective {
    constructor(modalTemplate: TemplateRef<any>, state: ModalStateService) {
        state.template = modalTemplate;
    }
}
