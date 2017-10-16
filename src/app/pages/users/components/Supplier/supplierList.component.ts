import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../../../../environments/environment';
import {TokenService} from '../../../../theme/services/token.service';

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

  constructor(private http: Http, private tokenService: TokenService) {
  }
  public loadData() {
    this.tokenService.getDataWithToken(environment.hostname + '/user/getUsersByAuthority/3?page=' + (this.activePage - 1)  +
      '&size=' + this.rowsOnPage + '&sort=' + this.sortOrder + this.sortBy).
    subscribe((data) => {
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
  ngOnInit(): void {
    this.loadData();
  }

}
