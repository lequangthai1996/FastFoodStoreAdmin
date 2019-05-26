import {Component, OnInit} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import './ckeditor.loader';
import 'ckeditor';
import {DropzoneComponent, DropzoneConfig, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {CategoryService} from '../../../../theme/services/category.service';
import {UnitService} from '../../../../theme/services/unit.service';
import {Http} from '@angular/http';
import {environment} from '../../../../../environments/environment';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../../../../theme/services/token.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../../../../theme/services/item.service';

@Component({
  selector: 'app-product-input',
  templateUrl: './inputProduct.html',
  styleUrls: ['./inputProduct.scss'],
})
export class InputProductComponent implements OnInit {
  public ckeditorContent = '<p>Hello CKEditor</p>';
  public config = {
    uiColor: '#F0F3F4',
    height: '300',
  };
  inputItemForm: FormGroup;
  id: number;
  isRemember = false;
  defaultPicture = 'assets/img/theme/no-photo.png';
  public profile: any;
  picture: 'assets/img/app/profile/Nasta.png';
  uploaderOptions: NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };
  categories: any;
  units: any;
  fileUploaderOptions: NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };
  categoriesChoise: Array<any>;
  imageItems: any;
  constructor(private categoryService: CategoryService,
              private unitService: UnitService,
              private http: Http,
              private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private route: ActivatedRoute,
              private router: Router,
              private itemService: ItemService,
              public  configDropZone: DropzoneConfig) {
    this.configDropZone.headers = {
      'Accept': 'application/json',
      'Authorization': this.tokenService.getToken()
    };
    this.profile = {
      picture: 'assets/img/app/profile/Nasta.png'
    };
    this.inputItemForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      category: new FormControl(0, [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required,
        Validators.minLength(0)]),
      unit: new FormControl('1', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      expiredAt: new FormControl('', [Validators.required]),
    });
    categoryService.getListCategory(1).subscribe(data => {
      console.log(data);
      this.categories = data;
    });
    unitService.getListUnit().subscribe(data => {
      console.log(data);
      this.units = data;
    });
    this.categoriesChoise = [];
    this.imageItems = [];
  }
  removeCategory(index) {
    this.categoriesChoise.splice(index, 1);
    console.log(this.categoriesChoise);
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {

        this.itemService.getItemById(this.id).subscribe(data => {
          this.categoriesChoise = data.category;
          this.imageItems = data.imageItems;
          setTimeout( () =>  {
            this.inputItemForm = this.formBuilder.group({
              name: new FormControl(data.name, [Validators.required]),
              category: new FormControl(0, [Validators.required]),
              price: new FormControl(data.price, [Validators.required]),
              quantity: new FormControl(data.quantity, [Validators.required,
                Validators.minLength(0)]),
              unit: new FormControl(data.unit.id, [Validators.required]),
              description: new FormControl(data.description, [Validators.required]),
              expiredAt: new FormControl('', [Validators.required]),
            });
            let i = 0;
            this.configDropZone.init = function () {
                i = i + 1;
                if (i === 1) {
                  let thisDropzone;
                  thisDropzone = this;
                  //// Create the mock file:
                  data.imageItems.forEach(item => {
                    const mockFile = {
                      name: 'Image detail',
                    };
                    console.log('init');
                    thisDropzone.emit('addedfile', mockFile);
                    thisDropzone.emit('thumbnail', mockFile, item.image);
                    thisDropzone.emit('complete', mockFile);
                  });
                }
            };
            // this.configDropZone = {
            //   uiColor: '#F0F3F4',
            //   height: '300',
            //   autoDiscover: false,
            //   init: function () {
            //     let thisDropzone;
            //     thisDropzone = this;
            //     //// Create the mock file:
            //     data.imageItems.forEach(item => {
            //       const mockFile = {
            //         name: 'Image detail',
            //       };
            //       console.log('init');
            //       thisDropzone.emit('addedfile', mockFile);
            //       thisDropzone.emit('thumbnail', mockFile, item.image);
            //       thisDropzone.emit('complete', mockFile);
            //     });
            //   }
            // };
          }, 3000);
        });
      } else {
        this.id = 0;
      }
    });
    // this.inputItemForm.controls['category'].valueChanges.subscribe(value => {
    //   console.log(value);
    // });
  }
  addCategory(id) {
    console.log(this.categoriesChoise.find(item => item.id === Number.parseInt(id)));
    if (this.categoriesChoise.find(item => item.id === Number.parseInt(id)) === undefined) {
      let category;
      category = this.categories.find(item => item.id === Number.parseInt(id));
      this.categoriesChoise.push(category);
    }
  }
  onRemoveFile(event) {
    if (event.status === 'error') {
      return false;
    }
    this.http.get(environment.hostname + '/upload/remove?filename=' + event.name).subscribe(data => {
      for (let count = 0; count < this.imageItems.length; count++) {
        if (this.imageItems[count].image === event.name) {
          this.imageItems.splice(count, 1);
        }
      }
    }, err => {
      // this.onRemoveFile(event);
    });
  }
  onUploadError(event) {
    console.log(event);
  }
  onUploadSuccess(event) {
    this.imageItems.push({'image' : event[0].name});
  }

  save(model) {
    let data;
    console.log(this.id);
    alert(this.imageItems[0].image);
    if (!this.id) {
      data = {
        'name': model.name,
        'price': model.price,
        'avatar': '/' + this.imageItems[0].image,
        'status': true,
        'quantity': model.quantity,
        'description': model.description,
        'expiredAt': model.expiredAt,
        'categories': this.categoriesChoise,
        'unit': {
          'id': Number.parseInt(model.unit)
        },
        'supplier': {
          'id': 1
        },
        'imageItems': this.imageItems
      };
      this.tokenService.postDataWithToken(environment.hostname + '/item/create', data)
        .subscribe(data2 => {
          alert('Create Success!');
        }, err => {
          alert('Create Fail!');
        });
    } else {
      data = {
        'id': this.id,
        'name': model.name,
        'price': model.price,
        'avatar': '/' + this.imageItems[0].image,
        'status': true,
        'quantity': model.quantity,
        'description': model.description,
        'expiredAt': model.expiredAt,
        'categories': this.categoriesChoise,
        'unit': {
          'id': Number.parseInt(model.unit)
        },
        'supplier': {
          'id': 1
        },
        'imageItems': this.imageItems
      };
      this.tokenService.putDataWithToken(environment.hostname + '/item/update', data)
        .subscribe(data2 => {
          alert('Update Success!');
        }, err => {
          alert('Update Fail!');
        });
    }
  }
}
