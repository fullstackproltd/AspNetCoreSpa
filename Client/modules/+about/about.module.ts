import { NgModule }       from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule }            from '../shared/shared.module';
import { AboutComponent } from './about.component';
import { AboutMeComponent } from './me/about-me.component';
import { AboutYouComponent } from './you/about-you.component';
import { routing }            from './about.routes';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [AboutComponent, AboutMeComponent, AboutYouComponent]
})
export class AboutModule { }
