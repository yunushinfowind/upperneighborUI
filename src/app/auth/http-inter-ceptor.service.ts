import {Injectable, isDevMode} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// import {Observable} from 'rxjs/Rx';
import { AuthService } from '../shared/service/auth/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpInterCeptorService implements HttpInterceptor{

  constructor(private authentication:AuthService ,private toaster:ToastrService,private router:Router) { }

  intercept(request: HttpRequest <any> , next: HttpHandler): Observable <HttpEvent < any >> {

    let newReq: HttpRequest<any>;
    let head: any =  {
      'token': this.authentication.getToken()
    };
    if (!isDevMode()) {
      head = Object.assign({},  {
        'token': this.authentication.getToken()
      });
    }
    newReq = request.clone({
      setHeaders: head
    });

    return next.handle(newReq);
  }
}
