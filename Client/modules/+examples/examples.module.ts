import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ExamplesComponent } from './examples.component';
import { ExamplesHomeComponent } from './examples-home/examples-home.component';
import { AnimationComponent } from './animation/animation.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { routing } from './examples.routes';
import { WikipediaService } from './typeahead/wikipedia.service';

@NgModule({
    imports: [routing, SharedModule],
    declarations: [
        ExamplesComponent,
        ExamplesHomeComponent,
        // Examples
        AnimationComponent,
        TypeaheadComponent
    ],
    providers: [WikipediaService]
})
export class ExamplesModule { }
