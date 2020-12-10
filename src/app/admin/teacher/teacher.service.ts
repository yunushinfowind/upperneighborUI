import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseUrl: string = "";
  constructor(private router: Router, private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  addTeacher(blogForm: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const result = this.httpclient.post(this.baseUrl + '/admin/add-teacher', blogForm);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  teacherList(page,search) {
    const result = this.httpclient.get(this.baseUrl + '/user/teacher-list' + '?page=' + page+'&search='+search
    );
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  teacherDetail(id: any) {
    const result = this.httpclient.get(this.baseUrl + '/admin/teacher/' + id
    );
    return result.pipe(map((response: any) => {
      return response;
    }));
  }
  editTeacher(teacherForm: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const result = this.httpclient.post(this.baseUrl + '/admin/edit-teacher', teacherForm);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  updateStatus(teacherForm: any) {
    const result = this.httpclient.post(this.baseUrl + '/admin/update-status', teacherForm);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }
  getEmojiList(group:any){
    const result = this.httpclient.get(this.baseUrl + '/admin/get-emojis' + '?group=' + group
    );
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  deleteTeacher(id: any) {
    const result = this.httpclient.delete(this.baseUrl + '/admin/delete-teacher/' + id);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

}
