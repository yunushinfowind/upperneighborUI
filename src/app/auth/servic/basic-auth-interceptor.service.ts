import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth/auth.service';

@Injectable()
export class BasicAuthInterceptorService implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentUser = this.authenticationService.getUserDetail();
        if (currentUser && currentUser.login_token) {
            request = request.clone({
                setHeaders: { 
                    token: currentUser.login_token
                }
            });
        }

        return next.handle(request);
    }
}