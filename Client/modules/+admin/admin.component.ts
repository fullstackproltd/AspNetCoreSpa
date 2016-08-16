import { Component } from '@angular/core';

import { AdminService } from './admin.service';

@Component({
    selector: 'appc--admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    message: any;

    constructor(private adminService: AdminService) { }

    doAdminOperation() {
        this.adminService.do()
            .subscribe(data => this.message = data);
    }
}
