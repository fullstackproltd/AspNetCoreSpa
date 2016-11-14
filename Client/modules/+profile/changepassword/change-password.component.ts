import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ProfileService } from '../profile.service';
import { ChangePasswordModel } from './change-password.model';
import { ValidationService } from '../../shared/forms/validation.service';

@Component({
    selector: 'appc-change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
    submitted: boolean = false;
    changePasswordForm: FormGroup;
    changePasswordModel: ChangePasswordModel = new ChangePasswordModel('', '', '');
    @Output() notification = new EventEmitter<string>();

    constructor(public profileService: ProfileService, private fb: FormBuilder) { }

    ngOnInit() {
        this.changePasswordForm = this.fb.group({
            oldPassword: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
            newPassword: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
            confirmPassword: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])]
        });
    }

    changePassword(): void {
        this.submitted = true;
        if (this.changePasswordForm.valid && this.changePasswordForm.dirty) {
            this.changePasswordModel.oldPassword = this.changePasswordForm.value.oldPassword;
            this.changePasswordModel.newPassword = this.changePasswordForm.value.newPassword;
            this.changePasswordModel.confirmPassword = this.changePasswordForm.value.confirmPassword;
            this.profileService.changePassword(this.changePasswordModel)
                .subscribe((res: any) => {
                    this.notification.emit(`Password changed successfully`);
                },
                (errors: any) => {
                    this.notification.emit(errors[0]);
                    this.changePasswordModel = new ChangePasswordModel('', '', '');
                });

        }
    }
}
