import { Routes, RouterModule } from '@angular/router';

import { AnimationsComponent } from './animations.component';
import { AnimationsBasicExamplesComponent } from './basic-examples/basic-examples.component';
import { AnimationsRepeatingItemsComponent } from './repeating-items/repeating-items.component';

const routes: Routes = [
  {
    path: '', component: AnimationsComponent, children: [
      { path: 'basicanimation', component: AnimationsBasicExamplesComponent },
      { path: 'repeatinganimations', component: AnimationsRepeatingItemsComponent }
    ]
  },
];

export const routing = RouterModule.forChild(routes);
