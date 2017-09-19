import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { HttpModule } from '@angular/http';
import { DataTablesService } from '../tables/components/dataTables/dataTables.service';
import { DataTableModule } from 'angular2-datatable';
import {PagerModule} from 'ng2-smart-table/components/pager/pager.module';
import {TablesModule} from '../tables/tables.module';
import {OrderListComponent} from './components/List/list.component';
import {OrderComponent} from './orders.component';
import {routing} from './orders.routing';
import {OrderDetailComponent} from './components/Detail/orderDetail.component';

@NgModule({
  imports: [
    NgaModule,
    HttpModule,
    FormsModule,
    DataTableModule,
    CommonModule,
    PagerModule,
    routing,
    TablesModule
  ],
  declarations: [
    OrderComponent,
    OrderListComponent,
    OrderDetailComponent
    ],
  providers: [
    DataTablesService,
  ],
})
export class OrdersModule {
}
