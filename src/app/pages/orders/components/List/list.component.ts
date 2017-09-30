import {Component, OnInit} from '@angular/core';

import { DataTablesService } from '../../../tables/components/dataTables/dataTables.service';
import {environment} from '../../../../../environments/environment';
import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
})
export class OrderListComponent implements OnInit {

  public data: any[];
  public filterQuery = '';
  public rowsOnPage = 10;
  public activePage = 1;
  public header: string;
  public status: number;
  public sortBy = 'createdAt';
  public sortOrder = '-';
  public itemsTotal = 0;
  p = 1;

  constructor(private service: DataTablesService, private http: Http,
              private route: ActivatedRoute) {
    // this.service.getData().then((data) => {
    //   this.data = data;
    // });
    this.header = route.snapshot.url[0].path;
    switch (this.header) {
      case 'approved':
        this.status = 2;
        break;
      case 'pending':
        this.status = 1;
        break;
      case 'canceled':
        this.status = 0;
        break;
      case 'finished':
        this.status = 3;
        break;
      default:
        this.status = 3;
        break;
    }
  }
  public loadData() {
    this.http.get(environment.hostname + '/order/getOrderByStatus?status=' + this.status + '&page=' + (this.activePage - 1)  +
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
    let index;
    index = this.data.indexOf(item);
    if (index > -1) {
      this.data.splice(index, 1);
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
