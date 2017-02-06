import { Component } from '@angular/core';

import { AdminService } from './admin.service';

@Component({
    selector: 'appc--admin',
    styleUrls: ['./admin.component.scss'],
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    public message: any;

    constructor(public adminService: AdminService) { }

    public doAdminOperation() {
        this.adminService.do()
            .subscribe(data => this.message = data);
    }
}
