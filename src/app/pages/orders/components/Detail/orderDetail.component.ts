import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../../../../theme/services/token.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './orderDetail.html',
})
export class OrderDetailComponent implements OnInit {
  public data: any;
  transAt: string;
  status: number;
  id: number;
  constructor(private http: Http, private route: ActivatedRoute, private tokenService: TokenService) {
    this.data = {
      orderItems: []
    };
    this.transAt = '';
  }
  sort() {
  }
  public loadData() {
    this.http.get(environment.hostname + '/order/' + this.id).
    map(res => res.json()).subscribe((data) => {
      setTimeout(() => {
        console.log(data);
        this.data = data;
        this.status = data.status;
        this.transAt = data.transportedAt !== null ? data.transportedAt.split('T')[0] : '';
      }, 1000);
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadData();
    });
  }
  updateStatus() {
    let confirmUpdate;
    confirmUpdate = confirm('Are you sure change status?');
    if (confirmUpdate) {
      let url;
      url = `${environment.hostname}/order/${this.id}/status/${this.status}`;
      this.tokenService.putDataWithToken(url, null).subscribe(data => {
        alert('Update status success!');
      }, err => {
        alert('Update status fail!');
      });
    }
  }
}
