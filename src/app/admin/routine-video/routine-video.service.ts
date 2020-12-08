import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutineVideoService {

  baseUrl: string = "";
  constructor(private router: Router, private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  addRoutineVideo(blogForm: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const result = this.httpclient.post(this.baseUrl + '/admin/add-routine-video', blogForm);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  createVideoSliceRecordong(sliceForm){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const result = this.httpclient.post(this.baseUrl + '/admin/create-slice-recording', sliceForm);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  addNotation(notationForm){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const result = this.httpclient.post(this.baseUrl + '/admin/create-notation', notationForm);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }
  routineVideoList(page,routineId,search) {
    const result = this.httpclient.get(this.baseUrl + '/user/routine-video-list' + '?page=' + page + '&routine_id=' + routineId + '&search=' + search
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

  routineVideoDetail(id: any) {
    const result = this.httpclient.get(this.baseUrl + '/admin/routine-video/' + id
    );
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  editRoutineVideo(videoForm: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const result = this.httpclient.post(this.baseUrl + '/admin/edit-routine-video', videoForm);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  deleteRoutineVideo(id: any) {
    const result = this.httpclient.delete(this.baseUrl + '/admin/delete-routine-video/' + id);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

}
