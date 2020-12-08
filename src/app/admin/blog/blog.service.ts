import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl: string = "";
  constructor(private router: Router, private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  addBlog(blogForm: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const result = this.httpclient.post(this.baseUrl + '/admin/add-blog', blogForm);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  blogList(page , search) {
    const result = this.httpclient.get(this.baseUrl + '/user/blog-list' + '?page=' + page+'&search='+search
    );
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  blogDetail(id: any) {
    const result = this.httpclient.get(this.baseUrl + '/admin/blog/' + id
    );
    return result.pipe(map((response: any) => {
      return response;
    }));
  }
  editBlog(blogForm: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const result = this.httpclient.post(this.baseUrl + '/admin/edit-blog', blogForm);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

  deleteBlog(id: any) {
    const result = this.httpclient.delete(this.baseUrl + '/admin/delete-blog/' + id);
    return result.pipe(map((response: any) => {
      return response;
    }));
  }

}
