import { Routes, RouterModule } from '@angular/router';

import { ExamplesComponent } from './examples.component';
import { ExamplesHomeComponent } from './examples-home/examples-home.component';
import { AnimationComponent } from './animation/animation.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { JqueryIntegrationComponent } from './jquery-integration/jquery-integration.component';
import { ChangeDetectionComponent } from './change-detection/change-detection.component';
import { DatetimeComponent } from './datetime/datetime.component';
import { AdvancedDirectivesComponent } from './advanced-directives/advanced-directive.component';

const routes: Routes = [
  {
    path: '', component: ExamplesComponent, children: [
      { path: '', component: ExamplesHomeComponent },
      { path: 'animation', component: AnimationComponent },
      { path: 'typeahead', component: TypeaheadComponent },
      { path: 'rxjs', component: RxjsComponent },
      { path: 'advanceddirectives', component: AdvancedDirectivesComponent },
      { path: 'jqueryintegration', component: JqueryIntegrationComponent },
      { path: 'datetime', component: DatetimeComponent },
      {
        path: 'reactiveforms',
        loadChildren: './reactive-forms/product.module#ReactiveFormsExampleModules'
      },
      { path: 'changedetection', component: ChangeDetectionComponent },
      { path: '', loadChildren: './component/component-home.module#ComponentModule' }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
