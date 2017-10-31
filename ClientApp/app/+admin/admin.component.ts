import { Component, OnInit } from '@angular/core';


import { AdminService } from './admin.service';

import { DataService } from '../core';

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
            .subscribe((data: any) => this.message = data);
    }
}
