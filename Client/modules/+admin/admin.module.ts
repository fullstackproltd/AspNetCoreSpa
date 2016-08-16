import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';

import { SharedModule }            from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { routing }            from './admin.routes';


@NgModule({
    imports: [CommonModule, routing, SharedModule],
    declarations: [AdminComponent],
    providers: [AdminService]
})
export class AdminModule { }
