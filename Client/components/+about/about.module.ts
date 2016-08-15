import { NgModule }       from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule }            from '../shared/shared.module';
import { AboutComponent } from './about.component';
import { AboutMeComponent } from './+me';
import { AboutYouComponent } from './+you';
import { routing }            from './about.routes';

@NgModule({
    imports: [CommonModule, routing, SharedModule],
    declarations: [AboutComponent, AboutMeComponent, AboutYouComponent],
    providers: []
})
export class AboutModule { }
