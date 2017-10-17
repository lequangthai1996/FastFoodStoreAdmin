import { Routes, RouterModule } from '@angular/router';
import {OrderListComponent} from './components/List/list.component';
import {OrderComponent} from './orders.component';
import {OrderDetailComponent} from './components/Detail/orderDetail.component';
import {PaymentComponent} from './components/payment.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      { path: 'list', component: OrderListComponent },
      { path: 'approved', component: OrderListComponent },
      { path: 'pending', component: OrderListComponent },
      { path: 'canceled', component: OrderListComponent },
      { path: 'finished', component: OrderListComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'detail/:id', component: OrderDetailComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
