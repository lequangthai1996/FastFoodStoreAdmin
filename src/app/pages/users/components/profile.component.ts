import {Component, OnInit} from '@angular/core';
import {NgUploaderOptions} from 'ngx-uploader/src/classes/ng-uploader-options.class';
import {BasicTablesService} from '../../tables/components/basicTables/basicTables.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../../../theme/services/token.service';
import {environment} from '../../../../environments/environment';
import {DropzoneConfig} from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./Admin/adminList.scss'],
})
export class ProfileComponent implements OnInit {
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
  public configDropZone = {
    thumbnailWidth: 300,
    thumbnailHeight: 300,
    thumbnailMethod: 'contain'
  };
  id: number;
  userForm: FormGroup;
  orders: any;
  constructor(private _basicTablesService: BasicTablesService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private tokenService: TokenService,
              public config: DropzoneConfig) {

    this.config.headers = {
      'Accept': 'application/json',
      'Authorization': this.tokenService.getToken()
    };
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
    this.id = 0;
  }
  onRemoveFile(event) {
    if (event.status === 'error') {
      return false;
    }
    // this.http.get(environment.hostname + '/upload/remove?filename=' + event.name).subscribe(data => {
    //   for (let count = 0; count < this.imageItems.length; count++) {
    //     if (this.imageItems[count].image === event.name) {
    //       this.imageItems.splice(count, 1);
    //     }
    //   }
    // }, err => {
    //   // this.onRemoveFile(event);
    // });
  }
  onUploadError(event) {
    console.log(event);
  }
  onUploadSuccess(event) {
    // this.imageItems.push({'image' : event[0].name});
  }
  ngOnInit(): void {
        let url;
        url = environment.hostname + '/user/getUserDetail';
        this.tokenService.getDataWithToken(url).subscribe(data => {
          setTimeout( () =>  {
            this.userForm = this.formBuilder.group({
              email: new FormControl(data.email, [Validators.required, Validators.email]),
              name: new FormControl(data.fullName, [Validators.required]),
              birthday: new FormControl((data.birthday != null) ? data.birthday.split('T')[0] : '',
                [Validators.required, Validators.pattern('[0-9]*')]),
              address: new FormControl(data.address, [Validators.required]),
              card: new FormControl(data.creditCard),
              gender: new FormControl(data.gender != null ? data.gender.toString() : 'true')
            });
            this.profile.picture = data.avatar;
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

  save(model) {
    if (!this.id) {
      let url, data;
      url = environment.hostname + '/user/createUser';
      data = {
        'username': model.email,
        'email': model.email,
        'password': '12356',
        'fullName': model.name,
        'address': model.address,
        'gender': model.gender,
        'birthday': model.birthday,
        'avatar': 'add',
        'creditCard': model.card,
        'authorities': this.checkboxModel
      };
      this.tokenService.postDataWithToken(url, data).subscribe(res => {
        alert('Create successful');
      });
    } else {
      let url, data;
      data = {
        'id': this.id,
        'username': model.email,
        'email': model.email,
        'password': '12356',
        'fullName': model.name,
        'address': model.address,
        'gender': model.gender,
        'birthday': model.birthday,
        'avatar': 'add',
        'creditCard': model.card,
        'authorities': this.checkboxModel.filter(item => item.checked === true)
      };
      console.log(data);
      url = environment.hostname + '/user/updateByAdmin';
      this.tokenService.putDataWithToken(url, data).subscribe(res => {
        alert('Update successful');
      });
    }
  }
}
