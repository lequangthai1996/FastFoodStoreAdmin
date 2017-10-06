import {Component, OnInit} from '@angular/core';

import { DataTablesService } from '../../../tables/components/dataTables/dataTables.service';
import {Http} from '@angular/http';
import {environment} from '../../../../../environments/environment';
import {TokenService} from '../../../../theme/services/token.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './adminList.html',
  styleUrls: ['./adminList.scss'],
})
export class AdminListComponent implements OnInit {

  public data: any[];
  public filterQuery = '';
  public rowsOnPage = 10;
  public activePage = 1;
  public sortBy = 'email';
  public sortOrder = '+';
  public itemsTotal = 0;
  p = 1;

  constructor(private service: DataTablesService, private http: Http, private tokenService: TokenService) {
    // this.service.getData().then((data) => {
    //   this.data = data;
    // });
  }
  public loadData() {
    this.http.get(environment.hostname + '/user/getUsersByAuthority/2?page=' + (this.activePage - 1)  +
      '&size=' + this.rowsOnPage + '&sort=' + this.sortOrder + this.sortBy).
      map(res => res.json()).subscribe((data) => {
        setTimeout(() => {
          console.log(data);
          this.data = data.content;
          this.itemsTotal = data.totalElements;
        }, 1000);
      });
  }
  sort(key) {
    this.sortOrder = this.sortOrder === '+' ? '-' : '+';
    this.sortBy = key;
    this.loadData();
  }
  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.city.length;
  }

  public remove(item) {
    let confirmDelete;
    confirmDelete = confirm('Are you sure delete it?');
    console.log(confirmDelete);
    if (confirmDelete) {
      let url;
      url = `${environment.hostname}/user/${item.id}`;
      this.tokenService.deleteDataWithToken(url).subscribe(data => {
        let index;
        index = this.data.indexOf(item);
        if (index > -1) {
          this.data.splice(index, 1);
        }
        alert('Delete Fail!');
      }, err => {
        alert('Delete Fail!');
      });
    }
  }
  pageChanged(event) {
    this.activePage = event;
    this.loadData();
    console.log(event);
  }
  public onPageChange(event) {
    this.rowsOnPage = event.rowsOnPage;
    this.activePage = event.activePage;
    this.loadData();
  }

  public onSortOrder(event) {
    this.loadData();
  }
  ngOnInit(): void {
    this.loadData();
  }
}