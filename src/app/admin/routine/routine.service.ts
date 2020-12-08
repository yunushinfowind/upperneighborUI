import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  baseUrl: string = "";
  constructor(private router: Router, private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  addRoutine(blogForm: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const result = this.httpclient.post(this.baseUrl + '/admin/add-routine', blogForm);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  routineList(page,userid,search) {
    const result = this.httpclient.get(this.baseUrl + '/admin/routine-list' + '?page=' + page + '&user_id=' + userid + '&search=' + search
    );
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  allArtistList() {
    const result = this.httpclient.get(this.baseUrl + '/admin/artist-list');
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  routineDetail(id: any) {
    const result = this.httpclient.get(this.baseUrl + '/admin/routine/' + id
    );
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  editRoutine(teacherForm: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const result = this.httpclient.post(this.baseUrl + '/admin/edit-routine', teacherForm);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  deleteRoutine(id: any) {
    const result = this.httpclient.delete(this.baseUrl + '/admin/delete-routine/' + id);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

}
