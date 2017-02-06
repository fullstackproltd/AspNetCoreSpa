import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsExampleComponent } from './reactive-forms.component';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';
import { ProductEditComponent } from './product-edit.component';

const routes: Routes = [
    {
        path: 'reactiveforms',
        component: ReactiveFormsExampleComponent,
        children: [
            { path: '', component: ProductListComponent },
            { path: 'product/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent },
            { path: 'productEdit/:id', canDeactivate: [ProductEditGuard], component: ProductEditComponent }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
