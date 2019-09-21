import { Routes } from '@angular/router';

import { ExamplesComponent } from './examples.component';
import { FormsPlaygroundComponent } from './examples/forms-playground/forms-playground.component';

export const routes: Routes = [
    { path: '', component: ExamplesComponent, data: { displayText: 'Home' } },
    { path: 'forms-playground', component: FormsPlaygroundComponent, data: { displayText: 'Forms playground' } },
    { path: 'signalr', loadChildren: () => import('./examples/signalr/signalr.module').then(m => m.SignalrModule), data: { displayText: 'SignalR' } },
    { path: 'datatable', loadChildren: () => import('./examples/datatable/datatable.module').then(m => m.DatatableModule), data: { displayText: 'Datatable' } },
    { path: 'crud-shop', loadChildren: () => import('./examples/crud-shop/crud-shop.module').then(m => m.CrudShopModule), data: { displayText: 'CRUD Shop' } },
];
