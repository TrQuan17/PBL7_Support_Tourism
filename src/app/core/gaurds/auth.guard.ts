/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthModel } from 'src/app/auth/models/auth.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            const jsonStr = localStorage.getItem('account');
            if(jsonStr !== null) {
                const account = JSON.parse(jsonStr) as AuthModel;
                if(new Date().getTime() > account.expiresIn ) {
                    localStorage.removeItem('account');
                    this.router.navigate(['login']);
                }
            }
            else {
                this.router.navigate(['login']);
            }

        return true;
    }

}
