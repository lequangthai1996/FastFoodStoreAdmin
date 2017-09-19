import {Component, OnInit} from '@angular/core';
import {NgUploaderOptions} from 'ngx-uploader/src/classes/ng-uploader-options.class';
import {BasicTablesService} from '../../../tables/components/basicTables/basicTables.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../../../../theme/services/token.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './adminDetail.html',
  styleUrls: ['./adminList.scss'],
})
export class AdminDetailComponent implements OnInit {
  metricsTableData: Array<any>;
  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile: any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };
  public checkboxModel = [{
    id: 2,
    name: 'Admin',
    checked: false,
    class: 'col-md-4'
  }, {
    id: 3,
    name: 'Supplier',
    checked: false,
    class: 'col-md-4'
  }, {
    id: 1,
    name: 'Customer',
    checked: false,
    class: 'col-md-4'
  }];
  isDisabled = false;
  public checkboxPropertiesMapping = {
    model: 'checked',
    value: 'name',
    label: 'name',
    baCheckboxClass: 'class'
  };
  public uploaderOptions: NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };

  public fileUploaderOptions: NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };
  id: number;
  userForm: FormGroup;
  orders: any;
  constructor(private _basicTablesService: BasicTablesService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private tokenService: TokenService) {
    this.metricsTableData = _basicTablesService.metricsTableData;
    this.userForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      address: new FormControl('', [Validators.required]),
      card: new FormControl(''),
      gender: new FormControl('')
    });
    this.orders = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        let url;
        url = environment.hostname + '/user/getUserById/' + this.id;
        this.tokenService.getDataWithToken(url).subscribe(data => {
          setTimeout( () =>  {
            this.userForm = this.formBuilder.group({
              email: new FormControl(data.email, [Validators.required, Validators.email]),
              name: new FormControl(data.fullName, [Validators.required]),
              birthday: new FormControl(data.birthday.split('T')[0], [Validators.required, Validators.pattern('[0-9]*')]),
              address: new FormControl(data.address, [Validators.required]),
              card: new FormControl(data.creditCard),
              gender: new FormControl(data.gender.toString())
            });
          }, 2000);
          console.log(data);
          this.orders = data.orders;
          data.authorities.forEach(item => {
            this.checkboxModel.find(check => check.id === item.id).checked = true;
          });
        });
      //   url = environment.hostname + '/O'
      // this.tokenService.getDataWithToken()
      }
    });
  }

  save(model) {
    console.log(model);
    if (this.id) {
      let url, data;
      url = environment.hostname + '/user/getUserById/' + this.id;
      data = {};
      this.tokenService.postDataWithToken(url, data).subscribe(res => {
      });
    }
    console.log(this.checkboxModel);
  }
}
