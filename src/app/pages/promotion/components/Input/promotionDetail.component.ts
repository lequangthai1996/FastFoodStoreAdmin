import {Component, OnInit} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import './ckeditor.loader';
import 'ckeditor';
import {DropzoneComponent, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {CategoryService} from '../../../../theme/services/category.service';
import {UnitService} from '../../../../theme/services/unit.service';
import {Http} from '@angular/http';
import {environment} from '../../../../../environments/environment';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../../../../theme/services/token.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../../../../theme/services/item.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotionDetail.html',
  styleUrls: ['./promotionDetail.scss'],
})
export class PromotionDetailComponent implements OnInit {
  inputItemForm: FormGroup;
  id: number;
  isRemember = false;
  public profile: any;
  units: any;
  public data: any[];
  item: any;
  items: any[];
  public filterQuery = '';
  public rowsOnPage = 10;
  public activePage = 1;
  public sortBy = 'createdAt';
  public sortOrder = '+';
  public itemsTotal = 0;
  model: any;
  constructor(private http: Http,
              private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private route: ActivatedRoute,
              private router: Router,
              private itemService: ItemService) {
    this.profile = {
      picture: 'assets/img/app/profile/Nasta.png'
    };
    this.inputItemForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      endAt: new FormControl('', [Validators.required]),
      fromAt: new FormControl('', [Validators.required]),
    });
    this.id = 0;
    this.item = '';
    this.data = [];
  }
  filterItem() {
    console.log(this.filterQuery);
    this.itemService.filterOfSupplier(this.filterQuery, 1).subscribe(data => {
      this.model.items = data;
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.tokenService.getDataWithToken(environment.hostname + '/promotion/' + this.id)
          .subscribe(data => {
            setTimeout( () =>  {
              this.inputItemForm = this.formBuilder.group({
                title: new FormControl(data.title, [Validators.required]),
                endAt: new FormControl(data.endAt !== null ? data.endAt.split('T')[0] : '', [Validators.required]),
                fromAt: new FormControl(data.fromAt !== null ? data.fromAt.split('T')[0] : '', [Validators.required]),
              });
              data.promotionItems.forEach(promotionItem => {
                this.data.push({item : {id: promotionItem.item.id}, percent: promotionItem.percent,
                  items: [promotionItem.item], submit: true});
                });
              this.data.push({item : {id: null}, percent: null,
                items: [], submit: false});
              this.model = this.data[this.data.length - 1];
              console.log(this.data);
              }, 1000);
          });
      } else {
        this.id = 0;
        this.inputItemForm = this.formBuilder.group({
          title: new FormControl('', [Validators.required]),
          endAt: new FormControl('', [Validators.required]),
          fromAt: new FormControl('', [Validators.required]),
        });
        this.data.push({item : {id: null}, percent: null,
          items: [], submit: false});
        this.model = this.data[this.data.length - 1];
      }
    });
    // this.inputItemForm.controls['category'].valueChanges.subscribe(value => {
    //   console.log(value);
    // });
  }
  addItem(item) {
    console.log(this.data);
    this.model.submit = true;
    this.data.push({item : {id: null}, percent: null,
      items: [], submit: false});
    this.model = this.data[this.data.length - 1];
  }
  remove(index) {
    if (this.id) {
      let confirmDelete;
      confirmDelete = confirm('Are you sure delete it?');
      console.log(confirmDelete);
      if (confirmDelete) {
        let url;
        url = `${environment.hostname}/item/delete/${this.data[index].id}`;
        this.tokenService.deleteDataWithToken(url).subscribe(data => {
          this.data.splice(index, 1);
          alert('Delete Success!');
        }, err => {
          alert('Delete Fail!');
        });
      }
    } else {
      this.data.splice(index, 1);
    }
  }
  save(model) {
    console.log('submit');
    this.data.pop();
    let data;
    if (!this.id) {
      data = {
        'title': model.title,
        'endAt': model.endAt,
        'fromAt': model.fromAt,
        'promotionItems': this.data
      };
      this.tokenService.postDataWithToken(environment.hostname + '/promotion', data)
        .subscribe(data2 => {
          swal('Information', 'Add Promotion Success', 'success');
          alert('Add Promotion Success');
          console.log(data2);
        });
    } else {
      data = {
        'id': this.id,
        'title': model.title,
        'endAt': model.endAt,
        'fromAt': model.fromAt,
        'promotionItems': this.data
      };
      this.tokenService.putDataWithToken(environment.hostname + '/promotion', data)
        .subscribe(data2 => {
          alert('Update Promotion Success');
          console.log(data2);
        });
    }
  }
}
