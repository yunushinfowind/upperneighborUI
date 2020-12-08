import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  user = {
    password: '',
    email: ''
  }
  showLoader: boolean = false;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  loginSubmit(f: NgForm) {
    if (f.valid) {
      this.showLoader = true;
      this.authService.login(f.value).subscribe(
        res => {
          this.showLoader = false;
          if (res.success) {
            this.toastr.success('Logged in');
            // this.router.navigateByUrl('/admin/dashboard')
            window.location.reload();
          } else {

            this.toastr.error(res.message)
          }
        },
      )
    }
  }
}
