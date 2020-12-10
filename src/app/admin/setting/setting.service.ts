import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  baseUrl: string = "";
  constructor(private router: Router, private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  updateSetting(settingForm: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const result = this.httpclient.post(this.baseUrl + '/admin/update-settings', settingForm);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

 

  getSettings() {
    const result = this.httpclient.get(this.baseUrl + '/admin/get-settings');
    return result.pipe(map((response: any) => {
      return response;
    }));
  }


}
