import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  baseUrl:string="";
 
  constructor(private router: Router, private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  changPassWord(changePassword: any) {

    console.log(changePassword);
    const formData = new FormData()
    formData.append('current_password', changePassword.current_password);
    formData.append('new_password', changePassword.new_password);
    formData.append('confirm_password', changePassword.confirm_password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const result = this.httpclient.post(this.baseUrl + '/admin/change-password', formData);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  
  logout() {
    const a = this.httpclient.post('http://localhost/JWTAuthentication/api/auth/logout', '');
    return a.pipe(map((response: any) => {
      if (response) {
        localStorage.removeItem('currentUser');
      }
      return response;
    }));

  }

}
