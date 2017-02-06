import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ExamplesComponent } from './examples.component';
import { ExamplesHomeComponent } from './examples-home/examples-home.component';
import { AnimationComponent } from './animation/animation.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AdvancedDirectivesModule } from './advanced-directives/advaned-directive.module';
import { WikipediaService } from './typeahead/wikipedia.service';
import { JqueryIntegrationComponent } from './jquery-integration/jquery-integration.component';
import { ChangeDetectionDefaultComponent } from './change-detection/comment-selection-2.component';
import { ChangeDetectionOnPushComponent } from './change-detection/comment-selection-1.component';
import { ChangeDetectionComponent } from './change-detection/change-detection.component';
import { ReactiveFormsExampleModules } from'./reactive-forms/product.module';
import { routing } from './examples.routes';
import { DatetimeComponent } from './datetime/datetime.component';

@NgModule({
    imports: [routing, SharedModule, AdvancedDirectivesModule, ReactiveFormsExampleModules],
    declarations: [
        ExamplesComponent,
        ExamplesHomeComponent,
        // Examples
        AnimationComponent,
        TypeaheadComponent,
        RxjsComponent,
        JqueryIntegrationComponent,
        ChangeDetectionComponent,
        ChangeDetectionOnPushComponent,
        ChangeDetectionDefaultComponent,
        DatetimeComponent
    ],
    providers: [WikipediaService]
})
export class ExamplesModule { }
