import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { routing } from './profile.routes';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [ProfileComponent],
    providers: [ProfileService]
})
export class ProfileModule { }
