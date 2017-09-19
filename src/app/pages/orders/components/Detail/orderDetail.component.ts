import { Component } from '@angular/core';
import {NgUploaderOptions} from 'ngx-uploader/src/classes/ng-uploader-options.class';
import {BasicTablesService} from '../../../tables/components/basicTables/basicTables.service';
import {DataTablesService} from '../../../tables/components/dataTables/dataTables.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './orderDetail.html',
})
export class OrderDetailComponent {
  metricsTableData: Array<any>;
  constructor(private _basicTablesService: BasicTablesService) {
    this.metricsTableData = _basicTablesService.metricsTableData;
  }
}
