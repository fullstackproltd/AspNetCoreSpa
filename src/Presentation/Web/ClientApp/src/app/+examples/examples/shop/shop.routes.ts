import { ShopComponent } from './shop.component';
import { CustomersComponent } from './customers/customers.component';

export const routes = [
  {
    path: '',
    component: ShopComponent,
    data: { displayText: 'Shop' },
    children: [
      { path: '', redirectTo: 'customers' },
      { path: 'customers', component: CustomersComponent, data: { state: 'customers', displayText: 'Customers' } },
    ],
  },
];
