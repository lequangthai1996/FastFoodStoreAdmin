import { Routes, RouterModule } from '@angular/router';
import {PromotionComponent} from './promotion.component';
import {PromotionDetailComponent} from './components/Input/promotionDetail.component';
import {PromotionListComponent} from './components/List/promotionList.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: PromotionComponent,
    children: [
      { path: 'create', component: PromotionDetailComponent },
      { path: 'list', component: PromotionListComponent },
      { path: 'detail/:id', component: PromotionDetailComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
