import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../../../../environments/environment';
import {CategoryService} from '../../../../theme/services/category.service';
import {TokenService} from '../../../../theme/services/token.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './productList.html',
  styleUrls: ['./productList.scss'],
})
export class ProductListComponent implements OnInit {

  public data: any[];
  public filterQuery = '';
  public rowsOnPage = 5;
  public activePage = 1;
  public sortBy = 'createdDate';
  public sortOrder = 'A';
  public itemsTotal = 0;
  public category = null;
  p = 1;
  public categories = null;
  constructor(private categoryService: CategoryService, private http: Http, private tokenService: TokenService) {
    this.categories = [];
    categoryService.getListCategory(2).subscribe(result => {
      this.categories = result['data'];
    });
  }
  public loadData() {
    let url;
    url = /*environment.hostname*/ "http://localhost:9000" + '/items/all?page=' + (this.activePage - 1)  +
    '&size=' + this.rowsOnPage + '&sort=' + this.sortOrder + this.sortBy + ((this.category === null) ? '' : ('&category=' + this.category));
    console.log(url);
    this.http.get(url).
      map(res => res.json()).subscribe((result) => {
        console.log(result);
        setTimeout(() => {
          console.log(result);
          this.data = result.data.content;
          this.itemsTotal = result.data.totalElements;
        }, 1000);
      });
  }
  changeModel(event) {
    console.log(event);
    this.loadData();
  }
  sort(key) {
    this.sortOrder = this.sortOrder;
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
      url = `${environment.hostname}/item/delete/${item.id}`;
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
