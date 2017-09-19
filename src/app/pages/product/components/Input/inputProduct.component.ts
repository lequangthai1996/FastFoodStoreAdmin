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
  public configDropZone = {
  };
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
              private itemService: ItemService) {
    this.profile = {
      picture: 'assets/img/app/profile/Nasta.png'
    };
    categoryService.getListCategory(2).subscribe(data => {
      this.categories = data;
    });
    unitService.getListUnit().subscribe(data => {
      this.units = data;
    });
    this.inputItemForm = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        category: new FormControl(0, [Validators.required]),
        price: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required]),
        unit: new FormControl('1', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        expiredAt: new FormControl('', [Validators.required]),
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
          console.log(data);
          setTimeout( () =>  {
            this.inputItemForm = this.formBuilder.group({
              name: new FormControl(data.name, [Validators.required]),
              category: new FormControl(0, [Validators.required]),
              price: new FormControl(data.price, [Validators.required]),
              quantity: new FormControl(data.quantity, [Validators.required]),
              unit: new FormControl(data.unit.id, [Validators.required]),
              description: new FormControl(data.description, [Validators.required]),
              expiredAt: new FormControl('', [Validators.required]),
            });
            this.configDropZone = {
              uiColor: '#F0F3F4',
              height: '300',
              autoDiscover: false,
              init: function () {
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
          }, 2000);
        });
      } else {
        this.inputItemForm = this.formBuilder.group({
          name: new FormControl('', [Validators.required]),
          category: new FormControl(0, [Validators.required]),
          price: new FormControl('', [Validators.required]),
          quantity: new FormControl('', [Validators.required]),
          unit: new FormControl('1', [Validators.required]),
          description: new FormControl('', [Validators.required]),
          expiredAt: new FormControl('', [Validators.required]),
        });
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
    this.categoriesChoise.push(model.category);
    let data;
    data = {
      'name': model.name,
      'category': [
        {
          'id': Number.parseInt(model.category)
        }
      ],
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
    console.log(JSON.stringify(data));
    // let headers;
    // headers = new Headers();
    // headers.append('Authorization', this.tokenService.getToken());
    // headers.append('Accept', 'application/json');
    // this.tokenService.postDataWithToken(environment.hostname + '/item/create', headers, data).subscribe(data2 => {
    //   console.log(data2);
    // });
  }
}
