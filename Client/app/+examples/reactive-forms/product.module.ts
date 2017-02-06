import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StarComponent } from './components/star.component';
import { SharedModule } from './../../shared/shared.module';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';
import { ProductEditComponent } from './product-edit.component';
import { ReactiveFormsExampleComponent } from './reactive-forms.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';
import { routing } from './product.routes';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ReactiveFormsExampleComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe,
    StarComponent
  ],
  providers: [
    ProductService,
    ProductDetailGuard,
    ProductEditGuard
  ]
})
export class ReactiveFormsExampleModules { }
