import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';

import { routes } from './shop.routes';
import { ShopComponent } from './shop.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [ShopComponent, CustomersComponent, ProductsComponent],
})
export class ShopModule {}
