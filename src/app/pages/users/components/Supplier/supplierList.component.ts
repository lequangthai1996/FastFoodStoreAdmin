import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplierList.html',
  styleUrls: ['./supplierList.scss'],
})
export class SupplierListComponent implements OnInit {
  public data: any[];
  public filterQuery = '';
  public rowsOnPage = 10;
  public activePage = 1;
  public sortBy = 'email';
  public sortOrder = '+';
  public itemsTotal = 0;
  p = 1;

  constructor(private http: Http) {
  }
  public loadData() {
    this.http.get(environment.hostname + '/user/getUsersByAuthority/3?page=' + (this.activePage - 1)  +
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
  ngOnInit(): void {
    this.loadData();
  }

}
