import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountServiceService } from '../account-service.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  public model = {
    current_password: '',
    new_password: '',
    confirm_password: ''
  }
  constructor(private accountService: AccountServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  PasswordFormSubmit(f: NgForm) {
    console.log(f.value);
    if (f.valid) {
      this.accountService.changPassWord(f.value).subscribe(
        res => {
          if (res.success) {
            this.toastr.success('Change Password successfully.');
            f.reset();
          } else {
            this.toastr.error(res.message)
          }
        },
        err => {
          console.log(err.message)
          // this.toastr.error(res.message)
        }
      )
    }
  }

}
