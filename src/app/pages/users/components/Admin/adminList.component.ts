import { Component } from '@angular/core';

import { DataTablesService } from '../../../tables/components/dataTables/dataTables.service';

@Component({
  selector: 'nga-admin-list',
  templateUrl: './adminList.html',
  styleUrls: ['./adminList.scss'],
})
export class AdminListComponent {

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
