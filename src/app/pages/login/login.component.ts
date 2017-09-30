import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {Http, RequestOptions} from '@angular/http';
import swal from 'sweetalert2';
import {TokenService} from '../../theme/services/token.service';
import {ShareService} from '../../theme/services/share.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted = false;

  constructor(fb: FormBuilder, private http: Http,
              private tokenService: TokenService,
              private service: ShareService,
              private router: Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values): void {
    this.submitted = true;
    if (this.form.valid) {
      const url = environment.hostname + '/auth/admin';
      let data;
      data = {
        'username': values.email,
        'password': values.password,
      };
      this.tokenService.postDataWithToken(url, data).subscribe((a: any) => {
        console.log(a);
        this.tokenService.setToken(a);
        this.service.loginToken(a);
        swal('Thông báo', 'Đăng nhập thành công!', 'success');
        alert('Login success!');
        this.router.navigate(['/pages']);
      }, (err: any) => {
        if (err.status === 401) {
          swal('Thông báo', 'Email hoặc mật khẩu không tồn tại!', 'error');
        } else {
          swal('Thông báo', 'Đăng nhập thất bại!', 'error');
        }
      });
    }
  }
}
