import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isLogged.pipe(map(logged => {
          if(!logged) {
            this.router.navigate(['login']);
            return false;
          }
          return true;
        })
        )
    }
}
