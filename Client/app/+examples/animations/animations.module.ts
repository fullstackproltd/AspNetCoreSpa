import { NgModule } from '@angular/core';

import { AnimationsComponent } from './animations.component';
import { SharedModule } from '../../shared/shared.module';
import { AnimationsRepeatingItemsComponent } from './repeating-items/repeating-items.component';
import { AnimationsBasicExamplesComponent } from './basic-examples/basic-examples.component';
import { routing } from './animations.routes';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [
        AnimationsComponent,
        AnimationsBasicExamplesComponent,
        AnimationsRepeatingItemsComponent
    ],
    providers: []
})
export class AnimationsModule { }
