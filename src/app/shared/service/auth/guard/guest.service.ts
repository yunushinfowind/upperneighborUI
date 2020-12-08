import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from '../auth.service';


@Injectable()
export class GuestService implements CanActivate {

    constructor(private _authService: AuthService, private _router: Router) { }

    canActivate(): boolean {
        if (this._authService.getUserDetail()) {
            this._router.navigate(['/admin/dashboard'])
            return false
        } else {
            return true
        }
    }
}
