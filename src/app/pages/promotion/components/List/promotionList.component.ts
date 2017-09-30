import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../../../../environments/environment';
import {CategoryService} from '../../../../theme/services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './promotionList.html',
  styleUrls: ['./promotionList.scss'],
})
export class PromotionListComponent implements OnInit {

  public data: any[];
  public filterQuery = '';
  public rowsOnPage = 10;
  public activePage = 1;
  public sortBy = 'createdAt';
  public sortOrder = '+';
  public itemsTotal = 0;
  p = 1;
  constructor(private categoryService: CategoryService, private http: Http) {
  }
  public loadData() {
    let url;
    url = environment.hostname + '/promotion/all?page=' + (this.activePage - 1)  +
    '&size=' + this.rowsOnPage + '&sort=' + this.sortOrder + this.sortBy;
    this.http.get(url).
      map(res => res.json()).subscribe((data) => {
        setTimeout(() => {
          console.log(data);
          this.data = data.content;
          this.itemsTotal = data.totalElements;
        }, 1000);
      });
  }
  changeModel(event) {
    console.log(event);
    this.loadData();
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
