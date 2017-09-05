import { Component } from '@angular/core';

import { DataTablesService } from '../../../tables/components/dataTables/dataTables.service';

@Component({
  selector: 'nga-supplier-list',
  templateUrl: './supplierList.html',
  styleUrls: ['./supplierList.scss'],
})
export class SupplierListComponent {

  data;
  filterQuery = '';
  rowsOnPage = 10;
  sortBy = 'email';
  sortOrder = 'asc';

  constructor(private service: DataTablesService) {
    this.service.getData().then((data) => {
      this.data = data;
    });
  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }

}
