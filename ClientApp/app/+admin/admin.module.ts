import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { routing } from './admin.routes';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [AdminComponent],
    providers: [AdminService]
})
export class AdminModule { }
