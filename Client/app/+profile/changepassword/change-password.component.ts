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
    public submitted = false;
    public errors: string[];
    public changePasswordForm: FormGroup;
    public changePasswordModel: ChangePasswordModel = new ChangePasswordModel('', '', '');
    @Output() public notification = new EventEmitter<string>();

    constructor(public profileService: ProfileService, public fb: FormBuilder) { }

    public ngOnInit() {
        this.changePasswordForm = this.fb.group({
            oldPassword: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
            newPassword: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
            confirmPassword: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])]
        });
    }
    public changePassword(): void {
        this.submitted = true;
        if (this.changePasswordForm.valid && this.changePasswordForm.dirty) {
            this.changePasswordModel.oldPassword = this.changePasswordForm.value.oldPassword;
            this.changePasswordModel.newPassword = this.changePasswordForm.value.newPassword;
            this.changePasswordModel.confirmPassword = this.changePasswordForm.value.confirmPassword;
            this.profileService.changePassword(this.changePasswordModel)
                .subscribe((res: any) => {
                    this.notification.emit(`Password changed successfully`);
                });

        }
    }
}
