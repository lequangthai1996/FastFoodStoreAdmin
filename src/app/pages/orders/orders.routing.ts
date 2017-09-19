import { Routes, RouterModule } from '@angular/router';
import {OrderListComponent} from './components/List/list.component';
import {OrderComponent} from './orders.component';
import {OrderDetailComponent} from './components/Detail/orderDetail.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      { path: 'list', component: OrderListComponent },
      { path: 'approved', component: OrderListComponent },
      { path: 'pending', component: OrderListComponent },
      { path: 'detail/:id', component: OrderDetailComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
