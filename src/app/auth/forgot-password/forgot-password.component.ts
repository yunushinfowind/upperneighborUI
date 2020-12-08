import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public model = {
    email: ''
  }
  showLoader:boolean=false;

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  forgotPassword(f: NgForm) {
    
    if (f.valid) {
      this.showLoader = true;
      this.authService.forgotPassword(f.value).subscribe(
        result => {
          this.showLoader = false;
          if (result.success) {
            this.toastr.success(result.message)
          } else {
            this.toastr.error(result.message)
          }
        }
      );
    }
  }
}
