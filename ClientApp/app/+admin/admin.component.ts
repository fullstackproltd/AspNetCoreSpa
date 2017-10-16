import { Component, OnInit } from '@angular/core';

import { DataService } from './../core/services/data.service';
import { AdminService } from './admin.service';

@Component({
    selector: 'appc-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
    public message: any;
    public loading: boolean;

    constructor(public adminService: AdminService, public apiGateway: DataService) { }

    public ngOnInit() {
        this.apiGateway.pendingCommands$.subscribe(x => {
            this.loading = x > 0;
        });
    }
    public doAdminOperation() {
        this.adminService.do()
            .subscribe(data => this.message = data);
    }
}
