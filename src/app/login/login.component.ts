import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Customer } from '../common/Customer';
import { Login } from '../common/Login';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  show: boolean = false;
  login!: Login;


  isLoggedIn = false;
  isLoginFailed = false;

  roles: string[] = [];

  postForm: FormGroup;

  constructor(private toastr: ToastrService,
    private sessionService: SessionService,
    private router: Router,
    private authService: AuthService,
    private userService: CustomerService) {
    this.postForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    if (this.sessionService.getUser() != null) {
      window.location.href = ('/admin');
    }
  }

  Login() {
    this.login = this.postForm.value;

    
    this.authService.login(this.login).subscribe(
      (response: any) => {
        if (response.status !== 200) {
          this.toastr.error('Sai Thông Tin Đăng Nhập', 'Hệ thống');
          Swal.fire({
            icon: 'error',
            title: 'Đăng nhập thất bại!',
            showConfirmButton: false,
            timer: 1500
          });
          this.isLoginFailed = true;
          return;
        }

        const data = response.data; 
        this.sessionService.saveToken(data.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.userService.getByEmail(data.email).subscribe(
          (response: any) => {
            const userTemp: Customer = response.data as Customer;
          if (userTemp.roles[0].name == 'USER') {
            Swal.fire({
              icon: 'error',
              title: 'Đăng nhập thất bại!',
              showConfirmButton: false,
              timer: 1500
            })
            this.toastr.error('Sai Thông Tin Đăng Nhập', 'Hệ thống');
            this.isLoginFailed = true;
            this.sessionService.signOut();
            return;
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Đăng nhập thành công!',
              showConfirmButton: false,
              timer: 1500
            })

            this.router.navigate(['/admin']);
          }
        })
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại!',
          showConfirmButton: false,
          timer: 1500
        })
        this.toastr.error('Sai Thông Tin Đăng Nhập', 'Hệ thống');
        this.isLoginFailed = true;
      }
    );
  }

  toggle() {
    this.show = !this.show;
  }

}
