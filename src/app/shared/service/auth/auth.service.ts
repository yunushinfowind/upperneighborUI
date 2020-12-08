import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
// import configFile from '../../../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "";
  isLogged: BehaviorSubject<boolean>;
  constructor(private router: Router, private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  login(loginForm: any) {
    console.log(loginForm);
    const formData = new FormData()
    formData.append('email', loginForm.email);
    formData.append('password', loginForm.password);
    formData.append('role_id', '1');

    const body = formData;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const result = this.httpclient.post(this.baseUrl + '/auth/login', formData);
    return result.pipe(map((response: any) => {
      if (response && response.data) {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
      }
      return response;
    }));
  }

  forgotPassword(forgotPassword: any) {
    const formData = new FormData()
    formData.append('email', forgotPassword.email);
    const result = this.httpclient.post(this.baseUrl + '/admin/forgot-password', formData);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  getLoginUserId() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.id : false;
  }

  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.login_token : false;
  }

  getUserDetail() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    const formData = new FormData()
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    formData.append('email', currentUser.email);
    const a = this.httpclient.post(this.baseUrl + '/auth/logout', formData);
    return a.pipe(map((response: any) => {
      if (response) {
        localStorage.removeItem('currentUser');
        window.location.reload();
        return response;
      }
      
    }));
  }

  blogDetail(id: any) {
    const result = this.httpclient.get(this.baseUrl + '/user/blog/' + id
    );
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

}
